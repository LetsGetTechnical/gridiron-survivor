import { cn } from '@/utils/utils';
import { IEntryStatusProps } from './EntryStatus.interface';
import * as React from 'react';

export const EntryStatus = ({
  isEliminated = false,
}: IEntryStatusProps): JSX.Element => {
  return (
    <div
      className={cn(
        'rounded-full px-2 py-1 text-xs uppercase text-zinc-800',
        isEliminated ? 'bg-red-500' : 'bg-green-500',
      )}
      data-testid="EntryStatus"
    >
      <p>{isEliminated ? 'eliminated' : `alive`}</p>
    </div>
  );
};
