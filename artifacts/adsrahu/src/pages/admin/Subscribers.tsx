import React, { useState } from "react";
import { Mail, Trash2, Download, Plus, X } from "lucide-react";
import { subscribersStore, Subscriber } from "@/lib/admin-store";

export default function AdminSubscribers() {
  const [subs, setSubs] = useState<Subscriber[]>(subscribersStore.get());
  const [search, setSearch] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ name: "", email: "" });

  function refresh() { setSubs(subscribersStore.get()); }

  function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    subscribersStore.add(form.email, form.name);
    setForm({ name: "", email: "" });
    setShowAdd(false);
    refresh();
  }

  function handleDelete(id: string) {
    if (confirm("Remove this subscriber?")) { subscribersStore.delete(id); refresh(); }
  }

  function exportCSV() {
    const headers = "Name,Email,Date\n";
    const rows = filtered.map(s => `"${s.name}","${s.email}","${new Date(s.createdAt).toLocaleDateString()}"`).join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "subscribers.csv"; a.click();
  }

  const filtered = subs.filter(s => {
    const q = search.toLowerCase();
    return !q || s.email.toLowerCase().includes(q) || s.name.toLowerCase().includes(q);
  });

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Subscribers</h1>
          <p className="text-gray-500 text-sm mt-1">{subs.length} email subscribers</p>
        </div>
        <div className="flex gap-2">
          <button onClick={exportCSV} className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 border border-white/10 rounded-xl hover:bg-white/5 transition-colors">
            <Download className="w-4 h-4" /> Export
          </button>
          <button onClick={() => setShowAdd(true)} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white btn-premium rounded-xl">
            <Plus className="w-4 h-4" /> Add
          </button>
        </div>
      </div>

      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-[#060912] p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-bold text-white">Add Subscriber</h2>
              <button onClick={() => setShowAdd(false)}><X className="w-5 h-5 text-gray-400" /></button>
            </div>
            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="block text-xs text-gray-400 mb-1.5 uppercase tracking-wider">Name</label>
                <input value={form.name} onChange={e => setForm({...form, name:e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500/50" placeholder="Full name" />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1.5 uppercase tracking-wider">Email</label>
                <input type="email" required value={form.email} onChange={e => setForm({...form, email:e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500/50" placeholder="email@example.com" />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowAdd(false)} className="flex-1 py-2 text-sm text-gray-400 border border-white/10 rounded-xl hover:bg-white/5 transition-colors">Cancel</button>
                <button type="submit" className="flex-1 py-2 text-sm font-medium text-white btn-premium rounded-xl">Add</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="relative">
        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search subscribers..."
          className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-blue-500/50 transition-all"
        />
      </div>

      <div className="rounded-2xl border border-white/5 bg-[#060912] overflow-hidden">
        <div className="divide-y divide-white/5">
          {filtered.length === 0 && <div className="text-center py-12 text-gray-600 text-sm">No subscribers found</div>}
          {filtered.map(sub => (
            <div key={sub.id} className="flex items-center gap-4 px-6 py-4 hover:bg-white/[0.02] transition-colors">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white shrink-0">
                {(sub.name || sub.email).charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-white">{sub.name || "—"}</div>
                <div className="text-xs text-gray-500">{sub.email}</div>
              </div>
              <div className="text-xs text-gray-600 hidden sm:block">{new Date(sub.createdAt).toLocaleDateString()}</div>
              <button onClick={() => handleDelete(sub.id)} className="text-gray-600 hover:text-red-400 transition-colors p-1.5 rounded-lg hover:bg-red-500/10">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
