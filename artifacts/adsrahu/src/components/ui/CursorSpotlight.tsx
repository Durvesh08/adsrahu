import React, { useEffect, useRef, useState } from 'react';

export function CursorSpotlight() {
  const spotRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -9999, y: -9999 });
  const raf = useRef<number>(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    const tick = () => {
      if (spotRef.current) {
        spotRef.current.style.left = pos.current.x + 'px';
        spotRef.current.style.top = pos.current.y + 'px';
      }
      raf.current = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove);
    raf.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <div
      ref={spotRef}
      className="pointer-events-none fixed z-[9999] hidden md:block"
      style={{
        width: 500,
        height: 500,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)',
        transform: 'translate(-50%, -50%)',
        transition: 'none',
      }}
    />
  );
}
