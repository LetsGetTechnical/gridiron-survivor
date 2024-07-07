import toast from 'react-hot-toast';

/**
 * Log out and clear session state
 * @returns {Promise<void>}
 */
const logoutAccount = async (): Promise<void> => {
  try {
    await account.deleteSession('current');
    setIsSignedIn(false);
    resetUser(); // Reset user data in the store
    toast.custom(
      <Alert variant={AlertVariants.Default} message="Logged Out" />,
    );
    router.push('/login');
  } catch (error) {
    toast.custom(
      <Alert
        variant={AlertVariants.Error}
        message="Something went wrong. Try logging out again."
      />,
    );
    console.error('Logout error:', error);
  }
};

export { logoutAccount };
