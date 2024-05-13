'use client';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { account } from '@/api/config';
import { useRouter } from 'next/navigation';

type UserCredentials = {
  email: string;
  password: string;
};

type AuthContextType = {
  isSignedIn: boolean;
  setIsSignedIn: (isSignedIn: boolean) => void;
  loginAccount: (user: UserCredentials) => Promise<void | Error>;
  logoutAccount: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const router = useRouter();

  // Check for a current session on component mount
  useEffect(() => {
    const checkSession = async () => {
      if (!isSessionInLocalStorage()) {
        return;
      }

      try {
        await account.getSession('current');
        setIsSignedIn(true);
      } catch (error) {
        console.error('Session validation error:', error);
        setIsSignedIn(false);
      }
    };
    checkSession();
  }, []);

  // Authenticate and set session state
  const loginAccount = async (user: UserCredentials): Promise<void | Error> => {
    try {
      await account.createEmailPasswordSession(user.email, user.password);
      setIsSignedIn(true);
    } catch (error) {
      console.error('Login error:', error);
      return error as Error;
    }
  };

  // Log out and clear session state
  const logoutAccount = async (): Promise<void> => {
    try {
      await account.deleteSession('current');
      setIsSignedIn(false);
      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Helper function to validate session data in local storage
  const isSessionInLocalStorage = (): boolean => {
    const loadedDataString = localStorage.getItem('cookieFallback');

    if (!loadedDataString || loadedDataString === '[]') {
      localStorage.removeItem('cookieFallback');
      return false;
    }

    return true;
  };

  // Memoize context values to avoid unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      isSignedIn,
      setIsSignedIn,
      loginAccount,
      logoutAccount,
    }),
    [isSignedIn],
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

// Custom hook to access the authentication context
export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      'useAuthContext must be used within an AuthContextProvider',
    );
  }
  return context;
}
