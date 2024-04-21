import { account } from "./config"
import { useRouter } from 'next/navigation';

export const AuthFunctions = () => {
  const router = useRouter();

  const logout = async () => {
    try {
      await account.deleteSession('current'); 
      router.push('/');
    } catch (error) {
      console.error(error);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      await account.createEmailPasswordSession(email, password);
      router.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  return { login, logout };
};
