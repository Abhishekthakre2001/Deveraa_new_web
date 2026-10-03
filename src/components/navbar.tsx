"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useMotionValue,
  useScroll,
  useSpring,
} from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Briefcase,
  CalendarDays,
  ChevronDown,
  Cloud,
  Cpu,
  Globe,
  Layers,
  Mail,
  PenTool,
  Phone,
  Smartphone,
  Users,
} from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { cn } from "@/lib/utils";
import Logo from "../app/assets/deveraa-logo.png";

const EASE = [0.22, 1, 0.36, 1] as const;
const GRADIENT = "from-cyan-500 via-blue-500 to-violet-500";

// Placeholder contact details: use the same ones as your contact page
const EMAIL = "hello@deveraa.com";
const PHONE_HREF = "tel:+919876543210";

const SERVICES = [
  { icon: Globe, name: "Web Development", text: "Fast, modern sites and web apps", href: "/services/web" },
  { icon: Smartphone, name: "Mobile Apps", text: "iOS and Android, native feel", href: "/services/mobile" },
  { icon: Layers, name: "SaaS Solutions", text: "Scalable multi-tenant platforms", href: "/services/saas" },
  { icon: Cpu, name: "AI Solutions", text: "Automation, LLMs and analytics", href: "/services/ai" },
  { icon: PenTool, name: "UI/UX Design", text: "Research-led, beautiful interfaces", href: "/services/ui-ux" },
  { icon: Cloud, name: "Cloud & DevOps", text: "Reliable, automated infrastructure", href: "/services/cloud" },
];

const NAV_LINKS = [
  { name: "Home", href: "/", icon: Users, mega: false },
  { name: "About", href: "/about", icon: Users, mega: false },
  { name: "Services", href: "/services", icon: Layers, mega: true },
  { name: "Portfolio", href: "/portfolio", icon: Briefcase, mega: false },
  { name: "Contact", href: "/contact", icon: Phone, mega: false },
];

/* ---------- pieces ---------- */

/** Call-to-action that leans toward the cursor and sweeps a shine on hover */
function MagneticCta() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });

  return (
    <motion.div
      style={{ x: sx, y: sy }}
      className="hidden sm:block"
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * 0.25);
        y.set((e.clientY - (r.top + r.height / 2)) * 0.35);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      <Link
        href="/contact"
        className={`group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r ${GRADIENT} px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-500/25 transition-shadow hover:shadow-lg hover:shadow-blue-500/40`}
      >
        <span
          aria-hidden
          className="absolute inset-y-0 left-0 w-1/3 -translate-x-full skew-x-[-20deg] bg-white/30 transition-transform duration-700 group-hover:translate-x-[400%]"
        />
        <CalendarDays className="relative h-4 w-4" />
        <span className="relative">Book Meeting</span>
        <ArrowRight className="relative h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </Link>
    </motion.div>
  );
}

function ServicesMenu({ onNavigate }: { onNavigate: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.98, transition: { duration: 0.15 } }}
      transition={{ duration: 0.25, ease: EASE }}
      className="absolute inset-x-0 top-full z-50 mx-auto w-[44rem] max-w-full pt-3"
    >
      <div className="grid gap-2 rounded-3xl border border-slate-200/80 bg-white/95 p-3 shadow-2xl shadow-slate-900/10 dark:border-slate-800 dark:bg-slate-950/95 lg:grid-cols-[1fr_15rem]">
        <div className="grid grid-cols-2 gap-1">
          {SERVICES.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.name}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 + i * 0.04 }}
              >
                <Link
                  href={s.href}
                  onClick={onNavigate}
                  className="group flex items-start gap-3 rounded-2xl p-3 transition-colors hover:bg-slate-900/5 dark:hover:bg-white/5"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-blue-600 transition-all duration-300 group-hover:rotate-6 group-hover:bg-gradient-to-br group-hover:from-cyan-500 group-hover:to-violet-500 group-hover:text-white dark:bg-slate-800 dark:text-cyan-400">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold">{s.name}</span>
                    <span className="block text-xs text-slate-500 dark:text-slate-400">{s.text}</span>
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <div
          className={`relative flex flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-br ${GRADIENT} p-5 text-white`}
        >
          <div aria-hidden className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-white/15" />
          <div className="relative">
            <p className="text-lg font-bold leading-snug">Not sure where to start?</p>
            <p className="mt-1 text-sm text-white/80">Get a free consultation with our team.</p>
          </div>
          <Link
            href="/contact"
            onClick={onNavigate}
            className="relative mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition-transform hover:scale-105"
          >
            Talk to us
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

