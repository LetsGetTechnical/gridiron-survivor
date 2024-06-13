// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import Link from 'next/link';
import React, { JSX } from 'react';

interface ILinkCustomProps {
  children: string;
  href: string;
}

/**
 * Custom link component
 * @param props - The props
 * @param props.children - any additional items you want inside the link. This could include things like the link text, icons, etc.
 * @param props.href - this is the URL you want the link to point to
 * @returns The custom link component
 */
const LinkCustom = ({ children, href }: ILinkCustomProps): JSX.Element => {
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
