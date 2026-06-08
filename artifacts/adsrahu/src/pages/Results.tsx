import React from "react";
import { useSettings } from "@/lib/useSettings";
import { Link } from "wouter";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { ArrowUpRight, TrendingUp, Users, Target, Activity } from "lucide-react";

const data = [
  { name: 'Week 1', leads: 40, cost: 240 },
  { name: 'Week 2', leads: 65, cost: 210 },
  { name: 'Week 3', leads: 85, cost: 180 },
  { name: 'Week 4', leads: 120, cost: 160 },
  { name: 'Week 5', leads: 150, cost: 150 },
  { name: 'Week 6', leads: 210, cost: 23 },
];

export default function Results() {
  const settings = useSettings();

  return (
    <div className="min-h-screen pt-20 pb-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">Real Results Powered By Smart Lead Generation Systems</h1>
          <p className="text-lg text-gray-400">
            Data-driven performance. We build systems that consistently drive qualified inquiries while lowering acquisition costs over time.
          </p>
        </div>

        {/* Dashboard UI Mockup */}
        <div className="rounded-2xl border border-white/10 bg-[#0d0d14] overflow-hidden shadow-2xl mb-24">
          <div className="border-b border-white/10 bg-black/50 p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" />
              <span className="text-white font-medium">Adsrahu Command Center</span>
            </div>
            <div className="flex gap-2">
              <div className="h-6 w-24 bg-white/5 rounded animate-pulse"></div>
              <div className="h-6 w-24 bg-white/5 rounded animate-pulse delay-75"></div>
            </div>
          </div>
          
          <div className="p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[
                { label: "Total Leads (30d)", value: settings.totalLeads, change: "+24.5%", up: true },
                { label: "Avg. Cost Per Lead", value: settings.avgCpl, change: "-18%", up: true },
                { label: "Site Visits Booked", value: "84", change: "+18.2%", up: true },
                { label: "Conversion Rate", value: settings.conversionRate, change: "+2.1%", up: true }
              ].map((stat, i) => (
                <div key={i} className="rounded-xl border border-white/5 bg-white/[0.02] p-5">
                  <div className="text-sm text-gray-400 mb-2">{stat.label}</div>
                  <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                  <div className={`text-xs font-medium flex items-center ${stat.up ? 'text-green-400' : 'text-red-400'}`}>
                    <TrendingUp className="w-3 h-3 mr-1" /> {stat.change} vs last month
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 rounded-xl border border-white/5 bg-white/[0.02] p-6">
                <h3 className="text-lg font-medium text-white mb-6">Lead Volume vs Cost Optimization</h3>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                      <XAxis dataKey="name" stroke="#ffffff50" tick={{fill: '#ffffff50', fontSize: 12}} />
                      <YAxis yAxisId="left" stroke="#ffffff50" tick={{fill: '#ffffff50', fontSize: 12}} />
                      <YAxis yAxisId="right" orientation="right" stroke="#ffffff50" tick={{fill: '#ffffff50', fontSize: 12}} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#0d0d14', borderColor: '#ffffff20', color: '#fff' }}
                        itemStyle={{ color: '#fff' }}
                      />
                      <Area yAxisId="left" type="monotone" dataKey="leads" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorLeads)" />
                      <Line yAxisId="right" type="monotone" dataKey="cost" stroke="#f59e0b" strokeWidth={2} dot={{ r: 4, fill: '#0d0d14', stroke: '#f59e0b', strokeWidth: 2 }} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="rounded-xl border border-white/5 bg-white/[0.02] p-6">
                <h3 className="text-lg font-medium text-white mb-6">WhatsApp Automation Flow</h3>
                <div className="space-y-4">
                  {[
                    { title: "Lead Captured", time: "Instant", active: true },
                    { title: "Welcome Message + Brochure", time: "+1 min", active: true },
                    { title: "Follow-up Question", time: "+2 hours", active: true },
                    { title: "Site Visit Invite", time: "+1 day", active: false },
                    { title: "Sales Rep Handover", time: "Triggered", active: false }
                  ].map((step, i) => (
                    <div key={i} className="flex items-start">
                      <div className="flex flex-col items-center mr-4">
                        <div className={`w-3 h-3 rounded-full ${step.active ? 'bg-primary glow-blue' : 'bg-white/20'}`} />
                        {i !== 4 && <div className={`w-0.5 h-10 my-1 ${step.active ? 'bg-primary/50' : 'bg-white/10'}`} />}
                      </div>
                      <div className="pt-0.5">
                        <div className={`text-sm font-medium ${step.active ? 'text-white' : 'text-gray-500'}`}>{step.title}</div>
                        <div className="text-xs text-gray-500">{step.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <div className="rounded-xl bg-[#0d0d14] p-8 border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-4">The Real Estate Standard</h3>
            <p className="text-gray-400 mb-6">
              Our campaigns are designed specifically for the real estate buyer journey. We don't just optimize for clicks; we optimize for intent, verifying phone numbers and qualifying budgets before they reach your sales team.
            </p>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-center"><Target className="w-4 h-4 mr-2 text-primary" /> Verified phone numbers via OTP/WhatsApp</li>
              <li className="flex items-center"><Target className="w-4 h-4 mr-2 text-primary" /> Multi-step qualification forms</li>
              <li className="flex items-center"><Target className="w-4 h-4 mr-2 text-primary" /> Instant CRM routing</li>
            </ul>
          </div>
          
          <div className="rounded-xl bg-[#0d0d14] p-8 border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-4">Scale Without Chaos</h3>
            <p className="text-gray-400 mb-6">
              Generating 100 leads a day means nothing if your team can't process them. Our systems include automated follow-ups so your sales team only speaks to warm prospects.
            </p>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-center"><Activity className="w-4 h-4 mr-2 text-primary" /> Zero lead leakage</li>
              <li className="flex items-center"><Activity className="w-4 h-4 mr-2 text-primary" /> Automated 7-day nurture sequences</li>
              <li className="flex items-center"><Activity className="w-4 h-4 mr-2 text-primary" /> Pipeline visibility for management</li>
            </ul>
          </div>
        </div>

        <div className="text-center">
          <Link href="/book-a-call" className="inline-flex h-14 items-center justify-center rounded-md bg-white px-8 text-base font-bold text-black shadow transition-all hover:bg-gray-200">
            I Want These Results
          </Link>
        </div>
      </div>
    </div>
  );
}
