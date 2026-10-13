// 스플릿 액션 (Split Action) — 포스트 엔트리 후 공 없는 두 선수의 스크린
export default {
  id: 'split-action',
  name: '스플릿 액션',
  category: 'motion',
  difficulty: 3,
  aliases: ['split', 'post split', '스플릿', '포스트 스플릿'],
  summary:
    '공이 포스트에 들어가면, 공 없는 두 선수가 서로 스크린을 걸며 갈라지는 작전입니다. 수비가 컷하는 선수에게 신경 쓰는 사이 **스크린을 건 선수**가 오픈 3점을 얻습니다. 현대 모션 오펜스를 대표하는 작전입니다.',
  when:
    '패스 좋은 빅맨이 포스트나 엘보에서 공을 잡을 수 있고, 외곽에 슈터가 둘 이상 있을 때 씁니다.',
  keys: [
    '포스트에 공이 들어간 순간이 시작 신호입니다. 공 없는 두 선수가 서로 스크린을 겁니다.',
    '스크리너가 스타 슈터일수록 위력적입니다. 수비는 스크리너도, 커터도 버릴 수 없습니다.',
    '커터는 수비 위치를 읽고 컬·플레어·백도어 중 하나를 고르고, 스크리너는 그 반대 방향으로 움직입니다.',
    '포스트맨은 컷, 팝, 1대1 세 방향을 모두 볼 수 있는 패스 능력이 필요합니다.',
  ],
  counters: [
    { name: '스위치', desc: '두 수비가 즉시 마크를 바꿉니다. 소통이 한 박자만 늦어도 둘 다 놓칩니다.', read: 'switch' },
    { name: '스크리너 고정', desc: '슈터 스크리너에게서 절대 떨어지지 않고, 커터는 포스트 쪽 수비가 견제합니다.', read: 'stay-screener' },
    { name: '포스트 도움 금지', desc: '포스트에 더블팀을 가지 않아 외곽 찬스 자체를 줄입니다.', read: 'no-post-help' },
  ],
  famous:
    '스티브 커 감독의 골든스테이트 워리어스(2015~2022) 모션 오펜스의 핵심입니다. 드레이먼드 그린이나 앤드루 보거트가 포스트·엘보에서 공을 잡고 스테픈 커리와 클레이 탐슨이 스플릿을 했습니다.',

  en: {
    name: 'Split Action',
    summary:
      'Once the ball goes into the post, the two players without the ball screen for each other and split apart. While the defense worries about the cutter, **the screener** gets an open three. It is a signature action of modern motion offenses.',
    when:
      'When a passing big can catch the ball in the post or at the elbow and you have at least two shooters on the perimeter.',
    keys: [
      'The post entry is the trigger: the two players without the ball screen for each other.',
      'It is most dangerous when the screener is a star shooter. The defense can\'t leave the screener or the cutter.',
      'The cutter reads the defense and picks a curl, flare, or backdoor; the screener moves the opposite way.',
      'The post player needs the vision to see all three options: the cut, the pop, and the one-on-one.',
    ],
    counters: [
      { name: 'Switch', desc: 'The two defenders trade assignments immediately. One beat late, and both get away.' },
      { name: 'Stay home', desc: 'Never leave the shooter who screens; the defenders near the post handle the cutter.' },
      { name: 'No post help', desc: 'Never double the post, which cuts down the kick-out chances.' },
    ],
    famous:
      'The heart of Steve Kerr\'s Golden State Warriors motion offense (2015–2022). Draymond Green or Andrew Bogut caught it at the post or the elbow while Stephen Curry and Klay Thompson ran the split.',
    steps: [
      { title: 'Post entry', text: '[5] seals in the left low post and [1] feeds the ball in with a bounce pass. Now the ball is in the post, and [1], the passer, and [2] at the top start the **split**.' },
      { title: 'Set the screen', text: 'After the entry, [1] moves up and screens the defender of [2], [x2]. [5] holds the ball in the post and watches the two of them.' },
      { title: 'Curl & pop', text: '[2] curls tightly around the screen toward the rim. The cut is dangerous, so [x1] gets pulled toward [2], and at that moment [1], the screener, pops back out beyond the arc. The real target was **the screener**.' },
      { title: 'Post kick-out three', text: '[5] kicks it out of the post to the open [1], who knocks down the three. If the defense had stayed with [1], the curl layup for [2] was there; if they covered both, [5] had a one-on-one in the post.' },
    ],
    reads: {
      prompt: 'How does the defense play the split screen?',
      base: { label: 'Chase the cutter', why: 'When the screener\'s defender gets pulled toward the cutter, the screener who popped is open. Kick it out of the post.' },
      options: [
        {
          label: 'Switch', why: 'A switch needs a screen to switch on. If the screener slips to the rim before contact, both get away.',
          steps: [
            { title: 'Switch & slip', text: '[x1] and [x2] try to trade assignments right away (the **switch**). At that moment [1] never finishes the screen and slips down toward the rim (the **slip**), with [x2] a beat late behind.' },
            { title: 'Slip & finish', text: '[5] in the post makes a short pass to [1] slipping to the rim, and [1] lays it in. One beat late on the communication, and both attackers get away.' },
          ],
        },
        {
          label: 'Stay with the screener', why: 'Staying home on the screener leaves fewer defenders for the curling cutter. Hit the cutter from the post.',
          steps: [
            { title: 'Curl', text: '[x1] never leaves [1], the screener who can shoot (**staying with the screener**). [2] curls around the screen toward the rim with [x2] chasing behind.' },
            { title: 'Curl layup', text: 'The popping [1] is covered, but [2], curling in, is open. [5] in the post hands it off to [2], who lays it in.' },
          ],
        },
        {
          label: 'No post help', why: 'If nobody leaves their man, the kick-outs dry up but the post is one-on-one. Score it in the post.',
          steps: [
            { title: 'Everyone stays home', text: 'This time nobody leaves their man (**no post help**). [x2] stays tight on the curling [2], and [x1] stays tight on the popping [1].' },
            { title: 'Post one-on-one', text: 'With the outside covered, [5] goes to work. A **drop step** toward the baseline spins [5] around [x5] for the shot at the rim.' },
          ],
        },
      ],
    },
  },

  start: { o1: [-18, 23], o2: [0, 31], o5: [-10, 9.5], o3: [23, 3.5], o4: [18, 22] },
  ball: 'o1',
  steps: [
    {
      title: '포스트 엔트리',
      dur: 1.5,
      text: '[5]가 왼쪽 로우 포스트에 자리를 잡고(실), [1]이 바운스 패스로 공을 넣습니다. 이제 공은 포스트에 있고, 패스한 [1]과 탑의 [2]가 **스플릿**을 시작합니다.',
      move: { o5: { path: [[-10.6, 10.2]], t: [0, 0.5] } },
      ball: [{ type: 'bounce', to: 'o5', at: 0.45 }],
    },
    {
      title: '스크린 세팅',
      dur: 1.4,
      text: '공을 넣은 [1]이 탑으로 올라가 [2]의 수비수 [x2]에게 스크린을 겁니다. 포스트의 [5]는 공을 지키며 두 사람의 움직임을 지켜봅니다.',
      move: {
        o1: { path: [[-11, 25.6], [-2.6, 27]], t: [0, 0.8] },
        o2: { path: [[2, 30.4]], t: [0.3, 0.8] },
      },
      screens: [{ by: 'o1', face: [0.6, 27.2], hold: 0.6 }],
      def: { d2: { path: [[0.4, 27.3]], t: [0, 0.6] } },
    },
    {
      title: '컬 & 팝',
      dur: 1.8,
      text: '[2]가 스크린을 감아 돌며(컬) 림 쪽으로 파고듭니다. 위협적인 컷에 [x1]이 [2]를 막으러 끌려가는 순간, 스크린을 건 [1]은 반대로 3점 라인 밖으로 빠져나갑니다(팝). 진짜 노림수는 **스크리너**였습니다.',
      move: {
        o2: { path: [[-1.8, 29.8], [-6, 26.4], [-7, 20.5], [-4.8, 15.5]], t: [0, 0.8] },
        o1: { path: [[-7.5, 28.6], [-16.5, 24.5]], t: [0.4, 1] },
      },
      def: {
        d2: { lag: 0.6, sag: 0 },
        d1: { path: [[-5.2, 21], [-4.6, 17.8]], t: [0.15, 0.7] },
      },
    },
    {
      title: '포스트 킥아웃 3점',
      dur: 1.7,
      text: '포스트의 [5]가 비어 있는 [1]에게 공을 빼주고, [1]이 3점을 던집니다. 수비가 [1]을 지켰다면 [2]의 컬 레이업이, 둘 다 지켰다면 [5]의 포스트 1대1이 남습니다.',
      move: { o2: { path: [[-2.5, 11]], t: [0, 0.5] } },
      ball: [
        { type: 'pass', to: 'o1', at: 0.1 },
        { type: 'shot', at: 0.5, pts: 3 },
      ],
      def: {
        d1: { path: [[-13.4, 20.6]], t: [0.2, 0.85] },
        d2: { lag: 0.5 },
      },
    },
  ],

  // 수비 대응별 분기: 포스트 엔트리·스크린 세팅(1·2단계) 뒤에 갈라진다. 기본(위 3·4단계)은 [x1]이 커터를 막으러 끌려가는 경우.
  reads: {
    at: 2,
    prompt: '수비는 스플릿 스크린을 어떻게 막을까요?',
    base: { id: 'chase-curl', label: '커터 쫓기', why: '커터를 막으러 스크리너의 수비가 끌려가면 팝한 스크리너가 빕니다. 포스트에서 빼 줍니다.' },
    options: [
      {
        id: 'switch',
        label: '스위치',
        why: '스크린을 바꿔 막으려면 스크린이 걸려야 합니다. 스크리너가 걸기 전에 림으로 빠지면 둘 다 놓칩니다.',
        steps: [
          {
            title: '스위치 & 슬립',
            dur: 1.6,
            text: '[x1]과 [x2]가 곧바로 마크를 바꾸려 합니다(**스위치**). 그 순간 [1]은 스크린을 끝까지 걸지 않고 림 쪽으로 빠져 내려갑니다(**슬립**). 한 박자 늦은 [x2]가 뒤쫓습니다.',
            move: {
              o1: { path: [[-3.8, 20.6], [-4.2, 13.2]], t: [0.1, 0.75] },
              o2: { path: [[-1.6, 29.6], [-6.6, 28.4]], t: [0.2, 0.85] },
            },
            def: { d1: { guard: 'o2' }, d2: { guard: 'o1', lag: 0.6 } },
          },
          {
            title: '슬립 & 마무리',
            dur: 1.6,
            text: '포스트의 [5]가 림 쪽으로 빠진 [1]에게 짧게 넘겨주고, [1]이 레이업으로 마무리합니다. 소통이 한 박자만 늦어도 두 사람 모두 놓칩니다.',
            move: { o1: { path: [[-3.4, 7.6]], t: [0, 0.35] } },
            ball: [
              { type: 'pass', to: 'o1', at: 0.2 },
              { type: 'shot', at: 0.62, pts: 2 },
            ],
            def: { d2: { lag: 0.5 } },
          },
        ],
      },
      {
        id: 'stay-screener',
        label: '스크리너 고정',
        why: '스크리너를 끝까지 지키면 컬하는 커터를 막을 사람이 줄어듭니다. 포스트에서 커터에게 넘깁니다.',
        steps: [
          {
            title: '컬',
            dur: 1.8,
            text: '[x1]이 슛이 좋은 스크리너 [1]에게서 절대 떨어지지 않습니다(**스크리너 고정**). [2]는 스크린을 감아 돌며 림 쪽으로 파고들고, [x2]는 뒤에서 쫓아옵니다.',
            move: {
              o2: { path: [[-1.8, 29.8], [-6, 26.4], [-7, 20.5], [-4.8, 15.5]], t: [0, 0.8] },
              o1: { path: [[-7.5, 28.6], [-16.5, 24.5]], t: [0.4, 1] },
            },
            def: { d2: { lag: 0.6, sag: 0 }, d1: { sag: 0 } },
          },
          {
            title: '컬 레이업',
            dur: 1.6,
            text: '팝한 [1]은 막혀 있지만, 컬로 파고든 [2]가 비어 있습니다. 포스트의 [5]가 [2]에게 넘겨주고, [2]가 레이업으로 마무리합니다.',
            move: { o2: { path: [[-3.2, 11.4], [-1.6, 7.4]], t: [0, 0.45] } },
            ball: [
              { type: 'pass', to: 'o2', at: 0.2 },
              { type: 'shot', at: 0.66, pts: 2 },
            ],
            def: { d2: { lag: 0.5, sag: 0 }, d1: { sag: 0 } },
          },
        ],
      },
      {
        id: 'no-post-help',
        label: '포스트 도움 금지',
        why: '아무도 자기 선수를 떠나지 않으면 외곽 찬스는 줄지만 포스트는 1대1입니다. 그대로 포스트에서 해결합니다.',
        steps: [
          {
            title: '모두 제자리',
            dur: 1.8,
            text: '이번에는 아무도 자기 선수를 떠나지 않습니다(**포스트 도움 금지**). [x2]는 컬하는 [2]에게, [x1]은 팝하는 [1]에게 바짝 붙어 따라갑니다.',
            move: {
              o2: { path: [[-1.8, 29.8], [-6, 26.4], [-7, 20.5], [-4.8, 15.5]], t: [0, 0.8] },
              o1: { path: [[-7.5, 28.6], [-16.5, 24.5]], t: [0.4, 1] },
            },
            def: { d2: { lag: 0.2, sag: 0 }, d1: { sag: 0 } },
          },
          {
            title: '포스트 1대1',
            dur: 1.9,
            text: '외곽이 모두 막혔으니 [5]가 직접 해결합니다. 베이스라인 쪽으로 **드롭 스텝**을 밟아 [x5]를 등지고 돌아 들어가 골밑 슛을 올립니다.',
            move: { o5: { path: [[-9.2, 7.8], [-6.8, 6.6]], t: [0.1, 0.55] } },
            ball: [{ type: 'shot', at: 0.68, pts: 2 }],
            def: {
              d5: { path: [[-8.4, 8.8]], t: [0.1, 0.6] },
              d2: { lag: 0.2, sag: 0 },
              d1: { sag: 0 },
            },
          },
        ],
      },
    ],
  },
};
