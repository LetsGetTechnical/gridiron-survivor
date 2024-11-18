// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

'use client';

import { Button } from '../../Button/Button';
import { ColumnDef } from '@tanstack/react-table';
import { ChevronsUpDown, MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../TableDropDownMenu/TableDropDownMenu';
import { IEntryWithLeague } from './LeagueColumns.interface';
import { JSX } from 'react';

export type LeagueDetailsHeader = {
  text: string;
  text2: string;
  text3: string;
  text4: string;
};

export type PlayersHeader = {
  text: string;
  text2: string;
  text3: string;
  text4: string;
};

export const leagueDetailsColumns: ColumnDef<LeagueDetailsHeader>[] = [
  {
    accessorKey: 'text',
    header: 'User',
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
          Entry #
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
          Pick Made
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
    accessorKey: 'text4',

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
          Surviving?
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
    cell: ({ row }) => <div>{row.getValue('text2')}</div>,
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

export const leagueColumns: ColumnDef<IEntryWithLeague>[] = [
  {
    accessorKey: 'leagueName',
    header: 'League Name',
    /**
     * Value of row.
     * @param {object} row - The row data.
     * @param {object} row.row - The row definition
     * @returns {JSX.Element} - The cell component.
     */
    cell: ({ row }) => <span>{row.getValue('leagueName')}</span>,
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
          # of Survivors
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
    cell: ({ row }): JSX.Element => {
      const survivors = row.getValue('survivors') as string[];
      return <span>{survivors.length}</span>;
    },
    /**
     * To be able to sort the row by numbers.
     * @param rowA - Example 1 of survivors in a league.
     * @param rowB - Example 2 of survivors in a league.
     * @returns - Length of each participants league to be able to accurately sort.
     */
    sortingFn: (rowA, rowB): number => {
      const lengthA = (rowA.getValue('survivors') as string[]).length;
      const lengthB = (rowB.getValue('survivors') as string[]).length;
      return lengthA - lengthB;
    },
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
          # of Participants
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
    cell: ({ row }): JSX.Element => {
      const participants = row.getValue('participants') as string[];
      return <span>{participants.length}</span>;
    },
    /**
     * To be able to sort the row by numbers.
     * @param rowA - Example 1 of participants in a league.
     * @param rowB - Example 2 of participants in a league.
     * @returns - Length of each participants league to be able to accurately sort.
     */
    sortingFn: (rowA, rowB): number => {
      const lengthA = (rowA.getValue('participants') as string[]).length;
      const lengthB = (rowB.getValue('participants') as string[]).length;
      return lengthA - lengthB;
    },
  },
  {
    accessorKey: 'totalEntries',

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
          Total Entries
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
    cell: ({ row }): JSX.Element => {
      const totalEntries = row.getValue('totalEntries') as number;
      return <span>{totalEntries}</span>;
    },
  },
  {
    accessorKey: 'aliveEntries',

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
          Entries Still Alive
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
    cell: ({ row }): JSX.Element => {
      const aliveEntries = row.getValue('aliveEntries') as number;
      return <span>{aliveEntries}</span>;
    },
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
