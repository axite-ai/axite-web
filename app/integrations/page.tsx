'use client'

import Link from "next/link";
import { SiteHeader } from "@/components/layout/header";
import { SiteFooter } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { motion } from "motion/react";
import {
  ArrowRight,
  Plus,
  Shield,
  Eye,
  Pencil,
  Lock,
  Zap,
  CheckCircle2,
  Clock,
  Sparkles,
} from "lucide-react";

// Integration logo components with premium styling
function SalesforceLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20.04 11.88c1.68-1.8 4.08-2.88 6.6-2.88 3.36 0 6.24 1.8 7.92 4.44 1.44-.6 3-.96 4.68-.96 6.6 0 11.76 5.28 11.76 11.76 0 6.6-5.28 11.76-11.76 11.76-.72 0-1.44-.06-2.16-.18-1.44 2.52-4.2 4.26-7.32 4.26-1.56 0-3-.36-4.32-1.08-1.44 2.76-4.32 4.68-7.68 4.68-3.12 0-5.88-1.68-7.44-4.2-.72.12-1.44.18-2.16.18C3.36 39.66 0 36.3 0 31.5c0-3.36 1.92-6.24 4.68-7.68-.36-1.08-.6-2.28-.6-3.48 0-5.76 4.68-10.44 10.44-10.44 2.16 0 4.08.66 5.64 1.98h-.12z" fill="currentColor"/>
    </svg>
  );
}

function JiraLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M47.52 22.68L25.92 1.08c-1.08-1.08-2.88-1.08-3.84 0L.48 22.68c-1.08 1.08-1.08 2.76 0 3.84l21.6 21.6c1.08 1.08 2.88 1.08 3.84 0l21.6-21.6c1.08-1.08 1.08-2.76 0-3.84zM24 30.84c-3.84 0-6.84-3-6.84-6.84s3-6.84 6.84-6.84 6.84 3 6.84 6.84-3 6.84-6.84 6.84z" fill="currentColor"/>
    </svg>
  );
}

function SlackLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.08 30.24c0 2.76-2.28 5.04-5.04 5.04S0 33 0 30.24s2.28-5.04 5.04-5.04h5.04v5.04zm2.52 0c0-2.76 2.28-5.04 5.04-5.04s5.04 2.28 5.04 5.04v12.6c0 2.76-2.28 5.04-5.04 5.04s-5.04-2.28-5.04-5.04v-12.6zM17.64 10.08c-2.76 0-5.04-2.28-5.04-5.04S14.88 0 17.64 0s5.04 2.28 5.04 5.04v5.04h-5.04zm0 2.52c2.76 0 5.04 2.28 5.04 5.04s-2.28 5.04-5.04 5.04H5.04C2.28 22.68 0 20.4 0 17.64s2.28-5.04 5.04-5.04h12.6zM37.92 17.64c0-2.76 2.28-5.04 5.04-5.04S48 14.88 48 17.64s-2.28 5.04-5.04 5.04h-5.04v-5.04zm-2.52 0c0 2.76-2.28 5.04-5.04 5.04s-5.04-2.28-5.04-5.04V5.04C25.32 2.28 27.6 0 30.36 0s5.04 2.28 5.04 5.04v12.6zM30.36 37.92c2.76 0 5.04 2.28 5.04 5.04S33.12 48 30.36 48s-5.04-2.28-5.04-5.04v-5.04h5.04zm0-2.52c-2.76 0-5.04-2.28-5.04-5.04s2.28-5.04 5.04-5.04h12.6c2.76 0 5.04 2.28 5.04 5.04s-2.28 5.04-5.04 5.04h-12.6z" fill="currentColor"/>
    </svg>
  );
}

function HubSpotLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M36.12 17.04v-4.8c1.68-.84 2.88-2.64 2.88-4.68 0-2.88-2.4-5.28-5.28-5.28s-5.28 2.4-5.28 5.28c0 2.04 1.2 3.84 2.88 4.68v4.8c-2.28.48-4.32 1.56-6 3.12L12.12 10.2c.12-.48.24-.96.24-1.44 0-2.88-2.4-5.28-5.28-5.28S1.8 5.88 1.8 8.76s2.4 5.28 5.28 5.28c.84 0 1.68-.24 2.4-.6l12.96 9.72c-1.32 1.92-2.16 4.32-2.16 6.84 0 6.6 5.4 12 12 12 6.6 0 12-5.4 12-12-.12-5.76-4.2-10.56-9.48-11.76l1.32-1.2zm-3.84 20.52c-3.6 0-6.48-2.88-6.48-6.48s2.88-6.48 6.48-6.48 6.48 2.88 6.48 6.48-2.88 6.48-6.48 6.48z" fill="currentColor"/>
    </svg>
  );
}

function ZendeskLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.08 16.08v26.4H0L22.08 16.08zm3.84 26.4V16.08L48 42.48H25.92zM22.08 5.52c0 6.12-4.92 11.04-11.04 11.04C4.92 16.56 0 11.64 0 5.52h22.08zm3.84 0H48c0 6.12-4.92 11.04-11.04 11.04-6.12 0-11.04-4.92-11.04-11.04z" fill="currentColor"/>
    </svg>
  );
}

function GitHubLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 0C10.74 0 0 10.74 0 24c0 10.62 6.87 19.62 16.38 22.8 1.2.24 1.62-.54 1.62-1.14v-4.26c-6.66 1.44-8.1-3.24-8.1-3.24-1.08-2.76-2.64-3.48-2.64-3.48-2.16-1.5.18-1.44.18-1.44 2.4.18 3.66 2.46 3.66 2.46 2.1 3.66 5.58 2.58 6.96 1.98.24-1.56.84-2.58 1.5-3.18-5.34-.6-10.92-2.64-10.92-11.82 0-2.64.96-4.8 2.46-6.48-.24-.6-1.08-3.06.24-6.36 0 0 2.04-.66 6.6 2.46 1.92-.54 3.96-.78 6-.78s4.08.24 6 .78c4.56-3.12 6.6-2.46 6.6-2.46 1.32 3.3.48 5.76.24 6.36 1.56 1.68 2.46 3.84 2.46 6.48 0 9.24-5.64 11.22-10.98 11.82.84.72 1.62 2.22 1.62 4.44v6.6c0 .66.42 1.38 1.62 1.14C41.13 43.62 48 34.62 48 24 48 10.74 37.26 0 24 0z" fill="currentColor"/>
    </svg>
  );
}

const logoComponents: Record<string, React.FC<{ className?: string }>> = {
  Salesforce: SalesforceLogo,
  Jira: JiraLogo,
  Slack: SlackLogo,
  HubSpot: HubSpotLogo,
  Zendesk: ZendeskLogo,
  GitHub: GitHubLogo,
};

const integrations = [
  {
    name: "Salesforce",
    description: "CRM access with lead creation approvals and contact read permissions.",
    category: "CRM",
    status: "available" as const,
    policies: ["read-contacts", "read-opportunities", "write-leads-approval"],
    actions: {
      read: ["Get contacts", "List opportunities", "Search accounts"],
      write: ["Create lead", "Update opportunity stage", "Add note"],
    },
    color: "emerald",
  },
  {
    name: "Jira",
    description: "Issue management with configurable status update controls.",
    category: "Project Management",
    status: "available" as const,
    policies: ["read-issues", "create-issues", "update-status-approval"],
    actions: {
      read: ["Get issue details", "List project issues", "Search issues"],
      write: ["Create issue", "Update status", "Add comment"],
    },
    color: "blue",
  },
  {
    name: "Slack",
    description: "Messaging with channel posting and DM restrictions.",
    category: "Communication",
    status: "available" as const,
    policies: ["read-channels", "post-messages", "dm-approval"],
    actions: {
      read: ["List channels", "Read messages", "Get user info"],
      write: ["Post message", "Send DM", "Create channel"],
    },
    color: "purple",
  },
  {
    name: "HubSpot",
    description: "Marketing and sales automation with contact management.",
    category: "CRM",
    status: "coming-soon" as const,
    policies: [],
    actions: { read: [], write: [] },
    color: "orange",
  },
  {
    name: "Zendesk",
    description: "Support ticketing with customer data access controls.",
    category: "Support",
    status: "coming-soon" as const,
    policies: [],
    actions: { read: [], write: [] },
    color: "teal",
  },
  {
    name: "GitHub",
    description: "Repository access with PR and issue management.",
    category: "Developer Tools",
    status: "coming-soon" as const,
    policies: [],
    actions: { read: [], write: [] },
    color: "slate",
  },
];

