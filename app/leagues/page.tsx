import { LeagueCard } from '@/components/LeagueCard/LeagueCard';
import { LeagueCardContent } from '@/components/LeagueCardContent/LeagueCardContent';
import { LeagueCardHeader } from '@/components/LeagueCardHeader/LeagueCardHeader';
import { LeagueCardSurvivors } from '@/components/LeagueCardSurvivors/LeagueCardSurvivors';
import { LeagueCardTitle } from '@/components/LeagueCardTitle/LeagueCardTitle';

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
