// 시카고 액션 (Chicago: 핀다운 → 드리블 핸드오프)
export default {
  id: 'chicago',
  name: '시카고 액션',
  category: 'offball',
  difficulty: 2,
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
    { name: '핸드오프 스위치', desc: '빅맨의 수비수가 슈터를 넘겨받아 3점을 견제합니다. 대신 슈터 vs 빅맨 미스매치가 생깁니다.' },
    { name: '트레일', desc: '슈터의 수비수가 끝까지 슈터 엉덩이에 붙어 따라갑니다.' },
    { name: '핸드오프 차단', desc: '슈터가 공을 받으러 오는 길을 미리 막아 백도어 컷으로 유도합니다.' },
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
        o2: { path: [[-10, 8.5], [-14.5, 16], [-15.6, 22.6]], t: [0.3, 1] },
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
        o2: { path: [[-13.8, 25.4], [-9.5, 28]], t: [0, 0.75] },
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
        d2: { lag: 0.8 },
        d5: { path: [[-8.4, 26]], t: [0, 0.4] },
      },
    },
  ],
};
