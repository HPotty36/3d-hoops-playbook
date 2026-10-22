// 스택 (Stack) — 베이스라인 인바운드
export default {
  id: 'stack',
  name: '스택',
  category: 'blob',
  difficulty: 1,
  aliases: ['stack set', 'line set', '라인'],
  situation: { period: 1, clock: 192, shotClock: 14, score: [22, 24] },
  summary:
    '네 명이 페인트 안에 한 줄로 늘어섰다가(**스택**) 한꺼번에 흩어지는 베이스라인 인바운드 작전입니다. 둘째 자리의 [5]가 내려와 맨 아래 [2]를 위해 스크린을 걸고, 그 사이 수비가 어떻게 따라가느냐를 보고 공을 넣습니다.',
  when:
    '인바운드를 처음 익히는 팀에 좋은 세트입니다. 줄을 선 채로는 수비가 누가 어디로 갈지 알기 어렵고, 흩어지는 순간 빈 곳이 생깁니다.',
  keys: [
    '줄을 선 네 명은 [3]의 신호에 맞춰 동시에 움직여야 수비가 한꺼번에 따라가지 못합니다.',
    '[5]는 [x5]의 옆을 지나 아래로 내려와 [x2]의 길목에 섭니다. 그러면 [x5]는 [5]의 위쪽에 남습니다.',
    '[2]는 [5]의 스크린을 스치듯 지나 코너로 넓게 빠집니다.',
    '[1]은 탑으로 물러나 공을 넣을 곳이 없을 때의 마지막 출구가 됩니다.',
  ],
  counters: [
    { name: '그대로', desc: '모든 수비가 자기 선수를 따라갑니다. 스크린을 걸며 내려온 [5]가 [x5]를 등 뒤에 두고 림으로 굴러 들어갑니다.', read: 'stay-home' },
    { name: '스위치', desc: '[x5]가 [2]를, [x2]가 [5]를 맡습니다. 작은 [x2]를 상대로 [5]가 포스트업합니다.', read: 'switch' },
    { name: '페인트 몰림', desc: '[x2]가 [2]를 버리고 페인트로 처져 [5]를 막습니다. 코너의 [2]가 비어 3점을 던집니다.', read: 'sag' },
  ],

  en: {
    name: 'Stack',
    summary:
      'A baseline out-of-bounds play where four players line up in the paint (the **stack**) and break out all at once. [5], second in line, steps down to screen for [2] at the bottom, and the inbound pass goes wherever the defense\'s answer leaves someone open.',
    when:
      'A good first inbound set. While the line stands, the defense cannot tell who goes where, and the break opens a gap somewhere.',
    keys: [
      'The four in line move at once on [3]\'s signal, so the defense cannot follow them all.',
      '[5] slips past [x5] and steps down into [x2]\'s path. That leaves [x5] on the high side of [5].',
      '[2] runs right off [5]\'s screen and spreads wide to the corner.',
      '[1] drops back to the top as the last outlet if nothing else is open.',
    ],
    counters: [
      { name: 'Stay home', desc: 'Every defender follows its own man. [5], who stepped down to screen, rolls to the rim with [x5] behind.' },
      { name: 'Switch', desc: '[x5] takes [2] and [x2] takes [5]. [5] posts up the smaller [x2].' },
      { name: 'Packed paint', desc: '[x2] leaves [2] and sinks into the paint to stop [5]. [2] is open in the corner for a three.' },
    ],
    steps: [
      { title: 'Stack break', text: '[3] holds the ball out of bounds while four players stand in a line in the paint (the **stack**), every defender locked on its man. On the break [1] drops to the top and [4] clears to the left wing. [5] slips past [x5] and steps down into [x2]\'s path (the **screen**), and [2] runs off it to the right corner.' },
      { title: 'Roll to the rim', text: '[x2] gets past the screen and stays with [2], and [x5] stays home with [5] (the **stay home**). But [x5] is now on the high side, so [5] rolls to the rim with [x5] behind.' },
      { title: 'Layup', text: '[3] passes in to [5] at the rim (the **inbound pass**), and [5] lays it in. [3] steps right onto the court.' },
    ],
    reads: {
      prompt: 'How do [x2] and [x5] handle [5]\'s screen for [2]?',
      base: { label: 'Stay home', why: 'If both stay with their own men, [x5] is left on the high side of [5]. [5] rolls to the rim with [x5] behind.' },
      options: [
        {
          label: 'Switch', why: 'If they switch, the smaller [x2] ends up on [5]. [5] posts up on the block and gets the ball inside.',
          steps: [
            { title: 'Switch', text: '[x5] takes [2] in the corner and [x2] takes [5] (the **switch**). [5] steps out to the right block and holds the smaller [x2] on its back (the **post-up**).' },
            { title: 'Post mismatch', text: '[3] passes in to [5] on the block. [5] spins baseline past [x2] and lays it in.' },
          ],
        },
        {
          label: 'Packed paint', why: 'If [x2] gives up on [2] to stop [5]\'s roll, the corner is empty. Inbound to [2] for a three.',
          steps: [
            { title: 'Packed paint', text: 'As [5] rolls, [x2] gives up on [2] and sinks into the paint to stop [5] (the **help**). Nobody is left with [2] in the right corner.' },
            { title: 'Corner three', text: '[3] inbounds to [2] in the corner, and [2] gets the three off before [x2] can close out.' },
          ],
        },
      ],
    },
  },

  start: { o3: [6, -1.5], o2: [3, 12], o5: [3, 16.4], o4: [3, 21.6], o1: [3, 28.4] },
  ball: 'o3',
  steps: [
    {
      title: '스택 브레이크',
      dur: 2.3,
      text: '[3]이 엔드라인 밖에서 공을 들고, 네 명이 페인트 안에 한 줄로 섭니다(**스택**). 수비는 모두 자기 선수에게 붙어 있습니다. 줄이 흩어지며 [1]은 탑으로 물러나고 [4]는 왼쪽 윙으로 빠집니다. [5]는 [x5]의 옆을 지나 [x2]의 길목으로 내려와 서고(**스크린**), [2]가 그 스크린을 끼고 오른쪽 코너로 빠집니다.',
      move: {
        o1: { path: [[0.6, 29.6]], t: [0.1, 0.5] },
        o4: { path: [[-5, 21.4], [-16.6, 18.4]], t: [0.1, 0.7] },
        o5: { path: [[4.9, 14.6], [5.4, 11.8], [4.8, 9.6]], t: [0.05, 0.4] },
        o2: { path: [[6.6, 13.2], [13.2, 9.4], [22.8, 3.8]], t: [0.3, 1] },
      },
      screens: [{ by: 'o5', face: [2.1, 10], hold: 0.3 }],
      def: { d1: { sag: 0 }, d2: { sag: 0 }, d4: { sag: 0 }, d5: { path: [[2.8, 13.4]], t: [0.2, 0.6] } },
    },
    {
      title: '림으로 롤',
      dur: 1.4,
      text: '[x2]는 스크린을 빠져나가 [2]를 따라가고, [x5]도 [5]에게 그대로 붙어 있습니다(**그대로**). 하지만 [x5]가 [5]의 위쪽에 남아 있어, [5]는 [x5]를 등 뒤에 두고 림으로 굴러 들어갑니다.',
      move: { o5: { path: [[3.8, 7.8], [2.2, 6.4]], t: [0.1, 0.8] } },
      def: { d5: { path: [[3.6, 11.6], [3.4, 9.8]], t: [0.1, 0.9] }, d2: { sag: 0 }, d4: { sag: 0.2 } },
    },
    {
      title: '레이업',
      dur: 1.4,
      text: '[3]이 림 앞의 [5]에게 공을 넣고(**인바운드 패스**), [5]가 레이업으로 마무리합니다. [3]은 곧바로 코트로 들어옵니다.',
      move: {
        o3: { path: [[8.4, 2.6]], t: [0.1, 0.55] },
        o5: { path: [[1.4, 5.8]], t: [0.2, 0.5] },
      },
      ball: [
        { type: 'bounce', to: 'o5', at: 0.05 },
        { type: 'shot', at: 0.55, pts: 2 },
      ],
      def: { d5: { path: [[2.8, 8.4]], t: [0, 0.6] }, d2: { sag: 0 } },
    },
  ],

  // 수비 대응별 분기: 스택이 흩어지고 [5]의 스크린이 선 뒤(1단계) 갈라진다. 기본(위 2·3단계)은 그대로.
  reads: {
    at: 1,
    prompt: '[x2]와 [x5]는 [2]를 위한 [5]의 스크린을 어떻게 막을까요?',
    base: { id: 'stay-home', label: '그대로', why: '둘 다 자기 선수를 따라가면 [x5]가 [5]의 위쪽에 남습니다. [5]가 [x5]를 등 뒤에 두고 림으로 굴러 들어갑니다.' },
    options: [
      {
        id: 'switch',
        label: '스위치',
        why: '스위치하면 작은 [x2]가 [5]를 맡습니다. [5]가 블록에서 포스트업해 안쪽에서 공을 받습니다.',
        steps: [
          {
            title: '스위치',
            dur: 1.5,
            text: '[x5]가 코너의 [2]를, [x2]가 [5]를 맡습니다(**스위치**). [5]는 오른쪽 블록으로 나가 작은 [x2]를 등 뒤에 둡니다(**포스트업**).',
            move: { o5: { path: [[7.4, 9]], t: [0.1, 0.6] } },
            def: {
              d5: { guard: 'o2', path: [[7.6, 12.4], [13.4, 8], [17.6, 5.4]], t: [0.1, 0.85] },
              d2: { guard: 'o5', path: [[5.8, 7.2]], t: [0.1, 0.6] },
              d4: { sag: 0.2 },
            },
          },
          {
            title: '포스트 미스매치',
            dur: 1.8,
            text: '[3]이 블록의 [5]에게 공을 넣고, [5]가 베이스라인 쪽으로 돌아 [x2]를 제치고 레이업을 올립니다.',
            move: {
              o5: { path: [[7.6, 5.6], [3.6, 4.4]], t: [0.35, 0.75] },
              o3: { path: [[9.6, 2.4]], t: [0.15, 0.5] },
            },
            ball: [
              { type: 'pass', to: 'o5', at: 0.05 },
              { type: 'shot', at: 0.82, pts: 2 },
            ],
            def: { d2: { path: [[5.4, 7.8], [5.2, 8.2]], t: [0.3, 0.8] }, d5: { sag: 0.2 } },
          },
        ],
      },
      {
        id: 'sag',
        label: '페인트 몰림',
        why: '[x2]가 [5]의 롤을 막으러 [2]를 버리면 코너가 빕니다. 코너의 [2]에게 공을 넣어 3점을 던집니다.',
        steps: [
          {
            title: '페인트 몰림',
            dur: 1.4,
            text: '[5]가 림으로 굴러 들어가자 [x2]가 [2]를 버리고 페인트로 처져 [5]를 막습니다(**도움 수비**). 오른쪽 코너의 [2]에게는 아무도 없습니다.',
            move: { o5: { path: [[3.6, 8]], t: [0.1, 0.7] } },
            def: {
              d2: { path: [[13.2, 6.4], [5.8, 6]], t: [0.05, 0.8] },
              d5: { path: [[3.6, 11.6], [3.4, 11]], t: [0.1, 0.9] },
              d4: { sag: 0.2 },
            },
          },
          {
            title: '코너 3점',
            dur: 1.8,
            text: '[3]이 코너의 [2]에게 공을 넣고, [2]는 급하게 달려 나오는 [x2]보다 먼저 3점을 던집니다.',
            move: { o3: { path: [[8.8, 2.4]], t: [0.3, 0.7] } },
            ball: [
              { type: 'pass', to: 'o2', at: 0.08 },
              { type: 'shot', at: 0.48, pts: 3 },
            ],
            def: { d2: { path: [[11.6, 5.6], [18.4, 4.8]], t: [0.15, 0.6] }, d5: { sag: 0.2 } },
          },
        ],
      },
    ],
  },
};
