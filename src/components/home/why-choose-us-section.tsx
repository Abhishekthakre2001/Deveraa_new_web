"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { CheckCircle2, TrendingUp, ShieldCheck, Zap, Users } from "lucide-react";
import { useRef } from "react";

const FEATURES = [
  {
    title: "World-Class Engineering",
    desc: "Top 1% software engineers building scalable, enterprise-grade architectures.",
    icon: Users,
  },
  {
    title: "Rapid Market Delivery",
    desc: "Agile methodologies that reduce time-to-market without compromising quality.",
    icon: Zap,
  },
  {
    title: "Bank-Grade Security",
    desc: "Security-first development following strict industry compliance standards.",
    icon: ShieldCheck,
  },
  {
    title: "Guaranteed Growth",
    desc: "Products optimized for conversion, retention, and maximum business impact.",
    icon: TrendingUp,
  }
];

export function WhyChooseUsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  return (
    <section ref={containerRef} className="py-32 relative bg-white dark:bg-slate-950 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Content */}
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 text-sm font-semibold text-blue-600 dark:text-blue-400 mb-6"
            >
              The Deveraa Advantage
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 leading-tight"
            >
              Why Forward-Thinking <br />
              <span className="text-gradient">Businesses Choose Us</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg text-slate-600 dark:text-slate-400 mb-12"
            >
              We combine technical excellence, transparent communication, and a business-first mindset to build digital products that drive real revenue.
            </motion.p>

            <div className="space-y-8">
              {FEATURES.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + (index * 0.1) }}
                    className="flex gap-5"
                  >
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-slate-900 border border-blue-100 dark:border-slate-800 flex items-center justify-center text-blue-600 dark:text-cyan-400 shadow-sm">
                        <Icon size={20} />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                        {feature.title}
                      </h4>
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                        {feature.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right: 3D/CSS Illustration representing "Business Growth" */}
          <div className="relative h-[600px] w-full hidden lg:block perspective-1000">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 to-purple-500/5 rounded-3xl border border-slate-100 dark:border-slate-800" />
            
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-400/20 rounded-full blur-[100px]" />

            {/* Central Dashboard Mockup */}
            <motion.div 
              style={{ y: y1 }}
              className="absolute top-20 left-10 right-10 glass-card rounded-2xl border border-white/40 shadow-2xl overflow-hidden z-20"
            >
              <div className="h-12 border-b border-slate-200/50 dark:border-slate-700/50 bg-slate-50/50 dark:bg-slate-900/50 flex items-center px-4 justify-between">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-600" />
                  <div className="w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-600" />
                  <div className="w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-600" />
                </div>
                <div className="text-xs font-semibold text-slate-400">Growth Analytics</div>
              </div>
              <div className="p-6">
                <div className="flex gap-6 mb-6">
                  <div className="flex-1 bg-white/60 dark:bg-slate-800/60 rounded-xl p-4 shadow-sm border border-slate-100 dark:border-slate-700">
                    <div className="text-sm text-slate-500 mb-1">Active Users</div>
                    <div className="text-2xl font-bold text-slate-900 dark:text-white">124.5K</div>
                    <div className="text-xs text-green-500 flex items-center gap-1 mt-1"><TrendingUp size={12}/> +14.2%</div>
                  </div>
                  <div className="flex-1 bg-white/60 dark:bg-slate-800/60 rounded-xl p-4 shadow-sm border border-slate-100 dark:border-slate-700">
                    <div className="text-sm text-slate-500 mb-1">Revenue</div>
                    <div className="text-2xl font-bold text-slate-900 dark:text-white">$842K</div>
                    <div className="text-xs text-green-500 flex items-center gap-1 mt-1"><TrendingUp size={12}/> +28.4%</div>
                  </div>
                </div>
                {/* Fake Chart */}
                <div className="h-32 w-full flex items-end gap-2">
                  {[40, 60, 45, 80, 65, 90, 75, 100].map((h, i) => (
                    <motion.div 
                      key={i}
                      initial={{ height: "0%" }}
                      whileInView={{ height: `${h}%` }}
                      transition={{ duration: 1, delay: i * 0.1 }}
                      className="flex-1 bg-gradient-to-t from-blue-500 to-cyan-400 rounded-t-md opacity-80"
                    />
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Floating Mobile Mockup */}
            <motion.div 
              style={{ y: y2 }}
              className="absolute -right-6 bottom-20 w-48 h-80 glass-card rounded-[2rem] border-[6px] border-slate-900 dark:border-slate-800 shadow-2xl overflow-hidden z-30"
            >
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-4 bg-slate-900 dark:bg-slate-800 rounded-full z-10" />
              <div className="w-full h-full bg-slate-50 dark:bg-slate-900 p-4 pt-10 flex flex-col gap-3">
                <div className="h-20 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500" />
                <div className="h-4 w-2/3 bg-slate-200 dark:bg-slate-800 rounded" />
                <div className="flex gap-2">
                  <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800" />
                  <div className="flex-1 rounded-xl bg-slate-200 dark:bg-slate-800" />
                </div>
                <div className="flex gap-2">
                  <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800" />
                  <div className="flex-1 rounded-xl bg-slate-200 dark:bg-slate-800" />
                </div>
              </div>
            </motion.div>

            {/* Floating Badge */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute top-10 -left-6 z-30 glass px-4 py-3 rounded-2xl flex items-center gap-3 shadow-xl"
            >
              <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center text-green-600 dark:text-green-400">
                <CheckCircle2 size={20} />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900 dark:text-white">99% Success</div>
                <div className="text-xs text-slate-500">Client Satisfaction</div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}