import React from 'react'
import { HeroHeader } from '@/components/header'
import DevtoolsHeroSection from '@/components/devtools-hero-section'
import FooterSection from '@/components/footer'

export const metadata = {
  title: 'MCP Integrations for Devtools | Axite',
  description: 'Build MCP connectors for your devtools. Integrate with Claude Code, Gemini CLI, Cursor, Windsurf, and other AI coding assistants.',
}

export default function DevtoolsPage() {
  return (
    <div>
      <HeroHeader />
      <DevtoolsHeroSection />
      <FooterSection />
    </div>
  )
}
