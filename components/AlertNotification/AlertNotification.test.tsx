import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Alert from './AlertNotification';
import { AlertVariants } from './Alerts.enum';
import { CheckCircle, XCircle, Info, AlertTriangle } from 'lucide-react';

const variantTestCases = {
  [AlertVariants.Success]: {
    title: 'Success!',
    message: 'This is a success message',
    icon: CheckCircle,
  },
  [AlertVariants.Error]: {
    title: 'Error!',
    message: 'This is an error message',
    icon: XCircle,
  },
  [AlertVariants.Default]: {
    title: 'Info',
    message: 'This is an info message',
    icon: Info,
  },
  [AlertVariants.Warning]: {
    title: 'Warning!',
    message: 'This is a warning message',
    icon: AlertTriangle,
  },
};

describe('AlertNotification', () => {
  for (const [key, value] of Object.entries(variantTestCases)) {
    it(`renders the correct variant ${key}`, () => {
      render(
        <Alert
          variant={AlertVariants[key as keyof typeof AlertVariants]}
          message={value.message}
        />,
      );
    });
  };

  it('should render the dismiss button', () => {
    // do I need to render the Alert first?
    const dismissButton = screen.getByTestId('dismiss-alert-btn');
    expect(dismissButton).toBeInTheDocument();
  });

  it('should close the notification upon clicking the dismiss button', 
    // do I need to render the Alert first?
    async () => {
      const dismissButton = screen.getByTestId('dismiss-alert-btn');
      fireEvent.click(dismissButton);
      await waitFor(() => {
        expect(dismissButton.getAttribute('data-state')).toBe('closed'); // how do I tell if Alert is present or not?
      });
  })
});
