// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { JSX } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import logo from '/public/assets/logo-colored-nav.svg';

/**
 * Renders the logo for the navigation bar.
 * @returns {JSX.Element} The rendered logo.
 */
export const LogoNav = (): JSX.Element => {
  return (
    <Link href="/league/all" passHref>
      <Image
        src={logo}
        alt="Gridiron Survivor logo"
        width={1}
        height={1}
        priority
        className="w-20"
        data-testid="logo-nav"
      />
    </Link>
  );
};

export default LogoNav;
