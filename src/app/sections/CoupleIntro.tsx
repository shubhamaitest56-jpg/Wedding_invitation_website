"use client";

import { motion } from "framer-motion";
import { wedding } from "../data/wedding.config";
import Image from "next/image";
import styles from "./CoupleIntro.module.css";
import { ChevronDown } from "lucide-react";

export default function CoupleIntro() {

  return (
    <section className={styles.section}>
      {/* Background Image with Overlay */}
      <div className={styles.backgroundWrapper}>
        <Image 
          src="/images/hero_bg.jpg" 
          alt="Wedding Mandap" 
          fill 
          priority
          className={styles.bgImage}
        />
        <div className={styles.overlay} />
      </div>

      <div className={styles.content}>
        {/* Sub-section 2A: Sacred Quote */}
        <div className={styles.sacredQuote}>
          <motion.div
            className={styles.ikOnkar}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            ੴ
          </motion.div>
          <motion.p
            className={styles.quoteText}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            &quot;They alone are called husband and wife, who have one soul in two bodies.&quot;
          </motion.p>
          <motion.p
            className={styles.attribution}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            — Guru Amar Das Ji
          </motion.p>
        </div>

        {/* Sub-section 2B: Couple Names */}
        <div className={styles.coupleContainer}>
          <motion.div
            className={styles.person}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h2 className={styles.name}>{wedding.groom}</h2>
            <p className={styles.parentage}>{wedding.groomParents}</p>
          </motion.div>

          <motion.div
            className={styles.ampersandWrapper}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <span className={styles.ampersand}>&amp;</span>
          </motion.div>

          <motion.div
            className={styles.person}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            <h2 className={styles.name}>{wedding.bride}</h2>
            <p className={styles.parentage}>{wedding.brideParents}</p>
          </motion.div>

        </div>

        {/* Sub-section 2C: Scroll to Reveal Indicator */}
        <motion.div
          className={styles.scrollIndicator}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <p className={styles.scrollText}>SCROLL TO REVEAL</p>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <ChevronDown size={24} className={styles.chevron} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
