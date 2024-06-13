// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

'use client';
import React, { JSX } from 'react';
interface IErrorBoundary {
  children?: React.ReactNode;
}

/**
 * The error boundary component.
 * @param props - The props
 * @param props.children - The children
 * @returns The rendered error boundary.
 */
const ErrorBoundary = (props: IErrorBoundary): JSX.Element => {
  const { children } = props;
  return (
    <div className="align-center flex flex-col">
      <h2 className="text-white">Something went wrong!</h2>
      {children}
    </div>
  );
};

export default ErrorBoundary;
