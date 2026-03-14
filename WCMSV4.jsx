import React, { useState, useRef, useEffect } from "react";

// ─── TEAMS PER GROUP ──────────────────────────────────────────────────────────
const GROUPS = {
  A: { teams: ["Mexico", "Korea Republic", "South Africa", "Czechia/Denmark/N.Macedonia/Ireland"] },
  B: { teams: ["Canada", "Switzerland", "Qatar", "Bosnia/Italy/N.Ireland/Wales"] },
  C: { teams: ["Brazil", "Morocco", "Haiti", "Scotland"] },
  D: { teams: ["USA", "Paraguay", "Australia", "Kosovo/Romania/Slovakia/Türkiye"] },
  E: { teams: ["Germany", "Ecuador", "Côte d'Ivoire", "Curaçao"] },
  F: { teams: ["Netherlands", "Japan", "Tunisia", "Albania/Poland/Sweden/Ukraine"] },
  G: { teams: ["Belgium", "Egypt", "IR Iran", "New Zealand"] },
  H: { teams: ["Spain", "Uruguay", "Saudi Arabia", "Cabo Verde"] },
  I: { teams: ["France", "Norway", "Senegal", "Bolivia/Iraq/Suriname"] },
  J: { teams: ["Argentina", "Algeria", "Austria", "Jordan"] },
  K: { teams: ["Portugal", "Colombia", "Uzbekistan", "Congo DR"] },
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
function OtherTeamsDropdown({ teams, onSelect }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ position: "relative" }}>
      <button onClick={() => setOpen(o => !o)}
        style={{ display: "flex", alignItems: "center", gap: 5, padding: "5px 10px", background: open ? "rgba(255,215,0,0.15)" : "rgba(255,255,255,0.07)", border: open ? "1px solid rgba(255,215,0,0.5)" : "1px solid rgba(255,255,255,0.14)", borderRadius: 20, color: open ? "#FFD700" : "#ddd", fontSize: 12, fontWeight: 600, cursor: "pointer", transition: "all 0.15s" }}
        onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,215,0,0.15)"; e.currentTarget.style.borderColor = "rgba(255,215,0,0.5)"; e.currentTarget.style.color = "#FFD700"; }}
        onMouseLeave={e => { if (!open) { e.currentTarget.style.background = "rgba(255,255,255,0.07)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.14)"; e.currentTarget.style.color = "#ddd"; }}}
      >
        Other ▾
      </button>
      {open && (
        <div style={{ position: "absolute", top: "calc(100% + 6px)", left: "50%", transform: "translateX(-50%)", background: "#0d1520", border: "1px solid rgba(255,215,0,0.25)", borderRadius: 12, zIndex: 500, padding: "8px 4px", minWidth: 180, maxHeight: 260, overflowY: "auto", boxShadow: "0 8px 32px rgba(0,0,0,0.7)" }}>
          {teams.map(team => (
            <button key={team} onClick={() => { onSelect(team); setOpen(false); }}
              style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", padding: "7px 12px", background: "transparent", border: "none", color: "#ccc", fontSize: 12, fontWeight: 600, cursor: "pointer", borderRadius: 6, transition: "all 0.1s", textAlign: "left" }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,215,0,0.12)"; e.currentTarget.style.color = "#FFD700"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#ccc"; }}
            >
              <Flag name={team} size={14} />{team}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function TeamSelector({ mainTeam, onChange }) {
  return (
    <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
      <div style={{ position: "relative", display: "inline-flex", alignItems: "center", gap: 10, maxWidth: "min(425px, 62.5vw)", width: "100%" }}>
      {/* Live flag preview beside the select */}
      <div style={{ flexShrink: 0, width: 36, height: 24, display: "flex", alignItems: "center", justifyContent: "center" }}>
        {mainTeam
          ? <Flag name={mainTeam} size={24} />
          : <span style={{ fontSize: 24 }}>🏟️</span>
        }
      </div>

      {/* Native select — fully accessible, works everywhere */}
      <div style={{ position: "relative", flex: 1 }}>
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
            width: "100%",
            backdropFilter: "blur(8px)",
          }}
        >
          <option value="" style={{ background: "#0d1520", color: "#aaa" }}>— Select Team —</option>
          {/* Group each team under its group letter for easier navigation */}
          {Object.entries(GROUPS).reverse().map(([g, data]) => (
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
    </div>
  );
}

// ─── TICKET PRICES ─────────────────────────────────────────────────────────────
function TicketPrices({ round, city, teams }) {
  // ── PER-MATCHUP GROUP STAGE FLOORS ──────────────────────────────────────────
  // Sourced from current 2026 resale listings (SeatGeek, StubHub, Goal.com, SeatPick, Mar 2026).
  // Key: canonical "Team A vs Team B" or "Team B vs Team A" — lookup checks both directions.
  // Values: { sh: StubHub floor, sg: SeatGeek floor, vs: Vivid Seats floor }
  // Confirmed data points:
  //   USA vs Paraguay $1,422 (Goal/StubHub) · USA vs Australia $1,095 · Mexico vs Korea $1,844
  //   Brazil vs Morocco $1,075 (SeatGeek) · Brazil vs Haiti $927 · Scotland vs Brazil $1,149
  //   Argentina vs Algeria $850 (SeatGeek) · Norway vs France $951 (Goal)
  //   Portugal vs Uzbekistan $695 (SeatGeek) · Colombia vs Portugal ~$1,100–$1,200
  //   Mexico vs Playoff (Jun 24) $1,305 · Low-demand neutral matches: ~$200–$400
  const GROUP_FLOORS = {
    // GROUP A
    "Mexico vs South Africa":                              { sh: 1900, sg: 1650, vs: 1750 },
    "Korea Republic vs Czechia/Denmark/N.Macedonia/Ireland":{ sh: 380,  sg: 300,  vs: 330  },
    "Czechia/Denmark/N.Macedonia/Ireland vs South Africa": { sh: 250,  sg: 200,  vs: 220  },
    "Switzerland vs Bosnia/Italy/N.Ireland/Wales":         { sh: 260,  sg: 210,  vs: 230  },
    "Canada vs Qatar":                                     { sh: 480,  sg: 380,  vs: 420  },
    "Mexico vs Korea Republic":                            { sh: 1844, sg: 1600, vs: 1700 },
    "Czechia/Denmark/N.Macedonia/Ireland vs Mexico":       { sh: 1305, sg: 1100, vs: 1200 },
    "South Africa vs Korea Republic":                      { sh: 220,  sg: 175,  vs: 195  },
    // GROUP B
    "Canada vs Bosnia/Italy/N.Ireland/Wales":              { sh: 520,  sg: 420,  vs: 460  },
    "Qatar vs Switzerland":                                { sh: 240,  sg: 195,  vs: 215  },
    "Bosnia/Italy/N.Ireland/Wales vs Switzerland":         { sh: 280,  sg: 230,  vs: 250  },
    "Canada vs Qatar":                                     { sh: 480,  sg: 380,  vs: 420  },
    "Switzerland vs Canada":                               { sh: 490,  sg: 390,  vs: 430  },
    "Bosnia/Italy/N.Ireland/Wales vs Qatar":               { sh: 230,  sg: 185,  vs: 205  },
    // GROUP C
    "Brazil vs Morocco":                                   { sh: 1075, sg: 950,  vs: 1000 },
    "Haiti vs Scotland":                                   { sh: 320,  sg: 255,  vs: 280  },
    "Brazil vs Haiti":                                     { sh: 927,  sg: 820,  vs: 870  },
    "Scotland vs Morocco":                                 { sh: 380,  sg: 305,  vs: 340  },
    "Scotland vs Brazil":                                  { sh: 1149, sg: 1020, vs: 1080 },
    "Morocco vs Haiti":                                    { sh: 310,  sg: 250,  vs: 275  },
    // GROUP D
    "USA vs Paraguay":                                     { sh: 1422, sg: 1250, vs: 1330 },
    "Australia vs Kosovo/Romania/Slovakia/Türkiye":        { sh: 290,  sg: 235,  vs: 260  },
    "USA vs Australia":                                    { sh: 1095, sg: 965,  vs: 1025 },
    "Kosovo/Romania/Slovakia/Türkiye vs Paraguay":         { sh: 230,  sg: 185,  vs: 205  },
    "Kosovo/Romania/Slovakia/Türkiye vs USA":              { sh: 1148, sg: 1010, vs: 1070 },
    "Paraguay vs Australia":                               { sh: 270,  sg: 215,  vs: 240  },
    // GROUP E
    "Côte d'Ivoire vs Ecuador":                            { sh: 360,  sg: 290,  vs: 320  },
    "Germany vs Curaçao":                                  { sh: 680,  sg: 575,  vs: 620  },
    "Germany vs Côte d'Ivoire":                            { sh: 720,  sg: 610,  vs: 655  },
    "Ecuador vs Curaçao":                                  { sh: 210,  sg: 170,  vs: 190  },
    "Curaçao vs Côte d'Ivoire":                            { sh: 200,  sg: 160,  vs: 178  },
    "Ecuador vs Germany":                                  { sh: 750,  sg: 635,  vs: 680  },
    // GROUP F
    "Netherlands vs Japan":                                { sh: 640,  sg: 540,  vs: 585  },
    "Albania/Poland/Sweden/Ukraine vs Tunisia":            { sh: 195,  sg: 155,  vs: 172  },
    "Netherlands vs Albania/Poland/Sweden/Ukraine":        { sh: 580,  sg: 490,  vs: 530  },
    "Tunisia vs Japan":                                    { sh: 180,  sg: 145,  vs: 162  },
    "Japan vs Albania/Poland/Sweden/Ukraine":              { sh: 450,  sg: 380,  vs: 410  },
    "Tunisia vs Netherlands":                              { sh: 560,  sg: 475,  vs: 510  },
    // GROUP G
    "Belgium vs Egypt":                                    { sh: 480,  sg: 405,  vs: 438  },
    "IR Iran vs New Zealand":                              { sh: 200,  sg: 160,  vs: 178  },
    "Belgium vs IR Iran":                                  { sh: 460,  sg: 390,  vs: 420  },
    "New Zealand vs Egypt":                                { sh: 195,  sg: 155,  vs: 172  },
    "Egypt vs IR Iran":                                    { sh: 215,  sg: 172,  vs: 192  },
    "New Zealand vs Belgium":                              { sh: 430,  sg: 365,  vs: 394  },
    // GROUP H
    "Saudi Arabia vs Uruguay":                             { sh: 310,  sg: 248,  vs: 276  },
    "Spain vs Cabo Verde":                                 { sh: 720,  sg: 610,  vs: 658  },
    "Uruguay vs Cabo Verde":                               { sh: 270,  sg: 216,  vs: 240  },
    "Spain vs Saudi Arabia":                               { sh: 755,  sg: 638,  vs: 690  },
    "Cabo Verde vs Saudi Arabia":                          { sh: 225,  sg: 180,  vs: 200  },
    "Uruguay vs Spain":                                    { sh: 680,  sg: 575,  vs: 622  },
    // GROUP I
    "France vs Senegal":                                   { sh: 980,  sg: 860,  vs: 915  },
    "Bolivia/Iraq/Suriname vs Norway":                     { sh: 210,  sg: 168,  vs: 188  },
    "France vs Bolivia/Iraq/Suriname":                     { sh: 870,  sg: 760,  vs: 810  },
    "Norway vs Senegal":                                   { sh: 420,  sg: 355,  vs: 384  },
    "Norway vs France":                                    { sh: 951,  sg: 835,  vs: 888  },
    "Senegal vs Bolivia/Iraq/Suriname":                    { sh: 200,  sg: 160,  vs: 178  },
    // GROUP J
    "Argentina vs Algeria":                                { sh: 850,  sg: 745,  vs: 794  },
    "Austria vs Jordan":                                   { sh: 210,  sg: 168,  vs: 188  },
    "Argentina vs Austria":                                { sh: 820,  sg: 718,  vs: 765  },
    "Jordan vs Algeria":                                   { sh: 185,  sg: 148,  vs: 165  },
    "Algeria vs Austria":                                  { sh: 215,  sg: 172,  vs: 192  },
    "Jordan vs Argentina":                                 { sh: 835,  sg: 732,  vs: 780  },
    // GROUP K
    "Portugal vs Congo DR":                                { sh: 695,  sg: 590,  vs: 638  },
    "Uzbekistan vs Colombia":                              { sh: 420,  sg: 355,  vs: 384  },
    "Portugal vs Uzbekistan":                              { sh: 695,  sg: 592,  vs: 638  },
    "Colombia vs Congo DR":                                { sh: 380,  sg: 322,  vs: 348  },
    "Colombia vs Portugal":                                { sh: 1200, sg: 1050, vs: 1120 },
    "Congo DR vs Uzbekistan":                              { sh: 195,  sg: 156,  vs: 174  },
    // GROUP L
    "Ghana vs Panama":                                     { sh: 260,  sg: 208,  vs: 232  },
    "England vs Croatia":                                  { sh: 780,  sg: 685,  vs: 728  },
    "England vs Ghana":                                    { sh: 740,  sg: 648,  vs: 690  },
    "Panama vs Croatia":                                   { sh: 245,  sg: 196,  vs: 218  },
    "Croatia vs Ghana":                                    { sh: 255,  sg: 204,  vs: 228  },
    "Panama vs England":                                   { sh: 760,  sg: 666,  vs: 710  },
  };

  // ── KNOCKOUT ROUND ESTIMATES ─────────────────────────────────────────────────
  // Recalibrated against confirmed data: R32 floor from $369 (StubHub low), avg ~$500–$800
  // R16 from $800+, QF ~$1,500+, SF ~$2,500+, Final from $5,605 (StubHub, Goal.com)
  const KNOCKOUT_BASE = {
    "Round of 32":  { sh: 600,  sg: 530,  vs: 560  },
    "Round of 16":  { sh: 1000, sg: 880,  vs: 935  },
    "Quarterfinal": { sh: 1600, sg: 1400, vs: 1490 },
    "Semifinal":    { sh: 2600, sg: 2280, vs: 2430 },
    "Third Place":  { sh: 850,  sg: 745,  vs: 794  },
    "Final":        { sh: 5605, sg: 4900, vs: 6200 },
  };

  // ── RESOLVE PRICES ───────────────────────────────────────────────────────────
  // For group stage: look up both "A vs B" and "B vs A" directions
  let base = null;
  if (round === "Group Stage" && teams) {
    const fwd = teams.trim();
    const parts = fwd.split(" vs ");
    const rev = parts.length === 2 ? `${parts[1]} vs ${parts[0]}` : null;
    base = GROUP_FLOORS[fwd] || (rev ? GROUP_FLOORS[rev] : null);
  }
  // For knockout rounds, use city multiplier on the base estimate
  if (!base) {
    const kBase = KNOCKOUT_BASE[round] || { sh: 600, sg: 530, vs: 560 };
    const mult = {
      "New York/NJ":   1.35, "Los Angeles":  1.25, "Miami":       1.15, "Dallas":      1.05,
      "Atlanta":       1.05, "Philadelphia": 1.05, "Boston":      1.10, "San Francisco": 1.20,
      "Seattle":       1.00, "Kansas City":  0.95, "Vancouver":   1.00, "Toronto":     1.10,
      "Mexico City":   0.90, "Monterrey":    0.85, "Guadalajara": 0.88, "Houston":     1.00,
    }[city] || 1.0;
    base = { sh: Math.round(kBase.sh * mult), sg: Math.round(kBase.sg * mult), vs: Math.round(kBase.vs * mult) };
  }

  const prices = { stubhub: base.sh, seatgeek: base.sg, vividseats: base.vs };
  const cheapest = Object.entries(prices).sort((a, b) => a[1] - b[1])[0];
  const meta = {
    stubhub:    { color: "#00d4aa", name: "StubHub",     icon: "🎫" },
    seatgeek:   { color: "#e85d04", name: "SeatGeek",    icon: "🪑" },
    vividseats: { color: "#a855f7", name: "Vivid Seats", icon: "🎟️" },
  };
  const q = encodeURIComponent(`FIFA World Cup 2026 ${teams || round} ${city}`);
  const links = {
    stubhub:    `https://www.stubhub.com/search?q=${q}`,
    seatgeek:   `https://seatgeek.com/search?q=${q}`,
    vividseats: `https://www.vividseats.com/search?q=${q}`,
  };

  return (
    <div style={{ background: "rgba(255,215,0,0.05)", border: "1px solid rgba(255,215,0,0.2)", borderRadius: 12, padding: 18, marginTop: 14 }}>
      <div style={{ fontSize: 11, color: "#FFD700", fontWeight: 800, textTransform: "uppercase", letterSpacing: 2, marginBottom: 10 }}>🎫 Estimated Ticket Prices</div>
      <div style={{ fontSize: 12, color: "#8fa8c0", marginBottom: 14 }}>{teams} · {city}</div>
      {/* PRICES HIDDEN — re-enable when ready
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8, marginBottom: 14 }}>
        {Object.entries(prices).map(([pl, price]) => (
          <a key={pl} href={links[pl]} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
            <div style={{ background: pl === cheapest[0] ? `${meta[pl].color}22` : "rgba(255,255,255,0.055)", border: `1px solid ${pl === cheapest[0] ? meta[pl].color : "rgba(255,255,255,0.13)"}`, borderRadius: 10, padding: "14px 8px", textAlign: "center", position: "relative", cursor: "pointer" }}>
              {pl === cheapest[0] && <div style={{ position: "absolute", top: -10, left: "50%", transform: "translateX(-50%)", background: "#FFD700", color: "#000", fontSize: 9, fontWeight: 900, padding: "2px 8px", borderRadius: 10, textTransform: "uppercase", letterSpacing: 1, whiteSpace: "nowrap" }}>Best Deal</div>}
              <div style={{ fontSize: 20, marginBottom: 4 }}>{meta[pl].icon}</div>
              <div style={{ fontSize: 11, fontWeight: 700, color: meta[pl].color }}>{meta[pl].name}</div>
              <div style={{ fontSize: 22, fontWeight: 900, color: "#fff", margin: "5px 0" }}>${price}</div>
              <div style={{ fontSize: 9, color: "#7a95ae" }}>tap to search</div>
            </div>
          </a>
        ))}
      </div>
      <div style={{ background: "rgba(74,222,128,0.07)", border: "1px solid rgba(74,222,128,0.2)", borderRadius: 8, padding: "10px 14px", textAlign: "center" }}>
        <span style={{ color: "#4ade80", fontSize: 13, fontWeight: 700 }}>💡 Best: {meta[cheapest[0]].name} from ${cheapest[1]}</span>
        <div style={{ color: "#444", fontSize: 10, marginTop: 4 }}>*Group stage prices from current 2026 resale listings. Knockout estimates based on round & city. Tap to see live rates.</div>
      </div>
      */}
    </div>
  );
}

// ─── TEAM ACCENT COLORS (used for the "X's Group" badge only) ────────────────
const TEAM_COLORS = {
  "Albania":"#E41E20","Argentina":"#75AADB","Australia":"#00843D","Austria":"#ED2939",
  "Belgium":"#EF3340","Bolivia":"#CE1126","Brazil":"#009C3B","Cabo Verde":"#003893",
  "Canada":"#FF0000","Chile":"#D52B1E","Colombia":"#FCD116","Congo DR":"#007FFF",
  "Costa Rica":"#002B7F","Côte d'Ivoire":"#F77F00","Croatia":"#FF0000","Curaçao":"#003DA5",
  "Denmark":"#C60C30","Ecuador":"#FFD100","Egypt":"#CE1126","England":"#CF091B",
  "France":"#002395","Germany":"#555555","Ghana":"#006B3F","Haiti":"#00209F",
  "Honduras":"#0073CF","IR Iran":"#239F40","Iraq":"#CE1126","Ireland":"#169B62",
  "Japan":"#BC002D","Jordan":"#007A3D","Korea Republic":"#003478","Mexico":"#006847",
  "Morocco":"#C1272D","Netherlands":"#FF6600","New Zealand":"#00247D","Nigeria":"#008751",
  "Norway":"#EF2B2D","Panama":"#DA121A","Paraguay":"#D52B1E","Peru":"#D91023",
  "Poland":"#DC143C","Portugal":"#006600","Qatar":"#8D1B3D","Romania":"#002B7F",
  "Saudi Arabia":"#006C35","Scotland":"#005EB8","Senegal":"#00853F","Serbia":"#C6363C",
  "Slovakia":"#005BBB","South Africa":"#007A4D","Spain":"#AA151B","Suriname":"#377E3F",
  "Sweden":"#006AA7","Switzerland":"#FF0000","Tunisia":"#E70013","Türkiye":"#E30A17",
  "Ukraine":"#005BBB","Uruguay":"#5EB6E4","USA":"#B22234","Uzbekistan":"#1EB53A",
  "Wales":"#C8102E",
};
const teamColor = (name) => TEAM_COLORS[name] || "#FFD700";

// ─── GROUP CARD ────────────────────────────────────────────────────────────────
function GroupCard({ group, teams, standing, onSet, mainTeam }) {
  const [order, setOrder] = useState([...teams]);
  const hasMain = !!mainTeam && teams.includes(mainTeam);
  const badgeColor = teamColor(mainTeam);

  useEffect(() => {
    setOrder([...teams]);
  }, [teams.join(",")]);

  const swap = (i, j) => { const o = [...order]; [o[i], o[j]] = [o[j], o[i]]; setOrder(o); };
  const POS = [
    { label: "1st", color: "#FFD700", bg: "rgba(255,215,0,0.11)" },
    { label: "2nd", color: "#93b4d4", bg: "rgba(147,180,212,0.08)" },
    { label: "3rd", color: "#ef4444", bg: "rgba(239,68,68,0.09)" },
    { label: "4th", color: "#444",    bg: "rgba(255,255,255,0.02)" },
  ];

  return (
    <div style={{ background: hasMain ? "linear-gradient(135deg,#0d1b3a,#131f40)" : "rgba(255,255,255,0.055)", border: hasMain ? `2px solid ${badgeColor}` : "1px solid rgba(255,255,255,0.13)", borderRadius: 14, padding: 18, position: "relative" }}>
      {hasMain && (
        <div style={{ position: "absolute", top: -11, left: 16, background: badgeColor, color: "#fff", fontSize: 10, fontWeight: 900, padding: "2px 14px", borderRadius: 10, letterSpacing: 1.2, textTransform: "uppercase", display: "flex", alignItems: "center", gap: 5, border: `1px solid ${badgeColor}`, boxShadow: `0 2px 8px ${badgeColor}55` }}>
          ⭐ {mainTeam}'s Group
        </div>
      )}
      <div style={{ fontWeight: 800, fontSize: 13, color: hasMain ? "#FFD700" : "#8fa8c0", textTransform: "uppercase", letterSpacing: 2, marginBottom: 14 }}>Group {group}</div>
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
                {idx > 0           && <button onClick={() => swap(idx, idx - 1)} style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 4, color: "#94a8bf", cursor: "pointer", fontSize: 11, padding: "2px 6px", lineHeight: 1 }}>↑</button>}
                {idx < order.length - 1 && <button onClick={() => swap(idx, idx + 1)} style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 4, color: "#94a8bf", cursor: "pointer", fontSize: 11, padding: "2px 6px", lineHeight: 1 }}>↓</button>}
              </div>
            </div>
          );
        })}
      </div>
      <button onClick={() => onSet(order[0], order[1], order[2])} style={{ marginTop: 12, width: "100%", padding: "10px 0", background: standing ? "rgba(74,222,128,0.13)" : hasMain ? "rgba(255,215,0,0.18)" : "rgba(255,255,255,0.05)", border: standing ? "1px solid #4ade80" : hasMain ? "1px solid #FFD700" : "1px solid rgba(255,255,255,0.1)", borderRadius: 9, color: standing ? "#4ade80" : hasMain ? "#FFD700" : "#8fa8c0", fontWeight: 800, fontSize: 13, cursor: "pointer", transition: "all 0.15s" }}
        onMouseEnter={e => {
          e.currentTarget.style.background = standing ? "rgba(74,222,128,0.3)" : hasMain ? "rgba(255,215,0,0.35)" : "rgba(255,255,255,0.14)";
          e.currentTarget.style.borderColor = standing ? "#4ade80" : hasMain ? "#FFD700" : "rgba(255,255,255,0.5)";
          e.currentTarget.style.color = standing ? "#fff" : hasMain ? "#fff" : "#fff";
          e.currentTarget.style.boxShadow = standing ? "0 0 12px rgba(74,222,128,0.3)" : hasMain ? "0 0 12px rgba(255,215,0,0.3)" : "0 0 10px rgba(255,255,255,0.12)";
          e.currentTarget.style.transform = "translateY(-2px)";
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = standing ? "rgba(74,222,128,0.13)" : hasMain ? "rgba(255,215,0,0.18)" : "rgba(255,255,255,0.05)";
          e.currentTarget.style.borderColor = standing ? "#4ade80" : hasMain ? "#FFD700" : "rgba(255,255,255,0.1)";
          e.currentTarget.style.color = standing ? "#4ade80" : hasMain ? "#FFD700" : "#8fa8c0";
          e.currentTarget.style.boxShadow = "none";
          e.currentTarget.style.transform = "translateY(0)";
        }}
      >
        {standing ? `✓ ${standing.winner} wins Group ${group}` : `Confirm Group ${group}`}
      </button>
    </div>
  );
}

