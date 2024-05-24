import { render, screen } from '@testing-library/react';
import Nav from './Nav';

const mockPush = jest.fn();
const mockUsePathname = jest.fn();

const mockUseAuthContext = {
  logoutAccount: jest.fn(),
};

jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: mockPush,
    };
  },
  usePathname() {
    return mockUsePathname();
  },
}));

jest.mock('../../context/AuthContextProvider', () => ({
  useAuthContext() {
    return {
      ...mockUseAuthContext,
    };
  },
}));

describe('Nav', () => {
  beforeAll(() => {
    jest.clearAllMocks();
  });
  it('it should be hidden when path is /register', () => {
    mockUsePathname.mockImplementation(() => '/register');

    render(<Nav />);

    const navElement = screen.getByTestId('nav');

    expect(navElement).toBeInTheDocument();
    expect(navElement).toHaveClass('hidden');
  });

  it('it should be hidden when path is /login', () => {
    mockUsePathname.mockImplementation(() => '/login');

    render(<Nav />);

    const navElement = screen.getByTestId('nav');

    expect(navElement).toBeInTheDocument();
    expect(navElement).toHaveClass('hidden');
  });

  it('it should be visible when logged in', () => {
    render(<Nav />);

    const navElement = screen.getByTestId('nav');

    expect(navElement).toBeInTheDocument();
    expect(navElement).not.toHaveClass('hidden');
  });
});
