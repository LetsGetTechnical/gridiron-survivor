// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { JSX } from 'react';
/**
 * Renders the index page.
 * @returns {JSX.Element} The rendered index page.
 */
const Index = (): JSX.Element => {
  return (
    <div className="flex flex-col items-center justify-center flex-1 w-full">
      <nav className="flex flex-col items-center justify-center flex-1 w-full">
        <p>Gridiron Survivor</p>
      </nav>
    </div>
  );
};

export default Index;
