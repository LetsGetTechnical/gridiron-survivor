import { mock } from 'node:test';
import {
  recoverPassword,
  registerAccount,
  resetPassword,
  resetRecoveredPassword,
  updateUserEmail,
  getTotalEntries
} from './apiFunctions';
import { IUser } from './apiFunctions.interface';
import { account, databases, ID } from './config';
const apiFunctions = require('./apiFunctions');
import { getBaseURL } from '@/utils/getBaseUrl';
import { Collection } from './apiFunctions.enum';
import { Query } from 'appwrite';

jest.mock('./apiFunctions', () => {
  const actualModule = jest.requireActual('./apiFunctions');
  return {
    ...actualModule,
    createWeeklyPicks: jest.fn(),
    getUserWeeklyPick: jest.fn(),
    getAllWeeklyPicks: jest.fn(),
    getCurrentUserEntries: jest.fn(),
    getAllLeagues: jest.fn(),
    getUserDocumentId: jest.fn(),
    addUserToLeague: jest.fn(),
  };
});

jest.mock('@/utils/getBaseUrl', () => ({
  getBaseURL: jest.fn(),
}));

jest.mock('./config', () => ({
  account: {
    create: jest.fn(),
    createRecovery: jest.fn(),
    updateEmail: jest.fn(),
    updatePassword: jest.fn(),
    updateRecovery: jest.fn(),
  },
  appwriteConfig: {
    databaseId: 'mock-database-id',
  },
  databases: {
    listDocuments: jest.fn(),
    updateDocument: jest.fn(),
  },
  ID: {
    unique: jest.fn(),
  },
}));

