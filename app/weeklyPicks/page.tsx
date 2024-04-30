"use client"
import React, {useState} from 'react'
import { WeeklyPickButton } from '../../components/WeeklyPickButton/WeeklyPickButton' //comment out
import { RadioGroup } from '../../components/RadioGroup/RadioGroup';
import { Button } from '../../components/Button/Button';
import { getUserWeeklyPick, createWeeklyPicks } from '@/api/apiFunctions';
import {account} from "../../api/config"

export default function WeeklyPick(){

  // {gameId: string, gameWeekId: string, userResults: string}
    const [userResults, setUserResults] = useState("");

    return (
    <section className="items-center flex flex-col gap-8 pt-8 w-[48rem]">
      <h1 className="font-bold text-white text-[2rem]">Your pick sheet</h1>
          <RadioGroup className="max-w-full" aria-checked="true" data-state="checked" tabIndex={0}>
            <WeeklyPickButton team="Vikings" src="https://cdn.worldvectorlogo.com/logos/minnesota-vikings-2.svg" />

            <WeeklyPickButton team="Cowboys" src="https://cdn.worldvectorlogo.com/logos/dallas-cowboys-1.svg"/>
          </RadioGroup>
          <Button label="Submit Button" onClick={async()=>{
            const data = await getUserWeeklyPick({userId: "66281d5ec5614f76bc91", weekNumber: "6622c75658b8df4c4612"});
            const result = await account.get();
            console.log(result);
          }}/>
      </section>
    );
  };

