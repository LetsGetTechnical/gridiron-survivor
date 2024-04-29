import { getWeeklyPicks } from "@/api/authFunctions";

export default function Index() {

  getWeeklyPicks()
  return (
    <div className="flex w-full flex-1 flex-col items-center justify-center">
      <nav className="flex w-full flex-1 flex-col items-center justify-center">
        <p>Gridiron Survivor</p>
        <AuthButton />
      </nav>
    </div>
  );
}
