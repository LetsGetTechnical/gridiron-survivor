'use client';
import React from 'react';
interface IErrorBoundary {
  children?: React.ReactNode;
}

const ErrorBoundary = (props: IErrorBoundary) => {
  const { children } = props;
  return (
    <div className="align-center flex flex-col">
      <h2 className="text-white">Something went wrong!</h2>
      {children}
    </div>
  );
};

export default ErrorBoundary;
