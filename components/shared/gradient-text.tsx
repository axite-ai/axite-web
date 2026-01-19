import { cn } from "@/lib/utils";

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "brand" | "pink-purple" | "purple-teal";
  animated?: boolean;
}

export function GradientText({
  children,
  className,
  variant = "default",
  animated = false,
}: GradientTextProps) {
  const variantClasses = {
    default: "text-gradient",
    brand: "text-gradient-brand",
    "pink-purple": "bg-clip-text text-transparent bg-gradient-to-r from-[var(--gradient-pink)] to-[var(--gradient-purple)]",
    "purple-teal": "bg-clip-text text-transparent bg-gradient-to-r from-[var(--gradient-purple)] to-[var(--gradient-teal)]",
  };

  return (
    <span
      className={cn(
        variantClasses[variant],
        animated && "animate-gradient",
        className
      )}
    >
      {children}
    </span>
  );
}
