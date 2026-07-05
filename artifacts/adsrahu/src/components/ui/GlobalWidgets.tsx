import React, { useEffect, useState } from 'react';
import { SiWhatsapp } from 'react-icons/si';
import { motion, AnimatePresence } from 'framer-motion';
import { useSettings } from '@/lib/useSettings';

const TOASTS = [
  { name: 'Rahul M.', city: 'Mumbai', action: 'booked a strategy call', time: '2 min ago', emoji: '📞' },
  { name: 'Priya S.', city: 'Delhi', action: 'joined via Telegram Growth', time: '5 min ago', emoji: '🚀' },
  { name: 'Arjun K.', city: 'Bangalore', action: 'requested a callback', time: '8 min ago', emoji: '🔔' },
  { name: 'Sneha R.', city: 'Hyderabad', action: 'submitted a lead form', time: '12 min ago', emoji: '✅' },
  { name: 'Vikram T.', city: 'Pune', action: 'booked a strategy call', time: '15 min ago', emoji: '📞' },
  { name: 'Anita B.', city: 'Chennai', action: 'joined the Telegram channel', time: '3 min ago', emoji: '💬' },
  { name: 'Rohit G.', city: 'Ahmedabad', action: 'requested real estate leads', time: '7 min ago', emoji: '🏠' },
  { name: 'Deepa N.', city: 'Jaipur', action: 'started a WhatsApp chat', time: '1 min ago', emoji: '💚' },
];

export function SocialProofToast() {
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState(TOASTS[0]);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    // Show first toast after 4s
    const initial = setTimeout(() => {
      setCurrent(TOASTS[0]);
      setVisible(true);
    }, 4000);

    return () => clearTimeout(initial);
  }, []);

  useEffect(() => {
    if (!visible) return;
    // Hide after 4s, show next after 8s
    const hideTimer = setTimeout(() => setVisible(false), 4000);
    const nextTimer = setTimeout(() => {
      const next = (idx + 1) % TOASTS.length;
      setIdx(next);
      setCurrent(TOASTS[next]);
      setVisible(true);
    }, 8000);
    return () => { clearTimeout(hideTimer); clearTimeout(nextTimer); };
  }, [visible, idx]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: -80, y: 0 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: -80 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-24 md:bottom-8 left-4 z-50 max-w-[280px]"
        >
          <div className="flex items-center gap-3 bg-[#0d1117] border border-white/10 rounded-2xl px-4 py-3 shadow-2xl backdrop-blur-xl">
            <div className="w-9 h-9 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-lg shrink-0">
              {current.emoji}
            </div>
            <div className="min-w-0">
              <p className="text-white text-xs font-semibold truncate">
                <span className="text-blue-400">{current.name}</span> from {current.city}
              </p>
              <p className="text-gray-400 text-[11px] leading-tight">{current.action}</p>
              <p className="text-gray-600 text-[10px] mt-0.5">{current.time}</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function FloatingWhatsApp() {
  const settings = useSettings();
  const waNumber = settings.whatsappNumber.replace(/\D/g, '');
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="fixed bottom-6 right-5 z-50 flex flex-col items-end gap-2">
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 8 }}
            className="bg-[#0d1117] border border-white/10 rounded-xl px-4 py-2 text-sm text-white shadow-xl whitespace-nowrap"
          >
            💬 Chat with us on WhatsApp
          </motion.div>
        )}
      </AnimatePresence>
      <motion.a
        href={`https://wa.me/${waNumber}?text=Hi%20ADSRAHU!%20I%20want%20to%20know%20more%20about%20your%20services.`}
        target="_blank"
        rel="noreferrer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="w-14 h-14 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(37,211,102,0.4)] hover:shadow-[0_0_50px_rgba(37,211,102,0.6)] transition-shadow"
        style={{ backgroundColor: '#25D366' }}
      >
        {/* Pulse ring */}
        <span className="absolute w-14 h-14 rounded-full bg-[#25D366] animate-ping opacity-20" />
        <SiWhatsapp size={28} color="white" />
      </motion.a>
    </div>
  );
}
