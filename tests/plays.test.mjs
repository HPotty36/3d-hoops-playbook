// 모든 작전 데이터가 물리적으로 그럴듯한지 검사한다.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { compilePlay } from '../js/engine.js';
import { PLAYS } from '../js/plays/index.js';
import { sampleMotion } from './helpers.mjs';

for (const play of PLAYS) {
  test(`${play.id}: motion stays physical`, () => {
    const m = sampleMotion(compilePlay(play));
    assert.equal(m.nan, false);
    assert.ok(m.maxOff <= 25, `offense ${m.maxOff.toFixed(1)} ft/s`);
    assert.ok(m.maxDef <= 38, `defense ${m.maxDef.toFixed(1)} ft/s at ${m.whereDef}`);
    assert.ok(m.offGap >= 1.8, `defender inside an attacker: ${m.offGap.toFixed(2)} ft (${m.whereGap})`);
    assert.ok(m.defGap >= 1.35, `defenders overlap: ${m.defGap.toFixed(2)} ft`);
    for (const s of m.shots) assert.ok(s.pts === 3 ? s.dist >= 22 : s.dist < 23.75, `${s.pts}pt from ${s.dist.toFixed(1)} ft`);
  });
}
