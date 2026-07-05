import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, ArrowRight, BarChart3, TrendingUp, Users, Target, 
  CheckCircle2, Zap, LayoutDashboard, MessageSquare, Database, 
  Smartphone, Code2, PenTool, X, Menu, Send, ShieldAlert, Award,
  Sparkles, Bell, Globe, Activity
} from 'lucide-react';
import { SiWhatsapp } from 'react-icons/si';
import { Link } from 'wouter';

// WhatsApp SVG icon component
const WhatsAppIcon = () => <SiWhatsapp size={18} />;

// --- Theme Constants ---
const theme = {
  bg: 'bg-[#050816]',
  bgSecondary: 'bg-[#0B1120]',
  card: 'bg-[rgba(255,255,255,0.04)]',
  border: 'border-[rgba(255,255,255,0.08)]',
  telegramBlue: 'bg-[#229ED9]',
  telegramBlueText: 'text-[#229ED9]',
  accentBlueText: 'text-[#38BDF8]',
  textPrimary: 'text-[#FFFFFF]',
  textSecondary: 'text-[#94A3B8]',
  gradientText: 'bg-clip-text text-transparent bg-gradient-to-r from-[#229ED9] to-[#38BDF8]',
  gradientBg: 'bg-gradient-to-r from-[#229ED9] to-[#38BDF8]',
};

// --- Framer Motion Variants ---
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

