// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import Link from 'next/link';
import React, { JSX } from 'react';

interface ILinkCustomProps {
  children: React.ReactNode;
  className?: string;
  href: string;
}

/**
 * Custom link component
 * @param props - The props
 * @param props.children - any additional items you want inside the link. This could include things like the link text, icons, etc.
 * @param props.href - this is the URL you want the link to point to
 * @param props.className - any additional classes you want to add to that instance of the LinkCustom component.
 * @returns The custom link component
 */
const LinkCustom = ({ children, href, ... props }: ILinkCustomProps): JSX.Element => {
  return (
    <Link
      className={'font-bold text-orange-600 hover:text-orange-600 hover:underline'}
      href={href}
      passHref
      { ...props }
    >
      {children}
    </Link>
  );
};

export default LinkCustom;