describe('apiFunctions', () => {
  describe('Authentication Functions', () => {
    const mockBaseURL = 'http://example.com';
    const mockEmail = 'test@example.com';
    const mockPassword = 'newPassword123';
    const mockRecoveryToken = { userId: '123', secret: 'abc123' };
    const mockToken = 'abc123';
    const mockUserId = '123';
    const mockUniqueId = 'unique123';

    beforeEach(() => {
      jest.clearAllMocks();
      (getBaseURL as jest.MockedFunction<typeof getBaseURL>).mockReturnValue(
        mockBaseURL,
      );
    });

    describe('registerAccount', () => {
      it('should successfully register a new account', async () => {
        const mockUser: IUser = {
          documentId: '123',
          id: mockUniqueId,
          email: mockEmail,
          leagues: [],
        };

        (ID.unique as jest.Mock).mockReturnValue(mockUniqueId);
        (account.create as jest.Mock).mockResolvedValue(mockUser);

        const result = await registerAccount({
          email: mockEmail,
          password: mockPassword,
        });

        expect(account.create).toHaveBeenCalledWith(
          mockUniqueId,
          mockEmail,
          mockPassword,
        );
        expect(result).toEqual(mockUser);
      });

      it('should throw an error if registration fails', async () => {
        (account.create as jest.Mock).mockRejectedValue(
          new Error('Registration failed'),
        );

        await expect(
          registerAccount({ email: mockEmail, password: mockPassword }),
        ).rejects.toThrow('Error registering user');

        expect(ID.unique).toHaveBeenCalledTimes(1);
        expect(account.create).toHaveBeenCalledWith(
          mockUniqueId,
          mockEmail,
          mockPassword,
        );
      });
    });

    describe('recoverPassword', () => {
      it('should successfully create a recovery token', async () => {
        (account.createRecovery as jest.Mock).mockResolvedValue(
          mockRecoveryToken,
        );

        const result = await recoverPassword({ email: mockEmail });

        expect(getBaseURL).toHaveBeenCalledTimes(1);
        expect(account.createRecovery).toHaveBeenCalledWith(
          mockEmail,
          `${mockBaseURL}/account/recovery`,
        );
        expect(result).toEqual(mockRecoveryToken);
      });

      it('should throw an error if recovery creation fails', async () => {
        const mockError = new Error('Recovery creation failed');
        (account.createRecovery as jest.Mock).mockRejectedValue(mockError);

        await expect(recoverPassword({ email: mockEmail })).rejects.toThrow();
        expect(getBaseURL).toHaveBeenCalledTimes(1);
        expect(account.createRecovery).toHaveBeenCalledWith(
          mockEmail,
          `${mockBaseURL}/account/recovery`,
        );
      });
    });

    describe('resetRecoveredPassword', () => {
      it('should successfully reset the password', async () => {
        (account.updateRecovery as jest.Mock).mockResolvedValue(
          mockRecoveryToken,
        );

        const result = await resetRecoveredPassword({
          userId: mockUserId,
          token: mockToken,
          password: mockPassword,
        });

        expect(account.updateRecovery).toHaveBeenCalledWith(
          mockUserId,
          mockToken,
          mockPassword,
        );
        expect(result).toEqual(mockRecoveryToken);
      });

      it('should throw an error if password reset fails', async () => {
        const mockError = new Error('Password reset failed');
        (account.updateRecovery as jest.Mock).mockRejectedValue(mockError);

        await expect(
          resetRecoveredPassword({
            userId: mockUserId,
            token: mockToken,
            password: mockPassword,
          }),
        ).rejects.toThrow();
        expect(account.updateRecovery).toHaveBeenCalledWith(
          mockUserId,
          mockToken,
          mockPassword,
        );
      });
    });
    describe('updateUserEmail', () => {
      const mockNewEmail = 'new@example.com';
      const mockPassword = 'password123';
      const mockUserId = '123';
      const mockDocumentId = '456';
      it("should successfully update the user's email", async () => {
        (account.updateEmail as jest.Mock).mockResolvedValue({
          $id: mockUserId,
        });

        (databases.listDocuments as jest.Mock).mockResolvedValue({
          documents: [
            {
              $id: mockDocumentId,
              name: 'Test User',
              email: 'old@example.com',
              labels: '',
              userId: mockUserId,
              leagues: [],
            },
          ],
        });

        (databases.updateDocument as jest.Mock).mockResolvedValue({});

        await updateUserEmail({
          email: mockNewEmail,
          password: mockPassword,
        });

        expect(account.updateEmail).toHaveBeenCalledWith(
          mockNewEmail,
          mockPassword,
        );

        expect(databases.listDocuments).toHaveBeenCalledWith(
          'mock-database-id',
          Collection.USERS,
          [Query.equal('userId', mockUserId)],
        );

        expect(databases.updateDocument).toHaveBeenCalledWith(
          'mock-database-id',
          Collection.USERS,
          mockDocumentId,
          {
            email: mockNewEmail,
            name: 'Test User',
            labels: '',
            userId: mockUserId,
            leagues: [],
          },
        );
      });
      it('should throw an error if updating email fails', async () => {
        (account.updateEmail as jest.Mock).mockRejectedValue(new Error());

        await expect(
          updateUserEmail({
            email: mockNewEmail,
            password: mockPassword,
          }),
        ).rejects.toThrow();

        expect(account.updateEmail).toHaveBeenCalledWith(
          mockNewEmail,
          mockPassword,
        );

        expect(databases.listDocuments).not.toHaveBeenCalled();
        expect(databases.updateDocument).not.toHaveBeenCalled();
      });
    });

    describe('resetPassword', () => {
      it('should successfully reset the password', async () => {
        (account.updatePassword as jest.Mock).mockResolvedValue({});

        await resetPassword({
          newPassword: 'newPassword123',
          oldPassword: 'oldPassword123',
        });

        expect(account.updatePassword).toHaveBeenCalledWith(
          'newPassword123',
          'oldPassword123',
        );
      });
    });
    it('should throw an error if resetting password fails', async () => {
      (account.updatePassword as jest.Mock).mockRejectedValue(new Error());

      await expect(
        resetPassword({
          newPassword: 'newPassword123',
          oldPassword: 'oldPassword123',
        }),
      ).rejects.toThrow();

      expect(account.updatePassword).toHaveBeenCalledWith(
        'newPassword123',
        'oldPassword123',
      );
    });
  });

  describe('Get Weekly Picks Mock function', () => {
    it('should mock getWeeklyPicks function', async () => {
      const users = { $id: '663130a100297f77c3c8' };
      const resp = { data: users };

      apiFunctions.getUserWeeklyPick.mockResolvedValue(resp);

      const result = await apiFunctions.getUserWeeklyPick({
        userId: '66281d5ec5614f76bc91',
        weekNumber: '6622c75658b8df4c4612',
      });

      expect(result).toEqual(resp);
    });
  });

  describe('Create Weekly Picks Mock Function', () => {
    it('should mock createWeeklyPicks function', async () => {
      const users = { team: '66218f22b40deef340f8', correct: false };
      const resp = { data: users };

      apiFunctions.createWeeklyPicks.mockResolvedValue(resp);

      const result = await apiFunctions.createWeeklyPicks({
        gameWeekId: '6622c7596558b090872b',
        gameId: '66311a210039f0532044',
        userResults:
          '{"66281d5ec5614f76bc91":{"team":"66218f22b40deef340f8","correct":false},"6628077faeeedd272637":{"team":"6621b30ea57bd075e9d3","correct":false}, "66174f2362ec891167be":{"team": "6621b30ea57bd075e9d3", "correct":true}}',
      });

      expect(result).toEqual(resp);
    });
  });

  describe('Get All Weekly Picks Mock Function', () => {
    it('should mock getAllWeeklyPicks function', async () => {
      const weeklyPicks = {
        '66281d5ec5614f76bc91': {
          team: '66218f22b40deef340f8',
          correct: false,
        },
        '6628077faeeedd272637': {
          team: '6621b30ea57bd075e9d3',
          correct: false,
        },
        '66174f2362ec891167be': { team: '6621b30ea57bd075e9d3', correct: true },
      };
      const response = { data: weeklyPicks };

      apiFunctions.getAllWeeklyPicks.mockResolvedValue(response);

      const result = await apiFunctions.getAllWeeklyPicks();

      expect(result).toEqual(response);
    });
  });

  describe('getCurrentUserEntries()', () => {
    it('should get all user entries and check if eliminated is equal to true', async () => {
      const userEntries = [
        {
          eliminated: true,
          league: {},
          name: 'name',
          selectedTeams: [],
          user: '000',
          $id: '000',
        },
      ];

      apiFunctions.getCurrentUserEntries.mockResolvedValue(userEntries);

      const result = await apiFunctions.getCurrentUserEntries();

      for (const entry of result) {
        expect(entry.eliminated).toEqual(true);
      }
    });

    it('should get all user entries and check if eliminated is equal to false', async () => {
      const userEntries = [
        {
          eliminated: false,
          league: {},
          name: 'name',
          selectedTeams: [],
          user: '000',
          $id: '000',
        },
      ];

      apiFunctions.getCurrentUserEntries.mockResolvedValue(userEntries);

      const result = await apiFunctions.getCurrentUserEntries();

      for (const entry of result) {
        expect(entry.eliminated).toEqual(false);
      }
    });

    it('should get all user entries and check if eliminated is equal to null', async () => {
      const userEntries = [
        {
          eliminated: null,
          league: {},
          name: 'name',
          selectedTeams: [],
          user: '000',
          $id: '000',
        },
      ];

      apiFunctions.getCurrentUserEntries.mockResolvedValue(userEntries);

      const result = await apiFunctions.getCurrentUserEntries();

      for (const entry of result) {
        expect(entry.eliminated).toEqual(null);
      }
    });
  });

  xdescribe('get all leagues', () => {
    it('should return all leagues upon successful call', async () => {
      const mockAllLeagues = [
        {
          leagueId: '1',
          leagueName: 'League One',
          logo: '',
          participants: ['user1', 'user2'],
          survivors: ['user1'],
        },
        {
          leagueId: '2',
          leagueName: 'League Two',
          logo: '',
          participants: ['user3', 'user4'],
          survivors: ['user4'],
        },
      ];

      apiFunctions.getAllLeagues.mockResolvedValue(mockAllLeagues);

      const result = await apiFunctions.getAllLeagues();

      expect(result).toEqual([
        {
          leagueId: '1',
          leagueName: 'League One',
          logo: '',
          participants: ['user1', 'user2'],
          survivors: ['user1'],
        },
        {
          leagueId: '2',
          leagueName: 'League Two',
          logo: '',
          participants: ['user3', 'user4'],
          survivors: ['user4'],
        },
      ]);
    });
    it('should return error upon unsuccessful call', async () => {
      apiFunctions.getAllLeagues.mockRejectedValue(
        new Error('Error getting all leagues'),
      );

      await expect(apiFunctions.getAllLeagues()).rejects.toThrow(
        'Error getting all leagues',
      );
    });
  });

  describe('get users id', () => {
    it('should return user document ID', async () => {
      const userId = '123';
      const response = '456';
      apiFunctions.getUserDocumentId.mockResolvedValue(response);
      const result = await apiFunctions.getUserDocumentId(userId);
      expect(result).toEqual(response);
    });
    it('should return error upon unsuccessful call', async () => {
      apiFunctions.getUserDocumentId.mockRejectedValue(
        new Error('Error getting user document ID'),
      );
      await expect(apiFunctions.getUserDocumentId('123')).rejects.toThrow(
        'Error getting user document ID',
      );
    });
  });

  describe('add user to league', () => {
    const response = {
      userDocumentId: 'user123',
      selectedLeague: 'league123',
      selectedLeagues: ['league123'],
      participants: ['user123', 'user456'],
      survivors: ['user123'],
    };
    it('should add user to league', async () => {
      apiFunctions.addUserToLeague.mockResolvedValue(response);
      const result = await apiFunctions.addUserToLeague({ response });
      expect(result).toEqual(response);
    });
    it('should return error upon unsuccessful call', async () => {
      apiFunctions.addUserToLeague.mockRejectedValue(
        new Error('Error adding user to league'),
      );
      await expect(apiFunctions.addUserToLeague({ response })).rejects.toThrow(
        'Error adding user to league',
      );
    });
  });

  describe('getTotalEntries()', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
    it('should return the total number of entries and alive entries in a league', async () => {
      (databases.listDocuments as jest.Mock).mockResolvedValue({
        documents: [
          {
            name: 'Entry 1',
            user: '1234',
            league: {
              $id: 'league1',
              survivors: ['123'],
              participants: ['123', '1234'],
              leagueName: 'League 1',
              logo: '',
            },
            eliminated: true,
            selectedTeams: ['Browns', 'Bears'],
          },
          {
            name: 'Entry 2',
            user: '1234',
            league: {
              $id: 'league1',
              survivors: ['123'],
              participants: ['123', '1234'],
              leagueName: 'League 1',
              logo: '',
            },
            eliminated: false,
            selectedTeams: ['Patriots', 'Eagles'],
          },
          {
            name: 'Entry 3',
            user: '1234',
            league: {
              $id: 'league2',
              survivors: ['123'],
              participants: ['123', '1234'],
              leagueName: 'League 2',
              logo: '',
            },
            eliminated: false,
            selectedTeams: ['Bears', 'Cowboys'],
          },
        ],
      });

      const leagues = ['league1', 'league2'];

      const result = await getTotalEntries({ leagues });

      expect(result).toEqual([
        {
          totalEntries: 2,
          alive: 1,
        },
        {
          totalEntries: 1,
          alive: 1,
        },
      ]);
    });
  });
});
