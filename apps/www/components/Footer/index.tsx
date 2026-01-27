'use client'

import Link from 'next/link'

import footerData from 'data/Footer'
import { cn } from 'ui'
import { ThemeToggle } from 'ui-patterns/ThemeToggle'
import SectionContainer from '../Layouts/SectionContainer'

interface Props {
  className?: string
  hideFooter?: boolean
}

const Footer = (props: Props) => {
  if (props.hideFooter) {
    return null
  }

  return (
    <footer className={cn('bg-alternative', props.className)}>
      <h2 id="footerHeading" className="sr-only">
        Footer
      </h2>
      <SectionContainer className="py-8 md:py-12">
        {/* Links row */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 md:gap-8">
          {/* Footer links */}
          <div className="flex flex-wrap gap-x-8 gap-y-4">
            {footerData.map((segment) =>
              segment.links.map((link, idx) => (
                <Link
                  key={`${segment.title}_link_${idx}`}
                  href={link.url}
                  className="text-sm text-foreground-lighter hover:text-foreground transition-colors"
                >
                  {link.text}
                </Link>
              ))
            )}
          </div>

          {/* Theme toggle */}
          <div className="flex-shrink-0">
            <ThemeToggle />
          </div>
        </div>

        {/* Copyright row */}
        <div className="border-default mt-8 flex justify-between items-center border-t pt-6">
          <small className="text-foreground-lighter text-sm">&copy; Axite Inc</small>
        </div>
      </SectionContainer>
    </footer>
  )
}

export default Footer
