"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Field,
  FieldLabel,
  FieldError,
  FieldGroup,
} from "@/components/ui/field";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { submitContactForm, type ContactFormData } from "@/app/actions/contact";
import { toast } from "sonner";
import {
  CheckCircle2,
  Shield,
  ArrowRight,
  Loader2,
  Sparkles,
  Lock,
} from "lucide-react";

// Animation variants
const formVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

const fieldVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.4, 0.25, 1] as const,
    },
  },
};

const successVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.4, 0.25, 1] as const,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.3,
    },
  },
};

// Service options with descriptions
const serviceOptions = [
  {
    value: "Agent-Native Launch (MCP server + agent app)",
    label: "Agent-Native Launch",
    description: "Full MCP server + reference agent app",
  },
  {
    value: "Agent workflow design consultation",
    label: "Workflow Consultation",
    description: "Architecture & design review",
  },
  {
    value: "Existing MCP server review/improvement",
    label: "MCP Server Review",
    description: "Audit & optimization",
  },
  {
    value: "Other",
    label: "Other Inquiry",
    description: "Custom requirements",
  },
];

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: "",
    email: "",
    companyWebsite: "",
    serviceNeeded: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFieldErrors({});

    try {
      const result = await submitContactForm(formData);

      if (result.success) {
        toast.success(result.message);
        setSubmitted(true);
        setFormData({
          fullName: "",
          email: "",
          companyWebsite: "",
          serviceNeeded: "",
          message: "",
        });
      } else {
        toast.error(result.error);
        if ("fieldErrors" in result && result.fieldErrors) {
          setFieldErrors(result.fieldErrors);
        }
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-card/80 shadow-xl shadow-black/[0.03] backdrop-blur-sm dark:shadow-black/[0.1]">
      {/* Decorative gradient overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-emerald-500/[0.02] via-transparent to-transparent dark:from-emerald-400/[0.03]" />

      {/* Top accent line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />

      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            variants={successVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative flex min-h-[500px] flex-col items-center justify-center p-8 text-center"
          >
            {/* Success state background glow */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-transparent" />

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: 0.1,
              }}
              className="flex size-16 items-center justify-center rounded-full bg-emerald-500/10 ring-1 ring-emerald-500/20"
            >
              <CheckCircle2 className="size-8 text-emerald-600 dark:text-emerald-400" />
            </motion.div>

            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 text-xl font-semibold tracking-tight text-foreground"
            >
              Request Received
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-2 max-w-sm text-sm text-muted-foreground"
            >
              Our security team will review your inquiry and respond within 24
              hours with a personalized assessment.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-6 flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-4 py-2 text-xs text-emerald-700 dark:border-emerald-400/20 dark:text-emerald-400"
            >
              <Shield className="size-3.5" />
              Your data is encrypted and secure
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Button
                variant="outline"
                className="mt-8"
                onClick={() => setSubmitted(false)}
              >
                Submit another request
              </Button>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative p-6 sm:p-8"
          >
            {/* Form header */}
            <div className="mb-6">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-semibold tracking-tight text-foreground">
                  Request Security Review
                </h2>
                <Badge
                  variant="outline"
                  className="border-emerald-500/30 bg-emerald-500/5 text-[10px] font-medium text-emerald-700 dark:border-emerald-400/30 dark:text-emerald-400"
                >
                  <Sparkles className="mr-1 size-2.5" />
                  Free
                </Badge>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Fill out the form below and our security engineers will review
                your requirements.
              </p>
            </div>

            <Separator className="mb-6 bg-border/60" />

            <motion.form
              onSubmit={handleSubmit}
              variants={formVariants}
              initial="hidden"
              animate="visible"
            >
              <FieldGroup className="@container/field-group space-y-5">
                {/* Name and Email row */}
                <div className="grid gap-5 sm:grid-cols-2">
                  <motion.div variants={fieldVariants}>
                    <Field data-invalid={!!fieldErrors.fullName}>
                      <FieldLabel
                        htmlFor="name"
                        className="text-xs font-medium uppercase tracking-wider text-muted-foreground"
                      >
                        Full Name
                      </FieldLabel>
                      <Input
                        type="text"
                        id="name"
                        required
                        value={formData.fullName}
                        onChange={(e) =>
                          setFormData({ ...formData, fullName: e.target.value })
                        }
                        disabled={isSubmitting}
                        aria-invalid={!!fieldErrors.fullName}
                        placeholder="John Smith"
                        className="mt-2 h-11 border-border/60 bg-background/50 transition-all duration-200 placeholder:text-muted-foreground/50 focus-visible:border-emerald-500/50 focus-visible:ring-emerald-500/20"
                      />
                      {fieldErrors.fullName && (
                        <FieldError>{fieldErrors.fullName}</FieldError>
                      )}
                    </Field>
                  </motion.div>

                  <motion.div variants={fieldVariants}>
                    <Field data-invalid={!!fieldErrors.email}>
                      <FieldLabel
                        htmlFor="email"
                        className="text-xs font-medium uppercase tracking-wider text-muted-foreground"
                      >
                        Work Email
                      </FieldLabel>
                      <Input
                        type="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        disabled={isSubmitting}
                        aria-invalid={!!fieldErrors.email}
                        placeholder="john@company.com"
                        className="mt-2 h-11 border-border/60 bg-background/50 transition-all duration-200 placeholder:text-muted-foreground/50 focus-visible:border-emerald-500/50 focus-visible:ring-emerald-500/20"
                      />
                      {fieldErrors.email && (
                        <FieldError>{fieldErrors.email}</FieldError>
                      )}
                    </Field>
                  </motion.div>
                </div>

                {/* Company Website */}
                <motion.div variants={fieldVariants}>
                  <Field data-invalid={!!fieldErrors.companyWebsite}>
                    <FieldLabel
                      htmlFor="website"
                      className="text-xs font-medium uppercase tracking-wider text-muted-foreground"
                    >
                      Company Website
                    </FieldLabel>
                    <div className="mt-2 flex">
                      <span className="inline-flex items-center rounded-l-md border border-r-0 border-border/60 bg-muted/50 px-3 text-sm text-muted-foreground">
                        https://
                      </span>
                      <Input
                        type="text"
                        id="website"
                        placeholder="example.com"
                        value={formData.companyWebsite}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            companyWebsite: e.target.value,
                          })
                        }
                        disabled={isSubmitting}
                        aria-invalid={!!fieldErrors.companyWebsite}
                        className="h-11 rounded-l-none border-border/60 bg-background/50 transition-all duration-200 placeholder:text-muted-foreground/50 focus-visible:border-emerald-500/50 focus-visible:ring-emerald-500/20"
                      />
                    </div>
                    {fieldErrors.companyWebsite && (
                      <FieldError>{fieldErrors.companyWebsite}</FieldError>
                    )}
                  </Field>
                </motion.div>

                {/* Service Selection */}
                <motion.div variants={fieldVariants}>
                  <Field data-invalid={!!fieldErrors.serviceNeeded}>
                    <FieldLabel className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      What brings you here?
                    </FieldLabel>
                    <div className="mt-3 grid gap-2 sm:grid-cols-2">
                      {serviceOptions.map((option) => (
                        <label
                          key={option.value}
                          className={`group relative flex cursor-pointer flex-col rounded-lg border p-3 transition-all duration-200 ${
                            formData.serviceNeeded === option.value
                              ? "border-emerald-500/50 bg-emerald-500/5 ring-1 ring-emerald-500/20"
                              : "border-border/60 bg-background/30 hover:border-border hover:bg-background/50"
                          }`}
                        >
                          <input
                            type="radio"
                            name="serviceNeeded"
                            value={option.value}
                            checked={formData.serviceNeeded === option.value}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                serviceNeeded: e.target.value,
                              })
                            }
                            disabled={isSubmitting}
                            className="sr-only"
                            required
                          />
                          <span
                            className={`text-sm font-medium transition-colors ${
                              formData.serviceNeeded === option.value
                                ? "text-foreground"
                                : "text-foreground/80"
                            }`}
                          >
                            {option.label}
                          </span>
                          <span className="mt-0.5 text-xs text-muted-foreground">
                            {option.description}
                          </span>
                          {/* Selection indicator */}
                          <div
                            className={`absolute right-2 top-2 flex size-4 items-center justify-center rounded-full transition-all ${
                              formData.serviceNeeded === option.value
                                ? "bg-emerald-500 text-white"
                                : "border border-border/60"
                            }`}
                          >
                            {formData.serviceNeeded === option.value && (
                              <CheckCircle2 className="size-3" />
                            )}
                          </div>
                        </label>
                      ))}
                    </div>
                    {fieldErrors.serviceNeeded && (
                      <FieldError>{fieldErrors.serviceNeeded}</FieldError>
                    )}
                  </Field>
                </motion.div>

                {/* Message */}
                <motion.div variants={fieldVariants}>
                  <Field data-invalid={!!fieldErrors.message}>
                    <FieldLabel
                      htmlFor="msg"
                      className="text-xs font-medium uppercase tracking-wider text-muted-foreground"
                    >
                      Tell us about your product
                    </FieldLabel>
                    <Textarea
                      id="msg"
                      rows={3}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      disabled={isSubmitting}
                      aria-invalid={!!fieldErrors.message}
                      placeholder="What does your product do? What security requirements do you have?"
                      className="mt-2 min-h-[100px] resize-none border-border/60 bg-background/50 transition-all duration-200 placeholder:text-muted-foreground/50 focus-visible:border-emerald-500/50 focus-visible:ring-emerald-500/20"
                    />
                    {fieldErrors.message && (
                      <FieldError>{fieldErrors.message}</FieldError>
                    )}
                  </Field>
                </motion.div>

                {/* Submit button */}
                <motion.div variants={fieldVariants} className="pt-2">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    size="lg"
                    className="group relative w-full overflow-hidden bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-lg shadow-emerald-500/20 transition-all duration-300 hover:from-emerald-500 hover:to-emerald-400 hover:shadow-xl hover:shadow-emerald-500/30 disabled:opacity-70 dark:from-emerald-500 dark:to-emerald-400"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 size-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Request Security Review
                        <ArrowRight className="ml-2 size-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </>
                    )}
                  </Button>
                </motion.div>

                {/* Security note */}
                <motion.div
                  variants={fieldVariants}
                  className="flex items-center justify-center gap-2 pt-2 text-xs text-muted-foreground"
                >
                  <Lock className="size-3" />
                  <span>Your information is encrypted and never shared</span>
                </motion.div>
              </FieldGroup>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
