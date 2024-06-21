// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import * as React from 'react';
import { IAlertTitle } from './AlertTitle.interface';

const AlertTitle = React.forwardRef<HTMLParagraphElement, IAlertTitle>(
  ({ title }) => (
    <h5 className="mb-1 font-medium leading-none tracking-tight">{title}</h5>
  ),
);
AlertTitle.displayName = 'AlertTitle';

export { AlertTitle };
