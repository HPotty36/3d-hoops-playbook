// 픽 앤 롤 (High Pick and Roll)
export default {
  id: 'pick-and-roll',
  name: '픽 앤 롤',
  category: 'onball',
  difficulty: 1,
  aliases: ['PnR', 'high pick and roll', 'ball screen', '하이 픽앤롤', '볼 스크린'],
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
    { name: '드롭', desc: '빅맨이 페인트 쪽으로 물러나 롤과 레이업을 막는 대신 미드레인지 풀업을 내줍니다.', read: 'drop' },
    { name: '헤지 / 쇼', desc: '빅맨이 순간적으로 튀어나와 핸들러를 멈춰 세운 뒤 자기 선수에게 돌아갑니다.', read: 'hedge' },
    { name: '스위치', desc: '두 수비가 마크를 바꿉니다. 틈은 없지만 가드가 빅맨을 막는 미스매치가 생깁니다.', read: 'switch' },
    { name: '아이스', desc: '사이드 픽앤롤에서 핸들러를 사이드라인과 베이스라인 쪽으로 몰아 중앙 진입을 막습니다.' },
    { name: '블리츠', desc: '두 명이 핸들러를 더블팀합니다. 공을 빼게 만들 수 있지만 롤맨이 4대3을 만들면 위험합니다.', read: 'blitz' },
    { name: '언더', desc: '핸들러의 수비가 스크린 아래(림 쪽)로 지나가 돌파와 롤을 막습니다. 대신 스크린 뒤에서 던지는 풀업 3점을 내줍니다.', read: 'under' },
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
      { name: 'Under', desc: 'The handler\'s defender goes under the screen, on the rim side, to stop the drive and the roll. It gives up a pull-up three from behind the screen.' },
    ],
    famous:
      'John Stockton and Karl Malone (Utah Jazz), Steve Nash and Amar\'e Stoudemire (Phoenix Suns), Chris Paul, Luka Dončić (Dallas Mavericks), and many more. A huge share of modern pro half-court offense starts with a pick and roll.',
    steps: [
      { title: 'Set the screen', text: '[5] comes up from the elbow and sets a screen on the right side of [x1]. [1] jabs the other way first to steer [x1] into the screen.' },
      { title: 'Use the screen & roll', text: '[1] comes off the screen shoulder to shoulder and dribbles right. [x1] gets caught on the screen and trails, while [5] **rolls** to the rim. [x5] plays **drop** coverage, sinking toward the paint to try to guard both.' },
      { title: 'Pass & finish', text: 'The moment [x5] steps up to stop the dribble, [1] hits the rolling [5] with a bounce pass and [5] finishes with a dunk. If [x4] rotates over late to help (the tag), [4] and [2] on the left are open for a **kick-out**.' },
    ],
    reads: {
      prompt: 'How does the defense play this screen?',
      base: { label: 'Drop', why: 'Drop sits back to guard the roll, but the moment the big steps up to the handler, the space behind the big opens.' },
      options: [
        {
          label: 'Hedge', why: 'When the big jumps out high, the rim is empty. Get the ball out of the hedge and find the roller first.',
          steps: [
            { title: 'Hedge & retreat', text: '[x5] jumps out above the screen to stop [1] cold. [1] does not force it: a **retreat dribble** backs out of the trap and buys a passing angle, while [5] rolls hard into the paint that [x5] just left.' },
            { title: 'Hit the roller, play 4-on-3', text: '[1] passes over the hedge to [5]. [x4] has to leave [4] to stop [5] at the rim, so [5] kicks it out to [4] on the left wing for an open **three**. Two defenders on the ball means four attackers against three.' },
          ],
        },
        {
          label: 'Switch', why: 'A switch closes the gap but leaves a small defender on the big. Attack that mismatch right away.',
          steps: [
            { title: 'The switch', text: '[x1] and [x5] trade assignments: [x5] picks up [1], and [x1] has to take [5]. As [5] rolls, [5] pins the smaller [x1] on the high side with a **seal**.' },
            { title: 'Seal & finish', text: '[1] lobs the ball over the top to [5], who has [x1] pinned behind, and [5] lays it in. A big on a guard near the rim is the switch\'s price.' },
          ],
        },
        {
          label: 'Blitz', why: 'If two defenders go to the handler, the rest of the floor is 4-on-3. Get it out fast and play the numbers.',
          steps: [
            { title: 'The blitz', text: '[x5] and [x1] both jump [1] to trap the ball above the screen. Before the trap closes, [1] slips a **pocket pass** to [5], who stops short at the free-throw line (the **short roll**).' },
            { title: 'Short roll & corner three', text: '[5] attacks downhill with four teammates against three defenders. [x2] has to leave the corner to stop the drive, so [5] whips the ball to [2] in the left corner for an open **corner three**.' },
          ],
        },
        {
          label: 'Under', why: 'Going under the screen leaves space in front of the handler. A shooter pulls up right behind the screen.',
          steps: [
            { title: 'Under & pull-up three', text: '[x1] ducks **under** the screen, between [5] and the rim, and [x5] sits back in the paint. Nobody is in front of [1], so [1] stops right behind the screen and rises for a **pull-up three**.' },
          ],
        },
      ],
    },
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

  // 수비 대응별 분기: 스크린이 걸린 뒤(1단계 끝) 수비 방식에 따라 갈라진다. 기본(위 2·3단계)은 드롭.
  reads: {
    at: 1,
    prompt: '수비는 이 스크린을 어떻게 막을까요?',
    base: { id: 'drop', label: '드롭', why: '드롭은 롤을 막으려 물러나 있지만, 빅맨이 핸들러를 막으러 한 발 올라오는 순간 그 뒤가 빕니다.' },
    options: [
      {
        id: 'hedge',
        label: '헤지',
        why: '빅맨이 높이 튀어나오면 림이 빕니다. 함정에서 공을 빼 롤맨부터 살립니다.',
        steps: [
          {
            title: '헤지 & 리트리트',
            dur: 1.9,
            text: '[x5]가 스크린 위로 튀어나와 [1]의 길을 막습니다(헤지). [1]은 억지로 뚫지 않고 **리트리트 드리블**로 물러나 패스 각도를 만들고, [5]는 [x5]가 비운 페인트로 강하게 롤합니다.',
            move: {
              o1: { path: [[1, 33.4], [4.4, 32.4], [3, 35.4]], t: [0, 0.9] },
              o5: { path: [[1.8, 24], [1, 16.5]], t: [0.3, 0.95] },
            },
            def: {
              d5: { path: [[6.4, 30.4]], t: [0, 0.4] },
              d1: { lag: 0.6 },
            },
          },
          {
            title: '롤맨에게 & 4대3',
            dur: 2.1,
            text: '[1]이 헤지 위로 [5]에게 패스합니다. 림을 지키려면 [x4]가 [4]를 버리고 [5]에게 와야 하고, [5]는 왼쪽 윙의 [4]에게 빼 줘 **3점**을 만듭니다. 공에 두 명이 붙으면 나머지는 4대3입니다.',
            move: {
              o5: { path: [[0.8, 14]], t: [0, 0.3] },
              o4: { path: [[-20, 23.2]], t: [0, 0.4] },
            },
            ball: [
              { type: 'pass', to: 'o5', at: 0.08 },
              { type: 'pass', to: 'o4', at: 0.45 },
              { type: 'shot', at: 0.86, pts: 3 },
            ],
            def: {
              d5: { path: [[2.8, 20.5]], t: [0, 0.5] },
              d4: { path: [[-4.6, 14.6], [-15.5, 19.6]], t: [0.05, 0.95] },
            },
          },
        ],
      },
      {
        id: 'switch',
        label: '스위치',
        why: '스위치는 틈을 막는 대신 작은 수비수를 빅맨에게 붙입니다. 바로 그 미스매치를 공략합니다.',
        steps: [
          {
            title: '스위치',
            dur: 1.7,
            text: '[x1]과 [x5]가 마크를 바꿉니다. [x5]가 [1]을, [x1]이 [5]를 맡습니다. [5]는 롤하면서 작은 [x1]을 등 뒤 높은 쪽에 묶어 둡니다(**실**).',
            move: {
              o1: [[1, 33.2], [4.8, 31], [8.5, 27.5]],
              o5: { path: [[1.8, 24.5], [1.5, 14]], t: [0.35, 1] },
            },
            def: {
              d1: { guard: 'o5', lag: 0.75, sag: 0 },
              d5: { guard: 'o1' },
            },
          },
          {
            title: '실 & 마무리',
            dur: 1.8,
            text: '[1]이 [x1]을 등지고 선 [5]에게 머리 위로 띄워 주고(로브), [5]가 그대로 올려놓습니다. 림 근처에서 가드가 빅맨을 막는 것, 그것이 스위치의 대가입니다.',
            move: {
              o1: { path: [[9.5, 25.5]], t: [0, 0.3] },
              o5: { path: [[1, 9]], t: [0.1, 0.5] },
            },
            ball: [
              { type: 'lob', to: 'o5', at: 0.12 },
              { type: 'shot', at: 0.8, pts: 2 },
            ],
            def: { d1: { lag: 0.55, sag: 0 } },
          },
        ],
      },
      {
        id: 'blitz',
        label: '블리츠',
        why: '두 명이 핸들러에게 붙으면 나머지는 4대3입니다. 공을 빨리 빼서 숫자 우위를 씁니다.',
        steps: [
          {
            title: '블리츠',
            dur: 1.6,
            text: '[x5]와 [x1]이 동시에 [1]에게 달려들어 스크린 위에서 가둡니다(트랩). 함정이 닫히기 전에 [1]이 [5]에게 **포켓 패스**를 넣고, [5]는 자유투 라인 근처에서 멈춰 받습니다(**숏롤**).',
            move: {
              o1: { path: [[1, 33.2], [3.8, 32.4]], t: [0, 0.6] },
              o5: { path: [[3.2, 24.5], [2.2, 21.5]], t: [0.2, 0.75] },
            },
            ball: [{ type: 'bounce', to: 'o5', at: 0.72 }],
            def: {
              d5: { path: [[6.1, 31]], t: [0, 0.5] },
              d1: { path: [[0.4, 31], [1.8, 34.6]], t: [0.1, 0.6] },
            },
          },
          {
            title: '숏롤 & 코너 3점',
            dur: 2.0,
            text: '[5]가 공을 잡고 림 쪽으로 내려오면 공격 4명 대 수비 3명입니다. [x2]가 코너를 비우고 막으러 나오자, [5]는 왼쪽 코너의 [2]에게 공을 뿌려 **코너 3점**을 만듭니다.',
            move: { o5: { path: [[1.5, 17]], t: [0, 0.35] } },
            ball: [
              { type: 'pass', to: 'o2', at: 0.38 },
              { type: 'shot', at: 0.84, pts: 3 },
            ],
            def: {
              d5: { path: [[3.8, 25], [2.6, 20.5]], t: [0, 0.8] },
              d2: { path: [[-3.4, 13.4], [-17.2, 5.4]], t: [0, 0.95] },
            },
          },
        ],
      },
      {
        id: 'under',
        label: '언더',
        why: '스크린 아래로 지나가면 핸들러 앞에 공간이 생깁니다. 슈터라면 스크린 바로 뒤에서 던집니다.',
        steps: [
          {
            title: '언더 & 풀업 3점',
            dur: 2.0,
            text: '[x1]이 스크린 **아래**, 즉 [5]와 림 사이로 돌아가고 [x5]는 페인트에 물러나 있습니다. [1] 앞이 비었으니 [1]은 스크린 바로 뒤에 멈춰 **풀업 3점**을 던집니다.',
            move: {
              o1: { path: [[0.4, 33.4], [3, 32.2]], t: [0, 0.45] },
              o5: { path: [[2.8, 24.5]], t: [0.5, 0.9] },
            },
            ball: [{ type: 'shot', at: 0.56, pts: 3 }],
            def: {
              d1: { path: [[0.6, 27], [4, 26.8]], t: [0, 0.55] },
              d5: { path: [[2.6, 21.5]], t: [0, 0.5] },
            },
          },
        ],
      },
    ],
  },
};
