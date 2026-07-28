"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Sarah Jenkins",
    role: "CTO, TechFlow",
    content: "Deveraa completely transformed our digital presence. Their engineering team is top-notch, delivering a complex SaaS platform ahead of schedule.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Founder, HealthSync",
    content: "The level of professionalism and technical expertise is unmatched. They didn't just build an app; they helped us refine our entire product strategy.",
    rating: 5,
  },
  {
    name: "Elena Rodriguez",
    role: "VP of Product, Logistix",
    content: "Outstanding communication and flawless execution. Our new enterprise logistics dashboard has increased operational efficiency by 40%.",
    rating: 5,
  }
];

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-background">
        {/* Center Heading */}
        <div className="max-w-7xl mx-auto text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-5 py-2 text-sm font-medium text-primary"
          >
          Client Success Stories
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="mt-6 text-4xl md:text-6xl font-bold leading-tight"
          >
            Trusted by Businesses
            <br />

            <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 bg-clip-text text-transparent">
              Around the World
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-6 text-lg text-muted-foreground max-w-3xl mx-auto"
          >
       Our clients' success is our greatest achievement. Discover how we've helped
  startups, growing businesses, and enterprises turn ambitious ideas into
  impactful digital products through innovation, collaboration, and technical
  excellence.
          </motion.p>
        </div>
      <div className="container mx-auto px-4 sm:px-8">
        {/* <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Client Success Stories</h2>
          <p className="text-muted-foreground text-lg">
            Don't just take our word for it. Here's what our partners have to say.
          </p>
        </div> */}

        <div className="grid md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="h-full bg-muted/20 border-border/50">
                <CardContent className="p-8 flex flex-col h-full">
                  <div className="flex gap-1 mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-lg mb-8 flex-1 italic text-muted-foreground">
                    "{testimonial.content}"
                  </p>
                  <div>
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
