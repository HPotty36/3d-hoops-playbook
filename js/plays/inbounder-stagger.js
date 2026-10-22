// 인바운더 스태거 (Inbounder Stagger) — 베이스라인 인바운드
export default {
  id: 'inbounder-stagger',
  name: '인바운더 스태거',
  category: 'blob',
  difficulty: 2,
  aliases: ['screen the inbounder', 'inbounder return', '인바운더 리턴'],
  situation: { period: 3, clock: 245, shotClock: 14, score: [71, 70] },
  summary:
    '공을 넣은 슈터가 곧바로 코트로 들어와, 두 명이 잇달아 세운 스크린(**스태거**)을 끼고 올라가 3점을 받는 베이스라인 인바운드 작전입니다. 수비는 공을 넣는 선수를 잠시 놓치기 쉽습니다.',
  when:
    '인바운드를 맡은 선수가 팀의 슈터일 때 씁니다. 공을 넣는 순간 수비의 눈이 공을 따라가므로, 인바운더가 가장 늦게 수비받는 사람이 됩니다.',
  keys: [
    '[2]는 공을 넣자마자 1초 안에 코트로 들어와 곧바로 스크린 쪽으로 달립니다.',
    '[4]와 [5]는 [2]가 지나갈 길을 따라 비스듬히 줄지어 서고(**스태거**), [x2]가 오는 쪽을 보고 스크린을 겁니다.',
    '[2]는 스크린을 건 선수의 어깨를 스치듯 지나가야 [x2]가 따라붙지 못합니다.',
    '[1]은 공을 받은 뒤 [2]와 [5]를 함께 봅니다. 수비가 [2]를 막으면 스크린을 건 쪽이 빕니다.',
  ],
  counters: [
    { name: '트레일', desc: '[x2]가 [2]의 뒤를 따라 스크린을 지납니다. 스크린에 걸려 늦은 사이 [2]가 3점을 던집니다.', read: 'trail' },
    { name: '스위치', desc: '[x5]가 나와 [2]를 넘겨받습니다. 스크린을 건 [5]가 림으로 빠져 들어갑니다(슬립).', read: 'switch' },
    { name: '탑 락킹', desc: '[x2]가 [2]보다 먼저 위쪽으로 가서 길을 막습니다. [2]는 반대로 베이스라인을 따라 림으로 끊어 들어갑니다(백도어).', read: 'top-lock' },
  ],

  en: {
    name: 'Inbounder Stagger',
    summary:
      'A baseline out-of-bounds play where the shooter who inbounds steps right onto the court and runs off two screens set one after another (the **stagger**) for a three. The defense easily loses track of the inbounder for a moment.',
    when:
      'For when the inbounder is the team\'s shooter. As the ball goes in, the defense\'s eyes follow it, so the inbounder is the last one to get guarded.',
    keys: [
      '[2] steps onto the court within a second of the inbound pass and heads straight for the screens.',
      '[4] and [5] line up at an angle along [2]\'s path (the **stagger**) and screen the way [x2] is coming.',
      '[2] runs right off each screener\'s shoulder so [x2] cannot stay attached.',
      '[1] watches [2] and [5] together after the catch. If the defense takes [2], the screener is open.',
    ],
    counters: [
      { name: 'Trail', desc: '[x2] follows behind [2] through the screens. While [x2] is held up on them, [2] shoots the three.' },
      { name: 'Switch', desc: '[x5] comes out and takes [2]. [5], the screener, slips to the rim.' },
      { name: 'Top lock', desc: '[x2] gets above [2] first to cut off the path. [2] goes the other way, along the baseline to the rim (the **backdoor**).' },
    ],
    steps: [
      { title: 'Inbound', text: '[1] pops out from the right block to the right slot and catches [2]\'s inbound pass. [2] steps onto the court on the left of the rim, while [4] and [5] stand one above the other along the left lane line (the **stagger**).' },
      { title: 'Stagger', text: '[2] runs up the left side off [4]\'s and then [5]\'s shoulders. [x2] follows behind (the **trail**) and runs into [5].' },
      { title: 'Three', text: '[1] passes cross-court to [2] at the left slot, and [2] shoots the three before [x2] can get there.' },
    ],
    reads: {
      prompt: 'How does [x2] chase [2] through the stagger?',
      base: { label: 'Trail', why: 'If [x2] follows behind through the screens, the screens hold [x2] up and [2] gets the three.' },
      options: [
        {
          label: 'Switch', why: 'If [x5] switches out onto [2], nobody is left between [5] and the rim. [5] slips in for the layup.',
          steps: [
            { title: 'Switch', text: 'At [5]\'s screen, [x5] comes out and takes [2] (the **switch**), and [x2], held up on the screen, is left behind [5].' },
            { title: 'Screener slip', text: '[5] rolls to the rim with [x2] behind (the **slip**), catches [1]\'s pass and lays it in.' },
          ],
        },
        {
          label: 'Top lock', why: 'If [x2] races above [2] to take away the curl up, the baseline behind is empty. [2] cuts back to the rim.',
          steps: [
            { title: 'Top lock', text: 'Ahead of [2], [x2] gets around to the high side, between [4]\'s and [5]\'s screens, and cuts off the way up (the **top lock**). [2] stops right at [4]\'s screen.' },
            { title: 'Backdoor', text: '[2] cuts back behind [x2] along the baseline to the rim (the **backdoor**), catches [1]\'s pass and lays it in.' },
          ],
        },
      ],
    },
  },

  start: { o2: [-6, -1.5], o1: [6.4, 12], o4: [-7.6, 7.4], o5: [-6.6, 14.2], o3: [21.6, 10.6] },
  ball: 'o2',
  steps: [
    {
      title: '인바운드',
      dur: 1.9,
      text: '[1]이 오른쪽 블록 근처에서 오른쪽 슬롯으로 나와 [2]의 인바운드 패스를 받습니다. [2]는 림의 왼쪽으로 코트에 들어오고, [4]와 [5]는 왼쪽 레인 라인을 따라 위아래로 비스듬히 섭니다(**스태거**).',
      move: {
        o1: { path: [[8.4, 17.6], [9.4, 22.8]], t: [0.05, 0.5] },
        o2: { path: [[-8.6, 2.2]], t: [0.66, 1] },
      },
      ball: [{ type: 'pass', to: 'o1', at: 0.5 }],
      def: { d2: { sag: 0.2 }, d4: { sag: 0 }, d5: { sag: 0 }, d1: { sag: 0.2 } },
    },
    {
      title: '스태거',
      dur: 2,
      text: '[2]가 [4], 이어서 [5]의 어깨를 스치며 왼쪽으로 올라갑니다. 뒤를 따라가던 [x2]는(**트레일**) [5]에게 걸립니다.',
      move: { o2: { path: [[-9.8, 7], [-8.8, 13.4], [-10.2, 20.4], [-11.6, 26.8]], t: [0, 0.9] } },
      screens: [
        { by: 'o4', face: [-9.4, 4.4], hold: 0.2 },
        { by: 'o5', face: [-8.4, 11.2], hold: 0.4, on: 'd2' },
      ],
      def: {
        d2: { path: [[-8.4, 3.6], [-10.6, 6.6], [-10.4, 9.6], [-8.2, 12.4]], t: [0.02, 0.58] },
        d4: { sag: 0 }, d5: { sag: 0 }, d1: { sag: 0.2 },
      },
    },
    {
      title: '3점',
      dur: 1.7,
      text: '[1]이 코트를 가로질러 왼쪽 슬롯의 [2]에게 패스하고, [2]는 [x2]가 오기 전에 3점을 던집니다.',
      ball: [
        { type: 'pass', to: 'o2', at: 0.05 },
        { type: 'shot', at: 0.6, pts: 3 },
      ],
      def: { d2: { path: [[-10, 17.4], [-10.6, 22.2]], t: [0, 0.65] }, d5: { sag: 0 }, d1: { sag: 0.2 } },
    },
  ],

  // 수비 대응별 분기: 인바운드 패스가 들어가고 [2]가 코트에 들어온 뒤(1단계) 갈라진다. 기본(위 2·3단계)은 트레일.
  reads: {
    at: 1,
    prompt: '[x2]는 스태거 스크린을 지나는 [2]를 어떻게 따라갈까요?',
    base: { id: 'trail', label: '트레일', why: '[x2]가 뒤를 따라 스크린을 지나면, 스크린에 걸려 늦은 사이 [2]가 3점을 던집니다.' },
    options: [
      {
        id: 'switch',
        label: '스위치',
        why: '[x5]가 나와 [2]를 넘겨받으면 [5]와 림 사이가 빕니다. [5]가 림으로 빠져 들어갑니다.',
        steps: [
          {
            title: '스위치',
            dur: 2,
            text: '[5]의 스크린에서 [x5]가 나와 [2]를 넘겨받고(**스위치**), 스크린에 걸린 [x2]는 [5]의 뒤에 남습니다.',
            move: { o2: { path: [[-9.8, 7], [-8.8, 13.4], [-10.2, 20.4], [-11.6, 26.8]], t: [0, 0.9] } },
            screens: [
              { by: 'o4', face: [-9.4, 4.4], hold: 0.2 },
              { by: 'o5', face: [-8.4, 11.2], hold: 0.3, on: 'd2' },
            ],
            def: {
              d2: { guard: 'o5', path: [[-8.4, 3.6], [-10.6, 6.6], [-10.4, 9.6], [-8.2, 12.4]], t: [0.02, 0.58] },
              d5: { guard: 'o2', path: [[-7.2, 17.2], [-9.4, 21.8]], t: [0.3, 0.95] },
              d4: { sag: 0 }, d1: { sag: 0.2 },
            },
          },
          {
            title: '스크리너 슬립',
            dur: 1.6,
            text: '[5]가 [x2]를 등 뒤에 두고 림으로 굴러 들어가며(**슬립**), [1]의 패스를 받아 레이업을 올립니다.',
            move: { o5: { path: [[-4.8, 10.6], [-2.2, 7.2]], t: [0, 0.55] } },
            ball: [
              { type: 'pass', to: 'o5', at: 0.25 },
              { type: 'shot', at: 0.8, pts: 2 },
            ],
            def: { d2: { path: [[-7, 10.2], [-4.6, 9.4]], t: [0.1, 0.85] }, d5: { sag: 0 }, d4: { sag: 0 }, d1: { sag: 0.2 } },
          },
        ],
      },
      {
        id: 'top-lock',
        label: '탑 락킹',
        why: '[x2]가 [2]보다 먼저 위쪽으로 가서 길을 막으면 뒤쪽 베이스라인이 빕니다. [2]가 림으로 끊어 들어갑니다.',
        steps: [
          {
            title: '탑 락킹',
            dur: 1.4,
            text: '[x2]가 [2]를 앞질러 위쪽으로 돌아가, [4]와 [5]의 스크린 사이에서 올라갈 길을 막습니다(**탑 락킹**). [2]는 [4]의 스크린 옆에서 멈춰 섭니다.',
            move: { o2: { path: [[-9.8, 6.8]], t: [0, 0.6] } },
            screens: [{ by: 'o4', face: [-9.4, 4.4], hold: 0.2 }],
            def: { d2: { path: [[-11, 4.6], [-12, 8.8], [-10.8, 10.6]], t: [0, 0.75] }, d4: { sag: 0 }, d5: { sag: 0 }, d1: { sag: 0.2 } },
          },
          {
            title: '백도어',
            dur: 1.9,
            text: '[2]가 [x2]의 등 뒤로 베이스라인을 따라 림으로 끊어 들어가고(**백도어**), [1]의 패스를 받아 레이업을 올립니다.',
            move: { o2: { path: [[-8.8, 2.8], [-4.6, 2.6], [-2.2, 4]], t: [0, 0.6] } },
            ball: [
              { type: 'pass', to: 'o2', at: 0.3 },
              { type: 'shot', at: 0.82, pts: 2 },
            ],
            def: { d2: { path: [[-10.4, 6], [-7.6, 3.8]], t: [0.15, 0.95] }, d4: { sag: 0 }, d5: { sag: 0 }, d1: { sag: 0.2 } },
          },
        ],
      },
    ],
  },
};
