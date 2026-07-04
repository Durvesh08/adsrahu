import React from "react";
import { Link } from "wouter";
import { SiInstagram, SiX, SiYoutube, SiWhatsapp } from "react-icons/si";
import { Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#050505] relative pt-16 pb-8 border-t border-white/5 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-64 bg-blue-600/5 blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="text-2xl font-bold tracking-tight text-white mb-4 inline-block">
              Adsrahu
            </Link>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              Performance marketing & lead generation systems for real estate and modern growth businesses.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.linkedin.com/in/raushanpratapyadav" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/adsrahu" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <SiInstagram className="w-5 h-5" />
              </a>
              <a href="https://x.com/Adsrahu" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <SiX className="w-5 h-5" />
              </a>
              <a href="https://youtube.com/@adsrahu" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <SiYoutube className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Services</h3>
            <ul className="space-y-3">
              <li><Link href="/services" className="text-gray-400 hover:text-white text-sm transition-colors">Lead Generation</Link></li>
              <li><Link href="/services" className="text-gray-400 hover:text-white text-sm transition-colors">Real Estate Ads</Link></li>
              <li><Link href="/services" className="text-gray-400 hover:text-white text-sm transition-colors">CRM Automation</Link></li>
              <li><Link href="/services" className="text-gray-400 hover:text-white text-sm transition-colors">WhatsApp Funnels</Link></li>
              <li><Link href="/services" className="text-gray-400 hover:text-white text-sm transition-colors">Landing Pages</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-gray-400 hover:text-white text-sm transition-colors">About Us</Link></li>
              <li><Link href="/results" className="text-gray-400 hover:text-white text-sm transition-colors">Results</Link></li>
              <li><Link href="/industries" className="text-gray-400 hover:text-white text-sm transition-colors">Industries</Link></li>
              <li><Link href="/blog" className="text-gray-400 hover:text-white text-sm transition-colors">Blog</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white text-sm transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="text-gray-400 text-sm">
                <a href="https://wa.me/917485022937" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-2">
                  <SiWhatsapp className="w-4 h-4 text-green-500" /> +91 74850 22937
                </a>
              </li>
              <li className="text-gray-400 text-sm">
                <a href="mailto:contact@adsrahu.com" className="hover:text-white transition-colors">
                  contact@adsrahu.com
                </a>
              </li>
            </ul>
            <div className="mt-6">
              <Link href="/book-a-call" className="inline-flex h-10 items-center justify-center rounded-md border border-white/20 bg-transparent px-6 text-sm font-medium text-white shadow-sm transition-colors hover:bg-white/10 w-full hover:border-blue-500/50">
                Book Strategy Call
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-xs">
            © {new Date().getFullYear()} Adsrahu. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link href="/privacy-policy" className="text-gray-500 hover:text-white text-xs transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-gray-500 hover:text-white text-xs transition-colors">Terms of Service</Link>
            <Link href="/refund-policy" className="text-gray-500 hover:text-white text-xs transition-colors">Refund Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}