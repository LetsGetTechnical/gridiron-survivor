// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import React, { forwardRef, HTMLAttributes } from 'react';

interface HeadingProps extends HTMLAttributes<HTMLElement> {
  heading?: keyof typeof headingVariants;
}

const headingVariants = {
  h1: {
    className: 'font-extrabold text-5xl leading-none tracking-tight',
  },
  h2: {
    className: 'font-bold text-[2rem] leading-[1.125rem] tracking-tighter',
  },
  h3: {
    className: 'font-semibold text-base leading-8 tracking-tighter"',
  },
  h4: {
    className: 'font-semibold text-sm leading-7 tracking-tighter',
  },
};

/**
 * Heading component with dynamic heading level and styling.
 *
 * @param {HeadingProps} props - The props for the Heading component.
 * @param {keyof typeof headingVariants} props.heading - The heading level. Defaults to 'h1'.
 * @param {string} props.className - Additional CSS class name for the heading.
 * @param {HTMLAttributes<HTMLElement>} props.rest - Additional HTML attributes for the heading.
 * @returns {React.ReactElement} The rendered Heading component.
 */
const Heading = forwardRef<HTMLElement, HeadingProps>(
  ({ heading: Component = 'h1', children, className, ...rest }) => {
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

export default Heading;
