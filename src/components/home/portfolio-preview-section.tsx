"use client";

import { motion } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import tradingAppImg from "@/app/assets/project/project4.png";
import EcommerseImg from "@/app/assets/project/project2.png";
import tradingApp1Img from "@/app/assets/tradingmobileapp.jpeg";
import viceoCallImg from "@/app/assets/viceo-call.jpeg";

const PROJECTS = [
  {
    title: "Global FinTech Platform",
    category: "Financial Technology",
    description: "A highly secure, scalable payment processing platform handling millions of transactions daily with real-time analytics.",
    image: tradingAppImg,
    tech: ["Next.js", "Node.js", "PostgreSQL", "AWS"],
    color: "from-blue-500 to-cyan-400"
  },
  {
    title: "AI Healthcare Assistant",
    category: "HealthTech & AI",
    description: "Intelligent diagnostic assistant utilizing large language models to help doctors analyze patient data rapidly.",
    image: viceoCallImg,
    tech: ["React Native", "Python", "OpenAI", "GCP"],
    color: "from-purple-500 to-indigo-400"
  },
  {
    title: "Enterprise E-commerce",
    category: "Retail & Logistics",
    description: "Headless e-commerce solution with extreme performance, real-time inventory, and AI-driven recommendations.",
    image: EcommerseImg,
    tech: ["Vue.js", "NestJS", "Redis", "Docker"],
    color: "from-cyan-500 to-teal-400"
  }
];

export function PortfolioPreviewSection() {
  return (
    <section className="py-32 bg-white dark:bg-slate-950 relative overflow-hidden">
      
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-8 relative z-10">

        <div className="max-w-4xl mx-auto text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm font-semibold text-slate-700 dark:text-slate-300 mb-6 shadow-sm"
          >
            Our Featured Work
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white mb-6 leading-tight"
          >
            Transforming Ideas Into <br />
            <span className="text-gradient">Digital Success Stories</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
          >
            Discover how we&apos;ve partnered with forward-thinking organizations to build scalable digital products that deliver measurable business impact.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {PROJECTS.map((project, idx) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.1, duration: 0.6, type: "spring", bounce: 0.3 }}
              className="group relative perspective-1000"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-br from-slate-200 to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-3xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
              
              <div className="relative h-full glass-card rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 group-hover:border-slate-300 dark:group-hover:border-slate-700 transition-all duration-500 flex flex-col group-hover:-translate-y-2 group-hover:rotate-x-2">
                
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden bg-slate-100 dark:bg-slate-900">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity" />
                  
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="h-full w-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                  />
                  
                  <div className="absolute top-4 left-4 z-20">
                    <span className="px-3 py-1 text-xs font-semibold bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-slate-900 dark:text-white rounded-full shadow-sm">
                      {project.category}
                    </span>
                  </div>
                  
                  {/* Floating Action Button */}
                  <div className="absolute top-4 right-4 z-20 translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                    <button className="w-10 h-10 rounded-full bg-white dark:bg-slate-900 text-slate-900 dark:text-white flex items-center justify-center shadow-lg hover:bg-blue-500 hover:text-white transition-colors">
                      <ExternalLink size={18} />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col flex-grow bg-white dark:bg-slate-900">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-slate-600 dark:text-slate-400 mb-6 flex-grow leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map(t => (
                      <span key={t} className="text-xs font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
                        {t}
                      </span>
                    ))}
                  </div>

                  <Link 
                    href="/portfolio" 
                    className="inline-flex items-center text-sm font-bold text-slate-900 dark:text-white group/link hover:text-blue-600 dark:hover:text-cyan-400 transition-colors"
                  >
                    View Project Details
                    <ArrowRight className="ml-2 w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <Link 
            href="/portfolio" 
            className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold hover:bg-blue-600 dark:hover:bg-cyan-400 hover:text-white transition-colors shadow-lg"
          >
            View All Projects
          </Link>
        </div>

      </div>
    </section>
  );
}
