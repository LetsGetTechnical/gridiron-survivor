// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { Alert as AlertDefault } from '../Alert/Alert';
import { AlertTitle } from '../AlertTItle/AlertTitle';
import { AlertDescription } from '../AlertDescription/AlertDescription';
import { JSX } from 'react';
import { CheckCircle, XCircle, Info, AlertTriangle } from 'lucide-react';
import { IAlertNotification } from './AlertNotification.interface';
import { Variant } from './Alerts.enum';

const variantConfig = {
  success: {
    title: 'Success!',
    icon: CheckCircle,
  },
  error: {
    title: 'Error!',
    icon: XCircle,
  },
  default: {
    title: 'Info',
    icon: Info,
  },
  warning: {
    title: 'Warning!',
    icon: AlertTriangle,
  },
};

/**
 * Alert Notification pop ups.
 * @param props - The page props.
 * @param props.message - Custom message to add into notification.
 * @param props.variant - Different variants for the notification.
 * @returns {JSX.Element} The rendered weekly picks page.
 */
const Alert = ({
  message,
  variant = Variant.Default,
}: IAlertNotification): JSX.Element => {
  const { title, icon: Icon } = variantConfig[variant];

  return (
    <AlertDefault variant={variant}>
      <Icon className="h-4 w-4" data-testid="alert-icon" />
      <AlertTitle title={title} data-testid="alert-title" />
      <AlertDescription message={message} data-testid="alert-message" />
    </AlertDefault>
  );
};

export default Alert;
