import { LeagueEntries } from '@/components/LeagueEntries/LeagueEntries';

export default function Leagues() {
  return (
    <div className="Leagues mx-auto max-w-3xl pt-10">
      <h1 className="pb-10 text-center text-3xl font-bold tracking-tight">
        Your league entries
      </h1>
      <section className="grid gap-3">
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
