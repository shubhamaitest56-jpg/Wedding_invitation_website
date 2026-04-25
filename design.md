# Tanmay & Tanya — Digital Wedding Invitation
## Design Specification Document

---

## 1. PROJECT OVERVIEW

**Product:** Mobile-first digital wedding invitation website  
**Primary Audience:** Wedding guests viewing on mobile devices  
**Tech Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion, GSAP  
**Design Philosophy:** Elegant, sacred, and celebratory. Combines traditional Sikh wedding elements with modern interactive digital experiences. Heavy use of scroll-triggered reveals, tactile interactions (scratch cards, envelope opening), and romantic micro-animations.

---

## 2. GLOBAL DESIGN SYSTEM

### 2.1 Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `--sage-primary` | `#5B7B5E` | Primary brand color, headings, buttons, checkboxes, timeline dots |
| `--sage-light` | `#7A9E7E` | Secondary sage, scratch card covers, hover states |
| `--sage-muted` | `#9DB5A0` | Borders, disabled states, subtle backgrounds |
| `--sage-dark` | `#4A6B4D` | Deep sage for gradients, footer backgrounds |
| `--cream` | `#F5F1E8` | Primary page background |
| `--cream-warm` | `#F0EBE0` | Card backgrounds, input fields |
| `--cream-dark` | `#EDE8D8` | Section alternates, borders |
| `--gold` | `#D4A574` | Accent color, timeline active dots, ampersand, decorative lines |
| `--text-primary` | `#4A4A4A` | Body text, labels |
| `--text-secondary` | `#6B6B6B` | Captions, placeholders |
| `--text-muted` | `#8B7355` | Subheaders, dates, tracking text |
| `--red-envelope` | `#C41E3A` | Envelope cover background |
| `--red-dark` | `#B91C32` | Envelope flap shadow |
| `--wax-cream` | `#F5E6D3` | Wax seal base |
| `--wax-gold` | `#D4A574` | Wax seal border |
| `--white` | `#FFFFFF` | Card surfaces, text on dark backgrounds |

### 2.2 Typography

**Primary Display Font (Script/Elegant):** `Cormorant Garamond` or `Playfair Display` (italic for names, headers)  
**Secondary Font (Sans-serif):** `Inter` or `DM Sans` (body, labels, UI elements)  
**Accent Font (Tracking):** `Montserrat` or `Inter` uppercase with wide letter-spacing

| Element | Font | Weight | Size | Line Height | Letter Spacing | Color |
|---------|------|--------|------|-------------|----------------|-------|
| Couple Names | Cormorant Garamond | 400 | 48px | 1.1 | 0 | `--sage-primary` or white |
| Section Headers | Cormorant Garamond | 400 italic | 36-42px | 1.2 | 0 | `--sage-primary` |
| Event Titles | Cormorant Garamond | 400 | 42px | 1.1 | 0 | white (on cards) |
| Subheaders | Inter | 500 | 12px | 1.5 | 0.3em | `--text-muted` |
| Body Text | Inter | 400 | 16px | 1.6 | 0 | `--text-primary` |
| Quotes/Italic | Cormorant Garamond | 400 italic | 18px | 1.6 | 0 | `--text-muted` |
| Labels | Inter | 500 | 11px | 1.4 | 0.15em | `--text-muted` |
| Countdown Numbers | Cormorant Garamond | 300 | 48px | 1 | 0.05em | `--text-primary` |
| Countdown Labels | Inter | 500 | 10px | 1 | 0.2em | `--text-muted` |

### 2.3 Spacing System

- **Base unit:** 4px
- **Section padding:** `px-6` (24px horizontal), `py-20` (80px vertical)
- **Card border-radius:** `rounded-2xl` (16px) for small cards, `rounded-3xl` (24px) for event cards
- **Input border-radius:** `rounded-xl` (12px)
- **Button border-radius:** `rounded-full` (pill shape)
- **Max content width:** 430px (mobile-first, centered)
- **Gap between sections:** 0 (continuous scroll with section backgrounds)
- **Element gaps:** 16px (standard), 24px (loose), 8px (tight)

### 2.4 Shadows & Effects

