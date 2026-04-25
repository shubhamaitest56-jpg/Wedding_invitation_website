"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";

interface EnvelopeOpenProps {
  onReveal: () => void;
}

/**
 * EnvelopeOpen Component
 * 
 * The hero/entry section of the wedding invitation.
 * Features a 3D opening envelope flap using Framer Motion and Tailwind CSS.
 */
export default function EnvelopeOpen({ onReveal }: EnvelopeOpenProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleTap = () => {
    if (isOpen) return;
    setIsOpen(true);
  };

  return (
    <div 
      className="w-full h-screen fixed inset-0 z-[9999] cursor-pointer overflow-hidden bg-black"
      style={{ perspective: "1200px" }}
      onClick={handleTap}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        
        {/* LAYER 1: Envelope Body (Bottom Layer) */}
        <Image 
          src="/images/envelope-body.png" 
          alt="Envelope" 
          fill
          priority
          className="object-cover object-center"
        />

        {/* LAYER 2: Envelope Flap (Middle Layer, Animated) */}
        <motion.img 
          src="/images/envelope-flap.png" 
          alt="Envelope Flap" 
          width={1920}
          height={1080}
          className="absolute top-0 left-0 w-full h-auto object-contain z-10"
          style={{ 
            transformOrigin: "top center",
          }}
          initial={{ rotateX: 0, opacity: 1, y: 0 }}
          animate={isOpen ? { 
            rotateX: -180, 
            opacity: 0,
            y: 0,
            transition: { 
              rotateX: { duration: 0.8, ease: "easeInOut" },
              opacity: { delay: 0.6, duration: 0.2 } 
            }
          } : { rotateX: 0, opacity: 1, y: 0 }}
          onAnimationComplete={() => {
            if (isOpen) {
              // Wait 1.2s after animation completes as requested
              setTimeout(onReveal, 1200);
            }
          }}
        />

        {/* TEXT OVERLAY */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-30 pointer-events-none translate-y-[180px]">
          
          <motion.p 
            className="text-[#FFFBEB] italic text-[24px] tracking-[0.2em] font-script mb-4"
            animate={isOpen ? { opacity: 0, y: -20 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            Tap to Reveal
          </motion.p>

          <motion.p 
            className="text-[#FFFBEB] italic text-[20px] font-script"
            animate={isOpen ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            To new beginnings!
          </motion.p>

        </div>
      </div>
    </div>
  );
}
