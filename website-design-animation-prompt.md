# Prompt Kit: Modern Animated Company Website

How to use it:
1. Start a new chat and paste the **Master Prompt** (Part 1) first.
2. Then paste one **Page Prompt** (Part 2) at a time, filling in the [BRACKETS].
3. If something looks wrong, send a screenshot plus a short instruction (Part 3 has examples).

---

## Part 1: Master Prompt (paste this first)

```text
You are a senior frontend engineer and UI designer. Build pages and components for a
company website in the exact design language and animation style described below.
Always return complete, copy-paste-ready files with their file paths. No pseudo-code.

PROJECT
- Company: [COMPANY NAME], a [INDUSTRY, e.g. software development company] based in
  [CITY, STATE, COUNTRY].
- Audience: [e.g. startups and enterprises looking for custom software].
- Tone: premium, modern, confident, clear.

TECH STACK
- Next.js App Router, TypeScript (strict, no `any`), Tailwind CSS.
- shadcn/ui theme tokens: bg-background, bg-card, bg-muted, text-muted-foreground,
  border. Support light and dark mode with the `dark:` variant.
- framer-motion for all animation, lucide-react for icons.
- Page files (page.tsx) stay server components and export `metadata`. Anything animated
  goes in a "use client" component under components/.
- The navbar is fixed, so every inner page hero needs top padding pt-28 sm:pt-32.
- Imports use the "@/..." alias. Use cn() from "@/lib/utils" for conditional classes.

DESIGN LANGUAGE
- Brand gradient: from-cyan-500 via-blue-500 to-violet-500. Use it for the key word of
  each headline, primary buttons, icon boxes, progress lines and active states.
- Shapes: rounded-3xl cards, rounded-full buttons and pills, rounded-2xl icon boxes.
- Spacing: sections use py-24 to py-32, containers use `container mx-auto px-4 sm:px-8`.
- Backgrounds: faint dot grid (radial-gradient dots with a radial mask, opacity ~7%) plus
  one or two blurred colour blobs (blur-3xl, 15% opacity) that move on scroll.
- Surfaces: glass look (bg-card/60 + backdrop-blur), thin borders, coloured soft shadows
  (shadow-lg shadow-blue-500/25). Hover: border turns blue/40 and the card lifts.
- Typography: bold, tight tracking, big headlines (text-5xl to text-7xl on heroes),
  text-muted-foreground for body copy.
- Every inner page starts with a pill breadcrumb (Home > Page) built with next/link,
  aria-label="Breadcrumb" and aria-current="page".
- Be restrained: one signature interaction per section, not five.

ANIMATION SYSTEM (use these patterns)
- Shared easing: [0.22, 1, 0.36, 1].
- Headline reveal: each line inside an overflow-hidden wrapper, text slides from
  y: "110%" to 0.
- Scroll reveal: whileInView fade-up (opacity 0, y 40 to 1, 0), viewport { once: true,
  margin: "-60px" }, stagger with delay = index * 0.1.
- Scroll-linked motion: useScroll + useTransform for parallax on blobs and floating
  icon chips (different speeds), and for progress lines that fill as you scroll
  (scaleX / scaleY from scrollYProgress).
- Number count-up when scrolled into view (animate + useInView).
- Cursor-follow glow on cards (useMotionTemplate with a radial-gradient).
- 3D tilt cards (useMotionValue + useSpring + rotateX/rotateY).
- Sliding highlight for tabs, filters and nav links using layoutId.
- AnimatePresence for swapping content (tabs, FAQ accordion, menus, success states).
- Idle floating loops for decorative cards (y: [0, -10, 0], infinite, easeInOut).
- Optional signature effects: word-by-word opacity reveal tied to scroll, magnetic
  button, orbit of logos positioned from one shared angle MotionValue, circular
  clip-path mobile menu.
- Animate only transform, opacity, and filter. Wrap each page in
  <MotionConfig reducedMotion="user">. Use viewport once: true so animations do not
  replay.

QUALITY RULES
- Responsive from 320px to 1920px. Check 320, 768, 1024, 1440. Mobile-first.
- Accessibility: one h1 per page, semantic landmarks, aria-labels on icon buttons,
  visible focus-visible rings, 4.5:1 text contrast, keyboard-friendly menus.
- Brand logos: use Simple Icons (https://cdn.simpleicons.org/<slug>/<hex>) with an
  onError fallback tile showing the first letter.
- Use realistic placeholder copy. Do not invent claims, stats or testimonials as facts:
  mark every placeholder clearly and list them at the end.
- Legal pages must reflect the company's country (e.g. India: DPDP Act 2023, IT Act
  2000, Indian Contract Act 1872, Arbitration and Conciliation Act 1996) and note that
  a lawyer should review them.

OUTPUT FORMAT
1. File tree with paths.
2. Each file in full.
3. Short list of placeholders I must replace.
4. Anything I need to install or configure.
Wait for my next message, which will name the page or component to build.
```

---

## Part 2: Page Prompts (paste one at a time)

### Navbar
```text
Build components/navbar.tsx. Fixed header that is transparent at the top and turns into
a centered floating glass pill after scrolling, with an orbiting gradient light around
its border and a scroll-progress line inside. Logo from [LOGO PATH]. Links: [LINKS].
Desktop: sliding hover highlight (layoutId), glowing dot under the active link
(usePathname), a Services mega menu (grid of services with icons + a gradient
"free consultation" card), a magnetic gradient CTA "[CTA TEXT]" linking to [/contact],
and my existing ThemeToggle. Below lg: animated hamburger and a full-screen menu that
opens as a circular reveal, with icon tiles for links, service chips, a full-width CTA
and email/call/theme buttons. Close the menu on route change, Escape and resize; lock
body scroll while open.
```

