// components/NavLink.tsx
import Link from 'next/link';
import { cn } from '@/utils/utils';
interface NavLinkProps {
  href: string;
  testId: string;
  children: React.ReactNode;
  onClose?: () => void;
}

const NavLink = ({ href, testId, children, onClose }: NavLinkProps) => {
  return (
    <li>
      <Link
        href={href}
        data-testid={testId}
        className={cn(
          'underline underline-offset-4 hover:text-primary-muted transition-colors',
        )}
        onClick={onClose}
      >
        {children}
      </Link>
    </li>
  );
};

export default NavLink;
