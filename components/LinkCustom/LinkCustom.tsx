// Import necessary modules from Next.js and React
import Link from 'next/link';
import React from 'react';

interface ILinkCustomProps {
  children: string;
  href: string;
  visuallyHiddenText?: string;
}

// Be sure to add visuallyHiddenText to your link to add additional context for screen reader users. Read more at https://webforeveryone.us/blog/fixing-the-six-most-common-bugs#links-with-discernable-text

const LinkCustom = ({
  children,
  href,
  visuallyHiddenText,
}: ILinkCustomProps) => {
  // Use Next.js Link component wrapped inside an anchor tag
  return (
    <Link
      data-testid="linkCustom"
      href={href}
      passHref
      className={'hover:text-orange-600 hover:underline'}
    >
      <span className="sr-only">{visuallyHiddenText}</span>
      {children}
    </Link>
  );
};

export default LinkCustom;
