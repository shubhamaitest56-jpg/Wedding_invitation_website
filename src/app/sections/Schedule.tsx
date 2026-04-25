"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import { weddingConfig } from "../data/wedding.config";
import styles from "./Schedule.module.css";

export default function Schedule() {
  const { schedule } = weddingConfig;
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <p className={styles.eyebrow}>MUHURTHAM DAY SCHEDULE</p>
        <h2 className={styles.heading}>May 30, 2026</h2>
        <p className={styles.subtext}>Color theme: Sage Green · All colors welcome</p>
      </div>

      <div className={styles.timelineContainer} ref={containerRef}>
        {/* The drawing line */}
        <div className={styles.rail}>
          <motion.div className={styles.progressLine} style={{ scaleY }} />
        </div>

        <div className={styles.eventStack}>
          {schedule.map((event, i) => (
            <div key={i} className={styles.timelineItem}>
              <div className={styles.dotContainer}>
                <motion.div 
                  className={styles.dot}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 100, delay: i * 0.1 }}
                />
              </div>
              
              <motion.div 
                className={styles.card}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
              >
                <p className={styles.time}>{event.time}</p>
                <h3 className={styles.eventTitle}>{event.label}</h3>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
