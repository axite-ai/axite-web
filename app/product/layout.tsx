import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Product - Axite",
  description: "Okta for AI agents. Secure tool access, safe write controls, and audit-ready logs for your AI agent infrastructure.",
};

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
