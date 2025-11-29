# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Axite is a marketing website built with Next.js 16 (App Router) and React 19. Axite enables API-first companies to become agent-native by designing and building MCP-based tools and agent apps. The site features a single-page layout with sections for hero, features, integrations, contact form, and footer.

### Company Positioning

**Mission**: Axite enables API-first companies to become agent-native.

**What We Do**: We design and deliver MCP-based tools and agent apps that let AI agents reliably search, create, update, and transact inside real products—driving usage, automation, and revenue, not just conversation.

**Target Customers**: API-first SaaS and platforms where users do things, not just read data (e.g., payments, e-commerce, logistics, HR, developer tools, CRMs, data APIs, operations platforms).

**Core Value Proposition**: "We make your product usable by AI agents—safely, reliably, and across ecosystems."

**Main Offer**: Agent-Native Launch—In 4–6 weeks, your product becomes agent-native with a production-ready MCP server and reference agent app.

**Brand Pillars**:
1. **Agent-First Workflows**: We design actual agent workflows (booking, paying, syncing, analyzing), not just API mirrors
2. **Reliability & Security**: Least-privilege tool design, scoped permissions, input validation, confirmation steps, logging, and safety checks
3. **Cross-Ecosystem Reach**: One MCP server → accessible from ChatGPT, Claude, Gemini, and future agents

## Tech Stack

- **Framework**: Next.js 16 (App Router) with React 19
- **Styling**: Tailwind CSS v4 with custom oklch color tokens
- **UI Components**: Radix UI primitives + custom components
- **Animations**: Motion (Framer Motion) + tw-animate-css
- **Forms**: Zod validation with server actions
- **Email**: Resend API for contact form submissions
- **Calendar**: Cal.com embed with floating button
- **Theme**: next-themes with system/light/dark support
- **TypeScript**: Strict mode enabled

## Development Commands

```bash
# Start development server (default port 3000)
npm run dev

# Production build
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## Architecture

### App Structure (Next.js App Router)

- `app/layout.tsx` - Root layout with theme provider, fonts (Geist Sans/Mono), Cal.com embed, and toast notifications
- `app/page.tsx` - Single-page homepage assembling all section components
- `app/actions/contact.ts` - Server action for contact form submission with Zod validation and Resend integration
- `app/globals.css` - Tailwind CSS v4 configuration with custom color tokens using oklch color space

### Component Organization

- `components/` - Feature sections and UI components
  - Section components: `hero-section.tsx`, `features-section.tsx`, `integrations-1.tsx`, `contact.tsx`, `footer.tsx`
  - `cal-embed.tsx` - Cal.com floating button with theme-aware configuration
  - `theme-provider.tsx` - next-themes wrapper
  - `ui/` - Reusable UI components (buttons, inputs, cards, select, textarea, etc.)
  - `logos/` - Logo components for integrations section

### Styling System

The project uses Tailwind CSS v4 with a custom color system based on oklch color space:
- Color tokens defined as CSS custom properties in `app/globals.css`
- Theme variants: light (default) and dark mode
- Custom variant for dark mode: `@custom-variant dark (&:is(.dark *))`
- Utility function `cn()` in `lib/utils.ts` combines clsx and tailwind-merge for conditional classes

### Environment Configuration

Required environment variables (see `.env.example`):
- `RESEND_API_KEY` - Resend API key for sending emails
- `RESEND_TO_EMAIL` - Recipient email for contact form submissions
- `RESEND_FROM_EMAIL` - Verified sender email (use `onboarding@resend.dev` for testing)

**Important**: Never commit `.env.local` or any files containing actual API keys.

### Contact Form Flow

1. User fills form in `components/contact.tsx` (client component)
2. Form submission calls `submitContactForm()` server action in `app/actions/contact.ts`
3. Server action validates data with Zod schema
4. If valid, sends email via Resend API
5. Returns success/error response with field-level validation errors
6. Client displays toast notifications via Sonner

### Cal.com Integration

- Embedded as floating button in root layout
- Namespace: "15min", link: "axite/discovery"
- Theme-aware: automatically switches between light/dark based on system/user preference
- Custom brand colors: black (#292929) for light mode, white (#ffffff) for dark mode

## Key Patterns

### Server Actions

Server actions are defined in `app/actions/` with the `"use server"` directive. The contact form action:
- Uses Zod for runtime validation
- Returns structured responses with `success`, `error`, and optional `fieldErrors`
- Handles both validation errors and API failures gracefully

### Type Safety

- TypeScript strict mode enabled
- Zod schemas generate TypeScript types: `type ContactFormData = z.infer<typeof contactSchema>`
- Path alias `@/*` resolves to project root

### Theme Management

- System preference detection with manual override
- Theme state managed by next-themes
- Cal.com embed reactively updates theme based on `useTheme()` hook
- CSS custom properties automatically switch via `.dark` class

### Form Validation

- Client-side: HTML5 required attributes + controlled inputs
- Server-side: Zod schema validation with detailed error messages
- Field-level error display using `data-invalid` attributes and `FieldError` components
- Toast notifications for overall success/failure feedback

## Important Notes

- This is a single-page marketing site - all sections render on the homepage
- The contact form uses server-side validation; ensure Resend environment variables are configured
- Cal.com floating button requires the embed script to load; it's initialized in `useEffect`
- Tailwind CSS v4 uses a different configuration approach (CSS-based, not JS config file)
