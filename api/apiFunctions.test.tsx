import { Query } from 'appwrite';
import {
  createWeeklyPicks,
  getAllWeeklyPicks,
  loginAccount,
  logoutAccount,
  registerAccount,
} from './apiFunctions';
import { Collection } from './apiFunctions.enum';
import { IUserPick } from './apiFunctions.interface';
import { account, databases } from './config';
const apiFunctions = require('./apiFunctions');

jest.mock('./apiFunctions', () => {
  const actualModule = jest.requireActual('./apiFunctions');
  return {
    ...actualModule,
    addUserToLeague: jest.fn(),
    getAllLeagues: jest.fn(),
    getCurrentUserEntries: jest.fn(),
    getUserDocumentId: jest.fn(),
    getUserWeeklyPick: jest.fn(),
  };
});

jest.mock('./config', () => ({
  account: {
    create: jest.fn(),
    deleteSession: jest.fn(),
  },
  appwriteConfig: {
    databaseId: 'mockDatabaseId', // Mocked databaseId
  },
  databases: {
    createDocument: jest.fn(),
    listDocuments: jest.fn(),
    updateDocument: jest.fn(),
  },
  ID: {
    unique: jest.fn().mockReturnValue('mocked-unique-id'),
  },
}));

jest.mock('appwrite', () => ({
  Query: {
    equal: jest.fn((field, value) => ({ field, value })),
  },
}));

