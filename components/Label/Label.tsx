// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

'use client';

import * as React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/utils';

const labelVariants = cva(
  'text-base font-normal leading-none text-zinc-50 cursor-pointer flex gap-2 items-center rounded-xl border-2 border-zinc-800 peer-aria-checked:border-orange-600 py-4 px-3 w-full peer-hover:bg-zinc-800 transition',
);

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  />
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
