// 문서가 데이터와 어긋나지 않게: README의 읽기 개수와 Node 버전
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { PLAYS } from '../js/plays/index.js';
import { readIds } from '../js/reads.js';

const readme = readFileSync('README.md', 'utf8');
const [en, ko] = readme.split('<a name="korean"></a>');
const total = PLAYS.reduce((n, p) => n + (readIds(p).length || 1), 0);
const count = (s, sub) => s.split(sub).length - 1;

test('README states the total number of reads from the data', () => {
  assert.equal(count(en, `${total} reads`), 1, `English part should say "${total} reads" once`);
  assert.equal(count(ko, `${total}가지`), 1, `Korean part should say "${total}가지" once`);
});

test('README states the Node version the tests need', () => {
  assert.ok(readme.includes('Node 21+'), 'mentions Node 21+');
  assert.ok(!readme.includes('Node 20+'), 'no longer says Node 20+');
});

// 화면의 모든 문구 키(index.html의 data-i18n*)와 존 수비 화면에서 쓰는 키가 두 언어 표에 모두 있다
test('every UI string key exists in Korean and English', async () => {
  const { LANGS, hasLabel } = await import('../js/i18n.js');
  const html = readFileSync('index.html', 'utf8');
  const keys = new Set([...html.matchAll(/data-i18n(?:-[a-z]+)?="([^"]+)"/g)].map((m) => m[1]));
  for (const k of ['h.beats', 'lg.zone']) keys.add(k);
  for (const lang of LANGS) for (const k of keys) assert.ok(hasLabel(lang, k), `${lang}: ${k}`);
});
