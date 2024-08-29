// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import React from 'react';

/**
 * A simple component that will be down on the LeagueCard if the user is eliminated or not.
 * @returns EliminatedStatus component
 */
export const EliminatedStatus = (): React.JSX.Element => {
  return (
    <p data-testid="eliminated-status" className="uppercase">
      eliminated
    </p>
  );
};
