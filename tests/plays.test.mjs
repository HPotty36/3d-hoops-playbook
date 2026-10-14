// 모든 작전 데이터(기본 + 수비 대응별 읽기)를 검사한다: 움직임이 물리적으로 그럴듯한지, 데이터 형식이 맞는지.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { compilePlay, ballAir, OFF, DEF } from '../js/engine.js';
import { PLAYS, SECTIONS } from '../js/plays/index.js';
import { readIds, variant, branchTime } from '../js/reads.js';
import { sampleMotion, peakDefenseSpeed } from './helpers.mjs';

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
    test(`${label}: defenders never twitch (1/960 s)`, () => {
      const p = peakDefenseSpeed(compilePlay(variant(play, id)), 1 / 960);
      assert.ok(p.v <= 38, `${label}: defense ${p.v.toFixed(1)} ft/s at ${p.where}`);
    });
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

// 겹침 구간 캐시가 있어도 위치는 t만의 함수여야 한다: 묻는 순서를 섞어도 같은 결과
test('defense positions do not depend on query order', () => {
  const cases = [['pick-and-roll', 'hedge'], ['spain-pick-and-roll', 'all-switch'], ['floppy', 'trail']];
  for (const [pid, rid] of cases) {
    const play = PLAYS.find((p) => p.id === pid);
    const a = compilePlay(variant(play, rid)), b = compilePlay(variant(play, rid));
    const ts = [];
    for (let t = 0; t <= a.end; t += 1 / 60) ts.push(t);
    const seq = ts.map((t) => a.defense(t));
    let seed = 12345;
    const rnd = () => (seed = (seed * 1103515245 + 12345) % 2 ** 31) / 2 ** 31;
    const order = ts.map((_, i) => i);
    for (let i = order.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [order[i], order[j]] = [order[j], order[i]]; }
    const shuffled = [];
    for (const i of order) shuffled[i] = b.defense(ts[i]);
    ts.forEach((t, i) => {
      for (const d of DEF) {
        const l = Math.hypot(seq[i][d].x - shuffled[i][d].x, seq[i][d].z - shuffled[i][d].z);
        assert.ok(l < 1e-4, `${pid} [${rid}] ${d} differs by ${l.toExponential(2)} ft at ${t.toFixed(3)}s`);
      }
    });
  }
});

// ── 데이터 형식 ──
test('play ids are unique and URL-safe', () => {
  const ids = PLAYS.map((p) => p.id);
  assert.equal(new Set(ids).size, ids.length);
  for (const id of ids) assert.match(id, ID);
});

// 스토어 빌드는 famous(실존 선수·구단 이름)만 지운다. 검색 별칭에 그 이름이 들어가면 앱에 그대로 남는다.
// 영어 famous의 고유명사(대문자로 시작하는 단어)로 검사한다. 한국어는 조사가 붙어 단어 경계를 믿을 수 없어 사람이 확인한다.
test('search aliases contain no names from the famous examples', () => {
  const names = new Set();
  for (const p of PLAYS) {
    // 문장 첫 단어(The, Shooting …)는 고유명사가 아니므로 뺀다
    for (const w of (p.en?.famous || '').match(/(?<!(?:^|[.!?])\s*)\b[A-Z][a-z]{2,}\b/g) || []) names.add(w.toLowerCase());
  }
  const hits = PLAYS.flatMap((p) => (p.aliases || [])
    .filter((a) => a.split(/[\s-]+/).some((w) => names.has(w.toLowerCase())))
    .map((a) => `${p.id}: ${a}`));
  assert.deepEqual(hits, []);
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
