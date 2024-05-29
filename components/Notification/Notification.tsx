import React from 'react';
import * as AlertDialog from '@radix-ui/react-dialog';
import { Button } from '../Button/Button';
import {
  FlagTriangleRight,
  AlertTriangle,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';

const notificationVariants = cva('', {
  variants: {
    variant: {
      normal: 'normal',
      warning: 'warning',
      error: 'error',
      success: 'success',
    },
  },
  defaultVariants: {
    variant: 'normal',
  },
});

export interface NotificationProps
  extends VariantProps<typeof notificationVariants> {
  label: string;
}

const Notification = React.forwardRef<HTMLButtonElement, NotificationProps>(
  ({ variant, label, ...props }, ref) => {
    const wait = () => new Promise((resolve) => setTimeout(resolve, 500));
    const [open, setOpen] = React.useState(true);

    return (
      <AlertDialog.Root open={open} onOpenChange={setOpen}>
        <AlertDialog.Overlay>
          <AlertDialog.Content>
            <form
              onSubmit={(event) => {
                wait().then(() => setOpen(false));
                event.preventDefault();
              }}
            >
              <h2>{label}</h2>

              {variant === 'normal' && <FlagTriangleRight />}
              {variant === 'warning' && <AlertTriangle />}
              {variant === 'error' && <XCircle />}
              {variant === 'success' && <CheckCircle />}

              <Button label="Close" variant="destructive" />
            </form>
          </AlertDialog.Content>
        </AlertDialog.Overlay>
      </AlertDialog.Root>
    );
  },
);

export { Notification, notificationVariants };
