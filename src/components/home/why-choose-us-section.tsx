"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Award,
  ShieldCheck,
  Rocket,
  Users,
  Clock,
  Layers3,
} from "lucide-react";

import Aboutus from "../../app/assets/Aboutus.png";

const FEATURES = [
  {
    title: "Experienced Engineers",
    desc: "Top 1% software engineers with years of enterprise experience.",
    icon: Award,
    color: "from-cyan-500 to-blue-500",
  },
  {
    title: "Agile Development",
    desc: "Weekly releases with transparent communication and planning.",
    icon: Layers3,
    color: "from-violet-500 to-purple-500",
  },
  {
    title: "Fast Delivery",
    desc: "Launch products quickly while maintaining exceptional quality.",
    icon: Rocket,
    color: "from-orange-500 to-red-500",
  },
  {
    title: "Enterprise Security",
    desc: "Security-first architecture following industry best practices.",
    icon: ShieldCheck,
    color: "from-emerald-500 to-green-500",
  },
  {
    title: "Scalable Solutions",
    desc: "Infrastructure built to serve millions of users effortlessly.",
    icon: Users,
    color: "from-sky-500 to-indigo-500",
  },
  {
    title: "Long-Term Support",
    desc: "Continuous maintenance, optimization, and feature enhancements.",
    icon: Clock,
    color: "from-yellow-500 to-orange-500",
  },
];

const STATS = [
  {
    value: "150+",
    label: "Projects",
  },
  {
    value: "99%",
    label: "Client Satisfaction",
  },
  {
    value: "8+",
    label: "Years Experience",
  },
];

export function WhyChooseUsSection() {
  return (
    <section className="relative overflow-hidden py-28">
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-0 top-24 h-96 w-96 rounded-full bg-cyan-500/10 blur-[120px]" />
        <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-violet-500/10 blur-[120px]" />
      </div>

      <div className="container mx-auto px-6">

        {/* Center Heading */}
        <div className="max-w-4xl mx-auto text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-5 py-2 text-sm font-medium text-primary"
          >
            Why Choose Deveraa
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="mt-6 text-4xl md:text-6xl font-bold leading-tight"
          >
            Why Businesses
            <br />

            <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 bg-clip-text text-transparent">
              Choose Deveraa
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-6 text-lg text-muted-foreground max-w-3xl mx-auto"
          >
            We combine technical excellence, transparent communication, and a
            business-first mindset to build secure, scalable, and high-performing
            digital products.
          </motion.p>
        </div>

        {/* Content */}
        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl  bg-background/60 backdrop-blur-xl p-8 "
          >
            <h3 className="text-2xl font-bold mb-8">
              What Makes Us Different
            </h3>

            <div className="space-y-6">
              {FEATURES.map((feature) => {
                const Icon = feature.icon;

                return (
                  <div
                    key={feature.title}
                    className="flex items-start gap-4"
                  >
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r ${feature.color} text-white`}
                    >
                      <Icon size={22} />
                    </div>

                    <div>
                      <h4 className="font-semibold text-lg">
                        {feature.title}
                      </h4>

                      <p className="text-muted-foreground text-sm mt-1 leading-6">
                        {feature.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
          {/* Right Side */}
          <motion.div initial={{ opacity: 0, scale: 0.9, }} whileInView={{ opacity: 1, scale: 1, }} viewport={{ once: true }} className="relative" >
            {/* Glow */}
            <div className="absolute inset-0 rounded-[40px] bg-gradient-to-br from-cyan-500/20 via-transparent to-violet-500/20 blur-3xl" />
            {/* Image */}
            <div className="relative overflow-hidden rounded-[32px] border bg-background/60 p-4 backdrop-blur-xl shadow-2xl">
              <Image src={Aboutus} alt="About Deveraa" className="rounded-3xl object-cover" priority />
            </div>
            {/* Floating Card */}
            <motion.div animate={{ y: [0, -12, 0], }} transition={{ repeat: Infinity, duration: 4, }} className="absolute -left-6 top-10 rounded-2xl border bg-background/80 backdrop-blur-xl p-5 shadow-xl" >
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-green-500/20 p-2">
                  <CheckCircle2 className="text-green-500" />
                </div>
                <div>
                  <h4 className="font-semibold">99% Success</h4>
                  <p className="text-sm text-muted-foreground"> Client Satisfaction </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}