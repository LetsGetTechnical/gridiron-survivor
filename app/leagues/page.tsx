import { LeagueCard } from '@/components/LeagueCard/LeagueCard';

export default function Leagues() {
  return (
    <div className="Leagues">
      <h1 className="pb-10 text-center text-3xl font-bold tracking-tight">
        Your leagues
      </h1>
      <section className="grid gap-6 md:grid-cols-2">
        <LeagueCard
          href="/leagues"
          survivors={11}
          title="League 1"
          totalPlayers={12}
        />
        <LeagueCard
          href="/leagues"
          survivors={20}
          title="League 2"
          totalPlayers={24}
        />
        <LeagueCard
          href="/leagues"
          isEliminated={true}
          survivors={11}
          title="League 3"
          totalPlayers={12}
        />
      </section>
    </div>
  );
}
