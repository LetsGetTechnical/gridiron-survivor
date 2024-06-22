// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

'use client';
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/Button/Button';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error | null;
}

/**
 * A React component that handles errors and renders fallback UI when there's an error.
 *
 * @param {ErrorBoundaryProps} children - The children components to render
 * @returns {React.ReactNode} The rendered output based on error handling
 */
const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children }) => {
  const [errorState, setErrorState] = useState<ErrorBoundaryState>({
    hasError: false,
    error: null,
  });

  useEffect(() => {
    const handleError = (error: ErrorEvent) => {
      if (error.error instanceof Error) {
        setErrorState({
          hasError: true,
          error: error.error,
        });
      }
    };
    window.addEventListener('error', handleError);

    setErrorState({ hasError: false, error: null });
    return () => {
      window.removeEventListener('error', handleError);
    };
  }, [children]);

  /**
   * Resets the error state to try again.
   *
   * @returns {void} No return value.
   */
  const resetErrorBoundary = (): void => {
    setErrorState({ hasError: false, error: null });
  };

  if (errorState.hasError) {
    return (
      <div className="align-center flex flex-col">
        <h2 className="text-white">
          {errorState.error
            ? errorState.error.message
            : 'Something went wrong!'}
        </h2>
        <Button
          data-testid="reset-button"
          onClick={resetErrorBoundary}
          label="Try again"
        />
      </div>
    );
  }

  return <>{children}</>;
};

export default ErrorBoundary;
