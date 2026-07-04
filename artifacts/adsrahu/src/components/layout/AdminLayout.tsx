import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import {
  LayoutDashboard, Users, FileText, Calendar, Mail,
  Settings, LogOut, Menu, X, TrendingUp, ChevronRight
} from "lucide-react";
import { logout } from "@/lib/admin-auth";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/leads", label: "Leads", icon: Users },
  { href: "/admin/bookings", label: "Bookings", icon: Calendar },
  { href: "/admin/blog", label: "Blog CMS", icon: FileText },
  { href: "/admin/subscribers", label: "Subscribers", icon: Mail },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const [location, setLocation] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  function handleLogout() {
    logout();
    setLocation("/admin");
  }

  const Sidebar = () => (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 px-6 py-5 border-b border-white/5">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-amber-400/30 blur-sm" />
          <div className="relative w-8 h-8 rounded-full border border-amber-400/40 overflow-hidden">
            <img src="/logo.jpg" alt="Adsrahu" className="absolute w-full h-full object-cover" />
          </div>
        </div>
        <div>
          <div className="text-sm font-bold text-white">Adsrahu</div>
          <div className="text-[10px] text-gray-500 uppercase tracking-wider">Admin Panel</div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const active = location === item.href || (item.href !== "/admin" && location.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                active
                  ? "bg-blue-600/20 text-blue-400 border border-blue-500/20"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <item.icon className={`w-4 h-4 ${active ? "text-blue-400" : "text-gray-500 group-hover:text-white"}`} />
              {item.label}
              {active && <ChevronRight className="w-3 h-3 ml-auto text-blue-400/60" />}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 py-4 border-t border-white/5">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-2.5 w-full rounded-xl text-sm font-medium text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 group"
        >
          <LogOut className="w-4 h-4 group-hover:text-red-400" />
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#020408] text-white flex">
      {/* Desktop sidebar */}
      <div className="hidden md:flex w-56 flex-col fixed left-0 top-0 bottom-0 z-40 border-r border-white/5 bg-[#060912]">
        <Sidebar />
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <div className="relative w-64 bg-[#060912] border-r border-white/5 flex flex-col z-10">
            <Sidebar />
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 md:ml-56 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex items-center justify-between h-14 px-4 md:px-6 border-b border-white/5 bg-[#020408]/80 backdrop-blur-xl">
          <button
            className="md:hidden text-gray-400 hover:text-white"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <TrendingUp className="w-3.5 h-3.5 text-green-500" />
            <span className="text-green-400 font-medium">All systems operational</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-xs font-bold text-white">A</div>
            <span className="text-sm text-gray-300 hidden sm:inline">Admin</span>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
