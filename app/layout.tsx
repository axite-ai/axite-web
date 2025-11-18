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
  title: "Axite - Enterprise AI Integration Solutions",
  description: "Custom ChatGPT apps, Claude connectors, and MCP servers for your business. Transform your operations with cutting-edge AI technology.",
  openGraph: {
    title: "Axite - Enterprise AI Integration Solutions",
    description: "Custom ChatGPT apps, Claude connectors, and MCP servers for your business. Transform your operations with cutting-edge AI technology.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Axite - Enterprise AI Integration Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Axite - Enterprise AI Integration Solutions",
    description: "Custom ChatGPT apps, Claude connectors, and MCP servers for your business. Transform your operations with cutting-edge AI technology.",
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
