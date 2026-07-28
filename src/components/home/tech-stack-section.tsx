"use client";

import { motion } from "framer-motion";
import {
  Code2,
  Server,
  Smartphone,
  Database,
  Cloud,
  Workflow,
} from "lucide-react";

const TECHNOLOGIES = [
  {
    category: "Frontend",
    icon: Code2,
    color: "from-cyan-500 to-blue-500",
    skills: [
      "React",
      "Next.js",
      "Vue.js",
      "Angular",
      "Tailwind CSS",
      "TypeScript",
    ],
  },
  {
    category: "Backend",
    icon: Server,
    color: "from-purple-500 to-pink-500",
    skills: [
      "Node.js",
      "NestJS",
      "Express",
      "Laravel",
      "Django",
      "ASP.NET Core",
    ],
  },
  {
    category: "Mobile",
    icon: Smartphone,
    color: "from-green-500 to-emerald-500",
    skills: ["React Native", "Flutter", "Swift", "Kotlin"],
  },
  {
    category: "Database",
    icon: Database,
    color: "from-orange-500 to-red-500",
    skills: ["PostgreSQL", "MongoDB", "MySQL", "Redis", "Firebase"],
  },
  {
    category: "Cloud",
    icon: Cloud,
    color: "from-sky-500 to-indigo-500",
    skills: ["AWS", "Azure", "Google Cloud", "Vercel", "DigitalOcean"],
  },
  {
    category: "DevOps",
    icon: Workflow,
    color: "from-yellow-500 to-amber-500",
    skills: ["Docker", "Kubernetes", "GitHub Actions", "Jenkins"],
  },
];

export function TechStackSection() {
  return (
    <section className="relative overflow-hidden py-28">
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-20 h-80 w-80 -translate-x-1/2 rounded-full bg-primary/20 blur-[120px]" />
        <div className="absolute bottom-10 right-10 h-64 w-64 rounded-full bg-cyan-500/10 blur-[120px]" />
      </div>

      <div className="container mx-auto px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-20 max-w-3xl text-center"
        >
          <span className="rounded-full border border-primary/20 bg-primary/10 px-5 py-2 text-sm font-medium text-primary">
            Our Technology Stack
          </span>

          <h2 className="mt-6 text-4xl font-bold md:text-6xl">
            Built with{" "}
            <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 bg-clip-text text-transparent">
              Modern Technologies
            </span>
          </h2>

          <p className="mt-6 text-lg text-muted-foreground">
            We carefully choose industry-leading technologies to build secure,
            scalable, and lightning-fast digital products.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {TECHNOLOGIES.map((tech, index) => {
            const Icon = tech.icon;

            return (
              <motion.div
                key={tech.category}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.5,
                }}
                whileHover={{
                  y: -8,
                  scale: 1.03,
                }}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-background/60 p-8 backdrop-blur-xl transition-all duration-300 hover:border-primary/30 hover:shadow-2xl"
              >
                {/* Gradient Glow */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${tech.color} opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-15`}
                />

                {/* Icon */}
                <div
                  className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r ${tech.color} text-white shadow-lg`}
                >
                  <Icon size={26} />
                </div>

                <h3 className="mb-6 text-2xl font-bold">
                  {tech.category}
                </h3>

                <div className="flex flex-wrap gap-3">
                  {tech.skills.map((skill) => (
                    <motion.span
                      key={skill}
                      whileHover={{
                        scale: 1.08,
                      }}
                      className="rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-medium transition-all hover:bg-primary hover:text-primary-foreground"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}