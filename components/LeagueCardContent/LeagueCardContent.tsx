import * as React from 'react';
import { cn } from '@/utils/utils';
import Image from 'next/image';
import placeholderImage from './placeholderImage.svg';

const LeagueCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    data-testid="LeagueCardContent"
    ref={ref}
    className={cn('LeagueCardContent', className)}
    {...props}
  >
    <Image
      data-testid="LeagueCardImage"
      src={placeholderImage}
      alt="test"
      className="LeagueCardImage h-24 w-24 rounded-xl"
    />
  </div>
));
LeagueCardContent.displayName = 'LeagueCardContent';

export { LeagueCardContent };
