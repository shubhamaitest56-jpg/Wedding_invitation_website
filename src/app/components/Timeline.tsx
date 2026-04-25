"use client";

import { motion } from "framer-motion";
import styles from "./Timeline.module.css";

interface TimelineItem {
  time: string;
  title: string;
}

interface TimelineProps {
  items: readonly TimelineItem[];
}

export default function Timeline({ items }: TimelineProps) {
  return (
    <div className={styles.timeline} role="list">
      {items.map((item, i) => (
        <motion.div
          key={`${item.time}-${i}`}
          className={styles.item}
          role="listitem"
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1, duration: 0.55, ease: "easeOut" }}
        >
          {/* Dot + line */}
          <div className={styles.dotCol} aria-hidden>
            <div className={styles.dot} />
            {i < items.length - 1 && <div className={styles.line} />}
          </div>

          {/* Content */}
          <div className={styles.content}>
            <span className={styles.time}>{item.time}</span>
            <span className={styles.title}>{item.title}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