| Name | Value | Usage |
|------|-------|-------|
| `shadow-card` | `0 4px 20px rgba(91, 123, 94, 0.08)` | Cards, polaroids |
| `shadow-float` | `0 8px 30px rgba(0, 0, 0, 0.12)` | Event cards, floating buttons |
| `shadow-inner-wax` | `inset 0 2px 4px rgba(0,0,0,0.1)` | Wax seal depth |

---

## 3. GLOBAL COMPONENTS

### 3.1 Audio Toggle Button

**Position:** Fixed, bottom-right corner (`bottom-6 right-6`)  
**Z-index:** 40  
**Appearance:**
- Size: 48px × 48px
- Shape: Perfect circle (`rounded-full`)
- Background: `rgba(255, 255, 255, 0.9)` with `backdrop-blur-md`
- Border: 1px solid `rgba(91, 123, 94, 0.1)`
- Shadow: `shadow-float`
- Icon: `Volume2` (playing) / `VolumeX` (muted), 20px, color `--sage-primary`

**Behavior:**
- Toggles background music on/off
- Icon morphs with `AnimatePresence` (scale 0 → 1, rotate -90° → 0°)
- Pulse animation when playing: subtle scale 1 → 1.05 → 1 loop every 3s
- Must respect browser autoplay policies (only starts after user gesture)

### 3.2 Floating Particles (Petals)

**Appearance:** Small oval shapes (4-8px), colors `--sage-muted` and `--gold` at 30% opacity  
**Behavior:**
- 15-20 particles floating upward continuously
- Random horizontal drift (sine wave motion)
- Duration: 8-15s per particle cycle
- Staggered start times
- Only visible on dark/green backgrounds (Page 1)
- CSS animation or Framer Motion `animate={{ y: -100, x: [0, 10, -10, 0] }}`

### 3.3 Scroll Indicator

**Appearance:** Downward chevron icon, 24px, `--text-muted`  
**Animation:** Continuous bounce `translateY(0) → translateY(8px)` over 1.5s, ease-in-out, infinite  
**Placement:** Below "SCROLL TO REVEAL" text

---

## 4. PAGE SECTIONS (In Order)

### SECTION 1: Envelope Cover (Entry Gate)

**Purpose:** Dramatic entry point. User must tap to "open" the invitation.

**Layout:**
- Full viewport (`100vw × 100vh`), fixed position, z-index 50
- Background: `--red-envelope` (`#C41E3A`)
- Texture overlay: subtle paper grain texture at 20% opacity (tiling PNG)
- Floral embossing: decorative botanical line art in slightly darker red (`#B91C32`) positioned at corners and edges

**Elements (Centered vertically and horizontally):**

1. **"Tap to Reveal" Text**
   - Font: Cormorant Garamond, 20px, italic
   - Color: `#F5E6D3` (wax cream)
   - Position: Above seal, 24px margin

2. **Wax Seal**
   - Size: 128px × 128px
   - Shape: Circle
   - Background: `--wax-cream` (`#F5E6D3`)
   - Border: 4px solid `--wax-gold`
   - Shadow: `0 4px 15px rgba(0,0,0,0.3), inset 0 2px 4px rgba(0,0,0,0.1)`
   - Content: "T&T" monogram in center
     - Font: Cormorant Garamond, 32px, weight 400
     - Color: `#8B4513` (dark brown)
   - Subtle texture: noise/grain overlay at 10%

3. **"To new beginnings!" Text**
   - Font: Cormorant Garamond, 22px, italic
   - Color: `#F5E6D3`
   - Position: Below seal, 32px margin

**Interaction — Envelope Open Sequence:**

On tap/click:
1. **Seal Break:** Seal scales up to 1.2x, rotates 15°, then cracks (opacity 0, scale 0) over 0.4s
2. **Text Fade:** "Tap to Reveal" fades out (0.2s)
3. **Envelope Split:** 
   - Top flap slides upward and fades (translateY: -100%, opacity 0, 0.6s)
   - Bottom flap slides downward (translateY: 100%, opacity 0, 0.6s)
   - Side flaps peel outward (rotateY ±90°, 0.7s)
