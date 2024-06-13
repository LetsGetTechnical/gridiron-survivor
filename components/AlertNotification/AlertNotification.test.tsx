import React from 'react';
import { render, screen } from '@testing-library/react';
import Alert from './AlertNotification';
import { Variant } from './Alerts.enum';
import { CheckCircle, XCircle, Info, AlertTriangle } from 'lucide-react';

const variantTestCases = [
  {
    variant: Variant.Success,
    title: 'Success!',
    message: 'This is a success message',
    icon: CheckCircle,
  },
  {
    variant: Variant.Error,
    title: 'Error!',
    message: 'This is an error message',
    icon: XCircle,
  },
  {
    variant: Variant.Default,
    title: 'Info',
    message: 'This is an info message',
    icon: Info,
  },
  {
    variant: Variant.Warning,
    title: 'Warning!',
    message: 'This is a warning message',
    icon: AlertTriangle,
  },
];

describe('AlertNotification', () => {
  variantTestCases.forEach(({ variant, title, message }) => {
    it(`renders the correct variant ${variant}`, () => {
      render(<Alert variant={variant} message={message} />);

      if (variant) {
        expect(screen.getByText(title)).toBeInTheDocument();
        expect(screen.getByText(message)).toBeInTheDocument();
      }
    });
  });
});
