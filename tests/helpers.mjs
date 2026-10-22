// 테스트 공용 도구: 컴파일된 작전을 일정 간격으로 샘플링해 움직임을 검사한다.
import { OFF, DEF, BASKET, dist2 } from '../js/engine.js';
import { isInbound, clockAt } from '../js/clock.js';

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
  for (let t = 0; t <= cp.total; t += 1 / 60) {
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
