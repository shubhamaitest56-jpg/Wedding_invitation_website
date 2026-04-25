"use client";

import { useState } from "react";

import EnvelopeOpen from "./sections/EnvelopeOpen";
import CoupleIntro from "./sections/CoupleIntro";
import SaveDate from "./sections/SaveDate";
import Countdown from "./sections/Countdown";
import OurStory from "./sections/OurStory";
import Events from "./sections/Events";
import Schedule from "./sections/Schedule";
import RitualExplainer from "./sections/RitualExplainer";
import RSVP from "./sections/RSVP";
import Footer from "./sections/Footer";
import AudioToggle from "./components/AudioToggle";
import FloatingPetals from "./components/FloatingPetals";

import { AnimatePresence, motion } from "framer-motion";

export default function Home() {
  const [revealed, setRevealed] = useState(false);

  return (
    <>
      <AnimatePresence>
        {/* High-end 3D Envelope Entry */}
        {!revealed && (
          <motion.div
            key="envelope"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-[9999]"
          >
            <EnvelopeOpen onReveal={() => setRevealed(true)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main website content — revealed after envelope animation */}
      <AnimatePresence>
        {revealed && (
          <motion.main 
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="snap-container" 
            id="main-content"
          >
            <CoupleIntro />
            <SaveDate />
            <Countdown />
            <OurStory />
            <RitualExplainer />
            <Events />
            <Schedule />
            <RSVP />
            <Footer />

            {/* Ambient petal layer */}
            <FloatingPetals count={14} />
          </motion.main>
        )}
      </AnimatePresence>

      {/* Fixed UI elements */}
      <AudioToggle />
    </>
  );
}

