// 지퍼 (Zipper)
export default {
  id: 'zipper',
  name: '지퍼',
  category: 'offball',
  difficulty: 1,
  aliases: ['zipper cut', 'Z cut', '지퍼 컷'],
  summary:
    '골밑 블록에 있던 [2]가 엘보의 스크린을 스치며 페인트 옆 선을 따라 탑까지 곧장 올라오는 컷(**지퍼 컷**)입니다. 지퍼를 올리듯 아래에서 위로 쭉 올라온다고 해서 이렇게 부릅니다. 공을 탑에서 받아 공격을 시작하거나 바로 슛을 던집니다.',
  when:
    '수비가 공을 잡은 가드를 강하게 압박할 때 공을 안전하게 넘겨받는 방법으로, 또는 슈터에게 탑에서 슛 기회를 만들어 줄 때 씁니다.',
  keys: [
    '[2]는 블록에서 수비를 몸으로 밀어 놓은 뒤, 페인트 옆 선을 따라 곧게 올라옵니다.',
    '[4]는 엘보 근처에서 [x2]가 올라올 길에 서서 스크린이 됩니다.',
    '[2]는 탑에서 발을 맞추고 공을 받습니다. 수비가 앞을 막으면 바로 림 쪽으로 돌아섭니다.',
    '[1]은 [2]가 스크린을 지나는 순간에 맞춰 패스합니다.',
  ],
  counters: [
    { name: '트레일', desc: '[x2]가 [2]의 뒤를 따라 스크린을 지나갑니다. 한 발 늦어 탑에서 받은 [2]가 바로 슛을 던집니다.', read: 'trail' },
    { name: '탑 락킹', desc: '[x2]가 [2]보다 먼저 위쪽으로 올라가 공을 받을 길을 막습니다. 그 뒤로 백도어가 열립니다.', read: 'top-lock' },
    { name: '스위치', desc: '스크리너의 수비수가 [2]를 맡습니다. 그 순간 스크리너 [4]가 림으로 빠집니다.', read: 'switch' },
  ],

  en: {
    name: 'Zipper',
    summary:
      '[2] starts on the block and runs straight up the lane line past a screen at the elbow, all the way to the top (the **zipper cut**). It gets the name from going straight up from bottom to top, like pulling up a zipper. [2] catches at the top to start the offense or to shoot right away.',
    when:
      'As a safe way to get the ball when the defense pressures the guard, or to give a shooter a shot at the top.',
    keys: [
      '[2] pins the defender on the block first, then runs straight up the lane line.',
      '[4] stands near the elbow in the path [x2] has to take, becoming the screen.',
      '[2] squares up at the top to catch. If the defender jumps in front, turn back toward the rim right away.',
      '[1] passes the moment [2] comes past the screen.',
    ],
    counters: [
      { name: 'Trail', desc: '[x2] follows [2] past the screen from behind. A step late, so [2] catches at the top and shoots.' },
      { name: 'Top lock', desc: '[x2] gets above [2] early to take away the catch, which opens the backdoor behind.' },
      { name: 'Switch', desc: 'The screener\'s defender takes [2], and at that moment the screener, [4], slips to the rim.' },
    ],
    steps: [
      { title: 'Zipper screen', text: '[1] brings the ball to the right slot. [4] steps up to the left elbow to set the screen, and [2] starts up the lane line from the left block.' },
      { title: 'Zipper cut', text: '[2] runs straight up past [4] toward the top (the **zipper cut**). [x2] has to follow behind and gets caught on the screen (the **trail**).' },
      { title: 'Catch & three', text: '[1] passes to [2] at the top, and [2] squares up and shoots the three. [x2] is still coming around the screen.' },
    ],
    reads: {
      prompt: 'How does the defense guard [2]\'s cut up the lane?',
      base: { label: 'Trail', why: 'If [x2] follows behind, [x2] is a step late at the top. Catch and shoot.' },
      options: [
        {
          label: 'Top lock', why: 'If [x2] gets above [2] to take away the catch, the way to the rim behind is empty. Cut backdoor.',
          steps: [
            { title: 'Top lock', text: '[x2] runs above [2] to sit in the path of the pass (the **top lock**). [2] cannot catch it at the top.' },
            { title: 'Backdoor', text: '[2] plants and cuts back behind [x2] toward the rim (the **backdoor cut**), takes the bounce pass from [1] and lays it in.' },
          ],
        },
        {
          label: 'Switch', why: 'If the screener\'s defender takes [2], the screener is free for a moment. Slip to the rim.',
          steps: [
            { title: 'Switch', text: 'As [2] comes up, [x4] steps out to take [2] (the **switch**) and [x2] is left with [4]. [4] slips to the rim before [x2] can get there.' },
            { title: 'Slip layup', text: '[1] bounces it to [4] in the lane, and [4] lays it in.' },
          ],
        },
      ],
    },
  },

  start: { o1: [6, 34], o2: [-7.2, 7], o4: [-11, 15], o5: [7, 8], o3: [23, 4] },
  ball: 'o1',
  steps: [
    {
      title: '지퍼 스크린',
      dur: 1.6,
      text: '[1]이 공을 몰고 오른쪽 슬롯으로 옵니다. [4]가 왼쪽 엘보로 올라가 스크린을 걸고, [2]는 왼쪽 블록에서 페인트 옆 선을 따라 올라오기 시작합니다.',
      move: {
        o1: { path: [[7.6, 30.4]], t: [0, 0.8] },
        o4: { path: [[-9.8, 18.8]], t: [0, 0.6] },
        o2: { path: [[-7, 10.6], [-7, 14.2]], t: [0.25, 1] },
      },
      screens: [{ by: 'o4', face: [-8.6, 15], hold: 0.6 }],
    },
    {
      title: '지퍼 컷',
      dur: 1.4,
      text: '[2]가 [4]를 스치며 탑을 향해 곧장 올라옵니다(**지퍼 컷**). [x2]는 뒤에서 따라오다 스크린에 걸립니다(**트레일**).',
      move: { o2: { path: [[-6.8, 19.4], [-6.2, 25], [-5, 29.4]], t: [0, 0.85] } },
      def: { d2: { path: [[-6.2, 13.4], [-5.4, 18.6], [-4.8, 22.6]], t: [0.1, 1] } },
    },
    {
      title: '캐치 & 3점',
      dur: 1.6,
      text: '[1]이 탑의 [2]에게 패스하고, [2]가 발을 맞춰 3점을 던집니다. [x2]는 아직 스크린을 돌아 나오는 중입니다.',
      ball: [
        { type: 'pass', to: 'o2', at: 0.05 },
        { type: 'shot', at: 0.5, pts: 3 },
      ],
      def: { d2: { path: [[-4.6, 24.6]], t: [0, 0.7] } },
    },
  ],

  // 수비 대응별 분기: [2]가 블록에서 출발한 뒤(1단계 끝) 갈라진다. 기본(위 2·3단계)은 뒤따라가는 트레일.
  reads: {
    at: 1,
    prompt: '수비는 페인트 옆으로 올라오는 [2]를 어떻게 막을까요?',
    base: { id: 'trail', label: '트레일', why: '[x2]가 뒤에서 따라오면 탑에서 한 발 늦습니다. 받자마자 던집니다.' },
    options: [
      {
        id: 'top-lock',
        label: '탑 락킹',
        why: '[x2]가 [2]보다 위로 올라가 공을 받을 길을 막으면, 그 뒤 림까지가 빕니다. 백도어로 찌릅니다.',
        steps: [
          {
            title: '탑 락킹',
            dur: 1.4,
            text: '[x2]가 [2]보다 먼저 위쪽으로 올라가 패스 길에 섭니다(**탑 락킹**). [2]는 탑에서 공을 받을 수 없습니다.',
            move: { o2: { path: [[-7, 17]], t: [0, 0.45] } },
            def: { d2: { path: [[-3.6, 15.6], [-4.4, 20.8]], t: [0, 0.55] } },
          },
          {
            title: '백도어',
            dur: 1.8,
            text: '[2]가 멈춰 서서 [x2]의 등 뒤로 림을 향해 끊어 들어가고(**백도어 컷**), [1]의 바운스 패스를 받아 레이업으로 마무리합니다.',
            move: { o2: { path: [[-5.6, 13.4], [-2, 7.6]], t: [0, 0.7] } },
            ball: [
              { type: 'bounce', to: 'o2', at: 0.3 },
              { type: 'shot', at: 0.84, pts: 2 },
            ],
            def: { d2: { path: [[-4.8, 17.6], [-3.4, 12.4]], t: [0.15, 0.85] } },
          },
        ],
      },
      {
        id: 'switch',
        label: '스위치',
        why: '스크리너의 수비수가 [2]를 맡으면 그 순간 스크리너가 비어 있습니다. 림으로 빠집니다.',
        steps: [
          {
            title: '스위치',
            dur: 1.4,
            text: '[2]가 올라오는 순간 [x4]가 나와 [2]를 맡고(**스위치**), [x2]가 [4]를 맡게 됩니다. [4]는 [x2]가 오기 전에 림으로 빠집니다.',
            move: {
              o2: { path: [[-6.8, 19.4], [-6.2, 25], [-5, 29.4]], t: [0, 0.85] },
              o4: { path: [[-9.4, 14], [-5, 9]], t: [0.35, 1] },
            },
            def: {
              d4: { guard: 'o2', path: [[-5.2, 20.6], [-4.6, 25.6]], t: [0.1, 0.9] },
              d2: { guard: 'o4', path: [[-5.6, 13.6]], t: [0.2, 0.8] },
            },
          },
          {
            title: '슬립 레이업',
            dur: 1.6,
            text: '[1]이 페인트의 [4]에게 바운스 패스를 넣고, [4]가 레이업으로 마무리합니다.',
            move: { o4: { path: [[-2.4, 7]], t: [0, 0.4] } },
            ball: [
              { type: 'bounce', to: 'o4', at: 0.08 },
              { type: 'shot', at: 0.7, pts: 2 },
            ],
            def: {
              d2: { path: [[-2.6, 10]], t: [0, 0.6] },
              d4: { path: [[-4.8, 26]], t: [0, 0.4] },
            },
          },
        ],
      },
    ],
  },
};
