// 사이드 픽앤롤 (Side Pick and Roll)
export default {
  id: 'side-pick-and-roll',
  name: '사이드 픽앤롤',
  category: 'onball',
  difficulty: 2,
  aliases: ['side PnR', 'wing pick and roll', 'ICE', '사이드 픽앤롤'],
  summary:
    '윙에서 거는 픽앤롤입니다. 코트 한쪽에서 벌어지기 때문에 수비는 핸들러를 사이드라인과 베이스라인 쪽으로 모는 **아이스**를 자주 꺼냅니다. 같은 2대2라도 각도가 바뀌면 수비 방식과 정답이 달라진다는 것을 보여 주는 작전입니다.',
  when:
    '공이 이미 윙에 있을 때 패스 없이 바로 2대2를 시작하고 싶을 때 씁니다. 코너에 슈터가 있어야 베이스라인 쪽 도움 수비가 쉽게 오지 못합니다.',
  keys: [
    '스크리너는 핸들러의 수비가 어느 쪽을 막는지 보고 각도를 정합니다. 수비가 스크린 쪽을 막고 서면(아이스) 억지로 걸지 말고 **팝**할 준비를 합니다.',
    '코너의 [2]는 베이스라인 쪽 돌파 길을 비워 두려고 코너 끝에 붙어 있습니다.',
    '반대쪽 [3]·[4]는 공 쪽을 보며 킥아웃 패스를 받을 자리에서 기다립니다.',
    '핸들러는 빅맨의 위치부터 읽습니다. 빅맨이 높으면 롤, 낮으면 팝이나 풀업입니다.',
  ],
  counters: [
    { name: '아이스', desc: '핸들러의 수비가 스크린 쪽을 막아 사이드라인·베이스라인으로 몰고, 빅맨은 아래에서 기다립니다. 중앙 돌파는 막지만 팝한 스크리너가 빕니다.', read: 'ice' },
    { name: '드롭', desc: '빅맨이 페인트로 물러나 롤과 레이업을 막습니다. 대신 중거리 플로터와 풀업을 내줍니다.', read: 'drop' },
    { name: '블리츠', desc: '두 명이 윙의 핸들러를 가둡니다. 공을 빼게 만들지만 숏롤 뒤로 4대3이 생깁니다.', read: 'blitz' },
    { name: '스위치', desc: '마크를 바꿔 틈을 없앱니다. 대신 작은 수비수가 빅맨을 막게 됩니다.', read: 'switch' },
  ],

  en: {
    name: 'Side Pick and Roll',
    summary:
      'A pick and roll run on the wing. Because it happens on one side of the floor, defenses often use **ICE**, forcing the handler toward the sideline and baseline. It shows how the same two-man game calls for different defenses, and different answers, once the angle changes.',
    when:
      'When the ball is already on the wing and you want to start the two-man game without another pass. A shooter in the corner keeps baseline help from coming over easily.',
    keys: [
      'The screener reads which side the handler\'s defender is taking. If the defender sits on the screen side (ICE), do not force the screen; get ready to **pop**.',
      '[2] stays deep in the corner to keep the baseline driving lane open.',
      '[3] and [4] on the far side watch the ball and wait where a kick-out pass can find them.',
      'The handler reads the big first: big up high means roll, big down low means pop or pull up.',
    ],
    counters: [
      { name: 'ICE', desc: 'The handler\'s defender takes away the screen side, forcing the ball toward the sideline and baseline while the big waits low. It stops the middle drive but leaves the popping screener open.' },
      { name: 'Drop', desc: 'The big sinks into the paint to take away the roll and the layup, giving up floaters and pull-ups.' },
      { name: 'Blitz', desc: 'Two defenders trap the handler on the wing. It forces the ball out but opens a 4-on-3 behind the short roll.' },
      { name: 'Switch', desc: 'The defenders trade assignments so no gap opens, but a small defender ends up on the big.' },
    ],
    steps: [
      { title: 'Side screen', text: '[5] comes up from the elbow and sets a **side screen** for [1] on the right wing. [2] in the corner and [3] and [4] on the far side space out so help has to come from far away.' },
      { title: 'ICE', text: '[x1] jumps to the screen side to take it away, and [x5] drops toward the baseline to wait (**ICE**). As [1] gets pushed baseline instead of to the middle, screener [5] **pops** out to the elbow.' },
      { title: 'Elbow pop & jumper', text: '[x5] is busy stopping [1] down low and loses [5] at the elbow. [1] kicks it out to [5] for the elbow jumper. If [x4] comes over to [5], [4] is open on the far side: a 4-on-3.' },
    ],
    reads: {
      prompt: 'How does the defense play the side screen?',
      base: { label: 'ICE', why: 'ICE pushes the handler baseline and sends the big down low to meet the drive. That leaves the screener open up at the elbow.' },
      options: [
        {
          label: 'Drop', why: 'In drop the big sits near the rim. Stop in the open space in front of the big and float it up.',
          steps: [
            { title: 'Drop & snake', text: 'The big drops deep into the paint (**drop**). [1] comes off the screen into the middle and heads downhill with [x1] stuck behind (the **snake** dribble), while [5] rolls to the rim and drags [x5] deeper.' },
            { title: 'Floater', text: 'With [x5] tied up with [5], [1] stops near the free-throw line and lofts a **floater**.' },
          ],
        },
        {
          label: 'Blitz', why: 'With two defenders on the handler, the rest of the floor is 4-on-3. Catch it short and swing it to the far corner.',
          steps: [
            { title: 'Blitz', text: '[x5] and [x1] both jump [1] to trap the ball on the wing (the **blitz**). Before the trap closes, [1] passes to [5], who rolls a short way toward the free-throw line (the **short roll**).' },
            { title: 'Short roll & corner three', text: '[5] attacks down the middle and [x3] has to leave the far corner to stop it. [5] fires the ball to [3] in the corner [x3] just left, and [3] knocks down the **corner three**.' },
          ],
        },
        {
          label: 'Switch', why: 'A switch leaves a small defender on the big. Pin the defender on the roll and catch it near the rim.',
          steps: [
            { title: 'Switch', text: '[x1] and [x5] trade assignments (the **switch**). With [x5] on [1] and the smaller [x1] on [5], [5] rolls to the rim and pins [x1] on the high side (the **seal**).' },
            { title: 'Seal & finish', text: '[1] backs up for a better angle, then bounces it to [5] on the block, who scores over the smaller defender.' },
          ],
        },
      ],
    },
  },

  start: { o1: [17, 23], o5: [7, 18.5], o2: [23, 3.5], o3: [-23, 3.5], o4: [-15, 25] },
  ball: 'o1',
  steps: [
    {
      title: '사이드 스크린',
      dur: 1.6,
      text: '[5]가 엘보에서 올라와 오른쪽 윙의 [1]에게 **사이드 스크린**을 겁니다. 코너의 [2], 반대쪽의 [3]·[4]가 넓게 서서 도움 수비가 멀리서 오게 만듭니다.',
      move: {
        o5: { path: [[10.2, 20.4], [13.6, 23.2]], t: [0, 0.85] },
        o1: { path: [[17.8, 24.2]], t: [0.3, 0.85] },
      },
      screens: [{ by: 'o5', face: [15.9, 21.8], hold: 0.5 }],
    },
    {
      title: '아이스',
      dur: 1.8,
      text: '[x1]이 스크린 쪽 길을 미리 막아서고 [x5]는 베이스라인 쪽으로 내려가 기다립니다(**아이스**). 중앙으로 못 간 [1]이 베이스라인으로 몰리는 사이, 스크리너 [5]는 엘보로 빠져나옵니다(**팝**).',
      move: {
        o1: { path: [[19.4, 19.2], [18.4, 13.6]], t: [0.2, 0.85] },
        o5: { path: [[11.4, 21.6]], t: [0.35, 0.9] },
      },
      def: {
        d1: { path: [[15.8, 24.4], [16.4, 26], [21, 22.4], [20.8, 17.4]], t: [0, 0.95] },
        d5: { path: [[14.8, 15.8]], t: [0, 0.6] },
      },
    },
    {
      title: '엘보 팝 & 점퍼',
      dur: 2.0,
      text: '[x5]가 아래에서 [1]을 막느라 엘보의 [5]를 놓쳤습니다. [1]이 [5]에게 빼 주고, [5]가 엘보 점퍼를 던집니다. [x4]가 [5]에게 오면 반대쪽 [4]가 비는 4대3입니다.',
      ball: [
        { type: 'pass', to: 'o5', at: 0.08 },
        { type: 'shot', at: 0.45, pts: 2 },
      ],
      def: { d5: { path: [[13.2, 18.6]], t: [0.1, 0.8] } },
    },
  ],

  // 수비 대응별 분기: 사이드 스크린(1단계) 뒤에 갈라진다. 기본(위 2·3단계)은 아이스.
  reads: {
    at: 1,
    prompt: '수비는 사이드 스크린을 어떻게 막을까요?',
    base: { id: 'ice', label: '아이스', why: '아이스는 핸들러를 베이스라인으로 몰고 빅맨이 아래로 내려가 막습니다. 그러면 위쪽 엘보의 스크리너가 비어 있습니다.' },
    options: [
      {
        id: 'drop',
        label: '드롭',
        why: '드롭은 빅맨이 림 근처로 물러나 있습니다. 그 앞 빈 공간에서 멈춰 플로터를 띄웁니다.',
        steps: [
          {
            title: '드롭 & 스네이크',
            dur: 2.0,
            text: '[x5]가 페인트 깊숙이 물러서는 **드롭** 수비입니다. [1]은 스크린을 타고 중앙으로 들어온 뒤 [x1]을 등 뒤에 두고 내려가고(**스네이크**), [5]는 림으로 굴러 [x5]를 더 깊이 끌고 갑니다.',
            move: {
              o1: { path: [[15.4, 25.6], [11.2, 22.6], [9.2, 19.4], [9.8, 16.6], [10, 14.6]], t: [0, 0.9] },
              o5: { path: [[14.8, 18.6], [10.8, 9.8]], t: [0.3, 1] },
            },
            def: {
              d1: { lag: 0.9 },
              d5: { path: [[10.6, 12.6]], t: [0, 0.6] },
            },
          },
          {
            title: '플로터',
            dur: 1.5,
            text: '[x5]가 [5]를 막느라 올라오지 못하는 사이, [1]이 자유투 라인 근처에서 멈춰 **플로터**를 띄웁니다.',
            ball: [{ type: 'shot', at: 0.3, pts: 2 }],
          },
        ],
      },
      {
        id: 'blitz',
        label: '블리츠',
        why: '두 명이 핸들러를 가두면 나머지는 4대3입니다. 짧게 받아 반대쪽 코너로 뿌립니다.',
        steps: [
          {
            title: '블리츠',
            dur: 1.6,
            text: '[x5]와 [x1]이 동시에 [1]에게 달려들어 윙에서 가둡니다(**블리츠**). 함정이 닫히기 전에 [1]이 자유투 라인 쪽으로 짧게 굴러 들어온 [5]에게 패스합니다(**숏롤**).',
            move: {
              o1: { path: [[15.8, 25.4]], t: [0, 0.45] },
              o5: { path: [[12.2, 21], [9, 19.4]], t: [0.2, 0.75] },
            },
            ball: [{ type: 'bounce', to: 'o5', at: 0.42 }],
            def: {
              d1: { path: [[19.6, 24.2], [18.4, 27.4]], t: [0, 0.5] },
              d5: { path: [[13.8, 24.2]], t: [0, 0.45] },
            },
          },
          {
            title: '숏롤 & 코너 3점',
            dur: 2.0,
            text: '[5]가 공을 잡고 내려오자 반대쪽 코너의 [x3]가 막으러 들어옵니다. [5]는 [x3]가 비운 왼쪽 코너의 [3]에게 공을 뿌리고, [3]이 **코너 3점**을 던집니다.',
            move: { o5: { path: [[5.8, 15.6]], t: [0, 0.35] } },
            ball: [
              { type: 'skip', to: 'o3', at: 0.4 },
              { type: 'shot', at: 0.86, pts: 3 },
            ],
            def: { d3: { path: [[-4.6, 11.6], [-17.6, 5.2]], t: [0, 1] }, d1: { sag: 0.3 } },
          },
        ],
      },
      {
        id: 'switch',
        label: '스위치',
        why: '스위치하면 작은 수비수가 빅맨을 막습니다. 롤하면서 등 뒤에 묶고 골밑에서 받습니다.',
        steps: [
          {
            title: '스위치',
            dur: 1.7,
            text: '[x1]과 [x5]가 마크를 바꿉니다(**스위치**). [x5]가 [1]을, 작은 [x1]이 [5]를 맡자, [5]는 림으로 굴러가며 [x1]을 등 뒤 높은 쪽에 묶어 둡니다(**실**).',
            move: {
              o1: { path: [[15.8, 26.6], [11.8, 26]], t: [0, 0.7] },
              o5: { path: [[14.2, 17.6], [11, 11]], t: [0.2, 1] },
            },
            def: {
              d1: { guard: 'o5', lag: 0.45, sag: 0 },
              d5: { guard: 'o1', path: [[16.2, 20.6], [16.4, 24]], t: [0, 0.6] },
            },
          },
          {
            title: '실 & 마무리',
            dur: 1.7,
            text: '[1]이 한 발 물러나 각도를 만든 뒤 블록의 [5]에게 바운스 패스를 넣고, [5]가 키 차이로 마무리합니다.',
            move: {
              o5: { path: [[8.8, 7.8]], t: [0, 0.4] },
              o1: { path: [[13.2, 24.6]], t: [0, 0.3] },
            },
            ball: [
              { type: 'bounce', to: 'o5', at: 0.32 },
              { type: 'shot', at: 0.8, pts: 2 },
            ],
            def: { d1: { lag: 0.4, sag: 0 } },
          },
        ],
      },
    ],
  },
};
