// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { Button } from '../../Button/Button';
import { ColumnDef } from '@tanstack/react-table';
import { ChevronsUpDown, MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../TableDropDownMenu/TableDropDownMenu';
import { JSX } from 'react';
import { IPlayerEntryData } from './PlayerColumns.interface';

export const playerColumns: ColumnDef<IPlayerEntryData>[] = [
  {
    accessorKey: 'entryUser',
    header: 'User',
    /**
     * Value of row.
     * @param {object} row - The row data.
     * @param {object} row.row - The row definition
     * @returns {JSX.Element} - The cell component.
     */
    cell: ({ row }) => <div>{row.getValue('entryUser')}</div>,
  },
  {
    accessorKey: 'entryName',

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
          Entries
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
    cell: ({ row }) => <div>{row.getValue('entryName')}</div>,
  },
  {
    accessorKey: 'entrySelectedTeams',

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
          SelectedTeams
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
    cell: ({ row }) => <div>{row.getValue('entrySelectedTeams')}</div>,
  },
  {
    accessorKey: 'entryEliminated',

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
          Eliminated?
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
    cell: ({ row }) => <div>{row.getValue('entryEliminated')}</div>,
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
