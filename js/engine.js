// 작전 정의(plays/*.js)를 시간 t에 대한 결정적(deterministic) 타임라인으로 컴파일한다.
// 좌표계: 피트(ft). x = 좌우(-25 왼쪽 사이드라인 ~ 25 오른쪽), z = 베이스라인 0 → 하프라인 47.
// 공격 기준 왼쪽이 -x. 림 중심은 (0, 5.25), 높이 10ft.
import * as THREE from 'three';

export const BASKET = { x: 0, z: 5.25 };
export const RIM_Y = 10;
export const OFF = ['o1', 'o2', 'o3', 'o4', 'o5'];
export const DEF = ['d1', 'd2', 'd3', 'd4', 'd5'];

const DEF_BLEND = 0.5;     // 단계가 바뀔 때 수비 위치를 부드럽게 잇는 시간(초)
const DEF_LAG = 0.28;      // 수비가 공격 움직임에 반응하는 기본 지연(초)
const R_OFF = 2.05;        // 수비-공격 충돌 반경
const R_DEF = 1.8;         // 수비-수비 충돌 반경
const TAIL = 1.6;          // 마지막 단계 뒤 여유 시간
const OWN_OUT = 0.45;      // 공을 놓은 수비 대상에게서 온볼 자세를 푸는 시간(초)

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const smooth = (t) => t * t * (3 - 2 * t);
const easeSine = (t) => 0.5 - 0.5 * Math.cos(Math.PI * t);
const v2 = (x, z) => ({ x, z });
const toV = (p) => (Array.isArray(p) ? v2(p[0], p[1]) : { x: p.x, z: p.z });
const lerp2 = (a, b, t) => v2(a.x + (b.x - a.x) * t, a.z + (b.z - a.z) * t);
export const dist2 = (a, b) => Math.hypot(a.x - b.x, a.z - b.z);
const norm2 = (a) => { const l = Math.hypot(a.x, a.z) || 1; return v2(a.x / l, a.z / l); };

// ── 이동 구간(segment) ─────────────────────────────────────────
function makeSegment(start, spec, s0, dur) {
  const o = Array.isArray(spec) ? { path: spec } : spec;
  const pts = [start, ...o.path.map(toV)];
  const [a, b] = o.t || [0, 1];
  const seg = { pts, t0: s0 + a * dur, t1: s0 + b * dur, ease: o.ease || 'sine', end: pts[pts.length - 1], curve: null };
  if (pts.length > 2) {
    seg.curve = new THREE.CatmullRomCurve3(pts.map((p) => new THREE.Vector3(p.x, 0, p.z)), false, 'centripetal');
  }
  return seg;
}

function segAt(seg, t) {
  if (t <= seg.t0) return seg.pts[0];
  if (t >= seg.t1) return seg.end;
  let u = (t - seg.t0) / (seg.t1 - seg.t0);
  if (seg.ease === 'sine') u = easeSine(u);
  else if (seg.ease === 'in') u = u * u;
  else if (seg.ease === 'out') u = 1 - (1 - u) * (1 - u);
  if (!seg.curve) return lerp2(seg.pts[0], seg.end, u);
  const p = seg.curve.getPointAt(u);
  return v2(p.x, p.z);
}

export function segSamples(seg, n = 40) {
  if (!seg.curve) return [seg.pts[0], seg.end];
  return seg.curve.getSpacedPoints(n).map((p) => v2(p.x, p.z));
}

function flightTime(kind, d) {
  switch (kind) {
    case 'handoff': return 0.22;
    case 'bounce': return clamp(d / 34, 0.35, 0.9);
    case 'lob': return clamp(0.5 + d / 60, 0.6, 1.1);
    case 'skip': return clamp(d / 40, 0.45, 0.95);
    default: return clamp(d / 42, 0.28, 0.85);
  }
}

