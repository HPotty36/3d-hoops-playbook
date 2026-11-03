// 모든 작전에 적용하는 두 규칙(수비 3초, 패스 길)의 검사 도구를, 손으로 만든 작은 장면으로 먼저 확인한다.
// 장면(cp 대용)은 offense·defense·offAt·bsegs·end만 있으면 된다.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { threeSecondViolations, passLaneViolations } from './helpers.mjs';

const v2 = (x, z) => ({ x, z });
// 기본 자리: 모두 레인 밖, 서로 멀리
const OFF0 = { o1: v2(0, 30), o2: v2(-20, 25), o3: v2(20, 25), o4: v2(-22, 3), o5: v2(22, 3) };
const DEF0 = { d1: v2(-15, 30), d2: v2(15, 30), d3: v2(-20, 15), d4: v2(20, 15), d5: v2(0, 33) };

// off·def: 선수 id → (t → 위치) 함수 또는 고정 위치
const scene = ({ off = {}, def = {}, bsegs, end = 6 }) => {
  const at = (spec, t) => (typeof spec === 'function' ? spec(t) : spec);
  const offense = (t) => Object.fromEntries(Object.entries({ ...OFF0, ...off }).map(([k, s]) => [k, at(s, t)]));
  return {
    end,
    bsegs: bsegs || [{ type: 'hold', who: 'o1', t0: 0, t1: Infinity }],
    offense,
    offAt: (id, t) => offense(t)[id],
    defense: (t) => Object.fromEntries(Object.entries({ ...DEF0, ...def }).map(([k, s]) => [k, at(s, t)])),
  };
};

// ── 수비 3초 ──
test('three seconds: 4 s alone in the lane is a violation', () => {
  const cp = scene({ def: { d5: (t) => (t < 4 ? v2(0, 10) : v2(12, 10)) } });
  const v = threeSecondViolations(cp);
  assert.equal(v.length, 1, JSON.stringify(v));
  assert.match(v[0], /d5/);
});

test('three seconds: guarding someone within arm\'s length is allowed', () => {
  const cp = scene({ def: { d5: (t) => (t < 4 ? v2(0, 10) : v2(12, 10)) }, off: { o5: v2(2.5, 10) } });
  assert.deepEqual(threeSecondViolations(cp), []);
});

test('three seconds: stepping out resets the count', () => {
  const d5 = (t) => (t < 2.5 || t >= 3 ? v2(0, 10) : v2(9, 10));
  assert.deepEqual(threeSecondViolations(scene({ def: { d5 }, end: 5.5 })), []);
});

test('three seconds: the count stops at the first shot', () => {
  const bsegs = [
    { type: 'hold', who: 'o1', t0: 0, t1: 3 },
    { type: 'shot', who: 'o1', t0: 3, t1: 4 },
    { type: 'drop', t0: 4, t1: Infinity },
  ];
  const cp = scene({ def: { d5: (t) => (t < 2 ? v2(12, 10) : v2(0, 10)) }, bsegs, end: 8 });
  assert.deepEqual(threeSecondViolations(cp), []);
});

test('three seconds: just above the free-throw line is outside the lane', () => {
  assert.deepEqual(threeSecondViolations(scene({ def: { d5: v2(0, 19.5) } })), []);
});

// ── 패스 길 ──
const flight = (kind, from, to, t0 = 1, t1 = 1.3) => ({ type: 'flight', kind, who: 'o1', target: 'o2', t0, t1, from, to });
const passScene = (b, def) => scene({
  off: { o1: b.from, o2: b.to, o3: v2(20, 35), o4: v2(-22, 3), o5: v2(22, 3) },
  def,
  bsegs: [{ type: 'hold', who: 'o1', t0: 0, t1: b.t0 }, b, { type: 'hold', who: 'o2', t0: b.t1, t1: Infinity }],
});

test('pass lanes: a chest pass through a defender is a violation', () => {
  const v = passLaneViolations(passScene(flight('pass', v2(0, 25), v2(0, 12)), { d3: v2(0.5, 18) }));
  assert.equal(v.length, 1, JSON.stringify(v));
  assert.match(v[0], /d3/);
});

test('pass lanes: a pass 1.6 ft beside a defender is clean', () => {
  assert.deepEqual(passLaneViolations(passScene(flight('pass', v2(0, 25), v2(0, 12)), { d3: v2(1.6, 18) })), []);
});

test('pass lanes: a skip pass over a defender is clean', () => {
  assert.deepEqual(passLaneViolations(passScene(flight('skip', v2(-20, 22), v2(20, 22), 1, 1.95), { d5: v2(0, 22) })), []);
});

test('pass lanes: handoffs are exempt', () => {
  assert.deepEqual(passLaneViolations(passScene(flight('handoff', v2(0, 25), v2(0, 22), 1, 1.22), { d3: v2(0, 23.5) })), []);
});

test('pass lanes: the passer\'s own defender counts too', () => {
  const v = passLaneViolations(passScene(flight('pass', v2(0, 25), v2(0, 12)), { d1: v2(0, 22.5) }));
  assert.equal(v.length, 1, JSON.stringify(v));
  assert.match(v[0], /d1/);
});
