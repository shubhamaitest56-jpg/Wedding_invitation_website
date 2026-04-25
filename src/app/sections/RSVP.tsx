"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { wedding } from "../data/wedding.config";
import styles from "./RSVP.module.css";
import { Check } from "lucide-react";

type Status = "idle" | "sending" | "success" | "error";

export default function RSVP() {
  const [status, setStatus] = useState<Status>("idle");
  const [validationMsg, setValidationMsg] = useState("");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    guests: "2 guests",
    events: [] as string[],
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleEventToggle = (eventId: string) => {
    setForm(prev => ({
      ...prev,
      events: prev.events.includes(eventId)
        ? prev.events.filter(id => id !== eventId)
        : [...prev.events, eventId]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.events.length === 0) {
      setValidationMsg("Please select at least one event.");
      return;
    }
    setValidationMsg("");
    setStatus("sending");

    try {
      // Simulate submission or connect to Google Sheets
      setTimeout(() => {
        setStatus("success");
      }, 1500);
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <p className={styles.eyebrow}>IN THE CELEBRATION</p>
        <h2 className={styles.heading}>Rsvp</h2>
        <p className={styles.subtext}>Kindly respond by {wedding.rsvpDeadline}</p>
      </div>

      {status === "success" ? (
        <motion.div
          className={styles.successBox}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring" }}
        >
          <p className={styles.successEmoji}>✨</p>
          <p className={styles.successText}>Thank you for your response!</p>
        </motion.div>
      ) : (
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label className={styles.label}>YOUR FULL NAME</label>
            <input
              className={styles.input}
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Enter your name"
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>PHONE / WHATSAPP NUMBER</label>
            <input
              className={styles.input}
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
              placeholder="+1 (xxx) xxx-xxxx"
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>NUMBER OF GUESTS</label>
            <select
              className={styles.select}
              name="guests"
              value={form.guests}
              onChange={handleChange}
            >
              {["1 guest", "2 guests", "3 guests", "4 guests", "5 guests"].map(n => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>EVENTS YOU WILL JOIN</label>
            <div className={styles.checkboxGroup}>
              {wedding.events.map(event => (
                <div 
                  key={event.id} 
                  className={styles.checkboxRow} 
                  onClick={() => handleEventToggle(event.id)}
                >
                  <div className={`${styles.checkbox} ${form.events.includes(event.id) ? styles.checked : ""}`}>
                    {form.events.includes(event.id) && <Check size={14} strokeWidth={2.5} />}
                  </div>
                  <span className={styles.checkboxLabel}>{event.name.toUpperCase()}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>MESSAGE & BLESSINGS (OPTIONAL)</label>
            <textarea
              className={styles.textarea}
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Send your heartfelt wishes to the couple..."
            />
          </div>

          {validationMsg && (
            <p style={{ color: "var(--red-envelope)", fontSize: "0.8rem", textAlign: "center", marginBottom: "0.5rem" }}>
              {validationMsg}
            </p>
          )}

          <button
            type="submit"
            className={styles.button}
            disabled={status === "sending"}
          >
            {status === "sending" ? "SENDING..." : "SUBMIT RESPONSE"}
          </button>
        </form>
      )}
    </section>
  );
}
