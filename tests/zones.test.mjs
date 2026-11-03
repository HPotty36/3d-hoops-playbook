// 존 수비 표(js/zones.js): 모든 존에 대해, 자리가 코트 안이고 공 담당이 하나이며 앵커 사이가 끊기지 않는지 본다.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { ANCHORS, ZONES, zoneSpots } from '../js/zones.js';
import { inCoachFrame } from './helpers.mjs';

const MIRRORS = { wingL: 'wingR', cornerL: 'cornerR', blockL: 'blockR' };

for (const [name, z] of Object.entries(ZONES)) {
  test(`${name} zone: every anchor is defined, on the court and in frame`, () => {
    for (const a of Object.keys(ANCHORS)) {
      const at = z.at[a];
      assert.ok(at, `${a} missing`);
      assert.deepEqual(Object.keys(at.spots).sort(), [...z.members].sort(), `${a}: spots cover the members`);
      for (const [d, [x, zz]] of Object.entries(at.spots)) {
        assert.ok(zz >= 0 && Math.abs(x) <= 25, `${a} ${d} (${x}, ${zz}) off the court`);
        assert.ok(inCoachFrame({ x, z: zz }), `${a} ${d} (${x}, ${zz}) out of frame`);
      }
    }
  });

  test(`${name} zone: each anchor has exactly one ball defender, and it is a member`, () => {
    for (const a of Object.keys(ANCHORS)) assert.ok(z.members.includes(z.at[a].ball), `${a}: ball ${z.at[a].ball}`);
  });

  test(`${name} zone: zoneSpots returns the table at each anchor`, () => {
    for (const [a, [ax, az]] of Object.entries(ANCHORS)) {
      const r = zoneSpots(name, { x: ax, z: az });
      for (const d of z.members) {
        const [x, zz] = z.at[a].spots[d];
        assert.ok(Math.hypot(r.spots[d].x - x, r.spots[d].z - zz) < 1e-9, `${a} ${d}`);
      }
      assert.equal(r.ballW[z.at[a].ball], 1, `${a}: ball weight`);
    }
  });

  test(`${name} zone: spots move smoothly with the ball and ball weights sum to 1`, () => {
    let worst = { l: 0 };
    for (let x = -24; x <= 24; x += 0.5) {
      for (let zz = 0; zz <= 32; zz += 0.5) {
        const a = zoneSpots(name, { x, z: zz });
        const sum = Object.values(a.ballW).reduce((s, w) => s + w, 0);
        assert.ok(Math.abs(sum - 1) < 1e-9, `ballW sums to ${sum} at (${x}, ${zz})`);
        for (const [nx, nz] of [[x + 0.5, zz], [x, zz + 0.5]]) {
          const b = zoneSpots(name, { x: nx, z: nz });
          for (const d of z.members) {
            const l = Math.hypot(a.spots[d].x - b.spots[d].x, a.spots[d].z - b.spots[d].z);
            if (l > worst.l) worst = { l, d, at: `(${x}, ${zz})` };
          }
        }
      }
    }
    assert.ok(worst.l <= 1.5, `${worst.d} moves ${worst.l.toFixed(2)} ft for a 0.5 ft ball move at ${worst.at}`);
  });

  test(`${name} zone: the outline names each member once`, () => {
    assert.deepEqual([...z.outline].sort(), [...z.members].sort());
  });

  test(`${name} zone: right-side anchors mirror the left side`, () => {
    for (const [l, r] of Object.entries(MIRRORS)) {
      const L = z.at[l], R = z.at[r];
      const swap = (d) => z.swap[d] ?? d;
      assert.equal(R.ball, swap(L.ball), `${r}: ball`);
      for (const [d, [x, zz]] of Object.entries(L.spots)) assert.deepEqual(R.spots[swap(d)], [-x, zz], `${r} ${swap(d)}`);
    }
  });
}

test('zone tables cover the 2-3 and 3-2 zones', () => {
  assert.ok(ZONES['2-3'] && ZONES['3-2']);
  assert.deepEqual(ZONES['2-3'].members, ['d1', 'd2', 'd3', 'd4', 'd5']);
  assert.deepEqual(ZONES['3-2'].members, ['d1', 'd2', 'd3', 'd4', 'd5']);
});
