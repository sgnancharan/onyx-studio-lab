import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sun, Moon, Menu, X, Sparkles, Cpu, Palette, Globe, Wifi, MapPin,
  FileText, ArrowRight, Phone, MessageCircle, Shield, Check, History,
  Smartphone, QrCode, GraduationCap, Sticker, Printer,
} from "lucide-react";
import { toast } from "sonner";
import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { toggleTheme } from "@/lib/theme";

export const Route = createFileRoute("/")({ component: Landing });

const WA = "919346528844";

const TYPES = [
  "Custom PC Builds",
  "AI Resumes & Art",
  "Rapid Web Development",
  "B.Tech Project Formatting",
  "Local Business Growth",
];

type Service = {
  icon: typeof FileText;
  title: string;
  desc: string;
  tag?: string;
  whatItIs: string;
  whatWeOffer: string[];
  benefits: string;
};

const SERVICES: Service[] = [
  {
    icon: FileText,
    title: "AI Resumes & Project Reports",
    desc: "ATS-optimized AI resumes printed on premium glossy paper, plus formatted & spiral-bound B.Tech lab reports and seminar PPTs.",
    whatItIs: "AI-crafted, recruiter-ready resumes and academic documents — engineered to pass ATS filters and land interviews, then delivered as pixel-perfect printed copies you can hand over with confidence.",
    whatWeOffer: [
      "ATS-optimized resume writing with keyword tuning for your target role",
      "Premium glossy or matte printing with cover-letter matching design",
      "Formatted & spiral-bound B.Tech lab reports, seminar reports and PPTs",
      "Editable master file so you can update it later yourself",
    ],
    benefits: "A polished, professionally structured document dramatically increases callback rates and grading impressions — this is one of the highest-ROI investments a student or job seeker can make.",
  },
  {
    icon: Palette,
    title: "Custom AI Art & Framing",
    desc: "Transform selfies, couple photos, or pets into Royal Oil Paintings, Cyberpunk, or Anime art. Printed in high-res and beautifully framed.",
    whatItIs: "Your favourite memories reimagined as museum-grade AI artwork — Royal Oil, Cyberpunk, Anime, Studio Ghibli and more — then printed and framed as a keepsake worth hanging on a wall.",
    whatWeOffer: [
      "Multiple art style options: Royal Oil, Cyberpunk, Anime, Watercolor",
      "High-resolution printing on premium photo or canvas stock",
      "Elegant frame options in wood, black or minimal metal",
      "Digital high-res copy included for phones and socials",
    ],
    benefits: "A deeply personal gift or statement piece for your home at a fraction of a commissioned artist's cost — perfect for anniversaries, birthdays, weddings and housewarmings.",
  },
  {
    icon: Cpu,
    title: "Custom PC Building",
    desc: "Professional assembly, cable management, and stress testing. You bring the parts, we build the beast.",
    tag: "₹4,000 – ₹5,000",
    whatItIs: "You buy the parts, we build the machine. Precision assembly with clean cable management, thermal tuning and full stress testing before it ever reaches your desk.",
    whatWeOffer: [
      "Assembly fee ranges from ₹4,000 to ₹5,000 depending on the complexity of the build (e.g., custom water cooling, ITX form factors, or extensive RGB routing)",
      "Neat cable management and airflow-optimized layout",
      "BIOS setup, Windows install and essential driver stack",
      "Stress & thermal testing report before handover",
    ],
    benefits: "Avoid costly mistakes bending pins, mismounting coolers or under-cooling your GPU. A properly built PC runs cooler, quieter and lasts significantly longer than a rushed self-build.",
  },
  {
    icon: Globe,
    title: "Web Development & Hosting",
    desc: "Interactive websites built fast for local businesses, with monthly hosting & maintenance plans.",
    whatItIs: "Modern, mobile-first websites for local businesses — built fast, hosted reliably and maintained monthly so you never have to worry about the tech side of your online presence.",
    whatWeOffer: [
      "Custom single-page or multi-page websites with modern animations",
      "Domain setup, SSL and reliable hosting configuration",
      "Contact forms, WhatsApp integration and Google Maps embed",
      "Monthly maintenance, backups and content updates",
    ],
    benefits: "A professional website is the single strongest trust signal for a local business today. Customers Google you before they call — we make sure what they find converts.",
  },
  {
    icon: Wifi,
    title: "Smart TV & Home Tech Setup",
    desc: "Smart TV ad-blocking, Wi-Fi dead-zone fixing, NAS personal cloud setups, and PC deep cleaning.",
    tag: "₹500/visit",
    whatItIs: "On-site home tech visits that quietly fix the small annoyances slowing down your daily life — laggy TV, weak Wi-Fi in the bedroom, a dusty overheating PC, or scattered photos with no backup.",
    whatWeOffer: [
      "Smart TV ad-blocking and streaming optimization",
      "Wi-Fi dead-zone diagnosis, router placement and mesh setup",
      "Personal cloud (NAS) setup for photos, movies and backups",
      "PC deep cleaning, re-pasting and Windows tune-up",
    ],
    benefits: "One short visit gives you a faster, cleaner, better-protected digital home — with no jargon, no upselling, and no repeat callbacks for the same problem.",
  },
  {
    icon: MapPin,
    title: "Google Maps & WhatsApp Business",
    desc: "Get your local shop verified on Google Maps with automated WhatsApp business greeting bots.",
    whatItIs: "Get discovered on Google Maps and respond to customers instantly on WhatsApp — the two channels where local buyers in Visakhapatnam actually find and message local shops today.",
    whatWeOffer: [
      "Google Business Profile creation and verification support",
      "Optimized listing with photos, hours, services and categories",
      "WhatsApp Business setup with catalog and quick replies",
      "Automated greeting and away-message bot configuration",
    ],
    benefits: "Show up when nearby customers search, and never miss an enquiry again. This is the fastest, cheapest way for a local shop to compete with bigger brands online.",
  },
  {
    icon: History,
    title: "AI Heritage Photo Restoration",
    desc: "Bring faded, torn, or black-and-white family photos back to life. Colorized, enhanced, printed in high-res, and elegantly framed.",
    whatItIs: "Old family photos — faded, scratched, torn or black-and-white — carefully restored with AI, tastefully colorized, and re-printed in high resolution so the memory looks as vivid as the day it was taken.",
    whatWeOffer: [
      "Damage repair: scratches, tears, stains, missing corners",
      "Face enhancement and gentle, realistic colorization",
      "High-resolution reprint on premium photo paper",
      "Optional elegant framing to gift or display at home",
    ],
    benefits: "Irreplaceable memories of grandparents, weddings and childhood deserve better than fading in an old album. This is a heartfelt, one-of-a-kind gift for parents and elders.",
  },
  {
    icon: Smartphone,
    title: "NFC Smart Business Cards",
    desc: "The last business card you will ever need. Tap to share your custom digital profile, built and hosted by us.",
    whatItIs: "A premium NFC-enabled card that instantly shares your entire digital profile — links, portfolio, socials, WhatsApp, payments — with a single tap on any modern phone. No app required.",
    whatWeOffer: [
      "Premium NFC card with your custom brand design",
      "Fully hosted digital profile page built and maintained by us",
      "Editable profile: update your links anytime, card never changes",
      "Analytics on taps, clicks and profile visits",
    ],
    benefits: "Never run out of business cards, never hand out an outdated one. Stand out instantly at meetings, events and pitches — and look years ahead of competitors still using paper.",
  },
  {
    icon: QrCode,
    title: "Digital QR Menus for Restaurants",
    desc: "Sleek, contactless digital menus for your cafe, complete with premium acrylic table standees.",
    whatItIs: "A sleek, always-up-to-date digital menu that your customers open by scanning a QR code on a premium acrylic table standee — no app, no reprints, no more crossed-out items.",
    whatWeOffer: [
      "Beautifully designed mobile-first digital menu",
      "Premium acrylic table standees with your branding",
      "Instant menu updates for prices, specials and stock-outs",
      "Optional order-on-WhatsApp integration for takeaway",
    ],
    benefits: "Save thousands on reprints every time prices change, reduce order errors, and give your cafe a modern, hygienic first impression that customers genuinely appreciate.",
  },
  {
    icon: GraduationCap,
    title: "Academic & Professional Portfolios",
    desc: "Stand out for US/UK Master's applications or tech interviews with a custom, interactive personal website.",
    whatItIs: "A custom, interactive personal portfolio website that showcases your projects, research and personality — designed to make you memorable in competitive Master's applications and tech interviews.",
    whatWeOffer: [
      "Bespoke design tailored to your field and story",
      "Project case studies with visuals, code links and outcomes",
      "SEO setup so recruiters and admissions find your name",
      "Custom domain, hosting and one round of major revisions",
    ],
    benefits: "Admissions committees and hiring managers Google every serious candidate. A polished portfolio replaces a dozen bullet points and can be the single differentiator that gets you shortlisted.",
  },
  {
    icon: Sticker,
    title: "Custom Brand Stickers & Decals",
    desc: "High-quality, waterproof vinyl stickers for laptops, business branding, and product packaging.",
    whatItIs: "Custom-printed stickers on highly durable, waterproof vinyl. Precision hand-cut for local businesses needing branded packaging or tech enthusiasts wanting custom laptop decals.",
    whatWeOffer: [
      "Full-color, high-resolution inkjet printing",
      "Waterproof and tear-resistant glossy vinyl material",
      "Precision hand-cut shapes tailored to your logo or design",
      "Small batch printing with no minimum order requirements",
    ],
    benefits: "Stop relying on cheap paper stickers that fade and peel. Our premium vinyl decals offer extreme durability and a professional gloss finish, making them the most cost-effective physical marketing tool for your brand or the perfect personalized aesthetic upgrade for your tech gear.",
  },
  {
    icon: Printer,
    title: "Precision Printing (Passport to Large Format)",
    desc: "Professional, high-resolution photo prints ranging from instant passport-size photos to large-format posters and specialized media.",
    whatItIs: "Professional-grade printing services handling everything from standard passport-size identity photos to large A4/A3 posters, blueprints, and custom media prints.",
    whatWeOffer: [
      "Instant, high-resolution passport and ID photo printing",
      "Large-format poster and technical blueprint printing",
      "Specialty media support including textured fine art, glossy, and matte finishes",
      "Precision finishing, laminating, and cutting",
    ],
    benefits: "Elevate your presentation with crisp, high-resolution prints. Whether you need urgent, perfectly sized passport photos for an application or stunning, durable posters for a local Vizag event, we guarantee professional physical outputs that standard office printers simply cannot match.",
  },
];

