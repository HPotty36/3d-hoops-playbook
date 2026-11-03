// 엔진의 존 모드: 등록하지 않은 작은 작전(1-3-1 공격이 공을 돌린다)으로 존 수비가 표대로 움직이는지 본다.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { compilePlay, DEF, OFF, AREA_R, BASKET } from '../js/engine.js';
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

// 존은 패스를 따라 움직인다: 공이 도착하고 0.5초 뒤에는 각 수비의 자리가 새 앵커의 표 자리까지 거의 다 와 있다
test('zone fixture: the zone moves on the pass', () => {
  const arrive = wingHold.t0, t = arrive + 0.5;
  const table = ZONES['2-3'].at.wingR.spots;
  for (const d of ['d1', 'd3', 'd4', 'd5']) {
    const s = cp.zoneSpotAt(d, t), [x, z] = table[d];
    assert.ok(Math.hypot(s.x - x, s.z - z) < 1.5, `${d} spot is ${Math.hypot(s.x - x, s.z - z).toFixed(2)} ft from its wing spot 0.5 s after the catch`);
  }
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

// ── 매치업 존(area 모드) ──
// 같은 픽스처에 매치업 존을 세우고, 공이 탑으로 돌아오는 단계에서 [2]가 왼쪽 윙에서 뒷선 앞의 틈을 지나 오른쪽 아래 윙까지 컷한다
const cutter = { move: { o2: { path: [[-7, 15], [4, 12.4], [14, 10], [18.6, 10.6]], t: [0.1, 0.9] } } };
const mx = (() => {
  const p = zoneFixture({ zone: 'matchup' });
  p.steps[3] = { ...p.steps[3], ...cutter };
  return compilePlay(p);
})();

test('matchup fixture: motion stays physical', () => {
  const m = sampleMotion(mx);
  assert.equal(m.nan, false);
  assert.ok(m.maxDef <= 38, `defense ${m.maxDef.toFixed(1)} ft/s at ${m.whereDef}`);
  assert.ok(m.offGap >= 1.8, `defender inside an attacker: ${m.offGap.toFixed(2)} ft (${m.whereGap})`);
  assert.ok(m.defGap >= 1.35, `defenders overlap: ${m.defGap.toFixed(2)} ft`);
  assert.deepEqual(threeSecondViolations(mx), []);
  assert.deepEqual(passLaneViolations(mx), []);
});

// 컷하는 [2]가 어떤 수비의 구역(표 자리에서 AREA_R 안)에 혼자 들어와 있으면, 그 수비는 [2]를 막는 맨투맨 자리
// ([2]와 림 사이, 엔진의 자동 수비와 같은 간격) 쪽으로 끌려가 있다: 표 자리보다 그 자리에 가깝다
test('matchup fixture: a defender is drawn toward a cutter in its area', () => {
  const st = mx.steps[3];
  let checked = 0;
  for (let t = st.s0 + 0.3; t < st.s1; t += 1 / 30) {
    const o = mx.offense(t), d = mx.defense(t), c = o.o2;
    for (const id of DEF) {
      const s = mx.zoneSpotAt(id, t);
      if (!s || mx.adjusted(id, t) || mx.guardOf(id, t)) continue;
      const near = OFF.filter((a) => Math.hypot(o[a].x - s.x, o[a].z - s.z) < AREA_R);
      const cs = Math.hypot(c.x - s.x, c.z - s.z);
      if (near.length !== 1 || near[0] !== 'o2' || cs < 3 || cs > AREA_R - 2) continue;
      checked++;
      const dm = Math.hypot(c.x - BASKET.x, c.z - BASKET.z), gap = Math.min(6, Math.max(2.2, dm * 0.2));
      const ms = { x: c.x + ((BASKET.x - c.x) / dm) * gap, z: c.z + ((BASKET.z - c.z) / dm) * gap };
      assert.ok(Math.hypot(d[id].x - ms.x, d[id].z - ms.z) < Math.hypot(s.x - ms.x, s.z - ms.z) - 0.1, `${id} @ ${t.toFixed(2)}s is not drawn toward [2]`);
    }
  }
  assert.ok(checked > 10, `only ${checked} samples had the cutter alone in an area`);
});

test('matchup fixture: zone defenders follow the table (4 ft for area mode)', () => {
  assert.deepEqual(zoneDeviations(mx), []);
});

// ── 존 + 맨투맨(박스 앤 원, 트라이앵글 앤 투) ──
// 에이스 [2]가 왼쪽 블록에서 [4]·[5]의 스크린 두 개를 타고 오른쪽 윙까지 올라가고, 탑의 [1]이 [2]에게 준다
const comboFixture = (defense) => ({
  id: 'fx-combo', category: 'hybrid', ball: 'o1', defense,
  start: { o1: [0, 28], o2: [-7, 4.6], o3: [-18.6, 21.4], o4: [1.6, 9.6], o5: [10, 14.6] },
  steps: [
    { dur: 1.6 },
    {
      dur: 3.6,
      move: { o2: { path: [[-2, 6.8], [5.6, 11.6], [12.4, 17.6], [18.6, 21.4]], t: [0.05, 0.85] } },
      screens: [{ by: 'o4', face: [-1, 8.6], hold: 0.6 }, { by: 'o5', face: [8, 13], hold: 0.6 }],
      ball: [{ type: 'pass', to: 'o2', at: 0.86 }],
    },
    { dur: 2.2, ball: [{ type: 'pass', to: 'o1', at: 0.5 }] },
    { dur: 2.2, ball: [{ type: 'pass', to: 'o3', at: 0.5 }] },
    { dur: 1.8 },
  ],
});
const chasers = { box: { d1: 'o2' }, triangle: { d1: 'o1', d2: 'o2' } };
for (const [zone, man] of Object.entries(chasers)) {
  const c = compilePlay(comboFixture({ zone, man }));
  test(`${zone} fixture: motion stays physical and the rules hold`, () => {
    const m = sampleMotion(c);
    assert.equal(m.nan, false);
    assert.ok(m.maxDef <= 38, `defense ${m.maxDef.toFixed(1)} ft/s at ${m.whereDef}`);
    assert.ok(m.offGap >= 1.8, `defender inside an attacker: ${m.offGap.toFixed(2)} ft (${m.whereGap})`);
    assert.ok(m.defGap >= 1.35, `defenders overlap: ${m.defGap.toFixed(2)} ft`);
    assert.deepEqual(threeSecondViolations(c), []);
    assert.deepEqual(passLaneViolations(c), []);
  });
  test(`${zone} fixture: the chasers stay with their men`, () => {
    for (let t = 0; t <= c.end; t += 1 / 30) {
      const d = c.defense(t), o = c.offense(t);
      for (const [id, a] of Object.entries(man)) {
        if (c.adjusted(id, t)) continue;
        assert.equal(c.guardOf(id, t), a, `${id} guards ${a}`);
        const g = Math.hypot(d[id].x - o[a].x, d[id].z - o[a].z);
        assert.ok(g <= 8, `${id} is ${g.toFixed(1)} ft from ${a} @ ${t.toFixed(2)}s`);
      }
    }
  });
  // 추격조는 공 없는 에이스 앞(공 쪽)에 팔 길이 안으로 붙어 패스 길을 막는다(디나이). 첫 단계: 에이스가 가만히 서 있다
  test(`${zone} fixture: chasers deny their stars off the ball`, () => {
    for (let t = 0.5; t < c.steps[0].s1; t += 0.1) {
      const d = c.defense(t), o = c.offense(t), h = c.holderAt(t), ball = o[h];
      for (const [id, a] of Object.entries(man)) {
        if (a === h) continue;
        const s = o[a], g = Math.hypot(d[id].x - s.x, d[id].z - s.z);
        const ahead = Math.hypot(s.x - ball.x, s.z - ball.z) - Math.hypot(d[id].x - ball.x, d[id].z - ball.z);
        assert.ok(g <= 3.5 && ahead >= 1.5, `${id} is ${g.toFixed(1)} ft from ${a} and only ${ahead.toFixed(1)} ft nearer the ball @ ${t.toFixed(2)}s`);
      }
    }
  });

  test(`${zone} fixture: the zone part follows its table and the outline leaves out the chasers`, () => {
    assert.deepEqual(zoneDeviations(c), []);
    assert.deepEqual(c.zone.outline, ZONES[zone].outline);
    for (const id of Object.keys(man)) assert.ok(!c.zone.outline.includes(id), `${id} in the outline`);
  });
}
