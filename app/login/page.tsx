import React, { useState, ChangeEvent } from 'react';
import { AuthFunctions } from "@/api/AuthFunctions";

export default function Login() {
  const { login } = AuthFunctions(); // Destructure login function from the hook
  const [email, setEmail] = useState<string | ''>('');
  const [password, setPassword] = useState<string | ''>('');

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    login(email, password); // Call the login function with email and password
  };

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <h1 className="text-2xl font-bold text-center text-foreground">
        Hello GIS</h1>
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
          onClick={handleLogin} // Call handleLogin function when button is clicked
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
