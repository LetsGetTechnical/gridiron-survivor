// /Users/ryanfurrer/Developer/GitHub/gridiron-survivor/app/(admin)/admin/notifications/page.test.tsx

import AdminNotifications from './page';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { getCurrentLeague } from '@/api/apiFunctions';
import React from 'react';
import { sendEmailNotifications } from './actions/sendEmailNotification';

let contentInput: HTMLInputElement,
  emailButton: HTMLElement,
  emailTestersButton: HTMLElement,
  subjectInput: HTMLInputElement;

jest.mock('@/api/apiFunctions', () => ({
  getCurrentLeague: jest.fn(),
}));

jest.mock('./actions/sendEmailNotification', () => ({
  sendEmailNotifications: jest.fn(),
}));

describe('Admin notifications page', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    render(<AdminNotifications />);

    contentInput = screen.getByTestId('content-text');
    emailButton = screen.getByTestId('send-email');
    emailTestersButton = screen.getByTestId('email-testers');
    subjectInput = screen.getByTestId('subject-text');
  });
  it(`should render it's content`, () => {
    (sendEmailNotifications as jest.Mock).mockResolvedValue({});

    const adminNotificationsContent = screen.getByTestId(
      'admin-notifications-content',
    );
    expect(adminNotificationsContent).toBeInTheDocument();
  });
  it('should call the sendEmailNotifications function with the provided inputs', async () => {
    const dummyParticipants = ['12345', '1234', '123'];
    const testBCC = ['1234', '12345', '1234213'];
    (getCurrentLeague as jest.Mock).mockResolvedValue({ participants: dummyParticipants });

    fireEvent.click(emailTestersButton);
    fireEvent.change(subjectInput, { target: { value: 'Test Title' } });
    fireEvent.change(contentInput, { target: { value: 'Test message section.' } });

    await waitFor(() => {
      expect(emailButton).toBeInTheDocument();
    });
    
    fireEvent.submit(emailButton);

    await waitFor(() => {
      expect(sendEmailNotifications as jest.Mock).toHaveBeenCalledWith({
        content: 'Test message section.',
        sendEmailUsers: dummyParticipants,
        subject: 'Test Title',
        testBCC: testBCC,
      });
    });
  });
});
