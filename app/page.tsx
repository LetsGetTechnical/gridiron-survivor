// import AuthButton from '../components/AuthButton';
import { createWeeklyPicks,  getUserWeeklyPick } from "../api/apiFunctions"

export default function Index() {

  getUserWeeklyPick('66281d5ec5614f76bc91', 1)
  // createWeeklyPicks({gameWeekId: "6622c7596558b090872b",gameId: "66311a210039f0532044", userResults: "{\"66281d5ec5614f76bc91\":{\"team\":\"66218f22b40deef340f8\",\"correct\":false},\"6628077faeeedd272637\":{\"team\":\"6621b30ea57bd075e9d3\",\"correct\":false}, \"66174f2362ec891167be\":{\"team\": \"6621b30ea57bd075e9d3\", \"correct\":true}}"})

  const response = {
  '66281d5ec5614f76bc91':{'team':'66218f22b40deef340f8','correct':false},
  '6628077faeeedd272637':{'team':'6621b30ea57bd075e9d3','correct':false},
  '66174f2362ec891167be':{'team': '6621b30ea57bd075e9d3', 'correct':true}
  }
  return (
    <div className="flex flex-col items-center justify-center flex-1 w-full">
      <nav className="flex flex-col items-center justify-center flex-1 w-full">
        <p>Gridiron Survivor</p>
        {/* <AuthButton /> */}
      </nav>
    </div>
  );
}