import { AdminNav } from './AdminNav';
import { render, screen } from '@testing-library/react';
import React from 'react';

describe('AdminNav Component', () => {
  beforeEach(() => {
    render(<AdminNav />);
  });

  it('should render the navigation links with correct href attributes', () => {
    const homeLink = screen.getByText('Home').closest('a');
    const leaguesLink = screen.getByText('Leauges').closest('a');
    const playersLink = screen.getByText('Players').closest('a');
    const notificationsLink = screen.getByText('Notifications').closest('a');

    expect(homeLink).toHaveAttribute('href', '/admin');
    expect(leaguesLink).toHaveAttribute('href', '/admin/leagues');
    expect(playersLink).toHaveAttribute('href', '/admin/players');
    expect(notificationsLink).toHaveAttribute('href', '/admin/notifications');
  });

  it('should render the AdminUserSettings component', () => {
    const adminUserSettings = screen.getByTestId('admin-user-settings');

    expect(adminUserSettings).toBeInTheDocument();
  });
});