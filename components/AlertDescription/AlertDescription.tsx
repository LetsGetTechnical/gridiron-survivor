// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import React, { JSX } from 'react';
import { IAlertDescription } from './AlertDescription.interface';

/**
 * AlertDescription component.
 * @param props - The props.
 * @param props.message - The message of the alert.
 * @returns The rendered AlertDescription component.
 */
const AlertDescription = ({ message }: IAlertDescription): JSX.Element => (
  <div className="text-sm [&_p]:leading-relaxed">{message}</div>
);
AlertDescription.displayName = 'AlertDescription';

export { AlertDescription };
