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
    <Link data-testid="link-logo-nav" href="/league/all">
      <Image
        alt="Gridiron Survivor logo"
        data-testid="logo-nav"
        height={36}
        src={logo}
        width={80}
      />
    </Link>
  );
};

export default LogoNav;
