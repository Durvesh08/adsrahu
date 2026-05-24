import React from "react";
import { Link } from "wouter";
import { Building, Stethoscope, Briefcase, GraduationCap, Store, Rocket, ArrowRight } from "lucide-react";

export default function Industries() {
  return (
    <div className="min-h-screen pt-20 pb-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">Industries We Scale</h1>
          <p className="text-lg text-gray-400">
            We build specialized lead generation and automation systems tailored to the specific buyer journeys of different industries.
          </p>
        </div>

        {/* Primary Industry: Real Estate */}
        <div className="rounded-3xl border border-primary/30 bg-gradient-to-br from-[#0d0d14] to-primary/10 p-8 md:p-12 mb-16 relative overflow-hidden shadow-[0_0_50px_rgba(59,130,246,0.1)]">
          <div className="absolute -right-24 -top-24 w-64 h-64 bg-primary/20 blur-[80px]" />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
            <div>
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-primary/20 text-primary mb-6">
                <Building className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">Real Estate & Property</h2>
              <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                Our core expertise. We help developers, channel partners, and realtors sell inventory faster by replacing portal dependency with proprietary lead generation engines.
              </p>
              <ul className="space-y-3 mb-8">
                {["Residential Projects (Apartments & Villas)", "Commercial Real Estate", "Plotted Developments", "International/Dubai Properties"].map((item, i) => (
                  <li key={i} className="flex items-center text-gray-400">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mr-3" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/book-a-call" className="inline-flex items-center h-12 px-6 rounded-md bg-white text-black font-semibold hover:bg-gray-200 transition-colors">
                Build Real Estate Funnel
              </Link>
            </div>
            
            <div className="rounded-xl border border-white/10 bg-black/50 p-6 backdrop-blur-sm">
              <h3 className="text-lg font-semibold text-white mb-4">The Real Estate Blueprint</h3>
              <div className="space-y-4">
                <div className="bg-white/5 border border-white/5 rounded-lg p-4">
                  <div className="text-primary text-sm font-medium mb-1">Step 1: Capture</div>
                  <div className="text-white text-sm">Hyper-local Facebook & Google Ads directing to high-converting property landing pages.</div>
                </div>
                <div className="bg-white/5 border border-white/5 rounded-lg p-4">
                  <div className="text-primary text-sm font-medium mb-1">Step 2: Qualify</div>
                  <div className="text-white text-sm">WhatsApp automation sends brochures instantly and qualifies budget & timeline.</div>
                </div>
                <div className="bg-white/5 border border-white/5 rounded-lg p-4">
                  <div className="text-primary text-sm font-medium mb-1">Step 3: Convert</div>
                  <div className="text-white text-sm">CRM routing assigns warm leads to sales reps for site visit bookings.</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Other Industries Grid */}
        <h2 className="text-2xl font-bold text-white mb-8 border-b border-white/10 pb-4">Other Sectors We Partner With</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { 
              icon: Briefcase, 
              title: "Coaches & Consultants", 
              desc: "High-ticket coaching funnels, webinar registrations, and automated appointment booking systems." 
            },
            { 
              icon: Stethoscope, 
              title: "Healthcare & Clinics", 
              desc: "Patient acquisition for specialized clinics (dental, derma, aesthetic) using trust-driven local ads." 
            },
            { 
              icon: Store, 
              title: "Local Service Businesses", 
              desc: "Consistent lead flow for high-value services like home renovation, interior design, and solar installation." 
            },
            { 
              icon: GraduationCap, 
              title: "EdTech & Institutes", 
              desc: "Student enrollment campaigns, lead nurturing via WhatsApp, and automated follow-ups." 
            },
            { 
              icon: Rocket, 
              title: "B2B SaaS & Startups", 
              desc: "Demo bookings, lead magnet distribution, and LinkedIn/Google B2B targeting strategies." 
            }
          ].map((ind, i) => (
            <div key={i} className="rounded-xl border border-white/10 bg-[#0d0d14] p-8 hover:bg-[#12121a] transition-colors">
              <ind.icon className="w-10 h-10 text-primary mb-6" />
              <h3 className="text-xl font-bold text-white mb-3">{ind.title}</h3>
              <p className="text-gray-400 text-sm mb-6">{ind.desc}</p>
              <Link href="/contact" className="text-primary text-sm font-medium flex items-center hover:text-white transition-colors">
                Discuss Your Industry <ArrowRight className="ml-1 w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
