"use client";

import { useState } from "react";
import Link from "next/link";
import { X, Sparkles, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface AnnouncementBarProps {
  message: string;
  link?: {
    href: string;
    label: string;
  };
  className?: string;
}

export function AnnouncementBar({ message, link, className }: AnnouncementBarProps) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div
      className={cn(
        "relative z-50 flex items-center justify-center gap-2 px-4 py-2.5",
        "bg-gradient-to-r from-[var(--gradient-teal)] via-[var(--gradient-purple)] to-[var(--gradient-pink)]",
        "text-sm font-medium text-white",
        className
      )}
    >
      <Sparkles className="size-4 shrink-0" />
      <span className="truncate">{message}</span>
      {link && (
        <Link
          href={link.href}
          className="group ml-1 inline-flex items-center gap-1 font-semibold underline underline-offset-2 transition-colors hover:text-white/90"
        >
          {link.label}
          <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
        </Link>
      )}
      <button
        onClick={() => setDismissed(true)}
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
        aria-label="Dismiss announcement"
      >
        <X className="size-4" />
      </button>
    </div>
  );
}
