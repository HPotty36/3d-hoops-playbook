// 스페인 픽앤롤 (Spain Pick and Roll)
export default {
  id: 'spain-pick-and-roll',
  name: '스페인 픽앤롤',
  category: 'onball',
  difficulty: 3,
  summary:
    '픽앤롤에 세 번째 선수를 더한 작전입니다. 볼 스크린 직후 슈터가 롤맨의 수비수(빅맨)에게 **백스크린**을 걸어 롤맨을 자유롭게 하고, 백스크린을 건 슈터는 곧바로 3점 라인으로 빠집니다. 수비 세 명이 동시에 딜레마에 빠집니다.',
  when:
    '상대가 드롭 수비로 픽앤롤을 잘 막을 때, 혹은 스위치 수비 소통이 서툰 팀을 상대할 때 씁니다.',
  keys: [
    '백스크리너는 볼 스크린 바로 아래, 수비 빅맨의 등 뒤에 숨어 있다가 롤 타이밍에 맞춰 스크린을 겁니다.',
    '롤맨은 백스크린 덕분에 자기 수비수 없이 림까지 달립니다.',
    '백스크리너는 스크린 직후 3점 라인 밖으로 **팝**합니다. 그의 수비수가 롤맨을 도우면 오픈 3점이 납니다.',
    '볼 핸들러는 [x2]의 선택을 보고 롤맨(롭 패스)과 슈터(킥아웃) 중 하나를 고릅니다.',
  ],
  counters: [
    { name: '올 스위치', desc: '모든 스크린에 스위치해서 엇갈림을 없앱니다. 소통이 늦으면 더 큰 구멍이 생깁니다.' },
    { name: '백스크린 피하기', desc: '[x5]가 백스크린을 예상하고 미리 아래로 물러납니다. 대신 핸들러의 풀업 슛을 내줍니다.' },
    { name: '슈터 고정', desc: '[x2]가 끝까지 슈터를 따라가고, 롤맨은 약한 쪽 수비가 막습니다.' },
  ],
  famous:
    '스페인 대표팀과 유로리그에서 유행해 이런 이름이 붙었고, 2010년대 후반부터 미국 프로 팀들도 본격적으로 도입했습니다. 포틀랜드(데미안 릴라드–유서프 너키치), 토론토 랩터스 등이 자주 썼습니다.',

  en: {
    name: 'Spain Pick and Roll',
    summary:
      'A pick and roll with a third player added. Right after the ball screen, a shooter sets a **back screen** on the roller\'s defender (the big) to free the roller, then immediately pops to the three-point line. Three defenders face a dilemma at once.',
    when:
      'Against teams whose drop coverage shuts down a normal pick and roll, or teams that communicate poorly on switches.',
    keys: [
      'The back-screener hides just below the ball screen, behind the defending big, and screens right as the roll starts.',
      'Thanks to the back screen, the roller runs to the rim with no defender attached.',
      'Right after screening, the back-screener **pops** beyond the arc. If that defender helps on the roller, the three is wide open.',
      'The handler reads the choice [x2] makes and picks between the roller (lob) and the shooter (kick-out).',
    ],
    counters: [
      { name: 'All switch', desc: 'Switch every screen to remove the confusion. If the communication is a beat late, the hole gets even bigger.' },
      { name: 'Avoid the back screen', desc: '[x5] anticipates the back screen and sinks early, conceding a pull-up to the handler.' },
      { name: 'Stay with the shooter', desc: '[x2] stays glued to the shooter, and a weak-side defender handles the roller.' },
    ],
    famous:
      'It caught on with the Spanish national team and in the EuroLeague, hence the name, and North American pro teams adopted it widely in the late 2010s. The Portland Trail Blazers (Damian Lillard and Jusuf Nurkić) and the Toronto Raptors ran it often.',
    steps: [
      { title: 'Spain setup', text: '[5] comes up to set a high screen for [1], while shooter [2] drifts up from the paint and settles in **behind** [x5]. So far it looks like an ordinary pick and roll.' },
      { title: 'Back screen', text: 'As [1] comes off the screen to the right, [2] sets a **back screen** on [x5]. [x5] is watching the ball and never sees the screen coming from behind.' },
      { title: 'Roll & pop', text: 'With [x5] caught on the screen, [5] rolls to the rim and [2], who just set the back screen, **pops** to the top. If [x2] drops to stop the roller, [2] is open; if [x2] stays with [2], [5] is open.' },
      { title: 'Kick-out three', text: '[x2] gets pulled down by the roller, so [1] passes to [2] at the top for an open three. Had the defense stayed with [2], the right answer would have been a **lob** to [5].' },
    ],
  },

  start: { o1: [0, 33], o5: [7, 19], o2: [-2, 15.5], o3: [-23, 3.5], o4: [23, 3.5] },
  ball: 'o1',
  steps: [
    {
      title: '스페인 셋업',
      dur: 1.7,
      text: '[5]가 [1]에게 하이 스크린을 걸러 올라가고, 슈터 [2]는 페인트에서 슬금슬금 올라와 [x5]의 **등 뒤**에 자리를 잡습니다. 여기까지는 평범한 픽앤롤처럼 보입니다.',
      move: {
        o5: { path: [[4.5, 25], [2.6, 29.4]], t: [0, 0.85] },
        o1: { path: [[-1.8, 33.6]], t: [0.25, 0.85] },
        o2: { path: [[0.5, 20.5]], t: [0.3, 1] },
      },
      screens: [{ by: 'o5', face: [-1.5, 30], hold: 0.5 }],
    },
    {
      title: '백스크린',
      dur: 1.3,
      text: '[1]이 스크린을 타고 오른쪽으로 나가는 순간, [2]가 [x5]에게 **백스크린**을 겁니다. [x5]는 핸들러만 보느라 뒤에서 오는 스크린을 보지 못합니다.',
      move: {
        o1: [[1, 34.2], [5, 31.8], [8.5, 27.5]],
        o2: { path: [[2.0, 22.6]], t: [0, 0.55] },
        o5: { path: [[5.4, 26]], t: [0.35, 1] },
      },
      screens: [{ by: 'o2', face: [3, 25.4], hold: 0.45 }],
      def: {
        d1: { lag: 0.9 },
        d5: { path: [[3, 25.4]], t: [0, 0.5] },
      },
    },
    {
      title: '롤 & 팝',
      dur: 1.5,
      text: '스크린에 걸린 [x5]를 두고 [5]는 림으로 굴러가고, 백스크린을 건 [2]는 곧바로 탑으로 **팝**합니다. [x2]가 롤맨을 막으러 내려가면 [2]가 비고, [2]를 따라가면 [5]가 빕니다.',
      move: {
        o5: { path: [[4, 18], [1.5, 9.5]], t: [0, 0.85] },
        o2: { path: [[-1, 27], [-2.5, 30.5]], t: [0.1, 0.8] },
        o1: { path: [[11, 23.5]], t: [0, 0.6] },
      },
      def: {
        d1: { lag: 0.6 },
        d5: { path: [[3.2, 24.2], [3.4, 20.5]], t: [0.3, 1] },
        d2: { path: [[2.5, 13]], t: [0.1, 0.7] },
      },
    },
    {
      title: '킥아웃 3점',
      dur: 1.9,
      text: '[x2]가 롤맨에게 끌려 내려가자 [1]이 탑의 [2]에게 패스하고, [2]가 노마크 3점을 던집니다. 수비가 [2]를 지켰다면 정답은 [5]에게 띄우는 **롭 패스**였습니다.',
      move: {
        o5: { path: [[0.8, 7.5]], t: [0, 0.4] },
      },
      ball: [
        { type: 'pass', to: 'o2', at: 0.12 },
        { type: 'shot', at: 0.5, pts: 3 },
      ],
      def: {
        d2: { path: [[-1.5, 24.5]], t: [0.3, 0.9] },
        d5: { path: [[2, 12]], t: [0, 0.7] },
      },
    },
  ],
};
