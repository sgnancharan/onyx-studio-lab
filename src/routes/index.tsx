import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sun, Moon, Menu, X, Sparkles, Cpu, Palette, Globe, Wifi, MapPin,
  FileText, ArrowRight, Phone, MessageCircle, Shield, Check, History,
  Smartphone, QrCode, GraduationCap,
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

const SERVICES = [
  { icon: FileText, title: "AI Resumes & Project Reports", desc: "ATS-optimized AI resumes printed on premium glossy paper, plus formatted & spiral-bound B.Tech lab reports and seminar PPTs." },
  { icon: Palette, title: "Custom AI Art & Framing", desc: "Transform selfies, couple photos, or pets into Royal Oil Paintings, Cyberpunk, or Anime art. Printed in high-res and beautifully framed." },
  { icon: Cpu, title: "Custom PC Building", desc: "Professional assembly, cable management, and stress testing. You bring the parts, we build the beast.", tag: "Starting ₹4,000" },
  { icon: Globe, title: "Web Development & Hosting", desc: "Interactive websites built fast for local businesses, with monthly hosting & maintenance plans." },
  { icon: Wifi, title: "Smart TV & Home Tech Setup", desc: "Smart TV ad-blocking, Wi-Fi dead-zone fixing, NAS personal cloud setups, and PC deep cleaning.", tag: "₹500/visit" },
  { icon: MapPin, title: "Google Maps & WhatsApp Business", desc: "Get your local shop verified on Google Maps with automated WhatsApp business greeting bots." },
];

const ESTIMATOR = [
  { id: "pc", label: "Custom PC Build (assembly)", price: 4000 },
  { id: "nas", label: "Home NAS / Cloud Setup", price: 2500 },
  { id: "resume", label: "AI Resume (printed)", price: 499 },
  { id: "wifi", label: "Wi-Fi Dead-Zone Fix", price: 500 },
  { id: "web", label: "Starter Website (1 page)", price: 6000 },
  { id: "maps", label: "Google Maps Verification", price: 1500 },
];

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
    <a href="#top" className={`flex items-center gap-2 font-display text-xl font-bold tracking-tight ${className}`}>
      <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-brand shadow-neon">
        <Sparkles className="h-4 w-4 text-primary-foreground" />
      </span>
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
  return (
    <section id="services" className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading eyebrow="What we build" title={<>Six services, <span className="text-gradient">one studio</span></>} subtitle="From hardware to hosting to AI-generated visuals — practical work delivered locally." />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <motion.div key={s.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ delay: i * 0.05 }}>
              <Card className="neon-border neon-hover group h-full bg-card/60 p-6 backdrop-blur">
                <div className="mb-5 flex items-center justify-between">
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-brand shadow-neon">
                    <s.icon className="h-5 w-5 text-primary-foreground" />
                  </div>
                  {s.tag && <span className="rounded-full border border-neon-cyan/40 bg-neon-cyan/10 px-2.5 py-1 text-xs font-medium text-neon-cyan">{s.tag}</span>}
                </div>
                <h3 className="text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Estimator() {
  const [selected, setSelected] = useState<Record<string, boolean>>({ pc: true });
  const [posters, setPosters] = useState(2);
  const posterPrice = 349;
  const total = ESTIMATOR.reduce((sum, s) => sum + (selected[s.id] ? s.price : 0), 0) + posters * posterPrice;

  return (
    <section id="estimator" className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading eyebrow="Interactive" title={<>Estimate your <span className="text-gradient">project</span></>} subtitle="Toggle what you need. Prices are indicative starting points — final quotes confirmed on WhatsApp." />
        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_360px]">
          <Card className="neon-border bg-card/60 p-6 backdrop-blur">
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
            <div className="mt-6 rounded-xl border border-border bg-secondary/30 p-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-sm font-medium">AI Posters (framed prints)</div>
                  <div className="text-xs text-muted-foreground">₹{posterPrice} each</div>
                </div>
                <div className="text-2xl font-bold text-gradient">{posters}</div>
              </div>
              <Slider value={[posters]} min={0} max={10} step={1} onValueChange={(v) => setPosters(v[0])} className="mt-4" />
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
      href={`https://wa.me/${WA}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-40 grid h-14 w-14 place-items-center rounded-full bg-[oklch(0.7_0.2_145)] text-white shadow-lg animate-pulse-ring transition hover:scale-105"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}
