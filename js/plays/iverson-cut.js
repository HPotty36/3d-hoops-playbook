// 아이버슨 컷 (Iverson Cut)
export default {
  id: 'iverson-cut',
  name: '아이버슨 컷',
  category: 'offball',
  difficulty: 1,
  aliases: ['Iverson', 'Iverson ram', '아이버슨'],
  summary:
    '득점원이 한쪽 윙에서 **자유투 라인 위를 가로질러** 반대쪽 윙으로 달리고, 양쪽 엘보의 빅맨들이 차례로 스크린이 되어 주는 작전입니다. 에이스가 달리면서 공을 잡게 해 주는 공격 시작(엔트리) 동작입니다.',
  when:
    '에이스에게 좋은 위치에서 공을 쥐여 주고 싶을 때, 상대가 에이스에게 가는 패스를 강하게 막을(디나이) 때 씁니다.',
  keys: [
    '컷은 엘보 스크리너 바로 위를 스치듯 지나가야 수비가 위로 따라오지 못합니다.',
    '볼 핸들러는 슈터가 나오는 쪽으로 미리 공을 몰고 가서 패스 거리를 줄입니다.',
    '캐치 후에는 수비 상태에 따라 3점, 돌파, 엘보 빅맨과의 픽앤롤로 이어갑니다.',
    '수비가 위쪽으로 몰리면 슈터는 반대로 **백도어**로 림을 노립니다.',
  ],
  counters: [
    { name: '언더 추격', desc: '스크린 아래로 지름길을 타고 윙에서 먼저 기다립니다. 슈터에게 3점을 내줄 위험이 있습니다.', read: 'under' },
    { name: '범프', desc: '컷이 시작되는 지점에서 몸으로 밀어 경로와 타이밍을 늦춥니다.', read: 'bump' },
    { name: '스위치', desc: '엘보 빅맨의 수비수가 슈터를 넘겨받습니다.', read: 'switch' },
  ],
  famous:
    '앨런 아이버슨이 뛰던 2000년대 필라델피아 76ers가 그를 위해 즐겨 써서 이 이름이 붙었습니다. 지금은 거의 모든 프로 팀이 공격 시작 동작으로 사용합니다.',

  en: {
    name: 'Iverson Cut',
    summary:
      'A scorer runs from one wing to the other **across the top of the free-throw line**, while the bigs at both elbows screen in turn. It is an entry action that lets your best player catch the ball on the move.',
    when:
      'When you want to get your best scorer the ball in a good spot, or when the defense is denying passes to that player.',
    keys: [
      'The cut should brush right over the elbow screeners so the defender can\'t follow over the top.',
      'The handler dribbles toward the side the cutter is heading to shorten the pass.',
      'After the catch, read the defense: shoot the three, drive, or run a pick and roll with the elbow big.',
      'If the defense jumps the high side, the cutter goes **backdoor** to the rim instead.',
    ],
    counters: [
      { name: 'Chase under', desc: 'Shortcut under the screens and wait at the wing, at the risk of giving up a three.' },
      { name: 'Bump', desc: 'Body the cutter where the cut starts to throw off the route and the timing.' },
      { name: 'Switch', desc: 'The elbow big\'s defender takes over the cutter.' },
    ],
    famous:
      'Named after Allen Iverson, for whom the 2000s Philadelphia 76ers ran it constantly. Today almost every pro team uses it as an entry action.',
    steps: [
      { title: 'Alignment', text: 'Bigs [4] and [5] stand at the elbows and scorer [2] starts low on the left wing. [1] brings the ball to the right slot.' },
      { title: 'Iverson cut', text: '[2] sprints from left to right **across the top of the free-throw line**. [4] and [5] at the elbows screen in turn, and [x2], ducking under the screens, falls further and further behind.' },
      { title: 'Wing catch', text: '[1] passes to [2] coming out on the right wing. [2] catches it ready to attack before the defense can catch up.' },
      { title: 'Drive & pull-up', text: '[2] attacks the hard closeout from [x2], drives inside, and rises for a **pull-up jumper** near the free-throw line. Defender close: drive. Defender off: shoot the three. From the catch, the offense is in control.' },
    ],
    reads: {
      prompt: 'How does the defense handle [2] cutting across the elbows?',
      base: { label: 'Late chase', why: 'A defender who comes out late off two screens closes out hard. Use that momentum and drive inside.' },
      options: [
        {
          label: 'Chase under', why: 'Shortcutting under the screens leaves the top open. Stop behind the screen at the top and shoot right away.',
          steps: [
            { title: 'Chase under', text: '[x2] takes the shortcut under the screens to beat [2] to the right wing (going **under**). [2] sees it, skips the wing and comes out at the top behind the screen from [5].' },
            { title: 'Catch & shoot', text: '[1] hands the ball to [2] at the top and [2] lets the three fly. [x2], having gone under, runs into [5] and arrives far too late.' },
          ],
        },
        {
          label: 'Switch', why: 'When the big defender leaves to take the shooter, the rim that big was guarding is empty. The screener dives straight to it.',
          steps: [
            { title: 'Cut & first screen', text: '[2] starts on the left, comes off the screen from [4] and runs across the top of the free-throw line. [x2] ducks under the screen.' },
            { title: 'Switch', text: 'As [2] comes off the screen from [5], [x5] takes over [2] (the **switch**) and [x2] picks up [5].' },
            { title: 'Screener dive', text: '[2] catches on the wing and [x5] follows. Meanwhile [5] **dives** to the empty rim, catches the bounce pass from [2] and lays it in.' },
          ],
        },
        {
          label: 'Bump', why: 'Bodying up the cut opens the opposite way. Cut toward the rim instead of over the top.',
          steps: [
            { title: 'Bump', text: '[x2] steps into the path of [2] right where the cut starts (the **bump**). The high route is blocked and the timing of the cut is off.' },
            { title: 'Counter cut', text: 'When the top is taken, the bottom is open. [2] cuts the other way toward the rim along the baseline (the **counter cut**), catches the pass from [1] and lays it in.' },
          ],
        },
      ],
    },
  },

  start: { o1: [0, 34], o4: [-8, 19.5], o5: [8, 19.5], o2: [-21, 10], o3: [23, 3.5] },
  ball: 'o1',
  steps: [
    {
      title: '대형',
      dur: 1.3,
      text: '두 빅맨 [4]·[5]가 양쪽 엘보에 서고, 득점원 [2]는 왼쪽 윙 아래에서 출발합니다. [1]은 공을 오른쪽 슬롯으로 몰고 갑니다.',
      move: { o1: { path: [[3, 31.5]], t: [0, 0.8] } },
    },
    {
      title: '아이버슨 컷',
      dur: 3.0,
      text: '[2]가 왼쪽에서 오른쪽으로 **자유투 라인 위를 가로질러** 달립니다. 엘보의 [4]와 [5]가 차례로 스크린이 되어 주고, [x2]는 스크린을 피해 아래로 돌아가느라 점점 뒤처집니다.',
      move: {
        o2: [[-15.5, 17], [-9, 22.8], [0, 23.6], [8.5, 23], [17.5, 22.4]],
        o4: { path: [[-7.6, 20.8]], t: [0, 0.3] },
        o5: { path: [[7.6, 20.8]], t: [0.3, 0.6] },
      },
      screens: [
        { by: 'o4', face: [-9.5, 17.5], hold: 0.2 },
        { by: 'o5', face: [7.5, 17], hold: 0.3 },
      ],
      def: {
        d2: { path: [[-15, 14], [-10.5, 17.4], [-5, 17.8], [4, 18.4], [12.5, 19.5]], t: [0.1, 1] },
      },
    },
    {
      title: '윙 캐치',
      dur: 1.2,
      text: '[1]이 오른쪽 윙으로 나온 [2]에게 패스합니다. [2]는 수비가 미처 따라오기 전에, 공격할 준비를 마친 상태로 공을 잡습니다.',
      ball: [{ type: 'pass', to: 'o2', at: 0.1 }],
      def: {
        d2: { path: [[15.2, 20.2]], t: [0, 0.8] },
      },
    },
    {
      title: '돌파 & 풀업',
      dur: 1.9,
      text: '[x2]가 급하게 달려 나오는 힘을 역이용해 [2]가 안쪽으로 드리블 돌파하고, 자유투 라인 근처에서 **풀업 점퍼**를 던집니다. 수비가 붙으면 돌파, 떨어지면 3점. 공을 잡는 순간 주도권은 공격에게 있습니다.',
      move: {
        o2: { path: [[15.5, 18], [10.5, 14.5]], t: [0, 0.6] },
      },
      ball: [{ type: 'shot', at: 0.72, pts: 2 }],
      def: {
        d2: { path: [[13.8, 18], [12, 16.6]], t: [0, 0.8] },
        d5: { path: [[7.6, 13.2]], t: [0.1, 0.6] },
      },
    },
  ],

  // 수비 대응별 분기: 대형(1단계) 뒤에 갈라진다. 기본(위 2~4단계)은 [x2]가 스크린 두 개에 걸려 늦게 달려 나오는 경우.
  reads: {
    at: 1,
    prompt: '수비는 엘보를 가로지르는 [2]를 어떻게 막을까요?',
    base: { id: 'late', label: '늦은 추격', why: '스크린 두 개에 걸려 늦게 달려 나오는 수비는 급하게 붙습니다. 그 힘을 역이용해 안으로 치고 들어갑니다.' },
    options: [
      {
        id: 'under',
        label: '언더 추격',
        why: '스크린 아래로 지름길을 타면 위쪽이 빕니다. 스크린 뒤 탑에서 멈춰 바로 던집니다.',
        steps: [
          {
            title: '언더 추격',
            dur: 2.6,
            text: '[x2]가 스크린 아래로 지름길을 타고 오른쪽 윙에서 먼저 기다리려 합니다(**언더**). [2]는 그걸 보고 윙까지 가지 않고, [5]의 스크린 뒤 탑으로 빠져나옵니다.',
            move: {
              o2: [[-15.5, 17], [-9, 22.8], [-1, 24.6], [4.4, 29.4]],
              o4: { path: [[-7.6, 20.8]], t: [0, 0.3] },
              o5: { path: [[6.2, 23.6]], t: [0.4, 0.7] },
              o1: { path: [[11.5, 27.5]], t: [0.3, 0.9] },
            },
            screens: [
              { by: 'o4', face: [-9.5, 17.5], hold: 0.2 },
              { by: 'o5', face: [5.6, 20.8], hold: 0.4 },
            ],
            def: { d2: { path: [[-15, 14], [-9.5, 16.4], [-1, 16.8], [8.5, 18.2]], t: [0.1, 0.9] } },
          },
          {
            title: '캐치 & 슛',
            dur: 1.6,
            text: '[1]이 탑의 [2]에게 공을 건네고, [2]가 그대로 3점을 던집니다. 스크린 아래로 돈 [x2]는 [5]에게 막혀 한참 늦게 달려옵니다.',
            ball: [
              { type: 'pass', to: 'o2', at: 0.06 },
              { type: 'shot', at: 0.45, pts: 3 },
            ],
            def: { d2: { path: [[4.6, 21.2], [4.2, 25.8]], t: [0.1, 0.65] } },
          },
        ],
      },
      {
        id: 'switch',
        label: '스위치',
        why: '빅맨의 수비가 슈터를 맡으러 나가면 그 빅맨이 지키던 림이 빕니다. 스크리너가 곧장 림으로 다이브합니다.',
        steps: [
          {
            title: '컷 & 첫 스크린',
            dur: 1.6,
            text: '[2]가 왼쪽에서 출발해 [4]의 스크린을 지나 자유투 라인 위를 가로지릅니다. [x2]는 스크린을 피해 아래로 돌아갑니다.',
            move: {
              o2: [[-15.5, 17], [-9, 22.8], [-1.5, 23.6]],
              o4: { path: [[-7.6, 20.8]], t: [0, 0.5] },
            },
            screens: [{ by: 'o4', face: [-9.5, 17.5], hold: 0.2 }],
            def: { d2: { path: [[-15, 14], [-10.5, 17.4], [-5, 17.8]], t: [0.15, 1] } },
          },
          {
            title: '스위치',
            dur: 1.4,
            text: '[2]가 [5]의 스크린을 지나는 순간 [x5]가 [2]를 넘겨받고(**스위치**), [x2]는 [5]를 맡습니다.',
            move: {
              o2: [[8.5, 23], [15.5, 22.6]],
              o5: { path: [[7.6, 20.8]], t: [0, 0.3] },
            },
            screens: [{ by: 'o5', face: [7.5, 17], hold: 0.3 }],
            def: { d5: { guard: 'o2' }, d2: { guard: 'o5', lag: 0.7 } },
          },
          {
            title: '스크리너 다이브',
            dur: 1.9,
            text: '[2]가 윙에서 공을 받자 [x5]가 따라 나옵니다. 그 사이 [5]가 비어 있는 림으로 **다이브**하고, [2]의 바운스 패스를 받아 레이업으로 마무리합니다.',
            move: { o5: { path: [[5.4, 14], [2, 7.4]], t: [0, 0.5] } },
            ball: [
              { type: 'pass', to: 'o2', at: 0.05 },
              { type: 'bounce', to: 'o5', at: 0.42 },
              { type: 'shot', at: 0.82, pts: 2 },
            ],
            def: { d2: { lag: 0.6 } },
          },
        ],
      },
      {
        id: 'bump',
        label: '범프',
        why: '컷 길을 몸으로 막으면 그 반대쪽이 열립니다. 위 대신 림 쪽으로 끊습니다.',
        steps: [
          {
            title: '범프',
            dur: 1.5,
            text: '[x2]가 컷이 시작되는 지점에서 [2]의 길을 몸으로 막아섭니다(**범프**). 위쪽 길이 막혀 컷의 타이밍이 어긋났습니다.',
            move: { o2: { path: [[-17.5, 14.8]], t: [0, 0.5] } },
            def: { d2: { path: [[-15.4, 15.6]], t: [0, 0.45] } },
          },
          {
            title: '카운터 컷',
            dur: 1.8,
            text: '위가 막히면 아래가 빕니다. [2]는 반대로 베이스라인 쪽 림을 향해 끊어 들어가고(**카운터 컷**), [1]의 패스를 받아 레이업으로 마무리합니다.',
            move: { o2: { path: [[-14.6, 11.2], [-6.4, 7.2], [-1.6, 5.4]], t: [0, 0.72] } },
            ball: [
              { type: 'pass', to: 'o2', at: 0.35 },
              { type: 'shot', at: 0.88, pts: 2 },
            ],
            def: {
              d2: { path: [[-12.4, 11.8], [-5.2, 8.8]], t: [0.15, 0.85] },
              d4: { path: [[-3.6, 9.6]], t: [0.55, 0.9] },
            },
          },
        ],
      },
    ],
  },
};
