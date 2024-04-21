'use client'

import AuthButton from '../components/AuthButton';

import { useState } from "react";
import Register from '@/components/Register';

const Index = () => {

  let [isRegister, setIsRegister] = useState<boolean>(false)

  return (
    // <div className="flex flex-col items-center justify-center flex-1 w-full">
    //   <nav className="flex flex-col items-center justify-center flex-1 w-full">
    //     <p>Gridiron Survivor</p>

    //       {isRegister ? <Register /> : <AuthButton />}

    //      <AuthButton /> 
    //   </nav>
    // </div>

    <>
    <div 
        id="AuthOverlay" 
        className="fixed flex items-center justify-center z-50 top-0 left-0 w-full h-full bg-black bg-opacity-50"
    >
        <div className="relative bg-white w-full max-w-[470px] h-[70%] p-4 rounded-lg">

           

            {isRegister ? <Register /> : <AuthButton />}

            <div className="absolute flex items-center justify-center py-5 left-0 bottom-0 border-t w-full">
                <span className="text-[14px] text-gray-600">Don’t have an account?</span>

                <button onClick={() => setIsRegister(isRegister = !isRegister)} className="text-[14px] text-[#F02C56] font-semibold pl-1" >
                    <span>{!isRegister ? 'Register' : 'log in'}</span>
                </button>
            </div>

        </div>
    </div>
</>
  );
}

export default Index;
