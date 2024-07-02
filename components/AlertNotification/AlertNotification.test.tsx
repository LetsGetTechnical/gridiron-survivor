import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Alert from './AlertNotification';
import { AlertVariants } from './Alerts.enum';
import { CheckCircle, XCircle, Info, AlertTriangle } from 'lucide-react';

import Nav from '../Nav/Nav';
import Login from '@/app/login/page';

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

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

const variantTestCases = {
  [AlertVariants.Success]: {
    title: 'Success!',
    message: 'This is a success message',
    icon: CheckCircle,
  },
  [AlertVariants.Error]: {
    title: 'Error!',
    message: 'This is an error message',
    icon: XCircle,
  },
  [AlertVariants.Default]: {
    title: 'Info',
    message: 'This is an info message',
    icon: Info,
  },
  [AlertVariants.Warning]: {
    title: 'Warning!',
    message: 'This is a warning message',
    icon: AlertTriangle,
  },
};

describe('AlertNotification', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  for (const [key, value] of Object.entries(variantTestCases)) {
    it(`renders the correct variant ${key}`, () => {
      render(<Alert variant={AlertVariants[key]} message={value.message} />);
    });
  }

  it('should show up on login screen when a user signs out', async () => {
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

    const navElement = screen.getByTestId('nav');

    expect(navElement).toBeInTheDocument();
  });
});
