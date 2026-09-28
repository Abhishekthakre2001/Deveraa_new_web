"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ArrowRight, Code2, Cpu, Globe, Layout, Smartphone } from "lucide-react";
import { useRef } from "react";

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
              Deveraa is a premium software development company delivering enterprise-grade web, mobile, SaaS, and AI solutions for forward-thinking brands.
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

              {/* Main App Window Mockup */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, rotateX: 10, rotateY: -10 }}
                animate={{ opacity: 1, scale: 1, rotateX: 0, rotateY: 0 }}
                transition={{ duration: 1, delay: 0.3, type: "spring" }}
                className="absolute z-10 glass-card rounded-2xl w-[120%] max-w-md h-80 border-t border-white/60 dark:border-white/20 shadow-2xl overflow-hidden"
              >
                <div className="h-10 border-b border-slate-200/50 dark:border-slate-800/50 flex items-center px-4 gap-2 bg-white/50 dark:bg-slate-900/50">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="p-6 flex flex-col gap-4 h-full">
                  <div className="flex gap-4">
                    <div className="w-1/3 h-24 rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20" />
                    <div className="w-2/3 h-24 rounded-xl bg-slate-100/50 dark:bg-slate-800/50" />
                  </div>
                  <div className="flex-1 rounded-xl bg-slate-100/50 dark:bg-slate-800/50 p-4">
                    <div className="h-3 w-1/2 bg-slate-200 dark:bg-slate-700 rounded mb-2" />
                    <div className="h-3 w-3/4 bg-slate-200 dark:bg-slate-700 rounded" />
                  </div>
                </div>
              </motion.div>

              {/* Floating Icons */}
              <motion.div 
                animate={{ y: [10, -10, 10], x: [5, -5, 5] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute z-30 bottom-1/4 -right-12 glass p-4 rounded-xl text-cyan-500 shadow-xl"
              >
                <Cpu size={24} />
              </motion.div>
              
              <motion.div 
                animate={{ y: [-20, 20, -20], x: [-10, 10, -10] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute z-30 top-10 right-10 glass p-4 rounded-xl text-purple-500 shadow-xl"
              >
                <Globe size={24} />
              </motion.div>

              <motion.div 
                animate={{ y: [15, -15, 15], x: [10, -10, 10] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute z-30 -bottom-10 left-1/4 glass p-4 rounded-xl text-blue-500 shadow-xl"
              >
                <Smartphone size={24} />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
