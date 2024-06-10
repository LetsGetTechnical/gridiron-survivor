import { Alert as AlertDefault, AlertTitle, AlertDescription } from './Alert';
import { CheckCircle, XCircle, Info, AlertTriangle } from 'lucide-react';

interface AlertProps {
  variant?: 'success' | 'error' | 'warning';
  message: string;
}

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

export default function Alert({ variant, message }: AlertProps) {
  const { title, icon: Icon } = variantConfig[variant || 'default'];

  return (
    <AlertDefault variant={variant || 'default'}>
      <Icon className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </AlertDefault>
  );
}
