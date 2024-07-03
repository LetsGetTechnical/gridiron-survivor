// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import Link from 'next/link';
import React, { JSX } from 'react';
import { cn } from '@/utils/utils';

interface ILinkCustomProps {
  children: string;
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
const LinkCustom = ({
  children,
  className,
  href,
}: ILinkCustomProps): JSX.Element => {
  return (
    <Link
      className={cn('hover:text-orange-600 hover:underline', className)}
      data-testid="linkCustom"
      href={href}
      passHref
    >
      {children}
    </Link>
  );
};

export default LinkCustom;
