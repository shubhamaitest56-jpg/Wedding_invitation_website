"use client";

import { motion } from "framer-motion";
import { wedding } from "../data/wedding.config";
import Image from "next/image";
import styles from "./Events.module.css";
import { MapPin } from "lucide-react";

export default function Events() {
  const { events } = wedding;

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <p className={styles.eyebrow}>IN THE CELEBRATION</p>
        <h2 className={styles.heading}>Events</h2>
        <p className={styles.subtext}>Kindly respond by {wedding.rsvpDeadline}</p>
      </div>

      <div className={styles.eventStack}>
        {events.map((event, i) => (
          <div key={event.id} className={styles.eventGroup}>
            <p className={styles.dayHeader}>{event.day} · {event.date}</p>
            
            <motion.div
              className={styles.imageCard}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              <div className={styles.imageWrapper}>
                <Image
                  src={event.image}
                  alt={event.name}
                  fill
                  style={{ objectFit: "cover" }}
                />
                <div className={styles.gradientOverlay} />
                
                <div className={styles.eventInfo}>
                  <h3 className={styles.eventTitle}>{event.name}</h3>
                  <div className={styles.infoLine}>
                    <span>{event.date}</span>
                  </div>
                  <div className={styles.divider} />
                  <p className={styles.timeLine}>{event.time}</p>
                  <p className={styles.themeLine}>Dress: {event.dress}</p>
                </div>
              </div>
            </motion.div>

              <motion.div
                className={styles.locationCard}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <p className={styles.locationSubtitle}>{event.name.toUpperCase()} · {event.time}</p>
                <p className={styles.address}>{event.venue}</p>
                <a 
                  href={`https://maps.google.com/?q=${encodeURIComponent(event.venue)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.mapButton}
                  style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}
                >
                  <MapPin size={16} style={{ marginRight: '8px' }} />
                  VIEW ON MAP
                </a>
                <div className={styles.mapPreview}>
                   <iframe
                     width="100%"
                     height="100%"
                     style={{ border: 0, minHeight: '200px' }}
                     loading="lazy"
                     allowFullScreen
                     referrerPolicy="no-referrer-when-downgrade"
                     src={`https://maps.google.com/maps?q=${encodeURIComponent(event.venue)}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                   ></iframe>
                </div>
              </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}
