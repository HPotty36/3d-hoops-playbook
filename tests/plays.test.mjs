// 모든 작전 데이터(기본 + 수비 대응별 읽기)를 검사한다: 움직임이 물리적으로 그럴듯한지, 데이터 형식이 맞는지.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { compilePlay, ballAir, OFF, DEF } from '../js/engine.js';
import { PLAYS, SECTIONS } from '../js/plays/index.js';
import { readIds, variant, branchTime } from '../js/reads.js';
import { sampleMotion } from './helpers.mjs';

const ID = /^[a-z0-9-]+$/;
const text = (s) => typeof s === 'string' && s.trim().length > 0;

function assertPhysical(cp, label) {
  const m = sampleMotion(cp);
  assert.equal(m.nan, false, `${label}: NaN position`);
  assert.ok(m.maxOff <= 25, `${label}: offense ${m.maxOff.toFixed(1)} ft/s`);
  assert.ok(m.maxDef <= 38, `${label}: defense ${m.maxDef.toFixed(1)} ft/s at ${m.whereDef}`);
  assert.ok(m.offGap >= 1.8, `${label}: defender inside an attacker: ${m.offGap.toFixed(2)} ft (${m.whereGap})`);
  assert.ok(m.defGap >= 1.35, `${label}: defenders overlap: ${m.defGap.toFixed(2)} ft`);
  for (const s of m.shots) assert.ok(s.pts === 3 ? s.dist >= 22 : s.dist < 23.75, `${label}: ${s.pts}pt from ${s.dist.toFixed(1)} ft`);
}

// ── 움직임 ──
for (const play of PLAYS) {
  for (const id of readIds(play).length ? readIds(play) : [null]) {
    const label = id ? `${play.id} [${id}]` : play.id;
    test(`${label}: motion stays physical`, () => assertPhysical(compilePlay(variant(play, id)), label));
  }
  if (!play.reads) continue;
  test(`${play.id}: every read shares the opening up to the branch point`, () => {
    const base = compilePlay(play);
    const tb = branchTime(play);
    for (const id of readIds(play).slice(1)) {
      const cp = compilePlay(variant(play, id));
      for (let t = 0; t <= tb + 1e-9; t += 1 / 120) {
        const o1 = base.offense(t), o2 = cp.offense(t), d1 = base.defense(t), d2 = cp.defense(t);
        for (const p of OFF) assert.ok(Math.hypot(o1[p].x - o2[p].x, o1[p].z - o2[p].z) < 1e-6, `${id}: ${p} differs at ${t.toFixed(3)}s`);
        for (const p of DEF) assert.ok(Math.hypot(d1[p].x - d2[p].x, d1[p].z - d2[p].z) < 1e-6, `${id}: ${p} differs at ${t.toFixed(3)}s`);
        assert.equal(base.holderAt(t), cp.holderAt(t), `${id}: ball holder differs at ${t.toFixed(3)}s`);
        if (!base.holderAt(t)) {
          const b1 = ballAir(base.ballSegAt(t), t), b2 = ballAir(cp.ballSegAt(t), t);
          assert.ok(Math.hypot(b1.x - b2.x, b1.y - b2.y, b1.z - b2.z) < 1e-6, `${id}: ball differs at ${t.toFixed(3)}s`);
        }
      }
    }
  });
}

// ── 데이터 형식 ──
test('play ids are unique and URL-safe', () => {
  const ids = PLAYS.map((p) => p.id);
  assert.equal(new Set(ids).size, ids.length);
  for (const id of ids) assert.match(id, ID);
});

test('every play belongs to a library section', () => {
  const cats = SECTIONS.flatMap((s) => s.cats);
  for (const p of PLAYS) assert.ok(cats.includes(p.category), `${p.id}: category ${p.category}`);
});

for (const p of PLAYS) {
  test(`${p.id}: Korean and English content line up`, () => {
    assert.equal(p.en.steps.length, p.steps.length, 'steps');
    assert.equal(p.en.counters.length, p.counters.length, 'counters');
    assert.equal(p.en.keys.length, p.keys.length, 'keys');
    const ids = readIds(p);
    for (const c of p.counters) if (c.read) assert.ok(ids.includes(c.read), `counter read ${c.read}`);
    if (!p.reads) return;
    const r = p.reads, e = p.en.reads;
    assert.ok(Number.isInteger(r.at) && r.at >= 1 && r.at < p.steps.length, `reads.at ${r.at}`);
    assert.equal(new Set(ids).size, ids.length, 'read ids unique');
    for (const id of ids) assert.match(id, ID);
    assert.ok(text(r.prompt) && text(e?.prompt), 'prompt');
    assert.ok(text(r.base.label) && text(r.base.why) && text(e.base?.label) && text(e.base?.why), 'base label/why');
    assert.equal(e.options.length, r.options.length, 'options');
    r.options.forEach((o, i) => {
      assert.ok(text(o.label) && text(o.why) && text(e.options[i].label) && text(e.options[i].why), `${o.id}: label/why`);
      assert.ok(o.steps.length >= 1, `${o.id}: steps`);
      assert.equal(e.options[i].steps.length, o.steps.length, `${o.id}: English steps`);
      for (const st of e.options[i].steps) assert.ok(text(st.title) && text(st.text), `${o.id}: English step text`);
    });
  });
}
