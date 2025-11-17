import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"

const FieldSet = React.forwardRef<
  HTMLFieldSetElement,
  React.FieldsetHTMLAttributes<HTMLFieldSetElement>
>(({ className, ...props }, ref) => (
  <fieldset
    ref={ref}
    className={cn("space-y-6", className)}
    {...props}
  />
))
FieldSet.displayName = "FieldSet"

const FieldLegend = React.forwardRef<
  HTMLLegendElement,
  React.HTMLAttributes<HTMLLegendElement> & {
    variant?: "legend" | "label"
  }
>(({ className, variant = "legend", ...props }, ref) => (
  <legend
    ref={ref}
    className={cn(
      variant === "legend" && "text-lg font-semibold",
      variant === "label" && "text-sm font-medium",
      className
    )}
    {...props}
  />
))
FieldLegend.displayName = "FieldLegend"

const FieldGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col gap-6", className)}
    {...props}
  />
))
FieldGroup.displayName = "FieldGroup"

const Field = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    orientation?: "vertical" | "horizontal" | "responsive"
  }
>(({ className, orientation = "vertical", ...props }, ref) => (
  <div
    ref={ref}
    role="group"
    data-orientation={orientation}
    className={cn(
      "flex gap-2",
      orientation === "vertical" && "flex-col",
      orientation === "horizontal" && "flex-row items-start",
      orientation === "responsive" && "flex-col @[480px]/field-group:flex-row @[480px]/field-group:items-start",
      className
    )}
    {...props}
  />
))
Field.displayName = "Field"

const FieldContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-1 flex-col gap-1.5", className)}
    {...props}
  />
))
FieldContent.displayName = "FieldContent"

const FieldLabel = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement> & {
    asChild?: boolean
  }
>(({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "label"
  return (
    <Comp
      ref={ref}
      className={cn(
        "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        className
      )}
      {...props}
    />
  )
})
FieldLabel.displayName = "FieldLabel"

const FieldTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm font-medium leading-none", className)}
    {...props}
  />
))
FieldTitle.displayName = "FieldTitle"

const FieldDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
FieldDescription.displayName = "FieldDescription"

const FieldSeparator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    role="separator"
    className={cn(
      "relative my-6",
      !children && "h-px bg-border",
      className
    )}
    {...props}
  >
    {children && (
      <>
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            {children}
          </span>
        </div>
      </>
    )}
  </div>
))
FieldSeparator.displayName = "FieldSeparator"

const FieldError = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement> & {
    errors?: Array<{ message?: string } | undefined>
  }
>(({ className, errors, children, ...props }, ref) => {
  const errorMessages = errors?.filter(Boolean).map((error) => error?.message).filter(Boolean)
  const hasErrors = errorMessages && errorMessages.length > 0

  if (!hasErrors && !children) return null

  return (
    <p
      ref={ref}
      className={cn("text-sm font-medium text-destructive", className)}
      {...props}
    >
      {children}
      {hasErrors && errorMessages.length === 1 && errorMessages[0]}
      {hasErrors && errorMessages.length > 1 && (
        <ul className="list-inside list-disc">
          {errorMessages.map((message, index) => (
            <li key={index}>{message}</li>
          ))}
        </ul>
      )}
    </p>
  )
})
FieldError.displayName = "FieldError"

export {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
}
