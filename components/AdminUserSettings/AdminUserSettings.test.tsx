import { AdminUserSettings } from './AdminUserSettings';
import { render, screen } from '@testing-library/react';
import React from 'react';

describe('AdminUserSettings Component', () => {
  it('should render the AdminUserSettings component', () => {
    render(<AdminUserSettings />);
    const adminUserSettings = screen.getByTestId('admin-user-settings');

    expect(adminUserSettings).toBeInTheDocument();
  });
});