// ── 컴파일 ────────────────────────────────────────────────────
export function compilePlay(play) {
  const steps = [];
  const tracks = Object.fromEntries(OFF.map((id) => [id, []]));
  const start = Object.fromEntries(OFF.map((id) => [id, toV(play.start[id])]));
  const pos = { ...start };
  let s = 0;

  play.steps.forEach((st, k) => {
    const info = { ...st, index: k, s0: s, s1: s + st.dur, segs: {} };
    for (const [id, spec] of Object.entries(st.move || {})) {
      const seg = makeSegment(pos[id], spec, s, st.dur);
      tracks[id].push(seg);
      info.segs[id] = seg;
    }
    for (const id of Object.keys(info.segs)) pos[id] = info.segs[id].end;
    steps.push(info);
    s += st.dur;
  });
  const total = s;

  const offAt = (id, t) => {
    let p = start[id];
    for (const seg of tracks[id]) {
      if (t < seg.t0) return p;
      p = segAt(seg, t);
      if (t <= seg.t1) return p;
    }
    return p;
  };

  // ── 공(ball) 타임라인 ──
  const bsegs = [];
  const jumps = [];
  const scores = [];
  let holder = play.ball;
  let cursor = 0;
  let end = total + TAIL;

  steps.forEach((st, k) => {
    const evs = [...(st.ball || [])].sort((a, b) => a.at - b.at);
    for (const ev of evs) {
      if (!holder) break;
      const tr = st.s0 + ev.at * st.dur;
      bsegs.push({ type: 'hold', who: holder, t0: cursor, t1: tr });
      const fromP = offAt(holder, tr);
      if (ev.type === 'shot') {
        const d = dist2(fromP, BASKET);
        const kind = ev.kind || (d < 7 ? 'layup' : 'jumper');
        const tf = kind === 'dunk' ? 0.34 : kind === 'layup' ? 0.62 : 0.95 + d * 0.012;
        const y0 = kind === 'dunk' ? 9.8 : kind === 'layup' ? 8.8 : 8.4;
        const apex = kind === 'dunk' ? 0.25 : kind === 'layup' ? 1.6 : 3.2 + d * 0.11;
        bsegs.push({ type: 'shot', kind, who: holder, t0: tr, t1: tr + tf, from: { ...fromP, y: y0 }, to: { ...BASKET, y: RIM_Y + 0.25 }, apex, step: k });
        bsegs.push({ type: 'drop', t0: tr + tf, t1: Infinity });
        jumps.push({ who: holder, t: tr, kind });
        scores.push({ t: tr + tf, pts: ev.pts || 2, step: k, kind });
        end = Math.max(end, tr + tf + 1.6);
        holder = null;
      } else {
        const to = ev.to;
        let tf = flightTime(ev.type, dist2(fromP, offAt(to, tr)));
        tf = flightTime(ev.type, dist2(fromP, offAt(to, tr + tf)));
        const toP = offAt(to, tr + tf);
        bsegs.push({ type: 'flight', kind: ev.type || 'pass', who: holder, target: to, t0: tr, t1: tr + tf, from: fromP, to: toP, step: k });
        if (ev.type === 'lob') jumps.push({ who: to, t: tr + tf - 0.05, kind: 'catch' });
        holder = to;
        cursor = tr + tf;
      }
    }
  });
  if (holder) bsegs.push({ type: 'hold', who: holder, t0: cursor, t1: Infinity });

  const ballSegAt = (t) => {
    for (const b of bsegs) if (t >= b.t0 && t < b.t1) return b;
    return bsegs[bsegs.length - 1];
  };
  const holderAt = (t) => { const b = ballSegAt(t); return b.type === 'hold' ? b.who : null; };
  const ballXZ = (t) => {
    const b = ballSegAt(t);
    if (b.type === 'hold') return offAt(b.who, t);
    if (b.type === 'drop') return BASKET;
    const u = clamp((t - b.t0) / (b.t1 - b.t0), 0, 1);
    return lerp2(b.from, b.to, u);
  };

  // ── 수비 ──
  const stepIndexAt = (t) => {
    for (let k = 0; k < steps.length; k++) if (t < steps[k].s1) return k;
    return steps.length - 1;
  };
  const guards = [];
  let gmap = Object.fromEntries(DEF.map((d, i) => [d, OFF[i]]));
  steps.forEach((st) => {
    gmap = { ...gmap };
    for (const [d, spec] of Object.entries(st.def || {})) if (spec.guard) gmap[d] = spec.guard;
    guards.push(gmap);
  });

  // 공 소유 가중치: 공을 들고 있으면 1, 자기에게 오는 패스가 날아가는 동안 0→1,
  // 공을 놓은 뒤 OWN_OUT초 동안 1→0. 수비가 온볼/도움 위치 사이를 순간이동하지 않게 한다.
  const ownW = (man, t) => {
    let w = 0;
    for (const b of bsegs) {
      if (b.type === 'hold' && b.who === man) {
        if (t >= b.t0 && t < b.t1) return 1;
        if (t >= b.t1 && t < b.t1 + OWN_OUT) w = Math.max(w, 1 - smooth((t - b.t1) / OWN_OUT));
      } else if (b.type === 'flight' && b.target === man && t >= b.t0 && t < b.t1) {
        w = Math.max(w, smooth((t - b.t0) / (b.t1 - b.t0)));
      }
    }
    return w;
  };

  // 공을 가진 선수 앞: 림 쪽으로 약 3ft
  const onBallSpot = (m, toB, dm) => {
    const g = Math.min(3.2, dm * 0.45);
    return v2(m.x + toB.x * g, m.z + toB.z * g);
  };

  // 공이 없는 선수: 림 쪽에 서되, 공에서 멀수록 페인트의 도움 위치로 처진다
  const helpSpot = (m, toB, dm, tl, sag) => {
    const ball = ballXZ(tl);
    const gap = clamp(dm * 0.2, 2.2, 6);
    let p = v2(m.x + toB.x * gap, m.z + toB.z * gap);
    const h = clamp((dist2(m, ball) - 14) / 28, 0, 0.55) * sag;
    const help = v2(BASKET.x + (ball.x - BASKET.x) * 0.32, BASKET.z + (ball.z - BASKET.z) * 0.32);
    p = lerp2(p, help, h);
    p.z = Math.max(p.z, 1.2);
    return p;
  };

  // sag: 도움 수비로 처지는 정도(1 = 기본, 0 = 자기 선수만 바짝 따라감)
  const autoPos = (man, lag, t, sag = 1) => {
    const tl = Math.max(0, t - lag);
    const m = offAt(man, tl);
    const toB = norm2(v2(BASKET.x - m.x, BASKET.z - m.z));
    const dm = dist2(m, BASKET);
    const w = ownW(man, tl);
    if (w >= 1) return onBallSpot(m, toB, dm);
    const off = helpSpot(m, toB, dm, tl, sag);
    return w <= 0 ? off : lerp2(off, onBallSpot(m, toB, dm), w);
  };

  const defStart = [];
  const defSegs = [];

  // 겹침 처리 전(raw) 수비 위치. 단계 사이 블렌딩도 이 값으로 이어야 겹침 처리가 두 번 적용되지 않는다.
  const rawIn = (k, d, t) => {
    const st = steps[k];
    const spec = (st.def || {})[d] || {};
    if (defSegs[k][d]) return segAt(defSegs[k][d], t);
    const raw = autoPos(guards[k][d], spec.lag ?? DEF_LAG, t, spec.sag ?? 1);
    if (k === 0 && !defStart[0]) return raw;
    const w = smooth(clamp((t - st.s0) / DEF_BLEND, 0, 1));
    return lerp2(defStart[k][d], raw, w);
  };
  const evalRaw = (k, t) => Object.fromEntries(DEF.map((d) => [d, rawIn(k, d, t)]));
  const rawOf = (d, t) => rawIn(stepIndexAt(t), d, t);

  // ── 겹침 처리 ──
  // 원 밖으로 그냥 밀어내면 목표 위치가 원 중심을 지날 때 반대편으로 순간이동한다.
  // 그래서 목표가 원 안에 머무는 구간(진입 te ~ 이탈 tx)을 찾아, 그동안 진입 방향에서
  // 이탈 방향으로 원둘레를 따라 돌아가게 한다. 위치는 여전히 t만의 함수다.
  // rel(s): 시각 s에서 원 중심 → 수비 목표 벡터. 반환값은 원둘레 위의 각도.
  const SCAN = 1 / 60;
  // 찾은 겹침 구간은 쌍(key)마다 저장해 다시 쓴다. 위치가 t만의 함수라 결과는 어떤 순서로 물어도 같다.
  const windows = new Map();
  const angleIn = (w, t) => (w.open ? w.a0 : w.a0 + w.da * clamp((t - w.te) / (w.tx - w.te), 0, 1));
  // 분기점(수비 대응별 읽기가 갈라지는 시각)에서는 겹침 구간을 끊는다. 그래야 분기점 앞의 위치가
  // 분기점 뒤의 움직임(읽기마다 다르다)에 영향을 받지 않는다. 분기점에서의 각도는 양쪽이 같아 끊김은 없다.
  const splits = play.reads && steps[play.reads.at] ? [steps[play.reads.at].s0] : [];
  const aroundAngle = (key, rel, R, t) => {
    const list = windows.get(key);
    const hit = list?.find((w) => t >= w.te && t <= w.tx);
    if (hit) return angleIn(hit, t);
    const lo = Math.max(0, ...splits.filter((s) => s <= t));
    const split = splits.find((s) => s > t);
    const tEnd = split ?? end;   // 슛이 늦게 끝나면 total + TAIL보다 길다
    const isIn = (s) => { const r = rel(s); return Math.hypot(r.x, r.z) < R; };
    const edge = (tIn, tOut) => {
      for (let i = 0; i < 14; i++) { const m = (tIn + tOut) / 2; if (isIn(m)) tIn = m; else tOut = m; }
      return (tIn + tOut) / 2;
    };
    const ang = (s) => { const r = rel(s); return Math.atan2(r.z, r.x); };
    // 1/60초 격자로 훑어 진입·이탈 칸을 찾고 이분 탐색한다. (더 성긴 격자는 짧은 이탈을 묻는 시각에 따라
    // 다르게 보아, 같은 겹침을 한 구간 또는 두 구간으로 나눠 순간이동을 만들었다.)
    let te = lo;
    for (let g = Math.floor(t / SCAN) * SCAN; g > lo; g -= SCAN) {
      if (!isIn(g)) { te = edge(Math.min(g + SCAN, t), g); break; }
    }
    let tx = tEnd, open = true, lastIn = t;
    for (let g = Math.floor(t / SCAN) * SCAN + SCAN; g < tEnd; g += SCAN) {
      if (!isIn(g)) { tx = edge(Math.max(g - SCAN, t), g); open = false; break; }
      lastIn = g;
    }
    // 마지막 격자 점과 끝 사이에서 빠져나가는 경우도 찾는다. 분기점에서 끊긴 구간은 거기서 닫는다.
    if (open && !isIn(tEnd)) { tx = edge(lastIn, tEnd); open = false; }
    if (open && split !== undefined) { tx = split; open = false; }
    const a0 = ang(te);
    let da = 0;
    if (!open) {
      da = ang(tx) - a0;
      da -= 2 * Math.PI * Math.round(da / (2 * Math.PI));
    }
    const w = { te, tx, a0, da, open };
    if (list) list.push(w); else windows.set(key, [w]);
    return angleIn(w, t);
  };

  // 겹침마다 '원둘레 위치 − 목표 위치'만큼 밀어내고, 그 밀어낸 양을 모두 더한다.
  // 각 항은 겹침 구간의 시작·끝에서 0이므로, 수비가 여러 겹침에 동시에 걸려도 위치가 끊기지 않는다.
  const resolve = (raw, t) => {
    const disp = Object.fromEntries(DEF.map((d) => [d, v2(0, 0)]));
    const push = (d, p) => { disp[d].x += p.x - raw[d].x; disp[d].z += p.z - raw[d].z; };
    // 수비끼리: 두 목표의 중점을 기준으로 서로 반대편에 R_DEF/2씩
    for (let i = 0; i < DEF.length; i++) for (let j = i + 1; j < DEF.length; j++) {
      const a = DEF[i], b = DEF[j];
      if (dist2(raw[a], raw[b]) >= R_DEF) continue;
      const rel = (s) => { const p = rawOf(a, s), q = rawOf(b, s); return v2(p.x - q.x, p.z - q.z); };
      const ang = aroundAngle(`${a}|${b}`, rel, R_DEF, t);
      const mid = lerp2(raw[a], raw[b], 0.5), h = R_DEF / 2;
      push(a, v2(mid.x + Math.cos(ang) * h, mid.z + Math.sin(ang) * h));
      push(b, v2(mid.x - Math.cos(ang) * h, mid.z - Math.sin(ang) * h));
    }
    // 공격수와: 공격수 중심에서 R_OFF 떨어진 원둘레를 따라 돌아간다
    for (const d of DEF) {
      for (const id of OFF) {
        const o = offAt(id, t);
        if (dist2(raw[d], o) >= R_OFF) continue;
        const rel = (s) => { const r = rawOf(d, s), q = offAt(id, s); return v2(r.x - q.x, r.z - q.z); };
        const ang = aroundAngle(`${d}|${id}`, rel, R_OFF, t);
        push(d, v2(o.x + Math.cos(ang) * R_OFF, o.z + Math.sin(ang) * R_OFF));
      }
    }
    return Object.fromEntries(DEF.map((d) => [d, v2(raw[d].x + disp[d].x, raw[d].z + disp[d].z)]));
  };
  const evalDefIn = (k, t) => resolve(evalRaw(k, t), t);

  steps.forEach((st, k) => {
    defSegs[k] = {};
    if (k === 0) {
      defStart[0] = null;
      defStart[0] = evalRaw(0, 0);
    } else {
      defStart[k] = evalRaw(k - 1, steps[k - 1].s1 - 1e-6);
    }
    for (const [d, spec] of Object.entries(st.def || {})) {
      if (spec.path) defSegs[k][d] = makeSegment(defStart[k][d], spec.t ? { path: spec.path, t: spec.t } : spec.path, st.s0, st.dur);
    }
  });

  // ── 전술판 표기(annotation) 데이터 ──
  const notes = steps.map((st, k) => {
    const list = [];
    const screeners = new Set((st.screens || []).map((sc) => sc.by));
    for (const [id, seg] of Object.entries(st.segs)) {
      const mid = (seg.t0 + seg.t1) / 2;
      const kind = screeners.has(id) ? 'screen' : holderAt(mid) === id ? 'dribble' : 'cut';
      const sc = (st.screens || []).find((x) => x.by === id);
      list.push({ kind, who: id, pts: segSamples(seg), face: sc?.face ? toV(sc.face) : null });
    }
    for (const sc of st.screens || []) {
      if (!st.segs[sc.by]) {
        list.push({ kind: 'screenMark', who: sc.by, at: offAt(sc.by, st.s0), face: sc.face ? toV(sc.face) : null });
      }
    }
    for (const b of bsegs) {
      if (b.step !== k) continue;
      if (b.type === 'flight') list.push({ kind: b.kind === 'handoff' ? 'handoff' : 'pass', pts: [b.from, b.to] });
      if (b.type === 'shot') list.push({ kind: 'shot', pts: [v2(b.from.x, b.from.z), BASKET] });
    }
    return list;
  });

  // 단계별로 주목할 선수(움직이거나, 스크린을 걸거나, 공을 다루는 선수)
  const focus = steps.map((st, k) => {
    const f = new Set(Object.keys(st.segs));
    (st.screens || []).forEach((sc) => f.add(sc.by));
    bsegs.forEach((b) => { if (b.step === k) { f.add(b.who); if (b.target) f.add(b.target); } });
    return f;
  });

  // 스크린을 거는 중인지 (시각 효과용)
  const screenWindows = [];
  steps.forEach((st) => {
    for (const sc of st.screens || []) {
      const seg = st.segs[sc.by];
      const t0 = seg ? seg.t1 - 0.15 : st.s0;
      const p = seg ? seg.end : offAt(sc.by, st.s0);
      let face = sc.face ? toV(sc.face) : null;
      if (!face && seg) {
        const a = segSamples(seg).slice(-2);
        const dir = norm2(v2(a[1].x - a[0].x, a[1].z - a[0].z));
        face = v2(p.x + dir.x, p.z + dir.z);
      }
      // hold: 단계가 끝난 뒤에도 스크린 자세를 유지하는 시간(초)
      screenWindows.push({ who: sc.by, t0, t1: (sc.until != null ? st.s0 + sc.until * st.dur : st.s1) + (sc.hold ?? 0.25), pos: p, face });
    }
  });

  return {
    play,
    steps,
    total,
    end,
    notes,
    focus,
    jumps,
    scores,
    bsegs,
    stepIndexAt,
    offAt,
    holderAt,
    ballSegAt,
    guardOf: (d, t) => guards[stepIndexAt(t)][d],
    offense(t) {
      return Object.fromEntries(OFF.map((id) => [id, offAt(id, t)]));
    },
    defense(t) {
      // 끝난 뒤에는 아무도 움직이지 않는다. 범위를 묶어 두면 끝에서 멈춘 화면이 캐시를 키우지 않는다.
      const tt = clamp(t, 0, end);
      return evalDefIn(stepIndexAt(tt), tt);
    },
    // 겹침 구간 캐시의 크기 (성능 진단용)
    windowCount: () => [...windows.values()].reduce((n, list) => n + list.length, 0),
    screenAt(id, t) {
      return screenWindows.find((w) => w.who === id && t >= w.t0 && t <= w.t1) || null;
    },
    jumpY(id, t) {
      let y = 0;
      for (const j of jumps) {
        if (j.who !== id) continue;
        const air = j.kind === 'dunk' ? 0.7 : j.kind === 'catch' ? 0.6 : 0.62;
        const h = j.kind === 'dunk' ? 3.1 : j.kind === 'layup' ? 2.6 : j.kind === 'catch' ? 2.8 : 2.1;
        const t0 = j.kind === 'catch' ? j.t - 0.25 : j.t - air * 0.45;
        if (t >= t0 && t <= t0 + air) y = Math.max(y, h * Math.sin((Math.PI * (t - t0)) / air));
      }
      return y;
    },
    shootingAt(id, t) {
      return jumps.some((j) => j.who === id && j.kind !== 'catch' && t >= j.t - 0.35 && t <= j.t + 0.35);
    },
  };
}

