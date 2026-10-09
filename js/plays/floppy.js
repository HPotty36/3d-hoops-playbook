// 플로피 (Floppy) — 싱글/스태거 중 선택
export default {
  id: 'floppy',
  name: '플로피',
  category: 'offball',
  difficulty: 2,
  summary:
    '슈터가 림 아래에서 출발해, 양쪽에 놓인 스크린(한쪽은 싱글, 한쪽은 더블) 중 하나를 골라 타고 윙으로 뛰쳐나오는 작전입니다. 수비는 슈터가 어느 쪽으로 나올지 끝까지 알 수 없습니다.',
  when:
    '슛이 정확한 슈터에게 확실한 캐치 앤 슛 찬스를 만들어주고 싶을 때 씁니다. 경기 막판 3점이 필요할 때도 자주 나옵니다.',
  keys: [
    '슈터는 출발 전 반대쪽으로 페이크를 줘서 수비를 한쪽으로 기울게 만듭니다.',
    '스크리너는 슈터가 아니라 **슈터의 수비수**를 겨냥해 자리를 잡습니다.',
    '캐치하기 전에 발과 손을 미리 준비해서 잡자마자 쏩니다.',
    '수비가 스크린 아래로 지름길을 타면(숏컷), 슈터는 방향을 꺾어(컬) 림으로 들어갑니다.',
  ],
  counters: [
    { name: '트레일', desc: '슈터 엉덩이에 붙어 스크린을 같이 통과합니다. 3점은 막지만 컬 돌파를 내줄 수 있습니다.' },
    { name: '스위치', desc: '스크리너의 수비수가 슈터를 맡습니다. 빅맨이 슈터를 쫓아야 하는 미스매치가 생깁니다.' },
    { name: '탑 락킹', desc: '슈터가 원하는 위쪽 길을 미리 막아 백도어나 컬로 유도합니다.' },
  ],
  famous:
    '리처드 해밀턴(디트로이트 피스톤스), 레이 앨런, 레지 밀러 같은 무빙 슈터의 대표 작전입니다. 요즘엔 클레이 탐슨, 던컨 로빈슨 같은 슈터에게 자주 씁니다.',

  en: {
    name: 'Floppy',
    summary:
      'A shooter starts under the rim and picks one of two sides, a single screen on one and a double screen on the other, then sprints out to the wing. The defense can\'t know which way the shooter is coming until the last moment.',
    when:
      'When you want a clean catch-and-shoot look for an accurate shooter. It is also common late in games when a three is needed.',
    keys: [
      'Before starting, the shooter fakes toward the opposite side to tilt the defender.',
      'The screeners set up on **the shooter\'s defender**, not on the shooter.',
      'The shooter gets feet and hands ready before the catch and lets it go right away.',
      'If the defender cheats under the screens (the shortcut), the shooter curls toward the rim instead.',
    ],
    counters: [
      { name: 'Trail', desc: 'Stay on the shooter\'s hip and go through the screens together. It takes away the three but can give up a curl to the rim.' },
      { name: 'Switch', desc: 'The screener\'s defender takes the shooter, leaving a big chasing a shooter.' },
      { name: 'Top-lock', desc: 'Take away the high route the shooter wants and force a backdoor cut or a curl.' },
    ],
    famous:
      'A staple for movement shooters like Richard Hamilton (Detroit Pistons), Ray Allen, and Reggie Miller. Today it is often run for shooters like Klay Thompson and Duncan Robinson.',
    steps: [
      { title: 'Floppy alignment', text: 'Shooter [2] starts under the rim. On the left, [4] waits with a **single screen**; on the right, [5] and [3] form a **double (stagger) screen**. [2] fakes left to fool the defense.' },
      { title: 'Come off the stagger', text: '[2] changes direction and runs off both stagger screens on the right, out to the wing. Hit by two screens in a row, [x2] falls well behind.' },
      { title: 'Catch & shoot', text: '[1] passes to [2] on the wing, and [2] squares up and fires a three right away (catch and shoot). If [x5] or [x3] helps on [2], screener [5] dives to the rim as the second option.' },
    ],
  },

  start: { o1: [0, 32], o2: [0, 5.5], o4: [-8.8, 9], o5: [9.4, 8.8], o3: [10.4, 14.2] },
  ball: 'o1',
  steps: [
    {
      title: '플로피 대형',
      dur: 1.5,
      text: '슈터 [2]가 림 아래에서 출발합니다. 왼쪽엔 [4]의 **싱글 스크린**, 오른쪽엔 [5]·[3]의 **더블(스태거) 스크린**이 기다립니다. [2]는 왼쪽으로 가는 척 수비를 속입니다.',
      move: {
        o1: { path: [[4, 31]], t: [0, 0.8] },
        o2: { path: [[-2.8, 6.2]], t: [0.3, 0.9] },
      },
    },
    {
      title: '스태거 타고 나오기',
      dur: 1.9,
      text: '[2]가 방향을 바꿔 오른쪽 스태거 스크린을 연달아 타고 윙으로 뛰어나옵니다. 스크린 두 개에 연달아 걸린 [x2]는 한참 뒤처집니다.',
      move: {
        o2: { path: [[3.2, 6.2], [6.4, 9.5], [7.2, 13.5], [10.5, 18.8], [16.5, 22.4]], t: [0, 0.95] },
      },
      screens: [
        { by: 'o5', face: [5.5, 8.2], hold: 0.3 },
        { by: 'o3', face: [6.8, 13.4], hold: 0.3 },
      ],
      def: {
        d2: { path: [[2.2, 6.4], [6, 10.5], [8, 15.4], [10.2, 17.6], [13.2, 19.6]], t: [0.15, 1] },
      },
    },
    {
      title: '캐치 & 슛',
      dur: 1.6,
      text: '[1]이 윙의 [2]에게 패스하고, [2]는 발을 맞춰 바로 3점을 던집니다(캐치 앤 슛). 만약 [x5]나 [x3]가 [2]를 도우러 나오면 스크린을 건 [5]가 림으로 파고드는 2차 옵션이 열립니다.',
      move: {
        o2: { path: [[17.5, 22.6]], t: [0, 0.2] },
        o5: { path: [[4, 7]], t: [0.15, 0.6] },
      },
      ball: [
        { type: 'pass', to: 'o2', at: 0.05 },
        { type: 'shot', at: 0.48, pts: 3 },
      ],
      def: {
        d2: { path: [[15.6, 20.4]], t: [0.1, 0.7] },
      },
    },
  ],
};
