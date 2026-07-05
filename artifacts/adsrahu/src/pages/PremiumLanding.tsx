import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, ArrowRight, BarChart3, TrendingUp, Users, Target, 
  CheckCircle2, Zap, LayoutDashboard, MessageSquare, Database, 
  Smartphone, Code2, PenTool, X, Menu
} from 'lucide-react';
import { SiWhatsapp } from 'react-icons/si';
import { Link } from 'wouter';

const WhatsAppIcon = () => <SiWhatsapp size={18} />;

// --- Theme Constants ---
const theme = {
  bg: 'bg-[#060B16]',
  bgSecondary: 'bg-[#0D1323]',
  card: 'bg-[rgba(255,255,255,0.04)]',
  border: 'border-[rgba(255,255,255,0.08)]',
  textPrimary: 'text-[#FFFFFF]',
  textSecondary: 'text-[#A8B2C5]',
  accentPrimary: 'text-[#2D8CFF]',
  accentSecondary: 'text-[#00C2FF]',
  gradientText: 'bg-clip-text text-transparent bg-gradient-to-r from-[#2D8CFF] to-[#00C2FF]',
  gradientBg: 'bg-gradient-to-r from-[#2D8CFF] to-[#00C2FF]',
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
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#060B16]/80 backdrop-blur-md border-b border-[rgba(255,255,255,0.08)]' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/">
          <div className="text-xl font-bold tracking-tight text-white cursor-pointer flex items-center gap-3">
            <img src="/adsrahu-logo.jpg" alt="ADSRAHU" className="h-9 w-9 rounded-lg object-cover border border-[rgba(255,255,255,0.1)]" />
            <span className="font-['Poppins',sans-serif] tracking-tight">ADSRAHU</span>
          </div>
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          <a href="#services" className={`text-sm font-medium ${theme.textSecondary} hover:text-white transition-colors`}>Services</a>
          <a href="#process" className={`text-sm font-medium ${theme.textSecondary} hover:text-white transition-colors`}>Process</a>
          <a href="#founder" className={`text-sm font-medium ${theme.textSecondary} hover:text-white transition-colors`}>Founder</a>
          <a href="https://www.adsrahu.com/book-a-call" target="_blank" rel="noreferrer" className={`h-10 px-5 flex items-center justify-center rounded-full text-sm font-semibold text-white ${theme.gradientBg} hover:shadow-[0_0_20px_rgba(45,140,255,0.4)] transition-all duration-300`}>
            Book Strategy Call
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
             <a href="#process" onClick={() => setMobileMenuOpen(false)} className={`${theme.textSecondary} text-sm`}>Process</a>
             <a href="#founder" onClick={() => setMobileMenuOpen(false)} className={`${theme.textSecondary} text-sm`}>Founder</a>
             <a href="https://www.adsrahu.com/book-a-call" target="_blank" rel="noreferrer" className={`mt-2 h-12 w-full flex items-center justify-center rounded-xl text-sm font-semibold text-white ${theme.gradientBg}`}>
              Book Strategy Call
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const HeroDashboard = () => (
  <div className="relative w-full h-[500px] rounded-2xl border border-[rgba(255,255,255,0.1)] bg-[#0A101D] overflow-hidden shadow-[0_0_80px_rgba(45,140,255,0.15)] flex flex-col p-6">
    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,rgba(45,140,255,0.15),transparent_50%)]" />
    
    {/* Header */}
    <div className="flex items-center justify-between mb-8 pb-4 border-b border-[rgba(255,255,255,0.05)] relative z-10">
      <div className="flex gap-2">
        <div className="w-3 h-3 rounded-full bg-red-500/80" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
        <div className="w-3 h-3 rounded-full bg-green-500/80" />
      </div>
      <div className="text-xs font-medium text-[#A8B2C5]">Growth Dashboard v2.0</div>
    </div>

    {/* Metric Cards */}
    <div className="grid grid-cols-2 gap-4 mb-6 relative z-10">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        className="p-4 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)] flex flex-col gap-2 backdrop-blur-md"
      >
        <div className="flex items-center gap-2 text-xs text-[#A8B2C5]"><Users size={14} /> Qualified Leads</div>
        <div className="text-2xl font-bold text-white">1,248 <span className="text-xs text-[#4ADE80] font-normal">+24%</span></div>
      </motion.div>
      <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        className="p-4 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)] flex flex-col gap-2 relative overflow-hidden backdrop-blur-md"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#2D8CFF]/10 to-transparent pointer-events-none" />
        <div className="flex items-center gap-2 text-xs text-[#2D8CFF]"><TrendingUp size={14} /> Campaign ROI</div>
        <div className="text-2xl font-bold text-white">482% <span className="text-xs text-[#4ADE80] font-normal">Trending</span></div>
      </motion.div>
    </div>

    {/* Graph Mockup */}
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }}
      className="flex-grow rounded-xl bg-[rgba(0,0,0,0.2)] border border-[rgba(255,255,255,0.03)] relative overflow-hidden flex items-end p-4 gap-2 z-10"
    >
      {[40, 60, 45, 80, 65, 90, 75, 100].map((h, i) => (
        <motion.div 
          key={i}
          initial={{ height: 0 }}
          animate={{ height: `${h}%` }}
          transition={{ delay: 0.5 + (i * 0.1), duration: 0.8, ease: "easeOut" }}
          className="flex-1 rounded-t-sm bg-gradient-to-t from-[#2D8CFF]/20 to-[#00C2FF]"
        />
      ))}
      
      {/* Floating element */}
      <motion.div 
        animate={{ y: [-5, 5, -5] }} 
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-6 left-6 px-3 py-1.5 rounded-lg bg-[rgba(255,255,255,0.1)] backdrop-blur-md border border-[rgba(255,255,255,0.2)] flex items-center gap-2 text-xs text-white"
      >
        <div className="w-2 h-2 rounded-full bg-[#4ADE80] animate-pulse" />
        Live CRM Sync
      </motion.div>
    </motion.div>
  </div>
);

