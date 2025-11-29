import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { CalEmbed } from "@/components/cal-embed";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Axite - Make Your Product Usable by AI Agents",
  description: "Production-grade MCP servers and agent workflows for API-first companies. We design and ship the tools, permissions, and safety checks so agents can reliably use your product across ChatGPT, Claude, and future ecosystems.",
  openGraph: {
    title: "Axite - Make Your Product Usable by AI Agents",
    description: "Production-grade MCP servers and agent workflows for API-first companies. We design and ship the tools, permissions, and safety checks so agents can reliably use your product across ChatGPT, Claude, and future ecosystems.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Axite - Make Your Product Usable by AI Agents",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Axite - Make Your Product Usable by AI Agents",
    description: "Production-grade MCP servers and agent workflows for API-first companies. We design and ship the tools, permissions, and safety checks so agents can reliably use your product across ChatGPT, Claude, and future ecosystems.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script src="//code.tidio.co/h474vzguvcnk1wvlrb7n78s5sc5u2igv.js" async></script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster position="bottom-center" />
          {children}
          <CalEmbed />
        </ThemeProvider>
      </body>
    </html>
  );
}