// ─── KNOCKOUT MATCH CARD ───────────────────────────────────────────────────────
function MatchCard({ match, t1, t2, winner, onPick, highlight, mainTeam, label, isFinal, isBronze }) {
  const team1 = isPlaceholder(t1) ? (t1 || "Other") : t1;
  const team2 = isPlaceholder(t2) ? (t2 || "Other") : t2;
  const tc = teamColor(mainTeam); // team's assigned color
  const btn = (team) => ({
    flex: 1, padding: "10px 8px", borderRadius: 9, cursor: "pointer", transition: "all 0.15s",
    border: winner === team ? "2px solid #4ade80" : "1px solid rgba(255,255,255,0.1)",
    background: winner === team ? "rgba(74,222,128,0.16)" : "rgba(255,255,255,0.04)",
    color: winner === team ? "#4ade80" : "#ccc",
    display: "flex", alignItems: "center", gap: 8, fontWeight: 600, fontSize: 12,
  });
  const btnHover = (e, team) => {
    if (winner === team) return;
    e.currentTarget.style.background = "rgba(255,255,255,0.1)";
    e.currentTarget.style.borderColor = "rgba(255,215,0,0.5)";
    e.currentTarget.style.color = "#fff";
  };
  const btnLeave = (e, team) => {
    if (winner === team) return;
    e.currentTarget.style.background = "rgba(255,255,255,0.04)";
    e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
    e.currentTarget.style.color = "#ccc";
  };
  return (
    <div style={{ background: highlight ? `linear-gradient(135deg,${tc}18,${tc}08)` : "rgba(255,255,255,0.055)", border: highlight ? `2px solid ${tc}` : isFinal ? "2px solid #ff6b2b" : "1px solid rgba(255,255,255,0.13)", borderRadius: 12, padding: 14, position: "relative" }}>
      {highlight && mainTeam && <div style={{ position: "absolute", top: -10, right: 12, background: tc, color: "#fff", fontSize: 9, fontWeight: 900, padding: "2px 9px", borderRadius: 9, textTransform: "uppercase", letterSpacing: 1, boxShadow: `0 2px 8px ${tc}55` }}>⭐ {mainTeam}</div>}
      {isFinal  && !highlight && <div style={{ position: "absolute", top: -10, left: 12, background: "#ff6b2b", color: "#fff", fontSize: 9, fontWeight: 900, padding: "2px 9px", borderRadius: 9 }}>🏆 Final</div>}
      {isBronze && !highlight && <div style={{ position: "absolute", top: -10, left: 12, background: "#cd7f32", color: "#fff", fontSize: 9, fontWeight: 900, padding: "2px 9px", borderRadius: 9 }}>🥉 3rd Place</div>}
      {label && <div style={{ fontSize: 10, color: "#7a95ae", textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 6 }}>{label}</div>}
      <div style={{ fontSize: 11, color: "#8fa8c0", marginBottom: 10 }}>📅 {match.date} · 📍 {match.city}</div>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        {[team1, team2].map((t, i) => (
          <button key={i} onClick={() => onPick(t)} style={btn(t)}
            onMouseEnter={e => btnHover(e, t)}
            onMouseLeave={e => btnLeave(e, t)}
          >
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

function ContinueBtn({ onClick, label, onBack, backLabel, incomplete, incompleteMsg }) {
  const [showWarning, setShowWarning] = useState(false);

  const handleContinue = () => {
    if (incomplete) { setShowWarning(true); return; }
    onClick();
  };

  return (
    <>
      {/* Warning modal */}
      {showWarning && (
        <div style={{ position: "fixed", inset: 0, zIndex: 9000, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.55)", backdropFilter: "blur(6px)" }}>
          <div style={{ background: "linear-gradient(160deg,#1a2236,#141c2e)", border: "1px solid rgba(148,163,184,0.2)", borderRadius: 16, padding: "22px 22px", maxWidth: 280, width: "90%", textAlign: "center", boxShadow: "0 8px 40px rgba(0,0,0,0.5)" }}>
            <p style={{ color: "#e2e8f0", fontWeight: 700, fontSize: 13, margin: "0 0 6px" }}>Unconfirmed Matches</p>
            <p style={{ color: "#94a3b8", fontSize: 12, margin: "0 0 20px", lineHeight: 1.5 }}>
              Some matches have no winner. Continue anyway?
            </p>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => setShowWarning(false)} style={{ flex: 1, padding: "9px 0", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 8, color: "#94a3b8", fontWeight: 600, fontSize: 12, cursor: "pointer", transition: "all 0.15s" }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "#e2e8f0"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "#94a3b8"; }}
              >
                Go back
              </button>
              <button onClick={() => { setShowWarning(false); onClick(); }} style={{ flex: 1, padding: "9px 0", background: "rgba(99,102,241,0.85)", border: "1px solid rgba(99,102,241,0.5)", borderRadius: 8, color: "#fff", fontWeight: 700, fontSize: 12, cursor: "pointer", transition: "all 0.15s" }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(99,102,241,1)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(99,102,241,0.85)"; }}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Button row */}
      <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
        {onBack && (
          <button onClick={onBack} style={{ flex: "0 0 auto", padding: "13px 20px", background: "transparent", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 10, color: "#94a8bf", fontWeight: 700, fontSize: 13, cursor: "pointer", transition: "all 0.15s" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.35)"; e.currentTarget.style.color = "#ccc"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; e.currentTarget.style.color = "#888"; }}
          >
            ← {backLabel || "Back"}
          </button>
        )}
        <button onClick={handleContinue}
          style={{ flex: 1, padding: "13px 0", background: incomplete ? "linear-gradient(135deg,#FFD700,#FFA500)" : "linear-gradient(135deg,#4ade80,#22c55e)", border: "none", borderRadius: 10, color: "#000", fontWeight: 900, fontSize: 14, cursor: "pointer", transition: "all 0.4s", boxShadow: incomplete ? "none" : "0 0 20px rgba(74,222,128,0.35)" }}
          onMouseEnter={e => { e.currentTarget.style.opacity = "0.88"; e.currentTarget.style.transform = "translateY(-1px)"; }}
          onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)"; }}
        >
          {label}
        </button>
      </div>
    </>
  );
}

// ─── BRACKET VIEW ─────────────────────────────────────────────────────────────
function BracketView({ allGroupStandings, knockoutWinners, setKnockoutWinners, mainTeam, onChampion }) {
  const [showSnapshot, setShowSnapshot] = useState(false);

  const gs  = (g, pos) => { const s = allGroupStandings[g]; if (!s) return `${pos === "winner" ? "W" : "RU"} Grp ${g}`; return s[pos] || "?"; };
  const rr  = (src) => {
    if (src.type === "winner") return gs(src.g, "winner");
    if (src.type === "runner") return gs(src.g, "runner");
    for (const g of src.gs) { const t = allGroupStandings[g]?.third; if (t) return t; }
    return "?";
  };
  const mw  = (id) => knockoutWinners[id] || null;
  const sw  = (id, team) => { setKnockoutWinners((p) => ({ ...p, [id]: team })); if (id === 104) onChampion(team); };

  const r32Teams = R32.map(m => ({ id: m.id, t1: rr(m.t1), t2: rr(m.t2), date: m.date, city: m.city }));
  const r16Teams = R16.map(m => ({ id: m.id, t1: mw(m.m1) || "?", t2: mw(m.m2) || "?", date: m.date, city: m.city }));
  const qfTeams  = QF.map(m  => ({ id: m.id, t1: mw(m.m1) || "?", t2: mw(m.m2) || "?", date: m.date, city: m.city }));
  const sfTeams  = SF.map(m  => ({ id: m.id, t1: mw(m.m1) || "?", t2: mw(m.m2) || "?", date: m.date, city: m.city }));
  const sf1w = mw(101), sf2w = mw(102);
  const sf1t1 = mw(SF[0].m1)||"?", sf1t2 = mw(SF[0].m2)||"?";
  const sf2t1 = mw(SF[1].m1)||"?", sf2t2 = mw(SF[1].m2)||"?";

  const rounds = [
    { key: "r32",   label: "Round of 32", matches: r32Teams },
    { key: "r16",   label: "Round of 16", matches: r16Teams },
    { key: "qf",    label: "Quarters",    matches: qfTeams  },
    { key: "sf",    label: "Semis",       matches: sfTeams  },
    { key: "final", label: "Final",       matches: [{ id: 104, t1: sf1w||"?", t2: sf2w||"?", date: "Jul 19", city: "New York/NJ" }] },
  ];

  const isPlaceholder = (n) => !n || n === "?" || n.startsWith("W ") || n.startsWith("RU ");

  // Shared match card — used in both scrollable and snapshot views
  const BracketMatch = ({ match, compact = false }) => {
    const w = mw(match.id);
    const t1won = w === match.t1;
    const t2won = w === match.t2;
    const t1main = match.t1 === mainTeam;
    const t2main = match.t2 === mainTeam;
    const hasWinner = !!w;
    const isMain = t1main || t2main || w === mainTeam;

    const cardW = compact ? 108 : 134;
    const fontSize = compact ? 9 : 11;
    const flagSize = compact ? 11 : 13;
    const rowPad = compact ? "4px 6px" : "6px 8px";

    const TeamRow = ({ team, won, lost, isMainTeam }) => {
      const color = won
        ? (isMainTeam ? "#4ade80" : "#4ade80")   // always green when selected
        : lost
          ? "#33404a"                              // greyed out when lost
          : isMainTeam ? "#86efac" : "#bcc8d4";   // default states

      const bg = won
        ? (isMainTeam ? "rgba(74,222,128,0.18)" : "rgba(74,222,128,0.12)")
        : "transparent";

      return (
        <button
          onClick={() => !isPlaceholder(team) && sw(match.id, team)}
          style={{
            display: "flex", alignItems: "center", gap: 5,
            width: "100%", padding: rowPad,
            background: bg, border: "none", borderRadius: 5,
            cursor: isPlaceholder(team) ? "default" : "pointer",
            transition: "all 0.15s", textAlign: "left",
            opacity: lost ? 0.38 : 1,
          }}
          onMouseEnter={e => { if (!isPlaceholder(team) && !won) e.currentTarget.style.background = "rgba(255,255,255,0.09)"; }}
          onMouseLeave={e => { if (!won) e.currentTarget.style.background = bg; }}
        >
          {!isPlaceholder(team) && <Flag name={team} size={flagSize} />}
          <span style={{
            fontSize, fontWeight: won ? 800 : 600, color,
            overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
            maxWidth: compact ? 70 : 88,
          }}>{team || "?"}</span>
          {won && <span style={{ marginLeft: "auto", fontSize: compact ? 8 : 10, color: "#4ade80" }}>✓</span>}
        </button>
      );
    };

    return (
      <div style={{
        background: isMain ? "rgba(74,222,128,0.05)" : "rgba(255,255,255,0.04)",
        border: isMain
          ? (hasWinner ? "1px solid rgba(74,222,128,0.4)" : "1px solid rgba(74,222,128,0.25)")
          : "1px solid rgba(255,255,255,0.09)",
        borderRadius: 7, overflow: "hidden",
        width: cardW, minWidth: cardW,
        transition: "border-color 0.15s",
      }}>
        <div style={{ fontSize: compact ? 8 : 9, color: "#445", padding: compact ? "2px 6px" : "3px 8px", borderBottom: "1px solid rgba(255,255,255,0.05)", fontWeight: 600, letterSpacing: "0.04em", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {match.city}
        </div>
        <TeamRow team={match.t1} won={t1won} lost={hasWinner && !t1won} isMainTeam={t1main} />
        <div style={{ height: 1, background: "rgba(255,255,255,0.05)", margin: compact ? "0 6px" : "0 8px" }} />
        <TeamRow team={match.t2} won={t2won} lost={hasWinner && !t2won} isMainTeam={t2main} />
      </div>
    );
  };

  // Shared bracket layout — renders all rounds spaced evenly
  const BracketLayout = ({ compact = false }) => {
    const slotH = compact ? 66 : 88;
    const gap   = compact ? 14 : 20;
    const totalSlots = 32;
    const totalH = totalSlots * slotH;

    return (
      <div style={{ display: "flex", gap, alignItems: "flex-start", minWidth: "max-content", padding: compact ? "4px 2px" : "8px 4px" }}>
        {rounds.map((round) => {
          const matchCount = round.matches.length;
          const spacing = totalH / matchCount;
          const cardH = compact ? 58 : 74;
          return (
            <div key={round.key} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ fontSize: compact ? 8 : 10, fontWeight: 800, color: "#FFD700", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: compact ? 6 : 10, textAlign: "center", whiteSpace: "nowrap" }}>
                {round.label}
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                {round.matches.map((match, mi) => (
                  <div key={match.id} style={{ paddingTop: mi === 0 ? (spacing - cardH) / 2 : spacing - cardH }}>
                    <BracketMatch match={match} compact={compact} />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
        {/* Champion */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ fontSize: compact ? 8 : 10, fontWeight: 800, color: "#FFD700", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: compact ? 6 : 10, textAlign: "center" }}>🏆</div>
          <div style={{ marginTop: totalH / 2 - (compact ? 28 : 35) }}>
            {mw(104) ? (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: compact ? 4 : 8, padding: compact ? "8px 10px" : "12px 16px", background: "rgba(74,222,128,0.13)", border: "2px solid rgba(74,222,128,0.5)", borderRadius: 10 }}>
                <Flag name={mw(104)} size={compact ? 20 : 28} />
                <span style={{ fontSize: compact ? 9 : 12, fontWeight: 900, color: "#4ade80" }}>{mw(104)}</span>
              </div>
            ) : (
              <div style={{ padding: compact ? "8px 10px" : "12px 16px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, color: "#445", fontSize: compact ? 9 : 11, fontWeight: 600 }}>TBD</div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Snapshot modal */}
      {showSnapshot && (
        <div
          onClick={() => setShowSnapshot(false)}
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.88)", zIndex: 3000, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 16 }}
        >
          <div onClick={e => e.stopPropagation()} style={{ background: "#070b12", border: "1px solid rgba(255,215,0,0.2)", borderRadius: 14, padding: "16px 16px 12px", maxWidth: "98vw", maxHeight: "92vh", overflow: "auto", boxShadow: "0 0 60px rgba(0,0,0,0.9)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <span style={{ fontSize: 11, fontWeight: 800, color: "#FFD700", textTransform: "uppercase", letterSpacing: "0.1em" }}>🏟️ Full Bracket Snapshot</span>
              <button onClick={() => setShowSnapshot(false)} style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 8, color: "#aaa", fontSize: 13, padding: "4px 12px", cursor: "pointer", fontWeight: 700 }}>✕ Close</button>
            </div>
            <div style={{ overflowX: "auto" }}>
              <BracketLayout compact={true} />
            </div>
            <p style={{ fontSize: 10, color: "#334", textAlign: "center", marginTop: 10, marginBottom: 0 }}>Tap any team to pick a winner · Tap outside to close</p>
          </div>
        </div>
      )}

      {/* Toolbar */}
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 10 }}>
        <button
          onClick={() => setShowSnapshot(true)}
          style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 14px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.14)", borderRadius: 20, color: "#8fa8c0", fontSize: 11, fontWeight: 700, cursor: "pointer", transition: "all 0.15s", letterSpacing: "0.04em" }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,215,0,0.4)"; e.currentTarget.style.color = "#FFD700"; e.currentTarget.style.background = "rgba(255,215,0,0.08)"; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.14)"; e.currentTarget.style.color = "#8fa8c0"; e.currentTarget.style.background = "rgba(255,255,255,0.06)"; }}
        >
          🔍 Full Snapshot
        </button>
      </div>

      {/* Scrollable bracket */}
      <div style={{ overflowX: "auto", paddingBottom: 16 }}>
        <BracketLayout compact={false} />
      </div>
      <p style={{ fontSize: 11, color: "#334", textAlign: "center", marginTop: 8 }}>
        Tap any team to pick winner · Scroll right to see all rounds · 🔍 Full Snapshot to see everything at once
      </p>
    </>
  );
}

// ─── KNOCKOUT PHASE ────────────────────────────────────────────────────────────
function KnockoutPhase({ allGroupStandings, knockoutWinners, setKnockoutWinners, mainTeam, teamFinish, teamGroup, onChampion, onBackToGroups }) {
  const [activeRound, setActiveRound] = useState("r32");
  const [viewMode, setViewMode] = useState("path"); // "path" | "bracket"

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

  // Shared subtle button style for auto-confirm buttons
  const subtleBtn = {
    padding: "6px 18px", background: "transparent",
    border: "1px solid rgba(255,255,255,0.15)", borderRadius: 20,
    color: "#94a8bf", fontWeight: 600, fontSize: 12, cursor: "pointer",
    letterSpacing: "0.03em", transition: "all 0.15s",
  };
  const subtleBtnHover = (e) => { e.target.style.borderColor = "rgba(255,215,0,0.4)"; e.target.style.color = "#bbb"; };
  const subtleBtnLeave = (e) => { e.target.style.borderColor = "rgba(255,255,255,0.15)"; e.target.style.color = "#888"; };

  // Auto-confirm helpers — pick t1 as winner for every unset match in a round
  const autoR32 = () => {
    const updates = {};
    R32.forEach((m) => { const t1 = rr(m.t1); if (!knockoutWinners[m.id]) updates[m.id] = t1; });
    setKnockoutWinners((p) => ({ ...p, ...updates }));
  };
  const autoR16 = () => {
    const updates = {};
    R16.forEach((m) => { const t1 = knockoutWinners[m.m1] || "Other"; if (!knockoutWinners[m.id]) updates[m.id] = t1; });
    setKnockoutWinners((p) => ({ ...p, ...updates }));
  };
  const autoQF = () => {
    const updates = {};
    QF.forEach((m) => { const t1 = knockoutWinners[m.m1] || "Other"; if (!knockoutWinners[m.id]) updates[m.id] = t1; });
    setKnockoutWinners((p) => ({ ...p, ...updates }));
  };
  const autoSF = () => {
    const updates = {};
    SF.forEach((m) => { const t1 = knockoutWinners[m.m1] || "Other"; if (!knockoutWinners[m.id]) updates[m.id] = t1; });
    setKnockoutWinners((p) => ({ ...p, ...updates }));
  };
  const autoFinal = () => {
    const sf1w = knockoutWinners[101] || "Other";
    const sf2w = knockoutWinners[102] || "Other";
    // Derive SF losers: the participant who didn't win each semifinal
    const sf1teams = [knockoutWinners[SF[0].m1] || "Other", knockoutWinners[SF[0].m2] || "Other"];
    const sf2teams = [knockoutWinners[SF[1].m1] || "Other", knockoutWinners[SF[1].m2] || "Other"];
    const sf1loser = sf1teams.find((t) => t !== sf1w) || "Other";
    const sf2loser = sf2teams.find((t) => t !== sf2w) || "Other";
    const updates = {};
    if (!knockoutWinners[103]) updates[103] = sf1loser; // bronze: sf1 loser vs sf2 loser
    if (!knockoutWinners[104]) updates[104] = sf1w;     // final: sf1 winner vs sf2 winner
    setKnockoutWinners((p) => {
      const next = { ...p, ...updates };
      if (updates[104]) onChampion(updates[104]);
      return next;
    });
  };

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
        <p style={{ color: "#8fa8c0", fontSize: 13 }}>You can still simulate all matches below.</p>
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
        <p style={{ color: "#8fa8c0", fontSize: 13, display: "flex", alignItems: "center", gap: 7, flexWrap: "wrap" }}>
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

      {/* View toggle */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
        <div style={{ display: "flex", background: "rgba(255,255,255,0.06)", borderRadius: 24, padding: 3, border: "1px solid rgba(255,255,255,0.1)" }}>
          {[{ id: "path", label: "🎯 My Path" }, { id: "bracket", label: "🏟️ Full Bracket" }].map(v => (
            <button key={v.id} onClick={() => setViewMode(v.id)}
              style={{ padding: "7px 18px", borderRadius: 20, border: "none", background: viewMode === v.id ? "#FFD700" : "transparent", color: viewMode === v.id ? "#000" : "#8fa8c0", fontWeight: 800, fontSize: 12, cursor: "pointer", transition: "all 0.2s", letterSpacing: "0.03em" }}
            >{v.label}</button>
          ))}
        </div>
      </div>

      {/* BRACKET VIEW */}
      {viewMode === "bracket" && (
        <BracketView
          allGroupStandings={allGroupStandings}
          knockoutWinners={knockoutWinners}
          setKnockoutWinners={setKnockoutWinners}
          mainTeam={mainTeam}
          onChampion={onChampion}
        />
      )}

      {/* PATH VIEW — round tabs + match cards */}
      {viewMode === "path" && <>

      {/* Round tabs */}
      <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 20 }}>
        {TABS.map((r) => (
          <button key={r.id} onClick={() => setActiveRound(r.id)} style={{ padding: "6px 16px", borderRadius: 20, border: activeRound === r.id ? "2px solid #FFD700" : "1px solid rgba(255,255,255,0.12)", background: activeRound === r.id ? "rgba(255,215,0,0.13)" : "rgba(255,255,255,0.03)", color: activeRound === r.id ? "#FFD700" : "#8fa8c0", cursor: "pointer", fontSize: 12, fontWeight: 700, transition: "all 0.15s" }}
            onMouseEnter={e => { if (activeRound !== r.id) { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; e.currentTarget.style.borderColor = "rgba(255,215,0,0.4)"; e.currentTarget.style.color = "#fff"; }}}
            onMouseLeave={e => { if (activeRound !== r.id) { e.currentTarget.style.background = "rgba(255,255,255,0.03)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; e.currentTarget.style.color = "#8fa8c0"; }}}
          >{r.label}</button>
        ))}
      </div>

      {activeRound === "r32" && (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(290px,1fr))", gap: 10 }}>
            {R32.map((m) => { const t1 = rr(m.t1), t2 = rr(m.t2); return <MatchCard key={m.id} match={m} t1={t1} t2={t2} winner={mw(m.id)} onPick={(w) => sw(m.id, w)} highlight={matchHasMain(t1, t2)} mainTeam={mainTeam} label={`Match ${m.id} · Round of 32`} />; })}
          </div>
          <ContinueBtn onClick={() => setActiveRound("r16")} label="Continue to Round of 16 →" onBack={onBackToGroups} backLabel="Group Stage" incomplete={R32.some((m) => !mw(m.id))} />
          <div style={{ textAlign: "center", marginTop: 10 }}>
            <button style={subtleBtn} onMouseEnter={subtleBtnHover} onMouseLeave={subtleBtnLeave} onClick={autoR32}>Auto-Confirm All Round of 32</button>
          </div>
        </div>
      )}
      {activeRound === "r16" && (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(290px,1fr))", gap: 10 }}>
            {R16.map((m) => { const t1 = mw(m.m1)||"Other", t2 = mw(m.m2)||"Other"; return <MatchCard key={m.id} match={m} t1={t1} t2={t2} winner={mw(m.id)} onPick={(w) => sw(m.id, w)} highlight={matchHasMain(t1, t2)} mainTeam={mainTeam} label={`Match ${m.id} · Round of 16`} />; })}
          </div>
          <ContinueBtn onClick={() => setActiveRound("qf")} label="Continue to Quarterfinals →" onBack={() => setActiveRound("r32")} backLabel="Round of 32" incomplete={R16.some((m) => !mw(m.id))} />
          <div style={{ textAlign: "center", marginTop: 10 }}>
            <button style={subtleBtn} onMouseEnter={subtleBtnHover} onMouseLeave={subtleBtnLeave} onClick={autoR16}>Auto-Confirm All Round of 16</button>
          </div>
        </div>
      )}
      {activeRound === "qf" && (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(290px,1fr))", gap: 10 }}>
            {QF.map((m) => { const t1 = mw(m.m1)||"Other", t2 = mw(m.m2)||"Other"; return <MatchCard key={m.id} match={m} t1={t1} t2={t2} winner={mw(m.id)} onPick={(w) => sw(m.id, w)} highlight={matchHasMain(t1, t2)} mainTeam={mainTeam} label={`Match ${m.id} · Quarterfinal`} />; })}
          </div>
          <ContinueBtn onClick={() => setActiveRound("sf")} label="Continue to Semifinals →" onBack={() => setActiveRound("r16")} backLabel="Round of 16" incomplete={QF.some((m) => !mw(m.id))} />
          <div style={{ textAlign: "center", marginTop: 10 }}>
            <button style={subtleBtn} onMouseEnter={subtleBtnHover} onMouseLeave={subtleBtnLeave} onClick={autoQF}>Auto-Confirm All Quarterfinals</button>
          </div>
        </div>
      )}
      {activeRound === "sf" && (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(290px,1fr))", gap: 10 }}>
            {SF.map((m) => { const t1 = mw(m.m1)||"Other", t2 = mw(m.m2)||"Other"; return <MatchCard key={m.id} match={m} t1={t1} t2={t2} winner={mw(m.id)} onPick={(w) => sw(m.id, w)} highlight={matchHasMain(t1, t2)} mainTeam={mainTeam} label={`Match ${m.id} · Semifinal`} />; })}
          </div>
          <ContinueBtn onClick={() => setActiveRound("final")} label="Continue to Final →" onBack={() => setActiveRound("qf")} backLabel="Quarterfinals" incomplete={SF.some((m) => !mw(m.id))} />
          <div style={{ textAlign: "center", marginTop: 10 }}>
            <button style={subtleBtn} onMouseEnter={subtleBtnHover} onMouseLeave={subtleBtnLeave} onClick={autoSF}>Auto-Confirm All Semifinals</button>
          </div>
        </div>
      )}
      {activeRound === "final" && (() => {
        const sf1w = mw(101), sf2w = mw(102);
        // Derive SF losers for bronze match
        const sf1t1 = mw(SF[0].m1) || "Other", sf1t2 = mw(SF[0].m2) || "Other";
        const sf2t1 = mw(SF[1].m1) || "Other", sf2t2 = mw(SF[1].m2) || "Other";
        const sf1loser = sf1w ? (sf1t1 === sf1w ? sf1t2 : sf1t1) : "Other";
        const sf2loser = sf2w ? (sf2t1 === sf2w ? sf2t2 : sf2t1) : "Other";
        const finalIncomplete = !mw(103) || !mw(104);
        return (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <MatchCard match={{ id: 103, date: "Jul 18", city: "Miami" }} t1={sf1loser} t2={sf2loser} winner={mw(103)} onPick={(w) => setKnockoutWinners((p) => ({ ...p, 103: w }))} highlight={matchHasMain(sf1loser, sf2loser)} mainTeam={mainTeam} label="Match 103 · Third Place" isBronze />
            <MatchCard match={{ id: 104, date: "Jul 19", city: "New York/NJ" }} t1={sf1w||"Other"} t2={sf2w||"Other"} winner={mw(104)} onPick={(w) => sw(104, w)} highlight={matchHasMain(sf1w||"Other", sf2w||"Other")} mainTeam={mainTeam} label="Match 104 · THE FINAL" isFinal />
            <div style={{ display: "flex", gap: 10, marginTop: 6 }}>
              <button onClick={() => setActiveRound("sf")} style={{ flex: "0 0 auto", padding: "11px 20px", background: "transparent", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 10, color: "#94a8bf", fontWeight: 700, fontSize: 13, cursor: "pointer", transition: "all 0.15s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.35)"; e.currentTarget.style.color = "#ccc"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; e.currentTarget.style.color = "#888"; }}
              >
                ← Semifinals
              </button>
              <div style={{ flex: 1, textAlign: "center" }}>
                <button style={subtleBtn} onMouseEnter={subtleBtnHover} onMouseLeave={subtleBtnLeave} onClick={autoFinal}>Auto-Confirm 3rd Place / Final</button>
              </div>
            </div>
          </div>
        );
      })()}
      </>}
    </div>
  );
}

// ─── BUILD PATH SUMMARY (pure function, no JSX) ───────────────────────────────
// Generates the shareable text summary of the simulated tournament path.
// Accepts the same simulation state used by SummaryPhase.
function buildPathSummary({ mainTeam, teamFinish, teamGroup, allGroupStandings, knockoutWinners }) {
  if (!mainTeam) return null;

  const mw  = (id) => knockoutWinners[id] || null;
  const gs  = (g, pos) => allGroupStandings[g]?.[pos] || null;

  // Group finish label — plain text, no emoji
  const finishLabel =
    teamFinish === "winner"     ? "Group Winner" :
    teamFinish === "runner"     ? "Group Runner-up" :
    teamFinish === "third"      ? "3rd Place (best 3rd)" :
    teamFinish === "eliminated" ? "Eliminated in Group Stage" :
    "Group stage not set";

  // Resolve R32 opponent from group standings
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
        return { id: m.id, opp: t1 === mainTeam ? (t2 || "TBD") : (t1 || "TBD") };
      }
    }
    return null;
  })();

  const findKO = (arr) => {
    for (const m of arr) {
      const t1 = mw(m.m1) || null, t2 = mw(m.m2) || null;
      if (t1 === mainTeam || t2 === mainTeam)
        return { id: m.id, opp: t1 === mainTeam ? (t2 || "TBD") : (t1 || "TBD") };
    }
    return null;
  };

  const r32w = mainR32match ? mw(mainR32match.id) : null;
  const r16m = r32w === mainTeam ? findKO(R16) : null;
  const r16w = r16m ? mw(r16m.id) : null;
  const qfm  = r16w === mainTeam ? findKO(QF)  : null;
  const qfw  = qfm  ? mw(qfm.id)  : null;
  const sfm  = qfw  === mainTeam ? findKO(SF)  : null;
  const sfw  = sfm  ? mw(sfm.id)  : null;
  const sf1w = mw(101), sf2w = mw(102);
  // Derive SF losers for bronze match reference
  const sf1t1 = knockoutWinners[SF[0].m1] || null, sf1t2 = knockoutWinners[SF[0].m2] || null;
  const sf2t1 = knockoutWinners[SF[1].m1] || null, sf2t2 = knockoutWinners[SF[1].m2] || null;
  const sf1loser = sf1w && sf1t1 && sf1t2 ? (sf1t1 === sf1w ? sf1t2 : sf1t1) : null;
  const sf2loser = sf2w && sf2t1 && sf2t2 ? (sf2t1 === sf2w ? sf2t2 : sf2t1) : null;
  const finalOpp = (sf1w === mainTeam ? sf2w : sf1w) || "TBD";
  const finalW   = mw(104);

  // Build lines for each knockout round played
  const lines = [];

  if (mainR32match) {
    const won = r32w === mainTeam;
    const result = r32w ? (won ? "Won" : `Lost to ${r32w}`) : "Not played";
    lines.push(`Round of 32: ${mainTeam} vs ${mainR32match.opp} - ${result}`);
  }
  if (r32w === mainTeam && r16m) {
    const won = r16w === mainTeam;
    const result = r16w ? (won ? "Won" : `Lost to ${r16w}`) : "Not played";
    lines.push(`Round of 16: ${mainTeam} vs ${r16m.opp} - ${result}`);
  }
  if (r16w === mainTeam && qfm) {
    const won = qfw === mainTeam;
    const result = qfw ? (won ? "Won" : `Lost to ${qfw}`) : "Not played";
    lines.push(`Quarterfinal: ${mainTeam} vs ${qfm.opp} - ${result}`);
  }
  if (qfw === mainTeam && sfm) {
    const won = sfw === mainTeam;
    const result = sfw ? (won ? "Won" : `Lost to ${sfw}`) : "Not played";
    lines.push(`Semifinal: ${mainTeam} vs ${sfm.opp} - ${result}`);
  }
  if (sfw === mainTeam) {
    const won = finalW === mainTeam;
    const result = finalW ? (won ? "CHAMPIONS!" : `Runner-up (lost to ${finalW})`) : "Not played";
    lines.push(`Final: ${mainTeam} vs ${finalOpp} - ${result}`);
  } else if (sfw && sfw !== mainTeam) {
    // reached third place — opponent is the loser of the other semifinal
    const bronze = mw(103);
    const won = bronze === mainTeam;
    // mainTeam lost their SF; find which SF they were in to get the other SF's loser
    const mainInSF1 = sfm?.id === 101;
    const bronzeOpp = (mainInSF1 ? sf2loser : sf1loser) || "TBD";
    const result = bronze ? (won ? "Won 3rd Place!" : `4th place (lost to ${bronze})`) : "Not played";
    lines.push(`3rd Place: ${mainTeam} vs ${bronzeOpp} - ${result}`);
  }

  // Final result headline — plain text only
  const headline =
    finalW === mainTeam             ? `${mainTeam} are 2026 World Cup CHAMPIONS!` :
    finalW && sfw === mainTeam      ? `${mainTeam} finish as runners-up` :
    mw(103) === mainTeam            ? `${mainTeam} win 3rd place` :
    sfw && sfw !== mainTeam         ? `${mainTeam} eliminated in the Semis` :
    qfw && qfw !== mainTeam         ? `${mainTeam} eliminated in the Quarters` :
    r16w && r16w !== mainTeam       ? `${mainTeam} eliminated in the Round of 16` :
    r32w && r32w !== mainTeam       ? `${mainTeam} eliminated in the Round of 32` :
    teamFinish === "eliminated"     ? `${mainTeam} eliminated in the Group Stage` :
    `${mainTeam}'s path is in progress`;

  const url = typeof window !== "undefined" ? window.location.href : "";

  return [
    `${mainTeam}'s - 2026 World Cup Path!`,
    ``,
    `Group ${teamGroup}: ${finishLabel}`,
    ``,
    ...lines,
    ``,
    headline,
    ``,
    `Try your own path: ${url}`,
  ].join("\n");
}

// ─── SHARE BUTTON ──────────────────────────────────────────────────────────────
// Now accepts full simulation state so it can include the path summary in shares.
function ShareButton({ mainTeam, teamFinish, teamGroup, allGroupStandings, knockoutWinners }) {
  const [showMenu,   setShowMenu]   = useState(false);
  const [copied,     setCopied]     = useState(false);

  // Build the rich summary; fall back to a generic line if nothing is simulated yet
  const summary = (mainTeam && teamGroup)
    ? buildPathSummary({ mainTeam, teamFinish, teamGroup, allGroupStandings, knockoutWinners })
    : null;

  const shareText = summary
    ?? `🏆 Simulate the 2026 FIFA World Cup! Try it yourself.`;

  const url = typeof window !== "undefined" ? window.location.href : "";

  // For platforms that only accept a URL (Facebook), we keep the URL-only variant
  const shareOpts = [
    { name: "WhatsApp",    icon: "💬", url: `https://wa.me/?text=${encodeURIComponent(shareText)}` },
    { name: "X / Twitter", icon: "🐦", url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}` },
    { name: "Facebook",    icon: "👥", url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}` },
    { name: "iMessage",    icon: "💙", url: `sms:&body=${encodeURIComponent(shareText)}` },
    { name: "Copy Path",   icon: "📋", url: null },  // copies full summary + link
  ];

  const doShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${mainTeam ? mainTeam + " -" : ""} 2026 World Cup Simulator`,
          text:  shareText,
          url,
        });
        return;
      } catch {}
    }
    setShowMenu((v) => !v);
  };

  const handle = async (opt) => {
    if (opt.name === "Copy Path") {
      try {
        await navigator.clipboard.writeText(shareText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2200);
      } catch {}
    } else if (opt.url) {
      window.open(opt.url, "_blank");
    }
    setShowMenu(false);
  };

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <button
        onClick={doShare}
        style={{ display: "flex", alignItems: "center", gap: 10, padding: "13px 28px", background: "linear-gradient(135deg,#FFD700,#FFA500)", border: "none", borderRadius: 12, color: "#000", fontWeight: 900, fontSize: 15, cursor: "pointer", transition: "all 0.15s" }}
        onMouseEnter={e => { e.currentTarget.style.opacity = "0.88"; e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(255,215,0,0.35)"; }}
        onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
      >
        📤 Share My Simulation
      </button>

      {/* Copied confirmation toast */}
      {copied && (
        <div style={{ position: "absolute", bottom: "calc(100% + 10px)", left: "50%", transform: "translateX(-50%)", background: "#4ade80", color: "#000", fontWeight: 800, fontSize: 13, padding: "8px 20px", borderRadius: 10, whiteSpace: "nowrap", zIndex: 2100 }}>
          ✅ Path copied to clipboard!
        </div>
      )}

      {showMenu && (
        <div style={{ position: "absolute", bottom: "calc(100% + 10px)", left: "50%", transform: "translateX(-50%)", background: "#0d1520", border: "2px solid rgba(255,215,0,0.3)", borderRadius: 14, zIndex: 2000, padding: 12, boxShadow: "0 -12px 40px rgba(0,0,0,0.8)", minWidth: 230 }}>
          <div style={{ fontSize: 11, color: "#FFD700", fontWeight: 800, textTransform: "uppercase", letterSpacing: 2, marginBottom: 10, textAlign: "center" }}>Share Via</div>
          {shareOpts.map((opt) => (
            <button key={opt.name} onClick={() => handle(opt)} style={{ display: "flex", alignItems: "center", gap: 12, width: "100%", padding: "10px 12px", background: "transparent", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 9, color: "#ddd", cursor: "pointer", fontSize: 14, marginBottom: 6, transition: "all 0.15s" }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)"; e.currentTarget.style.color = "#fff"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "#ddd"; }}
            >
              <span style={{ fontSize: 20 }}>{opt.icon}</span>
              <span style={{ fontWeight: 600 }}>{opt.name}</span>
            </button>
          ))}
          <button onClick={() => setShowMenu(false)} style={{ width: "100%", padding: "8px 0", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "#8fa8c0", cursor: "pointer", fontSize: 13, marginTop: 4 }}>Cancel</button>
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

  // Per-team group stage fixtures — exact dates & cities from official 2026 WC schedule
  // Each entry: [{ opp, date, city }, { opp, date, city }, { opp, date, city }] (matchday order)
  const GROUP_FIXTURES = {
    // GROUP A
    "Mexico":                                        [{ opp: "South Africa",                                           date: "Jun 11", city: "Mexico City"   }, { opp: "Korea Republic",                                       date: "Jun 18", city: "Guadalajara"  }, { opp: "Czechia/Denmark/N.Macedonia/Ireland",                  date: "Jun 24", city: "Mexico City"   }],
    "South Africa":                                  [{ opp: "Mexico",                                                 date: "Jun 11", city: "Mexico City"   }, { opp: "Czechia/Denmark/N.Macedonia/Ireland",                  date: "Jun 18", city: "Atlanta"      }, { opp: "Korea Republic",                                       date: "Jun 24", city: "Monterrey"    }],
    "Korea Republic":                                [{ opp: "Czechia/Denmark/N.Macedonia/Ireland",                   date: "Jun 11", city: "Guadalajara"  }, { opp: "Mexico",                                               date: "Jun 18", city: "Guadalajara"  }, { opp: "South Africa",                                         date: "Jun 24", city: "Monterrey"    }],
    "Czechia/Denmark/N.Macedonia/Ireland":           [{ opp: "Korea Republic",                                        date: "Jun 11", city: "Guadalajara"  }, { opp: "South Africa",                                         date: "Jun 18", city: "Atlanta"      }, { opp: "Mexico",                                               date: "Jun 24", city: "Mexico City"   }],
    // GROUP B
    "Canada":                                        [{ opp: "Bosnia/Italy/N.Ireland/Wales",                          date: "Jun 12", city: "Toronto"      }, { opp: "Qatar",                                                date: "Jun 18", city: "Vancouver"    }, { opp: "Switzerland",                                          date: "Jun 24", city: "Vancouver"    }],
    "Qatar":                                         [{ opp: "Switzerland",                                           date: "Jun 13", city: "San Francisco"}, { opp: "Canada",                                               date: "Jun 18", city: "Vancouver"    }, { opp: "Bosnia/Italy/N.Ireland/Wales",                         date: "Jun 24", city: "Seattle"      }],
    "Switzerland":                                   [{ opp: "Qatar",                                                 date: "Jun 13", city: "San Francisco"}, { opp: "Bosnia/Italy/N.Ireland/Wales",                         date: "Jun 18", city: "Los Angeles"  }, { opp: "Canada",                                               date: "Jun 24", city: "Vancouver"    }],
    "Bosnia/Italy/N.Ireland/Wales":                  [{ opp: "Canada",                                                date: "Jun 12", city: "Toronto"      }, { opp: "Switzerland",                                          date: "Jun 18", city: "Los Angeles"  }, { opp: "Qatar",                                                date: "Jun 24", city: "Seattle"      }],
    // GROUP C
    "Brazil":                                        [{ opp: "Morocco",                                               date: "Jun 13", city: "New York/NJ"  }, { opp: "Haiti",                                                date: "Jun 19", city: "Philadelphia" }, { opp: "Scotland",                                             date: "Jun 24", city: "Miami"        }],
    "Morocco":                                       [{ opp: "Brazil",                                                date: "Jun 13", city: "New York/NJ"  }, { opp: "Scotland",                                             date: "Jun 19", city: "Boston"       }, { opp: "Haiti",                                                date: "Jun 24", city: "Atlanta"      }],
    "Haiti":                                         [{ opp: "Scotland",                                              date: "Jun 13", city: "Boston"       }, { opp: "Brazil",                                               date: "Jun 19", city: "Philadelphia" }, { opp: "Morocco",                                              date: "Jun 24", city: "Atlanta"      }],
    "Scotland":                                      [{ opp: "Haiti",                                                 date: "Jun 13", city: "Boston"       }, { opp: "Morocco",                                              date: "Jun 19", city: "Boston"       }, { opp: "Brazil",                                               date: "Jun 24", city: "Miami"        }],
    // GROUP D
    "USA":                                           [{ opp: "Paraguay",                                              date: "Jun 12", city: "Los Angeles"  }, { opp: "Australia",                                            date: "Jun 19", city: "Seattle"      }, { opp: "Kosovo/Romania/Slovakia/Türkiye",                      date: "Jun 25", city: "Los Angeles"  }],
    "Paraguay":                                      [{ opp: "USA",                                                   date: "Jun 12", city: "Los Angeles"  }, { opp: "Kosovo/Romania/Slovakia/Türkiye",                      date: "Jun 19", city: "San Francisco"}, { opp: "Australia",                                            date: "Jun 25", city: "San Francisco"}],
    "Australia":                                     [{ opp: "Kosovo/Romania/Slovakia/Türkiye",                       date: "Jun 13", city: "Vancouver"    }, { opp: "USA",                                                  date: "Jun 19", city: "Seattle"      }, { opp: "Paraguay",                                             date: "Jun 25", city: "San Francisco"}],
    "Kosovo/Romania/Slovakia/Türkiye":               [{ opp: "Australia",                                             date: "Jun 13", city: "Vancouver"    }, { opp: "Paraguay",                                             date: "Jun 19", city: "San Francisco"}, { opp: "USA",                                                  date: "Jun 25", city: "Los Angeles"  }],
    // GROUP E
    "Germany":                                       [{ opp: "Curaçao",                                               date: "Jun 14", city: "Houston"      }, { opp: "Côte d'Ivoire",                                       date: "Jun 20", city: "Toronto"      }, { opp: "Ecuador",                                              date: "Jun 25", city: "New York/NJ"  }],
    "Ecuador":                                       [{ opp: "Côte d'Ivoire",                                         date: "Jun 14", city: "Philadelphia" }, { opp: "Curaçao",                                             date: "Jun 20", city: "Kansas City"  }, { opp: "Germany",                                              date: "Jun 25", city: "New York/NJ"  }],
    "Côte d'Ivoire":                                 [{ opp: "Ecuador",                                               date: "Jun 14", city: "Philadelphia" }, { opp: "Germany",                                             date: "Jun 20", city: "Toronto"      }, { opp: "Curaçao",                                              date: "Jun 25", city: "Philadelphia" }],
    "Curaçao":                                       [{ opp: "Germany",                                               date: "Jun 14", city: "Houston"      }, { opp: "Ecuador",                                             date: "Jun 20", city: "Kansas City"  }, { opp: "Côte d'Ivoire",                                       date: "Jun 25", city: "Philadelphia" }],
    // GROUP F
    "Netherlands":                                   [{ opp: "Japan",                                                 date: "Jun 14", city: "Dallas"       }, { opp: "Albania/Poland/Sweden/Ukraine",                        date: "Jun 20", city: "Houston"      }, { opp: "Tunisia",                                              date: "Jun 25", city: "Kansas City"  }],
    "Japan":                                         [{ opp: "Netherlands",                                           date: "Jun 14", city: "Dallas"       }, { opp: "Tunisia",                                             date: "Jun 20", city: "Monterrey"    }, { opp: "Albania/Poland/Sweden/Ukraine",                        date: "Jun 25", city: "Dallas"       }],
    "Tunisia":                                       [{ opp: "Albania/Poland/Sweden/Ukraine",                         date: "Jun 14", city: "Monterrey"    }, { opp: "Japan",                                               date: "Jun 20", city: "Monterrey"    }, { opp: "Netherlands",                                          date: "Jun 25", city: "Kansas City"  }],
    "Albania/Poland/Sweden/Ukraine":                 [{ opp: "Tunisia",                                               date: "Jun 14", city: "Monterrey"    }, { opp: "Netherlands",                                         date: "Jun 20", city: "Houston"      }, { opp: "Japan",                                                date: "Jun 25", city: "Dallas"       }],
    // GROUP G
    "Belgium":                                       [{ opp: "Egypt",                                                 date: "Jun 15", city: "Seattle"      }, { opp: "IR Iran",                                             date: "Jun 21", city: "Los Angeles"  }, { opp: "New Zealand",                                          date: "Jun 26", city: "Vancouver"    }],
    "Egypt":                                         [{ opp: "Belgium",                                               date: "Jun 15", city: "Seattle"      }, { opp: "New Zealand",                                         date: "Jun 21", city: "Vancouver"    }, { opp: "IR Iran",                                              date: "Jun 26", city: "Seattle"      }],
    "IR Iran":                                       [{ opp: "New Zealand",                                           date: "Jun 15", city: "Los Angeles"  }, { opp: "Belgium",                                             date: "Jun 21", city: "Los Angeles"  }, { opp: "Egypt",                                                date: "Jun 26", city: "Seattle"      }],
    "New Zealand":                                   [{ opp: "IR Iran",                                               date: "Jun 15", city: "Los Angeles"  }, { opp: "Egypt",                                               date: "Jun 21", city: "Vancouver"    }, { opp: "Belgium",                                              date: "Jun 26", city: "Vancouver"    }],
    // GROUP H
    "Spain":                                         [{ opp: "Cabo Verde",                                            date: "Jun 15", city: "Atlanta"      }, { opp: "Saudi Arabia",                                         date: "Jun 21", city: "Atlanta"      }, { opp: "Uruguay",                                              date: "Jun 26", city: "Guadalajara"  }],
    "Uruguay":                                       [{ opp: "Saudi Arabia",                                          date: "Jun 15", city: "Miami"        }, { opp: "Cabo Verde",                                           date: "Jun 21", city: "Miami"        }, { opp: "Spain",                                                date: "Jun 26", city: "Guadalajara"  }],
    "Saudi Arabia":                                  [{ opp: "Uruguay",                                               date: "Jun 15", city: "Miami"        }, { opp: "Spain",                                               date: "Jun 21", city: "Atlanta"      }, { opp: "Cabo Verde",                                           date: "Jun 26", city: "Houston"      }],
    "Cabo Verde":                                    [{ opp: "Spain",                                                 date: "Jun 15", city: "Atlanta"      }, { opp: "Uruguay",                                             date: "Jun 21", city: "Miami"        }, { opp: "Saudi Arabia",                                         date: "Jun 26", city: "Houston"      }],
    // GROUP I
    "France":                                        [{ opp: "Senegal",                                               date: "Jun 16", city: "New York/NJ"  }, { opp: "Bolivia/Iraq/Suriname",                                date: "Jun 22", city: "Philadelphia" }, { opp: "Norway",                                               date: "Jun 26", city: "Boston"       }],
    "Norway":                                        [{ opp: "Bolivia/Iraq/Suriname",                                  date: "Jun 16", city: "Boston"       }, { opp: "Senegal",                                             date: "Jun 22", city: "New York/NJ"  }, { opp: "France",                                               date: "Jun 26", city: "Boston"       }],
    "Senegal":                                       [{ opp: "France",                                                date: "Jun 16", city: "New York/NJ"  }, { opp: "Norway",                                              date: "Jun 22", city: "New York/NJ"  }, { opp: "Bolivia/Iraq/Suriname",                                date: "Jun 26", city: "Toronto"      }],
    "Bolivia/Iraq/Suriname":                         [{ opp: "Norway",                                                date: "Jun 16", city: "Boston"       }, { opp: "France",                                              date: "Jun 22", city: "Philadelphia" }, { opp: "Senegal",                                              date: "Jun 26", city: "Toronto"      }],
    // GROUP J
    "Argentina":                                     [{ opp: "Algeria",                                               date: "Jun 16", city: "Kansas City"  }, { opp: "Austria",                                             date: "Jun 22", city: "Dallas"       }, { opp: "Jordan",                                               date: "Jun 26", city: "Dallas"       }],
    "Algeria":                                       [{ opp: "Argentina",                                             date: "Jun 16", city: "Kansas City"  }, { opp: "Jordan",                                              date: "Jun 22", city: "San Francisco"}, { opp: "Austria",                                              date: "Jun 26", city: "Kansas City"  }],
    "Austria":                                       [{ opp: "Jordan",                                                date: "Jun 16", city: "San Francisco"}, { opp: "Argentina",                                           date: "Jun 22", city: "Dallas"       }, { opp: "Algeria",                                              date: "Jun 26", city: "Kansas City"  }],
    "Jordan":                                        [{ opp: "Austria",                                               date: "Jun 16", city: "San Francisco"}, { opp: "Algeria",                                             date: "Jun 22", city: "San Francisco"}, { opp: "Argentina",                                            date: "Jun 26", city: "Dallas"       }],
    // GROUP K
    "Portugal":                                      [{ opp: "Congo DR",                                              date: "Jun 17", city: "Houston"      }, { opp: "Uzbekistan",                                          date: "Jun 23", city: "Houston"      }, { opp: "Colombia",                                             date: "Jun 27", city: "Miami"        }],
    "Colombia":                                      [{ opp: "Uzbekistan",                                            date: "Jun 17", city: "Mexico City"  }, { opp: "Congo DR",                                            date: "Jun 23", city: "Guadalajara"  }, { opp: "Portugal",                                             date: "Jun 27", city: "Miami"        }],
    "Uzbekistan":                                    [{ opp: "Colombia",                                              date: "Jun 17", city: "Mexico City"  }, { opp: "Portugal",                                            date: "Jun 23", city: "Houston"      }, { opp: "Congo DR",                                             date: "Jun 27", city: "Atlanta"      }],
    "Congo DR":                                      [{ opp: "Portugal",                                              date: "Jun 17", city: "Houston"      }, { opp: "Colombia",                                            date: "Jun 23", city: "Guadalajara"  }, { opp: "Uzbekistan",                                           date: "Jun 27", city: "Atlanta"      }],
    // GROUP L
    "England":                                       [{ opp: "Croatia",                                               date: "Jun 17", city: "Dallas"       }, { opp: "Ghana",                                               date: "Jun 23", city: "Boston"       }, { opp: "Panama",                                               date: "Jun 27", city: "New York/NJ"  }],
    "Croatia":                                       [{ opp: "England",                                               date: "Jun 17", city: "Dallas"       }, { opp: "Panama",                                             date: "Jun 23", city: "Toronto"      }, { opp: "Ghana",                                                date: "Jun 27", city: "Philadelphia" }],
    "Ghana":                                         [{ opp: "Panama",                                                date: "Jun 17", city: "Toronto"      }, { opp: "England",                                             date: "Jun 23", city: "Boston"       }, { opp: "Croatia",                                              date: "Jun 27", city: "Philadelphia" }],
    "Panama":                                        [{ opp: "Ghana",                                                 date: "Jun 17", city: "Toronto"      }, { opp: "Croatia",                                             date: "Jun 23", city: "Toronto"      }, { opp: "England",                                              date: "Jun 27", city: "New York/NJ"  }],
  };

  // Look up this team's fixtures; fall back to generic if team name doesn't match exactly
  const teamFixtures = GROUP_FIXTURES[mainTeam] || [];
  const groupOpps = teamGroup ? GROUPS[teamGroup].teams.filter((t) => t !== mainTeam) : [];

  // Match each opponent to its fixture entry; fall back to "Various" if no match found
  const groupMatches = groupOpps.map((opp) => {
    const fixture = teamFixtures.find((f) => f.opp === opp);
    return {
      round: "Group Stage",
      opp,
      date: fixture?.date || "Jun 2026",
      city: fixture?.city || "Various",
      w: null,
    };
  });

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
          : <p style={{ color: "#7a95ae", fontSize: 13 }}>Complete the knockout rounds to see the full journey.</p>
        }
      </div>

      <p style={{ textAlign: "center", color: "#444", fontSize: 12, marginBottom: 16 }}>👆 Tap any match to get tickets</p>

      <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
        {matches.map((m, i) => {
          const won  = m.w === mainTeam;
          const lost = m.w && !won;
          const open = openIdx === i;
          return (
            <div key={i} onClick={() => setOpenIdx(open ? null : i)} style={{ background: open ? "rgba(255,215,0,0.07)" : "rgba(255,255,255,0.055)", border: lost ? "1px solid rgba(248,113,113,0.35)" : won ? "1px solid rgba(74,222,128,0.35)" : "1px solid rgba(255,255,255,0.13)", borderRadius: 13, padding: "16px 18px", cursor: "pointer", transition: "all 0.2s" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
                <div>
                  <div style={{ fontSize: 10, color: "#7a95ae", textTransform: "uppercase", letterSpacing: 2, marginBottom: 4 }}>{m.round}</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "#fff", display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 4 }}>
                    <TeamLabel name={mainTeam} size={15} />
                    <span style={{ color: "#6a85a0" }}>vs</span>
                    <TeamLabel name={m.opp} size={15} />
                  </div>
                  <div style={{ fontSize: 11, color: "#8fa8c0" }}>📅 {m.date} · 📍 {m.city}</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  {m.w
                    ? <span style={{ padding: "5px 14px", borderRadius: 16, background: won ? "rgba(74,222,128,0.13)" : "rgba(248,113,113,0.13)", color: won ? "#4ade80" : "#f87171", fontSize: 12, fontWeight: 700 }}>{won ? "✅ Won" : "❌ Lost"}</span>
                    : <span style={{ color: "#6a85a0", fontSize: 12 }}>Tap for 🎫</span>
                  }
                  <span style={{ color: open ? "#FFD700" : "#2a2a3a", fontSize: 16 }}>{open ? "▲" : "▼"}</span>
                </div>
              </div>
              {open && (() => {
                const q = encodeURIComponent(`FIFA World Cup 2026 ${m.city}`);
                return (
                  <div onClick={e => e.stopPropagation()} style={{ marginTop: 16, borderTop: "1px solid rgba(255,215,0,0.15)", paddingTop: 16 }}>
                    <div style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,215,0,0.15)", borderRadius: 12, padding: "14px 16px" }}>
                      <div style={{ fontSize: 11, color: "#FFD700", fontWeight: 800, textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 }}>🎫 Get Tickets</div>
                      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                        <a href={`https://www.stubhub.com/search?q=${q}`} target="_blank" rel="noopener noreferrer"
                          style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "8px 16px", background: "#00d4aa", color: "#000", fontWeight: 800, fontSize: 12, borderRadius: 9, textDecoration: "none", transition: "all 0.15s" }}
                          onMouseEnter={e => { e.currentTarget.style.background = "#00f0c0"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                          onMouseLeave={e => { e.currentTarget.style.background = "#00d4aa"; e.currentTarget.style.transform = "translateY(0)"; }}
                        >🎫 StubHub</a>
                        <a href={`https://www.vividseats.com/search?q=${q}`} target="_blank" rel="noopener noreferrer"
                          style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "8px 16px", background: "rgba(168,85,247,0.15)", color: "#c084fc", fontWeight: 800, fontSize: 12, borderRadius: 9, textDecoration: "none", transition: "all 0.15s", border: "1px solid rgba(168,85,247,0.4)" }}
                          onMouseEnter={e => { e.currentTarget.style.background = "rgba(168,85,247,0.28)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                          onMouseLeave={e => { e.currentTarget.style.background = "rgba(168,85,247,0.15)"; e.currentTarget.style.transform = "translateY(0)"; }}
                        >🎟️ Vivid Seats</a>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: 32, textAlign: "center" }}>
        <p style={{ color: "#7a95ae", fontSize: 13, marginBottom: 16 }}>Enjoyed the simulation? Share it!</p>
        <ShareButton
          mainTeam={mainTeam}
          teamFinish={teamFinish}
          teamGroup={teamGroup}
          allGroupStandings={allGroupStandings}
          knockoutWinners={knockoutWinners}
        />
      </div>
    </div>
  );
}

// ─── CELEBRATION OVERLAY ──────────────────────────────────────────────────────
function CelebrationOverlay({ champion, onDismiss, fadingOut }) {
  if (!champion) return null;
  return (
    <div
      onClick={onDismiss}
      style={{
        position: "fixed", inset: 0, zIndex: 9998,
        display: "flex", alignItems: "center", justifyContent: "center",
        background: "rgba(0,0,0,0.78)", backdropFilter: "blur(4px)",
        opacity: fadingOut ? 0 : 1,
        transition: fadingOut ? "opacity 0.6s ease-out" : "opacity 0.25s ease-in",
        pointerEvents: fadingOut ? "none" : "auto",
      }}
    >
      <style>{`
        @keyframes popIn {
          from { transform: scale(0.5); opacity: 0; }
          to   { transform: scale(1);   opacity: 1; }
        }
        @keyframes floatUp {
          0%   { transform: translateY(0px); }
          50%  { transform: translateY(-8px); }
          100% { transform: translateY(0px); }
        }
        .pop-in  { animation: popIn 0.4s cubic-bezier(0.34,1.56,0.64,1); }
        .float   { animation: floatUp 2.2s ease-in-out infinite; }
      `}</style>
      <div
        className="pop-in"
        onClick={(e) => e.stopPropagation()}
        style={{
          textAlign: "center", padding: "40px 32px",
          background: "linear-gradient(135deg,#0a1628,#001840)",
          border: "3px solid #FFD700", borderRadius: 24, maxWidth: 440,
          boxShadow: "0 0 80px rgba(255,215,0,0.45)",
          opacity: fadingOut ? 0 : 1,
          transform: fadingOut ? "scale(0.92) translateY(-12px)" : "scale(1)",
          transition: fadingOut ? "opacity 0.5s ease-out, transform 0.5s ease-out" : "none",
        }}
      >
        <div className="float" style={{ fontSize: 72, marginBottom: 16 }}>🏆</div>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 14 }}>
          <Flag name={champion} size={52} />
        </div>
        <h2 style={{ fontSize: "clamp(1.4rem,4vw,2rem)", fontWeight: 900, color: "#FFD700", margin: "0 0 10px", textShadow: "0 2px 20px rgba(255,215,0,0.6)" }}>{champion}</h2>
        <p style={{ color: "#4ade80", fontSize: 18, fontWeight: 700, margin: "0 0 6px" }}>wins the 2026 World Cup!</p>
        <p style={{ color: "#aaa", fontSize: 13, margin: "0 0 24px" }}>MetLife Stadium · East Rutherford, NJ · July 19, 2026</p>
        <button onClick={onDismiss} style={{ padding: "12px 32px", background: "#FFD700", color: "#000", border: "none", borderRadius: 24, fontWeight: 900, fontSize: 15, cursor: "pointer" }}>
          🎉 View Summary
        </button>
      </div>
    </div>
  );
}

