// shortcuts.js: 전역 단축키가 포커스된 요소의 기본 동작을 가로채지 않는지
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { keyBelongsToTarget, roveIndex } from '../js/shortcuts.js';

// closest(selector)만 흉내 내는 가짜 요소: tag가 선택자 목록에 있으면 자기 자신을 돌려준다
const el = (tag) => ({ closest: (sel) => (sel.split(',').map((s) => s.trim()).includes(tag) ? {} : null) });

test('Space on a focused button presses that button, not play/pause', () => {
  assert.equal(keyBelongsToTarget(el('button'), ' '), true);
});

test('Enter on a focused link or button stays with it', () => {
  assert.equal(keyBelongsToTarget(el('a'), 'Enter'), true);
  assert.equal(keyBelongsToTarget(el('button'), 'Enter'), true);
});

test('every key typed into a text field stays with the field', () => {
  for (const key of [' ', 'Enter', 'ArrowLeft', 'r']) assert.equal(keyBelongsToTarget(el('input'), key), true);
  assert.equal(keyBelongsToTarget(el('textarea'), 'd'), true);
});

test('Space and arrows on the page body go to the shortcuts', () => {
  assert.equal(keyBelongsToTarget(el('body'), ' '), false);
  assert.equal(keyBelongsToTarget(el('body'), 'ArrowRight'), false);
});

test('arrow keys and letters on a focused button still reach the shortcuts', () => {
  assert.equal(keyBelongsToTarget(el('button'), 'ArrowRight'), false);
  assert.equal(keyBelongsToTarget(el('button'), 'r'), false);
});

test('arrows move between the branch options and wrap around', () => {
  assert.equal(roveIndex(3, 0, 'ArrowRight'), 1);
  assert.equal(roveIndex(3, 2, 'ArrowDown'), 0);
  assert.equal(roveIndex(3, 0, 'ArrowLeft'), 2);
  assert.equal(roveIndex(3, 1, 'ArrowUp'), 0);
  assert.equal(roveIndex(3, 1, 'Home'), 0);
  assert.equal(roveIndex(3, 0, 'End'), 2);
  assert.equal(roveIndex(3, 0, 'Enter'), -1);
});

test('in the read tabs only up/down move between tabs; left/right stay the step keys', () => {
  assert.equal(roveIndex(3, 0, 'ArrowDown', false), 1);
  assert.equal(roveIndex(3, 0, 'ArrowRight', false), -1);
  assert.equal(roveIndex(3, 0, 'ArrowLeft', false), -1);
});
