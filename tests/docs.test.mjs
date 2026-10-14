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
