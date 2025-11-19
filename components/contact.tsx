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
        <section id="contact" className="bg-background py-32 md:py-40">
            <div className="mx-auto max-w-3xl px-8 lg:px-0">
                <Card className="mx-auto max-w-lg p-8 shadow-md sm:p-12">
                    <div>
                        <h2 className="text-2xl font-semibold">Launch Your AI App</h2>
                        <p className="mt-4 text-sm text-muted-foreground">Tell us what you&apos;re building and we&apos;ll get you live on ChatGPT, Claude, and Gemini in days.</p>
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

                            <Field data-invalid={!!fieldErrors.serviceNeeded}>
                                <FieldLabel htmlFor="service">Service Needed</FieldLabel>
                                <Select
                                    value={formData.serviceNeeded}
                                    onValueChange={(value) => setFormData({ ...formData, serviceNeeded: value })}
                                    disabled={isSubmitting}
                                    required
                                >
                                    <SelectTrigger aria-invalid={!!fieldErrors.serviceNeeded}>
                                        <SelectValue placeholder="Select Service" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Customer-Facing GPT App">Customer-Facing GPT App</SelectItem>
                                        <SelectItem value="Internal AI Automation">Internal AI Automation</SelectItem>
                                        <SelectItem value="Multi-Platform Launch">Multi-Platform Launch (ChatGPT + Claude + Gemini)</SelectItem>
                                        <SelectItem value="Custom MCP Integration">Custom MCP Integration</SelectItem>
                                        <SelectItem value="Not Sure - Need Guidance">Not Sure - Need Guidance</SelectItem>
                                    </SelectContent>
                                </Select>
                                {fieldErrors.serviceNeeded && <FieldError>{fieldErrors.serviceNeeded}</FieldError>}
                            </Field>

                            <Field data-invalid={!!fieldErrors.message}>
                                <FieldLabel htmlFor="msg">Message</FieldLabel>
                                <Textarea
                                    id="msg"
                                    rows={3}
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    disabled={isSubmitting}
                                    aria-invalid={!!fieldErrors.message}
                                />
                                <FieldDescription>Tell us about your project and needs</FieldDescription>
                                {fieldErrors.message && <FieldError>{fieldErrors.message}</FieldError>}
                            </Field>

                            <Button type="submit" disabled={isSubmitting || submitted} className="w-full">
                                {submitted ? 'Submitted ✓' : isSubmitting ? 'Sending...' : 'Book Your Discovery Call'}
                            </Button>
                        </FieldGroup>
                    </form>
                </Card>
            </div>
        </section>
    )
}
