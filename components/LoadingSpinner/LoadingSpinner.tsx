// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import React, { JSX } from 'react';
import { cn } from '@/utils/utils';

export interface ILoadingSpinnerProps {
  height?: string;
  width?: string;
}
/**
 * Renders a loading spinner.
 * @param {ILoadingSpinnerProps} props - The props for the loading spinner component.
 * @param {string} props.height - The height of the loading spinner. This should be the same tailwind class as the element it is standing in for.
 * @param {string} props.width - The width of the loading spinner. This should be the same tailwind class as the element it is standing in for.
 * @returns {JSX.Element} The rendered loading spinner component.
 */
const LoadingSpinner = ({
  height,
  width,
}: ILoadingSpinnerProps): JSX.Element => {
  return (
    <div
      role="alert"
      tabIndex={-1}
      className={cn(
        'loading-spinner-container w-full h-full place-content-center text-center',
        height,
        width,
      )}
    >
      <div
        className="loading-spinner w-12 h-12 mx-auto rounded-full border-4 border-t-muted-foreground border-foreground animate-spin motion-reduces:hidden"
        data-testid="loading-spinner"
      />
      <p className="sr-only motion-reduce:not-sr-only">Loading</p>
    </div>
  );
};

export default LoadingSpinner;
