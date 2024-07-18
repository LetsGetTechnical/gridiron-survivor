// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { JSX } from 'react';
import { Metadata } from 'next';
import Register from './Register';

export const metadata: Metadata = {
  title: 'Registration | Gridiron Survivor',
  description: 'Fantasy Football Survivor Pool',
};

/**
 * Renders the registration page.
 * @returns {JSX.Element} The rendered registration page.
 */
const RegisterPage = (): JSX.Element => {
  return <Register />;
};
  
export default RegisterPage;
