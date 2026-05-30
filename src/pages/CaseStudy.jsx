import { useEffect } from 'react'
import { useParams, useNavigate, Navigate } from 'react-router-dom'
import { ArrowUpRight, ArrowLeft } from 'lucide-react'

const STUDIES = {
  zolvo: {
    name: 'Zolvo (YC P26)',
    frame: 'zolvo.case',
    role: 'Founding Product Designer',
    dates: '2026',
    tags: ['Fintech', 'AI SaaS', 'YC P26'],
    cover: 'linear-gradient(135deg,#2F3BC9,#5B6CF5)',
    intro: 'AI SaaS that automates servicing for commercial lenders.',
    heroImage: { placeholder: 'Landing page hero — Zolvo product overview that explains the platform in 5 seconds' },
    stats: [
      ['5', 'Product pillars'],
      ['$4T+', 'Industry'],
      ['1', 'Founding designer'],
      ['YC', "P26"],
    ],
    overview: [
      'Factoring and ABL is a $4T+ industry running on 1990s software. Teams spend 6+ hrs/day matching messy wire payments, with 16-20 errors/month and 3-day processing cycles. There is no automation layer. Every new client means more headcount, not better software.',
      'Zolvo sits as the AI layer between bank accounts, loan management systems, and ops teams. The platform syncs directly with bank accounts, communication channels, and LMS/FMS to handle reconciliation and collections automatically. By turning these manual chores into background processes, the team now reviews only the exceptions.',
      'I joined as the founding designer to modernize how factoring and asset-based lenders run their back office. I set out to design a product that would turn all of that invisible, messy work into a clear, reliable SaaS experience that lenders could understand and trust at a glance.',
      'The first step was creating a landing page that, according to multiple design reviews from Y Combinator, had to explain what Zolvo does in 5 seconds or less.',
      'Research began with deeply understanding how these teams actually work day to day: verifying invoices and documents in different formats, chasing collections across channels, reconciling large volumes of bank transactions, and monitoring portfolio risk in real time.',
      'I mapped these workflows end to end, identified the highest-friction and highest-risk steps, and translated them into the core product pillars below. The focus was giving users immediate visibility into what matters most (exceptions, risk, and next actions) while hiding unnecessary complexity behind thoughtful defaults and automation.',
    ],
    modules: [
      { n: '01', t: 'Invoice Verification', d: 'An AI-driven pipeline that extracts, validates, and flags discrepancies in invoices. The UI surfaces confidence scores, quarantine states and evidence-based alerts so operators resolve edge cases without breaking flow.', image: { placeholder: 'Invoice Verification — confidence scoring and quarantine states' } },
      { n: '02', t: 'Real-time Reconciliation', d: 'A live ledger that reconciles transactions across multiple payment rails at once. Designed for density: finance teams need data, not whitespace.', image: { placeholder: 'Real-time Reconciliation ledger view' } },
      { n: '03', t: 'Loan Collections', d: 'The collections workflow end to end, from delinquency triage to automated outreach. Sensitive UX: firm, but never predatory.', image: { placeholder: 'Loan Collections workflow' } },
      { n: '04', t: 'Communications Hub', d: 'A unified inbox that consolidates every channel teams use to chase payments and resolve exceptions. AI drafts the next message, the operator hits send.', image: { placeholder: 'Communications Hub inbox' } },
      { n: '05', t: 'Portfolio Monitoring', d: 'Real-time portfolio risk dashboard, exception queues, and team management in one view, built around what a manager cares about at 8am.', image: { placeholder: 'Portfolio Monitoring dashboard' } },
    ],
    designSystem: {
      label: 'Design System',
      intro: 'Before shipping any product surface I built the Zolvo design system from scratch: tokens, primitives, and a pattern library. Every new screen could be assembled in hours, not days, which is the only way one designer keeps up with engineering at startup speed.',
      images: [
        { caption: 'Platform sidebar — collapsed and expanded states', image: { placeholder: 'Sidebar component, collapsed + expanded states' } },
        { caption: 'Primary platform components', image: { placeholder: 'Component library overview — primitives + patterns' } },
        { caption: 'Secondary component patterns', image: { placeholder: 'Additional component patterns and tokens' } },
      ],
    },
    impactLabel: 'My impact as Founding Product Designer',
    impact: [
      'Designed the entire product surface from zero across 5 core pillars',
      'Shipped a landing page that passes YC\'s 5-second comprehension test',
      'Built the Zolvo design system from scratch (tokens, primitives, patterns)',
      'Created the UX patterns that make AI matching feel transparent (confidence scoring, quarantine states, evidence-based alerts)',
      'Established the foundation that lets every new screen ship in hours, not days',
    ],
    takeaway: 'I created the UX patterns and interaction models that make AI-driven matching and decisioning feel transparent instead of opaque: confidence scoring, quarantine states, and evidence-based alerts.',
  },
  hubspot: {
    name: 'HubSpot',
    frame: 'hubspot.case',
    role: 'UI/UX Designer',
    dates: '2025',
    tags: ['CRM', 'Scale', 'Rebrand'],
    cover: 'linear-gradient(135deg,#E8551E,#FF8A4C)',
    intro: 'Rebranding transition.',
    heroImage: { placeholder: 'Rebrand hero — before/after of the unified Resources page' },
    stats: [
      ['7M+', 'Monthly visitors'],
      ['1Y', 'Tenure'],
      ['2025', 'Rebrand year'],
    ],
    overview: [
      "HubSpot's blog drives over 7 million monthly visitors, making it the company's primary inbound channel. But with a design dating back to 2018, the site was misaligned with evolving brand standards and underperforming on key traffic and conversion metrics, signaling the need for a full modernization.",
      "I was brought in to help lead HubSpot's transition through their 2025 rebrand, working across the blog, resources, and conversion experience over the course of a year. Most of this work remains private, but one project I can showcase is the redesign of their public-facing resources ecosystem.",
      "One of the multiple projects I worked on was unifying the Resources page. HubSpot had two separate sites serving overlapping purposes (hubspot.com/business-templates and hubspot.com/resources). My job was to merge them into a single Unified Templates Library, redesigned from the ground up to align with HubSpot's new brand guidelines and design system.",
    ],
    modules: [
      { n: '01', t: 'Header and Hero', d: 'Reworked the page entry point to anchor the new brand and orient visitors to a single, unified library.', image: { placeholder: 'New Header and Hero design' } },
      { n: '02', t: 'Featured Resources', d: 'A curated module above the fold that highlights the top assets visitors land for, balancing editorial intent with conversion goals.', image: { placeholder: 'Featured Resources block' } },
      { n: '03', t: 'Resources', d: 'A full resources grid built to absorb the combined catalog from both legacy sites without losing scannability.', image: { placeholder: 'Resources grid' } },
      { n: '04', t: 'CTA components', d: "Part of HubSpot's CTA's had to be designed, rebranded and optimized for conversion. I worked on these components end to end.", image: { placeholder: 'Rebranded CTA components' } },
    ],
    gallery: [
      { caption: "Rebranded CTA's seen in an actual blog", image: { placeholder: 'CTAs in context inside a live blog post' } },
    ],
    impactLabel: 'My impact as UI/UX Designer at HubSpot',
    impact: [
      'Helped lead the public-facing rollout of HubSpot\'s 2025 rebrand across blog, resources, and conversion surfaces',
      'Unified two legacy sites (business-templates + resources) into a single Templates Library',
      'Redesigned the resources ecosystem end to end against the new brand and design system',
      'Designed and rebranded the CTA component family, optimized for conversion',
      'Shipped against the inbound channel that drives 7M+ monthly visitors',
    ],
    takeaway: 'Designing inside a brand-wide system at HubSpot scale taught me that the best ideas still lose if they can\'t survive contact with millions of real workflows. Patterns over one-offs, evidence over taste.',
  },
  captura: {
    name: 'Captura tu mundo',
    frame: 'captura.case',
    role: 'Founder & Designer',
    dates: 'Jun 2020-May 2023',
    tags: ['Founder', 'Community', '0→1'],
    cover: 'linear-gradient(135deg,#1F8A6E,#3FBE96)',
    intro: 'Building a global photography community from 0 to 226K.',
    heroImage: { placeholder: 'Captura tu mundo brand + platform hero' },
    stats: [
      ['226K', 'Followers'],
      ['25+', 'Contests'],
      ['40+', 'Countries'],
      ['390', 'First contest'],
    ],
    overview: [
      'Before 2020, there was no single place for photographers to learn, compete, and connect. Education was scattered, communities were fragmented, and there was no platform bringing it all together.',
      'Captura tu Mundo, translated to "Capture Your World", was built to give photographers one home: to learn, to compete, and to grow alongside a global community. What started as a single contest became a platform reaching 240,000+ photographers across 40 countries.',
      'This was my first experience as a founder. I started Captura tu Mundo from zero during quarantine in 2020 and grew it into a globally recognized photography community. No funding, no team at the start, just a problem worth solving and an obsession with shipping fast and iterating based on what users actually needed.',
    ],
    impactLabel: 'My impact as Founder & Designer',
    impact: [
      '226,000 Instagram followers grown organically from 0',
      '25+ contests hosted with 15,000+ photographs collected',
      '390 participants in the first contest alone',
      '40+ countries reached',
      'Brand partnerships secured with Adobe and Wacom',
      'Platform built mobile-first based on direct user behavior insights',
    ],
    modules: [
      { n: '01', t: 'The Beginning', d: 'In 2020, during global lockdowns, I launched a photography contest called "The View From My Window." The idea was simple: use photography as a way to escape quarantine. 390 people entered. That response told me there was something real here worth building.', image: { placeholder: 'First contest "View From My Window" launch' } },
      { n: '02', t: 'Finding the Real Problem', d: "As the community grew, a pattern emerged. People didn't just want to compete, they wanted to learn. I started posting photography tips and tricks on social media, and the response was immediate. That insight reshaped the entire direction of the project, from contest platform to full education and community hub.", image: { placeholder: 'Educational content on Instagram' } },
      { n: '03', t: 'Building the Platform', d: 'I designed and built the contest platform mobile-first, because our users were coming from Instagram and opening everything on their phones. Desktop came second. That decision alone reduced friction significantly and reflected something I now apply to every product: let user behavior tell you where to build, not assumptions. I iterated constantly based on what the community showed me: new contest formats, new educational content, new features, all shipped fast and refined based on real feedback from real users.', image: { placeholder: 'Mobile-first contest platform screens' } },
      { n: '04', t: 'Growth and Partnerships', d: 'Growing to 226,000 followers organically meant earning attention through genuine value, not paid distribution. That growth eventually opened doors to brand partnerships with Adobe and Wacom, two of the most recognized names in the creative industry. Those partnerships validated that what we built had real credibility in the market.', image: { placeholder: 'Adobe + Wacom partnership branding' } },
    ],
    takeaway: 'Captura tu Mundo taught me what it actually means to build something people want. I learned to ship fast and iterate, to listen to users obsessively, and to make decisive calls with limited information. It also showed me that taste matters in every layer of a product, from how a contest is designed to how a photo is framed. That founder mindset is something I bring into every design project I take on.',
  },
  sage: {
    name: 'Sage',
    frame: 'sage.case',
    role: 'Solo Project · SCAD',
    dates: '2024',
    tags: ['Student', 'AI', 'Mobile'],
    cover: 'linear-gradient(135deg,#1F8A6E,#7CCFB4)',
    intro: 'An AI-powered gardening companion that diagnoses plants and coaches you season by season.',
    heroImage: { placeholder: 'Sage app hero — diagnosis flow + seasonal coach' },
    stats: [
      ['AI', 'Vision diagnosis'],
      ['1', 'Designer'],
      ["'24", 'Year'],
    ],
    overview: [
      'Sage is a SCAD studio project exploring how AI can make first-time plant owners feel like they have a friend who knows what they\'re doing. Snap a photo, get an instant health read, and follow a calm seasonal routine.',
      'I designed the diagnosis flow, the seasonal coach, and the visual language for plant health states (thriving, stressed, dormant) so the app feels supportive rather than alarming.',
    ],
    highlights: [
      'Designed an AI-vision plant diagnosis flow with confidence states.',
      'Built a seasonal coaching loop so care advice adapts to the calendar.',
      'Established a calm visual language for plant health (thriving / stressed / dormant).',
    ],
    takeaway: 'Sage taught me that the most useful AI surfaces don\'t shout their AI-ness, they just quietly make the user feel more capable.',
  },
  surroundings: {
    name: 'Surroundings',
    frame: 'surroundings.case',
    role: 'Solo Project · SCAD',
    dates: '2024',
    tags: ['Student', 'Speculative', 'Concept'],
    cover: 'linear-gradient(135deg,#5B3FFF,#9A7BFF)',
    intro: 'A future-facing consumer technology concept exploring how ambient devices reshape everyday environments.',
    heroImage: { placeholder: 'Surroundings — ambient device concept renders' },
    stats: [
      ['Future', 'Facing'],
      ['1', 'Designer'],
      ["'24", 'Year'],
    ],
    overview: [
      'Surroundings is a speculative concept I built at SCAD to imagine what consumer tech looks like five years from now, when devices fade into the room instead of demanding attention from a screen.',
      'I designed a system of ambient surfaces that respond to context (time, presence, mood) and tested how it changes the feel of an apartment without a single notification.',
    ],
    highlights: [
      'Designed a system of ambient surfaces driven by context, not notifications.',
      'Explored the visual + sound language of an attention-free device family.',
      'Storyboarded three lived-in scenarios to pressure-test the concept.',
    ],
    takeaway: 'Designing for ambience instead of screens forced me to think about presence and silence as design materials, not just pixels.',
  },
  copago: {
    name: 'CoPago',
    frame: 'copago.case',
    role: 'Solo Project · SCAD',
    dates: '2023',
    tags: ['Student', 'Fintech', 'Mobile'],
    cover: 'linear-gradient(135deg,#FF8A3D,#FFD166)',
    intro: 'Digital payments made easy. A co-payment flow built around shared bills between friends and roommates.',
    heroImage: { placeholder: 'CoPago app hero — split-bill flow' },
    stats: [
      ['Split', 'Bills'],
      ['1', 'Designer'],
      ["'23", 'Year'],
    ],
    overview: [
      'CoPago is a SCAD fintech project for the awkward moment after a shared dinner, group trip, or rent split. I designed a payment flow that handles the math, the chase-up, and the paying back in a single tap.',
      'The goal was to make co-payments feel as easy as one-tap checkout: no spreadsheets, no Venmo links in a group chat, no friend feeling like a debt collector.',
    ],
    highlights: [
      'Designed a one-tap co-payment flow that handles math + chase-up automatically.',
      'Mapped the awkward social moments around shared bills and removed them.',
      'Prototyped the full flow end to end as a SCAD fintech studio project.',
    ],
    takeaway: 'CoPago taught me that the best fintech UX isn\'t about the transaction, it\'s about the social awkwardness around it.',
  },
}

