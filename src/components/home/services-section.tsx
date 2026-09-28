"use client";

import { motion } from "framer-motion";
import { Code, Smartphone, Cloud, Cpu, PenTool, Database } from "lucide-react";

const SERVICES = [
  {
    title: "Web Development",
    label: "Frontend & Backend",
    description: "High-performance web applications built with Next.js, React, and modern architectures.",
    icon: Code,
    color: "from-blue-500 to-cyan-400"
  },
  {
    title: "Mobile Apps",
    label: "iOS & Android",
    description: "Native-like cross-platform mobile experiences using React Native.",
    icon: Smartphone,
    color: "from-purple-500 to-indigo-400"
  },
  {
    title: "SaaS Development",
    label: "Scalable Platforms",
    description: "End-to-end SaaS product development from architecture to subscription management.",
    icon: Cloud,
    color: "from-cyan-500 to-teal-400"
  },
  {
    title: "AI Solutions",
    label: "Machine Learning",
    description: "Integrate large language models and machine learning to supercharge your business.",
    icon: Cpu,
    color: "from-orange-500 to-pink-500"
  },
  {
    title: "UI/UX Design",
    label: "Product Design",
    description: "Beautiful, intuitive interfaces that users love, designed with a focus on conversion.",
    icon: PenTool,
    color: "from-pink-500 to-rose-400"
  },
  {
    title: "Cloud & DevOps",
    label: "Infrastructure",
    description: "Scalable infrastructure and automated deployment pipelines for maximum reliability.",
    icon: Database,
    color: "from-blue-600 to-indigo-600"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
};

export function ServicesSection() {
  return (
    <section className="py-32 relative bg-slate-50 dark:bg-slate-950 overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-30 pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm font-semibold text-slate-700 dark:text-slate-300 mb-6 shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            Comprehensive Capabilities
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white mb-6"
          >
            Technology <span className="text-gradient">Expertise</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-slate-600 dark:text-slate-400"
          >
            We provide end-to-end software development services tailored to build the next generation of digital products.
          </motion.p>
        </div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {SERVICES.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                variants={itemVariants}
                whileHover={{ y: -10, rotateX: 2, rotateY: -2 }}
                className="group relative h-full perspective-1000"
              >
                {/* Hover Glow Effect */}
                <div className={`absolute -inset-0.5 bg-gradient-to-br ${service.color} rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-500`} />
                
                <div className="relative h-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 overflow-hidden shadow-sm group-hover:shadow-xl group-hover:border-slate-300 dark:group-hover:border-slate-700 transition-all duration-500">
                  {/* Subtle inner background pattern on hover */}
                  <div className="absolute inset-0 bg-grid-pattern opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
                  
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex items-start justify-between mb-8">
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} p-[1px] group-hover:scale-110 transition-transform duration-500`}>
                        <div className="w-full h-full bg-white dark:bg-slate-900 rounded-xl flex items-center justify-center">
                          <Icon className="w-6 h-6 text-slate-800 dark:text-slate-200 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-br group-hover:from-blue-500 group-hover:to-cyan-400 transition-all" />
                        </div>
                      </div>
                      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                        {service.label}
                      </span>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
                      {service.title}
                    </h3>
                    
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed flex-grow">
                      {service.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  );
}