describe('API Functions', () => {
  describe('Auth Functions', () => {
    jest.mock('./apiFunctions', () => ({
      loginAccount: jest.fn(),
      registerAccount: jest.fn(),
    }));

    beforeEach(() => {
      jest.clearAllMocks();
    });

    xdescribe('login account successful', () => {
      it('should show user login successfully', async () => {
        const userDummy = {
          email: 'testemail@email.com',
          password: 'test1234',
        };
        await loginAccount(userDummy);
        expect(account.createEmailPasswordSession).toBeInstanceOf(Object);
      });

      //user failed to log in
      it('should send error if user could not log in', async () => {
        const failDummy = {
          email: 'testemil@email.com',
          password: 'tet1234679',
        };
        await loginAccount(failDummy);
        expect(loginAccount(failDummy)).rejects.toThrow('error');
      });
    });

    // Test the logout function
    describe('logout account works', () => {
      it('should log out successfully', async () => {
        jest
          .spyOn(account, 'deleteSession')
          .mockResolvedValueOnce('Session deleted');
        await logoutAccount();
        expect(account.deleteSession).toHaveBeenCalledTimes(1);
      });
    });

    describe('register account successful', () => {
      it('Should allow a user to register an account', async () => {
        const userDummy = {
          email: 'testemail0@email.com',
          password: 'test12345',
        };
        const response = await registerAccount(userDummy);
        expect(account.create).toHaveBeenCalledWith(
          expect.any(String),
          userDummy.email,
          userDummy.password,
        );
      });
    });
  });

  describe('createWeeklyPicks', () => {
    const mockLeagueId = 'mockLeagueId';
    const mockGameWeekId = 'mockGameWeekId';
    const mockDocumentId = 'mockDocumentId';
    const mockUserResults: IUserPick = {
      mockUserId: {
        mockLeagueId: {
          mockEntryId: {
            teamName: 'Team A',
            correct: true,
          },
        },
      },
    };

    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should successfully create weekly picks', async () => {
      const mockListResponse = {
        documents: [{ $id: mockDocumentId }],
      };
      const mockUpdateResponse = {
        $id: mockDocumentId,
        leagueId: mockLeagueId,
        gameWeekId: mockGameWeekId,
        userResults: JSON.stringify(mockUserResults),
      };

      (databases.listDocuments as jest.Mock).mockResolvedValue(
        mockListResponse,
      );
      (databases.updateDocument as jest.Mock).mockResolvedValue(
        mockUpdateResponse,
      );

      const result = await createWeeklyPicks({
        leagueId: mockLeagueId,
        gameWeekId: mockGameWeekId,
        userResults: mockUserResults,
      });

      expect(databases.listDocuments).toHaveBeenCalledWith(
        'mockDatabaseId',
        Collection.GAME_RESULTS,
        [
          Query.equal('leagueId', mockLeagueId),
          Query.equal('gameWeekId', mockGameWeekId),
        ],
      );

      expect(databases.updateDocument).toHaveBeenCalledWith(
        'mockDatabaseId',
        Collection.GAME_RESULTS,
        mockDocumentId,
        {
          leagueId: mockLeagueId,
          gameWeekId: mockGameWeekId,
          userResults: JSON.stringify(mockUserResults),
        },
      );

      expect(result).toEqual(mockUpdateResponse);
    });

    it('should throw an error when listDocuments fails', async () => {
      (databases.listDocuments as jest.Mock).mockRejectedValue(
        new Error('List documents failed'),
      );

      await expect(
        createWeeklyPicks({
          leagueId: mockLeagueId,
          gameWeekId: mockGameWeekId,
          userResults: mockUserResults,
        }),
      ).rejects.toThrow('Error creating weekly picks');

      expect(databases.listDocuments).toHaveBeenCalled();
      expect(databases.updateDocument).not.toHaveBeenCalled();
    });

    it('should throw an error when updateDocument fails', async () => {
      const mockListResponse = {
        documents: [{ $id: mockDocumentId }],
      };

      (databases.listDocuments as jest.Mock).mockResolvedValue(
        mockListResponse,
      );
      (databases.updateDocument as jest.Mock).mockRejectedValue(
        new Error('Update document failed'),
      );

      await expect(
        createWeeklyPicks({
          leagueId: mockLeagueId,
          gameWeekId: mockGameWeekId,
          userResults: mockUserResults,
        }),
      ).rejects.toThrow('Error creating weekly picks');

      expect(databases.listDocuments).toHaveBeenCalled();
      expect(databases.updateDocument).toHaveBeenCalled();
    });

    it('should throw an error when no documents are found', async () => {
      const mockListResponse = {
        documents: [],
      };

      (databases.listDocuments as jest.Mock).mockResolvedValue(
        mockListResponse,
      );

      await expect(
        createWeeklyPicks({
          leagueId: mockLeagueId,
          gameWeekId: mockGameWeekId,
          userResults: mockUserResults,
        }),
      ).rejects.toThrow('Error creating weekly picks');

      expect(databases.listDocuments).toHaveBeenCalled();
      expect(databases.updateDocument).not.toHaveBeenCalled();
    });
  });

  describe('getAllWeeklyPicks', () => {
    const mockLeagueId = 'mockLeagueId';
    const mockWeekId = 'mockWeekId';
    const mockYear = new Date().getFullYear().toString();

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should return the userResults when response is found', async () => {
      const mockResponse = {
        total: 1,
        documents: [
          {
            userResults: JSON.stringify({ result: 'testResult' }),
          },
        ],
      };

      (databases.listDocuments as jest.Mock).mockResolvedValue(mockResponse);

      const result = await getAllWeeklyPicks({
        leagueId: mockLeagueId,
        weekId: mockWeekId,
      });

      expect(databases.listDocuments).toHaveBeenCalled();
      expect(databases.listDocuments).toHaveBeenCalledWith(
        expect.any(String), // databaseId
        Collection.GAME_RESULTS,
        [
          Query.equal('leagueId', mockLeagueId),
          Query.equal('gameWeekId', mockWeekId),
        ],
      );
      expect(result).toEqual({ result: 'testResult' });
    });

    it('should create a new document and return userResults when no response is found', async () => {
      const mockListResponse = {
        total: 0,
        documents: [],
      };
      const mockNewDocument = {
        documents: [
          {
            userResults: JSON.stringify({ newResult: 'newTestResult' }),
          },
        ],
      };

      (databases.listDocuments as jest.Mock).mockResolvedValue(
        mockListResponse,
      );
      (databases.createDocument as jest.Mock).mockResolvedValue(
        mockNewDocument,
      );

      const result = await apiFunctions.getAllWeeklyPicks({
        leagueId: mockLeagueId,
        weekId: mockWeekId,
      });

      expect(databases.createDocument).toHaveBeenCalledWith(
        expect.any(String), // databaseId
        Collection.GAME_RESULTS,
        'mocked-unique-id', // documentId
        {
          leagueId: mockLeagueId,
          gameWeekId: mockWeekId,
          userResults: '{}',
          year: mockYear,
        },
      );
      expect(result).toEqual({ newResult: 'newTestResult' });
    });

    it('should throw an error when there is a problem with the request', async () => {
      (databases.listDocuments as jest.Mock).mockRejectedValue(
        new Error('Test error'),
      );

      await expect(
        apiFunctions.getAllWeeklyPicks({
          leagueId: mockLeagueId,
          weekId: mockWeekId,
        }),
      ).rejects.toThrow('Error getting all weekly picks');
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
      await expect(apiFunctions.addUserToLeague('123', '456')).rejects.toThrow(
        'Error adding user to league',
      );
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
