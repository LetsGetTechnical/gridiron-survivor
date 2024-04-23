import Image from 'next/image'
import { cn } from '../../lib/utils'

type LogoProps = {
  className?: string;
}

export const Logo = ({className}: LogoProps) => {
  return (
    <div className={cn('relative w-[16rem] h-[16.875rem]', className)}>
      <Image src="/assets/logo-colored-outline.svg" alt="Gridiron Survivor logo" fill sizes="(max-width: 1200px) 100vw, 50vw" priority/>
    </div>
  )
}

export default Logo