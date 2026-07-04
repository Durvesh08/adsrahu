import React from "react";
import { Link, useLocation } from "wouter";
import { Home, Layers, BookOpen, Phone } from "lucide-react";

export function MobileBottomNav() {
  const [location] = useLocation();

  const links = [
    { href: "/", label: "Home", icon: Home },
    { href: "/services", label: "Services", icon: Layers },
    { href: "/blog", label: "Blog", icon: BookOpen },
    { href: "/contact", label: "Contact", icon: Phone },
  ];

  // Don't show bottom nav on admin routes
  if (location.startsWith("/admin")) return null;

  return (
    <>
      {/* Spacer to prevent content from being hidden behind the nav */}
      <div className="h-20 md:hidden" />
      
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden pb-safe">
        <div className="bg-[#0a0a12]/80 backdrop-blur-xl border-t border-white/10 px-6 py-3">
          <div className="flex items-center justify-between">
            {links.map((link) => {
              const active = location === link.href || (link.href !== "/" && location.startsWith(link.href));
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex flex-col items-center gap-1 transition-colors ${
                    active ? "text-blue-500" : "text-gray-500 hover:text-gray-300"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-[10px] font-medium">{link.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
