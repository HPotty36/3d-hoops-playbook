// 테스트 공용 도구: 컴파일된 작전을 일정 간격으로 샘플링해 움직임을 검사한다.
import { OFF, DEF, BASKET, dist2 } from '../js/engine.js';

const bad = (p) => !Number.isFinite(p.x) || !Number.isFinite(p.z);

// 기본 카메라(코치)가 데스크톱 화면(16:10)에서 선수 전신을 담는 범위. 1440×900에서 잰 값:
// 하프라인 쪽으로 z 36까지는 코트 폭 전체, z 40까지는 가운데(|x| ≤ 12)만 보인다. 바닥 링이 잘리지 않게 1.5 ft 여유를 둔다.
// 3점 라인(court.js와 같은 모양: 코너 22ft 직선 + 23.75ft 아크) 바깥으로 얼마나 떨어져 있는지. 안쪽이면 음수.
const ARC_Z = BASKET.z + Math.sqrt(23.75 ** 2 - 22 ** 2);
export const beyondArc = (p) => (p.z <= ARC_Z ? Math.abs(p.x) - 22 : dist2(p, BASKET) - 23.75);

export const inCoachFrame = (p) => p.z <= 36 || (p.z <= 38.5 && Math.abs(p.x) <= 12);

// 최고 속도(ft/s)는 연속한 두 샘플 사이 이동 거리로 잰다.
export function sampleMotion(cp, dt = 1 / 120) {
  let nan = false, maxOff = 0, maxDef = 0, whereDef = '', offGap = Infinity, defGap = Infinity, whereGap = '';
  let attGap = Infinity, whereAtt = '', offFrame = '';
  let prevO = cp.offense(0), prevD = cp.defense(0);
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
