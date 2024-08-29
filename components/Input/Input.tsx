// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import * as React from 'react';
import { cn } from '../../utils/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        {...props}
        className={cn(
          'flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-base text-zinc-50 ring-offset-background placeholder:border-zinc-400 placeholder:font-normal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        ref={ref}
      />
    );
  },
);
Input.displayName = 'Input';

export { Input };
