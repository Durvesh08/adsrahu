import React, { useState, useEffect } from "react";
import { Link } from "wouter";
import { Users, Calendar, FileText, Mail, TrendingUp, ArrowRight, Loader2 } from "lucide-react";
import { leadsApi, bookingsApi, blogApi, subscribersApi, type ApiLead } from "@/lib/api";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const weeklyData = [
  { day: "Mon", leads: 12 }, { day: "Tue", leads: 19 }, { day: "Wed", leads: 14 },
  { day: "Thu", leads: 28 }, { day: "Fri", leads: 22 }, { day: "Sat", leads: 35 }, { day: "Sun", leads: 18 },
];

const statusColors: Record<string, string> = {
  new: "bg-blue-500/20 text-blue-400 border border-blue-500/30",
  contacted: "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30",
  interested: "bg-purple-500/20 text-purple-400 border border-purple-500/30",
  closed: "bg-green-500/20 text-green-400 border border-green-500/30",
  lost: "bg-red-500/20 text-red-400 border border-red-500/30",
};

export default function AdminDashboard() {
  const [leads, setLeads] = useState<ApiLead[]>([]);
  const [counts, setCounts] = useState({ bookings: 0, blogs: 0, subs: 0, pendingBookings: 0, publishedBlogs: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      leadsApi.getAll(),
      bookingsApi.getAll(),
      blogApi.getAll(),
      subscribersApi.getAll(),
    ]).then(([ls, bs, bl, ss]) => {
      setLeads(ls);
      setCounts({
        bookings: bs.length,
        blogs: bl.length,
        subs: ss.length,
        pendingBookings: bs.filter(b => b.status === "pending").length,
        publishedBlogs: bl.filter(b => b.published).length,
      });
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const newLeads = leads.filter(l => l.status === "new").length;

  const stats = [
    { label: "Total Leads", value: leads.length, sub: `${newLeads} new`, icon: Users, color: "#3b82f6", href: "/admin/leads" },
    { label: "Bookings", value: counts.bookings, sub: `${counts.pendingBookings} pending`, icon: Calendar, color: "#8b5cf6", href: "/admin/bookings" },
    { label: "Blog Posts", value: counts.blogs, sub: `${counts.publishedBlogs} published`, icon: FileText, color: "#10b981", href: "/admin/blog" },
    { label: "Subscribers", value: counts.subs, sub: "Email list", icon: Mail, color: "#f59e0b", href: "/admin/subscribers" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Welcome back. Here's what's happening.</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-12"><Loader2 className="w-6 h-6 text-blue-400 animate-spin" /></div>
      ) : (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((s, i) => (
              <Link key={i} href={s.href}>
                <div className="group rounded-2xl border border-white/5 bg-[#060912] p-5 hover:border-white/10 transition-all duration-200 cursor-pointer hover:-translate-y-0.5">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{background:`${s.color}18`,border:`1px solid ${s.color}25`}}>
                      <s.icon className="w-4 h-4" style={{color:s.color}} />
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-gray-600 group-hover:text-gray-400 transition-colors" />
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">{s.value}</div>
                  <div className="text-xs text-gray-500 font-medium">{s.label}</div>
                  <div className="text-xs text-gray-600 mt-1">{s.sub}</div>
                </div>
              </Link>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 rounded-2xl border border-white/5 bg-[#060912] p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-sm font-semibold text-white">Lead Volume</h2>
                  <p className="text-xs text-gray-500 mt-0.5">Last 7 days</p>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-green-400 bg-green-500/10 border border-green-500/20 rounded-full px-3 py-1">
                  <TrendingUp className="w-3 h-3" />+24% this week
                </div>
              </div>
              <ResponsiveContainer width="100%" height={180}>
                <AreaChart data={weeklyData}>
                  <defs>
                    <linearGradient id="leadGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                  <XAxis dataKey="day" tick={{fill:'#6b7280',fontSize:11}} axisLine={false} tickLine={false} />
                  <YAxis tick={{fill:'#6b7280',fontSize:11}} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{background:'#0d1220',border:'1px solid rgba(255,255,255,0.08)',borderRadius:'12px',color:'#fff',fontSize:12}} />
                  <Area type="monotone" dataKey="leads" stroke="#3b82f6" strokeWidth={2} fill="url(#leadGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="rounded-2xl border border-white/5 bg-[#060912] p-6">
              <h2 className="text-sm font-semibold text-white mb-4">Lead Status</h2>
              <div className="space-y-3">
                {(["new","contacted","interested","closed","lost"] as const).map(status => {
                  const count = leads.filter(l => l.status === status).length;
                  const pct = leads.length ? Math.round((count / leads.length) * 100) : 0;
                  return (
                    <div key={status}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs capitalize text-gray-400">{status}</span>
                        <span className="text-xs text-gray-500">{count} ({pct}%)</span>
                      </div>
                      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500" style={{width:`${pct}%`}} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/5 bg-[#060912] overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
              <h2 className="text-sm font-semibold text-white">Recent Leads</h2>
              <Link href="/admin/leads" className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1">View all <ArrowRight className="w-3 h-3" /></Link>
            </div>
            <div className="divide-y divide-white/5">
              {leads.slice(0, 4).map(lead => (
                <div key={lead.id} className="flex items-center gap-4 px-6 py-3.5 hover:bg-white/[0.02] transition-colors">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-xs font-bold text-white shrink-0">{lead.name.charAt(0)}</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-white truncate">{lead.name}</div>
                    <div className="text-xs text-gray-500 truncate">{lead.phone} · {lead.source}</div>
                  </div>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full capitalize shrink-0 ${statusColors[lead.status]}`}>{lead.status}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
