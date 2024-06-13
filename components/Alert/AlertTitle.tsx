// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import * as React from 'react';
import { IAlertTitleProps } from './AlertProps.interface';
import { cn } from '@/utils/utils';

const AlertTitle = React.forwardRef<HTMLParagraphElement, IAlertTitleProps>(
  ({ className, title, ...props }, ref) => (
    <h5
      ref={ref}
      className={cn('mb-1 font-medium leading-none tracking-tight', className)}
      {...props}
    >
      {title}
    </h5>
  ),
);
AlertTitle.displayName = 'AlertTitle';

export { AlertTitle };
