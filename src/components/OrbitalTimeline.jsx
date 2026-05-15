"use client";
import { useState, useEffect, useRef } from "react";
import { ArrowRight, Zap, Link } from "lucide-react";

const timelineData = [
  {
    id: 1, title: "Zolvo", date: "Mar 2026", category: "Work",
    content: "Founding designer at a YC Spring '26 startup. Built 5 core product modules in 8 weeks — AI-driven invoice verification, real-time reconciliation, and loan collections.",
    relatedIds: [2, 5], status: "in-progress", energy: 95,
    icon: () => <span style={{ fontSize: 14 }}>⚡</span>,
  },
  {
    id: 2, title: "HubSpot", date: "Jan 2025", category: "Work",
    content: "UI/UX Designer at one of the world's leading CRM platforms. Worked on product experiences serving millions of users across sales, marketing, and service.",
    relatedIds: [1, 3], status: "completed", energy: 88,
    icon: () => <span style={{ fontSize: 14 }}>🔶</span>,
  },
  {
    id: 3, title: "Captura tu mundo", date: "Jun 2020", category: "Startup",
    content: "Founded my own startup focused on visual storytelling. Wore every hat — designer, founder, builder — learning what it means to create something from nothing.",
    relatedIds: [2, 4], status: "completed", energy: 80,
    icon: () => <span style={{ fontSize: 14 }}>📷</span>,
  },
  {
    id: 4, title: "Figma", date: "Always", category: "Tool",
    content: "Primary design tool. From design systems and component libraries to high-fidelity prototypes and developer handoff — Figma is where everything lives.",
    relatedIds: [1, 2, 5], status: "in-progress", energy: 97,
    icon: () => <span style={{ fontSize: 14 }}>✦</span>,
  },
  {
    id: 5, title: "AI-first", date: "Now", category: "Approach",
    content: "Designing products where AI is the core — not a feature. Making complex model outputs feel simple, trustworthy, and human.",
    relatedIds: [1, 4, 6], status: "in-progress", energy: 90,
    icon: () => <span style={{ fontSize: 14 }}>◈</span>,
  },
  {
    id: 6, title: "SCAD", date: "2024", category: "Education",
    content: "Studying at the Savannah College of Art and Design — one of the top design schools in the US. Where craft, systems thinking, and creative intuition meet.",
    relatedIds: [3, 5], status: "in-progress", energy: 75,
    icon: () => <span style={{ fontSize: 14 }}>◎</span>,
  },
];

const statusStyles = {
  completed: { color: "#fff", background: "rgba(255,255,255,0.1)", border: "1px solid #fff" },
  "in-progress": { color: "#14b8a6", background: "rgba(20,184,166,0.1)", border: "1px solid #14b8a6" },
  pending: { color: "#555", background: "transparent", border: "1px solid #555" },
};

const statusLabel = { completed: "COMPLETE", "in-progress": "IN PROGRESS", pending: "PENDING" };

