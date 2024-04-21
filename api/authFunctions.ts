import {account, ID } from "./config"
import { useRouter } from 'next/navigation';
import { useState, ChangeEvent } from "react";

const useAuthFunctions = () => {
  const router = useRouter();

  const logout = async () => {
    try {
      await account.deleteSession('current');
      router.push('/');
    } catch (error) {
      console.error(error);
    }
  };

  return { logout};
};

export default useAuthFunctions;