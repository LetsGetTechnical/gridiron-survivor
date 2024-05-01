'use client';
import React, { useState } from 'react';
import { WeeklyPickButton } from '../../components/WeeklyPickButton/WeeklyPickButton';
import { RadioGroup } from '../../components/RadioGroup/RadioGroup';
import { Button } from '../../components/Button/Button';
import { getUserWeeklyPick, createWeeklyPicks } from '@/api/apiFunctions';
import { account } from '../../api/config';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '../../components/Form/Form';

/////// Edit to include the list of teams or from the API: ///////
const teams = ['Vikings', 'Cowboys'] as const;
//////////////////////////////////////////////////////////////////

const FormSchema = z.object({
  type: z.enum(teams, {
    required_error: 'You need to select a team.',
  }),
});

export default function WeeklyPickForm() {
  // {gameId: string, gameWeekId: string, userResults: string}
  const [userResults, setUserResults] = useState('');

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(JSON.stringify(data, null, 2));

    const result = await account.get();
    const response = await getUserWeeklyPick({
      userId: result.$id,
      weekNumber: '6622c75658b8df4c4612',
    });
    // createWeeklyPicks();
    // console.log(document.querySelectorAll('[aria-label]'));
  }

  return (
    <section className="w-full pt-8">
      <h1 className="pb-8 text-center text-[2rem] font-bold text-white">
        Your pick sheet
      </h1>
      <Form {...form}>
        <form
          className="mx-auto flex w-[90%] max-w-3xl flex-col items-center gap-8"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormItem>
                      <FormControl>
                        <WeeklyPickButton
                          team="Vikings"
                          src="https://cdn.worldvectorlogo.com/logos/minnesota-vikings-2.svg"
                        />
                      </FormControl>
                    </FormItem>
                    <FormItem>
                      <FormControl>
                        <WeeklyPickButton
                          team="Cowboys"
                          src="https://cdn.worldvectorlogo.com/logos/dallas-cowboys-1.svg"
                        />
                      </FormControl>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button label="Submit Button" type="submit" />
        </form>
      </Form>
    </section>
  );
}
