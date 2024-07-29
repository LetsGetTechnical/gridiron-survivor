// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { ColumnDef } from '@tanstack/react-table';

export interface ITableData<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}
