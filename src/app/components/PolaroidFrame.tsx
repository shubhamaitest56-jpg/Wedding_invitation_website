"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import styles from "./PolaroidFrame.module.css";

interface PolaroidFrameProps {
  image: string;
  caption: string;
  alt: string;
  tilt?: number;
  delay?: number;
}

export default function PolaroidFrame({
  image,
  caption,
  alt,
  tilt = 0,
  delay = 0,
}: PolaroidFrameProps) {
  return (
    <motion.div
      className={styles.polaroid}
      style={{ rotate: tilt }}
      initial={{ opacity: 0, scale: 0.85, rotate: tilt + 5 }}
      whileInView={{ opacity: 1, scale: 1, rotate: tilt }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.7, type: "spring", stiffness: 80 }}
      whileHover={{ scale: 1.04, rotate: 0, zIndex: 10 }}
    >
      <div className={styles.imageWrap}>
        <Image
          src={image}
          alt={alt}
          fill
          sizes="(max-width: 480px) 45vw, 200px"
          style={{ objectFit: "cover" }}
          onError={(e) => {
            // Fallback: hide broken images
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
        {/* Fallback placeholder when no image exists yet */}
        <div className={styles.placeholder} aria-hidden>📷</div>
      </div>
      <p className={styles.caption}>{caption}</p>
    </motion.div>
  );
}
