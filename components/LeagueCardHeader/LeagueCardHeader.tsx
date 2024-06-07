import * as React from 'react';
import { cn } from '@/utils/utils';

const LeagueCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    data-testid="LeagueCardHeader"
    ref={ref}
    className={cn('LeagueCardHeader flex flex-col space-y-1.5', className)}
    {...props}
  />
));
LeagueCardHeader.displayName = 'LeagueCardHeader';

export { LeagueCardHeader };