const Hero = () => (
  <section className="relative pt-40 pb-20 overflow-hidden">
    {/* Background Glows */}
    <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#2D8CFF] rounded-full mix-blend-screen filter blur-[120px] opacity-20 animate-pulse pointer-events-none" />
    <div className="absolute top-1/3 right-0 w-96 h-96 bg-[#00C2FF] rounded-full mix-blend-screen filter blur-[120px] opacity-10 animate-pulse pointer-events-none" style={{ animationDelay: '2s' }} />

    <div className="max-w-7xl mx-auto px-6 relative z-10">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <motion.div 
          initial="hidden" animate="visible" variants={staggerContainer}
          className="flex flex-col items-start text-left"
        >
          <motion.div variants={fadeUp} className={`px-4 py-1.5 rounded-full ${theme.card} ${theme.border} border text-xs font-medium text-[#00C2FF] mb-6 flex items-center gap-2 backdrop-blur-md`}>
            <Zap size={14} /> Real Estate Growth Partner
          </motion.div>
          <motion.div variants={fadeUp}>
            <h1 className="text-5xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight mb-6 font-['Poppins',sans-serif]">
              Grow Your Real Estate Business with <span className={theme.gradientText}>Smarter Digital Systems</span>
            </h1>
          </motion.div>
          <motion.div variants={fadeUp}>
            <p className={`text-lg lg:text-xl ${theme.textSecondary} mb-10 leading-relaxed max-w-xl`}>
              We help real estate developers, builders, brokers and agencies generate more qualified leads using Google Ads, Meta Ads, AI automation, CRM systems and high-converting websites.
            </p>
          </motion.div>
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <a href="https://www.adsrahu.com/book-a-call" target="_blank" rel="noreferrer" className={`h-14 px-8 rounded-xl flex items-center justify-center gap-2 text-base font-semibold text-white ${theme.gradientBg} shadow-[0_0_30px_rgba(45,140,255,0.3)] hover:shadow-[0_0_40px_rgba(45,140,255,0.5)] hover:-translate-y-1 transition-all duration-300`}>
              Book Free Strategy Call <ArrowRight size={18} />
            </a>
            <a href="https://wa.me/917485022937" target="_blank" rel="noreferrer" className={`h-14 px-8 rounded-xl flex items-center justify-center gap-2 text-base font-medium text-white ${theme.card} ${theme.border} border hover:bg-[rgba(255,255,255,0.08)] transition-all duration-300`}>
              <WhatsAppIcon /> Chat on WhatsApp
            </a>
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="relative lg:h-[600px] flex items-center justify-center perspective-[1000px] hidden md:flex"
        >
          {/* Subtle 3D rotation effect applied to the dashboard container */}
          <div style={{ transform: "rotateY(-5deg) rotateX(2deg)" }} className="w-full">
            <HeroDashboard />
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

const TrustSection = () => (
  <section className="py-12 border-y border-[rgba(255,255,255,0.05)] bg-[#0A0F1C]">
    <div className="max-w-7xl mx-auto px-6 text-center">
      <p className="text-xs font-semibold tracking-widest text-[#5A6B8A] uppercase mb-8">Integrated With Top Platforms</p>
      <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
        {['Google Ads', 'Meta', 'Google Analytics', 'WhatsApp Business', 'Salesforce CRM', 'OpenAI'].map((logo, i) => (
          <div key={i} className="text-xl md:text-2xl font-bold text-white font-['Poppins',sans-serif] tracking-tight flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-white/20 flex items-center justify-center text-xs">▲</div>
            {logo}
          </div>
        ))}
      </div>
    </div>
  </section>
);

const ServicesSection = () => {
  const services = [
    { title: "Real Estate Lead Generation", icon: <Target size={24} /> },
    { title: "Google Ads Management", icon: <BarChart3 size={24} /> },
    { title: "Meta Ads Management", icon: <Users size={24} /> },
    { title: "CRM & Automation", icon: <Database size={24} /> },
    { title: "Real Estate Websites", icon: <LayoutDashboard size={24} /> },
    { title: "Landing Pages", icon: <Smartphone size={24} /> },
    { title: "AI Automation", icon: <Zap size={24} /> },
    { title: "Custom Software", icon: <Code2 size={24} /> },
    { title: "SaaS Development", icon: <Code2 size={24} /> },
    { title: "Brand Identity", icon: <PenTool size={24} /> },
  ];

  return (
    <section id="services" className={`py-32 relative ${theme.bgSecondary}`}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[1px] bg-gradient-to-r from-transparent via-[#2D8CFF]/50 to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-['Poppins',sans-serif]">Premium Digital Arsenal</h2>
          <p className={`${theme.textSecondary} text-lg max-w-2xl mx-auto`}>We don't just run ads. We build comprehensive, scalable digital ecosystems that turn attention into closed deals.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              key={i}
              className={`p-6 rounded-2xl ${theme.card} ${theme.border} border hover:bg-[rgba(255,255,255,0.08)] hover:-translate-y-2 hover:border-[#2D8CFF]/30 transition-all duration-300 group cursor-default backdrop-blur-sm`}
            >
              <div className="w-12 h-12 rounded-xl bg-[#060B16] border border-[rgba(255,255,255,0.1)] flex items-center justify-center text-[#2D8CFF] mb-6 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(45,140,255,0.2)] transition-all">
                {service.icon}
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{service.title}</h3>
              <div className="w-8 h-1 bg-[#2D8CFF] rounded-full opacity-0 group-hover:opacity-100 transition-opacity mt-4" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ComparisonSection = () => {
  const points = [
    { label: "Generic Strategy", vs: "Real Estate Specialists" },
    { label: "Slow Communication", vs: "Fast Founder Support" },
    { label: "Template Funnels", vs: "Custom Digital Systems" },
    { label: "Manual Follow-ups", vs: "AI & WhatsApp Workflows" },
    { label: "Basic Reporting", vs: "Transparent Performance Dashboard" },
  ];

  return (
    <section className={`py-32 relative ${theme.bg}`}>
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-['Poppins',sans-serif]">Why Top Developers Choose Us</h2>
          <p className={`${theme.textSecondary} text-lg`}>The difference between an agency and a growth partner.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 relative">
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[rgba(255,255,255,0.1)] to-transparent" />
          
          {/* Traditional Agencies */}
          <div className="flex flex-col gap-6">
            <h3 className="text-xl font-bold text-[#A8B2C5] text-center mb-4">Traditional Agencies</h3>
            {points.map((p, i) => (
              <motion.div 
                initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                key={i} 
                className="p-5 rounded-2xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] text-center text-[#A8B2C5] line-through decoration-[#A8B2C5]/50"
              >
                {p.label}
              </motion.div>
            ))}
          </div>

          {/* ADSRAHU */}
          <div className="flex flex-col gap-6">
            <h3 className="text-xl font-bold text-white text-center mb-4 flex items-center justify-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#2D8CFF] animate-pulse" /> ADSRAHU
            </h3>
            {points.map((p, i) => (
              <motion.div 
                initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                key={i} 
                className={`p-5 rounded-2xl bg-[rgba(45,140,255,0.05)] border border-[rgba(45,140,255,0.2)] text-center text-white font-semibold relative overflow-hidden shadow-[0_0_20px_rgba(45,140,255,0.05)]`}
              >
                <div className="absolute top-0 left-0 w-[2px] h-full bg-[#2D8CFF]" />
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
    { num: "01", title: "Book Strategy Call", desc: "We audit your current systems and map out a growth plan." },
    { num: "02", title: "Business Analysis", desc: "Deep dive into your market, competitors, and unit economics." },
    { num: "03", title: "Launch Campaigns", desc: "Deploy high-converting landing pages, ads, and CRM automations." },
    { num: "04", title: "Scale With Data", desc: "Continuous optimization based on actual cost-per-booking." },
  ];

  return (
    <section id="process" className={`py-32 relative ${theme.bgSecondary}`}>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-20 text-center font-['Poppins',sans-serif]">The Execution Framework</h2>
        
        <div className="grid md:grid-cols-4 gap-8 relative">
          <div className="hidden md:block absolute top-[40px] left-10 right-10 h-0.5 bg-[rgba(255,255,255,0.05)] z-0" />
          {/* Animated Line */}
          <motion.div 
            initial={{ scaleX: 0, transformOrigin: "left" }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="hidden md:block absolute top-[40px] left-10 right-10 h-0.5 bg-gradient-to-r from-[#2D8CFF] to-[#00C2FF] z-0"
          />

          {steps.map((step, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.2 }}
              key={i} className="relative z-10 flex flex-col items-center text-center group"
            >
              <div className={`w-20 h-20 rounded-2xl ${theme.bg} border-2 border-[#2D8CFF] flex items-center justify-center text-2xl font-bold text-white mb-6 group-hover:shadow-[0_0_30px_rgba(45,140,255,0.4)] transition-all duration-300 relative overflow-hidden`}>
                <div className="absolute inset-0 bg-[#2D8CFF]/10" />
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

const FounderSection = () => (
  <section id="founder" className={`py-32 relative ${theme.bg}`}>
    <div className="max-w-5xl mx-auto px-6 relative z-10">
      <motion.div 
        initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
        className={`p-10 md:p-16 rounded-3xl ${theme.card} border border-[rgba(255,255,255,0.1)] relative overflow-hidden flex flex-col md:flex-row gap-12 items-center backdrop-blur-md`}
      >
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#2D8CFF] rounded-full mix-blend-screen filter blur-[100px] opacity-20 pointer-events-none" />
        
        <div className="w-48 h-48 md:w-64 md:h-64 rounded-2xl border border-[rgba(255,255,255,0.1)] overflow-hidden shrink-0 bg-[#0A101D] relative group">
           <img src="/founder.jpg" alt="Founder" className="w-full h-full object-cover opacity-100 transition-all duration-700" />
           <div className="absolute inset-0 bg-gradient-to-t from-[#060B16] via-transparent to-transparent pointer-events-none" />
        </div>

        <div className="flex-1 text-center md:text-left relative z-10">
          <div className="inline-block px-4 py-1.5 rounded-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] text-xs font-medium text-[#A8B2C5] mb-4">
            Founder & Growth Strategist
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-['Poppins',sans-serif]">Raushan Pratap Yadav</h2>
          <p className={`${theme.textSecondary} text-lg mb-8 leading-relaxed`}>
            Passionate about helping real estate businesses grow faster through intelligent marketing systems, automation, and scalable digital infrastructure. Stop chasing cold leads and start building predictable revenue pipelines.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <a href="https://www.adsrahu.com/book-a-call" target="_blank" rel="noreferrer" className={`h-12 px-6 rounded-xl flex items-center justify-center text-sm font-semibold text-white ${theme.gradientBg} shadow-[0_0_20px_rgba(45,140,255,0.3)] hover:-translate-y-1 transition-all`}>
              Book Direct Call
            </a>
            <a href="https://wa.me/917485022937" target="_blank" rel="noreferrer" className={`h-12 px-6 rounded-xl flex items-center justify-center gap-2 text-sm font-medium text-white bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.1)] transition-all`}>
              <WhatsAppIcon /> Connect on WhatsApp
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

const FinalCTA = () => (
  <section className="py-32 relative overflow-hidden border-t border-[rgba(255,255,255,0.05)] bg-[#040811]">
    {/* Center Glow */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full md:w-[800px] h-full md:h-[800px] bg-[#2D8CFF] rounded-full mix-blend-screen filter blur-[150px] opacity-10 pointer-events-none" />
    
    <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl md:text-7xl font-bold text-white mb-8 font-['Poppins',sans-serif] tracking-tight">
          Ready to Generate More <span className={theme.gradientText}>Qualified Leads?</span>
        </h2>
        <p className={`${theme.textSecondary} text-lg md:text-2xl mb-12 max-w-2xl mx-auto`}>
          Let's build a predictable lead generation system that grows your real estate business every single month.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <a href="https://www.adsrahu.com/book-a-call" target="_blank" rel="noreferrer" className={`h-14 md:h-16 px-8 md:px-10 rounded-2xl flex items-center justify-center text-base md:text-lg font-bold text-white ${theme.gradientBg} shadow-[0_0_40px_rgba(45,140,255,0.4)] hover:shadow-[0_0_60px_rgba(45,140,255,0.6)] hover:-translate-y-1 transition-all duration-300`}>
            Book Free Strategy Call
          </a>
          <a href="https://wa.me/917485022937" target="_blank" rel="noreferrer" className={`h-14 md:h-16 px-8 md:px-10 rounded-2xl flex items-center justify-center gap-2 text-base md:text-lg font-medium text-white bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.08)] transition-all duration-300`}>
            <WhatsAppIcon /> Chat on WhatsApp
          </a>
        </div>
      </motion.div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="py-12 border-t border-[rgba(255,255,255,0.05)] bg-[#03060D]">
    <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="text-lg font-bold tracking-tight text-white flex items-center gap-3">
        <img src="/adsrahu-logo.jpg" alt="ADSRAHU" className="h-8 w-8 rounded-lg object-cover border border-[rgba(255,255,255,0.1)]" />
        <span className="font-['Poppins',sans-serif] tracking-tight">ADSRAHU</span>
      </div>
      <div className="flex flex-wrap justify-center gap-6 text-sm font-medium text-[#5A6B8A]">
        <a href="#services" className="hover:text-white transition-colors">Services</a>
        <a href="#process" className="hover:text-white transition-colors">Process</a>
        <a href="https://www.adsrahu.com/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</a>
      </div>
      <div className="text-xs text-[#5A6B8A] text-center">
        &copy; {new Date().getFullYear()} ADSRAHU. All rights reserved.
      </div>
    </div>
  </footer>
);

export default function PremiumLanding() {
  useEffect(() => {
    // Meta Pixel - Real Estate Landing
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
      fbq('init', '2396302237502051');
      fbq('track', 'PageView');
    `;
    document.head.appendChild(script);
    const noscript = document.createElement('noscript');
    noscript.innerHTML = '<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=2396302237502051&ev=PageView&noscript=1" />';
    document.body.appendChild(noscript);
    return () => {
      if (document.head.contains(script)) document.head.removeChild(script);
      if (document.body.contains(noscript)) document.body.removeChild(noscript);
    };
  }, []);

  return (
    <div className={`min-h-screen ${theme.bg} selection:bg-[#2D8CFF]/30 font-sans overflow-x-hidden`}>
      <Navbar />
      <Hero />
      <TrustSection />
      <ServicesSection />
      <ComparisonSection />
      <ProcessSection />
      <FounderSection />
      <FinalCTA />
      <Footer />
    </div>
  );
}
