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
          leagueCardLogo="https://ryanfurrer.com/_astro/logo-dark-theme.CS8e9u7V_JfowQ.svg" // should eventually be something like league.logo
          survivors={69}
          title="69ers"
          totalPlayers={138}
        />
        <LeagueCard
          isEliminated={true}
          href="/leagues"
          survivors={69}
          title="69ers"
          totalPlayers={138}
        />

        <LeagueCard
          href="/leagues"
          survivors={11}
          title="It's Always Sunny in Minneapolis"
          totalPlayers={12}
        />
        <LeagueCard
          href="/leagues"
          survivors={20}
          title="Windy City Smackdown"
          totalPlayers={24}
        />
        <LeagueCard
          href="/leagues"
          isEliminated={true}
          survivors={11}
          title="Diamond Dogs"
          totalPlayers={12}
        />
      </section>
    </div>
  );
}