// --- Components ---

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#050816]/80 backdrop-blur-md border-b border-[rgba(255,255,255,0.08)]' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/">
          <div className="text-xl font-bold tracking-tight text-white cursor-pointer flex items-center gap-3">
            <img src="/adsrahu-logo.jpg" alt="ADSRAHU" className="h-12 w-12 rounded-lg object-cover border border-[rgba(255,255,255,0.1)]" />
            <span className="font-['Poppins',sans-serif] tracking-tight">ADSRAHU</span>
          </div>
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          <a href="#services" className={`text-sm font-medium ${theme.textSecondary} hover:text-white transition-colors`}>Services</a>
          <a href="#how-it-works" className={`text-sm font-medium ${theme.textSecondary} hover:text-white transition-colors`}>How It Works</a>
          <a href="#showcase" className={`text-sm font-medium ${theme.textSecondary} hover:text-white transition-colors`}>Growth Showcase</a>
          <a href="#founder" className={`text-sm font-medium ${theme.textSecondary} hover:text-white transition-colors`}>Founder</a>
          <a href="https://t.me/+3iPrSB-aHp8yOTVl" target="_blank" rel="noreferrer" className="h-10 px-5 flex items-center justify-center rounded-full text-sm font-semibold text-white border transition-all duration-300 gap-2 hover:opacity-90" style={{ backgroundColor: '#1d4ed8', borderColor: '#3b82f6' }}>
            <Send size={14} /> Join Telegram
          </a>
        </div>

        <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`md:hidden ${theme.bgSecondary} border-b ${theme.border} px-6 py-4 flex flex-col gap-4 overflow-hidden`}
          >
             <a href="#services" onClick={() => setMobileMenuOpen(false)} className={`${theme.textSecondary} text-sm`}>Services</a>
             <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)} className={`${theme.textSecondary} text-sm`}>How It Works</a>
             <a href="#showcase" onClick={() => setMobileMenuOpen(false)} className={`${theme.textSecondary} text-sm`}>Growth Showcase</a>
             <a href="#founder" onClick={() => setMobileMenuOpen(false)} className={`${theme.textSecondary} text-sm`}>Founder</a>
             <a href="https://t.me/+3iPrSB-aHp8yOTVl" target="_blank" rel="noreferrer" className="mt-2 h-12 w-full flex items-center justify-center rounded-xl text-sm font-semibold text-white border gap-2 hover:opacity-90" style={{ backgroundColor: '#1d4ed8', borderColor: '#3b82f6' }}>
              <Send size={16} /> Join Telegram
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const TelegramMockup = () => {
  const messages = [
    { sender: "Raushan (ADSRAHU)", text: "Campaign launched! High-intent members flowing in.", time: "12:00 PM" },
    { sender: "Growth Bot", text: "📈 Channel Stats updated: +450 new active members today.", time: "12:05 PM" }
  ];

  return (
    <div className="relative w-full h-[520px] rounded-3xl border border-[rgba(255,255,255,0.08)] bg-[#0C1222] overflow-hidden shadow-[0_0_80px_rgba(34,158,217,0.15)] flex flex-col p-6">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,rgba(34,158,217,0.15),transparent_50%)] pointer-events-none" />
      
      {/* Header bar mock */}
      <div className="flex items-center gap-3 pb-4 border-b border-[rgba(255,255,255,0.05)] relative z-10">
        <div className="w-10 h-10 rounded-full bg-[#229ED9]/20 flex items-center justify-center text-[#229ED9]">
          <Send size={20} />
        </div>
        <div className="flex-1">
          <div className="text-sm font-bold text-white">ADSRAHU Community Growth</div>
          <div className="text-xs text-[#94A3B8]">14,248 members • <span className="text-[#22C55E]">482 online</span></div>
        </div>
        <div className="px-2.5 py-1 rounded bg-[#229ED9]/15 border border-[#229ED9]/30 text-[10px] font-bold text-[#38BDF8] tracking-widest uppercase">Premium</div>
      </div>

      {/* Stats Panels */}
      <div className="grid grid-cols-2 gap-4 mt-6 mb-6 relative z-10">
        <div className="p-4 rounded-2xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] backdrop-blur-md">
          <div className="flex items-center gap-2 text-xs text-[#94A3B8] mb-1"><Activity size={14} /> Conversion Rate</div>
          <div className="text-xl font-bold text-white">84.2%</div>
        </div>
        <div className="p-4 rounded-2xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] backdrop-blur-md">
          <div className="flex items-center gap-2 text-xs text-[#94A3B8] mb-1"><Globe size={14} /> Global Reach</div>
          <div className="text-xl font-bold text-white">Google & Meta</div>
        </div>
      </div>

      {/* Simulated Chat Messages */}
      <div className="flex-grow flex flex-col gap-3 justify-end relative z-10">
        {messages.map((m, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.3 }}
            key={i} 
            className="p-3.5 rounded-2xl bg-[#162033] border border-[rgba(255,255,255,0.05)] max-w-[85%] self-start"
          >
            <div className="text-xs font-bold text-[#38BDF8] mb-1">{m.sender}</div>
            <div className="text-sm text-white">{m.text}</div>
            <div className="text-[10px] text-[#94A3B8] text-right mt-1">{m.time}</div>
          </motion.div>
        ))}

        {/* Floating Notification */}
        <motion.div 
          animate={{ y: [-5, 5, -5] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 right-0 p-3 rounded-xl bg-[#229ED9]/10 border border-[#229ED9]/30 flex items-center gap-2 text-xs text-white backdrop-blur-md"
        >
          <Bell size={14} className="text-[#38BDF8]" /> Real-time tracking active
        </motion.div>
      </div>
    </div>
  );
};

const Hero = () => (
  <section className="relative pt-40 pb-20 overflow-hidden">
    {/* Ambient Glows */}
    <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#229ED9] rounded-full mix-blend-screen filter blur-[150px] opacity-15 pointer-events-none" />
    <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-[#38BDF8] rounded-full mix-blend-screen filter blur-[130px] opacity-10 pointer-events-none" />

    <div className="max-w-7xl mx-auto px-6 relative z-10">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <motion.div 
          initial="hidden" animate="visible" variants={staggerContainer}
          className="flex flex-col items-start text-left"
        >
          <motion.div variants={fadeUp} className={`px-4 py-1.5 rounded-full ${theme.card} ${theme.border} border text-xs font-medium text-[#38BDF8] mb-6 flex items-center gap-2 backdrop-blur-md`}>
            <Sparkles size={14} /> Telegram Growth Experts
          </motion.div>
          <motion.div variants={fadeUp}>
            <h1 className="text-5xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight mb-6 font-['Poppins',sans-serif]">
              Grow Your Telegram Community with <span className={theme.gradientText}>Precision Ads</span>
            </h1>
          </motion.div>
          <motion.div variants={fadeUp}>
            <p className={`text-lg lg:text-xl ${theme.textSecondary} mb-10 leading-relaxed max-w-xl`}>
              Scale your Telegram channel with real, targeted members using professionally managed Google Ads and Meta Ads campaigns. No fake users, no bots—just genuine growth.
            </p>
          </motion.div>
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <a href="https://t.me/+3iPrSB-aHp8yOTVl" target="_blank" rel="noreferrer" className="h-14 px-8 rounded-xl flex items-center justify-center gap-2 text-base font-semibold text-white border shadow-[0_0_30px_rgba(29,78,216,0.3)] hover:shadow-[0_0_40px_rgba(29,78,216,0.5)] hover:-translate-y-1 transition-all duration-300" style={{ backgroundColor: '#1d4ed8', borderColor: '#3b82f6' }}>
              <Send size={18} /> Join Our Telegram Channel
            </a>
            <a href="https://wa.me/917485022937" target="_blank" rel="noreferrer" className="h-14 px-8 rounded-xl flex items-center justify-center gap-2 text-base font-medium text-white border hover:-translate-y-1 shadow-[0_0_30px_rgba(4,120,87,0.2)] transition-all duration-300" style={{ backgroundColor: '#047857', borderColor: '#10b981' }}>
              <WhatsAppIcon /> Chat on WhatsApp
            </a>
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }}
          className="relative lg:h-[600px] flex items-center justify-center hidden md:flex"
        >
          <TelegramMockup />
        </motion.div>
      </div>
    </div>
  </section>
);