4. **Background Transition:** Red envelope fades to cream (`--cream`) over 0.8s
5. **Reveal:** Main content scales from 0.95 to 1, opacity 0 to 1 (0.5s delay)
6. **Audio:** If not already playing, prompt user or auto-play after interaction

**Exit Animation:** `AnimatePresence` with `mode="wait"`. Envelope unmounts after animation completes.

---

### SECTION 2: Couple Introduction + Save the Date

**Background:** `--cream` (`#F5F1E8`)

**Sub-section 2A: Sacred Quote**

**Layout:** Centered, generous padding (`pt-24 pb-16 px-8`)

**Elements:**
1. **Ik Onkar (ੴ) Symbol**
   - Size: 48px
   - Color: `--text-primary`
   - Centered
   - Margin bottom: 24px

2. **Quote Text**
   - Content: *"They alone are called husband and wife, who have one soul in two bodies."*
   - Font: Cormorant Garamond, 18px, italic
   - Color: `--text-muted`
   - Max-width: 300px, centered
   - Line height: 1.6

3. **Attribution**
   - Content: `— Guru Amar Das Ji`
   - Font: Inter, 12px, weight 500
   - Color: `--text-muted`
   - Margin top: 12px

**Sub-section 2B: Couple Names**

**Layout:** Centered, stacked vertically

**Elements:**
1. **Groom Name: "Tanmay"**
   - Font: Cormorant Garamond, 48px, italic
   - Color: `--text-primary`
   - Letter spacing: 0.02em

2. **Parentage**
   - Content: `SON OF MR. & MRS. SHARMA`
   - Font: Inter, 11px, weight 500, uppercase
   - Letter spacing: 0.2em
   - Color: `--text-muted`
   - Margin top: 8px

3. **Ampersand Divider**
   - Content: `&`
   - Font: Cormorant Garamond, 36px, italic
   - Color: `--gold`
   - Margin: 16px 0
   - Decorative lines: 60px width, 1px height, `--gold` at 30% opacity, positioned horizontally on either side of ampersand

4. **Bride Name: "Tanya"**
   - Same styling as groom name

5. **Parentage**
   - Content: `DAUGHTER OF MR. & MRS. SINGH`
   - Same styling as groom parentage

**Sub-section 2C: Scroll to Reveal Indicator**

**Layout:** Centered, margin top 40px

**Elements:**
- Text: `SCROLL TO REVEAL`
- Font: Inter, 10px, uppercase, tracking 0.3em
- Color: `--text-muted`
- Down chevron icon below text (24px)
- Bounce animation on chevron (see Global Components)

**Sub-section 2D: Save the Date**

**Layout:** Centered, padding `py-20 px-6`

**Elements:**
1. **Section Label**
   - Content: `THE DATE`
   - Font: Inter, 10px, uppercase, tracking 0.3em
   - Color: `--text-muted`
   - Centered

2. **Header**
   - Content: `Save the Date`
   - Font: Cormorant Garamond, 42px, italic
   - Color: `--sage-primary`
   - Centered
   - Margin bottom: 16px

3. **Subtext**
   - Content: `Scratch below to reveal our wedding date`
   - Font: Cormorant Garamond, 16px, italic
   - Color: `--text-muted`
   - Centered
   - Margin bottom: 32px

4. **Scratch Cards (3 columns)**
   - Layout: Flex row, gap 12px, centered
   - Each card:
     - Width: 96px, Height: 128px
     - Border-radius: 12px
     - Background (hidden): `--cream-warm`
     - Cover: `--sage-light` with subtle noise texture
     - Label above: `MONTH` / `DAY` / `YEAR` (Inter, 10px, uppercase, tracking 0.2em, `--text-muted`)
     - Revealed text: `May` / `30` / `2026` (Cormorant Garamond, 24px, `--sage-primary`, centered)
   
   **Scratch Interaction:**
   - Canvas-based scratch layer
   - Brush size: 20px radius
   - `globalCompositeOperation = 'destination-out'`
   - Reveal threshold: 50% transparent pixels
   - On reveal: Cover fades out over 0.5s, text fades in
   - Touch and mouse support

---

### SECTION 3: Countdown Timer

**Background:** `--cream` (continuous)

