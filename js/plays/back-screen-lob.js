// 백스크린 롭 (Back-Screen Lob) — 베이스라인 인바운드
export default {
  id: 'back-screen-lob',
  name: '백스크린 롭',
  category: 'blob',
  difficulty: 3,
  aliases: ['BLOB lob', 'lob play', '롭 패스'],
  situation: { period: 4, clock: 108, shotClock: 14, score: [99, 101] },
  summary:
    '탑에 선 [3]을 위해 [5]가 올라와 **백스크린**을 걸고, 림으로 달려드는 [3]에게 인바운더가 공을 높이 띄워 주는(**앨리웁**) 베이스라인 인바운드 작전입니다. 막판에 한 번에 동점을 노릴 때 자주 나옵니다.',
  when:
    '엔드라인 근처에서 2점이 꼭 필요할 때, 점프력 좋은 윙과 정확한 롭 패스를 던지는 인바운더가 있을 때 씁니다.',
  keys: [
    '[3]은 먼저 공 쪽으로 한 발 다가가는 척해 [x3]를 바짝 붙게 만든 뒤 컷합니다.',
    '[5]는 [x3]의 등 뒤, 림 쪽에 멈춰 서서 스크린을 겁니다.',
    '[1]은 [3]이 아니라 [3]이 도착할 림 앞 빈 곳에 공을 띄웁니다.',
    '롭이 막히면 스크린을 건 [5]와 코너의 [2]가 다음 출구입니다.',
  ],
  counters: [
    { name: '디나이', desc: '[x3]가 [3]에게 바짝 붙어 패스를 막습니다. 그래서 등 뒤의 백스크린을 보지 못하고 걸립니다.', read: 'deny' },
    { name: '스위치', desc: '[x5]가 컷하는 [3]을 넘겨받습니다. 스크린을 건 [5]가 [x3]를 등 뒤에 두고 림으로 내려와 공을 받습니다.', read: 'switch' },
    { name: '도움 수비', desc: '코너의 [x2]가 림 앞으로 내려와 롭을 막습니다. 코너의 [2]가 비어 3점을 던집니다.', read: 'help' },
  ],

  en: {
    name: 'Back-Screen Lob',
    summary:
      'A baseline out-of-bounds play where [5] comes up to set a **back screen** for [3] at the top, and the inbounder lofts the ball to [3] diving at the rim (the **alley-oop**). It often comes out late in a game to tie it in one play.',
    when:
      'For when a basket is a must near the end line, with an athletic wing and an inbounder who throws an accurate lob.',
    keys: [
      '[3] first steps toward the ball as if to catch it, drawing [x3] in tight, then cuts.',
      '[5] comes to a stop behind [x3], on the rim side, before the contact.',
      '[1] throws the lob not at [3] but to the open spot in front of the rim where [3] will arrive.',
      'If the lob is taken away, [5], the screener, and [2] in the corner are the next outlets.',
    ],
    counters: [
      { name: 'Deny', desc: '[x3] stays tight on [3] to take away the pass, and so never sees the back screen coming and runs into it.' },
      { name: 'Switch', desc: '[x5] takes [3] on the cut. [5], the screener, steps down to the rim with [x3] behind and gets the ball.' },
      { name: 'Help', desc: '[x2] comes down from the corner to the front of the rim to take away the lob. [2] is open in the corner for a three.' },
    ],
    steps: [
      { title: 'Lob set', text: '[1] holds the ball out of bounds. [3] steps toward the ball from the top and [x3] stays tight (the **deny**). [5] comes up from the right block and stands behind [x3], on the rim side (the **back screen**).' },
      { title: 'Back-screen cut', text: '[3] cuts off [5]\'s shoulder to the rim, and [x3], chasing, runs into [5]. [1] lofts the ball toward the front of the rim.' },
      { title: 'Alley-oop', text: '[3] catches the lob in the air and finishes at the rim (the **alley-oop**). [1] steps right onto the court.' },
    ],
    reads: {
      prompt: 'How does the defense guard [3] with [5]\'s back screen coming?',
      base: { label: 'Deny', why: 'If [x3] stays tight to deny the catch, [x3] never sees the screen behind. [3] is open at the rim for the lob.' },
      options: [
        {
          label: 'Switch', why: 'If [x5] switches onto [3], [x3] is left on the high side of [5]. [5] steps down to the rim for the inbound pass.',
          steps: [
            { title: 'Switch', text: '[x5] picks up [3] on the cut (the **switch**). [3] keeps going out to the right short corner and takes [x5] along, and [x3] is left on the high side of [5].' },
            { title: 'Pass to the screener', text: '[5] steps down the lane with [x3] behind, catches [1]\'s inbound pass and lays it in.' },
          ],
        },
        {
          label: 'Help', why: 'If [x2] comes down from the corner to take away the lob, nobody is left with [2]. Inbound to the corner for a three.',
          steps: [
            { title: 'Help', text: '[3] cuts off the screen and [x3] is caught on [5], but [x2] leaves the left corner and comes down to the front of the rim (the **help**).' },
            { title: 'Corner three', text: '[1] inbounds to [2] in the left corner, and [2] gets the three off before [x2] can close out.' },
          ],
        },
      ],
    },
  },

  start: { o1: [-5, -1.5], o3: [0, 23.6], o5: [7.8, 8.6], o2: [-22.8, 3.8], o4: [18, 14] },
  ball: 'o1',
  steps: [
    {
      title: '롭 세트',
      dur: 1.9,
      text: '[1]이 엔드라인 밖에서 공을 듭니다. 탑의 [3]이 공 쪽으로 한 발 다가오고, [x3]는 바짝 붙어 따라옵니다(**디나이**). 오른쪽 블록의 [5]가 올라와 [x3]의 등 뒤, 림 쪽에 섭니다(**백스크린**).',
      move: {
        o3: { path: [[0, 22.4]], t: [0.1, 0.5] },
        o5: { path: [[5.6, 12.6], [0.6, 16.6]], t: [0.25, 0.9] },
      },
      screens: [{ by: 'o5', face: [0, 19.2], hold: 0.9 }],
      def: { d3: { sag: 0 }, d5: { path: [[5.8, 11.8], [3, 15.6]], t: [0.3, 0.95] }, d2: { sag: 0.2 }, d4: { sag: 0.2 } },
    },
    {
      title: '백스크린 컷',
      dur: 1.5,
      text: '[3]이 [5]의 어깨를 스치며 림으로 컷하고, 따라가던 [x3]는 [5]에게 걸립니다. [1]은 림 앞으로 공을 높이 띄웁니다.',
      move: {
        o3: { path: [[-2.6, 20.4], [-1.8, 16.2], [-1, 10.8], [-0.4, 7.2]], t: [0.05, 0.85] },
        o1: { path: [[-7.6, 2.4]], t: [0.55, 0.9] },
      },
      ball: [{ type: 'lob', to: 'o3', at: 0.45 }],
      screens: [{ by: 'o5', face: [0, 19.2], hold: 0.4, on: 'd3' }],
      def: { d3: { path: [[-0.8, 19]], t: [0.1, 0.5] }, d5: { path: [[3.2, 15.2]], t: [0, 0.5] }, d2: { sag: 0.2 }, d4: { sag: 0.2 } },
    },
    {
      title: '앨리웁',
      dur: 1.3,
      text: '[3]이 공중에서 롭을 잡아 림에 그대로 마무리합니다(**앨리웁**). [1]은 곧바로 코트로 들어옵니다.',
      ball: [{ type: 'shot', at: 0.2, pts: 2, kind: 'dunk' }],
      def: { d3: { path: [[-1.4, 14.4]], t: [0, 0.7] }, d2: { sag: 0.2 }, d4: { sag: 0.2 } },
    },
  ],

  // 수비 대응별 분기: [5]가 백스크린 자리에 선 뒤(1단계) 갈라진다. 기본(위 2·3단계)은 디나이.
  reads: {
    at: 1,
    prompt: '[5]의 백스크린이 올 때 수비는 탑의 [3]을 어떻게 막을까요?',
    base: { id: 'deny', label: '디나이', why: '[x3]가 패스를 막으려 바짝 붙으면 등 뒤의 스크린을 보지 못합니다. 림 앞의 [3]에게 롭이 열립니다.' },
    options: [
      {
        id: 'switch',
        label: '스위치',
        why: '[x5]가 [3]을 넘겨받으면 [x3]는 [5]의 위쪽에 남습니다. [5]가 림으로 내려와 인바운드 패스를 받습니다.',
        steps: [
          {
            title: '스위치',
            dur: 2,
            text: '[x5]가 컷하는 [3]을 넘겨받습니다(**스위치**). [3]은 오른쪽 숏코너까지 빠져 [x5]를 끌고 가고, [x3]는 [5]의 위쪽에 남습니다.',
            move: { o3: { path: [[-2.6, 20.4], [-1.8, 16.2], [-0.6, 10.4], [4.4, 6.6], [9.6, 4.4]], t: [0.04, 1] } },
            screens: [{ by: 'o5', face: [0, 19.2], hold: 0.2 }],
            def: {
              d5: { guard: 'o3', path: [[1.2, 13.2], [1.6, 9.6], [6.6, 6.8]], t: [0.25, 0.95] },
              d3: { guard: 'o5', path: [[-0.8, 19.2]], t: [0.1, 0.5] },
              d2: { sag: 0.2 }, d4: { sag: 0.2 },
            },
          },
          {
            title: '스크리너에게 패스',
            dur: 1.6,
            text: '[5]가 [x3]를 등 뒤에 두고 레인을 따라 내려오며, [1]의 인바운드 패스를 받아 레이업을 올립니다.',
            move: {
              o5: { path: [[0, 12], [-1, 7.6]], t: [0, 0.55] },
              o1: { path: [[-7.6, 2.4]], t: [0.4, 0.8] },
            },
            ball: [
              { type: 'pass', to: 'o5', at: 0.32 },
              { type: 'shot', at: 0.8, pts: 2 },
            ],
            def: { d3: { path: [[-0.4, 15.4], [-1.2, 11.2]], t: [0.1, 0.85] }, d5: { sag: 0 }, d2: { sag: 0.2 }, d4: { sag: 0.2 } },
          },
        ],
      },
      {
        id: 'help',
        label: '도움 수비',
        why: '[x2]가 롭을 막으러 코너에서 내려오면 [2]에게 아무도 없습니다. 코너로 공을 넣어 3점을 던집니다.',
        steps: [
          {
            title: '도움 수비',
            dur: 1.5,
            text: '[3]이 스크린을 끼고 컷하고 [x3]는 [5]에게 걸리지만, [x2]가 왼쪽 코너를 비우고 림 앞으로 내려옵니다(**도움 수비**).',
            move: { o3: { path: [[-2.6, 20.4], [-1.8, 16.2], [-1, 10.8], [-0.4, 7.4]], t: [0.05, 0.85] } },
            screens: [{ by: 'o5', face: [0, 19.2], hold: 0.4, on: 'd3' }],
            def: {
              d3: { path: [[-0.8, 19]], t: [0.1, 0.5] },
              d2: { path: [[-14, 5.6], [-4.8, 6.6]], t: [0.1, 0.8] },
              d5: { path: [[3.2, 15.2]], t: [0, 0.5] },
              d4: { sag: 0.2 },
            },
          },
          {
            title: '코너 3점',
            dur: 1.8,
            text: '[1]이 왼쪽 코너의 [2]에게 공을 넣고, [2]는 급하게 달려 나오는 [x2]보다 먼저 3점을 던집니다.',
            move: { o1: { path: [[-7.6, 2.4]], t: [0.3, 0.7] } },
            ball: [
              { type: 'pass', to: 'o2', at: 0.08 },
              { type: 'shot', at: 0.48, pts: 3 },
            ],
            def: { d2: { path: [[-11, 5.8], [-18, 4.8]], t: [0.15, 0.6] }, d3: { path: [[-0.6, 14.4], [-0.4, 10.8]], t: [0, 0.9] }, d5: { sag: 0.2 }, d4: { sag: 0.2 } },
          },
        ],
      },
    ],
  },
};
