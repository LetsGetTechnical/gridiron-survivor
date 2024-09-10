// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

'use client';

import * as React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/utils';

const labelVariants = cva(
<<<<<<< clue355/implement-menu-dropdown
  'text-base font-normal leading-none text-zinc-50 cursor-pointer flex gap-2 items-center rounded-xl border-2 border-zinc-800 py-4 px-3 w-full transition',
=======
  'text-base font-normal leading-none text-foreground cursor-pointer flex gap-2 items-center rounded-xl border-2 border-border py-4 px-3 w-full transition',
>>>>>>> develop
  {
    variants: {
      disabled: {
        true: 'opacity-50 cursor-not-allowed',
<<<<<<< clue355/implement-menu-dropdown
        false: 'peer-aria-checked:border-orange-600 peer-hover:border-white'
=======
        false: 'peer-aria-checked:border-accent peer-hover:border-white'
>>>>>>> develop
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