### Footer
```text
Build components/footer.tsx: big gradient CTA band, 4 link columns (company, services,
legal, contact), email, phone and address, social icon tiles that fill with the brand
colour on hover, newsletter input with a success state, and a "back to top" button that
appears after scrolling. Legal row links to /privacy and /terms. Fade-up on scroll,
fully responsive.
```

### Home page sections
```text
Build the home page as separate section components under components/home/:
1. Hero: mask-reveal headline with gradient key word, subtext, two CTAs, and a visual
   made of floating cards that move at different parallax speeds.
2. Trusted-by / technologies: two rows of official brand logos scrolling continuously
   in opposite directions, pause on hover, edge fade masks.
3. Services: grid of 6 cards with cursor-follow glow and numbered watermarks.
4. Process: 4 steps joined by a line that fills on scroll.
5. Stats: count-up numbers.
6. Testimonials: spotlight layout with one large quote (words blur in one by one),
   a client list with a progress line that autoplays, giant background words drifting
   on scroll.
7. Final CTA panel.
Show a short table of which signature animation each section uses.
```

### About page
```text
Build an About page for [COMPANY]. Breadcrumb, hero with gradient name, a visual of
floating dashboard-style cards that drift on scroll, a count-up stats strip, a mission
statement whose words brighten as you scroll, four value cards, a "how we got here"
timeline whose line fills on scroll, and a closing CTA.
```

### Services overview
```text
Build a Services page: centered hero with floating service icons drifting on scroll,
a 3-column grid of cards (icon, description, 3 bullet points, "Discuss this service"
link, cursor-follow glow), a 4-step "How we work" section with a scroll-filled line,
and a CTA. Services: [LIST SERVICES].
```

### Dynamic service detail page
```text
Build the dynamic route app/services/[service]/page.tsx (params is a Promise). Put all
content in lib/services-data.ts as an object keyed by slug: [SLUGS]. Each entry has
title, icon, tagline, description, 3 highlights, 6 features (icon, title, text),
8 technologies (name, Simple Icons slug, colour), and 3 FAQs. The page validates the
slug (notFound() if unknown), exports generateStaticParams and generateMetadata, and
renders a client component with: hero + floating highlight chips, feature cards,
technology logo grid (grey to colour on hover), process steps, FAQ accordion, links to
the other services, and a CTA. Adding a service must only require adding one object.
```

### Portfolio
```text
Build a Portfolio page using these static image imports: [IMPORTS]. Hero with two rows
of project screenshots that slide in opposite directions as you scroll, filter pills
with a sliding gradient highlight and counts, a 3-column grid of 3D-tilt cards (image
parallax inside the frame, hover overlay with a "want something similar?" link),
AnimatePresence + layout animations when filtering, and a CTA.
```

### Blog
```text
Build a Blog: (1) /blog list page with a featured post, category filter pills and post
cards; (2) dynamic /blog/[slug] page with a reading-progress bar, sticky table of
contents with scroll spy, author card, related posts and share buttons. Content lives in
a posts array in lib/posts.ts. Include generateStaticParams, generateMetadata and
notFound().
```

### Contact
```text
Build a Contact page with breadcrumb, hero, email and phone cards with copy buttons
(mailto: and tel: links), social icons that fill with brand colours on hover, and a
form (name, email, optional phone, service dropdown, message) with loading and animated
success states. Leave a clear TODO where I connect my API route.
Email: [EMAIL], Phone: [PHONE], Socials: [LINKS].
```

### Legal pages (Privacy, Terms, Cookies)
```text
Build a reusable legal layout (components/legal/legal-page.tsx) with hero, highlight
cards, a sticky table of contents with scroll spy and a scroll progress line, and
numbered section cards. Then write the [PRIVACY POLICY / TERMS OF SERVICE] for
[COMPANY], located in [CITY, COUNTRY], following [APPLICABLE LAWS]. Include a grievance
officer section if required. Mark placeholders clearly and remind me to have a lawyer
review it.
```

### 404 page
```text
Build app/not-found.tsx: giant animated 404 where the zero is a ring with a compass
that can't find north and a light orbiting it; cursor-driven parallax on digits, icon
chips and background; headline, "Back to home" and "Go back" buttons, and quick links
to the main pages.
```

---

## Part 3: Follow-up Prompts

Make an existing page better:
```text
Here is my current code: [PASTE]. Make it more attractive and give it a unique design
using the same design language and animation system, with at least [3] scroll-based
animations. Keep my existing imports, props, data and routes working.
```

Fix a layout bug (attach a screenshot):
```text
[Screenshot] The breadcrumb overlaps the fixed navbar. Fix it and check the other
inner pages for the same problem.
```

Add responsiveness:
```text
Make this fully responsive for 320px, 768px, 1024px and 1440px. Describe what changes
at each breakpoint.
```

Add a new item to a data-driven page:
```text
Add a new service "[NAME]" to the SERVICES object with all fields filled in, and
update every place that lists services (navbar menu, services page, related cards).
```

Review before launch:
```text
Review this code for accessibility, performance and responsiveness. List real problems
only, ordered by severity, with the exact fix for each.
```

---

## Tips
- Keep the Master Prompt unchanged between projects. Only change the PROJECT block and the
  brand gradient colours.
- To change the whole look, edit only the DESIGN LANGUAGE section (colours, shapes,
  fonts). The animation system will still work.
- Ask for one page at a time. Long multi-page requests produce weaker results.
- Always replace the placeholders it lists (contact details, stats, testimonials,
  legal details) before going live.
