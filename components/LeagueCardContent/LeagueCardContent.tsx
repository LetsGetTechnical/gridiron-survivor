import { cn } from '@/utils/utils';
import * as React from 'react';
import Image from 'next/image';
import placeholderImage from './placeholderImage.svg';

const LeagueCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    className={cn('LeagueCardContent', className)}
    data-testid="LeagueCardContent"
    ref={ref}
    {...props}
  >
    <Image
      alt="League Logo"
      className="LeagueCardImage h-24 w-24 rounded-xl"
      data-testid="LeagueCardImage"
      src={placeholderImage}
    />
  </div>
));
LeagueCardContent.displayName = 'LeagueCardContent';

export { LeagueCardContent };