const TrustStrip = () => (
  <section className="py-12 border-y border-[rgba(255,255,255,0.05)] bg-[#080D1D]">
    <div className="max-w-7xl mx-auto px-6 text-center">
      <p className="text-xs font-semibold tracking-widest text-[#5A6B8A] uppercase mb-8">Integrated Ecosystem</p>
      <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
        {['Google Ads', 'Meta Ads', 'Telegram Native', 'Analytics Dashboard', 'AI Targeting', '24/7 Monitoring'].map((logo, i) => (
          <div key={i} className="text-lg md:text-xl font-bold text-white font-['Poppins',sans-serif] tracking-tight flex items-center gap-2">
            <span className="text-[#229ED9]">⚡</span> {logo}
          </div>
        ))}
      </div>
    </div>
  </section>
);

const ServicesSection = () => {
  const services = [
    { title: "Telegram Growth", desc: "Targeted member acquisition from Google & Meta platforms.", icon: <Send size={24} /> },
    { title: "Google Ads", desc: "Reach active searchers looking for communities like yours.", icon: <BarChart3 size={24} /> },
    { title: "Meta Ads", desc: "Leverage Facebook & Instagram social interest graphs.", icon: <Users size={24} /> },
    { title: "Audience Research", desc: "Build precision buyer/subscriber profiles before starting.", icon: <Target size={24} /> },
    { title: "Campaign Optimization", desc: "Continuous scale and daily performance adjustments.", icon: <Activity size={24} /> },
    { title: "Growth Consulting", desc: "Expert advisory on engagement, monetization, and strategy.", icon: <Sparkles size={24} /> },
  ];

  return (
    <section id="services" className={`py-32 relative ${theme.bgSecondary}`}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[1px] bg-gradient-to-r from-transparent via-[#229ED9]/50 to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-['Poppins',sans-serif]">Channel Growth Arsenal</h2>
          <p className={`${theme.textSecondary} text-lg max-w-2xl mx-auto`}>Deploy sophisticated performance marketing frameworks to grow your Telegram footprint.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              key={i}
              className={`p-8 rounded-2xl ${theme.card} ${theme.border} border hover:bg-[rgba(255,255,255,0.08)] hover:-translate-y-2 hover:border-[#229ED9]/30 transition-all duration-300 group cursor-default`}
            >
              <div className="w-12 h-12 rounded-xl bg-[#050816] border border-[rgba(255,255,255,0.1)] flex items-center justify-center text-[#229ED9] mb-6 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(34,158,217,0.2)] transition-all">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
              <p className={`${theme.textSecondary} text-sm leading-relaxed`}>{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ComparisonSection = () => {
  const points = [
    { label: "Fake/Bot Members", vs: "Real Targeted Audience" },
    { label: "Cheap, Empty Traffic", vs: "Google & Meta Advertising" },
    { label: "No Campaign Optimization", vs: "Data-Driven Scaling" },
    { label: "Zero Strategy/Blueprint", vs: "Structured Monetization Advice" },
    { label: "Poor Community Retention", vs: "Long-Term Engagement Focus" },
  ];

  return (
    <section className={`py-32 relative ${theme.bg}`}>
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-['Poppins',sans-serif]">The Quality Standard</h2>
          <p className={`${theme.textSecondary} text-lg`}>Why standard services fail and how we generate active communities.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 relative">
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[rgba(255,255,255,0.1)] to-transparent" />
          
          {/* Others */}
          <div className="flex flex-col gap-6">
            <h3 className="text-xl font-bold text-[#94A3B8] text-center mb-4">Typical Services</h3>
            {points.map((p, i) => (
              <motion.div 
                initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                key={i} 
                className="p-5 rounded-2xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] text-center text-[#94A3B8] line-through decoration-[#94A3B8]/50"
              >
                {p.label}
              </motion.div>
            ))}
          </div>

          {/* ADSRAHU */}
          <div className="flex flex-col gap-6">
            <h3 className="text-xl font-bold text-white text-center mb-4 flex items-center justify-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#229ED9] animate-pulse" /> ADSRAHU
            </h3>
            {points.map((p, i) => (
              <motion.div 
                initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                key={i} 
                className={`p-5 rounded-2xl bg-[rgba(34,158,217,0.05)] border border-[rgba(34,158,217,0.2)] text-center text-white font-semibold relative overflow-hidden shadow-[0_0_20px_rgba(34,158,217,0.05)]`}
              >
                <div className="absolute top-0 left-0 w-[2px] h-full bg-[#229ED9]" />
                {p.vs}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const ProcessSection = () => {
  const steps = [
    { num: "01", title: "Join Community", desc: "Join our Telegram community to see our systems firsthand." },
    { num: "02", title: "Book Strategy Session", desc: "We evaluate your channel monetization and demographics." },
    { num: "03", title: "Launch Paid Campaigns", desc: "We direct traffic from high-intent search and social platforms." },
    { num: "04", title: "Grow Your Channel", desc: "Enjoy consistent active members and increased conversion rates." },
  ];

  return (
    <section id="how-it-works" className={`py-32 relative ${theme.bgSecondary}`}>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-20 text-center font-['Poppins',sans-serif]">The Growth Path</h2>
        
        <div className="grid md:grid-cols-4 gap-8 relative">
          <div className="hidden md:block absolute top-[40px] left-10 right-10 h-0.5 bg-[rgba(255,255,255,0.05)] z-0" />
          <motion.div 
            initial={{ scaleX: 0, transformOrigin: "left" }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="hidden md:block absolute top-[40px] left-10 right-10 h-0.5 bg-gradient-to-r from-[#229ED9] to-[#38BDF8] z-0"
          />

          {steps.map((step, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.2 }}
              key={i} className="relative z-10 flex flex-col items-center text-center group"
            >
              <div className={`w-20 h-20 rounded-2xl ${theme.bg} border-2 border-[#229ED9] flex items-center justify-center text-2xl font-bold text-white mb-6 group-hover:shadow-[0_0_30px_rgba(34,158,217,0.4)] transition-all duration-300 relative overflow-hidden`}>
                <div className="absolute inset-0 bg-[#229ED9]/10" />
                {step.num}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
              <p className={`${theme.textSecondary} text-sm leading-relaxed max-w-[200px]`}>{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ShowcaseSection = () => {
  const stats = [
    { value: "+450", label: "Members Today", detail: "Real-time verification" },
    { value: "+1,200", label: "This Week", detail: "Sustained momentum" },
    { value: "4.8%", label: "Average CTR", detail: "High-relevance ad copy" },
    { value: "98/100", label: "Audience Quality", detail: "Minimal dropoffs" },
  ];

  return (
    <section id="showcase" className={`py-32 relative ${theme.bg}`}>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-['Poppins',sans-serif]">Live Metrics</h2>
          <p className={`${theme.textSecondary} text-lg max-w-xl mx-auto`}>Transparent reporting dashboard mockup showing actual channel growth results.</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              key={i}
              className={`p-6 rounded-2xl ${theme.card} ${theme.border} border text-center backdrop-blur-md`}
            >
              <div className="text-3xl md:text-5xl font-extrabold text-white mb-3 tracking-tight">{stat.value}</div>
              <div className="text-sm font-semibold text-[#38BDF8] mb-1">{stat.label}</div>
              <div className="text-xs text-[#94A3B8]">{stat.detail}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FounderSection = () => (
  <section id="founder" className={`py-32 relative ${theme.bg}`}>
    <div className="max-w-5xl mx-auto px-6 relative z-10">
      <motion.div 
        initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
        className={`p-10 md:p-16 rounded-3xl ${theme.card} border border-[rgba(255,255,255,0.1)] relative overflow-hidden flex flex-col md:flex-row gap-12 items-center backdrop-blur-md`}
      >
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#229ED9] rounded-full mix-blend-screen filter blur-[100px] opacity-20 pointer-events-none" />
        
        <div className="w-48 h-48 md:w-64 md:h-64 rounded-2xl border border-[rgba(255,255,255,0.1)] overflow-hidden shrink-0 bg-[#0C1222] relative group">
           <img src="/founder.jpg" alt="Founder" className="w-full h-full object-cover opacity-100 transition-all duration-700" />
           <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-transparent to-transparent pointer-events-none" />
        </div>

        <div className="flex-1 text-center md:text-left relative z-10">
          <div className="inline-block px-4 py-1.5 rounded-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] text-xs font-medium text-[#94A3B8] mb-4">
            Founder — ADSRAHU
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-['Poppins',sans-serif]">Raushan Pratap Yadav</h2>
          <p className={`${theme.textSecondary} text-lg mb-8 leading-relaxed`}>
            Helping Telegram creators and communities scale faster through intelligent paid advertising and growth systems. Eliminate bot growth and build a community that converts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <a href="https://t.me/+3iPrSB-aHp8yOTVl" target="_blank" rel="noreferrer" className="h-12 px-6 rounded-xl flex items-center justify-center gap-2 text-sm font-semibold text-white border hover:-translate-y-1 transition-all hover:opacity-90" style={{ backgroundColor: '#1d4ed8', borderColor: '#3b82f6' }}>
              <Send size={16} /> Join Telegram
            </a>
            <a href="https://wa.me/917485022937" target="_blank" rel="noreferrer" className="h-12 px-6 rounded-xl flex items-center justify-center gap-2 text-sm font-medium text-white border hover:-translate-y-1 transition-all hover:opacity-90" style={{ backgroundColor: '#047857', borderColor: '#10b981' }}>
              <WhatsAppIcon /> WhatsApp
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

const FinalCTA = () => (
  <section className="py-32 relative overflow-hidden border-t border-[rgba(255,255,255,0.05)] bg-[#040611]">
    {/* Center Glow */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full md:w-[800px] h-full md:h-[800px] bg-[#229ED9] rounded-full mix-blend-screen filter blur-[150px] opacity-10 pointer-events-none" />
    
    <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl md:text-7xl font-bold text-white mb-8 font-['Poppins',sans-serif] tracking-tight">
          Ready to Build the Telegram Community You've <span className={theme.gradientText}>Always Wanted?</span>
        </h2>
        <p className={`${theme.textSecondary} text-lg md:text-2xl mb-12 max-w-2xl mx-auto`}>
          Join our Telegram community and discover how paid advertising can consistently bring high-quality members to your channel.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <a href="https://t.me/+3iPrSB-aHp8yOTVl" target="_blank" rel="noreferrer" className="h-14 md:h-16 px-8 md:px-10 rounded-2xl flex items-center justify-center gap-2 text-base md:text-lg font-bold text-white border shadow-[0_0_40px_rgba(29,78,216,0.4)] hover:shadow-[0_0_60px_rgba(29,78,216,0.6)] hover:-translate-y-1 transition-all duration-300" style={{ backgroundColor: '#1d4ed8', borderColor: '#3b82f6' }}>
            <Send size={20} /> Join Telegram
          </a>
          <a href="https://wa.me/917485022937" target="_blank" rel="noreferrer" className="h-14 md:h-16 px-8 md:px-10 rounded-2xl flex items-center justify-center gap-2 text-base md:text-lg font-medium text-white border hover:-translate-y-1 shadow-[0_0_40px_rgba(4,120,87,0.2)] hover:shadow-[0_0_60px_rgba(4,120,87,0.4)] transition-all duration-300" style={{ backgroundColor: '#047857', borderColor: '#10b981' }}>
            <WhatsAppIcon /> Chat on WhatsApp
          </a>
        </div>
      </motion.div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="py-12 border-t border-[rgba(255,255,255,0.05)] bg-[#03050C]">
    <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="text-lg font-bold tracking-tight text-white flex items-center gap-3">
        <img src="/adsrahu-logo.jpg" alt="ADSRAHU" className="h-8 w-8 rounded-lg object-cover border border-[rgba(255,255,255,0.1)]" />
        <span className="font-['Poppins',sans-serif] tracking-tight">ADSRAHU</span>
      </div>
      <div className="flex flex-wrap justify-center gap-6 text-sm font-medium text-[#5A6B8A]">
        <a href="#services" className="hover:text-white transition-colors">Services</a>
        <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
        <a href="https://www.adsrahu.com/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</a>
      </div>
      <div className="text-xs text-[#5A6B8A] text-center">
        &copy; {new Date().getFullYear()} ADSRAHU. All rights reserved.
      </div>
    </div>
  </footer>
);

export default function TelegramGrowth() {
  useEffect(() => {
    // Meta Pixel - Telegram Growth
    const script = document.createElement('script');
    script.innerHTML = `
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '2043977229798979');
      fbq('track', 'PageView');
    `;
    document.head.appendChild(script);
    const noscript = document.createElement('noscript');
    noscript.innerHTML = '<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=2043977229798979&ev=PageView&noscript=1" />';
    document.body.appendChild(noscript);
    return () => {
      if (document.head.contains(script)) document.head.removeChild(script);
      if (document.body.contains(noscript)) document.body.removeChild(noscript);
    };
  }, []);

  return (
    <div className={`min-h-screen ${theme.bg} selection:bg-[#229ED9]/30 font-sans overflow-x-hidden`}>
      <Navbar />
      <Hero />
      <TrustStrip />
      <ServicesSection />
      <ComparisonSection />
      <ProcessSection />
      <ShowcaseSection />
      <FounderSection />
      <FinalCTA />
      <Footer />
    </div>
  );
}
