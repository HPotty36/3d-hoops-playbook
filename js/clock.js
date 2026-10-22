// 경기 시계·샷 클락·점수: 특수 상황 작전의 situation과 컴파일된 타임라인에서 t초의 값을 계산한다.
// DOM을 쓰지 않으므로 Node 테스트에서도 그대로 쓴다.

const outside = ([x, z]) => Math.abs(x) > 25 || z < 0;

// 공을 든 선수가 코트 밖(사이드라인·엔드라인 바깥)에서 시작하면 인바운드 작전이다
export const isInbound = (play) => !!play.start?.[play.ball] && outside(play.start[play.ball]);

// 인바운드 작전은 코트 안에서 처음 공을 잡을 때(첫 패스가 끝날 때) 시계가 출발한다. 하프코트 공격은 처음부터
export function clockStart(play, cp) {
  if (!isInbound(play)) return 0;
  const f = cp.bsegs.find((b) => b.type === 'flight');
  return f ? f.t1 : 0;
}

// 마지막 슛이 림에 닿으면 멈춘다
export const clockStop = (cp) => (cp.scores.length ? cp.scores.at(-1).t : cp.end);

// t초의 경기 시계·샷 클락(숨기면 null)·점수 [공격, 수비]. situation이 없는 작전은 null
export function clockAt(play, cp, t) {
  const s = play.situation;
  if (!s) return null;
  const run = Math.max(0, Math.min(t, clockStop(cp)) - clockStart(play, cp));
  // 샷 클락이 경기 시계보다 길면 실제 경기처럼 끈다
  const shown = s.shotClock != null && s.shotClock <= s.clock;
  const pts = cp.scores.reduce((a, x) => (x.t <= t ? a + x.pts : a), 0);
  return {
    game: Math.max(0, s.clock - run),
    shot: shown ? Math.max(0, s.shotClock - run) : null,
    score: [s.score[0] + pts, s.score[1]],
  };
}

// 중계 화면처럼: 1분 이상은 m:ss, 그 아래는 소수 첫째 자리까지(반올림하지 않고 버림)
export function formatClock(seconds) {
  const s = Math.max(0, seconds);
  if (s >= 60) {
    const m = Math.floor(s / 60);
    return `${m}:${String(Math.floor(s - m * 60)).padStart(2, '0')}`;
  }
  return (Math.floor(s * 10 + 1e-9) / 10).toFixed(1);
}
