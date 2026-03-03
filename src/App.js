import { useState, useEffect, useRef, useCallback, useMemo } from "react";

// ═══════════════════════════════════════════════════════════════════════
//  LUMINA: МАГІЧНА СПАДЩИНА  ✨  Production v1.0
//  Module 1 · Module 2 · Module 3 — Complete Single File
// ═══════════════════════════════════════════════════════════════════════

// ─── GLOBAL STYLES ───────────────────────────────────────────────────────
const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Unbounded:wght@700;900&family=Nunito:wght@600;700;800;900&display=swap');
*{box-sizing:border-box;margin:0;padding:0;-webkit-tap-highlight-color:transparent;user-select:none}
html,body,#root{width:100%;height:100%;overflow:hidden;font-family:'Nunito',sans-serif;touch-action:manipulation}
input{user-select:text;touch-action:auto}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}}
@keyframes breathe{0%,100%{transform:scale(1)}50%{transform:scale(1.026)}}
@keyframes blink{0%,82%,100%{transform:scaleY(1)}88%{transform:scaleY(0.04)}93%{transform:scaleY(1)}}
@keyframes ear-twitch{0%,72%,100%{transform:rotate(0)}77%{transform:rotate(-14deg)}83%{transform:rotate(7deg)}89%{transform:rotate(-4deg)}}
@keyframes tail-wag{0%,100%{transform:rotate(-9deg)}33%{transform:rotate(11deg)}66%{transform:rotate(-11deg)}}
@keyframes wing-flap{0%,100%{transform:rotate(-18deg) scaleY(1)}50%{transform:rotate(28deg) scaleY(0.52)}}
@keyframes horn-glow{0%,100%{filter:drop-shadow(0 0 5px #fff) drop-shadow(0 0 12px #c084fc)}50%{filter:drop-shadow(0 0 16px #fff) drop-shadow(0 0 32px #c084fc) drop-shadow(0 0 60px #7c3aed)}}
@keyframes secret-glow{0%,100%{filter:drop-shadow(0 0 8px #00e5ff) drop-shadow(0 0 20px #9900ff)}50%{filter:drop-shadow(0 0 22px #00e5ff) drop-shadow(0 0 50px #9900ff) drop-shadow(0 0 90px #00e5ff)}}
@keyframes aurora{0%{transform:translateX(-130%) skewX(-22deg);opacity:0}25%{opacity:.75}75%{opacity:.55}100%{transform:translateX(130%) skewX(-22deg);opacity:0}}
@keyframes petal{0%{transform:translateY(-40px) rotate(0deg);opacity:1}100%{transform:translateY(112vh) rotate(600deg);opacity:0}}
@keyframes firefly{0%,100%{opacity:0;transform:translate(0,0)}25%{opacity:.95;transform:translate(18px,-15px)}55%{opacity:.2;transform:translate(30px,8px)}78%{opacity:.85;transform:translate(8px,-24px)}}
@keyframes gem-pulse{0%,100%{opacity:.3;filter:brightness(1)}50%{opacity:1;filter:brightness(2.8) saturate(2.2)}}
@keyframes cloud-drift{0%{transform:translateX(0)}100%{transform:translateX(50px)}}
@keyframes thought-pop{0%{transform:scale(0) translateY(12px);opacity:0}18%{transform:scale(1.2) translateY(-6px);opacity:1}78%{transform:scale(1) translateY(-18px);opacity:1}100%{transform:scale(.6) translateY(-36px);opacity:0}}
@keyframes shake-sm{0%,100%{transform:translate(0)}25%{transform:translate(-4px,-1px)}75%{transform:translate(4px,1px)}}
@keyframes shake-md{0%,100%{transform:translate(0) rotate(0)}10%{transform:translate(-8px,-3px) rotate(-2deg)}30%{transform:translate(-12px,-5px) rotate(-3deg)}50%{transform:translate(12px,5px) rotate(3deg)}70%{transform:translate(-6px,3px) rotate(-1.5deg)}90%{transform:translate(6px,-3px) rotate(1.5deg)}}
@keyframes shake-lg{0%,100%{transform:translate(0) rotate(0)}8%{transform:translate(-16px,-6px) rotate(-3.5deg)}20%{transform:translate(22px,8px) rotate(4.5deg)}35%{transform:translate(-22px,-8px) rotate(-5deg)}50%{transform:translate(20px,7px) rotate(4deg)}65%{transform:translate(-12px,-12px) rotate(-2.5deg)}80%{transform:translate(14px,12px) rotate(3deg)}92%{transform:translate(-6px,5px) rotate(-1deg)}}
@keyframes whiteout{0%{opacity:0}45%{opacity:1}100%{opacity:0}}
@keyframes glitch{0%{filter:hue-rotate(0deg) brightness(1)}15%{filter:hue-rotate(90deg) brightness(5) contrast(4)}30%{filter:hue-rotate(180deg) brightness(.2) saturate(6) invert(.3)}50%{filter:hue-rotate(0deg) brightness(6) contrast(5) invert(.5)}70%{filter:hue-rotate(225deg) brightness(.4) saturate(4)}100%{filter:hue-rotate(0deg) brightness(1)}}
@keyframes shadow-reveal{0%{opacity:0;transform:scale(0.2) rotate(-15deg)}55%{transform:scale(1.12) rotate(4deg)}100%{opacity:1;transform:scale(1) rotate(0)}}
@keyframes rainbow-cycle{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
@keyframes pulse-ring{0%{transform:scale(0.8);opacity:1}100%{transform:scale(2.6);opacity:0}}
@keyframes confetti-p{0%{transform:translateY(-60px) rotate(0deg);opacity:1}100%{transform:translateY(115vh) rotate(var(--r,720deg));opacity:0}}
@keyframes level-up-anim{0%{transform:translateX(-50%) scale(.5);opacity:0}35%{transform:translateX(-50%) scale(1.25)}65%{transform:translateX(-50%) scale(1);opacity:1}100%{transform:translateX(-50%) scale(.8) translateY(-90px);opacity:0}}
@keyframes star-twinkle{0%,100%{opacity:.15;transform:scale(.6)}50%{opacity:1;transform:scale(1.3)}}
@keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-22px)}}
@keyframes slide-up{from{transform:translateY(28px);opacity:0}to{transform:translateY(0);opacity:1}}
@keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}
@keyframes xp-fill{from{width:0%}to{width:var(--w,0%)}}
.ub{font-family:'Unbounded',sans-serif}
.glass{background:rgba(255,255,255,.08);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);border:1px solid rgba(255,255,255,.14)}
.mbtn{transition:transform .14s ease,filter .14s ease;cursor:pointer}
.mbtn:active{transform:scale(.91)!important;filter:brightness(1.25)!important}
.sc{overflow-y:auto;-ms-overflow-style:none;scrollbar-width:none}
.sc::-webkit-scrollbar{display:none}
`;

// ─── CONSTANTS ───────────────────────────────────────────────────────────
const ZONES = [
  {
    id: "meadow",
    name: "🌸 Квітковий Луг",
    short: "Луг",
    bg: "linear-gradient(165deg,#1c0b35 0%,#3a1070 50%,#1c0b35 100%)",
    star: "#ff6eb4",
    sec: "#ffb3e6",
    par: "petals",
    desc: "Магічні квіти й ніжний вітер",
  },
  {
    id: "cave",
    name: "💎 Кришталева Печера",
    short: "Печера",
    bg: "linear-gradient(165deg,#060612 0%,#140a40 50%,#060612 100%)",
    star: "#8b5cf6",
    sec: "#a78bfa",
    par: "gems",
    desc: "Блискучі кристали у темряві",
  },
  {
    id: "forest",
    name: "🌿 Чарівний Ліс",
    short: "Ліс",
    bg: "linear-gradient(165deg,#071207 0%,#0f3520 50%,#071207 100%)",
    star: "#34d399",
    sec: "#6ee7b7",
    par: "fireflies",
    desc: "Казкові метелики й давні дерева",
  },
  {
    id: "sky",
    name: "☁️ Хмарне Місто",
    short: "Місто",
    bg: "linear-gradient(165deg,#071530 0%,#1e40af 50%,#071530 100%)",
    star: "#60a5fa",
    sec: "#93c5fd",
    par: "clouds",
    desc: "Місто серед хмар і зірок",
  },
  {
    id: "citadel",
    name: "🌈 Веселкова Цитадель",
    short: "Цитадель",
    bg: "linear-gradient(165deg,#1c0a30 0%,#3b0764 50%,#1c0a30 100%)",
    star: "#e879f9",
    sec: "#f0abfc",
    par: "aurora",
    desc: "Центр усієї магії Люміни",
  },
];

const PONY_NAMES = [
  "Зоряна",
  "Перлина",
  "Аметист",
  "Кристал",
  "Місяця",
  "Аврора",
  "Сонечко",
  "Веселка",
  "Смарагд",
  "Серафіна",
  "Іскра",
  "Ніжність",
  "Калейда",
  "Лілія",
  "Корона",
  "Сапфіра",
  "Оніксія",
  "Топаз",
  "Рубінка",
  "Флорель",
  "Індіго",
  "Селена",
  "Цитрін",
  "Галактика",
  "Люмена",
  "Зефіра",
  "Опаліна",
  "Астра",
  "Німбуска",
  "Феєрія",
];
const PALETTES = [
  { body: "#FFB3DE", mane: "#FF6EB4", accent: "#FF3D9A" },
  { body: "#B3D9FF", mane: "#60A5FA", accent: "#2563EB" },
  { body: "#B3FFD9", mane: "#34D399", accent: "#059669" },
  { body: "#E8B3FF", mane: "#C084FC", accent: "#9333EA" },
  { body: "#FFE4B3", mane: "#FBBF24", accent: "#D97706" },
  { body: "#FFB3B3", mane: "#F87171", accent: "#DC2626" },
  { body: "#B3FFF0", mane: "#2DD4BF", accent: "#0D9488" },
  { body: "#D4B3FF", mane: "#818CF8", accent: "#4F46E5" },
  { body: "#F9C0E8", mane: "#EC4899", accent: "#BE185D" },
  { body: "#FFF0B3", mane: "#FDE68A", accent: "#F59E0B" },
  { body: "#C8FFE0", mane: "#10B981", accent: "#065F46" },
  { body: "#FFD4B3", mane: "#F97316", accent: "#C2410C" },
  { body: "#E0D4FF", mane: "#7C3AED", accent: "#4C1D95" },
  { body: "#FFE4F0", mane: "#FB7185", accent: "#BE123C" },
  { body: "#D4F0FF", mane: "#0EA5E9", accent: "#0369A1" },
  { body: "#FDEEFF", mane: "#D946EF", accent: "#86198F" },
];
const TYPE_LABELS = {
  unicorn: "🦄 Єдиноріг",
  pegasus: "🪽 Пегас",
  alicorn: "✨ Аліконь",
  earth: "🌸 Земний",
};
const FOODS = [
  {
    id: "apple",
    name: "Яблуко Мудрості",
    xp: 50,
    stat: "розум",
    emoji: "🍎",
    color: "#ef4444",
  },
  {
    id: "cupcake",
    name: "Зіркове Тістечко",
    xp: 80,
    stat: "щастя",
    emoji: "⭐",
    color: "#fbbf24",
  },
  {
    id: "carrot",
    name: "Чарівна Морквинка",
    xp: 35,
    stat: "сила",
    emoji: "🥕",
    color: "#f97316",
  },
  {
    id: "mushroom",
    name: "Гриб-Чарівник",
    xp: 110,
    stat: "магія",
    emoji: "🍄",
    color: "#8b5cf6",
  },
  {
    id: "berry",
    name: "Магічна Ягода",
    xp: 65,
    stat: "швидкість",
    emoji: "🍇",
    color: "#6366f1",
  },
  {
    id: "honey",
    name: "Медовий Пиріжок",
    xp: 90,
    stat: "любов",
    emoji: "🍯",
    color: "#f59e0b",
  },
];
const QUESTS = [
  {
    id: "q1",
    name: "Збери 5 кристалів",
    desc: "У Кришталевій Печері",
    reward: 100,
    icon: "💎",
    total: 5,
    progress: 0,
  },
  {
    id: "q2",
    name: "Нагодуй поні 3 рази",
    desc: "Відвідай Королівську Кухню",
    reward: 80,
    icon: "🍎",
    total: 3,
    progress: 0,
  },
  {
    id: "q3",
    name: "Вилупи яйце",
    desc: "В Магічному Інкубаторі",
    reward: 200,
    icon: "🥚",
    total: 1,
    progress: 0,
  },
  {
    id: "q4",
    name: "Відкрий 3 зони",
    desc: "Дослідника Люміни",
    reward: 150,
    icon: "🗺️",
    total: 3,
    progress: 1,
  },
  {
    id: "q5",
    name: "Збери 10 веселок",
    desc: "У Веселковій Цитаделі",
    reward: 250,
    icon: "🌈",
    total: 10,
    progress: 0,
  },
];
const MANE_STYLES = ["Хвиляста", "Пряма", "Кучерява", "Королівська", "Зіркова"];
const ACCESSORIES = [
  {
    id: "crown",
    name: "Золота Корона",
    emoji: "👑",
    px: "47%",
    py: "-12%",
    sz: 30,
  },
  {
    id: "moon",
    name: "Зачарований Місяць",
    emoji: "🌙",
    px: "84%",
    py: "8%",
    sz: 24,
  },
  {
    id: "butterfly",
    name: "Метелик Долі",
    emoji: "🦋",
    px: "18%",
    py: "12%",
    sz: 24,
  },
  {
    id: "crystal",
    name: "Кришталева Куля",
    emoji: "🔮",
    px: "82%",
    py: "60%",
    sz: 28,
  },
  {
    id: "lightning",
    name: "Блискавка Сили",
    emoji: "⚡",
    px: "76%",
    py: "28%",
    sz: 22,
  },
  {
    id: "garland",
    name: "Квіткова Корона",
    emoji: "🌺",
    px: "46%",
    py: "-8%",
    sz: 26,
  },
  {
    id: "stardust",
    name: "Зоряний Пил",
    emoji: "✨",
    px: "12%",
    py: "48%",
    sz: 22,
  },
  {
    id: "ribbon",
    name: "Шовкова Стрічка",
    emoji: "🎀",
    px: "74%",
    py: "20%",
    sz: 22,
  },
];
const NEEDS = [
  ["🍕", "Хочу їсти!"],
  ["😴", "Хочу спати!"],
  ["💖", "Пограймо!"],
  ["💧", "Хочу пити!"],
  ["🌸", "На прогулянку!"],
  ["🎵", "Хочу музику!"],
];

// ─── HOOKS / UTILS ───────────────────────────────────────────────────────
function useLS(key, def) {
  const [v, setV] = useState(() => {
    try {
      const s = localStorage.getItem(key);
      return s !== null ? JSON.parse(s) : def;
    } catch {
      return def;
    }
  });
  const set = useCallback(
    (val) => {
      setV((prev) => {
        const next = typeof val === "function" ? val(prev) : val;
        try {
          localStorage.setItem(key, JSON.stringify(next));
        } catch {}
        return next;
      });
    },
    [key]
  );
  return [v, set];
}

function hexR(h = "#888888") {
  const c = h.replace("#", "");
  const n = parseInt(c.length === 6 ? c : c + c, 16) || 0;
  return `${(n >> 16) & 255},${(n >> 8) & 255},${n & 255}`;
}

function rand(mn, mx) {
  return mn + Math.random() * (mx - mn);
}

// ─── CONFETTI ─────────────────────────────────────────────────────────────
function Confetti({ active, burst }) {
  const pieces = useMemo(() => {
    if (!active) return [];
    const cols = [
      "#ff6eb4",
      "#8b5cf6",
      "#60a5fa",
      "#34d399",
      "#fbbf24",
      "#f472b6",
      "#a78bfa",
      "#6ee7b7",
      "#c084fc",
      "#fb7185",
    ];
    return Array.from({ length: burst ? 120 : 70 }, (_, i) => ({
      id: i,
      x: 5 + Math.random() * 90,
      col: cols[i % cols.length],
      delay: Math.random() * 1.1,
      dur: 1.5 + Math.random() * 1.3,
      rot: `${(Math.random() - 0.5) * 1800}deg`,
      sz: 6 + Math.random() * 9,
      shape: Math.random() > 0.5 ? "50%" : "2px",
    }));
  }, [active, burst]);
  if (!active) return null;
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 9999,
        overflow: "hidden",
      }}
    >
      {pieces.map((p) => (
        <div
          key={p.id}
          style={{
            position: "absolute",
            left: `${p.x}%`,
            top: 0,
            width: p.sz,
            height: p.sz,
            background: p.col,
            borderRadius: p.shape,
            "--r": p.rot,
            animation: `confetti-p ${p.dur}s ease-in ${p.delay}s forwards`,
            willChange: "transform",
          }}
        />
      ))}
    </div>
  );
}

// ─── PARTICLE SYSTEMS ────────────────────────────────────────────────────
function Petals() {
  const items = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        left: rand(0, 100),
        delay: rand(0, 10),
        dur: rand(7, 14),
        sz: rand(9, 22),
        col: ["#ff6eb4", "#ffb3de", "#ff9de2", "#ffd6f0", "#f9a8d4", "#fbcfe8"][
          i % 6
        ],
        rot: rand(0, 360),
      })),
    []
  );
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      {items.map((p) => (
        <div
          key={p.id}
          style={{
            position: "absolute",
            left: `${p.left}%`,
            top: -20,
            width: p.sz,
            height: p.sz * 0.78,
            background: `radial-gradient(ellipse at 40% 35%,${p.col},${p.col}88)`,
            borderRadius: "50% 0 50% 0",
            transform: `rotate(${p.rot}deg)`,
            animation: `petal ${p.dur}s ease-in ${p.delay}s infinite`,
            willChange: "transform",
            filter: `drop-shadow(0 0 3px ${p.col}88)`,
          }}
        />
      ))}
    </div>
  );
}

function Gems() {
  const items = useMemo(
    () =>
      Array.from({ length: 26 }, (_, i) => ({
        id: i,
        left: rand(3, 95),
        top: rand(5, 88),
        delay: rand(0, 3),
        col: ["#c084fc", "#818cf8", "#60a5fa", "#a78bfa", "#8b5cf6", "#7c3aed"][
          i % 6
        ],
        sz: rand(4, 11),
        dur: rand(1.2, 3.4),
      })),
    []
  );
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      {items.map((g) => (
        <div
          key={g.id}
          style={{
            position: "absolute",
            left: `${g.left}%`,
            top: `${g.top}%`,
            width: g.sz,
            height: g.sz,
            background: g.col,
            transform: "rotate(45deg)",
            animation: `gem-pulse ${g.dur}s ease-in-out ${g.delay}s infinite`,
            filter: `drop-shadow(0 0 5px ${g.col})`,
            willChange: "filter,opacity",
          }}
        />
      ))}
    </div>
  );
}

function Fireflies() {
  const items = useMemo(
    () =>
      Array.from({ length: 30 }, (_, i) => ({
        id: i,
        left: rand(2, 93),
        top: rand(3, 90),
        delay: rand(0, 7),
        sz: rand(3, 7),
        dur: rand(3.5, 8),
        col: ["#fef08a", "#34d399", "#a3e635", "#d9f99d", "#bbf7d0", "#fef9c3"][
          i % 6
        ],
      })),
    []
  );
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      {items.map((f) => (
        <div
          key={f.id}
          style={{
            position: "absolute",
            left: `${f.left}%`,
            top: `${f.top}%`,
            width: f.sz,
            height: f.sz,
            borderRadius: "50%",
            background: f.col,
            boxShadow: `0 0 ${f.sz * 2.5}px ${f.col}, 0 0 ${f.sz * 5}px ${
              f.col
            }88`,
            animation: `firefly ${f.dur}s ease-in-out ${f.delay}s infinite`,
            willChange: "transform,opacity",
          }}
        />
      ))}
    </div>
  );
}

function Clouds() {
  const items = useMemo(
    () =>
      Array.from({ length: 9 }, (_, i) => ({
        id: i,
        left: rand(0, 75),
        top: rand(5, 60),
        w: rand(90, 220),
        delay: i * 1.4,
        dur: rand(7, 13),
      })),
    []
  );
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      {items.map((c) => (
        <div
          key={c.id}
          style={{
            position: "absolute",
            left: `${c.left}%`,
            top: `${c.top}%`,
            width: c.w,
            height: c.w * 0.45,
            background:
              "radial-gradient(ellipse,rgba(200,220,255,.7) 0%,transparent 70%)",
            borderRadius: "50%",
            opacity: rand(0.07, 0.18),
            animation: `cloud-drift ${c.dur}s ease-in-out ${c.delay}s infinite alternate`,
            filter: "blur(9px)",
            willChange: "transform",
          }}
        />
      ))}
    </div>
  );
}

function Aurora() {
  const bands = [
    { col: "rgba(244,114,182,.6)", top: 12, h: 65, delay: 0, dur: 9 },
    { col: "rgba(196,181,253,.5)", top: 24, h: 45, delay: 1.8, dur: 11 },
    { col: "rgba(34,211,238,.45)", top: 36, h: 80, delay: 3.6, dur: 13 },
    { col: "rgba(110,231,183,.5)", top: 50, h: 55, delay: 5.2, dur: 10 },
    { col: "rgba(249,168,212,.4)", top: 60, h: 40, delay: 7, dur: 12 },
  ];
  const stars = useMemo(
    () =>
      Array.from({ length: 35 }, (_, i) => ({
        id: i,
        l: rand(1, 99),
        t: rand(1, 99),
        sz: rand(2, 5),
        dur: rand(1.5, 4),
        delay: rand(0, 5),
      })),
    []
  );
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      {stars.map((s) => (
        <div
          key={s.id}
          style={{
            position: "absolute",
            left: `${s.l}%`,
            top: `${s.t}%`,
            width: s.sz,
            height: s.sz,
            borderRadius: "50%",
            background: "white",
            animation: `star-twinkle ${s.dur}s ease-in-out ${s.delay}s infinite`,
          }}
        />
      ))}
      {bands.map((b, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: `${b.top}%`,
            left: "-130%",
            width: "85%",
            height: b.h,
            background: `linear-gradient(90deg,transparent,${b.col},transparent)`,
            transform: "skewX(-22deg)",
            animation: `aurora ${b.dur}s ease-in-out ${b.delay}s infinite`,
            filter: "blur(12px)",
            willChange: "transform",
          }}
        />
      ))}
    </div>
  );
}

function ZoneParticles({ zoneId }) {
  const M = {
    meadow: Petals,
    cave: Gems,
    forest: Fireflies,
    sky: Clouds,
    citadel: Aurora,
  };
  const C = M[zoneId];
  return C ? <C /> : null;
}

// ─── MANE SHAPE LIBRARY ───────────────────────────────────────────────────
function ManePaths({ style = 0, mC, aC, uid, animated }) {
  // 0 Хвиляста, 1 Пряма, 2 Кучерява, 3 Королівська, 4 Зіркова
  if (style === 1)
    return (
      // STRAIGHT
      <>
        <path
          d="M92 43 L110 53 L112 78 L108 112 L100 120 L96 110 L104 82 L106 55 L95 48Z"
          fill={mC}
          opacity=".5"
        />
        <path
          d="M90 42 L108 52 L110 76 L106 110 L98 118 L93 108 L101 80 L103 53 L93 47Z"
          fill={`url(#mg-${uid})`}
          opacity=".9"
        />
        <path
          d="M75 43 Q68 36 64 46 Q62 56 69 61 Q63 54 65 45 Q68 37 75 43Z"
          fill={`url(#mg-${uid})`}
        />
        <path
          d="M90 43 L106 56 L107 80 L103 112"
          fill="none"
          stroke="rgba(255,255,255,.36)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </>
    );
  if (style === 2)
    return (
      // CURLY
      <>
        <path
          d="M93 44 Q118 52 114 70 Q110 86 120 94 Q128 102 116 116 Q104 128 96 120 Q110 108 110 96 Q100 86 108 70 Q114 54 96 48Z"
          fill={mC}
          opacity=".48"
        />
        <path
          d="M91 42 Q116 50 112 68 Q108 84 118 92 Q126 100 114 114 Q102 126 93 118 Q107 106 107 94 Q97 84 105 68 Q111 52 94 46Z"
          fill={`url(#mg-${uid})`}
          opacity=".88"
        />
        {/* Curl spirals */}
        <path
          d="M96 50 Q112 58 108 70"
          fill="none"
          stroke="rgba(255,255,255,.5)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M108 72 Q120 82 114 94"
          fill="none"
          stroke="rgba(255,255,255,.4)"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M114 96 Q124 106 114 116"
          fill="none"
          stroke="rgba(255,255,255,.35)"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M75 44 Q64 36 61 47 Q59 58 68 62 Q61 54 63 45 Q66 37 75 44Z"
          fill={`url(#mg-${uid})`}
        />
        {/* Extra curl forelock */}
        <path
          d="M73 44 Q63 38 60 50 Q58 62 66 66"
          fill="none"
          stroke={aC}
          strokeWidth="2.4"
          opacity=".65"
          strokeLinecap="round"
        />
      </>
    );
  if (style === 3)
    return (
      // ROYAL — big dramatic cascading
      <>
        <path
          d="M93 44 Q122 48 128 68 Q134 90 124 110 Q116 128 106 134 Q118 122 120 106 Q130 88 124 66 Q118 48 96 50Z"
          fill={mC}
          opacity=".44"
        />
        <path
          d="M91 42 Q120 46 126 66 Q132 88 122 108 Q114 126 102 132 Q116 120 118 104 Q128 86 122 64 Q116 46 94 48Z"
          fill={`url(#mg-${uid})`}
          opacity=".7"
        />
        {/* Inner layer */}
        <path
          d="M90 43 Q112 52 116 76 Q119 98 108 114 Q100 124 93 120 Q106 108 108 90 Q112 68 94 52Z"
          fill={`url(#mg-${uid})`}
          opacity=".9"
        />
        {/* Royal forelock */}
        <path
          d="M76 44 Q62 34 58 46 Q55 58 64 64 Q57 56 59 44 Q63 34 76 44Z"
          fill={`url(#mg-${uid})`}
        />
        <path
          d="M74 44 Q66 32 61 44 Q58 56 66 62"
          fill="none"
          stroke={aC}
          strokeWidth="2.6"
          opacity=".7"
          strokeLinecap="round"
        />
        {/* Sheen lines */}
        <path
          d="M92 44 Q116 60 118 84 Q120 102 110 118"
          fill="none"
          stroke="rgba(255,255,255,.4)"
          strokeWidth="3.2"
          strokeLinecap="round"
        />
        <path
          d="M96 48 Q120 64 122 88 Q124 106 113 122"
          fill="none"
          stroke="rgba(255,255,255,.2)"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        {/* Floating strand */}
        <path
          d="M100 50 Q130 58 132 80 Q134 98 122 114"
          fill="none"
          stroke={mC}
          strokeWidth="2"
          opacity=".55"
          strokeLinecap="round"
          strokeDasharray="4 4"
        />
      </>
    );
  if (style === 4)
    return (
      // STAR — with sparkle decorations
      <>
        <path
          d="M94 44 Q113 55 119 79 Q123 99 113 114 Q105 125 97 121 Q109 107 111 88 Q114 67 97 53Z"
          fill={mC}
          opacity=".48"
        />
        <path
          d="M91 42 Q111 53 116 76 Q119 96 109 111 Q101 122 93 118 Q105 104 107 85 Q110 62 94 50Z"
          fill={`url(#mg-${uid})`}
          opacity=".88"
        />
        <path
          d="M76 44 Q65 37 62 48 Q60 58 68 62 Q62 55 64 46 Q67 38 76 44Z"
          fill={`url(#mg-${uid})`}
        />
        {/* Star sparkles along mane */}
        {[
          [100, 56],
          [108, 74],
          [112, 94],
          [106, 114],
        ].map(([sx, sy], si) => (
          <g
            key={si}
            style={{
              animation: `star-twinkle ${1 + si * 0.3}s ease-in-out ${
                si * 0.4
              }s infinite`,
            }}
          >
            <path
              d={`M${sx} ${sy - 5} L${sx + 2} ${sy - 1} L${sx + 5} ${sy} L${
                sx + 2
              } ${sy + 1} L${sx} ${sy + 5} L${sx - 2} ${sy + 1} L${
                sx - 5
              } ${sy} L${sx - 2} ${sy - 1}Z`}
              fill={aC}
              opacity=".9"
            />
          </g>
        ))}
        <path
          d="M92 44 Q108 58 111 80 Q113 96 104 112"
          fill="none"
          stroke="rgba(255,255,255,.4)"
          strokeWidth="2.6"
          strokeLinecap="round"
        />
      </>
    );
  // DEFAULT: style 0 — WAVY
  return (
    <>
      <path
        d="M94 44 Q113 55 119 79 Q123 99 113 114 Q105 125 97 121 Q109 107 111 88 Q114 67 97 53Z"
        fill={mC}
        opacity=".48"
      />
      <path
        d="M91 42 Q111 53 116 76 Q119 96 109 111 Q101 122 93 118 Q105 104 107 85 Q110 62 94 50Z"
        fill={`url(#mg-${uid})`}
        opacity=".88"
      />
      <path
        d="M76 44 Q65 37 62 48 Q60 58 68 62 Q62 55 64 46 Q67 38 76 44Z"
        fill={`url(#mg-${uid})`}
      />
      <path
        d="M74 44 Q69 34 65 44 Q63 53 70 58"
        fill="none"
        stroke={aC}
        strokeWidth="2.2"
        opacity=".6"
        strokeLinecap="round"
      />
      <path
        d="M92 44 Q108 58 111 80 Q113 96 104 112"
        fill="none"
        stroke="rgba(255,255,255,.36)"
        strokeWidth="2.8"
        strokeLinecap="round"
      />
      <path
        d="M95 47 Q110 62 113 83 Q115 98 106 113"
        fill="none"
        stroke="rgba(255,255,255,.16)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </>
  );
}

// ─── PONY RENDERER ────────────────────────────────────────────────────────
function PonyRenderer({ pony, size = 200, animated = true, glow = false }) {
  const {
    body = "#FFB3DE",
    mane = "#FF6EB4",
    accent = "#FF3D9A",
  } = pony?.colors || {};
  const type = pony?.type || "unicorn";
  const maneStyle = pony?.maneStyle ?? 0;
  const isU = type === "unicorn" || type === "alicorn";
  const isP = type === "pegasus" || type === "alicorn";
  const isSecret = !!pony?.secret;
  const uid = pony?.id || "dflt";

  const bC = isSecret ? "rgba(40,0,80,0.55)" : body;
  const mC = isSecret ? "#00e5ff" : mane;
  const aC = isSecret ? "#00e5ff" : accent;

  const filt = isSecret
    ? "drop-shadow(0 0 10px #00e5ff) drop-shadow(0 0 28px #9900ff) drop-shadow(0 0 55px #00e5ff66)"
    : glow
    ? `drop-shadow(0 0 10px ${aC}88) drop-shadow(0 0 24px ${aC}44)`
    : "drop-shadow(0 0 6px rgba(0,0,0,.4))";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 215"
      style={{
        filter: filt,
        animation: animated ? "breathe 3.5s ease-in-out infinite" : "none",
        willChange: "transform",
        display: "block",
        overflow: "visible",
      }}
    >
      <defs>
        <linearGradient id={`bg-${uid}`} x1="0%" y1="0%" x2="90%" y2="100%">
          <stop offset="0%" stopColor={bC} />
          <stop offset="100%" stopColor={aC} stopOpacity="0.4" />
        </linearGradient>
        <linearGradient id={`mg-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={mC} />
          <stop offset="45%" stopColor={aC} />
          <stop offset="100%" stopColor={mC} />
        </linearGradient>
        <linearGradient id={`hg-${uid}`} x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#d8d0ff" />
          <stop offset="100%" stopColor="#ffffff" />
        </linearGradient>
        <radialGradient id={`eg-${uid}`} cx="38%" cy="32%">
          <stop offset="0%" stopColor={isSecret ? "#00ffff" : "#c084fc"} />
          <stop offset="100%" stopColor={isSecret ? "#003355" : "#2e1065"} />
        </radialGradient>
        <radialGradient id={`shine-${uid}`} cx="33%" cy="28%">
          <stop offset="0%" stopColor="rgba(255,255,255,.22)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
      </defs>

      {/* WINGS */}
      {isP && (
        <g
          style={{
            transformOrigin: "80px 118px",
            animation: animated
              ? "wing-flap .65s ease-in-out infinite"
              : "none",
            willChange: "transform",
          }}
        >
          <path
            d="M62 112 Q16 86 10 60 Q36 76 60 106Z"
            fill={`url(#mg-${uid})`}
            opacity=".65"
          />
          <path d="M62 112 Q6 93 2 70 Q30 83 60 108Z" fill={mC} opacity=".35" />
          <path
            d="M62 112 Q22 80 16 56"
            stroke={aC}
            strokeWidth="1.5"
            fill="none"
            opacity=".5"
            strokeLinecap="round"
          />
          <path
            d="M92 112 Q138 86 144 60 Q118 76 94 106Z"
            fill={`url(#mg-${uid})`}
            opacity=".65"
          />
          <path
            d="M92 112 Q148 93 152 70 Q124 83 94 108Z"
            fill={mC}
            opacity=".35"
          />
          <path
            d="M92 112 Q132 80 138 56"
            stroke={aC}
            strokeWidth="1.5"
            fill="none"
            opacity=".5"
            strokeLinecap="round"
          />
        </g>
      )}

      {/* BODY */}
      <ellipse cx="100" cy="140" rx="60" ry="40" fill={`url(#bg-${uid})`} />
      <ellipse cx="100" cy="126" rx="56" ry="37" fill={bC} />
      <ellipse cx="83" cy="114" rx="28" ry="20" fill={`url(#shine-${uid})`} />

      {/* LEGS */}
      {[63, 81, 99, 117].map((x, i) => (
        <g key={i}>
          <rect x={x} y={164} width={14} height={30} rx={7} fill={bC} />
          <rect
            x={x}
            y={184}
            width={14}
            height={12}
            rx={6}
            fill={aC}
            opacity=".75"
          />
          <ellipse cx={x + 7} cy={196} rx={8} ry={4} fill={aC} opacity=".55" />
        </g>
      ))}

      {/* NECK */}
      <path d="M72 127 Q64 97 69 77 Q77 74 90 77 Q96 97 90 127Z" fill={bC} />
      <path
        d="M74 124 Q67 97 71 79 Q77 77 87 79 Q93 97 89 124Z"
        fill={`url(#shine-${uid})`}
        opacity=".28"
      />

      {/* HEAD */}
      <ellipse cx="76" cy="64" rx="30" ry="26" fill={`url(#bg-${uid})`} />
      <ellipse cx="76" cy="63" rx="28" ry="24" fill={bC} />

      {/* MUZZLE */}
      <ellipse cx="61" cy="74" rx="16" ry="13" fill={bC} />
      <ellipse cx="61" cy="78" rx="11" ry="8" fill={aC} opacity=".32" />
      <ellipse cx="57" cy="77" rx="3" ry="2.5" fill={aC} opacity=".65" />
      <ellipse cx="65" cy="77" rx="3" ry="2.5" fill={aC} opacity=".65" />
      <path
        d="M56 83 Q61 88 66 83"
        stroke={aC}
        strokeWidth="1.8"
        fill="none"
        opacity=".7"
        strokeLinecap="round"
      />

      {/* EARS */}
      <g
        style={{
          transformOrigin: "90px 42px",
          animation: animated
            ? "ear-twitch 4.5s ease-in-out 1.2s infinite"
            : "none",
        }}
      >
        <polygon points="87,44 93,22 99,44" fill={bC} />
        <polygon points="88,43 93,26 98,43" fill={aC} opacity=".42" />
      </g>
      <polygon points="62,46 57,24 52,46" fill={bC} />
      <polygon points="61,45 57,27 53,45" fill={aC} opacity=".42" />

      {/* HORN */}
      {isU && (
        <g
          style={{
            animation: animated
              ? `horn-glow 2.2s ease-in-out infinite`
              : "none",
          }}
        >
          <path d="M91 42 L84 10 L77 42Z" fill={`url(#hg-${uid})`} />
          <path d="M89 40 L84 14 L79 40Z" fill="rgba(255,255,255,.44)" />
          <line
            x1="84"
            y1="40"
            x2="80"
            y2="17"
            stroke="rgba(192,132,252,.65)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <line
            x1="84"
            y1="36"
            x2="88"
            y2="17"
            stroke="rgba(192,132,252,.38)"
            strokeWidth="1.1"
            strokeLinecap="round"
          />
        </g>
      )}

      {/* MAIN EYE */}
      <g
        style={{
          transformOrigin: "82px 62px",
          animation: animated ? "blink 4.8s ease-in-out 2s infinite" : "none",
          willChange: "transform",
        }}
      >
        <ellipse cx="82" cy="62" rx="11" ry="13" fill={`url(#eg-${uid})`} />
        <ellipse
          cx="82"
          cy="63"
          rx="7"
          ry="9"
          fill={isSecret ? "#002244" : "#1e1b4b"}
        />
        <ellipse
          cx="82"
          cy="65"
          rx="4"
          ry="5.5"
          fill={isSecret ? "#00e5ff" : "#c084fc"}
        />
        <ellipse
          cx="78.5"
          cy="58.5"
          rx="2.5"
          ry="3"
          fill="white"
          opacity=".9"
        />
        <ellipse
          cx="84"
          cy="65"
          rx="1.2"
          ry="1.5"
          fill="rgba(255,255,255,.5)"
        />
        {[
          [-10, 3, -9, -4],
          [-5, 1, -5, -7],
          [0, 0, 0, -8],
          [5, 1, 5, -7],
          [9, 3, 9, -4],
        ].map(([ox1, oy1, ox2, oy2], li) => (
          <line
            key={li}
            x1={82 + ox1}
            y1={62 - 11 + oy1}
            x2={82 + ox2}
            y2={62 - 16 + oy2}
            stroke={isSecret ? "#00e5ff" : mC}
            strokeWidth="1.9"
            strokeLinecap="round"
          />
        ))}
        <path d="M71 62 Q82 52 93 62" fill={bC} />
      </g>
      {/* SIDE EYE */}
      <ellipse cx="59" cy="62" rx="6" ry="7" fill={`url(#eg-${uid})`} />
      <ellipse
        cx="59"
        cy="63"
        rx="3.5"
        ry="4.5"
        fill={isSecret ? "#002244" : "#1e1b4b"}
      />
      <ellipse
        cx="59"
        cy="64"
        rx="2"
        ry="2.8"
        fill={isSecret ? "#00e5ff" : "#c084fc"}
      />
      <circle cx="57.5" cy="60" r="1.3" fill="white" opacity=".8" />

      {/* MANE */}
      <ManePaths
        style={maneStyle}
        mC={mC}
        aC={aC}
        uid={uid}
        animated={animated}
      />

      {/* TAIL */}
      <g
        style={{
          transformOrigin: "158px 152px",
          animation: animated ? "tail-wag 2.4s ease-in-out infinite" : "none",
          willChange: "transform",
        }}
      >
        <path
          d="M153 149 Q173 145 181 157 Q189 172 177 182 Q163 190 154 178 Q166 174 171 163 Q177 151 159 153Z"
          fill={mC}
          opacity=".5"
        />
        <path
          d="M154 147 Q171 142 178 154 Q185 168 172 178 Q159 186 151 175 Q163 171 168 160 Q174 146 156 150Z"
          fill={`url(#mg-${uid})`}
          opacity=".92"
        />
        <path
          d="M155 148 Q169 144 175 155 Q180 164 173 173"
          fill="none"
          stroke="rgba(255,255,255,.36)"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      </g>

      {/* SECRET OVERLAY */}
      {isSecret && (
        <>
          <ellipse
            cx="100"
            cy="132"
            rx="62"
            ry="43"
            fill="none"
            stroke="#00e5ff"
            strokeWidth="1.2"
            opacity=".4"
            style={{ animation: "secret-glow 1.8s ease-in-out infinite" }}
          />
          <ellipse
            cx="100"
            cy="132"
            rx="55"
            ry="37"
            fill="rgba(0,229,255,.03)"
          />
        </>
      )}
    </svg>
  );
}

