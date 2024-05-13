'use client';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { account } from '@/api/config';
import { useRouter } from 'next/navigation';
import { useDataStore } from '@/store/dataStore';
import type { DataStore } from '@/store/dataStore';

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
  const { updateUser, resetUser } = useDataStore<DataStore>((state) => state);
  const router = useRouter();

  // Check for a current session on component mount
  useEffect(() => {
    const checkSession = async () => {
      if (!isSessionInLocalStorage()) {
        return;
      }

      setIsSignedIn(true);
    };
    checkSession();
  }, []);

  useMemo(() => {
    const getUser = async () => {
      if (!isSignedIn) {
        return;
      }

      try {
        const userData = await account.get();
        updateUser(userData.$id, userData.email);
      } catch (error) {
        resetUser();
        setIsSignedIn(false);
        console.log('Error getting user data:', error);
        throw new Error('Error getting user data');
      }
    };
    getUser();
  }, [isSignedIn]);

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
      resetUser(); // Reset user data in the store
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
