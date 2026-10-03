"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { FaLinkedin, FaTwitter } from "react-icons/fa";
import Link from "next/link";

const TEAM = [
  {
    name: "Alex Rivera",
    role: "CEO & Founder",
    image: "https://i.pravatar.cc/300?img=11",
  },
  {
    name: "Samantha Lee",
    role: "CTO",
    image: "https://i.pravatar.cc/300?img=5",
  },
  {
    name: "David Kim",
    role: "Lead Designer",
    image: "https://i.pravatar.cc/300?img=12",
  },
  {
    name: "Rachel Green",
    role: "Head of Engineering",
    image: "https://i.pravatar.cc/300?img=9",
  }
];

export function TeamSection() {
  return (
    <section className="py-24 bg-muted/10">
      <div className="container mx-auto px-4 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet the Experts</h2>
          <p className="text-muted-foreground text-lg">
            The passionate minds driving innovation and delivering excellence.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {TEAM.map((member, idx) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group"
            >
              <Card className="overflow-hidden border-border/50 bg-background hover:shadow-lg transition-all">
                <div className="aspect-square relative overflow-hidden bg-muted">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    unoptimized
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    <Link href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors text-white">
                      <FaLinkedin className="w-5 h-5" />
                    </Link>
                    <Link href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors text-white">
                      <FaTwitter className="w-5 h-5" />
                    </Link>
                  </div>
                </div>
                <CardContent className="p-6 text-center">
                  <h3 className="font-bold text-lg mb-1">{member.name}</h3>
                  <p className="text-sm text-primary font-medium">{member.role}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