**Layout:** Centered card with subtle background

**Elements:**
1. **Top Decorative Line**
   - 1px line, `--gold` at 40% opacity, width 60%, centered
   - Margin bottom: 32px

2. **Intro Text**
   - Content: `A lifetime of togetherness begins with one sacred step`
   - Font: Cormorant Garamond, 18px, italic
   - Color: `--text-muted`
   - Centered
   - Max-width: 280px

3. **"Wedding" Label**
   - Content: `Wedding`
   - Font: Cormorant Garamond, 32px, italic
   - Color: `--sage-primary`
   - Centered
   - Margin: 16px 0

4. **Countdown Grid**
   - Layout: 4 columns, gap 16px, centered
   - Each unit:
     - Number: Cormorant Garamond, 48px, weight 300, `--text-primary`
     - Label: Inter, 10px, uppercase, tracking 0.2em, `--text-muted`
     - Separator: None between units (natural spacing)
   - Units: DAYS, HOURS, MINS, SECS
   - **Behavior:** Real-time countdown to wedding date (May 30, 2026, 11:00 AM)
   - Numbers update every second with a subtle flip/slide animation (translateY: -10px → 0, opacity 0 → 1, 0.3s)

5. **Bottom Decorative Line**
   - Same as top line

---

### SECTION 4: Our Story

**Background:** `--cream`

**Layout:** Single column, centered content

**Header:**
- Eyebrow: `A GLIMPSE OF OUR JOURNEY` (Inter, 10px, uppercase, tracking 0.3em, `--text-muted`)
- Title: `Our Story` (Cormorant Garamond, 48px, italic, `--sage-primary`)
- Centered, margin bottom: 48px

**Story Cards (Vertical Stack):**

Each story card follows this exact structure:

1. **Tag**
   - Pill shape: `rounded-full`, background `--cream-dark`, padding `px-4 py-1`
   - Text: Inter, 10px, uppercase, tracking 0.15em, `--text-muted`
   - Examples: `HOW IT STARTED`, `FIRST REAL DATE`, `THE PROPOSAL`, `MAKING IT OFFICIAL`

2. **Narrative Text**
   - Font: Cormorant Garamond, 18px, italic
   - Color: `--text-secondary`
   - Centered, max-width: 300px
   - Margin: 16px auto 24px

3. **Polaroid Photo Frame**
   - Background: white
   - Padding: 12px 12px 48px 12px (extra bottom for caption)
   - Shadow: `shadow-card`
   - Rotation: Random slight tilt (-2deg to +2deg)
   - **Hover/Scroll:** Straightens to 0deg (spring animation)
   - **Image area:** Aspect ratio 4:5 or 1:1, background `--cream-warm` while loading
   - **Image:** Object-fit cover, border-radius 4px

4. **Caption**
   - Position: Absolute bottom of polaroid, 16px from bottom
   - Font: Cormorant Garamond, 16px, italic
   - Color: `--text-muted`
   - Centered
   - Examples: `first real date`, `she said yes`, `made it official`

**Story Entries:**

| Tag | Narrative | Caption |
|-----|-----------|---------|
| HOW IT STARTED | Two strangers, one unexpected spark — and suddenly the world felt different. | — |
| FIRST REAL DATE | Coffee turned into dinner, dinner turned into hours — we didn't want the night to end. | first real date |
| THE PROPOSAL | One question, one yes — and everything we'd imagined finally had a date on the calendar. | she said yes |
| MAKING IT OFFICIAL | Somewhere between the inside jokes and late-night calls, we realized this was it. | made it official |

**Animation:**
- Each card enters with `whileInView`
- Initial: `opacity: 0, y: 60, rotate: -2` (or +2 alternating)
- Animate: `opacity: 1, y: 0, rotate: 0`
- Transition: Spring (stiffness: 100, damping: 20)
- Stagger: 0.2s between cards

---

### SECTION 5: The Four Laavan (Anand Karaj Explanation)

**Background:** `--cream`

**Layout:** Centered text block

**Elements:**
1. **Header**
   - Content: `The Four Laavan`
   - Font: Cormorant Garamond, 36px, italic
   - Color: `--sage-primary`
   - Centered

