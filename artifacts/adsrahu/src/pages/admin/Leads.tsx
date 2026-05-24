import React, { useState } from "react";
import { Search, Plus, Trash2, Phone, Mail, MapPin, Edit2, Check, X, Download } from "lucide-react";
import { leadsStore, Lead } from "@/lib/admin-store";

const statusColors: Record<string, string> = {
  new: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  contacted: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  interested: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  closed: "bg-green-500/20 text-green-400 border-green-500/30",
  lost: "bg-red-500/20 text-red-400 border-red-500/30",
};

const STATUSES = ["new","contacted","interested","closed","lost"] as const;

export default function AdminLeads() {
  const [leads, setLeads] = useState<Lead[]>(leadsStore.get());
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showAdd, setShowAdd] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({ name:"", phone:"", email:"", city:"", source:"Facebook Ads", status:"new" as Lead["status"], notes:"" });

  function refresh() { setLeads(leadsStore.get()); }

  const filtered = leads.filter(l => {
    const q = search.toLowerCase();
    const matchesQ = !q || l.name.toLowerCase().includes(q) || l.phone.includes(q) || l.email.toLowerCase().includes(q) || l.city.toLowerCase().includes(q);
    const matchesStatus = filterStatus === "all" || l.status === filterStatus;
    return matchesQ && matchesStatus;
  });

  function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    leadsStore.add(form);
    setForm({ name:"", phone:"", email:"", city:"", source:"Facebook Ads", status:"new", notes:"" });
    setShowAdd(false);
    refresh();
  }

  function handleDelete(id: string) {
    if (confirm("Delete this lead?")) { leadsStore.delete(id); refresh(); }
  }

  function handleStatusChange(id: string, status: Lead["status"]) {
    leadsStore.update(id, { status });
    refresh();
  }

  function exportCSV() {
    const headers = "Name,Phone,Email,City,Source,Status,Notes,Date\n";
    const rows = filtered.map(l =>
      `"${l.name}","${l.phone}","${l.email}","${l.city}","${l.source}","${l.status}","${l.notes}","${new Date(l.createdAt).toLocaleDateString()}"`
    ).join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "leads.csv"; a.click();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Leads</h1>
          <p className="text-gray-500 text-sm mt-1">{leads.length} total leads</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={exportCSV} className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 border border-white/10 rounded-xl hover:bg-white/5 transition-colors">
            <Download className="w-4 h-4" /> Export
          </button>
          <button onClick={() => setShowAdd(true)} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white btn-premium rounded-xl">
            <Plus className="w-4 h-4" /> Add Lead
          </button>
        </div>
      </div>

      {/* Add lead modal */}
      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#060912] p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-white">Add New Lead</h2>
              <button onClick={() => setShowAdd(false)} className="text-gray-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleAdd} className="grid grid-cols-2 gap-4">
              {[
                { label:"Name", key:"name", type:"text", required:true },
                { label:"Phone", key:"phone", type:"text", required:true },
                { label:"Email", key:"email", type:"email", required:false },
                { label:"City", key:"city", type:"text", required:false },
              ].map(f => (
                <div key={f.key}>
                  <label className="block text-xs text-gray-400 mb-1.5 uppercase tracking-wider">{f.label}</label>
                  <input
                    type={f.type}
                    value={(form as any)[f.key]}
                    onChange={e => setForm({...form, [f.key]: e.target.value})}
                    required={f.required}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500/50 transition-all placeholder-gray-600"
                  />
                </div>
              ))}
              <div>
                <label className="block text-xs text-gray-400 mb-1.5 uppercase tracking-wider">Source</label>
                <select value={form.source} onChange={e => setForm({...form, source:e.target.value})} className="w-full bg-[#0d1220] border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500/50">
                  {["Facebook Ads","Google Ads","WhatsApp","Instagram","Referral","Website","Other"].map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1.5 uppercase tracking-wider">Status</label>
                <select value={form.status} onChange={e => setForm({...form, status: e.target.value as Lead["status"]})} className="w-full bg-[#0d1220] border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500/50">
                  {STATUSES.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div className="col-span-2">
                <label className="block text-xs text-gray-400 mb-1.5 uppercase tracking-wider">Notes</label>
                <textarea value={form.notes} onChange={e => setForm({...form, notes:e.target.value})} rows={2} className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500/50 transition-all resize-none placeholder-gray-600" />
              </div>
              <div className="col-span-2 flex gap-3 justify-end pt-2">
                <button type="button" onClick={() => setShowAdd(false)} className="px-5 py-2 text-sm text-gray-400 border border-white/10 rounded-xl hover:bg-white/5 transition-colors">Cancel</button>
                <button type="submit" className="px-5 py-2 text-sm font-medium text-white btn-premium rounded-xl">Add Lead</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search leads..."
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-blue-500/50 transition-all"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {["all", ...STATUSES].map(s => (
            <button key={s} onClick={() => setFilterStatus(s)} className={`px-3 py-2 text-xs font-medium rounded-xl capitalize transition-colors ${filterStatus===s ? "bg-blue-600/30 text-blue-300 border border-blue-500/30" : "text-gray-400 border border-white/8 hover:border-white/15"}`}>
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-white/5 bg-[#060912] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5">
                {["Lead","Contact","City","Source","Status","Actions"].map(h => (
                  <th key={h} className="text-left px-5 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-gray-500">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.length === 0 && (
                <tr><td colSpan={6} className="text-center py-12 text-gray-600 text-sm">No leads found</td></tr>
              )}
              {filtered.map(lead => (
                <tr key={lead.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-xs font-bold text-white shrink-0">
                        {lead.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium text-white">{lead.name}</div>
                        <div className="text-[11px] text-gray-600">{new Date(lead.createdAt).toLocaleDateString()}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="text-gray-300 text-xs">{lead.phone}</div>
                    <div className="text-gray-500 text-xs">{lead.email}</div>
                  </td>
                  <td className="px-5 py-4 text-gray-400 text-xs">{lead.city || "—"}</td>
                  <td className="px-5 py-4 text-gray-400 text-xs">{lead.source}</td>
                  <td className="px-5 py-4">
                    <select
                      value={lead.status}
                      onChange={e => handleStatusChange(lead.id, e.target.value as Lead["status"])}
                      className={`text-[11px] font-semibold px-2 py-1 rounded-full border bg-transparent capitalize cursor-pointer focus:outline-none ${statusColors[lead.status]}`}
                    >
                      {STATUSES.map(s => <option key={s} value={s} className="bg-[#0d1220] capitalize">{s}</option>)}
                    </select>
                  </td>
                  <td className="px-5 py-4">
                    <button onClick={() => handleDelete(lead.id)} className="text-gray-600 hover:text-red-400 transition-colors p-1 rounded-lg hover:bg-red-500/10">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
