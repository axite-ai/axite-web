'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import { Terminal, Zap, Globe, Copy, Check } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'

const codeSnippet = `import { Axite } from '@axite/sdk';

const axite = new Axite({ apiKey: process.env.AXITE_API_KEY });

// Connect your agent to Salesforce with policies
const salesforce = await axite.connect('salesforce', {
  tenant: 'customer-123',
  policies: ['read-only-contacts', 'write-leads-with-approval']
});

// Execute a write action with automatic approval flow
const result = await salesforce.tools.createLead({
  name: 'John Doe',
  company: 'Acme Corp',
  email: 'john@acme.com'
});

// Audit log automatically generated
console.log(result.auditId); // "audit_abc123"`

const features = [
  {
    icon: Zap,
    title: '10 minutes to first integration',
    description: 'npm install, configure your API key, and connect your first tool.',
  },
  {
    icon: Terminal,
    title: 'TypeScript-first SDK',
    description: 'Full type safety, autocomplete, and inline documentation.',
  },
  {
    icon: Globe,
    title: 'Works everywhere',
    description: 'ChatGPT, Claude, Gemini, LangChain, and custom agents.',
  },
]

// Lines to highlight (important lines)
const highlightedLines = [5, 11, 17]

export function DeveloperSection() {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(codeSnippet)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section className="relative py-24 md:py-32">
      {/* Background gradient orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute right-1/4 top-1/4 h-[400px] w-[400px] rounded-full bg-emerald-500/5 blur-[100px]" />
        <div className="absolute left-1/4 bottom-1/4 h-[300px] w-[300px] rounded-full bg-[var(--gradient-teal)]/5 blur-[80px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <Badge variant="outline" className="border-emerald-500/30 bg-emerald-500/5 px-4 py-1.5 text-emerald-400">
              <Terminal className="mr-2 size-3.5" />
              Developer Experience
            </Badge>

            <h2 className="mt-6 text-3xl font-bold tracking-[-0.02em] md:text-4xl lg:text-5xl">
              Integrate in minutes,<br />
              <span className="text-muted-foreground">not months</span>
            </h2>

            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              A simple SDK that handles policies, approvals, and audit logs—so you can focus on building your agent, not your security layer.
            </p>

            <div className="mt-10 space-y-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="group flex gap-4"
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500/15 to-emerald-500/5 ring-1 ring-emerald-500/20 transition-all duration-300 group-hover:ring-emerald-500/40">
                    <feature.icon className="size-5 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold tracking-tight">{feature.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Enhanced Code block */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {/* Enhanced glow effect */}
            <div className="pointer-events-none absolute -inset-4 rounded-3xl bg-gradient-to-br from-emerald-500/20 via-primary/10 to-transparent opacity-50 blur-3xl" />

            <div className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl shadow-black/50">
              {/* Window header with copy button */}
              <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-3">
                <div className="flex items-center gap-2">
                  <div className="size-3 rounded-full bg-zinc-700 transition-colors hover:bg-red-500/80" />
                  <div className="size-3 rounded-full bg-zinc-700 transition-colors hover:bg-yellow-500/80" />
                  <div className="size-3 rounded-full bg-zinc-700 transition-colors hover:bg-green-500/80" />
                  <span className="ml-3 text-xs font-medium text-zinc-500">agent.ts</span>
                </div>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-8 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
                        onClick={handleCopy}
                      >
                        {copied ? (
                          <Check className="size-4 text-emerald-400" />
                        ) : (
                          <Copy className="size-4" />
                        )}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="left" className="bg-zinc-900 text-zinc-200">
                      {copied ? 'Copied!' : 'Copy code'}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              {/* Code content with line highlighting */}
              <div className="overflow-x-auto p-4">
                <pre className="text-sm leading-relaxed">
                  <code className="font-mono">
                    {codeSnippet.split('\n').map((line, i) => {
                      const lineNum = i + 1
                      const isHighlighted = highlightedLines.includes(lineNum)
                      return (
                        <div
                          key={i}
                          className={`whitespace-pre transition-colors ${
                            isHighlighted
                              ? '-mx-4 border-l-2 border-emerald-500 bg-emerald-500/5 px-4'
                              : ''
                          }`}
                        >
                          <span className={`mr-4 inline-block w-6 text-right ${
                            isHighlighted ? 'text-emerald-500' : 'text-zinc-600'
                          }`}>
                            {lineNum}
                          </span>
                          <span className="text-zinc-300">{highlightLine(line)}</span>
                        </div>
                      )
                    })}
                  </code>
                </pre>
              </div>

              {/* Bottom badge */}
              <div className="border-t border-zinc-800 px-4 py-2.5">
                <div className="flex items-center gap-2 text-xs text-zinc-500">
                  <div className="size-2 rounded-full bg-emerald-500" />
                  <span>Ready to run • TypeScript</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function highlightLine(line: string): React.ReactNode {
  const keywords = ['import', 'from', 'const', 'await', 'async', 'new']
  const strings = /'[^']*'/g
  const comments = /\/\/.*/g

  // Check for comments first
  if (comments.test(line)) {
    const parts = line.split(/(?=\/\/)/);
    return (
      <>
        {highlightStringsAndKeywords(parts[0])}
        <span className="text-zinc-500 italic">{parts[1]}</span>
      </>
    )
  }

  return highlightStringsAndKeywords(line)
}

function highlightStringsAndKeywords(text: string): React.ReactNode {
  const strings = /'[^']*'/g
  const stringMatches = text.match(strings)

  if (stringMatches) {
    const parts = text.split(strings)
    return parts.reduce<React.ReactNode[]>((acc, part, i) => {
      acc.push(<span key={`part-${i}`}>{highlightKeywords(part)}</span>)
      if (stringMatches[i]) {
        acc.push(<span key={`string-${i}`} className="text-emerald-400">{stringMatches[i]}</span>)
      }
      return acc
    }, [])
  }

  return highlightKeywords(text)
}

function highlightKeywords(text: string): React.ReactNode {
  const keywords = ['import', 'from', 'const', 'await', 'async', 'new']
  const parts = text.split(/\b/)
  return parts.map((part, i) => {
    if (keywords.includes(part)) {
      return <span key={i} className="text-violet-400">{part}</span>
    }
    // Highlight function calls and properties
    if (part.match(/^\w+$/) && text.includes(`.${part}`)) {
      return <span key={i} className="text-sky-400">{part}</span>
    }
    return part
  })
}
