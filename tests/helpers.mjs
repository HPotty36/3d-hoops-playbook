// 테스트 공용 도구: 컴파일된 작전을 일정 간격으로 샘플링해 움직임을 검사한다.
import { OFF, DEF, BASKET, dist2 } from '../js/engine.js';

const bad = (p) => !Number.isFinite(p.x) || !Number.isFinite(p.z);

// 최고 속도(ft/s)는 연속한 두 샘플 사이 이동 거리로 잰다.
export function sampleMotion(cp, dt = 1 / 120) {
  let nan = false, maxOff = 0, maxDef = 0, whereDef = '', offGap = Infinity, defGap = Infinity, whereGap = '';
  let prevO = cp.offense(0), prevD = cp.defense(0);
  for (let t = dt; t <= cp.end; t += dt) {
    const o = cp.offense(t), d = cp.defense(t);
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
    }
    prevO = o; prevD = d;
  }
  const shots = cp.bsegs.filter((b) => b.type === 'shot')
    .map((b, i) => ({ pts: cp.scores[i].pts, dist: dist2(b.from, BASKET) }));
  return { nan, maxOff, maxDef, whereDef, offGap, defGap, whereGap, shots };
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
