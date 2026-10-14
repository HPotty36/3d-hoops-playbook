// 사이드라인 트라이앵글 (Sideline Triangle)
export default {
  id: 'sideline-triangle',
  name: '사이드라인 트라이앵글',
  category: 'system',
  difficulty: 3,
  aliases: ['triangle', 'triple post', '트라이앵글'],
  summary:
    '한쪽 사이드에 포스트([5]), 윙([3]), 코너([2])가 삼각형을 이루고, 반대편에 두 명이 서는 **트라이앵글 오펜스**의 기본 대형입니다. 포스트에 공을 넣는 것이 출발점이고, 수비가 어떻게 막느냐에 따라 정해진 대응(**리드**)으로 이어집니다.',
  when:
    '포스트에서 공을 다룰 줄 아는 빅맨이 있고, 다섯 명 모두가 정해진 자리와 대응을 익힌 팀이 씁니다.',
  keys: [
    '[3]은 윙에서 공을 받아 먼저 포스트의 [5]를 봅니다.',
    '[2]는 코너에서 넓게 서서 [x2]를 포스트에서 멀리 둡니다.',
    '포스트가 막히면 반대편의 [4]가 엘보나 하이포스트로 들어와 두 번째 출구가 됩니다.',
    '공을 넣은 뒤에는 멈추지 말고 컷과 스크린으로 포스트를 돕습니다.',
  ],
  counters: [
    { name: '뒤에서 수비', desc: '[x5]가 [5]의 뒤(림 쪽)에 섭니다. 포스트에 공이 쉽게 들어가고, 그 뒤 컷이 이어집니다.', read: 'behind' },
    { name: '포스트 디나이', desc: '[x5]가 [5]의 앞을 막아 포스트 엔트리를 끊습니다. 엘보로 들어온 [4]가 다음 출구가 됩니다.', read: 'post-deny' },
    { name: '전원 오버플레이', desc: '모든 패스 길을 앞에서 막습니다. 하이포스트로 들어온 [4]를 거쳐 등 뒤로 백도어가 열립니다.', read: 'overplay' },
  ],
  famous:
    '텍스 윈터가 체계를 세웠고, 필 잭슨 감독의 불스와 레이커스가 여러 차례 우승하며 널리 알렸습니다.',

  en: {
    name: 'Sideline Triangle',
    summary:
      'The basic set of the **triangle offense**: on one side the post ([5]), the wing ([3]) and the corner ([2]) form a triangle, with two players on the other side. Everything starts with getting the ball into the post, and each way the defense reacts has a set answer (a **read**).',
    when:
      'For teams with a big who can handle the ball in the post, and five players who have learned the spots and the answers.',
    keys: [
      '[3] catches on the wing and looks into the post at [5] first.',
      '[2] stays wide in the corner to keep [x2] away from the post.',
      'If the post is denied, [4] from the far side flashes to the elbow or the high post as the second outlet.',
      'After an entry, keep moving with cuts and screens to help the post.',
    ],
    counters: [
      { name: 'Play behind', desc: '[x5] stays behind [5], on the rim side. The entry goes in easily, and cuts follow.' },
      { name: 'Post deny', desc: '[x5] fronts [5] to cut off the post entry. [4], flashing to the elbow, becomes the next outlet.' },
      { name: 'Full overplay', desc: 'Every passing lane is denied. A pass to [4] at the high post opens the backdoor behind.' },
    ],
    famous:
      'Systematized by Tex Winter and made famous by Phil Jackson\'s Bulls and Lakers through several championships.',
    steps: [
      { title: 'Triangle set', text: '[1] dribbles to the right slot. On the right, the post [5], the wing [3] and the corner [2] form the triangle, with [4] on the far side.' },
      { title: 'Post entry', text: '[1] passes to [3] on the wing. Seeing [x5] behind [5], [3] feeds the post right away (the **post entry**).' },
      { title: 'Split cuts', text: 'After the entry, [3] goes down and screens [x2], and [2] comes off it around the top of [5] toward the rim (the **split**). [5] feeds [2], who lays it in.' },
    ],
    reads: {
      prompt: 'How does the defense play [5] in the post?',
      base: { label: 'Play behind', why: 'If [x5] stays behind [5], the post entry is there. After it, the two perimeter players split off the post.' },
      options: [
        {
          label: 'Post deny', why: 'If the post is fronted, the elbow is open. [4] flashes there to catch, and [3] comes around for the ball.',
          steps: [
            { title: 'Post deny', text: '[x5] gets in front of [5] to take away the post entry (the **post deny**). [4] flashes from the far side to the ball-side elbow (the **pinch post**) and catches the pass from [3].' },
            { title: 'Pinch post', text: '[3] comes right around [4] for the ball (the **handoff**), turns the corner around [4] and goes in for the layup. [x3], following, gets caught on [4].' },
          ],
        },
        {
          label: 'Full overplay', why: 'If every passing lane is denied, the space behind is empty. Get the ball to [4] at the high post and cut backdoor.',
          steps: [
            { title: 'Full overplay', text: '[x3] denies the wing pass and [x5] fronts the post (the **overplay**). [4] flashes up to the high post and catches the pass from [1].' },
            { title: 'Blind pig', text: 'While [x3] watches the ball, [3] cuts behind along the baseline to the rim (the **blind pig**), takes the bounce pass from [4] and lays it in.' },
          ],
        },
      ],
    },
  },

  start: { o1: [4, 31], o3: [19, 18], o5: [8.2, 8.6], o2: [22, 4.6], o4: [-8.4, 17] },
  ball: 'o1',
  steps: [
    {
      title: '트라이앵글 세팅',
      dur: 1.6,
      text: '[1]이 오른쪽 슬롯으로 드리블해 옵니다. 오른쪽에는 포스트 [5], 윙 [3], 코너 [2]가 삼각형을 이루고, 반대편에는 [4]가 섭니다.',
      move: {
        o1: { path: [[7.6, 28.2]], t: [0, 0.7] },
        o3: { path: [[18.4, 18.6]], t: [0.3, 0.8] },
      },
      def: { d2: { sag: 0.2 }, d3: { sag: 0.2 }, d5: { sag: 0 } },
    },
    {
      title: '포스트 엔트리',
      dur: 1.6,
      text: '[1]이 윙의 [3]에게 패스하고, [x5]가 [5]의 뒤에 서 있는 것을 본 [3]이 곧바로 포스트에 공을 넣습니다(**포스트 엔트리**).',
      ball: [
        { type: 'pass', to: 'o3', at: 0.12 },
        { type: 'pass', to: 'o5', at: 0.62 },
      ],
      def: { d5: { path: [[7.2, 6.6]], t: [0, 0.4] }, d2: { sag: 0.2 } },
    },
    {
      title: '스플릿 컷',
      dur: 2.6,
      text: '공을 넣은 [3]이 코너 쪽으로 내려가 [x2]에게 스크린을 걸고, [2]가 그 스크린을 타고 [5]의 위쪽을 돌아 림으로 파고듭니다(**스플릿**). [5]가 건네준 공을 [2]가 레이업으로 마무리합니다.',
      move: {
        o3: { path: [[18.6, 8.2]], t: [0, 0.3] },
        o2: { path: [[21.6, 9.6], [18.4, 13.2], [11.6, 13.2], [4.6, 8.8]], t: [0.2, 0.86] },
      },
      screens: [{ by: 'o3', face: [20.6, 6.4], hold: 0.5, on: 'd2' }],
      ball: [
        { type: 'pass', to: 'o2', at: 0.72 },
        { type: 'shot', at: 0.93, pts: 2 },
      ],
      def: {
        d2: { path: [[20.4, 8], [19.4, 10.8], [14.4, 13]], t: [0.15, 0.95] },
        d5: { path: [[7.4, 6.4]], t: [0, 0.3] },
      },
    },
  ],

  // 수비 대응별 분기: 트라이앵글 대형을 갖춘 뒤(1단계 끝) 포스트를 어떻게 막느냐로 갈라진다. 기본(위 2·3단계)은 뒤에서 수비.
  reads: {
    at: 1,
    prompt: '수비는 포스트의 [5]를 어떻게 막을까요?',
    base: { id: 'behind', label: '뒤에서 수비', why: '[x5]가 [5]의 뒤에 있으면 포스트에 공이 들어갑니다. 공을 넣은 뒤 두 사람이 엇갈려 컷합니다.' },
    options: [
      {
        id: 'post-deny',
        label: '포스트 디나이',
        why: '포스트 앞을 막으면 엘보가 빕니다. [4]가 엘보로 들어와 공을 받고, [3]이 그 옆을 돌아 받습니다.',
        steps: [
          {
            title: '포스트 디나이',
            dur: 1.8,
            text: '[x5]가 [5]의 앞으로 돌아 포스트 엔트리를 막습니다(**포스트 디나이**). 반대편의 [4]가 공 쪽 엘보로 들어와(**핀치 포스트**) [3]의 패스를 받습니다.',
            move: { o4: { path: [[-2.4, 18.6], [7.6, 19.6]], t: [0.2, 0.8] } },
            ball: [
              { type: 'pass', to: 'o3', at: 0.12 },
              { type: 'pass', to: 'o4', at: 0.82 },
            ],
            def: { d5: { path: [[9.8, 10.6]], t: [0, 0.4] }, d3: { sag: 0.2 } },
          },
          {
            title: '핀치 포스트',
            dur: 2.4,
            text: '[3]이 [4]의 바로 옆을 돌아 공을 건네받고(**핸드오프**), [4]를 끼고 안쪽으로 방향을 틀어 레이업을 올립니다. 따라오던 [x3]는 [4]에게 걸립니다.',
            move: { o3: { path: [[14.4, 20.6], [9.6, 21.8], [5, 21.6], [3, 15], [1.8, 9.2]], t: [0, 0.85] } },
            ball: [
              { type: 'handoff', to: 'o3', at: 0.34 },
              { type: 'shot', at: 0.93, pts: 2 },
            ],
            screens: [{ by: 'o4', face: [10.6, 20.8], hold: 0.3, on: 'd3' }],
            def: { d3: { path: [[15.4, 18.2], [10.8, 19.6], [8.6, 22.2]], t: [0, 0.6] } },
          },
        ],
      },
      {
        id: 'overplay',
        label: '전원 오버플레이',
        why: '모든 패스 길을 앞에서 막으면 그 뒤가 빕니다. 하이포스트로 들어온 [4]에게 공을 넣고 백도어로 찌릅니다.',
        steps: [
          {
            title: '전원 오버플레이',
            dur: 1.6,
            text: '[x3]가 윙 패스 길을, [x5]가 포스트 앞을 막습니다(**오버플레이**). 반대편의 [4]가 하이포스트로 올라와 [1]의 패스를 받습니다.',
            move: { o4: { path: [[-4.4, 19.4], [0.4, 20.6]], t: [0.2, 0.8] } },
            ball: [{ type: 'pass', to: 'o4', at: 0.84 }],
            def: {
              d3: { path: [[16.4, 21.4]], t: [0, 0.45] },
              d5: { path: [[9.8, 10.6]], t: [0, 0.4] },
            },
          },
          {
            title: '블라인드 피그',
            dur: 2.3,
            text: '[x3]가 공을 보는 사이 [3]이 등 뒤로 베이스라인을 따라 림으로 끊어 들어가고(**블라인드 피그**), [4]의 바운스 패스를 받아 레이업으로 마무리합니다.',
            move: { o3: { path: [[18.8, 13.6], [12.6, 6.6], [5.6, 4.6], [2.6, 5.4]], t: [0, 0.82] } },
            ball: [
              { type: 'bounce', to: 'o3', at: 0.4 },
              { type: 'shot', at: 0.92, pts: 2 },
            ],
            def: { d3: { path: [[17.6, 17.4], [12.4, 10.6]], t: [0.15, 0.9] } },
          },
        ],
      },
    ],
  },
};