/* ---------- navbar ---------- */

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setMenuOpen(false);
      }
    };
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => mq.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onChange);
    return () => {
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onChange);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const pill = scrolled && !open;

  return (
    <MotionConfig reducedMotion="user">
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: EASE }}
        className="fixed inset-x-0 top-0 z-50 pt-3 sm:pt-4"
      >
        <div className="container mx-auto px-4 sm:px-8">
          <div
            className={cn(
              "relative mx-auto transition-all duration-500 ease-out",
              pill ? "max-w-5xl" : "max-w-[100rem]"
            )}
          >
            {/* Border layer with a light that orbits the pill */}
            <div
              aria-hidden
              className={cn(
                "absolute inset-0 overflow-hidden rounded-full border border-slate-200/80 shadow-lg shadow-slate-900/5 transition-opacity duration-500 dark:border-slate-800",
                pill ? "opacity-100" : "opacity-0"
              )}
            >
              <div className="absolute left-1/2 top-1/2 aspect-square w-[130%] -translate-x-1/2 -translate-y-1/2">
                <div
                  className="h-full w-full animate-[spin_6s_linear_infinite] motion-reduce:animate-none"
                  style={{
                    background:
                      "conic-gradient(from 0deg, transparent 0 55%, #06b6d4 75%, #8b5cf6 90%, transparent 100%)",
                  }}
                />
              </div>
            </div>

            {/* Glass body */}
            <div
              className={cn(
                "relative m-px flex items-center justify-between gap-4 rounded-full py-2 transition-all duration-500",
                pill
                  ? "bg-white/85 px-4 backdrop-blur-xl dark:bg-slate-950/85 sm:px-5"
                  : "bg-transparent px-0"
              )}
            >
              {/* Scroll progress inside the pill */}
              <motion.span
                aria-hidden
                style={{ scaleX: progress }}
                className={cn(
                  `absolute inset-x-8 bottom-px h-px origin-left bg-gradient-to-r ${GRADIENT} transition-opacity duration-500`,
                  pill ? "opacity-100" : "opacity-0"
                )}
              />

              {/* Logo */}
              <Link href="/" className="relative z-10 flex shrink-0 items-center" aria-label="DevEraa home">
                <Image
                  src={Logo}
                  alt="DevEraa Logo"
                  width={160}
                  height={45}
                  priority
                  className={cn("w-auto transition-all duration-500", pill ? "h-8 sm:h-9" : "h-9 sm:h-10")}
                />
              </Link>

              {/* Desktop links */}
              <nav
                className="hidden items-center gap-1 lg:flex"
                aria-label="Main"
                onMouseLeave={() => setHovered(null)}
              >
                {NAV_LINKS.map((link) => {
                  const active = isActive(link.href);
                  return (
                    <div
                      key={link.href}
                      onMouseEnter={() => {
                        setHovered(link.href);
                        setMenuOpen(link.mega);
                      }}
                      onFocus={() => {
                        setHovered(link.href);
                        setMenuOpen(link.mega);
                      }}
                      onMouseLeave={() => link.mega && setMenuOpen(false)}
                      onBlur={(e) => {
                        if (link.mega && !e.currentTarget.contains(e.relatedTarget)) setMenuOpen(false);
                      }}
                    >
                      <Link
                        href={link.href}
                        aria-current={active ? "page" : undefined}
                        aria-haspopup={link.mega ? "true" : undefined}
                        aria-expanded={link.mega ? menuOpen : undefined}
                        className={cn(
                          "relative flex items-center rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                          active
                            ? "text-blue-600 dark:text-cyan-400"
                            : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                        )}
                      >
                        {hovered === link.href && (
                          <motion.span
                            layoutId="nav-hover"
                            className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/15 via-blue-500/15 to-violet-500/15 ring-1 ring-blue-500/10"
                            transition={{ type: "spring", stiffness: 400, damping: 32 }}
                          />
                        )}
                        <span className="relative flex items-center gap-1">
                          {link.name}
                          {link.mega && (
                            <ChevronDown
                              className={cn("h-3.5 w-3.5 transition-transform duration-300", menuOpen && "rotate-180")}
                            />
                          )}
                        </span>
                        {active && (
                          <motion.span
                            layoutId="nav-active"
                            className={`absolute inset-x-0 -bottom-0.5 mx-auto h-1 w-5 rounded-full bg-gradient-to-r ${GRADIENT} shadow-[0_0_10px_rgba(59,130,246,0.7)]`}
                            transition={{ type: "spring", stiffness: 400, damping: 32 }}
                          />
                        )}
                      </Link>

                      {link.mega && (
                        <AnimatePresence>
                          {menuOpen && <ServicesMenu onNavigate={() => setMenuOpen(false)} />}
                        </AnimatePresence>
                      )}
                    </div>
                  );
                })}
              </nav>

              {/* Actions */}
              <div className="relative z-10 flex items-center gap-2 sm:gap-3">
                <div className="hidden lg:block">
                  <ThemeToggle />
                </div>
                <MagneticCta />

                {/* Animated hamburger */}
                <button
                  type="button"
                  onClick={() => setOpen((o) => !o)}
                  aria-label={open ? "Close menu" : "Open menu"}
                  aria-expanded={open}
                  aria-controls="mobile-menu"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white/60 text-slate-800 backdrop-blur dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-200 lg:hidden"
                >
                  <span className="relative block h-3.5 w-5">
                    <motion.span
                      className="absolute left-0 top-0 h-0.5 w-5 rounded-full bg-current"
                      animate={open ? { y: 6, rotate: 45 } : { y: 0, rotate: 0 }}
                    />
                    <motion.span
                      className="absolute left-0 top-[6px] h-0.5 w-5 rounded-full bg-current"
                      animate={{ opacity: open ? 0 : 1, scaleX: open ? 0.3 : 1 }}
                    />
                    <motion.span
                      className="absolute bottom-0 left-0 h-0.5 w-5 rounded-full bg-current"
                      animate={open ? { y: -6, rotate: -45 } : { y: 0, rotate: 0 }}
                    />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ clipPath: "circle(0px at calc(100% - 40px) 40px)" }}
            animate={{ clipPath: "circle(3000px at calc(100% - 40px) 40px)" }}
            exit={{
              clipPath: "circle(0px at calc(100% - 40px) 40px)",
              transition: { duration: 0.35 },
            }}
            transition={{ duration: 0.6, ease: EASE }}
            className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-white/95 px-4 pb-8 pt-28 backdrop-blur-xl dark:bg-slate-950/95 sm:px-8 lg:hidden"
          >
            <div aria-hidden className="pointer-events-none absolute -right-24 top-20 h-72 w-72 rounded-full bg-violet-500/20 blur-3xl" />
            <div aria-hidden className="pointer-events-none absolute -left-24 bottom-24 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />

            {/* Link tiles */}
            <motion.nav
              aria-label="Mobile"
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } } }}
              className="relative mx-auto grid w-full max-w-xl grid-cols-2 gap-3"
            >
              {NAV_LINKS.map((link) => {
                const active = isActive(link.href);
                const Icon = link.icon;
                return (
                  <motion.div
                    key={link.href}
                    variants={{
                      hidden: { opacity: 0, y: 30, scale: 0.95 },
                      show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: EASE } },
                    }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "group flex h-36 flex-col justify-between rounded-3xl border p-5 transition-colors",
                        active
                          ? `border-transparent bg-gradient-to-br ${GRADIENT} text-white shadow-lg shadow-blue-500/25`
                          : "border-slate-200 bg-white/60 dark:border-slate-800 dark:bg-slate-900/60"
                      )}
                    >
                      <span
                        className={cn(
                          "flex h-11 w-11 items-center justify-center rounded-2xl text-white",
                          active ? "bg-white/20" : `bg-gradient-to-br ${GRADIENT}`
                        )}
                      >
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="flex items-end justify-between">
                        <span className="text-xl font-bold">{link.name}</span>
                        <ArrowUpRight className="h-5 w-5 opacity-60 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </span>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.nav>

            {/* Service shortcuts */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="relative mx-auto mt-8 w-full max-w-xl"
            >
              <p className="mb-3 text-sm font-semibold text-slate-500 dark:text-slate-400">Our services</p>
              <div className="flex flex-wrap gap-2">
                {SERVICES.map((s) => {
                  const Icon = s.icon;
                  return (
                    <Link
                      key={s.name}
                      href={s.href}
                      onClick={() => setOpen(false)}
                      className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3.5 py-2 text-sm font-medium transition-colors hover:border-blue-500/40 dark:border-slate-800"
                    >
                      <Icon className="h-4 w-4 text-blue-600 dark:text-cyan-400" />
                      {s.name}
                    </Link>
                  );
                })}
              </div>
            </motion.div>

            {/* CTA and quick actions */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="relative mx-auto mt-auto w-full max-w-xl space-y-3 pt-10"
            >
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className={`flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r ${GRADIENT} px-6 py-4 text-lg font-semibold text-white shadow-lg shadow-blue-500/25`}
              >
                <CalendarDays className="h-5 w-5" />
                Book Meeting
              </Link>
              <div className="grid grid-cols-[1fr_1fr_auto] gap-3">
                <a
                  href={`mailto:${EMAIL}`}
                  className="flex items-center justify-center gap-2 rounded-full border border-slate-200 py-3 text-sm font-semibold dark:border-slate-800"
                >
                  <Mail className="h-4 w-4" />
                  Email
                </a>
                <a
                  href={PHONE_HREF}
                  className="flex items-center justify-center gap-2 rounded-full border border-slate-200 py-3 text-sm font-semibold dark:border-slate-800"
                >
                  <Phone className="h-4 w-4" />
                  Call
                </a>
                <div className="flex items-center justify-center rounded-full border border-slate-200 px-1 dark:border-slate-800">
                  <ThemeToggle />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </MotionConfig>
  );
}