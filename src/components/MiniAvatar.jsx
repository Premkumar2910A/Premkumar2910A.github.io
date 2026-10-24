import { useEffect, useRef, useState } from 'react';

const SRC = '/hero/mini-avatar.webp';
const MARGIN = 12;
const STORAGE_KEY = 'portfolio-mini-avatar';

function savedPosition() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved && ['left', 'right'].includes(saved.side) && Number.isFinite(saved.bottom)) return saved;
  } catch { /* Private windows can block storage; the default corner still works. */ }
  return { side: 'right', bottom: 6 };
}

// A small, living copy of the hero character. It breathes, follows the cursor,
// reacts to the conversation (`mood`), and can be dragged to either screen edge.
export default function MiniAvatar({ greeting, prompt = '', mood = '', open = false, onToggle, onSide }) {
  const button = useRef(null);
  const drag = useRef(null);
  const [position, setPosition] = useState(savedPosition);
  const [live, setLive] = useState(null);
  const [poked, setPoked] = useState(false);
  const [tucked, setTucked] = useState(false);
  const [viewport, setViewport] = useState(() => ({ width: innerWidth, height: innerHeight }));

  useEffect(() => { onSide?.(position.side); }, [position.side, onSide]);
  useEffect(() => {
    const resize = () => setViewport({ width: innerWidth, height: innerHeight });
    addEventListener('resize', resize);
    return () => removeEventListener('resize', resize);
  }, []);
  useEffect(() => {
    // On phones it tucks into the edge while the page scrolls, so it never hides
    // what the visitor is reading, and returns once scrolling stops.
    if (open || viewport.width > 760) { setTucked(false); return; }
    let timer = 0;
    const scroll = () => {
      if (drag.current?.moved) return;
      setTucked(true);
      clearTimeout(timer);
      timer = setTimeout(() => setTucked(false), 900);
    };
    addEventListener('scroll', scroll, { passive: true });
    return () => { removeEventListener('scroll', scroll); clearTimeout(timer); };
  }, [open, viewport.width]);
  useEffect(() => {
    // The head turns toward the pointer; touch screens keep the idle glance instead.
    if (matchMedia('(prefers-reduced-motion: reduce), (hover: none)').matches) return;
    let frame = 0, point = null;
    const look = () => {
      frame = 0;
      const el = button.current;
      if (!el || !point || drag.current?.moved) return;
      const box = el.getBoundingClientRect();
      const dx = point.x - (box.left + box.width / 2), dy = point.y - (box.top + box.height * .12);
      el.style.setProperty('--look', Math.max(-1, Math.min(1, dx / 360)).toFixed(3));
      el.style.setProperty('--nod', Math.max(-1, Math.min(1, dy / 360)).toFixed(3));
    };
    const move = e => { point = { x: e.clientX, y: e.clientY }; if (!frame) frame = requestAnimationFrame(look); };
    addEventListener('pointermove', move, { passive: true });
    return () => { removeEventListener('pointermove', move); cancelAnimationFrame(frame); };
  }, []);

  // HD source (375×960) shown at a fraction of its size stays sharp on retina screens.
  const height = viewport.width <= 760 ? 112 : 176;
  const width = Math.round(height * 375 / 960);
  const docked = {
    left: position.side === 'left' ? MARGIN : viewport.width - width - MARGIN,
    top: Math.max(80, viewport.height - height - position.bottom),
  };
  const down = e => {
    if (e.button !== 0) return;
    const box = button.current.getBoundingClientRect();
    // Capture at once so a fast drag cannot slip off the figure.
    button.current.setPointerCapture(e.pointerId);
    drag.current = { id: e.pointerId, x: e.clientX, y: e.clientY, dx: e.clientX - box.left, dy: e.clientY - box.top, last: e.clientX, moved: false };
  };
  const move = e => {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    if (!d.moved && Math.hypot(e.clientX - d.x, e.clientY - d.y) < 6) return;
    d.moved = true;
    // Lean into the direction of travel.
    button.current.style.setProperty('--drag-tilt', `${Math.max(-14, Math.min(14, (e.clientX - d.last) * 1.2)).toFixed(1)}deg`);
    d.last = e.clientX;
    setLive({ left: e.clientX - d.dx, top: e.clientY - d.dy });
  };
  const up = e => {
    const d = drag.current;
    drag.current = null;
    button.current.style.setProperty('--drag-tilt', '0deg');
    if (!d?.moved) return;
    const left = e.clientX - d.dx, top = e.clientY - d.dy;
    const next = {
      side: left + width / 2 < viewport.width / 2 ? 'left' : 'right',
      bottom: Math.round(Math.min(Math.max(6, viewport.height - top - height), viewport.height - height - 90)),
    };
    setLive(null);
    setPosition(next);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch { /* Position is a convenience only. */ }
    // A drag never also toggles the guide.
    button.current.dataset.dragged = 'true';
  };
  const click = () => {
    if (button.current.dataset.dragged) { delete button.current.dataset.dragged; return; }
    setPoked(true);
    setTimeout(() => setPoked(false), 600);
    onToggle();
  };

  const place = live || docked;
  const classes = ['mini-avatar', `is-${position.side}`, greeting && !open && 'is-greeting', live && 'is-dragging', poked && 'is-poked', open && 'is-open', tucked && 'is-tucked', mood && `is-${mood}`].filter(Boolean).join(' ');
  return <button ref={button} className={classes}
    style={{ left: place.left, top: place.top }}
    onPointerDown={down} onPointerMove={move} onPointerUp={up}
    onPointerCancel={() => { drag.current = null; setLive(null); }}
    onClick={click} aria-expanded={open}
    aria-label={open ? 'Close Premkumar’s guide' : 'Ask Premkumar a question'}>
    {prompt && <span className="mini-avatar-bubble" aria-hidden="true" key={prompt}>{prompt}</span>}
    <span className="mini-avatar-figure" aria-hidden="true" style={{ width, height }}>
      <span className="mini-avatar-rig">
        <img className="mini-avatar-body" src={SRC} alt="" width="375" height="960" draggable="false"/>
        <img className="mini-avatar-head" src={SRC} alt="" width="375" height="960" draggable="false"/>
      </span>
    </span>
  </button>;
}
