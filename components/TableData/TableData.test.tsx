import React from "react";
import { screen, render } from "@testing-library/react";
import TableData from "./TableData";

const columns = [
    {
        header: 'Test Header',
        cell: 'Test Cell',
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
    })
});