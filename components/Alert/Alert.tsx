// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const alertVariants = cva(
  'relative w-full max-w-[25rem] rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground',
  {
    variants: {
      variant: {
        default: 'bg-background text-foreground',
        error:
          'bg-background text-error [&>svg]:text-error text-error border-error',
        warning:
          'bg-background text-warning [&>svg]:text-warning text-warning border-warning',
        success:
          'bg-background text-success [&>svg]:text-success text-success border-success',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ variant, children }, ref) => (
  <div
    role="alert"
    className={alertVariants({ variant })}
    ref={ref}
  >{children}</div>
));
Alert.displayName = 'Alert';

export { Alert };
