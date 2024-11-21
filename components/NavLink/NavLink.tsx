// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import React, { JSX } from 'react';
import Link from 'next/link';
import { cn } from '@/utils/utils';
interface NavLinkProps {
  href: string;
  testId: string;
  children: React.ReactNode;
  onClose?: () => void;
}

/**
 * Renders a navigation link.
 * @param {string} props.href - The URL the link points to.
 * @param {string} props.testId - The test ID for the link.
 * @param {React.ReactNode} props.children - The content to be rendered inside the link.
 * @param {Function} [props.onClose] - function to be called when the link is clicked.
 * @returns {JSX.Element} The rendered navigation link.
 */
const NavLink = ({
  href,
  testId,
  children,
  onClose,
}: NavLinkProps): JSX.Element => {
  return (
    <li>
      <Link
        href={href}
        data-testid={testId}
        className={cn(
          'underline underline-offset-4 hover:text-primary-muted transition-colors',
        )}
        onClick={onClose}
      >
        {children}
      </Link>
    </li>
  );
};

export default NavLink;
