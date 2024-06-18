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
  variantTestCases.forEach(({ variant, message }) => {
    it(`renders the correct variant ${variant}`, () => {
      render(<Alert variant={variant} message={message} />);

      if ((variant = Variant.Success)) {
        expect(screen.getByTestId('alertTitle')).toHaveTextContent('Success!');
        expect(screen.getByTestId('alertMessage')).toHaveTextContent(
          'This is a success message',
        );
      }

      if ((variant = Variant.Error)) {
        expect(screen.getByTestId('alertTitle')).toHaveTextContent('Error!');
        expect(screen.getByTestId('alertMessage')).toHaveTextContent(
          'This is an error message',
        );
      }

      if ((variant = Variant.Default)) {
        expect(screen.getByTestId('alertTitle')).toHaveTextContent('Info');
        expect(screen.getByTestId('alertMessage')).toHaveTextContent(
          'This is an info message',
        );
      }

      if ((variant = Variant.Warning)) {
        expect(screen.getByTestId('alertTitle')).toHaveTextContent('Warning!');
        expect(screen.getByTestId('alertMessage')).toHaveTextContent(
          'This is a warning message',
        );
      }
    });
  });
});
