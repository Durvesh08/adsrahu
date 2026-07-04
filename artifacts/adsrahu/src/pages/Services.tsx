import React from "react";
import { Link } from "wouter";
import { Target, Activity, Users, MessageSquare, Briefcase, Stethoscope, Building, Laptop } from "lucide-react";

export default function Services() {
  return (
    <div className="min-h-screen pt-20 pb-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">Growth Systems & Services</h1>
          <p className="text-lg text-gray-400">
            We don't just run ads. We build complete, automated lead generation engines that capture, nurture, and convert.
          </p>
        </div>

        <div className="space-y-24">
          {/* Core Services */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-8 border-b border-white/10 pb-4">Core Lead Generation Systems</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: "Real Estate Lead Generation", desc: "End-to-end lead generation systems built specifically for builders, developers, and realtors — from ad creative to site visit." },
                { title: "Lead Generation", desc: "Full-funnel performance marketing for any industry — generating qualified, sales-ready leads at scale using paid and organic channels." },
                { title: "Facebook & Instagram Ads", desc: "Targeted campaigns to capture high-intent property buyers and investors." },
                { title: "Google Ads", desc: "Capture search intent from people actively looking for real estate or your services." },
                { title: "Apps and Website Development", desc: "High-speed, conversion-optimized pages designed specifically for your paid traffic." },
                { title: "Automation Services", desc: "Never lose a lead. We set up automated email and WhatsApp workflows." },
                { title: "WhatsApp Funnels", desc: "Automated brochure delivery, project updates, and direct engagement via WhatsApp." },
                { title: "Analytics & Lead Tracking", desc: "Attribution models and dashboard setups to track CPL, ROI, and lead quality." }
              ].map((item, i) => (
                <div key={i} className="rounded-xl border border-white/10 bg-[#0d0d14] p-8 hover:border-primary/50 transition-all group relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full group-hover:bg-primary/10 transition-colors" />
                  <h3 className="text-xl font-bold text-white mb-3 relative z-10">{item.title}</h3>
                  <p className="text-gray-400 text-sm relative z-10">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Other Growth Services */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-8 border-b border-white/10 pb-4">Digital Marketing & Growth</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: "Social Media Management", desc: "Brand building, content creation, and community management across platforms." },
                { title: "App Development", desc: "Custom mobile applications for real estate aggregators, builders, or modern businesses." },
                { title: "Branding & Strategy", desc: "Positioning your brand as a premium authority in your specific market." },
                { title: "Business Development", desc: "Consulting on sales processes, follow-up scripts, and conversion rate optimization." }
              ].map((item, i) => (
                <div key={i} className="rounded-xl border border-white/5 bg-[#050505] p-6 hover:bg-[#0a0a0f] transition-all">
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-32 rounded-2xl border border-primary/20 bg-gradient-to-br from-[#0d0d14] to-primary/5 p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Need a custom system?</h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">Book a strategy call and we'll audit your current process and map out a growth plan.</p>
          <Link href="/book-a-call" className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-8 text-base font-medium text-white shadow hover:bg-primary/90 glow-blue">
            Book Free Strategy Call
          </Link>
        </div>
      </div>
    </div>
  );
}
