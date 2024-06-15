import { LeagueEntries } from '@/components/LeagueEntries/LeagueEntries';
import { LeagueSurvivors } from '@/components/LeagueSurvivors/LeagueSurvivors';

export default function Leagues() {
  return (
    <div className="Leagues mx-auto max-w-3xl pt-10">
      <header className="place-items-center space-y-2 pb-10 text-center">
        <h1 className="text-3xl font-bold tracking-tight">
          Windy City Smackdown
        </h1>
        <LeagueSurvivors className="text-xl" survivors={12} totalPlayers={12} />
      </header>
      <section className="grid gap-3">
        <h3 className="text-center text-2xl font-semibold tracking-tight">
          Week 2
        </h3>
        <LeagueEntries
          entryNumber={1}
          isPickSet={true}
          leagueName="Windy City Smackdown"
          survivors={20}
          totalPlayers={24}
          weekNumber={3}
        />
        <LeagueEntries
          entryNumber={2}
          leagueName="Windy City Smackdown"
          survivors={20}
          totalPlayers={24}
          weekNumber={3}
        />
        <LeagueEntries
          entryNumber={1}
          leagueName="It's Always Sunny in Minneapolis"
          survivors={11}
          totalPlayers={12}
          weekNumber={3}
        />
        <LeagueEntries
          entryNumber={1}
          leagueName="Diamond Dogs"
          survivors={20}
          totalPlayers={24}
          weekNumber={3}
        />
        <LeagueEntries
          entryNumber={2}
          leagueName="Diamond Dogs"
          survivors={20}
          totalPlayers={24}
          weekNumber={3}
        />
        <LeagueEntries
          entryNumber={3}
          isEliminated={true}
          leagueName="Diamond Dogs"
          survivors={20}
          totalPlayers={24}
          weekNumber={3}
        />
      </section>
    </div>
  );
}
