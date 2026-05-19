# Design System — Santiago Avella Portfolio

A living reference for every visual and interaction decision in the site. All values are pulled directly from the codebase as-built.

---

## 1. Foundations

### 1.1 Color

| Token | Value | Usage |
|---|---|---|
| `bg-base` | `#0a0a0a` | Page background, component backgrounds |
| `bg-card` | `rgba(12,12,12,0.97)` | Floating cards (orbital expanded) |
| `bg-hover` | `#141414` | Row hover state |
| `bg-surface` | `rgba(255,255,255,0.02)` | Subtle fills (trait cards) |
| `text-primary` | `#ffffff` | Headings, active states |
| `text-secondary` | `#888` | Body copy, descriptions |
| `text-muted` | `#555` | Labels, dates, metadata |
| `text-ghost` | `#444` / `#333` | Footer, decorative text |
| `text-dim` | `rgba(255,255,255,0.55)` | Nav links (default) |
| `text-dim-2` | `rgba(255,255,255,0.65)` | Connected node buttons |
| `text-dim-3` | `rgba(255,255,255,0.75)` | Contact link body |
| `accent-warm` | `#c8b99a` | Scroll hint line |
| `accent-coral` | `#e8442a` | Zolvo / YC accent hover |
| `accent-teal` | `#14b8a6` | In-progress status, orbital gradient end |
| `accent-blue` | `#3b82f6` | Gradient mid, energy bar start |
| `accent-purple` | `#7c3aed` | Orbital orb gradient start, energy bar end |
| `border-base` | `rgba(255,255,255,0.07)` | All section dividers, default borders |
| `border-elevated` | `rgba(255,255,255,0.12)` | Elevated surfaces (orbital card) |
| `border-bright` | `rgba(255,255,255,0.1)` | About photo offset decoration |

**Accent gradient** (orbital orb + energy bar):
```
#7c3aed → #3b82f6 → #14b8a6
```

**Nav background:**
```
rgba(10,10,10,0.85) + backdropFilter: blur(12px)
```

---

### 1.2 Typography

Two typefaces only. No exceptions.

| Role | Family | Weights |
|---|---|---|
| Display / Body | **Manrope** | 300, 400, 500, 600, 700, 800 |
| Mono / Labels | **JetBrains Mono** | 300, 400 |

#### Display scale

| Name | Size | Weight | Tracking | Line-height | Used in |
|---|---|---|---|---|---|
| `display-hero` | `clamp(3.2rem, 9.5vw, 10rem)` | 800 | `-0.02em` | `0.92` | Hero h1 |
| `display-xl` | `clamp(2.2rem, 6vw, 5rem)` | 800 | `-0.03em` | `0.95` | Contact h2 |
| `display-lg` | `clamp(1.6rem, 4vw, 2.6rem)` | 800 | `-0.02em` | `1.1` | About h2 |
| `display-md` | `clamp(1.4rem, 3vw, 2.2rem)` | 700 | `-0.02em` | — | Work company name |
| `display-sm` | `1.15rem` | 700 | `-0.01em` | — | Zolvo module titles |
| `display-xs` | `0.92rem` | 700 | `-0.01em` | — | Orbital card h3 |

#### Body scale

| Name | Size | Weight | Line-height | Used in |
|---|---|---|---|---|
| `body-lg` | `0.95rem` | 400 | — | Contact link display |
| `body-md` | `0.92rem` | 400 | `1.8` | About paragraphs |
| `body-base` | `0.85rem` | 500 | — | Trait card values |
| `body-sm` | `0.75rem` | 400 | `1.65` | Orbital expanded card body |

#### Mono / label scale

All mono labels are `JetBrains Mono`. Most are `text-transform: uppercase` with tight letter-spacing.

| Name | Size | Weight | Tracking | Uppercase | Used in |
|---|---|---|---|---|---|
| `label-lg` | `0.78rem` | 300 | `0.02em` | No | Nav links, hero meta |
| `label-md` | `0.72rem` | 300 | — | No | Work dates, role |
| `label-base` | `0.68rem` | 400 | `0.1em` | Yes | Section headers ("about", "contact") |
| `label-sm` | `0.65rem` | 400 | `0.08em` | Yes | Tags, contact labels, Zolvo meta |
| `label-xs` | `0.62rem` | 400–600 | `0.06–0.08em` | Yes | Orbital node labels, footer |
| `label-xxs` | `0.58–0.6rem` | 400 | `0.08em` | Yes | Trait card labels, orbital card meta |
| `label-micro` | `0.55rem` | 400 | `0.08em` | Yes | Status badges |

