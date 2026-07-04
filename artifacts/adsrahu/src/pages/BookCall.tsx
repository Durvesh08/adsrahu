import React, { useState } from "react";
import { Calendar as CalendarIcon, Clock, Video, ChevronLeft, ChevronRight, CheckCircle2, Check } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { bookingsApi } from "@/lib/api";
import { useSettings } from "@/lib/useSettings";

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DAYS = ["Su","Mo","Tu","We","Th","Fr","Sa"];
const TIME_SLOTS = ["09:00 AM","09:30 AM","10:00 AM","10:30 AM","11:00 AM","11:30 AM","12:00 PM","01:00 PM","02:00 PM","02:30 PM","03:00 PM","04:00 PM","05:00 PM"];

export default function BookCall() {
  const settings = useSettings();
  const waNumber = settings.whatsappNumber.replace(/\D/g, "");
  const today = new Date();
  const [step, setStep] = useState<1|2|3>(1);
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [form, setForm] = useState({ name:"", email:"", phone:"", notes:"" });

  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDay = new Date(viewYear, viewMonth, 1).getDay();

  function prevMonth() {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
    setSelectedDay(null);
    setSelectedTime(null);
  }
  function nextMonth() {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
    setSelectedDay(null);
    setSelectedTime(null);
  }

  function isAvailable(day: number) {
    const d = new Date(viewYear, viewMonth, day);
    const todayMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    if (d < todayMidnight) return false;
    const dow = d.getDay();
    return dow !== 0 && dow !== 6;
  }

  function isPast(day: number) {
    const d = new Date(viewYear, viewMonth, day);
    const todayMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return d < todayMidnight;
  }

  function getSelectedDateLabel() {
    if (!selectedDay) return "";
    const d = new Date(viewYear, viewMonth, selectedDay);
    return d.toLocaleDateString("en-US", { weekday:"long", month:"long", day:"numeric" });
  }

  async function handleConfirm(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedDay || !selectedTime) return;
    const dateStr = `${viewYear}-${String(viewMonth + 1).padStart(2,"0")}-${String(selectedDay).padStart(2,"0")}`;
    try {
      await bookingsApi.create({
        name: form.name,
        phone: form.phone,
        email: form.email,
        date: dateStr,
        time: selectedTime,
        status: "pending",
        notes: form.notes,
      });
    } catch { }
    setStep(3);
  }

  if (step === 3) {
    return (
      <div className="min-h-screen pt-20 pb-24 bg-black flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-green-400" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-3">You're Booked!</h2>
          <p className="text-gray-400 mb-2">
            Your strategy call is scheduled for:
          </p>
          <p className="text-blue-400 font-semibold text-lg mb-1">{getSelectedDateLabel()}</p>
          <p className="text-white font-bold text-xl mb-8">{selectedTime}</p>
          <p className="text-gray-500 text-sm mb-8">
            We'll reach out to {form.email || form.phone} with your meeting link shortly.
          </p>
          <a
            href={`https://wa.me/${waNumber}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-green-600/20 border border-green-500/30 text-green-400 text-sm font-medium hover:bg-green-600/30 transition-colors"
          >
            <SiWhatsapp className="w-4 h-4" /> Message us on WhatsApp
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-24 bg-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">Strategy Session</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Book a free 30-minute discovery call to audit your current lead generation process and map out a scalable growth system.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#0d0d14] overflow-hidden shadow-2xl flex flex-col md:flex-row">
          {/* Left: Info */}
          <div className="w-full md:w-1/3 bg-[#050505] p-8 border-r border-white/10">
            <div className="mb-8">
              <h2 className="text-xl font-bold text-white mb-2">Adsrahu Growth Team</h2>
              <h3 className="text-2xl font-bold text-primary mb-6">Discovery Call</h3>
              <div className="space-y-4 text-gray-300">
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-3 text-gray-500" />
                  <span>30 Minutes</span>
                </div>
                <div className="flex items-center">
                  <Video className="w-5 h-5 mr-3 text-gray-500" />
                  <span>Google Meet / Zoom</span>
                </div>
              </div>
            </div>
            <div className="border-t border-white/10 pt-8">
              <h4 className="font-semibold text-white mb-4">What we'll cover:</h4>
              <ul className="space-y-3">
                {[
                  "Audit of your current ad campaigns",
                  "CRM and follow-up gap analysis",
                  "Custom blueprint for scaling leads",
                ].map((item, i) => (
                  <li key={i} className="flex items-start text-sm text-gray-400">
                    <CheckCircle2 className="w-4 h-4 mr-2 text-primary shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            {selectedDay && selectedTime && (
              <div className="mt-8 border-t border-white/10 pt-6">
                <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">Selected</div>
                <div className="text-sm text-white font-medium">{getSelectedDateLabel()}</div>
                <div className="text-blue-400 font-bold">{selectedTime}</div>
              </div>
            )}
          </div>

          {/* Right: Step content */}
          <div className="w-full md:w-2/3 p-6 md:p-8 bg-[#0d0d14]">
            {step === 1 ? (
              <div>
                <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                  <CalendarIcon className="w-5 h-5" /> Select a Date & Time
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Calendar */}
                  <div className="border border-white/10 rounded-xl p-4 bg-black/60">
                    <div className="flex justify-between items-center mb-4">
                      <button
                        onClick={prevMonth}
                        className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <span className="text-white font-semibold text-sm">
                        {MONTHS[viewMonth]} {viewYear}
                      </span>
                      <button
                        onClick={nextMonth}
                        className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="grid grid-cols-7 gap-0.5 text-center mb-1">
                      {DAYS.map(d => (
                        <div key={d} className="text-[11px] text-gray-500 font-medium py-1">{d}</div>
                      ))}
                    </div>
                    <div className="grid grid-cols-7 gap-0.5 text-center">
                      {Array.from({ length: firstDay }).map((_, i) => (
                        <div key={`empty-${i}`} />
                      ))}
                      {Array.from({ length: daysInMonth }).map((_, i) => {
                        const day = i + 1;
                        const available = isAvailable(day);
                        const past = isPast(day);
                        const selected = selectedDay === day;
                        return (
                          <button
                            key={day}
                            disabled={!available}
                            onClick={() => { setSelectedDay(day); setSelectedTime(null); }}
                            className={`
                              aspect-square min-h-[44px] min-w-[44px] sm:min-w-0 sm:min-h-0 rounded-full text-sm flex items-center justify-center transition-all duration-150 font-medium mx-auto
                              ${selected ? "bg-blue-600 text-white shadow-[0_0_12px_rgba(59,130,246,0.5)]" : ""}
                              ${!selected && available ? "text-white hover:bg-blue-600/30 hover:text-blue-300 cursor-pointer" : ""}
                              ${past || (!available && !selected) ? "text-gray-700 cursor-not-allowed" : ""}
                            `}
                          >
                            {day}
                          </button>
                        );
                      })}
                    </div>
                    <p className="text-[10px] text-gray-600 text-center mt-3">Mon – Fri available · Weekends off</p>
                  </div>

                  {/* Time slots */}
                  <div>
                    {selectedDay ? (
                      <>
                        <div className="text-sm font-semibold text-white mb-3">{getSelectedDateLabel()}</div>
                        <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
                          {TIME_SLOTS.map((time, i) => (
                            <button
                              key={i}
                              onClick={() => setSelectedTime(time)}
                              className={`w-full border rounded-xl py-3.5 text-sm font-medium transition-all duration-150 ${
                                selectedTime === time
                                  ? "bg-blue-600 border-blue-500 text-white shadow-[0_0_12px_rgba(59,130,246,0.3)]"
                                  : "border-white/10 text-gray-300 hover:border-blue-500/50 hover:text-white hover:bg-blue-600/10"
                              }`}
                            >
                              {time}
                            </button>
                          ))}
                        </div>
                      </>
                    ) : (
                      <div className="h-full flex items-center justify-center text-gray-600 text-sm text-center">
                        ← Select a date to<br />see available times
                      </div>
                    )}
                  </div>
                </div>

                {selectedDay && selectedTime && (
                  <div className="mt-6 flex justify-end">
                    <button
                      onClick={() => setStep(2)}
                      className="flex items-center gap-2 px-6 py-3 rounded-xl btn-premium text-white font-semibold text-sm"
                    >
                      Continue <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <button onClick={() => setStep(1)} className="flex items-center gap-1 text-gray-400 hover:text-white text-sm mb-6 transition-colors">
                  <ChevronLeft className="w-4 h-4" /> Back to calendar
                </button>
                <h3 className="text-xl font-semibold text-white mb-1">Enter Your Details</h3>
                <p className="text-gray-500 text-sm mb-6">
                  {getSelectedDateLabel()} at <span className="text-blue-400 font-medium">{selectedTime}</span>
                </p>
                <form className="space-y-4" onSubmit={handleConfirm}>
                  <div>
                    <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-1.5">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={e => setForm({...form, name:e.target.value})}
                      className="w-full rounded-xl border border-white/10 bg-black/60 px-4 py-3 text-white text-sm focus:border-blue-500/50 focus:outline-none placeholder-gray-600 transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-1.5">Email *</label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={e => setForm({...form, email:e.target.value})}
                        className="w-full rounded-xl border border-white/10 bg-black/60 px-4 py-3 text-white text-sm focus:border-blue-500/50 focus:outline-none placeholder-gray-600 transition-all"
                        placeholder="you@company.com"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-1.5">Phone / WhatsApp *</label>
                      <input
                        type="tel"
                        required
                        value={form.phone}
                        onChange={e => setForm({...form, phone:e.target.value})}
                        className="w-full rounded-xl border border-white/10 bg-black/60 px-4 py-3 text-white text-sm focus:border-blue-500/50 focus:outline-none placeholder-gray-600 transition-all"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-1.5">Brief on your business (optional)</label>
                    <textarea
                      rows={3}
                      value={form.notes}
                      onChange={e => setForm({...form, notes:e.target.value})}
                      className="w-full rounded-xl border border-white/10 bg-black/60 px-4 py-3 text-white text-sm focus:border-blue-500/50 focus:outline-none placeholder-gray-600 resize-none transition-all"
                      placeholder="e.g. Real estate developer in Pune, currently spending ₹2L/month on ads..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full mt-2 rounded-xl btn-premium py-3.5 text-base font-bold text-white shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                  >
                    Confirm Booking
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-400 mb-4">Need immediate assistance?</p>
          <a
            href={`https://wa.me/${waNumber}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-full border border-green-500/30 bg-green-500/10 px-6 py-2 text-sm font-medium text-green-500 hover:bg-green-500/20 transition-colors"
          >
            <SiWhatsapp className="mr-2 h-4 w-4" /> Message us on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
