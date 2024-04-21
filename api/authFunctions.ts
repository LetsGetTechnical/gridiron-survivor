import {account } from "./appwrite"
import { useRouter } from 'next/navigation';

  const router = useRouter();

   export const logout = async () => {
    try {
      await account.deleteSession('current');
      router.push('/');
    } catch (error) {
      console.error(error);
    }
  };

 