// ─── ELO RATINGS (eloratings.net, March 2026) ─────────────────────────────────
const ELO = {
  "Spain": 2172, "Argentina": 2113, "France": 2062, "England": 2042,
  "Colombia": 1998, "Brazil": 1978, "Portugal": 1976, "Netherlands": 1959,
  "Ecuador": 1933, "Croatia": 1932, "Norway": 1922, "Germany": 1910,
  "Switzerland": 1897, "Uruguay": 1890, "Turkey": 1880, "Japan": 1878,
  "Senegal": 1869, "Denmark": 1864, "Italy": 1859, "Mexico": 1857,
  "Belgium": 1849, "Paraguay": 1833, "Austria": 1818, "Morocco": 1806,
  "Canada": 1805, "Ukraine": 1802, "Scotland": 1790, "Korea Republic": 1784,
  "USA": 1747, "Panama": 1733, "Algeria": 1728, "Uzbekistan": 1728,
  "Egypt": 1659, "Bolivia/Iraq/Suriname": 1582, "Congo DR": 1639,
  "Saudi Arabia": 1592, "Cabo Verde": 1561, "Ghana": 1509, "Haiti": 1542,
  "South Africa": 1528, "Qatar": 1425, "Jordan": 1689, "New Zealand": 1585,
  "Australia": 1774, "Côte d'Ivoire": 1637, "Curaçao": 1466,
  "Kosovo/Romania/Slovakia/Türkiye": 1687, "Czechia/Denmark/N.Macedonia/Ireland": 1731,
  "Bosnia/Italy/N.Ireland/Wales": 1859, "Albania/Poland/Sweden/Ukraine": 1735,
};

