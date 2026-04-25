"use client";

import { useRef, useEffect, useState } from "react";
import styles from "./ScratchCard.module.css";

interface ScratchCardProps {
  width?: number;
  height?: number;
  revealContent: React.ReactNode;
  scratchColor?: string;
  threshold?: number; // 0-1, percentage scratched to auto-reveal
}

export default function ScratchCard({
  width = 300,
  height = 160,
  revealContent,
  scratchColor = "#C8B4A0",
  threshold = 0.5,
}: ScratchCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const isDrawing = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Fill scratch overlay
    ctx.fillStyle = scratchColor;
    ctx.fillRect(0, 0, width, height);

    // Draw hint text
    ctx.fillStyle = "rgba(255,255,255,0.55)";
    ctx.font = "bold 14px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("✦  Scratch Here  ✦", width / 2, height / 2);
  }, [width, height, scratchColor]);

  const getPos = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const scaleX = width / rect.width;
    const scaleY = height / rect.height;
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    };
  };

  const scratch = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing.current) return;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const { x, y } = getPos(e);

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 22, 0, Math.PI * 2);
    ctx.fill();

    // Check threshold
    const imageData = ctx.getImageData(0, 0, width, height);
    let transparent = 0;
    for (let i = 3; i < imageData.data.length; i += 4) {
      if (imageData.data[i] === 0) transparent++;
    }
    if (transparent / (width * height) > threshold && !isRevealed) {
      setIsRevealed(true);
      ctx.clearRect(0, 0, width, height);
    }
  };

  return (
    <div className={styles.wrapper} style={{ width, height }}>
      <div className={styles.reveal}>{revealContent}</div>
      {!isRevealed && (
        <canvas
          ref={canvasRef}
          className={styles.canvas}
          width={width}
          height={height}
          onMouseDown={() => (isDrawing.current = true)}
          onMouseMove={scratch}
          onMouseUp={() => (isDrawing.current = false)}
          onMouseLeave={() => (isDrawing.current = false)}
          onTouchStart={() => (isDrawing.current = true)}
          onTouchMove={scratch}
          onTouchEnd={() => (isDrawing.current = false)}
        />
      )}
    </div>
  );
}
