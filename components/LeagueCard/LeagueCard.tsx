import * as React from 'react';
import { cn } from '@/utils/utils';
import clsx from 'clsx';
import Image from 'next/image';
import placeholderImage from './placeHOlderImage.svg';

interface ILeagueCardProps extends React.HTMLAttributes<HTMLDivElement> {
  isEliminated?: boolean;
}

const LeagueCard = React.forwardRef<
  ILeagueCardProps,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, isEliminated = false, ...props }, ref) => (
  <div
    ref={ref}
    className={clsx(
      'flex h-32 place-items-center gap-6 rounded-lg border bg-card p-4 text-card-foreground shadow-sm dark:border-zinc-800',
      className,
      { 'LeagueCardEliminated opacity-50 dark:bg-zinc-700': isEliminated },
    )}
    {...props}
  />
));
LeagueCard.displayName = 'LeagueCard';

const LeagueCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5', className)}
    {...props}
  />
));
LeagueCardHeader.displayName = 'LeagueCardHeader';

const LeagueCardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h4
    ref={ref}
    className={cn(
      'text-2xl font-semibold leading-none tracking-tight dark:text-zinc-50',
      className,
    )}
    {...props}
  />
));
LeagueCardTitle.displayName = 'LeagueCardTitle';

const LeagueCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn('text-sm text-foreground', className)} {...props}>
    Survivors 11
    <span className="text-muted-foreground dark:text-zinc-50/50"> / 12</span>
  </p>
));
LeagueCardDescription.displayName = 'LeagueCardDescription';

const LeagueCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn(className)} {...props} />
));
LeagueCardContent.displayName = 'LeagueCardContent';

const LeagueCardImage = React.forwardRef<
  HTMLImageElement,
  React.HTMLAttributes<HTMLImageElement>
>(({ className, ...props }) => (
  <LeagueCardContent>
    <Image
      src={placeholderImage}
      alt="test"
      className="h-24 w-24 rounded-xl"
      {...props}
    />
  </LeagueCardContent>
));
LeagueCardImage.displayName = 'LeagueCardImage';

export {
  LeagueCard,
  LeagueCardHeader,
  LeagueCardTitle,
  LeagueCardDescription,
  LeagueCardContent,
  LeagueCardImage,
};
