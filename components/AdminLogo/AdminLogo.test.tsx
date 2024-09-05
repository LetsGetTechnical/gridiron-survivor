import { AdminLogo } from './AdminLogo';
import { render, screen } from '@testing-library/react';
import React from 'react';

describe('AdminLogo Component', () => {
  it('should render properly with the correct elements', () => {
    render(<AdminLogo />);
    const adminLogo = screen.getByTestId('admin-logo');

    expect(adminLogo).toBeInTheDocument();
  });
});