// Elo win probability: P(A beats B)
const eloWinP = (teamA, teamB) => {
  const ra = ELO[teamA] || 1500, rb = ELO[teamB] || 1500;
  return 1 / (1 + Math.pow(10, (rb - ra) / 400));
};

// Compute group stage finish probabilities via round-robin enumeration
// Returns { winner: {team: prob}, runner: {team: prob}, third: {team: prob} }
const computeGroupProbs = (groupKey) => {
  const teams = GROUPS[groupKey]?.teams;
  if (!teams || teams.length < 3) return null;
  const [t1, t2, t3, t4] = teams;
  const matchups = t4
    ? [[t1,t2],[t1,t3],[t1,t4],[t2,t3],[t2,t4],[t3,t4]]
    : [[t1,t2],[t1,t3],[t2,t3]];

  // enumerate all 2^n outcomes (win/loss per match, no draws for simplicity)
  const n = matchups.length;
  const pts = {}; teams.forEach(t => pts[t] = 0);
  const winnerProbs = {}, runnerProbs = {}, thirdProbs = {};
  teams.forEach(t => { winnerProbs[t]=0; runnerProbs[t]=0; thirdProbs[t]=0; });

  for (let mask = 0; mask < Math.pow(2, n); mask++) {
    const points = {}; teams.forEach(t => points[t] = 0);
    let prob = 1;
    matchups.forEach(([a, b], i) => {
      const aWins = (mask >> i) & 1;
      const p = eloWinP(a, b);
      if (aWins) { points[a] += 3; prob *= p; }
      else        { points[b] += 3; prob *= (1 - p); }
    });
    // sort by points desc, break ties by Elo desc
    const sorted = [...teams].sort((a,b) =>
      points[b] !== points[a] ? points[b]-points[a] : (ELO[b]||1500)-(ELO[a]||1500)
    );
    winnerProbs[sorted[0]] += prob;
    runnerProbs[sorted[1]] += prob;
    if (sorted[2]) thirdProbs[sorted[2]] += prob;
  }
  return { winner: winnerProbs, runner: runnerProbs, third: thirdProbs };
};

