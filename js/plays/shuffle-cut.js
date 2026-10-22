// 셔플 컷 (Shuffle Cut)
export default {
  id: 'shuffle-cut',
  name: '셔플 컷',
  category: 'offball',
  difficulty: 2,
  aliases: ['shuffle', 'diagonal cut', '셔플'],
  summary:
    '공에서 먼 쪽 윙의 [3]이 하이포스트(엘보)에 선 [5]의 스크린을 넘어, 반대쪽 블록을 향해 대각선으로 파고드는 컷(**셔플 컷**)입니다. 셔플 오펜스에서는 이 동작을 위치를 바꿔 가며 계속 되풀이합니다.',
  when:
    '수비가 공만 바라보며 공 반대쪽을 비울 때, 큰 선수에게 기대지 않고도 골밑 기회를 만들고 싶을 때 씁니다.',
  keys: [
    '[2]에게 공이 넘어가는 순간 반대쪽 [3]의 컷이 시작됩니다.',
    '[5]는 엘보에 버티고 서서 [x3]가 지나갈 길을 막습니다.',
    '[3]은 [5]의 어깨를 스치며 넘어간 뒤, 반대쪽 블록을 향해 대각선으로 내려갑니다.',
    '[2]는 [3]이 페인트에 들어오는 순간 패스합니다.',
  ],
  counters: [
    { name: '스크린에 걸림', desc: '[x3]가 셔플 스크린에 걸립니다. 대각선으로 파고드는 [3]이 비어 있습니다.', read: 'caught' },
    { name: '스위치', desc: '스크린에서 마크를 바꿉니다. 컷은 막지만, 이어지는 스크린으로 스크리너 [5]가 비게 됩니다.', read: 'switch' },
    { name: '도움 수비', desc: '약한 쪽 수비가 림을 지키러 내려옵니다. 그 대신 그 수비가 떠난 코너가 빕니다.', read: 'help' },
  ],
  famous:
    '1950년대 미국 공군사관학교의 밥 스피어 감독 팀이 널리 알린 셔플 오펜스의 대표 동작입니다.',

  en: {
    name: 'Shuffle Cut',
    summary:
      '[3], on the wing away from the ball, cuts over a screen from [5] at the high post (the elbow) and dives diagonally toward the opposite block (the **shuffle cut**). The shuffle offense keeps repeating this move from changing spots.',
    when:
      'When the defense watches the ball and leaves the far side empty, or to create layups without relying on a big.',
    keys: [
      'The moment the ball reaches [2], [3] starts the cut from the far side.',
      '[5] holds still at the elbow and blocks [x3]\'s path.',
      '[3] brushes over [5]\'s shoulder, then dives diagonally toward the opposite block.',
      '[2] passes the moment [3] gets into the lane.',
    ],
    counters: [
      { name: 'Caught on the screen', desc: '[x3] runs into the shuffle screen. [3] is open diving to the rim.' },
      { name: 'Switch', desc: 'Trade assignments on the screen. It covers the cut, but the next screen frees the screener, [5].' },
      { name: 'Help', desc: 'A weak-side defender drops to protect the rim, leaving the corner that defender came from open.' },
    ],
    famous:
      'The signature cut of the shuffle offense, made famous by Bob Spear\'s Air Force Academy teams in the 1950s.',
    steps: [
      { title: 'Pass to the wing', text: '[1] passes to [2] on the right wing. [3] on the far wing and [5] at the left elbow get ready for the next move.' },
      { title: 'Shuffle cut', text: '[3] cuts over [5]\'s screen and dives diagonally toward the right block (the **shuffle cut**). [x3] runs into [5] and falls behind.' },
      { title: 'Layup', text: '[2] bounces it to [3] diving to the rim, and [3] lays it in.' },
    ],
    reads: {
      prompt: 'How does the defense play [5]\'s shuffle screen?',
      base: { label: 'Caught on the screen', why: 'If [x3] runs into the screen, [3] is open all the way to the rim.' },
      options: [
        {
          label: 'Switch', why: 'A switch covers the cut, but a screen for the screener frees [5].',
          steps: [
            { title: 'Switch', text: '[x5] takes [3] on the cut and [x3] takes [5] (the **switch**). The cut is covered.' },
            { title: 'Screen the screener & jumper', text: '[1] comes down and screens [x3] (**screen the screener**). [5], who set the shuffle screen, comes up off it above the free-throw line, catches the pass from [2] and shoots the jumper.' },
          ],
        },
        {
          label: 'Help', why: 'If a weak-side defender drops to protect the rim, the corner that defender left is open. Kick it out.',
          steps: [
            { title: 'Help', text: 'As [3] dives into the lane, [x4] drops from the left corner to protect the rim (the **help**). [2] still gets the ball to [3].' },
            { title: 'Kick-out three', text: 'With [x4] in front, [3] kicks it out to [4], alone in the left corner (the **kick-out**), and [4] shoots the three.' },
          ],
        },
      ],
    },
  },

  start: { o1: [6, 31], o2: [21, 17], o3: [-19, 20], o5: [-7, 18.6], o4: [-22.6, 4] },
  ball: 'o1',
  steps: [
    {
      title: '윙 패스',
      dur: 1.5,
      text: '[1]이 오른쪽 윙의 [2]에게 패스합니다. 반대쪽 윙의 [3]과 왼쪽 엘보의 [5]가 다음 동작을 준비합니다.',
      move: {
        o2: { path: [[20.6, 20.6]], t: [0, 0.4] },
        o1: { path: [[1.6, 30]], t: [0.5, 1] },
      },
      ball: [{ type: 'pass', to: 'o2', at: 0.35 }],
      def: { d3: { sag: 0.2 }, d4: { sag: 0.2 }, d5: { sag: 0.2 } },
    },
    {
      title: '셔플 컷',
      dur: 2.3,
      text: '[3]이 [5]의 스크린을 넘어 오른쪽 블록을 향해 대각선으로 파고듭니다(**셔플 컷**). [x3]는 [5]에게 걸려 뒤처집니다.',
      move: { o3: { path: [[-12.4, 21.6], [-7, 22], [-2.4, 16.6], [3.6, 10]], t: [0.05, 0.95] } },
      screens: [{ by: 'o5', face: [-10.6, 20.8], hold: 0.4, on: 'd3' }],
      def: { d3: { path: [[-12.6, 20.4], [-8.8, 20.6], [-4.6, 17.4]], t: [0.15, 1] } },
    },
    {
      title: '레이업',
      dur: 1.6,
      text: '[2]가 림으로 파고드는 [3]에게 바운스 패스를 넣고, [3]이 레이업으로 마무리합니다.',
      move: { o3: { path: [[3, 7.6]], t: [0, 0.35] } },
      ball: [
        { type: 'bounce', to: 'o3', at: 0.05 },
        { type: 'shot', at: 0.62, pts: 2 },
      ],
      def: { d3: { path: [[-0.4, 12.6]], t: [0, 0.7] } },
    },
  ],

  // 수비 대응별 분기: 윙 패스(1단계) 뒤, 셔플 스크린을 어떻게 막느냐로 갈라진다. 기본(위 2·3단계)은 스크린에 걸림.
  reads: {
    at: 1,
    prompt: '수비는 [5]의 셔플 스크린을 어떻게 막을까요?',
    base: { id: 'caught', label: '스크린에 걸림', why: '[x3]가 스크린에 걸리면 대각선으로 파고드는 [3]이 림까지 비어 있습니다.' },
    options: [
      {
        id: 'switch',
        label: '스위치',
        why: '스크린에서 마크를 바꾸면 컷은 막히지만, 스크리너 [5]에게 다시 스크린을 걸어 주면 [5]가 빕니다.',
        steps: [
          {
            title: '스위치',
            dur: 2.3,
            text: '[x5]가 컷하는 [3]을 넘겨받고, [x3]가 [5]를 맡습니다(**스위치**). [3]의 컷은 막혔습니다.',
            move: { o3: { path: [[-12.4, 21.6], [-7, 22], [-2.4, 16.6], [3.6, 10]], t: [0.05, 0.95] } },
            screens: [{ by: 'o5', face: [-10.6, 20.8], hold: 0.4 }],
            def: {
              d5: { guard: 'o3', path: [[-4.2, 18.4], [-0.8, 13.6], [2.4, 10.2]], t: [0.25, 1] },
              d3: { guard: 'o5', path: [[-12.8, 19.6], [-9.6, 20.8]], t: [0.2, 0.8] },
            },
          },
          {
            title: '스크리너 스크린 & 점퍼',
            dur: 2.2,
            text: '[1]이 내려와 [x3]에게 스크린을 겁니다(**스크리너 스크린**). 셔플 스크린을 걸었던 [5]가 그 스크린을 타고 자유투 라인 위로 올라와, [2]의 패스를 받아 점퍼를 던집니다.',
            move: {
              o1: { path: [[-6.4, 23.8]], t: [0, 0.4] },
              o5: { path: [[-4.8, 22.2], [-1.6, 25.6]], t: [0.35, 0.8] },
            },
            screens: [{ by: 'o1', face: [-9, 21.4], hold: 0.4 }],
            ball: [
              { type: 'pass', to: 'o5', at: 0.58 },
              { type: 'shot', at: 0.95, pts: 2 },
            ],
            def: { d3: { path: [[-9.2, 21.2], [-5.4, 22.4]], t: [0.3, 1] } },
          },
        ],
      },
      {
        id: 'help',
        label: '도움 수비',
        why: '약한 쪽 수비가 림을 지키러 내려오면, 그 수비가 떠난 코너가 빕니다. 공을 빼 줍니다.',
        steps: [
          {
            title: '도움 수비',
            dur: 2.3,
            text: '[3]이 페인트로 파고드는 순간, 왼쪽 코너의 [x4]가 림을 지키러 내려옵니다(**도움 수비**). [2]는 그래도 [3]에게 공을 넣습니다.',
            move: { o3: { path: [[-12.4, 21.6], [-7, 22], [-2.4, 16.6], [2.6, 11]], t: [0.05, 0.9] } },
            screens: [{ by: 'o5', face: [-10.6, 20.8], hold: 0.4 }],
            ball: [{ type: 'bounce', to: 'o3', at: 0.72 }],
            def: {
              d3: { path: [[-12.6, 20.4], [-8.8, 20.6], [-4.6, 17.4]], t: [0.15, 1] },
              d4: { path: [[-6, 8.6], [0.8, 8.6]], t: [0.3, 1] },
            },
          },
          {
            title: '킥아웃 3점',
            dur: 1.6,
            text: '[x4]가 앞을 막자 [3]이 비어 있는 왼쪽 코너의 [4]에게 공을 빼 주고(**킥아웃**), [4]가 3점을 던집니다.',
            ball: [
              { type: 'pass', to: 'o4', at: 0.15 },
              { type: 'shot', at: 0.62, pts: 3 },
            ],
            def: {
              d4: { path: [[-12.6, 6.4]], t: [0.3, 0.9] },
              d2: { path: [[11.6, 13.2]], t: [0, 0.6] },
            },
          },
        ],
      },
    ],
  },
};
