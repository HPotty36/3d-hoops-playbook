// 혼즈 (Horns) — 하이 픽앤롤 + 하이-로우
export default {
  id: 'horns',
  name: '혼즈',
  category: 'onball',
  difficulty: 2,
  summary:
    '두 빅맨이 양쪽 엘보(자유투 라인 끝)에, 두 슈터가 양쪽 코너에 서는 **뿔 모양 대형**에서 시작합니다. 가드가 양쪽 스크린 중 하나를 고르고, 롤맨과 탑으로 올라간 다른 빅맨이 **하이-로우** 패스로 연결합니다.',
  when:
    '하프코트 첫 공격 세트로 많이 씁니다. 패스가 좋은 빅맨이 있을 때 특히 위력적입니다.',
  keys: [
    '대칭 대형이라 어느 방향으로든 같은 작전을 걸 수 있어, 수비가 미리 한쪽을 막기 어렵습니다.',
    '코너의 두 슈터가 도움 수비를 페인트 밖으로 끌어냅니다.',
    '두 번째 빅맨이 탑으로 올라가 빈자리를 채우면(리플레이스) 하이-로우 패스 각도가 생깁니다.',
    '혼즈 플레어, 혼즈 트위스트, 혼즈 스태거처럼 파생 작전이 아주 많습니다.',
  ],
  counters: [
    { name: '스위치', desc: '핸들러와 롤맨 모두 즉시 마크를 바꿉니다. 대신 가드가 빅맨을 막는 미스매치가 생깁니다.' },
    { name: '한쪽으로 몰기', desc: '스크린 전에 핸들러를 한쪽으로 몰아 스크린 선택권을 빼앗습니다.' },
    { name: '엘보 디나이', desc: '엘보 빅맨에게 가는 패스를 끊어 대형 자체를 무력화합니다.' },
  ],
  famous:
    '샌안토니오 스퍼스, 마이애미 히트, 댈러스 매버릭스 등 대부분의 NBA 플레이북에 혼즈 계열 작전이 들어 있습니다. 경기 첫 공격에서 가장 자주 보이는 대형 중 하나입니다.',

  en: {
    name: 'Horns',
    summary:
      'It starts from a **horns-shaped alignment**: two bigs at the elbows (the corners of the free-throw line) and two shooters in the corners. The guard picks a screen from either side, and the roller and the other big, who has lifted to the top, connect with a **high-low** pass.',
    when:
      'A very common first half-court set. It is especially dangerous with a big who passes well.',
    keys: [
      'The alignment is symmetric, so the same action can go either direction and the defense can\'t load up on one side in advance.',
      'The two corner shooters keep help defenders out of the paint.',
      'When the second big lifts to the top to fill the space (the replace), the high-low passing angle opens.',
      'There are many variations: Horns Flare, Horns Twist, Horns Stagger, and more.',
    ],
    counters: [
      { name: 'Switch', desc: 'Switch the handler and the roller immediately, at the cost of a guard guarding a big.' },
      { name: 'Force', desc: 'Push the handler to one side before the screen to take away the choice of screens.' },
      { name: 'Elbow denial', desc: 'Deny the pass to the elbow bigs and the set never gets started.' },
    ],
    famous:
      'The San Antonio Spurs, Miami Heat, Dallas Mavericks, and nearly every other NBA playbook include horns actions. It is one of the most common alignments you will see on a team\'s first possession.',
    steps: [
      { title: 'Horns alignment', text: 'Bigs [4] and [5] stand at the two elbows and shooters [2] and [3] in the two corners, forming a shape like a bull\'s horns. [1] can use a screen from either side, which makes it hard for the defense to prepare.' },
      { title: 'Pick a screen', text: '[1] jabs left, then [5] steps up to set the screen on the right. [4] waits at the elbow.' },
      { title: 'Roll & replace', text: '[1] goes right off the screen and [5] rolls to the rim. The other big, [4], lifts to the top to fill the empty space (the replace). The roller is dangerous, so [x4] drops into the paint to slow [5].' },
      { title: 'High-low', text: '[1] swings the ball to [4] at the top, and as [x4] rushes up to guard [4], [5] is left alone in the paint. [4] floats a **high-low** lob to [5] for the finish. Two bigs creating for each other is the signature option of horns.' },
    ],
  },

  start: { o1: [0, 34], o4: [-8, 20], o5: [8, 20], o2: [-23, 3.5], o3: [23, 3.5] },
  ball: 'o1',
  steps: [
    {
      title: '혼즈 대형',
      dur: 1.5,
      text: '두 빅맨 [4]·[5]가 양쪽 엘보에, 슈터 [2]·[3]이 양쪽 코너에 섭니다. 소의 뿔 같은 모양이라 ‘혼즈’라고 부릅니다. [1]은 어느 쪽 스크린이든 고를 수 있어 수비가 미리 대비하기 어렵습니다.',
      move: { o1: { path: [[0, 31.5]], t: [0, 0.8] } },
    },
    {
      title: '스크린 선택',
      dur: 1.4,
      text: '[1]이 왼쪽으로 한 번 흔든 뒤, [5]가 올라와 오른쪽 스크린을 겁니다. [4]는 엘보에서 기다립니다.',
      move: {
        o5: { path: [[5, 25], [2.6, 28.4]], t: [0, 0.8] },
        o1: { path: [[-1.6, 31.8]], t: [0.2, 0.8] },
      },
      screens: [{ by: 'o5', face: [-1.4, 28.6], hold: 0.55 }],
    },
    {
      title: '롤 & 리플레이스',
      dur: 1.8,
      text: '[1]이 스크린을 타고 오른쪽으로, [5]는 림으로 롤합니다. 다른 빅맨 [4]는 탑으로 올라가 빈자리를 채웁니다(리플레이스). 롤맨이 위험하니 [x4]가 페인트로 내려와 [5]를 견제합니다.',
      move: {
        o1: [[1, 32.6], [4.8, 30.6], [9, 25.5]],
        o5: { path: [[1.8, 22], [1, 11]], t: [0.35, 1] },
        o4: { path: [[-4, 25], [-2, 29.5]], t: [0.2, 0.9] },
      },
      def: {
        d1: { lag: 0.95 },
        d5: { path: [[3.4, 23], [4.5, 19]] },
        d4: { path: [[-2.5, 18], [0.5, 14]], t: [0.3, 1] },
      },
    },
    {
      title: '하이-로우',
      dur: 2.3,
      text: '[1]이 탑의 [4]에게 공을 넘기고, [x4]가 [4]를 막으러 급히 올라가는 순간 페인트에 [5]가 홀로 남습니다. [4]가 [5]에게 **하이-로우** 롭 패스를 띄워 마무리. 두 빅맨이 서로를 살리는 혼즈의 대표 옵션입니다.',
      move: {
        o1: { path: [[10, 24]], t: [0, 0.2] },
        o5: { path: [[0.8, 9], [0, 7]], t: [0.3, 0.8] },
      },
      ball: [
        { type: 'pass', to: 'o4', at: 0.08 },
        { type: 'lob', to: 'o5', at: 0.42 },
        { type: 'shot', at: 0.84, pts: 2, kind: 'dunk' },
      ],
      def: {
        d4: { path: [[-1.5, 24.5]], t: [0.1, 0.45] },
        d5: { path: [[7.5, 20.5]], t: [0, 0.5] },
      },
    },
  ],
};
