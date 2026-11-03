// 테스트 공용 도구: 컴파일된 작전을 일정 간격으로 샘플링해 움직임을 검사한다.
import { OFF, DEF, BASKET, dist2, ballAir } from '../js/engine.js';
import { isInbound, clockAt } from '../js/clock.js';
import { ANCHORS, ZONES } from '../js/zones.js';

const bad = (p) => !Number.isFinite(p.x) || !Number.isFinite(p.z);

// 3점 라인(court.js와 같은 모양: 코너 22ft 직선 + 23.75ft 아크) 바깥으로 얼마나 떨어져 있는지. 안쪽이면 음수.
const ARC_Z = BASKET.z + Math.sqrt(23.75 ** 2 - 22 ** 2);
export const beyondArc = (p) => (p.z <= ARC_Z ? Math.abs(p.x) - 22 : dist2(p, BASKET) - 23.75);

// 기본 카메라(코치)가 데스크톱 화면(16:10)에서 선수 전신을 담는 범위. 1440×900에서 잰 값:
// 하프라인 쪽으로 z 36까지는 코트 폭 전체, z 40까지는 가운데(|x| ≤ 12)만 보인다. 바닥 링이 잘리지 않게 1.5 ft 여유를 둔다.
// 인바운드 자리: 엔드라인 뒤 2.5 ft까지, 왼쪽 사이드라인 밖은 z 20까지. 오른쪽 사이드라인 밖은 중계 카메라에서 잘린다.
export const inCoachFrame = (p) => p.z >= -2.5 && p.x <= 25 && (p.x >= -25 || (p.x >= -26.6 && p.z <= 20))
  && (p.z <= 36 || (p.z <= 38.5 && Math.abs(p.x) <= 12));

const outOfBounds = (p) => Math.abs(p.x) > 25 || p.z < 0;
const at = (p) => `(${p.x.toFixed(1)}, ${p.z.toFixed(1)})`;

// 특수 상황 규칙. 어긴 규칙마다 한 줄씩 돌려준다(같은 선수의 같은 위반은 처음 한 번만):
// 인바운드 패스는 5초 안에, 코트 밖에는 인바운더만(패스 뒤 1초까지), 오른쪽 사이드라인은 아무도 쓰지 않는다,
// 샷 클락 안에 슛, 막판 작전은 버저 전에 슛하고 0.3초 미만에 잡으면 림 앞 마무리만.
export function situationViolations(play, cp) {
  const out = [];
  const seen = new Set();
  const once = (key, msg) => { if (!seen.has(key)) { seen.add(key); out.push(msg); } };
  const inbound = isInbound(play);
  const first = cp.bsegs.find((b) => b.type !== 'hold');
  const release = inbound && first?.type === 'flight' ? first.t0 : null;
  if (inbound) {
    if (release == null) out.push(`${play.ball} starts out of bounds but never passes the ball in`);
    else if (release > 5) out.push(`inbound pass released at ${release.toFixed(2)}s (5 s limit)`);
  }
  // 인바운드 자리: 엔드라인 뒤(z −2~−1, |x| 4~10) 또는 왼쪽 사이드라인 바로 밖(x −25.9~−25.4, z 16~20).
  // 휴대폰의 코치 카메라는 코트 폭만큼만 보여서, 사이드라인 인바운더는 선 바로 밖(x ≈ −25.6)에 서야 몸이 다 보인다.
  // 인바운더가 선 위에 서면 인바운드로 보지 않아 위 규칙이 모두 건너뛰어지므로, 분류로도 확인한다
  const [sx, sz] = play.start[play.ball];
  const atBlob = sz >= -2 && sz <= -1 && Math.abs(sx) >= 4 && Math.abs(sx) <= 10;
  const atSlob = sx >= -25.9 && sx <= -25.4 && sz >= 16 && sz <= 20;
  if (play.category === 'blob' && !atBlob) out.push(`${play.ball} must inbound from behind the end line (z ≈ −1.5, |x| 4–10), not (${sx}, ${sz})`);
  else if (play.category === 'slob' && !atSlob) out.push(`${play.ball} must inbound from outside the left sideline (x ≈ −25.6, z ≈ 18), not (${sx}, ${sz})`);
  else if (inbound && !atBlob && !atSlob) out.push(`${play.ball} inbounds from (${sx}, ${sz}), which is neither inbound spot`);
  // 슛 뒤 여유 시간(cp.end까지)에도 수비는 움직이므로 끝까지 본다
  for (let t = 0; t <= cp.end; t += 1 / 60) {
    for (const [id, p] of [...Object.entries(cp.offense(t)), ...Object.entries(cp.defense(t))]) {
      if (p.x > 25) once(`r-${id}`, `${id} uses the right sideline ${at(p)} @ ${t.toFixed(2)}s`);
      else if (outOfBounds(p) && !(inbound && id === play.ball && (release == null || t <= release + 1))) {
        once(`o-${id}`, `${id} is out of bounds ${at(p)} @ ${t.toFixed(2)}s`);
      }
    }
  }
  if (!play.situation) return out;
  const shots = cp.bsegs.filter((b) => b.type === 'shot');
  for (const b of shots) {
    const c = clockAt(play, cp, b.t0);
    if (c.shot != null && c.shot <= 0) out.push(`shot released after the shot clock ran out @ ${b.t0.toFixed(2)}s`);
  }
  const last = shots.at(-1);
  if (play.category === 'late' && last) {
    if (clockAt(play, cp, last.t0).game <= 0) out.push(`last shot released after the buzzer @ ${last.t0.toFixed(2)}s`);
    else {
      // 슛하는 선수가 마지막으로 공을 잡은 순간의 시계
      const left = clockAt(play, cp, cp.bsegs[cp.bsegs.indexOf(last) - 1].t0).game;
      if (left < 0.3 && last.kind === 'jumper') {
        out.push(`caught with ${left.toFixed(2)}s left, so only a finish at the rim counts (0.3 s rule), but shot a ${dist2(last.from, BASKET).toFixed(1)} ft jumper`);
      }
    }
  }
  return out;
}

