// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import React from 'react';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export interface ILogoutType {
  resetUser: React.Dispatch<React.SetStateAction<void>>;
  router: AppRouterInstance;
  setIsSignedIn: React.Dispatch<React.SetStateAction<boolean | null>>;
}
