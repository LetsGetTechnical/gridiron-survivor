'use client'
import useAuthFunctions from '@/api/authFunctions'

export default function Dashboard() {
  const { logout } = useAuthFunctions();

  return (
    <div>home

<button onClick={logout}
className = "flex items-center justify-center w-full text-[17px] font-semibold text-green py-3 rounded-sm">
                    Logout
                </button>
    </div>
  )
}

