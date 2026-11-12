// library.js: 작전 목록 검색과 난이도 필터
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { labelsFor } from '../js/i18n.js';
import { normalize, filterPlays, composingQuery, categoryTerms, listOrder } from '../js/library.js';
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

// 영어 'drag'가 더블 드래그와 트레일러 팝을 함께 찾듯, 한국어 '드래그'도 둘 다 찾는다
test('the Korean word for drag finds Trailer Pop too', () => {
  assert.ok(ids(filterPlays(PLAYS, '드래그', 0)).includes('trailer-pop'));
});

// 갈래 이름(두 언어)과 흔히 쓰는 말로도 찾는다. &는 and로 읽고, BLOB·SLOB 같은 약어는 앞에서부터만 맞춘다
test('search finds plays by their category in either language', async () => {
  const { SECTIONS } = await import('../js/plays/index.js');
  const terms = categoryTerms(SECTIONS, labelsFor);
  const find = (q) => ids(filterPlays(PLAYS, q, 0, terms));
  const inbounds = PLAYS.filter((p) => p.category === 'blob' || p.category === 'slob').map((p) => p.id);
  assert.ok(inbounds.length > 0);
  for (const q of ['inbound', '인바운드']) assert.deepEqual(find(q).filter((id) => inbounds.includes(id)).sort(), [...inbounds].sort(), q);
  const late = PLAYS.filter((p) => p.category === 'late').map((p) => p.id);
  assert.deepEqual(find('end of game').sort(), [...late].sort());
  assert.ok(find('zone').includes('two-three-zone'));
  assert.ok(find('P&R').includes('pick-and-roll'));
  assert.ok(find('pick & roll').includes('pick-and-roll'));
  assert.ok(!find('lob').includes('box'), "'lob' does not match the BLOB alias");
  assert.ok(find('lob').includes('sideline-lob'));
  assert.ok(find('blob').includes('box'));
});

test('arrow-key order follows the play list (sections, then categories) and the active filters', async () => {
  const { SECTIONS } = await import('../js/plays/index.js');
  const order = listOrder(PLAYS, SECTIONS, '', 0);
  assert.equal(order.length, PLAYS.length);
  const cats = SECTIONS.flatMap((s) => s.cats);
  const pos = order.map((i) => cats.indexOf(PLAYS[i].category));
  assert.deepEqual(pos, [...pos].sort((a, b) => a - b), 'categories appear in list order');
  const hard = listOrder(PLAYS, SECTIONS, '', 3);
  assert.ok(hard.length > 0 && hard.every((i) => PLAYS[i].difficulty === 3));
});
