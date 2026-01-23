'use client'

import React from 'react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

import { NavigationMenuLink } from 'ui/src/components/shadcn/ui/navigation-menu'
import MenuItem from './MenuItem'

// Axite-specific navigation data (separate from MainProducts which is used by homepage)
const AxiteProducts = [
  {
    name: 'Overview',
    icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
    description_short: 'Agent governance control plane',
    url: '/product',
  },
  {
    name: 'Policy Enforcement',
    icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
    description_short: 'Control what agents can do',
    url: '/product/policy',
  },
  {
    name: 'Identity & RBAC',
    icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
    description_short: 'RBAC for agents and tools',
    url: '/product/identity',
  },
  {
    name: 'Audit Trails',
    icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01',
    description_short: 'Audit-grade evidence and logs',
    url: '/product/audit',
  },
]

const AxiteResources = [
  {
    name: 'Documentation',
    icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
    description_short: 'Guides and API reference',
    url: '/docs',
  },
  {
    name: 'Changelog',
    icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
    description_short: 'Latest updates and releases',
    url: '/changelog',
  },
  {
    name: 'Blog',
    icon: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z',
    description_short: 'News and insights',
    url: '/blog',
  },
]

export const ProductDropdown = () => {
  return (
    <div className="flex flex-col xl:flex-row">
      <div className="flex flex-col">
        <div className="flex flex-row py-6 px-6 gap-8">
          {/* Governance Features */}
          <ul className="flex flex-col gap-4 w-[280px]">
            <div className="text-foreground-lighter text-xs uppercase tracking-widest font-mono mb-2">
              Platform
            </div>
            {AxiteProducts.map((product) => (
              <NavigationMenuLink key={product.name} asChild>
                <MenuItem
                  title={product.name}
                  href={product.url}
                  description={product.description_short}
                  icon={product.icon}
                  className="h-fit p-0"
                  hasChevron
                />
              </NavigationMenuLink>
            ))}
          </ul>

          {/* Resources */}
          <div className="flex flex-col gap-4 w-[250px]">
            <div className="text-foreground-lighter text-xs uppercase tracking-widest font-mono">
              Resources
            </div>
            <ul className="flex flex-col gap-4">
              {AxiteResources.map((resource) => (
                <NavigationMenuLink key={resource.name} asChild>
                  <Link
                    href={resource.url}
                    className="
                      h-fit group/menu-item
                      flex items-start gap-2
                      text-xs leading-none
                      text-foreground-light hover:text-foreground
                      no-underline outline-none select-none
                      focus-visible:ring-2 focus-visible:ring-foreground-lighter focus-visible:text-foreground
                    "
                  >
                    <div className="w-8 h-8 min-w-8 shrink-0 bg-background border flex items-center justify-center rounded-md">
                      <svg
                        className="h-4 w-4 group-hover/menu-item:text-foreground group-focus-visible/menu-item:text-foreground"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d={resource.icon}
                          stroke="currentColor"
                        />
                      </svg>
                    </div>
                    <div className="flex flex-col justify-center">
                      <div className="flex items-center gap-1">
                        <p className="leading-snug text-foreground">{resource.name}</p>
                        <ChevronRight
                          strokeWidth={2}
                          className="w-3 h-3 text-foreground transition-all will-change-transform -translate-x-1 opacity-0 group-hover/menu-item:translate-x-0 group-hover/menu-item:opacity-100"
                        />
                      </div>
                      {resource.description_short && (
                        <p className="line-clamp-2 leading-tight text-foreground-lighter group-hover/menu-item:text-foreground-light group-focus-visible/menu-item:text-foreground-light">
                          {resource.description_short}
                        </p>
                      )}
                    </div>
                  </Link>
                </NavigationMenuLink>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Right sidebar with CTA */}
      <div className="bg-surface-75 border-t xl:border-t-0 xl:border-l p-6 gap-4 flex flex-col w-full xl:w-[280px]">
        <div className="flex flex-col gap-3">
          <p className="text-foreground-lighter text-xs uppercase tracking-widest font-mono">
            Get Started
          </p>
          <p className="text-sm text-foreground-light">
            Add governance to your AI agents in minutes. Policy enforcement, identity management, and audit trails out of the box.
          </p>
          <Link
            href="/docs/quickstart"
            className="
              group flex items-center gap-1 text-sm text-brand-link hover:text-brand
              focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-foreground-lighter focus-visible:rounded
            "
          >
            View quickstart guide
            <ChevronRight className="h-3 w-3 transition-transform will-change-transform -translate-x-1 group-hover:translate-x-0" />
          </Link>
        </div>

        <div className="border-t pt-4 mt-2">
          <Link
            href="/enterprise"
            className="
              group flex items-center gap-1 text-sm text-foreground-light hover:text-foreground
              focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-foreground-lighter focus-visible:rounded
            "
          >
            Enterprise solutions
            <ChevronRight className="h-3 w-3 transition-transform will-change-transform -translate-x-1 group-hover:translate-x-0" />
          </Link>
        </div>
      </div>
    </div>
  )
}
