import Image from 'next/image';
import placeholderImage from '@/public/assets/team-logo-placeholder.jpg';
import {
  LeagueCard,
  LeagueCardHeader,
  LeagueCardTitle,
  LeagueCardDescription,
  LeagueCardImage,
} from '@/components/LeagueCard/LeagueCard';

export default function Leagues() {
  return (
    <div>
      <h1 className="pb-10 text-center text-3xl font-bold leading-[-3%]">
        Your leagues
      </h1>
      <section className="grid gap-6 md:grid-cols-2">
        <LeagueCard>
          <LeagueCardImage />
          <LeagueCardHeader>
            <LeagueCardTitle>LeagueCard Title</LeagueCardTitle>
            <LeagueCardDescription>
              LeagueCard Description
            </LeagueCardDescription>
          </LeagueCardHeader>
        </LeagueCard>
        <LeagueCard>
          <LeagueCardImage />
          <LeagueCardHeader>
            <LeagueCardTitle>LeagueCard Title</LeagueCardTitle>
            <LeagueCardDescription>
              LeagueCard Description
            </LeagueCardDescription>
          </LeagueCardHeader>
        </LeagueCard>
        <LeagueCard isEliminated>
          <LeagueCardImage />
          <LeagueCardHeader>
            <LeagueCardTitle>LeagueCard Title</LeagueCardTitle>
            <LeagueCardDescription>
              LeagueCard Description
            </LeagueCardDescription>
          </LeagueCardHeader>
        </LeagueCard>
      </section>
    </div>
  );
}
