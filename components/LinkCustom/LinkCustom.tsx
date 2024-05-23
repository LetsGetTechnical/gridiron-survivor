// Import necessary modules from Next.js and React
import Link from 'next/link';
import React, { ReactElement } from 'react';

interface ILinkCustomProps {
  href: string;
  children: ReactElement;
  className?: string;
  newTab?: boolean;
}

const LinkCustom = ({
  href,
  children,
  className,
  newTab = false,
}: ILinkCustomProps) => {
  // Determine if the target attribute should be added based on the newTab prop
  const targetAttr = newTab ? '_blank' : undefined;

  // Use Next.js Link component wrapped inside an anchor tag
  return (
    <Link
      data-testid="link-custom"
      target={targetAttr}
      rel={newTab ? 'noopener noreferrer' : undefined}
      href={href}
      passHref
      className={`hover:text-orange-600 hover:underline ${className}`}
    >
      {children}
    </Link>
  );
};

export default LinkCustom;
