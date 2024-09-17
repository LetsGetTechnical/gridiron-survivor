// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

'use client';

import * as React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/utils';

const labelVariants = cva(
  'text-base font-normal leading-none text-foreground cursor-pointer flex gap-2 items-center rounded-xl border-2 border-border py-4 px-3 w-full transition',
  {
    variants: {
      disabled: {
        true: 'opacity-50 cursor-not-allowed',
        false: 'peer-aria-checked:border-accent peer-hover:border-white'
      },
    },
  }
);

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, disabled, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants({ disabled }), className)}
    {...props}
  />
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
