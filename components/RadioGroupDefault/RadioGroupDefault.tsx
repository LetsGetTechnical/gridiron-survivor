// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

'use client';

import { Circle } from 'lucide-react';
import { cn } from '@/utils/utils';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import * as React from 'react';

const RadioGroupDefault = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> & {
    className?: string;
  }
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn('grid gap-2', className)}
      data-testid="radio-group-default"
      {...props}
      ref={ref}
    />
  );
});
RadioGroupDefault.displayName = RadioGroupPrimitive.Root.displayName;

const RadioGroupDefaultItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> & {
    className?: string;
  }
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        'aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      data-testid="radio-group-default-item"
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <Circle
          className="h-2.5 w-2.5 fill-current text-current"
          data-testid="radio-group-default-indicator"
        />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
});
RadioGroupDefaultItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroupDefault, RadioGroupDefaultItem };
