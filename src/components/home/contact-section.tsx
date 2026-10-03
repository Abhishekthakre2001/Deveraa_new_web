"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { openWhatsAppWithMessage } from "@/lib/whatsapp";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  company: z.string().optional(),
  budget: z.string().min(1, "Please select a budget range"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export function ContactSection() {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = (data: ContactFormValues) => {
    const message = [
      "New project inquiry",
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      `Phone: ${data.phone || "Not provided"}`,
      `Company: ${data.company || "Not provided"}`,
      `Budget: ${data.budget}`,
      `Project details: ${data.message}`,
    ].join("\n");

    if (!openWhatsAppWithMessage(message)) {
      toast.error("WhatsApp could not be opened. Please allow pop-ups and try again.");
      return;
    }

    toast.success("WhatsApp opened with your message. Tap Send there to deliver it.");
    reset();
  };

  return (
    <section className="py-24 bg-muted/30" id="contact">
      <div className="container mx-auto px-4 sm:px-8 max-w-4xl">
          {/* Center Heading */}
        <div className="max-w-7xl mx-auto text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-5 py-2 text-sm font-medium text-primary"
          >
         Let&apos;s Build
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="mt-6 text-4xl md:text-6xl font-bold leading-tight"
          >
            Let&apos;s Build
            <br />

            <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 bg-clip-text text-transparent">
             Something Amazing
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-6 text-lg text-muted-foreground max-w-3xl mx-auto"
          >
      Ready to start your next project? Get in touch with our team.
          </motion.p>
        </div>
        {/* <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Let's Build Something Amazing</h2>
          <p className="text-muted-foreground text-lg">
            Ready to start your next project? Get in touch with our team.
          </p>
        </div> */}
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-card border rounded-2xl p-6 md:p-10 shadow-xl"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input id="name" placeholder="John Doe" {...register("name")} />
                {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input id="email" type="email" placeholder="john@example.com" {...register("email")} />
                {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" {...register("phone")} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input id="company" placeholder="Acme Inc." {...register("company")} />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="budget">Project Budget *</Label>
              <select 
                id="budget"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                {...register("budget")}
              >
                <option value="">Select a range...</option>
                <option value="<10k">Less than $10,000</option>
                <option value="10k-50k">$10,000 - $50,000</option>
                <option value="50k-100k">$50,000 - $100,000</option>
                <option value="100k+">$100,000+</option>
              </select>
              {errors.budget && <p className="text-sm text-destructive">{errors.budget.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Project Details *</Label>
              <textarea 
                id="message"
                rows={4}
                className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[100px]"
                placeholder="Tell us about your project..."
                {...register("message")}
              />
              {errors.message && <p className="text-sm text-destructive">{errors.message.message}</p>}
            </div>

            <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Opening WhatsApp..." : "Continue in WhatsApp"}
            </Button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
