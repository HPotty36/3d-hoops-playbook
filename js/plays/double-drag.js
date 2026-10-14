// 더블 드래그 (Double Drag)
export default {
  id: 'double-drag',
  name: '더블 드래그',
  category: 'early',
  difficulty: 2,
  aliases: ['double drag screen', 'drag', '드래그'],
  summary:
    '공수 전환 직후, 뒤따라오던 빅맨 두 명이 공을 몰고 오는 [1]에게 연달아 스크린(**드래그 스크린**)을 겁니다. 첫 번째 스크리너는 3점 라인 밖으로 빠지고(**팝**), 두 번째 스크리너는 림으로 굴러 들어가(**롤**) 수비 두 명이 한꺼번에 고민하게 만듭니다.',
  when:
    '수비가 아직 자리를 잡기 전, 공격권이 바뀐 직후에 씁니다. 빅맨 중 한 명이 3점을 던질 수 있으면 위력이 훨씬 커집니다.',
  keys: [
    '두 빅맨은 공보다 뒤에서 달려와, [1]이 가려는 쪽에 차례로 섭니다.',
    '[1]은 두 스크린을 어깨가 스치듯 연달아 타고 내려가며 수비가 따라오는지 봅니다.',
    '첫 번째 스크리너는 3점 라인 밖으로 팝, 두 번째 스크리너는 림으로 롤. 역할을 미리 정해 둡니다.',
    '코너의 [2]·[3]은 넓게 서서 도움 수비를 멀리 둡니다.',
  ],
  counters: [
    { name: '드롭', desc: '두 번째 스크리너의 수비가 페인트로 물러나 돌파를 기다립니다. 그 빅맨이 공을 막으러 올라서는 순간 롤하는 [5]가 빕니다.', read: 'drop' },
    { name: '스위치', desc: '스크린마다 마크를 바꿉니다. 바꾸는 순간 3점 라인 밖으로 빠지는 첫 번째 스크리너를 놓치기 쉽습니다.', read: 'switch' },
    { name: '쇼', desc: '두 번째 스크리너의 수비가 미리 튀어나와 [1]을 막아섭니다. 스크린을 걸기도 전에 [5]가 림으로 빠집니다.', read: 'show' },
  ],

  en: {
    name: 'Double Drag',
    summary:
      'Right after a change of possession, two trailing bigs set back-to-back screens (**drag screens**) for [1] bringing the ball up. The first screener pops out beyond the arc and the second rolls to the rim, so two defenders have to choose at once.',
    when:
      'Right after the ball changes hands, before the defense is set. It is far more dangerous when one of the bigs can shoot threes.',
    keys: [
      'Both bigs trail the ball and line up, one after the other, on the side [1] is heading to.',
      '[1] comes off both screens shoulder to shoulder and reads whether the defense follows.',
      'Decide the roles in advance: the first screener pops to the arc, the second rolls to the rim.',
      '[2] and [3] stay wide in the corners to keep help far away.',
    ],
    counters: [
      { name: 'Drop', desc: 'The second screener\'s defender sinks into the paint to wait for the drive. The moment that big steps up to the ball, the rolling [5] is open.' },
      { name: 'Switch', desc: 'Trade assignments on every screen. In the moment of the switch, the first screener popping out to the arc is easy to lose.' },
      { name: 'Show', desc: 'The second screener\'s defender jumps out early to stop [1], so [5] slips to the rim before the screen is even set.' },
    ],
    steps: [
      { title: 'Double drag', text: 'Right after the change of possession, [1] brings the ball up while [4] and [5] trail in and set two screens in a row on the right side of [x1] (the **drag screens**). [2] and [3] sprint to the corners and stay wide.' },
      { title: 'Off both screens & roll', text: '[1] comes off both screens and heads right. [4] **pops** out beyond the arc on the left, and [5] **rolls** to the rim. [x5] sinks into the paint to wait (the **drop**).' },
      { title: 'Lob & dunk', text: 'The moment [x5] steps up to stop the drive, [1] lobs it to [5] running at the rim, and [5] finishes with a dunk. [x4] cannot leave [4], who popped out, so no help comes.' },
    ],
    reads: {
      prompt: 'How does the defense play the two drag screens?',
      base: { label: 'Drop', why: 'If the second screener\'s defender sits back, the rolling [5] is open the moment that big steps up to the ball.' },
      options: [
        {
          label: 'Switch', why: 'When the defense trades on the screen, the first screener is free for a moment. Pop out and shoot the three.',
          steps: [
            { title: 'Switch', text: 'On the first screen [x4] takes [1] (the **switch**) and [x1] is supposed to take [4]. But [x1] is on the wrong side of the screen and cannot get to [4] popping out to the arc.' },
            { title: 'Pop three', text: '[1] swings it straight back to [4], who fires the three. [x1] runs at [4] but is too late.' },
          ],
        },
        {
          label: 'Show', why: 'If the second screener\'s defender jumps out early, the way to the rim behind is empty. Skip the screen and slip.',
          steps: [
            { title: 'Show', text: '[x5] jumps out above the second screen to stop [1] early (the **show**). [5] never sets the screen and slips straight to the rim.' },
            { title: 'Slip layup', text: '[1] bounces it to [5] diving to the rim, and [5] lays it in. [x5], caught up high, and [x2], helping from the far side, are both too late.' },
          ],
        },
      ],
    },
  },

  start: { o1: [-5, 35.5], o4: [-1, 38], o5: [5, 38], o2: [-19, 18], o3: [18, 20] },
  ball: 'o1',
  steps: [
    {
      title: '더블 드래그',
      dur: 2.0,
      text: '공수 전환 직후, [1]이 공을 몰고 넘어오고 [4]와 [5]가 뒤따라와 [x1]의 오른쪽에 차례로 스크린을 겁니다(**드래그 스크린**). [2]·[3]은 양쪽 코너로 달려가 넓게 섭니다.',
      move: {
        o1: { path: [[-4.2, 33.4]], t: [0, 0.7] },
        o4: { path: [[0.2, 35.2], [0.4, 30.8]], t: [0, 0.8] },
        o5: { path: [[5.4, 34.2], [4.4, 29.6]], t: [0.1, 0.85] },
        o2: { path: [[-22.4, 6]], t: [0, 0.9] },
        o3: { path: [[22.4, 6]], t: [0, 0.9] },
      },
      screens: [
        { by: 'o4', face: [-3.2, 29.8], hold: 0.6 },
        { by: 'o5', face: [1.2, 29], hold: 0.8 },
      ],
    },
    {
      title: '두 스크린 & 롤',
      dur: 1.9,
      text: '[1]이 두 스크린을 연달아 타고 오른쪽으로 내려갑니다. [4]는 왼쪽 3점 라인 밖으로 빠지고(**팝**), [5]는 림으로 굴러 들어갑니다(**롤**). [x5]는 페인트로 물러나는 **드롭** 수비로 기다립니다.',
      move: {
        o1: [[0.4, 33.2], [4.6, 32.2], [8.8, 27.6]],
        o5: { path: [[3.2, 23.4], [1.4, 14.6]], t: [0.4, 1] },
        o4: { path: [[-4.2, 30.4], [-9.4, 27.4]], t: [0.25, 0.85] },
      },
      def: {
        d1: { lag: 0.95 },
        d5: { path: [[5.4, 24.6], [4.6, 18.6]] },
      },
    },
    {
      title: '롭 & 덩크',
      dur: 1.8,
      text: '[x5]가 [1]의 돌파를 막으려고 한 발 올라서는 순간, [1]이 림으로 달려드는 [5]에게 공을 띄워 주고 [5]가 덩크로 마무리합니다. [x4]는 팝한 [4]를 떠날 수 없어 도와주지 못합니다.',
      move: {
        o1: { path: [[11, 22.8]], t: [0, 0.4] },
        o5: { path: [[0.8, 9.8], [0.4, 7.2]], t: [0, 0.55] },
      },
      ball: [
        { type: 'lob', to: 'o5', at: 0.1 },
        { type: 'shot', at: 0.68, pts: 2, kind: 'dunk' },
      ],
      def: {
        d5: { path: [[7.6, 21.2]], t: [0, 0.35] },
        d2: { path: [[-4.6, 10.8], [-2.6, 8.6]], t: [0.25, 0.75] },
      },
    },
  ],

  // 수비 대응별 분기: 드래그 스크린 두 개가 걸린 뒤(1단계 끝) 갈라진다. 기본(위 2·3단계)은 드롭.
  reads: {
    at: 1,
    prompt: '수비는 두 개의 드래그 스크린을 어떻게 막을까요?',
    base: { id: 'drop', label: '드롭', why: '두 번째 스크리너의 수비가 물러나 있으면, 그 빅맨이 공을 막으러 올라오는 순간 롤하는 [5]가 빕니다.' },
    options: [
      {
        id: 'switch',
        label: '스위치',
        why: '스크린에서 마크를 바꾸면, 바꾸는 순간 첫 번째 스크리너가 비어 있습니다. 3점 라인 밖으로 빠져 던집니다.',
        steps: [
          {
            title: '스위치',
            dur: 1.8,
            text: '첫 번째 스크린에서 [x4]가 [1]을 넘겨받고(**스위치**), [x1]이 [4]를 맡기로 합니다. 하지만 [x1]은 스크린 반대편에 있어 3점 라인 밖으로 빠지는 [4]를 바로 따라가지 못합니다.',
            move: {
              o1: { path: [[0.2, 33.4], [3.4, 33]], t: [0, 0.6] },
              o4: { path: [[-4.4, 31.4], [-9.6, 27.8]], t: [0.15, 0.8] },
              o5: { path: [[3.6, 23.4], [2, 15]], t: [0.35, 1] },
            },
            def: {
              d4: { guard: 'o1', path: [[1.8, 31.2]], t: [0, 0.4] },
              d1: { guard: 'o4', path: [[-2.2, 28.6], [-4.4, 26.4]], t: [0.3, 1] },
            },
          },
          {
            title: '팝 3점',
            dur: 1.4,
            text: '[1]이 곧장 [4]에게 공을 돌려주고, [4]가 3점을 던집니다. [x1]이 뒤늦게 달려가지만 늦었습니다.',
            ball: [
              { type: 'pass', to: 'o4', at: 0.05 },
              { type: 'shot', at: 0.4, pts: 3 },
            ],
            def: { d1: { path: [[-7.6, 26.2]], t: [0.3, 0.9] } },
          },
        ],
      },
      {
        id: 'show',
        label: '쇼',
        why: '두 번째 스크리너의 수비가 미리 튀어나오면 그 뒤 림까지가 빕니다. 스크린을 걸지 않고 바로 빠집니다.',
        steps: [
          {
            title: '쇼',
            dur: 1.6,
            text: '[x5]가 [1]을 막으려고 두 번째 스크린 위로 미리 튀어나옵니다(**쇼**). [5]는 스크린을 걸지 않고 곧장 림으로 빠집니다(**슬립**).',
            move: {
              o1: { path: [[0.2, 33.4], [3, 33.2]], t: [0, 0.6] },
              o5: { path: [[3.6, 25.2], [2.2, 17.8]], t: [0.15, 0.9] },
              o4: { path: [[-4.2, 30.6], [-9.4, 27.6]], t: [0.3, 0.9] },
            },
            def: { d5: { path: [[6.6, 28.6], [5.8, 32]], t: [0, 0.5] } },
          },
          {
            title: '슬립 레이업',
            dur: 1.6,
            text: '[1]이 림으로 빠지는 [5]에게 바운스 패스를 넣고 [5]가 레이업으로 마무리합니다. 높이 나와 있던 [x5]도, 반대쪽에서 도우러 온 [x2]도 늦었습니다.',
            move: { o5: { path: [[1.2, 9.2]], t: [0, 0.45] } },
            ball: [
              { type: 'bounce', to: 'o5', at: 0.1 },
              { type: 'shot', at: 0.68, pts: 2 },
            ],
            def: {
              d5: { path: [[4.2, 22], [2.6, 14]], t: [0.1, 0.8] },
              d2: { path: [[-5, 11.4], [-2.8, 9.2]], t: [0.2, 0.7] },
            },
          },
        ],
      },
    ],
  },
};
