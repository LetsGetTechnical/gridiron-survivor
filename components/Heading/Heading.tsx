// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import React from 'react';

const Heading = React.forwardRef<
  React.ElementRef<'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'>,
  {
    as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    children: string;
    className?: string;
  }
>(({ as, children, className }) => {
  const HeadingElement = as;
  return <HeadingElement className={className}>{children}</HeadingElement>;
});

export default Heading;
