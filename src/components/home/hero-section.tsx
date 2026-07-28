"use client";

import { motion } from "framer-motion";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background pt-24 pb-32 md:pt-32 md:pb-40">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />
      
      <div className="container mx-auto px-4 sm:px-8 relative z-10 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl"
        >
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
            Build Modern Software <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">
              Products Faster
            </span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Deveraa is a premium software development company delivering enterprise-grade web, mobile, SaaS, and AI solutions for forward-thinking brands.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact" className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-auto")}>
              Schedule Consultation
            </Link>
            <Link href="/portfolio" className={cn(buttonVariants({ size: "lg", variant: "outline" }), "w-full sm:w-auto")}>
              View Portfolio
            </Link>
          </div>
        </motion.div>

        {/* Floating Cards / UI Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-16 md:mt-24 w-full max-w-5xl relative"
        >
          <div className="aspect-video rounded-xl overflow-hidden border shadow-2xl bg-card relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
            {/* Abstract UI representation */}
            <div className="p-4 border-b flex gap-2">
              <div className="w-3 h-3 rounded-full bg-destructive/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <div className="p-8 flex gap-8 h-full">
              <div className="w-64 border rounded-lg bg-background p-4 hidden md:block">
                <div className="h-8 bg-muted rounded mb-4" />
                <div className="space-y-2">
                  <div className="h-4 bg-muted rounded w-full" />
                  <div className="h-4 bg-muted rounded w-5/6" />
                  <div className="h-4 bg-muted rounded w-4/6" />
                </div>
              </div>
              <div className="flex-1 flex flex-col gap-4">
                <div className="h-12 bg-muted rounded-lg" />
                <div className="flex-1 border rounded-lg bg-background" />
              </div>
            </div>
          </div>
          
          {/* Floating Stats */}
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="absolute -left-10 top-20 bg-card border rounded-lg p-4 shadow-xl hidden lg:block"
          >
            <p className="text-sm text-muted-foreground font-medium">Projects Delivered</p>
            <p className="text-3xl font-bold">150+</p>
          </motion.div>
          
          <motion.div 
            animate={{ y: [0, 15, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            className="absolute -right-8 bottom-20 bg-card border rounded-lg p-4 shadow-xl hidden lg:block"
          >
            <p className="text-sm text-muted-foreground font-medium">Client Satisfaction</p>
            <p className="text-3xl font-bold">99%</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
