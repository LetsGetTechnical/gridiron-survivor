import {account } from "./appwrite"
import { useRouter } from 'next/navigation';

   export const logout = async () => {
    try {
      await account.deleteSession('current');
      const router = useRouter()
      router.push('/');
    } catch (error) {
      console.error(error);
    }
  };

   export const login = async (email: string, password: string) => {
    // console.log(login)
    try {
        await account.createEmailPasswordSession(email, password)
        console.log(email, password)
        const router = useRouter()
        router.push('/')
    } catch (error) {
        console.log(error)
        alert(error)
    }
}