// 해머 (Hammer) — 베이스라인 돌파 + 약한 쪽 플레어 스크린 → 코너 3점
export default {
  id: 'hammer',
  name: '해머',
  category: 'motion',
  difficulty: 2,
  aliases: ['hammer screen', 'baseline drive', '해머 스크린'],
  summary:
    '한쪽에서 베이스라인 돌파로 수비를 림 쪽으로 모은 뒤, 반대편에서 도움 수비하러 들어온 수비수의 등 뒤에 **해머 스크린**을 걸어 코너의 슈터를 완전히 비워 놓는 작전입니다. 돌파 후 킥아웃의 교과서입니다.',
  when:
    '돌파력 좋은 윙과 코너 3점 슈터가 있을 때 씁니다. 상대 도움 수비가 적극적일수록 더 잘 통합니다.',
  keys: [
    '돌파는 반드시 베이스라인 쪽으로 합니다. 수비가 림을 막으러 모이고, 반대쪽 코너로 패스 길이 열립니다.',
    '해머 스크린은 도움 수비하러 들어온 수비수의 **등 뒤**에 겁니다. 수비는 스크린을 볼 수 없습니다.',
    '슈터는 돌파 타이밍에 맞춰 윙에서 코너로 미끄러지듯 내려갑니다(드리프트).',
    '패스는 베이스라인 위를 가로지르는 한 번의 강한 패스입니다.',
  ],
  counters: [
    { name: '노 헬프', desc: '약한 쪽 수비가 슈터에게서 떨어지지 않습니다. 대신 돌파 레이업을 내줄 수 있습니다.', read: 'no-help' },
    { name: '로테이션 스위치', desc: '[x4]가 코너로 나가고 [x2]가 [4]를 맡아 슈터를 지웁니다.', read: 'rotation-switch' },
    { name: '베이스라인 차단', desc: '처음부터 베이스라인 돌파를 막아 도움 수비가 많은 중앙으로 유도합니다.', read: 'baseline-deny' },
  ],
  famous:
    '그렉 포포비치 감독의 샌안토니오 스퍼스가 2014년 우승 시즌 전후로 즐겨 썼습니다. 마누 지노빌리의 베이스라인 돌파에 이은 대니 그린의 코너 3점이 대표 장면입니다.',

  en: {
    name: 'Hammer',
    summary:
      'A baseline drive on one side pulls the defense toward the rim, then on the other side a **hammer screen** is set behind the defender who rotated over to help, leaving the corner shooter wide open. The textbook drive-and-kick.',
    when:
      'When you have a wing who can drive and a corner three-point shooter. The more aggressive the opponent\'s help defense, the better it works.',
    keys: [
      'The drive must go baseline. The defense collapses on the rim and the passing lane to the opposite corner opens.',
      'The hammer screen goes **behind** the defender who came over to help, so that defender never sees it.',
      'The shooter drifts from the wing down to the corner in time with the drive.',
      'The pass is a single hard throw across the baseline.',
    ],
    counters: [
      { name: 'No help', desc: 'The weak-side defender never leaves the shooter, which can concede the layup on the drive.' },
      { name: 'Rotation switch', desc: '[x4] runs out to the corner and [x2] takes [4], erasing the shooter.' },
      { name: 'Take away the baseline', desc: 'Deny the baseline drive from the start and force the ball into the crowded middle.' },
    ],
    famous:
      'Gregg Popovich\'s San Antonio Spurs ran it heavily around their 2014 title season. Manu Ginóbili driving the baseline and Danny Green hitting the corner three is the classic image.',
    steps: [
      { title: 'Setup', text: '[1] has the ball on the right wing, looking to attack. On the weak side (left), shooter [2] is on the wing and big [4] is on the block. The real action happens on the left.' },
      { title: 'Baseline drive & hammer screen', text: '[1] attacks hard along the baseline. As the help collapses, [x2] sinks toward the paint in help position, and [4] sets a **hammer screen** behind [x2]. [2] slides down to the corner.' },
      { title: 'Hammer pass & corner three', text: 'From the end of the baseline, [1] fires the ball across to the opposite corner (the hammer pass). [x2] is stuck on the screen and can\'t get to the corner, and [2] takes the shortest three on the floor: the **corner three**.' },
    ],
    reads: {
      prompt: 'How does the defense handle the drive from [1]?',
      base: { label: 'Help', why: 'When the weak-side defender helps on the drive, the corner behind opens, and the hammer screen blocks the way back.' },
      options: [
        {
          label: 'No help', why: 'If nobody comes to help, the way stays open all the way to the rim. Just finish it.',
          steps: [
            { title: 'No help & layup', text: '[x2] stays glued to shooter [2] and nobody comes over to help (**no help**). [1] drives the baseline all the way and lays it in.' },
          ],
        },
        {
          label: 'Rotation switch', why: 'When a big runs out to the corner shooter, that big is missing under the rim. Drop to the dunker spot and catch it.',
          steps: [
            { title: 'Hammer & rotation', text: '[1] drives the baseline and [4] sets the hammer screen. This time [x4] rotates out to the corner early to take [2] (the **rotation switch**), and [x2] is supposed to take [4].' },
            { title: 'Dunker spot', text: 'While [x2] is held up by the screen, [4] drops to the **dunker spot** along the baseline under the rim. A short pass from [1] and a layup for [4].' },
          ],
        },
        {
          label: 'Take away the baseline', why: 'Taking away the baseline pushes the drive into the middle. The more help collapses, the more the far side opens, so kick it out.',
          steps: [
            { title: 'Baseline denied', text: '[x1] sits on the baseline side from the start to close the drive (**taking away the baseline**). [1] attacks the crowded middle instead, and [5] moves up to the top to make room.' },
            { title: 'Middle drive & kick-out', text: 'The drive into the middle pulls even [x2] in from the weak side. [1] kicks it out to [2] on the left wing that [x2] just left, and [2] fires the three.' },
          ],
        },
      ],
    },
  },

  start: { o1: [17, 24], o3: [23, 3.5], o5: [6.5, 19.5], o2: [-18, 22], o4: [-9, 9] },
  ball: 'o1',
  steps: [
    {
      title: '셋업',
      dur: 1.3,
      text: '오른쪽 윙의 [1]이 공을 잡고 돌파 기회를 엿봅니다. 공이 없는 왼쪽(약한 쪽)에는 슈터 [2]가 윙에, 빅맨 [4]가 블록에 있습니다. 진짜 작전은 왼쪽에서 일어납니다.',
      move: { o1: { path: [[18, 25]], t: [0.2, 0.8] } },
    },
    {
      title: '베이스라인 돌파 & 해머 스크린',
      dur: 2.1,
      text: '[1]이 베이스라인을 따라 강하게 돌파합니다. 도움 수비가 몰려드는 그 순간, 약한 쪽의 [x2]는 페인트 쪽으로 도움 자세를 잡고 [4]가 그 등 뒤에 **해머 스크린**을 겁니다. [2]는 코너로 미끄러져 내려갑니다.',
      move: {
        o1: [[19, 15.5], [15.5, 8.5], [9.5, 4.5], [5, 3.2]],
        o3: { path: [[21, 18]], t: [0, 0.6] },
        o5: { path: [[1, 19]], t: [0, 0.6] },
        o4: { path: [[-13.5, 11.2]], t: [0.25, 0.75] },
        o2: { path: [[-21.5, 14], [-23, 4]], t: [0.35, 1] },
      },
      screens: [{ by: 'o4', face: [-11, 15], hold: 1.2 }],
      def: {
        d1: { lag: 0.45 },
        d2: { path: [[-11, 15.5]], t: [0, 0.6] },
        d3: { path: [[22.6, 9.5], [22, 16.5]], t: [0, 0.65] },   // 돌파 길 바깥으로 [3]을 따라 올라간다
        d5: { path: [[4.5, 8]], t: [0.3, 0.9] },
      },
    },
    {
      title: '해머 패스 & 코너 3점',
      dur: 1.8,
      text: '[1]이 베이스라인 끝에서 반대편 코너로 공을 쭉 던집니다(해머 패스). 스크린에 막힌 [x2]는 코너까지 따라가지 못하고, [2]는 가장 짧은 3점인 **코너 3점**을 던집니다.',
      move: { o1: { path: [[4.5, 3.4]], t: [0, 0.15] } },
      ball: [
        { type: 'skip', to: 'o2', at: 0.1 },
        { type: 'shot', at: 0.62, pts: 3 },
      ],
      def: {
        d2: { path: [[-13.6, 13.9], [-18.6, 8.8]], t: [0.15, 1] },
        d5: { path: [[3.8, 5]], t: [0, 0.4] },
      },
    },
  ],

  // 수비 대응별 분기: 셋업(1단계) 뒤에 갈라진다. 기본(위 2·3단계)은 약한 쪽 [x2]가 돌파를 도우러 들어오는 경우.
  reads: {
    at: 1,
    prompt: '수비는 [1]의 돌파를 어떻게 막을까요?',
    base: { id: 'help', label: '도움 수비', why: '약한 쪽 수비가 돌파를 도우러 들어오면 그 뒤 코너가 빕니다. 해머 스크린이 돌아가는 길까지 막아 줍니다.' },
    options: [
      {
        id: 'no-help',
        label: '노 헬프',
        why: '아무도 도우러 오지 않으면 돌파한 사람 앞이 끝까지 비어 있습니다. 그대로 림까지 갑니다.',
        steps: [
          {
            title: '노 헬프 & 레이업',
            dur: 2.4,
            text: '[x2]가 슈터 [2]에게서 떨어지지 않고, 아무도 돌파를 도우러 오지 않습니다(**노 헬프**). [1]은 베이스라인을 끝까지 파고들어 그대로 레이업을 올립니다.',
            move: {
              o1: { path: [[19, 15.5], [15.5, 8.5], [9.5, 4.5], [3.6, 3.8]], t: [0, 0.88] },
              o3: { path: [[21, 18]], t: [0, 0.6] },
              o5: { path: [[1, 19]], t: [0, 0.6] },
            },
            ball: [{ type: 'shot', at: 0.95, pts: 2 }],
            def: {
              d1: { lag: 0.45 },
              d2: { sag: 0 },
              d4: { sag: 0 },
              d3: { path: [[22.6, 9.5], [22, 16.5]], t: [0, 0.65] },
            },
          },
        ],
      },
      {
        id: 'rotation-switch',
        label: '로테이션 스위치',
        why: '빅맨이 코너 슈터를 맡으러 나가면 골밑의 그 빅맨이 빕니다. 덩커 스팟으로 내려가 받습니다.',
        steps: [
          {
            title: '해머 & 로테이션',
            dur: 2.1,
            text: '[1]이 베이스라인으로 돌파하고 [4]가 해머 스크린을 겁니다. 이번에는 [x4]가 미리 코너로 돌아 나가 [2]를 맡고(**로테이션 스위치**), [x2]가 [4]를 맡기로 합니다.',
            move: {
              o1: [[19, 15.5], [15.5, 8.5], [9.5, 4.5], [5, 3.2]],
              o3: { path: [[21, 18]], t: [0, 0.6] },
              o5: { path: [[1, 19]], t: [0, 0.6] },
              o4: { path: [[-13.5, 11.2]], t: [0.25, 0.75] },
              o2: { path: [[-21.5, 14], [-23, 4]], t: [0.35, 1] },
            },
            screens: [{ by: 'o4', face: [-11, 15], hold: 0.6 }],
            def: {
              d1: { lag: 0.45 },
              d2: { path: [[-11, 15.5]], t: [0, 0.6] },
              d3: { path: [[22.6, 9.5], [22, 16.5]], t: [0, 0.65] },
              d4: { guard: 'o2', path: [[-17.5, 6.6]], t: [0.45, 1] },
              d5: { path: [[4.5, 8]], t: [0.3, 0.9] },
            },
          },
          {
            title: '덩커 스팟',
            dur: 1.8,
            text: '[x2]가 스크린에 막혀 있는 사이 [4]가 골밑 베이스라인 쪽 **덩커 스팟**으로 내려갑니다. [1]의 짧은 패스, [4]의 레이업.',
            move: { o4: { path: [[-7.2, 6.6], [-4.6, 4.4]], t: [0, 0.45] } },
            ball: [
              { type: 'pass', to: 'o4', at: 0.35 },
              { type: 'shot', at: 0.75, pts: 2 },
            ],
            def: { d2: { guard: 'o4', path: [[-9.2, 11.6]], t: [0, 0.6] }, d4: { sag: 0 } },
          },
        ],
      },
      {
        id: 'baseline-deny',
        label: '베이스라인 차단',
        why: '베이스라인을 막으면 중앙으로 몰립니다. 도움 수비가 몰려드는 만큼 반대쪽이 비니 밖으로 빼 줍니다.',
        steps: [
          {
            title: '베이스라인 차단',
            dur: 1.6,
            text: '[x1]이 처음부터 베이스라인 쪽에 서서 돌파 길을 막습니다(**베이스라인 차단**). [1]은 막힌 쪽 대신 수비가 많은 중앙으로 파고들고, [5]는 탑으로 비켜 자리를 내줍니다.',
            move: {
              o1: { path: [[14.5, 23.6], [8.6, 19.6]], t: [0.3, 1] },
              o5: { path: [[4.2, 25.4]], t: [0, 0.5] },
            },
            def: { d1: { path: [[19.6, 21.6], [12.4, 20.6]], t: [0, 1] } },
          },
          {
            title: '중앙 돌파 & 킥아웃',
            dur: 2.0,
            text: '중앙으로 들어오는 돌파에 약한 쪽의 [x2]까지 도우러 들어옵니다. [1]은 [x2]가 비운 왼쪽 윙의 [2]에게 공을 빼 주고, [2]가 3점을 던집니다.',
            move: { o1: { path: [[5.6, 15.6]], t: [0, 0.35] } },
            ball: [
              { type: 'pass', to: 'o2', at: 0.4 },
              { type: 'shot', at: 0.82, pts: 3 },
            ],
            def: {
              d1: { lag: 0.4 },
              d2: { path: [[-3.6, 14.2], [-14.4, 19.2]], t: [0, 1] },
            },
          },
        ],
      },
    ],
  },
};
