// 위브 (Weave)
export default {
  id: 'weave',
  name: '위브',
  category: 'onball',
  difficulty: 2,
  aliases: ['weave action', 'handoff weave', 'DHO weave', '핸드오프 위브'],
  summary:
    '세 명이 공을 들고 차례로 엇갈리며 손으로 건네주는 동작(**핸드오프**)을 이어 가는 작전입니다. 핸드오프 하나하나가 움직이는 스크린이 되어, 수비는 매번 따라갈지·바꿀지·아래로 돌지 정해야 합니다.',
  when:
    '빅맨 없이 가드와 윙만으로 공을 돌리며 수비를 흔들고 싶을 때, 또는 2대2 상황을 연달아 만들고 싶을 때 씁니다.',
  keys: [
    '공을 건네는 사람은 받는 사람의 수비 쪽으로 몸을 붙여 스크린이 되어 줍니다.',
    '받는 사람은 핸드오프 직전에 반대로 한 번 속이고 들어와 수비를 스크린에 걸리게 합니다.',
    '건넨 사람은 멈추지 말고 빈자리로 계속 움직여 다음 핸드오프나 킥아웃을 준비합니다.',
    '[5]는 베이스라인 쪽 덩커 스팟에 머물며, 돌파가 들어오면 도움 수비를 붙잡아 둡니다.',
  ],
  counters: [
    { name: '트레일', desc: '받는 사람의 수비가 핸드오프를 뒤에서 따라갑니다. 3점은 막지만 안쪽 돌파를 내줍니다.', read: 'trail' },
    { name: '스위치', desc: '핸드오프마다 마크를 바꿉니다. 틈은 없지만 건넨 사람이 림으로 빠지는 것에 약합니다.', read: 'switch' },
    { name: '언더', desc: '핸드오프 아래(림 쪽)로 돌아 돌파를 막습니다. 대신 핸드오프 직후의 3점을 내줍니다.', read: 'under' },
    { name: '핸드오프 차단', desc: '받으러 오는 길을 미리 막아 핸드오프 자체를 끊습니다. 등 뒤로 백도어가 열립니다.', read: 'handoff-deny' },
  ],

  en: {
    name: 'Weave',
    summary:
      'Three players keep crossing paths and handing the ball off to each other (**dribble handoffs**). Every handoff is a moving screen, so the defense has to decide each time whether to follow, switch, or go under.',
    when:
      'When you want to move the defense with guards and wings alone, or chain one two-man action into the next.',
    keys: [
      'The player handing off sets the body into the receiver\'s defender, becoming a screen.',
      'The receiver fakes the other way first, then comes off the handoff so the defender gets caught on it.',
      'After handing off, keep moving into open space for the next handoff or a kick-out.',
      '[5] waits in the dunker spot on the baseline to hold the help defense when someone drives.',
    ],
    counters: [
      { name: 'Trail', desc: 'The receiver\'s defender follows behind the handoff. It takes away the three but gives up the drive.' },
      { name: 'Switch', desc: 'Trade assignments on every handoff. No gap opens, but the passer slipping to the rim is a problem.' },
      { name: 'Under', desc: 'Go under the handoff, on the rim side, to stop the drive. It gives up a three right off the handoff.' },
      { name: 'Deny the handoff', desc: 'Jump the path to the ball and cut the handoff off. The backdoor opens behind.' },
    ],
    steps: [
      { title: 'First handoff', text: '[1] dribbles toward the left wing, [3] comes up to meet the ball, and [1] hands it off. [3] heads to the top with the ball while [1] fills the left wing.' },
      { title: 'Second handoff', text: '[3] dribbles right toward [2], and [2] comes up to take the next handoff. [x2] chases from behind.' },
      { title: 'Turn the corner & drive', text: '[2] takes the handoff, turns the corner around [3] and drives straight to the rim. [x2] is a step behind and cannot catch up.' },
    ],
    reads: {
      prompt: 'How does the defense play the second handoff?',
      base: { label: 'Trail', why: 'If the receiver\'s defender trails behind, get low on the catch and drive inside.' },
      options: [
        {
          label: 'Switch', why: 'When the defenders trade on the handoff, the passer is free for a moment. Slip straight to the rim.',
          steps: [
            { title: 'Switch', text: 'At the second handoff [x3] takes [2] and [x2] takes [3] (the **switch**). For one beat, [3] is free.' },
            { title: 'Slip layup', text: 'Right after handing off, [3] slips to the rim (the **slip**), catches the bounce pass from [2] and lays it in.' },
          ],
        },
        {
          label: 'Under', why: 'If the defender goes under the handoff, there is space up top. Shoot it right off the handoff.',
          steps: [
            { title: 'Under', text: '[x2] goes **under** the handoff, on the rim side, to take away the drive.' },
            { title: 'Three off the handoff', text: '[x2] is stuck deep under the handoff, too far away to contest. [2] rises for a three right where the handoff happened.' },
          ],
        },
        {
          label: 'Deny the handoff', why: 'Jumping the path to the ball leaves the way to the rim open. Cut backdoor.',
          steps: [
            { title: 'Handoff deny', text: '[x2] jumps into the path between [2] and the ball to take the handoff away (the **deny**).' },
            { title: 'Backdoor', text: '[2] turns and cuts to the rim behind [x2] (the **backdoor cut**), catches the bounce pass from [3] and lays it in.' },
          ],
        },
      ],
    },
  },

  start: { o1: [-6, 30], o3: [-17, 23], o2: [16, 24], o4: [23, 3.5], o5: [-9, 7] },
  ball: 'o1',
  steps: [
    {
      title: '첫 핸드오프',
      dur: 1.7,
      text: '[1]이 왼쪽 윙 쪽으로 드리블하고, [3]이 마중 나와 공을 건네받습니다. [3]은 공을 들고 탑으로 향하고, [1]은 비어 있는 왼쪽 윙을 채웁니다.',
      move: {
        o1: { path: [[-10.8, 26.2], [-16.6, 22.6]], t: [0, 1] },
        o3: { path: [[-15.4, 26.4], [-12.2, 28.6], [-3.6, 29.6]], t: [0.25, 1] },
      },
      ball: [{ type: 'handoff', to: 'o3', at: 0.55 }],
    },
    {
      title: '두 번째 핸드오프',
      dur: 1.6,
      text: '[3]이 오른쪽의 [2]를 향해 드리블하고, [2]가 다음 핸드오프를 받으러 올라옵니다. [x2]는 뒤에서 따라옵니다.',
      move: {
        o3: { path: [[2.6, 28], [7.4, 26.4]], t: [0, 1] },
        o2: { path: [[12.8, 26.6], [7.8, 29.6], [1.8, 30]], t: [0.1, 1] },
      },
      ball: [{ type: 'handoff', to: 'o2', at: 0.7 }],
    },
    {
      title: '코너 돌기 & 돌파',
      dur: 1.9,
      text: '[2]가 핸드오프를 받아 [3]을 끼고 안쪽으로 방향을 틀어 곧장 림까지 파고듭니다. 한 발 늦은 [x2]는 따라잡지 못합니다.',
      move: {
        o2: { path: [[-0.4, 24.2], [0.4, 14.6], [0.6, 8.6]], t: [0, 0.8] },
        o3: { path: [[15.6, 23.4]], t: [0, 0.6] },
      },
      ball: [{ type: 'shot', at: 0.9, pts: 2 }],
      def: { d2: { lag: 0.6 } },
    },
  ],

  // 수비 대응별 분기: 첫 핸드오프(1단계) 뒤에 갈라진다. 기본(위 2·3단계)은 받는 사람의 수비가 뒤에서 따라가는 트레일.
  reads: {
    at: 1,
    prompt: '수비는 두 번째 핸드오프를 어떻게 막을까요?',
    base: { id: 'trail', label: '트레일', why: '핸드오프를 받는 사람의 수비가 뒤에서 따라오면, 공을 받는 순간 몸을 낮춰 안쪽으로 파고듭니다.' },
    options: [
      {
        id: 'switch',
        label: '스위치',
        why: '핸드오프에서 마크를 바꾸면 건넨 사람이 잠깐 비어 있습니다. 곧장 림으로 빠집니다.',
        steps: [
          {
            title: '스위치',
            dur: 1.6,
            text: '두 번째 핸드오프 순간 [x3]가 [2]를, [x2]가 [3]을 맡기로 마크를 바꿉니다(**스위치**). 바꾸는 한 박자 동안 [3]이 비어 있습니다.',
            move: {
              o3: { path: [[2.6, 28], [7.4, 26.4]], t: [0, 1] },
              o2: { path: [[12.8, 26.6], [7.8, 29.6], [1.8, 30]], t: [0.1, 1] },
            },
            ball: [{ type: 'handoff', to: 'o2', at: 0.7 }],
            def: {
              d3: { guard: 'o2', path: [[1.6, 26.4]], t: [0, 0.6] },
              d2: { guard: 'o3', path: [[10.6, 29.4], [8.8, 28.2]], t: [0.1, 0.9] },
            },
          },
          {
            title: '슬립 레이업',
            dur: 1.8,
            text: '공을 건넨 [3]이 그대로 림으로 빠지고(**슬립**), [2]의 바운스 패스를 받아 레이업으로 마무리합니다.',
            move: {
              o3: { path: [[5.6, 20.8], [2.4, 10.4]], t: [0, 0.75] },
              o2: { path: [[2.8, 30.4]], t: [0, 0.3] },
            },
            ball: [
              { type: 'bounce', to: 'o3', at: 0.35 },
              { type: 'shot', at: 0.85, pts: 2 },
            ],
            def: { d2: { path: [[7.8, 23.4], [4.6, 13.8]], t: [0.05, 0.85] } },
          },
        ],
      },
      {
        id: 'under',
        label: '언더',
        why: '핸드오프 아래로 돌면 위쪽이 빕니다. 핸드오프를 받자마자 던집니다.',
        steps: [
          {
            title: '언더',
            dur: 1.6,
            text: '[x2]가 돌파를 막으려고 핸드오프 **아래**(림 쪽)로 돌아갑니다.',
            move: {
              o3: { path: [[2.6, 28], [7.4, 26.4]], t: [0, 1] },
              o2: { path: [[12.8, 26.6], [7.8, 29.6], [1.8, 30]], t: [0.1, 1] },
            },
            ball: [{ type: 'handoff', to: 'o2', at: 0.7 }],
            def: { d2: { path: [[7.8, 23.4], [3.8, 24.2]], t: [0, 0.65] } },
          },
          {
            title: '핸드오프 3점',
            dur: 1.4,
            text: '[x2]는 핸드오프 아래로 너무 깊이 돌아가 [2]를 막을 수 없습니다. [2]는 핸드오프를 받은 그 자리에서 3점을 던집니다.',
            ball: [{ type: 'shot', at: 0.3, pts: 3 }],
            def: { d2: { path: [[3, 25.2]], t: [0, 0.4] } },
          },
        ],
      },
      {
        id: 'handoff-deny',
        label: '핸드오프 차단',
        why: '받으러 오는 길을 앞에서 막으면 그 뒤, 림까지가 빕니다. 백도어로 찌릅니다.',
        steps: [
          {
            title: '핸드오프 차단',
            dur: 1.4,
            text: '[x2]가 [2]와 공 사이로 먼저 뛰어들어 핸드오프 길을 막습니다(**차단**).',
            move: {
              o3: { path: [[3, 29.6]], t: [0, 0.6] },
              o2: { path: [[13.6, 25.6]], t: [0, 0.45] },
            },
            def: { d2: { path: [[10.4, 27.6]], t: [0, 0.55] } },
          },
          {
            title: '백도어',
            dur: 2.0,
            text: '[2]가 방향을 틀어 [x2]의 등 뒤로 림을 향해 끊어 들어가고(**백도어 컷**), [3]의 바운스 패스를 받아 레이업으로 마무리합니다.',
            move: { o2: { path: [[13.2, 18.2], [6.4, 9.6], [2.4, 6.2]], t: [0, 0.85] } },
            ball: [
              { type: 'bounce', to: 'o2', at: 0.48 },
              { type: 'shot', at: 0.92, pts: 2 },
            ],
            def: { d2: { path: [[11.4, 21.2], [6.6, 12.8]], t: [0.1, 0.85] } },
          },
        ],
      },
    ],
  },
};
