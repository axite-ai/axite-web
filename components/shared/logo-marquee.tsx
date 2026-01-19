"use client";

import { cn } from "@/lib/utils";

interface LogoMarqueeProps {
  logos: Array<{
    name: string;
    svg: React.ReactNode;
  }>;
  className?: string;
  speed?: "slow" | "normal" | "fast";
  direction?: "left" | "right";
  pauseOnHover?: boolean;
}

export function LogoMarquee({
  logos,
  className,
  speed = "normal",
  direction = "left",
  pauseOnHover = true,
}: LogoMarqueeProps) {
  const speedClasses = {
    slow: "[--duration:60s]",
    normal: "[--duration:40s]",
    fast: "[--duration:25s]",
  };

  // Duplicate logos for seamless loop
  const duplicatedLogos = [...logos, ...logos];

  return (
    <div
      className={cn(
        "relative flex w-full overflow-hidden",
        speedClasses[speed],
        className
      )}
    >
      {/* Gradient masks for smooth fade */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-background to-transparent" />

      <div
        className={cn(
          "flex min-w-full shrink-0 items-center justify-around gap-12",
          direction === "left" ? "animate-marquee" : "animate-marquee-reverse",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
        style={{ animationDuration: "var(--duration)" }}
      >
        {duplicatedLogos.map((logo, index) => (
          <div
            key={`${logo.name}-${index}`}
            className="flex shrink-0 items-center justify-center px-4"
            title={logo.name}
          >
            <div className="text-muted-foreground/60 transition-colors hover:text-muted-foreground">
              {logo.svg}
            </div>
          </div>
        ))}
      </div>

      {/* Second copy for seamless loop */}
      <div
        className={cn(
          "flex min-w-full shrink-0 items-center justify-around gap-12",
          direction === "left" ? "animate-marquee" : "animate-marquee-reverse",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
        style={{ animationDuration: "var(--duration)" }}
        aria-hidden
      >
        {duplicatedLogos.map((logo, index) => (
          <div
            key={`${logo.name}-copy-${index}`}
            className="flex shrink-0 items-center justify-center px-4"
          >
            <div className="text-muted-foreground/60 transition-colors hover:text-muted-foreground">
              {logo.svg}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
