import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import fotoPersonal from '../assets/foto-personal.jpeg'
import MiniCanvas from '../components/MiniCanvas'
import {
  PageTitle, PrincipleCard, ResumeEntry,
  AwardCard, StickyNote, PhotoPrint,
} from '../components/CanvasCards'
import { PAGE, FIRST_MODULE_Y, labelYAfter, moduleYAfterLabel, pageInitialView } from '../lib/layout'

/* About, uses the shared design-system tokens for spacing. */
const PCARD_W = (PAGE.W - PAGE.COL_GAP * 2) / 3
const EDU_H = 120   // resume row, no bullets
const EXP_H = 280   // resume row with 3 bullets
const P_H = 200
const SKILLS_H = 260
const AWARD_H = 130
const STICKY_H = 200
const CONF_H = 230

// Snapshots — a draggable photo band right after the hero. Each card is a
// FIXED height (cover-cropped) so the layout below never overlaps them.
const SNAP_H      = 300
const SNAP_LABEL  = FIRST_MODULE_Y
const SNAP_ROW    = moduleYAfterLabel(SNAP_LABEL)

const P_Y         = labelYAfter(SNAP_ROW + SNAP_H)
const EDU_LABEL   = labelYAfter(P_Y + P_H)
const EDU_ROW     = moduleYAfterLabel(EDU_LABEL)
const EXP_LABEL   = labelYAfter(EDU_ROW + EDU_H)
const EXP_ROW     = moduleYAfterLabel(EXP_LABEL)
const EXP_COUNT   = 5
const EXP_END     = EXP_ROW + (EXP_H + PAGE.ROW_GAP) * (EXP_COUNT - 1) + EXP_H

// Skills
const SKILLS_LABEL = labelYAfter(EXP_END)
const SKILLS_ROW   = moduleYAfterLabel(SKILLS_LABEL)

// Awards & Recognition, three sub-sections inside one zone
const AWARDS_LABEL = labelYAfter(SKILLS_ROW + SKILLS_H)
const AWARDS_ROW   = moduleYAfterLabel(AWARDS_LABEL)
const TEST_LABEL   = labelYAfter(AWARDS_ROW + AWARD_H)
const TEST_ROW     = moduleYAfterLabel(TEST_LABEL)
const CONF_LABEL   = labelYAfter(TEST_ROW + STICKY_H)
const CONF_ROW     = moduleYAfterLabel(CONF_LABEL)

// Hobbies, a row of photo prints + a sticky describing what I love
const HOBBY_H       = 240
const HOBBIES_LABEL = labelYAfter(CONF_ROW + CONF_H)
const HOBBIES_ROW   = moduleYAfterLabel(HOBBIES_LABEL)

const AWARD_W      = (PAGE.W - PAGE.COL_GAP * 3) / 4        // 4 awards
const QUARTER_W    = (PAGE.W - PAGE.COL_GAP * 3) / 4        // 4 stickies / 4 conf prints
const FIFTH_W      = (PAGE.W - PAGE.COL_GAP * 4) / 5        // 5 hobby prints

