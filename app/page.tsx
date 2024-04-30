import AuthButton from '../components/AuthButton';
import { getUserWeeklyPick } from "../api/apiFunctions";

export default function Index() {

  getUserWeeklyPick('66281d5ec5614f76bc91', 1);

  return (
    <div className="flex flex-col items-center justify-center flex-1 w-full">
      <nav className="flex flex-col items-center justify-center flex-1 w-full">
    <div className="flex flex-col items-center justify-center flex-1 w-full">
      <nav className="flex flex-col items-center justify-center flex-1 w-full">
        <p>Gridiron Survivor</p>
      </nav>
    </div>
  );
}