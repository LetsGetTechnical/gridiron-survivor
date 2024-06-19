// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { cn } from '@/utils/utils';
import { IEntryStatusProps } from './EntryStatus.interface';
import React from 'react';

/**
 * Tells the user if their LeagueEntry is currently alive or eliminated
 * @param props - The props for EntryStatus
 * @param props.isEliminated If true, the user is flagged as eliminated
 * @returns { React.JSX.Element} - the rendered entry status
 */
export const EntryStatus = ({
  isEliminated = false,
}: IEntryStatusProps): React.JSX.Element => {
  return (
    <div
      className={cn(
        'entry-status rounded-full px-2 py-1 text-xs uppercase text-zinc-800',
        isEliminated ? 'bg-red-500' : 'bg-green-500',
      )}
      data-testid="entry-status"
    >
      <p>{isEliminated ? 'eliminated' : 'alive'}</p>
    </div>
  );
};