function Reveal({ children, delay = 0 }) {
  return (
    <div style={{ animation: 'rise-in 0.6s var(--ease) both', animationDelay: `${delay}s` }}>
      {children}
    </div>
  )
}

/* Pick two "other" projects to suggest after a case study. Prefers the
   featured trio (zolvo/hubspot/captura) so visitors always see the
   strongest work next. */
const FEATURED_ORDER = ['zolvo', 'hubspot', 'captura']
function otherProjects(slug) {
  const pool = FEATURED_ORDER.filter(s => s !== slug)
  // If we're on a featured project, pool has 2 — perfect.
  // If we're on loomi/greenstep, pool has all 3 → take the first 2.
  return pool.slice(0, 2)
}

function OtherProjectCard({ slug, study, navigate }) {
  return (
    <button
      onClick={(e) => { e.stopPropagation(); navigate(`/work/${slug}`) }}
      onPointerDown={(e) => e.stopPropagation()}
      style={{
        display: 'flex', flexDirection: 'column',
        background: 'var(--surface)',
        border: 'var(--border-card)', borderRadius: 14,
        boxShadow: 'var(--shadow-card)',
        cursor: 'none', overflow: 'hidden', textAlign: 'left',
        padding: 0, width: '100%',
        transition: 'transform 0.2s var(--ease), box-shadow 0.2s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translate(-2px, -3px)'
        e.currentTarget.style.boxShadow = '0 18px 36px rgba(24,24,26,0.14)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translate(0, 0)'
        e.currentTarget.style.boxShadow = 'var(--shadow-card)'
      }}
    >
      <div style={{
        height: 100,
        background: study.coverImage ? '#222' : study.cover,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden',
      }}>
        {study.coverImage ? (
          <img
            src={study.coverImage}
            alt={study.name}
            draggable={false}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        ) : (
          <span style={{
            fontFamily: 'var(--font-display)', fontWeight: 900,
            fontSize: '4rem', color: 'rgba(255,255,255,0.18)', lineHeight: 1,
          }}>
            {study.name[0]}
          </span>
        )}
      </div>
      <div style={{ padding: '1rem 1.15rem 1.1rem' }}>
        <p style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.56rem',
          color: 'var(--ink-faint)', letterSpacing: '0.1em',
          textTransform: 'uppercase', marginBottom: 4,
        }}>
          {study.role}
        </p>
        <h4 style={{
          fontFamily: 'var(--font-display)', fontWeight: 800,
          fontSize: '1.15rem', letterSpacing: '-0.02em',
          color: 'var(--ink)', marginBottom: 6, lineHeight: 1.1,
        }}>
          {study.name}
        </h4>
        <p style={{
          fontSize: '0.82rem', color: 'var(--ink-soft)', lineHeight: 1.45,
        }}>
          {study.intro}
        </p>
      </div>
    </button>
  )
}

