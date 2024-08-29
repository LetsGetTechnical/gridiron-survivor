// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import React, { JSX } from 'react';
import { IAlertTitle } from './AlertTitle.interface';

/**
 * AlertTitle component.
 * @param props - The props.
 * @param props.title - The title of the alert.
 * @returns The rendered AlertTitle component.
 */
const AlertTitle = ({ title }: IAlertTitle): JSX.Element => (
  <h5 className="mb-1 font-medium leading-none tracking-tight">{title}</h5>
);
AlertTitle.displayName = 'AlertTitle';

export { AlertTitle };
