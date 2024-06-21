// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const alertVariants = cva(
  'relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground',
  {
    variants: {
      variant: {
        default: 'bg-background text-foreground',
        error:
          'bg-background text-foreground [&>svg]:text-red-500 text-red-500 border-red-500',
        warning:
          'bg-background text-foreground [&>svg]:text-yellow-500 text-yellow-500 border-yellow-500',
        success:
          'bg-background text-foreground [&>svg]:text-green-500 text-green-500 border-green-500',
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
>(({ variant, ...props }) => (
  <div
    role="alert"
    className={alertVariants({ variant })}
    {...props}
  />
));
Alert.displayName = 'Alert';

export { Alert };
