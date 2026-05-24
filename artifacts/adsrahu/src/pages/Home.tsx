import React from "react";
import { Link } from "wouter";
import { Phone, ArrowRight, CheckCircle2, TrendingUp, Users, Target, Activity, MessageSquare, X } from "lucide-react";
import { SiWhatsapp, SiX } from "react-icons/si";
import { Linkedin } from "lucide-react";
import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen pt-20">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden min-h-[90vh] flex items-center border-b border-white/5">
        {/* Animated background */}
        <div className="absolute inset-0 bg-black" />
        <div className="absolute inset-0" style={{background: 'radial-gradient(ellipse at 30% 50%, rgba(59,130,246,0.12) 0%, transparent 70%), radial-gradient(ellipse at 70% 20%, rgba(99,102,241,0.08) 0%, transparent 60%)'}} />
        {/* Floating orbs */}
        <div className="absolute top-20 left-[10%] w-72 h-72 orb bg-blue-600/20 animate-float-slow" />
        <div className="absolute bottom-20 right-[10%] w-96 h-96 orb bg-indigo-600/10 animate-float" style={{animationDelay: '2s'}} />
        {/* Grid */}
        <div className="absolute inset-0 bg-grid opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left pt-12 lg:pt-0"
          >
            <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm font-medium text-gray-300 mb-6 backdrop-blur-sm">
              <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
              Premium Real Estate Growth Partner
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
              Performance Marketing &{" "}
              <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-300 bg-clip-text text-transparent animate-gradient text-glow-blue">
                Lead Generation
              </span>{" "}
              Systems For Real Estate
            </h1>
            <p className="text-lg sm:text-xl text-gray-400 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              We help builders, realtors and modern businesses generate qualified leads using Facebook Ads, Google Ads, CRM automation and WhatsApp funnels.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <Link href="/book-a-call" className="w-full sm:w-auto inline-flex h-13 items-center justify-center rounded-xl btn-premium px-8 text-base font-semibold text-white">
                <Phone className="mr-2 h-4 w-4" /> Book Free Strategy Call
              </Link>
              <a href="https://wa.me/917485022937" target="_blank" rel="noreferrer" className="w-full sm:w-auto inline-flex h-13 items-center justify-center rounded-xl border border-white/20 bg-white/5 backdrop-blur-md px-8 text-base font-medium text-white shadow-sm transition-all hover:bg-white/10 hover:border-green-500/50 group">
                <SiWhatsapp className="mr-2 h-5 w-5 text-green-500 group-hover:drop-shadow-[0_0_8px_rgba(34,197,94,0.8)] transition-all" /> Chat On WhatsApp
              </a>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:block relative"
          >
            {/* Fake Dashboard UI Wrap */}
            <div className="animate-float">
              <div className="relative rounded-xl border border-white/10 bg-[#0d0d14]/80 backdrop-blur-xl shadow-2xl overflow-hidden aspect-[4/3] p-6 glow-blue-strong transform rotate-y-[-10deg] rotate-x-[5deg] perspective-1000 ring-1 ring-blue-500/20 shadow-[0_0_80px_rgba(59,130,246,0.15)]">
                <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="text-sm text-gray-400 font-mono">Adsrahu Lead System</div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="rounded-lg bg-white/5 p-4 border border-white/5">
                    <div className="text-sm text-gray-400 mb-1">Total Leads</div>
                    <div className="text-3xl font-bold text-white">1,248</div>
                    <div className="text-xs text-green-400 mt-2 flex items-center"><TrendingUp className="w-3 h-3 mr-1" /> +24% this month</div>
                  </div>
                  <div className="rounded-lg bg-white/5 p-4 border border-white/5">
                    <div className="text-sm text-gray-400 mb-1">Cost Per Lead</div>
                    <div className="text-3xl font-bold text-white">₹142</div>
                    <div className="text-xs text-green-400 mt-2 flex items-center"><TrendingUp className="w-3 h-3 mr-1" /> -12% this month</div>
                  </div>
                </div>
                <div className="rounded-lg bg-white/5 p-4 border border-white/5 h-32 flex items-end gap-2 px-6">
                  {[40, 65, 45, 80, 55, 90, 75].map((h, i) => (
                    <div key={i} className="w-full bg-blue-900/20 rounded-t-sm relative group overflow-hidden">
                      <div className="absolute bottom-0 w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-sm transition-all duration-1000 shadow-[0_0_10px_rgba(59,130,246,0.5)]" style={{ height: `${h}%` }}></div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -right-6 top-20 rounded-lg border border-white/10 bg-black/60 backdrop-blur-xl p-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                    <SiWhatsapp className="w-5 h-5 text-green-500" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">New Lead Alert</div>
                    <div className="text-xs text-gray-400">Site visit confirmed</div>
                  </div>
                </div>
              </div>

              {/* Second Floating Element */}
              <div className="absolute -left-10 bottom-10 rounded-lg border border-white/10 bg-black/60 backdrop-blur-xl p-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse-glow"></div>
                    <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-50"></div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">WhatsApp Automation</div>
                    <div className="text-xs text-gray-400">Brochure delivered</div>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. TRUST SECTION */}
      <section className="py-20 bg-black border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Trusted Growth Partner For Modern Businesses</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Performance-driven lead generation systems powered by ads, automation, CRM and smart funnels.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              { label: "Leads Generated", value: "500+" },
              { label: "Countries Served", value: "3" },
              { label: "Client Retention", value: "98%" },
              { label: "Average ROI", value: "5x" },
              { label: "Wasted Budget", value: "₹0" }
            ].map((stat, i) => (
              <div key={i} className="bg-gradient-to-b from-white/10 to-white/0 p-[1px] rounded-2xl transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] group">
                <div className="rounded-2xl bg-[#0d0d14] h-full p-6 text-center">
                  <div className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent">{stat.value}</div>
                  <div className="text-sm text-gray-400 font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. PROBLEM vs SOLUTION */}
      <section className="py-24 bg-[#050505] relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Stop Wasting Money On Bad Leads</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">The old way of running ads doesn't work anymore. You need a complete system.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            <div className="relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-red-500/20 blur-[50px] animate-pulse" />
              <div className="rounded-2xl border border-red-500/20 bg-[#0a0a0f] p-8 backdrop-blur-sm shadow-[0_0_60px_rgba(239,68,68,0.1)] relative z-10">
                <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                  <X className="w-5 h-5 text-red-500 mr-2" /> The Problem
                </h3>
                <ul className="space-y-4">
                  {["Low quality leads", "Wasted ad budget", "Poor follow-up systems", "No automation", "Low conversion rates", "Inconsistent inquiries"].map((item, i) => (
                    <li key={i} className="flex items-start text-gray-300">
                      <div className="mt-1 mr-3 w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-blue-500/20 blur-[50px] animate-pulse" />
              <div className="rounded-2xl border border-blue-500/30 bg-[#0a0a0f] p-8 backdrop-blur-sm shadow-[0_0_60px_rgba(59,130,246,0.15)] animate-pulse-glow relative z-10 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[50px]" />
                <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                  <CheckCircle2 className="w-5 h-5 text-primary mr-2" /> The Adsrahu Solution
                </h3>
                <ul className="space-y-4 relative z-10">
                  {["High-converting lead funnels", "CRM & WhatsApp automation", "Smart targeting systems", "Faster follow-ups", "Better lead tracking", "Scalable growth systems"].map((item, i) => (
                    <li key={i} className="flex items-start text-white font-medium">
                      <CheckCircle2 className="mt-0.5 mr-3 w-4 h-4 text-primary shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. REAL ESTATE SECTION */}
      <section className="py-32 relative border-y border-white/10 overflow-hidden">
        {/* Full-width premium background layered radial gradients */}
        <div className="absolute inset-0 bg-black" />
        <div className="absolute inset-0" style={{background: 'radial-gradient(ellipse at 50% -20%, rgba(59,130,246,0.15) 0%, transparent 60%), radial-gradient(ellipse at 80% 50%, rgba(99,102,241,0.05) 0%, transparent 50%)'}} />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block text-gold mb-4 uppercase tracking-wider font-semibold text-sm">Core Expertise</div>
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">Real Estate Lead Generation Experts</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Adsrahu helps real estate businesses generate qualified buyer and site visit leads using high-converting ads, landing pages, CRM systems and automation workflows.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
              { title: "Facebook & IG Ads", icon: Users, desc: "Laser-targeted campaigns to reach property buyers." },
              { title: "Google Campaigns", icon: Target, desc: "Capture high-intent search traffic actively looking to buy." },
              { title: "Landing Pages", icon: Activity, desc: "High-converting single property or project pages." },
              { title: "CRM Setup", icon: Users, desc: "End-to-end lead management and pipeline tracking." },
              { title: "WhatsApp Funnels", icon: MessageSquare, desc: "Automated engagement and brochure delivery." },
              { title: "Automation Systems", icon: Activity, desc: "Instant lead routing to your sales team." },
              { title: "Lead Tracking", icon: TrendingUp, desc: "Attribution models to know exactly what's working." },
              { title: "Scaling & Optimization", icon: Target, desc: "Data-driven decisions to lower CPL and increase volume." }
            ].map((service, i) => (
              <div key={i} className={`rounded-xl border border-white/10 bg-[#0a0a0f] p-8 border-t-2 border-t-blue-500/50 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(59,130,246,0.2)] transition-all duration-300`}>
                <service.icon className={`w-8 h-8 mb-4 text-primary`} />
                <h3 className="text-lg font-bold text-white mb-2">{service.title}</h3>
                <p className="text-sm text-gray-400">{service.desc}</p>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#0d0d14]/50 backdrop-blur-sm p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between divide-y md:divide-y-0 md:divide-x divide-white/10 text-center shadow-[0_0_30px_rgba(59,130,246,0.1)]">
            <div className="w-full py-4 md:py-0 px-4">
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">1,248</div>
              <div className="text-sm text-gray-400 mt-1 uppercase tracking-wider font-semibold">Leads Generated This Month</div>
            </div>
            <div className="w-full py-4 md:py-0 px-4">
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">₹142</div>
              <div className="text-sm text-gray-400 mt-1 uppercase tracking-wider font-semibold">Average Cost Per Lead</div>
            </div>
            <div className="w-full py-4 md:py-0 px-4">
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">94%</div>
              <div className="text-sm text-gray-400 mt-1 uppercase tracking-wider font-semibold">Site Visit Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FUNNEL FLOW SECTION */}
      <section className="py-24 bg-[#050505] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">How Our Lead Generation System Works</h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-16">
            We build complete lead generation systems that help businesses capture, track and convert leads more efficiently.
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-2">
            {["Ads", "Landing Page", "WhatsApp", "CRM", "Sales"].map((step, i, arr) => (
              <React.Fragment key={i}>
                <div className="relative group">
                  <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="w-40 h-28 rounded-xl border border-white/20 bg-[#0d0d14] flex flex-col items-center justify-center text-white font-semibold relative z-10 hover:border-primary transition-colors shadow-[0_0_15px_rgba(59,130,246,0.15)] group-hover:shadow-[0_0_25px_rgba(59,130,246,0.3)]">
                    <span className="text-[10px] text-gray-500 mb-1">0{i+1}</span>
                    {step}
                  </div>
                </div>
                {i < arr.length - 1 && (
                  <div className="hidden md:block w-8 h-0.5 bg-gradient-to-r from-primary/50 to-primary/20 relative animate-pulse">
                    <ArrowRight className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-4 h-4 text-primary" />
                  </div>
                )}
                {i < arr.length - 1 && (
                  <div className="md:hidden h-8 w-0.5 bg-gradient-to-b from-primary/50 to-primary/20 relative my-2 animate-pulse">
                    <ArrowRight className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-4 h-4 text-primary rotate-90" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* 6. OTHER SERVICES */}
      <section className="py-24 bg-black border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold text-white">Other Growth Services</h2>
            <Link href="/services" className="hidden sm:flex text-primary hover:text-white transition-colors items-center text-sm font-medium">
              View All <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {["Social Media Management", "Business Development", "App Development", "Branding & Growth Strategy"].map((service, i) => (
              <div key={i} className="rounded-xl border border-white/10 bg-[#0d0d14] p-6 hover:bg-white/5 transition-colors">
                <h3 className="text-xl font-bold text-white mb-2">{service}</h3>
                <p className="text-gray-400 text-sm mb-4">Comprehensive solutions tailored to scale your brand presence and operational efficiency.</p>
                <Link href="/services" className="text-primary text-sm font-medium hover:text-white transition-colors">Learn more →</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. FOUNDER SECTION */}
      <section className="py-24 bg-[#050505]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-white/10 bg-[#0d0d14] overflow-hidden flex flex-col md:flex-row shadow-2xl relative p-[1px]">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 animate-gradient rounded-3xl" />
            <div className="flex flex-col md:flex-row bg-[#0d0d14] rounded-3xl relative z-10 w-full">
              <div className="w-full md:w-2/5 relative overflow-hidden rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none">
                <div className="absolute inset-0 bg-blue-500/20 mix-blend-overlay z-10" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d14] via-transparent to-transparent z-10" />
                <img 
                  src="/founder.png" 
                  alt="Raushan Pratap Yadav" 
                  className="w-full h-full object-cover object-center min-h-[300px] md:min-h-full"
                />
              </div>
              <div className="w-full md:w-3/5 p-8 md:p-12 flex flex-col justify-center relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[80px] rounded-full" />
                <h2 className="text-gold font-semibold text-sm tracking-wider uppercase mb-2">Meet The Founder</h2>
                <h3 className="text-4xl font-bold text-white mb-4 relative z-10">Raushan Pratap Yadav</h3>
                <p className="text-gray-400 text-lg leading-relaxed mb-6 relative z-10">
                  Founder of Adsrahu focused on building modern lead generation and automation systems for real estate and growth-focused businesses.
                </p>
                <div className="flex gap-4 relative z-10">
                  <a href="https://www.linkedin.com/in/raushanpratapyadav" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors">
                    <Linkedin className="w-6 h-6" />
                  </a>
                  <a href="https://x.com/Adsrahu" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors">
                    <SiX className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FAQ SECTION */}
      <section className="py-24 bg-black border-y border-white/5">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Frequently Asked Questions</h2>
          </div>
          <Accordion type="single" collapsible className="w-full space-y-3">
            <AccordionItem value="item-1" className="border border-white/5 rounded-xl px-6 hover:bg-white/5 transition-colors bg-[#0a0a0f]">
              <AccordionTrigger className="text-white hover:text-primary hover:no-underline text-left py-4">How fast can I start getting leads?</AccordionTrigger>
              <AccordionContent className="text-gray-400 text-base pb-4">
                Most campaigns start generating leads within a few days after launch. Our onboarding process typically takes 3-5 days to set up landing pages, ad creatives, and CRM integration.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="border border-white/5 rounded-xl px-6 hover:bg-white/5 transition-colors bg-[#0a0a0f]">
              <AccordionTrigger className="text-white hover:text-primary hover:no-underline text-left py-4">Do you provide CRM and WhatsApp automation?</AccordionTrigger>
              <AccordionContent className="text-gray-400 text-base pb-4">
                Yes, we provide complete automation and lead management systems. We don't just generate leads; we build the infrastructure to nurture and convert them automatically.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="border border-white/5 rounded-xl px-6 hover:bg-white/5 transition-colors bg-[#0a0a0f]">
              <AccordionTrigger className="text-white hover:text-primary hover:no-underline text-left py-4">Do you work only with real estate businesses?</AccordionTrigger>
              <AccordionContent className="text-gray-400 text-base pb-4">
                Real estate is our main expertise, but we also work with other lead generation businesses including coaches, consultants, healthcare providers, and local service businesses.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4" className="border border-white/5 rounded-xl px-6 hover:bg-white/5 transition-colors bg-[#0a0a0f]">
              <AccordionTrigger className="text-white hover:text-primary hover:no-underline text-left py-4">Do you work with international clients?</AccordionTrigger>
              <AccordionContent className="text-gray-400 text-base pb-4">
                Yes, Adsrahu works with clients from India, USA, Dubai and UK. We understand cross-border lead generation and international real estate markets.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5" className="border border-white/5 rounded-xl px-6 hover:bg-white/5 transition-colors bg-[#0a0a0f]">
              <AccordionTrigger className="text-white hover:text-primary hover:no-underline text-left py-4">What services do you provide?</AccordionTrigger>
              <AccordionContent className="text-gray-400 text-base pb-4">
                We provide ads management (Facebook, Google), lead generation, CRM automation, WhatsApp funnels, landing page design, and complete growth systems.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* 9. FINAL CTA SECTION */}
      <section className="py-32 relative overflow-hidden bg-black">
        <div className="absolute inset-0" style={{background: 'radial-gradient(ellipse at center, rgba(59,130,246,0.25) 0%, rgba(99,102,241,0.1) 40%, black 80%)'}} />
        {/* Floating orbs */}
        <div className="absolute top-10 left-[20%] w-48 h-48 orb bg-blue-600/30 animate-float-slow" />
        <div className="absolute bottom-10 right-[20%] w-64 h-64 orb bg-indigo-600/20 animate-float" style={{animationDelay: '1s'}} />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">Ready To Generate More Leads & Scale Faster?</h2>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            Book a free strategy call and discover how Adsrahu can help grow your business with smart lead generation systems.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/book-a-call" className="w-full sm:w-auto inline-flex h-14 items-center justify-center rounded-xl bg-white px-8 text-base font-bold text-black shadow-[0_0_20px_rgba(255,255,255,0.4)] hover:shadow-[0_0_30px_rgba(255,255,255,0.6)] transition-all hover:bg-gray-100">
              Book Strategy Call
            </Link>
            <a href="https://wa.me/917485022937" target="_blank" rel="noreferrer" className="w-full sm:w-auto inline-flex h-14 items-center justify-center rounded-xl border border-white/20 bg-black/50 backdrop-blur-sm px-8 text-base font-medium text-white shadow-sm transition-all hover:bg-white/10 hover:border-green-500/50 group">
              <SiWhatsapp className="mr-2 h-5 w-5 text-green-500" /> Chat On WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}