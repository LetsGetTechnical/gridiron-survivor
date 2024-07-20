import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export interface ILogoutType {
  setIsSignedIn: (bool: false) => void;
  resetUser: React.Dispatch<React.SetStateAction<void>>;
  router: AppRouterInstance;
}
