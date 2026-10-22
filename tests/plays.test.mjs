// 모든 작전 데이터(기본 + 수비 대응별 읽기)를 검사한다: 움직임이 물리적으로 그럴듯한지, 데이터 형식이 맞는지.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { compilePlay, ballAir, OFF, DEF } from '../js/engine.js';
import { PLAYS, SECTIONS } from '../js/plays/index.js';
import { readIds, variant, branchTime } from '../js/reads.js';
import { sampleMotion, peakDefenseSpeed, situationViolations, inCoachFrame } from './helpers.mjs';
import { LANGS, hasLabel } from '../js/i18n.js';

const ID = /^[a-z0-9-]+$/;
const text = (s) => typeof s === 'string' && s.trim().length > 0;

function assertPhysical(cp, label) {
  const m = sampleMotion(cp);
  assert.equal(m.nan, false, `${label}: NaN position`);
  assert.ok(m.maxOff <= 25, `${label}: offense ${m.maxOff.toFixed(1)} ft/s`);
  assert.ok(m.maxDef <= 38, `${label}: defense ${m.maxDef.toFixed(1)} ft/s at ${m.whereDef}`);
  assert.ok(m.offGap >= 1.8, `${label}: defender inside an attacker: ${m.offGap.toFixed(2)} ft (${m.whereGap})`);
  assert.ok(m.defGap >= 1.35, `${label}: defenders overlap: ${m.defGap.toFixed(2)} ft`);
  // 3점은 그려진 라인에서 반 발(0.5 ft) 이상 바깥, 2점은 라인 안쪽에서 던진다
  for (const s of m.shots) assert.ok(s.pts === 3 ? s.beyond >= 0.5 : s.beyond < 0, `${label}: ${s.pts}pt released ${s.beyond.toFixed(2)} ft from the 3-point line @ ${s.at.toFixed(2)}s`);
  // 패스는 받는 사람이 다음 동작(패스·슛)을 하기 전에 도착해야 한다. 아니면 공의 위치가 거꾸로 튄다.
  for (const [i, b] of cp.bsegs.entries()) {
    if (b.type === 'hold' && i > 0 && b.t1 !== Infinity) assert.ok(b.t1 - b.t0 >= 0.08, `${label}: ${b.who} lets go ${(b.t1 - b.t0).toFixed(2)}s after the catch @ ${b.t0.toFixed(2)}s`);
  }
  assert.equal(m.offFrame, '', `${label}: a player leaves the coach camera: ${m.offFrame}`);
  assert.ok(m.attGap >= 1.35, `${label}: attackers overlap: ${m.attGap.toFixed(2)} ft (${m.whereAtt})`);
  // 핸드오프는 손에서 손으로: 몇 걸음 떨어져 던지면 건네는 사람의 몸이 스크린이 되지 못한다
  for (const h of m.handoffs) assert.ok(h.gap <= 4, `${label}: ${h.who}→${h.to} handoff from ${h.gap.toFixed(1)} ft apart @ ${h.at.toFixed(2)}s`);
  // 핸드오프하는 선수가 같은 단계에서 스크린도 걸면, 스크린 표시는 핸드오프 자리에 있어야 한다
  // (엔진은 스크린을 그 단계 움직임의 끝점에 놓으므로, 건넨 뒤 굴러가는 움직임까지 한 경로로 쓰면 엉뚱한 곳에 그려진다)
  for (const h of cp.bsegs.filter((b) => b.type === 'flight' && b.kind === 'handoff')) {
    const st = cp.steps[h.step];
    for (let t = st.s0; t <= st.s1 + 0.3; t += 0.05) {
      const w = cp.screenAt(h.who, t);
      if (!w || w.t0 < st.s0 - 1e-9 || w.t0 > st.s1) continue;
      const g = Math.hypot(w.pos.x - h.from.x, w.pos.z - h.from.z);
      assert.ok(g <= 4, `${label}: ${h.who}'s screen is drawn ${g.toFixed(1)} ft from the handoff @ ${h.t0.toFixed(2)}s`);
      break;
    }
  }
  // 스크린이 막는 수비(on)를 적어 둔 스크린은, 스크린이 서 있는 동안 그 수비가 실제로 스크리너에게 닿아야 한다
  for (const st of cp.steps) {
    for (const sc of st.screens || []) {
      if (!sc.on) continue;
      let w = null;
      for (let t = st.s0; t <= st.s1 && !w; t += 0.02) {
        const x = cp.screenAt(sc.by, t);
        if (x && x.t0 >= st.s0 - 1e-9 && x.t0 <= st.s1) w = x;
      }
      assert.ok(w, `${label}: no screen window for ${sc.by}`);
      let near = Infinity;
      for (let t = w.t0; t <= w.t1; t += 1 / 60) {
        const d = cp.defense(t)[sc.on], p = cp.offAt(sc.by, t);
        near = Math.min(near, Math.hypot(d.x - p.x, d.z - p.z));
      }
      assert.ok(near <= 2.6, `${label}: ${sc.on} never reaches ${sc.by}'s screen while it stands (closest ${near.toFixed(1)} ft)`);
    }
  }
  // 15 ft 밖 점프슛은 작전이 만든 빈 슛이다. 손을 떠날 때 수비가 3.5 ft 안에 있으면 막힌 슛으로 보인다.
  for (const s of m.shots) if (s.dist >= 15) assert.ok(s.near >= 3.5, `${label}: open jumper contested at ${s.near.toFixed(2)} ft @ ${s.at.toFixed(2)}s`);
  // 특수 상황 규칙(인바운드·코트 밖·버저·샷 클락): 상황이 없는 작전에도 코트 밖 규칙은 그대로다
  assert.deepEqual(situationViolations(cp.play, cp), [], `${label}: situation rules`);
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

// ── 특수 상황 규칙 ──
// 규칙마다 지키는 작은 작전 하나와, 그 규칙 하나만 어기는 작전을 만들어 본다
const blob = (patch = {}) => ({
  id: 'fx-blob', category: 'blob', ball: 'o1',
  start: { o1: [-6, -1.5], o2: [-4, 8], o3: [8, 6], o4: [-20, 12], o5: [6, 14] },
  steps: [
    { dur: 2, move: { o1: { path: [[-6, 3]], t: [0.4, 0.8] } }, ball: [{ type: 'pass', to: 'o2', at: 0.3 }] },
    { dur: 2, ball: [{ type: 'shot', at: 0.4, pts: 2 }] },
  ],
  situation: { period: 2, clock: 400, shotClock: 14, score: [40, 40] },
  ...patch,
});
const half = (situation, category = 'late', shotAt = 0.5) => ({
  id: 'fx-half', category, ball: 'o1',
  start: { o1: [0, 28], o2: [-14, 18], o3: [18, 8], o4: [-20, 6], o5: [6, 12] },
  steps: [
    { dur: 1.5, ball: [{ type: 'pass', to: 'o2', at: 0.2 }] },
    { dur: 3, ball: [{ type: 'shot', at: shotAt, pts: 3 }] },
  ],
  situation,
});
// 패스를 받은 지 0.1초 만에 슛하고, 받을 때 시계에는 0.2초가 남아 있다. o2의 자리(림까지 거리)만 바꾼다
const lastTenths = (o2) => {
  const base = {
    id: 'fx-tenths', category: 'late', ball: 'o1',
    start: { o1: [0, 28], o2, o3: [18, 8], o4: [-20, 6], o5: [10, 14] },
    steps: [{ dur: 1.5, ball: [{ type: 'pass', to: 'o2', at: 0.2 }] }],
  };
  const c = compilePlay(base).bsegs.find((b) => b.type === 'flight').t1;
  return {
    ...base,
    steps: [{ dur: 1.5, ball: [{ type: 'pass', to: 'o2', at: 0.2 }, { type: 'shot', at: (c + 0.1) / 1.5, pts: 2 }] }],
    situation: { period: 4, clock: c + 0.2, shotClock: null, score: [90, 91] },
  };
};
const violations = (play) => situationViolations(play, compilePlay(play));
const onlyOne = (play, re) => {
  const v = violations(play);
  assert.equal(v.length, 1, JSON.stringify(v));
  assert.match(v[0], re);
};

test('situation rules: valid fixtures pass', () => {
  assert.deepEqual(violations(blob()), []);
  assert.deepEqual(violations(half({ period: 4, clock: 30, shotClock: null, score: [90, 90] })), []);
  assert.deepEqual(violations(lastTenths([0, 10])), []);
});

// 사이드라인 인바운드: 왼쪽 사이드라인 밖(x −26.5, z 18)에서 넣고 1초 안에 들어온다
const slob = (start) => ({
  id: 'fx-slob', category: 'slob', ball: 'o1',
  start: { o1: start, o2: [-16, 21], o3: [-20, 6], o4: [14, 12], o5: [4, 14] },
  steps: [
    { dur: 2, move: { o1: { path: [[-21.6, 18]], t: [0.4, 0.8] } }, ball: [{ type: 'pass', to: 'o2', at: 0.3 }] },
    { dur: 2, ball: [{ type: 'shot', at: 0.4, pts: 2 }] },
  ],
  situation: { period: 3, clock: 300, shotClock: 14, score: [60, 60] },
});

test('situation rules: inbounds come from the end-line or left-sideline spot', () => {
  assert.deepEqual(violations(slob([-26.5, 18])), []);
  const p = blob();
  // 선 위(코트 안)에 서면 인바운드로 보지 않으므로 다른 인바운드 규칙이 모두 건너뛰어진다. 자리 규칙이 잡아야 한다
  onlyOne({ ...p, start: { ...p.start, o1: [5, 0] } }, /end line/);
  onlyOne({ ...p, start: { ...p.start, o1: [11, -1.5] } }, /end line/);
  onlyOne(slob([-25, 18]), /left sideline/);
  // 막판 작전도 인바운드라면 두 자리 중 하나에서 넣는다
  onlyOne({ ...slob([-26.5, 26]), category: 'late', situation: { period: 4, clock: 8, shotClock: null, score: [97, 100] } }, /neither inbound spot/);
});

test('situation rules: the inbound pass leaves within 5 s', () => {
  onlyOne(blob({ steps: [
    { dur: 6, move: { o1: { path: [[-6, 3]], t: [0.92, 1] } }, ball: [{ type: 'pass', to: 'o2', at: 0.9 }] },
    { dur: 2, ball: [{ type: 'shot', at: 0.4, pts: 2 }] },
  ] }), /inbound/);
});

test('situation rules: the inbounder steps in within 1 s of the pass', () => {
  onlyOne(blob({ steps: [
    { dur: 2, ball: [{ type: 'pass', to: 'o2', at: 0.3 }] },
    { dur: 2, ball: [{ type: 'shot', at: 0.4, pts: 2 }] },
  ] }), /o1 .*out of bounds/);
});

test('situation rules: defenders never leave the court', () => {
  onlyOne(blob({ steps: [
    { dur: 2, move: { o1: { path: [[-6, 3]], t: [0.4, 0.8] } }, ball: [{ type: 'pass', to: 'o2', at: 0.3 }] },
    { dur: 2, ball: [{ type: 'shot', at: 0.4, pts: 2 }], def: { d3: { path: [[8, -1]], t: [0, 1] } } },
  ] }), /d3 .*out of bounds/);
});

test('situation rules: nobody uses the right sideline', () => {
  const p = blob();
  onlyOne({ ...p, start: { ...p.start, o3: [25.5, 10] } }, /o3 .*right sideline/);
});

test('situation rules: an end-of-game shot leaves before the buzzer', () => {
  onlyOne(half({ period: 4, clock: 2, shotClock: null, score: [90, 91] }), /buzzer/);
});

test('situation rules: under 0.3 s at the catch only a finish at the rim counts', () => {
  onlyOne(lastTenths([0, 17.25]), /0\.3 s/);
});

test('situation rules: a shown shot clock does not run out before the shot', () => {
  onlyOne(half({ period: 2, clock: 400, shotClock: 3, score: [40, 40] }, 'ato', 0.6), /shot clock/);
});

test('the coach frame allows the inbound spots and nothing past them', () => {
  assert.equal(inCoachFrame({ x: -6, z: -2.4 }), true);
  assert.equal(inCoachFrame({ x: -26.5, z: 18 }), true);
  assert.equal(inCoachFrame({ x: -6, z: -2.8 }), false);
  assert.equal(inCoachFrame({ x: -26.5, z: 22 }), false);
  assert.equal(inCoachFrame({ x: 25.5, z: 10 }), false);
});

// 겹침 구간 캐시가 있어도 위치는 t만의 함수여야 한다: 묻는 순서를 섞어도 같은 결과
// 모든 작전 × 읽기: 1/60초 격자와 격자 밖 임의 시각 200개를, 순서대로 한 번, 섞어서 한 번 묻는다
for (const play of PLAYS) {
  for (const rid of readIds(play).length ? readIds(play) : [null]) {
    const label = rid ? `${play.id} [${rid}]` : play.id;
    test(`${label}: defense positions do not depend on query order`, () => {
      const a = compilePlay(variant(play, rid)), b = compilePlay(variant(play, rid));
      let seed = 12345;
      const rnd = () => (seed = (seed * 1103515245 + 12345) % 2 ** 31) / 2 ** 31;
      const ts = [];
      for (let t = 0; t <= a.end; t += 1 / 60) ts.push(t);
      for (let i = 0; i < 200; i++) ts.push(rnd() * a.end);
      const seq = ts.map((t) => a.defense(t));
      const order = ts.map((_, i) => i);
      for (let i = order.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [order[i], order[j]] = [order[j], order[i]]; }
      const shuffled = [];
      for (const i of order) shuffled[i] = b.defense(ts[i]);
      ts.forEach((t, i) => {
        for (const d of DEF) {
          const l = Math.hypot(seq[i][d].x - shuffled[i][d].x, seq[i][d].z - shuffled[i][d].z);
          assert.ok(l < 1e-4, `${label} ${d} differs by ${l.toExponential(2)} ft at ${t.toFixed(3)}s`);
        }
      });
    });
  }
}

// 재생이 끝나 멈춰 있어도 화면은 매 프레임 defense(end + 앞보기)를 묻는다. 그때마다 캐시가 자라면 안 된다.
test('idling past the end does not grow the collision cache', () => {
  for (const play of PLAYS) {
    for (const id of readIds(play)) {
      const cp = compilePlay(variant(play, id));
      for (let t = 0; t <= cp.end; t += 1 / 60) cp.defense(t);
      const before = cp.windowCount();
      for (let i = 0; i < 100; i++) cp.defense(cp.end + 0.05);
      assert.equal(cp.windowCount(), before, `${play.id} [${id}]: cache grew past the end`);
    }
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
    // 문장 첫 단어(The, Shooting …)는 고유명사가 아니므로 뺀다. 대문자 약칭(학교·구단 이름)은 문장 첫머리여도 잡는다.
    const famous = p.en?.famous || '';
    for (const w of famous.match(/(?<!(?:^|[.!?])\s*)\b[A-Z][A-Za-z]{2,}\b/g) || []) names.add(w.toLowerCase());
    for (const w of famous.match(/\b[A-Z]{2,}\b/g) || []) names.add(w.toLowerCase());
  }
  const hits = PLAYS.flatMap((p) => (p.aliases || [])
    .filter((a) => a.split(/[\s-]+/).some((w) => names.has(w.toLowerCase())))
    .map((a) => `${p.id}: ${a}`));
  assert.deepEqual(hits, []);
});

// 새 분류(얼리 오펜스, 시스템 오펜스 등)를 SECTIONS에 넣으면 두 언어 이름표가 있어야 한다
// t()는 없는 영어 문구를 한국어로 대신 보여 주므로, 각 언어 표에 키가 직접 있는지 본다
test('every section and category has a label in both languages', () => {
  for (const lang of LANGS) {
    for (const s of SECTIONS) {
      assert.ok(hasLabel(lang, `section.${s.id}`), `${lang}: section.${s.id}`);
      for (const c of s.cats) assert.ok(hasLabel(lang, `cat.${c}`), `${lang}: cat.${c}`);
    }
  }
});

test('every play belongs to a library section', () => {
  const cats = SECTIONS.flatMap((s) => s.cats);
  for (const p of PLAYS) assert.ok(cats.includes(p.category), `${p.id}: category ${p.category}`);
});

// 특수 상황 작전에만 situation이 있고, 숫자가 경기 시계로 말이 되어야 한다
const SITUATION_CATS = SECTIONS.find((s) => s.id === 'situations').cats;
for (const p of PLAYS) {
  test(`${p.id}: situation data matches the category`, () => {
    if (!SITUATION_CATS.includes(p.category)) return assert.equal(p.situation, undefined);
    const s = p.situation;
    assert.ok(s, 'situation');
    assert.ok(Number.isInteger(s.period) && s.period >= 1, `period ${s.period}`);
    assert.ok(typeof s.clock === 'number' && s.clock > 0, `clock ${s.clock}`);
    assert.ok(Array.isArray(s.score) && s.score.length === 2 && s.score.every((n) => Number.isInteger(n) && n >= 0), `score ${s.score}`);
    assert.ok(s.shotClock === null || (typeof s.shotClock === 'number' && s.shotClock > 0), `shotClock ${s.shotClock}`);
  });
}

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
