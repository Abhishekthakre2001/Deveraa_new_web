import { Marquee } from "@/components/ui/marquee";

const LOGOS = [
  "Vercel", "Stripe", "Linear", "Supabase", "Framer", "Raycast", "OpenAI", "Acme Corp"
];

export function TrustedBySection() {
  return (
   <section className="overflow-hidden py-12 border-b bg-muted/30">
  <div className="container mx-auto mb-8 text-center">
    <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
      Trusted by innovative companies worldwide
    </p>
  </div>

  <div className="overflow-hidden">
    <div className="flex w-max animate-marquee">
      {[...LOGOS, ...LOGOS].map((logo, idx) => (
        <div
          key={idx}
          className="mx-10 flex h-20 items-center justify-center"
        >
          <span className="text-2xl font-bold text-foreground/80">
            {logo}
          </span>
        </div>
      ))}
    </div>
  </div>
</section>
  );
}


