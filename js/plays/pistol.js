// 피스톨 (Pistol, 21)
export default {
  id: 'pistol',
  name: '피스톨 (21)',
  category: 'early',
  difficulty: 2,
  aliases: ['21', 'pistol action', 'early handoff', '21 액션'],
  summary:
    '공수 전환 직후, [1]이 공을 몰고 윙으로 가며 코너에서 올라오는 [2]에게 바로 손으로 건네줍니다(**핸드오프**). 1번이 2번에게 건네는 동작이라 **21**이라고도 부릅니다. 수비가 자리를 잡기 전에 2대2를 시작합니다.',
  when:
    '공격 전환이 빠른 팀이 하프코트 세트를 부르기 전에, 가드 두 명이 먼저 공격을 시작하고 싶을 때 씁니다.',
  keys: [
    '[1]은 윙 쪽으로 드리블하며 속도를 줄이고, 몸으로 [x2]의 길을 막는 스크린이 되어 줍니다.',
    '[2]는 코너에서 사이드라인을 따라 올라와 [1]의 바깥쪽을 돌아 공을 받습니다.',
    '[5]는 먼저 림으로 달려가 수비 빅맨을 페인트에 묶어 둡니다.',
    '[4]는 뒤에서 따라와 탑에 머물며 공을 돌려받을 자리를 지킵니다.',
  ],
  counters: [
    { name: '드롭', desc: '건네준 사람의 수비가 페인트 쪽으로 물러나 돌파를 기다립니다. 공을 받은 [2]가 코너를 돌아 속도로 파고듭니다.', read: 'drop' },
    { name: '쇼', desc: '건네준 사람의 수비가 튀어나와 [2]의 코너 돌기를 막습니다. 그 뒤로 건넨 [1]이 림으로 굴러갑니다.', read: 'show' },
    { name: '핸드오프 차단', desc: '받으러 오는 길을 미리 막아 핸드오프 자체를 끊습니다. 등 뒤로 백도어가 열립니다.', read: 'deny' },
    { name: '스위치', desc: '핸드오프 순간 마크를 바꿉니다. 작은 수비가 큰 선수를 맡게 되는 미스매치가 생깁니다.', read: 'switch' },
  ],

  en: {
    name: 'Pistol (21)',
    summary:
      'Right after a change of possession, [1] dribbles toward the wing and hands the ball straight to [2] coming up from the corner (a **dribble handoff**). Because the 1 hands it to the 2, it is also called **21**. It starts a two-man game before the defense is set.',
    when:
      'For teams that push the pace: the two guards start the offense before any half-court set is called.',
    keys: [
      '[1] dribbles toward the wing, slows down, and uses the body as a screen on [x2].',
      '[2] runs up the sideline from the corner and comes around the outside of [1] to take the ball.',
      '[5] sprints to the rim first and pins the defending big in the paint.',
      '[4] trails in and stays at the top as an outlet.',
    ],
    counters: [
      { name: 'Drop', desc: 'The handoff man\'s defender sinks toward the paint to wait for the drive. [2] turns the corner and wins with speed.' },
      { name: 'Show', desc: 'The handoff man\'s defender jumps out to stop [2] turning the corner, and [1] rolls to the rim behind.' },
      { name: 'Deny the handoff', desc: 'Jump the path to the ball and cut the handoff off. The backdoor opens behind.' },
      { name: 'Switch', desc: 'Trade assignments at the handoff. A small defender ends up on a bigger player: a mismatch.' },
    ],
    steps: [
      { title: 'Pistol entry', text: 'Right after the change of possession, [1] pushes the ball toward the right wing while [2] comes up from the corner. [5] sprints to the rim first and [4] trails in to the top.' },
      { title: 'Handoff', text: '[1] hands the ball to [2] (the **handoff**) and blocks [x2]\'s path with the body. [x1] sits back to take away the drive (the **drop**).' },
      { title: 'Turn the corner & layup', text: '[2] turns the corner around [1] and drives straight to the rim. [x2] is stuck on the handoff, and [x1], sitting back, cannot match the speed.' },
    ],
    reads: {
      prompt: 'How does the defense play the handoff from [1] to [2]?',
      base: { label: 'Drop', why: 'If the handoff man\'s defender sits back, turn the corner the moment you catch it and attack.' },
      options: [
        {
          label: 'Show', why: 'If the handoff man\'s defender jumps out at the ball, [1] rolls to the rim behind.',
          steps: [
            { title: 'Show', text: '[x1] jumps out in front of [2] to stop the turn (the **show**). At that moment [1], who just handed it off, rolls to the rim.' },
            { title: 'Roll layup', text: '[2] bounces it to [1], who lays it in. [x5] is tied up with [5], who ran to the rim, and is too late.' },
          ],
        },
        {
          label: 'Deny the handoff', why: 'If the defender jumps the path to the ball, the way to the rim behind is open. Cut backdoor.',
          steps: [
            { title: 'Handoff deny', text: '[x2] jumps into the path between [2] and [1] to take the handoff away (the **deny**).' },
            { title: 'Backdoor', text: '[2] cuts back behind [x2] toward the rim (the **backdoor cut**), takes the bounce pass from [1] and lays it in.' },
          ],
        },
        {
          label: 'Switch', why: 'If the defense switches the handoff, the smallest defender, [x1], ends up on [2]. Attack that mismatch right away.',
          steps: [
            { title: 'Switch', text: 'At the handoff [x1] takes [2] and [x2] takes [1] (the **switch**). Now the smaller [x1] has to guard [2].' },
            { title: 'Attack the mismatch', text: '[2] backs [x1] down toward the block (the **post-up**) and rises over the smaller defender for a turnaround. [1] clears out to the top to give room.' },
          ],
        },
      ],
    },
  },

  start: { o1: [6, 35.5], o2: [20, 14], o3: [-21, 12], o4: [-6, 38], o5: [-3, 31] },
  ball: 'o1',
  steps: [
    {
      title: '피스톨 세팅',
      dur: 1.8,
      text: '공수 전환 직후, [1]이 공을 몰고 오른쪽 윙으로 향하고 [2]가 코너에서 올라옵니다. [5]는 먼저 림으로 달려가고, [4]는 뒤따라와 탑에 섭니다.',
      move: {
        o1: { path: [[11.6, 30.4], [14.4, 27.8]], t: [0, 0.9] },
        o2: { path: [[19.6, 18.8], [18.8, 23.2]], t: [0.1, 0.95] },
        o5: { path: [[-4, 20], [-7.4, 7.4]], t: [0, 1] },
        o4: { path: [[-8, 32], [-10.4, 27]], t: [0.1, 1] },
        o3: { path: [[-22.4, 5]], t: [0, 0.8] },
      },
    },
    {
      title: '핸드오프',
      dur: 1.6,
      text: '[1]이 [2]에게 공을 건네주며(**핸드오프**) 몸으로 [x2]의 길을 막습니다. [x1]은 돌파를 막으려고 뒤로 물러나 있습니다(**드롭**).',
      move: {
        o1: { path: [[15.2, 27.2]], t: [0, 0.4] },
        o2: { path: [[18.6, 27], [16.8, 29.8], [13.2, 28.2]], t: [0, 0.9] },
      },
      ball: [{ type: 'handoff', to: 'o2', at: 0.5 }],
      screens: [{ by: 'o1', face: [17.2, 25], hold: 0.4 }],
      def: {
        d1: { path: [[11.8, 22.6]], t: [0, 0.6] },
        d2: { path: [[18.4, 24.4], [17.8, 27.6]], t: [0.15, 0.8] },
      },
    },
    {
      title: '코너 돌기 & 레이업',
      dur: 1.9,
      text: '[2]가 [1]을 끼고 안쪽으로 방향을 틀어(**코너 돌기**) 곧장 림까지 파고듭니다. 핸드오프에 걸린 [x2]는 뒤처졌고, 물러나 있던 [x1]도 속도를 따라잡지 못합니다.',
      move: {
        o2: { path: [[10.6, 24.4], [6.2, 15.6], [2.6, 8.8]], t: [0, 0.8] },
        o1: { path: [[19.2, 24.6]], t: [0.5, 0.9] },
      },
      ball: [{ type: 'shot', at: 0.9, pts: 2 }],
      def: {
        d2: { path: [[17.2, 30.4], [12.8, 27.6], [8.8, 19.4]], t: [0, 0.9] },
        d1: { path: [[9, 18.6], [5.6, 12.4]], t: [0.1, 0.85] },
      },
    },
  ],

  // 수비 대응별 분기: 피스톨 세팅(1단계) 뒤, 핸드오프를 어떻게 막느냐로 갈라진다. 기본(위 2·3단계)은 드롭.
  reads: {
    at: 1,
    prompt: '수비는 [1]과 [2]의 핸드오프를 어떻게 막을까요?',
    base: { id: 'drop', label: '드롭', why: '건네준 사람의 수비가 뒤로 물러나 있으면, 공을 받는 순간 안쪽으로 방향을 틀어 파고듭니다.' },
    options: [
      {
        id: 'show',
        label: '쇼',
        why: '건네준 사람의 수비가 공 쪽으로 튀어나오면, 건네준 [1]이 그 뒤로 림까지 굴러 들어갑니다.',
        steps: [
          {
            title: '쇼',
            dur: 1.6,
            text: '[x1]이 코너를 돌려는 [2] 앞으로 튀어나와 길을 막습니다(**쇼**). 그 순간 공을 건넨 [1]이 림으로 굴러 들어갑니다(**롤**).',
            move: {
              o2: { path: [[18.6, 27], [16.8, 29.8], [15.2, 30.2]], t: [0, 0.85] },
              o1: { path: [[15.2, 27.2], [13.8, 22.6], [10.6, 17.2]], t: [0.3, 1] },
            },
            ball: [{ type: 'handoff', to: 'o2', at: 0.45 }],
            def: {
              d1: { path: [[12.4, 27.4], [12.8, 30.4]], t: [0.1, 0.6] },
              d2: { lag: 0.7 },
            },
          },
          {
            title: '롤 레이업',
            dur: 1.6,
            text: '[2]가 [1]에게 바운스 패스를 넣고, [1]이 레이업으로 마무리합니다. [x5]는 림으로 달려간 [5]에게 묶여 있어 늦었습니다.',
            move: { o1: { path: [[6, 10.4], [3.8, 8.2]], t: [0, 0.55] } },
            ball: [
              { type: 'bounce', to: 'o1', at: 0.08 },
              { type: 'shot', at: 0.72, pts: 2 },
            ],
            def: {
              d1: { path: [[11.6, 22.4], [8.4, 15.4]], t: [0.05, 0.85] },
              d5: { path: [[-2.4, 8.8]], t: [0.35, 0.8] },
            },
          },
        ],
      },
      {
        id: 'deny',
        label: '핸드오프 차단',
        why: '받으러 오는 길을 미리 막으면 그 뒤 림까지가 빕니다. 백도어로 찌릅니다.',
        steps: [
          {
            title: '핸드오프 차단',
            dur: 1.4,
            text: '[x2]가 [2]와 [1] 사이로 먼저 뛰어들어 핸드오프 길을 막습니다(**차단**).',
            move: {
              o1: { path: [[15, 27.6]], t: [0, 0.4] },
              o2: { path: [[19.2, 25.4]], t: [0, 0.45] },
            },
            def: { d2: { path: [[17.6, 26.8]], t: [0, 0.55] } },
          },
          {
            title: '백도어',
            dur: 2.0,
            text: '[2]가 방향을 틀어 [x2]의 등 뒤로 림을 향해 끊어 들어가고(**백도어 컷**), [1]의 바운스 패스를 받아 레이업으로 마무리합니다.',
            move: { o2: { path: [[19.4, 20.4], [12.8, 12], [5.4, 7.4]], t: [0, 0.85] } },
            ball: [
              { type: 'bounce', to: 'o2', at: 0.45 },
              { type: 'shot', at: 0.92, pts: 2 },
            ],
            def: { d2: { path: [[18.2, 22.4], [12.6, 15.4]], t: [0.1, 0.85] } },
          },
        ],
      },
      {
        id: 'switch',
        label: '스위치',
        why: '핸드오프에서 마크를 바꾸면 가장 작은 [x1]이 [2]를 맡게 됩니다. 그 차이를 바로 공략합니다.',
        steps: [
          {
            title: '스위치',
            dur: 1.6,
            text: '핸드오프 순간 [x1]이 [2]를, [x2]가 [1]을 맡기로 마크를 바꿉니다(**스위치**). 이제 키가 작은 [x1]이 [2]를 막아야 합니다.',
            move: {
              o1: { path: [[15.2, 27.2]], t: [0, 0.4] },
              o2: { path: [[18.6, 27], [16.8, 29.8], [14.6, 29.2]], t: [0, 0.9] },
            },
            ball: [{ type: 'handoff', to: 'o2', at: 0.5 }],
            screens: [{ by: 'o1', face: [17.2, 25], hold: 0.3 }],
            def: {
              d1: { guard: 'o2', path: [[13.2, 26.2]], t: [0, 0.6] },
              d2: { guard: 'o1' },
            },
          },
          {
            title: '미스매치 공략',
            dur: 2.2,
            text: '[2]가 [x1]을 등지고 블록 쪽으로 밀고 들어가(**포스트업**), 작은 수비 위로 턴어라운드 슛을 올립니다. [1]은 탑으로 빠져 공간을 비워 줍니다.',
            move: {
              o2: { path: [[12.4, 25.2], [10.6, 17.4], [8.4, 12]], t: [0.1, 0.8] },
              o1: { path: [[17.8, 30.6], [12.6, 33.4], [6, 32.4]], t: [0, 0.85] },
            },
            ball: [{ type: 'shot', at: 0.88, pts: 2 }],
            def: { d1: { sag: 0 } },
          },
        ],
      },
    ],
  },
};