2. **Description**
   - Content: `During Anand Karaj, the couple walks four sacred circles around the Guru Granth Sahib Ji — each round deepening their union with each other and with the Divine.`
   - Font: Cormorant Garamond, 18px, italic
   - Color: `--text-muted`
   - Centered, max-width: 320px
   - Line height: 1.7

**Animation:** Fade in + translateY(20px → 0) on scroll

---

### SECTION 6: Events

**Background:** Alternates between `--cream` and `--cream-dark` subtly, or consistent `--cream`

**Header:**
- Eyebrow: `IN THE CELEBRATION` (Inter, 10px, uppercase, tracking 0.3em, `--text-muted`)
- Title: `Rsvp` (Cormorant Garamond, 48px, italic, `--sage-primary`)
- Subtext: `Kindly respond by May 15, 2026` (Cormorant Garamond, 16px, italic, `--text-muted`)
- Centered, margin bottom: 48px

**Event Cards (Vertical Stack):**

Each event is a full-width card (max-width 430px, centered) with:

1. **Day Header**
   - Content: `DAY 1 · 05/26/2026` (or respective dates)
   - Font: Inter, 11px, uppercase, tracking 0.2em
   - Color: `--text-muted`
   - Centered, margin bottom: 16px

2. **Event Image Card**
   - Border-radius: `rounded-3xl` (24px)
   - Overflow: hidden
   - Shadow: `shadow-float`
   - Aspect ratio: ~3:4 (portrait)
   - **Image:** Full-bleed illustration (from Canva)
   - **Gradient Overlay:** `linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)` at bottom

3. **Event Info (Overlaid on Image Bottom)**
   - Position: Absolute, bottom 0, left 0, right 0, padding 24px
   - Text align: center
   - Event Title: Cormorant Garamond, 42px, white
   - Date Line: Inter, 14px, white/90%, format `Wednesday | 27 | May 2026`
   - Time: Inter, 14px, white/80%, format `5:00 Pm Onwards`
   - Theme: Inter, 12px, white/70%, format `Bing, Indo-Western`
   - Decorative line: 40px wide, 1px, white/50%, centered between date and time

**Event Data:**

| Day | Event | Date | Time | Theme | Illustration Style |
|-----|-------|------|------|-------|-------------------|
| Day 1 | Carnival | May 26 | 6:00 PM - 10:00 PM | — | Colorful carnival/fair scene |
| Day 2 | Sangeet | May 28 | 5:45 PM Onwards | Glitz & Glam, Mystic & Magic | Ballroom dancing, red carpet |
| Day 3 | Reception | May 29 | 5:00 PM Onwards | Bing, Indo-Western | Night scene, couple in western attire |
| Day 4 | Muhurtham | May 30 | 6:11 AM Onwards | South Indian Traditional | Mandap, traditional South Indian wedding |

**Special: Carnival Location Card**
- Below the Carnival image card, add a location card:
  - Background: white, `rounded-2xl`, `shadow-card`
  - Padding: 24px
  - Event subtitle: `WELCOME CELEBRATION · 6:00 PM - 10:00 PM` (Inter, 11px, tracking 0.15em, `--text-muted`)
  - Address: `12341 Wheat Ridge Dr, Rancho Cordova, CA 95742` (Inter, 14px, `--text-primary`)
  - Button: `VIEW ON MAP`
    - Background: `--sage-primary`
    - Text: white, Inter 12px, weight 500, uppercase, tracking 0.1em
    - Padding: 12px 24px
    - Border-radius: `rounded-full`
    - Icon: Map pin (16px, left of text)
    - Shadow: subtle
  - Map Preview: Embedded static Google Maps image below button, `rounded-xl`, height 200px, width 100%

**Animation:**
- Cards enter with `whileInView`
- Initial: `opacity: 0, y: 50`
- Animate: `opacity: 1, y: 0`
- Transition: 0.6s ease-out
- Stagger: 0.15s

---

### SECTION 7: Muhurtham Day Schedule

**Background:** `--cream`

