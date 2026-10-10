// 픽 앤 롤 (High Pick and Roll)
export default {
  id: 'pick-and-roll',
  name: '픽 앤 롤',
  category: 'onball',
  difficulty: 1,
  summary:
    '프로 농구에서 가장 많이 쓰는 2인 공격입니다. 빅맨이 볼 핸들러의 수비수에게 스크린을 걸고, 핸들러는 그 스크린을 타고 돌파하며, 스크리너는 림으로 굴러 들어갑니다. 수비 두 명이 공격 두 명을 동시에 막아야 하는 **2대2 딜레마**를 만드는 것이 핵심입니다.',
  when:
    '볼 핸들링과 패스가 좋은 가드와 림을 위협하는 빅맨이 있으면 언제든 쓸 수 있습니다. 샷클락이 얼마 남지 않았을 때 가장 먼저 꺼내는 카드이고, 상대 빅맨의 발이 느릴수록 위력이 커집니다.',
  keys: [
    '스크리너는 수비수의 엉덩이 쪽으로 각도를 맞춰 서고, 핸들러는 어깨가 닿을 만큼 **바짝 붙어** 지나가야 수비가 빠져나가지 못합니다.',
    '핸들러는 스크린 직전에 반대 방향으로 페이크를 줘서 수비를 스크린 쪽으로 몰아넣습니다(셋업).',
    '롤 타이밍: 핸들러가 스크린을 지나 수비 두 명이 모두 공을 볼 때 굴러 들어가야 합니다.',
    '나머지 세 명은 코너와 윙에 넓게 서서(스페이싱) 도움 수비가 멀리서 오게 만듭니다.',
  ],
  counters: [
    { name: '드롭', desc: '빅맨이 페인트 쪽으로 물러나 롤과 레이업을 막는 대신 미드레인지 풀업을 내줍니다.' },
    { name: '헤지 / 쇼', desc: '빅맨이 순간적으로 튀어나와 핸들러를 멈춰 세운 뒤 자기 선수에게 돌아갑니다.' },
    { name: '스위치', desc: '두 수비가 마크를 바꿉니다. 틈은 없지만 가드가 빅맨을 막는 미스매치가 생깁니다.' },
    { name: '아이스', desc: '사이드 픽앤롤에서 핸들러를 사이드라인과 베이스라인 쪽으로 몰아 중앙 진입을 막습니다.' },
    { name: '블리츠', desc: '두 명이 핸들러를 더블팀합니다. 공을 빼게 만들 수 있지만 롤맨이 4대3을 만들면 위험합니다.' },
  ],
  famous:
    '존 스탁턴–칼 말론(유타 재즈), 스티브 내시–아마레 스터드마이어(피닉스 선즈), 크리스 폴, 루카 돈치치(댈러스 매버릭스) 등. 현대 프로 농구 하프코트 공격의 상당수가 픽앤롤에서 출발합니다.',

  en: {
    name: 'Pick and Roll',
    summary:
      'The most common two-man action in pro basketball. A big sets a screen on the ball handler\'s defender, the handler drives off the screen, and the screener rolls hard to the rim. The whole point is the **2-on-2 dilemma**: two defenders have to stop two attackers at once.',
    when:
      'Any time you have a guard who can handle and pass and a big who threatens the rim. It is the first thing teams reach for late in the shot clock, and it hurts most against slow-footed bigs.',
    keys: [
      'The screener angles toward the defender\'s hip, and the handler comes off **shoulder to shoulder** so the defender can\'t slip through.',
      'Before the screen, the handler jabs the other way to steer the defender into it (setting up the screen).',
      'Roll timing: go once the handler clears the screen and both defenders are looking at the ball.',
      'The other three space the floor in the corners and on the wings so help has to come from far away.',
    ],
    counters: [
      { name: 'Drop', desc: 'The big sinks toward the paint to take away the roll and the layup, conceding the mid-range pull-up.' },
      { name: 'Hedge / Show', desc: 'The big jumps out to stop the handler for a beat, then recovers to the roller.' },
      { name: 'Switch', desc: 'The two defenders trade assignments. No gap opens, but a guard ends up on a big.' },
      { name: 'ICE', desc: 'On a side pick and roll, the defense forces the handler toward the sideline and baseline, keeping the ball out of the middle.' },
      { name: 'Blitz', desc: 'Both defenders trap the handler. It can force the ball out, but it is risky if the roller gets a 4-on-3.' },
    ],
    famous:
      'John Stockton and Karl Malone (Utah Jazz), Steve Nash and Amar\'e Stoudemire (Phoenix Suns), Chris Paul, Luka Dončić (Dallas Mavericks), and many more. A huge share of modern pro half-court offense starts with a pick and roll.',
    steps: [
      { title: 'Set the screen', text: '[5] comes up from the elbow and sets a screen on the right side of [x1]. [1] jabs the other way first to steer [x1] into the screen.' },
      { title: 'Use the screen & roll', text: '[1] comes off the screen shoulder to shoulder and dribbles right. [x1] gets caught on the screen and trails, while [5] **rolls** to the rim. [x5] plays **drop** coverage, sinking toward the paint to try to guard both.' },
      { title: 'Pass & finish', text: 'The moment [x5] steps up to stop the dribble, [1] hits the rolling [5] with a bounce pass and [5] finishes with a dunk. If [x4] rotates over late to help (the tag), [4] and [2] on the left are open for a **kick-out**.' },
    ],
  },

  start: { o1: [0, 32], o2: [-23, 3.5], o3: [23, 3.5], o4: [-19, 22], o5: [8, 18] },
  ball: 'o1',
  steps: [
    {
      title: '스크린 세팅',
      dur: 1.7,
      text: '[5]가 엘보에서 올라와 [x1]의 오른쪽에 스크린을 겁니다. [1]은 반대쪽으로 한 번 페이크를 주며 [x1]을 스크린 쪽으로 몰아넣습니다.',
      move: {
        o5: { path: [[4.5, 24], [2.6, 28.6]], t: [0, 0.85] },
        o1: { path: [[-1.8, 32.6]], t: [0.25, 0.85] },
      },
      screens: [{ by: 'o5', face: [-1.5, 29.2], hold: 0.6 }],
    },
    {
      title: '스크린 활용 & 롤',
      dur: 1.7,
      text: '[1]이 스크린을 어깨를 스치듯 타고 오른쪽으로 드리블합니다. [x1]은 스크린에 걸려 뒤에서 쫓아오고, [5]는 림을 향해 **롤**합니다. [x5]는 페인트 쪽으로 물러서는 **드롭** 수비로 둘 다 막으려 합니다.',
      move: {
        o1: [[1, 33.2], [4.8, 31], [9, 26.5]],
        o5: { path: [[1.8, 24], [0.8, 15]], t: [0.35, 1] },
      },
      def: {
        d1: { lag: 0.95 },
        d5: { path: [[3.5, 23], [3, 17.5]] },
      },
    },
    {
      title: '패스 & 피니시',
      dur: 1.9,
      text: '[x5]가 드리블을 막으려 한 발 올라서는 순간, [1]이 롤하는 [5]에게 바운스 패스를 넣고 [5]가 덩크로 마무리합니다. 약한 쪽 [x4]가 늦게 도움(태그)을 오면 왼쪽의 [4]와 [2]가 비는 **킥아웃** 옵션도 생깁니다.',
      move: {
        o1: { path: [[11, 22.5]], t: [0, 0.4] },
        o5: { path: [[0.5, 9.5], [0.3, 7]], t: [0, 0.55] },
      },
      ball: [
        { type: 'bounce', to: 'o5', at: 0.18 },
        { type: 'shot', at: 0.62, pts: 2, kind: 'dunk' },
      ],
      def: {
        d5: { path: [[6.5, 20.5]], t: [0, 0.35] },
        d4: { path: [[-5, 11], [-2.6, 8.6]], t: [0.2, 0.75] },
      },
    },
  ],
};
