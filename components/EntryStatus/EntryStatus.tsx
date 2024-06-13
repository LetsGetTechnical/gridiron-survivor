import { cn } from '@/utils/utils';
import * as React from 'react';
import { IEntryStatusProps } from './EntryStatus.interface';

export const EntryStatus = ({
  isEliminated = false,
}: IEntryStatusProps): JSX.Element => {
  return (
    <div
      className={cn(
        'rounded-full px-2 py-1 text-xs uppercase text-zinc-800',
        isEliminated ? 'bg-red-500' : 'bg-green-500',
      )}
    >
      <p>{isEliminated ? 'eliminated' : `alive`}</p>
    </div>
  );
};
