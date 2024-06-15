// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { cn } from '@/utils/utils';
import { IEntryStatusProps } from './EntryStatus.interface';
import * as React from 'react';

/**
 * @param root0 By default, isEliminated is false
 * @param root0.isEliminated If true, the user is flagged as eliminated
 * @returns EntryStatus component
 */
export const EntryStatus = ({
  isEliminated = false,
}: IEntryStatusProps): React.JSX.Element => {
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