// 공의 3D 위치: 손에 있을 때는 null(장면에서 손 위치로 계산), 공중이면 좌표 반환
export function ballAir(b, t) {
  if (b.type === 'hold') return null;
  if (b.type === 'drop') return dropAt(t - b.t0);
  const u = clamp((t - b.t0) / (b.t1 - b.t0), 0, 1);
  const x = b.from.x + (b.to.x - b.from.x) * u;
  const z = b.from.z + (b.to.z - b.from.z) * u;
  if (b.type === 'shot') {
    const y = b.from.y + (b.to.y - b.from.y) * u + 4 * b.apex * u * (1 - u);
    return { x, y, z, spin: u };
  }
  const d = dist2(b.from, b.to);
  let y;
  if (b.kind === 'bounce') {
    const k = 0.58;
    y = u < k ? 4.4 + (0.39 - 4.4) * (u / k) ** 1.6 : 0.39 + (4.0 - 0.39) * Math.sin(((u - k) / (1 - k)) * Math.PI * 0.5);
  } else if (b.kind === 'lob') {
    y = 5 + (9.6 - 5) * u + 4 * (3.5 + d * 0.06) * u * (1 - u);
  } else if (b.kind === 'skip') {
    y = 5.5 + 4 * (2.4 + d * 0.05) * u * (1 - u);
  } else if (b.kind === 'handoff') {
    y = 4.2;
  } else {
    y = 4.8 + 4 * (0.5 + d * 0.018) * u * (1 - u) - 0.3 * u;
  }
  return { x, y, z, spin: u };
}

// 림을 통과한 공이 그물 아래로 떨어져 튀는 모습
function dropAt(dt) {
  const g = 32;
  let y0 = RIM_Y - 0.2, v = -6, t = dt;
  const x = BASKET.x, z0 = BASKET.z;
  let z = z0;
  // 그물 통과 (0.18초 동안 천천히)
  if (t < 0.18) return { x, y: y0 - 4 * t, z, spin: 0 };
  t -= 0.18;
  y0 -= 0.72;
  z = z0 + Math.min(t, 2) * 1.6;
  // 자유낙하 + 감쇠 바운스
  let y = y0;
  for (let i = 0; i < 6; i++) {
    const disc = v * v + 2 * g * (y - 0.39);
    const tHit = (v + Math.sqrt(Math.max(0, disc))) / g;
    if (t < tHit) return { x, y: y + v * t - 0.5 * g * t * t, z, spin: 0 };
    t -= tHit;
    v = Math.sqrt(Math.max(0, disc)) * 0.55;
    y = 0.39;
  }
  return { x, y: 0.39, z, spin: 0 };
}
