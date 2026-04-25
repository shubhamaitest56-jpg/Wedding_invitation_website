"use client";

import { motion } from "framer-motion";
import styles from "./EventCard.module.css";

interface EventData {
  id: string;
  name: string;
  icon: string;
  date: string;
  time: string;
  venue: string;
  dress: string;
  description: string;
}

interface EventCardProps {
  event: EventData;
  delay?: number;
}

export default function EventCard({ event, delay = 0 }: EventCardProps) {
  return (
    <motion.article
      className={styles.card}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.65, ease: "easeOut" }}
      whileHover={{ y: -4, boxShadow: "0 16px 40px rgba(91,123,94,0.18)" }}
    >
      <div className={styles.iconWrap}>
        <span className={styles.icon} role="img" aria-label={event.name}>{event.icon}</span>
      </div>

      <h3 className={styles.name}>{event.name}</h3>

      <div className={styles.meta}>
        <span>📅 {event.date}</span>
        <span>🕐 {event.time}</span>
        <span>📍 {event.venue}</span>
        <span>👗 {event.dress}</span>
      </div>

      <p className={styles.description}>{event.description}</p>
    </motion.article>
  );
}
