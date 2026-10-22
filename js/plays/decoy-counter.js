// 미끼 & 역습 (Decoy and Counter) — 타임아웃 후 작전
export default {
  id: 'decoy-counter',
  name: '미끼 & 역습',
  category: 'ato',
  difficulty: 3,
  aliases: ['decoy', 'counter set', '역습 세트'],
  situation: { period: 4, clock: 271, shotClock: 24, score: [88, 90] },
  summary:
    '상대가 미리 준비해 온 동작, 슈터 [2]를 위한 **핀다운 스크린**을 일부러 보여 주는(**미끼**) 타임아웃 후 작전입니다. 수비가 그 동작을 앞질러 막으면, 그 반대 방향으로 끊어 들어가는 **역습**이 진짜 노림수입니다.',
  when:
    '팀의 주요 슈터와 주요 세트를 상대가 철저히 대비하고 나올 때 씁니다. 수비가 열심히 막을수록 반대쪽이 빕니다.',
  keys: [
    '[2]는 처음 몇 걸음을 평소처럼 스크린 쪽으로 달려, 수비가 준비한 대로 움직이게 만듭니다.',
    '[2]는 [x2]가 어디에 서는지 보고, 위를 막으면 아래로, 따라오면 위로 갑니다.',
    '[5]는 [x2]의 길목에 멈춰 서서 스크린을 겁니다. [x5]가 [2]에게 나가면 곧바로 림으로 빠집니다.',
    '[1]은 [2]가 방향을 바꾸는 순간 공을 보낼 준비를 합니다.',
  ],
  counters: [
    { name: '오버플레이', desc: '[x2]가 스크린 위쪽으로 먼저 돌아가 [2]의 캐치를 막습니다. [2]가 등 뒤로 베이스라인을 따라 림으로 끊어 들어갑니다(백도어).', read: 'overplay' },
    { name: '기본 수비', desc: '[x2]가 [2]의 뒤를 따라 스크린을 지납니다. 스크린에 걸린 사이 [2]가 준비한 그대로 3점을 던집니다.', read: 'normal' },
    { name: '스위치', desc: '[x5]가 나와 [2]를 넘겨받습니다. 스크린을 건 [5]가 림으로 빠져 들어갑니다(슬립).', read: 'switch' },
  ],

  en: {
    name: 'Decoy and Counter',
    summary:
      'An after-timeout play that shows the action the defense has prepared for, a **pin-down screen** for the shooter, [2], on purpose (the **decoy**). If the defense jumps the action, the real target is the **counter**, a cut the other way.',
    when:
      'For when the other team has scouted your best shooter and your main set thoroughly. The harder the defense works to take it away, the more open the other side gets.',
    keys: [
      '[2] runs the first few steps toward the screen as usual, so the defense moves the way it prepared.',
      '[2] reads where [x2] stands: over the top means go under, following means go up.',
      '[5] comes to a stop in [x2]\'s path to screen. If [x5] goes out to [2], [5] slips to the rim at once.',
      '[1] is ready to pass the moment [2] changes direction.',
    ],
    counters: [
      { name: 'Overplay', desc: '[x2] gets over the top of the screen first to take away [2]\'s catch. [2] cuts behind, along the baseline to the rim (the **backdoor**).' },
      { name: 'Normal', desc: '[x2] follows behind [2] through the screen. While [x2] is held up, [2] shoots the three as drawn.' },
      { name: 'Switch', desc: '[x5] comes out and takes [2]. [5], the screener, slips to the rim.' },
    ],
    steps: [
      { title: 'Decoy set', text: 'After the timeout [1] has the ball at the right slot. [5] comes down from the right elbow and stops on [x2]\'s path (the **pin-down**), the action the defense has scouted.' },
      { title: 'Overplay', text: '[2] starts up toward the screen, but [x2] gets over the top of it first to take away the catch (the **overplay**). [2] stops right beside [5].' },
      { title: 'Backdoor layup', text: '[2] cuts back behind [x2], along the baseline to the rim (the **backdoor**), catches [1]\'s pass and lays it in.' },
    ],
    reads: {
      prompt: 'How does [x2] play [2] coming off the pin-down the defense has scouted?',
      base: { label: 'Overplay', why: 'If [x2] jumps over the top of the screen to take away the catch, the baseline behind is empty. [2] cuts backdoor.' },
      options: [
        {
          label: 'Normal', why: 'If [x2] just follows behind through the screen, the screen holds [x2] up. [2] shoots the three as drawn.',
          steps: [
            { title: 'Pin-down', text: '[2] comes up off [5]\'s screen to the right wing, and [x2], following behind, runs into [5].' },
            { title: 'Three as drawn', text: '[1] passes to [2] on the wing, and [2] shoots the three before [x2] can close out.' },
          ],
        },
        {
          label: 'Switch', why: 'If [x5] switches out onto [2], [x2] is left behind [5] on the far side from the rim. [5] slips to the rim.',
          steps: [
            { title: 'Switch', text: '[2] comes up off the screen and [x5] comes out and takes [2] (the **switch**). [x2], held up on the screen, is left behind [5], on the far side from the rim.' },
            { title: 'Screener slip', text: '[5] slips to the rim with [x2] behind (the **slip**), catches [1]\'s pass and lays it in.' },
          ],
        },
      ],
    },
  },

  start: { o1: [5.6, 27.4], o2: [9.2, 6.4], o5: [8.8, 18.6], o3: [-20.6, 16.4], o4: [-9.4, 7.6] },
  ball: 'o1',
  steps: [
    {
      title: '미끼 세트',
      dur: 1.6,
      text: '타임아웃 뒤 [1]이 오른쪽 슬롯에서 공을 잡습니다. [5]가 오른쪽 엘보에서 내려와 [x2]의 길목에 멈춰 섭니다(**핀다운**). 수비가 미리 준비해 온 동작입니다.',
      move: { o5: { path: [[8.6, 13.4], [8, 8.6]], t: [0.15, 0.85] } },
      screens: [{ by: 'o5', face: [7, 6.1], hold: 0.8 }],
      def: { d2: { sag: 0 }, d5: { sag: 0 }, d1: { sag: 0 }, d3: { sag: 0.3 }, d4: { sag: 0.3 } },
    },
    {
      title: '오버플레이',
      dur: 1.6,
      text: '[2]가 스크린 쪽으로 올라가기 시작하지만, [x2]가 스크린 위쪽으로 먼저 돌아가 캐치를 막습니다(**오버플레이**). [2]는 [5]의 바로 옆에서 멈춰 섭니다.',
      move: { o2: { path: [[11.4, 9.4]], t: [0, 0.4] } },
      def: { d2: { path: [[4.6, 6.4], [3.8, 9.6], [5.8, 12.6], [9.6, 13.6], [12.4, 13.4]], t: [0, 0.68] }, d5: { sag: 0 }, d1: { sag: 0 }, d3: { sag: 0.3 }, d4: { sag: 0.3 } },
    },
    {
      title: '백도어 레이업',
      dur: 1.9,
      text: '[2]가 [x2]의 등 뒤로 베이스라인을 따라 림으로 끊어 들어가고(**백도어**), [1]의 패스를 받아 레이업을 올립니다.',
      move: { o2: { path: [[9.8, 4], [4.2, 3.4], [2, 4.6]], t: [0, 0.6] } },
      ball: [
        { type: 'pass', to: 'o2', at: 0.32 },
        { type: 'shot', at: 0.85, pts: 2 },
      ],
      def: { d2: { path: [[11.2, 8.4], [7.4, 5.4]], t: [0.1, 0.9] }, d5: { sag: 0 }, d1: { sag: 0 }, d3: { sag: 0.3 }, d4: { sag: 0.3 } },
    },
  ],

  // 수비 대응별 분기: [5]가 핀다운 자리에 선 뒤(1단계) 갈라진다. 기본(위 2·3단계)은 오버플레이.
  reads: {
    at: 1,
    prompt: '[x2]는 수비가 준비해 온 핀다운을 타고 나오는 [2]를 어떻게 막을까요?',
    base: { id: 'overplay', label: '오버플레이', why: '[x2]가 캐치를 막으려 스크린 위로 먼저 돌아가면 뒤쪽 베이스라인이 빕니다. [2]가 백도어로 끊어 들어갑니다.' },
    options: [
      {
        id: 'normal',
        label: '기본 수비',
        why: '[x2]가 뒤를 따라 스크린을 지나면 스크린에 걸립니다. [2]가 준비한 그대로 3점을 던집니다.',
        steps: [
          {
            title: '핀다운',
            dur: 1.8,
            text: '[2]가 [5]의 스크린을 타고 오른쪽 윙으로 올라가고, 뒤를 따라가던 [x2]는 [5]에게 걸립니다.',
            move: { o2: { path: [[11.8, 10.4], [17.4, 12.8], [22.6, 12.4]], t: [0, 0.8] } },
            screens: [{ by: 'o5', face: [7, 6.1], hold: 0.3, on: 'd2' }],
            def: { d2: { path: [[9.4, 6.6], [12.8, 9.4], [17.6, 10.8]], t: [0.1, 0.95] }, d5: { sag: 0 }, d1: { sag: 0 }, d3: { sag: 0.3 }, d4: { sag: 0.3 } },
          },
          {
            title: '준비한 3점',
            dur: 1.8,
            text: '[1]이 윙의 [2]에게 패스하고, [2]는 [x2]가 달려 나오기 전에 3점을 던집니다.',
            ball: [
              { type: 'pass', to: 'o2', at: 0.05 },
              { type: 'shot', at: 0.55, pts: 3 },
            ],
            def: { d2: { path: [[18.8, 11.4]], t: [0, 0.5] }, d5: { sag: 0 }, d1: { sag: 0 }, d3: { sag: 0.3 }, d4: { sag: 0.3 } },
          },
        ],
      },
      {
        id: 'switch',
        label: '스위치',
        why: '[x5]가 나와 [2]를 넘겨받으면 [x2]는 [5]의 뒤, 림 반대쪽에 남습니다. [5]가 림으로 빠져 들어갑니다.',
        steps: [
          {
            title: '스위치',
            dur: 1.8,
            text: '[2]가 스크린을 타고 올라가자 [x5]가 나와 [2]를 넘겨받습니다(**스위치**). 스크린에 걸린 [x2]는 [5]의 뒤, 림 반대쪽에 남습니다.',
            move: { o2: { path: [[11.8, 10.4], [17.4, 12.8], [22.6, 12.4]], t: [0, 0.8] } },
            screens: [{ by: 'o5', face: [7, 6.1], hold: 0.3, on: 'd2' }],
            def: {
              d2: { guard: 'o5', path: [[9.4, 6.6]], t: [0.1, 0.4] },
              d5: { guard: 'o2', path: [[8.4, 11.6], [14.6, 12.6], [19.4, 12.2]], t: [0.2, 0.95] },
              d1: { sag: 0 }, d3: { sag: 0.3 }, d4: { sag: 0.3 },
            },
          },
          {
            title: '스크리너 슬립',
            dur: 1.6,
            text: '[5]가 [x2]를 등 뒤에 두고 림으로 빠져 들어가며(**슬립**), [1]의 패스를 받아 레이업을 올립니다.',
            move: { o5: { path: [[4.6, 6.8], [2.2, 5.8]], t: [0, 0.5] } },
            ball: [
              { type: 'pass', to: 'o5', at: 0.2 },
              { type: 'shot', at: 0.75, pts: 2 },
            ],
            def: { d2: { path: [[7.8, 6.2], [5.2, 5.2]], t: [0.1, 0.8] }, d5: { sag: 0 }, d1: { sag: 0 }, d3: { sag: 0.3 }, d4: { sag: 0.3 } },
          },
        ],
      },
    ],
  },
};
