// 박스 (Box) — 베이스라인 인바운드
export default {
  id: 'box',
  name: '박스',
  category: 'blob',
  difficulty: 2,
  aliases: ['box set', 'box BLOB', '박스 세트'],
  situation: { period: 2, clock: 401, shotClock: 14, score: [48, 45] },
  summary:
    '네 명이 페인트 네 귀퉁이에 상자 모양으로 서는 **박스** 대형의 베이스라인 인바운드 작전입니다. 왼쪽 블록의 [4]가 올라가 엘보의 [5]에게 **백스크린**을 걸고, [5]가 림으로 파고들어 인바운드 패스를 받습니다.',
  when:
    '엔드라인에서 공을 넣을 때 림 가까이에서 쉬운 득점을 노리는 가장 기본적인 세트입니다. 같은 대형에서 여러 갈래로 이어져 수비가 미리 읽기 어렵습니다.',
  keys: [
    '[3]은 공을 넣기 전에 수비 다섯 명의 위치를 먼저 보고, 공을 넣은 뒤에는 곧바로 코트로 들어옵니다.',
    '[4]는 [x5]의 등 뒤, 림 쪽에 멈춰 서서 스크린을 겁니다. 움직이며 부딪히면 반칙입니다.',
    '[5]는 [4]가 자리를 잡을 때까지 기다렸다가 [4]의 어깨를 스치듯 컷합니다.',
    '[2]는 코너로 빠져 수비를 넓히고, [1]은 탑에서 안전한 패스 출구가 됩니다.',
  ],
  counters: [
    { name: '스크린에 걸림', desc: '[x5]가 [4]의 백스크린을 보지 못하고 걸립니다. 림으로 컷하는 [5]가 비어 있습니다.', read: 'caught' },
    { name: '스위치', desc: '[x4]가 [5]를 넘겨받습니다. 스크린을 건 [4]가 림으로 빠져 들어갑니다(슬립).', read: 'switch' },
    { name: '페인트 몰림', desc: '[x2]가 코너를 비우고 페인트로 처져 컷을 막습니다. 코너의 [2]가 3점 기회를 얻습니다.', read: 'sag' },
  ],

  en: {
    name: 'Box',
    summary:
      'A baseline out-of-bounds play from the **box** set, with four players at the four corners of the paint. [4] comes up from the left block to set a **back screen** for [5] at the elbow, and [5] dives to the rim for the inbound pass.',
    when:
      'The most basic set for an easy basket near the rim when inbounding from the end line. The same set leads into several options, so the defense cannot read it early.',
    keys: [
      '[3] reads all five defenders before passing, and steps onto the court right after the inbound.',
      '[4] comes to a stop behind [x5], on the rim side, before the contact. Moving into the defender is a foul.',
      '[5] waits for [4] to get set, then cuts right off [4]\'s shoulder.',
      '[2] clears to the corner to spread the defense, and [1] is the safe outlet at the top.',
    ],
    counters: [
      { name: 'Caught on the screen', desc: '[x5] never sees [4]\'s back screen and runs into it. [5], cutting to the rim, is open.' },
      { name: 'Switch', desc: '[x4] takes [5]. [4], the screener, slips to the rim.' },
      { name: 'Packed paint', desc: '[x2] leaves the corner and sinks into the paint to stop the cut. [2] gets a corner three.' },
    ],
    steps: [
      { title: 'Box set & back screen', text: '[3] holds the ball out of bounds while four players stand at the corners of the paint (the **box**). [2] clears to the right corner and [1] lifts to the top. [4] comes up from the left block and stands behind [x5], on the rim side (the **back screen**).' },
      { title: 'Back-screen cut', text: '[5] cuts off [4]\'s shoulder to the rim. [x5], chasing, runs into [4].' },
      { title: 'Layup', text: '[3] passes in to [5] at the rim (the **inbound pass**), and [5] lays it in. [3] steps right onto the court.' },
    ],
    reads: {
      prompt: 'How does the defense handle [4]\'s back screen for [5]?',
      base: { label: 'Caught on the screen', why: 'If [x5] is caught on the back screen, [5] is open cutting to the rim.' },
      options: [
        {
          label: 'Switch', why: 'If [x4] switches onto [5], [x5] is left on the high side of [4]. [4] slips to the rim with [x5] behind.',
          steps: [
            { title: 'Switch', text: '[x4] picks up [5] on the cut and [x5] takes [4] (the **switch**). [5] keeps going to the left baseline and takes [x4] along, while [x5] is still on the high side of [4].' },
            { title: 'Screener slip', text: '[4] rolls to the rim with [x5] behind (the **slip**), catches [3]\'s inbound pass and lays it in.' },
          ],
        },
        {
          label: 'Packed paint', why: 'If [x2] sinks into the paint to stop the cut, nobody is left in the corner. Inbound to [2] for a three.',
          steps: [
            { title: 'Packed paint', text: 'As [5] cuts, [x2] leaves the corner and sinks into the paint to cut off the lane (the **help**). [x5] also gets around [4] and catches up to [5].' },
            { title: 'Corner three', text: '[3] inbounds to [2], open in the right corner, and [2] gets the three off before [x2] can close out.' },
          ],
        },
      ],
    },
  },

  start: { o3: [5, -1.5], o1: [7.6, 18.6], o2: [7.8, 8.6], o4: [-7.8, 8.6], o5: [-7.6, 18.6] },
  ball: 'o3',
  steps: [
    {
      title: '박스 세트 & 백스크린',
      dur: 1.9,
      text: '[3]이 엔드라인 밖에서 공을 들고, 네 명이 페인트 네 귀퉁이에 섭니다(**박스**). [2]는 오른쪽 코너로 빠지고 [1]은 탑으로 올라갑니다. 왼쪽 블록의 [4]가 올라가 [x5]의 등 뒤, 림 쪽에 섭니다(**백스크린**).',
      move: {
        o2: { path: [[14, 6.4], [22.8, 3.4]], t: [0.1, 0.7] },
        o1: { path: [[6.4, 26.4]], t: [0.15, 0.7] },
        o4: { path: [[-6.4, 11.4], [-5.4, 13.6]], t: [0.3, 0.9] },
      },
      screens: [{ by: 'o4', face: [-6.1, 15.9], hold: 0.9 }],
      def: { d5: { sag: 0 }, d4: { sag: 0 }, d2: { sag: 0.2 } },
    },
    {
      title: '백스크린 컷',
      dur: 1.5,
      text: '[5]가 [4]의 어깨를 스치며 림으로 컷합니다. [5]를 따라가던 [x5]는 [4]에게 걸립니다.',
      move: { o5: { path: [[-8.4, 15.8], [-7.6, 11.2], [-3.6, 7.6], [-1.6, 6.4]], t: [0.05, 0.95] } },
      screens: [{ by: 'o4', face: [-6.1, 15.9], hold: 0.4, on: 'd5' }],
      def: { d5: { path: [[-6.8, 15.4], [-7.2, 14.6]], t: [0.1, 0.7] }, d4: { sag: 0 }, d2: { sag: 0.2 } },
    },
    {
      title: '레이업',
      dur: 1.4,
      text: '[3]이 림 앞의 [5]에게 공을 넣고(**인바운드 패스**), [5]가 레이업으로 마무리합니다. [3]은 곧바로 코트로 들어옵니다.',
      move: {
        o3: { path: [[7.4, 2.8]], t: [0.1, 0.55] },
        o5: { path: [[-1, 5.8]], t: [0.2, 0.5] },
      },
      ball: [
        { type: 'bounce', to: 'o5', at: 0.05 },
        { type: 'shot', at: 0.55, pts: 2 },
      ],
      def: { d5: { path: [[-5.2, 11.8], [-3.2, 9.2]], t: [0, 0.8] }, d4: { sag: 0 } },
    },
  ],

  // 수비 대응별 분기: 박스 세트와 백스크린(1단계) 뒤에 갈라진다. 기본(위 2·3단계)은 스크린에 걸림.
  reads: {
    at: 1,
    prompt: '수비는 [5]를 위한 [4]의 백스크린을 어떻게 막을까요?',
    base: { id: 'caught', label: '스크린에 걸림', why: '[x5]가 백스크린에 걸리면 림으로 컷하는 [5]가 비어 있습니다.' },
    options: [
      {
        id: 'switch',
        label: '스위치',
        why: '[x4]가 [5]를 넘겨받으면 [x5]는 [4]의 위쪽에 남습니다. [4]가 [x5]를 등 뒤에 두고 림으로 빠져 들어갑니다.',
        steps: [
          {
            title: '스위치',
            dur: 1.5,
            text: '[x4]가 컷하는 [5]를 넘겨받고, [x5]가 [4]를 맡습니다(**스위치**). [5]는 왼쪽 베이스라인까지 빠져 [x4]를 끌고 가고, [x5]는 아직 [4]의 위쪽에 있습니다.',
            move: { o5: { path: [[-8.6, 15.6], [-10.4, 10.6], [-13.6, 5.2]], t: [0.05, 0.9] } },
            screens: [{ by: 'o4', face: [-6.1, 15.9], hold: 0.2 }],
            def: {
              d4: { guard: 'o5', path: [[-6.6, 11], [-9.8, 8.4], [-11.4, 5.4]], t: [0.15, 0.95] },
              d5: { guard: 'o4', path: [[-5.2, 16.2]], t: [0.2, 0.8] },
              d2: { sag: 0.2 },
            },
          },
          {
            title: '스크리너 슬립',
            dur: 1.5,
            text: '[4]가 [x5]를 등 뒤에 두고 림으로 굴러 들어가며(**슬립**), [3]의 인바운드 패스를 받아 레이업을 올립니다.',
            move: {
              o4: { path: [[-3.4, 10.2], [-1.4, 6.8]], t: [0, 0.5] },
              o3: { path: [[7.4, 2.8]], t: [0.45, 0.85] },
            },
            ball: [
              { type: 'pass', to: 'o4', at: 0.38 },
              { type: 'shot', at: 0.72, pts: 2 },
            ],
            def: { d5: { path: [[-4.6, 13.6], [-3, 10.2]], t: [0.1, 0.8] }, d4: { sag: 0 }, d2: { sag: 0.2 } },
          },
        ],
      },
      {
        id: 'sag',
        label: '페인트 몰림',
        why: '[x2]가 컷을 막으러 페인트로 처지면 코너가 빕니다. 코너의 [2]에게 공을 넣어 3점을 던집니다.',
        steps: [
          {
            title: '페인트 몰림',
            dur: 1.5,
            text: '[5]가 림으로 컷하자 [x2]가 코너를 비우고 페인트로 처져 길을 막습니다(**도움 수비**). [x5]도 [4]를 돌아 [5]를 따라붙습니다.',
            move: { o5: { path: [[-8.4, 15.8], [-7.6, 11.2], [-4.4, 8.6]], t: [0.05, 0.9] } },
            screens: [{ by: 'o4', face: [-6.1, 15.9], hold: 0.3 }],
            def: {
              d2: { path: [[14.6, 5.6], [5.2, 7.4]], t: [0.15, 0.85] },
              d5: { path: [[-7.4, 15.2], [-8.6, 12.4], [-6.4, 10.4]], t: [0.1, 0.95] },
              d4: { sag: 0 },
            },
          },
          {
            title: '코너 3점',
            dur: 1.8,
            text: '[3]이 비어 있는 오른쪽 코너의 [2]에게 공을 넣고, [2]는 급하게 달려 나오는 [x2]보다 먼저 3점을 던집니다.',
            move: { o3: { path: [[7.6, 2.6]], t: [0.3, 0.7] } },
            ball: [
              { type: 'pass', to: 'o2', at: 0.08 },
              { type: 'shot', at: 0.48, pts: 3 },
            ],
            def: { d2: { path: [[11.6, 6.2], [18.4, 4.6]], t: [0.15, 0.6] }, d5: { path: [[-6.6, 8.2], [-4.2, 6.4]], t: [0, 0.5] }, d4: { sag: 0 } },
          },
        ],
      },
    ],
  },
};
