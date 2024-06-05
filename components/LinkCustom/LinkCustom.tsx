import Link from 'next/link';
import React from 'react';

interface ILinkCustomProps {
  children: string;
  href: string;
}

// Uses Next.js' Link component. Props include:
// href = this is the URL you want the link to point to
// children = any additional items you want inside the link. This could include things like the link text, icons, etc.
const LinkCustom = ({ children, href }: ILinkCustomProps) => {
  return (
    <Link
      className={'hover:text-orange-600 hover:underline'}
      data-testid="linkCustom"
      href={href}
      passHref
    >
      {children}
    </Link>
  );
};

export default LinkCustom;
