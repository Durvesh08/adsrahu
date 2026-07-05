import React, { useState } from 'react';
import { motion } from 'framer-motion';

const PLATFORMS = ['Telegram Channel', 'WhatsApp Group', 'Facebook Group', 'YouTube Channel'];

export function ROICalculator() {
  const [platform, setPlatform] = useState(0);
  const [currentMembers, setCurrentMembers] = useState(500);
  const [targetMembers, setTargetMembers] = useState(5000);
  const [budget, setBudget] = useState(15000);

  const growth = targetMembers - currentMembers;
  const costPerMember = growth > 0 ? Math.round((budget / growth) * 10) / 10 : 0;
  const estimatedDays = Math.ceil(growth / (budget / 30 / 12));
  const roiMultiplier = budget > 0 ? Math.round((growth * 8 / budget) * 10) / 10 : 0; // ₹8 avg value per member

  return (
    <section className="py-24 relative bg-[#020408] border-t border-white/5">
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 100%, rgba(59,130,246,0.06), transparent)' }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-sm font-medium text-blue-300 mb-5">
            📊 Growth ROI Calculator
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            How Fast Can You Grow?
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Enter your goals and instantly see what your campaign could deliver.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Inputs */}
          <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 space-y-8">
            {/* Platform Selector */}
            <div>
              <label className="text-sm font-semibold text-gray-400 mb-3 block">Platform</label>
              <div className="grid grid-cols-2 gap-2">
                {PLATFORMS.map((p, i) => (
                  <button
                    key={i}
                    onClick={() => setPlatform(i)}
                    className={`py-2.5 px-3 rounded-xl text-sm font-medium transition-all ${platform === i ? 'bg-blue-600 text-white shadow-[0_0_20px_rgba(59,130,246,0.3)]' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Current Members */}
            <div>
              <div className="flex justify-between mb-3">
                <label className="text-sm font-semibold text-gray-400">Current Members</label>
                <span className="text-blue-400 font-bold">{currentMembers.toLocaleString()}</span>
              </div>
              <input
                type="range" min={0} max={50000} step={100}
                value={currentMembers}
                onChange={e => setCurrentMembers(Number(e.target.value))}
                className="w-full accent-blue-500 h-2 rounded-full"
              />
              <div className="flex justify-between text-xs text-gray-600 mt-1"><span>0</span><span>50,000</span></div>
            </div>

            {/* Target Members */}
            <div>
              <div className="flex justify-between mb-3">
                <label className="text-sm font-semibold text-gray-400">Target Members</label>
                <span className="text-blue-400 font-bold">{targetMembers.toLocaleString()}</span>
              </div>
              <input
                type="range" min={1000} max={200000} step={1000}
                value={targetMembers}
                onChange={e => setTargetMembers(Number(e.target.value))}
                className="w-full accent-blue-500 h-2 rounded-full"
              />
              <div className="flex justify-between text-xs text-gray-600 mt-1"><span>1,000</span><span>2,00,000</span></div>
            </div>

            {/* Monthly Budget */}
            <div>
              <div className="flex justify-between mb-3">
                <label className="text-sm font-semibold text-gray-400">Monthly Ad Budget</label>
                <span className="text-blue-400 font-bold">₹{budget.toLocaleString()}</span>
              </div>
              <input
                type="range" min={5000} max={200000} step={5000}
                value={budget}
                onChange={e => setBudget(Number(e.target.value))}
                className="w-full accent-blue-500 h-2 rounded-full"
              />
              <div className="flex justify-between text-xs text-gray-600 mt-1"><span>₹5,000</span><span>₹2,00,000</span></div>
            </div>
          </div>

          {/* Results */}
          <div className="flex flex-col gap-4">
            <motion.div
              key={growth}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-blue-900/30 to-blue-900/10 border border-blue-500/20 rounded-3xl p-8 flex-1"
            >
              <p className="text-gray-400 text-sm font-semibold mb-2">Members to Acquire</p>
              <p className="text-5xl font-black text-white mb-1">+{growth.toLocaleString()}</p>
              <p className="text-blue-400 text-sm">on {PLATFORMS[platform]}</p>
            </motion.div>

            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 text-center">
                <p className="text-2xl font-bold text-white">₹{costPerMember}</p>
                <p className="text-gray-500 text-xs mt-1">Per Member</p>
              </div>
              <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 text-center">
                <p className="text-2xl font-bold text-white">~{estimatedDays}d</p>
                <p className="text-gray-500 text-xs mt-1">Est. Duration</p>
              </div>
              <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 text-center">
                <p className="text-2xl font-bold text-green-400">{roiMultiplier}x</p>
                <p className="text-gray-500 text-xs mt-1">ROI Estimate</p>
              </div>
            </div>

            <a
              href={`https://wa.me/917485022937?text=Hi%20ADSRAHU!%20I%20want%20to%20grow%20my%20community%20to%20${targetMembers}%20members.`}
              target="_blank" rel="noreferrer"
              className="w-full py-4 rounded-2xl text-base font-bold text-white text-center flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:shadow-[0_0_50px_rgba(59,130,246,0.5)] hover:-translate-y-0.5 transition-all"
              style={{ backgroundColor: '#1d4ed8' }}
            >
              🚀 Get My Custom Growth Plan
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
