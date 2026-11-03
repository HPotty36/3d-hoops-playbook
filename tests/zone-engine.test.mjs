// 엔진의 존 모드: 등록하지 않은 작은 작전(1-3-1 공격이 공을 돌린다)으로 존 수비가 표대로 움직이는지 본다.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { compilePlay, DEF } from '../js/engine.js';
import { ZONES } from '../js/zones.js';
import { PLAYS } from '../js/plays/index.js';
import { sampleMotion, threeSecondViolations, passLaneViolations, zoneDeviations } from './helpers.mjs';

// 1-3-1: [1] 탑, [2]·[3] 윙, [4] 하이포스트, [5] 베이스라인. 공은 탑 → 오른쪽 윙 → 오른쪽 코너 → 윙 → 탑 → 왼쪽 윙
const zoneFixture = (defense = { zone: '2-3' }, patch = {}) => ({
  id: 'fx-zone', category: 'zone', ball: 'o1', defense,
  start: { o1: [0, 27], o2: [-17, 21], o3: [17, 21], o4: [-1.5, 17.5], o5: [-12, 3] },
  steps: [
    { dur: 1.8, ball: [{ type: 'pass', to: 'o3', at: 0.7 }] },
    { dur: 2.0, move: { o5: { path: [[0, 2.5], [21.5, 3]], t: [0, 0.55] } }, ball: [{ type: 'pass', to: 'o5', at: 0.75 }] },
    { dur: 1.9, ball: [{ type: 'pass', to: 'o3', at: 0.75 }], ...patch },
    { dur: 1.9, ball: [{ type: 'pass', to: 'o1', at: 0.75 }] },
    { dur: 1.9, ball: [{ type: 'pass', to: 'o2', at: 0.75 }] },
    { dur: 1.8 },
  ],
});

const cp = compilePlay(zoneFixture());

test('zone fixture: motion stays physical', () => {
  const m = sampleMotion(cp);
  assert.equal(m.nan, false);
  assert.ok(m.maxDef <= 38, `defense ${m.maxDef.toFixed(1)} ft/s at ${m.whereDef}`);
  assert.ok(m.offGap >= 1.8, `defender inside an attacker: ${m.offGap.toFixed(2)} ft (${m.whereGap})`);
  assert.ok(m.defGap >= 1.35, `defenders overlap: ${m.defGap.toFixed(2)} ft`);
  assert.equal(m.offFrame, '');
});

test('zone fixture: three seconds and pass lanes hold', () => {
  assert.deepEqual(threeSecondViolations(cp), []);
  assert.deepEqual(passLaneViolations(cp), []);
});

test('zone fixture: zone defenders follow the table', () => {
  assert.deepEqual(zoneDeviations(cp), []);
});

// 오른쪽 윙에서 공을 잡고 0.5초가 지난 뒤: 공 담당(2-3에서는 오른쪽 가드 x2)만 공을 가진 선수를 맡는다
const wingHold = cp.bsegs.find((b) => b.type === 'hold' && b.who === 'o3');

test('zone fixture: only the ball defender guards the holder', () => {
  const t = wingHold.t0 + 0.6;
  assert.equal(cp.guardOf('d2', t), 'o3');
  assert.equal(cp.guardOf('d5', t), null);
  assert.equal(cp.guardOf('d3', t), null);
});

test('zone fixture: a step guard override turns a zone defender into a man defender', () => {
  const g = compilePlay(zoneFixture({ zone: '2-3' }, { def: { d4: { guard: 'o4' } } }));
  const st = g.steps[2];
  for (let t = st.s0; t < st.s1; t += 0.1) assert.equal(g.guardOf('d4', t), 'o4', `${t.toFixed(2)}s`);
  assert.equal(g.guardOf('d4', g.steps[3].s0 + 0.2), null);
});

test('zone fixture: the outline is the zone\'s outline', () => {
  assert.deepEqual(cp.zone, { name: '2-3', outline: ZONES['2-3'].outline });
});

// 존 모드를 넣어도 맨투맨 작전의 수비 위치는 그대로다 (존 모드를 넣기 전에 기록한 값)
test('man plays keep their defense positions', () => {
  const rec = JSON.parse(readFileSync(new URL('./fixtures/man-defense.json', import.meta.url), 'utf8'));
  for (const [id, samples] of Object.entries(rec)) {
    const m = compilePlay(PLAYS.find((p) => p.id === id));
    assert.equal(m.zone, null, `${id}: zone`);
    for (const { t, def } of samples) {
      const d = m.defense(t);
      for (const k of DEF) assert.ok(Math.hypot(d[k].x - def[k].x, d[k].z - def[k].z) < 1e-9, `${id} ${k} @ ${t}s`);
    }
  }
});
