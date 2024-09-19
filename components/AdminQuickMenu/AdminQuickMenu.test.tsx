import { AdminQuickMenu } from './AdminQuickMenu';
import { render, screen } from '@testing-library/react';
import React from 'react';

describe('AdminQuickMenu Component', () => {
  it('should render the component', () => {
    render(<AdminQuickMenu />);
    const adminQuickMenu = screen.getByTestId('admin-quick-menu');

    expect(adminQuickMenu).toBeInTheDocument();
  });
});
