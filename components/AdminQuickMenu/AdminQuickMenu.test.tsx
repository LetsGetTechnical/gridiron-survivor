import { AdminQuickMenu } from './AdminQuickMenu';
import { render, screen } from '@testing-library/react';
import React from 'react';

describe('AdminQuickMenu Component', () => {
  it('should render the component', () => {
    render(<AdminQuickMenu />);
    const adminUserSettings = screen.getByTestId('admin-quick-menu');

    expect(adminUserSettings).toBeInTheDocument();
  });
});
