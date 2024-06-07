import * as React from 'react';
import { cn } from '@/utils/utils';

const LeagueCardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h4
    data-testid="LeagueCardTitle"
    ref={ref}
    className={cn(
      'LeagueCardTitle text-2xl font-semibold leading-none tracking-tight dark:text-zinc-50',
      className,
    )}
    {...props}
  />
));
LeagueCardTitle.displayName = 'LeagueCardTitle';

export { LeagueCardTitle };
