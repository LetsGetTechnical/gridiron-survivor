import Image from 'next/image'
import logo from '/public/assets/logo-colored-nav.svg'

export const LogoNav = () => {
  return (
    <Image 
      src={logo} 
      alt="Gridiron Survivor logo"
      width={1}
      height={1}
      priority
      className='w-20'
      data-testid='logo-nav'
    />
  )
}

export default LogoNav