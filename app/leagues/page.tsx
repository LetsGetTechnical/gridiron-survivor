import {
  LeagueCard,
  LeagueCardHeader,
  LeagueCardTitle,
  LeagueCardDescription,
  LeagueCardContent,
} from '@/components/LeagueCard/LeagueCard';

export default function Leagues() {
  return (
    <div className="leagues">
      <h1 className="pb-10 text-center text-3xl font-bold leading-[-3%]">
        Your leagues
      </h1>
      <section className="grid gap-6 md:grid-cols-2">
        <LeagueCard>
          <LeagueCardContent />
          <LeagueCardHeader>
            <LeagueCardTitle>LeagueCard Title</LeagueCardTitle>
            <LeagueCardDescription />
          </LeagueCardHeader>
        </LeagueCard>
        <LeagueCard>
          <LeagueCardContent />
          <LeagueCardHeader>
            <LeagueCardTitle>LeagueCard Title</LeagueCardTitle>
            <LeagueCardDescription />
          </LeagueCardHeader>
        </LeagueCard>
        <LeagueCard isEliminated={true}>
          <LeagueCardContent />
          <LeagueCardHeader>
            <LeagueCardTitle>LeagueCard Title</LeagueCardTitle>
            <LeagueCardDescription />
          </LeagueCardHeader>
        </LeagueCard>
      </section>
    </div>
  );
}
