import Alert from '@/components/AlertNotification/AlertNotification';
import { toast } from 'react-hot-toast';
import { AlertVariants } from '@/components/AlertNotification/Alerts.enum';

// /**
//  * Log out and clear session state
//  * @returns {Promise<void>}
//  */
// const logoutAccount = async () => {
//   try {
//     await account.deleteSession('current');
//     setIsSignedIn(false);
//     resetUser(); // Reset user data in the store
//     toast.custom(
//       <Alert variant={AlertVariants.Default} message="Logged Out" />,
//     );
//     router.push('/login');
//   } catch (error) {
//     toast.custom(
//       <Alert
//         variant={AlertVariants.Error}
//         message="Something went wrong. Try logging out again."
//       />,
//     );
//     console.error('Logout error:', error);
//   }
// };

// export { logoutAccount };

const mockLogoutAuth = jest.fn(async () => {
  try {
    toast.custom(
      <Alert variant={AlertVariants.Default} message="Logged Out" />,
    );
  } catch (error) {
    toast.custom(
      <Alert
        variant={AlertVariants.Error}
        message="Something went wrong. Try logging out again."
      />,
    );
    console.error('Logout error:', error);
  }
});

const mockLogoutErrorAuth = jest.fn(async () => {
  try {
    throw new Error('Intentional Error');
  } catch (error) {
    toast.custom(
      <Alert
        variant={AlertVariants.Error}
        message="Something went wrong. Try logging out again."
      />,
    );
  }
});

export { mockLogoutAuth, mockLogoutErrorAuth };