**Header:**
- Eyebrow: `MUHURTHAM DAY SCHEDULE` (Inter, 10px, uppercase, tracking 0.3em, `--text-muted`)
- Title: `May 30, 2026` (Cormorant Garamond, 36px, italic, `--sage-primary`)
- Subtext: `Color theme: Sage Green · All colors welcome` (Cormorant Garamond, 14px, italic, `--text-muted`)
- Centered, margin bottom: 48px

**Timeline Component:**

- Layout: Vertical, centered container (max-width 320px)
- Structure: Left rail with dots + line, right side cards

**Rail (Left):**
- Vertical line: 1px width, `--gold` at 40% opacity, running full height
- Dots: 16px diameter, positioned at each event level
  - Default: Border 2px solid `--sage-muted`, background white
  - Active/Past: Background `--sage-primary`, border `--sage-primary`
  - Some dots alternate color to `--gold` for visual interest

**Event Cards (Right):**
- Background: white/60 with `backdrop-blur-sm`
- Border: 1px solid `--cream-dark`
- Border-radius: `rounded-2xl`
- Padding: 20px
- Margin left: 32px (from dot)
- Content:
  - Time: Inter, 13px, weight 600, `--text-muted`, uppercase, tracking 0.05em
  - Event Name: Cormorant Garamond, 24px, italic, `--sage-primary`

**Schedule Data:**

| Time | Event | Dot Color |
|------|-------|-----------|
| 10:00 AM | Milni & Tea | `--sage-primary` |
| 11:00 AM | Muhurtham | `--gold` |
| 12:00 PM | Lunch | `--sage-primary` |
| 5:00 PM | Vidaai | `--sage-primary` |

**Animation:**
- Line draws from top to bottom as user scrolls (GSAP ScrollTrigger or Framer Motion `useScroll`)
- Dots scale in sequentially (0 → 1.2 → 1) with spring physics
- Cards slide in from right (`x: 30 → 0`) with stagger
- Active event highlights subtly

---

### SECTION 8: RSVP Form

**Background:** `--cream`

**Layout:** Centered, max-width 400px, padding `px-6 py-20`

**Header:**
- Eyebrow: `IN THE CELEBRATION` (already part of Events section flow, or repeated)
- Title: `Rsvp` (Cormorant Garamond, 48px, italic, `--sage-primary`)
- Subtext: `Kindly respond by May 15, 2026` (Cormorant Garamond, 16px, italic, `--text-muted`)

**Form Fields (Vertical Stack, gap 24px):**

1. **Your Full Name**
   - Label: Inter, 11px, uppercase, tracking 0.15em, `--text-muted`, centered
   - Input:
     - Background: white
     - Border: 1px solid `--cream-dark`
     - Border-radius: `rounded-xl` (12px)
     - Padding: 16px
     - Font: Inter, 16px, `--text-primary`
     - Placeholder: `Enter your name` (italic, `--text-muted`)
     - Text align: center
     - Focus: Border color transitions to `--sage-primary`, subtle shadow

2. **Phone / WhatsApp Number**
   - Same label style
   - Input:
     - Same styling as above
     - Placeholder: `+1 (xxx) xxx-xxxx`
     - Type: tel
     - Prefix: `+1` can be pre-filled or placeholder

3. **Number of Guests**
   - Same label style
   - Dropdown/Select:
     - Same container styling as input
     - Default: `2 guests`
     - Options: 1 guest, 2 guests, 3 guests, 4 guests, 5 guests
     - Custom dropdown arrow: ChevronDown icon, `--text-muted`
     - Open state: Dropdown menu with white background, shadow, rounded-xl

4. **Events You Will Join**
   - Same label style
   - Checkbox group (vertical stack, gap 12px):
     - Each row: Checkbox + Label
     - Checkbox:
       - Size: 20px × 20px
       - Border-radius: 4px
       - Border: 2px solid `--cream-dark`
       - Checked: Background `--sage-primary`, Border `--sage-primary`, white checkmark
       - Checkmark: Lucide `Check` icon, 14px, stroke width 2.5
       - Transition: 0.2s ease
     - Label: Inter, 14px, `--text-primary`
     - Events:
       - CARNIVAL
       - SANGEET
       - RECEPTION
       - MUHURTHAM — MAY 30 (with sparkle icon ✦ after text)

