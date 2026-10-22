// 트레일러 팝 (Trailer Pop)
export default {
  id: 'trailer-pop',
  name: '트레일러 팝',
  category: 'early',
  difficulty: 1,
  aliases: ['trailer', 'drag and pop', '트레일러', '드래그 앤 팝'],
  summary:
    '공수 전환에서 먼저 림으로 달려간 [5] 뒤로, 늦게 따라오는 빅맨 [4](**트레일러**)가 [1]에게 스크린을 걸고 3점 라인 밖으로 빠집니다(**팝**). 수비 빅맨은 림을 지키느라 트레일러를 놓치기 쉽습니다.',
  when:
    '3점을 던질 수 있는 빅맨이 있을 때, 상대가 공수 전환에서 림부터 지키려고 할 때 씁니다.',
  keys: [
    '[5]는 먼저 림까지 달려가 수비 빅맨 한 명을 페인트 깊숙이 끌고 갑니다.',
    '[4]는 공보다 한 박자 늦게 들어와 탑에서 [x1]에게 스크린을 겁니다.',
    '스크린을 건 [4]는 [1]이 가는 반대쪽 3점 라인 밖으로 빠져 공을 기다립니다.',
    '[2]·[3]은 코너에 서서 수비를 넓게 벌려 둡니다.',
  ],
  counters: [
    { name: '드롭', desc: '트레일러의 수비가 페인트로 물러나 돌파를 막습니다. 3점 라인 밖으로 빠진 [4]가 빕니다.', read: 'drop' },
    { name: '업 투 터치', desc: '트레일러의 수비가 스크린 높이까지 올라와 [1]을 막습니다. 그 뒤 림까지가 빕니다.', read: 'up-to-touch' },
    { name: '스위치', desc: '스크린에서 마크를 바꿉니다. 작은 [x1]이 빅맨 [4]를 맡게 됩니다.', read: 'switch' },
  ],

  en: {
    name: 'Trailer Pop',
    summary:
      'In transition, [5] sprints to the rim first, and the second big, [4] (the **trailer**), arrives late to screen for [1] and then pops out beyond the arc. Defending bigs busy protecting the rim easily lose the trailer.',
    when:
      'When a big can shoot threes, against teams that sprint back to protect the rim first.',
    keys: [
      '[5] sprints all the way to the rim first and drags one defending big deep into the paint.',
      '[4] arrives a beat behind the ball and screens [x1] at the top.',
      'After screening, [4] pops out beyond the arc on the side away from [1].',
      '[2] and [3] stand in the corners to spread the defense.',
    ],
    counters: [
      { name: 'Drop', desc: 'The trailer\'s defender sinks into the paint to stop the drive. [4], popping out beyond the arc, is open.' },
      { name: 'Up to touch', desc: 'The trailer\'s defender comes up to the level of the screen to stop [1], leaving the way to the rim open behind.' },
      { name: 'Switch', desc: 'Trade assignments on the screen. The small [x1] ends up guarding the big, [4].' },
    ],
    steps: [
      { title: 'Drag screen', text: 'Right after the change of possession, [5] sprints to the rim first and [1] brings the ball up. [4] (the **trailer**), a beat behind, sets a screen on the left side of [x1] at the top.' },
      { title: 'Pop', text: '[1] comes off the screen to the left, and [4] **pops** out beyond the arc on the right. [x4] sinks toward the paint to stop the drive (the **drop**).' },
      { title: 'Pop three', text: '[1] draws the defense, then swings it back to [4], who fires the three. [x4], sitting back, is much too far away.' },
    ],
    reads: {
      prompt: 'How does the defense play the trailer\'s screen?',
      base: { label: 'Drop', why: 'If the trailer\'s defender sits back, [4] is open beyond the arc.' },
      options: [
        {
          label: 'Up to touch', why: 'If the trailer\'s defender comes up to the screen, the way to the rim behind is empty. [1] attacks right away.',
          steps: [
            { title: 'Up to touch', text: '[x4] comes up to the level of the screen to cut [1] off (**up to touch**). [1] turns the corner around [x4].' },
            { title: 'Drive & layup', text: '[1] drives into the empty paint and lays it in. [x5] is tied up with [5], who ran to the rim, and cannot help.' },
          ],
        },
        {
          label: 'Switch', why: 'If the defense switches the screen, the small [x1] ends up on the big, [4]. [4] goes to the post.',
          steps: [
            { title: 'Switch', text: '[x4] takes [1] (the **switch**) and [x1] takes [4]. Instead of popping, [4] heads down to the post and seals the smaller [x1] behind (the **seal**).' },
            { title: 'Post-up', text: '[1] feeds [4] in the post, and [4] spins once and finishes at the rim.' },
          ],
        },
      ],
    },
  },

  start: { o1: [4, 35.5], o5: [-2, 33], o4: [-7, 38], o2: [-19, 16], o3: [19, 16] },
  ball: 'o1',
  steps: [
    {
      title: '드래그 스크린',
      dur: 2.0,
      text: '공수 전환 직후, [5]가 먼저 림으로 달려가고 [1]이 공을 몰고 넘어옵니다. 한 박자 늦게 따라온 [4](**트레일러**)가 탑에서 [x1]의 왼쪽에 스크린을 겁니다.',
      move: {
        o1: { path: [[5.4, 32.6]], t: [0, 0.7] },
        o4: { path: [[-2.4, 34.6], [1.4, 29.6]], t: [0, 0.85] },
        o5: { path: [[1.4, 20.2], [5.8, 7.8]], t: [0, 0.95] },
        o2: { path: [[-22.4, 6]], t: [0, 0.9] },
        o3: { path: [[22.4, 6]], t: [0, 0.9] },
      },
      screens: [{ by: 'o4', face: [4.6, 29.4], hold: 0.6 }],
    },
    {
      title: '팝',
      dur: 1.8,
      text: '[1]이 스크린을 타고 왼쪽으로 내려가고, [4]는 오른쪽 3점 라인 밖으로 빠집니다(**팝**). [x4]는 돌파를 막으려고 페인트 쪽으로 물러납니다(**드롭**).',
      move: {
        o1: [[2.6, 33], [-1.8, 31.2], [-5.6, 26.4]],
        o4: { path: [[4.6, 28.4], [10, 27.6]], t: [0.3, 0.85] },
      },
      def: {
        d1: { lag: 0.95 },
        d4: { path: [[-0.6, 23.6], [-2.4, 19.4]] },
      },
    },
    {
      title: '팝 3점',
      dur: 1.6,
      text: '[1]이 수비를 끌어당긴 뒤 [4]에게 공을 돌려주고, [4]가 3점을 던집니다. 물러나 있던 [x4]는 너무 멀리 있습니다.',
      move: { o1: { path: [[-7.4, 22.8]], t: [0, 0.35] } },
      ball: [
        { type: 'pass', to: 'o4', at: 0.15 },
        { type: 'shot', at: 0.55, pts: 3 },
      ],
      def: { d4: { path: [[2.4, 22.4], [5.6, 24.4]], t: [0.25, 0.8] } },
    },
  ],

  // 수비 대응별 분기: 트레일러의 드래그 스크린(1단계) 뒤에 갈라진다. 기본(위 2·3단계)은 드롭.
  reads: {
    at: 1,
    prompt: '수비는 트레일러 [4]의 스크린을 어떻게 막을까요?',
    base: { id: 'drop', label: '드롭', why: '트레일러의 수비가 물러나 있으면, 3점 라인 밖으로 빠진 [4]가 비어 있습니다.' },
    options: [
      {
        id: 'up-to-touch',
        label: '업 투 터치',
        why: '트레일러의 수비가 스크린 높이까지 올라오면, 그 뒤 림까지가 빕니다. [1]이 곧장 파고듭니다.',
        steps: [
          {
            title: '업 투 터치',
            dur: 1.6,
            text: '[x4]가 스크린 높이까지 올라와 [1]의 앞을 막습니다(**업 투 터치**). [1]은 [x4]를 끼고 안쪽으로 방향을 틉니다.',
            move: {
              o1: { path: [[2.6, 33.2], [-1.6, 31.8], [-4.6, 27.8]], t: [0, 0.9] },
              o4: { path: [[4.6, 28.6], [10, 27.6]], t: [0.3, 0.9] },
            },
            def: {
              d1: { lag: 0.95 },
              d4: { path: [[0.2, 32.4], [-1.2, 33]], t: [0, 0.5] },
            },
          },
          {
            title: '돌파 & 레이업',
            dur: 1.8,
            text: '[1]이 비어 있는 페인트로 파고들어 레이업을 올립니다. [x5]는 림으로 달려간 [5]에게 묶여 도와주지 못합니다.',
            move: { o1: { path: [[-5.2, 20.4], [-3.2, 11.6], [-1.4, 7.6]], t: [0, 0.8] } },
            ball: [{ type: 'shot', at: 0.9, pts: 2 }],
            def: {
              d4: { path: [[-3, 27.4], [-3, 18.6]], t: [0, 0.8] },
              d5: { sag: 0 },
            },
          },
        ],
      },
      {
        id: 'switch',
        label: '스위치',
        why: '스크린에서 마크를 바꾸면 작은 [x1]이 빅맨 [4]를 맡게 됩니다. [4]가 골밑에서 자리를 잡습니다.',
        steps: [
          {
            title: '스위치',
            dur: 1.6,
            text: '[x4]가 [1]을 넘겨받고(**스위치**) [x1]이 [4]를 맡습니다. [4]는 팝 대신 골밑으로 내려가 작은 [x1]을 등에 업습니다(**실**).',
            move: {
              o1: { path: [[2.6, 33.2], [-1.4, 32.2]], t: [0, 0.6] },
              o4: { path: [[1.6, 24.4], [-2.6, 15.4]], t: [0.25, 1] },
            },
            def: {
              d4: { guard: 'o1', path: [[0.6, 30.2]], t: [0, 0.4] },
              d1: { guard: 'o4' },
            },
          },
          {
            title: '포스트업',
            dur: 2.0,
            text: '[1]이 골밑의 [4]에게 공을 넣고, [4]가 한 번에 몸을 돌려 림 앞에서 마무리합니다.',
            move: { o4: { path: [[-3.6, 12.4], [-1.8, 8.4]], t: [0.2, 0.7] } },
            ball: [
              { type: 'pass', to: 'o4', at: 0.12 },
              { type: 'shot', at: 0.82, pts: 2 },
            ],
            def: { d1: { sag: 0 } },
          },
        ],
      },
    ],
  },
};
