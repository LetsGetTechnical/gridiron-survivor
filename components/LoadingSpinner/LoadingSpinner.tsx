// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import React from 'react';

/**
 * asdf
 * @returns asdf
 */
const LoadingSpinner = () => {
  return (
    <div className="loading-spinner-container h-48 place-content-center border">
      <div
        className="loading-spinner w-12 h-12 mx-auto rounded-full border-4 border-t-muted-foreground border-foreground animate-spin"
        data-testid="loading-spinner"
      >
        <span className="sr-only">Loading</span>
      </div>
    </div>
  );
};

export default LoadingSpinner;