5. **Message & Blessings (Optional)**
   - Same label style
   - Textarea:
     - Same container styling
     - Min-height: 120px
     - Placeholder: `Send your heartfelt wishes to the couple...` (italic, `--text-muted`)
     - Resize: vertical only

**Submit Button:**
- Not visible in screenshots but implied
- Style: Full width, `--sage-primary` background, white text, `rounded-full`, padding 16px, Inter 14px uppercase tracking 0.1em
- Hover: Scale 1.02, darker sage
- Loading: Spinner animation
- Success: Checkmark animation + confetti burst + "Thank you for your response!" message

**Form Validation:**
- Name: Required, min 2 characters
- Phone: Required, valid phone format
- Events: At least one required
- Guests: Required

---

### SECTION 9: Closing / Footer

**Background:** `--sage-dark` (`#4A6B4D`) or dark green gradient

**Layout:** Centered, padding `py-16 px-6`

**Elements:**
1. **Khanda Symbol**
   - White, 40px, centered
   - Opacity: 0.9

2. **Closing Text**
   - Content: `Sealed with sacred vows, blessed by two loving families, and guided by Waheguru's grace — we begin our forever with grateful and joyful hearts.`
   - Font: Cormorant Garamond, 18px, italic
   - Color: white/90%
   - Centered, max-width: 300px
   - Line height: 1.7

3. **Invitation Text**
   - Content: `We cannot wait to celebrate this beautiful chapter with you.`
   - Font: Cormorant Garamond, 18px, italic
   - Color: white/80%
   - Centered
   - Margin top: 16px

4. **Couple Names**
   - Content: `Tanmay & Tanya`
   - Font: Cormorant Garamond, 42px, italic
   - Color: white
   - Centered
   - Margin top: 32px

5. **Credit**
   - Content: `MADE WITH ❤️ BY @INVITEVIBES_`
   - Font: Inter, 10px, uppercase, tracking 0.2em
   - Color: white/60%
   - Centered
   - Margin top: 40px

**Animation:**
- Fade in on scroll
- Floating particles (same as hero but white/gold on dark green)

---

## 5. INTERACTIONS & ANIMATIONS SPECIFICATION

### 5.1 Scroll Behavior

- **Type:** Smooth scroll (`scroll-behavior: smooth` or Lenis)
- **Snap:** Optional snap to section centers (not required, but nice)
- **Progress:** Optional thin progress bar at top (2px, `--sage-primary`)

### 5.2 Reveal Patterns

All sections use `whileInView` with `viewport={{ once: true, margin: "-50px" }}`:

| Pattern | Initial | Animate | Transition | Usage |
|---------|---------|---------|------------|-------|
| Fade Up | `opacity: 0, y: 40` | `opacity: 1, y: 0` | 0.6s, ease-out | Text blocks |
| Scale In | `opacity: 0, scale: 0.95` | `opacity: 1, scale: 1` | 0.5s, spring | Cards |
| Slide Right | `opacity: 0, x: -30` | `opacity: 1, x: 0` | 0.5s, ease-out | Timeline items |
| Polaroid | `opacity: 0, y: 60, rotate: ±2` | `opacity: 1, y: 0, rotate: 0` | Spring | Story photos |
| Stagger | — | — | 0.1-0.2s delay | Lists, groups |

### 5.3 Micro-interactions

| Element | Trigger | Animation |
|---------|---------|-----------|
| Buttons | Hover | `scale: 1.02`, shadow increase |
| Buttons | Tap | `scale: 0.98` |
| Checkboxes | Check | Scale bounce 0.8 → 1.1 → 1 |
| Inputs | Focus | Border color transition 0.2s |
| Audio Toggle | Toggle | Icon swap with rotation |
| Event Cards | Hover | Subtle lift `translateY: -4px` |

---

## 6. ASSETS REQUIREMENTS

### 6.1 Images (From Canva — User Provided)

