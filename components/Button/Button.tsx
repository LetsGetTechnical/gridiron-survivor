// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import React, { JSX } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../../utils/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-orange-600 text-white hover:bg-orange-600/90',
        outline:
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  label?: string;
  icon?: JSX.Element;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, variant, size, label, icon, ...props }, ref): JSX.Element => {
    return (
      <button
        type="button" // Add the type attribute with the value "button"
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {React.isValidElement(icon) && icon}
        {label}
        {children}
      </button>
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
