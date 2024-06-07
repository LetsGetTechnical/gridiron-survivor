import { cn } from '@/utils/utils';
import { ILeagueCardTitleProps } from './ILeagueCardTitleProps';
import * as React from 'react';

const LeagueCardTitle = React.forwardRef<
  HTMLHeadingElement,
  ILeagueCardTitleProps
>(({ className, isEliminated, title, ...props }, ref) => (
  <h4
    data-testid="LeagueCardTitle"
    ref={ref}
    className={cn(
      'LeagueCardTitle text-2xl font-semibold leading-none tracking-tight dark:text-zinc-50',
      isEliminated ? 'text-foreground/50' : '',
      className,
    )}
    {...props}
  >
    {title}
  </h4>
));
LeagueCardTitle.displayName = 'LeagueCardTitle';

export { LeagueCardTitle };
