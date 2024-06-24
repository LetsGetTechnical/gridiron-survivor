// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import React, { JSX } from 'react';

interface HeadingProps {
  as?: keyof typeof headingVariants;
  children?: React.ReactNode;
  className?: string;
  [key: string]: any; // To allow other props
}

const headingVariants = {
  h1: 'font-extrabold text-5xl leading-none tracking-tight',
  h2: 'font-bold text-[2rem] leading-[1.125rem] tracking-tighter',
  h3: 'font-semibold text-base leading-8 tracking-tighter',
  h4: 'font-semibold text-sm leading-7 tracking-tighter',
};

const Heading = ({
  as: HeadingSize = 'h1',
  children,
  className,
  ...rest
}: HeadingProps): JSX.Element => {
  const variantClassName = headingVariants[HeadingSize];

  // Dynamically assign the HTML element
  const Component = HeadingSize as keyof JSX.IntrinsicElements;

  return (
    <Component className={`${variantClassName} ${className}`} {...rest}>
      {children}
    </Component>
  );
};

Heading.displayName = 'Heading';

export default Heading;
