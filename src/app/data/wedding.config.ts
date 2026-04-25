// ═══════════════════════════════════════════════════════════════════
// data/wedding.config.ts — swap this per client, nothing else changes
// ═══════════════════════════════════════════════════════════════════

export const wedding = {
  // ─── Couple ────────────────────────────────────────────────────────
  bride: "Tanya",
  brideFullName: "Tanya Singh",
  brideParents: "DAUGHTER OF MR. & MRS. SINGH",

  groom: "Tanmay",
  groomFullName: "Tanmay Sharma",
  groomParents: "SON OF MR. & MRS. SHARMA",

  hashtag: "#TanmayTanya",

  // ─── Date & Venue ──────────────────────────────────────────────────
  weddingDate: "2026-05-30T11:00:00+05:30",  // ISO — used by countdown & scratch cards
  rsvpDeadline: "May 15, 2026",

  venue: {
    name: "Sacred Mandap",
    address: "12341 Wheat Ridge Dr, Rancho Cordova, CA 95742",
    city: "Rancho Cordova, CA",
    mapUrl: "https://maps.google.com",
  },

  // ─── Theme ─────────────────────────────────────────────────────────
  // sage | maroon | navy | blush  (drives CSS custom-property overrides)
  theme: "sage" as "sage" | "maroon" | "navy" | "blush",

  // ─── Events ────────────────────────────────────────────────────────
  events: [
    {
      id: "carnival",
      day: "Day 1",
      name: "Carnival",
      date: "May 26, 2026",
      time: "6:00 PM - 10:00 PM",
      venue: "12341 Wheat Ridge Dr, Rancho Cordova, CA 95742",
      dress: "Colorful Carnival",
      image: "/images/event-carnival.png",
    },
    {
      id: "sangeet",
      day: "Day 2",
      name: "Sangeet",
      date: "May 28, 2026",
      time: "5:45 PM Onwards",
      venue: "12341 Wheat Ridge Dr, Rancho Cordova, CA 95742",
      dress: "Glitz & Glam, Mystic & Magic",
      image: "/images/event-sangeet.png",
    },
    {
      id: "reception",
      day: "Day 3",
      name: "Reception",
      date: "May 29, 2026",
      time: "5:00 PM Onwards",
      venue: "12341 Wheat Ridge Dr, Rancho Cordova, CA 95742",
      dress: "Bing, Indo-Western",
      image: "/images/event-reception.png",
    },
    {
      id: "muhurtham",
      day: "Day 4",
      name: "Muhurtham",
      date: "May 30, 2026",
      time: "6:11 AM Onwards",
      venue: "12341 Wheat Ridge Dr, Rancho Cordova, CA 95742",
      dress: "South Indian Traditional",
      image: "/images/event-muhurtam.png",
    },
  ],

  // ─── Our Story ─────────────────────────────────────────────────────
  story: [
    {
      tag: "HOW IT STARTED",
      title: "The Beginning",
      caption: "Two strangers, one unexpected spark — and suddenly the world felt different.",
      image: "/images/story-beginning.png",
    },
    {
      tag: "FIRST REAL DATE",
      title: "First Date",
      caption: "Coffee turned into dinner, dinner turned into hours — we didn't want the night to end.",
      image: "/images/story-first-date.png",
    },
    {
      tag: "THE PROPOSAL",
      title: "She Said Yes",
      caption: "One question, one yes — and everything we'd imagined finally had a date on the calendar.",
      image: "/images/story-proposal.png",
    },
    {
      tag: "MAKING IT OFFICIAL",
      title: "Forever Begins",
      caption: "Somewhere between the inside jokes and late-night calls, we realized this was it.",
      image: "/images/story-forever.png",
    },
  ],

  // ─── Day-of Schedule ───────────────────────────────────────────────
  schedule: [
    { time: "10:00 AM", label: "Milni & Tea" },
    { time: "11:00 AM", label: "Muhurtham" },
    { time: "12:00 PM", label: "Lunch" },
    { time: "5:00 PM",  label: "Vidaai" },
  ],

  // ─── Integrations ─────────────────────────────────────────────────
  googleSheetUrl: "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec",

  // ─── Media ────────────────────────────────────────────────────────
  music: "/music/background.mp3",
} as const;

// ---------------------------------------------------------------------------
// Derived helpers — computed once, used across components
// ---------------------------------------------------------------------------
const _date = new Date(wedding.weddingDate);

/** Scratch-card reveal values derived from weddingDate */
export const weddingDateParts = {
  month: _date.toLocaleString("en-US", { month: "long" }),   // "May"
  day:   String(_date.getDate()),                             // "30"
  year:  String(_date.getFullYear()),                         // "2026"
} as const;

/** Backwards-compat alias — keeps old imports working without a rename */
export const weddingConfig = wedding;

export type WeddingConfig = typeof wedding;
