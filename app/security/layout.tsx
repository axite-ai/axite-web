import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Security - Axite",
  description:
    "Enterprise security built in. SOC 2 roadmap, SSO/SAML, SIEM integration, and flexible deployment options.",
};

export default function SecurityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
