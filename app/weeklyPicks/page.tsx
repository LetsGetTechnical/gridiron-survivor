"use client"
import React from 'react'
import { WeeklyPickButton } from '../../components/WeeklyPickButton/WeeklyPickButton' //comment out
import { RadioGroup } from '../../components/RadioGroup/RadioGroup';
import { Button } from '../../components/Button/Button';
import { getUserWeeklyPick, createWeeklyPicks } from '@/api/apiFunctions';
import {account} from "../../api/config"

export default function WeeklyPick(){

  // {gameId: string, gameWeekId: string, userResults: string}

    return (
    <section className="pt-8 w-[48rem]">
      <h1 className="font-bold text-white text-[2rem] text-center pb-8">Your pick sheet</h1>

      <form id="" name="" className="w-[48rem] items-center flex flex-col gap-8" onSubmit={async()=>{
            const result = await account.get();
            const response = await getUserWeeklyPick({userId: result.$id, weekNumber: "6622c75658b8df4c4612"});
            // createWeeklyPicks();
          }}>

          <RadioGroup className="max-w-full" name="pick">
            <WeeklyPickButton team="Vikings" src="https://cdn.worldvectorlogo.com/logos/minnesota-vikings-2.svg"
            />

            <WeeklyPickButton team="Cowboys" src="https://cdn.worldvectorlogo.com/logos/dallas-cowboys-1.svg"
            />
          </RadioGroup>


          <Button label="Submit Button" typeof="submit"/>
      </form>

      </section>
    );
  };

