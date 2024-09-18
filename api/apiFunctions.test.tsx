import {
  recoverPassword,
  registerAccount,
  resetPassword,
} from './apiFunctions';
import { IUser } from './apiFunctions.interface';
import { account, ID } from './config';
const apiFunctions = require('./apiFunctions');
import { getBaseURL } from '@/utils/getBaseUrl';

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
    updateRecovery: jest.fn(),
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
        const mockError = new Error('Registration failed');
        (account.create as jest.Mock).mockRejectedValue(mockError);

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

    describe('resetPassword', () => {
      it('should successfully reset the password', async () => {
        (account.updateRecovery as jest.Mock).mockResolvedValue(
          mockRecoveryToken,
        );

        const result = await resetPassword({
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
          resetPassword({
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
});
