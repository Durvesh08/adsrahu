import React from "react";
import { Link } from "wouter";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";

export default function Contact() {
  return (
    <div className="min-h-screen pt-20 pb-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Left Column: Info */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">Let's Build Your Growth Engine.</h1>
            <p className="text-lg text-gray-400 mb-12 max-w-md">
              Whether you need more qualified leads, better CRM automation, or a complete marketing overhaul, we're ready to partner with you.
            </p>

            <div className="space-y-8 mb-12">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                  <SiWhatsapp className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <h3 className="text-white font-medium text-lg mb-1">WhatsApp / Phone</h3>
                  <p className="text-gray-400 mb-2">Fastest way to reach us.</p>
                  <a href="https://wa.me/917485022937" target="_blank" rel="noreferrer" className="text-primary hover:text-white transition-colors font-medium">
                    +91 74850 22937
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-white font-medium text-lg mb-1">Email</h3>
                  <p className="text-gray-400 mb-2">For general inquiries and proposals.</p>
                  <a href="mailto:contact@adsrahu.com" className="text-primary hover:text-white transition-colors font-medium">
                    contact@adsrahu.com
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-white font-medium text-lg mb-1">Global Reach</h3>
                  <p className="text-gray-400">Serving clients in India, USA, UK, and UAE.</p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-[#0d0d14] p-6">
              <h3 className="text-white font-medium mb-2">Ready to move fast?</h3>
              <p className="text-gray-400 text-sm mb-4">Skip the emails and book a direct strategy session with our team.</p>
              <Link href="/book-a-call" className="inline-flex items-center text-primary font-medium hover:text-white transition-colors">
                Book Strategy Call <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="rounded-2xl border border-white/10 bg-[#0d0d14] p-8 md:p-10 shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-6">Send a Message</h2>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-gray-300">Full Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    className="w-full rounded-md border border-white/10 bg-black px-4 py-3 text-white placeholder:text-gray-600 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="company" className="text-sm font-medium text-gray-300">Company Name</label>
                  <input 
                    type="text" 
                    id="company" 
                    className="w-full rounded-md border border-white/10 bg-black px-4 py-3 text-white placeholder:text-gray-600 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                    placeholder="Acme Real Estate"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-gray-300">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    className="w-full rounded-md border border-white/10 bg-black px-4 py-3 text-white placeholder:text-gray-600 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                    placeholder="john@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium text-gray-300">Phone Number</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    className="w-full rounded-md border border-white/10 bg-black px-4 py-3 text-white placeholder:text-gray-600 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="service" className="text-sm font-medium text-gray-300">What do you need help with?</label>
                <select 
                  id="service" 
                  className="w-full rounded-md border border-white/10 bg-black px-4 py-3 text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors appearance-none"
                >
                  <option value="">Select a service...</option>
                  <option value="lead-gen">Real Estate Lead Generation</option>
                  <option value="crm">CRM & WhatsApp Automation</option>
                  <option value="social">Social Media Management</option>
                  <option value="other">Other Growth Services</option>
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-gray-300">Message</label>
                <textarea 
                  id="message" 
                  rows={4}
                  className="w-full rounded-md border border-white/10 bg-black px-4 py-3 text-white placeholder:text-gray-600 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors resize-none"
                  placeholder="Tell us about your current challenges and goals..."
                ></textarea>
              </div>

              <button 
                type="button" 
                className="w-full rounded-md bg-primary px-8 py-4 text-base font-bold text-white shadow transition-all hover:bg-primary/90 glow-blue flex justify-center items-center"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
