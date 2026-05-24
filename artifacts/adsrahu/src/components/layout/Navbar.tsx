import React, { useState } from "react";
import { Link } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-white tracking-tight">
              Ads<span className="text-primary">rahu</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/services" className="text-sm text-gray-300 hover:text-white transition-colors">Services</Link>
            <Link href="/results" className="text-sm text-gray-300 hover:text-white transition-colors">Results</Link>
            <Link href="/industries" className="text-sm text-gray-300 hover:text-white transition-colors">Industries</Link>
            <Link href="/about" className="text-sm text-gray-300 hover:text-white transition-colors">About</Link>
            <Link href="/blog" className="text-sm text-gray-300 hover:text-white transition-colors">Blog</Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link href="/contact" className="text-sm font-medium text-white hover:text-primary transition-colors">
              Contact
            </Link>
            <Link href="/book-a-call" className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 glow-blue">
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
        <div className="md:hidden bg-black border-b border-white/10">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/services" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-white/5" onClick={() => setIsOpen(false)}>Services</Link>
            <Link href="/results" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-white/5" onClick={() => setIsOpen(false)}>Results</Link>
            <Link href="/industries" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-white/5" onClick={() => setIsOpen(false)}>Industries</Link>
            <Link href="/about" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-white/5" onClick={() => setIsOpen(false)}>About</Link>
            <Link href="/blog" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-white/5" onClick={() => setIsOpen(false)}>Blog</Link>
            <Link href="/contact" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-white/5" onClick={() => setIsOpen(false)}>Contact</Link>
            <Link href="/book-a-call" className="block mt-4 w-full text-center px-4 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-primary-foreground bg-primary hover:bg-primary/90" onClick={() => setIsOpen(false)}>
              Book Strategy Call
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
