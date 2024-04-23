import { account } from "./config"
import { useRouter } from "next/navigation"
// import { NextRouter } from 'next/router';

const router = useRouter();

  export const login = async (email: string, password: string) => {
    try {
      await account.createEmailPasswordSession(email, password);
      router.push('/');
    } catch (error) {
      console.error(error);
    }
  };

 export const logout = async () => {
    try {
      await account.deleteSession('current'); 
      router.push('/');
    } catch (error) {
      console.error(error);
    }
  };

