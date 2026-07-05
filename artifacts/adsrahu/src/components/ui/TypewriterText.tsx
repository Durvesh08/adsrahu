import React, { useEffect, useState } from 'react';

const WORDS = ['Telegram Communities', 'Real Estate Brands', 'WhatsApp Groups', 'YouTube Channels', 'Digital Businesses'];

export function TypewriterText() {
  const [wordIdx, setWordIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [charIdx, setCharIdx] = useState(0);

  useEffect(() => {
    const word = WORDS[wordIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && charIdx <= word.length) {
      timeout = setTimeout(() => {
        setDisplayed(word.slice(0, charIdx));
        setCharIdx(c => c + 1);
      }, 60);
    } else if (!deleting && charIdx > word.length) {
      // Pause then start deleting
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => {
        setCharIdx(c => c - 1);
        setDisplayed(word.slice(0, charIdx - 1));
      }, 35);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setWordIdx(i => (i + 1) % WORDS.length);
    }

    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx]);

  return (
    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">
      {displayed}
      <span className="animate-pulse text-blue-400">|</span>
    </span>
  );
}