// Cache group probs (computed once)
const GROUP_PROBS = {};
Object.keys(GROUPS).forEach(g => { GROUP_PROBS[g] = computeGroupProbs(g); });

// Get slot distribution for an R32 slot descriptor
const getSlotDist = (slot) => {
  if (slot.type === "winner") return GROUP_PROBS[slot.g]?.winner || {};
  if (slot.type === "runner") return GROUP_PROBS[slot.g]?.runner || {};
  if (slot.type === "third") {
    // merge third-place distributions across the candidate groups
    const merged = {};
    (slot.gs || []).forEach(g => {
      const tp = GROUP_PROBS[g]?.third || {};
      Object.entries(tp).forEach(([team, p]) => {
        merged[team] = (merged[team] || 0) + p / (slot.gs.length);
      });
    });
    return merged;
  }
  return {};
};

// Compute top N most likely matchups for an R32 match
const getTopMatchups = (r32match, topN = 4) => {
  const dist1 = getSlotDist(r32match.t1);
  const dist2 = getSlotDist(r32match.t2);
  const matchups = [];
  Object.entries(dist1).forEach(([teamA, pA]) => {
    Object.entries(dist2).forEach(([teamB, pB]) => {
      if (teamA === teamB) return;
      const pMatch = pA * pB;
      if (pMatch < 0.001) return;
      matchups.push({ teamA, teamB, prob: pMatch });
    });
  });
  return matchups.sort((a,b) => b.prob - a.prob).slice(0, topN);
};

