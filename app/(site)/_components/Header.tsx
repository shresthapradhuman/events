import React from 'react'
import Logo from './Logo'
import Navigation from './Navigation'
import UserNavigation from './UserNavigation'
import AuthNavigation from './AuthNavigation'
import MobileMenu from './MobileMenu'
import { auth } from '@/auth'

const Header = async () => {
  const session = await auth()
  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 h-16 w-full border-b shadow backdrop-blur">
      <nav className="container mx-auto flex h-full max-w-screen-xl items-center justify-between px-4">
        {/* logo section */}
        <Logo />
        {/* desktop navigation section */}
        <Navigation />
        <div className="flex items-center gap-4">
          {/* user and auth navivation */}
          <div className="hidden md:flex">
            {session?.user ? (
              <UserNavigation user={session?.user} />
            ) : (
              <AuthNavigation />
            )}
          </div>
          {/* mobile menu */}
          <MobileMenu />
        </div>
      </nav>
    </header>
  )
}

export default Header