// 최고 속도(ft/s)는 연속한 두 샘플 사이 이동 거리로 잰다.
export function sampleMotion(cp, dt = 1 / 120) {
  let nan = false, maxOff = 0, maxDef = 0, whereDef = '', offGap = Infinity, defGap = Infinity, whereGap = '';
  let attGap = Infinity, whereAtt = '', offFrame = '';
  let prevO = cp.offense(0), prevD = cp.defense(0);
  // 화면 밖 검사는 첫 장면(t = 0)부터 한다
  for (const [id, p] of [...Object.entries(prevO), ...Object.entries(prevD)]) {
    if (!offFrame && !inCoachFrame(p)) offFrame = `${id} (${p.x.toFixed(1)}, ${p.z.toFixed(1)}) @ 0.00s`;
  }
  for (let t = dt; t <= cp.end; t += dt) {
    const o = cp.offense(t), d = cp.defense(t);
    for (const [id, p] of [...Object.entries(o), ...Object.entries(d)]) {
      if (!offFrame && !inCoachFrame(p)) offFrame = `${id} (${p.x.toFixed(1)}, ${p.z.toFixed(1)}) @ ${t.toFixed(2)}s`;
    }
    for (const id of OFF) {
      if (bad(o[id])) nan = true;
      maxOff = Math.max(maxOff, dist2(o[id], prevO[id]) / dt);
    }
    for (const id of DEF) {
      if (bad(d[id])) nan = true;
      const v = dist2(d[id], prevD[id]) / dt;
      if (v > maxDef) { maxDef = v; whereDef = `${id} @ ${t.toFixed(3)}s`; }
    }
    // 겹침: 공격수와 수비수, 수비수끼리의 최소 간격 (슛 이후 여유 시간은 제외)
    if (t <= cp.total) {
      for (const a of DEF) {
        for (const b of OFF) {
          const l = dist2(d[a], o[b]);
          if (l < offGap) { offGap = l; whereGap = `${a}-${b} @ ${t.toFixed(3)}s`; }
        }
        for (const b of DEF) if (a < b) defGap = Math.min(defGap, dist2(d[a], d[b]));
      }
      for (const a of OFF) {
        for (const b of OFF) {
          if (a >= b) continue;
          const l = dist2(o[a], o[b]);
          if (l < attGap) { attGap = l; whereAtt = `${a}-${b} @ ${t.toFixed(3)}s`; }
        }
      }
    }
    prevO = o; prevD = d;
  }
  // 슛: 거리와, 공이 손을 떠나는 순간 가장 가까운 수비까지의 거리
  const shots = cp.bsegs.filter((b) => b.type === 'shot').map((b, i) => {
    const d = cp.defense(b.t0), p = cp.offAt(b.who, b.t0);
    return { pts: cp.scores[i].pts, dist: dist2(b.from, BASKET), beyond: beyondArc(b.from), near: Math.min(...DEF.map((k) => dist2(d[k], p))), at: b.t0 };
  });
  // 핸드오프: 공을 건네는 순간 두 사람 사이 거리
  const handoffs = cp.bsegs.filter((b) => b.type === 'flight' && b.kind === 'handoff')
    .map((b) => ({ who: b.who, to: b.target, at: b.t0, gap: dist2(cp.offAt(b.who, b.t0), cp.offAt(b.target, b.t0)) }));
  return { nan, maxOff, maxDef, whereDef, offGap, defGap, whereGap, attGap, whereAtt, shots, handoffs, offFrame };
}

