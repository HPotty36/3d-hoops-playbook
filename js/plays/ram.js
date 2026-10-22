// 램 (Ram) — 타임아웃 후 작전
export default {
  id: 'ram',
  name: '램',
  category: 'ato',
  difficulty: 3,
  aliases: ['ram screen', 'ram action', '램 스크린'],
  situation: { period: 3, clock: 134, shotClock: 24, score: [70, 66] },
  summary:
    '윙의 [2]가 먼저 내려와 빅맨 [5]의 수비에게 스크린을 걸고(**램 스크린**), 그 스크린을 타고 올라온 [5]가 [1]에게 볼 스크린을 거는 픽 앤 롤입니다. [x5]가 램 스크린에 걸려 픽 앤 롤 수비에 늦게 도착합니다.',
  when:
    '상대 빅맨이 픽 앤 롤 수비를 잘해서, 그 빅맨을 먼저 흔들어 놓고 2대2를 시작하고 싶을 때 씁니다. 타임아웃 뒤 첫 공격으로 자주 나옵니다.',
  keys: [
    '[2]는 [x5]의 위쪽에 멈춰 서서 스크린을 겁니다. [5]는 그 옆을 스치듯 올라옵니다.',
    '[5]는 [1]의 수비 [x1]의 옆에 스크린을 세우고, [1]은 [5]가 자리를 잡은 뒤 출발합니다.',
    '램 스크린을 건 [2]는 그 뒤 수비를 보고 림으로 빠지거나(슬립) 코너로 빠집니다(팝).',
    '[1]은 [5]와 [2]를 함께 봅니다. 수비가 한 명을 막으면 다른 한 명이 빕니다.',
  ],
  counters: [
    { name: '드롭', desc: '램 스크린에 걸린 [x5]가 깊이 물러섭니다. 굴러 나온 [5]에게 짧은 포켓 패스가 들어가고, [5]가 플로터를 올립니다.', read: 'drop' },
    { name: '스위치', desc: '[x5]와 [x2]가 램 스크린에서 서로 바꿔 막습니다. [x5]가 [2]를 막으러 위로 올라오는 순간 [2]가 림으로 빠집니다(슬립).', read: 'switch' },
    { name: '헤지', desc: '[x5]가 [1]에게 강하게 뛰쳐나가고, [x2]가 굴러 들어가는 [5]를 막으러 내려옵니다. 코너로 빠진 [2]가 3점을 던집니다.', read: 'hedge' },
  ],

  en: {
    name: 'Ram',
    summary:
      'A pick and roll where [2] first comes down from the wing to screen the big\'s defender (the **ram screen**), and [5] comes up off it to set a ball screen for [1]. Held up on the ram screen, [x5] gets to the pick and roll late.',
    when:
      'For when the other team\'s big defends the pick and roll well, so you knock that big off balance before the two-man game. It often comes out as the first play after a timeout.',
    keys: [
      '[2] comes to a stop on [x5]\'s high side to set the screen, and [5] comes up right past it.',
      '[5] sets the screen beside [1]\'s defender, [x1], and [1] waits for [5] to get set.',
      'After the ram screen, [2] reads the defense: slip to the rim or pop to the corner.',
      '[1] watches [5] and [2] together. Whoever the defense takes, the other is open.',
    ],
    counters: [
      { name: 'Drop', desc: '[x5], held up on the ram screen, drops deep. A short pocket pass goes to [5] coming off the screen, and [5] floats it in.' },
      { name: 'Switch', desc: '[x5] and [x2] switch the ram screen. As [x5] steps up to take [2], [2] slips to the rim.' },
      { name: 'Hedge', desc: '[x5] jumps out hard at [1], and [x2] drops to stop [5] rolling. [2], popping to the corner, shoots the three.' },
    ],
    steps: [
      { title: 'Ram screen', text: 'After the timeout [1] has the ball at the top. [2] comes down from the right wing and stops on [x5]\'s high side (the **ram screen**).' },
      { title: 'Ram cut', text: '[5] comes up right past [2], and [x5], chasing, runs into [2]. [5] sets a ball screen beside [x1] at the top, while [x5] retreats into the lane (the **drop**).' },
      { title: 'Pick and roll', text: '[1] goes right over [5]\'s screen, and [x1] runs into [5]. [5] rolls into the gap in front of the deep [x5], and [1] slips a short pass in (the **pocket pass**).' },
      { title: 'Floater', text: '[5] takes two steps toward the rim and floats it in over [x5].' },
    ],
    reads: {
      prompt: 'How does the defense handle the ram action?',
      base: { label: 'Drop', why: 'If [x5], held up on the ram screen, drops deep, the space just past the screen is open. A pocket pass to [5] there.' },
      options: [
        {
          label: 'Switch', why: 'If [x5] steps up to switch onto [2], the space behind [x5] is empty. [2] slips to the rim.',
          steps: [
            { title: 'Switch', text: '[5] comes up off the ram screen and [x2] goes with [5], while [x5] steps up to take [2] (the **switch**). [2] slips behind [x5] toward the rim (the **slip**), and [1] passes.' },
            { title: 'Ram screener slip', text: '[2] catches in front of the rim and lays it in, with [x5] a step behind.' },
          ],
        },
        {
          label: 'Hedge', why: 'If [x5] jumps out at [1] and [x2] drops to stop the roll, nobody is left with [2]. [2] pops to the corner for a three.',
          steps: [
            { title: 'Hedge', text: '[x5] gets through the ram screen and follows [5] up. [5] sets the ball screen at the top and [1] goes right; [x1] runs into [5], and [x5] jumps out hard at [1] (the **hedge**).' },
            { title: 'Roll & pop', text: 'As [5] rolls toward the rim, [x2] drops into the lane to stop the roll, and [2] pops out to the right corner (the **pop**). [x5] gets back to [5] and [x1] to [1].' },
            { title: 'Ram screener three', text: '[1] passes over the hedge to [2] in the corner, and [2] shoots the three before [x2] can close out.' },
          ],
        },
      ],
    },
  },

  start: { o1: [-1, 29.2], o5: [8.4, 8.8], o2: [17.6, 17], o3: [-22.8, 4], o4: [-18.6, 17.2] },
  ball: 'o1',
  steps: [
    {
      title: '램 스크린',
      dur: 1.6,
      text: '타임아웃 뒤 [1]이 탑에서 공을 잡습니다. 오른쪽 윙의 [2]가 내려와 [x5]의 위쪽에 멈춰 섭니다(**램 스크린**).',
      move: { o2: { path: [[11.6, 13.6], [5.8, 10.2]], t: [0.15, 0.85] } },
      screens: [{ by: 'o2', face: [6.4, 7.9], hold: 0.8 }],
      def: { d1: { sag: 0 }, d2: { sag: 0 }, d5: { sag: 0 }, d3: { sag: 0.3 }, d4: { sag: 0.3 } },
    },
    {
      title: '램 컷',
      dur: 1.8,
      text: '[5]가 [2]의 옆을 스치며 올라오고, 따라가던 [x5]는 [2]에게 걸립니다. [5]가 탑에서 [x1]의 옆에 볼 스크린을 세우는 사이, [x5]는 레인으로 물러섭니다(**드롭**).',
      move: { o5: { path: [[9.2, 13.4], [5.4, 21.4], [1.6, 26.6]], t: [0, 0.8] } },
      screens: [
        { by: 'o2', face: [6.4, 7.9], hold: 0.3, on: 'd5' },
        { by: 'o5', face: [-0.9, 26], hold: 0.8, on: 'd1' },
      ],
      def: {
        d5: { path: [[7.6, 11.4], [6.6, 13.6], [3.2, 16.8]], t: [0.05, 0.9] },
        d1: { sag: 0 }, d2: { sag: 0 }, d3: { sag: 0.3 }, d4: { sag: 0.3 },
      },
    },
    {
      title: '픽 앤 롤',
      dur: 2,
      text: '[1]이 [5]의 스크린 위로 오른쪽으로 돌고, [x1]은 [5]에게 걸립니다. [5]는 깊이 물러선 [x5] 앞의 빈 공간으로 굴러 들어가고, [1]이 짧게 공을 찔러 줍니다(**포켓 패스**).',
      move: {
        o1: { path: [[3.4, 28.6], [6.6, 24.2]], t: [0.05, 0.55] },
        o5: { path: [[2.4, 22.6], [2.2, 20.4]], t: [0.3, 0.75] },
      },
      ball: [{ type: 'bounce', to: 'o5', at: 0.55 }],
      def: {
        d1: { path: [[-0.2, 27.6]], t: [0.1, 0.4] },
        d5: { path: [[2.6, 15.2]], t: [0, 0.6] },
        d2: { sag: 0 }, d3: { sag: 0.3 }, d4: { sag: 0.3 },
      },
    },
    {
      title: '플로터',
      dur: 1.4,
      text: '[5]가 림 쪽으로 두 걸음 들어가 [x5]의 머리 위로 플로터를 올립니다.',
      move: { o5: { path: [[1.8, 17.2]], t: [0, 0.4] } },
      ball: [{ type: 'shot', at: 0.5, pts: 2 }],
      def: { d5: { path: [[2.4, 14.6]], t: [0, 0.4] }, d1: { path: [[2.4, 24.4]], t: [0, 0.8] }, d2: { sag: 0 }, d3: { sag: 0.3 }, d4: { sag: 0.3 } },
    },
  ],

  // 수비 대응별 분기: [2]가 램 스크린 자리에 선 뒤(1단계) 갈라진다. 기본(위 2~4단계)은 드롭.
  reads: {
    at: 1,
    prompt: '수비는 램 액션을 어떻게 막을까요?',
    base: { id: 'drop', label: '드롭', why: '램 스크린에 걸린 [x5]가 깊이 물러서면 스크린 바로 앞 공간이 빕니다. 그곳의 [5]에게 포켓 패스를 넣습니다.' },
    options: [
      {
        id: 'switch',
        label: '스위치',
        why: '[x5]가 [2]를 막으러 위로 올라오면 [x5]의 뒤가 빕니다. [2]가 림으로 빠져 들어갑니다.',
        steps: [
          {
            title: '스위치',
            dur: 1.8,
            text: '[5]가 램 스크린을 타고 올라오자 [x2]가 [5]를 따라가고, [x5]는 [2]를 막으러 위로 올라옵니다(**스위치**). 그 순간 [2]가 [x5]의 뒤로 림을 향해 빠지고(**슬립**), [1]이 패스합니다.',
            move: {
              o5: { path: [[9.2, 13.4], [6.4, 19.6]], t: [0, 0.6] },
              o2: { path: [[3.8, 7.4], [2, 6.4]], t: [0.5, 0.9] },
            },
            ball: [{ type: 'pass', to: 'o2', at: 0.72 }],
            def: {
              d2: { guard: 'o5', path: [[3.6, 12.8], [5, 17.4]], t: [0.2, 0.8] },
              d5: { guard: 'o2', path: [[7.6, 10.4], [7.4, 12.6], [5.6, 10.2]], t: [0.3, 1] },
              d1: { sag: 0 }, d3: { sag: 0.3 }, d4: { sag: 0.3 },
            },
          },
          {
            title: '램 스크리너 슬립',
            dur: 1.2,
            text: '[2]가 림 앞에서 공을 받아 레이업을 올리고, [x5]는 한 발 늦습니다.',
            move: { o2: { path: [[1.4, 5.8]], t: [0, 0.3] } },
            ball: [{ type: 'shot', at: 0.35, pts: 2 }],
            def: { d5: { path: [[4, 8.2]], t: [0, 0.7] }, d2: { sag: 0 }, d1: { sag: 0 }, d3: { sag: 0.3 }, d4: { sag: 0.3 } },
          },
        ],
      },
      {
        id: 'hedge',
        label: '헤지',
        why: '[x5]가 [1]에게 뛰쳐나가고 [x2]가 롤을 막으러 내려오면 [2]에게 아무도 없습니다. [2]가 코너로 빠져 3점을 던집니다.',
        steps: [
          {
            title: '헤지',
            dur: 2.2,
            text: '[x5]가 램 스크린을 빠져나와 [5]를 따라 올라갑니다. [5]가 탑에서 볼 스크린을 걸고 [1]이 오른쪽으로 돌자, [x1]은 [5]에게 걸리고 [x5]가 [1]에게 강하게 뛰쳐나갑니다(**헤지**).',
            move: {
              o5: { path: [[9.2, 13.4], [5.4, 21.4], [1.6, 26.6]], t: [0, 0.7] },
              o1: { path: [[3, 29.6], [5.4, 28.4]], t: [0.72, 1] },
            },
            screens: [{ by: 'o5', face: [-0.9, 26], hold: 0.4, on: 'd1' }],
            def: {
              d5: { path: [[8.6, 12], [6, 19.6], [3.4, 24.6], [4.8, 27.6]], t: [0.05, 0.95] },
              d1: { path: [[-0.2, 27.6]], t: [0.75, 0.95] },
              d2: { sag: 0 }, d3: { sag: 0.3 }, d4: { sag: 0.3 },
            },
          },
          {
            title: '롤 & 팝',
            dur: 1.6,
            text: '[5]가 림 쪽으로 굴러 들어가자 [x2]가 롤을 막으러 레인으로 내려오고, [2]는 오른쪽 코너로 빠집니다(**팝**). [x5]는 [5]에게 돌아가고 [x1]은 [1]에게 붙습니다.',
            move: {
              o5: { path: [[2.4, 19.6]], t: [0, 0.6] },
              o2: { path: [[11.4, 9], [17.4, 7.2], [22.8, 6.4]], t: [0.1, 0.9] },
            },
            def: {
              d2: { path: [[4.6, 11.2], [3.4, 15.2]], t: [0, 0.6] },
              d5: { path: [[3.6, 22.4]], t: [0.15, 0.85] },
              d1: { path: [[3, 27.2]], t: [0.1, 0.6] },
              d3: { sag: 0.3 }, d4: { sag: 0.3 },
            },
          },
          {
            title: '램 스크리너 3점',
            dur: 2,
            text: '[1]이 헤지 너머로 코너의 [2]에게 패스하고, [2]는 [x2]가 달려 나오기 전에 3점을 던집니다.',
            ball: [
              { type: 'skip', to: 'o2', at: 0.08 },
              { type: 'shot', at: 0.62, pts: 3 },
            ],
            def: { d2: { path: [[10.4, 11.6], [17.6, 8.4]], t: [0.15, 0.7] }, d5: { path: [[3.4, 21.4]], t: [0.1, 0.7] }, d1: { path: [[4.2, 25.6]], t: [0, 0.6] }, d3: { sag: 0.3 }, d4: { sag: 0.3 } },
          },
        ],
      },
    ],
  },
};
