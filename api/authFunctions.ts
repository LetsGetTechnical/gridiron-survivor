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

  export const register = async (name: string, email: string, password: string) => {
    // setLoading(true);
    try {
      const newUser = await account.create(name, email, password);
      console.log('User registered successfully:', newUser);
      router.refresh(); // or any other redirection logic
  } catch (error) {
      console.error('Error registering user:', error);
      alert('Failed to register user. Please try again.');
  }
  };

   export const login = async (email: string, password: string) => {
    // console.log(login)
    try {
        await account.createEmailPasswordSession(email, password)
        console.log(email, password)
        router.push('/')
    } catch (error) {
        console.log(error)
        alert(error)
    }
}