"use client";

import { motion } from "framer-motion";
import { wedding } from "../data/wedding.config";
import Image from "next/image";
import styles from "./OurStory.module.css";

export default function OurStory() {
  const { story } = wedding;

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <p className={styles.eyebrow}>A GLIMPSE OF OUR JOURNEY</p>
        <h2 className={styles.heading}>Our Story</h2>
      </div>

      <div className={styles.storyStack}>
        {story.map((item, i) => (
          <motion.div
            key={i}
            className={styles.storyCard}
            initial={{ opacity: 0, y: 60, rotate: i % 2 === 0 ? -2 : 2 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: i * 0.2 }}
          >
            <div className={styles.tag}>{item.tag}</div>
            <p className={styles.narrative}>{item.caption}</p>
            
            <div className={styles.polaroid}>
              <div className={styles.imageArea}>
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  style={{ objectFit: "cover", borderRadius: "4px" }}
                />
              </div>
              {item.caption && <p className={styles.caption}>{item.caption}</p>}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