// 수비 3초(프로 규칙): 레인(|x| ≤ 8, 0 ≤ z ≤ 19) 안에서 누구도 팔 길이(3.5 ft) 안에 두지 않은 채
// 3.0초를 넘게 머물면 위반이다. 레인을 나가거나 누군가를 막으면 다시 센다. 첫 슛이 손을 떠나면 세지 않는다.
const LANE_X = 8, LANE_Z = 19, GUARD = 3.5, D3S_LIMIT = 3;
export const inLane = (p) => Math.abs(p.x) <= LANE_X && p.z >= 0 && p.z <= LANE_Z;
export function threeSecondViolations(cp) {
  const out = [];
  const dt = 1 / 60;
  const shot = cp.bsegs.find((b) => b.type === 'shot');
  const stop = shot ? shot.t0 : cp.end;
  const runs = Object.fromEntries(DEF.map((d) => [d, null]));
  const close = (d) => {
    const r = runs[d];
    if (r && r.len > D3S_LIMIT) out.push(`${d} stays in the lane unguarded for ${r.len.toFixed(2)}s from ${r.t0.toFixed(2)}s`);
    runs[d] = null;
  };
  for (let i = 0; i * dt < stop; i++) {
    const t = i * dt, o = cp.offense(t), d = cp.defense(t);
    for (const id of DEF) {
      const p = d[id];
      const guarding = OFF.some((k) => Math.hypot(o[k].x - p.x, o[k].z - p.z) <= GUARD);
      if (!inLane(p) || guarding) { close(id); continue; }
      if (!runs[id]) runs[id] = { t0: t, len: 0 };
      runs[id].len = t - runs[id].t0;
    }
  }
  for (const id of DEF) close(id);
  return out;
}

// 패스 길: 날아가는 공이 수비 몸통(반경 1.4 ft)을 지나면 안 된다. 공이 7.5 ft 아래에 있는 동안,
// 손을 떠나는 순간부터 받을 때까지 모두 본다. 패스하는 선수를 막는 수비도 포함한다(공은 그 옆으로 나가야 한다).
// 같은 편 몸통은 예전 기준 그대로: 패스한 선수·받는 선수는 빼고, 손을 떠난 직후(12%)와 8 ft 위는 보지 않으며 0.9 ft.
// 핸드오프는 손에서 손으로 건네므로 뺀다.
const BODY = 1.4, CLEAR_Y = 7.5;
export function passLaneViolations(cp) {
  const out = [];
  for (const b of cp.bsegs) {
    if (b.type !== 'flight' || b.kind === 'handoff') continue;
    let near = { g: Infinity }, mate = { g: Infinity };
    for (let i = 0; i <= 100; i++) {
      const u = i / 100;
      const t = b.t0 + u * (b.t1 - b.t0);
      const ball = ballAir(b, t);
      if (ball.y < CLEAR_Y) {
        const d = cp.defense(t);
        for (const id of DEF) {
          const g = Math.hypot(d[id].x - ball.x, d[id].z - ball.z);
          if (g < near.g) near = { g, id, t };
        }
      }
      if (u < 0.12 || u > 0.99 || ball.y > 8) continue;
      for (const id of OFF) {
        if (id === b.who || id === b.target) continue;
        const p = cp.offAt(id, t), g = Math.hypot(p.x - ball.x, p.z - ball.z);
        if (g < mate.g) mate = { g, id, t };
      }
    }
    const hit = near.g < BODY ? near : mate.g < 0.9 ? mate : null;
    if (hit) out.push(`${b.who}→${b.target} ${b.kind} passes ${hit.g.toFixed(2)} ft from ${hit.id} @ ${hit.t.toFixed(2)}s`);
  }
  return out;
}

