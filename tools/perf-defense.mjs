// 개발용: 작전·읽기마다 defense(t) 한 번 호출의 최악 비용(ms)을 잰다. npm test에는 포함하지 않는다.
// 재생 루프처럼 한 프레임에 t-H, t, t+H 세 번을 부른다. GC·타이머 잡음을 빼기 위해
// 새로 컴파일한 작전으로 같은 호출 순서를 5번 반복하고, 호출마다 가장 빠른 값을 그 호출의 비용으로 본다.
// (매번 새로 컴파일하므로 겹침 구간을 처음 찾는 비용도 포함된다.)
// 사용: node tools/perf-defense.mjs
import { compilePlay } from '../js/engine.js';
import { PLAYS } from '../js/plays/index.js';
import { readIds, variant } from '../js/reads.js';

const H = 0.05;
const RUNS = 5;
const versions = PLAYS.flatMap((p) => (readIds(p).length ? readIds(p) : [null]).map((id) => [p, id]));

// JIT 예열: 모든 작전을 한 번씩 끝까지 돌린 뒤에 잰다(첫 컴파일 비용은 앱에서도 한 번뿐이다)
for (const [p, id] of versions) {
  const cp = compilePlay(variant(p, id));
  for (let t = 0; t <= cp.end; t += 1 / 30) cp.defense(t);
}

const rows = [];
for (const [play, id] of versions) {
  let mins = null, sum = 0;
  for (let run = 0; run < RUNS; run++) {
    const cp = compilePlay(variant(play, id));
    const times = [];
    for (let t = 0; t <= cp.end; t += 1 / 60) {
      for (const s of [t - H, t, t + H]) {
        const t0 = performance.now();
        cp.defense(s);
        times.push(performance.now() - t0);
      }
    }
    mins = mins ? mins.map((m, i) => Math.min(m, times[i])) : times;
  }
  for (const m of mins) sum += m;
  rows.push({ name: id ? `${play.id} [${id}]` : play.id, worst: Math.max(...mins), avg: sum / mins.length });
}
rows.sort((a, b) => b.worst - a.worst);
for (const r of rows.slice(0, 10)) console.log(r.name.padEnd(40), `worst ${r.worst.toFixed(3)} ms`, `avg ${r.avg.toFixed(4)} ms`);
console.log('overall worst', rows[0].worst.toFixed(3), 'ms');
