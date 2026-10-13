// 픽 앤 팝 (Pick and Pop)
export default {
  id: 'pick-and-pop',
  name: '픽 앤 팝',
  category: 'onball',
  difficulty: 1,
  aliases: ['PnP', 'pop', '픽앤팝'],
  summary:
    '픽앤롤의 변형입니다. 스크리너가 림으로 굴러가는 대신 3점 라인 밖으로 빠져서 슈팅 찬스를 노립니다. 슛이 좋은 빅맨(스트레치 4·5번)이 수비 빅맨을 페인트 밖으로 끌어내는 작전입니다.',
  when:
    '상대 빅맨이 드롭이나 헤지로 볼 핸들러를 막으러 나오는데, 우리 빅맨은 3점을 쏠 수 있을 때 씁니다.',
  keys: [
    '스크리너가 3점을 쏠 수 있어야 성립합니다. 수비 빅맨을 림에서 떼어내는 것 자체가 목적입니다.',
    '팝 위치는 핸들러가 가는 방향의 반대쪽이나 탑처럼 패스 각도가 열리는 곳입니다.',
    '핸들러는 수비 빅맨의 위치를 읽고 **돌파 vs 킥백**을 결정합니다.',
    '스크린을 다 걸기 전에 빠지는 **슬립**과 섞으면 수비가 예측하기 더 어려워집니다.',
  ],
  counters: [
    { name: '스위치', desc: '빅맨이 핸들러를, 가드가 팝한 빅맨을 맡아 3점 찬스를 지웁니다. 대신 포스트 미스매치가 생깁니다.', read: 'switch' },
    { name: '업 투 터치', desc: '수비 빅맨이 3점 라인 근처까지 올라와 머물며 팝을 견제합니다.', read: 'up-to-touch' },
    { name: '로테이션', desc: '약한 쪽 수비가 팝맨을 맡고 연쇄적으로 돌아갑니다. 빠른 볼 회전에는 약합니다.', read: 'rotation' },
  ],
  famous:
    '덕 노비츠키(댈러스 매버릭스)의 팝 3점과 원레그 페이드어웨이가 교과서입니다. 라마커스 알드리지, 칼앤서니 타운스, 브룩 로페즈처럼 슛이 되는 빅맨들이 즐겨 씁니다.',

  en: {
    name: 'Pick and Pop',
    summary:
      'A pick-and-roll variation. Instead of rolling to the rim, the screener pops out beyond the three-point line for a shot. It lets a big who can shoot (a stretch 4 or 5) drag the opposing big out of the paint.',
    when:
      'When the opposing big steps up to the ball in drop or hedge coverage and your big can make threes.',
    keys: [
      'It only works if the screener can shoot. Pulling the defending big away from the rim is the whole point.',
      'Pop to the side opposite the handler\'s drive, or to the top, where the passing lane opens.',
      'The handler reads the big\'s defender and chooses **drive or kick back**.',
      'Mix in the **slip**, leaving before the screen fully connects, and it gets even harder to predict.',
    ],
    counters: [
      { name: 'Switch', desc: 'The big takes the handler and the guard takes the popping big, erasing the three. The cost is a post mismatch.' },
      { name: 'Up to touch', desc: 'The defending big stays up near the three-point line to stay attached to the popper.' },
      { name: 'Rotation', desc: 'A weak-side defender picks up the popper and the rest of the defense rotates. Quick ball movement beats it.' },
    ],
    famous:
      'Dirk Nowitzki (Dallas Mavericks) is the textbook example, with pop threes and the one-legged fadeaway. Shooting bigs such as LaMarcus Aldridge, Karl-Anthony Towns, and Brook Lopez use it constantly.',
    steps: [
      { title: 'Set the screen', text: 'This time the screener is [4], a big who can shoot (a stretch big). [4] screens on the left side of [x1] while [1] fakes right.' },
      { title: 'Use the screen & pop', text: '[1] drives left off the screen and [x4] jumps out to stop the ball (the hedge). Instead of rolling, [4] **pops** out beyond the three-point line into open space.' },
      { title: 'Kick back & three', text: '[1] passes back to [4] (the kick-back), who rises up for a catch-and-shoot three. [x4] races out but is too late. If [x4] had stayed home on [4], the driving lane for [1] would have opened.' },
    ],
    reads: {
      prompt: 'How does the defense handle [4], the shooting screener?',
      base: { label: 'Show', why: 'When the big follows the ball, the screener is left open. Kick it back to the shooter who popped beyond the arc.' },
      options: [
        {
          label: 'Switch', why: 'The switch takes away the three but puts a big in front of the handler. Attack that one-on-one.',
          steps: [
            { title: 'The switch', text: '[x1] and [x4] trade assignments to take away the three for [4]. Now [x4], a slower big, has to guard [1].' },
            { title: 'Drive the big', text: '[1] crosses over in front of [x4], gets into the paint and lays it in. Switching away the three leaves the handler one-on-one against a big.' },
          ],
        },
        {
          label: 'Up to touch', why: 'If the big stays up high to stop the pop, the paint behind is empty. Dive to the rim instead.',
          steps: [
            { title: 'Up to touch', text: '[x4] stays up near the three-point line to take away the pop (up to touch). So [4] skips the pop and **dives** straight into the empty paint.' },
            { title: 'Dive & finish', text: '[1] slips a bounce pass to [4] for the layup. [x4] is stuck up high and can only chase from behind.' },
          ],
        },
        {
          label: 'Rotation', why: 'When help rotates over, someone else is left open. One more pass finds that player.',
          steps: [
            { title: 'The rotation', text: '[x4] steps out on [1] and [x1] is late, so [x3] lifts from the right side to pick up the popping [4] (the **rotation**). The defense is shifting in a chain.' },
            { title: 'Extra pass & corner three', text: '[1] kicks it back to [4] and [x3] flies out. Instead of shooting, [4] makes the **extra pass** to [3] in the corner [x3] just left, and [3] knocks down the corner three.' },
          ],
        },
      ],
    },
  },

  start: { o1: [0, 32], o2: [-23, 3.5], o3: [23, 3.5], o4: [-8, 19.5], o5: [10, 3] },
  ball: 'o1',
  steps: [
    {
      title: '스크린 세팅',
      dur: 1.6,
      text: '이번 스크리너는 슛이 좋은 [4](스트레치 빅)입니다. [4]가 [x1]의 왼쪽에 스크린을 걸고, [1]은 오른쪽으로 페이크를 줍니다.',
      move: {
        o4: { path: [[-5, 24.5], [-2.6, 28.6]], t: [0, 0.85] },
        o1: { path: [[1.8, 32.6]], t: [0.25, 0.85] },
      },
      screens: [{ by: 'o4', face: [1.5, 29.2], hold: 0.6 }],
    },
    {
      title: '스크린 활용 & 팝',
      dur: 1.7,
      text: '[1]이 스크린을 타고 왼쪽으로 돌파하자 [x4]가 [1]을 막으려 따라 나옵니다(헤지). 그 순간 [4]는 림으로 가지 않고 반대로 3점 라인 밖으로 **팝**해서 빈 공간을 찾습니다.',
      move: {
        o1: [[-1, 33.2], [-4.8, 31], [-9, 26]],
        o4: { path: [[-1.2, 30.4], [3.5, 30.6]], t: [0.35, 1] },
      },
      def: {
        d1: { lag: 0.95 },
        d4: { path: [[-4.5, 25.5], [-7.6, 23]], t: [0.1, 0.8] },
      },
    },
    {
      title: '킥백 & 3점',
      dur: 1.9,
      text: '[1]이 [4]에게 공을 되돌려주고(킥백), [4]가 캐치 앤 슛 3점을 던집니다. [x4]가 뒤늦게 달려오지만 이미 늦었습니다. 반대로 [x4]가 [4]에게 붙어 있었다면 [1]의 돌파 길이 열립니다.',
      move: {
        o1: { path: [[-10.5, 24.5]], t: [0, 0.3] },
      },
      ball: [
        { type: 'pass', to: 'o4', at: 0.15 },
        { type: 'shot', at: 0.55, pts: 3 },
      ],
      def: {
        d4: { path: [[0.8, 27.2]], t: [0.25, 0.85] },
      },
    },
  ],

  // 수비 대응별 분기: 스크린이 걸린 뒤(1단계 끝) 갈라진다. 기본(위 2·3단계)은 빅맨이 공을 따라 나오는 쇼.
  reads: {
    at: 1,
    prompt: '수비는 슈터 스크리너 [4]를 어떻게 막을까요?',
    base: { id: 'show', label: '쇼', why: '빅맨이 공을 막으러 따라 나오면 스크리너가 비어 있습니다. 3점 라인 밖으로 팝한 슈터에게 되돌려 줍니다.' },
    options: [
      {
        id: 'switch',
        label: '스위치',
        why: '스위치는 3점을 지우는 대신 빅맨을 핸들러 앞에 세웁니다. 그 1대1을 공략합니다.',
        steps: [
          {
            title: '스위치',
            dur: 1.7,
            text: '[x1]과 [x4]가 마크를 바꿔 [4]의 3점 찬스를 지웁니다. 대신 이제 발이 느린 빅맨 [x4]가 [1]을 막아야 합니다.',
            move: {
              o1: [[-1, 33.2], [-4.8, 31], [-8, 27.5]],
              o4: { path: [[-1.2, 30.4], [3.5, 30.6]], t: [0.35, 1] },
            },
            def: { d4: { guard: 'o1' }, d1: { guard: 'o4' } },
          },
          {
            title: '빅맨 상대로 돌파',
            dur: 2.0,
            text: '[1]이 [x4] 앞에서 방향을 바꿔(크로스오버) 페인트로 파고들어 레이업을 올립니다. 스위치로 3점을 막으면 핸들러와 빅맨의 1대1이 남습니다.',
            move: { o1: { path: [[-6.5, 24.5], [-3.2, 14], [-1.2, 7.5]], t: [0, 0.75] } },
            ball: [{ type: 'shot', at: 0.84, pts: 2 }],
            def: {
              d4: { lag: 0.55 },
              d5: { path: [[2.2, 9.6]], t: [0.45, 0.85] },
            },
          },
        ],
      },
      {
        id: 'up-to-touch',
        label: '업 투 터치',
        why: '빅맨이 높이 올라와 팝을 막으면 그 뒤 페인트가 빕니다. 팝 대신 림으로 다이브합니다.',
        steps: [
          {
            title: '업 투 터치',
            dur: 1.7,
            text: '[x4]가 3점 라인 근처까지 올라와 [4]의 팝을 막고 섭니다(업 투 터치). 그러면 [4]는 팝 대신 빈 페인트로 곧장 **다이브**합니다.',
            move: {
              o1: [[-1, 33.2], [-4.8, 31], [-8.5, 27]],
              o4: { path: [[-1.8, 26.8], [-0.8, 18]], t: [0.3, 1] },
            },
            def: {
              d4: { path: [[-3.8, 26.2]], t: [0, 0.35] },
              d1: { lag: 0.9 },
            },
          },
          {
            title: '다이브 & 마무리',
            dur: 1.7,
            text: '[1]이 바운스 패스를 넣고 [4]가 레이업으로 마무리합니다. 높이 올라온 [x4]는 뒤에서 쫓아올 수밖에 없습니다.',
            move: {
              o4: { path: [[0.2, 9]], t: [0, 0.45] },
              o1: { path: [[-9.5, 25]], t: [0, 0.3] },
            },
            ball: [
              { type: 'bounce', to: 'o4', at: 0.15 },
              { type: 'shot', at: 0.7, pts: 2 },
            ],
            def: {
              d4: { path: [[-2.6, 20], [-1.6, 13.5]], t: [0, 0.8] },
              d5: { path: [[2.8, 10.2]], t: [0.55, 0.95] },
            },
          },
        ],
      },
      {
        id: 'rotation',
        label: '로테이션',
        why: '도움 수비가 돌아서 막으면 누군가는 비게 됩니다. 한 번 더 패스해 그 사람을 찾습니다.',
        steps: [
          {
            title: '로테이션',
            dur: 1.8,
            text: '[x4]가 [1]을 막으러 나오고 [x1]은 늦습니다. 팝하는 [4]는 오른쪽의 [x3]가 맡으러 올라옵니다(**로테이션**). 수비가 연쇄적으로 자리를 바꾸는 중입니다.',
            move: {
              o1: [[-1, 33.2], [-4.8, 31], [-9, 26]],
              o4: { path: [[-1.2, 30.4], [3.5, 30.6]], t: [0.35, 1] },
            },
            def: {
              d1: { lag: 0.95 },
              d4: { path: [[-4.5, 25.5], [-7.6, 23]], t: [0.1, 0.8] },
              d3: { path: [[13, 16]], t: [0.55, 1] },
            },
          },
          {
            title: '엑스트라 패스 & 코너 3점',
            dur: 2.1,
            text: '[1]이 [4]에게 킥백하자 [x3]가 달려 나옵니다. [4]는 슛 대신 한 번 더 패스(**엑스트라 패스**)해 [x3]가 비운 오른쪽 코너의 [3]에게 보내고, [3]이 코너 3점을 던집니다.',
            move: { o1: { path: [[-10.5, 24.5]], t: [0, 0.3] } },
            ball: [
              { type: 'pass', to: 'o4', at: 0.08 },
              { type: 'skip', to: 'o3', at: 0.45 },
              { type: 'shot', at: 0.93, pts: 3 },
            ],
            def: { d3: { path: [[5.6, 26.6], [18.6, 6.8]], t: [0.05, 1] } },
          },
        ],
      },
    ],
  },
};
