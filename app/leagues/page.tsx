import {
  LeagueCard,
  LeagueCardHeader,
  LeagueCardTitle,
  LeagueCardSurvivors,
  LeagueCardContent,
} from '@/components/LeagueCard/LeagueCard';

export default function Leagues() {
  return (
    <div className="leagues">
      <h1 className="pb-10 text-center text-3xl font-bold tracking-tight">
        Your leagues
      </h1>
      <section className="grid gap-6 md:grid-cols-2">
        <LeagueCard>
          <LeagueCardContent />
          <LeagueCardHeader>
            <LeagueCardTitle>LeagueCard Title</LeagueCardTitle>
            <LeagueCardSurvivors />
          </LeagueCardHeader>
        </LeagueCard>
        <LeagueCard>
          <LeagueCardContent />
          <LeagueCardHeader>
            <LeagueCardTitle>LeagueCard Title</LeagueCardTitle>
            <LeagueCardSurvivors />
          </LeagueCardHeader>
        </LeagueCard>
        <LeagueCard isEliminated={true}>
          <LeagueCardContent />
          <LeagueCardHeader>
            <LeagueCardTitle>LeagueCard Title</LeagueCardTitle>
            <LeagueCardSurvivors />
          </LeagueCardHeader>
        </LeagueCard>
      </section>
    </div>
  );
}
