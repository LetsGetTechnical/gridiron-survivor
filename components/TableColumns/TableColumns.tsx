// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

'use client';

import React, { JSX } from 'react';
import { Button } from '../Button/Button';
import { ColumnDef } from '@tanstack/react-table';
import { ChevronsUpDown, MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../TableDropDownMenu/TableDropDownMenu';

export type Header = {
  leagueName: string;
  participants: number;
  survivors: number;
};

export const columns: ColumnDef<Header>[] = [
  {
    accessorKey: 'leagueName',
    header: 'League Name',
    /**
     * Value of row.
     * @param {object} row - The row data.
     * @param {object} row.row - The row definition
     * @returns {JSX.Element} - The cell component.
     */
    cell: ({ row }) => <div>{row.getValue('leagueName')}</div>,
  },
  {
    accessorKey: 'participants',

    /**
     * Value of row.
     * @param {object} column - The column data.
     * @param {object} column.column - The column definition
     * @returns {JSX.Element} - The cell component.
     */
    header: ({ column }): JSX.Element => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Participants
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },

    /**
     * Value of row.
     * @param {object} row - The row data.
     * @param {object} row.row - The row definition
     * @returns {JSX.Element} - The cell component.
     */
    cell: ({ row }) => <div>{row.getValue('participants')}</div>,
  },
  {
    accessorKey: 'survivors',

    /**
     * Value of row.
     * @param {object} column - The column data.
     * @param {object} column.column - The column definition
     * @returns {JSX.Element} - The cell component.
     */
    header: ({ column }): JSX.Element => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Survivors
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },

    /**
     * Value of row.
     * @param {object} row - The row data.
     * @param {object} row.row - The row definition
     * @returns {JSX.Element} - The cell component.
     */
    cell: ({ row }) => <div>{row.getValue('survivors')}</div>,
  },
  {
    id: 'actions',

    /**
     * Admin action dropdown.
     * @returns {JSX.Element} - The cell component.
     */
    cell: (): JSX.Element => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>View</DropdownMenuItem>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
