// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { ILeague } from '@/api/apiFunctions.interface';

export interface IEntryWithLeague extends ILeague {
  aliveEntries: number;
  totalEntries: number;
}