const ESTIMATOR = [
  { id: "nas", label: "Home NAS / Cloud Setup", price: 2500 },
  { id: "resume", label: "AI Resume (printed)", price: 499 },
  { id: "wifi", label: "Wi-Fi Dead-Zone Fix", price: 500 },
  { id: "web", label: "Starter Website (1 page)", price: 6000 },
  { id: "maps", label: "Google Maps Verification", price: 1500 },
];

const PC_TIERS = [
  { id: "none", label: "No PC Build", price: 0 },
  { id: "standard", label: "Standard PC Build (Air Cooled / AIO)", price: 4000 },
  { id: "complex", label: "Complex PC Build (ITX / Custom Loop / Heavy RGB)", price: 5000 },
];

const NAS_TIERS = [
  { id: "none", label: "None", price: 0 },
  { id: "basic", label: "Basic Network/TV Visit", price: 500 },
  { id: "mini", label: "Mini Cloud Server Setup - BYOD", price: 4999 },
  { id: "pro", label: "Pro 4-Bay Barebones Media Server - Intel CPU, 8GB RAM, 128GB OS", price: 34999 },
];

const STREAMING_TIERS = [
  { id: "none", label: "Standard Apps", price: 0 },
  { id: "six", label: "Uninterrupted 4K Premium Setup - 6 Months", price: 3000 },
  { id: "year", label: "Uninterrupted 4K Premium Setup - 1 Year", price: 5000 },
];

