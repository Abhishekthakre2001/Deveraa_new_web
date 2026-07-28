"use client";

import { motion } from "framer-motion";
import { Activity, Landmark, Truck, GraduationCap, Building2, Factory, ShoppingCart, Lightbulb } from "lucide-react";
import { Card } from "@/components/ui/card";

const INDUSTRIES = [
  { name: "Healthcare", icon: Activity },
  { name: "FinTech", icon: Landmark },
  { name: "Logistics", icon: Truck },
  { name: "Education", icon: GraduationCap },
  { name: "Real Estate", icon: Building2 },
  { name: "Manufacturing", icon: Factory },
  { name: "Retail", icon: ShoppingCart },
  { name: "AI Startups", icon: Lightbulb },
];

export function IndustriesSection() {
  return (
<section className="relative py-24 overflow-hidden bg-gradient-to-b from-background via-muted/30 to-background">
  {/* Center Heading */}
        <div className="max-w-7xl mx-auto text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-5 py-2 text-sm font-medium text-primary"
          >
          Industries Industries
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="mt-6 text-4xl md:text-6xl font-bold leading-tight"
          >
            From Vision to
            <br />

            <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 bg-clip-text text-transparent">
              Industries
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-6 text-lg text-muted-foreground max-w-3xl mx-auto"
          >
        Delivering tailored software solutions across diverse sectors.
          </motion.p>
        </div>
<div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
<div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="container mx-auto px-4 sm:px-8">
        {/* <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Industries We Serve</h2>
          <p className="text-muted-foreground text-lg">
            Delivering tailored software solutions across diverse sectors.
          </p>
        </div> */}
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 ">
          {INDUSTRIES.map((industry, index) => {
            const Icon = industry.icon;
            return (
              <motion.div
                key={industry.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
              >
               <Card
  className="
    relative overflow-hidden rounded-2xl
    border border-border/40
    bg-background/80 backdrop-blur-sm
    p-8
    transition-all duration-300
    hover:-translate-y-2
    hover:shadow-2xl
    hover:border-primary/50
    group
  "
>
  {/* Top Accent */}
  <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-blue-500 via-cyan-500 to-indigo-500 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />

  {/* Icon */}
  <div
    className="
      mx-auto mb-6
      flex h-16 w-16 items-center justify-center
      rounded-2xl
      bg-gradient-to-br
      from-blue-100
      to-indigo-100
      dark:from-blue-900/30
      dark:to-indigo-900/30
      transition-all duration-300
      group-hover:rotate-6
      group-hover:scale-110
    "
  >
    <Icon className="h-8 w-8 text-primary transition-all duration-300 group-hover:scale-110" />
  </div>

  <h3 className="text-lg font-semibold text-center">
    {industry.name}
  </h3>

  <p className="mt-2 text-center text-sm text-muted-foreground">
    Custom software solutions
  </p>
</Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  );
}
