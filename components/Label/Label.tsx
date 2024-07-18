// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

'use client';

import * as React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/utils';

const labelVariants = cva(
  'font-normal leading-none w-full transition',
  {
    variants: {
      variant: {
        weeklyPickButtonLabel: 'text-base text-zinc-50 cursor-pointer rounded-xl items-center py-4 px-3 border-2 border-zinc-800 peer-aria-checked:border-orange-600 peer-hover:bg-zinc-800 flex gap-2',
        inputLabel: 'text-sm text-zinc-900 cursor-text flex-col gap-1.5',
      }
    },
    defaultVariants: {
      variant: 'inputLabel'
    }
  }
);

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & 
    VariantProps<typeof labelVariants>
>(({ className, variant, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants({ variant }), className)}
    {...props}
  />
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };

