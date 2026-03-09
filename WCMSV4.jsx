import { useState, useRef, useEffect } from "react";

// ─── TEAMS PER GROUP ──────────────────────────────────────────────────────────
const GROUPS = {
  A: { teams: ["Mexico", "South Africa", "Korea Republic", "Czechia/Denmark/N.Macedonia/Ireland"] },
  B: { teams: ["Canada", "Qatar", "Switzerland", "Bosnia/Italy/N.Ireland/Wales"] },
  C: { teams: ["Brazil", "Morocco", "Haiti", "Scotland"] },
  D: { teams: ["USA", "Paraguay", "Australia", "Kosovo/Romania/Slovakia/Türkiye"] },
  E: { teams: ["Germany", "Côte d'Ivoire", "Ecuador", "Curaçao"] },
  F: { teams: ["Netherlands", "Japan", "Tunisia", "Albania/Poland/Sweden/Ukraine"] },
  G: { teams: ["Belgium", "Egypt", "IR Iran", "New Zealand"] },
  H: { teams: ["Saudi Arabia", "Uruguay", "Spain", "Cabo Verde"] },
  I: { teams: ["France", "Senegal", "Norway", "Bolivia/Iraq/Suriname"] },
  J: { teams: ["Argentina", "Algeria", "Austria", "Jordan"] },
  K: { teams: ["Colombia", "Portugal", "Uzbekistan", "Congo DR"] },
  L: { teams: ["England", "Croatia", "Ghana", "Panama"] },
};

// All individual teams extracted and sorted alphabetically for the dropdown
const ALL_TEAMS = Object.values(GROUPS)
  .flatMap((g) => g.teams)
  .sort((a, b) => a.localeCompare(b));

// ─── FLAG URLs ─────────────────────────────────────────────────────────────────
const FLAG_URLS = {
  "Albania/Poland/Sweden/Ukraine":        "https://flagcdn.com/w80/pl.png",
  "Algeria":                              "https://flagcdn.com/w80/dz.png",
  "Argentina":                            "https://flagcdn.com/w80/ar.png",
  "Australia":                            "https://flagcdn.com/w80/au.png",
  "Austria":                              "https://flagcdn.com/w80/at.png",
  "Belgium":                              "https://flagcdn.com/w80/be.png",
  "Bolivia/Iraq/Suriname":                "https://flagcdn.com/w80/bo.png",
  "Bosnia/Italy/N.Ireland/Wales":         "https://flagcdn.com/w80/it.png",
  "Brazil":                               "https://flagcdn.com/w80/br.png",
  "Cabo Verde":                           "https://flagcdn.com/w80/cv.png",
  "Canada":                               "https://flagcdn.com/w80/ca.png",
  "Colombia":                             "https://flagcdn.com/w80/co.png",
  "Congo DR":                             "https://flagcdn.com/w80/cd.png",
  "Côte d'Ivoire":                        "https://flagcdn.com/w80/ci.png",
  "Croatia":                              "https://flagcdn.com/w80/hr.png",
  "Curaçao":                              "https://flagcdn.com/w80/cw.png",
  "Czechia/Denmark/N.Macedonia/Ireland":  "https://flagcdn.com/w80/cz.png",
  "Ecuador":                              "https://flagcdn.com/w80/ec.png",
  "Egypt":                                "https://flagcdn.com/w80/eg.png",
  "England":                              "https://flagcdn.com/w80/gb-eng.png",
  "France":                               "https://flagcdn.com/w80/fr.png",
  "Germany":                              "https://flagcdn.com/w80/de.png",
  "Ghana":                                "https://flagcdn.com/w80/gh.png",
  "Haiti":                                "https://flagcdn.com/w80/ht.png",
  "IR Iran":                              "https://flagcdn.com/w80/ir.png",
  "Japan":                                "https://flagcdn.com/w80/jp.png",
  "Jordan":                               "https://flagcdn.com/w80/jo.png",
  "Korea Republic":                       "https://flagcdn.com/w80/kr.png",
  "Kosovo/Romania/Slovakia/Türkiye":      "https://flagcdn.com/w80/ro.png",
  "Mexico":                               "https://flagcdn.com/w80/mx.png",
  "Morocco":                              "https://flagcdn.com/w80/ma.png",
  "Netherlands":                          "https://flagcdn.com/w80/nl.png",
  "New Zealand":                          "https://flagcdn.com/w80/nz.png",
  "Norway":                               "https://flagcdn.com/w80/no.png",
  "Panama":                               "https://flagcdn.com/w80/pa.png",
  "Paraguay":                             "https://flagcdn.com/w80/py.png",
  "Portugal":                             "https://flagcdn.com/w80/pt.png",
  "Qatar":                                "https://flagcdn.com/w80/qa.png",
  "Saudi Arabia":                         "https://flagcdn.com/w80/sa.png",
  "Scotland":                             "https://flagcdn.com/w80/gb-sct.png",
  "Senegal":                              "https://flagcdn.com/w80/sn.png",
  "South Africa":                         "https://flagcdn.com/w80/za.png",
  "Spain":                                "https://flagcdn.com/w80/es.png",
  "Switzerland":                          "https://flagcdn.com/w80/ch.png",
  "Tunisia":                              "https://flagcdn.com/w80/tn.png",
  "Uruguay":                              "https://flagcdn.com/w80/uy.png",
  "USA":                                  "https://flagcdn.com/w80/us.png",
  "Uzbekistan":                           "https://flagcdn.com/w80/uz.png",
};

// ─── BRACKET DATA ──────────────────────────────────────────────────────────────
const R32 = [
  { id: 73,  date: "Jun 28", city: "Los Angeles",   t1: { type: "runner", g: "A" }, t2: { type: "runner", g: "B" } },
  { id: 74,  date: "Jun 29", city: "Boston",         t1: { type: "winner", g: "E" }, t2: { type: "third",  gs: ["A","B","C","D","F"] } },
  { id: 75,  date: "Jun 29", city: "Monterrey",      t1: { type: "winner", g: "F" }, t2: { type: "runner", g: "C" } },
  { id: 76,  date: "Jun 29", city: "Houston",        t1: { type: "winner", g: "C" }, t2: { type: "runner", g: "F" } },
  { id: 77,  date: "Jun 30", city: "New York/NJ",    t1: { type: "winner", g: "I" }, t2: { type: "third",  gs: ["C","D","F","G","H"] } },
  { id: 78,  date: "Jun 30", city: "Dallas",         t1: { type: "runner", g: "E" }, t2: { type: "runner", g: "I" } },
  { id: 79,  date: "Jun 30", city: "Mexico City",    t1: { type: "winner", g: "A" }, t2: { type: "third",  gs: ["C","E","F","H","I"] } },
  { id: 80,  date: "Jul 1",  city: "Atlanta",        t1: { type: "winner", g: "L" }, t2: { type: "third",  gs: ["E","H","I","J","K"] } },
  { id: 81,  date: "Jul 1",  city: "San Francisco",  t1: { type: "winner", g: "D" }, t2: { type: "third",  gs: ["B","E","F","I","J"] } },
  { id: 82,  date: "Jul 1",  city: "Seattle",        t1: { type: "winner", g: "G" }, t2: { type: "third",  gs: ["A","E","H","I","J"] } },
  { id: 83,  date: "Jul 2",  city: "Toronto",        t1: { type: "runner", g: "K" }, t2: { type: "runner", g: "L" } },
  { id: 84,  date: "Jul 2",  city: "Los Angeles",    t1: { type: "winner", g: "H" }, t2: { type: "runner", g: "J" } },
  { id: 85,  date: "Jul 2",  city: "Vancouver",      t1: { type: "winner", g: "B" }, t2: { type: "third",  gs: ["E","F","G","I","J"] } },
  { id: 86,  date: "Jul 3",  city: "Miami",          t1: { type: "winner", g: "J" }, t2: { type: "runner", g: "H" } },
  { id: 87,  date: "Jul 3",  city: "Kansas City",    t1: { type: "winner", g: "K" }, t2: { type: "third",  gs: ["D","E","I","J","L"] } },
  { id: 88,  date: "Jul 3",  city: "Dallas",         t1: { type: "runner", g: "D" }, t2: { type: "runner", g: "G" } },
];
const R16 = [
  { id: 89,  date: "Jul 4",  city: "Philadelphia",  m1: 74, m2: 77 },
  { id: 90,  date: "Jul 4",  city: "Houston",       m1: 73, m2: 75 },
  { id: 91,  date: "Jul 5",  city: "New York/NJ",   m1: 76, m2: 78 },
  { id: 92,  date: "Jul 5",  city: "Mexico City",   m1: 79, m2: 80 },
  { id: 93,  date: "Jul 6",  city: "Dallas",        m1: 83, m2: 84 },
  { id: 94,  date: "Jul 6",  city: "Seattle",       m1: 81, m2: 82 },
  { id: 95,  date: "Jul 7",  city: "Atlanta",       m1: 86, m2: 88 },
  { id: 96,  date: "Jul 7",  city: "Vancouver",     m1: 85, m2: 87 },
];
const QF = [
  { id: 97,  date: "Jul 9",  city: "Boston",       m1: 89, m2: 90 },
  { id: 98,  date: "Jul 10", city: "Los Angeles",  m1: 93, m2: 94 },
  { id: 99,  date: "Jul 11", city: "Miami",        m1: 91, m2: 92 },
  { id: 100, date: "Jul 11", city: "Kansas City",  m1: 95, m2: 96 },
];
const SF = [
  { id: 101, date: "Jul 14", city: "Dallas",   m1: 97,  m2: 98  },
  { id: 102, date: "Jul 15", city: "Atlanta",  m1: 99,  m2: 100 },
];

// ─── HELPERS ──────────────────────────────────────────────────────────────────
const isPlaceholder = (n) =>
  !n || n === "Other" ||
  n.startsWith("Winner") || n.startsWith("Loser") ||
  n.startsWith("Best")   || n.startsWith("Runner") ||
  n.startsWith("TBD")    || n.startsWith("3rd") || n.startsWith("Grp");

const findTeamGroup = (team) => {
  if (!team) return null;
  for (const [g, data] of Object.entries(GROUPS)) {
    if (data.teams.includes(team)) return g;
  }
  return null;
};

// ─── CONFETTI ─────────────────────────────────────────────────────────────────
const CONFETTI_COLORS = ["#FFD700","#FFA500","#FF6B6B","#4ade80","#60a5fa","#f472b6","#fff","#a78bfa"];

function Confetti({ active }) {
  const canvasRef = useRef(null);
  const animRef   = useRef(null);
  const pieces    = useRef([]);

  useEffect(() => {
    if (!active) { pieces.current = []; return; }
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    pieces.current = Array.from({ length: 200 }, () => ({
      x:    Math.random() * canvas.width,
      y:    -20 - Math.random() * 200,
      w:    6  + Math.random() * 10,
      h:    8  + Math.random() * 6,
      color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      rot:  Math.random() * 360,
      rotV: (Math.random() - 0.5) * 6,
      vx:   (Math.random() - 0.5) * 4,
      vy:   3  + Math.random() * 5,
    }));
    const ctx = canvas.getContext("2d");
    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;
      pieces.current.forEach((p) => {
        if (p.y < canvas.height + 30) alive = true;
        p.x += p.vx; p.y += p.vy; p.rot += p.rotV; p.vy += 0.12;
        ctx.save();
        ctx.globalAlpha = Math.max(0, 1 - p.y / canvas.height);
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rot * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      });
      if (alive) animRef.current = requestAnimationFrame(tick);
    };
    animRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animRef.current);
  }, [active]);

  if (!active) return null;
  return (
    <canvas ref={canvasRef} style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", pointerEvents: "none", zIndex: 9999 }} />
  );
}

// ─── FLAG COMPONENT ────────────────────────────────────────────────────────────
function Flag({ name, size = 22 }) {
  if (isPlaceholder(name)) {
    return (
      <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: size * 1.5, height: size, borderRadius: 4, flexShrink: 0, background: "linear-gradient(135deg,#1e2a3a,#0d1520)", border: "1px solid rgba(255,255,255,0.13)", fontSize: size * 0.7 }}>
        🌍
      </span>
    );
  }
  const url = FLAG_URLS[name];
  if (!url) {
    return (
      <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: size * 1.5, height: size, borderRadius: 4, flexShrink: 0, background: "linear-gradient(135deg,#2a3a4a,#1a2a3a)", border: "1px solid rgba(255,255,255,0.13)", fontSize: size * 0.44, color: "#aaa", fontWeight: 800 }}>
        {name.slice(0, 2).toUpperCase()}
      </span>
    );
  }
  return (
    <img src={url} alt={name} style={{ width: size * 1.5, height: size, objectFit: "cover", borderRadius: 4, border: "1px solid rgba(255,255,255,0.18)", flexShrink: 0 }} onError={(e) => { e.target.style.display = "none"; }} />
  );
}

function TeamLabel({ name, size = 14 }) {
  const display = isPlaceholder(name) ? (name || "Other") : name;
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 6, verticalAlign: "middle" }}>
      <Flag name={isPlaceholder(name) ? "Other" : name} size={size} />
      <span style={{ fontSize: size, fontWeight: 600, color: "#ddd" }}>
        {display && display.length > 26 ? display.slice(0, 24) + "…" : display || "Other"}
      </span>
    </span>
  );
}

// ─── TEAM SELECTOR — pure native <select> ─────────────────────────────────────
function TeamSelector({ mainTeam, onChange }) {
  return (
    <div style={{ position: "relative", display: "inline-flex", alignItems: "center", gap: 10 }}>
      {/* Live flag preview beside the select */}
      <div style={{ flexShrink: 0, width: 36, height: 24, display: "flex", alignItems: "center", justifyContent: "center" }}>
        {mainTeam
          ? <Flag name={mainTeam} size={24} />
          : <span style={{ fontSize: 24 }}>🏟️</span>
        }
      </div>

      {/* Native select — fully accessible, works everywhere */}
      <div style={{ position: "relative" }}>
        <select
          value={mainTeam || ""}
          onChange={(e) => onChange(e.target.value || null)}
          style={{
            appearance: "none",
            WebkitAppearance: "none",
            padding: "10px 44px 10px 16px",
            borderRadius: 12,
            background: "rgba(255,255,255,0.08)",
            border: "2px solid rgba(255,215,0,0.5)",
            color: mainTeam ? "#fff" : "#aaa",
            fontSize: 15,
            fontWeight: 700,
            cursor: "pointer",
            outline: "none",
            minWidth: 220,
            backdropFilter: "blur(8px)",
          }}
        >
          <option value="" style={{ background: "#0d1520", color: "#aaa" }}>— Select Your Team —</option>
          {/* Group each team under its group letter for easier navigation */}
          {Object.entries(GROUPS).map(([g, data]) => (
            <optgroup key={g} label={`Group ${g}`} style={{ background: "#0d1520", color: "#FFD700" }}>
              {data.teams.map((team) => (
                <option key={team} value={team} style={{ background: "#0d1520", color: "#fff", padding: "6px 12px" }}>
                  {team}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
        {/* Custom chevron */}
        <span style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "#FFD700", fontSize: 13, fontWeight: 900 }}>▼</span>
      </div>
    </div>
  );
}

// ─── TICKET PRICES ─────────────────────────────────────────────────────────────
function TicketPrices({ round, city, teams }) {
  const base = {
    "Group Stage":  { sh: 85,   tm: 92,   sg: 79   },
    "Round of 32":  { sh: 155,  tm: 168,  sg: 142  },
    "Round of 16":  { sh: 285,  tm: 315,  sg: 268  },
    "Quarterfinal": { sh: 530,  tm: 590,  sg: 500  },
    "Semifinal":    { sh: 990,  tm: 1060, sg: 935  },
    "Third Place":  { sh: 460,  tm: 500,  sg: 430  },
    "Final":        { sh: 2250, tm: 2480, sg: 2100 },
  }[round] || { sh: 200, tm: 220, sg: 190 };

  const mult = {
    "New York/NJ": 1.4, "Los Angeles": 1.3, "Miami": 1.2, "Dallas": 1.1,
    "Atlanta": 1.05, "Philadelphia": 1.1, "Boston": 1.15, "San Francisco": 1.25,
    "Seattle": 1.0, "Kansas City": 0.95, "Vancouver": 1.05, "Toronto": 1.1,
    "Mexico City": 0.9, "Monterrey": 0.85, "Guadalajara": 0.88, "Houston": 1.0,
  }[city] || 1.0;

  const prices = {
    stubhub:      Math.round(base.sh * mult),
    ticketmaster: Math.round(base.tm * mult),
    seatgeek:     Math.round(base.sg * mult),
  };
  const cheapest = Object.entries(prices).sort((a, b) => a[1] - b[1])[0];
  const meta = {
    stubhub:      { color: "#00d4aa", name: "StubHub",      icon: "🎫" },
    ticketmaster: { color: "#026cdf", name: "Ticketmaster", icon: "🎟️" },
    seatgeek:     { color: "#e85d04", name: "SeatGeek",     icon: "🪑" },
  };
  const q = encodeURIComponent(`FIFA World Cup 2026 ${round} ${city}`);
  const links = {
    stubhub:      `https://www.stubhub.com/search?q=${q}`,
    ticketmaster: `https://www.ticketmaster.com/search?q=${q}`,
    seatgeek:     `https://seatgeek.com/search?q=${q}`,
  };

  return (
    <div style={{ background: "rgba(255,215,0,0.05)", border: "1px solid rgba(255,215,0,0.2)", borderRadius: 12, padding: 18, marginTop: 14 }}>
      <div style={{ fontSize: 11, color: "#FFD700", fontWeight: 800, textTransform: "uppercase", letterSpacing: 2, marginBottom: 10 }}>🎫 Estimated Ticket Prices</div>
      <div style={{ fontSize: 12, color: "#666", marginBottom: 14 }}>{teams} · {city}</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8, marginBottom: 14 }}>
        {Object.entries(prices).map(([pl, price]) => (
          <a key={pl} href={links[pl]} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
            <div style={{ background: pl === cheapest[0] ? `${meta[pl].color}22` : "rgba(255,255,255,0.03)", border: `1px solid ${pl === cheapest[0] ? meta[pl].color : "rgba(255,255,255,0.08)"}`, borderRadius: 10, padding: "14px 8px", textAlign: "center", position: "relative", cursor: "pointer" }}>
              {pl === cheapest[0] && <div style={{ position: "absolute", top: -10, left: "50%", transform: "translateX(-50%)", background: "#FFD700", color: "#000", fontSize: 9, fontWeight: 900, padding: "2px 8px", borderRadius: 10, textTransform: "uppercase", letterSpacing: 1, whiteSpace: "nowrap" }}>Best Deal</div>}
              <div style={{ fontSize: 20, marginBottom: 4 }}>{meta[pl].icon}</div>
              <div style={{ fontSize: 11, fontWeight: 700, color: meta[pl].color }}>{meta[pl].name}</div>
              <div style={{ fontSize: 22, fontWeight: 900, color: "#fff", margin: "5px 0" }}>${price}</div>
              <div style={{ fontSize: 9, color: "#555" }}>tap to search</div>
            </div>
          </a>
        ))}
      </div>
      <div style={{ background: "rgba(74,222,128,0.07)", border: "1px solid rgba(74,222,128,0.2)", borderRadius: 8, padding: "10px 14px", textAlign: "center" }}>
        <span style={{ color: "#4ade80", fontSize: 13, fontWeight: 700 }}>💡 Best: {meta[cheapest[0]].name} from ${cheapest[1]}</span>
        <div style={{ color: "#444", fontSize: 10, marginTop: 4 }}>*Estimates based on historical World Cup pricing. Tap a platform to see live prices.</div>
      </div>
    </div>
  );
}

// ─── GROUP CARD ────────────────────────────────────────────────────────────────
function GroupCard({ group, teams, standing, onSet, mainTeam }) {
  const [order, setOrder] = useState([...teams]);
  const hasMain = !!mainTeam && teams.includes(mainTeam);

  // Reset order whenever the teams array changes (e.g. user switches selected team,
  // causing a different group's card to render in the "pinned" slot)
  useEffect(() => {
    setOrder([...teams]);
  }, [teams.join(",")]); // stringify for stable comparison

  const swap = (i, j) => { const o = [...order]; [o[i], o[j]] = [o[j], o[i]]; setOrder(o); };
  const POS = [
    { label: "1st", color: "#FFD700", bg: "rgba(255,215,0,0.11)" },
    { label: "2nd", color: "#b0b0b0", bg: "rgba(180,180,180,0.07)" },
    { label: "3rd", color: "#f97316", bg: "rgba(249,115,22,0.09)" },
    { label: "4th", color: "#444",    bg: "rgba(255,255,255,0.02)" },
  ];

  return (
    <div style={{ background: hasMain ? "linear-gradient(135deg,#0d1b3a,#131f40)" : "rgba(255,255,255,0.03)", border: hasMain ? "2px solid #FFD700" : "1px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: 18, position: "relative" }}>
      {hasMain && (
        <div style={{ position: "absolute", top: -11, left: 16, background: "#FFD700", color: "#000", fontSize: 10, fontWeight: 900, padding: "2px 14px", borderRadius: 10, letterSpacing: 1.2, textTransform: "uppercase", display: "flex", alignItems: "center", gap: 5 }}>
          ⭐ {mainTeam}'s Group
        </div>
      )}
      <div style={{ fontWeight: 800, fontSize: 13, color: hasMain ? "#FFD700" : "#666", textTransform: "uppercase", letterSpacing: 2, marginBottom: 14 }}>Group {group}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {order.map((team, idx) => {
          const ps = POS[idx];
          const isMain = team === mainTeam;
          return (
            <div key={team} style={{ display: "flex", alignItems: "center", gap: 9, background: isMain ? "rgba(255,215,0,0.13)" : ps.bg, border: `1px solid ${isMain ? "#FFD70066" : ps.color + "33"}`, borderRadius: 9, padding: "8px 10px" }}>
              <span style={{ fontSize: 11, fontWeight: 800, color: ps.color, width: 26, textAlign: "center", flexShrink: 0 }}>{ps.label}</span>
              <Flag name={team} size={17} />
              <span style={{ flex: 1, fontSize: 13, color: isMain ? "#FFD700" : "#ddd", fontWeight: isMain ? 800 : 600 }}>{team}</span>
              <div style={{ display: "flex", gap: 3 }}>
                {idx > 0           && <button onClick={() => swap(idx, idx - 1)} style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 4, color: "#888", cursor: "pointer", fontSize: 11, padding: "2px 6px", lineHeight: 1 }}>↑</button>}
                {idx < order.length - 1 && <button onClick={() => swap(idx, idx + 1)} style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 4, color: "#888", cursor: "pointer", fontSize: 11, padding: "2px 6px", lineHeight: 1 }}>↓</button>}
              </div>
            </div>
          );
        })}
      </div>
      <button onClick={() => onSet(order[0], order[1], order[2])} style={{ marginTop: 12, width: "100%", padding: "10px 0", background: standing ? "rgba(74,222,128,0.13)" : hasMain ? "rgba(255,215,0,0.18)" : "rgba(255,255,255,0.05)", border: standing ? "1px solid #4ade80" : hasMain ? "1px solid #FFD700" : "1px solid rgba(255,255,255,0.1)", borderRadius: 9, color: standing ? "#4ade80" : hasMain ? "#FFD700" : "#777", fontWeight: 800, fontSize: 13, cursor: "pointer", transition: "all 0.15s" }}>
        {standing ? `✓ ${standing.winner} wins Group ${group}` : `Confirm Group ${group}`}
      </button>
    </div>
  );
}

// ─── KNOCKOUT MATCH CARD ───────────────────────────────────────────────────────
function MatchCard({ match, t1, t2, winner, onPick, highlight, mainTeam, label, isFinal, isBronze }) {
  const team1 = isPlaceholder(t1) ? (t1 || "Other") : t1;
  const team2 = isPlaceholder(t2) ? (t2 || "Other") : t2;
  const btn = (team) => ({
    flex: 1, padding: "10px 8px", borderRadius: 9, cursor: "pointer", transition: "all 0.15s",
    border: winner === team ? "2px solid #4ade80" : "1px solid rgba(255,255,255,0.1)",
    background: winner === team ? "rgba(74,222,128,0.16)" : "rgba(255,255,255,0.04)",
    color: winner === team ? "#4ade80" : "#ccc",
    display: "flex", alignItems: "center", gap: 8, fontWeight: 600, fontSize: 12,
  });
  return (
    <div style={{ background: highlight ? "linear-gradient(135deg,rgba(255,215,0,0.09),rgba(255,140,0,0.04))" : "rgba(255,255,255,0.03)", border: highlight ? "2px solid #FFD700" : isFinal ? "2px solid #ff6b2b" : "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: 14, position: "relative" }}>
      {highlight && mainTeam && <div style={{ position: "absolute", top: -10, right: 12, background: "#FFD700", color: "#000", fontSize: 9, fontWeight: 900, padding: "2px 9px", borderRadius: 9, textTransform: "uppercase", letterSpacing: 1 }}>⭐ {mainTeam}</div>}
      {isFinal  && !highlight && <div style={{ position: "absolute", top: -10, left: 12, background: "#ff6b2b", color: "#fff", fontSize: 9, fontWeight: 900, padding: "2px 9px", borderRadius: 9 }}>🏆 Final</div>}
      {isBronze && !highlight && <div style={{ position: "absolute", top: -10, left: 12, background: "#cd7f32", color: "#fff", fontSize: 9, fontWeight: 900, padding: "2px 9px", borderRadius: 9 }}>🥉 3rd Place</div>}
      {label && <div style={{ fontSize: 10, color: "#444", textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 6 }}>{label}</div>}
      <div style={{ fontSize: 11, color: "#3a3a4a", marginBottom: 10 }}>📅 {match.date} · 📍 {match.city}</div>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        {[team1, team2].map((t, i) => (
          <button key={i} onClick={() => onPick(t)} style={btn(t)}>
            <Flag name={t} size={16} />
            <span style={{ flex: 1, textAlign: "left" }}>{t.length > 20 ? t.slice(0, 18) + "…" : t}</span>
            {winner === t && <span style={{ fontSize: 11 }}>✓</span>}
          </button>
        ))}
      </div>
      {winner && (
        <div style={{ fontSize: 11, color: "#4ade80", textAlign: "center", marginTop: 8, fontWeight: 700 }}>
          <TeamLabel name={winner} size={12} /> <span>advances</span>
        </div>
      )}
    </div>
  );
}

function ContinueBtn({ onClick, label }) {
  return (
    <button onClick={onClick} style={{ marginTop: 20, padding: "13px 0", width: "100%", background: "linear-gradient(135deg,#FFD700,#FFA500)", border: "none", borderRadius: 10, color: "#000", fontWeight: 900, fontSize: 14, cursor: "pointer" }}>
      {label}
    </button>
  );
}

// ─── KNOCKOUT PHASE ────────────────────────────────────────────────────────────
function KnockoutPhase({ allGroupStandings, knockoutWinners, setKnockoutWinners, mainTeam, teamFinish, teamGroup, onChampion }) {
  const [activeRound, setActiveRound] = useState("r32");

  const gs  = (g, pos) => { const s = allGroupStandings[g]; if (!s) return `${pos === "winner" ? "Winner" : pos === "runner" ? "Runner" : "3rd"} Grp ${g}`; return s[pos] || "Other"; };
  const rr  = (src) => {
    if (src.type === "winner") return gs(src.g, "winner");
    if (src.type === "runner") return gs(src.g, "runner");
    for (const g of src.gs) { const t = allGroupStandings[g]?.third; if (t) return t; }
    return "Other";
  };
  const mw  = (id) => knockoutWinners[id] || null;
  const sw  = (id, team) => { setKnockoutWinners((p) => ({ ...p, [id]: team })); if (id === 104) onChampion(team); };

  const inv = (name) => !!(name && mainTeam && name === mainTeam);
  const matchHasMain = (t1, t2) => inv(t1) || inv(t2);

  // Path steps: find which R32 match the main team is in
  const mainR32 = R32.find((m) => {
    const t1 = rr(m.t1), t2 = rr(m.t2);
    return inv(t1) || inv(t2);
  });
  const mainR16 = R16.find((m) => { const t1 = mw(m.m1)||"Other", t2 = mw(m.m2)||"Other"; return inv(t1)||inv(t2); });
  const mainQF  = QF.find( (m) => { const t1 = mw(m.m1)||"Other", t2 = mw(m.m2)||"Other"; return inv(t1)||inv(t2); });
  const mainSF  = SF.find( (m) => { const t1 = mw(m.m1)||"Other", t2 = mw(m.m2)||"Other"; return inv(t1)||inv(t2); });

  const pathSteps = [
    { label: "R32", w: mainR32 ? mw(mainR32.id) : null },
    { label: "R16", w: mainR16 ? mw(mainR16.id) : null },
    { label: "QF",  w: mainQF  ? mw(mainQF.id)  : null },
    { label: "SF",  w: mainSF  ? mw(mainSF.id)  : null },
    { label: "🏆",  w: mw(104) },
  ];

  const TABS = [
    { id: "r32",   label: "Rd of 32" },
    { id: "r16",   label: "Rd of 16" },
    { id: "qf",    label: "Quarters"  },
    { id: "sf",    label: "Semis"     },
    { id: "final", label: "Final"     },
  ];

  if (!mainTeam) {
    return (
      <div style={{ textAlign: "center", padding: 40, background: "rgba(255,215,0,0.06)", border: "1px solid rgba(255,215,0,0.2)", borderRadius: 14 }}>
        <div style={{ fontSize: 44, marginBottom: 12 }}>🏟️</div>
        <p style={{ color: "#FFD700", fontWeight: 700, fontSize: 14 }}>Select your team at the top to highlight their matches!</p>
        <p style={{ color: "#666", fontSize: 13 }}>You can still simulate all matches below.</p>
      </div>
    );
  }
  if (!teamFinish || teamFinish === "eliminated" || teamFinish === "third") {
    return (
      <div style={{ textAlign: "center", padding: 40, background: "rgba(248,113,113,0.07)", border: "1px solid rgba(248,113,113,0.2)", borderRadius: 14 }}>
        <div style={{ fontSize: 44, marginBottom: 12 }}>⚠️</div>
        <p style={{ fontSize: 14, color: "#f87171" }}>
          {mainTeam} needs to finish 1st or 2nd in Group {teamGroup} to reach the knockouts.<br />
          Update the standings in the Group Stage tab.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ fontSize: 20, fontWeight: 900, color: "#FFD700", marginBottom: 6 }}>🏆 Knockout Stage</h2>
        <p style={{ color: "#777", fontSize: 13, display: "flex", alignItems: "center", gap: 7, flexWrap: "wrap" }}>
          <Flag name={mainTeam} size={16} />
          <strong style={{ color: "#FFD700" }}>{mainTeam}</strong> finishes{" "}
          <strong style={{ color: "#FFD700" }}>{teamFinish === "winner" ? "1st" : "2nd"}</strong> in Group {teamGroup}
        </p>
      </div>

      {/* Path tracker */}
      <div style={{ background: "rgba(255,215,0,0.06)", border: "1px solid rgba(255,215,0,0.18)", borderRadius: 12, padding: 14, marginBottom: 22 }}>
        <div style={{ fontSize: 10, color: "#FFD700", fontWeight: 800, textTransform: "uppercase", letterSpacing: 2.5, marginBottom: 10, display: "flex", alignItems: "center", gap: 6 }}>
          <Flag name={mainTeam} size={12} /> {mainTeam}'s Path
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" }}>
          {pathSteps.map((s, i) => {
            const col = s.w === mainTeam ? "#4ade80" : s.w ? "#f87171" : "#2a2a3a";
            return (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                {i > 0 && <span style={{ color: "#1e1e2e", fontSize: 16 }}>›</span>}
                <div style={{ padding: "4px 12px", borderRadius: 16, fontSize: 12, fontWeight: 700, background: `${col}22`, color: col, border: `1px solid ${col}55` }}>
                  {s.label}{s.w === mainTeam ? " ✓" : s.w ? " ✗" : ""}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Round tabs */}
      <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 20 }}>
        {TABS.map((r) => (
          <button key={r.id} onClick={() => setActiveRound(r.id)} style={{ padding: "6px 16px", borderRadius: 20, border: activeRound === r.id ? "2px solid #FFD700" : "1px solid rgba(255,255,255,0.12)", background: activeRound === r.id ? "rgba(255,215,0,0.13)" : "rgba(255,255,255,0.03)", color: activeRound === r.id ? "#FFD700" : "#666", cursor: "pointer", fontSize: 12, fontWeight: 700, transition: "all 0.15s" }}>{r.label}</button>
        ))}
      </div>

      {activeRound === "r32" && (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(290px,1fr))", gap: 10 }}>
            {R32.map((m) => { const t1 = rr(m.t1), t2 = rr(m.t2); return <MatchCard key={m.id} match={m} t1={t1} t2={t2} winner={mw(m.id)} onPick={(w) => sw(m.id, w)} highlight={matchHasMain(t1, t2)} mainTeam={mainTeam} label={`Match ${m.id} · Round of 32`} />; })}
          </div>
          <ContinueBtn onClick={() => setActiveRound("r16")} label="Continue to Round of 16 →" />
        </div>
      )}
      {activeRound === "r16" && (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(290px,1fr))", gap: 10 }}>
            {R16.map((m) => { const t1 = mw(m.m1)||"Other", t2 = mw(m.m2)||"Other"; return <MatchCard key={m.id} match={m} t1={t1} t2={t2} winner={mw(m.id)} onPick={(w) => sw(m.id, w)} highlight={matchHasMain(t1, t2)} mainTeam={mainTeam} label={`Match ${m.id} · Round of 16`} />; })}
          </div>
          <ContinueBtn onClick={() => setActiveRound("qf")} label="Continue to Quarterfinals →" />
        </div>
      )}
      {activeRound === "qf" && (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(290px,1fr))", gap: 10 }}>
            {QF.map((m) => { const t1 = mw(m.m1)||"Other", t2 = mw(m.m2)||"Other"; return <MatchCard key={m.id} match={m} t1={t1} t2={t2} winner={mw(m.id)} onPick={(w) => sw(m.id, w)} highlight={matchHasMain(t1, t2)} mainTeam={mainTeam} label={`Match ${m.id} · Quarterfinal`} />; })}
          </div>
          <ContinueBtn onClick={() => setActiveRound("sf")} label="Continue to Semifinals →" />
        </div>
      )}
      {activeRound === "sf" && (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(290px,1fr))", gap: 10 }}>
            {SF.map((m) => { const t1 = mw(m.m1)||"Other", t2 = mw(m.m2)||"Other"; return <MatchCard key={m.id} match={m} t1={t1} t2={t2} winner={mw(m.id)} onPick={(w) => sw(m.id, w)} highlight={matchHasMain(t1, t2)} mainTeam={mainTeam} label={`Match ${m.id} · Semifinal`} />; })}
          </div>
          <ContinueBtn onClick={() => setActiveRound("final")} label="Continue to Final →" />
        </div>
      )}
      {activeRound === "final" && (() => {
        const sf1w = mw(101), sf2w = mw(102);
        return (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <MatchCard match={{ id: 103, date: "Jul 18", city: "Miami" }} t1={sf1w||"Other"} t2={sf2w||"Other"} winner={mw(103)} onPick={(w) => setKnockoutWinners((p) => ({ ...p, 103: w }))} highlight={false} mainTeam={mainTeam} label="Match 103 · Third Place" isBronze />
            <MatchCard match={{ id: 104, date: "Jul 19", city: "New York/NJ" }} t1={sf1w||"Other"} t2={sf2w||"Other"} winner={mw(104)} onPick={(w) => sw(104, w)} highlight={matchHasMain(sf1w||"Other", sf2w||"Other")} mainTeam={mainTeam} label="Match 104 · THE FINAL" isFinal />
          </div>
        );
      })()}
    </div>
  );
}

// ─── SHARE BUTTON ──────────────────────────────────────────────────────────────
function ShareButton({ mainTeam }) {
  const [showMenu, setShowMenu] = useState(false);
  const text = mainTeam
    ? `🏆 I just simulated ${mainTeam}'s path to the 2026 FIFA World Cup Final! Try the simulator.`
    : `🏆 Simulate the 2026 FIFA World Cup! Try it yourself.`;

  const shareOpts = [
    { name: "WhatsApp",    icon: "💬", url: `https://wa.me/?text=${encodeURIComponent(text + " " + window.location.href)}` },
    { name: "Facebook",    icon: "👥", url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}` },
    { name: "X / Twitter", icon: "🐦", url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(window.location.href)}` },
    { name: "iMessage",    icon: "💙", url: `sms:&body=${encodeURIComponent(text + " " + window.location.href)}` },
    { name: "Copy Link",   icon: "🔗", url: null },
  ];

  const doShare = async () => {
    if (navigator.share) {
      try { await navigator.share({ title: "2026 World Cup Simulator", text, url: window.location.href }); return; } catch {}
    }
    setShowMenu((v) => !v);
  };

  const handle = async (opt) => {
    if (opt.name === "Copy Link") { try { await navigator.clipboard.writeText(window.location.href); } catch {} }
    else if (opt.url) window.open(opt.url, "_blank");
    setShowMenu(false);
  };

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <button onClick={doShare} style={{ display: "flex", alignItems: "center", gap: 10, padding: "13px 28px", background: "linear-gradient(135deg,#FFD700,#FFA500)", border: "none", borderRadius: 12, color: "#000", fontWeight: 900, fontSize: 15, cursor: "pointer" }}>
        📤 Share My Simulation
      </button>
      {showMenu && (
        <div style={{ position: "absolute", bottom: "calc(100% + 10px)", left: "50%", transform: "translateX(-50%)", background: "#0d1520", border: "2px solid rgba(255,215,0,0.3)", borderRadius: 14, zIndex: 2000, padding: 12, boxShadow: "0 -12px 40px rgba(0,0,0,0.8)", minWidth: 220 }}>
          <div style={{ fontSize: 11, color: "#FFD700", fontWeight: 800, textTransform: "uppercase", letterSpacing: 2, marginBottom: 10, textAlign: "center" }}>Share Via</div>
          {shareOpts.map((opt) => (
            <button key={opt.name} onClick={() => handle(opt)} style={{ display: "flex", alignItems: "center", gap: 12, width: "100%", padding: "10px 12px", background: "transparent", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 9, color: "#ddd", cursor: "pointer", fontSize: 14, marginBottom: 6 }}>
              <span style={{ fontSize: 20 }}>{opt.icon}</span>
              <span style={{ fontWeight: 600 }}>{opt.name}</span>
            </button>
          ))}
          <button onClick={() => setShowMenu(false)} style={{ width: "100%", padding: "8px 0", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "#666", cursor: "pointer", fontSize: 13, marginTop: 4 }}>Cancel</button>
        </div>
      )}
    </div>
  );
}

// ─── SUMMARY PHASE ─────────────────────────────────────────────────────────────
function SummaryPhase({ allGroupStandings, knockoutWinners, mainTeam, teamFinish, teamGroup }) {
  const [openIdx, setOpenIdx] = useState(null);
  const mw = (id) => knockoutWinners[id] || null;
  const gs = (g, pos) => allGroupStandings[g]?.[pos] || null;

  if (!mainTeam) return (
    <div style={{ textAlign: "center", padding: 56, color: "#556" }}>
      <div style={{ fontSize: 52, marginBottom: 14 }}>🏟️</div>
      <p style={{ fontSize: 15 }}>Select your team at the top to see their World Cup journey.</p>
    </div>
  );
  if (!teamFinish || teamFinish === "eliminated" || teamFinish === "third") return (
    <div style={{ textAlign: "center", padding: 56, color: "#f87171" }}>
      <div style={{ fontSize: 52, marginBottom: 14 }}>😢</div>
      <p style={{ fontSize: 15 }}>{mainTeam} did not advance from the group stage.</p>
    </div>
  );

  // Build group stage matches (main team vs. the other 3 in its group)
  const groupOpps = teamGroup ? GROUPS[teamGroup].teams.filter((t) => t !== mainTeam) : [];
  const groupMatchDates = ["Jun 17–18", "Jun 22–23", "Jun 27"];
  const groupMatchCities = ["Various", "Various", "Various"];

  const groupMatches = groupOpps.map((opp, i) => ({
    round: "Group Stage", opp, date: groupMatchDates[i], city: groupMatchCities[i], w: null,
  }));

  // Derive R32 match from standings
  const mainR32match = (() => {
    for (const m of R32) {
      const resolve = (src) => {
        if (src.type === "winner") return gs(src.g, "winner");
        if (src.type === "runner") return gs(src.g, "runner");
        for (const g of (src.gs || [])) { const t = allGroupStandings[g]?.third; if (t) return t; }
        return null;
      };
      const t1 = resolve(m.t1), t2 = resolve(m.t2);
      if (t1 === mainTeam || t2 === mainTeam) {
        return { id: m.id, opp: t1 === mainTeam ? (t2 || "Other") : (t1 || "Other"), date: m.date, city: m.city };
      }
    }
    return null;
  })();

  const findKnockoutMatch = (arr) => {
    for (const m of arr) {
      const t1 = mw(m.m1) || "Other", t2 = mw(m.m2) || "Other";
      if (t1 === mainTeam || t2 === mainTeam) return { id: m.id, opp: t1 === mainTeam ? t2 : t1, date: m.date, city: m.city };
    }
    return null;
  };

  const r32w  = mainR32match ? mw(mainR32match.id) : null;
  const r16m  = r32w === mainTeam ? findKnockoutMatch(R16) : null;
  const r16w  = r16m ? mw(r16m.id) : null;
  const qfm   = r16w === mainTeam ? findKnockoutMatch(QF)  : null;
  const qfw   = qfm  ? mw(qfm.id)  : null;
  const sfm   = qfw  === mainTeam ? findKnockoutMatch(SF)  : null;
  const sfw   = sfm  ? mw(sfm.id)  : null;
  const sf1w  = mw(101), sf2w = mw(102);

  const matches = [
    ...groupMatches,
    ...(mainR32match ? [{ round: "Round of 32", opp: mainR32match.opp, date: mainR32match.date, city: mainR32match.city, w: r32w }] : []),
    ...(r32w === mainTeam && r16m ? [{ round: "Round of 16", opp: r16m.opp, date: r16m.date, city: r16m.city, w: r16w }] : []),
    ...(r16w === mainTeam && qfm  ? [{ round: "Quarterfinal", opp: qfm.opp, date: qfm.date, city: qfm.city, w: qfw }] : []),
    ...(qfw  === mainTeam && sfm  ? [{ round: "Semifinal",   opp: sfm.opp, date: sfm.date, city: sfm.city, w: sfw }] : []),
    ...(sfw === mainTeam
      ? [{ round: "Final",       opp: (sf1w === mainTeam ? sf2w : sf1w) || "Other", date: "Jul 19", city: "New York/NJ", w: mw(104) }]
      : sfw
      ? [{ round: "Third Place", opp: (sf1w === mainTeam ? sf2w : sf1w) || "Other", date: "Jul 18", city: "Miami",       w: mw(103) }]
      : []),
  ];

  const champion  = matches.find((m) => m.round === "Final" && m.w === mainTeam);
  const eliminated = matches.find((m) => m.w && m.w !== mainTeam);

  return (
    <div>
      <div style={{ textAlign: "center", marginBottom: 30 }}>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 12, marginBottom: 10 }}>
          {champion && <span style={{ fontSize: 40 }}>🏆</span>}
          <Flag name={mainTeam} size={52} />
          {champion && <span style={{ fontSize: 40 }}>🏆</span>}
        </div>
        <h2 style={{ fontSize: 26, fontWeight: 900, color: "#FFD700", marginBottom: 8 }}>{mainTeam}'s Journey 2026</h2>
        {champion
          ? <p style={{ color: "#4ade80", fontWeight: 700, fontSize: 16 }}>🥇 World Cup Champions!</p>
          : eliminated
          ? <p style={{ color: "#f87171", fontSize: 14 }}>Eliminated in the <strong>{eliminated.round}</strong> by <TeamLabel name={eliminated.w} size={14} /></p>
          : <p style={{ color: "#555", fontSize: 13 }}>Complete the knockout rounds to see the full journey.</p>
        }
      </div>

      <p style={{ textAlign: "center", color: "#444", fontSize: 12, marginBottom: 16 }}>👆 Tap any match to see estimated ticket prices</p>

      <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
        {matches.map((m, i) => {
          const won  = m.w === mainTeam;
          const lost = m.w && !won;
          const open = openIdx === i;
          return (
            <div key={i} onClick={() => setOpenIdx(open ? null : i)} style={{ background: open ? "rgba(255,215,0,0.07)" : "rgba(255,255,255,0.03)", border: lost ? "1px solid rgba(248,113,113,0.3)" : won ? "1px solid rgba(74,222,128,0.3)" : "1px solid rgba(255,255,255,0.07)", borderRadius: 13, padding: "16px 18px", cursor: "pointer", transition: "all 0.2s" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
                <div>
                  <div style={{ fontSize: 10, color: "#444", textTransform: "uppercase", letterSpacing: 2, marginBottom: 4 }}>{m.round}</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "#fff", display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 4 }}>
                    <TeamLabel name={mainTeam} size={15} />
                    <span style={{ color: "#2a2a3a" }}>vs</span>
                    <TeamLabel name={m.opp} size={15} />
                  </div>
                  <div style={{ fontSize: 11, color: "#3a3a4a" }}>📅 {m.date} · 📍 {m.city}</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  {m.w
                    ? <span style={{ padding: "5px 14px", borderRadius: 16, background: won ? "rgba(74,222,128,0.13)" : "rgba(248,113,113,0.13)", color: won ? "#4ade80" : "#f87171", fontSize: 12, fontWeight: 700 }}>{won ? "✅ Won" : "❌ Lost"}</span>
                    : <span style={{ color: "#2a2a3a", fontSize: 12 }}>Tap for 🎫</span>
                  }
                  <span style={{ color: open ? "#FFD700" : "#2a2a3a", fontSize: 16 }}>{open ? "▲" : "▼"}</span>
                </div>
              </div>
              {open && <TicketPrices round={m.round} city={m.city} teams={`${mainTeam} vs ${m.opp}`} />}
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: 32, textAlign: "center" }}>
        <p style={{ color: "#555", fontSize: 13, marginBottom: 16 }}>Enjoyed the simulation? Share it!</p>
        <ShareButton mainTeam={mainTeam} />
      </div>
    </div>
  );
}

// ─── CELEBRATION OVERLAY ──────────────────────────────────────────────────────
function CelebrationOverlay({ champion, onDismiss }) {
  if (!champion) return null;
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 9998, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.78)", backdropFilter: "blur(4px)" }} onClick={onDismiss}>
      <div style={{ textAlign: "center", padding: "40px 32px", background: "linear-gradient(135deg,#0a1628,#001840)", border: "3px solid #FFD700", borderRadius: 24, maxWidth: 440, boxShadow: "0 0 80px rgba(255,215,0,0.45)" }} onClick={(e) => e.stopPropagation()}>
        <style>{`@keyframes popIn{from{transform:scale(0.5);opacity:0}to{transform:scale(1);opacity:1}}.pop-in{animation:popIn 0.4s cubic-bezier(0.34,1.56,0.64,1)}`}</style>
        <div className="pop-in">
          <div style={{ fontSize: 72, marginBottom: 16 }}>🏆</div>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 14 }}>
            <Flag name={champion} size={52} />
          </div>
          <h2 style={{ fontSize: "clamp(1.4rem,4vw,2rem)", fontWeight: 900, color: "#FFD700", margin: "0 0 10px", textShadow: "0 2px 20px rgba(255,215,0,0.6)" }}>{champion}</h2>
          <p style={{ color: "#4ade80", fontSize: 18, fontWeight: 700, margin: "0 0 6px" }}>wins the 2026 World Cup!</p>
          <p style={{ color: "#aaa", fontSize: 13, margin: "0 0 24px" }}>MetLife Stadium · East Rutherford, NJ · July 19, 2026</p>
          <button onClick={onDismiss} style={{ padding: "12px 32px", background: "#FFD700", color: "#000", border: "none", borderRadius: 24, fontWeight: 900, fontSize: 15, cursor: "pointer" }}>🎉 Continue</button>
        </div>
      </div>
    </div>
  );
}

// ─── ROOT APP ──────────────────────────────────────────────────────────────────
export default function App() {
  const [phase,             setPhase]             = useState("group");
  const [mainTeam,          setMainTeam]          = useState(null);
  const [allGroupStandings, setAllGroupStandings] = useState({});
  const [knockoutWinners,   setKnockoutWinners]   = useState({});
  const [champion,          setChampion]          = useState(null);
  const [showCelebration,   setShowCelebration]   = useState(false);

  const setGroup = (g, winner, runner, third) =>
    setAllGroupStandings((p) => ({ ...p, [g]: { winner, runner, third } }));

  const teamGroup  = findTeamGroup(mainTeam);
  const teamFinish = teamGroup
    ? allGroupStandings[teamGroup]?.winner === mainTeam ? "winner"
    : allGroupStandings[teamGroup]?.runner === mainTeam ? "runner"
    : allGroupStandings[teamGroup]?.third  === mainTeam ? "third"
    : allGroupStandings[teamGroup] ? "eliminated" : null
    : null;

  const handleTeamChange = (team) => {
    setMainTeam(team);
    setKnockoutWinners({});
    setAllGroupStandings({});
    setChampion(null);
    setShowCelebration(false);
  };

  const handleChampion = (team) => {
    setChampion(team);
    setShowCelebration(true);
  };

  const TABS = [
    { id: "group",    label: "⚽ Group Stage"                             },
    { id: "knockout", label: "🏆 Knockout Rounds"                        },
    { id: "summary",  label: mainTeam ? `${mainTeam}'s Summary` : "📋 Summary" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "radial-gradient(ellipse at top,#0d1a2e 0%,#070b12 58%,#050508 100%)", fontFamily: "'Segoe UI',system-ui,sans-serif", color: "#fff" }}>

      <Confetti active={showCelebration} />
      {showCelebration && <CelebrationOverlay champion={champion} onDismiss={() => setShowCelebration(false)} />}

      {/* ── HERO ── */}
      <div style={{ background: "linear-gradient(180deg,#003893 0%,#001f5b 68%,#000c28 100%)", padding: "36px 20px 56px", textAlign: "center", clipPath: "polygon(0 0,100% 0,100% 80%,50% 100%,0 80%)", marginBottom: 6 }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 12, filter: "drop-shadow(0 6px 18px rgba(255,215,0,0.45))" }}>
          {mainTeam ? <Flag name={mainTeam} size={60} /> : <span style={{ fontSize: 64 }}>🏆</span>}
        </div>
        <h1 style={{ fontSize: "clamp(1.4rem,5vw,2.5rem)", fontWeight: 900, color: "#FFD700", margin: "0 0 8px", letterSpacing: "0.06em", textTransform: "uppercase", textShadow: "0 2px 20px rgba(255,215,0,0.55)" }}>
          YOUR TEAM'S WORLD CUP PATH
        </h1>
        <p style={{ color: "#6a9fd8", margin: "0 0 10px", fontSize: "0.82rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>
          FIFA World Cup 2026 — Interactive Simulator
        </p>
        <p style={{ color: "rgba(255,255,255,0.5)", margin: "0 0 26px", fontSize: "0.88rem", maxWidth: 500, marginLeft: "auto", marginRight: "auto", lineHeight: 1.6 }}>
          Map out your team's path to the 2026 World Cup final.<br />
          Calculate all possible match configurations. Visualize your journey to victory.
        </p>

        {/* ── TEAM SELECTOR ── */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <TeamSelector mainTeam={mainTeam} onChange={handleTeamChange} />
        </div>
      </div>

      {/* ── TABS ── */}
      <div style={{ display: "flex", justifyContent: "center", gap: 8, padding: "18px 16px 0", flexWrap: "wrap" }}>
        {TABS.map((t) => (
          <button key={t.id} onClick={() => setPhase(t.id)} style={{ padding: "9px 22px", borderRadius: 24, border: phase === t.id ? "2px solid #FFD700" : "2px solid rgba(255,255,255,0.09)", background: phase === t.id ? "#FFD700" : "rgba(255,255,255,0.04)", color: phase === t.id ? "#000" : "#777", fontWeight: 800, fontSize: 13, cursor: "pointer", textTransform: "uppercase", letterSpacing: "0.06em", transition: "all 0.2s" }}>
            {t.label}
          </button>
        ))}
      </div>

      {/* ── CONTENT ── */}
      <div style={{ maxWidth: 940, margin: "0 auto", padding: "24px 14px 70px" }}>

        {/* GROUP STAGE */}
        {phase === "group" && (
          <div>
            {!mainTeam && (
              <div style={{ textAlign: "center", marginBottom: 24, padding: 20, background: "rgba(255,215,0,0.06)", border: "1px solid rgba(255,215,0,0.2)", borderRadius: 14 }}>
                <div style={{ fontSize: 36, marginBottom: 8 }}>👆</div>
                <p style={{ color: "#FFD700", fontWeight: 700, fontSize: 15, margin: 0 }}>Select your team above to highlight their group and matches!</p>
              </div>
            )}
            <div style={{ textAlign: "center", marginBottom: 26 }}>
              <h2 style={{ color: "#FFD700", fontSize: "1.25rem", margin: "0 0 6px" }}>Set Group Stage Standings</h2>
              <p style={{ color: "#556", fontSize: 13, margin: 0 }}>Use ↑↓ arrows to reorder teams, then confirm each group.</p>
            </div>

            {/* Main team's group pinned to the top */}
            {mainTeam && teamGroup && (
              <div style={{ marginBottom: 18 }}>
                <GroupCard group={teamGroup} teams={GROUPS[teamGroup].teams} standing={allGroupStandings[teamGroup]} onSet={(w, r, t) => setGroup(teamGroup, w, r, t)} mainTeam={mainTeam} />
              </div>
            )}

            <div style={{ textAlign: "center", margin: "0 0 16px" }}>
              <div style={{ display: "inline-block", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 8, padding: "6px 18px", fontSize: 12, color: "#445" }}>
                ↓ Set all groups to resolve knockout opponents ↓
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 12 }}>
              {Object.entries(GROUPS).filter(([g]) => g !== teamGroup).map(([g, data]) => (
                <GroupCard key={g} group={g} teams={data.teams} standing={allGroupStandings[g]} onSet={(w, r, t) => setGroup(g, w, r, t)} mainTeam={mainTeam} />
              ))}
            </div>

            {teamFinish && (
              <div style={{ marginTop: 26, padding: 20, background: teamFinish === "eliminated" ? "rgba(248,113,113,0.08)" : "rgba(74,222,128,0.07)", border: `2px solid ${teamFinish === "eliminated" ? "rgba(248,113,113,0.35)" : "rgba(74,222,128,0.35)"}`, borderRadius: 14, textAlign: "center" }}>
                {teamFinish === "winner"     && <p style={{ color: "#4ade80", margin: "0 0 14px", fontWeight: 700, fontSize: 15 }}>🏆 {mainTeam} wins Group {teamGroup}! → Enter Round of 32</p>}
                {teamFinish === "runner"     && <p style={{ color: "#4ade80", margin: "0 0 14px", fontWeight: 700, fontSize: 15 }}>✅ {mainTeam} finishes 2nd in Group {teamGroup} → Enter Round of 32</p>}
                {teamFinish === "third"      && <p style={{ color: "#f97316", margin: "0 0 14px", fontWeight: 700, fontSize: 15 }}>⚠️ {mainTeam} finishes 3rd — may advance as best 3rd place</p>}
                {teamFinish === "eliminated" && <p style={{ color: "#f87171", margin: 0, fontWeight: 700, fontSize: 15 }}>❌ {mainTeam} eliminated in the group stage</p>}
                {(teamFinish === "winner" || teamFinish === "runner") && (
                  <button onClick={() => setPhase("knockout")} style={{ padding: "11px 32px", background: "#FFD700", color: "#000", border: "none", borderRadius: 24, fontWeight: 900, cursor: "pointer", fontSize: 14 }}>
                    Continue to Knockout Rounds →
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {phase === "knockout" && (
          <KnockoutPhase
            allGroupStandings={allGroupStandings}
            knockoutWinners={knockoutWinners}
            setKnockoutWinners={setKnockoutWinners}
            mainTeam={mainTeam}
            teamFinish={teamFinish}
            teamGroup={teamGroup}
            onChampion={handleChampion}
          />
        )}

        {phase === "summary" && (
          <SummaryPhase
            allGroupStandings={allGroupStandings}
            knockoutWinners={knockoutWinners}
            mainTeam={mainTeam}
            teamFinish={teamFinish}
            teamGroup={teamGroup}
          />
        )}
      </div>
    </div>
  );
}
