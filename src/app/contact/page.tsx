"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  ArrowUpRight,
  Check,
  ChevronDown,
  ChevronRight,
  Copy,
  Home,
  Loader2,
  Mail,
  MessageSquare,
  Phone,
  Send,
} from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;
const GRADIENT = "from-cyan-500 via-blue-500 to-violet-500";

// Placeholder details: replace with your real ones
const EMAIL = "hello@deveraa.com";
const PHONE_DISPLAY = "+91 98765 43210";
const PHONE_HREF = "tel:+919876543210";

/**
 * Social logos come from Simple Icons, pinned to v11.14.0 (newer releases
 * dropped LinkedIn). They are used as CSS masks so they take any color.
 */
const SOCIALS = [
  { name: "LinkedIn", slug: "linkedin", color: "#0A66C2", href: "https://linkedin.com/company/deveraa" },
  { name: "X", slug: "x", color: "#000000", href: "https://x.com/deveraa" },
  { name: "Instagram", slug: "instagram", color: "#E4405F", href: "https://instagram.com/deveraa" },
  { name: "GitHub", slug: "github", color: "#181717", href: "https://github.com/deveraa" },
  { name: "Facebook", slug: "facebook", color: "#0866FF", href: "https://facebook.com/deveraa" },
];

const SERVICES = [
  "Web Development",
  "Mobile Apps",
  "SaaS Solutions",
  "AI Solutions",
  "UI/UX Design",
  "Cloud & DevOps",
  "Something else",
];

/* ---------- small pieces ---------- */

function Breadcrumb() {
  return (
    <motion.nav
      aria-label="Breadcrumb"
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <ol className="inline-flex items-center gap-2 rounded-full border bg-card/60 px-4 py-2 text-sm backdrop-blur">
        <li>
          <Link
            href="/"
            className="flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground"
          >
            <Home className="h-4 w-4" />
            Home
          </Link>
        </li>
        <li aria-hidden>
          <ChevronRight className="h-4 w-4 text-muted-foreground/60" />
        </li>
        <li aria-current="page" className="font-medium text-foreground">
          Contact
        </li>
      </ol>
    </motion.nav>
  );
}

function Chip({
  icon: Icon,
  y,
  delay,
  className,
}: {
  icon: React.ComponentType<{ className?: string }>;
  y: MotionValue<number>;
  delay: number;
  className: string;
}) {
  return (
    <motion.div style={{ y }} className={`absolute hidden lg:block ${className}`}>
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 5 + delay, repeat: Infinity, ease: "easeInOut", delay }}
        className="flex h-16 w-16 items-center justify-center rounded-2xl border bg-card/80 shadow-xl backdrop-blur"
      >
        <Icon className="h-7 w-7 text-blue-600 dark:text-cyan-400" />
      </motion.div>
    </motion.div>
  );
}

function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      aria-label={`Copy ${label}`}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          setCopied(true);
          setTimeout(() => setCopied(false), 1800);
        } catch {
          /* clipboard unavailable */
        }
      }}
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-muted-foreground transition-colors hover:border-blue-500/40 hover:text-foreground"
    >
      {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
    </button>
  );
}

function InfoCard({
  icon: Icon,
  label,
  value,
  href,
  copyValue,
  index,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  href: string;
  copyValue: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.1, duration: 0.7, ease: EASE }}
      whileHover={{ y: -4 }}
      className="group flex items-center gap-4 rounded-3xl border bg-card p-5 transition-colors hover:border-blue-500/40"
    >
      <span
        className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${GRADIENT} text-white shadow-lg shadow-blue-500/25 transition-transform duration-300 group-hover:rotate-6`}
      >
        <Icon className="h-6 w-6" />
      </span>
      <a href={href} className="min-w-0 flex-1">
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="truncate text-lg font-semibold">{value}</p>
      </a>
      <CopyButton value={copyValue} label={label} />
    </motion.div>
  );
}

function SocialLink({ social }: { social: (typeof SOCIALS)[number] }) {
  const src = `https://cdn.jsdelivr.net/npm/simple-icons@11.14.0/icons/${social.slug}.svg`;
  return (
    <motion.a
      href={social.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={social.name}
      title={social.name}
      whileHover={{ y: -5 }}
      className="group relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl border bg-card text-foreground transition-colors hover:border-transparent hover:text-white"
    >
      {/* Brand-colored fill rises in on hover */}
      <span
        aria-hidden
        className="absolute inset-0 origin-bottom scale-y-0 transition-transform duration-300 group-hover:scale-y-100"
        style={{ background: social.color }}
      />
      <span
        aria-hidden
        className="relative block h-6 w-6 bg-current"
        style={{
          WebkitMaskImage: `url(${src})`,
          maskImage: `url(${src})`,
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskSize: "contain",
          maskSize: "contain",
          WebkitMaskPosition: "center",
          maskPosition: "center",
        }}
      />
    </motion.a>
  );
}

const fieldClass =
  "w-full rounded-xl border bg-background px-4 py-3 text-base outline-none transition-all placeholder:text-muted-foreground/60 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/15";

