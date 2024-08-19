import { render, screen } from '@testing-library/react';
import LoadingSpinner from './LoadingSpinner';
import React from 'react';

describe('LoadingSpinner', () => {
  it('should render correctly with the proper classes', () => {
    render(<LoadingSpinner />);
    const loadingSpinner = screen.getByTestId('loading-spinner');

    expect(loadingSpinner).toBeInTheDocument();
  });
});
