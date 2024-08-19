import { AdminHeader } from './AdminHeader';
import { render, screen } from '@testing-library/react';
import React from 'react';

describe('AdminHeader Component', () => {
  it('should render with the correct elements', () => {
    render(<AdminHeader />);
    const headerElement = screen.getByTestId('admin-header');
    const headingElement = screen.getByTestId('admin-header-heading');
    const paragraphElement = screen.getByTestId('admin-header-description');

    expect(headerElement).toBeInTheDocument();
    expect(headingElement).toBeInTheDocument();
    expect(paragraphElement).toBeInTheDocument();
  });
});
