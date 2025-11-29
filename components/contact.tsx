"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card } from '@/components/ui/card'
import { Field, FieldLabel, FieldDescription, FieldError, FieldGroup } from '@/components/ui/field'
import { submitContactForm, type ContactFormData } from '@/app/actions/contact'
import { toast } from 'sonner'

export default function ContactSection() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
    const [formData, setFormData] = useState<ContactFormData>({
        fullName: '',
        email: '',
        companyWebsite: '',
        serviceNeeded: '',
        message: '',
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        setFieldErrors({}) // Clear previous errors

        try {
            const result = await submitContactForm(formData)

            if (result.success) {
                toast.success(result.message)
                setSubmitted(true)
                // Reset form
                setFormData({
                    fullName: '',
                    email: '',
                    companyWebsite: '',
                    serviceNeeded: '',
                    message: '',
                })
            } else {
                toast.error(result.error)
                if ('fieldErrors' in result && result.fieldErrors) {
                    setFieldErrors(result.fieldErrors)
                }
            }
        } catch (error) {
            toast.error('Something went wrong. Please try again.')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <section id="contact" className="bg-background py-24 md:py-32">
            <div className="mx-auto max-w-3xl px-8 lg:px-0">
                <Card className="mx-auto max-w-lg p-8 shadow-md sm:p-12">
                    <div>
                        <h2 className="text-2xl font-semibold">Get Your Free Agent-Native Audit</h2>
                        <p className="mt-4 text-base">We'll send you 2-3 mapped agent workflows tailored to your product within 12 hours.</p>
                        <p className="mt-3 text-sm font-medium text-muted-foreground">
                            Performed by actual MCP engineers. No sales pressure. We respond to every submission.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="mt-12">
                        <FieldGroup className="@container/field-group">
                            <Field data-invalid={!!fieldErrors.fullName}>
                                <FieldLabel htmlFor="name">Full name</FieldLabel>
                                <Input
                                    type="text"
                                    id="name"
                                    required
                                    value={formData.fullName}
                                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                    disabled={isSubmitting}
                                    aria-invalid={!!fieldErrors.fullName}
                                />
                                {fieldErrors.fullName && <FieldError>{fieldErrors.fullName}</FieldError>}
                            </Field>

                            <Field data-invalid={!!fieldErrors.email}>
                                <FieldLabel htmlFor="email">Work Email</FieldLabel>
                                <Input
                                    type="email"
                                    id="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    disabled={isSubmitting}
                                    aria-invalid={!!fieldErrors.email}
                                />
                                {fieldErrors.email && <FieldError>{fieldErrors.email}</FieldError>}
                            </Field>

                            <Field data-invalid={!!fieldErrors.companyWebsite}>
                                <FieldLabel htmlFor="website">Company Website</FieldLabel>
                                <div className="flex">
                                    <span className="inline-flex items-center rounded-l-md border border-r-0 border-input bg-muted px-3 text-sm text-muted-foreground">
                                        https://
                                    </span>
                                    <Input
                                        type="text"
                                        id="website"
                                        placeholder="example.com"
                                        value={formData.companyWebsite}
                                        onChange={(e) => setFormData({ ...formData, companyWebsite: e.target.value })}
                                        disabled={isSubmitting}
                                        aria-invalid={!!fieldErrors.companyWebsite}
                                        className="rounded-l-none"
                                    />
                                </div>
                                <FieldDescription>Enter your company domain</FieldDescription>
                                {fieldErrors.companyWebsite && <FieldError>{fieldErrors.companyWebsite}</FieldError>}
                            </Field>

                            <Field data-invalid={!!fieldErrors.serviceNeeded} className="space-y-3">
                                <FieldLabel>What are you interested in?</FieldLabel>
                                <div className="space-y-2">
                                    <label className="flex items-start gap-3 rounded-lg border p-3 cursor-pointer hover:bg-muted/50 transition-colors">
                                        <input
                                            type="radio"
                                            name="serviceNeeded"
                                            value="Agent-Native Launch (MCP server + agent app)"
                                            checked={formData.serviceNeeded === "Agent-Native Launch (MCP server + agent app)"}
                                            onChange={(e) => setFormData({ ...formData, serviceNeeded: e.target.value })}
                                            disabled={isSubmitting}
                                            className="mt-0.5"
                                            required
                                        />
                                        <span className="text-sm">Agent-Native Launch (MCP server + agent app)</span>
                                    </label>
                                    <label className="flex items-start gap-3 rounded-lg border p-3 cursor-pointer hover:bg-muted/50 transition-colors">
                                        <input
                                            type="radio"
                                            name="serviceNeeded"
                                            value="Agent workflow design consultation"
                                            checked={formData.serviceNeeded === "Agent workflow design consultation"}
                                            onChange={(e) => setFormData({ ...formData, serviceNeeded: e.target.value })}
                                            disabled={isSubmitting}
                                            className="mt-0.5"
                                        />
                                        <span className="text-sm">Agent workflow design consultation</span>
                                    </label>
                                    <label className="flex items-start gap-3 rounded-lg border p-3 cursor-pointer hover:bg-muted/50 transition-colors">
                                        <input
                                            type="radio"
                                            name="serviceNeeded"
                                            value="Existing MCP server review/improvement"
                                            checked={formData.serviceNeeded === "Existing MCP server review/improvement"}
                                            onChange={(e) => setFormData({ ...formData, serviceNeeded: e.target.value })}
                                            disabled={isSubmitting}
                                            className="mt-0.5"
                                        />
                                        <span className="text-sm">Existing MCP server review/improvement</span>
                                    </label>
                                    <label className="flex items-start gap-3 rounded-lg border p-3 cursor-pointer hover:bg-muted/50 transition-colors">
                                        <input
                                            type="radio"
                                            name="serviceNeeded"
                                            value="Agent Growth & Reliability (retainer)"
                                            checked={formData.serviceNeeded === "Agent Growth & Reliability (retainer)"}
                                            onChange={(e) => setFormData({ ...formData, serviceNeeded: e.target.value })}
                                            disabled={isSubmitting}
                                            className="mt-0.5"
                                        />
                                        <span className="text-sm">Agent Growth & Reliability (retainer)</span>
                                    </label>
                                    <label className="flex items-start gap-3 rounded-lg border p-3 cursor-pointer hover:bg-muted/50 transition-colors">
                                        <input
                                            type="radio"
                                            name="serviceNeeded"
                                            value="Something else"
                                            checked={formData.serviceNeeded === "Something else"}
                                            onChange={(e) => setFormData({ ...formData, serviceNeeded: e.target.value })}
                                            disabled={isSubmitting}
                                            className="mt-0.5"
                                        />
                                        <span className="text-sm">Something else</span>
                                    </label>
                                </div>
                                {fieldErrors.serviceNeeded && <FieldError>{fieldErrors.serviceNeeded}</FieldError>}
                            </Field>

                            <Field data-invalid={!!fieldErrors.message}>
                                <FieldLabel htmlFor="msg">Describe your API-first product</FieldLabel>
                                <Textarea
                                    id="msg"
                                    rows={4}
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    disabled={isSubmitting}
                                    aria-invalid={!!fieldErrors.message}
                                    placeholder="What does your product do? What workflows could agents automate? (e.g., booking, payments, data retrieval, transactions)"
                                />
                                <FieldDescription>The more specific you are, the better our analysis. We respond to every submission.</FieldDescription>
                                {fieldErrors.message && <FieldError>{fieldErrors.message}</FieldError>}
                            </Field>

                            <Button type="submit" disabled={isSubmitting || submitted} className="w-full">
                                {submitted ? 'Submitted ✓' : isSubmitting ? 'Sending...' : 'Request Agent-Native Audit'}
                            </Button>
                        </FieldGroup>
                    </form>
                </Card>
            </div>
        </section>
    )
}
