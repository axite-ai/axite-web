'use client'

import React from 'react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

import { NavigationMenuLink } from 'ui/src/components/shadcn/ui/navigation-menu'
import MenuItem from './MenuItem'

import MainProductsData from 'data/MainProducts'
import ProductModulesData from 'data/ProductModules'

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
            {Object.values(MainProductsData).map((product) => (
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

          {/* ContextForge & Resources */}
          <div className="flex flex-col gap-4 w-[250px]">
            <div className="text-foreground-lighter text-xs uppercase tracking-widest font-mono">
              Resources
            </div>
            <ul className="flex flex-col gap-4">
              {Object.values(ProductModulesData).map((module) => (
                <NavigationMenuLink key={module.name} asChild>
                  <Link
                    href={module.url}
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
                          d={module.icon}
                          stroke="currentColor"
                        />
                      </svg>
                    </div>
                    <div className="flex flex-col justify-center">
                      <div className="flex items-center gap-1">
                        <p className="leading-snug text-foreground">{module.name}</p>
                        <ChevronRight
                          strokeWidth={2}
                          className="w-3 h-3 text-foreground transition-all will-change-transform -translate-x-1 opacity-0 group-hover/menu-item:translate-x-0 group-hover/menu-item:opacity-100"
                        />
                      </div>
                      {module.description_short && (
                        <p className="line-clamp-2 leading-tight text-foreground-lighter group-hover/menu-item:text-foreground-light group-focus-visible/menu-item:text-foreground-light">
                          {module.description_short}
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