| Asset Name | Dimensions | Format | Transparent BG | Description |
|------------|-----------|--------|----------------|-------------|
| `carnival.png` | 1080×1440 | WebP/PNG | Yes | Colorful carnival scene with rides, lights |
| `sangeet.png` | 1080×1440 | WebP/PNG | Yes | Ballroom, red carpet, dancing couple, "Mystic & Magic" sign |
| `reception.png` | 1080×1440 | WebP/PNG | Yes | Night scene, couple in Indo-western attire, golden archways |
| `muhurtham.png` | 1080×1440 | WebP/PNG | Yes | South Indian wedding mandap, traditional attire |
| `story-1.jpg` | 800×1000 | JPG | No | First real date photo |
| `story-2.jpg` | 800×1000 | JPG | No | Proposal photo |
| `story-3.jpg` | 800×1000 | JPG | No | Making it official photo |
| `story-4.jpg` | 800×1000 | JPG | No | How it started photo |

### 6.2 Icons (Lucide React)

- `Volume2`, `VolumeX` — Audio toggle
- `Check` — Checkbox checked state
- `ChevronDown` — Dropdown arrow, scroll indicator
- `MapPin` — View on map button
- `Sparkles` or custom ✦ — Muhurtham event label

### 6.3 Decorative Assets

| Asset | Type | Usage |
|-------|------|-------|
| `paper-texture.png` | PNG tile | Envelope background overlay |
| `floral-emboss.png` | PNG | Envelope corner decorations |
| `khanda.svg` | SVG | Religious symbol (Page 1 and closing) |
| `ik-onkar.svg` | SVG | Couple intro section |

---

## 7. RESPONSIVE BEHAVIOR

**Primary Target:** Mobile (375px - 430px width)  
**Secondary:** Tablet and Desktop scaling

- Max-width container: 430px centered on larger screens
- Event cards maintain aspect ratio, max-width 430px
- Timeline stays narrow (320px max) even on desktop
- Polaroids max-width 350px on desktop
- Font sizes scale up 10-15% on desktop
- Padding increases horizontally on tablet+ (`px-8` or `px-12`)

---

## 8. TECHNICAL NOTES

### 8.1 Performance
- Use `next/image` with priority loading for above-fold images
- Lazy load story photos and event cards
- Use `will-change: transform` on animated elements
- Canvas scratch cards should be cleaned up on unmount

### 8.2 Accessibility
- All interactive elements must be keyboard accessible
- Checkbox labels properly associated
- Audio toggle has `aria-pressed` state
- Sufficient color contrast (4.5:1 minimum for text)
- Respect `prefers-reduced-motion` (disable floating particles, simplify transitions)

### 8.3 SEO / Meta
- Title: `Tanmay & Tanya | Wedding Invitation`
- Description: `Join us in celebrating our sacred union on May 30, 2026`
- OG Image: Event card composite or couple photo
- Theme color: `#5B7B5E`

---

## 9. VIBE CODING PROMPTS (For AI Agents)

Use these prompts to generate specific sections:

&gt; **Envelope:** "Create a full-screen envelope component with red textured background, wax seal center with T&T monogram. On click, seal cracks and envelope flaps animate open to reveal content underneath. Use Framer Motion AnimatePresence."

&gt; **Scratch Cards:** "Build three canvas-based scratch cards that reveal 'May', '30', '2026'. Green scratch layer, cream background underneath. Reveal at 50% scratch threshold."

&gt; **Timeline:** "Vertical timeline with animated connecting line that draws on scroll. Four events with alternating colored dots. Cards slide in from right."

&gt; **RSVP:** "Wedding RSVP form with centered inputs, sage green checkboxes, guest dropdown, event multi-select. Validation and success confetti animation."

&gt; **Story:** "Polaroid photo gallery with slight random rotations that straighten on scroll. Cormorant Garamond captions. Spring physics."

---

## 10. CHECKLIST FOR COMPLETION

- [ ] Envelope opens on tap with seal break animation
- [ ] Scratch cards reveal date interactively
- [ ] Countdown timer updates in real-time
- [ ] Timeline line draws on scroll
- [ ] All event cards display with Canva illustrations
- [ ] RSVP form validates and submits
- [ ] Audio toggle works globally
- [ ] Floating petals on cover and footer
- [ ] All fonts loaded (Cormorant Garamond, Inter)
- [ ] Responsive centered layout on desktop
- [ ] Smooth scroll behavior throughout