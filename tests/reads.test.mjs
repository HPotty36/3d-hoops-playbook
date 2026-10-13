// reads.js: 분기 작전을 일반 작전 객체로 바꾸는 순수 함수들
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readIds, variant, branchTime, readMeta } from '../js/reads.js';

const step = (title, dur) => ({ title, dur, text: `${title} 설명`, move: {} });
const fixture = {
  id: 'fx', name: '테스트', start: {}, ball: 'o1',
  steps: [step('셋업', 1.5), step('기본 2', 1.2), step('기본 3', 1.0)],
  reads: {
    at: 1,
    prompt: '[x5]가 어떻게 막나요?',
    base: { id: 'drop', label: '드롭', why: '드롭 이유' },
    options: [{ id: 'switch', label: '스위치', why: '스위치 이유', steps: [step('스위치 공략', 2)] }],
  },
  en: {
    name: 'Test',
    steps: [{ title: 'Setup', text: 'a' }, { title: 'Base 2', text: 'b' }, { title: 'Base 3', text: 'c' }],
    reads: {
      prompt: 'How does [x5] guard it?',
      base: { label: 'Drop', why: 'why drop' },
      options: [{ label: 'Switch', why: 'why switch', steps: [{ title: 'Attack the switch', text: 'd' }] }],
    },
  },
};
const noReads = { id: 'plain', steps: [step('a', 1)] };

test('readIds lists base first, then options', () => {
  assert.deepEqual(readIds(fixture), ['drop', 'switch']);
  assert.deepEqual(readIds(noReads), []);
});

test('variant returns the play itself for base or unknown ids', () => {
  assert.equal(variant(fixture, 'drop'), fixture);
  assert.equal(variant(fixture, 'nope'), fixture);
  assert.equal(variant(fixture, null), fixture);
  assert.equal(variant(noReads, 'switch'), noReads);
});

test('variant joins shared steps with the read steps in both languages', () => {
  const v = variant(fixture, 'switch');
  assert.equal(v.steps.length, 2);
  assert.equal(v.steps[0], fixture.steps[0]);
  assert.equal(v.steps[1], fixture.reads.options[0].steps[0]);
  assert.equal(v.en.steps.length, 2);
  assert.equal(v.en.steps[1].title, 'Attack the switch');
  assert.equal(v.id, 'fx');
});

test('branchTime sums the shared steps', () => {
  assert.equal(branchTime(fixture), 1.5);
  assert.equal(branchTime(noReads), 0);
});

test('readMeta localizes labels and prompt with Korean fallback', () => {
  assert.deepEqual(readMeta(fixture, 'en').reads[1], { id: 'switch', label: 'Switch', why: 'why switch' });
  assert.equal(readMeta(fixture, 'en').prompt, 'How does [x5] guard it?');
  assert.equal(readMeta(fixture, 'ko').prompt, '[x5]가 어떻게 막나요?');
  assert.deepEqual(readMeta(fixture, 'ko').reads[0], { id: 'drop', label: '드롭', why: '드롭 이유' });
  assert.equal(readMeta(fixture, 'en').at, 1);
  assert.equal(readMeta(noReads, 'ko'), null);
  const partial = { ...fixture, en: { name: 'Test' } };
  assert.equal(readMeta(partial, 'en').reads[1].label, '스위치');
});
