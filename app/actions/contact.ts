"use server"

import { z } from "zod"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

// Validation schema
const contactSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  companyWebsite: z
    .string()
    .min(1, "Please enter your company website")
    .regex(/^[a-zA-Z0-9][a-zA-Z0-9-_.]*\.[a-zA-Z]{2,}/, "Please enter a valid domain (e.g., example.com)")
    .optional()
    .or(z.literal("")),
  serviceNeeded: z.string().min(1, "Please select a service"),
  message: z.string().optional(),
})

export type ContactFormData = z.infer<typeof contactSchema>

export async function submitContactForm(data: ContactFormData) {
  try {
    // Validate input
    const validatedData = contactSchema.parse(data)

    // Prepend https:// to website if provided
    const fullWebsite = validatedData.companyWebsite
      ? `https://${validatedData.companyWebsite}`
      : "Not provided"

    // Send email via Resend
    const { error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: process.env.RESEND_TO_EMAIL!,
      subject: `New Contact Form Submission - ${validatedData.serviceNeeded}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${validatedData.fullName}</p>
        <p><strong>Email:</strong> ${validatedData.email}</p>
        <p><strong>Company Website:</strong> ${fullWebsite}</p>
        <p><strong>Service Needed:</strong> ${validatedData.serviceNeeded}</p>
        <p><strong>Message:</strong></p>
        <p>${validatedData.message || "No message provided"}</p>
      `,
    })

    if (error) {
      console.error("Resend error:", error)
      return {
        success: false,
        error: "Failed to send message. Please try again.",
      }
    }

    return {
      success: true,
      message: "Thank you! We'll get back to you soon.",
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Return field-specific errors
      const fieldErrors: Record<string, string> = {}
      error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message
        }
      })
      return {
        success: false,
        error: "Please fix the errors below.",
        fieldErrors,
      }
    }

    console.error("Contact form error:", error)
    return {
      success: false,
      error: "Something went wrong. Please try again.",
    }
  }
}
