'use client'; //client component since nextjs are automatically serverside components

import Link from 'next/link';
// import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

//create a login
import { ChangeEvent, useState } from "react"
// import {account, ID} from "../api/appwrite"
// import { useRouter } from "next/navigation";

import useAuthFunctions from '@/api/authFunctions'


export default function AuthButton() {
//   const cookieStore = cookies();
  // Assume user is always logged in for demonstration purposes
  // const user = { email: 'example@example.com' };

  // const signOut = async () => {
  //   // Perform sign out logic here
  //   // For example, clear cookies or session variables
  //   return redirect('/login');
  // };

  // const router = useRouter();

  const { login } = useAuthFunctions();

  //create login
  const [email, setEmail] = useState<string | ''>('');
  const [password, setPassword] = useState<string | ''>('');

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
};

const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
};

//   const login = async () => {
//     // console.log(login)
//     try {
//         await account.createEmailPasswordSession(email, password)
//         console.log(email, password)
//         router.push('/dashboard')
//     } catch (error) {
//         console.log(error)
//         alert(error)
//     }
// }

const handleLogin = () => {
  login(email, password)
}

  return (
    
      <div>
          <h1 className="text-center text-[28px] mb-4 font-bold">Log in</h1>
          <div className="px-6 pb-2">
                <input
                    type="email"
                    value={email}
                    placeholder="Email address"
                    onChange={handleEmail}
                    className="input"
                />
            </div>
            <div className="px-6 pb-2">
                <input
                    type="password"
                    value={password}
                    placeholder="Password"
                    onChange={handlePassword}
                    className="input"
                />
            </div>
         
          <div className="px-6 pb-2 mt-6">
              <button 
                  
                  onClick={handleLogin} 
                  className={`
                      flex items-center justify-center w-full text-[17px] font-semibold text-white py-3 rounded-sm
                      ${(!email || !password) ? 'bg-gray-200' : 'bg-[#F02C56]'}
                  `}
              >
                  Log in
              </button>
          </div>
          
      </div>
  
      );
}

//  export default AuthButton;
