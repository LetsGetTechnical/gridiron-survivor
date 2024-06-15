import { EntryStatus } from './EntryStatus';
import { render, screen } from '@testing-library/react';
import React from 'react';

describe('EntryStatus', () => {
  it('renders correctly if user is not eliminated', () => {
    render(<EntryStatus />);

    const entryStatus = screen.getByTestId('EntryStatus');

    expect(entryStatus).toBeInTheDocument();
    expect(entryStatus).toHaveTextContent('alive');
  });
  it('renders correctly if user is eliminated', () => {
    render(<EntryStatus isEliminated={true} />);

    const entryStatus = screen.getByTestId('EntryStatus');

    expect(entryStatus).toBeInTheDocument();
    expect(entryStatus).toHaveTextContent('eliminated');
  });
});
