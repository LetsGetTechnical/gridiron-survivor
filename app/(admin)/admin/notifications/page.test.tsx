// /Users/ryanfurrer/Developer/GitHub/gridiron-survivor/app/(admin)/admin/notifications/page.test.tsx

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AdminNotifications from './page';
import React from 'react';
import { sendEmailNotifications } from './actions/sendEmailNotification';

let subjectInput: HTMLInputElement,
  contentInput: HTMLInputElement,
  emailButton: HTMLElement;

jest.mock('./actions/sendEmailNotification', () => ({
  sendEmailNotifications: jest.fn(),
}));

describe('Admin notifications page', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    render(<AdminNotifications />);

    subjectInput = screen.getByTestId('subject-text');
    contentInput = screen.getByTestId('content-text');
    emailButton = screen.getByTestId('send-email');
  });
  it(`should render it's content`, () => {
    (sendEmailNotifications as jest.Mock).mockResolvedValue({});

    const adminNotificationsContent = screen.getByTestId(
      'admin-notifications-content',
    );
    expect(adminNotificationsContent).toBeInTheDocument();
  });
  it('should call the sendEmailNotifications function with the provided inputs', async () => {
    fireEvent.change(subjectInput, { target: { value: 'Test Title' } });
    fireEvent.change(contentInput, { target: { value: 'Test message section.' } });
    fireEvent.click(emailButton);

    await waitFor(() => {
      expect(sendEmailNotifications as jest.Mock).toHaveBeenCalledWith({
        content: 'Test message section.',
        participants: ['66bd072b001f6b1f6ac0'],
        subject: 'Test Title',
      });
    });
  });
});
