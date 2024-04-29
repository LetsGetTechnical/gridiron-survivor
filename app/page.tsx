import { getWeeklyPicks } from "../api/apiFunctions";

export default function Index() {

  getWeeklyPicks()
  return (
    <div className="flex w-full flex-1 flex-col items-center justify-center">
      <nav className="flex w-full flex-1 flex-col items-center justify-center">
        <p>Gridiron Survivor</p>
      </nav>
    </div>
  );
}
