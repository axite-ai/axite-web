import {
  ArrowLeftRight,
  ClipboardCheck,
  FolderLock,
  Globe2,
  LayoutList,
  Lock,
  ShieldCheck,
  Users,
} from 'lucide-react'
import RequestADemoForm from 'components/Forms/RequestADemoForm'

export default {
  metadata: {
    metaTitle: 'Axite for Enterprise',
    metaDescription:
      'Enterprise-grade agent governance. Deploy Axite with SOC 2 compliance, flexible deployment options, and dedicated support.',
  },
  heroSection: {
    id: 'hero',
    title: 'Axite for Enterprise',
    h1: (
      <>
        Agent governance
        <span className="block">for the enterprise</span>
      </>
    ),
    subheader: [
      <>
        Deploy agent governance that your security team can approve. Axite provides policy enforcement,
        identity management, and audit-grade evidence with enterprise deployment flexibility.
      </>,
    ],
    image: <RequestADemoForm />,
    logos: [],
  },
  'use-cases': {
    id: 'use-cases',
    label: <>Deploy with confidence</>,
    heading: <>Flexible deployment options</>,
    stories: [
      {
        url: '/contact/sales',
        heading: 'Managed Cloud',
        subheading: (
          <>
            <span className="text-foreground">Available now.</span> Fully managed Axite deployment.
            We handle infrastructure, updates, and scaling so you can focus on governance policies.
          </>
        ),
      },
      {
        url: '/contact/sales',
        heading: 'Private Deployment',
        subheading: (
          <>
            <span className="text-foreground">Available by request.</span> Axite deployed in your
            cloud account or VPC. You control the infrastructure, we provide the software and support.
          </>
        ),
      },
      {
        url: '/contact/sales',
        heading: 'Customer-Managed',
        subheading: (
          <>
            <span className="text-foreground">Design partner program.</span> If this is a requirement,
            we're recruiting design partners to shape the self-hosted experience.
          </>
        ),
      },
    ],
    highlights: [],
  },
  performance: {
    id: 'performance',
    heading: (
      <>
        Built for
        <br /> production scale
      </>
    ),
    subheading:
      'Axite is designed to handle high-throughput agent workloads without becoming a bottleneck. Low-latency policy decisions, efficient audit logging, and horizontal scaling when you need it.',
    highlights: [
      {
        heading: '<10ms',
        subheading: 'Policy decision latency',
      },
      {
        heading: '99.9%',
        subheading: 'Uptime SLA (Enterprise)',
      },
    ],
  },
  security: {
    id: 'security',
    label: 'Security & Compliance',
    heading: <>Built for security-conscious organizations</>,
    subheading:
      'Axite is built with security-first principles. We are actively working toward SOC 2 Type II certification and designed our platform to meet enterprise compliance requirements.',
    cta: {
      label: 'Learn more about Trust',
      url: '/trust',
    },
    features: [
      {
        icon: ShieldCheck,
        heading: 'SOC 2 Type II (In Progress)',
      },
      {
        icon: Lock,
        heading: 'Data encrypted at rest & in transit',
      },
      {
        icon: LayoutList,
        heading: 'Complete audit logs',
      },
      {
        icon: Users,
        heading: 'Role-based access control',
      },
      {
        icon: ClipboardCheck,
        heading: 'Policy-as-code support',
      },
      {
        icon: FolderLock,
        heading: 'Secrets never logged',
      },
    ],
  },
  support: {
    id: 'support',
    label: 'Support',
    heading: (
      <>
        Dedicated support
        <br /> for your team
      </>
    ),
    features: [
      {
        icon: Globe2,
        heading: 'Priority Support',
        subheading:
          'Enterprise customers get priority response times and dedicated support channels. Your issues are escalated to senior engineers.',
      },
      {
        icon: Users,
        heading: 'Dedicated Success Manager',
        subheading:
          'Get a dedicated point of contact who understands your deployment, helps with policy design, and ensures smooth operation.',
      },
      {
        icon: ArrowLeftRight,
        heading: 'Onboarding & Migration',
        subheading:
          'Our team helps you integrate Axite into your existing agent infrastructure, design policies, and migrate from other governance solutions.',
      },
    ],
  },
  quote: {
    id: 'quote',
    quote: null,
  },
  'request-a-demo': {
    id: 'request-a-demo',
    heading: 'Book a security review',
    subheading:
      'Walk through your agent governance requirements with our team. We can show you how Axite addresses your security and compliance needs.',
    quote: null,
  },
}
