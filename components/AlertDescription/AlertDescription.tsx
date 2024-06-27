// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import * as React from 'react';
import { IAlertDescription } from './AlertDescription.interface';

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  IAlertDescription
>(({ message }: IAlertDescription) => (
  <div className="text-sm [&_p]:leading-relaxed">{message}</div>
));
AlertDescription.displayName = 'AlertDescription';

export { AlertDescription };
