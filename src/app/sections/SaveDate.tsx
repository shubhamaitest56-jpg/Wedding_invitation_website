"use client";

import { motion } from "framer-motion";
import ScratchCard from "../components/ScratchCard";
import { weddingDateParts } from "../data/wedding.config";
import styles from "./SaveDate.module.css";

export default function SaveDate() {
  return (
    <section className={styles.section}>
      <motion.div
        className={styles.inner}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <p className={styles.sectionLabel}>THE DATE</p>
        <h2 className={styles.heading}>Save the Date</h2>
        <p className={styles.subtext}>Scratch below to reveal our wedding date</p>

        <div className={styles.cardsGrid}>
          <div className={styles.cardWrapper}>
            <p className={styles.cardLabel}>MONTH</p>
            <ScratchCard
              width={96}
              height={128}
              scratchColor="#7A9E7E"
              revealContent={<div className={styles.revealedText}>{weddingDateParts.month}</div>}
            />
          </div>

          <div className={styles.cardWrapper}>
            <p className={styles.cardLabel}>DAY</p>
            <ScratchCard
              width={96}
              height={128}
              scratchColor="#7A9E7E"
              revealContent={<div className={styles.revealedText}>{weddingDateParts.day}</div>}
            />
          </div>

          <div className={styles.cardWrapper}>
            <p className={styles.cardLabel}>YEAR</p>
            <ScratchCard
              width={96}
              height={128}
              scratchColor="#7A9E7E"
              revealContent={<div className={styles.revealedText}>{weddingDateParts.year}</div>}
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
