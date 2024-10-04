import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { getCurrentLeague } from '@/api/apiFunctions';
import { sendEmailNotifications } from './actions/sendEmailNotification';
import AdminNotifications from './page';
import React from 'react';

let contentInput: HTMLInputElement,
  selectAllUsersRadioOption: HTMLElement,
  selectRecipientsRadioGroup: HTMLElement,
  sendEmailButton: HTMLElement,
  subjectInput: HTMLInputElement;

jest.mock('@/api/apiFunctions', () => ({
  getCurrentLeague: jest.fn(),
}));

jest.mock('./actions/sendEmailNotification', () => ({
  sendEmailNotifications: jest.fn(),
}));

describe('Admin notifications page', () => {
  beforeEach(async () => {
    jest.clearAllMocks();

    (getCurrentLeague as jest.Mock).mockResolvedValue({
      participants: ['12345', '1234', '123'],
      leagueName: 'Test League',
    });

    render(<AdminNotifications />);

    contentInput = screen.getByTestId('content-text');
    selectAllUsersRadioOption = screen.getByTestId('all-users-option');
    selectRecipientsRadioGroup = screen.getByTestId('radio-group-default');
    sendEmailButton = screen.getByTestId('send-email');
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
    fireEvent.click(selectAllUsersRadioOption);
    fireEvent.change(subjectInput, { target: { value: 'Test Title' } });
    fireEvent.change(contentInput, {
      target: { value: 'Test message section.' },
    });

    await waitFor(() => {
      expect(sendEmailButton).toBeInTheDocument();
    });

    fireEvent.submit(sendEmailButton);

    await waitFor(() => {
      expect(sendEmailNotifications as jest.Mock).toHaveBeenCalledWith({
        content: 'Test message section.',
        sendEmailUsers: ['12345', '1234', '123'],
        subject: 'Test Title',
      });
    });
  });
});
