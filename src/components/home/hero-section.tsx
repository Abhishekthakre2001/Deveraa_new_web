"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ArrowRight, Code2, Cpu, Globe, Layout, Smartphone } from "lucide-react";
import { useRef } from "react";
import heroImg from "@/app/assets/deveraa-herosection.jpeg";

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[90vh] flex items-center overflow-hidden bg-white dark:bg-slate-950 pt-20"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 z-0 bg-grid-pattern opacity-50" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/20 dark:bg-blue-600/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-400/20 dark:bg-cyan-600/20 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-400/10 dark:bg-purple-600/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 sm:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 text-blue-600 dark:text-blue-400 text-sm font-medium mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Digital Product Engineering
            </motion.div>

            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1] mb-6">
              Build Modern Software <br />
              <span className="text-gradient">
                Products Faster
              </span>
            </h1>
            
            <p className="text-lg lg:text-xl text-slate-600 dark:text-slate-300 mb-10 max-w-xl leading-relaxed">
              DevEraa is a premium software development company delivering enterprise-grade web, mobile, SaaS, and AI solutions for forward-thinking brands.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Link 
                href="/contact" 
                className={cn(
                  buttonVariants({ size: "lg" }), 
                  "w-full sm:w-auto h-14 px-8 text-base shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all rounded-full group"
                )}
              >
                Schedule Consultation
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/portfolio" 
                className={cn(
                  buttonVariants({ size: "lg", variant: "outline" }), 
                  "w-full sm:w-auto h-14 px-8 text-base rounded-full border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
                )}
              >
                Explore Work
              </Link>
            </div>
          </motion.div>

          {/* Right: 3D/Abstract Visual */}
          <motion.div
            style={{ y, opacity }}
            className="relative h-[500px] lg:h-[600px] w-full hidden md:block"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Central glowing orb */}
              <motion.div 
                animate={{ 
                  scale: [1, 1.05, 1],
                  rotate: [0, 90, 0]
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute w-64 h-64 bg-gradient-to-tr from-blue-500 to-cyan-400 rounded-full blur-[80px] opacity-40 dark:opacity-20"
              />

              {/* Floating UI Elements */}
              <motion.div 
                animate={{ y: [-15, 15, -15], rotateZ: [-2, 2, -2] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute z-20 top-1/4 -left-10 glass-card p-4 rounded-2xl w-64"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400">
                    <Code2 size={20} />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-900 dark:text-white">API Integration</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">Latency: 45ms</div>
                  </div>
                </div>
                <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <motion.div 
                    animate={{ width: ["0%", "100%", "0%"] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="h-full bg-blue-500" 
                  />
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.9, rotateX: 10, rotateY: -10 }}
                animate={{ opacity: 1, scale: 1, rotateX: 0, rotateY: 0 }}
                transition={{ duration: 1, delay: 0.3, type: "spring" }}
                className="absolute z-10 rounded-2xl w-[120%] max-w-lg shadow-2xl overflow-hidden"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={heroImg.src} 
                  alt="DevEraa Hero"
                  className="w-full h-auto object-cover rounded-2xl"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