---

### 1.3 Spacing

| Token | Value | Usage |
|---|---|---|
| `space-xs` | `0.3rem` | Tight gaps (trait label margin) |
| `space-sm` | `0.4–0.5rem` | Icon gaps, tag padding vertical |
| `space-md` | `0.75rem` | Card internal padding, small gaps |
| `space-lg` | `1rem` | Card padding |
| `space-xl` | `1.5rem` | Section label → heading gap |
| `space-2xl` | `2rem` | Page horizontal padding (left/right) |
| `space-3xl` | `2.5rem` | Between h2 and body, hero padding-bottom |
| `space-4xl` | `3rem` | Contact h2 → links gap |
| `space-section` | `5–6rem` | Section vertical padding |
| `space-hero-top` | `7rem` | Hero top padding (clears nav) |

**Page horizontal padding:** `2rem` on all sections.

**Content max-widths:**
- Body copy: `480px`
- Contact links: `640px`
- Contact heading: `700px`
- About photo: `380px`

---

### 1.4 Border & Radius

| Token | Value | Usage |
|---|---|---|
| `border-hairline` | `1px solid rgba(255,255,255,0.07)` | Section dividers, default component borders |
| `border-elevated` | `1px solid rgba(255,255,255,0.12)` | Orbital expanded card |
| `border-bright` | `1px solid rgba(255,255,255,0.1)` | About photo decoration |
| `radius-none` | `0` | — |
| `radius-sm` | `2px` | Tags, chips, status badges, connected buttons |
| `radius-md` | `4px` | Cards, images, trait boxes |
| `radius-lg` | `8px` | Orbital expanded card |
| `radius-full` | `50%` | Cursor, orbital nodes, orb |

---

### 1.5 Animation

**Easing curve** (used everywhere for entrances):
```js
[0.16, 1, 0.3, 1]  // custom spring — fast out, overshoots slightly
```

**Standard durations:**
| Purpose | Duration |
|---|---|
| Fade in | `0.4s` |
| Slide up (body) | `0.6–0.7s` |
| Slide up (headings) | `0.8–0.9s` |
| Hover color | `0.2s` |
| Hover background | `0.3s` |
| Node expand | `0.25s` |
| Card entrance | `0.3s cubic-bezier(0.16,1,0.3,1)` |

**Stagger:** `0.07–0.1s` between list items.

**Scroll trigger:** `useInView` with `once: true, margin: '-80px'` (most sections), `'-100px'` (About).

**Keyframes:**
```css
@keyframes orbitPulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.1)} }
@keyframes cardIn {
  from { opacity:0; transform:translateX(-50%) translateY(-8px) }
  to   { opacity:1; transform:translateX(-50%) translateY(0) }
}
```

---

## 2. Components

### 2.1 Section Label
A mono uppercase eyebrow that marks every major section.

```
font: JetBrains Mono, 0.68rem, uppercase, tracking 0.1em
color: #555
margin-bottom: 1.5rem
```

Used before every h2: "about", "contact", "experience & skills", "context", "what i built".

---

### 2.2 Tag / Chip
Small bordered label for metadata (categories, tools, YC, etc).

```
font: JetBrains Mono, 0.65rem, uppercase, tracking 0.08em
color: #555
border: 1px solid rgba(255,255,255,0.07)
padding: 0.2rem 0.6rem
border-radius: 2px
background: transparent
```

---

### 2.3 Status Badge
Used in the orbital timeline card. Color-coded by state.

| State | Color | Background | Border |
|---|---|---|---|
| `completed` | `#fff` | `rgba(255,255,255,0.1)` | `1px solid #fff` |
| `in-progress` | `#14b8a6` | `rgba(20,184,166,0.1)` | `1px solid #14b8a6` |
| `pending` | `#555` | `transparent` | `1px solid #555` |

```
font: JetBrains Mono, 0.55rem, uppercase, tracking 0.08em
padding: 0.2rem 0.5rem
border-radius: 2px
```

---

### 2.4 Row Divider
Every list row and section boundary uses the same rule:
```
border-bottom: 1px solid rgba(255,255,255,0.07)
```
Sections also use `border-top`. Never use a heavier or differently-colored divider.

---

### 2.5 Work Row
Full-width horizontal row. Date (mono, left) → Company name (display) → Tag (chip) → Role (mono, far right).

