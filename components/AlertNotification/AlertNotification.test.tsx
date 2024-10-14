import React from 'react';
import { render } from '@testing-library/react';
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
  }
});
