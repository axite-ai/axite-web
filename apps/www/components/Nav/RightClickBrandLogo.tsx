'use client'

import Image from 'next/image'
import Link from 'next/link'

import axiteLogoWordmarkDark from 'common/assets/images/axite-logo-wordmark--dark.svg'
import axiteLogoWordmarkLight from 'common/assets/images/axite-logo-wordmark--light.svg'

const BrandLogo = () => {
  return (
    <Link
      href="/"
      className="block w-auto h-6 focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-foreground-lighter focus-visible:ring-offset-4 focus-visible:ring-offset-background-alternative focus-visible:rounded-sm"
    >
      <Image
        src={axiteLogoWordmarkLight}
        width={86}
        height={24}
        alt="Axite Logo"
        className="dark:hidden"
        priority
      />
      <Image
        src={axiteLogoWordmarkDark}
        width={86}
        height={24}
        alt="Axite Logo"
        className="hidden dark:block"
        priority
      />
    </Link>
  )
}

export default BrandLogo