// 수비만 촘촘하게 샘플링해 한 프레임짜리 튐(1/120초 간격에서는 안 보이는)을 잡는다
export function peakDefenseSpeed(cp, dt) {
  let v = 0, where = '';
  let prev = cp.defense(0);
  for (let t = dt; t <= cp.end; t += dt) {
    const d = cp.defense(t);
    for (const id of DEF) {
      const s = dist2(d[id], prev[id]) / dt;
      if (s > v) { v = s; where = `${id} @ ${t.toFixed(4)}s`; }
    }
    prev = d;
  }
  return { v, where };
}

// 존 수비가 표대로 움직이는지: 공을 가진 선수가 어느 앵커 2 ft 안에 0.8초 넘게 서 있는 동안,
// 규칙(3초·패스 길) 때문에 비켜 서 있지 않고 그 단계에서 따로 지시받지 않은 수비만 본다.
// 존 수비는 표의 자리 3 ft 안(매치업 존처럼 구역 안의 공격수에게 끌려가는 area 모드는 4 ft, 공 담당은 공을 가진 선수 4 ft 안),
// 맨투맨 수비는 자기 선수 8 ft 안(혼합 수비의 추격조가 스크린 두 개를 타는 에이스를 쫓으면 7 ft 남짓 뒤처진다).
export function zoneDeviations(cp) {
  const out = [];
  if (!cp.zone) return out;
  const seen = new Set();
  const once = (key, msg) => { if (!seen.has(key)) { seen.add(key); out.push(msg); } };
  const members = ZONES[cp.zone.name].members;
  const tol = ZONES[cp.zone.name].mode === 'area' ? 4 : 3;
  const man = cp.play.defense?.man ?? {};
  let since = null, anchor = null;
  for (let t = 0; t <= cp.end; t += 1 / 60) {
    const h = cp.holderAt(t);
    const p = h ? cp.offAt(h, t) : null;
    const a = p && Object.entries(ANCHORS).find(([, [x, z]]) => Math.hypot(p.x - x, p.z - z) <= 2)?.[0];
    if (!a) { since = null; anchor = null; continue; }
    if (a !== anchor || since === null) { since = t; anchor = a; }
    if (t - since < 0.8) continue;
    const d = cp.defense(t);
    const k = cp.stepIndexAt(t);
    const ballD = ZONES[cp.zone.name].at[a].ball;
    for (const id of DEF) {
      if (cp.adjusted(id, t) || cp.steps[k].def?.[id]) continue;
      const q = d[id];
      if (members.includes(id) && !man[id]) {
        // 에이스가 공을 가지면 추격조가 막으므로, 표의 공 담당도 제자리를 지킨다
        if (id === ballD && !Object.values(man).includes(h)) {
          const g = dist2(q, p);
          if (g > 4) once(`${id}-${a}-b`, `${id} is ${g.toFixed(1)} ft from the ball at ${a} @ ${t.toFixed(2)}s`);
        } else {
          const s = cp.zoneSpotAt(id, t), g = dist2(q, s);
          if (g > tol) once(`${id}-${a}`, `${id} is ${g.toFixed(1)} ft from its ${a} spot @ ${t.toFixed(2)}s`);
        }
      } else {
        const m = cp.offAt(cp.guardOf(id, t), t), g = dist2(q, m);
        if (g > 8) once(`${id}-${a}-m`, `${id} is ${g.toFixed(1)} ft from its man @ ${t.toFixed(2)}s`);
      }
    }
  }
  return out;
}
