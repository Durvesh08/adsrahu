import React, { useState, useEffect } from "react";
import { Calendar, Clock, Phone, Mail, Trash2, Check, X, Loader2 } from "lucide-react";
import { bookingsApi, type ApiBooking } from "@/lib/api";

const statusColors: Record<string, string> = {
  pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  confirmed: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  completed: "bg-green-500/20 text-green-400 border-green-500/30",
  cancelled: "bg-red-500/20 text-red-400 border-red-500/30",
};
const STATUSES = ["pending","confirmed","completed","cancelled"] as const;

export default function AdminBookings() {
  const [bookings, setBookings] = useState<ApiBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  async function refresh() {
    try { setBookings(await bookingsApi.getAll()); } catch {}
  }

  useEffect(() => { refresh().finally(() => setLoading(false)); }, []);

  async function updateStatus(id: number, status: string) {
    await bookingsApi.update(id, { status });
    refresh();
  }

  async function handleDelete(id: number) {
    if (confirm("Delete this booking?")) { await bookingsApi.delete(id); refresh(); }
  }

  const filtered = filter === "all" ? bookings : bookings.filter(b => b.status === filter);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Bookings</h1>
        <p className="text-gray-500 text-sm mt-1">{bookings.length} strategy call bookings</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {STATUSES.map(s => (
          <div key={s} className="rounded-2xl border border-white/5 bg-[#060912] p-4 text-center">
            <div className="text-2xl font-bold text-white mb-1">{bookings.filter(b => b.status === s).length}</div>
            <div className={`text-[11px] font-semibold capitalize inline-block px-2 py-0.5 rounded-full border ${statusColors[s]}`}>{s}</div>
          </div>
        ))}
      </div>

      <div className="flex gap-2 flex-wrap">
        {["all",...STATUSES].map(s => (
          <button key={s} onClick={() => setFilter(s)} className={`px-3 py-2 text-xs font-medium rounded-xl capitalize transition-colors ${filter===s?"bg-blue-600/30 text-blue-300 border border-blue-500/30":"text-gray-400 border border-white/8 hover:border-white/15"}`}>{s}</button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center py-12"><Loader2 className="w-5 h-5 text-blue-400 animate-spin" /></div>
      ) : (
        <div className="space-y-3">
          {filtered.length === 0 && <div className="text-center py-12 text-gray-600 text-sm rounded-2xl border border-white/5 bg-[#060912]">No bookings found</div>}
          {filtered.map(booking => (
            <div key={booking.id} className="rounded-2xl border border-white/5 bg-[#060912] p-5 hover:border-white/10 transition-colors">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-sm font-bold text-white">{booking.name.charAt(0)}</div>
                    <div>
                      <div className="font-semibold text-white">{booking.name}</div>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border capitalize ${statusColors[booking.status]}`}>{booking.status}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-gray-400">
                    <div className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-blue-400" />{booking.date}</div>
                    <div className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-indigo-400" />{booking.time}</div>
                    <div className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-green-400" />{booking.phone}</div>
                    <div className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-yellow-400" />{booking.email || "—"}</div>
                  </div>
                  {booking.notes && <p className="mt-3 text-xs text-gray-500 bg-white/3 rounded-lg px-3 py-2">{booking.notes}</p>}
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  {booking.status === "pending" && (
                    <button onClick={() => updateStatus(booking.id, "confirmed")} className="p-2 rounded-lg text-gray-500 hover:text-green-400 hover:bg-green-500/10 transition-colors" title="Confirm"><Check className="w-4 h-4" /></button>
                  )}
                  {booking.status === "confirmed" && (
                    <button onClick={() => updateStatus(booking.id, "completed")} className="p-2 rounded-lg text-gray-500 hover:text-blue-400 hover:bg-blue-500/10 transition-colors" title="Mark Complete"><Check className="w-4 h-4" /></button>
                  )}
                  <button onClick={() => updateStatus(booking.id, "cancelled")} className="p-2 rounded-lg text-gray-500 hover:text-yellow-400 hover:bg-yellow-500/10 transition-colors" title="Cancel"><X className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(booking.id)} className="p-2 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