const labelCss = {
  fontFamily: 'var(--font-mono)', fontSize: '0.66rem',
  color: 'var(--accent)', letterSpacing: '0.12em',
  textTransform: 'uppercase', marginBottom: '1rem',
}

/* Renders a real image if `image.src` is provided, otherwise a clean
   placeholder card with the description of what should go there. */
function ImageBlock({ image, caption, height = 320 }) {
  if (!image) return null
  if (image.src) {
    return (
      <figure style={{ margin: '1.5rem 0' }}>
        <img
          src={image.src}
          alt={image.alt || caption || ''}
          style={{
            display: 'block', width: '100%', height: 'auto',
            borderRadius: 12, border: '1px solid var(--line)',
          }}
        />
        {caption && (
          <figcaption style={{
            marginTop: 8, fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
            color: 'var(--ink-faint)', letterSpacing: '0.08em',
            textTransform: 'uppercase', textAlign: 'center',
          }}>
            {caption}
          </figcaption>
        )}
      </figure>
    )
  }
  return (
    <div style={{ margin: '1.5rem 0' }}>
      <div style={{
        background: 'var(--canvas)',
        border: '2px dashed var(--line)',
        borderRadius: 12, padding: '2rem 1.5rem',
        minHeight: height,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: 10,
        textAlign: 'center',
      }}>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.58rem',
          color: 'var(--ink-faint)', letterSpacing: '0.14em',
          textTransform: 'uppercase',
        }}>
          ◌ image placeholder
        </span>
        <p style={{
          fontFamily: 'var(--font-display)', fontWeight: 600,
          fontSize: '0.95rem', color: 'var(--ink-soft)', lineHeight: 1.4,
          maxWidth: 460,
        }}>
          {image.placeholder}
        </p>
      </div>
      {caption && (
        <p style={{
          marginTop: 8, fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
          color: 'var(--ink-faint)', letterSpacing: '0.08em',
          textTransform: 'uppercase', textAlign: 'center',
        }}>
          {caption}
        </p>
      )}
    </div>
  )
}