export default function OrbitalTimeline() {
  const [expandedItems, setExpandedItems] = useState({});
  const [rotationAngle, setRotationAngle] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const [pulseEffect, setPulseEffect] = useState({});
  const [activeNodeId, setActiveNodeId] = useState(null);
  const containerRef = useRef(null);
  const nodeRefs = useRef({});

  useEffect(() => {
    let timer;
    if (autoRotate) {
      timer = setInterval(() => setRotationAngle(p => Number(((p + 0.3) % 360).toFixed(3))), 50);
    }
    return () => clearInterval(timer);
  }, [autoRotate]);

  const getPosition = (index, total) => {
    const containerW = containerRef.current?.offsetWidth || 800;
    const containerH = containerRef.current?.offsetHeight || 600;
    const radius = Math.min(containerW, containerH) * 0.34;
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radian = (angle * Math.PI) / 180;
    return {
      x: radius * Math.cos(radian),
      y: radius * Math.sin(radian),
      zIndex: Math.round(100 + 50 * Math.cos(radian)),
      opacity: Math.max(0.4, Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2))),
    };
  };

  const toggleItem = (id) => {
    setExpandedItems(prev => {
      const newState = {};
      Object.keys(prev).forEach(k => { newState[parseInt(k)] = false; });
      newState[id] = !prev[id];
      if (!prev[id]) {
        setActiveNodeId(id);
        setAutoRotate(false);
        const related = timelineData.find(i => i.id === id)?.relatedIds || [];
        setPulseEffect(Object.fromEntries(related.map(r => [r, true])));
      } else {
        setActiveNodeId(null);
        setAutoRotate(true);
        setPulseEffect({});
      }
      return newState;
    });
  };

  const handleContainerClick = (e) => {
    if (e.target === containerRef.current) {
      setExpandedItems({});
      setActiveNodeId(null);
      setPulseEffect({});
      setAutoRotate(true);
    }
  };

  const isRelated = (id) => activeNodeId && (timelineData.find(n => n.id === activeNodeId)?.relatedIds || []).includes(id);

  return (
    <section style={{ borderTop: '1px solid rgba(255,255,255,0.07)', borderBottom: '1px solid rgba(255,255,255,0.07)', position: 'relative', zIndex: 1 }}>
      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.68rem', color: '#555',
        textTransform: 'uppercase', letterSpacing: '0.1em', padding: '2rem 2rem 0' }}>
        experience & skills
      </div>

      <div ref={containerRef} onClick={handleContainerClick}
        style={{ position: 'relative', width: '100%', height: 580,
          display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'visible' }}>

        {/* Orbit ring */}
        <div style={{ position: 'absolute', width: '62%', aspectRatio: '1', borderRadius: '50%',
          border: '1px solid rgba(255,255,255,0.07)', pointerEvents: 'none' }} />

        {/* Center orb */}
        <div style={{ position: 'absolute', width: 52, height: 52, borderRadius: '50%',
          background: 'radial-gradient(135deg, #7c3aed, #3b82f6, #14b8a6)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10,
          boxShadow: '0 0 40px rgba(99,102,241,0.4)', animation: 'orbitPulse 2s ease-in-out infinite' }}>
          <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'rgba(255,255,255,0.85)' }} />
        </div>

        {/* Nodes */}
        {timelineData.map((item, index) => {
          const pos = getPosition(index, timelineData.length);
          const isExpanded = !!expandedItems[item.id];
          const isRel = isRelated(item.id);
          const isPulsing = !!pulseEffect[item.id];
          const Icon = item.icon;

          return (
            <div key={item.id}
              ref={el => nodeRefs.current[item.id] = el}
              onClick={e => { e.stopPropagation(); toggleItem(item.id); }}
              style={{
                position: 'absolute',
                transform: `translate(${pos.x}px, ${pos.y}px)`,
                zIndex: isExpanded ? 200 : pos.zIndex,
                opacity: isExpanded ? 1 : pos.opacity,
                transition: 'opacity 0.5s ease',
                cursor: 'none',
                display: 'flex', flexDirection: 'column', alignItems: 'center',
              }}>

              {/* Glow */}
              <div style={{
                position: 'absolute',
                width: item.energy * 0.45 + 36, height: item.energy * 0.45 + 36,
                marginLeft: -(item.energy * 0.45 + 36 - 40) / 2,
                marginTop: -(item.energy * 0.45 + 36 - 40) / 2,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
                animation: isPulsing ? 'orbitPulse 1s ease-in-out infinite' : 'none',
                pointerEvents: 'none',
              }} />

              {/* Node circle */}
              <div style={{
                width: 40, height: 40, borderRadius: '50%',
                border: `2px solid ${isExpanded ? '#fff' : isRel ? '#fff' : 'rgba(255,255,255,0.3)'}`,
                background: isExpanded ? '#fff' : isRel ? 'rgba(255,255,255,0.15)' : '#0a0a0a',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transform: isExpanded ? 'scale(1.5)' : 'scale(1)',
                transition: 'all 0.25s ease',
                boxShadow: isExpanded ? '0 0 20px rgba(255,255,255,0.25)' : 'none',
                animation: isRel && !isExpanded ? 'orbitPulse 1s ease-in-out infinite' : 'none',
                zIndex: 2, position: 'relative',
              }}>
                <div style={{ filter: isExpanded ? 'invert(1)' : 'none' }}>
                  <Icon />
                </div>
              </div>

              {/* Label */}
              <div style={{
                marginTop: '0.7rem',
                fontFamily: "'JetBrains Mono', monospace", fontSize: '0.62rem',
                fontWeight: 600, letterSpacing: '0.08em',
                color: isExpanded ? '#fff' : 'rgba(255,255,255,0.55)',
                whiteSpace: 'nowrap', textTransform: 'uppercase',
                transform: isExpanded ? 'scale(1.1)' : 'scale(1)',
                transition: 'all 0.2s ease',
              }}>{item.title}</div>

              {/* Expanded card */}
              {isExpanded && (
                <div style={{
                  position: 'absolute', top: '3.8rem', left: '50%',
                  transform: 'translateX(-50%)',
                  width: 240, background: 'rgba(12,12,12,0.97)',
                  border: '1px solid rgba(255,255,255,0.12)', borderRadius: 8,
                  padding: '1rem', backdropFilter: 'blur(16px)',
                  boxShadow: '0 16px 48px rgba(0,0,0,0.7)',
                  animation: 'cardIn 0.3s cubic-bezier(0.16,1,0.3,1)',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
                    <span style={{ ...statusStyles[item.status], fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '0.55rem', letterSpacing: '0.08em', textTransform: 'uppercase',
                      padding: '0.2rem 0.5rem', borderRadius: 2 }}>
                      {statusLabel[item.status]}
                    </span>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', color: '#555' }}>{item.date}</span>
                  </div>
                  <h3 style={{ fontSize: '0.92rem', fontWeight: 700, marginBottom: '0.5rem', letterSpacing: '-0.01em' }}>{item.title}</h3>
                  <p style={{ fontSize: '0.75rem', color: '#888', lineHeight: 1.65, marginBottom: '0.75rem' }}>{item.content}</p>

                  {/* Energy bar */}
                  <div style={{ marginBottom: '0.75rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '0.6rem', color: '#555', marginBottom: '0.3rem' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Zap size={9} /> energy</span>
                      <span>{item.energy}%</span>
                    </div>
                    <div style={{ height: 3, background: 'rgba(255,255,255,0.07)', borderRadius: 99, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${item.energy}%`, background: 'linear-gradient(90deg, #3b82f6, #7c3aed)', borderRadius: 99 }} />
                    </div>
                  </div>

                  {/* Related */}
                  {item.relatedIds.length > 0 && (
                    <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '0.6rem' }}>
                      <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.58rem',
                        color: '#555', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.5rem',
                        display: 'flex', alignItems: 'center', gap: 4 }}>
                        <Link size={9} /> connected
                      </p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                        {item.relatedIds.map(rid => {
                          const rel = timelineData.find(n => n.id === rid);
                          return (
                            <button key={rid} onClick={e => { e.stopPropagation(); toggleItem(rid); }}
                              style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.62rem',
                                color: 'rgba(255,255,255,0.65)', background: 'transparent',
                                border: '1px solid rgba(255,255,255,0.12)', padding: '0.25rem 0.5rem',
                                borderRadius: 2, cursor: 'none', display: 'flex', alignItems: 'center', gap: 3,
                                transition: 'all 0.2s' }}>
                              {rel?.title} <ArrowRight size={8} />
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.62rem',
        color: '#444', textAlign: 'center', paddingBottom: '2rem' }}>
        click any node · click background to reset
      </p>

      <style>{`
        @keyframes orbitPulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.1)} }
        @keyframes cardIn { from{opacity:0;transform:translateX(-50%) translateY(-8px)} to{opacity:1;transform:translateX(-50%) translateY(0)} }
      `}</style>
    </section>
  );
}
