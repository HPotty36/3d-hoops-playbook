// UCLA 컷 (UCLA Cut)
export default {
  id: 'ucla-cut',
  name: 'UCLA 컷',
  category: 'offball',
  difficulty: 2,
  aliases: ['high post back screen', '하이포스트 백스크린', '백스크린 컷'],
  summary:
    '탑의 [1]이 윙으로 패스한 뒤, 하이포스트(자유투 라인 바로 위)에 선 [5]의 **백스크린**을 스치며 곧장 림으로 컷하는 동작입니다. 패스하고 멈춰 서 있던 가드의 수비수는 등 뒤에서 오는 스크린을 보지 못해 걸리기 쉽습니다.',
  when:
    '하이포스트에 빅맨을 두는 세트에서 공격을 시작할 때, 가드의 수비수가 패스한 뒤 공 쪽으로 고개를 돌리는 습관이 있을 때 씁니다.',
  keys: [
    '[1]은 윙에 패스한 뒤 한 박자 멈춰, 수비가 공 쪽을 보게 만듭니다.',
    '[5]는 [x1]의 등 뒤, 림 쪽에 서서 스크린이 됩니다(**백스크린**).',
    '[1]은 [5]의 어깨를 스치듯 지나 림까지 곧장 컷합니다.',
    '[2]는 윙에서 공을 받아, [1]이 스크린을 지나는 순간 패스합니다.',
  ],
  counters: [
    { name: '스크린에 걸림', desc: '[x1]이 백스크린에 그대로 걸립니다. 림으로 컷하는 [1]이 비어 있습니다.', read: 'caught' },
    { name: '도움 수비', desc: '스크리너의 수비수가 컷하는 [1]을 막으러 내려옵니다. 그 대신 스크리너 [5]가 탑에서 비어 있습니다.', read: 'help' },
    { name: '스위치', desc: '스크린에서 마크를 바꿉니다. 작은 [x1]이 빅맨 [5]를 맡게 됩니다.', read: 'switch' },
  ],
  famous:
    '1960~70년대 존 우든 감독의 UCLA가 하이포스트 공격의 첫 동작으로 즐겨 써서 이 이름이 붙었습니다.',

  en: {
    name: 'UCLA Cut',
    summary:
      '[1] passes from the top to the wing, then cuts straight to the rim off a **back screen** from [5] at the high post, just above the free-throw line. The guard\'s defender, standing still after the pass, cannot see the screen coming from behind.',
    when:
      'To start a set with a big at the high post, or when the guard\'s defender likes to turn and watch the ball after the pass.',
    keys: [
      '[1] passes to the wing and pauses for a beat so the defender looks at the ball.',
      '[5] stands behind [x1], on the rim side, as the screen (the **back screen**).',
      '[1] cuts off [5]\'s shoulder and goes straight to the rim.',
      '[2] catches on the wing and passes the moment [1] comes off the screen.',
    ],
    counters: [
      { name: 'Caught on the screen', desc: '[x1] runs right into the back screen. [1] is open cutting to the rim.' },
      { name: 'Help', desc: 'The screener\'s defender drops to stop [1]\'s cut. In exchange, the screener, [5], is open up top.' },
      { name: 'Switch', desc: 'Trade assignments on the screen. The small [x1] ends up guarding the big, [5].' },
    ],
    famous:
      'Named after the UCLA teams of John Wooden in the 1960s and 70s, who used it as the first move of their high-post offense.',
    steps: [
      { title: 'Wing entry', text: '[1] passes to [2] on the right wing, and [5] steps up above the free-throw line, behind [x1] on the rim side.' },
      { title: 'UCLA cut', text: '[1] cuts off [5]\'s **back screen** straight toward the rim. [x1], who was watching the ball, runs into [5] and is left behind.' },
      { title: 'Layup', text: '[2] hits [1] cutting to the rim, and [1] lays it in.' },
    ],
    reads: {
      prompt: 'How does the defense handle [5]\'s back screen?',
      base: { label: 'Caught on the screen', why: 'If [x1] runs into the back screen, [1] is open all the way to the rim.' },
      options: [
        {
          label: 'Help', why: 'If the screener\'s defender drops to stop the cut, the screener is left alone up top.',
          steps: [
            { title: 'Help', text: '[x5] drops into the lane to cut off [1] (the **help**). As soon as [x5] leaves, [5] pops out to the top of the arc.' },
            { title: 'Top three', text: '[2] swings it to [5] at the top, and [5] shoots the three. [x5] is down in the lane and too late.' },
          ],
        },
        {
          label: 'Switch', why: 'If the defense switches the screen, the small [x1] ends up on the big, [5]. [5] goes to the post.',
          steps: [
            { title: 'Switch', text: '[x5] goes with [1] on the cut and [x1] takes [5] (the **switch**). [5] rolls down toward the block and pins the smaller [x1] on the back (the **seal**).' },
            { title: 'Post seal', text: '[2] feeds [5] in the post, and [5] turns and finishes at the rim.' },
          ],
        },
      ],
    },
  },

  start: { o1: [0, 31], o2: [21, 17], o5: [8, 17], o4: [-20, 18], o3: [-23, 4] },
  ball: 'o1',
  steps: [
    {
      title: '윙 엔트리',
      dur: 1.6,
      text: '[1]이 오른쪽 윙의 [2]에게 패스하고, [5]는 자유투 라인 위로 올라와 [x1]의 뒤쪽, 림 쪽에 섭니다.',
      move: {
        o2: { path: [[20.6, 21]], t: [0, 0.4] },
        o5: { path: [[6.2, 20.4], [1.8, 23.2]], t: [0.3, 1] },
      },
      ball: [{ type: 'pass', to: 'o2', at: 0.38 }],
      screens: [{ by: 'o5', face: [0.4, 25.8], hold: 0.6 }],
      def: { d1: { sag: 0 } },
    },
    {
      title: 'UCLA 컷',
      dur: 2.0,
      text: '[1]이 [5]의 **백스크린**을 스치며 림을 향해 곧장 컷합니다. 공을 보고 있던 [x1]은 [5]에게 부딪혀 뒤처집니다.',
      move: { o1: { path: [[3.4, 28.8], [4.8, 25.2], [5.2, 17], [3.4, 9.6]], t: [0.05, 1] } },
      screens: [{ by: 'o5', face: [0.4, 25.8], hold: 0.3, on: 'd1' }],
      def: { d1: { path: [[1, 26.6], [-0.6, 23.6], [1.2, 19]], t: [0.2, 1] } },
    },
    {
      title: '레이업',
      dur: 1.6,
      text: '[2]가 림으로 컷하는 [1]에게 패스하고, [1]이 레이업으로 마무리합니다.',
      move: { o1: { path: [[2, 7.4]], t: [0, 0.35] } },
      ball: [
        { type: 'bounce', to: 'o1', at: 0.05 },
        { type: 'shot', at: 0.62, pts: 2 },
      ],
      def: { d1: { path: [[3.2, 13.6]], t: [0, 0.7] } },
    },
  ],

  // 수비 대응별 분기: 윙 엔트리(1단계) 뒤, 백스크린을 어떻게 막느냐로 갈라진다. 기본(위 2·3단계)은 스크린에 걸림.
  reads: {
    at: 1,
    prompt: '수비는 [5]의 백스크린을 어떻게 막을까요?',
    base: { id: 'caught', label: '스크린에 걸림', why: '[x1]이 백스크린에 걸리면 림까지 가는 [1]이 비어 있습니다.' },
    options: [
      {
        id: 'help',
        label: '도움 수비',
        why: '스크리너의 수비수가 컷을 막으러 내려오면, 탑의 스크리너가 혼자 남습니다.',
        steps: [
          {
            title: '도움 수비',
            dur: 2.0,
            text: '[x5]가 [1]의 컷을 막으려고 페인트로 내려옵니다(**도움 수비**). [x5]가 떠나자마자 [5]는 3점 라인 밖 탑으로 빠집니다.',
            move: {
              o1: { path: [[3.4, 28.8], [4.8, 25.2], [5.2, 17], [4.6, 13.4]], t: [0.05, 0.85] },
              o5: { path: [[2, 26.4], [1.2, 29.6]], t: [0.5, 0.95] },
            },
            def: {
              d1: { path: [[1, 26.6], [-0.6, 23.6], [1.2, 19]], t: [0.2, 1] },
              d5: { path: [[6.4, 17.6], [4.4, 10.6]], t: [0.1, 0.7] },
            },
          },
          {
            title: '탑 3점',
            dur: 1.6,
            text: '[2]가 탑의 [5]에게 공을 돌리고, [5]가 3점을 던집니다. 페인트까지 내려가 있던 [x5]는 늦었습니다.',
            ball: [
              { type: 'pass', to: 'o5', at: 0.05 },
              { type: 'shot', at: 0.6, pts: 3 },
            ],
            def: {
              d5: { path: [[7.4, 13.4], [5, 20.6]], t: [0.15, 0.8] },
              d1: { path: [[3.2, 16.4]], t: [0, 0.5] },
            },
          },
        ],
      },
      {
        id: 'switch',
        label: '스위치',
        why: '스크린에서 마크를 바꾸면 작은 [x1]이 빅맨 [5]를 맡게 됩니다. [5]가 골밑에서 자리를 잡습니다.',
        steps: [
          {
            title: '스위치',
            dur: 2.0,
            text: '[x5]가 컷하는 [1]을 따라가고 [x1]이 [5]를 맡습니다(**스위치**). [5]는 블록 쪽으로 굴러 내려가 작은 [x1]을 등에 업습니다(**실**).',
            move: {
              o1: { path: [[3.4, 28.8], [4.8, 25.2], [4, 15.6], [-2.4, 11.6]], t: [0.05, 1] },
              o5: { path: [[5.6, 19.8], [7.8, 13]], t: [0.55, 1] },
            },
            def: {
              d5: { guard: 'o1', path: [[3.2, 18.2], [1.8, 13.6], [-0.4, 11.2]], t: [0.3, 1] },
              d1: { guard: 'o5', path: [[1, 26.6], [3.4, 23.4], [6.4, 15.6]], t: [0.3, 1] },
            },
          },
          {
            title: '포스트 실',
            dur: 1.8,
            text: '[2]가 골밑의 [5]에게 공을 넣고, [5]가 몸을 돌려 림 앞에서 마무리합니다.',
            move: { o5: { path: [[4.8, 8.6]], t: [0.35, 0.7] } },
            ball: [
              { type: 'pass', to: 'o5', at: 0.12 },
              { type: 'shot', at: 0.82, pts: 2 },
            ],
            def: { d1: { path: [[8.2, 15.6], [6.6, 11.8]], t: [0, 0.75] } },
          },
        ],
      },
    ],
  },
};