// ─── KNOCKOUT VENUE DATA ───────────────────────────────────────────────────────
const KNOCKOUT_VENUES = [
  // ── ROUND OF 32 ──
  { id: "r32-73",  round: "Round of 32", date: "Sat Jun 28", time: "3pm ET",  city: "Los Angeles, CA",      stadium: "SoFi Stadium",              r32id: 73  },
  { id: "r32-74",  round: "Round of 32", date: "Sun Jun 29", time: "12pm ET", city: "Boston, MA",           stadium: "Gillette Stadium",          r32id: 74  },
  { id: "r32-75",  round: "Round of 32", date: "Sun Jun 29", time: "3pm ET",  city: "Monterrey, Mexico",    stadium: "Estadio BBVA",              r32id: 75  },
  { id: "r32-76",  round: "Round of 32", date: "Sun Jun 29", time: "6pm ET",  city: "Houston, TX",          stadium: "NRG Stadium",               r32id: 76  },
  { id: "r32-77",  round: "Round of 32", date: "Mon Jun 30", time: "12pm ET", city: "New York/NJ",          stadium: "MetLife Stadium",           r32id: 77  },
  { id: "r32-78",  round: "Round of 32", date: "Mon Jun 30", time: "3pm ET",  city: "Dallas, TX",           stadium: "AT&T Stadium",              r32id: 78  },
  { id: "r32-79",  round: "Round of 32", date: "Mon Jun 30", time: "6pm ET",  city: "Mexico City, Mexico",  stadium: "Estadio Azteca",            r32id: 79  },
  { id: "r32-80",  round: "Round of 32", date: "Tue Jul 1",  time: "12pm ET", city: "Atlanta, GA",          stadium: "Mercedes-Benz Stadium",     r32id: 80  },
  { id: "r32-81",  round: "Round of 32", date: "Tue Jul 1",  time: "3pm ET",  city: "San Francisco, CA",    stadium: "Levi's Stadium",            r32id: 81  },
  { id: "r32-82",  round: "Round of 32", date: "Tue Jul 1",  time: "6pm ET",  city: "Seattle, WA",          stadium: "Lumen Field",               r32id: 82  },
  { id: "r32-83",  round: "Round of 32", date: "Wed Jul 2",  time: "12pm ET", city: "Toronto, Canada",      stadium: "BMO Field",                 r32id: 83  },
  { id: "r32-84",  round: "Round of 32", date: "Wed Jul 2",  time: "3pm ET",  city: "Los Angeles, CA",      stadium: "Rose Bowl",                 r32id: 84  },
  { id: "r32-85",  round: "Round of 32", date: "Wed Jul 2",  time: "6pm ET",  city: "Vancouver, Canada",    stadium: "BC Place",                  r32id: 85  },
  { id: "r32-86",  round: "Round of 32", date: "Thu Jul 3",  time: "12pm ET", city: "Miami, FL",            stadium: "Hard Rock Stadium",         r32id: 86  },
  { id: "r32-87",  round: "Round of 32", date: "Thu Jul 3",  time: "3pm ET",  city: "Kansas City, MO",      stadium: "Arrowhead Stadium",         r32id: 87  },
  { id: "r32-88",  round: "Round of 32", date: "Thu Jul 3",  time: "6pm ET",  city: "Dallas, TX",           stadium: "AT&T Stadium",              r32id: 88  },
  // ── ROUND OF 16 ──
  { id: "r16-1",  round: "Round of 16", date: "Sat Jul 4",  time: "1pm ET",  city: "Houston, TX",          stadium: "NRG Stadium",             matchup: "Winner Group C vs Runner-up Group F",   groups: ["C","F"] },
  { id: "r16-2",  round: "Round of 16", date: "Sat Jul 4",  time: "5pm ET",  city: "Philadelphia, PA",     stadium: "Lincoln Financial Field",  matchup: "Winner R32 M85 vs Winner R32 M86",      groups: ["B","E","F","I","J"] },
  { id: "r16-3",  round: "Round of 16", date: "Sat Jul 4",  time: "9pm ET",  city: "Kansas City, MO",      stadium: "Arrowhead Stadium",        matchup: "Winner R32 M73 vs Winner R32 M75",      groups: ["C","F","J","H"] },
  { id: "r16-4",  round: "Round of 16", date: "Sun Jul 5",  time: "1pm ET",  city: "Los Angeles, CA",      stadium: "SoFi Stadium",             matchup: "Winner R32 M79 vs Winner R32 M80",      groups: ["A","L","E","H","I","K"] },
  { id: "r16-5",  round: "Round of 16", date: "Sun Jul 5",  time: "5pm ET",  city: "Seattle, WA",          stadium: "Lumen Field",              matchup: "Winner R32 M81 vs Winner R32 M82",      groups: ["G","A","E","H","I","J"] },
  { id: "r16-6",  round: "Round of 16", date: "Mon Jul 6",  time: "1pm ET",  city: "Houston, TX",          stadium: "NRG Stadium",             matchup: "Winner R32 M76 vs Winner R32 M78",      groups: ["C","F","E","I"] },
  { id: "r16-7",  round: "Round of 16", date: "Mon Jul 6",  time: "3pm ET",  city: "Dallas (Arlington), TX", stadium: "AT&T Stadium",           matchup: "Winner R32 M83 vs Winner R32 M84",      groups: ["J","H","K","D"] },
  { id: "r16-8",  round: "Round of 16", date: "Mon Jul 6",  time: "8pm ET",  city: "Seattle, WA",          stadium: "Lumen Field",              matchup: "Winner R32 M77 vs Winner R32 M87",      groups: ["I","C","D","F","G","H"] },
  { id: "r16-9",  round: "Round of 16", date: "Tue Jul 7",  time: "12pm ET", city: "Atlanta, GA",          stadium: "Mercedes-Benz Stadium",    matchup: "Winner R32 M80 vs Winner R32 M88",      groups: ["L","E","H","I","K","B"] },
  { id: "r16-10", round: "Round of 16", date: "Tue Jul 7",  time: "4pm ET",  city: "Vancouver, Canada",    stadium: "BC Place",                 matchup: "Winner R32 M74 vs Winner R32 M77",      groups: ["E","A","B","C","D","F","I","G","H"] },
  { id: "r16-11", round: "Round of 16", date: "Tue Jul 7",  time: "8pm ET",  city: "Mexico City, Mexico",  stadium: "Estadio Azteca",           matchup: "Winner R32 M79 vs Winner R32 M87",      groups: ["A","C","D","F","G","H"] },
  { id: "r16-12", round: "Round of 16", date: "Wed Jul 8",  time: "3pm ET",  city: "New York/New Jersey",  stadium: "MetLife Stadium",          matchup: "Winner R32 M77 vs Winner R32 M86",      groups: ["I","C","D","F","G","H","B","E","J"] },
  // ── QUARTERFINALS ──
  { id: "qf-1",   round: "Quarterfinal", date: "Thu Jul 9",  time: "4pm ET",  city: "Boston, MA",           stadium: "Gillette Stadium",         matchup: "Winner R16 Match 2 vs Winner R16 Match 3", groups: [] },
  { id: "qf-2",   round: "Quarterfinal", date: "Fri Jul 10", time: "3pm ET",  city: "Los Angeles, CA",      stadium: "SoFi Stadium",             matchup: "Winner R16 Match 4 vs Winner R16 Match 5", groups: [] },
  { id: "qf-3",   round: "Quarterfinal", date: "Sat Jul 11", time: "5pm ET",  city: "Miami, FL",            stadium: "Hard Rock Stadium",        matchup: "Winner R16 Match 6 vs Winner R16 Match 7", groups: [] },
  { id: "qf-4",   round: "Quarterfinal", date: "Sat Jul 11", time: "9pm ET",  city: "Kansas City, MO",      stadium: "Arrowhead Stadium",        matchup: "Winner R16 Match 8 vs Winner R16 Match 9", groups: [] },
  // ── SEMIFINALS ──
  { id: "sf-1",   round: "Semifinal",    date: "Tue Jul 14", time: "3pm ET",  city: "Dallas (Arlington), TX", stadium: "AT&T Stadium",           matchup: "Winner QF1 vs Winner QF2",              groups: [] },
  { id: "sf-2",   round: "Semifinal",    date: "Wed Jul 15", time: "3pm ET",  city: "Atlanta, GA",          stadium: "Mercedes-Benz Stadium",    matchup: "Winner QF3 vs Winner QF4",              groups: [] },
  // ── BRONZE & FINAL ──
  { id: "bronze", round: "3rd Place",    date: "Sat Jul 18", time: "5pm ET",  city: "Miami, FL",            stadium: "Hard Rock Stadium",        matchup: "Loser SF1 vs Loser SF2",                groups: [] },
  { id: "final",  round: "Final",        date: "Sun Jul 19", time: "3pm ET",  city: "New York/New Jersey",  stadium: "MetLife Stadium",          matchup: "Winner SF1 vs Winner SF2",              groups: [] },
];

