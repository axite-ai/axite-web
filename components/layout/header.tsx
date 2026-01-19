'use client'

import Link from 'next/link'
import { LogoDark } from '@/components/logo'
import { Menu, X, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { navigationConfig } from '@/components/navigation/nav-links'
import { AnnouncementBar } from '@/components/shared/announcement-bar'
import React from 'react'
import { cn } from '@/lib/utils'

export function SiteHeader() {
  const [menuState, setMenuState] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className="fixed top-0 z-50 w-full">
      {/* Announcement Bar */}
      <AnnouncementBar
        message="Introducing secure tool orchestration for AI agents"
        link={{
          href: "/product",
          label: "Learn more"
        }}
      />

      {/* Navigation */}
      <nav
        data-state={menuState ? 'active' : undefined}
        className={cn(
          "w-full transition-all duration-300",
          scrolled
            ? "bg-background/80 backdrop-blur-xl border-b border-border"
            : "bg-transparent"
        )}
      >
        <div className="mx-auto max-w-6xl px-6">
          <div className="relative flex items-center justify-between py-4">
            {/* Logo */}
            <Link
              href="/"
              aria-label="Axite Home"
              className="flex items-center"
            >
              <LogoDark className="h-8 w-auto" />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex lg:items-center lg:gap-1">
              {navigationConfig.mainNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.title}
                </Link>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:flex lg:items-center lg:gap-3">
              <Button
                asChild
                className="group bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-lg shadow-emerald-500/20 transition-all duration-300 hover:shadow-emerald-500/40 hover:from-emerald-500 hover:to-emerald-400"
              >
                <Link href={navigationConfig.cta.href}>
                  {navigationConfig.cta.title}
                  <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuState(!menuState)}
              aria-label={menuState ? 'Close Menu' : 'Open Menu'}
              className="relative z-20 -mr-2 flex size-10 items-center justify-center rounded-lg text-foreground lg:hidden"
            >
              <Menu className={cn(
                "size-5 transition-all duration-200",
                menuState && "rotate-180 scale-0 opacity-0"
              )} />
              <X className={cn(
                "absolute size-5 transition-all duration-200",
                menuState ? "rotate-0 scale-100 opacity-100" : "-rotate-180 scale-0 opacity-0"
              )} />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            "lg:hidden overflow-hidden transition-all duration-300 ease-in-out",
            menuState ? "max-h-96 border-b border-border bg-background/95 backdrop-blur-xl" : "max-h-0"
          )}
        >
          <div className="mx-auto max-w-6xl px-6 py-4">
            <nav className="flex flex-col gap-1">
              {navigationConfig.mainNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuState(false)}
                  className="rounded-lg px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  {item.title}
                </Link>
              ))}
            </nav>
            <div className="mt-4 flex items-center gap-3 border-t border-border pt-4">
              <Button
                asChild
                className="flex-1 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white"
              >
                <Link href={navigationConfig.cta.href}>
                  {navigationConfig.cta.title}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