const OBJECTS = [
  // Row 1, Hero
  { id: 'title', type: 'title', x: PAGE.X, y: PAGE.TITLE_Y, w: 880, h: PAGE.TITLE_H,
    data: {
      kicker: '# about me',
      title: 'Hi, I’m Santiago.',
      blurb: 'Product designer with Colombian roots, based in San Francisco and US citizen (no visa sponsorship needed). Bilingual in English and Spanish, with 3 years of experience turning complex systems into things that feel obvious.',
      blurbWidth: 820,
    } },
  // Bilingual badge — right of the title to signal languages at a glance.
  { id: 'bilingual', type: 'bilingual', x: PAGE.X + 940, y: PAGE.TITLE_Y + 24, w: 264, h: 108,
    data: {
      languages: [
        { flag: '🇺🇸', label: 'English', note: 'Native' },
        { flag: '🇨🇴', label: 'Spanish', note: 'Native' },
      ],
    } },

  // Snapshots — a draggable photo band (swap these for real photos).
  { id: 'sec-snaps', type: 'section', x: PAGE.X, y: SNAP_LABEL, w: 600, h: PAGE.LABEL_H,
    data: { kicker: '#', title: 'A few snapshots' } },
  { id: 'snap-1', type: 'snapshot', x: PAGE.X,                                     y: SNAP_ROW,      w: QUARTER_W, h: SNAP_H, draggable: true,
    data: { src: fotoPersonal, caption: 'that’s me', rotate: -3 } },
  { id: 'snap-2', type: 'snapshot', x: PAGE.X + (QUARTER_W + PAGE.COL_GAP),        y: SNAP_ROW + 12, w: QUARTER_W, h: SNAP_H, draggable: true,
    data: { src: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=600&q=80', caption: 'chasing light', rotate: 2 } },
  { id: 'snap-3', type: 'snapshot', x: PAGE.X + (QUARTER_W + PAGE.COL_GAP) * 2,    y: SNAP_ROW,      w: QUARTER_W, h: SNAP_H, draggable: true,
    data: { src: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?w=600&q=80', caption: 'on the road', rotate: -2 } },
  { id: 'snap-4', type: 'photo-teaser', x: PAGE.X + (QUARTER_W + PAGE.COL_GAP) * 3,    y: SNAP_ROW + 12, w: QUARTER_W, h: SNAP_H,
    data: { src: 'https://images.unsplash.com/photo-1452780212940-6f5c0d14d848?w=600&q=80',
      caption: 'I love photography', cta: 'Check my photography', to: '/photography', rotate: 3 } },

  // Row 2, Three principle cards
  { id: 'p-1', type: 'principle', x: PAGE.X, y: P_Y, w: PCARD_W, h: P_H,
    data: { n: '01', title: 'Shipping over showing',
      body: 'Real impact comes from the version that ships, not the version that wins the dribble.' } },
  { id: 'p-2', type: 'principle', x: PAGE.X + PCARD_W + PAGE.COL_GAP, y: P_Y, w: PCARD_W, h: P_H,
    data: { n: '02', title: 'Systems over screens',
      body: 'Great UI is rarely about a screen, it’s about the system underneath. I design the data model first.' } },
  { id: 'p-3', type: 'principle', x: PAGE.X + (PCARD_W + PAGE.COL_GAP) * 2, y: P_Y, w: PCARD_W, h: P_H,
    data: { n: '03', title: 'Defensible decisions',
      body: 'Every call should survive a 30-second "why" from engineering or PM. If it can’t, it isn’t ready.' } },

  // Row 3, Education
  { id: 'sec-edu', type: 'section', x: PAGE.X, y: EDU_LABEL, w: 400, h: PAGE.LABEL_H,
    data: { kicker: '#', title: 'Education' } },
  { id: 'edu-scad', type: 'resume', x: PAGE.X, y: EDU_ROW, w: PAGE.W, h: EDU_H,
    data: {
      logo: 'scad',
      role: 'B.F.A in User Experience Design',
      company: 'Savannah College of Art and Design',
      dates: '2020-2024',
      location: 'Savannah, GA',
    } },

  // Row 4, Experience
  { id: 'sec-exp', type: 'section', x: PAGE.X, y: EXP_LABEL, w: 400, h: PAGE.LABEL_H,
    data: { kicker: '#', title: 'Experience' } },
  { id: 'exp-1', type: 'resume', x: PAGE.X, y: EXP_ROW, w: PAGE.W, h: EXP_H,
    data: {
      logo: 'zolvo',
      role: 'Founding Product Designer (YC P26)',
      company: 'Zolvo',
      dates: 'Mar 2026-Present',
      location: 'San Francisco, CA',
      bullets: [
        'Designed full product experience from 0→1, from landing page to core ops platform, for a Y Combinator startup',
        'Led customer discovery with commercial lenders to define product direction and GTM strategy',
        'Shipped 5 core product modules in under 8 weeks in a high-velocity, ambiguous environment',
      ],
    } },
  { id: 'exp-2', type: 'resume', x: PAGE.X, y: EXP_ROW + (EXP_H + PAGE.ROW_GAP), w: PAGE.W, h: EXP_H,
    data: {
      logo: 'hubspot',
      role: 'Product Designer',
      company: 'HubSpot',
      dates: 'Jan 2025-Dec 2025',
      bullets: [
        'Led end-to-end redesign of high-traffic web experiences serving 7M+ monthly visitors',
        'Executed the 2025 rebrand transition across blog, resources, and conversion surfaces',
        'Presented design decisions to 20+ stakeholders to drive alignment and ship fast',
      ],
    } },
  { id: 'exp-3', type: 'resume', x: PAGE.X, y: EXP_ROW + (EXP_H + PAGE.ROW_GAP) * 2, w: PAGE.W, h: EXP_H,
    data: {
      logo: 'thinkerface',
      role: 'Lead Product Designer',
      company: 'Thinkerface UX Agency',
      dates: 'Jun 2023-Dec 2024',
      location: 'Miami, FL',
      bullets: [
        'Led UX/UI projects for 10+ clients across the full design lifecycle from concept to delivery',
        'Translated business goals into user-centered solutions that improved usability and conversions',
        'Managed and mentored a design team, owning project timelines and client relationships',
      ],
    } },
  { id: 'exp-4', type: 'resume', x: PAGE.X, y: EXP_ROW + (EXP_H + PAGE.ROW_GAP) * 3, w: PAGE.W, h: EXP_H,
    data: {
      logo: 'captura',
      role: 'CEO & Founder',
      company: 'Captura tu mundo',
      dates: 'Jun 2020-May 2023',
      bullets: [
        'Founded and grew a global photography community from 0 to 226K followers organically across 40 countries',
        'Secured brand partnerships with Adobe and Wacom through community credibility and reach',
        'Built and shipped a mobile-first contest platform, hosted 25+ contests with 15,000+ submissions',
      ],
    } },
  { id: 'exp-5', type: 'resume', x: PAGE.X, y: EXP_ROW + (EXP_H + PAGE.ROW_GAP) * 4, w: PAGE.W, h: EXP_H,
    data: {
      logo: 'scad',
      role: 'Brand Ambassador — Latin America',
      company: 'Savannah College of Art and Design',
      dates: 'Feb 2022-Nov 2022',
      location: 'Savannah, GA',
      bullets: [
        'Produced 10+ articles on students, alumni and faculty for LinkedIn',
        'Helped communicate the SCAD brand identity in Latin American countries',
      ],
    } },

  // ─── Skills ───
  { id: 'sec-skills', type: 'section', x: PAGE.X, y: SKILLS_LABEL, w: 400, h: PAGE.LABEL_H,
    data: { kicker: '#', title: 'Skills' } },
  { id: 'skills', type: 'skills', x: PAGE.X, y: SKILLS_ROW, w: PAGE.W, h: SKILLS_H,
    data: {
      groups: [
        { label: 'Design tools', items: ['Figma', 'Sketch', 'Adobe Suite', 'Adobe XD'] },
        { label: 'AI · code', items: ['Claude Code', 'Cursor', 'Codex', 'HTML', 'CSS'] },
        { label: 'Languages', items: ['English (native)', 'Spanish (native)'] },
        { label: 'Strengths', items: ['0→1 Development', 'GTM Strategy', 'UX Research', 'Design Systems', 'Communication'] },
      ],
    } },

  // ─── Row 5, Awards & Recognition ───
  // Sub-section A: Awards
  { id: 'sec-awards', type: 'section', x: PAGE.X, y: AWARDS_LABEL, w: 700, h: PAGE.LABEL_H,
    data: { kicker: '#', title: 'Awards & Recognition' } },
  { id: 'award-1', type: 'award', x: PAGE.X,                                       y: AWARDS_ROW, w: AWARD_W, h: AWARD_H,
    data: { icon: 'trophy', title: '2× Red Dot Design Awards', org: 'Red Dot', year: '2024 · 2025', rotate: -2 } },
  { id: 'award-2', type: 'award', x: PAGE.X + AWARD_W + PAGE.COL_GAP,              y: AWARDS_ROW, w: AWARD_W, h: AWARD_H,
    data: { icon: 'award', title: '27× Indigo Design Awards', org: 'Discovery of the Year', year: 'multiple', rotate: 1 } },
  { id: 'award-3', type: 'award', x: PAGE.X + (AWARD_W + PAGE.COL_GAP) * 2,        y: AWARDS_ROW, w: AWARD_W, h: AWARD_H,
    data: { icon: 'star', title: '2× European Product Design Awards', org: 'European Design', year: 'multiple', rotate: -1 } },
  { id: 'award-4', type: 'award', x: PAGE.X + (AWARD_W + PAGE.COL_GAP) * 3,        y: AWARDS_ROW, w: AWARD_W, h: AWARD_H,
    data: { icon: 'trophy', title: 'International Design Award', org: 'IDA', year: 'multiple', rotate: 2 } },

  // Sub-section B: Words from people
  { id: 'sec-test', type: 'section', x: PAGE.X, y: TEST_LABEL, w: 700, h: PAGE.LABEL_H,
    data: { kicker: '#', title: 'Words from teammates' } },
  { id: 'q-1', type: 'sticky', x: PAGE.X,                                          y: TEST_ROW,      w: QUARTER_W, h: STICKY_H, draggable: true,
    data: { text: '"Santi turns ambiguity into shipped product faster than anyone I\'ve worked with."\nMaria, PM at Zolvo',
      color: 'var(--sticky-blue)', rotate: -3, tall: true } },
  { id: 'q-2', type: 'sticky', x: PAGE.X + (QUARTER_W + PAGE.COL_GAP),             y: TEST_ROW + 14, w: QUARTER_W, h: STICKY_H, draggable: true,
    data: { text: '"Rare designer, thinks like an engineer, ships like a founder."\nDavid, Eng Lead',
      color: 'var(--sticky-pink)', rotate: 2, tall: true } },
  { id: 'q-3', type: 'sticky', x: PAGE.X + (QUARTER_W + PAGE.COL_GAP) * 2,         y: TEST_ROW,      w: QUARTER_W, h: STICKY_H, draggable: true,
    data: { text: '"Calm under pressure, surgical feedback. The teammate I always want."\nAna, Director of Design',
      color: 'var(--sticky-mint)', rotate: -2, tall: true } },
  { id: 'q-4', type: 'sticky', x: PAGE.X + (QUARTER_W + PAGE.COL_GAP) * 3,         y: TEST_ROW + 14, w: QUARTER_W, h: STICKY_H, draggable: true,
    data: { text: '"Designed our entire onboarding pro-bono. Same care as for a paying client."\nDiana, Volunteer org lead',
      color: 'var(--sticky-yellow)', rotate: 3, tall: true } },

  // Sub-section C: Conference talks
  { id: 'sec-conf', type: 'section', x: PAGE.X, y: CONF_LABEL, w: 700, h: PAGE.LABEL_H,
    data: { kicker: '#', title: 'Places I’ve spoken at' } },
  { id: 'conf-1', type: 'photoprint', x: PAGE.X,                                  y: CONF_ROW,      w: QUARTER_W, h: CONF_H, draggable: true,
    data: { src: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600&q=80', caption: 'SCAD Design Week · 2025', rotate: -3 } },
  { id: 'conf-2', type: 'photoprint', x: PAGE.X + (QUARTER_W + PAGE.COL_GAP),     y: CONF_ROW + 14, w: QUARTER_W, h: CONF_H, draggable: true,
    data: { src: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&q=80', caption: 'LATAM Product Day · 2024', rotate: 2 } },
  { id: 'conf-3', type: 'photoprint', x: PAGE.X + (QUARTER_W + PAGE.COL_GAP) * 2, y: CONF_ROW,      w: QUARTER_W, h: CONF_H, draggable: true,
    data: { src: 'https://images.unsplash.com/photo-1559223607-a43c990c692c?w=600&q=80', caption: 'YC AI panel · 2026', rotate: -2 } },
  { id: 'conf-4', type: 'photoprint', x: PAGE.X + (QUARTER_W + PAGE.COL_GAP) * 3, y: CONF_ROW + 14, w: QUARTER_W, h: CONF_H, draggable: true,
    data: { src: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&q=80', caption: 'AIGA · Atlanta · 2025', rotate: 3 } },

  // ─── Row 6, Hobbies & loves ───
  { id: 'sec-hobbies', type: 'section', x: PAGE.X, y: HOBBIES_LABEL, w: 700, h: PAGE.LABEL_H,
    data: { kicker: '#', title: 'Off the clock' } },
  { id: 'hobby-1', type: 'photoprint', x: PAGE.X,                                       y: HOBBIES_ROW,      w: FIFTH_W, h: HOBBY_H, draggable: true,
    data: { src: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=600&q=80', caption: 'guitar, my reset button', rotate: -3 } },
  { id: 'hobby-2', type: 'photoprint', x: PAGE.X + (FIFTH_W + PAGE.COL_GAP),            y: HOBBIES_ROW + 12, w: FIFTH_W, h: HOBBY_H, draggable: true,
    data: { src: 'https://images.unsplash.com/photo-1504707748692-419802cf939d?w=600&q=80', caption: 'F1 sundays · tifosi', rotate: 2 } },
  { id: 'hobby-3', type: 'photoprint', x: PAGE.X + (FIFTH_W + PAGE.COL_GAP) * 2,        y: HOBBIES_ROW,      w: FIFTH_W, h: HOBBY_H, draggable: true,
    data: { src: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&q=80', caption: 'flying somewhere new', rotate: -2 } },
  { id: 'hobby-4', type: 'photoprint', x: PAGE.X + (FIFTH_W + PAGE.COL_GAP) * 3,        y: HOBBIES_ROW + 12, w: FIFTH_W, h: HOBBY_H, draggable: true,
    data: { src: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80', caption: 'coffee shop hopping', rotate: 3 } },
  { id: 'hobby-5', type: 'photoprint', x: PAGE.X + (FIFTH_W + PAGE.COL_GAP) * 4,        y: HOBBIES_ROW,      w: FIFTH_W, h: HOBBY_H, draggable: true,
    data: { src: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=600&q=80', caption: 'film cameras · always', rotate: -1 } },
]

function SectionLabel({ data }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', height: '100%', paddingBottom: 4 }}>
      <h2 style={{
        fontFamily: 'var(--font-display)', fontWeight: 800,
        fontSize: '1.7rem', letterSpacing: '-0.02em',
        color: 'var(--ink)', lineHeight: 1,
      }}>
        {data.title}
      </h2>
    </div>
  )
}

function SkillsCard({ data }) {
  return (
    <div style={{
      width: '100%', height: '100%',
      background: 'var(--surface)',
      border: 'var(--border-card)',
      borderRadius: 'var(--radius)',
      boxShadow: 'var(--shadow-card)',
      padding: '1.4rem 1.6rem',
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '1.4rem 2rem',
      alignContent: 'start',
    }}>
      {data.groups.map((g) => (
        <div key={g.label}>
          <p style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.58rem',
            color: 'var(--ink-faint)', letterSpacing: '0.12em',
            textTransform: 'uppercase', marginBottom: 10,
          }}>
            {g.label}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {g.items.map((it) => (
              <span key={it} style={{
                display: 'inline-block',
                padding: '5px 11px',
                background: 'var(--canvas)',
                color: 'var(--ink)',
                border: '1px solid var(--line)',
                borderRadius: 'var(--radius-pill)',
                fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 500,
                lineHeight: 1.2,
              }}>
                {it}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function BilingualCard({ data }) {
  return (
    <div style={{
      width: '100%', height: '100%',
      background: 'var(--surface)',
      border: 'var(--border-card)',
      borderRadius: 'var(--radius)',
      boxShadow: 'var(--shadow-card)',
      padding: '0.95rem 1.1rem',
      display: 'flex', flexDirection: 'column', gap: 8,
    }}>
      <p style={{
        fontFamily: 'var(--font-mono)', fontSize: '0.55rem',
        color: 'var(--ink-faint)', letterSpacing: '0.14em',
        textTransform: 'uppercase',
      }}>
        Bilingual
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {data.languages.map((l) => (
          <div key={l.label} style={{
            display: 'flex', alignItems: 'center', gap: 10,
          }}>
            <span style={{ fontSize: '1.4rem', lineHeight: 1 }}>{l.flag}</span>
            <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
              <span style={{
                fontFamily: 'var(--font-display)', fontWeight: 700,
                fontSize: '0.95rem', color: 'var(--ink)', lineHeight: 1.1,
              }}>
                {l.label}
              </span>
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.56rem',
                color: 'var(--ink-faint)', letterSpacing: '0.08em',
                textTransform: 'uppercase', marginTop: 1,
              }}>
                {l.note}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function Snapshot({ data }) {
  return (
    <div style={{
      width: '100%', height: SNAP_H, boxSizing: 'border-box',
      background: '#FAF8F2', padding: '8px 8px 20px',
      boxShadow: '0 12px 28px rgba(0,0,0,0.18)',
      transform: `rotate(${data.rotate || 0}deg)`,
      display: 'flex', flexDirection: 'column',
    }}>
      <div style={{ flex: 1, overflow: 'hidden', background: '#222', minHeight: 0 }}>
        <img src={data.src} alt={data.caption} draggable={false} loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      </div>
      <p style={{
        textAlign: 'center', marginTop: 6,
        fontFamily: 'var(--font-mono)', fontSize: '0.52rem',
        color: '#5a5a52', letterSpacing: '0.08em', textTransform: 'uppercase',
      }}>
        {data.caption}
      </p>
    </div>
  )
}

function PhotographyTeaser({ data }) {
  const navigate = useNavigate()
  const [hover, setHover] = useState(false)
  return (
    <button
      onClick={(e) => { e.stopPropagation(); navigate(data.to) }}
      onPointerDown={(e) => e.stopPropagation()}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      title={data.cta}
      style={{
        width: '100%', height: SNAP_H, boxSizing: 'border-box', cursor: 'none', border: 'none',
        background: '#FAF8F2', padding: '8px 8px 12px',
        boxShadow: hover ? '0 22px 40px rgba(0,0,0,0.28)' : '0 12px 28px rgba(0,0,0,0.18)',
        transform: `rotate(${data.rotate || 0}deg) ${hover ? 'translateY(-3px)' : ''}`,
        transition: 'transform 0.2s var(--ease), box-shadow 0.2s',
        display: 'flex', flexDirection: 'column',
      }}
    >
      <div style={{ flex: 1, overflow: 'hidden', background: '#222', position: 'relative', minHeight: 0 }}>
        <img src={data.src} alt={data.caption} draggable={false} loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        <span style={{
          position: 'absolute', left: 8, top: 8,
          background: 'rgba(0,0,0,0.55)', color: '#fff',
          fontFamily: 'var(--font-note)', fontSize: '1rem',
          padding: '3px 9px', borderRadius: 4,
        }}>
          {data.caption}
        </span>
      </div>
      <span style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
        marginTop: 8, padding: '0.5rem',
        background: hover ? 'var(--accent)' : 'var(--ink)', color: '#fff',
        borderRadius: 'var(--radius-pill)',
        fontFamily: 'var(--font-mono)', fontSize: '0.62rem', fontWeight: 600,
        transition: 'background 0.18s',
      }}>
        {data.cta} →
      </span>
    </button>
  )
}

function renderObject(obj) {
  switch (obj.type) {
    case 'title':        return <PageTitle data={obj.data} />
    case 'principle':    return <PrincipleCard data={obj.data} />
    case 'section':      return <SectionLabel data={obj.data} />
    case 'resume':       return <ResumeEntry data={obj.data} />
    case 'skills':       return <SkillsCard data={obj.data} />
    case 'award':        return <AwardCard data={obj.data} />
    case 'sticky':       return <StickyNote data={obj.data} />
    case 'photoprint':   return <PhotoPrint data={obj.data} />
    case 'snapshot':     return <Snapshot data={obj.data} />
    case 'photo-teaser': return <PhotographyTeaser data={obj.data} />
    case 'bilingual':    return <BilingualCard data={obj.data} />
    default: return null
  }
}

export default function About() {
  const [view] = useState(pageInitialView)
  return (
    <MiniCanvas
      objects={OBJECTS}
      connectors={[]}
      initialView={view}
      renderObject={renderObject}
    />
  )
}
