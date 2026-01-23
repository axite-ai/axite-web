'use client'

import { AnimatePresence, LazyMotion, domAnimation, m } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'
import type { Dispatch, SetStateAction } from 'react'

import { Accordion, Button } from 'ui'
import { DEFAULT_EASE } from '~/lib/animations'
import MenuItem from './MenuItem'

import { useIsUserLoading } from 'common'
import * as supabaseLogoWordmarkDark from 'common/assets/images/supabase-logo-wordmark--dark.png'
import * as supabaseLogoWordmarkLight from 'common/assets/images/supabase-logo-wordmark--light.png'
import { ChevronRight } from 'lucide-react'
import MainProductsData from '~/data/MainProducts'
import ProductModulesData from '~/data/ProductModules'

interface Props {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  menu: any
}

const MobileMenu = ({ open, setOpen, menu }: Props) => {
  const isUserLoading = useIsUserLoading()

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.15, staggerChildren: 0.05, ease: DEFAULT_EASE } },
    exit: { opacity: 0, transition: { duration: 0.15 } },
  }

  const listItem = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.25, ease: DEFAULT_EASE } },
    exit: { opacity: 0, transition: { duration: 0.05 } },
  }

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [setOpen])

  const AccordionMenuItem = ({ menuItem }: any) => (
    <>
      {menuItem.title === 'Product' ? (
        <>
          {/* Main Products */}
          {Object.values(menuItem.subMenu || MainProductsData)?.map((component: any) => (
            <MenuItem
              key={component.name}
              title={component.name}
              href={component.url}
              description={component.description_short}
              icon={component.icon}
            />
          ))}
          {/* Product Modules */}
          <div>
            <div className="group flex items-center p-2 text-foreground-lighter text-xs uppercase tracking-widest font-mono">
              Resources
            </div>
            <ul className="flex flex-col gap-0">
              {Object.values(ProductModulesData).map((productModule) => (
                <MenuItem
                  key={productModule.name}
                  title={productModule.name}
                  href={productModule.url}
                  description={productModule.description_short}
                  icon={productModule.icon}
                />
              ))}
            </ul>
          </div>
          <Link
            href="/docs/quickstart"
            className="
              flex items-center justify-between group text-sm
              p-4 mt-4 gap-2
              rounded-lg border
              bg-alternative-200 text-foreground-light
              hover:text-foreground hover:border-foreground-muted
              focus-visible:text-foreground focus-visible:ring-2 focus-visible:outline-none
              focus-visible:rounded focus-visible:ring-foreground-lighter
            "
          >
            <div className="flex flex-col gap-1 !leading-3">
              <span>Get started</span>
              <span className="text-foreground-lighter text-xs leading-4">
                Add governance to your AI agents in minutes.
              </span>
            </div>
            <ChevronRight
              strokeWidth={2}
              className="w-3 -ml-1 transition-all will-change-transform -translate-x-1 opacity-80 group-hover:translate-x-0 group-hover:opacity-100"
            />
          </Link>
        </>
      ) : null}
    </>
  )

  const Menu = () => (
    <Accordion
      type="default"
      openBehaviour="multiple"
      size="large"
      className="space-y-1"
      justified
      chevronAlign="right"
    >
      {menu.primaryNav.map((menuItem: any) => (
        <m.div variants={listItem} className="border-b [&>div]:!rounded-none" key={menuItem.title}>
          {menuItem.hasDropdown ? (
            <Accordion.Item
              header={menuItem.title}
              id={menuItem.title}
              className="block relative py-2 pl-3 pr-4 text-base font-medium text-foreground hover:bg-surface-200"
            >
              <AccordionMenuItem menuItem={menuItem} />
            </Accordion.Item>
          ) : (
            <Link
              href={menuItem.url}
              className="block py-2 pl-3 pr-4 text-base font-medium text-foreground hover:bg-surface-200 focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-foreground-lighter focus-visible:rounded"
            >
              {menuItem.title}
            </Link>
          )}
        </m.div>
      ))}
    </Accordion>
  )

  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence mode="wait">
        {open && (
          <m.div
            variants={container}
            initial="hidden"
            animate="show"
            exit="exit"
            className="bg-background fixed overflow-hidden inset-0 z-50 h-screen max-h-screen w-screen supports-[height:100cqh]:h-[100cqh] supports-[height:100svh]:h-[100svh] transform"
          >
            <div className="absolute h-16 px-6 flex items-center justify-between w-screen left-0 top-0 z-50 bg-overlay before:content[''] before:absolute before:w-full before:h-3 before:inset-0 before:top-full before:bg-gradient-to-b before:from-background-overlay before:to-transparent">
              <Link
                href="/"
                as="/"
                className="block w-auto h-6 focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-foreground-lighter focus-visible:ring-offset-4 focus-visible:ring-offset-background-alternative focus-visible:rounded-sm"
              >
                <Image
                  src={supabaseLogoWordmarkLight}
                  width={124}
                  height={24}
                  alt="Axite Logo"
                  className="dark:hidden"
                  priority
                />
                <Image
                  src={supabaseLogoWordmarkDark}
                  width={124}
                  height={24}
                  alt="Axite Logo"
                  className="hidden dark:block"
                  priority
                />
              </Link>
              <button
                onClick={() => setOpen(false)}
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-foreground-lighter focus:ring-brand hover:text-foreground-light transition-colors focus:outline-none focus:ring-2 focus:ring-inset"
              >
                <span className="sr-only">Close menu</span>
                <svg
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="max-h-screen supports-[height:100cqh]:h-[100cqh] supports-[height:100svh]:h-[100svh] overflow-y-auto pt-20 pb-32 px-4">
              <Menu />
            </div>
            <div className="absolute bottom-0 left-0 right-0 top-auto w-full bg-alternative flex items-stretch p-4 gap-4">
              {!isUserLoading && (
                <>
                  <Link href="/contact/sales" passHref legacyBehavior>
                    <Button block type="default" asChild>
                      <a type={undefined} className="h-10 py-4">
                        Contact sales
                      </a>
                    </Button>
                  </Link>
                  <Link href="/docs/quickstart" passHref legacyBehavior>
                    <Button block asChild>
                      <a type={undefined} className="h-10 py-4">
                        Get started
                      </a>
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </m.div>
        )}
      </AnimatePresence>
      <AnimatePresence mode="wait">
        {open && (
          <m.div
            variants={container}
            initial="hidden"
            animate="show"
            exit="exit"
            onClick={() => setOpen(false)}
            className="bg-alternative fixed overflow-hidden inset-0 z-40 h-screen w-screen transform cursor-pointer"
          />
        )}
      </AnimatePresence>
    </LazyMotion>
  )
}

export default MobileMenu
