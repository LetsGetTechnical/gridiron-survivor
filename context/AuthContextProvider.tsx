'use client';
import { createContext, useContext, useMemo, useState } from 'react';
import { User } from '@/types/AuthContextTypes';
import { account } from '@/api/config';

type AuthContextType = {
  user: User | null;
  setUser: (user: User) => void;
  isSignedIn: boolean;
  loginAccount: (user: { email: string; password: string }) => void;
  logoutAccount: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<User | null>(null);
  const isSignedIn = user?.sessionId ? true : false;

  const contextValue = useMemo(
    () => ({ user, setUser, isSignedIn, loginAccount, logoutAccount }),
    [user, isSignedIn],
  );

  async function loginAccount(user: { email: string; password: string }) {
    try {
      const data = await account.createEmailPasswordSession(
        user.email,
        user.password,
      );

      console.log({
        sessionId: data.$id,
      });

      // get the user information
      const userAccount = await account.get();

      // if no user account found, throw an error
      if (!userAccount) {
        throw new Error('No user account found');
      }

      // log the user information
      console.log({ userName: userAccount.name, userEmail: userAccount.email });

      setUser({
        sessionId: data.$id,
        id: userAccount.$id,
        name: userAccount.name,
        email: userAccount.email,
      });
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  async function logoutAccount() {
    try {
      await account.deleteSession(user?.sessionId || 'current');
      setUser(null);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      'useAuthContext must be used within an AuthContextProvider',
    );
  }
  return context;
}
