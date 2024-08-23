// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { JSX } from 'react';

/**
 * Renders a loading spinner.
 * @returns {JSX.Element} The rendered loading spinner component.
 */
const LoadingSpinner = (): JSX.Element => {
  return (
    <div
      className="loading-spinner-container grid place-content-center text-center"
      data-testid="loading-spinner"
      role="alert"
      tabIndex={-1}
    >
      <div className="loading-spinner min-w-[1.75rem] max-w-[2.25rem] min-h-[1.75rem] max-h-[2.25rem] rounded-full border-4 border-t-muted-foreground border-foreground animate-spin motion-reduce:hidden" />
      <p className="sr-only motion-reduce:not-sr-only">Loading...</p>
    </div>
  );
};

export default LoadingSpinner;
