// 사이드라인 롭 (Sideline Lob) — 사이드라인 인바운드
export default {
  id: 'sideline-lob',
  name: '사이드라인 롭',
  category: 'slob',
  difficulty: 2,
  aliases: ['SLOB lob', 'sideline back screen', '사이드 롭'],
  situation: { period: 3, clock: 52, shotClock: 14, score: [77, 79] },
  summary:
    '사이드라인에서 공을 넣을 때, 블록의 [5]가 올라와 엘보의 [2]에게 **백스크린**을 걸고, 림으로 달려드는 [2]에게 인바운더가 공을 높이 띄워 주는 작전입니다.',
  when:
    '수비가 공 쪽 패스 길만 막는 데 집중할 때 씁니다. 모두가 공을 보는 사이 림 앞이 빕니다.',
  keys: [
    '[2]는 먼저 공 쪽으로 한 발 다가가 [x2]를 끌어낸 뒤 컷합니다.',
    '[5]는 [x2]의 등 뒤, 림 쪽에 멈춰 서서 스크린을 겁니다.',
    '[3]은 [2]가 아니라 [2]가 도착할 림 앞 빈 곳에 공을 띄웁니다.',
    '롭이 막히면 스크린을 건 [5]와 슬롯의 [1]이 다음 출구입니다.',
  ],
  counters: [
    { name: '스크린에 걸림', desc: '[x2]가 등 뒤의 백스크린을 보지 못하고 걸립니다. 림으로 컷하는 [2]에게 롭이 열립니다.', read: 'caught' },
    { name: '스위치', desc: '[x5]가 컷하는 [2]를 넘겨받습니다. 스크린을 건 [5]가 숏코너로 빠져(팝) 점프슛을 던집니다.', read: 'switch' },
    { name: '도움 수비', desc: '슬롯의 [x1]이 페인트로 내려와 롭을 막습니다. 슬롯의 [1]이 비어 3점을 던집니다.', read: 'help' },
  ],

  en: {
    name: 'Sideline Lob',
    summary:
      'A sideline out-of-bounds play where [5] comes up from the block to set a **back screen** for [2] at the elbow, and the inbounder lofts the ball to [2] diving at the rim.',
    when:
      'For when the defense is busy denying the passing lanes near the ball. While everyone watches the ball, the front of the rim is empty.',
    keys: [
      '[2] first steps toward the ball to draw [x2] out, then cuts.',
      '[5] comes to a stop behind [x2], on the rim side, before the contact.',
      '[3] throws the lob not at [2] but to the open spot in front of the rim where [2] will arrive.',
      'If the lob is taken away, [5], the screener, and [1] at the slot are the next outlets.',
    ],
    counters: [
      { name: 'Caught on the screen', desc: '[x2] never sees the back screen behind and runs into it. The lob is there for [2] cutting to the rim.' },
      { name: 'Switch', desc: '[x5] takes [2] on the cut. [5], the screener, pops out to the short corner for a jumper.' },
      { name: 'Help', desc: '[x1] comes down from the slot into the paint to take away the lob. [1] is open at the slot for a three.' },
    ],
    steps: [
      { title: 'Lob set', text: '[3] holds the ball out of bounds on the left sideline. [2] steps toward the ball from the left elbow and [x2] follows. [5] comes up from the left block and stands behind [x2], on the rim side (the **back screen**).' },
      { title: 'Back-screen cut', text: '[2] cuts off [5]\'s shoulder to the rim, and [x2], chasing, runs into [5]. [3] lofts the ball toward the front of the rim.' },
      { title: 'Lob finish', text: '[2] catches the lob in front of the rim and lays it in. [3] steps onto the court.' },
    ],
    reads: {
      prompt: 'How does the defense handle [5]\'s back screen for [2]?',
      base: { label: 'Caught on the screen', why: 'If [x2] is caught on the back screen, nobody is between [2] and the rim. The lob is there.' },
      options: [
        {
          label: 'Switch', why: 'If [x5] switches onto [2], [x2] is left on the high side of [5]. [5] pops out the other way for an open jumper.',
          steps: [
            { title: 'Switch', text: '[x5] picks up [2] on the cut (the **switch**), and [2] keeps going across the lane with [x5]. [x2], left on the high side of [5], is late, and [5] pops out to the left short corner (the **pop**).' },
            { title: 'Screener pop', text: '[3] inbounds to [5] in the short corner, and [5] shoots the jumper before [x2] gets there.' },
          ],
        },
        {
          label: 'Help', why: 'If [x1] comes down to take away the lob, [1] at the slot is left alone. Inbound there for a three.',
          steps: [
            { title: 'Help', text: '[2] cuts off the screen and [x2] is caught on [5], but [x1] leaves the slot and comes down into the paint to take away the lob (the **help**).' },
            { title: 'Slot three', text: '[3] inbounds to [1] at the left slot, and [1] gets the three off before [x1] can close out.' },
          ],
        },
      ],
    },
  },

  start: { o3: [-25.6, 18], o2: [-9, 19.4], o5: [-8, 8.6], o1: [-17.6, 25.2], o4: [14, 10] },
  ball: 'o3',
  steps: [
    {
      title: '롭 세트',
      dur: 1.8,
      text: '[3]이 왼쪽 사이드라인 밖에서 공을 듭니다. 왼쪽 엘보의 [2]가 공 쪽으로 한 발 다가오고 [x2]가 따라옵니다. 왼쪽 블록의 [5]가 올라와 [x2]의 등 뒤, 림 쪽에 섭니다(**백스크린**).',
      move: {
        o2: { path: [[-10.4, 19.8]], t: [0.1, 0.5] },
        o5: { path: [[-7.6, 11.6], [-7.2, 14.6]], t: [0.3, 0.9] },
      },
      screens: [{ by: 'o5', face: [-8.3, 16.9], hold: 0.9 }],
      def: { d2: { sag: 0 }, d5: { sag: 0 }, d1: { sag: 0.2 }, d4: { sag: 0.2 } },
    },
    {
      title: '백스크린 컷',
      dur: 1.6,
      text: '[2]가 [5]의 어깨를 스치며 림으로 컷하고, 따라가던 [x2]는 [5]에게 걸립니다. [3]은 림 앞으로 공을 높이 띄웁니다.',
      move: {
        o2: { path: [[-11.2, 16.8], [-9.6, 12.6], [-5, 8.2], [-1.6, 6.4]], t: [0.05, 0.85] },
        o3: { path: [[-22.4, 17.4]], t: [0.55, 0.9] },
      },
      ball: [{ type: 'lob', to: 'o2', at: 0.42 }],
      screens: [{ by: 'o5', face: [-8.3, 16.9], hold: 0.4, on: 'd2' }],
      def: { d2: { path: [[-8.8, 16.2]], t: [0.1, 0.5] }, d5: { sag: 0 }, d1: { sag: 0.2 }, d4: { sag: 0.2 } },
    },
    {
      title: '롭 마무리',
      dur: 1.3,
      text: '[2]가 림 앞에서 롭을 잡아 레이업으로 마무리합니다. [3]은 코트로 들어와 있습니다.',
      move: { o2: { path: [[-0.8, 5.8]], t: [0, 0.3] } },
      ball: [{ type: 'shot', at: 0.35, pts: 2 }],
      def: { d2: { path: [[-7.4, 12.6]], t: [0, 0.8] }, d5: { sag: 0 }, d1: { sag: 0.2 }, d4: { sag: 0.2 } },
    },
  ],

  // 수비 대응별 분기: [5]가 백스크린 자리에 선 뒤(1단계) 갈라진다. 기본(위 2·3단계)은 스크린에 걸림.
  reads: {
    at: 1,
    prompt: '수비는 [2]를 위한 [5]의 백스크린을 어떻게 막을까요?',
    base: { id: 'caught', label: '스크린에 걸림', why: '[x2]가 백스크린에 걸리면 [2]와 림 사이에 아무도 없습니다. 롭이 열립니다.' },
    options: [
      {
        id: 'switch',
        label: '스위치',
        why: '[x5]가 [2]를 넘겨받으면 [x2]는 [5]의 위쪽에 남습니다. [5]가 반대쪽으로 빠져 점프슛을 던집니다.',
        steps: [
          {
            title: '스위치',
            dur: 1.8,
            text: '[x5]가 컷하는 [2]를 넘겨받고(**스위치**), [2]는 [x5]를 데리고 레인을 가로질러 갑니다. [5]의 위쪽에 남은 [x2]는 늦고, [5]는 왼쪽 숏코너로 빠집니다(**팝**).',
            move: {
              o2: { path: [[-11.2, 16.8], [-9.6, 12.6], [-4.4, 8.4], [3.6, 6.4]], t: [0.05, 0.9] },
              o5: { path: [[-11, 10.6], [-15.4, 5.8]], t: [0.35, 0.9] },
            },
            screens: [{ by: 'o5', face: [-8.3, 16.9], hold: 0.2 }],
            def: {
              d5: { guard: 'o2', path: [[-7.6, 10.4], [-3.6, 7.6], [1.4, 6.4]], t: [0.25, 0.95] },
              d2: { guard: 'o5', path: [[-8.8, 16.2], [-10, 13.6], [-11.6, 10.8]], t: [0.1, 0.95] },
              d1: { sag: 0.2 }, d4: { sag: 0.2 },
            },
          },
          {
            title: '스크리너 팝',
            dur: 1.8,
            text: '[3]이 숏코너의 [5]에게 공을 넣고, [5]는 [x2]가 오기 전에 점프슛을 던집니다.',
            move: { o3: { path: [[-22.4, 17.4]], t: [0.35, 0.75] } },
            ball: [
              { type: 'pass', to: 'o5', at: 0.08 },
              { type: 'shot', at: 0.5, pts: 2 },
            ],
            def: { d2: { path: [[-12.4, 9]], t: [0.1, 0.6] }, d5: { sag: 0.2 }, d1: { sag: 0.2 }, d4: { sag: 0.2 } },
          },
        ],
      },
      {
        id: 'help',
        label: '도움 수비',
        why: '[x1]이 롭을 막으러 내려오면 슬롯의 [1]이 혼자 남습니다. 그쪽으로 공을 넣어 3점을 던집니다.',
        steps: [
          {
            title: '도움 수비',
            dur: 1.6,
            text: '[2]가 스크린을 끼고 컷하고 [x2]는 [5]에게 걸리지만, [x1]이 슬롯을 비우고 페인트로 내려와 롭을 막습니다(**도움 수비**).',
            move: { o2: { path: [[-11.2, 16.8], [-9.6, 12.6], [-5, 8.2], [-1.8, 6.6]], t: [0.05, 0.85] } },
            screens: [{ by: 'o5', face: [-8.3, 16.9], hold: 0.4, on: 'd2' }],
            def: {
              d2: { path: [[-8.8, 16.2]], t: [0.1, 0.5] },
              d1: { path: [[-12.6, 18.4], [-5.2, 9.8]], t: [0.1, 0.85] },
              d5: { sag: 0 }, d4: { sag: 0.2 },
            },
          },
          {
            title: '슬롯 3점',
            dur: 1.8,
            text: '[3]이 왼쪽 슬롯의 [1]에게 공을 넣고, [1]은 급하게 달려 나오는 [x1]보다 먼저 3점을 던집니다.',
            move: { o3: { path: [[-22.4, 17.4]], t: [0.35, 0.75] } },
            ball: [
              { type: 'pass', to: 'o1', at: 0.08 },
              { type: 'shot', at: 0.48, pts: 3 },
            ],
            def: { d1: { path: [[-10.4, 12.8], [-14, 20.4]], t: [0.1, 0.6] }, d2: { path: [[-6.8, 17.8]], t: [0, 0.5] }, d5: { sag: 0 }, d4: { sag: 0.2 } },
          },
        ],
      },
    ],
  },
};
