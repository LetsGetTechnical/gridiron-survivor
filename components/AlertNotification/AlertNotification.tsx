// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { Alert as AlertDefault } from '../Alert/Alert';
import { AlertTitle } from '../AlertTItle/AlertTitle';
import { AlertDescription } from '../AlertDescription/AlertDescription';
import { JSX } from 'react';
import { CheckCircle, XCircle, Info, AlertTriangle, X } from 'lucide-react';
import { IAlertNotification } from './AlertNotification.interface';
import { AlertVariants } from './Alerts.enum';
import { Button } from '../Button/Button';
import toast from 'react-hot-toast';

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
  variant = AlertVariants.Default,
}: IAlertNotification): JSX.Element => {
  const { title, icon: Icon } = variantConfig[variant];

  return (
    <AlertDefault variant={variant}>
      <Icon className="h-4 w-4" data-testid="alert-icon" />
      <AlertTitle title={title} data-testid="alert-title" />
      <AlertDescription message={message} data-testid="alert-message" />
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-2"
        data-testid="dismiss-alert-btn"
        onClick={() => toast.remove()}
        aria-label='dismiss notification'
        label={<X/>}
      />
    </AlertDefault>
  );
};

export default Alert;
