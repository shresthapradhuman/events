'use client'
import React from 'react'
import { navigationItems } from '@/constant'
import { cn } from '@/lib/utils'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { usePathname } from 'next/navigation'

const Navigation = () => {
  const pathname = usePathname()
  return (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList>
        {navigationItems.map(({ label, path }, key) => (
          <NavigationMenuItem key={key}>
            <NavigationMenuLink
              className={cn(navigationMenuTriggerStyle(), 'bg-transparent', {
                'bg-accent text-accent-foreground font-medium':
                  pathname == path || pathname?.startsWith(`${path}/`),
              })}
              href={path}
            >
              {label}
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export default Navigation
