// library.js: 작전 목록 검색과 난이도 필터
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { normalize, filterPlays, composingQuery } from '../js/library.js';
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

// 조합 중(한글 음절, 안드로이드 Gboard의 영어 단어)에도 목록은 바로 거른다. 다만 중간 글자(혼ㅈ)로
// 결과가 0개가 되면 "찾는 작전이 없습니다"를 번쩍 띄우지 않고 직전 결과를 둔다.
test('while composing, a query with hits filters right away', () => {
  assert.equal(composingQuery(PLAYS, '', 'hor', 0), 'hor');
  assert.equal(composingQuery(PLAYS, '', '혼', 0), '혼');
});

test('while composing, a half-typed syllable with no hits keeps the last list', () => {
  assert.equal(composingQuery(PLAYS, '혼', '혼ㅈ', 0), '혼');
});

test('while composing, the difficulty filter counts when deciding', () => {
  const lvl = PLAYS.find((p) => p.id === 'horns').difficulty;
  const other = [1, 2, 3].find((n) => n !== lvl);
  assert.equal(composingQuery(PLAYS, 'ho', 'horns', other), 'ho');
});
