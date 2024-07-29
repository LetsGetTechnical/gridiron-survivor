// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { ColumnDef, RowData } from '@tanstack/react-table';

export interface ITableData {
  columns: ColumnDef<RowData, unknown>[];
  data: RowData[];
}
