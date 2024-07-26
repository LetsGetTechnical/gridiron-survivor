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
    className="global-spinner w-full h-full grid place-content-center"
    data-testId="global-spinner"
  >
    <Image
      alt="Gridiron Survivor logo fading in and out"
      className="animate-pulse h-64 w-64"
      data-testId="global-spinner-image"
      height={100}
      src="../../assets/global-spinner.svg"
      width={100}
    />
  </div>
);

export default GlobalSpinner;