- Default background: `#0a0a0a`
- Hover: `#141414` (neutral) or `rgba(232,68,42,0.07)` (Zolvo accent)
- Padding: `2rem`
- Clickable rows: `cursor: none` (custom cursor handles it)

---

### 2.6 Floating Card (Orbital Expanded)
Appears above an orbital node on click.

```
width: 240px
background: rgba(12,12,12,0.97)
border: 1px solid rgba(255,255,255,0.12)
border-radius: 8px
padding: 1rem
backdrop-filter: blur(16px)
box-shadow: 0 16px 48px rgba(0,0,0,0.7)
animation: cardIn 0.3s
```

---

### 2.7 Energy Bar
Linear progress bar inside orbital cards.

```
height: 3px
track: rgba(255,255,255,0.07)
fill: linear-gradient(90deg, #3b82f6, #7c3aed)
border-radius: 99px
```

---

### 2.8 Photography Card (Polaroid)
```
background: #111
padding: 10px 10px 36px  (extra bottom for caption)
box-shadow: 0 8px 40px rgba(0,0,0,0.6), 0 2px 8px rgba(0,0,0,0.4)
image: 100% wide, height 180px, object-fit: cover
caption: JetBrains Mono, 0.6rem, #555, uppercase, tracking 0.06em
```
Hover: `scale(1.06), rotate(0deg)` — removes the random tilt on focus.

---

### 2.9 Nav
```
position: fixed, top 0, z-index 100
padding: 1.4rem 2rem
background: rgba(10,10,10,0.85)
border-bottom: 1px solid rgba(255,255,255,0.07)
backdrop-filter: blur(12px)
```
- Logo: Manrope 0.9rem, weight 500, tracking 0.05em
- Links: JetBrains Mono 0.78rem, `rgba(255,255,255,0.55)` → `#fff` on hover, `transition: color 0.2s`
- Mobile menu: full-screen `#0a0a0a` overlay, links at `clamp(1.4rem, 6vw, 2rem)`

---

### 2.10 Custom Cursor
Two-layer system:
- **Dot:** 8px circle, `#fff`, `z-index: 9999`
- **Ring:** 32px circle, `border: 1px solid rgba(255,255,255,0.5)`, `z-index: 9998`
- On hover of `a` / `button`: ring expands to 52px, border color → `#e8442a`
- Ring follows with `0.1` lerp factor (smooth lag)
- Hidden on mobile (`max-width: 768px`)

---

### 2.11 Trait Card (About section)
```
border: 1px solid rgba(255,255,255,0.07)
border-radius: 4px
padding: 0.75rem 1rem
background: rgba(255,255,255,0.02)
label: JetBrains Mono 0.58rem, #555, uppercase, tracking 0.08em
value: Manrope 0.85rem, weight 500
```

---

## 3. Layout

### 3.1 Grid
A decorative 5-column grid overlay runs full-page (fixed, `pointer-events: none`, `z-index: 0`):
```
border-right: 1px solid rgba(255,255,255,0.07)  (each column)
border-left:  1px solid rgba(255,255,255,0.07)  (first column only)
```

### 3.2 Section structure
Every section:
- `position: relative; z-index: 1` (sits above grid)
- `border-top: 1px solid rgba(255,255,255,0.07)`
- Horizontal padding: `2rem`

### 3.3 Z-index stack
| Layer | z-index |
|---|---|
| Background grid | `0` |
| Content sections | `1` |
| Orbital nodes (max) | `150` |
| Orbital expanded card | `200` |
| Nav | `100` |
| Mobile menu | `99` |
| Cursor ring | `9998` |
| Cursor dot | `9999` |

---

## 4. Tone & Voice

- **Section labels:** all lowercase mono ("about", "contact", "experience & skills")
- **Headings:** sentence case, punchy, personal ("An optimist who finds order in chaos.")
- **Body copy:** first-person, direct, no fluff
- **Footer:** `© 2026 Santiago Avella — Designed & built with vibe.`

---

## 5. What Not To Do

- ❌ No font other than Manrope (body) or JetBrains Mono (labels/code)
- ❌ No border radius above `8px`
- ❌ No colored backgrounds on sections — dark only (`#0a0a0a`, `#111`, `rgba(12,12,12,…)`)
- ❌ No drop shadows except on floating cards and photography cards
- ❌ No colored text outside the defined accent palette
- ❌ No borders heavier than 1px or brighter than `rgba(255,255,255,0.12)`
- ❌ No animations faster than `0.2s` or longer than `0.9s`
- ❌ Don't mix `cursor: pointer` — all interactive elements use `cursor: none` on desktop