const STICKER_PRICE = 40; // per sticker
const PRINT_PRICE = 60;   // per print

function Landing() {
  const [dark, setDark] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setDark(!document.documentElement.classList.contains("light"));
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header scrolled={scrolled} dark={dark} onToggle={() => setDark(toggleTheme() === "dark")} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Hero />
      <Services />
      <Estimator />
      <Subscriptions />
      <ContactSection />
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

function Brand({ className = "" }: { className?: string }) {
  return (
    <a href="#top" className={`flex items-center gap-3 font-display text-xl font-bold tracking-tight ${className}`}>
      <img src="/lov.png" alt="Onyx Studio Logo" className="h-10 w-auto object-contain drop-shadow-[0_0_12px_rgba(120,120,255,0.35)]" />
      <span className="text-gradient">Onyx Studio</span>
    </a>
  );
}

function Header({ scrolled, dark, onToggle, menuOpen, setMenuOpen }: { scrolled: boolean; dark: boolean; onToggle: () => void; menuOpen: boolean; setMenuOpen: (v: boolean) => void; }) {
  const links = [
    { href: "#services", label: "Services" },
    { href: "#estimator", label: "Estimator" },
    { href: "#plans", label: "Plans" },
    { href: "#contact", label: "Contact" },
  ];
  return (
    <header id="top" className={`fixed inset-x-0 top-0 z-50 transition-all ${scrolled ? "glass border-b border-border/60" : "bg-transparent"}`}>
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3 sm:flex sm:justify-between sm:px-6">
        <Brand />
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">{l.label}</a>
          ))}
        </nav>
        <div className="flex items-center gap-2 justify-self-end">
          <button
            onClick={onToggle}
            aria-label="Toggle theme"
            className="grid h-9 w-9 place-items-center rounded-full border border-border bg-secondary/40 text-foreground transition hover:shadow-neon"
          >
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <a href="#contact" className="hidden sm:inline-flex">
            <Button size="sm" className="bg-gradient-brand text-primary-foreground shadow-neon hover:opacity-90">Book</Button>
          </a>
          <button className="md:hidden grid h-9 w-9 place-items-center rounded-full border border-border" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="md:hidden overflow-hidden glass border-t border-border">
            <div className="flex flex-col gap-1 px-4 py-3">
              {links.map((l) => (
                <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)} className="rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground">{l.label}</a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Typewriter() {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const full = TYPES[idx];
    const speed = deleting ? 40 : 80;
    const t = setTimeout(() => {
      const next = deleting ? full.slice(0, text.length - 1) : full.slice(0, text.length + 1);
      setText(next);
      if (!deleting && next === full) setTimeout(() => setDeleting(true), 1200);
      else if (deleting && next === "") { setDeleting(false); setIdx((idx + 1) % TYPES.length); }
    }, speed);
    return () => clearTimeout(t);
  }, [text, deleting, idx]);

  return (
    <span className="text-gradient font-semibold">
      {text}
      <span className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[3px] bg-neon-cyan animate-caret" />
    </span>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-24 sm:pt-40 sm:pb-32">
      <div className="absolute inset-0 -z-10 animate-gradient" style={{ backgroundImage: "var(--gradient-hero)" }} />
      <div className="pointer-events-none absolute -top-24 -left-24 -z-10 h-96 w-96 rounded-full bg-neon-purple/30 blur-3xl animate-float-slow" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 -z-10 h-96 w-96 rounded-full bg-neon-cyan/20 blur-3xl animate-float-slow" />
      <div className="mx-auto max-w-5xl px-4 text-center sm:px-6">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-border/70 glass px-4 py-1.5 text-xs text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-neon-cyan shadow-glow-cyan" />
          Based in Visakhapatnam · Tech · AI · Creative
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.05 }} className="text-balance text-4xl font-bold leading-[1.05] sm:text-6xl md:text-7xl">
          Next-Gen <span className="text-gradient">Tech, AI & Digital</span> Solutions in Visakhapatnam
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }} className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          We build&nbsp;<Typewriter />
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="mt-10 flex flex-wrap justify-center gap-3">
          <a href="#contact">
            <Button size="lg" className="bg-gradient-brand text-primary-foreground shadow-neon hover:shadow-glow-cyan hover:opacity-95">
              Book a Service <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </a>
          <a href="#services">
            <Button size="lg" variant="outline" className="border-border bg-secondary/40 backdrop-blur">
              Explore Services
            </Button>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function Services() {
  const [active, setActive] = useState<Service | null>(null);
  return (
    <section id="services" className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading eyebrow="What we build" title={<>Twelve services, <span className="text-gradient">one studio</span></>} subtitle="From hardware to hosting to AI-generated visuals — practical work delivered locally. Tap any card to explore." />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <motion.div key={s.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ delay: i * 0.05 }}>
              <button
                type="button"
                onClick={() => setActive(s)}
                className="block w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-neon-cyan rounded-2xl"
              >
                <Card className="neon-border neon-hover group h-full bg-card/60 p-6 backdrop-blur cursor-pointer">
                  <div className="mb-5 flex items-center justify-between">
                    <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-brand shadow-neon">
                      <s.icon className="h-5 w-5 text-primary-foreground" />
                    </div>
                    {s.tag && <span className="rounded-full border border-neon-cyan/40 bg-neon-cyan/10 px-2.5 py-1 text-xs font-medium text-neon-cyan">{s.tag}</span>}
                  </div>
                  <h3 className="text-lg font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-neon-cyan opacity-0 transition-opacity group-hover:opacity-100">
                    Learn more <ArrowRight className="h-3 w-3" />
                  </span>
                </Card>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
      <ServiceModal service={active} onClose={() => setActive(null)} />
    </section>
  );
}

