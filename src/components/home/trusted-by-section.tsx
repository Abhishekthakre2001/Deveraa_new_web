/* eslint-disable @next/next/no-img-element */

/**
 * Technologies section – two continuously scrolling rows of official brand logos.
 *
 * Logos come from Simple Icons (https://simpleicons.org) via their CDN, using each
 * brand's official color. No package install needed.
 *   URL format: https://cdn.simpleicons.org/<slug>/<hexColor>
 *
 * The keyframes are defined inside this file, so it works without touching
 * tailwind.config. Only standard Tailwind + shadcn tokens are used
 * (bg-background, text-muted-foreground, border, etc.).
 */

type Tech = {
  name: string;
  slug: string; // Simple Icons slug
  color: string; // Official brand hex (without #)
  invertInDark?: boolean; // For black logos that vanish on dark backgrounds
};

const ROW_ONE: Tech[] = [
  { name: "React", slug: "react", color: "61DAFB" },
  { name: "Next.js", slug: "nextdotjs", color: "000000", invertInDark: true },
  { name: "TypeScript", slug: "typescript", color: "3178C6" },
  { name: "Tailwind CSS", slug: "tailwindcss", color: "06B6D4" },
  { name: "Node.js", slug: "nodedotjs", color: "5FA04E" },
  { name: "GraphQL", slug: "graphql", color: "E10098" },
  { name: "Prisma", slug: "prisma", color: "2D3748", invertInDark: true },
  { name: "Vite", slug: "vite", color: "646CFF" },
];

const ROW_TWO: Tech[] = [
  { name: "PostgreSQL", slug: "postgresql", color: "4169E1" },
  { name: "MongoDB", slug: "mongodb", color: "47A248" },
  { name: "Redis", slug: "redis", color: "FF4438" },
  { name: "Docker", slug: "docker", color: "2496ED" },
  { name: "Supabase", slug: "supabase", color: "3FCF8E" },
  { name: "Vercel", slug: "vercel", color: "000000", invertInDark: true },
  { name: "Stripe", slug: "stripe", color: "635BFF" },
  { name: "Figma", slug: "figma", color: "F24E1E" },
];

function LogoCard({ tech }: { tech: Tech }) {
  return (
    <li
      className="group mx-3 flex shrink-0 items-center gap-3 rounded-2xl border bg-card/60 px-6 py-4 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-foreground/20 hover:bg-card hover:shadow-lg"
      aria-label={tech.name}
    >
      <img
        src={`https://cdn.simpleicons.org/${tech.slug}/${tech.color}`}
        alt=""
        width={36}
        height={36}
        loading="lazy"
        draggable={false}
        className={`h-9 w-9 object-contain grayscale opacity-70 transition duration-300 group-hover:scale-110 group-hover:opacity-100 group-hover:grayscale-0 ${
          tech.invertInDark ? "dark:invert" : ""
        }`}
      />
      <span className="whitespace-nowrap text-base font-semibold text-foreground/70 transition-colors group-hover:text-foreground">
        {tech.name}
      </span>
    </li>
  );
}

function MarqueeRow({
  items,
  reverse = false,
  duration = 40,
}: {
  items: Tech[];
  reverse?: boolean;
  duration?: number;
}) {
  return (
    <div
      className="tech-marquee group/row relative overflow-hidden py-2"
      style={{
        // fade edges so logos glide in/out softly
        maskImage:
          "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
      }}
    >
      {/* Track holds two identical copies; moving -50% loops seamlessly */}
      <ul
        className="tech-marquee-track flex w-max"
        style={{
          animationDuration: `${duration}s`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {[...items, ...items].map((tech, i) => (
          <LogoCard key={`${tech.slug}-${i}`} tech={tech} />
        ))}
      </ul>
    </div>
  );
}

export function TrustedBySection() {
  return (
    <section className="relative overflow-hidden border-b bg-muted/30 py-16">
      {/* Scoped animation styles */}
      <style>{`
        @keyframes tech-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .tech-marquee-track {
          animation-name: tech-scroll;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          will-change: transform;
        }
        /* Pause the hovered row so people can look at a logo */
        .tech-marquee:hover .tech-marquee-track {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .tech-marquee-track { animation: none; }
        }
      `}</style>

      {/* soft background glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl"
      />

      <div className="container relative mx-auto mb-10 px-4 text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Built with tools you already trust
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          Our stack covers the frontend, backend, data and deployment, so every
          project ships on proven technology.
        </p>
      </div>

      <div className="relative flex flex-col gap-4">
        <MarqueeRow items={ROW_ONE} duration={40} />
        <MarqueeRow items={ROW_TWO} duration={48} reverse />
      </div>
    </section>
  );
}