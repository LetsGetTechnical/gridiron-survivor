import React from "react";
import { screen, render } from "@testing-library/react";
import TableData from "./TableData";
import { ColumnDef } from "@tanstack/react-table";

type mockType = {
    text: string;
    text2: string;
    text3: string;
}

const mockColumns: ColumnDef<mockType>[] = [
    {
        accessorKey: 'text',
        header: 'Test Header',
        cell: ({ row }) => <div>{row.getValue('text')}</div>,
    },
    {
        accessorKey: 'text2',
        header: 'Test Header 2',
        cell: ({ row }) => <div>{row.getValue('text2')}</div>,
    },
    {
        accessorKey: 'text3',
        header: 'Test Header 3',
        cell: ({ row }) => <div>{row.getValue('text3')}</div>,
    }
];

const mockData = [
    {
        text: 'Test',
        text2: 'Test2',
        text3: 'Test3'
    }
];

describe('Table Component', () => {
    it('should render the table component with the columns and data when called', () => {
        render(<TableData columns={mockColumns} data={mockData} />);

        expect(screen.getByText('Test Header')).toBeInTheDocument();
        expect(screen.getByText('Test Header 2')).toBeInTheDocument();
        expect(screen.getByText('Test Header 3')).toBeInTheDocument();

        expect(screen.getByText('Test')).toBeInTheDocument();
        expect(screen.getByText('Test2')).toBeInTheDocument();
        expect(screen.getByText('Test3')).toBeInTheDocument();
    })
});