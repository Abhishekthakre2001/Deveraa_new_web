"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, MessageSquare, Sparkles } from "lucide-react";

export function CtaSection() {
  return (
    <section className="py-32 relative overflow-hidden bg-slate-900 text-white">
      {/* Premium Dark Background with Glowing Orb */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl aspect-square">
        <motion.div 
          animate={{ scale: [1, 1.1, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 bg-gradient-to-tr from-blue-600 via-cyan-500 to-purple-600 rounded-full blur-[120px] opacity-40 mix-blend-screen"
        />
      </div>

      {/* Floating UI Elements */}
      <motion.div 
        animate={{ y: [-15, 15, -15], rotateZ: [-5, 5, -5] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-[10%] w-24 h-24 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl flex items-center justify-center opacity-70 hidden md:flex"
      >
        <Sparkles className="text-cyan-400 w-10 h-10" />
      </motion.div>

      <motion.div 
        animate={{ y: [15, -15, 15], rotateZ: [5, -5, 5] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-20 right-[10%] w-32 h-32 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 shadow-2xl flex items-center justify-center opacity-70 hidden md:flex"
      >
        <MessageSquare className="text-purple-400 w-12 h-12" />
      </motion.div>

      <div className="container mx-auto px-4 sm:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, type: "spring" }}
          className="max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm font-semibold text-cyan-300 mb-8 shadow-2xl">
            Ready to transform your business?
          </div>

          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-[1.1] tracking-tight">
            Let&apos;s Turn Your Idea Into a <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Digital Product
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            Join forward-thinking brands that trust DevEraa to deliver exceptional software solutions with speed and precision.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link 
              href="/contact" 
              className="w-full sm:w-auto h-16 px-10 rounded-full bg-white text-slate-900 font-bold text-lg flex items-center justify-center shadow-[0_0_40px_-10px_rgba(255,255,255,0.5)] hover:shadow-[0_0_60px_-15px_rgba(255,255,255,0.7)] hover:scale-105 transition-all duration-300 group"
            >
              Start Your Project
              <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link 
              href="/portfolio" 
              className="w-full sm:w-auto h-16 px-10 rounded-full bg-transparent border-2 border-white/20 text-white font-bold text-lg flex items-center justify-center hover:bg-white/10 backdrop-blur-md transition-all duration-300"
            >
              View Our Work
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