const ROUND_ORDER = ["Round of 32", "Round of 16", "Quarterfinal", "Semifinal", "3rd Place", "Final"];

function VenueExplorer({ onSelectTeam }) {
  const [openGame, setOpenGame] = useState(null);
  const [selectedRound, setSelectedRound] = useState("Round of 32");

  const filteredGames = KNOCKOUT_VENUES.filter(g => g.round === selectedRound);

  const getPossibleTeams = (game) => {
    if (!game) return null;
    // R32 games — derive teams from the R32 bracket data
    if (game.r32id) {
      const r32match = R32.find(m => m.id === game.r32id);
      if (!r32match) return null;
      const dist1 = getSlotDist(r32match.t1);
      const dist2 = getSlotDist(r32match.t2);
      const teams = [...new Set([...Object.keys(dist1), ...Object.keys(dist2)])];
      return teams.sort();
    }
    if (!game.groups || game.groups.length === 0) return null;
    const teams = [];
    game.groups.forEach(g => {
      if (GROUPS[g]) GROUPS[g].teams.forEach(t => { if (!teams.includes(t)) teams.push(t); });
    });
    return teams.sort();
  };

  const getMatchupLabel = (game) => {
    if (!game?.r32id) return null;
    const m = R32.find(r => r.id === game.r32id);
    if (!m) return null;
    const slotLabel = (slot) => {
      if (slot.type === "winner") return `Winner Grp ${slot.g}`;
      if (slot.type === "runner") return `Runner-up Grp ${slot.g}`;
      return `Best 3rd (${slot.gs?.join("/")})`;
    };
    return `${slotLabel(m.t1)} vs ${slotLabel(m.t2)}`;
  };

  return (
    <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 14px 60px" }}>

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <h2 style={{ color: "#FFD700", fontSize: "1.3rem", fontWeight: 900, margin: "0 0 6px", letterSpacing: "0.04em", textTransform: "uppercase" }}>
          🎟️ Find Your Game
        </h2>
        <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 13, margin: 0 }}>
          Tap any game to see possible teams and get tickets.
        </p>
      </div>

      {/* Round tabs */}
      <div style={{ display: "flex", justifyContent: "center", gap: 6, marginBottom: 20, flexWrap: "wrap" }}>
        {ROUND_ORDER.map(r => (
          <button key={r} onClick={() => { setSelectedRound(r); setOpenGame(null); }}
            style={{ padding: "7px 16px", borderRadius: 20, border: selectedRound === r ? "2px solid #FFD700" : "2px solid rgba(255,255,255,0.15)", background: selectedRound === r ? "#FFD700" : "transparent", color: selectedRound === r ? "#000" : "#8fa8c0", fontWeight: 700, fontSize: 12, cursor: "pointer", transition: "all 0.15s", textTransform: "uppercase", letterSpacing: "0.05em" }}
            onMouseEnter={e => { if (selectedRound !== r) { e.currentTarget.style.borderColor = "rgba(255,215,0,0.4)"; e.currentTarget.style.color = "#fff"; }}}
            onMouseLeave={e => { if (selectedRound !== r) { e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; e.currentTarget.style.color = "#8fa8c0"; }}}
          >{r}</button>
        ))}
      </div>

      {/* Game cards — tap to expand inline */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {filteredGames.map(game => {
          const isOpen = openGame?.id === game.id;
          const cardTeams = getPossibleTeams(game);
          const cardQ = encodeURIComponent(`FIFA World Cup 2026 ${game.city}`);
          const r32match = game.r32id ? R32.find(m => m.id === game.r32id) : null;
          const top4 = r32match ? getTopMatchups(r32match, 4) : [];

          return (
            <div key={game.id}
              style={{ background: isOpen ? "rgba(255,215,0,0.06)" : "rgba(255,255,255,0.04)", border: `2px solid ${isOpen ? "rgba(255,215,0,0.45)" : "rgba(255,255,255,0.1)"}`, borderRadius: 14, overflow: "hidden", transition: "border-color 0.2s, background 0.2s" }}
            >
              {/* Card header — always visible, tap to toggle */}
              <div onClick={() => setOpenGame(isOpen ? null : game)}
                style={{ padding: "14px 18px", cursor: "pointer", display: "flex", alignItems: "center", gap: 12 }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                    <span style={{ background: "rgba(255,215,0,0.15)", color: "#FFD700", fontSize: 10, fontWeight: 800, padding: "2px 8px", borderRadius: 10, letterSpacing: "0.06em", textTransform: "uppercase", flexShrink: 0 }}>{game.round}</span>
                    <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", fontWeight: 600, whiteSpace: "nowrap" }}>{game.date} · {game.time}</span>
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 800, color: "#fff" }}>{game.city}</div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>📍 {game.stadium}</div>
                </div>
                <span style={{ fontSize: 18, color: "rgba(255,215,0,0.6)", flexShrink: 0, transition: "transform 0.2s", transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}>⌄</span>
              </div>

              {/* Expanded content */}
              {isOpen && (
                <div style={{ padding: "0 18px 18px", display: "flex", flexDirection: "column", gap: 14, borderTop: "1px solid rgba(255,215,0,0.12)" }}>

                  {/* Slot label */}
                  {game.r32id && getMatchupLabel(game) && (
                    <div style={{ paddingTop: 14, fontSize: 12, color: "#8fa8c0", fontWeight: 600 }}>
                      📋 {getMatchupLabel(game)}
                    </div>
                  )}

                  {/* Top 4 matchups */}
                  {top4.length > 0 && (
                    <div>
                      <div style={{ fontSize: 11, color: "#FFD700", fontWeight: 800, textTransform: "uppercase", letterSpacing: 2, marginBottom: 8 }}>🔮 Most Likely Matchups</div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                        {top4.map(({ teamA, teamB, prob }, i) => (
                          <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 10, padding: "8px 12px" }}>
                            <span style={{ fontSize: 10, fontWeight: 900, color: i === 0 ? "#FFD700" : "#445", width: 18, flexShrink: 0 }}>#{i+1}</span>
                            <div style={{ display: "flex", alignItems: "center", gap: 5, flex: 1, minWidth: 0 }}>
                              <Flag name={teamA} size={14} />
                              <span style={{ fontSize: 12, fontWeight: 700, color: "#ddd", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{teamA}</span>
                              <span style={{ fontSize: 10, color: "#445", flexShrink: 0 }}>vs</span>
                              <Flag name={teamB} size={14} />
                              <span style={{ fontSize: 12, fontWeight: 700, color: "#ddd", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{teamB}</span>
                            </div>
                            <span style={{ fontSize: 11, fontWeight: 800, color: i === 0 ? "#FFD700" : "#556", flexShrink: 0 }}>{(prob * 100).toFixed(1)}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tickets */}
                  <div>
                    <div style={{ fontSize: 11, color: "#FFD700", fontWeight: 800, textTransform: "uppercase", letterSpacing: 2, marginBottom: 8 }}>🎫 Get Tickets</div>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      <a href={`https://www.stubhub.com/search?q=${cardQ}`} target="_blank" rel="noopener noreferrer"
                        style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "9px 18px", background: "#00d4aa", color: "#000", fontWeight: 800, fontSize: 13, borderRadius: 10, textDecoration: "none" }}
                      >🎫 StubHub</a>
                      <a href={`https://www.vividseats.com/search?q=${cardQ}`} target="_blank" rel="noopener noreferrer"
                        style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "9px 18px", background: "rgba(168,85,247,0.15)", color: "#c084fc", fontWeight: 800, fontSize: 13, borderRadius: 10, textDecoration: "none", border: "1px solid rgba(168,85,247,0.4)" }}
                      >🎟️ Vivid Seats</a>
                    </div>
                  </div>

                  {/* Possible teams */}
                  {cardTeams ? (
                    <div>
                      <div style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", marginBottom: 8 }}>
                        <strong style={{ color: "#fff" }}>{cardTeams.length} teams</strong> could play here — tap to simulate their path:
                      </div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                        {cardTeams.map(team => (
                          <button key={team} onClick={() => { onSelectTeam(team); setOpenGame(null); }}
                            style={{ display: "flex", alignItems: "center", gap: 5, padding: "6px 12px", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 20, color: "#ddd", fontSize: 11, fontWeight: 600, cursor: "pointer" }}
                            onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,215,0,0.18)"; e.currentTarget.style.borderColor = "rgba(255,215,0,0.5)"; e.currentTarget.style.color = "#FFD700"; }}
                            onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.07)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; e.currentTarget.style.color = "#ddd"; }}
                          >
                            <Flag name={team} size={13} />{team}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 12, margin: 0 }}>
                      Teams depend on earlier results. Simulate a path to see if they reach {game.city}.
                    </p>
                  )}

                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── ROOT APP ──────────────────────────────────────────────────────────────────
export default function App() {
  const [phase,             setPhase]             = useState("venue");
  const [heroMode,          setHeroMode]          = useState(null); // null | "venue" | "team"
  const [mainTeam,          setMainTeam]          = useState(null);
  const [allGroupStandings, setAllGroupStandings] = useState({});
  const [knockoutWinners,   setKnockoutWinners]   = useState({});
  const [champion,          setChampion]          = useState(null);
  const [showCelebration,   setShowCelebration]   = useState(false);
  const [fadingOut,         setFadingOut]         = useState(false);

  const setGroup = (g, winner, runner, third) =>
    setAllGroupStandings((p) => ({ ...p, [g]: { winner, runner, third } }));

  // Confirm all 12 groups at once using their current displayed order (default = original order)
  const continueKnockoutRef = React.useRef(null);

  const handleConfirmAllGroups = () => {
    const updates = {};
    Object.entries(GROUPS).forEach(([g, data]) => {
      if (!allGroupStandings[g]) {
        const [winner, runner, third] = data.teams;
        updates[g] = { winner, runner, third };
      }
    });
    setAllGroupStandings((p) => ({ ...p, ...updates }));
    setTimeout(() => {
      continueKnockoutRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, 100);
  };

  // Reset everything back to initial state
  const handleResetAll = () => {
    setMainTeam(null);
    setAllGroupStandings({});
    setKnockoutWinners({});
    setChampion(null);
    setShowCelebration(false);
    setFadingOut(false);
    setHeroMode(null);
    setPhase("venue");
  };

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
    setFadingOut(false);
  };

  const handleChampion = (team) => {
    setChampion(team);
    setFadingOut(false);
    setShowCelebration(true);
    // After a moment, start fading out, then switch to Summary once fade completes
    setTimeout(() => setFadingOut(true), 1400);
    setTimeout(() => {
      setShowCelebration(false);
      setFadingOut(false);
      setPhase("summary");
    }, 2050);
  };

  const TABS = [
    { id: "venue",   label: "🎟️ Find Your Game"                             },
    { id: "group",    label: "⚽ Group Stage"                               },
    { id: "knockout", label: "🏆 Knockout Rounds"                          },
    { id: "summary",  label: mainTeam ? `${mainTeam}'s Summary` : "📋 Summary" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "radial-gradient(ellipse at top,#0d1a2e 0%,#070b12 58%,#050508 100%)", fontFamily: "'Segoe UI',system-ui,sans-serif", color: "#fff" }}>
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @media (max-width: 520px) {
          .chip-grid { gap: 5px !important; max-width: 100% !important; }
          .chip-btn  { font-size: 11px !important; padding: 4px 8px !important; }
          .hero-eyebrow { font-size: 9px !important; gap: 5px !important; flex-wrap: wrap; justify-content: center; }
          .tab-bar { gap: 5px !important; padding: 14px 10px 0 !important; }
          .venue-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <Confetti active={showCelebration} />
      {showCelebration && (
        <CelebrationOverlay
          champion={champion}
          fadingOut={fadingOut}
          onDismiss={() => {
            setFadingOut(true);
            setTimeout(() => { setShowCelebration(false); setFadingOut(false); setPhase("summary"); }, 600);
          }}
        />
      )}

      {/* ── COUNTDOWN BANNER ── */}
      {(() => {
        const kickoff = new Date("2026-06-11T00:00:00");
        const today = new Date();
        today.setHours(0,0,0,0);
        const days = Math.ceil((kickoff - today) / (1000 * 60 * 60 * 24));
        if (days <= 0) return null;
        return (
          <div style={{ background: "#000d1f", borderBottom: "1px solid rgba(255,215,0,0.15)", padding: "8px 20px", textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
            <span style={{ fontSize: 13 }}>⚽</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.45)", letterSpacing: "0.06em" }}>
              <span style={{ color: "#FFD700", fontWeight: 900, fontSize: 14 }}>{days}</span> {days === 1 ? "day" : "days"} until kick-off
            </span>
            <span style={{ fontSize: 11, color: "rgba(255,255,255,0.2)", letterSpacing: "0.08em" }}>· FIFA WORLD CUP 2026 · JUN 11</span>
          </div>
        );
      })()}

      {/* ── HERO ── */}
      <div style={{ position: "relative", background: "linear-gradient(180deg,#00277a 0%,#001650 55%,#000a1e 100%)", padding: "36px 20px 56px", textAlign: "center", clipPath: "polygon(0 0,100% 0,100% 80%,50% 100%,0 80%)", marginBottom: 6, overflow: "hidden" }}>

        {/* Stadium silhouette SVG */}
        <svg viewBox="0 0 1200 220" preserveAspectRatio="xMidYMax slice" style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: "60%", opacity: 0.18, pointerEvents: "none" }}>
          {/* Pitch markings */}
          <rect x="300" y="160" width="600" height="2" fill="#4a8" opacity="0.4"/>
          <ellipse cx="600" cy="160" rx="80" ry="30" fill="none" stroke="#4a8" strokeWidth="1.5" opacity="0.4"/>
          <line x1="600" y1="130" x2="600" y2="192" stroke="#4a8" strokeWidth="1.5" opacity="0.4"/>
          {/* Left stand */}
          <path d="M0,220 L0,100 Q30,80 80,70 L180,60 Q220,55 260,58 L300,62 L300,160 L0,160 Z" fill="#1a3a7a"/>
          <path d="M0,100 Q30,80 80,70 L180,60 Q220,55 260,58 L300,62 L300,68 L260,64 Q220,61 180,66 L80,76 Q30,86 0,106 Z" fill="#2a4a9a"/>
          {/* Right stand */}
          <path d="M1200,220 L1200,100 Q1170,80 1120,70 L1020,60 Q980,55 940,58 L900,62 L900,160 L1200,160 Z" fill="#1a3a7a"/>
          <path d="M1200,100 Q1170,80 1120,70 L1020,60 Q980,55 940,58 L900,62 L900,68 L940,64 Q980,61 1020,66 L1120,76 Q1170,86 1200,106 Z" fill="#2a4a9a"/>
          {/* Upper tiers left */}
          <path d="M0,100 Q30,80 80,70 L180,60 Q220,55 260,58 L300,62 L300,56 L260,52 Q220,49 180,54 L80,64 Q30,74 0,94 Z" fill="#3a5aaa"/>
          <path d="M0,94 Q30,74 80,64 L180,54 Q220,49 260,52 L300,56 L300,50 L260,46 Q220,43 180,48 L80,58 Q30,68 0,88 Z" fill="#1e3570"/>
          {/* Upper tiers right */}
          <path d="M1200,100 Q1170,80 1120,70 L1020,60 Q980,55 940,58 L900,62 L900,56 L940,52 Q980,49 1020,54 L1120,64 Q1170,74 1200,94 Z" fill="#3a5aaa"/>
          <path d="M1200,94 Q1170,74 1120,64 L1020,54 Q980,49 940,52 L900,56 L900,50 L940,46 Q980,43 1020,48 L1120,58 Q1170,68 1200,88 Z" fill="#1e3570"/>
          {/* Floodlights left */}
          <rect x="55" y="20" width="6" height="50" fill="#7090d0"/>
          <rect x="40" y="18" width="36" height="5" rx="2" fill="#8aabf0"/>
          <rect x="155" y="30" width="5" height="40" fill="#7090d0"/>
          <rect x="142" y="28" width="30" height="4" rx="2" fill="#8aabf0"/>
          {/* Floodlights right */}
          <rect x="1139" y="20" width="6" height="50" fill="#7090d0"/>
          <rect x="1124" y="18" width="36" height="5" rx="2" fill="#8aabf0"/>
          <rect x="1040" y="30" width="5" height="40" fill="#7090d0"/>
          <rect x="1027" y="28" width="30" height="4" rx="2" fill="#8aabf0"/>
          {/* Crowd dots left stand */}
          {[...Array(12)].map((_,i) => [...Array(30)].map((_,j) => (
            <circle key={`cl-${i}-${j}`} cx={10+j*9} cy={75+i*8} r="1.5" fill={`hsl(${210+i*3},${40+j*1}%,${50+i*3}%)`} opacity={0.5+Math.random()*0.4}/>
          )))}
          {/* Crowd dots right stand */}
          {[...Array(12)].map((_,i) => [...Array(30)].map((_,j) => (
            <circle key={`cr-${i}-${j}`} cx={930+j*9} cy={75+i*8} r="1.5" fill={`hsl(${210+i*3},${40+j*1}%,${50+i*3}%)`} opacity={0.5+Math.random()*0.4}/>
          )))}
        </svg>

        {/* Subtle diagonal stripes */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(135deg, rgba(255,255,255,0.012) 0px, rgba(255,255,255,0.012) 1px, transparent 1px, transparent 40px)", pointerEvents: "none" }} />
        {/* Floodlight glow from corners */}
        <div style={{ position: "absolute", top: 0, left: 0, width: 300, height: 200, background: "radial-gradient(ellipse at 10% 10%, rgba(150,180,255,0.07) 0%, transparent 60%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: 0, right: 0, width: 300, height: 200, background: "radial-gradient(ellipse at 90% 10%, rgba(150,180,255,0.07) 0%, transparent 60%)", pointerEvents: "none" }} />
        {/* Radial glow behind title */}
        <div style={{ position: "absolute", top: "10%", left: "50%", transform: "translateX(-50%)", width: 600, height: 300, background: "radial-gradient(ellipse,rgba(255,215,0,0.09) 0%,transparent 70%)", pointerEvents: "none" }} />

        <div style={{ position: "relative" }}>
          {mainTeam && (
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 18, filter: "drop-shadow(0 8px 28px rgba(255,215,0,0.5))" }}>
              <Flag name={mainTeam} size={96} />
            </div>
          )}

          {/* Eyebrow label */}
          <div className="hero-eyebrow" style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 10, marginBottom: 12, fontSize: 11, color: "rgba(255,255,255,0.4)", letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 700, animation: "fadeSlideUp 0.7s ease 0.05s both" }}>
            <span>48 TEAMS</span>
            <span style={{ color: "rgba(255,255,255,0.2)" }}>·</span>
            <span>64 MATCHES</span>
            <span style={{ color: "rgba(255,255,255,0.2)" }}>·</span>
            <span>2026 WORLD CUP</span>
          </div>

          {/* Main headline — animated */}
          <h1 style={{ fontSize: "clamp(1.6rem,5.5vw,2.8rem)", fontWeight: 900, color: "#FFD700", margin: "0 0 8px", letterSpacing: "0.06em", textTransform: "uppercase", textShadow: "0 2px 24px rgba(255,215,0,0.5)", lineHeight: 1.1, animation: "fadeSlideUp 0.7s ease both" }}>
            Every Possible Path. One Decision.
          </h1>
          <p style={{ color: "rgba(255,255,255,0.82)", margin: "0 0 6px", fontSize: "clamp(0.95rem,2.2vw,1.1rem)", fontWeight: 400, maxWidth: 460, marginLeft: "auto", marginRight: "auto", lineHeight: 1.5, animation: "fadeSlideUp 0.7s ease 0.15s both" }}>
            See every possible matchup for your World Cup knockout game.
          </p>


          {/* ── SPLIT ENTRY CARDS ── */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, maxWidth: 620, margin: "0 auto 20px", animation: "fadeSlideUp 0.7s ease 0.28s both" }}>

            {/* Card: Simulate a Team */}
            <button onClick={() => { setHeroMode("team"); setPhase("group"); }}
              style={{ background: heroMode === "team" ? "rgba(100,160,255,0.1)" : "rgba(255,255,255,0.05)", border: heroMode === "team" ? "2px solid rgba(100,160,255,0.6)" : "2px solid rgba(255,255,255,0.12)", borderRadius: 16, padding: "22px 20px", textAlign: "left", cursor: "pointer", position: "relative", overflow: "hidden", boxShadow: heroMode === "team" ? "0 0 24px rgba(100,160,255,0.12)" : "none", opacity: heroMode === "venue" ? 0.45 : 1, transition: "all 0.2s" }}
              onMouseEnter={e => { if (heroMode !== "team") { e.currentTarget.style.background = "rgba(100,160,255,0.07)"; e.currentTarget.style.borderColor = "rgba(100,160,255,0.4)"; }}}
              onMouseLeave={e => { if (heroMode !== "team") { e.currentTarget.style.background = heroMode === "venue" ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.05)"; e.currentTarget.style.borderColor = heroMode === "venue" ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.12)"; }}}
            >
              {heroMode === "team" && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "#7ab8ff", borderRadius: "16px 16px 0 0" }} />}
              <div style={{ fontSize: 28, marginBottom: 10 }}>⚽</div>
              <div style={{ fontSize: 13, fontWeight: 900, color: heroMode === "team" ? "#7ab8ff" : "#e0e0e0", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 7 }}>Simulate a Team's Path</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", lineHeight: 1.6 }}>Pick any team and map their full journey — every possible match from group stage to the final.</div>
              {heroMode === "team" && <div style={{ marginTop: 12, fontSize: 10, color: "#7ab8ff", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase" }}>▼ See options below</div>}
            </button>

            {/* Card: Browse Games by Venue */}
            <button onClick={() => { setHeroMode("venue"); setPhase("venue"); }}
              style={{ background: heroMode === "venue" ? "rgba(255,215,0,0.12)" : "rgba(255,255,255,0.05)", border: heroMode === "venue" ? "2px solid rgba(255,215,0,0.7)" : "2px solid rgba(255,255,255,0.12)", borderRadius: 16, padding: "22px 20px", textAlign: "left", cursor: "pointer", position: "relative", overflow: "hidden", boxShadow: heroMode === "venue" ? "0 0 24px rgba(255,215,0,0.15)" : "none", opacity: heroMode === "team" ? 0.45 : 1, transition: "all 0.2s" }}
              onMouseEnter={e => { if (heroMode !== "venue") { e.currentTarget.style.background = "rgba(255,215,0,0.07)"; e.currentTarget.style.borderColor = "rgba(255,215,0,0.4)"; }}}
              onMouseLeave={e => { if (heroMode !== "venue") { e.currentTarget.style.background = heroMode === "team" ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.05)"; e.currentTarget.style.borderColor = heroMode === "team" ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.12)"; }}}
            >
              {heroMode === "venue" && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "#FFD700", borderRadius: "16px 16px 0 0" }} />}
              <div style={{ fontSize: 28, marginBottom: 10 }}>🎟️</div>
              <div style={{ fontSize: 13, fontWeight: 900, color: heroMode === "venue" ? "#FFD700" : "#e0e0e0", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 7 }}>Browse Games by Round / Venue</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", lineHeight: 1.6 }}>Explore knockout games by city and date. See every team that could play at each game.</div>
              {heroMode === "venue" && <div style={{ marginTop: 12, fontSize: 10, color: "#FFD700", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase" }}>▼ See options below</div>}
            </button>
          </div>

          {/* Reset */}
          {heroMode && (
            <div style={{ animation: "fadeIn 0.3s ease both" }}>
              <button onClick={handleResetAll}
                style={{ padding: "5px 18px", background: "transparent", border: "1px solid rgba(248,113,113,0.3)", borderRadius: 20, color: "rgba(248,113,113,0.55)", fontWeight: 600, fontSize: 11, cursor: "pointer", letterSpacing: "0.04em", transition: "all 0.15s" }}
                onMouseEnter={e => { e.target.style.borderColor = "rgba(248,113,113,0.7)"; e.target.style.color = "#f87171"; }}
                onMouseLeave={e => { e.target.style.borderColor = "rgba(248,113,113,0.3)"; e.target.style.color = "rgba(248,113,113,0.55)"; }}
              >Reset All</button>
            </div>
          )}
        </div>
      </div>

      {/* ── TABS (team mode only) ── */}
      {heroMode === "team" && (
        <div className="tab-bar" style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 8, padding: "16px 16px 0", flexWrap: "wrap", animation: "fadeIn 0.3s ease both" }}>
          {TABS.filter(t => t.id !== "venue").map((t) => (
            <button key={t.id} onClick={() => setPhase(t.id)}
              style={{ padding: "9px 20px", borderRadius: 24, border: phase === t.id ? "2px solid #FFD700" : "2px solid rgba(255,255,255,0.18)", background: phase === t.id ? "#FFD700" : "rgba(255,255,255,0.04)", color: phase === t.id ? "#000" : "#8fa8c0", fontWeight: 800, fontSize: 13, cursor: "pointer", textTransform: "uppercase", letterSpacing: "0.06em", transition: "all 0.2s" }}
              onMouseEnter={e => { if (phase !== t.id) { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; e.currentTarget.style.borderColor = "rgba(255,215,0,0.5)"; e.currentTarget.style.color = "#fff"; }}}
              onMouseLeave={e => { if (phase !== t.id) { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)"; e.currentTarget.style.color = "#8fa8c0"; }}}
            >{t.label}</button>
          ))}
        </div>
      )}

      {/* ── CONTENT ── */}
      <div style={{ maxWidth: 940, margin: "0 auto", padding: "24px 14px 70px" }}>

        {!heroMode && (
          <div style={{ textAlign: "center", padding: "40px 20px", animation: "fadeIn 0.5s ease both" }}>
            <p style={{ color: "rgba(255,255,255,0.2)", fontSize: 13, letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 600 }}>Choose an option above to get started</p>
          </div>
        )}

        {heroMode === "venue" && (
          <div style={{ animation: "fadeSlideUp 0.4s ease both" }}>
            <VenueExplorer onSelectTeam={(team) => { handleTeamChange(team); setHeroMode("team"); setPhase("group"); }} />
          </div>
        )}

        {heroMode === "team" && (
          <div style={{ animation: "fadeSlideUp 0.4s ease both" }}>

            {!mainTeam && (
              <div style={{ textAlign: "center", marginBottom: 28 }}>
                <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 14, fontWeight: 700 }}>Pick a team to simulate</p>
                <div className="chip-grid" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, maxWidth: 540, margin: "0 auto" }}>
                  {["USA","Mexico","Canada","Portugal","Spain","France","England","Argentina","Colombia","Brazil","Germany","Japan","Netherlands","Korea Republic","Morocco","Norway","Croatia"].map(team => (
                    <button key={team} onClick={() => handleTeamChange(team)}
                      style={{ display: "flex", alignItems: "center", gap: 5, padding: "6px 12px", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.14)", borderRadius: 20, color: "#ddd", fontSize: 12, fontWeight: 600, cursor: "pointer", transition: "all 0.15s" }}
                      onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,215,0,0.15)"; e.currentTarget.style.borderColor = "rgba(255,215,0,0.5)"; e.currentTarget.style.color = "#FFD700"; }}
                      onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.07)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.14)"; e.currentTarget.style.color = "#ddd"; }}
                    ><Flag name={team} size={14} />{team}</button>
                  ))}
                  <OtherTeamsDropdown
                    teams={ALL_TEAMS.filter(t => !["USA","Mexico","Canada","Portugal","Spain","France","England","Argentina","Colombia","Brazil","Germany","Japan","Netherlands","Korea Republic","Morocco","Norway","Croatia"].includes(t)).sort()}
                    onSelect={handleTeamChange}
                  />
                </div>
              </div>
            )}

            {mainTeam && (
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 12, marginBottom: 20 }}>
                <Flag name={mainTeam} size={32} />
                <span style={{ color: "#fff", fontWeight: 800, fontSize: 15 }}>{mainTeam}</span>
                <TeamSelector mainTeam={mainTeam} onChange={handleTeamChange} />
              </div>
            )}

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
                {mainTeam && teamGroup && (
                  <div style={{ marginBottom: 18 }}>
                    <GroupCard group={teamGroup} teams={GROUPS[teamGroup].teams} standing={allGroupStandings[teamGroup]} onSet={(w, r, t) => setGroup(teamGroup, w, r, t)} mainTeam={mainTeam} />
                  </div>
                )}
                <div style={{ textAlign: "center", margin: "0 0 16px" }}>
                  <button onClick={handleConfirmAllGroups}
                    style={{ padding: "6px 18px", background: "transparent", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 20, color: "#94a8bf", fontWeight: 600, fontSize: 12, cursor: "pointer", letterSpacing: "0.03em", transition: "all 0.15s" }}
                    onMouseEnter={e => { e.target.style.borderColor = "rgba(255,215,0,0.4)"; e.target.style.color = "#bbb"; }}
                    onMouseLeave={e => { e.target.style.borderColor = "rgba(255,255,255,0.15)"; e.target.style.color = "#94a8bf"; }}
                  >Auto-Confirm All Groups</button>
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
                    {teamFinish === "third"      && <p style={{ color: "#ef4444", margin: "0 0 14px", fontWeight: 700, fontSize: 15 }}>⚠️ {mainTeam} finishes 3rd — may advance as best 3rd place</p>}
                    {teamFinish === "eliminated" && <p style={{ color: "#f87171", margin: 0, fontWeight: 700, fontSize: 15 }}>❌ {mainTeam} eliminated in the group stage</p>}
                    {(teamFinish === "winner" || teamFinish === "runner") && (() => {
                      const allConfirmed = Object.keys(GROUPS).every(g => allGroupStandings[g]);
                      return (
                        <button ref={continueKnockoutRef} onClick={() => setPhase("knockout")}
                          style={{ padding: "11px 32px", background: allConfirmed ? "#4ade80" : "#FFD700", color: "#000", border: "none", borderRadius: 24, fontWeight: 900, cursor: "pointer", fontSize: 14, transition: "all 0.4s", boxShadow: allConfirmed ? "0 0 20px rgba(74,222,128,0.4)" : "none" }}>
                          Continue to Knockout Rounds →
                        </button>
                      );
                    })()}
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
                onBackToGroups={() => setPhase("group")}
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
        )}

      </div>
    </div>
  );
}
