"use client";

import { motion } from "framer-motion";
import { useCountdown } from "../hooks/useCountdown";
import { wedding } from "../data/wedding.config";
import styles from "./Countdown.module.css";

const pad = (n: number) => String(n).padStart(2, "0");

export default function Countdown() {
  const { days, hours, minutes, seconds } = useCountdown(wedding.weddingDate);

  const units = [
    { label: "DAYS", value: days },
    { label: "HOURS", value: hours },
    { label: "MINS", value: minutes },
    { label: "SECS", value: seconds },
  ];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.decorativeLine} />

        <motion.p
          className={styles.introText}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          A lifetime of togetherness begins with one sacred step
        </motion.p>

        <motion.h3
          className={styles.weddingLabel}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Wedding
        </motion.h3>

        <div className={styles.grid}>
          {units.map((unit) => (
            <div key={unit.label} className={styles.unit}>
              <motion.span
                key={`${unit.label}-${unit.value}`}
                className={styles.number}
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {pad(unit.value)}
              </motion.span>
              <span className={styles.label}>{unit.label}</span>
            </div>
          ))}
        </div>

        <div className={styles.decorativeLine} />
      </div>
    </section>
  );
}
