// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import GlobalSpinnerImage from '../../public/assets/global-spinner.svg';
import React from 'react';
import Image from 'next/image';

/**
 * GlobalSpinner component
 * @returns {React.JSX.Element} GlobalSpinner component
 */
const GlobalSpinner = (): React.JSX.Element => (
  <div
    className="global-spinner grid h-screen place-content-center"
    data-testid="global-spinner"
  >
    <Image
      alt="Gridiron Survivor logo fading in and out"
      className="animate-pulse h-64 w-64"
      data-testid="global-spinner-image"
      height={100}
      src={GlobalSpinnerImage}
      width={100}
    />
  </div>
);

export default GlobalSpinner;
