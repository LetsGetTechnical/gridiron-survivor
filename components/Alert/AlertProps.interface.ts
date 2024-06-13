// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { Variant } from './Alerts.enum';

export interface IAlertProps {
  message: string;
  variant: Variant;
  title: string;
}

export interface IAlertTitleProps {
  className?: string;
  title: string;
}

export interface IAlertDescriptionProps {
  className?: string;
}
