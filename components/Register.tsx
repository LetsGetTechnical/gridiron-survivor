import { useState, ChangeEvent } from "react";
// import { useRouter } from "next/navigation";
 // Import your initialized Appwrite client
import register  from '@/api/authFunctions'

export default function Register() {
    // const router = useRouter();

    // const [loading, setLoading] = useState<boolean>(false);
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');

    const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
    };

    // const register = async () => {
    //     setLoading(true);
    //     try {
    //         const newUser = await account.create(name, email, password);
    //         console.log('User registered successfully:', newUser);
    //         router.refresh(); // or any other redirection logic
    //     } catch (error) {
    //         console.error('Error registering user:', error);
    //         alert('Failed to register user. Please try again.');
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    return (
        <div>
            <h1 className="text-center text-[28px] mb-4 font-bold">Register</h1>
            <div className="px-6 pb-2">
                <input
                    type="text"
                    value={name}
                    placeholder="Name"
                    onChange={handleNameChange}
                    className="input"
                />
            </div>
            <div className="px-6 pb-2">
                <input
                    type="email"
                    value={email}
                    placeholder="Email address"
                    onChange={handleEmailChange}
                    className="input"
                />
            </div>
            <div className="px-6 pb-2">
                <input
                    type="password"
                    value={password}
                    placeholder="Password"
                    onChange={handlePasswordChange}
                    className="input"
                />
            </div>
            <div className="px-6 pb-2">
                <input
                    type="password"
                    value={confirmPassword}
                    placeholder="Confirm Password"
                    onChange={handleConfirmPasswordChange}
                    className="input"
                />
            </div>
            <div className="px-6 pb-2 mt-6">
                <button
                    onClick={register}
                    className={`flex items-center justify-center w-full text-[17px] font-semibold text-white py-3 rounded-sm
                        ${(!name || !email || !password || !confirmPassword || loading) ? 'bg-gray-200 cursor-not-allowed' : 'bg-[#F02C56]'}
                    `}
                    disabled={!name || !email || !password || !confirmPassword || loading}
                >
                    {loading ? 'Registering...' : 'Register'}
                </button>
            </div>
        </div>
    );
}
