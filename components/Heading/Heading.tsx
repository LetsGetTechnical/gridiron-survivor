// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import React from 'react';
/**
 * Renders a heading with the given level and text.
 *
 * @param as - The HTML element type to render.
 * @param children - The text to display inside the heading.
 * @param className - Additional CSS classes to apply to the heading.
 * @return The rendered heading element.
 */
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
