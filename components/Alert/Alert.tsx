import { Body, Description, Title } from '@/components/ui/alert';
import { FcApproval, FcCancel, FcHighPriority, FcSms } from 'react-icons/fc';

interface AlertProps {
  variant: 'success' | 'error' | 'normal' | 'warning';
}

const variantConfig = {
  success: {
    title: 'Success!',
    description: 'Your action was successful.',
    icon: FcApproval,
  },
  error: {
    title: 'Error!',
    description: 'There was an error processing your request.',
    icon: FcHighPriority,
  },
  normal: {
    title: 'Normal!',
    description: 'Here is some important information.',
    icon: FcSms,
  },
  warning: {
    title: 'Warning!',
    description: 'Please be cautious about this.',
    icon: FcCancel,
  },
};

export default function Alert({ variant }: AlertProps) {
  const { title, description, icon: Icon } = variantConfig[variant];

  return (
    <Body className="mt-2 w-80 rounded p-4">
      {Icon && <Icon className="h-4 w-4" />}
      <Title>{title}</Title>
      <Description>{description}</Description>
    </Body>
  );
}
