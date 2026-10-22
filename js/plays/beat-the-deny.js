// 디나이 깨기 (Beat the Deny) — 사이드라인 인바운드
export default {
  id: 'beat-the-deny',
  name: '디나이 깨기',
  category: 'slob',
  difficulty: 1,
  aliases: ['get open', 'safe inbound', '안전 인바운드'],
  situation: { period: 1, clock: 320, shotClock: 14, score: [12, 9] },
  summary:
    '사이드라인 인바운드에서 포인트가드 [1]이 [5]의 **다운 스크린**을 타고 나와 공을 받고, 곧바로 [5]와 **픽 앤 롤**로 이어 가는 기본 세트입니다. 수비가 [1]의 캐치를 막으면 [5]가 공을 받아 다음 동작으로 넘어갑니다.',
  when:
    '수비가 공을 넣을 길을 앞에서 막을 때(**디나이**) 5초 안에 안전하게 공을 넣고 바로 공격을 시작하고 싶을 때 씁니다.',
  keys: [
    '[1]은 [5]가 자리를 잡을 때까지 블록에서 기다렸다가, [5]의 어깨를 스치며 윙으로 올라옵니다.',
    '[5]는 스크린을 건 뒤 곧바로 공 쪽을 봅니다. [1]이 막히면 [5]가 두 번째 출구입니다.',
    '[3]은 5초를 세며, 열리는 쪽에 망설임 없이 공을 넣습니다.',
    '공을 받은 뒤에는 멈추지 말고 바로 [5]와 2대2를 시작합니다.',
  ],
  counters: [
    { name: '기본 수비', desc: '[x1]이 스크린을 따라 나옵니다. [1]이 윙에서 공을 받고, 곧바로 [5]와 픽 앤 롤을 합니다.', read: 'normal' },
    { name: '디나이', desc: '[x1]이 윙으로 먼저 가서 캐치를 막습니다. 공을 받으러 나온 [5]에게 공이 들어가고, [1]이 [5]에게서 핸드오프를 받습니다.', read: 'deny' },
    { name: '스위치', desc: '[x5]가 나와 [1]을 넘겨받습니다. 스크린을 건 [5]가 림으로 빠져 들어갑니다(슬립).', read: 'switch' },
  ],

  en: {
    name: 'Beat the Deny',
    summary:
      'A basic sideline inbound set: the point guard, [1], comes off [5]\'s **down screen** to catch the ball and goes straight into a **pick and roll** with [5]. If the defense takes away [1]\'s catch, [5] gets the ball and the play moves on.',
    when:
      'For when the defense is denying the inbound passing lanes (the **deny**) and you want a safe inbound within five seconds that starts the offense right away.',
    keys: [
      '[1] waits on the block until [5] is set, then comes up to the wing right off [5]\'s shoulder.',
      '[5] looks to the ball as soon as the screen is set. If [1] is covered, [5] is the second outlet.',
      '[3] counts the five seconds and passes to whoever comes open without hesitating.',
      'After the catch, keep going: start the two-man game with [5] right away.',
    ],
    counters: [
      { name: 'Normal', desc: '[x1] follows over the screen. [1] catches on the wing and goes straight into the pick and roll with [5].' },
      { name: 'Deny', desc: '[x1] gets to the wing first and takes away the catch. The ball goes in to [5], who steps out for it, and [1] takes a handoff from [5].' },
      { name: 'Switch', desc: '[x5] comes out and takes [1]. [5], the screener, slips to the rim.' },
    ],
    steps: [
      { title: 'Down screen', text: '[3] holds the ball out of bounds on the left sideline. [1] waits on the left block while [5] comes down from the elbow and stands on [x1]\'s high side (the **down screen**).' },
      { title: 'Catch', text: '[1] comes up to the left wing off [5]\'s shoulder, with [x1] following, and catches [3]\'s inbound pass.' },
      { title: 'Pick and roll', text: '[5] runs up and sets a ball screen for [1] on the wing (the **pick and roll**). [x1] runs into [5], and [x5] steps up to stop [1]. [1] goes over the top of the screen and turns toward the middle.' },
      { title: 'Roll finish', text: '[5] rolls to the rim behind [x5] (the **roll**), and [1] bounces a pass in. [5] lays it in.' },
    ],
    reads: {
      prompt: 'How does [x1] guard [1] coming off [5]\'s down screen?',
      base: { label: 'Normal', why: 'If [x1] just follows over the screen, [1] catches on the wing and goes straight into the pick and roll.' },
      options: [
        {
          label: 'Deny', why: 'If [x1] gets to the wing first, [5] steps out for the inbound pass, and [1] comes back for a handoff.',
          steps: [
            { title: 'Deny', text: '[x1] goes over the top of the screen and gets toward the wing first, taking away the catch (the **deny**). [1] stops above the block, and [5] pops out high to the wing and catches the inbound pass. [x5] stays in the paint.' },
            { title: 'Handoff', text: '[1] comes up on [5]\'s inside and takes the handoff, while [x1], chasing, runs into [5]. With [x5] still in the paint, [1] pulls up at the elbow for a jumper.' },
          ],
        },
        {
          label: 'Switch', why: 'If [x5] switches out onto [1], [x1] is left behind [5]. [5] slips to the rim for the inbound pass.',
          steps: [
            { title: 'Switch', text: '[1] comes up to the wing, and [x5] comes out and takes [1] (the **switch**). [x1], held up on the screen, is left behind [5].' },
            { title: 'Big slips', text: '[5] slips to the rim with [x1] behind (the **slip**), catches [3]\'s inbound pass and lays it in.' },
          ],
        },
      ],
    },
  },

  start: { o3: [-25.6, 18], o1: [-9.4, 8.2], o5: [-8.6, 18.8], o2: [16, 22], o4: [19, 6] },
  ball: 'o3',
  steps: [
    {
      title: '다운 스크린',
      dur: 1.6,
      text: '[3]이 왼쪽 사이드라인 밖에서 공을 듭니다. [1]은 왼쪽 블록에서 기다리고, [5]가 엘보에서 내려와 [x1]의 위쪽에 섭니다(**다운 스크린**).',
      move: { o5: { path: [[-8.4, 14], [-7.8, 10.2]], t: [0.2, 0.85] } },
      screens: [{ by: 'o5', face: [-7.3, 7.6], hold: 0.8 }],
      def: { d1: { sag: 0 }, d5: { sag: 0 }, d2: { sag: 0.2 }, d4: { sag: 0.2 } },
    },
    {
      title: '캐치',
      dur: 1.7,
      text: '[1]이 [5]의 어깨를 스치며 왼쪽 윙으로 올라오고, [x1]이 따라옵니다. [1]이 [3]의 인바운드 패스를 받습니다.',
      move: { o1: { path: [[-12.4, 11.4], [-16.6, 17.2], [-18, 22.4]], t: [0, 0.65] } },
      ball: [{ type: 'pass', to: 'o1', at: 0.68 }],
      def: { d1: { sag: 0 }, d5: { sag: 0 }, d2: { sag: 0.2 }, d4: { sag: 0.2 } },
    },
    {
      title: '픽 앤 롤',
      dur: 2.4,
      text: '[5]가 올라가 윙의 [1]에게 볼 스크린을 겁니다(**픽 앤 롤**). [x1]은 [5]에게 걸리고, [x5]가 [1]을 막으러 올라옵니다. [1]은 스크린 위쪽을 돌아 가운데로 방향을 틉니다.',
      move: {
        o3: { path: [[-22.4, 17.4]], t: [0, 0.3] },
        o5: { path: [[-11.8, 16.6], [-15.2, 20.2]], t: [0, 0.35] },
        o1: { path: [[-17.4, 24.6], [-13.4, 25], [-9, 21.2], [-6.4, 18]], t: [0.4, 0.95] },
      },
      screens: [{ by: 'o5', face: [-16.8, 20.4], hold: 0.2, on: 'd1' }],
      def: {
        d1: { path: [[-17.6, 20.4], [-17.2, 19.4]], t: [0, 0.5] },
        d5: { path: [[-11.4, 18.6], [-12.4, 21.8], [-10.4, 21.2]], t: [0.1, 0.85] },
        d2: { sag: 0.2 }, d4: { sag: 0.2 },
      },
    },
    {
      title: '롤 마무리',
      dur: 2,
      text: '[5]가 [x5]의 뒤로 림을 향해 굴러 들어가고(**롤**), [1]이 바운스 패스를 넣어 줍니다. [5]가 레이업으로 마무리합니다.',
      move: { o5: { path: [[-10.6, 15.2], [-4.4, 9]], t: [0, 0.62] } },
      ball: [
        { type: 'bounce', to: 'o5', at: 0.35 },
        { type: 'shot', at: 0.82, pts: 2 },
      ],
      def: { d5: { path: [[-8.6, 18.4], [-5.4, 12.6]], t: [0.1, 0.9] }, d1: { path: [[-12.8, 21.4]], t: [0, 0.6] }, d2: { sag: 0.2 }, d4: { sag: 0.2 } },
    },
  ],

  // 수비 대응별 분기: [5]가 다운 스크린 자리에 선 뒤(1단계) 갈라진다. 기본(위 2~4단계)은 기본 수비.
  reads: {
    at: 1,
    prompt: '[x1]은 [5]의 다운 스크린을 타고 나오는 [1]을 어떻게 막을까요?',
    base: { id: 'normal', label: '기본 수비', why: '[x1]이 스크린을 그대로 따라 나오면 [1]이 윙에서 공을 받고 곧바로 픽 앤 롤로 이어 갑니다.' },
    options: [
      {
        id: 'deny',
        label: '디나이',
        why: '[x1]이 윙으로 먼저 가서 캐치를 막으면, [5]가 공을 받으러 나오고 [1]이 돌아와 핸드오프를 받습니다.',
        steps: [
          {
            title: '디나이',
            dur: 2,
            text: '[x1]이 스크린 위로 돌아 윙 쪽으로 먼저 가서 캐치를 막습니다(**디나이**). [1]은 블록 위에서 멈춰 서고, [5]가 윙으로 높게 빠져 인바운드 패스를 받습니다. [x5]는 페인트에 남습니다.',
            move: {
              o1: { path: [[-12.4, 11.8]], t: [0, 0.45] },
              o5: { path: [[-11, 14.4], [-15.4, 21.4]], t: [0.3, 0.78] },
            },
            ball: [{ type: 'pass', to: 'o5', at: 0.8 }],
            def: {
              d1: { path: [[-5, 6.6], [-3.6, 9.6], [-5.6, 13.4], [-11.4, 15.6], [-17, 16]], t: [0, 0.55] },
              d5: { path: [[-8.6, 12.4], [-9.8, 13.6]], t: [0.3, 0.8] },
              d2: { sag: 0.2 }, d4: { sag: 0.2 },
            },
          },
          {
            title: '핸드오프',
            dur: 2,
            text: '[1]이 [5]의 안쪽으로 올라와 공을 건네받고(**핸드오프**), 따라오던 [x1]은 [5]에게 걸립니다. [x5]가 페인트에 남아 있어, [1]은 엘보에서 멈춰 점프슛을 던집니다.',
            move: {
              o1: { path: [[-13, 18.4], [-10.4, 20.2], [-7.8, 19]], t: [0, 0.75] },
              o3: { path: [[-23, 21.6]], t: [0, 0.35] },
            },
            ball: [
              { type: 'handoff', to: 'o1', at: 0.4 },
              { type: 'shot', at: 0.9, pts: 2 },
            ],
            screens: [{ by: 'o5', face: [-16.6, 18.6], hold: 0.3, on: 'd1' }],
            def: {
              d1: { path: [[-16.2, 19.2]], t: [0.05, 0.5] },
              d5: { path: [[-9.6, 14.4]], t: [0.2, 0.8] },
              d2: { sag: 0.2 }, d4: { sag: 0.2 },
            },
          },
        ],
      },
      {
        id: 'switch',
        label: '스위치',
        why: '[x5]가 나와 [1]을 넘겨받으면 [x1]은 [5]의 뒤에 남습니다. [5]가 림으로 빠져 들어가 인바운드 패스를 받습니다.',
        steps: [
          {
            title: '스위치',
            dur: 1.7,
            text: '[1]이 윙으로 올라오자 [x5]가 나와 [1]을 넘겨받습니다(**스위치**). 스크린에 걸린 [x1]은 [5]의 뒤에 남습니다.',
            move: { o1: { path: [[-12.4, 11.4], [-16.6, 17.2], [-18, 22.4]], t: [0, 0.65] } },
            screens: [{ by: 'o5', face: [-7.3, 7.6], hold: 0.3, on: 'd1' }],
            def: {
              d1: { guard: 'o5', path: [[-9.4, 8.4]], t: [0.05, 0.4] },
              d5: { guard: 'o1', path: [[-5.6, 12.4], [-11.4, 17.4], [-15.6, 20.2]], t: [0.15, 0.85] },
              d2: { sag: 0.2 }, d4: { sag: 0.2 },
            },
          },
          {
            title: '빅맨 슬립',
            dur: 1.8,
            text: '[5]가 [x1]을 등 뒤에 두고 림으로 빠져 들어가며(**슬립**), [3]의 인바운드 패스를 받아 레이업을 올립니다.',
            move: {
              o5: { path: [[-5, 8.2], [-2.4, 6.6]], t: [0, 0.45] },
              o3: { path: [[-22.4, 17.4]], t: [0.4, 0.8] },
            },
            ball: [
              { type: 'pass', to: 'o5', at: 0.25 },
              { type: 'shot', at: 0.75, pts: 2 },
            ],
            def: { d1: { path: [[-8, 9.2], [-5.2, 9.4]], t: [0.1, 0.8] }, d5: { sag: 0 }, d2: { sag: 0.2 }, d4: { sag: 0.2 } },
          },
        ],
      },
    ],
  },
};
