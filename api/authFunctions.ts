import { account } from "./config"
import { NextRouter } from 'next/router';


  export const login = async (router: NextRouter, email: string, password: string) => {
    try {
      await account.createEmailPasswordSession(email, password);
      router.push('/');
    } catch (error) {
      console.error(error);
    }
  };

 export const logout = async (router: NextRouter) => {
    try {
      await account.deleteSession('current'); 
      router.push('/');
    } catch (error) {
      console.error(error);
    }
  };

