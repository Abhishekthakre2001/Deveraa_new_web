"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Code, Smartphone, Cloud, Cpu, Layout, PenTool, Database } from "lucide-react";

const SERVICES = [
  {
    title: "Web Development",
    description: "High-performance web applications built with Next.js, React, and modern architectures.",
    icon: Code,
  },
  {
    title: "Mobile Apps",
    description: "Native-like cross-platform mobile experiences for iOS and Android using React Native.",
    icon: Smartphone,
  },
  {
    title: "SaaS Development",
    description: "End-to-end SaaS product development from architecture to subscription management.",
    icon: Cloud,
  },
  {
    title: "AI Solutions",
    description: "Integrate large language models and machine learning to supercharge your business.",
    icon: Cpu,
  },
  {
    title: "UI/UX Design",
    description: "Beautiful, intuitive interfaces that users love, designed with a focus on conversion.",
    icon: PenTool,
  },
  {
    title: "Cloud & DevOps",
    description: "Scalable infrastructure and automated deployment pipelines for maximum reliability.",
    icon: Database,
  }
];

export function ServicesSection() {
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
          Expertise Across Services
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="mt-6 text-4xl md:text-6xl font-bold leading-tight"
          >
           Comprehensive
            <br />

            <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 bg-clip-text text-transparent">
             Technical Expertise
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-6 text-lg text-muted-foreground max-w-3xl mx-auto"
          >
       We provide end-to-end software development services tailored to your unique business needs.
          </motion.p>
        </div>
      <div className="container mx-auto px-4 sm:px-8">
        {/* <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Comprehensive Technical Expertise</h2>
          <p className="text-muted-foreground text-lg">
            We provide end-to-end software development services tailored to your unique business needs.
          </p>
        </div> */}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full bg-card hover:shadow-lg transition-all border-border/50 hover:border-primary/30">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base text-muted-foreground">
                      {service.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  );
}
