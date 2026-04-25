"use client";

import { useEffect, useRef } from "react";
import styles from "./FloatingPetals.module.css";

interface Petal {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  drift: number;
  emoji: string;
  angle: number;
  spin: number;
}

const EMOJIS = ["🌸", "🌺", "✿", "❀", "🌼"];

export default function FloatingPetals({ count = 18 }: { count?: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const petalsRef = useRef<Petal[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const W = el.offsetWidth;
    const H = el.offsetHeight;

    petalsRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * W,
      y: Math.random() * H - H,
      size: 14 + Math.random() * 12,
      speed: 0.4 + Math.random() * 0.8,
      opacity: 0.3 + Math.random() * 0.5,
      drift: (Math.random() - 0.5) * 0.6,
      emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
      angle: Math.random() * 360,
      spin: (Math.random() - 0.5) * 1.5,
    }));

    // Build DOM spans
    el.innerHTML = "";
    const spans = petalsRef.current.map((p) => {
      const span = document.createElement("span");
      span.className = styles.petal;
      span.textContent = p.emoji;
      span.style.fontSize = `${p.size}px`;
      el.appendChild(span);
      return span;
    });

    const animate = () => {
      const H2 = el.offsetHeight;
      const W2 = el.offsetWidth;
      petalsRef.current.forEach((p, i) => {
        p.y += p.speed;
        p.x += p.drift;
        p.angle += p.spin;
        if (p.y > H2 + 30) { p.y = -30; p.x = Math.random() * W2; }
        if (p.x > W2 + 20) p.x = -20;
        if (p.x < -20) p.x = W2 + 20;
        spans[i].style.transform = `translate(${p.x}px, ${p.y}px) rotate(${p.angle}deg)`;
        spans[i].style.opacity = String(p.opacity);
      });
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [count]);

  return <div ref={containerRef} className={styles.container} aria-hidden />;
}