function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    // TODO: connect to your backend, e.g.
    // await fetch("/api/contact", { method: "POST", body: new FormData(e.currentTarget) });
    await new Promise((r) => setTimeout(r, 1200));
    setStatus("sent");
  }

  return (
    <div className="relative overflow-hidden rounded-[2rem] border bg-card p-8 shadow-xl sm:p-10">
      <div
        aria-hidden
        className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${GRADIENT}`}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl"
      />

      <AnimatePresence mode="wait">
        {status === "sent" ? (
          <motion.div
            key="sent"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="relative flex min-h-[26rem] flex-col items-center justify-center text-center"
          >
            <motion.span
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 14, delay: 0.15 }}
              className={`mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br ${GRADIENT} text-white shadow-xl shadow-blue-500/30`}
            >
              <Check className="h-10 w-10" />
            </motion.span>
            <h3 className="text-2xl font-bold">Message sent!</h3>
            <p className="mt-2 max-w-sm text-muted-foreground">
              Thanks for reaching out. We&apos;ll get back to you shortly.
            </p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="mt-8 rounded-full border px-6 py-2.5 text-sm font-semibold transition-colors hover:bg-muted"
            >
              Send another message
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={onSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative space-y-5"
          >
            <div>
              <h2 className="text-2xl font-bold sm:text-3xl">Send us a message</h2>
              <p className="mt-2 text-muted-foreground">
                Fill in the form and we&apos;ll reply as soon as we can.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-medium">
                  Full name
                </label>
                <input id="name" name="name" required placeholder="Jane Doe" className={fieldClass} />
              </div>
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="jane@company.com"
                  className={fieldClass}
                />
              </div>
              <div>
                <label htmlFor="phone" className="mb-2 block text-sm font-medium">
                  Phone <span className="text-muted-foreground">(optional)</span>
                </label>
                <input id="phone" name="phone" type="tel" placeholder="+91 00000 00000" className={fieldClass} />
              </div>
              <div>
                <label htmlFor="service" className="mb-2 block text-sm font-medium">
                  I&apos;m interested in
                </label>
                <div className="relative">
                  <select id="service" name="service" defaultValue="" className={`${fieldClass} appearance-none pr-10`}>
                    <option value="" disabled>
                      Select a service
                    </option>
                    {SERVICES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="message" className="mb-2 block text-sm font-medium">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                placeholder="Tell us about your project..."
                className={`${fieldClass} resize-none`}
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className={`group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r ${GRADIENT} px-8 py-4 font-semibold text-white shadow-lg shadow-blue-500/25 transition-transform hover:scale-[1.02] disabled:opacity-70 disabled:hover:scale-100 sm:w-auto`}
            >
              {status === "sending" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  Send message
                  <Send className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </>
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------- sections ---------- */

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const blobY = useTransform(scrollYProgress, [0, 1], [0, 120]);

  return (
    <section ref={ref} className="relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 text-foreground opacity-[0.07]"
        style={{
          backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage: "radial-gradient(ellipse at 50% 40%, black 20%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(ellipse at 50% 40%, black 20%, transparent 70%)",
        }}
      />
      <motion.div
        aria-hidden
        style={{ y: blobY }}
        className="pointer-events-none absolute -right-24 top-10 h-96 w-96 rounded-full bg-violet-500/15 blur-3xl"
      />
      <motion.div
        aria-hidden
        style={{ y: blobY }}
        className="pointer-events-none absolute -left-24 bottom-0 h-96 w-96 rounded-full bg-cyan-500/15 blur-3xl"
      />

      <Chip icon={Mail} y={y1} delay={0} className="left-[10%] top-[40%]" />
      <Chip icon={Phone} y={y2} delay={1} className="right-[10%] top-[34%]" />
      <Chip icon={MessageSquare} y={y1} delay={2} className="right-[20%] top-[68%]" />

      <div className="container relative mx-auto px-4 pb-20 pt-28 sm:px-8 sm:pt-32">
        <Breadcrumb />

        <div className="mx-auto mt-14 max-w-3xl text-center">
          <h1 className="text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            <span className="inline-block overflow-hidden pb-2 align-top">
              <motion.span
                className="inline-block"
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: EASE }}
              >
                Contact
              </motion.span>
            </span>{" "}
            <span className="inline-block overflow-hidden pb-2 align-top">
              <motion.span
                className={`inline-block bg-gradient-to-r ${GRADIENT} bg-clip-text text-transparent`}
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: EASE, delay: 0.12 }}
              >
                Us
              </motion.span>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="mx-auto mt-8 max-w-xl text-lg text-muted-foreground sm:text-xl"
          >
            Have a project in mind or just want to say hello? We&apos;d love to
            hear from you.
          </motion.p>
        </div>
      </div>
    </section>
  );
}

function ContactBody() {
  return (
    <section className="container mx-auto px-4 pb-28 sm:px-8">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-5">
        {/* Details and socials */}
        <div className="space-y-5 lg:col-span-2">
          <InfoCard
            index={0}
            icon={Mail}
            label="Email us"
            value={EMAIL}
            href={`mailto:${EMAIL}`}
            copyValue={EMAIL}
          />
          <InfoCard
            index={1}
            icon={Phone}
            label="Call us"
            value={PHONE_DISPLAY}
            href={PHONE_HREF}
            copyValue={PHONE_DISPLAY}
          />

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: 0.2, duration: 0.7, ease: EASE }}
            className="rounded-3xl border bg-muted/30 p-6"
          >
            <p className="mb-1 flex items-center gap-1.5 font-semibold">
              Follow us
              <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
            </p>
            <p className="mb-5 text-sm text-muted-foreground">
              Updates, projects and behind-the-scenes from the team.
            </p>
            <div className="flex flex-wrap gap-3">
              {SOCIALS.map((s) => (
                <SocialLink key={s.name} social={s} />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="lg:col-span-3"
        >
          <ContactForm />
        </motion.div>
      </div>
    </section>
  );
}

export default function ContactPage() {
  return (
    <MotionConfig reducedMotion="user">
      <main>
        <Hero />
        <ContactBody />
      </main>
    </MotionConfig>
  );
}