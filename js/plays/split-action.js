// 스플릿 액션 (Split Action) — 포스트 엔트리 후 공 없는 두 선수의 스크린
export default {
  id: 'split-action',
  name: '스플릿 액션',
  category: 'motion',
  difficulty: 3,
  summary:
    '공이 포스트에 들어가면, 공 없는 두 선수가 서로 스크린을 걸며 갈라지는 작전입니다. 수비가 컷하는 선수에게 신경 쓰는 사이 **스크린을 건 선수**가 오픈 3점을 얻습니다. 골든스테이트 모션 오펜스의 상징입니다.',
  when:
    '패스 좋은 빅맨이 포스트나 엘보에서 공을 잡을 수 있고, 외곽에 슈터가 둘 이상 있을 때 씁니다.',
  keys: [
    '포스트에 공이 들어간 순간이 시작 신호입니다. 공 없는 두 선수가 서로 스크린을 겁니다.',
    '스크리너가 스타 슈터일수록 위력적입니다. 수비는 스크리너도, 커터도 버릴 수 없습니다.',
    '커터는 수비 위치를 읽고 컬·플레어·백도어 중 하나를 고르고, 스크리너는 그 반대 방향으로 움직입니다.',
    '포스트맨은 컷, 팝, 1대1 세 방향을 모두 볼 수 있는 패스 능력이 필요합니다.',
  ],
  counters: [
    { name: '스위치', desc: '두 수비가 즉시 마크를 바꿉니다. 소통이 한 박자만 늦어도 둘 다 놓칩니다.' },
    { name: '스크리너 고정', desc: '슈터 스크리너에게서 절대 떨어지지 않고, 커터는 포스트 쪽 수비가 견제합니다.' },
    { name: '포스트 도움 금지', desc: '포스트에 더블팀을 가지 않아 외곽 찬스 자체를 줄입니다.' },
  ],
  famous:
    '스티브 커 감독의 골든스테이트 워리어스(2015~2022) 모션 오펜스의 핵심입니다. 드레이먼드 그린이나 앤드루 보거트가 포스트·엘보에서 공을 잡고 스테픈 커리와 클레이 탐슨이 스플릿을 했습니다.',

  en: {
    name: 'Split Action',
    summary:
      'Once the ball goes into the post, the two players without the ball screen for each other and split apart. While the defense worries about the cutter, **the screener** gets an open three. It is the signature of Golden State\'s motion offense.',
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
};
