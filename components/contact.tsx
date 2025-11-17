import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card } from '@/components/ui/card'

export default function ContactSection() {
    return (
        <section id="contact" className="bg-background py-24 md:py-32">
            <div className="mx-auto max-w-3xl px-8 lg:px-0">
                <h1 className="text-center text-4xl font-semibold lg:text-5xl">Let's Build Your AI Solution</h1>
                <p className="mt-6 text-center">Transform your business with custom LLM integrations. Get started with a free consultation.</p>

                <Card className="mx-auto mt-12 max-w-lg p-8 shadow-md sm:p-12">
                    <div>
                        <h2 className="text-xl font-semibold">Start Your AI Integration Journey</h2>
                        <p className="mt-4 text-sm">Tell us about your project and we'll help you choose the right AI solution for your business needs.</p>
                    </div>

                    <form
                        action=""
                        className="**:[&>label]:block mt-12 space-y-6 *:space-y-3">
                        <div>
                            <Label htmlFor="name">Full name</Label>
                            <Input
                                type="text"
                                id="name"
                                required
                            />
                        </div>

                        <div>
                            <Label htmlFor="email">Work Email</Label>
                            <Input
                                type="email"
                                id="email"
                                required
                            />
                        </div>

                        <div>
                            <Label htmlFor="country">Country/Region</Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Country/Region" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="1">DR Congo</SelectItem>
                                    <SelectItem value="2">United States</SelectItem>
                                    <SelectItem value="3">France</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <Label htmlFor="website">Company Website</Label>
                            <Input
                                type="url"
                                id="website"
                            />
                            <span className="text-muted-foreground inline-block text-sm">Must start with 'https'</span>
                        </div>

                        <div>
                            <Label htmlFor="service">Service Needed</Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Service" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="chatgpt">ChatGPT Custom Apps</SelectItem>
                                    <SelectItem value="claude">Claude Integration</SelectItem>
                                    <SelectItem value="mcp">MCP Connectors</SelectItem>
                                    <SelectItem value="gemini">Google Gemini</SelectItem>
                                    <SelectItem value="custom">Custom AI Solution</SelectItem>
                                    <SelectItem value="consulting">Consulting</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <Label htmlFor="msg">Message</Label>
                            <Textarea
                                id="msg"
                                rows={3}
                            />
                        </div>

                        <Button>Submit</Button>
                    </form>
                </Card>
            </div>
        </section>
    )
}
