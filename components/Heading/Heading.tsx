// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import React, { JSX } from 'react';

interface HeadingProps {
  as?: keyof typeof headingVariants;
  children?: React.ReactNode;
  className?: string;
}

const headingVariants = {
  h1: 'font-extrabold text-5xl leading-none tracking-tight text-foreground',
  h2: 'font-bold text-[2rem] leading-[1.125rem] tracking-tighter text-foreground',
  h3: 'font-semibold text-base leading-8 tracking-tighter text-foreground',
  h4: 'font-semibold text-sm leading-7 tracking-tighter text-foreground',
};
/**
 * Dynamically assigns the HTML element based on HeadingSize, applies the appropriate variant class name,
 * and renders the children within the component.
 *
 * @param {HeadingProps} as - The HTML tag to be rendered as specified by the HeadingSize
 * @param {React.ReactNode} children - The content to be rendered inside the component
 * @param {string} className - Additional class names to be applied to the component
 * @param {...any} rest - Additional props to be spread on the component
 * @returns {JSX.Element} The JSX element representing the rendered component
 */
const Heading = ({
  as: HeadingSize = 'h1',
  children,
  className,
  ...rest
}: HeadingProps): JSX.Element => {
  const variantClassName = headingVariants[HeadingSize];

  // Dynamically assign the HTML element
  const Heading = HeadingSize as keyof JSX.IntrinsicElements;

  return (
    <Heading className={`${variantClassName} ${className}`} {...rest}>
      {children}
    </Heading>
  );
};

Heading.displayName = 'Heading';

export default Heading;
