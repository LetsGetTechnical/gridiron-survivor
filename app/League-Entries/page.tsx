import { LeagueCardSurvivors } from '@/components/LeagueCardSurvivors/LeagueCardSurvivors';
import { LeagueEntries } from '@/components/LeagueEntries/LeagueEntries';

export default function Leagues() {
  return (
    <div className="Leagues mx-auto max-w-3xl pt-10">
      <header className="place-items-center space-y-2 pb-10 text-center">
        <h1 className=" text-3xl font-bold tracking-tight">
          Windy City Smackdown
        </h1>
        <LeagueCardSurvivors survivors={12} totalPlayers={12} />
      </header>
      <section className="grid gap-3">
        <h3 className="text-center text-2xl font-semibold tracking-tight">
          Week 2
        </h3>
        <LeagueEntries
          entryNumber={1}
          isPickSet={true}
          survivors={20}
          leagueName="Windy City Smackdown"
          totalPlayers={24}
          weekNumber={3}
        />
        <LeagueEntries
          entryNumber={2}
          survivors={20}
          leagueName="Windy City Smackdown"
          totalPlayers={24}
          weekNumber={3}
        />
        <LeagueEntries
          entryNumber={1}
          survivors={11}
          leagueName="It's Always Sunny in Minneapolis"
          totalPlayers={12}
          weekNumber={3}
        />
        <LeagueEntries
          entryNumber={1}
          survivors={20}
          leagueName="Diamond Dogs"
          totalPlayers={24}
          weekNumber={3}
        />
        <LeagueEntries
          entryNumber={2}
          survivors={20}
          leagueName="Diamond Dogs"
          totalPlayers={24}
          weekNumber={3}
        />
        <LeagueEntries
          entryNumber={3}
          isEliminated={true}
          survivors={20}
          leagueName="Diamond Dogs"
          totalPlayers={24}
          weekNumber={3}
        />
      </section>
    </div>
  );
}
