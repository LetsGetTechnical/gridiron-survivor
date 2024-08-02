// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

'use client';

import { JSX, useState } from 'react';
import {
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  useReactTable,
  SortingState,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../Table/Table';
import { ITableData } from './TableData.interface';

/**
 * Alert Notification pop ups.
 * @param props - The page props.
 * @param props.columns - Each column of the data table.
 * @param props.data - Data that goes inside the table.
 * @returns {JSX.Element} The rendered weekly picks page.
 */
const TableData = <TData, TValue>({
  columns,
  data,
}: ITableData<TData, TValue>): JSX.Element => {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
  });

  const tableRows = table.getRowModel().rows;

  return (
    <div className="rounded-md border table-data">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {tableRows?.length ? (
            tableRows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableData;