function ServiceModal({ service, onClose }: { service: Service | null; onClose: () => void }) {
  useEffect(() => {
    if (!service) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [service, onClose]);

  return (
    <AnimatePresence>
      {service && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="absolute inset-0 bg-background/70 backdrop-blur-md"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={service.title}
            className="relative z-10 w-full max-w-2xl max-h-[88vh] overflow-hidden rounded-2xl"
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
          >
            {/* Neon gradient border wrapper */}
            <div className="rounded-2xl bg-gradient-brand p-[1.5px] shadow-neon">
              <div className="relative rounded-2xl bg-card/90 backdrop-blur-xl">
                <button
                  onClick={onClose}
                  aria-label="Close"
                  className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full border border-border bg-background/70 text-foreground transition hover:shadow-neon hover:border-neon-cyan/60"
                >
                  <X className="h-4 w-4" />
                </button>
                <div className="max-h-[88vh] overflow-y-auto p-6 sm:p-8">
                  <div className="flex items-start gap-4 pr-10">
                    <div className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-gradient-brand shadow-neon">
                      <service.icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-2xl font-bold leading-tight sm:text-3xl">{service.title}</h3>
                      {service.tag && (
                        <span className="mt-2 inline-block rounded-full border border-neon-cyan/40 bg-neon-cyan/10 px-2.5 py-1 text-xs font-medium text-neon-cyan">{service.tag}</span>
                      )}
                    </div>
                  </div>

                  <section className="mt-8">
                    <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-neon-cyan">What It Is</h4>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">{service.whatItIs}</p>
                  </section>

                  <section className="mt-8">
                    <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-neon-cyan">What We Offer</h4>
                    <ul className="mt-4 space-y-3">
                      {service.whatWeOffer.map((f) => (
                        <li key={f} className="flex items-start gap-3 text-sm sm:text-base">
                          <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-neon-cyan/15 text-neon-cyan">
                            <Check className="h-3 w-3" />
                          </span>
                          <span className="text-foreground/90">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </section>

                  <section className="mt-8">
                    <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-neon-cyan">Pros & Benefits</h4>
                    <div
                      className="relative mt-4 overflow-hidden rounded-xl border border-neon-purple/40 p-5 sm:p-6"
                      style={{
                        background:
                          "radial-gradient(120% 120% at 0% 0%, color-mix(in oklab, var(--neon-purple) 22%, transparent), transparent 60%), radial-gradient(120% 120% at 100% 100%, color-mix(in oklab, var(--neon-cyan) 18%, transparent), transparent 60%)",
                        boxShadow: "var(--shadow-neon)",
                      }}
                    >
                      <p className="text-sm leading-relaxed text-foreground/95 sm:text-base">{service.benefits}</p>
                    </div>
                  </section>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <a
                      href={`https://wa.me/${WA}?text=${encodeURIComponent(`Hi Onyx Studio, I'd like to know more about "${service.title}".`)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1"
                    >
                      <Button className="w-full bg-gradient-brand text-primary-foreground shadow-neon hover:opacity-95">
                        Enquire on WhatsApp <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </a>
                    <Button variant="outline" onClick={onClose} className="sm:w-32">Close</Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Estimator() {
  const [selected, setSelected] = useState<Record<string, boolean>>({ web: true });
  const [pcTier, setPcTier] = useState<string>("standard");
  const [posters, setPosters] = useState(2);
  const [stickers, setStickers] = useState(10);
  const [prints, setPrints] = useState(4);
  const posterPrice = 349;
  const pcPrice = PC_TIERS.find((t) => t.id === pcTier)?.price ?? 0;
  const total =
    ESTIMATOR.reduce((sum, s) => sum + (selected[s.id] ? s.price : 0), 0)
    + pcPrice
    + posters * posterPrice
    + stickers * STICKER_PRICE
    + prints * PRINT_PRICE;

  return (
    <section id="estimator" className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading eyebrow="Interactive" title={<>Estimate your <span className="text-gradient">project</span></>} subtitle="Toggle what you need. Prices are indicative starting points — final quotes confirmed on WhatsApp." />
        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_360px]">
          <Card className="neon-border bg-card/60 p-6 backdrop-blur">
            {/* Custom PC Build tier selector */}
            <div className="mb-4 rounded-xl border border-neon-purple/40 bg-accent/30 p-4 shadow-neon">
              <div className="mb-3 flex items-center justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold">Custom PC Build</div>
                  <div className="text-xs text-muted-foreground">Choose the complexity tier</div>
                </div>
                <span className="shrink-0 text-sm font-semibold text-neon-cyan">
                  {pcPrice ? `₹${pcPrice.toLocaleString("en-IN")}` : "—"}
                </span>
              </div>
              <Select value={pcTier} onValueChange={setPcTier}>
                <SelectTrigger className="w-full border-border bg-secondary/40">
                  <SelectValue placeholder="Select build type" />
                </SelectTrigger>
                <SelectContent>
                  {PC_TIERS.map((t) => (
                    <SelectItem key={t.id} value={t.id}>
                      {t.label}{t.price ? ` — ₹${t.price.toLocaleString("en-IN")}` : ""}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {ESTIMATOR.map((s) => {
                const active = !!selected[s.id];
                return (
                  <label key={s.id} className={`flex cursor-pointer items-center justify-between gap-3 rounded-xl border px-4 py-3 transition ${active ? "border-neon-purple/60 bg-accent/40 shadow-neon" : "border-border bg-secondary/30 hover:border-neon-cyan/50"}`}>
                    <div className="flex items-center gap-3 min-w-0">
                      <Checkbox checked={active} onCheckedChange={(v) => setSelected({ ...selected, [s.id]: !!v })} />
                      <span className="truncate text-sm">{s.label}</span>
                    </div>
                    <span className="shrink-0 text-sm font-semibold text-neon-cyan">₹{s.price.toLocaleString("en-IN")}</span>
                  </label>
                );
              })}
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-border bg-secondary/30 p-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="text-sm font-medium">AI Posters (framed)</div>
                    <div className="text-xs text-muted-foreground">₹{posterPrice} each</div>
                  </div>
                  <div className="text-2xl font-bold text-gradient">{posters}</div>
                </div>
                <Slider value={[posters]} min={0} max={10} step={1} onValueChange={(v) => setPosters(v[0])} className="mt-4" />
              </div>

              <div className="rounded-xl border border-border bg-secondary/30 p-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="text-sm font-medium">Vinyl Stickers</div>
                    <div className="text-xs text-muted-foreground">₹{STICKER_PRICE} each</div>
                  </div>
                  <div className="text-2xl font-bold text-gradient">{stickers}</div>
                </div>
                <Slider value={[stickers]} min={0} max={100} step={5} onValueChange={(v) => setStickers(v[0])} className="mt-4" />
              </div>

              <div className="rounded-xl border border-border bg-secondary/30 p-4 sm:col-span-2">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="text-sm font-medium">Passport / Poster Prints</div>
                    <div className="text-xs text-muted-foreground">₹{PRINT_PRICE} each (avg)</div>
                  </div>
                  <div className="text-2xl font-bold text-gradient">{prints}</div>
                </div>
                <Slider value={[prints]} min={0} max={50} step={1} onValueChange={(v) => setPrints(v[0])} className="mt-4" />
              </div>
            </div>
          </Card>
          <Card className="neon-border bg-card/60 p-6 backdrop-blur flex flex-col">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Estimated total</div>
            <div className="mt-2 text-5xl font-bold text-gradient">₹{total.toLocaleString("en-IN")}</div>
            <p className="mt-2 text-sm text-muted-foreground">Non-binding estimate. Actual quote depends on scope, parts, and turnaround.</p>
            <div className="mt-auto pt-6">
              <a href={`https://wa.me/${WA}?text=${encodeURIComponent(`Hi Onyx Studio, I'd like a quote (~₹${total}).`)}`} target="_blank" rel="noreferrer">
                <Button className="w-full bg-gradient-brand text-primary-foreground shadow-neon">Send on WhatsApp <ArrowRight className="ml-2 h-4 w-4" /></Button>
              </a>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}

function Subscriptions() {
  const tiers = [
    { name: "Tech Peace of Mind", price: "₹1,000", per: "/mo", tagline: "For homes & individuals",
      features: ["Unlimited basic tech support", "Monthly PC health checks", "Backup management"] },
    { name: "Business Growth Package", price: "₹3,000", per: "/mo", tagline: "For local shops & studios", featured: true,
      features: ["Web hosting included", "Google Maps optimization", "Monthly tech maintenance"] },
  ];
  return (
    <section id="plans" className="relative py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading eyebrow="Retainers" title={<>Ongoing <span className="text-gradient">support plans</span></>} subtitle="Straightforward monthly retainers. Cancel anytime." />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {tiers.map((t) => (
            <Card key={t.name} className={`relative overflow-hidden p-8 backdrop-blur ${t.featured ? "neon-border bg-card/70 shadow-neon" : "neon-border bg-card/60"}`}>
              {t.featured && (
                <div className="absolute right-4 top-4 rounded-full bg-gradient-brand px-3 py-1 text-xs font-semibold text-primary-foreground">Popular</div>
              )}
              <div className="text-xs uppercase tracking-wider text-muted-foreground">{t.tagline}</div>
              <h3 className="mt-2 text-2xl font-bold">{t.name}</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-5xl font-bold text-gradient">{t.price}</span>
                <span className="text-muted-foreground">{t.per}</span>
              </div>
              <ul className="mt-6 space-y-3">
                {t.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm">
                    <span className="grid h-5 w-5 place-items-center rounded-full bg-neon-cyan/15 text-neon-cyan"><Check className="h-3 w-3" /></span>
                    {f}
                  </li>
                ))}
              </ul>
              <a href="#contact" className="mt-8 block">
                <Button className={`w-full ${t.featured ? "bg-gradient-brand text-primary-foreground shadow-neon" : ""}`} variant={t.featured ? "default" : "outline"}>Get started</Button>
              </a>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const [form, setForm] = useState({ name: "", phone: "", service: "", address: "", notes: "" });

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || form.phone.length < 7) {
      toast.error("Please enter your name and a valid phone number.");
      return;
    }
    const msg = `New booking request:\nName: ${form.name}\nPhone: ${form.phone}\nService: ${form.service || "N/A"}\nAddress: ${form.address}\nNotes: ${form.notes}`;
    window.open(`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`, "_blank");
    toast.success("Opening WhatsApp to send your request…");
  }

  return (
    <section id="contact" className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading eyebrow="Contact" title={<>Let's <span className="text-gradient">talk</span></>} subtitle="Send a quick request or ping us on WhatsApp." />
        <div className="mt-12 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <Card className="neon-border bg-card/60 p-6 backdrop-blur sm:p-8">
            <form onSubmit={submit} className="grid gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Name"><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value.slice(0, 80) })} placeholder="Your name" required /></Field>
                <Field label="Phone number"><Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value.replace(/[^\d+ ]/g, "").slice(0, 20) })} placeholder="+91 …" required /></Field>
              </div>
              <Field label="Service category">
                <Select value={form.service} onValueChange={(v) => setForm({ ...form, service: v })}>
                  <SelectTrigger><SelectValue placeholder="Pick a service" /></SelectTrigger>
                  <SelectContent>
                    {SERVICES.map((s) => <SelectItem key={s.title} value={s.title}>{s.title}</SelectItem>)}
                    <SelectItem value="Other">Other / Not sure</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Address or college name">
                <Input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value.slice(0, 200) })} placeholder="Area, landmark, or college" />
              </Field>
              <Field label="Project notes">
                <Textarea rows={4} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value.slice(0, 1000) })} placeholder="Tell us what you need…" />
              </Field>
              <Button type="submit" size="lg" className="mt-2 bg-gradient-brand text-primary-foreground shadow-neon">Send request</Button>
            </form>
          </Card>
          <div className="grid gap-4 content-start">
            <Card className="neon-border bg-card/60 p-6 backdrop-blur">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Lead tech</div>
              <div className="mt-1 text-xl font-semibold">S Gnan Charan</div>
              <a href={`tel:+${WA}`} className="mt-4 flex items-center gap-3 rounded-lg border border-border bg-secondary/30 p-3 transition hover:border-neon-cyan/60">
                <Phone className="h-4 w-4 text-neon-cyan" />
                <span className="text-sm">+91 9346528844</span>
              </a>
              <div className="mt-3 flex items-start gap-3 rounded-lg border border-border bg-secondary/30 p-3">
                <MapPin className="mt-0.5 h-4 w-4 text-neon-purple" />
                <span className="text-sm text-muted-foreground">LG Nagar, Peda Narava, Visakhapatnam, Andhra Pradesh</span>
              </div>
            </Card>
            <Card className="neon-border bg-card/60 p-6 backdrop-blur">
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-neon-cyan" />
                <div className="text-sm font-semibold">Honest, no-fluff service</div>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">No fake reviews, no inflated numbers. Just clear scopes, fair prices, and delivery on WhatsApp.</p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-2">
      <Label className="text-xs uppercase tracking-wider text-muted-foreground">{label}</Label>
      {children}
    </div>
  );
}

