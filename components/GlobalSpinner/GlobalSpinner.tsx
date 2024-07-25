// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import React from 'react';
import Image from 'next/image';

/**
 * GlobalSpinner component
 * @returns {React.JSX.Element} GlobalSpinner component
 */
const GlobalSpinner = (): React.JSX.Element => (
  <div
    data-testid="global-spinner"
    className="global-spinner w-full h-full grid place-content-center"
  >
    <Image
      alt="Gridiron Survivor logo fading in and out"
      src="/assets/global-spinner.svg"
      className="animate-pulse h-64 w-64"
      width={100}
      height={100}
    />
  </div>
);

export default GlobalSpinner;
