import * as React from 'react';
import { cn } from '@/utils/utils';

const LeagueCardSurvivors = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    data-testid="LeagueCardSurvivors"
    ref={ref}
    className={cn('LeagueCardSurvivors text-sm text-foreground', className)}
    {...props}
  >
    Survivors 11
    <span className="text-muted-foreground dark:text-zinc-50/50"> / 12</span>
  </p>
));
LeagueCardSurvivors.displayName = 'LeagueCardSurvivors';

export { LeagueCardSurvivors };
