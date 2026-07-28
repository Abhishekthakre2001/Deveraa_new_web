"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const PROJECTS = [
  {
    title: "Global FinTech Platform",
    industry: "Finance",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    tech: ["Next.js", "Node.js", "PostgreSQL"],
  },
  {
    title: "AI Healthcare Assistant",
    industry: "Healthcare",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
    tech: ["React Native", "Python", "OpenAI"],
  },
  {
    title: "Enterprise E-commerce",
    industry: "Retail",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    tech: ["Vue.js", "NestJS", "AWS"],
  }
];

export function PortfolioPreviewSection() {
  return (
    <section className="py-24 bg-muted/10">

        {/* Center Heading */}
        <div className="max-w-7xl mx-auto text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-5 py-2 text-sm font-medium text-primary"
          >
          Our Featured Work
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="mt-6 text-4xl md:text-6xl font-bold leading-tight"
          >
            Transforming Ideas Into
            <br />

            <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 bg-clip-text text-transparent">
              Digital Success Stories
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-6 text-lg text-muted-foreground max-w-3xl mx-auto"
          >
       Discover how we've partnered with startups, enterprises, and growing
    businesses to build scalable web applications, mobile apps, AI-powered
    platforms, and custom software that deliver measurable results.
          </motion.p>
        </div>
      <div className="container mx-auto px-4 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          {/* <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Work</h2>
            <p className="text-muted-foreground text-lg">
              Explore some of our recent projects where we turned complex challenges into elegant digital solutions.
            </p>
          </div> */}
          {/* <Link href="/portfolio" className={buttonVariants({ variant: "outline" })}>
            View All Projects <ArrowRight className="ml-2 w-4 h-4" />
          </Link> */}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project, idx) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -10 }}
              className="group cursor-pointer"
            >
              <Card className="overflow-hidden border-border/50 bg-card">
                <div className="aspect-video relative overflow-hidden bg-muted">
                  <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors z-10" />
                  {/* Note: In a real app, use next/image. Using img here for quick prototyping */}
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 z-20">
                    <Badge variant="secondary" className="bg-background/80 backdrop-blur">
                      {project.industry}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map(t => (
                      <span key={t} className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                        {t}
                      </span>
                    ))}
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
