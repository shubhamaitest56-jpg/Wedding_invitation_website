"use client";

import { useAudio } from "../hooks/useAudio";
import { wedding } from "../data/wedding.config";
import { motion } from "framer-motion";
import styles from "./AudioToggle.module.css";

export default function AudioToggle() {
  const { isPlaying, toggle } = useAudio({ src: wedding.music, loop: true, volume: 0.35 });

  return (
    <motion.button
      id="audio-toggle"
      className={styles.button}
      onClick={toggle}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.5, duration: 0.5, type: "spring" }}
      whileHover={{ scale: 1.12 }}
      whileTap={{ scale: 0.9 }}
      aria-label={isPlaying ? "Pause background music" : "Play background music"}
      title={isPlaying ? `Now playing: Sacred Union` : "Play music"}
    >
      <span className={styles.icon} aria-hidden>
        {isPlaying ? "🔊" : "🔇"}
      </span>
      <span className={`${styles.ring} ${isPlaying ? styles.ringActive : ""}`} aria-hidden />
    </motion.button>
  );
}
