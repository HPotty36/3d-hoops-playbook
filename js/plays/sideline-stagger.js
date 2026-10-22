// 사이드라인 스태거 (Sideline Stagger) — 사이드라인 인바운드
export default {
  id: 'sideline-stagger',
  name: '사이드라인 스태거',
  category: 'slob',
  difficulty: 2,
  aliases: ['SLOB stagger', 'stagger screen', '스태거'],
  situation: { period: 2, clock: 150, shotClock: 14, score: [52, 55] },
  summary:
    '사이드라인에서 공을 넣을 때, 슈터 [2]가 베이스라인을 따라 반대편으로 건너온 뒤 두 명이 잇달아 세운 스크린(**스태거**)을 타고 탑으로 올라가 3점을 받는 작전입니다.',
  when:
    '프런트코트 사이드라인 인바운드에서 슈터에게 바로 3점 기회를 만들고 싶을 때 씁니다. 샷 클락이 짧아도 첫 패스로 슛까지 갑니다.',
  keys: [
    '[2]는 반대편 블록에서 출발해 림 아래를 지나며 속도를 붙인 채 스크린에 들어갑니다.',
    '[4]와 [5]는 [2]가 지나갈 길을 따라 비스듬히 서서(**스태거**), 따라오는 [x2]를 차례로 막습니다.',
    '[2]는 탑에 도착하기 전에 발을 맞춰, 공을 받자마자 던질 준비를 합니다.',
    '[3]은 공을 넣은 뒤 곧바로 코트로 들어와 윙을 채웁니다.',
  ],
  counters: [
    { name: '트레일', desc: '[x2]가 [2]의 뒤를 따라 스크린을 지납니다. 스크린에 걸려 늦은 사이 [2]가 탑에서 3점을 던집니다.', read: 'trail' },
    { name: '탑 락킹', desc: '[x2]가 먼저 위쪽으로 돌아가 탑으로 가는 길을 막습니다. [2]는 반대로 림으로 끊어 들어갑니다(백도어).', read: 'top-lock' },
    { name: '스위치', desc: '[x5]가 나와 [2]를 넘겨받습니다. 스크린을 건 [5]가 림으로 빠져 들어갑니다(슬립).', read: 'switch' },
  ],

  en: {
    name: 'Sideline Stagger',
    summary:
      'A sideline out-of-bounds play where the shooter, [2], runs the baseline across from the far side, then comes up to the top of the key off two screens set one after another (the **stagger**) for a three.',
    when:
      'For a quick three for a shooter on a frontcourt sideline inbound. Even with a short shot clock, the first pass leads straight to the shot.',
    keys: [
      '[2] starts on the far block and builds speed running under the rim before hitting the screens.',
      '[4] and [5] stand at an angle along [2]\'s path (the **stagger**) and take turns holding up the chasing [x2].',
      '[2] gets the feet set before reaching the top, ready to shoot on the catch.',
      '[3] steps onto the court right after the inbound and fills the wing.',
    ],
    counters: [
      { name: 'Trail', desc: '[x2] follows behind [2] through the screens. While [x2] is held up, [2] shoots the three at the top.' },
      { name: 'Top lock', desc: '[x2] gets above first and cuts off the way to the top. [2] goes the other way, to the rim (the **backdoor**).' },
      { name: 'Switch', desc: '[x5] comes out and takes [2]. [5], the screener, slips to the rim.' },
    ],
    steps: [
      { title: 'Baseline run', text: '[3] holds the ball out of bounds on the left sideline. [2] runs from the right block under the rim to the left side, with [x2] following. [4] and [5] set up one above the other along the left lane line (the **stagger**), their defenders on the ball side.' },
      { title: 'Stagger', text: '[2] comes up the inside of the stagger, off [4]\'s and then [5]\'s shoulders, toward the top. [x2] follows behind (the **trail**) and runs into [5].' },
      { title: 'Three at the top', text: '[3] inbounds to [2] at the top, and [2] shoots on the catch. [3] steps onto the court.' },
    ],
    reads: {
      prompt: 'How does [x2] chase [2] through the stagger?',
      base: { label: 'Trail', why: 'If [x2] follows behind through the screens, the screens hold [x2] up and [2] gets the three at the top.' },
      options: [
        {
          label: 'Top lock', why: 'If [x2] races above [2] to take away the top, nobody is left between [2] and the rim. [2] cuts back for a lob.',
          steps: [
            { title: 'Top lock', text: 'Ahead of [2], [x2] gets around to the high side, between [4]\'s and [5]\'s screens, and cuts off the way to the top (the **top lock**). [2] stops right at [4]\'s screen.' },
            { title: 'Backdoor', text: '[2] cuts back behind [x2] to the rim (the **backdoor**), catches [3]\'s lob and lays it in.' },
          ],
        },
        {
          label: 'Switch', why: 'If [x5] switches out onto [2], [x2] is left behind [5]. [5] slips to the rim for the inbound pass.',
          steps: [
            { title: 'Switch', text: 'At [5]\'s screen, [x5] comes out and takes [2] at the top (the **switch**), and [x2], held up on the screen, is left behind [5].' },
            { title: 'Screener slip', text: '[5] rolls down the lane around the outside of [x2] (the **slip**), catches [3]\'s inbound pass with [x2] behind and lays it in.' },
          ],
        },
      ],
    },
  },

  start: { o3: [-25.6, 18], o2: [6.4, 7.2], o4: [-9, 15], o5: [-3, 22], o1: [19.4, 15.4] },
  ball: 'o3',
  steps: [
    {
      title: '베이스라인 런',
      dur: 1.8,
      text: '[3]이 왼쪽 사이드라인 밖에서 공을 듭니다. [2]가 오른쪽 블록에서 림 아래를 지나 왼쪽으로 건너오고, [x2]가 따라옵니다. [4]와 [5]는 왼쪽 레인 라인을 따라 위아래로 비스듬히 서고(**스태거**), 두 수비는 공 쪽에 섭니다.',
      move: {
        o2: { path: [[2, 3.8], [-6.8, 5.2]], t: [0.2, 0.95] },
        o4: { path: [[-9.4, 11.6]], t: [0.2, 0.7] },
        o5: { path: [[-5.4, 19.4]], t: [0.2, 0.7] },
      },
      screens: [
        { by: 'o4', face: [-6.8, 8.8], hold: 0.6 },
        { by: 'o5', face: [-4.6, 16.6], hold: 1.2 },
      ],
      def: {
        d2: { sag: 0 },
        d4: { path: [[-11, 10]], t: [0.3, 0.9] },
        d5: { path: [[-7.8, 18]], t: [0.3, 0.9] },
        d1: { sag: 0.2 },
      },
    },
    {
      title: '스태거',
      dur: 2,
      text: '[2]가 스태거의 안쪽으로 [4], 이어서 [5]의 어깨를 스치며 탑으로 올라갑니다. 뒤를 따라가던 [x2]는(**트레일**) [5]에게 걸립니다.',
      move: { o2: { path: [[-7.4, 11.4], [-3.6, 18.2], [-2.4, 29.4]], t: [0, 0.92] } },
      screens: [{ by: 'o5', face: [-4.6, 16.6], hold: 0.4, on: 'd2' }],
      def: {
        d2: { path: [[-6, 9], [-5.6, 13.6], [-4.6, 17]], t: [0.05, 0.6] },
        d4: { path: [[-11, 10]], t: [0, 0.2] }, d5: { path: [[-7.8, 18]], t: [0, 0.2] }, d1: { sag: 0.2 },
      },
    },
    {
      title: '탑 3점',
      dur: 1.6,
      text: '[3]이 탑의 [2]에게 공을 넣고, [2]가 받자마자 3점을 던집니다. [3]은 코트로 들어옵니다.',
      move: { o3: { path: [[-22.4, 17.4]], t: [0.15, 0.55] } },
      ball: [
        { type: 'pass', to: 'o2', at: 0.05 },
        { type: 'shot', at: 0.66, pts: 3 },
      ],
      def: { d2: { path: [[-3.4, 24.4]], t: [0, 0.65] }, d4: { path: [[-11, 10]], t: [0, 0.2] }, d5: { path: [[-7.8, 18]], t: [0, 0.2] }, d1: { sag: 0.2 } },
    },
  ],

  // 수비 대응별 분기: [2]가 베이스라인을 건너와 스태거 앞에 선 뒤(1단계) 갈라진다. 기본(위 2·3단계)은 트레일.
  reads: {
    at: 1,
    prompt: '[x2]는 스태거 스크린을 지나는 [2]를 어떻게 따라갈까요?',
    base: { id: 'trail', label: '트레일', why: '[x2]가 뒤를 따라 스크린을 지나면, 스크린에 걸려 늦은 사이 [2]가 탑에서 3점을 던집니다.' },
    options: [
      {
        id: 'top-lock',
        label: '탑 락킹',
        why: '[x2]가 [2]보다 먼저 위쪽으로 가서 탑을 막으면 [2]와 림 사이가 빕니다. [2]가 림으로 끊어 들어가 롭을 받습니다.',
        steps: [
          {
            title: '탑 락킹',
            dur: 1.4,
            text: '[x2]가 [2]를 앞질러 위쪽으로 돌아가, [4]와 [5]의 스크린 사이에서 탑으로 가는 길을 막습니다(**탑 락킹**). [2]는 [4]의 스크린 옆에서 멈춰 섭니다.',
            move: { o2: { path: [[-7.4, 10.6]], t: [0, 0.6] } },
            def: { d2: { path: [[-4.6, 8.4], [-5.6, 12.8]], t: [0, 0.7] }, d4: { path: [[-11, 10]], t: [0, 0.2] }, d5: { path: [[-7.8, 18]], t: [0, 0.2] }, d1: { sag: 0.2 } },
          },
          {
            title: '백도어',
            dur: 2,
            text: '[2]가 [x2]의 등 뒤로 림을 향해 끊어 들어가고(**백도어**), [3]이 띄워 준 롭을 받아 레이업을 올립니다.',
            move: {
              o2: { path: [[-4.6, 6.8], [-1.8, 5.8]], t: [0, 0.5] },
              o3: { path: [[-22.4, 17.4]], t: [0.4, 0.8] },
            },
            ball: [
              { type: 'lob', to: 'o2', at: 0.22 },
              { type: 'shot', at: 0.85, pts: 2 },
            ],
            def: { d2: { path: [[-5, 10.2], [-3.6, 8.6]], t: [0.1, 0.8] }, d4: { path: [[-11, 10]], t: [0, 0.2] }, d5: { path: [[-7.8, 18]], t: [0, 0.2] }, d1: { sag: 0.2 } },
          },
        ],
      },
      {
        id: 'switch',
        label: '스위치',
        why: '[x5]가 나와 [2]를 넘겨받으면 [x2]는 [5]의 뒤에 남습니다. [5]가 림으로 빠져 들어가 인바운드 패스를 받습니다.',
        steps: [
          {
            title: '스위치',
            dur: 2,
            text: '[5]의 스크린에서 [x5]가 나와 탑의 [2]를 넘겨받고(**스위치**), 스크린에 걸린 [x2]는 [5]의 뒤에 남습니다.',
            move: { o2: { path: [[-7.4, 11.4], [-3.6, 18.2], [-2.4, 29.4]], t: [0, 0.92] } },
            screens: [{ by: 'o5', face: [-4.6, 16.6], hold: 0.3, on: 'd2' }],
            def: {
              d2: { guard: 'o5', path: [[-6, 9], [-5.6, 13.6], [-4.6, 17]], t: [0.05, 0.6] },
              d5: { guard: 'o2', path: [[-6.4, 21.6], [-3.6, 25.6]], t: [0.4, 0.95] },
              d4: { path: [[-11, 10]], t: [0, 0.2] }, d1: { sag: 0.2 },
            },
          },
          {
            title: '스크리너 슬립',
            dur: 1.8,
            text: '[5]가 [x2]의 바깥쪽으로 돌아 레인을 따라 굴러 내려오며(**슬립**), [x2]를 등 뒤에 둔 채 [3]의 인바운드 패스를 받아 레이업을 올립니다.',
            move: {
              o5: { path: [[-7.4, 16.6], [-6.6, 14.2], [-3.8, 9], [-2.2, 7]], t: [0, 0.62] },
              o3: { path: [[-22.4, 17.4]], t: [0.45, 0.85] },
            },
            ball: [
              { type: 'pass', to: 'o5', at: 0.05 },
              { type: 'shot', at: 0.86, pts: 2 },
            ],
            def: { d2: { path: [[-4.6, 14.4], [-3.4, 10.6]], t: [0.25, 0.9] }, d3: { sag: 0.3 }, d5: { sag: 0 }, d4: { path: [[-11, 10]], t: [0, 0.2] }, d1: { sag: 0.2 } },
          },
        ],
      },
    ],
  },
};
