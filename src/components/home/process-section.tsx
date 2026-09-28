"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Lightbulb, Target, PenTool, Code2, CheckSquare, Rocket, TrendingUp } from "lucide-react";

const STEPS = [
  { num: "01", title: "Discovery", desc: "Understanding your vision, goals, and technical requirements to build a solid foundation.", icon: Lightbulb },
  { num: "02", title: "Strategy", desc: "Architecting the solution and defining the product roadmap for success.", icon: Target },
  { num: "03", title: "Design", desc: "Creating intuitive, beautiful, and conversion-optimized user interfaces.", icon: PenTool },
  { num: "04", title: "Development", desc: "Agile engineering sprints turning designs into robust, scalable code.", icon: Code2 },
  { num: "05", title: "Testing", desc: "Rigorous QA and automated testing to ensure flawless performance.", icon: CheckSquare },
  { num: "06", title: "Launch", desc: "Smooth deployment with zero downtime and continuous monitoring.", icon: Rocket },
  { num: "07", title: "Growth", desc: "Continuous support, feature updates, and performance optimization.", icon: TrendingUp },
];

export function ProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={containerRef} className="py-32 bg-slate-50 dark:bg-slate-950 relative">
      <div className="container mx-auto px-4 sm:px-8">
        
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 text-sm font-semibold text-blue-600 dark:text-blue-400 mb-6"
          >
            Product Development Process
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white leading-tight mb-6"
          >
            From Vision to <br />
            <span className="text-gradient">Successful Product Launch</span>
          </motion.h2>
          
          <motion.p
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             transition={{ delay: 0.2 }}
             viewport={{ once: true }}
             className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
          >
            Our proven methodology guarantees project success, ensuring we deliver high-quality digital products on time, every time.
          </motion.p>
        </div>

        {/* Timeline */}
        <div className="relative max-w-5xl mx-auto py-10">
          
          {/* Base Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-slate-200 dark:bg-slate-800 md:-translate-x-1/2 rounded-full" />
          
          {/* Animated Fill Line */}
          <motion.div 
            style={{ height: lineHeight }}
            className="absolute left-8 md:left-1/2 top-0 w-1 bg-gradient-to-b from-blue-500 to-cyan-400 md:-translate-x-1/2 rounded-full"
          />

          <div className="space-y-16 relative z-10">
            {STEPS.map((step, index) => {
              const isEven = index % 2 === 0;
              const Icon = step.icon;
              
              return (
                <div key={step.num} className={`flex flex-col md:flex-row items-center ${isEven ? 'md:flex-row-reverse' : ''} gap-8 md:gap-16`}>
                  
                  {/* Empty space for alternating layout */}
                  <div className="hidden md:block flex-1" />
                  
                  {/* Icon / Node */}
                  <div className="absolute left-8 md:left-1/2 -translate-x-1/2 flex items-center justify-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ delay: 0.2, type: "spring" }}
                      className="w-16 h-16 rounded-full bg-white dark:bg-slate-900 border-4 border-slate-100 dark:border-slate-800 flex items-center justify-center shadow-lg relative group"
                    >
                      <motion.div 
                         className="absolute inset-0 rounded-full border-4 border-blue-500 opacity-0"
                         whileInView={{ opacity: 1 }}
                         viewport={{ once: true, margin: "-100px" }}
                         transition={{ delay: 0.4 }}
                      />
                      <Icon className="w-6 h-6 text-slate-600 dark:text-slate-300 group-hover:text-blue-500 transition-colors" />
                    </motion.div>
                  </div>

                  {/* Content Card */}
                  <motion.div 
                    initial={{ opacity: 0, x: isEven ? 50 : -50, y: 20 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
                    className={`flex-1 w-full pl-24 md:pl-0 ${isEven ? 'md:text-left md:pr-12' : 'md:text-right md:pl-12'}`}
                  >
                    <div className="glass-card p-8 rounded-2xl relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-150 duration-500" />
                      
                      <div className="text-sm font-bold text-blue-500 mb-2">Step {step.num}</div>
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">{step.title}</h3>
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">{step.desc}</p>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
