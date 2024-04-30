import { getUserWeeklyPick } from "../api/apiFunctions";

export default function Index() {

  getUserWeeklyPick({userId: '66281d5ec5614f76bc91',weekNumber: "6622c75658b8df4c4612"});

  return (
    <div className="flex flex-col items-center justify-center flex-1 w-full">
      <nav className="flex flex-col items-center justify-center flex-1 w-full">
        <p>Gridiron Survivor</p>
      </nav>
    </div>
  );
}