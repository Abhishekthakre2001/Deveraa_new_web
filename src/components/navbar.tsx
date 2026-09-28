"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "./theme-toggle";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import LogoSM from "../app/assets/logo-sm.png";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Services", href: "/services" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
  ];

  return (
    <>
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-300 ease-in-out border-b border-transparent",
          scrolled 
            ? "bg-white/70 dark:bg-slate-950/70 backdrop-blur-md shadow-sm border-slate-200 dark:border-slate-800 py-3" 
            : "bg-transparent py-5"
        )}
      >
        <div className="container mx-auto flex items-center justify-between px-4 sm:px-8">
          <div className="flex items-center gap-6 md:gap-10">
            <Link href="/" className="flex items-center space-x-2 relative z-50">
              <Image
                src={LogoSM}
                alt="Deveraa Logo"
                width={160}
                height={45}
                priority
                className="h-9 sm:h-10 w-auto"
              />
            </Link>
            
            <nav className="hidden md:flex gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm font-semibold text-slate-600 dark:text-slate-300 transition-colors hover:text-blue-600 dark:hover:text-cyan-400"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden sm:block">
              <ThemeToggle />
            </div>
            <Link 
              href="/contact" 
              className={cn(
                buttonVariants({ variant: scrolled ? "default" : "secondary" }), 
                "hidden sm:inline-flex font-semibold shadow-md hover:shadow-lg transition-all"
              )}
            >
              Book Meeting
            </Link>
            
            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden relative z-50 p-2 text-slate-800 dark:text-slate-200"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-white dark:bg-slate-950 pt-24 px-4 flex flex-col"
          >
            <nav className="flex flex-col gap-6 text-center text-2xl font-semibold mt-10">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-cyan-400"
                >
                  {link.name}
                </Link>
              ))}
              <Link 
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-4 text-blue-600 dark:text-cyan-400"
              >
                Book Meeting
              </Link>
            </nav>
            <div className="mt-auto mb-10 flex justify-center">
              <ThemeToggle />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
