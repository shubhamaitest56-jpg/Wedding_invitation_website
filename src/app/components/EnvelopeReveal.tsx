"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

/**
 * EnvelopeReveal Component
 * 
 * A high-end, cinematic "Tap to Reveal" landing page overlay.
 * Built with pure CSS3 animations and minimal vanilla JS for maximum performance.
 * 
 * FEATURES:
 * - Full-screen overlay with responsive mobile-first constraint
 * - Wax seal break animation (cubic-bezier)
 * - Session storage persistence
 * - Haptic feedback support
 * - GPU-accelerated transforms/opacity
 */
export default function EnvelopeReveal() {
  const [isVisible, setIsVisible] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    // State Management: Skip if already opened in this session
    if (sessionStorage.getItem("envelopeOpened") === "true") {
      setIsVisible(false);
      return;
    }
    setIsVisible(true);
  }, []);

  const handleReveal = () => {
    if (isRevealed) return;
    setIsRevealed(true);

    // Haptic feedback (if available)
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate([50, 100, 50, 100, 50]);
    }

    // Set persistence
    sessionStorage.setItem("envelopeOpened", "true");

    // Clean up from DOM after animation completes (0.4s delay + 0.9s duration + buffer)
    setTimeout(() => {
      setIsVisible(false);
    }, 1500);
  };

  if (!isVisible) return null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&display=swap');

        .env-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          z-index: 9999;
          background-color: #000;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
          touch-action: manipulation;
          -webkit-tap-highlight-color: transparent;
          font-family: 'Dancing Script', cursive;
        }

        .env-container {
          position: relative;
          width: 100%;
          height: 100%;
          background-image: url('/envelope-bg.png');
          background-size: cover;
          background-position: center top;
          transition: transform 0.9s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.9s cubic-bezier(0.4, 0, 0.2, 1);
          will-change: transform, opacity;
          z-index: 1;
        }

        /* Constraint for Tablet/Desktop as per spec */
        @media (min-width: 768px) {
          .env-container {
            max-width: 430px;
            margin: 0 auto;
            box-shadow: 0 0 100px rgba(0,0,0,0.8);
          }
        }

        .env-dark-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.3) 100%);
          z-index: 2;
          pointer-events: none;
        }

        .env-text {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          color: #FFFBEB;
          text-shadow: 0 2px 16px rgba(0,0,0,0.6), 0 0 40px rgba(0,0,0,0.3);
          z-index: 10;
          pointer-events: none;
          text-align: center;
          width: 100%;
          transition: opacity 0.3s ease;
          white-space: nowrap;
        }

        .env-tap-text {
          top: 28%;
          font-size: clamp(22px, 5vw, 32px);
          animation: envPulse 2.5s ease-in-out infinite;
        }

        .env-bottom-text {
          bottom: 18%;
          font-size: clamp(20px, 4.5vw, 28px);
        }

        @keyframes envPulse {
          0%, 100% { opacity: 0.75; }
          50% { opacity: 1; }
        }

        .env-wax-seal {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: clamp(120px, 30vw, 180px);
          height: auto;
          z-index: 20;
          cursor: pointer;
          filter: drop-shadow(0 12px 24px rgba(0,0,0,0.5));
          transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1), 
                      opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1), 
                      filter 0.3s ease;
          animation: envSealWobble 4s ease-in-out infinite;
          will-change: transform, opacity, filter;
        }

        @media (max-width: 380px) {
          .env-wax-seal {
            width: 110px;
          }
          .env-tap-text { font-size: 20px; }
          .env-bottom-text { font-size: 18px; }
        }

        .env-wax-seal:active {
          transform: translate(-50%, -50%) scale(0.92);
        }

        @keyframes envSealWobble {
          0%, 100% { transform: translate(-50%, -50%) rotate(-1deg); }
          50% { transform: translate(-50%, -50%) rotate(1deg); }
        }

        /* REVEAL SEQUENCE CLASS */
        .env-overlay.is-revealed .env-wax-seal {
          animation: none;
          transform: translate(-50%, -50%) scale(0) rotate(15deg);
          opacity: 0;
          filter: drop-shadow(0 0 0 transparent);
        }

        .env-overlay.is-revealed .env-text {
          opacity: 0;
        }

        .env-overlay.is-revealed .env-container {
          transform: translateY(-100vh);
          transition-delay: 0.4s;
        }

        /* Accessibility: Prefers Reduced Motion */
        @media (prefers-reduced-motion: reduce) {
          .env-container, .env-wax-seal, .env-text {
            transition: none !important;
            animation: none !important;
          }
          .env-overlay.is-revealed {
            display: none !important;
          }
        }
      `}</style>

      <div 
        className={`env-overlay ${isRevealed ? 'is-revealed' : ''}`}
        aria-hidden={!isVisible}
      >
        <div className="env-container" onClick={handleReveal}>
          <div className="env-dark-overlay" />
          
          <div className="env-text env-tap-text">Tap to Reveal</div>
          
          <Image 
            src="/seal.png" 
            alt="Tap to open wedding invitation"
            className="env-wax-seal"
            role="button"
            aria-label="Tap to open wedding invitation"
            tabIndex={0}
            width={180}
            height={180}
            priority
            onClick={(e) => {
              e.stopPropagation();
              handleReveal();
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleReveal();
              }
            }}
          />

          <div className="env-text env-bottom-text">To new beginnings!</div>
        </div>
      </div>
    </>
  );
}
