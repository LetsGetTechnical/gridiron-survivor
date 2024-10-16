import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Nav from './Nav';
import Login from '@/app/(main)/login/page';
import { useDataStore } from '@/store/dataStore';
import { getUserLeagues } from '@/utils/utils';

const mockPush = jest.fn();
const mockUsePathname = jest.fn();
const mockLogoutAccount = jest.fn();

const mockUseAuthContext = {
  logoutAccount: mockLogoutAccount,
  isSignedIn: true,
};

window.scrollTo = jest.fn();

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

jest.mock('@/store/dataStore', () => ({
  useDataStore: jest.fn(() => ({ user: { id: '123', leagues: [] } })),
}));

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

describe('Nav', () => {
  const mockUseDataStore = useDataStore as unknown as jest.Mock;
  const mockGetUserLeagues = getUserLeagues as jest.Mock;

  beforeAll(() => {
    const originalCreateElement = document.createElement.bind(document);
    jest
      .spyOn(document, 'createElement')
      .mockImplementation((tagName, options) => {
        const element = originalCreateElement(tagName, options);
        if (tagName.toLowerCase() === 'a') {
          element.addEventListener('click', (e) => e.preventDefault());
        }
        return element;
      });
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders link to /league/all', async () => {
    render(<Nav />);

    const drawTrigger = screen.getByTestId('drawer-trigger');
    fireEvent.click(drawTrigger);

    let linkNav: HTMLElement;
    linkNav = await screen.getByTestId('league-link');
    expect(linkNav).toBeInTheDocument();
    expect(linkNav).toHaveAttribute('href', '/league/all');
  });

  it('it should render the default component state', () => {
    mockUsePathname.mockImplementation(() => '/league/all');

    render(<Nav />);

    const navElement = screen.getByTestId('nav');
    expect(navElement).toBeInTheDocument();

    const drawerTrigger = screen.getByTestId('drawer-trigger');
    fireEvent.click(drawerTrigger);

    expect(screen.getByTestId('settings-link')).toBeInTheDocument();
    expect(screen.getByTestId('title')).toBeInTheDocument();
    expect(screen.getByTestId('logo-nav')).toBeInTheDocument();
    expect(screen.getByTestId('sign-out-button')).toBeInTheDocument();
  });

  it('should route to the settings page when the user clicks on the settings link', async () => {
    mockUsePathname.mockReturnValue('/league/all');

    render(<Nav />);

    const drawerTrigger = screen.getByTestId('drawer-trigger');
    fireEvent.click(drawerTrigger);

    const preferencesLink = await screen.findByTestId('settings-link');

    expect(preferencesLink).toHaveAttribute('href', '/account/settings');

    fireEvent.click(preferencesLink);

    await waitFor(() => {
      expect(screen.queryByTestId('preferences-link')).not.toBeInTheDocument();
      expect(drawerTrigger.getAttribute('data-state')).toBe('closed');
    });
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
  it('it should be hidden when path is /reset-password', () => {
    mockUsePathname.mockImplementation(() => '/recover-password');

    render(<Nav />);

    const navElement = screen.getByTestId('nav');

    expect(navElement).toBeInTheDocument();
    expect(navElement).toHaveClass('hidden');
  });
  it('it should be hidden when path is /account/recovery', () => {
    mockUsePathname.mockImplementation(() => '/account/recovery');

    render(<Nav />);

    const navElement = screen.getByTestId('nav');

    expect(navElement).toBeInTheDocument();
    expect(navElement).toHaveClass('hidden');
  });

  it('it should be visible when logged in', () => {
    mockUsePathname.mockImplementation(() => '/weeklyPicks');

    render(<Nav />);

    const navElement = screen.getByTestId('nav');

    expect(navElement).toBeInTheDocument();
    expect(navElement).not.toHaveClass('hidden');
  });

  it('it should logout user when sign out button is clicked and redirect them to the /login page', async () => {
    mockUsePathname.mockImplementation(() => '/weeklyPicks');

    render(<Nav />);

    const drawerTrigger = screen.getByTestId('drawer-trigger');
    fireEvent.click(drawerTrigger);

    const signOutButton = screen.getByTestId('sign-out-button');

    fireEvent.click(signOutButton);
    await waitFor(() => {
      expect(mockLogoutAccount).toHaveBeenCalled();
    });

    mockUseAuthContext.isSignedIn = false;

    render(<Login />);

    expect(mockPush).toHaveBeenCalledWith('/login');
  });

  it('it should close the drawer when the signout button is clicked', async () => {
    mockUsePathname.mockImplementation(() => '/weeklyPicks');

    render(<Nav />);

    const drawerTrigger = screen.getByTestId('drawer-trigger');

    fireEvent.click(drawerTrigger);

    const signOutButton = screen.getByTestId('sign-out-button');

    fireEvent.click(signOutButton);

    await waitFor(() => {
      expect(drawerTrigger.getAttribute('data-state')).toBe('closed');
    });
  });

  it('it should close the drawer when the leagues link is clicked', async () => {
    mockUsePathname.mockImplementation(() => '/league/all');

    render(<Nav />);

    const drawerTrigger = screen.getByTestId('drawer-trigger');

    fireEvent.click(drawerTrigger);

    const linkNav = screen.getByTestId('league-link');

    fireEvent.click(linkNav);

    await waitFor(() => {
      expect(drawerTrigger.getAttribute('data-state')).toBe('closed');
    });
  });
});
