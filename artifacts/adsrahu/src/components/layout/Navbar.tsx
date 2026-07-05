import React, { useState } from "react";
import { Link } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-black/40 backdrop-blur-2xl border-b border-white/5 supports-[backdrop-filter]:bg-black/20">
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center gap-3" data-testid="link-logo">
                <div className="relative flex-shrink-0">
                  <div className="absolute inset-0 rounded-full bg-amber-400/30 blur-md animate-pulse-glow" />
                  <div className="relative w-10 h-10 rounded-full border border-amber-400/40 overflow-hidden" style={{boxShadow:'0 0 20px rgba(251,191,36,0.35), inset 0 1px 0 rgba(251,191,36,0.2)'}}>
                    <img
                      src="/adsrahu-logo.jpg"
                      alt="Adsrahu logo"
                      className="absolute w-full h-full object-cover"
                    />
                  </div>
                </div>
                <span className="text-xl font-bold tracking-tight text-white">Adsrahu</span>
              </Link>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/services" className="text-sm text-gray-300 hover:text-white transition-colors nav-link-underline">Services</Link>
              <Link href="/results" className="text-sm text-gray-300 hover:text-white transition-colors nav-link-underline">Results</Link>
              <Link href="/industries" className="text-sm text-gray-300 hover:text-white transition-colors nav-link-underline">Industries</Link>
              <Link href="/about" className="text-sm text-gray-300 hover:text-white transition-colors nav-link-underline">About</Link>
              <Link href="/blog" className="text-sm text-gray-300 hover:text-white transition-colors nav-link-underline">Blog</Link>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <Link href="/contact" className="text-sm font-medium text-white hover:text-primary transition-colors">
                Contact
              </Link>
              <Link href="/book-a-call" className="inline-flex h-10 items-center justify-center rounded-md bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-all duration-300 px-6 text-sm font-medium text-white">
                Book Strategy Call
              </Link>
            </div>

            <div className="flex md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-white/10 focus:outline-none"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden bg-black/90 backdrop-blur-xl border-b border-white/10">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link href="/services" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-white/5" onClick={() => setIsOpen(false)}>Services</Link>
              <Link href="/results" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-white/5" onClick={() => setIsOpen(false)}>Results</Link>
              <Link href="/industries" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-white/5" onClick={() => setIsOpen(false)}>Industries</Link>
              <Link href="/about" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-white/5" onClick={() => setIsOpen(false)}>About</Link>
              <Link href="/blog" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-white/5" onClick={() => setIsOpen(false)}>Blog</Link>
              <Link href="/contact" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-white/5" onClick={() => setIsOpen(false)}>Contact</Link>
              <Link href="/book-a-call" className="block mt-4 w-full text-center px-4 py-3 border border-transparent rounded-md shadow-[0_0_20px_rgba(59,130,246,0.3)] text-base font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600" onClick={() => setIsOpen(false)}>
                Book Strategy Call
              </Link>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}