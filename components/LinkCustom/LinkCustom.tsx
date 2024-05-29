// Import necessary modules from Next.js and React
import Link from 'next/link';
import React from 'react';

interface ILinkCustomProps {
  href: string;
  children: string;
  className?: string;
  newTab?: boolean;
  visuallyHiddenText?: string;
}

// Be sure to add visuallyHiddenText to your link to add additional context for screen reader users. Read more at https://webforeveryone.us/blog/fixing-the-six-most-common-bugs#links-with-discernable-text

const LinkCustom = ({
  href,
  children,
  className,
  newTab = false,
  visuallyHiddenText,
}: ILinkCustomProps) => {
  // Determine if the target attribute should be added based on the newTab prop
  const targetAttr = newTab ? '_blank' : '_self';

  // Use Next.js Link component wrapped inside an anchor tag
  return (
    <Link
      data-testid="linkCustom"
      target={targetAttr}
      rel={newTab ? 'noopener noreferrer' : undefined}
      href={href}
      passHref
      className={`hover:text-orange-600 hover:underline ${className}`}
    >
      <span className="sr-only">{visuallyHiddenText}</span>
      {children}
    </Link>
  );
};

export default LinkCustom;
