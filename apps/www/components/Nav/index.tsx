'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import React from 'react'

import { Button, cn } from 'ui'

import BookACallButton from '~/components/BookACallButton'
import RightClickBrandLogo from './RightClickBrandLogo'

const ScrollProgress = dynamic(() => import('components/ScrollProgress'))

interface Props {
  hideNavbar: boolean
  stickyNavbar?: boolean
}

const Nav = ({ hideNavbar, stickyNavbar = true }: Props) => {
  if (hideNavbar) {
    return null
  }

  return (
    <>
      <div
        className={cn('sticky top-0 z-40 transform', !stickyNavbar && 'relative')}
        style={{ transform: 'translate3d(0,0,999px)' }}
      >
        <div className="absolute inset-0 h-full w-full bg-background/90 dark:bg-background/95 !opacity-100 transition-opacity" />
        <nav className="relative z-40 border-default border-b backdrop-blur-sm transition-opacity">
          <div className="relative flex justify-between h-16 mx-auto lg:container lg:px-16 xl:px-20">
            <div className="flex items-center px-6 lg:px-0 flex-1 sm:items-stretch justify-between">
              <div className="flex items-center">
                <div className="flex items-center flex-shrink-0">
                  <RightClickBrandLogo />
                </div>
              </div>
              <div className="flex items-center gap-2 opacity-0 animate-fade-in !scale-100 delay-300">
                <BookACallButton />
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
