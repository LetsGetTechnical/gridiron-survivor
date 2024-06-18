// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import React, { forwardRef, HTMLAttributes } from 'react';

interface HeadingProps extends HTMLAttributes<HTMLElement> {
  as?: keyof typeof headingVariants;
}

const headingVariants = {
  h1: {
    className: 'font-extrabold text-5xl leading-none tracking-tight',
  },
  h2: {
    className: 'font-bold text-[2rem] leading-[1.125rem] tracking-tighter',
  },
  h3: {
    className: 'font-semibold text-base leading-8 tracking-tighter',
  },
  h4: {
    className: 'font-semibold text-sm leading-7 tracking-tighter',
  },
};

const Heading = forwardRef<HTMLElement, HeadingProps>(
  ({ as: Component = 'h1', children, className, ...rest }) => {
    const variantStyles = headingVariants[Component];

    return (
      <Component
        className={`${variantStyles.className} ${className}`}
        {...rest}
      >
        {children}
      </Component>
    );
  },
);

Heading.displayName = 'Heading';

export default Heading;
