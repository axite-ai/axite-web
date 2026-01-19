const toolSchema = `{
  "name": "create_invoice",
  "description": "Create a draft invoice for a customer",
  "input_schema": {
    "type": "object",
    "required": ["customer_id", "line_items"],
    "properties": {
      "customer_id": { "type": "string" },
      "line_items": {
        "type": "array",
        "items": {
          "type": "object",
          "required": ["sku", "qty", "unit_price"]
        }
      },
      "due_date": { "type": "string" }
    }
  }
}`

const confirmationStep = `Tool: pay_invoice
Requires: amount, vendor_id, invoice_id
Confirmation:
"Pay $4,200 to ACME Corp from Operating account?"
Status: awaiting approval`

const auditLog = `2025-01-18 10:12:04 create_invoice OK
2025-01-18 10:12:06 confirm_payment PENDING
2025-01-18 10:12:35 pay_invoice OK`

export default function ExamplesSection() {
  return (
    <section id="examples" className="bg-muted dark:bg-background py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <h2 className="text-balance text-4xl font-semibold lg:text-5xl">
            Real MCP artifacts, not just promises
          </h2>
          <p className="mt-3 text-lg text-muted-foreground">
            A quick look at the workflows, schemas, and safety rails you receive.
          </p>
        </div>
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <div className="rounded-2xl border bg-background p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Workflow map
            </p>
            <h3 className="mt-3 text-xl font-semibold">Create and pay invoice</h3>
            <div className="mt-6 space-y-3 text-sm">
              <div className="flex items-start gap-3 rounded-lg border bg-muted/40 px-4 py-3">
                <span className="rounded-full border px-2 py-0.5 text-xs font-medium text-muted-foreground">
                  Read
                </span>
                <div>
                  <p className="font-medium">Find customer + balance</p>
                  <p className="text-xs text-muted-foreground">CRM, billing</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-lg border bg-muted/40 px-4 py-3">
                <span className="rounded-full border px-2 py-0.5 text-xs font-medium text-muted-foreground">
                  Write
                </span>
                <div>
                  <p className="font-medium">Create draft invoice</p>
                  <p className="text-xs text-muted-foreground">Line items + due date</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-lg border bg-muted/40 px-4 py-3">
                <span className="rounded-full border px-2 py-0.5 text-xs font-medium text-muted-foreground">
                  Confirm
                </span>
                <div>
                  <p className="font-medium">Approval step for payment</p>
                  <p className="text-xs text-muted-foreground">Human-in-the-loop</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-lg border bg-muted/40 px-4 py-3">
                <span className="rounded-full border px-2 py-0.5 text-xs font-medium text-muted-foreground">
                  Notify
                </span>
                <div>
                  <p className="font-medium">Pay invoice + send receipt</p>
                  <p className="text-xs text-muted-foreground">Billing, email</p>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Tool schema excerpt
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg border bg-muted/40 p-4 text-xs text-foreground">
                <code>{toolSchema}</code>
              </pre>
            </div>
          </div>

          <div className="rounded-2xl border bg-background p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Safety rails
            </p>
            <h3 className="mt-3 text-xl font-semibold">Confirmation and audit trail</h3>
            <p className="mt-3 text-sm text-muted-foreground">
              Write actions require explicit confirmation and produce audit logs your team can trust.
            </p>
            <div className="mt-6 space-y-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Confirmation step
                </p>
                <pre className="mt-3 overflow-x-auto rounded-lg border bg-muted/40 p-4 text-xs text-foreground">
                  <code>{confirmationStep}</code>
                </pre>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Audit log
                </p>
                <pre className="mt-3 overflow-x-auto rounded-lg border bg-muted/40 p-4 text-xs text-foreground">
                  <code>{auditLog}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