// ─── HATCHERY VIEW ────────────────────────────────────────────────────────
function HatcheryView({ onHatch }) {
  const [clicks, setClicks] = useState(0);
  const [shakeCls, setShakeCls] = useState("");
  const [hatched, setHatched] = useState(false);
  const [newPony, setNewPony] = useState(null);
  const [whiteout, setWhiteout] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const [eggGlow, setEggGlow] = useState(false);
  const TOTAL = 10;

  const makePony = useCallback(() => {
    const typePool = [
      "unicorn",
      "unicorn",
      "pegasus",
      "pegasus",
      "alicorn",
      "alicorn",
      "earth",
    ];
    return {
      id: `p_${Date.now()}`,
      name: PONY_NAMES[Math.floor(Math.random() * PONY_NAMES.length)],
      type: typePool[Math.floor(Math.random() * typePool.length)],
      colors: PALETTES[Math.floor(Math.random() * PALETTES.length)],
      level: 1,
      xp: 0,
      mood: 100,
      maneStyle: 0,
      accessories: [],
    };
  }, []);

  const handleClick = useCallback(() => {
    if (hatched) return;
    const next = clicks + 1;
    setClicks(next);
    setEggGlow(true);
    setTimeout(() => setEggGlow(false), 300);
    const cls = next <= 3 ? "shake-sm" : next <= 7 ? "shake-md" : "shake-lg";
    setShakeCls(cls);
    setTimeout(() => setShakeCls(""), 520);
    if (next >= TOTAL) {
      setTimeout(() => {
        setWhiteout(true);
        setTimeout(() => {
          const p = makePony();
          setNewPony(p);
          setHatched(true);
          setWhiteout(false);
          setConfetti(true);
          onHatch(p);
          setTimeout(() => setConfetti(false), 5000);
        }, 800);
      }, 300);
    }
  }, [clicks, hatched, makePony, onHatch]);

  const cracks = useMemo(() => {
    const all = [];
    if (clicks >= 2) all.push({ d: "M100 82 L118 104 L106 124", w: 1.4 });
    if (clicks >= 4) all.push({ d: "M88 92 L76 114 L88 134", w: 1.6 });
    if (clicks >= 6) all.push({ d: "M122 88 L134 110 L118 130", w: 1.8 });
    if (clicks >= 8) all.push({ d: "M95 74 L83 88 L70 102", w: 2.0 });
    if (clicks >= 9) all.push({ d: "M105 76 L118 90 L130 104", w: 2.0 });
    return all;
  }, [clicks]);

  const reset = () => {
    setClicks(0);
    setHatched(false);
    setNewPony(null);
    setWhiteout(false);
    setConfetti(false);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        gap: 16,
        padding: "0 20px",
        position: "relative",
      }}
    >
      <Confetti active={confetti} burst />
      {whiteout && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "white",
            zIndex: 9998,
            animation: "whiteout 1s ease-out forwards",
          }}
        />
      )}

      {!hatched ? (
        <>
          <div style={{ textAlign: "center" }}>
            <h2
              className="ub"
              style={{
                color: "#c4b5fd",
                fontSize: 19,
                textShadow: "0 0 22px #8b5cf6",
              }}
            >
              ✨ Магічний Інкубатор
            </h2>
            <p
              style={{
                color: "rgba(255,255,255,.5)",
                fontSize: 13,
                marginTop: 6,
              }}
            >
              {clicks < TOTAL
                ? `Натисни ще ${TOTAL - clicks} разів!`
                : "Вилуплення..."}
            </p>
          </div>

          {/* EGG */}
          <div
            onClick={handleClick}
            className="mbtn"
            style={{
              animation: shakeCls
                ? `${shakeCls} 0.52s ease-in-out`
                : "float 3.5s ease-in-out infinite",
              willChange: "transform",
              position: "relative",
            }}
          >
            <svg
              width={170}
              height={215}
              viewBox="0 0 160 210"
              style={{
                filter: eggGlow
                  ? "drop-shadow(0 0 28px #8b5cf6) drop-shadow(0 0 55px #7c3aed)"
                  : "drop-shadow(0 0 12px #6d28d9)",
              }}
            >
              <defs>
                <radialGradient id="eB" cx="38%" cy="32%">
                  <stop offset="0%" stopColor="#a78bfa" />
                  <stop offset="35%" stopColor="#7c3aed" />
                  <stop offset="100%" stopColor="#1e1b4b" />
                </radialGradient>
                <radialGradient id="eS" cx="28%" cy="24%">
                  <stop offset="0%" stopColor="rgba(255,255,255,.65)" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                </radialGradient>
              </defs>
              <ellipse
                cx="80"
                cy="115"
                rx="72"
                ry="92"
                fill="rgba(139,92,246,.2)"
                style={{ animation: "horn-glow 2.5s ease-in-out infinite" }}
              />
              <ellipse cx="80" cy="112" rx="62" ry="82" fill="url(#eB)" />
              <polygon
                points="80,50 100,80 80,95 60,80"
                fill="rgba(196,181,253,.16)"
                stroke="rgba(196,181,253,.38)"
                strokeWidth=".6"
              />
              <polygon
                points="80,95 100,80 118,108 100,128"
                fill="rgba(109,40,217,.25)"
                stroke="rgba(196,181,253,.25)"
                strokeWidth=".6"
              />
              <polygon
                points="80,95 60,80 42,108 60,128"
                fill="rgba(91,33,182,.25)"
                stroke="rgba(196,181,253,.25)"
                strokeWidth=".6"
              />
              <polygon
                points="80,95 60,128 80,142 100,128"
                fill="rgba(124,58,237,.2)"
                stroke="rgba(196,181,253,.2)"
                strokeWidth=".6"
              />
              <ellipse
                cx="55"
                cy="72"
                rx="22"
                ry="30"
                fill="url(#eS)"
                transform="rotate(-18,55,72)"
              />
              <ellipse
                cx="80"
                cy="112"
                rx="38"
                ry="50"
                fill="rgba(167,139,250,.1)"
                style={{ animation: "horn-glow 1.8s ease-in-out infinite" }}
              />
              <ellipse
                cx="80"
                cy="112"
                rx="60"
                ry="80"
                fill="none"
                stroke="rgba(196,181,253,.22)"
                strokeWidth="1"
                strokeDasharray="4 6"
              />
              {cracks.map((c, i) => (
                <path
                  key={i}
                  d={c.d}
                  stroke="rgba(255,255,255,.9)"
                  strokeWidth={c.w}
                  fill="none"
                  strokeLinecap="round"
                  style={{ filter: "drop-shadow(0 0 3px white)" }}
                />
              ))}
              {clicks > 0 &&
                Array.from({ length: Math.min(clicks, 7) }).map((_, i) => (
                  <text
                    key={i}
                    x={22 + i * 17}
                    y={28 + Math.sin(i * 1.2) * 16}
                    fontSize="10"
                    style={{
                      animation: `gem-pulse ${0.8 + i * 0.2}s infinite`,
                    }}
                  >
                    ✨
                  </text>
                ))}
            </svg>
            {eggGlow && (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "50%",
                  border: "3px solid rgba(139,92,246,.8)",
                  animation: "pulse-ring .6s ease-out forwards",
                }}
              />
            )}
          </div>

          {/* PROGRESS BAR */}
          <div style={{ width: "100%", maxWidth: 270 }}>
            <div
              className="glass"
              style={{
                borderRadius: 20,
                height: 14,
                overflow: "hidden",
                padding: 2,
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${(clicks / TOTAL) * 100}%`,
                  background:
                    "linear-gradient(90deg,#6d28d9,#8b5cf6,#c084fc,#f472b6)",
                  borderRadius: 18,
                  transition: "width .35s ease",
                  boxShadow: "0 0 12px #8b5cf6",
                }}
              />
            </div>
            <p
              style={{
                color: "rgba(255,255,255,.38)",
                fontSize: 12,
                textAlign: "center",
                marginTop: 6,
              }}
            >
              {clicks}/{TOTAL} ударів
            </p>
          </div>
          <p style={{ color: "rgba(255,255,255,.25)", fontSize: 11 }}>
            💡 Що більше б'єш — то сильніше тріщить!
          </p>
        </>
      ) : (
        /* HATCHED STATE */
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 14,
            animation: "shadow-reveal .9s ease-out forwards",
          }}
        >
          <h2
            className="ub"
            style={{
              color: "#fbbf24",
              fontSize: 22,
              textAlign: "center",
              textShadow: "0 0 30px #fbbf24,0 0 60px #f59e0b",
            }}
          >
            🎉 Вилупилось!
          </h2>
          <div style={{ animation: "bounce 2.2s ease-in-out infinite" }}>
            <PonyRenderer pony={newPony} size={190} animated glow />
          </div>
          <div
            className="glass"
            style={{
              borderRadius: 22,
              padding: "18px 28px",
              textAlign: "center",
              border: `1px solid ${newPony?.colors?.accent || "#fff"}55`,
            }}
          >
            <p style={{ color: "rgba(255,255,255,.5)", fontSize: 12 }}>
              Твій новий поні...
            </p>
            <h3
              className="ub"
              style={{
                color: newPony?.colors?.accent || "#fff",
                fontSize: 22,
                margin: "8px 0 4px",
                textShadow: `0 0 16px ${newPony?.colors?.accent || "#fff"}`,
              }}
            >
              {newPony?.name}
            </h3>
            <p style={{ color: "rgba(255,255,255,.55)", fontSize: 13 }}>
              {TYPE_LABELS[newPony?.type]}
            </p>
          </div>
          <button
            className="mbtn"
            onClick={reset}
            style={{
              background: "linear-gradient(135deg,#6d28d9,#8b5cf6)",
              border: "none",
              borderRadius: 50,
              padding: "12px 34px",
              color: "white",
              fontFamily: "Nunito,sans-serif",
              fontWeight: 800,
              fontSize: 15,
              boxShadow: "0 4px 24px rgba(109,40,217,.55)",
              cursor: "pointer",
            }}
          >
            ✨ Вилупити ще!
          </button>
        </div>
      )}
    </div>
  );
}

// ─── THRONE VIEW ──────────────────────────────────────────────────────────
const TITLES = [
  { min: 1, title: "Юна Чарівниця", sub: "Щойно ступила на магічний шлях" },
  { min: 3, title: "Хранителька Світла", sub: "Твоє серце сяє, як зоря" },
  { min: 5, title: "Повелителька Поні", sub: "Поні обожнюють тебе всі!" },
  { min: 8, title: "Архімагиня Люміни", sub: "Магія підкоряється твоїй волі" },
  {
    min: 12,
    title: "Легендарна Аліконь",
    sub: "Твоя слава розлетілась по всіх зонах",
  },
  {
    min: 20,
    title: "Богиня Веселки",
    sub: "Навіть зірки схиляються перед тобою",
  },
];
const PRAISES = [
  "✨ Ти найкраща Чарівниця у всій Люміні!",
  "🌟 Зірки сяють яскравіше, коли ти поруч!",
  "💖 Твоя магія наповнює серця радістю!",
  "🦄 Поні мріють бути такими ж прекрасними!",
  "🌈 Кожен твій крок — це диво!",
  "👑 Люміна обрала тебе своєю королевою!",
  "💫 Твій дух яскравіший за тисячу зірок!",
  "🔮 Давня магія живе у твоєму серці!",
  "🌸 Квіти розквітають від твоєї посмішки!",
  "⚡ Ти потужніша за будь-яку бурю!",
];

function ThroneView({
  playerName,
  level,
  xp,
  shards,
  gallery,
  quests,
  zone,
  activePony,
}) {
  const [praiseIdx, setPraiseIdx] = useState(0);
  const [praiseAnim, setPraiseAnim] = useState(true);
  const [particles, setParticles] = useState([]);

  const titleData = useMemo(() => {
    const found = [...TITLES].reverse().find((t) => level >= t.min);
    return found || TITLES[0];
  }, [level]);

  // Cycle praises
  useEffect(() => {
    const t = setInterval(() => {
      setPraiseAnim(false);
      setTimeout(() => {
        setPraiseIdx((i) => (i + 1) % PRAISES.length);
        setPraiseAnim(true);
      }, 320);
    }, 4000);
    return () => clearInterval(t);
  }, []);

  // Floating throne particles
  const throneParticles = useMemo(
    () =>
      Array.from({ length: 22 }, (_, i) => ({
        id: i,
        l: rand(5, 95),
        t: rand(10, 90),
        sz: rand(2, 6),
        dur: rand(2, 5),
        delay: rand(0, 6),
        col: ["#fbbf24", "#f472b6", "#c084fc", "#60a5fa", "#34d399", "#fb923c"][
          i % 6
        ],
      })),
    []
  );

  const completedQuests = quests.filter((q) => q.progress >= q.total).length;
  const xpMax = level * 200;
  const xpPct = Math.min((xp / xpMax) * 100, 100);

  const ACHIEVEMENTS = [
    {
      id: "hatch",
      icon: "🥚",
      name: "Першовідкривач",
      desc: "Вилупив першого поні",
      done: gallery.length > 0,
    },
    {
      id: "collect",
      icon: "🏆",
      name: "Колекціонер",
      desc: "Зібрав 3+ поні",
      done: gallery.length >= 3,
    },
    {
      id: "legend",
      icon: "⚡",
      name: "Легенда",
      desc: "Знайшов Тіньову Аврору",
      done: gallery.some((p) => p.secret),
    },
    {
      id: "lvl5",
      icon: "⬆️",
      name: "Підйом!",
      desc: "Досяг 5-го рівня",
      done: level >= 5,
    },
    {
      id: "rich",
      icon: "💎",
      name: "Скарбниця",
      desc: "Назбирав 500+ кристалів",
      done: shards >= 500,
    },
    {
      id: "quests",
      icon: "📋",
      name: "Виконавець",
      desc: "Виконав 3+ квести",
      done: completedQuests >= 3,
    },
  ];

  return (
    <div
      className="sc"
      style={{
        height: "100%",
        padding: "70px 16px 110px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background throne particles */}
      {throneParticles.map((p) => (
        <div
          key={p.id}
          style={{
            position: "absolute",
            left: `${p.l}%`,
            top: `${p.t}%`,
            width: p.sz,
            height: p.sz,
            borderRadius: "50%",
            background: p.col,
            animation: `star-twinkle ${p.dur}s ease-in-out ${p.delay}s infinite`,
            pointerEvents: "none",
            zIndex: 0,
            opacity: 0.6,
          }}
        />
      ))}

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* ── CROWN HEADER ── */}
        <div style={{ textAlign: "center", marginBottom: 18 }}>
          <div
            style={{
              fontSize: 52,
              filter:
                "drop-shadow(0 0 20px gold) drop-shadow(0 0 40px #f59e0b)",
              animation: "float 3s ease-in-out infinite",
            }}
          >
            👑
          </div>
          <h2
            className="ub"
            style={{
              fontSize: 13,
              letterSpacing: 3,
              color: "rgba(253,230,138,.55)",
              marginTop: 6,
              textTransform: "uppercase",
            }}
          >
            Тронна Зала
          </h2>
        </div>

        {/* ── PLAYER HERO CARD ── */}
        <div
          style={{
            borderRadius: 28,
            padding: "24px 20px 20px",
            background: `linear-gradient(135deg,rgba(${hexR(
              zone.star
            )},.12),rgba(${hexR(zone.sec)},.08))`,
            border: `1px solid ${zone.star}44`,
            boxShadow: `0 0 40px ${zone.star}22, 0 0 80px ${zone.star}11`,
            textAlign: "center",
            marginBottom: 14,
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Animated shimmer bg */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `linear-gradient(110deg,transparent 30%,rgba(255,255,255,.04) 50%,transparent 70%)`,
              backgroundSize: "200% 100%",
              animation: "rainbow-cycle 4s linear infinite",
            }}
          />

          {/* Active pony mini preview */}
          {activePony && (
            <div
              style={{
                position: "absolute",
                right: 14,
                bottom: 10,
                opacity: 0.18,
                pointerEvents: "none",
              }}
            >
              <PonyRenderer pony={activePony} size={80} animated={false} />
            </div>
          )}

          {/* Name */}
          <p
            style={{
              color: "rgba(255,255,255,.45)",
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: 2,
              textTransform: "uppercase",
              marginBottom: 6,
            }}
          >
            Ім'я чарівниці
          </p>
          <h1
            className="ub"
            style={{
              fontSize: 26,
              lineHeight: 1.2,
              background: `linear-gradient(90deg,${zone.star},#fff,${zone.sec},${zone.star})`,
              backgroundSize: "300% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "rainbow-cycle 3s linear infinite",
              textShadow: "none",
              marginBottom: 10,
            }}
          >
            {playerName}
          </h1>

          {/* Title badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: `rgba(${hexR(zone.star)},.18)`,
              border: `1px solid ${zone.star}55`,
              borderRadius: 30,
              padding: "7px 18px",
              marginBottom: 14,
              boxShadow: `0 0 16px ${zone.star}33`,
            }}
          >
            <span style={{ fontSize: 16 }}>✨</span>
            <span style={{ color: zone.star, fontWeight: 800, fontSize: 14 }}>
              {titleData.title}
            </span>
          </div>
          <p
            style={{
              color: "rgba(255,255,255,.38)",
              fontSize: 12,
              marginBottom: 16,
            }}
          >
            {titleData.sub}
          </p>

          {/* XP progress */}
          <div style={{ marginBottom: 8 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 5,
              }}
            >
              <span
                style={{
                  color: "rgba(255,255,255,.45)",
                  fontSize: 11,
                  fontWeight: 700,
                }}
              >
                Рівень {level}
              </span>
              <span style={{ color: "rgba(255,255,255,.35)", fontSize: 11 }}>
                {xp} / {xpMax} XP
              </span>
            </div>
            <div
              style={{
                background: "rgba(255,255,255,.1)",
                borderRadius: 12,
                height: 9,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${xpPct}%`,
                  background: `linear-gradient(90deg,${zone.star},${zone.sec})`,
                  borderRadius: 12,
                  transition: "width .6s ease",
                  boxShadow: `0 0 10px ${zone.star}`,
                }}
              />
            </div>
          </div>
        </div>

        {/* ── PRAISE BUBBLE ── */}
        <div
          className="glass"
          style={{
            borderRadius: 22,
            padding: "14px 20px",
            textAlign: "center",
            marginBottom: 14,
            border: `1px solid rgba(255,255,255,.1)`,
            minHeight: 56,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p
            style={{
              color: "rgba(255,255,255,.82)",
              fontSize: 14,
              fontWeight: 700,
              lineHeight: 1.5,
              transition: "opacity .3s ease",
              opacity: praiseAnim ? 1 : 0,
            }}
          >
            {PRAISES[praiseIdx]}
          </p>
        </div>

        {/* ── STATS ROW ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 9,
            marginBottom: 14,
          }}
        >
          {[
            { icon: "🦄", val: gallery.length, label: "Поні" },
            { icon: "💎", val: shards, label: "Кристали" },
            { icon: "📋", val: completedQuests, label: "Квести" },
          ].map((s, i) => (
            <div
              key={i}
              className="glass"
              style={{
                borderRadius: 18,
                padding: "14px 8px",
                textAlign: "center",
                border: "1px solid rgba(255,255,255,.08)",
              }}
            >
              <div style={{ fontSize: 26, marginBottom: 5 }}>{s.icon}</div>
              <p
                className="ub"
                style={{ color: "white", fontSize: 18, lineHeight: 1 }}
              >
                {s.val}
              </p>
              <p
                style={{
                  color: "rgba(255,255,255,.38)",
                  fontSize: 11,
                  marginTop: 4,
                }}
              >
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* ── ACHIEVEMENTS ── */}
        <p
          style={{
            color: "rgba(255,255,255,.35)",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: 1,
            marginBottom: 10,
          }}
        >
          🏅 ДОСЯГНЕННЯ
        </p>
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 9 }}
        >
          {ACHIEVEMENTS.map((ach) => (
            <div
              key={ach.id}
              style={{
                borderRadius: 18,
                padding: "12px 14px",
                display: "flex",
                alignItems: "center",
                gap: 11,
                background: ach.done
                  ? `linear-gradient(135deg,rgba(${hexR(
                      zone.star
                    )},.15),rgba(${hexR(zone.sec)},.08))`
                  : "rgba(255,255,255,.03)",
                border: `1px solid ${
                  ach.done ? zone.star + "44" : "rgba(255,255,255,.07)"
                }`,
                opacity: ach.done ? 1 : 0.45,
                boxShadow: ach.done ? `0 0 14px ${zone.star}22` : undefined,
              }}
            >
              <div
                style={{
                  fontSize: 26,
                  filter: ach.done
                    ? `drop-shadow(0 0 8px ${zone.star})`
                    : "grayscale(1)",
                  flexShrink: 0,
                }}
              >
                {ach.icon}
              </div>
              <div style={{ minWidth: 0 }}>
                <p
                  style={{
                    color: ach.done ? zone.star : "rgba(255,255,255,.4)",
                    fontWeight: 800,
                    fontSize: 12,
                  }}
                >
                  {ach.name}
                </p>
                <p
                  style={{
                    color: "rgba(255,255,255,.3)",
                    fontSize: 10,
                    marginTop: 2,
                  }}
                >
                  {ach.desc}
                </p>
              </div>
              {ach.done && (
                <div
                  style={{
                    marginLeft: "auto",
                    color: zone.star,
                    fontSize: 14,
                    flexShrink: 0,
                  }}
                >
                  ✓
                </div>
              )}
            </div>
          ))}
        </div>

        {/* ── SECRET HINT ── */}
        <div
          className="glass"
          style={{
            borderRadius: 18,
            padding: "13px 18px",
            marginTop: 14,
            display: "flex",
            gap: 12,
            alignItems: "center",
            border: "1px solid rgba(255,255,255,.06)",
          }}
        >
          <span style={{ fontSize: 22 }}>🔮</span>
          <p
            style={{
              color: "rgba(255,255,255,.3)",
              fontSize: 12,
              lineHeight: 1.55,
            }}
          >
            <strong style={{ color: "rgba(255,255,255,.5)" }}>
              Таємниця:{" "}
            </strong>
            Натисни на кристали 7 разів поспіль, щоб відкрити стародавній секрет
            Люміни...
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── KITCHEN VIEW ─────────────────────────────────────────────────────────
function KitchenView({ pony, onFeed }) {
  const [cooking, setCooking] = useState(null);
  const [msg, setMsg] = useState(null);
  const [queenMood, setQueenMood] = useState("idle");
  const queenPony = useMemo(
    () => ({
      id: "queen",
      type: "alicorn",
      colors: { body: "#FFF0A0", mane: "#FF6EB4", accent: "#FFD700" },
    }),
    []
  );

  const cook = useCallback(
    (food) => {
      if (cooking) return;
      setCooking(food.id);
      setQueenMood("cooking");
      setTimeout(() => {
        setCooking(null);
        setQueenMood("happy");
        setMsg(food);
        onFeed(food);
        setTimeout(() => {
          setMsg(null);
          setQueenMood("idle");
        }, 2500);
      }, 1800);
    },
    [cooking, onFeed]
  );

  return (
    <div className="sc" style={{ height: "100%", padding: "16px 16px 100px" }}>
      <div style={{ textAlign: "center", marginBottom: 18 }}>
        <h2
          className="ub"
          style={{
            color: "#fbbf24",
            fontSize: 19,
            textShadow: "0 0 22px #f59e0b",
          }}
        >
          👑 Королівство Кухня
        </h2>
        <p
          style={{ color: "rgba(255,255,255,.44)", fontSize: 12, marginTop: 5 }}
        >
          Королева Мати готує для тебе!
        </p>
      </div>

      {/* QUEEN STAGE */}
      <div
        className="glass"
        style={{
          borderRadius: 24,
          padding: "18px 14px",
          marginBottom: 18,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 10,
          border: "1px solid rgba(255,215,0,.2)",
          position: "relative",
        }}
      >
        <div style={{ position: "relative" }}>
          <div
            style={{
              animation:
                queenMood === "cooking"
                  ? "bounce .5s ease-in-out infinite"
                  : "float 4s ease-in-out infinite",
            }}
          >
            <PonyRenderer pony={queenPony} size={118} animated />
          </div>
          <div
            style={{
              position: "absolute",
              top: -8,
              left: "50%",
              transform: "translateX(-50%)",
              fontSize: 24,
              filter: "drop-shadow(0 0 8px gold)",
            }}
          >
            👑
          </div>
          {cooking && (
            <div
              style={{
                position: "absolute",
                top: "5%",
                right: "-32%",
                background: "rgba(0,0,0,.75)",
                borderRadius: 14,
                padding: "6px 12px",
                fontSize: 22,
                animation: "bounce .4s ease-in-out infinite",
                border: "1px solid rgba(255,255,255,.15)",
              }}
            >
              {FOODS.find((f) => f.id === cooking)?.emoji}
            </div>
          )}
        </div>
        <div
          className="glass"
          style={{
            borderRadius: 16,
            padding: "10px 18px",
            textAlign: "center",
            maxWidth: 240,
            border: "1px solid rgba(255,215,0,.22)",
          }}
        >
          <p style={{ color: "#fde68a", fontWeight: 700, fontSize: 13 }}>
            {cooking
              ? `🍳 Готую ${FOODS.find((f) => f.id === cooking)?.name}...`
              : queenMood === "happy"
              ? "✨ Смачного, моя зірочко!"
              : "💕 Що приготувати для тебе?"}
          </p>
        </div>
        {msg && (
          <div
            style={{
              position: "absolute",
              top: 12,
              right: 12,
              background: "rgba(74,222,128,.18)",
              border: "1px solid rgba(74,222,128,.4)",
              borderRadius: 14,
              padding: "8px 14px",
              animation: "thought-pop 2.5s ease forwards",
              zIndex: 10,
            }}
          >
            <p style={{ color: "#4ade80", fontWeight: 800, fontSize: 14 }}>
              +{msg.xp} XP ✨
            </p>
            <p style={{ color: "rgba(255,255,255,.5)", fontSize: 11 }}>
              {msg.stat} ↑
            </p>
          </div>
        )}
      </div>

      <p
        style={{
          color: "rgba(255,255,255,.35)",
          fontSize: 11,
          marginBottom: 10,
          fontWeight: 700,
          letterSpacing: 1,
        }}
      >
        МЕНЮ ЗНАНЬ
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {FOODS.map((food) => (
          <button
            key={food.id}
            className="mbtn"
            onClick={() => cook(food)}
            disabled={!!cooking}
            style={{
              background: `linear-gradient(135deg,rgba(${hexR(
                food.color
              )},.12),rgba(${hexR(food.color)},.05))`,
              border: `1px solid rgba(${hexR(food.color)},.3)`,
              borderRadius: 18,
              padding: "14px 10px",
              cursor: cooking ? "not-allowed" : "pointer",
              opacity: cooking ? 0.5 : 1,
              textAlign: "center",
              fontFamily: "Nunito,sans-serif",
            }}
          >
            <div style={{ fontSize: 32, marginBottom: 7 }}>{food.emoji}</div>
            <div style={{ color: food.color, fontWeight: 800, fontSize: 13 }}>
              {food.name}
            </div>
            <div
              style={{
                color: "rgba(255,255,255,.38)",
                fontSize: 11,
                marginTop: 4,
              }}
            >
              +{food.xp} XP · {food.stat}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── STYLE STUDIO ─────────────────────────────────────────────────────────
function StyleStudio({ pony, onUpdate }) {
  const [local, setLocal] = useState(pony);
  useEffect(() => {
    setLocal(pony);
  }, [pony]);

  const update = useCallback(
    (patch) => {
      const next = { ...local, ...patch };
      setLocal(next);
      onUpdate(next);
    },
    [local, onUpdate]
  );

  const BODY_COLS = [
    "#FFB3DE",
    "#B3D9FF",
    "#B3FFD9",
    "#E8B3FF",
    "#FFE4B3",
    "#FFB3B3",
    "#D4FFF0",
    "#FFD4B3",
    "#D4B3FF",
    "#FFF0B3",
    "#F9C0E8",
    "#C0F9E8",
  ];
  const MANE_COLS = [
    "#FF6EB4",
    "#60A5FA",
    "#34D399",
    "#C084FC",
    "#FBBF24",
    "#F87171",
    "#2DD4BF",
    "#818CF8",
    "#FDE68A",
    "#EC4899",
    "#F97316",
    "#A78BFA",
  ];

  if (!local)
    return (
      <div
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
        }}
      >
        <p style={{ fontSize: 60 }}>🥚</p>
        <p style={{ color: "rgba(255,255,255,.4)", fontSize: 15 }}>
          Спочатку вилупіть поні!
        </p>
      </div>
    );

  return (
    <div className="sc" style={{ height: "100%", padding: "16px 16px 100px" }}>
      <h2
        className="ub"
        style={{
          color: "#f472b6",
          fontSize: 19,
          textAlign: "center",
          marginBottom: 18,
          textShadow: "0 0 22px #f472b6",
        }}
      >
        💅 Студія Стилю
      </h2>

      {/* PREVIEW */}
      <div
        style={{ display: "flex", justifyContent: "center", marginBottom: 18 }}
      >
        <div style={{ position: "relative", display: "inline-block" }}>
          <div style={{ animation: "float 3.5s ease-in-out infinite" }}>
            <PonyRenderer pony={local} size={168} animated glow />
          </div>
          {ACCESSORIES.filter((a) => local.accessories?.includes(a.id)).map(
            (a) => (
              <div
                key={a.id}
                style={{
                  position: "absolute",
                  left: a.px,
                  top: a.py,
                  fontSize: a.sz,
                  transform: "translate(-50%,-50%)",
                  filter: "drop-shadow(0 2px 4px rgba(0,0,0,.5))",
                  pointerEvents: "none",
                }}
              >
                {a.emoji}
              </div>
            )
          )}
        </div>
      </div>

      {/* COLOR PICKERS */}
      {[
        {
          label: "🎨 Колір тіла",
          cols: BODY_COLS,
          cur: local.colors?.body,
          key: "body",
        },
        {
          label: "🌈 Колір гриви",
          cols: MANE_COLS,
          cur: local.colors?.mane,
          key: "mane",
        },
        {
          label: "✨ Акцент",
          cols: [...MANE_COLS].reverse(),
          cur: local.colors?.accent,
          key: "accent",
        },
      ].map((row) => (
        <div
          key={row.key}
          className="glass"
          style={{ borderRadius: 18, padding: 14, marginBottom: 12 }}
        >
          <p
            style={{
              color: "rgba(255,255,255,.7)",
              fontSize: 13,
              fontWeight: 700,
              marginBottom: 10,
            }}
          >
            {row.label}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {row.cols.map((c) => (
              <div
                key={c}
                className="mbtn"
                onClick={() =>
                  update({ colors: { ...local.colors, [row.key]: c } })
                }
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  background: c,
                  border:
                    row.cur === c
                      ? "3px solid white"
                      : "2px solid rgba(255,255,255,.15)",
                  boxShadow:
                    row.cur === c
                      ? `0 0 14px ${c},0 0 28px ${c}66`
                      : "0 2px 4px rgba(0,0,0,.4)",
                  transform: row.cur === c ? "scale(1.16)" : "scale(1)",
                  transition: "all .15s ease",
                }}
              />
            ))}
          </div>
        </div>
      ))}

      {/* MANE STYLE */}
      <div
        className="glass"
        style={{ borderRadius: 18, padding: 14, marginBottom: 12 }}
      >
        <p
          style={{
            color: "rgba(255,255,255,.7)",
            fontSize: 13,
            fontWeight: 700,
            marginBottom: 10,
          }}
        >
          💇 Стиль гриви
        </p>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {MANE_STYLES.map((s, i) => (
            <button
              key={i}
              className="mbtn"
              onClick={() => update({ maneStyle: i })}
              style={{
                background:
                  local.maneStyle === i
                    ? "rgba(244,114,182,.28)"
                    : "rgba(255,255,255,.05)",
                border: `1px solid ${
                  local.maneStyle === i ? "#f472b6" : "rgba(255,255,255,.12)"
                }`,
                borderRadius: 22,
                padding: "7px 15px",
                color:
                  local.maneStyle === i ? "#f472b6" : "rgba(255,255,255,.5)",
                fontSize: 12,
                cursor: "pointer",
                fontFamily: "Nunito,sans-serif",
                fontWeight: 700,
                boxShadow:
                  local.maneStyle === i
                    ? "0 0 12px rgba(244,114,182,.35)"
                    : undefined,
              }}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* ACCESSORIES */}
      <div className="glass" style={{ borderRadius: 18, padding: 14 }}>
        <p
          style={{
            color: "rgba(255,255,255,.7)",
            fontSize: 13,
            fontWeight: 700,
            marginBottom: 10,
          }}
        >
          👒 Аксесуари
        </p>
        <div style={{ display: "flex", gap: 9, flexWrap: "wrap" }}>
          {ACCESSORIES.map((acc) => {
            const on = local.accessories?.includes(acc.id);
            const tog = () => {
              const a = local.accessories || [];
              update({
                accessories: on
                  ? a.filter((x) => x !== acc.id)
                  : [...a, acc.id],
              });
            };
            return (
              <button
                key={acc.id}
                className="mbtn"
                onClick={tog}
                style={{
                  background: on
                    ? "rgba(196,132,252,.25)"
                    : "rgba(255,255,255,.05)",
                  border: `1px solid ${
                    on ? "#c084fc" : "rgba(255,255,255,.12)"
                  }`,
                  borderRadius: 15,
                  padding: "9px 15px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 7,
                  boxShadow: on ? "0 0 12px rgba(192,132,252,.4)" : undefined,
                }}
              >
                <span style={{ fontSize: 18 }}>{acc.emoji}</span>
                <span
                  style={{
                    color: on ? "#c084fc" : "rgba(255,255,255,.5)",
                    fontSize: 12,
                    fontFamily: "Nunito,sans-serif",
                    fontWeight: 700,
                  }}
                >
                  {acc.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── MAP VIEW ─────────────────────────────────────────────────────────────
function MapView({ currentZone, onZoneSelect, unlockedZones }) {
  return (
    <div className="sc" style={{ height: "100%", padding: "16px 16px 100px" }}>
      <div style={{ textAlign: "center", marginBottom: 18 }}>
        <h2
          className="ub"
          style={{
            color: "#e0d4ff",
            fontSize: 19,
            textShadow: "0 0 22px #7b4fff",
          }}
        >
          🗺️ Магічна Карта
        </h2>
        <p
          style={{ color: "rgba(255,255,255,.38)", fontSize: 12, marginTop: 4 }}
        >
          {unlockedZones.length}/{ZONES.length} зон відкрито
        </p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
        {ZONES.map((zone) => {
          const locked = !unlockedZones.includes(zone.id);
          const active = zone.id === currentZone;
          return (
            <button
              key={zone.id}
              className="mbtn"
              onClick={() => {
                if (!locked) onZoneSelect(zone.id);
              }}
              style={{
                background: active
                  ? `linear-gradient(135deg,${zone.star}2a,${zone.sec}18)`
                  : locked
                  ? "rgba(255,255,255,.02)"
                  : "rgba(255,255,255,.05)",
                border: `1px solid ${
                  active
                    ? zone.star
                    : locked
                    ? "rgba(255,255,255,.07)"
                    : "rgba(255,255,255,.12)"
                }`,
                borderRadius: 22,
                padding: "15px 16px",
                cursor: locked ? "not-allowed" : "pointer",
                opacity: locked ? 0.42 : 1,
                textAlign: "left",
                display: "flex",
                alignItems: "center",
                gap: 14,
                boxShadow: active ? `0 0 22px ${zone.star}33` : undefined,
                transition: "all .25s ease",
              }}
            >
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 17,
                  flexShrink: 0,
                  background: `linear-gradient(135deg,${zone.star}44,${zone.sec}22)`,
                  border: `1px solid ${zone.star}44`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 26,
                  boxShadow: active
                    ? `0 0 20px ${zone.star}66,inset 0 0 10px ${zone.star}22`
                    : undefined,
                }}
              >
                {locked ? "🔒" : zone.name.split(" ")[0]}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p
                  style={{
                    color: active ? zone.star : "white",
                    fontWeight: 800,
                    fontSize: 14,
                    textShadow: active ? `0 0 12px ${zone.star}` : undefined,
                  }}
                >
                  {zone.name.slice(2)}
                </p>
                <p
                  style={{
                    color: "rgba(255,255,255,.36)",
                    fontSize: 11,
                    marginTop: 3,
                  }}
                >
                  {locked ? "🔒 Виконайте квести" : "" + zone.desc}
                </p>
                {!locked && (
                  <div style={{ display: "flex", gap: 4, marginTop: 5 }}>
                    {Array.from({ length: 4 }).map((_, di) => (
                      <div
                        key={di}
                        style={{
                          width: 5,
                          height: 5,
                          borderRadius: "50%",
                          background: zone.star,
                          opacity: 0.35 + di * 0.15,
                          animation: `gem-pulse ${
                            0.8 + di * 0.3
                          }s ease-in-out ${di * 0.2}s infinite`,
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
              {active && (
                <div
                  style={{
                    color: zone.star,
                    fontSize: 18,
                    filter: `drop-shadow(0 0 6px ${zone.star})`,
                    animation: "float 2s ease-in-out infinite",
                  }}
                >
                  ▶
                </div>
              )}
            </button>
          );
        })}
      </div>
      <div
        className="glass"
        style={{
          borderRadius: 18,
          padding: "13px 16px",
          marginTop: 14,
          display: "flex",
          gap: 11,
          alignItems: "center",
          border: "1px solid rgba(255,255,255,.08)",
        }}
      >
        <span style={{ fontSize: 20 }}>💡</span>
        <p style={{ color: "rgba(255,255,255,.42)", fontSize: 12 }}>
          Виконуйте квести й підвищуйте рівень, щоб відкрити нові зони!
        </p>
      </div>
    </div>
  );
}

// ─── GALLERY VIEW ─────────────────────────────────────────────────────────
function GalleryView({ ponies, onSelect, activePonyId }) {
  return (
    <div className="sc" style={{ height: "100%", padding: "16px 16px 100px" }}>
      <div style={{ textAlign: "center", marginBottom: 18 }}>
        <h2
          className="ub"
          style={{
            color: "#fbbf24",
            fontSize: 19,
            textShadow: "0 0 22px #f59e0b",
          }}
        >
          🏆 Колекція Поні
        </h2>
        <p
          style={{ color: "rgba(255,255,255,.38)", fontSize: 12, marginTop: 4 }}
        >
          Зібрано: {ponies.length} поні{" "}
          {ponies.some((p) => p.secret) ? "• ⚡ Є легендарні!" : ""}
        </p>
      </div>
      {ponies.length === 0 ? (
        <div style={{ textAlign: "center", marginTop: 55 }}>
          <p style={{ fontSize: 64 }}>🥚</p>
          <p
            style={{
              color: "rgba(255,255,255,.38)",
              marginTop: 18,
              fontSize: 14,
              lineHeight: 1.7,
            }}
          >
            Ваша колекція порожня.
            <br />
            Відкрийте Інкубатор!
          </p>
        </div>
      ) : (
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 11 }}
        >
          {ponies.map((p) => {
            const isActive = activePonyId === p.id;
            return (
              <button
                key={p.id}
                className="mbtn"
                onClick={() => onSelect(p)}
                style={{
                  background: p.secret
                    ? "linear-gradient(135deg,rgba(0,229,255,.08),rgba(120,0,255,.08))"
                    : isActive
                    ? `linear-gradient(135deg,${p.colors?.accent || "#fff"}22,${
                        p.colors?.accent || "#fff"
                      }11)`
                    : "rgba(255,255,255,.04)",
                  border: `1px solid ${
                    p.secret
                      ? "rgba(0,229,255,.4)"
                      : isActive
                      ? (p.colors?.accent || "#fff") + "55"
                      : "rgba(255,255,255,.1)"
                  }`,
                  borderRadius: 22,
                  padding: "14px 10px",
                  textAlign: "center",
                  cursor: "pointer",
                  boxShadow: p.secret
                    ? "0 0 22px rgba(0,229,255,.2),0 0 44px rgba(120,0,255,.1)"
                    : isActive
                    ? `0 0 16px ${p.colors?.accent || "#fff"}33`
                    : undefined,
                }}
              >
                <PonyRenderer
                  pony={p}
                  size={90}
                  animated={false}
                  glow={p.secret}
                />
                <p
                  style={{
                    color: p.secret ? "#00e5ff" : p.colors?.accent || "white",
                    fontWeight: 800,
                    fontSize: 13,
                    marginTop: 7,
                    textShadow: p.secret ? "0 0 10px #00e5ff" : undefined,
                  }}
                >
                  {p.name}
                </p>
                <p
                  style={{
                    color: "rgba(255,255,255,.36)",
                    fontSize: 11,
                    marginTop: 2,
                  }}
                >
                  {TYPE_LABELS[p.type]}
                </p>
                {p.secret && (
                  <p
                    style={{
                      color: "#00e5ff",
                      fontSize: 10,
                      marginTop: 3,
                      fontWeight: 800,
                    }}
                  >
                    ⚡ ЛЕГЕНДАРНА
                  </p>
                )}
                {isActive && !p.secret && (
                  <div
                    style={{
                      marginTop: 5,
                      background: `rgba(${hexR(
                        p.colors?.accent || "#fff"
                      )},.2)`,
                      borderRadius: 20,
                      padding: "2px 8px",
                      display: "inline-block",
                      color: p.colors?.accent || "white",
                      fontSize: 10,
                      fontWeight: 800,
                    }}
                  >
                    АКТИВНА
                  </div>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── THOUGHT BUBBLE ───────────────────────────────────────────────────────
function ThoughtBubble({ pony, visible }) {
  const need = useMemo(
    () => NEEDS[Math.floor(Math.random() * NEEDS.length)],
    [visible]
  );
  if (!visible || !pony) return null;
  return (
    <div
      style={{
        position: "absolute",
        top: "9%",
        right: "6%",
        animation: "thought-pop 4.5s ease forwards",
        zIndex: 20,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          background: "rgba(255,255,255,.12)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderRadius: 18,
          padding: "10px 16px",
          border: "1px solid rgba(255,255,255,.26)",
          minWidth: 96,
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: 26 }}>{need[0]}</div>
        <p
          style={{
            color: "white",
            fontSize: 12,
            fontWeight: 800,
            marginTop: 3,
          }}
        >
          {need[1]}
        </p>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: -7,
          left: 18,
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "rgba(255,255,255,.22)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -14,
          left: 12,
          width: 5,
          height: 5,
          borderRadius: "50%",
          background: "rgba(255,255,255,.14)",
        }}
      />
    </div>
  );
}

// ─── GAME HUD ─────────────────────────────────────────────────────────────
function GameHUD({ playerName, level, xp, shards, onShardsClick, zone }) {
  const xpMax = level * 200;
  const xpPct = Math.min((xp / xpMax) * 100, 100);
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        padding: "10px 14px 6px",
        background:
          "linear-gradient(180deg,rgba(0,0,0,.72) 0%,transparent 100%)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 14,
            flexShrink: 0,
            background: `linear-gradient(135deg,${zone.star},${zone.sec})`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "Unbounded,sans-serif",
            fontWeight: 900,
            color: "white",
            fontSize: 16,
            flexDirection: "column",
            lineHeight: 1,
            boxShadow: `0 2px 14px ${zone.star}77,inset 0 1px 0 rgba(255,255,255,.28)`,
          }}
        >
          {level}
          <span
            style={{
              fontSize: 7,
              opacity: 0.7,
              fontFamily: "Nunito,sans-serif",
              fontWeight: 700,
            }}
          >
            LVL
          </span>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 4,
            }}
          >
            <p
              style={{
                color: "white",
                fontWeight: 800,
                fontSize: 13,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                maxWidth: "65%",
              }}
            >
              {playerName}
            </p>
            <p style={{ color: "rgba(255,255,255,.38)", fontSize: 11 }}>
              {xp}/{xpMax}
            </p>
          </div>
          <div
            style={{
              background: "rgba(255,255,255,.12)",
              borderRadius: 10,
              height: 7,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${xpPct}%`,
                background: `linear-gradient(90deg,${zone.star},${zone.sec})`,
                borderRadius: 10,
                transition: "width .6s cubic-bezier(.34,1.56,.64,1)",
                boxShadow: `0 0 8px ${zone.star}`,
              }}
            />
          </div>
        </div>
        <div
          className="mbtn glass"
          onClick={onShardsClick}
          style={{
            borderRadius: 22,
            padding: "6px 12px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 5,
            border: `1px solid ${zone.star}44`,
            background: `rgba(${hexR(zone.star)},.1)`,
            flexShrink: 0,
          }}
        >
          <span style={{ fontSize: 16 }}>💎</span>
          <span
            className="ub"
            style={{
              color: zone.star,
              fontWeight: 900,
              fontSize: 15,
              textShadow: `0 0 10px ${zone.star}`,
            }}
          >
            {shards}
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── QUEST PANEL ─────────────────────────────────────────────────────────
function QuestPanel({ quests, zone }) {
  const [open, setOpen] = useState(false);
  const active = quests.filter((q) => q.progress < q.total);
  if (!active.length) return null;
  return (
    <div style={{ padding: "0 12px 12px" }}>
      <button
        className="mbtn"
        onClick={() => setOpen((v) => !v)}
        style={{
          width: "100%",
          background: "rgba(0,0,0,.5)",
          borderRadius: 14,
          backdropFilter: "blur(12px)",
          padding: "9px 16px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          border: `1px solid ${zone.star}33`,
          cursor: "pointer",
        }}
      >
        <span style={{ color: zone.star, fontWeight: 800, fontSize: 13 }}>
          📋 Квести ({active.length})
        </span>
        <span
          style={{
            color: "rgba(255,255,255,.38)",
            fontSize: 13,
            transition: "transform .2s",
            display: "inline-block",
            transform: open ? "rotate(180deg)" : "rotate(0)",
          }}
        >
          ▾
        </span>
      </button>
      {open && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
            marginTop: 8,
          }}
        >
          {active.slice(0, 3).map((q) => (
            <div
              key={q.id}
              className="glass"
              style={{
                borderRadius: 14,
                padding: "12px 14px",
                border: "1px solid rgba(255,255,255,.08)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 7,
                }}
              >
                <span style={{ fontSize: 20 }}>{q.icon}</span>
                <div style={{ flex: 1 }}>
                  <p style={{ color: "white", fontWeight: 800, fontSize: 13 }}>
                    {q.name}
                  </p>
                  <p style={{ color: "rgba(255,255,255,.4)", fontSize: 11 }}>
                    {q.desc}
                  </p>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <p
                    style={{ color: "#fbbf24", fontSize: 12, fontWeight: 800 }}
                  >
                    +{q.reward}
                  </p>
                  <p style={{ color: "rgba(255,255,255,.32)", fontSize: 10 }}>
                    💎
                  </p>
                </div>
              </div>
              <div
                style={{
                  background: "rgba(255,255,255,.08)",
                  borderRadius: 10,
                  height: 6,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${Math.min((q.progress / q.total) * 100, 100)}%`,
                    background: `linear-gradient(90deg,${zone.star},${zone.sec})`,
                    borderRadius: 10,
                    transition: "width .5s ease",
                    boxShadow: `0 0 8px ${zone.star}88`,
                  }}
                />
              </div>
              <p
                style={{
                  color: "rgba(255,255,255,.3)",
                  fontSize: 10,
                  textAlign: "right",
                  marginTop: 4,
                }}
              >
                {q.progress}/{q.total}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── BOTTOM NAV ──────────────────────────────────────────────────────────
function BottomNav({ current, onChange, zone }) {
  const tabs = [
    { id: "home", emoji: "🏠", label: "Дім" },
    { id: "throne", emoji: "👑", label: "Трон" },
    { id: "hatchery", emoji: "🥚", label: "Яйце" },
    { id: "kitchen", emoji: "🍳", label: "Кухня" },
    { id: "studio", emoji: "💅", label: "Студія" },
    { id: "gallery", emoji: "🏆", label: "Збірка" },
  ];
  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: "rgba(6,4,18,.92)",
        backdropFilter: "blur(22px)",
        WebkitBackdropFilter: "blur(22px)",
        borderTop: `1px solid ${zone.star}33`,
        padding: "6px 0 max(8px,env(safe-area-inset-bottom,8px))",
        display: "flex",
        justifyContent: "space-around",
      }}
    >
      {tabs.map((t) => {
        const active = current === t.id;
        return (
          <button
            key={t.id}
            className="mbtn"
            onClick={() => onChange(t.id)}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "4px 6px",
              minWidth: 42,
              minHeight: 44,
              justifyContent: "center",
              position: "relative",
            }}
          >
            {active && (
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: 28,
                  height: 3,
                  borderRadius: "0 0 4px 4px",
                  background: `linear-gradient(90deg,${zone.star},${zone.sec})`,
                  boxShadow: `0 0 10px ${zone.star}`,
                }}
              />
            )}
            <span
              style={{
                fontSize: active ? 23 : 19,
                transition: "font-size .2s",
                filter: active
                  ? `drop-shadow(0 0 8px ${zone.star})`
                  : undefined,
              }}
            >
              {t.emoji}
            </span>
            <span
              style={{
                fontSize: 9,
                fontFamily: "Nunito,sans-serif",
                fontWeight: 800,
                color: active ? zone.star : "rgba(255,255,255,.35)",
                transition: "color .2s",
                textShadow: active ? `0 0 8px ${zone.star}` : undefined,
              }}
            >
              {t.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

// ─── SECRET REVEAL ────────────────────────────────────────────────────────
function SecretReveal({ visible, onDone }) {
  const [phase, setPhase] = useState("glitch");
  const [confetti, setConfetti] = useState(false);

  useEffect(() => {
    if (!visible) {
      setPhase("glitch");
      setConfetti(false);
      return;
    }
    const t1 = setTimeout(() => {
      setPhase("reveal");
      setConfetti(true);
    }, 2200);
    const t2 = setTimeout(() => setConfetti(false), 7000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [visible]);

  const secretPony = useMemo(
    () => ({
      id: "secret_aurora",
      name: "Тіньова Аврора",
      type: "alicorn",
      secret: true,
      colors: { body: "rgba(40,0,80,.5)", mane: "#00e5ff", accent: "#00e5ff" },
      level: 99,
      xp: 9999,
      mood: 100,
      accessories: ["crown", "cape"],
    }),
    []
  );

  if (!visible) return null;
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9990,
        background: "rgba(0,0,0,.97)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        animation:
          phase === "glitch" ? "glitch 2.2s ease-in-out" : "fade-in .5s ease",
      }}
    >
      <Confetti active={confetti} burst />
      {phase === "glitch" && (
        <div style={{ textAlign: "center", padding: "0 30px" }}>
          <p
            className="ub"
            style={{
              fontSize: 26,
              color: "#00ff00",
              textShadow: "0 0 20px #00ff00",
              letterSpacing: 4,
              animation: "glitch .3s steps(2) infinite",
            }}
          >
            ⚡ СЕКРЕТ ⚡
          </p>
          <p
            style={{
              fontFamily: "Courier New,monospace",
              fontSize: 12,
              color: "#00ffff",
              marginTop: 12,
              letterSpacing: 2,
              opacity: 0.7,
            }}
          >
            РОЗБЛОКОВАНО СЕКРЕТНИЙ КОД...
          </p>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 4,
              marginTop: 16,
              opacity: 0.45,
            }}
          >
            {Array.from({ length: 5 }).map((_, i) => (
              <p
                key={i}
                style={{
                  fontFamily: "Courier New,monospace",
                  fontSize: 10,
                  color: "#00ff00",
                }}
              >
                {Array.from({ length: 32 }, () =>
                  Math.random() > 0.5 ? "1" : "0"
                ).join(" ")}
              </p>
            ))}
          </div>
        </div>
      )}
      {phase === "reveal" && (
        <div
          style={{
            textAlign: "center",
            padding: "0 24px",
            animation: "shadow-reveal 1s ease-out forwards",
          }}
        >
          <h1
            className="ub"
            style={{
              fontSize: 18,
              marginBottom: 18,
              letterSpacing: 1,
              background:
                "linear-gradient(90deg,#00e5ff,#ff00ff,#8b5cf6,#00e5ff)",
              backgroundSize: "300% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "rainbow-cycle 1.5s linear infinite",
            }}
          >
            ⚡ СЕКРЕТНА ЛЕГЕНДА ⚡
          </h1>
          <div style={{ animation: "float 3s ease-in-out infinite" }}>
            <PonyRenderer pony={secretPony} size={210} animated glow />
          </div>
          <h2
            className="ub"
            style={{
              color: "#00e5ff",
              fontSize: 26,
              marginTop: 10,
              textShadow: "0 0 30px #00e5ff,0 0 60px #00e5ff,0 0 90px #9900ff",
            }}
          >
            Тіньова Аврора
          </h2>
          <p
            style={{
              color: "rgba(0,229,255,.6)",
              fontSize: 13,
              margin: "7px 0 5px",
            }}
          >
            ✨ Аліконь • Рівень 99 • Напівпрозорі крила
          </p>
          <p
            style={{
              color: "rgba(255,255,255,.32)",
              fontSize: 12,
              marginBottom: 22,
              lineHeight: 1.7,
            }}
          >
            Стародавня легенда про охоронницю магічного балансу
            <br />
            між світлом і темрявою у Люміні.
          </p>
          <button
            className="mbtn"
            onClick={onDone}
            style={{
              background:
                "linear-gradient(135deg,rgba(0,229,255,.18),rgba(153,0,255,.18))",
              border: "1px solid rgba(0,229,255,.55)",
              borderRadius: 50,
              padding: "14px 38px",
              color: "#00e5ff",
              fontFamily: "Nunito,sans-serif",
              fontWeight: 900,
              fontSize: 16,
              cursor: "pointer",
              letterSpacing: 1,
              boxShadow:
                "0 0 30px rgba(0,229,255,.4),0 0 60px rgba(153,0,255,.2)",
            }}
          >
            ✨ Додати до колекції
          </button>
        </div>
      )}
    </div>
  );
}

// ─── LEVEL UP TOAST ────────────────────────────────────────────────────────
function LevelUpToast({ level, zone, onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2600);
    return () => clearTimeout(t);
  }, []);
  return (
    <div
      style={{
        position: "fixed",
        top: "30%",
        left: "50%",
        zIndex: 9000,
        pointerEvents: "none",
        animation: "level-up-anim 2.6s ease-out forwards",
        textAlign: "center",
      }}
    >
      <div
        style={{
          background: `linear-gradient(135deg,${zone.star}33,${zone.sec}22)`,
          border: `2px solid ${zone.star}`,
          borderRadius: 24,
          padding: "18px 32px",
          backdropFilter: "blur(16px)",
          boxShadow: `0 0 40px ${zone.star}66`,
        }}
      >
        <p style={{ fontSize: 34 }}>⬆️</p>
        <p
          className="ub"
          style={{
            color: zone.star,
            fontSize: 20,
            textShadow: `0 0 20px ${zone.star}`,
          }}
        >
          РІВЕНЬ {level}!
        </p>
        <p style={{ color: "white", fontSize: 13, marginTop: 4 }}>
          +50 💎 нагорода!
        </p>
      </div>
    </div>
  );
}

// ─── WELCOME SCREEN ────────────────────────────────────────────────────────
function WelcomeScreen({ onStart }) {
  const [name, setName] = useState("");
  const stars = useMemo(
    () =>
      Array.from({ length: 40 }, (_, i) => ({
        id: i,
        l: rand(1, 99),
        t: rand(1, 99),
        sz: rand(1.5, 4.5),
        dur: rand(2, 5),
        delay: rand(0, 6),
      })),
    []
  );
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background:
          "linear-gradient(165deg,#0a0118 0%,#1e0b4a 50%,#0a0118 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 28px",
        zIndex: 10000,
        gap: 24,
      }}
    >
      {/* Stars */}
      {stars.map((s) => (
        <div
          key={s.id}
          style={{
            position: "absolute",
            left: `${s.l}%`,
            top: `${s.t}%`,
            width: s.sz,
            height: s.sz,
            borderRadius: "50%",
            background: "white",
            animation: `star-twinkle ${s.dur}s ease-in-out ${s.delay}s infinite`,
          }}
        />
      ))}

      {/* Logo */}
      <div style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
        <div
          style={{
            fontSize: 64,
            marginBottom: 6,
            filter:
              "drop-shadow(0 0 30px #c084fc) drop-shadow(0 0 60px #7c3aed)",
          }}
        >
          ✨
        </div>
        <h1
          className="ub"
          style={{
            fontSize: 28,
            lineHeight: 1.22,
            background:
              "linear-gradient(90deg,#f472b6,#a78bfa,#60a5fa,#34d399)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            backgroundSize: "300% auto",
            animation: "rainbow-cycle 3s linear infinite",
          }}
        >
          LUMINA
        </h1>
        <p
          style={{
            color: "rgba(196,181,253,.75)",
            fontSize: 13,
            letterSpacing: 3,
            marginTop: 6,
            fontWeight: 700,
          }}
        >
          МАГІЧНА СПАДЩИНА
        </p>
        <p
          style={{ color: "rgba(255,255,255,.3)", fontSize: 12, marginTop: 10 }}
        >
          Вилупи ✦ Виростай ✦ Досліджуй
        </p>
      </div>

      {/* Name input */}
      <div
        style={{
          width: "100%",
          maxWidth: 310,
          position: "relative",
          zIndex: 1,
        }}
      >
        <p
          style={{
            color: "rgba(255,255,255,.55)",
            fontSize: 13,
            marginBottom: 10,
            fontWeight: 700,
            textAlign: "center",
          }}
        >
          Як тебе звати, Чарівнице?
        </p>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && name.trim()) onStart(name.trim());
          }}
          placeholder="Введи своє ім'я..."
          maxLength={18}
          style={{
            width: "100%",
            background: "rgba(255,255,255,.09)",
            border: "1px solid rgba(196,181,253,.35)",
            borderRadius: 22,
            padding: "14px 20px",
            color: "white",
            fontSize: 16,
            fontFamily: "Nunito,sans-serif",
            fontWeight: 700,
            outline: "none",
            backdropFilter: "blur(12px)",
            textAlign: "center",
            boxShadow: "0 0 20px rgba(196,181,253,.12)",
          }}
        />
      </div>

      <button
        className="mbtn"
        disabled={!name.trim()}
        onClick={() => {
          if (name.trim()) onStart(name.trim());
        }}
        style={{
          background: name.trim()
            ? "linear-gradient(135deg,#6d28d9,#8b5cf6,#c084fc)"
            : "rgba(255,255,255,.08)",
          border: "none",
          borderRadius: 50,
          padding: "15px 48px",
          color: "white",
          fontFamily: "Nunito,sans-serif",
          fontWeight: 900,
          fontSize: 17,
          cursor: name.trim() ? "pointer" : "not-allowed",
          boxShadow: name.trim()
            ? "0 4px 30px rgba(109,40,217,.6),0 0 60px rgba(139,92,246,.25)"
            : undefined,
          letterSpacing: 1,
          transition: "all .25s ease",
          position: "relative",
          zIndex: 1,
          opacity: name.trim() ? 1 : 0.4,
        }}
      >
        🪄 Розпочати Пригоду!
      </button>
    </div>
  );
}

// ─── HOME SCREEN ─────────────────────────────────────────────────────────
function HomeScreen({ pony, zone, onSetActive, gallery, onGoTo }) {
  return (
    <div className="sc" style={{ height: "100%", padding: "70px 16px 100px" }}>
      {pony ? (
        <>
          {/* Active Pony Hero */}
          <div
            className="glass"
            style={{
              borderRadius: 28,
              padding: "22px 18px",
              marginBottom: 16,
              textAlign: "center",
              border: `1px solid ${pony.colors?.accent || "#fff"}33`,
              background: `linear-gradient(135deg,rgba(${hexR(
                pony.colors?.accent || "#fff"
              )},.06),rgba(${hexR(pony.colors?.mane || "#fff")},.04))`,
            }}
          >
            <div
              style={{
                position: "relative",
                display: "inline-block",
                marginBottom: 12,
              }}
            >
              <div style={{ animation: "float 3.5s ease-in-out infinite" }}>
                <PonyRenderer pony={pony} size={180} animated glow />
              </div>
              {ACCESSORIES.filter((a) => pony.accessories?.includes(a.id)).map(
                (a) => (
                  <div
                    key={a.id}
                    style={{
                      position: "absolute",
                      left: a.px,
                      top: a.py,
                      fontSize: a.sz,
                      transform: "translate(-50%,-50%)",
                      filter: "drop-shadow(0 2px 4px rgba(0,0,0,.5))",
                      pointerEvents: "none",
                    }}
                  >
                    {a.emoji}
                  </div>
                )
              )}
            </div>
            <h2
              style={{
                color: pony.colors?.accent || "white",
                fontWeight: 900,
                fontSize: 20,
                textShadow: `0 0 14px ${pony.colors?.accent || "white"}`,
              }}
            >
              {pony.name}
            </h2>
            <p
              style={{
                color: "rgba(255,255,255,.5)",
                fontSize: 13,
                marginTop: 4,
              }}
            >
              {TYPE_LABELS[pony.type]} · Рівень {pony.level}
            </p>
            {pony.secret && (
              <p
                style={{
                  color: "#00e5ff",
                  fontSize: 11,
                  marginTop: 5,
                  fontWeight: 800,
                  textShadow: "0 0 10px #00e5ff",
                }}
              >
                ⚡ ЛЕГЕНДАРНА АЛІКОНЬ
              </p>
            )}
          </div>

          {/* Quick action cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 11,
              marginBottom: 14,
            }}
          >
            {[
              {
                icon: "🥚",
                label: "Інкубатор",
                sub: "Вилупити поні",
                tab: "hatchery",
                col: "#8b5cf6",
              },
              {
                icon: "👑",
                label: "Кухня",
                sub: "Годувати поні",
                tab: "kitchen",
                col: "#fbbf24",
              },
              {
                icon: "💅",
                label: "Студія",
                sub: "Прикрасити",
                tab: "studio",
                col: "#f472b6",
              },
              {
                icon: "🗺️",
                label: "Карта",
                sub: "Дослідити зони",
                tab: "map",
                col: "#60a5fa",
              },
            ].map((item) => (
              <button
                key={item.tab}
                className="mbtn"
                onClick={() => onGoTo(item.tab)}
                style={{
                  background: `rgba(${hexR(item.col)},.1)`,
                  border: `1px solid rgba(${hexR(item.col)},.28)`,
                  borderRadius: 22,
                  padding: "16px 12px",
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                <span style={{ fontSize: 28 }}>{item.icon}</span>
                <p
                  style={{
                    color: item.col,
                    fontWeight: 800,
                    fontSize: 14,
                    marginTop: 8,
                  }}
                >
                  {item.label}
                </p>
                <p
                  style={{
                    color: "rgba(255,255,255,.38)",
                    fontSize: 11,
                    marginTop: 2,
                  }}
                >
                  {item.sub}
                </p>
              </button>
            ))}
          </div>

          {/* Zone info */}
          <div
            className="glass"
            style={{
              borderRadius: 18,
              padding: "13px 16px",
              border: `1px solid ${zone.star}22`,
              display: "flex",
              gap: 12,
              alignItems: "center",
            }}
          >
            <div style={{ fontSize: 26 }}>{zone.name.split(" ")[0]}</div>
            <div>
              <p style={{ color: zone.star, fontWeight: 800, fontSize: 13 }}>
                {zone.name.slice(2)}
              </p>
              <p
                style={{
                  color: "rgba(255,255,255,.38)",
                  fontSize: 11,
                  marginTop: 2,
                }}
              >
                {zone.desc}
              </p>
            </div>
          </div>
        </>
      ) : (
        /* No pony yet */
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            gap: 22,
            marginTop: -40,
          }}
        >
          <div
            style={{
              fontSize: 72,
              animation: "float 3s ease-in-out infinite",
              filter: "drop-shadow(0 0 24px rgba(139,92,246,.5))",
            }}
          >
            🥚
          </div>
          <div style={{ textAlign: "center" }}>
            <h2
              className="ub"
              style={{
                color: "#c4b5fd",
                fontSize: 20,
                textShadow: "0 0 20px #8b5cf6",
              }}
            >
              Ласкаво просимо!
            </h2>
            <p
              style={{
                color: "rgba(255,255,255,.45)",
                fontSize: 14,
                marginTop: 10,
                lineHeight: 1.7,
              }}
            >
              Ваша магічна подорож починається тут.
              <br />
              Вилупіть першого поні!
            </p>
          </div>
          <button
            className="mbtn"
            onClick={() => onGoTo("hatchery")}
            style={{
              background: "linear-gradient(135deg,#6d28d9,#8b5cf6)",
              border: "none",
              borderRadius: 50,
              padding: "14px 38px",
              color: "white",
              fontFamily: "Nunito,sans-serif",
              fontWeight: 900,
              fontSize: 16,
              cursor: "pointer",
              boxShadow: "0 4px 26px rgba(109,40,217,.55)",
            }}
          >
            ✨ Відкрити Інкубатор
          </button>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// ─── ROOT APP  (MODULE 3: ORCHESTRATION + SECRET ENGINE) ─────────────
// ═══════════════════════════════════════════════════════════════════════
export default function App() {
  // ── STATE ─────────────────────────────────────────────────────────
  const [started, setStarted] = useLS("lum_started", false);
  const [playerName, setPlayerName] = useLS("lum_name", "");
  const [level, setLevel] = useLS("lum_level", 1);
  const [xp, setXp] = useLS("lum_xp", 0);
  const [shards, setShards] = useLS("lum_shards", 50);
  const [gallery, setGallery] = useLS("lum_gallery", []);
  const [activePonyId, setActivePonyId] = useLS("lum_active", null);
  const [questsState, setQuestsState] = useLS("lum_quests", QUESTS);
  const [currentZone, setCurrentZone] = useLS("lum_zone", "meadow");
  const [unlockedZones, setUnlockedZones] = useLS("lum_unlocked", [
    "meadow",
    "cave",
  ]);

  const [tab, setTab] = useState("home");
  const [showThought, setShowThought] = useState(false);
  const [showSecret, setShowSecret] = useState(false);
  const [levelUpAnim, setLevelUpAnim] = useState(false);
  const [shardTaps, setShardTaps] = useState(0);
  const [secretUsed, setSecretUsed] = useLS("lum_secret_used", false);

  const shardTapRef = useRef(0);
  const shardResetRef = useRef(null);

  // ── DERIVED ───────────────────────────────────────────────────────
  const zone = useMemo(
    () => ZONES.find((z) => z.id === currentZone) || ZONES[0],
    [currentZone]
  );
  const activePony = useMemo(
    () => gallery.find((p) => p.id === activePonyId) || null,
    [gallery, activePonyId]
  );

  // ── THOUGHT BUBBLE TIMER ──────────────────────────────────────────
  useEffect(() => {
    if (!activePony) return;
    const t = setInterval(() => {
      setShowThought(true);
      setTimeout(() => setShowThought(false), 4600);
    }, 60000);
    const first = setTimeout(() => {
      setShowThought(true);
      setTimeout(() => setShowThought(false), 4600);
    }, 8000);
    return () => {
      clearInterval(t);
      clearTimeout(first);
    };
  }, [activePony?.id]);

  // ── ADD XP ────────────────────────────────────────────────────────
  const addXp = useCallback(
    (amount) => {
      setXp((prev) => {
        const next = prev + amount;
        const xpMax = level * 200;
        if (next >= xpMax) {
          const newLevel = level + 1;
          setLevel(newLevel);
          setShards((s) => s + 50);
          setLevelUpAnim(true);
          // Unlock new zone if available
          const zoneByLevel = [null, null, "forest", "sky", "citadel"];
          if (
            zoneByLevel[newLevel] &&
            !unlockedZones.includes(zoneByLevel[newLevel])
          ) {
            setUnlockedZones((z) => [...z, zoneByLevel[newLevel]]);
          }
          // Update gallery active pony level
          if (activePonyId) {
            setGallery((g) =>
              g.map((p) =>
                p.id === activePonyId ? { ...p, level: newLevel } : p
              )
            );
          }
          return next - xpMax;
        }
        return next;
      });
    },
    [level, activePonyId, unlockedZones]
  );

  // ── SHARD TAP → SECRET ────────────────────────────────────────────
  const handleShardTap = useCallback(() => {
    if (secretUsed) return;
    shardTapRef.current += 1;
    setShardTaps(shardTapRef.current);
    clearTimeout(shardResetRef.current);
    shardResetRef.current = setTimeout(() => {
      shardTapRef.current = 0;
      setShardTaps(0);
    }, 3500);
    if (shardTapRef.current >= 7) {
      shardTapRef.current = 0;
      setShardTaps(0);
      setShowSecret(true);
    }
  }, [secretUsed]);

  // ── HATCH ─────────────────────────────────────────────────────────
  const handleHatch = useCallback(
    (pony) => {
      setGallery((g) => [...g, pony]);
      setActivePonyId(pony.id);
      addXp(100);
      setQuestsState((qs) =>
        qs.map((q) =>
          q.id === "q3"
            ? { ...q, progress: Math.min(q.progress + 1, q.total) }
            : q
        )
      );
    },
    [addXp]
  );

  // ── FEED ──────────────────────────────────────────────────────────
  const handleFeed = useCallback(
    (food) => {
      addXp(food.xp);
      setQuestsState((qs) =>
        qs.map((q) =>
          q.id === "q2"
            ? { ...q, progress: Math.min(q.progress + 1, q.total) }
            : q
        )
      );
    },
    [addXp]
  );

  // ── UPDATE PONY ───────────────────────────────────────────────────
  const handlePonyUpdate = useCallback((updated) => {
    setGallery((g) => g.map((p) => (p.id === updated.id ? updated : p)));
    setQuestsState((qs) =>
      qs.map((q) => (q.id === "q6" ? { ...q, progress: 1 } : q))
    );
  }, []);

  // ── ZONE SELECT ───────────────────────────────────────────────────
  const handleZoneSelect = useCallback(
    (zid) => {
      setCurrentZone(zid);
      setTab("home");
      setQuestsState((qs) => {
        const uniq = new Set([...unlockedZones, zid]);
        return qs.map((q) =>
          q.id === "q4" ? { ...q, progress: Math.min(uniq.size, q.total) } : q
        );
      });
    },
    [unlockedZones]
  );

  // ── SECRET DONE ───────────────────────────────────────────────────
  const handleSecretDone = useCallback(() => {
    setShowSecret(false);
    setSecretUsed(true);
    const secretPony = {
      id: `secret_${Date.now()}`,
      name: "Тіньова Аврора",
      type: "alicorn",
      secret: true,
      colors: { body: "rgba(40,0,80,.5)", mane: "#00e5ff", accent: "#00e5ff" },
      level: 99,
      xp: 9999,
      mood: 100,
      maneStyle: 0,
      accessories: ["crown", "cape"],
    };
    setGallery((g) => {
      if (g.find((p) => p.secret)) return g;
      return [...g, secretPony];
    });
    setActivePonyId(secretPony.id);
    setShards((s) => s + 500);
    setTab("home");
  }, []);

  // ── SELECT PONY FROM GALLERY ──────────────────────────────────────
  const handleGallerySelect = useCallback((p) => {
    setActivePonyId(p.id);
    setTab("home");
  }, []);

  // ── WELCOME ───────────────────────────────────────────────────────
  const handleStart = useCallback((name) => {
    setPlayerName(name);
    setStarted(true);
  }, []);

  // ── RENDER ────────────────────────────────────────────────────────
  if (!started)
    return (
      <>
        <style>{STYLES}</style>
        <WelcomeScreen onStart={handleStart} />
      </>
    );

  return (
    <>
      <style>{STYLES}</style>

      {/* ROOT CONTAINER */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: zone.bg,
          transition: "background 1s ease",
          overflow: "hidden",
        }}
      >
        {/* ZONE PARTICLES */}
        <ZoneParticles zoneId={zone.id} />

        {/* SECRET HINT — tap counter indicator */}
        {shardTaps > 0 && shardTaps < 7 && (
          <div
            style={{
              position: "absolute",
              top: "12%",
              right: 14,
              zIndex: 60,
              pointerEvents: "none",
              animation: "slide-up .3s ease",
            }}
          >
            <div
              className="glass"
              style={{
                borderRadius: 12,
                padding: "5px 11px",
                border: "1px solid rgba(255,255,255,.18)",
              }}
            >
              <p
                style={{
                  color: "rgba(255,255,255,.5)",
                  fontSize: 10,
                  fontWeight: 700,
                }}
              >
                🔮 {shardTaps}/7
              </p>
            </div>
          </div>
        )}

        {/* HUD */}
        <GameHUD
          playerName={playerName}
          level={level}
          xp={xp}
          shards={shards}
          onShardsClick={handleShardTap}
          zone={zone}
        />

        {/* MAIN CONTENT */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            top: 0,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* TAB BODY */}
          <div style={{ flex: 1, overflow: "hidden", paddingTop: 68 }}>
            {tab === "home" && (
              <>
                <HomeScreen
                  pony={activePony}
                  zone={zone}
                  gallery={gallery}
                  onGoTo={setTab}
                  onSetActive={handleGallerySelect}
                />
                <ThoughtBubble pony={activePony} visible={showThought} />
              </>
            )}
            {tab === "throne" && (
              <ThroneView
                playerName={playerName}
                level={level}
                xp={xp}
                shards={shards}
                gallery={gallery}
                quests={questsState}
                zone={zone}
                activePony={activePony}
              />
            )}
            {tab === "map" && (
              <MapView
                currentZone={currentZone}
                onZoneSelect={handleZoneSelect}
                unlockedZones={unlockedZones}
              />
            )}
            {tab === "hatchery" && <HatcheryView onHatch={handleHatch} />}
            {tab === "kitchen" && (
              <KitchenView pony={activePony} onFeed={handleFeed} />
            )}
            {tab === "studio" && (
              <StyleStudio pony={activePony} onUpdate={handlePonyUpdate} />
            )}
            {tab === "gallery" && (
              <GalleryView
                ponies={gallery}
                onSelect={handleGallerySelect}
                activePonyId={activePonyId}
              />
            )}
          </div>

          {/* QUEST PANEL (above nav on home/map) */}
          {(tab === "home" || tab === "map") && (
            <div style={{ flexShrink: 0, paddingBottom: 2 }}>
              <QuestPanel quests={questsState} zone={zone} />
            </div>
          )}
        </div>

        {/* BOTTOM NAV */}
        <BottomNav current={tab} onChange={setTab} zone={zone} />

        {/* LEVEL UP */}
        {levelUpAnim && (
          <LevelUpToast
            level={level}
            zone={zone}
            onDone={() => setLevelUpAnim(false)}
          />
        )}

        {/* SECRET REVEAL */}
        <SecretReveal visible={showSecret} onDone={handleSecretDone} />
      </div>
    </>
  );
}