export default function CaseStudy() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const data = STUDIES[slug]

  // Whenever the route changes (e.g. clicking "other projects" at the
  // bottom), reset scroll to the top of the new case study.
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [slug])

  if (!data) return <Navigate to="/" replace />

  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) navigate('/') }}
      style={{
        minHeight: '100vh',
        background: 'var(--canvas)',
        backgroundImage: 'radial-gradient(circle, rgba(24,24,26,0.10) 1px, transparent 1px)',
        backgroundSize: '22px 22px',
        backgroundPosition: '0 0',
        padding: '0 1.2rem 4rem',
      }}
      title="Click the margins to return to the canvas"
    >

      {/* (Back button is rendered globally in App's Chrome on non-home routes.
           Clicking anywhere on the page margins also returns home.) */}

      {/* Artboard */}
      <div style={{
        maxWidth: 860, margin: '4.5rem auto 0',
        background: 'var(--surface)', border: '1px solid var(--line)',
        borderRadius: 16, overflow: 'hidden',
        boxShadow: '0 24px 60px rgba(24,24,26,0.1)',
        animation: 'rise-in 0.55s var(--ease) both',
      }}>
        {/* Frame label bar with go-back button */}
        <div style={{
          padding: '0.6rem 1rem 0.6rem 0.7rem',
          borderBottom: '1px solid var(--line)',
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <button
            onClick={(e) => { e.stopPropagation(); navigate('/') }}
            onPointerDown={(e) => e.stopPropagation()}
            title="Back to the canvas"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '0.4rem 0.75rem', cursor: 'none',
              background: 'transparent', color: 'var(--ink-soft)',
              border: '1px solid var(--line)',
              borderRadius: 'var(--radius-pill)',
              fontFamily: 'var(--font-mono)', fontSize: '0.62rem', fontWeight: 600,
              transition: 'background 0.15s, color 0.15s, transform 0.15s var(--ease)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--accent)'
              e.currentTarget.style.color = '#fff'
              e.currentTarget.style.transform = 'translateY(-1px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color = 'var(--ink-soft)'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            <ArrowLeft size={12} /> back to canvas
          </button>
        </div>

        {/* Cover — real image if provided, otherwise gradient + monogram */}
        <div style={{
          height: 200,
          background: data.coverImage ? '#222' : data.cover,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          overflow: 'hidden',
        }}>
          {data.coverImage ? (
            <img
              src={data.coverImage}
              alt={data.name}
              draggable={false}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          ) : (
            <span style={{
              fontFamily: 'var(--font-display)', fontWeight: 900,
              fontSize: '8rem', color: 'rgba(255,255,255,0.15)', lineHeight: 1,
            }}>
              {data.name[0]}
            </span>
          )}
        </div>

        <div style={{ padding: '2.5rem clamp(1.5rem, 5vw, 3.5rem) 3rem' }}>

          {/* Header */}
          <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
            {[data.role, data.dates, ...data.tags].map(s => (
              <span key={s} style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.62rem',
                color: 'var(--ink-soft)', background: 'var(--canvas)',
                border: '1px solid var(--line)', borderRadius: 6,
                padding: '0.25rem 0.55rem',
              }}>
                {s}
              </span>
            ))}
          </div>

          <h1 style={{
            fontFamily: 'var(--font-display)', fontWeight: 800,
            fontSize: 'clamp(2.4rem, 6vw, 4rem)', lineHeight: 1.0,
            letterSpacing: '-0.03em', color: 'var(--ink)', marginBottom: '1.1rem',
          }}>
            {data.name}
          </h1>

          <p style={{
            fontSize: 'clamp(1.05rem, 2.2vw, 1.3rem)', lineHeight: 1.55,
            color: 'var(--ink-soft)', marginBottom: '2rem', maxWidth: 560,
          }}>
            {data.intro}
          </p>

          {/* Impact callout — placed before everything else so a recruiter
              sees the headline outcome the moment they land on the page. */}
          {data.impact && (
            <Reveal delay={0.04}>
              <div style={{
                marginBottom: '2.5rem',
                background: 'var(--accent-soft)',
                border: '1px solid var(--accent-soft)',
                borderRadius: 14,
                padding: '1.75rem 1.75rem 1.5rem',
              }}>
                <p style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.62rem',
                  color: 'var(--accent)', letterSpacing: '0.14em',
                  textTransform: 'uppercase', marginBottom: '0.5rem',
                }}>
                  impact
                </p>
                <h3 style={{
                  fontFamily: 'var(--font-display)', fontWeight: 800,
                  fontSize: '1.5rem', letterSpacing: '-0.02em',
                  color: 'var(--ink)', marginBottom: '1.1rem', lineHeight: 1.15,
                }}>
                  {data.impactLabel || 'Impact'}
                </h3>
                <ul style={{
                  listStyle: 'none', padding: 0, margin: 0,
                  display: 'flex', flexDirection: 'column', gap: '0.65rem',
                }}>
                  {data.impact.map((line, i) => (
                    <li key={i} style={{
                      display: 'flex', gap: 12, alignItems: 'flex-start',
                      fontSize: '0.98rem', color: 'var(--ink)', lineHeight: 1.55,
                    }}>
                      <span style={{
                        flexShrink: 0, marginTop: 7,
                        width: 7, height: 7, borderRadius: '50%',
                        background: 'var(--accent)',
                      }} />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          )}

          {/* Hero image */}
          {data.heroImage && (
            <Reveal delay={0.02}>
              <ImageBlock image={data.heroImage} height={360} />
            </Reveal>
          )}

          {/* Stats */}
          <Reveal delay={0.05}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${data.stats.length}, 1fr)`,
              gap: '1px', background: 'var(--line)',
              border: '1px solid var(--line)', borderRadius: 10,
              overflow: 'hidden', marginBottom: '3rem',
            }}>
              {data.stats.map(([v, l]) => (
                <div key={l} style={{ background: 'var(--surface)', padding: '1.25rem 0.75rem', textAlign: 'center' }}>
                  <p style={{
                    fontFamily: 'var(--font-display)', fontWeight: 800,
                    fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)', letterSpacing: '-0.02em',
                    color: 'var(--ink)', marginBottom: '0.2rem',
                  }}>
                    {v}
                  </p>
                  <p style={{
                    fontFamily: 'var(--font-mono)', fontSize: '0.56rem',
                    color: 'var(--ink-faint)', textTransform: 'uppercase',
                    letterSpacing: '0.07em',
                  }}>
                    {l}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Design System (optional) — goes before the modules so visitors
              see the foundation before the product surfaces built on top. */}
          {data.designSystem && (
            <Reveal delay={0.16}>
              <div style={{ marginTop: '2.5rem' }}>
                <p style={labelCss}>{data.designSystem.label.toLowerCase()}</p>
                <h3 style={{
                  fontFamily: 'var(--font-display)', fontWeight: 800,
                  fontSize: '1.6rem', letterSpacing: '-0.02em',
                  color: 'var(--ink)', marginBottom: '0.9rem', lineHeight: 1.15,
                }}>
                  {data.designSystem.label}
                </h3>
                {data.designSystem.intro && (
                  <p style={{
                    fontSize: '1rem', color: 'var(--ink-soft)', lineHeight: 1.75,
                    marginBottom: '1.5rem',
                  }}>
                    {data.designSystem.intro}
                  </p>
                )}
                {data.designSystem.images && data.designSystem.images.map((g, i) => (
                  <ImageBlock key={i} image={g.image} caption={g.caption} height={280} />
                ))}
              </div>
            </Reveal>
          )}

          {/* Modules or highlights */}
          <div style={{ marginTop: '2.5rem' }}>
            <Reveal delay={0.15}>
              <p style={labelCss}>{data.modules ? 'What I built' : 'Highlights'}</p>
            </Reveal>

            {data.modules && data.modules.map((m) => (
              <Reveal key={m.n} delay={0.18}>
                <div style={{
                  display: 'grid', gridTemplateColumns: '52px 1fr', gap: '1.25rem',
                  padding: '1.6rem 0', borderTop: '1px solid var(--line)',
                }}>
                  <span style={{
                    fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 500,
                    color: 'var(--accent)', paddingTop: '0.2rem',
                  }}>
                    {m.n}
                  </span>
                  <div>
                    <h3 style={{
                      fontFamily: 'var(--font-display)', fontWeight: 700,
                      fontSize: '1.2rem', letterSpacing: '-0.01em',
                      color: 'var(--ink)', marginBottom: '0.4rem',
                    }}>
                      {m.t}
                    </h3>
                    <p style={{ fontSize: '0.94rem', color: 'var(--ink-soft)', lineHeight: 1.7 }}>
                      {m.d}
                    </p>
                    {m.image && <ImageBlock image={m.image} height={260} />}
                  </div>
                </div>
              </Reveal>
            ))}

            {data.highlights && data.highlights.map((h, i) => (
              <Reveal key={i} delay={0.18}>
                <div style={{
                  display: 'grid', gridTemplateColumns: '52px 1fr', gap: '1.25rem',
                  padding: '1.4rem 0', borderTop: '1px solid var(--line)',
                  alignItems: 'baseline',
                }}>
                  <span style={{
                    fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
                    color: 'var(--accent)',
                  }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p style={{ fontSize: '0.98rem', color: 'var(--ink)', lineHeight: 1.7 }}>
                    {h}
                  </p>
                </div>
              </Reveal>
            ))}
            <div style={{ borderTop: '1px solid var(--line)' }} />
          </div>

          {/* Gallery (optional) */}
          {data.gallery && data.gallery.length > 0 && (
            <Reveal delay={0.18}>
              <div style={{ marginTop: '2.5rem' }}>
                <p style={labelCss}>Gallery</p>
                {data.gallery.map((g, i) => (
                  <ImageBlock key={i} image={g.image} caption={g.caption} height={280} />
                ))}
              </div>
            </Reveal>
          )}

          {/* Takeaway */}
          <Reveal delay={0.2}>
            <div style={{
              marginTop: '2.5rem', padding: '1.75rem',
              background: 'var(--accent-soft)', borderRadius: 12,
            }}>
              <p style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
                color: 'var(--accent)', letterSpacing: '0.1em',
                textTransform: 'uppercase', marginBottom: '0.7rem',
              }}>
                Takeaway
              </p>
              <p style={{
                fontFamily: 'var(--font-display)', fontWeight: 600,
                fontSize: '1.15rem', lineHeight: 1.5, color: 'var(--ink)',
                letterSpacing: '-0.01em',
              }}>
                {data.takeaway}
              </p>
            </div>
          </Reveal>

          {/* Other featured projects */}
          <Reveal delay={0.24}>
            <div style={{ marginTop: '3.5rem', paddingTop: '2.5rem', borderTop: '1px solid var(--line)' }}>
              <p style={labelCss}>Check out these other projects</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                {otherProjects(slug).map(s => (
                  <OtherProjectCard key={s} slug={s} study={STUDIES[s]} navigate={navigate} />
                ))}
              </div>
            </div>
          </Reveal>

          {/* Get in touch CTA */}
          <Reveal delay={0.28}>
            <div style={{
              marginTop: '3.5rem', paddingTop: '2.5rem',
              borderTop: '1px solid var(--line)',
              textAlign: 'center',
            }}>
              <p style={labelCss}>Let's talk</p>
              <h3 style={{
                fontFamily: 'var(--font-display)', fontWeight: 800,
                fontSize: 'clamp(1.6rem, 3.4vw, 2.2rem)', letterSpacing: '-0.02em',
                color: 'var(--ink)', marginBottom: '1.25rem', lineHeight: 1.1,
              }}>
                Liked what you saw?
              </h3>
              <button
                onClick={() => navigate('/contact')}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.55rem',
                  background: 'var(--surface)', color: 'var(--ink)',
                  border: 'var(--border-card)', boxShadow: 'var(--shadow-card)',
                  cursor: 'none',
                  fontFamily: 'var(--font-mono)', fontSize: '0.78rem', fontWeight: 600,
                  padding: '0.85rem 1.4rem', borderRadius: 'var(--radius-pill)',
                  transition: 'background 0.15s, color 0.15s, transform 0.15s var(--ease)',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.transform = 'translateY(-1px)' }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--surface)'; e.currentTarget.style.color = 'var(--ink)'; e.currentTarget.style.transform = 'translateY(0)' }}
              >
                Get in touch <ArrowUpRight size={14} />
              </button>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  )
}
