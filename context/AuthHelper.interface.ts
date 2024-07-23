// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import React from 'react';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export interface ILogoutType {
  setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>;
  resetUser: React.Dispatch<React.SetStateAction<void>>;
  router: AppRouterInstance;
}
