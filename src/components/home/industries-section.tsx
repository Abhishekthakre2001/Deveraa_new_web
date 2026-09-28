"use client";

import { motion } from "framer-motion";
import { Activity, Landmark, Truck, GraduationCap, Building2, Factory, ShoppingCart, Lightbulb } from "lucide-react";

const INDUSTRIES = [
  { name: "Healthcare", icon: Activity, color: "from-emerald-500 to-green-400" },
  { name: "FinTech", icon: Landmark, color: "from-blue-600 to-cyan-500" },
  { name: "Logistics", icon: Truck, color: "from-orange-500 to-amber-400" },
  { name: "Education", icon: GraduationCap, color: "from-purple-500 to-fuchsia-400" },
  { name: "Real Estate", icon: Building2, color: "from-rose-500 to-pink-400" },
  { name: "Manufacturing", icon: Factory, color: "from-slate-600 to-slate-400" },
  { name: "Retail", icon: ShoppingCart, color: "from-indigo-500 to-blue-400" },
  { name: "AI Startups", icon: Lightbulb, color: "from-yellow-500 to-orange-400" },
];

export function IndustriesSection() {
  return (
    <section className="relative py-32 overflow-hidden bg-white dark:bg-slate-950">
      <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent" />
      
      {/* Background gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[500px] bg-blue-50/50 dark:bg-blue-900/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-8 relative z-10">
        
        <div className="max-w-3xl mx-auto text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm font-semibold text-slate-700 dark:text-slate-300 mb-6 shadow-sm"
          >
            Industries We Serve
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white mb-6 leading-tight"
          >
            From Vision to <br />
            <span className="text-gradient">Intelligent Solutions</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg md:text-xl text-slate-600 dark:text-slate-400"
          >
            We partner with forward-thinking organizations across diverse sectors to deliver transformational digital products.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {INDUSTRIES.map((industry, index) => {
            const Icon = industry.icon;
            return (
              <motion.div
                key={industry.name}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.1, duration: 0.5, type: "spring" }}
                className="group relative"
              >
                {/* Glow behind card */}
                <div className={`absolute -inset-0.5 bg-gradient-to-br ${industry.color} rounded-2xl blur opacity-0 group-hover:opacity-15 transition duration-500`} />
                
                <div className="relative h-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1">
                  
                  {/* Top Accent Line */}
                  <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${industry.color} scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500`} />
                  
                  <div className="flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-sm border border-slate-100 dark:border-slate-700">
                      <Icon className="w-8 h-8 text-slate-700 dark:text-slate-300 group-hover:text-blue-500 dark:group-hover:text-cyan-400 transition-colors" />
                    </div>
                    
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors mb-2">
                      {industry.name}
                    </h3>
                    
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Tailored solutions
                    </p>
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
