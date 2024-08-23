// /Users/ryanfurrer/Developer/GitHub/gridiron-survivor/app/(admin)/admin/notifications/page.test.tsx

import { render, screen } from '@testing-library/react';
import AdminNotifications from './page';
import React from 'react';

describe('Admin notifications page', () => {
  it(`should render it's content`, () => {
    render(<AdminNotifications />);
    const adminNotificationsContent = screen.getByTestId(
      'admin-notifications-content',
    );
    expect(adminNotificationsContent).toBeInTheDocument();
  });
});
