'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import React from 'react'

import { Button, cn } from 'ui'

import { useSendTelemetryEvent } from 'lib/telemetry'
import RightClickBrandLogo from './RightClickBrandLogo'

import { usePathname } from 'next/navigation'

const ScrollProgress = dynamic(() => import('components/ScrollProgress'))

interface Props {
  hideNavbar: boolean
  stickyNavbar?: boolean
}

const Nav = ({ hideNavbar, stickyNavbar = true }: Props) => {
  const pathname = usePathname()
  const sendTelemetryEvent = useSendTelemetryEvent()

  const isLaunchWeekXPage = pathname === '/launch-week/x'
  const isLaunchWeek12Page = pathname === '/launch-week/12'
  const isLaunchWeek13Page = pathname === '/launch-week/13'
  const isGAWeekSection = pathname?.startsWith('/ga-week')
  const disableStickyNav =
    isLaunchWeekXPage ||
    isGAWeekSection ||
    isLaunchWeekXPage ||
    isLaunchWeek12Page ||
    isLaunchWeek13Page ||
    !stickyNavbar
  const showLaunchWeekNavMode = isGAWeekSection || isLaunchWeekXPage

  if (hideNavbar) {
    return null
  }

  return (
    <>
      <div
        className={cn('sticky top-0 z-40 transform', disableStickyNav && 'relative')}
        style={{ transform: 'translate3d(0,0,999px)' }}
      >
        <div
          className={cn(
            'absolute inset-0 h-full w-full bg-background/90 dark:bg-background/95',
            !showLaunchWeekNavMode && '!opacity-100 transition-opacity',
            showLaunchWeekNavMode && '!bg-transparent dark:!bg-black transition-all',
            isGAWeekSection && 'dark:!bg-alternative'
          )}
        />
        <nav
          className={cn(
            `relative z-40 border-default border-b backdrop-blur-sm transition-opacity`,
            showLaunchWeekNavMode && 'border-muted border-b bg-transparent'
          )}
        >
          <div className="relative flex justify-between h-16 mx-auto lg:container lg:px-16 xl:px-20">
            <div className="flex items-center px-6 lg:px-0 flex-1 sm:items-stretch justify-between">
              <div className="flex items-center">
                <div className="flex items-center flex-shrink-0">
                  <RightClickBrandLogo />
                </div>
              </div>
              <div className="flex items-center gap-2 opacity-0 animate-fade-in !scale-100 delay-300">
                <Button asChild>
                  <Link
                    href="/contact/sales"
                    onClick={() =>
                      sendTelemetryEvent({
                        action: 'book_security_review_clicked',
                        properties: { buttonLocation: 'Header Nav' },
                      })
                    }
                  >
                    Book Security Review
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </nav>

        <ScrollProgress />
      </div>
    </>
  )
}

export default Nav
