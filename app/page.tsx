import AuthButton from '../components/AuthButton';
import { getWeeklyPicks } from '@/crudFuncs/weeklyPicks/getWeeklyPicks';
import React from "react";

export default function Index() {

  getWeeklyPicks();

  return (
    <div className="flex flex-col items-center justify-center flex-1 w-full">
      <nav className="flex flex-col items-center justify-center flex-1 w-full">
        <p className='pb-4'>Gridiron Survivor</p>
      </nav>
    </div>
  );
}
