import React from "react";
import { screen, render } from "@testing-library/react";
import TableData from "./TableData";

const columns = [
    {
        header: 'Test Header',
        cell: 'Test Cell',
    },
    {
        header: 'Test Header 2',
        cell: 'Test Cell 2',
    },
    {
        header: 'Test Header 3',
        cell: 'Test Cell 3',
    }
];
const data = [
    {
        text: 'Test',
        text2: 'Test2',
        text3: 'Test3'
    }
];

describe('Table Component', () => {
    it('should render the table component with the columns and data when called', () => {
        render(<TableData columns={columns} data={data} />);

        columns.forEach((column) => {
            const header = screen.getByText(column.header);
            const cell = screen.getByText(column.cell);

            expect(header).toBeInTheDocument();
            expect(cell).toBeInTheDocument();
        });
    })
});