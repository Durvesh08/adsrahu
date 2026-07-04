import React from "react";
import { Link } from "wouter";
import { SiX } from "react-icons/si";
import { Linkedin } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-black pt-20 pb-24">
      {/* Hero */}
      <section className="py-20 relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-black to-black" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">Redefining Agency Standards</h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            We are a performance marketing agency operating at the intersection of modern design, data science, and sales psychology.
          </p>
        </div>
      </section>

      {/* Vision & Values */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Our Vision</h2>
              <div className="space-y-6 text-gray-400 text-lg leading-relaxed">
                <p>
                  The marketing agency model is broken. Most agencies focus on vanity metrics—likes, impressions, and clicks—while businesses care about revenue, pipeline, and closed deals.
                </p>
                <p>
                  Adsrahu was built to bridge this gap. We operate like a tech startup embedded within your business. We don't just run campaigns; we engineer complete acquisition systems.
                </p>
                <p>
                  By combining premium aesthetics with rigorous performance tracking, we help real estate developers and growth businesses build scalable, predictable revenue engines.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { title: "Conversion Obsessed", desc: "Every pixel and copy line serves a single purpose: action." },
                { title: "Data Driven", desc: "Decisions made on math, not gut feelings or trends." },
                { title: "System Thinkers", desc: "We build assets that compound over time, not one-off campaigns." },
                { title: "Premium Execution", desc: "Brand equity matters. We never sacrifice quality for speed." }
              ].map((value, i) => (
                <div key={i} className="rounded-xl bg-[#0d0d14] p-6 border border-white/5">
                  <h3 className="text-lg font-bold text-white mb-2">{value.title}</h3>
                  <p className="text-sm text-gray-400">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="py-24 bg-[#050505] border-y border-white/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Leadership</h2>
          </div>
          
          <div className="rounded-2xl border border-white/10 bg-[#0d0d14] overflow-hidden flex flex-col md:flex-row shadow-2xl">
            <div className="w-full md:w-1/2 relative">
              <img 
                src="/founder.jpg" 
                alt="Raushan Pratap Yadav" 
                className="w-full h-full object-cover object-center min-h-[400px]"
              />
            </div>
            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
              <h3 className="text-2xl font-bold text-white mb-2">Raushan Pratap Yadav</h3>
              <p className="text-primary font-medium mb-6">Founder & CEO</p>
              <div className="space-y-4 text-gray-400 mb-8">
                <p>
                  "I started Adsrahu with a simple observation: real estate businesses were spending millions on ads but losing 80% of their leads due to poor follow-up and lack of automation."
                </p>
                <p>
                  "We built a framework that treats marketing as an engineering problem. When you combine the right targeting with seamless CRM and WhatsApp automation, growth becomes predictable."
                </p>
              </div>
              <div className="flex gap-4">
                <a href="https://www.linkedin.com/in/raushanpratapyadav" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="https://x.com/Adsrahu" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors">
                  <SiX className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-white mb-6">Partner With Us</h2>
          <p className="text-gray-400 mb-8">We take on a limited number of clients per quarter to ensure premium execution and dedicated attention.</p>
          <Link href="/book-a-call" className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-8 text-base font-medium text-white shadow hover:bg-primary/90 glow-blue">
            Book Strategy Call
          </Link>
        </div>
      </section>
    </div>
  );
}
