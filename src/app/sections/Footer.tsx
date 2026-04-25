"use client";

import { motion } from "framer-motion";
import { wedding } from "../data/wedding.config";
import styles from "./Footer.module.css";

const PARTICLES = Array.from({ length: 12 });

export default function Footer() {

  return (
    <section className={styles.section}>
      {/* Animated Particles */}
      <div className={styles.particles} aria-hidden>
        {PARTICLES.map((_, i) => (
          <motion.div
            key={i}
            className={styles.particle}
            initial={{ 
              x: Math.random() * 400 - 200, 
              y: Math.random() * 400 - 200,
              opacity: 0 
            }}
            animate={{ 
              y: [0, -100, 0],
              opacity: [0.2, 0.6, 0.2]
            }}
            transition={{ 
              duration: 5 + Math.random() * 5, 
              repeat: Infinity,
              delay: Math.random() * 5
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${2 + Math.random() * 4}px`,
              height: `${2 + Math.random() * 4}px`,
            }}
          />
        ))}
      </div>

      <div className={styles.container}>
        <motion.div
          className={styles.khanda}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          ☬
        </motion.div>

        <motion.p
          className={styles.closingText}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Sealed with sacred vows, nurtured by prayers, and celebrated by you.
        </motion.p>

        <motion.p
          className={styles.invitationText}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          We cannot wait to celebrate the beginning of our forever with you.
        </motion.p>

        <motion.h2
          className={styles.names}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          {wedding.groom} & {wedding.bride}
        </motion.h2>

        <div className={styles.creditRow}>
          <p className={styles.credit}>MADE WITH ❤️ BY @INVITEVIBES_</p>
        </div>
      </div>
    </section>
  );
}
