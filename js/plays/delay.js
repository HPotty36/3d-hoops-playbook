// 딜레이 (Delay)
export default {
  id: 'delay',
  name: '딜레이',
  category: 'system',
  difficulty: 3,
  aliases: ['delay offense', 'high post handoff', '딜레이 오펜스'],
  summary:
    '센터 [5]가 탑에서 공을 쥐고 공격의 중심이 되는 시스템 오펜스입니다. [5]가 윙 쪽으로 드리블하며 올라오는 슈터에게 공을 건네고(**핸드오프**), 수비가 어떻게 막느냐에 따라 돌파, 백도어, 3점이 갈립니다. 서두르지 않고 공을 쥔 채 수비를 끌어내 **딜레이**라는 이름이 붙었습니다.',
  when:
    '패스를 잘하는 빅맨이 있을 때, 공격 시간을 쓰며 수비를 림에서 멀리 끌어내고 싶을 때 씁니다.',
  keys: [
    '[5]는 3점 라인 근처 탑에서 공을 받아, 상대 빅맨을 림에서 멀리 끌어냅니다.',
    '[2]는 윙에서 [5]의 바깥쪽을 돌아 올라오며 공을 받습니다.',
    '[5]는 공을 건네는 순간 몸으로 [x2]의 길을 막아 줍니다.',
    '[1]·[3]·[4]는 넓게 서서 도움 수비를 멀리 둡니다.',
  ],
  counters: [
    { name: '트레일', desc: '[x2]가 [2]의 뒤를 따라 핸드오프 위로 돌아갑니다. 공을 받은 [2]가 [5]를 끼고 안쪽으로 파고듭니다.', read: 'trail' },
    { name: '윙 디나이', desc: '[x2]가 [2]와 [5] 사이를 막아 공을 받지 못하게 합니다. 등 뒤로 백도어가 열립니다.', read: 'deny' },
    { name: '언더', desc: '[x2]가 핸드오프 아래(림 쪽)로 돌아 돌파를 막습니다. 핸드오프 직후의 3점을 내줍니다.', read: 'under' },
  ],

  en: {
    name: 'Delay',
    summary:
      'A system offense run through the center, [5], holding the ball at the top. [5] dribbles toward a wing and hands the ball to a shooter coming up (the **handoff**); depending on how the defense plays it, the answer is a drive, a backdoor or a three. Holding the ball and drawing the defense out without rushing gives it the name **delay**.',
    when:
      'When you have a big who passes well, or want to use the clock and pull the defense away from the rim.',
    keys: [
      '[5] catches at the top near the arc, pulling the opposing big away from the rim.',
      '[2] comes up from the wing around the outside of [5] to take the ball.',
      'As [5] hands it off, [5]\'s body blocks [x2]\'s path.',
      '[1], [3] and [4] stay wide to keep help far away.',
    ],
    counters: [
      { name: 'Trail', desc: '[x2] follows [2] over the top of the handoff. [2] takes it and turns the corner around [5] to drive inside.' },
      { name: 'Wing deny', desc: '[x2] jumps between [2] and [5] to take away the catch, opening the backdoor behind.' },
      { name: 'Under', desc: '[x2] goes under the handoff, on the rim side, to stop the drive. It gives up a three right off the handoff.' },
    ],
    steps: [
      { title: 'Delay set', text: '[5] steps up from the high post to the top and catches the pass from [1]. [1] spreads out to the left wing after passing, with [3] waiting in the corner.' },
      { title: 'Handoff', text: '[5] dribbles toward the right wing, and [2] comes up around the outside to take it (the **handoff**). [x2], chasing from behind, gets caught on [5]\'s body (the **trail**).' },
      { title: 'Turn the corner & layup', text: '[2] turns the corner around [5] and drives all the way to the rim for a layup. [x5], pulled out to the top, cannot protect the rim.' },
    ],
    reads: {
      prompt: 'How does the defense play the handoff from [5] to [2]?',
      base: { label: 'Trail', why: 'If [x2] trails behind, turn the corner around [5] the moment you catch it.' },
      options: [
        {
          label: 'Wing deny', why: 'If the defender jumps the path to the ball, the way to the rim behind is open. Cut backdoor.',
          steps: [
            { title: 'Wing deny', text: '[x2] jumps between [2] and [5] to take away the catch (the **wing deny**).' },
            { title: 'Backdoor', text: '[2] cuts back behind [x2] toward the rim (the **backdoor cut**), takes the bounce pass from [5] and lays it in.' },
          ],
        },
        {
          label: 'Under', why: 'If [x2] goes under the handoff, the space up top is open. Shoot it right away.',
          steps: [
            { title: 'Under', text: '[x2] goes **under** the handoff, on the rim side, to take away the drive.' },
            { title: 'Three off the handoff', text: '[x2] is deep under the handoff and cannot contest. [2] rises for a three right where the handoff happened.' },
          ],
        },
      ],
    },
  },

  start: { o1: [-10, 27], o5: [0, 19], o2: [21, 17], o3: [-22.6, 4], o4: [22.6, 4] },
  ball: 'o1',
  steps: [
    {
      title: '딜레이 세팅',
      dur: 2.0,
      text: '[5]가 하이포스트에서 탑으로 올라와 [1]의 패스를 받습니다. 공을 넘긴 [1]은 왼쪽 윙으로 넓게 서고, [3]은 코너에서 기다립니다.',
      move: {
        o5: { path: [[0.4, 24], [0.6, 28.6]], t: [0, 0.45] },
        o1: { path: [[-15.6, 23.4], [-20, 18]], t: [0.5, 1] },
      },
      ball: [{ type: 'pass', to: 'o5', at: 0.42 }],
      def: { d2: { sag: 0.1 } },
    },
    {
      title: '핸드오프',
      dur: 1.6,
      text: '[5]가 오른쪽 윙 쪽으로 드리블하고, [2]가 바깥쪽을 돌아 올라와 공을 건네받습니다(**핸드오프**). 뒤에서 따라오던 [x2]는 [5]의 몸에 걸립니다(**트레일**).',
      move: {
        o5: { path: [[6.8, 26.6]], t: [0, 0.5] },
        o2: { path: [[19.6, 21.6], [13.4, 27.4], [9.2, 28.6]], t: [0, 0.85] },
      },
      ball: [{ type: 'handoff', to: 'o2', at: 0.8 }],
      screens: [{ by: 'o5', face: [10.6, 24.2], hold: 0.4, on: 'd2' }],
      def: { d2: { path: [[19, 19.4], [14.6, 24.6], [10.6, 27.2], [8.8, 28]], t: [0.15, 1] } },
    },
    {
      title: '코너 돌기 & 레이업',
      dur: 2.2,
      text: '[2]가 [5]를 끼고 안쪽으로 방향을 틀어(**코너 돌기**) 림까지 파고들어 레이업을 올립니다. 탑까지 끌려 나온 [x5]는 림을 지키지 못합니다.',
      move: { o2: { path: [[5.6, 29.6], [3.4, 25.4], [2.6, 16.4], [1.6, 9.4]], t: [0, 0.82] } },
      ball: [{ type: 'shot', at: 0.92, pts: 2 }],
      def: { d2: { path: [[7.8, 29.6], [4.8, 28.4], [3.8, 21.4]], t: [0.1, 0.95] } },
    },
  ],

  // 수비 대응별 분기: [5]가 탑에서 공을 받은 뒤(1단계 끝) 갈라진다. 기본(위 2·3단계)은 뒤따라가는 트레일.
  reads: {
    at: 1,
    prompt: '수비는 [5]가 [2]에게 건네는 핸드오프를 어떻게 막을까요?',
    base: { id: 'trail', label: '트레일', why: '[x2]가 뒤에서 따라오면, 공을 받는 순간 [5]를 끼고 안쪽으로 파고듭니다.' },
    options: [
      {
        id: 'deny',
        label: '윙 디나이',
        why: '받으러 오는 길을 미리 막으면 그 뒤 림까지가 빕니다. 백도어로 찌릅니다.',
        steps: [
          {
            title: '윙 디나이',
            dur: 1.4,
            text: '[x2]가 [2]와 [5] 사이로 뛰어들어 공을 받을 길을 막습니다(**윙 디나이**).',
            move: {
              o5: { path: [[5.4, 27.6]], t: [0, 0.5] },
              o2: { path: [[19.8, 20.6]], t: [0, 0.4] },
            },
            def: { d2: { path: [[17.4, 22.8]], t: [0, 0.5] } },
          },
          {
            title: '백도어',
            dur: 2.0,
            text: '[2]가 방향을 틀어 [x2]의 등 뒤로 림을 향해 끊어 들어가고(**백도어 컷**), [5]의 바운스 패스를 받아 레이업으로 마무리합니다.',
            move: { o2: { path: [[18.6, 16], [11.6, 10.6], [5, 7]], t: [0, 0.85] } },
            ball: [
              { type: 'bounce', to: 'o2', at: 0.42 },
              { type: 'shot', at: 0.93, pts: 2 },
            ],
            def: {
              d2: { path: [[18.2, 18.6], [12.4, 13.4]], t: [0.1, 0.85] },
              d4: { path: [[19.8, 6.4]], t: [0, 0.3] },
            },
          },
        ],
      },
      {
        id: 'under',
        label: '언더',
        why: '[x2]가 핸드오프 아래로 돌면 위쪽이 빕니다. 받자마자 던집니다.',
        steps: [
          {
            title: '언더',
            dur: 1.6,
            text: '[x2]가 돌파를 막으려고 핸드오프 **아래**(림 쪽)로 돌아갑니다.',
            move: {
              o5: { path: [[6.8, 26.6]], t: [0, 0.5] },
              o2: { path: [[19.6, 21.6], [13.4, 27.4], [9.2, 28.6]], t: [0, 0.85] },
            },
            ball: [{ type: 'handoff', to: 'o2', at: 0.8 }],
            screens: [{ by: 'o5', face: [10.6, 24.2], hold: 0.4 }],
            def: { d2: { path: [[16.4, 20.4], [11.2, 22.8], [8.2, 23.4]], t: [0, 0.7] } },
          },
          {
            title: '핸드오프 3점',
            dur: 1.4,
            text: '[x2]는 핸드오프 아래 깊숙이 있어 [2]를 막을 수 없습니다. [2]가 핸드오프를 받은 그 자리에서 3점을 던집니다.',
            ball: [{ type: 'shot', at: 0.3, pts: 3 }],
            def: { d2: { path: [[8.8, 24.4]], t: [0, 0.5] } },
          },
        ],
      },
    ],
  },
};
