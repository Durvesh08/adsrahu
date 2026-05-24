import React, { useState } from "react";
import { Calendar as CalendarIcon, Clock, Video, ArrowRight, CheckCircle2 } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";

export default function BookCall() {
  const [step, setStep] = useState(1);

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
                <li className="flex items-start text-sm text-gray-400">
                  <CheckCircle2 className="w-4 h-4 mr-2 text-primary shrink-0 mt-0.5" />
                  Audit of your current ad campaigns
                </li>
                <li className="flex items-start text-sm text-gray-400">
                  <CheckCircle2 className="w-4 h-4 mr-2 text-primary shrink-0 mt-0.5" />
                  CRM and follow-up gap analysis
                </li>
                <li className="flex items-start text-sm text-gray-400">
                  <CheckCircle2 className="w-4 h-4 mr-2 text-primary shrink-0 mt-0.5" />
                  Custom blueprint for scaling leads
                </li>
              </ul>
            </div>
          </div>

          {/* Right: Booking UI (Visual Mockup) */}
          <div className="w-full md:w-2/3 p-8 bg-[#0d0d14]">
            {step === 1 ? (
              <div>
                <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                  <CalendarIcon className="w-5 h-5 mr-2" /> Select a Date & Time
                </h3>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Fake Calendar */}
                  <div className="border border-white/10 rounded-lg p-4 bg-black">
                    <div className="flex justify-between items-center mb-4">
                      <button className="text-gray-500 hover:text-white">&lt;</button>
                      <span className="text-white font-medium">October 2023</span>
                      <button className="text-gray-500 hover:text-white">&gt;</button>
                    </div>
                    <div className="grid grid-cols-7 gap-1 text-center mb-2">
                      {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
                        <div key={d} className="text-xs text-gray-500 font-medium py-1">{d}</div>
                      ))}
                    </div>
                    <div className="grid grid-cols-7 gap-1 text-center">
                      {Array.from({length: 31}).map((_, i) => {
                        const day = i + 1;
                        const isPast = day < 15;
                        const isSelected = day === 18;
                        const isAvailable = !isPast && [16,18,19,20,23,24,25].includes(day);
                        
                        return (
                          <div 
                            key={i} 
                            className={`
                              py-2 rounded-full text-sm flex items-center justify-center aspect-square
                              ${isSelected ? 'bg-primary text-white font-bold' : ''}
                              ${!isSelected && isAvailable ? 'text-white hover:bg-white/10 cursor-pointer bg-white/5' : ''}
                              ${isPast || (!isSelected && !isAvailable) ? 'text-gray-600 cursor-not-allowed' : ''}
                            `}
                          >
                            {day}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                  
                  {/* Fake Times */}
                  <div>
                    <div className="text-white font-medium mb-4 text-center">Wednesday, Oct 18</div>
                    <div className="space-y-2 h-[280px] overflow-y-auto pr-2 custom-scrollbar">
                      {['09:00 AM', '09:30 AM', '10:00 AM', '11:30 AM', '01:00 PM', '02:30 PM', '04:00 PM', '05:00 PM'].map((time, i) => (
                        <button 
                          key={i}
                          onClick={() => setStep(2)}
                          className="w-full border border-primary/50 rounded-md py-3 text-primary hover:bg-primary hover:text-white font-medium transition-colors text-sm"
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <button onClick={() => setStep(1)} className="text-gray-400 hover:text-white text-sm mb-6 flex items-center">
                  &lt; Back
                </button>
                <h3 className="text-xl font-semibold text-white mb-6">Enter Details</h3>
                
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Name *</label>
                    <input type="text" className="w-full rounded-md border border-white/10 bg-black px-4 py-2.5 text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Email *</label>
                    <input type="email" className="w-full rounded-md border border-white/10 bg-black px-4 py-2.5 text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Phone/WhatsApp *</label>
                    <input type="tel" className="w-full rounded-md border border-white/10 bg-black px-4 py-2.5 text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Website or LinkedIn (Optional)</label>
                    <input type="url" className="w-full rounded-md border border-white/10 bg-black px-4 py-2.5 text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
                  </div>
                  
                  <button type="button" className="w-full mt-4 rounded-md bg-primary px-8 py-3.5 text-base font-bold text-white shadow hover:bg-primary/90 glow-blue">
                    Schedule Event
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-400 mb-4">Need immediate assistance instead?</p>
          <a href="https://wa.me/917485022937" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-full border border-green-500/30 bg-green-500/10 px-6 py-2 text-sm font-medium text-green-500 hover:bg-green-500/20 transition-colors">
            <SiWhatsapp className="mr-2 h-4 w-4" /> Message us on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
