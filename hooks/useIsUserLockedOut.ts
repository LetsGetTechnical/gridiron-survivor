// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { useEffect, useState } from 'react';

/**
 * Function to constantly check the current time every hour and set the lockout accordingly.
 * @returns - The value of lockedOut.
 */
const useIsUserLockedOut = (): boolean => {
  const [lockedOut, setLockedOut] = useState<boolean>(false);
  useEffect(() => {
    /**
     * Checks if the user is locked out from making a pick.
     */
    const checkLockout = (): void => {
      const currentDateAndTime = new Date();
      const day = currentDateAndTime.getUTCDay();
      const hours = currentDateAndTime.getUTCHours();
      if (
        day === 6 || // Saturday
        day === 0 || // Sunday
        day === 1 || // Monday
        (day === 2 && hours < 12) // Tuesday before 1200pm UTC
      ) {
        setLockedOut(true);
      } else {
        setLockedOut(false);
      }
    };

    checkLockout();

    const intervalId = setInterval(checkLockout, 60 * 60 * 1000);

    return (): void => clearInterval(intervalId);
  }, []);

  return lockedOut;
};

export default useIsUserLockedOut;
