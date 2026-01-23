import { useEffect, useState } from 'react';

interface GazeCursorProps {
  x: number;
  y: number;
  active: boolean;
}

export function GazeCursor({ x, y, active }: GazeCursorProps) {
  // Use internal state for smooth animation if needed, 
  // but for now direct props are fine for responsiveness.
  
  if (!active) return null;

  return (
    <div
      className="fixed pointer-events-none z-[9999] transition-transform duration-75 ease-out will-change-transform"
      style={{
        left: 0,
        top: 0,
        transform: `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`,
      }}
    >
      {/* Outer ring */}
      <div className="w-8 h-8 rounded-full border-2 border-primary/50 bg-primary/10 backdrop-blur-sm flex items-center justify-center shadow-sm">
        {/* Inner dot */}
        <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(var(--primary),0.8)]" />
      </div>
    </div>
  );
}
