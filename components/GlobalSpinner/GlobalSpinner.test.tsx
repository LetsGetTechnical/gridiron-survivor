import { render, screen } from '@testing-library/react';
import GlobalSpinner from './GlobalSpinner';
import React from 'react';

describe('GlobalSpinner', () => {
  beforeEach(() => {
    render(<GlobalSpinner />);
  });
  it('should render without errors', () => {
    const globalSpinner = screen.getByTestId('global-spinner');
    expect(globalSpinner).toBeInTheDocument();
  });

  it('should have the correct file path', () => {
    const spinnerImage = screen.getByTestId('global-spinner-image');
    const filePath = spinnerImage.getAttribute('src');
    expect(filePath).toMatch('/assets/global-spinner.svg');
  });
});
