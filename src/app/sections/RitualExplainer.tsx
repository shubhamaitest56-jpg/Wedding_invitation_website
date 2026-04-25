"use client";

import { motion } from "framer-motion";
import styles from "./RitualExplainer.module.css";

export default function RitualExplainer() {
  return (
    <section className={styles.section}>
      <motion.div
        className={styles.container}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className={styles.heading}>The Four Laavan</h2>
        <p className={styles.description}>
          During Anand Karaj, the couple walks four sacred circles around the Guru Granth Sahib Ji — each round deepening their union with each other and with the Divine.
        </p>
      </motion.div>
    </section>
  );
}
