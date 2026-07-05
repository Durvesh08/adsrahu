import React, { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { useSettings } from "@/lib/useSettings";
import {
  Phone, ArrowRight, CheckCircle2, TrendingUp, Users, Target,
  Activity, MessageSquare, X, Zap, BarChart2, Layers, Bell,
  ChevronRight, Star, Shield, Send
} from "lucide-react";
import { SiWhatsapp, SiX, SiFacebook, SiGoogleads } from "react-icons/si";
import { Linkedin } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ParticleBackground } from "@/components/ui/ParticleBackground";
import { TypewriterText } from "@/components/ui/TypewriterText";

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1800;
    const step = 16;
    const increment = target / (duration / step);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, step);
    return () => clearInterval(timer);
  }, [inView, target]);
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as any } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };

export default function Home() {
  const settings = useSettings();
  const waNumber = settings.whatsappNumber.replace(/\D/g, "");

  useEffect(() => {
    if (settings.metaTitle) document.title = settings.metaTitle;
    if (settings.metaDescription) {
      let meta = document.querySelector('meta[name="description"]');
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', 'description');
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', settings.metaDescription);
    }
  }, [settings.metaTitle, settings.metaDescription]);

  return (
    <div className="flex flex-col min-h-screen pt-20 overflow-x-hidden">

      {/* ═══════════════════════════════════════════════════════
          1. HERO SECTION — Cinematic, immersive, full-screen
      ═══════════════════════════════════════════════════════ */}
      <section className="relative min-h-[95vh] flex items-center overflow-hidden">
        {/* Layered background */}
        <div className="absolute inset-0 bg-[#020408]" />
        <ParticleBackground />
        <div className="absolute inset-0" style={{background:'radial-gradient(ellipse 80% 60% at 20% 40%, rgba(59,130,246,0.18) 0%, transparent 65%), radial-gradient(ellipse 60% 50% at 80% 20%, rgba(99,102,241,0.12) 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 60% 90%, rgba(16,185,129,0.05) 0%, transparent 50%)'}} />
        <div className="absolute inset-0 bg-grid opacity-[0.07]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#020408]" />

        {/* Floating glow orbs */}
        <div className="absolute top-[15%] left-[5%] w-80 h-80 orb bg-blue-600/25 animate-float-slow" />
        <div className="absolute bottom-[10%] right-[5%] w-[28rem] h-[28rem] orb bg-indigo-700/15 animate-float" style={{animationDelay:'3s'}} />
        <div className="absolute top-[60%] left-[40%] w-64 h-64 orb bg-blue-500/10 animate-float-slow" style={{animationDelay:'1.5s'}} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center py-20 lg:py-0">

          {/* LEFT — Copy */}
          <motion.div variants={stagger} initial="hidden" animate="show" className="text-center lg:text-left">
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-sm font-medium text-blue-300 mb-8 backdrop-blur-sm">
              <span className="flex h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
              Premium Real Estate Growth Partner
            </motion.div>

            <motion.h1 variants={fadeUp} className="text-5xl sm:text-6xl lg:text-[72px] font-bold tracking-tight mb-4 leading-[1.05]">
              <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent animate-gradient" style={{backgroundSize:'200% 200%'}}>{settings.heroHeading}</span>
            </motion.h1>
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6 leading-[1.1]">
              We Grow <TypewriterText />
            </motion.h2>

            <motion.p variants={fadeUp} className="text-lg sm:text-xl text-gray-400 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              {settings.heroSubheading}
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <Link
                href="/book-a-call"
                data-testid="button-hero-book-call"
                className="w-full sm:w-auto inline-flex h-14 items-center justify-center rounded-xl btn-premium px-8 text-base font-semibold text-white gap-2 group"
              >
                <Phone className="h-4 w-4 transition-transform group-hover:rotate-12" />
                Book Free Strategy Call
              </Link>
              <a
                href={`https://wa.me/${waNumber}`}
                target="_blank"
                rel="noreferrer"
                data-testid="button-hero-whatsapp"
                className="w-full sm:w-auto inline-flex h-14 items-center justify-center rounded-xl border border-green-500/30 bg-green-500/10 backdrop-blur-md px-8 text-base font-medium text-white gap-2 transition-all duration-300 hover:bg-green-500/20 hover:border-green-400/50 hover:shadow-[0_0_25px_rgba(34,197,94,0.2)] group"
              >
                <SiWhatsapp className="h-5 w-5 text-green-400 group-hover:drop-shadow-[0_0_8px_rgba(34,197,94,0.9)] transition-all" />
                Chat On WhatsApp
              </a>
            </motion.div>

            {/* Social proof strip */}
            <motion.div variants={fadeUp} className="mt-10 flex items-center gap-4 justify-center lg:justify-start">
              <div className="flex -space-x-2">
                {['B','R','M','A'].map((l,i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-[#020408] bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-xs font-bold text-white">{l}</div>
                ))}
              </div>
              <div className="text-sm text-gray-400">
                <span className="text-white font-semibold">500+</span> leads generated this month
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT — Cinematic Dashboard Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 60, scale: 0.92 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] as any }}
            className="hidden lg:block relative"
          >
            {/* Main dashboard card */}
            <div className="animate-float" style={{animationDuration:'7s'}}>
              <div
                className="relative rounded-2xl overflow-hidden p-[1px]"
                style={{background:'linear-gradient(135deg, rgba(59,130,246,0.4) 0%, rgba(99,102,241,0.2) 50%, rgba(59,130,246,0.1) 100%)', boxShadow:'0 0 80px rgba(59,130,246,0.2), 0 0 160px rgba(59,130,246,0.08), inset 0 1px 0 rgba(255,255,255,0.1)'}}
              >
                <div className="rounded-2xl bg-[#080c14]/95 backdrop-blur-xl p-5">
                  {/* Window chrome */}
                  <div className="flex items-center justify-between mb-5 pb-4 border-b border-white/5">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500/80" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                      <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    </div>
                    <div className="text-xs text-gray-500 font-mono flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse inline-block" />
                      Adsrahu Lead Intelligence
                    </div>
                    <div className="text-xs text-gray-600">v2.4.1</div>
                  </div>

                  {/* KPI row */}
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    {[
                      {label:'Total Leads', value:settings.totalLeads, delta:'+24%', up:true},
                      {label:'Cost Per Lead', value:settings.avgCpl, delta:'-18%', up:true},
                      {label:'Conversions', value:settings.conversionRate, delta:'+8%', up:true},
                    ].map((kpi,i) => (
                      <div key={i} className="rounded-xl bg-white/[0.03] border border-white/5 p-3">
                        <div className="text-[10px] text-gray-500 mb-1 uppercase tracking-wider">{kpi.label}</div>
                        <div className="text-xl font-bold text-white mb-1">{kpi.value}</div>
                        <div className="text-[10px] text-green-400 flex items-center gap-1"><TrendingUp className="w-3 h-3" />{kpi.delta}</div>
                      </div>
                    ))}
                  </div>

                  {/* Animated bar chart */}
                  <div className="rounded-xl bg-white/[0.02] border border-white/5 p-4 mb-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs text-gray-500 uppercase tracking-wider">Lead Volume — Last 7 Days</span>
                      <span className="text-[10px] text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full">Live</span>
                    </div>
                    <div className="flex items-end gap-1.5 h-20">
                      {[35,58,42,76,51,88,72].map((h,i) => (
                        <div key={i} className="flex-1 rounded-t-sm relative overflow-hidden bg-blue-950/40">
                          <div
                            className="absolute bottom-0 left-0 right-0 rounded-t-sm"
                            style={{
                              height:`${h}%`,
                              background:'linear-gradient(to top, #3b82f6, #818cf8)',
                              boxShadow:'0 0 8px rgba(59,130,246,0.5)',
                              animationDelay:`${i*0.1}s`
                            }}
                          />
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between mt-2">
                      {['M','T','W','T','F','S','S'].map((d,i) => (
                        <div key={i} className="text-[9px] text-gray-600 flex-1 text-center">{d}</div>
                      ))}
                    </div>
                  </div>

                  {/* Lead pipeline */}
                  <div className="rounded-xl bg-white/[0.02] border border-white/5 p-4">
                    <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-3">Pipeline Status</div>
                    {[
                      {stage:'New Leads', count:48, pct:100, color:'#3b82f6'},
                      {stage:'Contacted', count:31, pct:65, color:'#6366f1'},
                      {stage:'Site Visit', count:19, pct:40, color:'#8b5cf6'},
                      {stage:'Closed', count:11, pct:23, color:'#10b981'},
                    ].map((s,i) => (
                      <div key={i} className="flex items-center gap-3 mb-2 last:mb-0">
                        <div className="text-[10px] text-gray-400 w-20 shrink-0">{s.stage}</div>
                        <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full rounded-full transition-all" style={{width:`${s.pct}%`, background:s.color, boxShadow:`0 0 6px ${s.color}`}} />
                        </div>
                        <div className="text-[10px] text-gray-400 w-5 text-right">{s.count}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Floating notification — top right */}
            <div className="absolute -right-8 top-8 animate-float" style={{animationDelay:'1s', animationDuration:'5s'}}>
              <div className="glass-card rounded-xl p-3 shadow-xl min-w-[180px]" style={{boxShadow:'0 0 30px rgba(34,197,94,0.15)'}}>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
                    <SiWhatsapp className="w-4 h-4 text-green-400" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white">New Lead — Raj K.</div>
                    <div className="text-[10px] text-gray-400 mt-0.5">Site visit scheduled</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating notification — bottom left */}
            <div className="absolute -left-10 bottom-12 animate-float-slow" style={{animationDelay:'2s'}}>
              <div className="glass-card rounded-xl p-3 shadow-xl min-w-[175px]" style={{boxShadow:'0 0 30px rgba(59,130,246,0.15)'}}>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
                    <BarChart2 className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white">ROI Report Ready</div>
                    <div className="text-[10px] text-green-400 mt-0.5">5.2x return this week</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating notification — mid left */}
            <div className="absolute -left-6 top-1/2 -translate-y-1/2 animate-float" style={{animationDelay:'0.5s', animationDuration:'6s'}}>
              <div className="glass-card rounded-xl p-3 shadow-xl" style={{boxShadow:'0 0 25px rgba(99,102,241,0.15)'}}>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <div className="w-3 h-3 bg-green-500 rounded-full" />
                    <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-60" />
                  </div>
                  <div className="text-[10px] font-medium text-white">WhatsApp Automation</div>
                </div>
                <div className="text-[9px] text-gray-400 mt-1 ml-5">Brochure delivered • 2s ago</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          2. STATS MARQUEE
      ═══════════════════════════════════════════════════════ */}
      <section className="py-16 relative overflow-hidden border-y border-white/5">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-[#0a0f1e] to-black" />
        <div className="absolute inset-0 section-glow" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              { label: "Leads Generated", value: 500, suffix: "+", icon: Users },
              { label: "Countries Served", value: 3, suffix: "", icon: Star },
              { label: "Client Retention", value: 98, suffix: "%", icon: Shield },
              { label: "Average ROI", value: 5, suffix: "x", icon: TrendingUp },
              { label: "Wasted Budget", value: 0, suffix: "", prefix: "₹", icon: Zap },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group relative p-[1px] rounded-2xl"
                style={{background:'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)'}}
              >
                <div className="rounded-2xl bg-[#080c14] p-6 text-center h-full transition-all duration-300 group-hover:bg-[#0d1220]" style={{boxShadow:'0 0 0 1px rgba(255,255,255,0.04)'}}>
                  <stat.icon className="w-5 h-5 text-blue-500/60 mx-auto mb-3" />
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent mb-1">
                    {stat.prefix}<AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider font-medium">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          2.5 INFINITE INTEGRATION MARQUEE
      ═══════════════════════════════════════════════════════ */}
      <section className="py-8 bg-black/40 border-b border-white/5 overflow-hidden">
        <div className="relative w-full flex items-center overflow-hidden">
          {/* Edge fade masks */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#020408] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#020408] to-transparent z-10 pointer-events-none" />
          
          <div className="animate-marquee flex gap-20 py-2">
            {[
              { name: "Google Ads", icon: SiGoogleads, color: "#ea4335" },
              { name: "Meta Ads", icon: SiFacebook, color: "#1877f2" },
              { name: "WhatsApp Business", icon: SiWhatsapp, color: "#25d366" },
              { name: "Telegram Native", icon: Send, color: "#229ed9" },
              { name: "X Campaigns", icon: SiX, color: "#ffffff" },
              { name: "CRM Automations", icon: BarChart2, color: "#6366f1" },
            ].map((p, i) => (
              <div key={i} className="flex items-center gap-3 text-sm font-semibold text-gray-500 select-none hover:text-gray-300 transition-colors">
                <p.icon className="w-5 h-5 opacity-70" style={{ color: p.color }} />
                <span>{p.name}</span>
              </div>
            ))}
            {/* Duplicate for infinite loop */}
            {[
              { name: "Google Ads", icon: SiGoogleads, color: "#ea4335" },
              { name: "Meta Ads", icon: SiFacebook, color: "#1877f2" },
              { name: "WhatsApp Business", icon: SiWhatsapp, color: "#25d366" },
              { name: "Telegram Native", icon: Send, color: "#229ed9" },
              { name: "X Campaigns", icon: SiX, color: "#ffffff" },
              { name: "CRM Automations", icon: BarChart2, color: "#6366f1" },
            ].map((p, i) => (
              <div key={`dup-${i}`} className="flex items-center gap-3 text-sm font-semibold text-gray-500 select-none hover:text-gray-300 transition-colors">
                <p.icon className="w-5 h-5 opacity-70" style={{ color: p.color }} />
                <span>{p.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════
          3. PROBLEM vs SOLUTION — Dramatic split
      ═══════════════════════════════════════════════════════ */}
      <section className="py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#030508]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{once:true}} className="text-center mb-16">
            <motion.p variants={fadeUp} className="text-blue-400 font-semibold text-sm uppercase tracking-widest mb-4">The Problem We Solve</motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold text-white mb-4">Stop Burning Money On Bad Leads</motion.h2>
            <motion.p variants={fadeUp} className="text-gray-400 max-w-2xl mx-auto text-lg">The old agency model is broken. You need a complete lead generation system, not just ads.</motion.p>
          </motion.div>

          <div className="flex flex-nowrap overflow-x-auto snap-x snap-mandatory hide-scrollbar md:grid md:grid-cols-2 gap-6 lg:gap-10 pb-6 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0">
            {/* Problems */}
            <motion.div initial={{opacity:0,x:-30}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:0.7}} className="relative min-w-[85vw] snap-center md:min-w-0">
              <div className="absolute -inset-px rounded-2xl" style={{background:'linear-gradient(135deg, rgba(239,68,68,0.3) 0%, transparent 60%)'}} />
              <div className="relative rounded-2xl bg-[#0a0608]/90 border border-red-500/20 p-8 backdrop-blur-sm" style={{boxShadow:'0 0 60px rgba(239,68,68,0.08), inset 0 1px 0 rgba(239,68,68,0.1)'}}>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-red-500/15 border border-red-500/20 flex items-center justify-center">
                    <X className="w-5 h-5 text-red-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white">The Problem</h3>
                </div>
                <ul className="space-y-4">
                  {[
                    "Low quality leads wasting sales team time",
                    "Wasted ad budget with no tracking",
                    "Poor follow-up, leads go cold",
                    "No automation, everything is manual",
                    "Low conversion rates from inquiry to sale",
                    "Inconsistent and unpredictable inquiries",
                  ].map((item, i) => (
                    <motion.li key={i} initial={{opacity:0,x:-10}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{delay:i*0.07}} className="flex items-start gap-3 text-gray-400">
                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Solutions */}
            <motion.div initial={{opacity:0,x:30}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:0.7}} className="relative min-w-[85vw] snap-center md:min-w-0">
              <div className="absolute -inset-px rounded-2xl animate-pulse-glow" style={{background:'linear-gradient(135deg, rgba(59,130,246,0.4) 0%, rgba(99,102,241,0.2) 50%, transparent 100%)'}} />
              <div className="relative rounded-2xl bg-[#060812]/90 border border-blue-500/25 p-8 backdrop-blur-sm" style={{boxShadow:'0 0 80px rgba(59,130,246,0.12), inset 0 1px 0 rgba(59,130,246,0.15)'}}>
                <div className="absolute top-0 right-0 w-48 h-48 orb bg-blue-500/15" style={{transform:'translate(30%, -30%)'}} />
                <div className="flex items-center gap-3 mb-8 relative z-10">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-blue-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white">The Adsrahu System</h3>
                </div>
                <ul className="space-y-4 relative z-10">
                  {[
                    "High-converting lead funnels built to qualify",
                    "CRM & WhatsApp automation from day one",
                    "Smart targeting to reach real buyers",
                    "Instant lead routing to your sales team",
                    "Complete lead tracking & attribution",
                    "Scalable systems that grow with you",
                  ].map((item, i) => (
                    <motion.li key={i} initial={{opacity:0,x:10}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{delay:i*0.07}} className="flex items-start gap-3 text-white font-medium">
                      <CheckCircle2 className="mt-0.5 w-4 h-4 text-blue-400 shrink-0" />
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          4. REAL ESTATE — Most premium section
      ═══════════════════════════════════════════════════════ */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-black" />
        <div className="absolute inset-0" style={{background:'radial-gradient(ellipse 100% 60% at 50% 0%, rgba(59,130,246,0.12) 0%, transparent 60%), radial-gradient(ellipse 60% 80% at 90% 50%, rgba(99,102,241,0.06) 0%, transparent 60%)'}} />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{once:true}} className="text-center mb-20">
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 text-amber-400 font-bold text-sm uppercase tracking-widest mb-4 bg-amber-400/10 border border-amber-400/20 rounded-full px-4 py-1.5">
              <Star className="w-3.5 h-3.5" />
              Core Expertise
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Real Estate Lead<br />
              <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-blue-400 bg-clip-text text-transparent animate-gradient" style={{backgroundSize:'200% 200%'}}>
                Generation Experts
              </span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              We build complete lead generation engines for real estate — from Facebook Ads to landing pages, CRM and WhatsApp automation.
            </motion.p>
          </motion.div>

          {/* Service cards — 8 cards */}
          <div className="flex flex-nowrap overflow-x-auto snap-x snap-mandatory hide-scrollbar md:grid md:grid-cols-2 lg:grid-cols-4 gap-5 mb-12 pb-6 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0">
            {[
              { title: "Facebook & IG Ads", icon: SiFacebook, desc: "Laser-targeted campaigns reaching active property buyers.", color: "#1877f2" },
              { title: "Google Lead Campaigns", icon: SiGoogleads, desc: "Capture high-intent search traffic looking to buy now.", color: "#ea4335" },
              { title: "Landing Pages", icon: Layers, desc: "High-converting project pages that capture and qualify.", color: "#3b82f6" },
              { title: "CRM Setup & Pipeline", icon: BarChart2, desc: "End-to-end lead management and sales pipeline tracking.", color: "#6366f1" },
              { title: "WhatsApp Funnels", icon: SiWhatsapp, desc: "Automated engagement, brochure delivery and nurturing.", color: "#25d366" },
              { title: "Automation Systems", icon: Zap, desc: "Instant lead routing and follow-up without human delay.", color: "#f59e0b" },
              { title: "Lead Tracking & ROI", icon: TrendingUp, desc: "Attribution models that show exactly what's working.", color: "#8b5cf6" },
              { title: "Scaling & Optimisation", icon: Target, desc: "Data-driven scaling to lower CPL and increase volume.", color: "#10b981" },
            ].map((service, i) => (
              <motion.div
                key={i}
                initial={{opacity:0, y:24}}
                whileInView={{opacity:1, y:0}}
                viewport={{once:true}}
                transition={{duration:0.5, delay:i*0.07}}
                className="premium-glow-card group rounded-2xl cursor-default min-w-[85vw] sm:min-w-[45vw] md:min-w-0 snap-center shrink-0"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%)',
                  ['--hover-glow-color' as any]: `${service.color}20`,
                }}
              >
                <div className="rounded-2xl p-7 h-full transition-all duration-500 group-hover:bg-[#0c1220]">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110" style={{background:`${service.color}18`, border:`1px solid ${service.color}30`}}>
                    <service.icon className="w-6 h-6" style={{color:service.color}} />
                  </div>
                  <div className="w-full h-0.5 rounded-full mb-5 opacity-50" style={{background:`linear-gradient(90deg, ${service.color}, transparent)`}} />
                  <h3 className="text-base font-bold text-white mb-2">{service.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{service.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Stats bar */}
          <motion.div
            initial={{opacity:0, y:20}}
            whileInView={{opacity:1, y:0}}
            viewport={{once:true}}
            transition={{duration:0.6}}
            className="relative rounded-2xl p-[1px] overflow-hidden"
            style={{background:'linear-gradient(90deg, rgba(59,130,246,0.4), rgba(99,102,241,0.3), rgba(59,130,246,0.4))'}}
          >
            <div className="rounded-2xl bg-[#080c14]/95 backdrop-blur-sm p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/5 text-center">
              {[
                {val: settings.totalLeads, label:'Leads Generated This Month'},
                {val: settings.avgCpl, label:'Average Cost Per Lead'},
                {val: settings.conversionRate, label:'Site Visit Conversion Rate'},
              ].map((s,i) => (
                <div key={i} className="py-5 sm:py-0 px-6">
                  <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent mb-2">{s.val}</div>
                  <div className="text-xs text-gray-500 uppercase tracking-widest font-semibold">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          5. LEAD JOURNEY — Cinematic funnel visualisation
      ═══════════════════════════════════════════════════════ */}
      <section className="py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#030508]" />
        <div className="absolute inset-0" style={{background:'radial-gradient(ellipse 70% 50% at 50% 100%, rgba(59,130,246,0.08) 0%, transparent 70%)' }} />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{once:true}} className="text-center mb-20">
            <motion.p variants={fadeUp} className="text-blue-400 font-semibold text-sm uppercase tracking-widest mb-4">The System</motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold text-white mb-4">How Your Lead Journey Works</motion.h2>
            <motion.p variants={fadeUp} className="text-gray-400 max-w-2xl mx-auto text-lg">A complete end-to-end system — from first ad impression to a closed deal.</motion.p>
          </motion.div>

          {/* Funnel steps */}
          <div className="flex flex-nowrap overflow-x-auto snap-x snap-mandatory hide-scrollbar md:grid md:grid-cols-5 gap-4 items-stretch pb-6 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0">
            {[
              { step:"01", label:"Targeted Ads", sub:"Facebook, Google", icon:SiFacebook, color:"#1877f2" },
              { step:"02", label:"Landing Page", sub:"Capture & qualify", icon:Layers, color:"#3b82f6" },
              { step:"03", label:"WhatsApp", sub:"Instant engagement", icon:SiWhatsapp, color:"#25d366" },
              { step:"04", label:"CRM Pipeline", sub:"Track & manage", icon:BarChart2, color:"#6366f1" },
              { step:"05", label:"Closed Sales", sub:"Revenue growth", icon:TrendingUp, color:"#10b981" },
            ].map((s, i, arr) => (
              <React.Fragment key={i}>
                <motion.div
                  initial={{opacity:0, y:20}}
                  whileInView={{opacity:1, y:0}}
                  viewport={{once:true}}
                  transition={{duration:0.5, delay:i*0.12}}
                  className="group relative rounded-2xl p-[1px]"
                  style={{background:`linear-gradient(135deg, ${s.color}40 0%, rgba(255,255,255,0.05) 100%)`}}
                >
                  <div className="rounded-2xl bg-[#080c14] p-6 text-center h-full flex flex-col items-center transition-all duration-300 group-hover:-translate-y-1" style={{boxShadow:`0 0 0 0 transparent`}}>
                    <div className="text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-3">{s.step}</div>
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4" style={{background:`${s.color}18`, border:`1px solid ${s.color}35`, boxShadow:`0 0 20px ${s.color}20`}}>
                      <s.icon className="w-5 h-5" style={{color:s.color}} />
                    </div>
                    <div className="font-bold text-white mb-1">{s.label}</div>
                    <div className="text-xs text-gray-500">{s.sub}</div>
                  </div>
                </motion.div>
                {i < arr.length - 1 && (
                  <div className="hidden md:flex items-center justify-center text-blue-500/40 animate-pulse -mx-2">
                    <ChevronRight className="w-5 h-5" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>

          <motion.p
            initial={{opacity:0}}
            whileInView={{opacity:1}}
            viewport={{once:true}}
            transition={{delay:0.6}}
            className="text-center text-gray-500 mt-10 max-w-xl mx-auto"
          >
            We build and manage every step of this system — so you can focus on closing deals, not chasing leads.
          </motion.p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          6. OTHER SERVICES — Modern grid
      ═══════════════════════════════════════════════════════ */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-black" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-end justify-between mb-14">
            <div>
              <p className="text-blue-400 font-semibold text-sm uppercase tracking-widest mb-3">Full-Stack Growth</p>
              <h2 className="text-4xl md:text-5xl font-bold text-white">Other Growth Services</h2>
            </div>
            <Link href="/services" className="hidden sm:inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors border border-white/10 rounded-lg px-4 py-2 hover:border-white/20">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="flex flex-nowrap overflow-x-auto snap-x snap-mandatory hide-scrollbar md:grid md:grid-cols-2 lg:grid-cols-4 gap-5 pb-6 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0">
            {[
              { name:"Social Media Management", desc:"Content, strategy and community growth across all platforms.", icon:Star, color:"#f59e0b" },
              { name:"Business Development", desc:"Strategic partnerships and market expansion for real growth.", icon:TrendingUp, color:"#3b82f6" },
              { name:"App Development", desc:"Modern web and mobile applications to power your business.", icon:Layers, color:"#8b5cf6" },
              { name:"Branding & Strategy", desc:"Premium brand identity and positioning that commands trust.", icon:Shield, color:"#10b981" },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{opacity:0, y:20}}
                whileInView={{opacity:1, y:0}}
                viewport={{once:true}}
                transition={{duration:0.5, delay:i*0.08}}
                className="group rounded-2xl border border-white/5 bg-[#0a0c12] p-7 hover:border-white/10 transition-all duration-300 hover:-translate-y-1"
                style={{boxShadow:'0 0 0 0 transparent'}}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110" style={{background:`${s.color}15`, border:`1px solid ${s.color}25`}}>
                  <s.icon className="w-5 h-5" style={{color:s.color}} />
                </div>
                <h3 className="text-base font-bold text-white mb-2">{s.name}</h3>
                <p className="text-sm text-gray-500 mb-5 leading-relaxed">{s.desc}</p>
                <Link href="/services" className="text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1">
                  Learn more <ArrowRight className="w-3 h-3" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          7. FOUNDER — Premium cinematic card
      ═══════════════════════════════════════════════════════ */}
      <section className="py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#030508]" />
        <div className="absolute inset-0" style={{background:'radial-gradient(ellipse 60% 50% at 60% 50%, rgba(59,130,246,0.08) 0%, transparent 70%)'}} />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{opacity:0, y:30}}
            whileInView={{opacity:1, y:0}}
            viewport={{once:true}}
            transition={{duration:0.8}}
            className="relative rounded-3xl p-[1px] overflow-hidden"
            style={{background:'linear-gradient(135deg, rgba(59,130,246,0.4) 0%, rgba(99,102,241,0.2) 40%, rgba(59,130,246,0.15) 80%, rgba(255,255,255,0.08) 100%)'}}
          >
            <div className="rounded-3xl bg-[#080c14]/98 overflow-hidden flex flex-col md:flex-row">
              {/* Image side */}
              <div className="w-full md:w-2/5 relative min-h-[320px] md:min-h-0">
                <div className="absolute inset-0" style={{background:'linear-gradient(135deg, rgba(59,130,246,0.2) 0%, rgba(99,102,241,0.1) 100%)'}} />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#080c14] hidden md:block" style={{left:'60%'}} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080c14] to-transparent md:hidden" style={{top:'60%'}} />
                <img
                  src="/founder.jpg"
                  alt="Raushan Pratap Yadav — Founder, Adsrahu"
                  className="w-full h-full object-cover object-center"
                  onError={(e) => {
                    const el = e.currentTarget as HTMLImageElement;
                    el.style.display = 'none';
                    const parent = el.parentElement;
                    if (parent) {
                      const fallback = document.createElement('div');
                      fallback.className = 'w-full h-full flex items-center justify-center';
                      fallback.innerHTML = '<div style="width:120px;height:120px;border-radius:50%;background:linear-gradient(135deg,#3b82f6,#6366f1);display:flex;align-items:center;justify-content:center;font-size:48px;font-weight:bold;color:white">R</div>';
                      parent.appendChild(fallback);
                    }
                  }}
                />
                {/* Blue glow behind image */}
                <div className="absolute bottom-0 left-0 right-0 h-32 orb bg-blue-600/20" style={{filter:'blur(40px)', borderRadius:0}} />
              </div>

              {/* Content side */}
              <div className="w-full md:w-3/5 p-10 md:p-14 flex flex-col justify-center relative">
                <div className="absolute top-0 right-0 w-80 h-80 orb bg-blue-500/10" style={{transform:'translate(30%, -30%)'}} />
                <div className="relative z-10">
                  <div className="text-amber-400 font-bold text-xs uppercase tracking-widest mb-3 flex items-center gap-2">
                    <Star className="w-3.5 h-3.5" />
                    Meet The Founder
                  </div>
                  <h3 className="text-4xl md:text-5xl font-bold text-white mb-2 leading-tight">Raushan Pratap Yadav</h3>
                  <p className="text-blue-400 font-semibold mb-6">Founder & CEO, Adsrahu</p>
                  <p className="text-gray-400 text-lg leading-relaxed mb-8 max-w-lg">
                    Building modern lead generation and automation systems for real estate businesses across India, UAE, USA and UK — turning ad spend into predictable revenue.
                  </p>
                  <div className="flex gap-3">
                    <a href="https://www.linkedin.com/in/raushanpratapyadav" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-blue-500/40 hover:bg-blue-500/10 transition-all duration-300">
                      <Linkedin className="w-4 h-4" />
                    </a>
                    <a href="https://x.com/Adsrahu" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-white/30 hover:bg-white/10 transition-all duration-300">
                      <SiX className="w-4 h-4" />
                    </a>
                    <a href="https://www.instagram.com/adsrahu" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-pink-500/40 hover:bg-pink-500/10 transition-all duration-300">
                      <MessageSquare className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          8. FAQ — Premium card accordion
      ═══════════════════════════════════════════════════════ */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-black" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{once:true}} className="text-center mb-14">
            <motion.p variants={fadeUp} className="text-blue-400 font-semibold text-sm uppercase tracking-widest mb-4">Got Questions?</motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold text-white">Frequently Asked</motion.h2>
          </motion.div>

          <Accordion type="single" collapsible className="space-y-3">
            {[
              { q:"How fast can I start getting leads?", a:"Most campaigns start generating leads within 3–5 days of launch. That includes landing page setup, ad creative, CRM integration and WhatsApp automation." },
              { q:"Do you provide CRM and WhatsApp automation?", a:"Yes — we build complete automation and lead management systems. You get instant follow-up, brochure delivery, and lead routing without lifting a finger." },
              { q:"Do you work only with real estate businesses?", a:"Real estate is our primary focus, but we also work with coaches, consultants, healthcare providers and local service businesses." },
              { q:"Do you work with international clients?", a:"Yes. Adsrahu works with clients from India, USA, Dubai and UK. We understand cross-border lead generation and international markets." },
              { q:"What exactly do you provide?", a:"Facebook & Google Ads management, lead generation funnels, landing pages, CRM setup, WhatsApp automation, lead tracking and complete growth systems." },
            ].map((item, i) => (
              <motion.div key={i} initial={{opacity:0,y:12}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.08}}>
                <AccordionItem
                  value={`item-${i}`}
                  className="border border-white/5 rounded-2xl px-6 bg-[#080c14] hover:bg-[#0c1018] transition-colors data-[state=open]:border-blue-500/20 data-[state=open]:bg-[#08101e]"
                >
                  <AccordionTrigger className="text-white hover:text-blue-300 hover:no-underline text-left py-5 font-semibold [&[data-state=open]]:text-blue-300">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-400 text-base pb-5 leading-relaxed">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          9. FINAL CTA — Cinematic closing
      ═══════════════════════════════════════════════════════ */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#030508]" />
        <div className="absolute inset-0" style={{background:'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(59,130,246,0.18) 0%, rgba(99,102,241,0.08) 40%, transparent 70%)'}} />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />

        {/* Ambient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 orb bg-blue-600/15 animate-float-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 orb bg-indigo-600/10 animate-float" style={{animationDelay:'2s'}} />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{once:true}}>
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 text-blue-400 text-sm font-semibold uppercase tracking-widest bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1.5 mb-8">
              <Zap className="w-3.5 h-3.5" />
              Ready to scale?
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.05]">
              Ready To Generate More<br />
              <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-blue-400 bg-clip-text text-transparent animate-gradient" style={{backgroundSize:'200% 200%'}}>
                Leads & Scale Faster?
              </span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
              Book a free strategy call and discover how Adsrahu can build a complete lead generation system for your business.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/book-a-call"
                data-testid="button-cta-book-call"
                className="w-full sm:w-auto inline-flex h-14 items-center justify-center rounded-xl px-10 text-base font-bold text-black bg-white hover:bg-blue-50 transition-all duration-300 gap-2 shadow-[0_0_40px_rgba(255,255,255,0.15)] hover:shadow-[0_0_60px_rgba(255,255,255,0.25)]"
              >
                <Phone className="h-4 w-4" />
                Book Free Strategy Call
              </Link>
              <a
                href="https://wa.me/917485022937"
                target="_blank"
                rel="noreferrer"
                data-testid="button-cta-whatsapp"
                className="w-full sm:w-auto inline-flex h-14 items-center justify-center rounded-xl border border-green-500/30 bg-green-500/10 px-10 text-base font-semibold text-white gap-2 transition-all duration-300 hover:bg-green-500/20 hover:border-green-400/50 hover:shadow-[0_0_30px_rgba(34,197,94,0.2)]"
              >
                <SiWhatsapp className="h-5 w-5 text-green-400" />
                Chat On WhatsApp
              </a>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-12 flex items-center justify-center gap-8 text-sm text-gray-600">
              <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500/60" />Free consultation</span>
              <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500/60" />No commitment</span>
              <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500/60" />Results in days</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
