// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { JSX } from 'react';
/**
 * Renders the index page.
 * @returns {JSX.Element} The rendered index page.
 */
const Index = (): JSX.Element => {
  return (
    <div className="flex w-full flex-1 flex-col items-center justify-center">
      <nav className="flex w-full flex-1 flex-col items-center justify-center">
        <p>Gridiron Survivor</p>
      </nav>
    </div>
  );
};

export default Index;
