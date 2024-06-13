// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import * as React from 'react';
import { cn } from '@/utils/utils';
import { IAlertDescriptionProps } from './AlertProps.interface';

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  IAlertDescriptionProps
>(({ className, ...props }: IAlertDescriptionProps) => (
  <div className={cn('text-sm [&_p]:leading-relaxed', className)} {...props} />
));
AlertDescription.displayName = 'AlertDescription';

export { AlertDescription };
