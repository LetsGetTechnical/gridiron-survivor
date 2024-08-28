// /Users/ryanfurrer/Developer/GitHub/gridiron-survivor/app/(admin)/admin/notifications/page.test.tsx

import { render, screen } from '@testing-library/react';
import AdminPlayers from './page';
import React from 'react';

describe('Admin players page', () => {
  it(`should render it's content`, () => {
    render(<AdminPlayers />);
    const adminNotificationsContent = screen.getByTestId(
      'admin-players-content',
    );
    expect(adminNotificationsContent).toBeInTheDocument();
  });
});
