// import AuthButton from '../components/AuthButton';
import { createWeeklyPicks, getWeeklyPicks } from '@/api/apiFunctions';

export default function Index() {

  createWeeklyPicks({gameWeekId: "6622c75658b8df4c4612",gameId: "66311a210039f0532044", usersResults: "{'66281d5ec5614f76bc91':{'team':'66218f22b40deef340f8','correct':false},'6628077faeeedd272637':{'team':'6621b30ea57bd075e9d3','correct':false}}"})
  getWeeklyPicks();

  return (
    <div className="flex flex-col items-center justify-center flex-1 w-full">
      <nav className="flex flex-col items-center justify-center flex-1 w-full">
        <p>Gridiron Survivor</p>
        {/* <AuthButton /> */}
      </nav>
    </div>
  );
}