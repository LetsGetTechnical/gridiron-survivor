import { account } from "./config"
import { useRouter } from 'next/navigation';
import { useState } from "react";

export const AuthFunctions = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const register = async (name: string, email: string, password: string) => {
    setLoading(true);
    try {
      const newUser = await account.create(name, email, password);
      console.log('User registered successfully:', newUser);
      router.refresh(); // or any other redirection logic
  } catch (error) {
      console.error('Error registering user:', error);
      alert('Failed to register user. Please try again.');
  } finally {
      setLoading(false);
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

  const logout = async () => {
    try {
      await account.deleteSession('current'); 
      router.push('/');
    } catch (error) {
      console.error(error);
    }
  };

  return { register, login, logout, loading};
};
