"use client";

import { motion } from "framer-motion";
import { Database, Layout, Server, Smartphone, Cloud, Cog, Cpu } from "lucide-react";

const TECH_CATEGORIES = [
  { name: "Frontend", icon: Layout, skills: ["React", "Next.js", "Vue", "TailwindCSS"] },
  { name: "Backend", icon: Server, skills: ["Node.js", "Python", "Go", "Java"] },
  { name: "Mobile", icon: Smartphone, skills: ["React Native", "Flutter", "Swift", "Kotlin"] },
  { name: "Cloud", icon: Cloud, skills: ["AWS", "GCP", "Azure", "Vercel"] },
  { name: "Database", icon: Database, skills: ["PostgreSQL", "MongoDB", "Redis", "MySQL"] },
  { name: "DevOps", icon: Cog, skills: ["Docker", "Kubernetes", "CI/CD", "Terraform"] },
  { name: "AI / ML", icon: Cpu, skills: ["OpenAI", "LangChain", "TensorFlow", "PyTorch"] },
];

export function TechStackSection() {
  return (
    <section className="py-32 relative bg-slate-50 dark:bg-slate-950 overflow-hidden">
      
      {/* Abstract Background for Technology Ecosystem */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-blue-500/10 dark:border-blue-500/20 rounded-full animate-[spin_60s_linear_infinite]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-cyan-500/10 dark:border-cyan-500/20 rounded-full animate-[spin_40s_linear_infinite_reverse]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-purple-500/10 dark:border-purple-500/20 rounded-full animate-[spin_20s_linear_infinite]" />
      </div>

      <div className="container mx-auto px-4 sm:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm font-semibold text-slate-700 dark:text-slate-300 mb-6 shadow-sm"
          >
            Technology Ecosystem
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white mb-6 leading-tight"
          >
            Built with Modern <br />
            <span className="text-gradient">Technologies</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg md:text-xl text-slate-600 dark:text-slate-400"
          >
            We leverage best-in-class tools and frameworks to build scalable, secure, and future-proof digital products.
          </motion.p>
        </div>

        {/* Floating Technology Grid */}
        <div className="flex flex-wrap justify-center gap-6 lg:gap-8 max-w-6xl mx-auto">
          {TECH_CATEGORIES.map((category, i) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, scale: 0.8, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  delay: i * 0.1, 
                  type: "spring", 
                  stiffness: 100, 
                  damping: 15 
                }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="glass-card w-full sm:w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-1.5rem)] p-6 rounded-3xl relative overflow-hidden group"
              >
                {/* Connection line animation on hover */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-500/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-blue-600 dark:text-cyan-400 shadow-sm border border-slate-200 dark:border-slate-700 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                      <Icon size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">{category.name}</h3>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map(skill => (
                      <span 
                        key={skill} 
                        className="px-3 py-1 text-sm font-medium bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-full shadow-sm group-hover:border-blue-500/30 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  );
}