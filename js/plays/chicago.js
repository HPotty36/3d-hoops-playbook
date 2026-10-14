// 시카고 액션 (Chicago: 핀다운 → 드리블 핸드오프)
export default {
  id: 'chicago',
  name: '시카고 액션',
  category: 'offball',
  difficulty: 2,
  aliases: ['Chicago action', 'pin-down handoff', 'DHO', '핀다운 핸드오프'],
  summary:
    '슈터가 핀다운 스크린을 타고 올라오자마자 빅맨에게서 **드리블 핸드오프**를 받는 연속 동작입니다. 슈터의 수비수는 스크린 두 개를 연달아 맞게 되고, 슈터는 달리는 속도 그대로 슛이나 돌파를 시작합니다.',
  when:
    '슈터를 살리면서 자연스럽게 픽앤롤로 이어가고 싶을 때, 패스 좋은 빅맨이 탑에서 공을 다룰 수 있을 때 씁니다.',
  keys: [
    '핀다운은 슈터를 아래에서 위로 끌어올려, 이미 달리는 상태로 공을 받게 만듭니다.',
    '핸드오프하는 빅맨은 공을 건네는 동시에 수비수의 길을 막는 스크린 역할을 합니다.',
    '두 동작 사이에 틈이 없어야 합니다. 핀다운에서 나오는 속도 그대로 핸드오프로 이어집니다.',
    '빅맨의 수비수가 슈터를 막으러 나오면 빅맨이 림으로 굴러 들어갑니다.',
  ],
  counters: [
    { name: '핸드오프 스위치', desc: '빅맨의 수비수가 슈터를 넘겨받아 3점을 견제합니다. 대신 슈터 vs 빅맨 미스매치가 생깁니다.', read: 'handoff-switch' },
    { name: '트레일', desc: '슈터의 수비수가 끝까지 슈터 엉덩이에 붙어 따라갑니다.', read: 'trail' },
    { name: '핸드오프 차단', desc: '슈터가 공을 받으러 오는 길을 미리 막아 백도어 컷으로 유도합니다.', read: 'handoff-deny' },
  ],
  famous:
    '골든스테이트의 스테픈 커리, 마이애미 히트의 던컨 로빈슨–뱀 아데바요, 덴버의 니콜라 요키치 핸드오프에서 자주 보입니다. 요즘 프로 농구에서 가장 흔한 오프볼→온볼 연결 동작 중 하나입니다.',

  en: {
    name: 'Chicago',
    summary:
      'A shooter comes off a pin-down screen and immediately takes a **dribble handoff** from a big. The shooter\'s defender gets hit by two screens in a row, and the shooter starts a shot or a drive at full speed.',
    when:
      'When you want to use a shooter and flow naturally into a pick and roll, especially with a passing big who can handle the ball at the top.',
    keys: [
      'The pin-down brings the shooter from low to high, so the shooter catches the ball already on the move.',
      'The big handing off also screens the defender at the same moment.',
      'No pause between the two actions: carry the speed off the pin-down straight into the handoff.',
      'If the big\'s defender jumps out to the shooter, the big rolls to the rim.',
    ],
    counters: [
      { name: 'Switch the handoff', desc: 'The big\'s defender takes the shooter to deny the three, at the cost of a shooter-versus-big mismatch.' },
      { name: 'Trail', desc: 'The shooter\'s defender stays on the shooter\'s hip all the way through.' },
      { name: 'Deny the handoff', desc: 'Cut off the shooter\'s path to the ball and force a backdoor cut.' },
    ],
    famous:
      'You will see it with Stephen Curry in Golden State, the Duncan Robinson and Bam Adebayo pairing in Miami, and Nikola Jokić\'s handoffs in Denver. It is one of the most common off-ball-to-on-ball links in today\'s pro game.',
    steps: [
      { title: 'Entry to the big', text: '[5] comes up to the top and receives the pass from [1]. After giving it up, [1] clears out to the right wing to make room. Now the big, [5], has the ball.' },
      { title: 'Pin-down', text: '[4] comes down and sets a **pin-down screen** (a screen set going downward) on [x2]. [2] rises up off the screen while [5] dribbles toward [2].' },
      { title: 'Dribble handoff', text: 'As [5] hands the ball straight to [2] in a **dribble handoff**, [5] also blocks the path of [x2], becoming a second screen. After two screens in a row, [x2] can\'t keep up.' },
      { title: 'Shoot or roll', text: '[2] takes the handoff and fires a three in the space the defense gave up. If [x5] jumps out to stop [2], [5] rolls to the rim and it becomes a pick and roll.' },
    ],
    reads: {
      prompt: 'How does the defense play [2] coming off the pin-down?',
      base: { label: 'Caught on screens', why: 'Hit by the pin-down and then the handoff, two screens in a row, the defender falls off. Shoot it right off the handoff.' },
      options: [
        {
          label: 'Trail', why: 'A defender on the hip takes away the outside shot but opens the inside. Take the handoff, turn the corner and go to the rim.',
          steps: [
            { title: 'Trail', text: '[x2] chases on the hip of [2] all the way (the **trail**). Even after the handoff there is no room for a three.' },
            { title: 'Turn the corner', text: 'Instead of shooting, [2] wraps tight around [5] and drives all the way to the rim (**turning the corner**). [x2], still behind, runs into [5] and cannot follow.' },
          ],
        },
        {
          label: 'Switch the handoff', why: 'When the big defender takes the shooter, a small defender ends up on the big. The big rolls to the rim after the handoff.',
          steps: [
            { title: 'Switch the handoff', text: 'At the handoff, [x5] takes over [2] to stop the three (the **switch**). That leaves the smaller [x2], who was trailing, to pick up [5].' },
            { title: 'Roll & mismatch', text: '[5] rolls straight to the rim. The smaller [x2] cannot hold [5] off, and [5] catches the bounce pass from [2] and lays it in.' },
          ],
        },
        {
          label: 'Deny the handoff', why: 'Cutting off the path to the ball from the front leaves the way to the rim open behind. Cut backdoor.',
          steps: [
            { title: 'Deny the handoff', text: '[x2] jumps into the gap between [2] and [5] to take away the handoff (the **deny**). The path to the ball is closed.' },
            { title: 'Backdoor cut', text: 'When the front is taken, the back is open. [2] turns and cuts to the rim (the **backdoor cut**), catches the bounce pass from [5] and lays it in.' },
          ],
        },
      ],
    },
  },

  start: { o1: [6, 32], o5: [-1, 23], o2: [-9, 6], o4: [-17, 20], o3: [23, 3.5] },
  ball: 'o1',
  steps: [
    {
      title: '빅맨에게 엔트리',
      dur: 1.8,
      text: '[5]가 탑으로 올라와 [1]의 패스를 받습니다. 공을 넘긴 [1]은 오른쪽 윙으로 빠져 공간을 비워 줍니다. 이제 빅맨 [5]가 공을 들고 있습니다.',
      move: {
        o5: { path: [[-2, 30]], t: [0, 0.55] },
        o1: { path: [[17.5, 23.5]], t: [0.45, 1] },
      },
      ball: [{ type: 'pass', to: 'o5', at: 0.42 }],
    },
    {
      title: '핀다운',
      dur: 1.7,
      text: '[4]가 내려와 [x2]에게 **핀다운 스크린**(아래쪽으로 거는 스크린)을 겁니다. [2]는 스크린을 타고 위로 솟구치고, 그사이 [5]는 [2] 쪽으로 드리블해 다가갑니다.',
      move: {
        o4: { path: [[-13.5, 13], [-11.6, 10.4]], t: [0, 0.6] },
        o2: { path: [[-9.6, 9.2], [-10.6, 12.6], [-14.5, 16.4], [-15.6, 22.6]], t: [0.3, 1] },
        o5: { path: [[-7.5, 28.5], [-12, 26.5]], t: [0.15, 1] },
      },
      screens: [{ by: 'o4', face: [-8.8, 7.8], hold: 0.4 }],
      def: { d2: { lag: 0.85 } },
    },
    {
      title: '드리블 핸드오프',
      dur: 1.3,
      text: '[5]가 [2]에게 공을 직접 건네주는 **드리블 핸드오프**와 동시에, 몸으로 [x2]의 길을 막아 한 번 더 스크린이 됩니다. 스크린 두 개를 연달아 맞은 [x2]는 따라갈 수가 없습니다.',
      move: {
        o2: { path: [[-14.4, 25.6], [-12.6, 28.6], [-9.5, 28.8]], t: [0, 0.75] },
      },
      ball: [{ type: 'handoff', to: 'o2', at: 0.3 }],
      screens: [{ by: 'o5', face: [-14.5, 23.5], hold: 0.3 }],
      def: { d2: { lag: 0.7 } },
    },
    {
      title: '슛 or 롤',
      dur: 1.8,
      text: '핸드오프를 받은 [2]가 수비가 떨어진 틈에 그대로 3점을 던집니다. [x5]가 [2]를 막으러 나오면 [5]가 림으로 굴러 들어가는 픽앤롤 상황이 이어집니다.',
      move: {
        o2: { path: [[-6.4, 28.8]], t: [0, 0.35] },
        o5: { path: [[-7, 17], [-2.5, 9.5]], t: [0.1, 1] },
      },
      ball: [{ type: 'shot', at: 0.45, pts: 3 }],
      def: {
        d2: { path: [[-10.6, 25.2], [-9.4, 25.8]], t: [0, 0.55] },
        d5: { path: [[-8.4, 26]], t: [0, 0.4] },
      },
    },
  ],

  // 수비 대응별 분기: 엔트리·핀다운(1·2단계) 뒤에 갈라진다. 기본(위 3·4단계)은 [x2]가 스크린 두 개에 걸리는 경우.
  reads: {
    at: 2,
    prompt: '수비는 핀다운을 타고 나온 [2]를 어떻게 막을까요?',
    base: { id: 'caught', label: '스크린에 걸림', why: '핀다운과 핸드오프, 스크린 두 개를 연달아 맞으면 수비가 떨어집니다. 받자마자 던집니다.' },
    options: [
      {
        id: 'trail',
        label: '트레일',
        why: '엉덩이에 붙어 따라오면 바깥 슛은 막혀도 안쪽이 열립니다. 핸드오프를 받아 코너를 돌아 림으로 갑니다.',
        steps: [
          {
            title: '트레일',
            dur: 1.3,
            text: '[x2]가 끝까지 [2]의 엉덩이에 붙어 쫓아옵니다(**트레일**). 핸드오프를 받아도 3점을 던질 틈은 없습니다.',
            move: { o2: { path: [[-14.4, 25.6], [-12.8, 28.6], [-11, 28.6]], t: [0, 0.7] } },
            ball: [{ type: 'handoff', to: 'o2', at: 0.35 }],
            screens: [{ by: 'o5', face: [-14.5, 23.5], hold: 0.3 }],
            def: { d2: { path: [[-10.5, 15.5], [-13.6, 22.8]], t: [0, 0.8] } },
          },
          {
            title: '코너 돌기 & 돌파',
            dur: 2.0,
            text: '[2]는 슛 대신 [5]의 몸을 끼고 안쪽으로 방향을 틀어 림까지 치고 들어갑니다(**코너 돌기**). 뒤에 붙어 있던 [x2]는 [5]에게 막혀 쫓아가지 못합니다.',
            move: { o2: { path: [[-8, 25], [-4.6, 16.5], [-2, 9.5]], t: [0, 0.75] } },
            ball: [{ type: 'shot', at: 0.86, pts: 2 }],
            def: {
              d2: { path: [[-11.6, 24.6], [-7.2, 19]], t: [0, 0.8] },
              d4: { path: [[-5.2, 10.6]], t: [0.5, 0.85] },
            },
          },
        ],
      },
      {
        id: 'handoff-switch',
        label: '핸드오프 스위치',
        why: '빅맨의 수비가 슈터를 맡으면 작은 수비수가 빅맨을 막게 됩니다. 핸드오프 뒤 빅맨이 림으로 굴러갑니다.',
        steps: [
          {
            title: '핸드오프 스위치',
            dur: 1.3,
            text: '핸드오프 순간 [x5]가 [2]를 넘겨받아 3점을 막습니다(**스위치**). 대신 뒤처져 있던 작은 [x2]가 [5]를 맡아야 합니다.',
            move: { o2: { path: [[-14.4, 25.6], [-12.6, 28.6], [-9.5, 28.8]], t: [0, 0.75] } },
            ball: [{ type: 'handoff', to: 'o2', at: 0.3 }],
            screens: [{ by: 'o5', face: [-14.5, 23.5], hold: 0.3 }],
            def: { d5: { guard: 'o2' }, d2: { guard: 'o5', path: [[-9.8, 15.8], [-11.4, 21.6]], t: [0, 0.9] } },
          },
          {
            title: '롤 & 미스매치',
            dur: 1.8,
            text: '[5]가 곧장 림으로 굴러갑니다. 키가 작은 [x2]는 [5]를 막지 못하고, [2]의 바운스 패스를 받은 [5]가 레이업으로 마무리합니다.',
            move: {
              o5: { path: [[-9.4, 19], [-3.4, 10.2]], t: [0, 0.8] },
              o2: { path: [[-7.2, 28.6]], t: [0, 0.3] },
            },
            ball: [
              { type: 'bounce', to: 'o5', at: 0.48 },
              { type: 'shot', at: 0.9, pts: 2 },
            ],
            def: { d2: { lag: 0.45 } },
          },
        ],
      },
      {
        id: 'handoff-deny',
        label: '핸드오프 차단',
        why: '공을 받으러 오는 길을 앞에서 막으면 그 뒤, 림까지가 빕니다. 백도어 컷으로 찌릅니다.',
        steps: [
          {
            title: '핸드오프 차단',
            dur: 1.3,
            text: '[x2]가 [2]와 [5] 사이로 먼저 뛰어들어 핸드오프 길을 막습니다(**차단**). 공을 받으러 가던 [2]의 길이 막혔습니다.',
            move: { o2: { path: [[-14.6, 24.6]], t: [0, 0.4] } },
            def: { d2: { path: [[-10.6, 16.4], [-12.6, 23.2]], t: [0, 0.85] } },
          },
          {
            title: '백도어 컷',
            dur: 2.0,
            text: '앞이 막히면 뒤가 빕니다. [2]가 방향을 틀어 림으로 끊어 들어가고(**백도어 컷**), [5]의 바운스 패스를 받아 레이업으로 마무리합니다.',
            move: { o2: { path: [[-13.6, 18.4], [-6.4, 9.6], [-2.6, 6.6]], t: [0, 0.75] } },
            ball: [
              { type: 'bounce', to: 'o2', at: 0.45 },
              { type: 'shot', at: 0.88, pts: 2 },
            ],
            def: {
              d2: { path: [[-12.6, 19.4], [-7.6, 12.6]], t: [0.1, 0.85] },
              d4: { path: [[-4.6, 8.2]], t: [0.6, 0.9] },
            },
          },
        ],
      },
    ],
  },
};
