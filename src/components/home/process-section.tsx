"use client";

import { motion } from "framer-motion";

const STEPS = [
  { num: "01", title: "Discovery", desc: "Understanding your vision, goals, and technical requirements." },
  { num: "02", title: "Planning", desc: "Architecting the solution and defining the roadmap." },
  { num: "03", title: "Design", desc: "Creating intuitive and beautiful user interfaces." },
  { num: "04", title: "Development", desc: "Agile sprints turning designs into robust code." },
  { num: "05", title: "Testing", desc: "Rigorous QA to ensure flawless performance." },
  { num: "06", title: "Deployment", desc: "Smooth launch with zero downtime." },
  { num: "07", title: "Maintenance", desc: "Continuous support and feature updates." },
];

export function ProcessSection() {
  return (
    <section className="py-24 bg-muted/20 overflow-hidden">
        {/* Center Heading */}
        <div className="max-w-7xl mx-auto text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-5 py-2 text-sm font-medium text-primary"
          >
          Our Development Process
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
              Successful Product Launch
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-6 text-lg text-muted-foreground max-w-3xl mx-auto"
          >
        A proven methodology that guarantees project success from concept to launch.
          </motion.p>
        </div>
      <div className="container mx-auto px-4 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
         
          {/* <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Development Process</h2>
          <p className="text-muted-foreground text-lg">
            A proven methodology that guarantees project success from concept to launch.
          </p> */}
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Animated Line */}
          <div className="absolute left-[27px] md:left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2" />
          <motion.div 
            className="absolute left-[27px] md:left-1/2 top-0 w-0.5 bg-primary -translate-x-1/2 origin-top"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />

          <div className="space-y-12 relative z-10">
            {STEPS.map((step, index) => {
              const isEven = index % 2 === 0;
              return (
                <div key={step.num} className={`flex flex-col md:flex-row items-start ${isEven ? 'md:flex-row-reverse' : ''} gap-8 md:gap-16`}>
                  <div className="flex-1 md:text-right w-full" />
                  
                  <div className="absolute left-0 md:left-1/2 -translate-x-0 md:-translate-x-1/2 flex items-center justify-center">
                    <motion.div 
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                      className="w-14 h-14 rounded-full bg-background border-2 border-primary flex items-center justify-center font-bold text-lg shadow-sm"
                    >
                      {step.num}
                    </motion.div>
                  </div>

                  <motion.div 
                    initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className={`flex-1 w-full pl-20 md:pl-0 ${isEven ? 'md:text-left' : 'md:text-right'}`}
                  >
                    <div className="bg-card border p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                      <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                      <p className="text-muted-foreground">{step.desc}</p>
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
