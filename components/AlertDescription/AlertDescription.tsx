// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import * as React from 'react';
import { cn } from '@/utils/utils';
import { IAlertDescription } from './AlertDescription.interface';

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  IAlertDescription
>(({ className, message, ...props }: IAlertDescription) => (
  <div className={cn('text-sm [&_p]:leading-relaxed', className)} {...props}>
    {message}
  </div>
));
AlertDescription.displayName = 'AlertDescription';

export { AlertDescription };
