// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { AlertVariants } from './Alerts.enum';

export interface IAlertNotification {
  message: string;
  variant: AlertVariants;
}