const categories = ["All", "CRM", "Project Management", "Communication", "Support", "Developer Tools"];

function IntegrationCard({ integration, index }: { integration: typeof integrations[0]; index: number }) {
  const LogoComponent = logoComponents[integration.name];
  const isAvailable = integration.status === "available";

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative"
    >
      <HoverCard openDelay={300} closeDelay={100}>
        <HoverCardTrigger asChild>
          <div
            className={`relative h-full overflow-hidden rounded-2xl border transition-all duration-500 ${
              isAvailable
                ? "cursor-pointer border-border/40 bg-card/60 hover:border-emerald-500/30 hover:bg-card hover:shadow-2xl hover:shadow-emerald-500/5"
                : "border-border/20 bg-card/30 opacity-70"
            }`}
          >
            {/* Premium gradient overlay on hover */}
            {isAvailable && (
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-emerald-500/5" />
                <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-emerald-500/10 via-transparent to-emerald-500/5" />
              </div>
            )}

            {/* Subtle pattern background */}
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.015] opacity-[0.03]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />

            <div className="relative p-8">
              {/* Header: Logo, Name, Status */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  {/* Logo container with glassmorphism */}
                  <div
                    className={`relative flex size-14 items-center justify-center rounded-xl transition-all duration-500 ${
                      isAvailable
                        ? "bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 ring-1 ring-emerald-500/20 group-hover:ring-emerald-500/40 group-hover:shadow-lg group-hover:shadow-emerald-500/10"
                        : "bg-muted/50 ring-1 ring-border/30"
                    }`}
                  >
                    <LogoComponent
                      className={`size-7 transition-transform duration-500 ${
                        isAvailable
                          ? "text-emerald-400 group-hover:scale-110"
                          : "text-muted-foreground/50"
                      }`}
                    />
                  </div>
                  <div>
                    <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground/70">
                      {integration.category}
                    </span>
                    <h3 className="mt-0.5 text-xl font-semibold tracking-tight">{integration.name}</h3>
                  </div>
                </div>

                {/* Status Badge */}
                {isAvailable ? (
                  <Badge className="border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
                    <Zap className="mr-1 size-3" />
                    Live
                  </Badge>
                ) : (
                  <Badge variant="secondary" className="gap-1.5 text-muted-foreground">
                    <Clock className="size-3" />
                    Coming Soon
                  </Badge>
                )}
              </div>

              {/* Description */}
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {integration.description}
              </p>

              {isAvailable && (
                <>
                  {/* Separator with gradient */}
                  <div className="relative my-6">
                    <Separator className="bg-border/50" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  </div>

                  {/* Policy Templates */}
                  <div className="mb-5">
                    <div className="mb-3 flex items-center gap-2">
                      <Shield className="size-3.5 text-muted-foreground" />
                      <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        Policy Templates
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {integration.policies.map((policy) => (
                        <Tooltip key={policy}>
                          <TooltipTrigger asChild>
                            <span className="inline-flex items-center rounded-md border border-border/50 bg-muted/30 px-2.5 py-1 font-mono text-[11px] text-muted-foreground transition-all duration-300 hover:border-emerald-500/30 hover:bg-emerald-500/5 hover:text-emerald-600 hover:text-emerald-400">
                              {policy}
                            </span>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="text-xs">Pre-configured security policy</p>
                          </TooltipContent>
                        </Tooltip>
                      ))}
                    </div>
                  </div>

                  {/* Actions Grid: Read (Emerald) & Write (Amber) */}
                  <div className="grid grid-cols-2 gap-6">
                    {/* Read Actions */}
                    <div>
                      <div className="mb-2.5 flex items-center gap-2">
                        <div className="flex size-5 items-center justify-center rounded-full bg-emerald-500/10">
                          <Eye className="size-3 text-emerald-400" />
                        </div>
                        <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                          Read
                        </span>
                      </div>
                      <ul className="space-y-1.5">
                        {integration.actions.read.map((action) => (
                          <li
                            key={action}
                            className="flex items-center gap-2 text-xs text-muted-foreground"
                          >
                            <div className="size-1 rounded-full bg-emerald-500/60" />
                            {action}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Write Actions */}
                    <div>
                      <div className="mb-2.5 flex items-center gap-2">
                        <div className="flex size-5 items-center justify-center rounded-full bg-amber-500/10">
                          <Pencil className="size-3 text-amber-600 text-amber-400" />
                        </div>
                        <span className="text-xs font-semibold uppercase tracking-wider text-amber-600 text-amber-400">
                          Write
                        </span>
                      </div>
                      <ul className="space-y-1.5">
                        {integration.actions.write.map((action) => (
                          <li
                            key={action}
                            className="flex items-center gap-2 text-xs text-muted-foreground"
                          >
                            <div className="size-1 rounded-full bg-amber-500/60" />
                            {action}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* View Details Link */}
                  <div className="mt-6 flex items-center gap-1 text-sm font-medium text-emerald-400">
                    <span className="transition-all duration-300 group-hover:mr-1">View integration details</span>
                    <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </>
              )}

              {!isAvailable && (
                <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
                  <Sparkles className="size-4" />
                  <span>Get notified when available</span>
                </div>
              )}
            </div>
          </div>
        </HoverCardTrigger>

        {isAvailable && (
          <HoverCardContent
            className="w-80 border-emerald-500/10 bg-card/95 p-5 backdrop-blur-xl"
            side="right"
            align="start"
            sideOffset={12}
          >
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-emerald-500/10">
                  <LogoComponent className="size-5 text-emerald-400" />
                </div>
                <div>
                  <h4 className="font-semibold">{integration.name}</h4>
                  <p className="text-xs text-muted-foreground">{integration.category}</p>
                </div>
              </div>

              <Separator className="bg-border/50" />

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Lock className="size-4 text-emerald-500" />
                  <span className="font-medium">Enterprise-grade security</span>
                </div>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  Pre-configured policies ensure least-privilege access. All actions are logged for compliance.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Badge className="border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
                  <CheckCircle2 className="mr-1 size-3" />
                  SOC2 Ready
                </Badge>
                <Badge variant="outline" className="text-muted-foreground">
                  {integration.policies.length} Policies
                </Badge>
              </div>
            </div>
          </HoverCardContent>
        )}
      </HoverCard>
    </motion.div>
  );
}

export default function IntegrationsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
          {/* Premium background gradients */}
          <div className="pointer-events-none absolute inset-0">
            {/* Main radial gradient */}
            <div className="absolute left-1/2 top-0 h-[800px] w-[1400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-b from-emerald-500/8 via-emerald-500/3 to-transparent blur-3xl" />
            {/* Secondary accent */}
            <div className="absolute right-0 top-1/4 h-[400px] w-[400px] rounded-full bg-gradient-to-l from-emerald-400/10 to-transparent blur-3xl" />
            {/* Grid pattern */}
            <div
              className="absolute inset-0 opacity-[0.02] opacity-[0.04]"
              style={{
                backgroundImage: `linear-gradient(rgba(16, 185, 129, 0.3) 1px, transparent 1px), linear-gradient(to right, rgba(16, 185, 129, 0.3) 1px, transparent 1px)`,
                backgroundSize: '64px 64px',
              }}
            />
          </div>

          <div className="relative mx-auto max-w-6xl px-6">
            <motion.div
              className="mx-auto max-w-3xl text-center"
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Premium badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Badge variant="outline" className="mb-8 border-emerald-500/20 bg-emerald-500/5 px-4 py-1.5">
                  <Shield className="mr-2 size-3.5 text-emerald-500" />
                  <span className="text-emerald-400">Enterprise-Grade Security</span>
                </Badge>
              </motion.div>

              <motion.h1
                className="text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
              >
                <span className="bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent">
                  Secure integrations
                </span>
                <br />
                <span className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 bg-clip-text text-transparent from-emerald-400 via-emerald-300 to-teal-400">
                  for your agents
                </span>
              </motion.h1>

              <motion.p
                className="mt-6 text-lg text-muted-foreground md:text-xl"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
              >
                Pre-built connectors with policy templates for popular tools.
                <br className="hidden sm:block" />
                Connect Salesforce, Jira, Slack, and more—with enterprise security built in.
              </motion.p>

              <motion.div
                className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
              >
                <Button
                  size="lg"
                  className="h-12 bg-gradient-to-r from-emerald-600 to-emerald-500 px-8 text-white shadow-lg shadow-emerald-500/25 transition-all duration-300 hover:from-emerald-500 hover:to-emerald-400 hover:shadow-xl hover:shadow-emerald-500/30 "
                  asChild
                >
                  <Link href="/contact">
                    Request Integration
                    <Plus className="ml-2 size-4" />
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Integrations Grid with Tabs */}
        <section className="relative border-y bg-muted/20 py-20 md:py-28">
          {/* Subtle pattern */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.01] opacity-[0.02]"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
              backgroundSize: '32px 32px',
            }}
          />

          <div className="relative mx-auto max-w-6xl px-6">
            {/* Category Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Tabs defaultValue="All" className="w-full">
                <div className="mb-12 flex justify-center">
                  <TabsList className="h-auto gap-1 bg-muted/50 p-1.5">
                    {categories.map((category) => (
                      <TabsTrigger
                        key={category}
                        value={category}
                        className="px-4 py-2 text-sm data-[state=active]:bg-emerald-500/10 data-[state=active]:text-emerald-600 "
                      >
                        {category}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>

                {categories.map((category) => (
                  <TabsContent key={category} value={category}>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                      {integrations
                        .filter((i) => category === "All" || i.category === category)
                        .map((integration, index) => (
                          <IntegrationCard
                            key={integration.name}
                            integration={integration}
                            index={index}
                          />
                        ))}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </motion.div>
          </div>
        </section>

        {/* Request Integration CTA */}
        <section className="relative overflow-hidden py-24 md:py-32">
          {/* Background gradient */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/3 to-transparent" />
          </div>

          <div className="relative mx-auto max-w-6xl px-6">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <Badge variant="outline" className="mb-6 border-border/50 px-4 py-1.5">
                <Sparkles className="mr-2 size-3.5 text-emerald-500" />
                Custom Integrations
              </Badge>

              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
                Don&apos;t see your tool?
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground">
                We&apos;re adding new integrations regularly. Request your integration and we&apos;ll prioritize
                it based on demand.
              </p>

              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button
                  size="lg"
                  className="h-12 bg-gradient-to-r from-emerald-600 to-emerald-500 px-8 text-white shadow-lg shadow-emerald-500/25 transition-all duration-300 hover:from-emerald-500 hover:to-emerald-400 hover:shadow-xl hover:shadow-emerald-500/30 "
                  asChild
                >
                  <Link href="/contact">
                    Request Integration
                    <ArrowRight className="ml-2 size-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="h-12 px-8" asChild>
                  <Link href="/contact">
                    Talk to Sales
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
