import Image from 'next/image';
import { cn } from '../../utils/utils';

type LogoProps = {
  className?: string;
  src: string;
};

export const Logo = ({ className, src }: LogoProps) => {
  return (
    <div className={cn('relative h-64 w-64', className)}>
      <Image
        data-testid="badge-logo"
        src={src}
        alt="Gridiron Survivor logo"
        fill
        sizes="(max-width: 1200px) 100vw, 50vw"
        priority
      />
    </div>
  );
};

export default Logo;
