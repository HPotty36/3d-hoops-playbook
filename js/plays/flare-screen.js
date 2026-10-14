// 플레어 스크린 (Flare Screen)
export default {
  id: 'flare-screen',
  name: '플레어 스크린',
  category: 'offball',
  difficulty: 2,
  aliases: ['flare', 'fade screen', '플레어'],
  summary:
    '공에서 먼 쪽으로 빠지는 슈터를 위해, 슈터의 수비수 앞을 막아 주는 스크린(**플레어 스크린**)입니다. 슈터는 공에서 멀어지며 반대쪽 윙으로 퍼지고(**플레어**), 공은 코트를 가로지르는 **스킵 패스**로 날아갑니다.',
  when:
    '수비가 공 쪽으로 몰려 반대편이 비어 있을 때, 슈터가 공을 받으러 다가오는 대신 멀어지며 받는 것이 더 편할 때 씁니다.',
  keys: [
    '스크리너는 슈터의 수비수가 따라가야 할 길, 즉 슈터가 퍼질 쪽에 섭니다.',
    '[2]는 공을 등지고 반대쪽 윙으로 뒷걸음질하듯 퍼지며, 발을 맞춘 채 공을 받을 준비를 합니다.',
    '[1]은 수비 위로 넘기는 **스킵 패스**를 [2]가 멈추는 순간에 맞춰 던집니다.',
    '[5]·[3]은 공 쪽에 머물러 수비를 그쪽에 붙잡아 둡니다.',
  ],
  counters: [
    { name: '트레일', desc: '슈터의 수비수가 스크린 위로 뒤따라갑니다. 한 발 늦어 스킵 패스를 받은 슈터가 3점을 던집니다.', read: 'trail' },
    { name: '스위치', desc: '스크리너의 수비수가 슈터를 맡습니다. 그 순간 스크리너가 림으로 빠집니다.', read: 'switch' },
    { name: '지름길', desc: '스크린 아래로 먼저 돌아가 슈터가 퍼질 자리를 미리 막습니다. 슈터가 방향을 틀어 림으로 파고듭니다.', read: 'shortcut' },
  ],

  en: {
    name: 'Flare Screen',
    summary:
      'A screen that blocks the shooter\'s defender so the shooter can drift away from the ball (the **flare screen**). The shooter fades out to the far wing (the **flare**), and the ball comes across the floor on a **skip pass**.',
    when:
      'When the defense crowds the ball side and the far side is empty, or when the shooter is more comfortable catching while moving away than coming toward the ball.',
    keys: [
      'The screener stands where the shooter\'s defender has to go, on the side the shooter will drift to.',
      '[2] fades to the far wing with the back to the ball, feet ready to catch and shoot.',
      '[1] times the **skip pass** over the defense to arrive the moment [2] stops.',
      '[5] and [3] stay on the ball side to keep their defenders there.',
    ],
    counters: [
      { name: 'Trail', desc: 'The shooter\'s defender follows over the top of the screen. A step late, the shooter catches the skip pass and shoots the three.' },
      { name: 'Switch', desc: 'The screener\'s defender takes the shooter, and at that moment the screener slips to the rim.' },
      { name: 'Shortcut', desc: 'Go under the screen early to beat the shooter to the spot. The shooter changes direction and cuts to the rim.' },
    ],
    steps: [
      { title: 'Flare screen', text: '[1] dribbles toward the right wing while [4] comes up and sets a screen on the left side of [x2], the side [2] wants to drift to (the **flare screen**).' },
      { title: 'Flare', text: '[2] fades away from the ball toward the left wing, off [4]\'s screen. [x2] has to go over the top of the screen to follow and falls behind (the **trail**).' },
      { title: 'Skip pass & three', text: '[1] throws a **skip pass** over the defense to [2], who catches and shoots the three. [x2] is still recovering from the screen.' },
    ],
    reads: {
      prompt: 'How does the defense play [4]\'s screen for [2]?',
      base: { label: 'Trail', why: 'If [x2] follows over the top of the screen, [x2] is a step late. Throw the skip pass and shoot.' },
      options: [
        {
          label: 'Switch', why: 'If the screener\'s defender takes the shooter, the screener is free for a moment. Slip to the rim.',
          steps: [
            { title: 'Switch', text: 'As [2] fades, [x4] jumps out to take [2] (the **switch**) and [x2] is left with [4]. [4] slips straight to the rim before [x2] gets there.' },
            { title: 'Slip layup', text: '[1] bounces it to [4] cutting into the lane, and [4] lays it in.' },
          ],
        },
        {
          label: 'Shortcut', why: 'If the defender goes under the screen to beat [2] to the wing, the inside opens. Curl back toward the rim.',
          steps: [
            { title: 'Shortcut', text: '[x2] reads the flare and runs under the screen to beat [2] to the wing (the **shortcut**). [2] stops, turns back around [4] and curls into the lane.' },
            { title: 'Curl layup', text: '[1] hits [2] curling to the rim, and [2] lays it in. [x2] is out on the wing, on the wrong side.' },
          ],
        },
      ],
    },
  },

  start: { o1: [10, 29], o2: [-2, 27.4], o4: [-9, 17], o5: [6.5, 8], o3: [23, 4] },
  ball: 'o1',
  steps: [
    {
      title: '플레어 스크린',
      dur: 1.7,
      text: '[1]이 오른쪽 윙으로 드리블하는 사이, [4]가 올라와 [x2]의 왼쪽, 즉 [2]가 퍼지고 싶은 쪽에 스크린을 겁니다(**플레어 스크린**).',
      move: {
        o1: { path: [[14.6, 25.4]], t: [0.1, 0.8] },
        o4: { path: [[-6.4, 20.6], [-3.4, 22.8]], t: [0, 0.85] },
      },
      screens: [{ by: 'o4', face: [-0.6, 23.6], hold: 0.6 }],
    },
    {
      title: '플레어',
      dur: 1.6,
      text: '[2]가 [4]의 스크린을 끼고 공에서 멀어지며 왼쪽 윙으로 퍼집니다. [x2]는 스크린 위로 돌아 따라가느라 한 발 늦습니다(**트레일**).',
      move: { o2: { path: [[-7.6, 27], [-13.8, 24.8], [-19.6, 20.4]], t: [0, 0.85] } },
      screens: [{ by: 'o4', face: [-0.6, 23.6], hold: 0.3, on: 'd2' }],
      def: { d2: { path: [[-1.4, 25.4], [-6.4, 26.4], [-11.6, 24.6]], t: [0.15, 1] } },
    },
    {
      title: '스킵 패스 & 3점',
      dur: 1.7,
      text: '[1]이 수비 머리 위로 **스킵 패스**를 던지고, [2]가 받자마자 3점을 던집니다. [x2]는 아직 스크린에서 빠져나오는 중입니다.',
      ball: [
        { type: 'skip', to: 'o2', at: 0.05 },
        { type: 'shot', at: 0.66, pts: 3 },
      ],
      def: { d2: { path: [[-15.4, 22.6]], t: [0, 0.75] } },
    },
  ],

  // 수비 대응별 분기: 플레어 스크린이 걸린 뒤(1단계 끝) 갈라진다. 기본(위 2·3단계)은 [x2]가 뒤따라가는 트레일.
  reads: {
    at: 1,
    prompt: '수비는 [2]를 위한 [4]의 스크린을 어떻게 막을까요?',
    base: { id: 'trail', label: '트레일', why: '[x2]가 스크린 위로 뒤따라오면 한 발 늦습니다. 스킵 패스를 받아 바로 던집니다.' },
    options: [
      {
        id: 'switch',
        label: '스위치',
        why: '스크리너의 수비수가 슈터를 맡으면 그 순간 스크리너가 비어 있습니다. 림으로 빠집니다.',
        steps: [
          {
            title: '스위치',
            dur: 1.6,
            text: '[2]가 퍼지는 순간 [x4]가 튀어나와 [2]를 맡고(**스위치**), [x2]가 [4]를 맡게 됩니다. [4]는 [x2]가 오기 전에 곧장 림으로 빠집니다.',
            move: {
              o2: { path: [[-7.6, 27], [-13.8, 24.8], [-19.6, 20.4]], t: [0, 0.85] },
              o4: { path: [[-3.6, 17.4], [-1.2, 11.6]], t: [0.3, 1] },
            },
            def: {
              d4: { guard: 'o2', path: [[-9.6, 22.4], [-16.4, 19.6]], t: [0.1, 0.9] },
              d2: { guard: 'o4', path: [[0.8, 20.2], [1.6, 15.2]], t: [0.25, 1] },
            },
          },
          {
            title: '슬립 레이업',
            dur: 1.6,
            text: '[1]이 페인트로 파고드는 [4]에게 바운스 패스를 넣고, [4]가 레이업으로 마무리합니다.',
            move: { o4: { path: [[-0.6, 7.6]], t: [0, 0.45] } },
            ball: [
              { type: 'bounce', to: 'o4', at: 0.08 },
              { type: 'shot', at: 0.68, pts: 2 },
            ],
            def: {
              d2: { path: [[1.6, 11.2]], t: [0, 0.6] },
              d4: { path: [[-17, 19.6]], t: [0, 0.4] },
            },
          },
        ],
      },
      {
        id: 'shortcut',
        label: '지름길',
        why: '수비가 스크린 아래로 먼저 돌아 윙을 막으면 안쪽이 빕니다. 방향을 틀어 림으로 파고듭니다.',
        steps: [
          {
            title: '지름길',
            dur: 1.6,
            text: '[x2]가 플레어를 읽고 스크린 아래로 먼저 돌아 윙을 막습니다(**지름길**). [2]는 멈춰 서서 [4]를 끼고 몸을 돌려 페인트 쪽으로 파고듭니다(**컬**).',
            move: { o2: { path: [[-6.4, 27], [-6.2, 24.2], [-5.6, 20.2], [-3.6, 15.4]], t: [0.1, 1] } },
            screens: [{ by: 'o4', face: [-0.6, 23.6], hold: 0.3 }],
            def: { d2: { path: [[-0.8, 19.4], [-8.6, 18.2], [-14.2, 21]], t: [0, 0.6] } },
          },
          {
            title: '컬 레이업',
            dur: 1.6,
            text: '[1]이 림으로 파고드는 [2]에게 패스하고, [2]가 레이업으로 마무리합니다. [x2]는 윙 쪽, 엉뚱한 곳에 서 있습니다.',
            move: { o2: { path: [[-1.6, 9.4]], t: [0, 0.45] } },
            ball: [
              { type: 'pass', to: 'o2', at: 0.08 },
              { type: 'shot', at: 0.66, pts: 2 },
            ],
            def: { d2: { path: [[-10.4, 16.6]], t: [0.1, 0.8] } },
          },
        ],
      },
    ],
  },
};
