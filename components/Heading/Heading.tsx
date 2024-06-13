// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import React from 'react';

const Heading = React.forwardRef<
  React.ElementRef<'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'>,
  {
    elementType: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    children: string;
    className?: string;
  }
>(({ elementType, children, className }, ref) => {
  const HeadingElement = elementType;
  return (
    <HeadingElement ref={ref} className={className}>
      {children}
    </HeadingElement>
  );
});

export default Heading;
