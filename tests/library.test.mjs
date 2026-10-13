// library.js: 작전 목록 검색과 난이도 필터
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { normalize, filterPlays } from '../js/library.js';
import { PLAYS } from '../js/plays/index.js';

const ids = (list) => list.map((p) => p.id);

test('normalize lowercases and drops spaces and hyphens', () => {
  assert.equal(normalize(' Pick-and Roll '), 'pickandroll');
});

test('search matches the English name in any UI language', () => {
  assert.ok(ids(filterPlays(PLAYS, 'horns', 0)).includes('horns'));
});

test('search matches the Korean name', () => {
  assert.ok(ids(filterPlays(PLAYS, '혼즈', 0)).includes('horns'));
});

test('search matches aliases', () => {
  assert.ok(ids(filterPlays(PLAYS, 'pnr', 0)).includes('pick-and-roll'));
});

test('search ignores spacing differences', () => {
  assert.ok(ids(filterPlays(PLAYS, 'pick androll', 0)).includes('pick-and-roll'));
});

test('difficulty filter keeps only that level', () => {
  const hard = filterPlays(PLAYS, '', 3);
  assert.ok(hard.length > 0);
  assert.ok(hard.every((p) => p.difficulty === 3));
});

test('blank query with level 0 returns everything', () => {
  assert.equal(filterPlays(PLAYS, '  ', 0).length, PLAYS.length);
});

test('no match returns an empty list', () => {
  assert.equal(filterPlays(PLAYS, 'zzz', 0).length, 0);
});
