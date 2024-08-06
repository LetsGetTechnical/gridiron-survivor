import { logoutHandler } from './AuthHelper';

describe('LogoutHandler', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Should logout the user', async () => {
    await logoutHandler;
  });
});
