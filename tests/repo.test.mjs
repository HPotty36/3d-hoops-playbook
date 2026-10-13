// 저장소 위생: 텍스트 파일은 LF 줄바꿈만 쓴다. CRLF가 섞이면 diff가 통째로 바뀌고 리베이스 때 줄마다 충돌한다.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

const TEXT = /\.(js|mjs|css|html|md|json|svg|txt)$|(^|\/)\.git(ignore|attributes)$/;

test('tracked text files use LF line endings', () => {
  const files = execSync('git ls-files', { encoding: 'utf8' }).split('\n').filter((f) => TEXT.test(f));
  const crlf = files.filter((f) => readFileSync(f, 'latin1').includes('\r'));
  assert.deepEqual(crlf, []);
});
