// clock.js: 경기 시계·샷 클락·점수가 작전 타임라인을 따라 어떻게 흐르는지
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { compilePlay } from '../js/engine.js';
import { isInbound, clockStart, clockStop, clockAt, formatClock, scoreBugView } from '../js/clock.js';

const near = (a, b, msg) => assert.ok(Math.abs(a - b) < 1e-6, `${msg}: ${a} vs ${b}`);

// 베이스라인 인바운드: [1]이 엔드라인 밖에서 [2]에게 넣고 들어온다. [2]가 림 앞에서 마무리
const inbound = (situation) => ({
  id: 'fx-inbound', category: 'blob', ball: 'o1',
  start: { o1: [-6, -1.5], o2: [-4, 8], o3: [8, 6], o4: [-20, 12], o5: [6, 14] },
  steps: [
    { dur: 2, move: { o1: { path: [[-6, 3]], t: [0.4, 0.8] } }, ball: [{ type: 'pass', to: 'o2', at: 0.3 }] },
    { dur: 2, ball: [{ type: 'shot', at: 0.4, pts: 2 }] },
  ],
  situation,
});

// 하프코트 공격: 탑의 [1]이 [2]에게 패스, [2]가 슛
const halfCourt = (situation, shotAt = 0.5) => ({
  id: 'fx-half', category: 'late', ball: 'o1',
  start: { o1: [0, 28], o2: [-14, 18], o3: [18, 8], o4: [-20, 6], o5: [6, 12] },
  steps: [
    { dur: 1.5, ball: [{ type: 'pass', to: 'o2', at: 0.2 }] },
    { dur: 3, ball: [{ type: 'shot', at: shotAt, pts: 3 }] },
  ],
  situation,
});

test('formatClock: m:ss from a minute up, tenths (truncated) below', () => {
  assert.equal(formatClock(605), '10:05');
  assert.equal(formatClock(60), '1:00');
  assert.equal(formatClock(59.95), '59.9');
  assert.equal(formatClock(7.5), '7.5');
  assert.equal(formatClock(0.04), '0.0');
  assert.equal(formatClock(0), '0.0');
  assert.equal(formatClock(-0.2), '0.0');
});

test('an inbound play starts the clock at the first catch on the court', () => {
  const play = inbound({ period: 2, clock: 401, shotClock: 14, score: [50, 48] });
  const cp = compilePlay(play);
  assert.equal(isInbound(play), true);
  const s = clockStart(play, cp);
  near(s, cp.bsegs.find((b) => b.type === 'flight').t1, 'start = end of the inbound pass');
  assert.equal(clockAt(play, cp, 0).game, 401);
  assert.equal(clockAt(play, cp, s - 0.01).game, 401);
  near(clockAt(play, cp, s + 1).game, 400, 'one second after the catch');
});

test('a half-court play runs the clock from t = 0', () => {
  const play = halfCourt({ period: 4, clock: 30, shotClock: 14, score: [90, 90] });
  const cp = compilePlay(play);
  assert.equal(isInbound(play), false);
  assert.equal(clockStart(play, cp), 0);
  near(clockAt(play, cp, 1).game, 29, 'one second in');
});

test('the clock stops when the last shot reaches the rim and never goes below 0', () => {
  const play = halfCourt({ period: 4, clock: 30, shotClock: null, score: [90, 90] });
  const cp = compilePlay(play);
  const stop = clockStop(cp);
  near(stop, cp.scores.at(-1).t, 'stop = scoring time');
  const g = clockAt(play, cp, stop).game;
  near(clockAt(play, cp, stop + 0.5).game, g, 'frozen after the stop');
  near(clockAt(play, cp, cp.end).game, g, 'frozen at the end');

  const late = halfCourt({ period: 4, clock: 0.9, shotClock: null, score: [90, 91] }, 0.9);
  const cl = compilePlay(late);
  assert.equal(clockAt(late, cl, cl.end).game, 0);
  assert.equal(clockAt(late, cl, 2).game, 0);
});

test('the offense scores at the scoring time', () => {
  const play = inbound({ period: 2, clock: 401, shotClock: 14, score: [50, 48] });
  const cp = compilePlay(play);
  const ts = cp.scores[0].t;
  assert.deepEqual(clockAt(play, cp, 0).score, [50, 48]);
  assert.deepEqual(clockAt(play, cp, ts - 0.01).score, [50, 48]);
  assert.deepEqual(clockAt(play, cp, ts + 0.01).score, [52, 48]);
  assert.deepEqual(clockAt(play, cp, cp.end).score, [52, 48]);
});

test('the shot clock runs with the game clock, and hides when it is longer', () => {
  const play = halfCourt({ period: 2, clock: 400, shotClock: 14, score: [40, 40] });
  const cp = compilePlay(play);
  near(clockAt(play, cp, 0).shot, 14, 'shot clock at the start');
  near(clockAt(play, cp, 2).shot, 12, 'two seconds in');
  near(clockAt(play, cp, 2).game, 398, 'game clock two seconds in');
  const stop = clockStop(cp);
  near(clockAt(play, cp, cp.end).shot, 14 - stop, 'frozen with the game clock');

  const short = halfCourt({ period: 4, clock: 8, shotClock: 24, score: [90, 90] });
  assert.equal(clockAt(short, compilePlay(short), 1).shot, null);
  const none = halfCourt({ period: 4, clock: 30, shotClock: null, score: [90, 90] });
  assert.equal(clockAt(none, compilePlay(none), 1).shot, null);
});

test('scoreBugView: what the broadcast-style bug shows', () => {
  const none = halfCourt(undefined);
  assert.equal(scoreBugView(none, compilePlay(none), 0), null);
  const play = halfCourt({ period: 4, clock: 7.5, shotClock: null, score: [98, 98] });
  const cp = compilePlay(play);
  assert.deepEqual(scoreBugView(play, cp, 0), { period: 4, clock: '7.5', urgent: false, shot: null, score: [98, 98] });
  assert.equal(scoreBugView(play, cp, 2).urgent, false);
  assert.equal(scoreBugView(play, cp, 2.6).urgent, true);
  assert.equal(scoreBugView(play, cp, 2.6).clock, '4.9');
  const sc = halfCourt({ period: 2, clock: 400, shotClock: 14, score: [40, 40] });
  assert.equal(scoreBugView(sc, compilePlay(sc), 0).shot, '14');
  assert.equal(scoreBugView(sc, compilePlay(sc), 0.5).shot, '14');
  assert.equal(scoreBugView(sc, compilePlay(sc), 1.2).shot, '13');
  assert.equal(scoreBugView(sc, compilePlay(sc), 0).clock, '6:40');
});
