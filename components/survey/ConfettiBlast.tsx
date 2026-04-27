'use client';

import { useEffect, useState } from 'react';

const COLORS = ['#7C3AED', '#14B8A6', '#F97316', '#FF7043', '#4CAF50', '#E91E8C'];
const SHAPES = ['●', '■', '▲', '★', '♦'];

interface Piece {
  id: number;
  x: number;
  color: string;
  shape: string;
  duration: number;
  delay: number;
  size: number;
}

export default function ConfettiBlast() {
  const [pieces, setPieces] = useState<Piece[]>([]);

  useEffect(() => {
    const generated: Piece[] = Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
      duration: 2 + Math.random() * 2,
      delay: Math.random() * 1.5,
      size: 8 + Math.random() * 12,
    }));
    setPieces(generated);

    const timer = setTimeout(() => setPieces([]), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="confetti-container">
      {pieces.map((p) => (
        <span
          key={p.id}
          className="confetti-piece select-none"
          style={{
            left: `${p.x}%`,
            color: p.color,
            fontSize: `${p.size}px`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        >
          {p.shape}
        </span>
      ))}
    </div>
  );
}
