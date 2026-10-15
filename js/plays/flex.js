// 플렉스 (Flex)
export default {
  id: 'flex',
  name: '플렉스',
  category: 'system',
  difficulty: 3,
  aliases: ['flex offense', 'flex cut', '플렉스 컷'],
  summary:
    '공을 반대편으로 돌린 뒤, 베이스라인의 [3]이 블록에 선 [5]의 스크린(**플렉스 스크린**)을 스치며 페인트를 가로질러 반대쪽 블록으로 컷하는(**플렉스 컷**) 시스템 오펜스입니다. 컷이 막히면 스크리너에게 다시 스크린을 걸어 주는 동작(**스크리너 스크린**)이 이어지고, 같은 움직임을 자리를 바꿔 가며 되풀이합니다.',
  when:
    '참을성 있게 공을 돌리며 확률 높은 슛을 만들고 싶을 때, 빅맨과 가드 모두 스크린과 컷을 할 수 있을 때 씁니다.',
  keys: [
    '[2]가 [1]에게 공을 돌리는(**볼 리버설**) 순간 반대쪽에서 컷이 시작됩니다.',
    '[5]는 블록에 버티고 서서, 코너 쪽에서 오는 [x3]의 길을 막습니다.',
    '[3]은 [5]의 어깨를 스치며 페인트를 가로질러 반대쪽 블록으로 갑니다.',
    '공을 건넨 [2]는 다음 동작으로 [5]에게 내려가 스크린을 걸 준비를 합니다.',
  ],
  counters: [
    { name: '스크린에 걸림', desc: '[x3]가 플렉스 스크린에 걸립니다. 페인트를 가로지르는 [3]이 비어 있습니다.', read: 'caught' },
    { name: '도움 수비', desc: '스크리너의 수비수가 컷을 막으러 내려옵니다. [2]가 [5]에게 스크린을 걸어 주면 [5]가 엘보에서 빕니다.', read: 'help' },
    { name: '스위치', desc: '스크린에서 마크를 바꿉니다. 작은 [x3]가 빅맨 [5]를 맡게 됩니다.', read: 'switch' },
  ],
  famous:
    '1990년대 유타 재즈가 제리 슬론 감독 아래에서 이 움직임을 끈질기게 되풀이한 것으로 유명합니다.',

  en: {
    name: 'Flex',
    summary:
      'A system offense: after the ball is swung to the other side, [3] cuts from the baseline off a screen from [5] at the block (the **flex screen**) and runs across the lane to the opposite block (the **flex cut**). If the cut is covered, a screen for the screener follows (**screen the screener**), and the same moves repeat from new spots.',
    when:
      'When you want to move the ball patiently for high-percentage shots, and both bigs and guards can screen and cut.',
    keys: [
      'The cut starts the moment [2] swings the ball to [1] (the **ball reversal**).',
      '[5] holds the block and blocks the path of [x3] coming from the corner side.',
      '[3] brushes [5]\'s shoulder and crosses the lane to the opposite block.',
      'After passing, [2] gets ready to come down and screen for [5] as the next move.',
    ],
    counters: [
      { name: 'Caught on the screen', desc: '[x3] runs into the flex screen. [3] is open crossing the lane.' },
      { name: 'Help', desc: 'The screener\'s defender drops to stop the cut. When [2] screens for [5], [5] is open at the elbow.' },
      { name: 'Switch', desc: 'Trade assignments on the screen. The small [x3] ends up guarding the big, [5].' },
    ],
    famous:
      'The Utah Jazz under Jerry Sloan were famous for running it again and again through the 1990s.',
    steps: [
      { title: 'Ball reversal', text: '[2] swings the ball from the right slot to [1] on the left (the **ball reversal**). [5] on the far block and [3] in the short corner get ready for the next move.' },
      { title: 'Flex cut', text: '[3] brushes off [5]\'s screen (the **flex screen**) and cuts across the lane to the left block (the **flex cut**). [x3], following from the corner side, runs into [5].' },
      { title: 'Layup', text: '[1] bounces it to [3] arriving at the block, and [3] lays it in.' },
    ],
    reads: {
      prompt: 'How does the defense play [5]\'s flex screen?',
      base: { label: 'Caught on the screen', why: 'If [x3] runs into the flex screen, [3] is open at the block after crossing the lane.' },
      options: [
        {
          label: 'Help', why: 'If the screener\'s defender drops to stop the cut, screen for the screener and get [5] the ball at the elbow.',
          steps: [
            { title: 'Help', text: '[x5] leaves [5] and drops into the lane to stop [3]\'s cut (the **help**). Meanwhile [2] comes down and sets a screen for [5] (**screen the screener**).' },
            { title: 'Elbow jumper', text: '[5] comes up off [2]\'s screen to the elbow, catches the pass from [1] and shoots the jumper. [x5], trying to get back, is cut off by [2] and too late.' },
          ],
        },
        {
          label: 'Switch', why: 'If the defense switches the screen, the small [x3] ends up on the big, [5]. [5] attacks that mismatch in the post.',
          steps: [
            { title: 'Switch', text: '[x5] takes [3] on the cut and [x3] takes [5] (the **switch**). [5] steps into the lane and keeps the smaller [x3] behind.' },
            { title: 'Post mismatch', text: '[1] lofts the entry over [x3] to [5], who finishes at the rim.' },
          ],
        },
      ],
    },
  },

  start: { o2: [11, 26], o1: [-11, 26], o3: [16, 4.6], o5: [7.2, 7.8], o4: [-22.6, 4] },
  ball: 'o2',
  steps: [
    {
      title: '볼 리버설',
      dur: 1.6,
      text: '오른쪽 슬롯의 [2]가 왼쪽 슬롯의 [1]에게 공을 돌립니다(**볼 리버설**). 반대편 블록의 [5]와 짧은 코너의 [3]이 다음 동작을 준비합니다.',
      move: { o1: { path: [[-13.4, 24.6]], t: [0, 0.4] } },
      ball: [{ type: 'pass', to: 'o1', at: 0.35 }],
      def: { d3: { sag: 0.15 }, d5: { sag: 0.2 } },
    },
    {
      title: '플렉스 컷',
      dur: 1.9,
      text: '[3]이 [5]의 스크린(**플렉스 스크린**)을 스치며 페인트를 가로질러 왼쪽 블록으로 컷합니다(**플렉스 컷**). 코너 쪽에서 따라오던 [x3]는 [5]에게 걸립니다.',
      move: { o3: { path: [[12.6, 8.8], [6.2, 10.2], [0.2, 8.6], [-3.8, 7.6]], t: [0.05, 0.9] } },
      screens: [{ by: 'o5', face: [11.6, 6.4], hold: 0.4, on: 'd3' }],
      def: { d3: { path: [[11.4, 7.4], [8.6, 8.6], [4.6, 9.4]], t: [0.15, 1] } },
    },
    {
      title: '레이업',
      dur: 1.6,
      text: '[1]이 블록으로 들어오는 [3]에게 바운스 패스를 넣고, [3]이 레이업으로 마무리합니다.',
      move: { o3: { path: [[-2.4, 6.6]], t: [0, 0.35] } },
      ball: [
        { type: 'bounce', to: 'o3', at: 0.05 },
        { type: 'shot', at: 0.64, pts: 2 },
      ],
      def: { d3: { path: [[1.4, 8.6]], t: [0, 0.7] } },
    },
  ],

  // 수비 대응별 분기: 볼 리버설(1단계) 뒤, 플렉스 스크린을 어떻게 막느냐로 갈라진다. 기본(위 2·3단계)은 스크린에 걸림.
  reads: {
    at: 1,
    prompt: '수비는 [5]의 플렉스 스크린을 어떻게 막을까요?',
    base: { id: 'caught', label: '스크린에 걸림', why: '[x3]가 플렉스 스크린에 걸리면, 페인트를 가로지른 [3]이 블록에서 비어 있습니다.' },
    options: [
      {
        id: 'help',
        label: '도움 수비',
        why: '스크리너의 수비수가 컷을 막으러 내려오면, 스크리너 [5]에게 스크린을 걸어 엘보에서 공을 받게 합니다.',
        steps: [
          {
            title: '도움 수비',
            dur: 1.9,
            text: '[x5]가 [5]를 떠나 페인트로 내려와 [3]의 컷을 막습니다(**도움 수비**). 그 사이 [2]가 [5] 쪽으로 내려가 스크린을 겁니다(**스크리너 스크린**).',
            move: {
              o3: { path: [[12.6, 8.8], [6.2, 10.2], [0.2, 8.6], [-3.8, 7.6]], t: [0.05, 0.9] },
              o2: { path: [[8.6, 18.6], [5.8, 12]], t: [0.2, 0.9] },
            },
            screens: [{ by: 'o2', face: [3.6, 10.6], hold: 0.5 }],
            def: {
              d3: { path: [[11.4, 7.4], [8.6, 8.6], [4.6, 9.4]], t: [0.15, 1] },
              d5: { path: [[3.4, 8.4], [-1.4, 7.6]], t: [0.25, 0.8] },
              d2: { path: [[9.6, 20.4], [7.6, 14.2]], t: [0.25, 1] },
            },
          },
          {
            title: '엘보 점퍼',
            dur: 1.8,
            text: '[5]가 [2]의 스크린을 타고 엘보로 올라와 [1]의 패스를 받아 점퍼를 던집니다. 돌아오려던 [x5]는 [2]에게 막혀 늦었습니다.',
            move: { o5: { path: [[9.4, 13.2], [7.6, 19.6]], t: [0, 0.52] } },
            screens: [{ by: 'o2', face: [3.6, 10.6], hold: 0.3, on: 'd5' }],
            ball: [
              { type: 'pass', to: 'o5', at: 0.35 },
              { type: 'shot', at: 0.75, pts: 2 },
            ],
            def: {
              d5: { path: [[2.8, 10.4], [4.8, 12.2], [5.4, 15.8]], t: [0.1, 0.9] },
              d2: { path: [[7.8, 13.8]], t: [0, 0.3] },
              d3: { path: [[0.2, 8.8]], t: [0, 0.5] },
            },
          },
        ],
      },
      {
        id: 'switch',
        label: '스위치',
        why: '스크린에서 마크를 바꾸면 작은 [x3]가 빅맨 [5]를 맡게 됩니다. [5]가 골밑에서 그 차이를 공략합니다.',
        steps: [
          {
            title: '스위치',
            dur: 1.9,
            text: '[x5]가 컷하는 [3]을 넘겨받고, [x3]가 [5]를 맡습니다(**스위치**). [5]는 페인트 쪽으로 한 걸음 들어서며 작은 [x3]를 등 뒤에 둡니다.',
            move: {
              o3: { path: [[12.6, 8.8], [6.2, 10.2], [0.2, 8.6], [-3.8, 7.6]], t: [0.05, 0.9] },
              o5: { path: [[4.6, 7.4]], t: [0.6, 0.95] },
            },
            def: {
              d5: { guard: 'o3', path: [[4.4, 10.6], [-1.6, 9.4]], t: [0.2, 0.9] },
              d3: { guard: 'o5', path: [[11.4, 7.6], [8.4, 9.8], [5.6, 10.2]], t: [0.15, 1] },
            },
          },
          {
            title: '포스트 미스매치',
            dur: 1.8,
            text: '[1]이 [x3] 머리 위로 [5]에게 공을 띄워 넣고, [5]가 림 앞에서 마무리합니다.',
            move: { o5: { path: [[2.4, 6.6]], t: [0.45, 0.72] } },
            ball: [
              { type: 'lob', to: 'o5', at: 0.1 },
              { type: 'shot', at: 0.84, pts: 2 },
            ],
            def: { d3: { path: [[4.4, 9.8]], t: [0, 0.6] } },
          },
        ],
      },
    ],
  },
};
