// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

'use client';
import React, { JSX, useState } from 'react';

interface IErrorBoundary {
  children?: React.ReactNode;
}

/**
 * Renders an error boundary component that displays an error message if an error occurs within its child components.
 *
 * @param {IErrorBoundary} props - The props object containing the children to be rendered.
 * @returns {JSX.Element} - The rendered error boundary component.
 */
const ErrorBoundary = ({ children }: IErrorBoundary): JSX.Element => {
  const [hasError, setHasError] = useState(false);

  /**
   * Sets the `hasError` state to `true`, indicating that an error has occurred.
   *
   * @return {void}
   */
  const handleError = (): void => {
    setHasError(true);
  };

  if (hasError) {
    return (
      <div className="align-center flex flex-col">
        <h2 className="text-white">Something went wrong!</h2>
      </div>
    );
  }
  return <div onError={handleError}>{children}</div>;
};

export default ErrorBoundary;