function SectionHeading({ eyebrow, title, subtitle }: { eyebrow: string; title: React.ReactNode; subtitle: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <div className="inline-flex rounded-full border border-border/70 glass px-3 py-1 text-xs uppercase tracking-wider text-muted-foreground">{eyebrow}</div>
      <h2 className="mt-4 text-3xl font-bold sm:text-5xl">{title}</h2>
      <p className="mt-3 text-muted-foreground">{subtitle}</p>
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border/60 py-10">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:flex sm:items-center sm:justify-between sm:px-6">
        <div className="flex flex-col gap-2">
          <Brand />
          <p className="text-xs text-muted-foreground">© 2026 Onyx Studio. All rights reserved.</p>
        </div>
        <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
          <a href="#services" className="hover:text-foreground">Services</a>
          <a href="#contact" className="hover:text-foreground">Contact</a>
          <TOSModal />
        </div>
      </div>
    </footer>
  );
}

function TOSModal() {
  const items = [
    { title: "Hardware Liability", body: "For custom PC builds, the customer provides all components. Warranty and RMA responsibilities lie with the respective component manufacturers. Onyx Studio is responsible strictly for assembly and initial stress testing." },
    { title: "Data Protection & Liability", body: "Customers are strictly required to back up all personal data before handing over devices for repair, NAS setup, or deep cleaning. Onyx Studio is not liable for any data loss, corruption, or pre-existing hardware failure." },
    { title: "Software & Licensing", body: "All software, operating systems, and media configurations are installed at the explicit request of the user. Customers are responsible for their own software licenses and the media they host on their local networks." },
    { title: "Subscription Scope", body: "The 'Tech Peace of Mind' subscription covers basic software troubleshooting and physical health checks. Hardware replacement costs, parts, and advanced data recovery are billed separately." },
    { title: "AI Art Generation", body: "AI outputs are generative and inherently unpredictable. Revisions are limited to 2 per order. Printed artwork is for personal, decorative use only." },
  ];
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="hover:text-foreground underline-offset-4 hover:underline">Terms of Service & User Agreement</button>
      </DialogTrigger>
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">Terms of Service & User Agreement</DialogTitle>
        </DialogHeader>
        <div className="mt-2 space-y-5 text-sm leading-relaxed text-muted-foreground">
          {items.map((it) => (
            <div key={it.title}>
              <div className="mb-1 font-semibold text-foreground">{it.title}</div>
              <p>{it.body}</p>
            </div>
          ))}
          <p className="pt-2 text-xs">By engaging Onyx Studio, the customer acknowledges and accepts the terms above.</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/919346528844?text=Hi%20Onyx%20Studio,%20I%27d%20like%20to%20know%20more%20about%20your%20services."
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-40 grid h-14 w-14 place-items-center rounded-full bg-[oklch(0.7_0.2_145)] text-white shadow-lg animate-pulse-ring transition hover:scale-105"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}
