// 매치업 존 (Matchup Zone)
export default {
  id: 'matchup-zone',
  name: '매치업 존',
  category: 'hybrid',
  difficulty: 3,
  defense: { zone: 'matchup' },
  aliases: ['match-up zone', 'matchup', '매치업'],
  summary:
    '2-3 존의 자리에서 출발하지만, 자기 구역에 들어온 공격수는 맨투맨처럼 붙어서 막는 **혼합 수비**입니다. 겉으로는 맨투맨처럼 보여 상대가 어떤 수비인지 헷갈리게 만듭니다. 대신 공격수가 구역에서 구역으로 옮겨 갈 때, 누가 맡을지 넘겨주는 순간이 약점입니다.',
  when:
    '상대가 존 공격과 맨투맨 공격을 따로 준비해 왔을 때, 어느 쪽인지 헷갈리게 하고 싶을 때 씁니다. 수비수끼리 말을 많이 해야 하는 어려운 수비입니다.',
  keys: [
    '번호는 2-3과 같습니다: [x1]·[x2]는 앞선, [x3]·[x4]는 뒷선, [x5]는 가운데입니다.',
    '각자 2-3 존의 자리에서 출발해, 자기 구역(대략 8 ft 안)에 들어온 공격수에게 맨투맨처럼 붙습니다. 가까이 올수록 더 바짝 붙습니다.',
    '공격수가 구역을 벗어나면 다음 구역의 수비에게 넘깁니다. 이 **넘겨주기**를 말로 정확히 해야 합니다.',
    '공을 가진 선수는 그 자리를 맡은 수비가 막고, 나머지는 공 쪽으로 기웁니다. 레인 안의 수비는 3초를 넘기지 않게 레인 선 밖으로 나갔다 들어옵니다.',
  ],
  counters: [
    { name: '컷 넘겨받기', desc: '공격수가 구역을 가로질러 컷하면 넘겨주는 순간 두 수비 모두 놓칠 수 있습니다.', read: 'cutter' },
    { name: '존에 스크린', desc: '맨투맨처럼 붙어 있는 뒷선 수비에게 스크린을 걸어 코너를 엽니다.', read: 'screen-zone' },
    { name: '볼 스크린', desc: '볼 스크린으로 수비 둘을 공에 끌어들인 뒤 반대쪽으로 넘깁니다.', read: 'ball-screen' },
  ],

  en: {
    name: 'Matchup Zone',
    summary:
      'A **combination defense** that starts from the spots of a 2-3 zone, but guards any attacker who enters a defender\'s area like man-to-man. It looks like man-to-man from outside, so the offense is not sure what it is facing. The weak point is the hand-off, when an attacker moves from one area to the next and the defenders must decide who takes over.',
    when:
      'When the opponent has prepared separate zone and man offenses and you want to leave it guessing. It is a hard defense that needs a lot of talking between defenders.',
    keys: [
      'The numbering is the 2-3\'s: [x1] and [x2] are the front two, [x3] and [x4] the back line, and [x5] the middle.',
      'Each defender starts at a 2-3 spot and picks up any attacker who enters its area (about 8 ft) like man-to-man. The closer the attacker, the tighter the defender plays.',
      'When an attacker leaves an area, the defender hands it off to the next area. That **hand-off** has to be talked through exactly.',
      'The defender whose spot it is guards the ball, and the rest lean toward it. Defenders in the lane step out over the lane line so they never stay three seconds.',
    ],
    counters: [
      { name: 'Cutter', desc: 'A cut across the areas can make both defenders lose the cutter at the moment of the hand-off.' },
      { name: 'Screen the zone', desc: 'Screen a back-line defender who is playing an attacker like man-to-man, and the corner opens.' },
      { name: 'Ball screen', desc: 'Use a ball screen to pull two defenders to the ball, then throw it to the far side.' },
    ],
    steps: [
      { title: 'Ball to the wing', text: '[1] passes to [3] on the right wing. On the ball side it looks like man-to-man: [x2] picks up [3], and [x1] steps up on [5] at the free-throw line because [5] is in its area.' },
      { title: 'Into the overload', text: '[4] runs the baseline to the right short corner and [5] slides down into the right post, so four attackers are on the right. [x4] picks up [4] and [x5] picks up [5], each matching up with whoever is in its area, while [x3] stays home on the weak side.' },
      { title: 'Cut through the zone', text: '[2] cuts from the left wing through the middle of the lane. [x3] lets [2] go, expecting [x5] to take over, but [x5] is busy with [5] in the post. Nobody picks up [2] (the **hand-off** breaks down).' },
      { title: 'Layup', text: '[3] bounces it to [2] beside the rim, and [2] lays it in before [x3] can turn around.' },
    ],
    reads: {
      prompt: 'Where does the offense attack this zone?',
      base: { label: 'Cutter', why: 'A cutter crossing from one area into the next is nobody\'s for a moment. Hit the cutter in the gap.' },
      options: [
        {
          label: 'Screen the zone', why: 'A matchup defender plays its attacker like man-to-man, so a screen catches it just like man-to-man.',
          steps: [
            { title: 'Screen the back line', text: '[4] slides from the short corner out to the corner, and [5] steps in front of [x4], who wants to follow (screening a zone defender). [x4] runs into [5].' },
            { title: 'Corner three', text: '[3] passes to [4] in the right corner. [x4] is stuck behind the screen, and [4] fires the three.' },
          ],
        },
        {
          label: 'Ball screen', why: 'A ball screen pulls two defenders to the ball, and the far side is left with one defender for two attackers.',
          steps: [
            { title: 'Ball screen', text: '[5] comes up and sets a ball screen for [3]. [3] dribbles off it toward the middle, and [x2] and [x5] both step up to the ball.' },
            { title: 'Skip & three', text: '[3] throws it over the top to [2] on the far wing. [x3] has to close out from the back line and [x1] runs over from the ball side, but both are too late, and [2] fires the three.' },
          ],
        },
      ],
    },
  },

  // 1-3-1 공격: [1] 탑, [2]·[3] 윙, [5] 자유투 라인, [4] 베이스라인 → 오른쪽으로 과부하
  start: { o1: [0, 28.4], o2: [-18.8, 21.4], o3: [18.8, 21.4], o5: [-1.2, 19.8], o4: [-8.8, 3.4] },
  ball: 'o1',
  steps: [
    {
      title: '윙으로',
      dur: 2.6,
      text: '[1]이 오른쪽 윙의 [3]에게 패스합니다. 공 쪽만 보면 맨투맨 같습니다. [x2]가 [3]을 맡고, 자유투 라인의 [5]가 자기 구역에 있으니 [x1]이 [5]에게 붙습니다.',
      ball: [{ type: 'pass', to: 'o3', at: 0.3 }],
    },
    {
      title: '과부하',
      dur: 2.8,
      text: '[4]가 베이스라인을 따라 오른쪽 숏코너로 달려가고 [5]는 오른쪽 포스트로 내려가, 오른쪽에 공격수 넷이 모입니다. [x4]는 [4]에게, [x5]는 [5]에게, 각자 구역에 들어온 선수에게 붙고, [x3]는 반대쪽을 지킵니다.',
      move: {
        o4: { path: [[0, 2.6], [10, 2.8], [17.4, 5.2]], t: [0, 0.7] },
        o5: { path: [[3.4, 15], [5.8, 11]], t: [0.15, 0.65] },
        o1: { path: [[6.6, 27.4]], t: [0.2, 0.7] },
      },
    },
    {
      title: '구역을 가르는 컷',
      dur: 2.2,
      text: '[2]가 왼쪽 윙에서 레인 한가운데를 가로질러 컷합니다. [x3]는 [x5]가 받아 주리라 믿고 [2]를 놓아주지만, [x5]는 포스트의 [5]에게 묶여 있습니다. 아무도 [2]를 맡지 않습니다(**넘겨주기**가 무너졌습니다).',
      move: { o2: { path: [[-10, 14], [-4, 9.6], [3.4, 4.6]], t: [0, 0.88] } },
      def: {
        d3: { path: [[-7.4, 7.4]], t: [0.2, 0.8] },   // [x5]가 받아 줄 줄 알고 자기 구역에 남는다
        d5: { path: [[4.4, 9]], t: [0, 0.5] },        // 포스트의 [5]에게 묶여 있다
      },
    },
    {
      title: '레이업',
      dur: 1.8,
      text: '[3]이 림 옆의 [2]에게 바운스 패스를 넣고, [x3]가 돌아서기 전에 [2]가 레이업합니다.',
      ball: [
        { type: 'bounce', to: 'o2', at: 0.05 },
        { type: 'shot', at: 0.55, pts: 2 },
      ],
      def: {
        d3: { path: [[-4.2, 6.6]], t: [0.35, 1] },   // 뒤늦게 돌아선다
        d5: { path: [[4.4, 9]], t: [0, 0.4] },
        d4: { path: [[14.4, 7.2]], t: [0, 0.3] },    // 숏코너의 [4]에게 붙어 있다
      },
    },
  ],

  // 공격 방식별 분기: 오른쪽으로 과부하가 만들어진 뒤(2단계 끝) 갈라진다. 기본(위 3·4단계)은 컷.
  reads: {
    at: 2,
    prompt: '공격은 이 존의 어디를 노릴까요?',
    base: { id: 'cutter', label: '컷 넘겨받기', why: '구역에서 구역으로 넘어가는 커터는 잠깐 아무의 것도 아닙니다. 그 틈의 커터에게 줍니다.' },
    options: [
      {
        id: 'screen-zone',
        label: '존에 스크린',
        why: '매치업 존의 수비는 자기 구역의 공격수를 맨투맨처럼 막으므로, 스크린도 맨투맨처럼 걸립니다.',
        steps: [
          {
            title: '뒷선에 스크린',
            dur: 2.2,
            text: '[4]가 숏코너에서 코너로 빠지고, 따라가려는 [x4] 앞을 [5]가 막아섭니다(존 수비에게 거는 스크린). [x4]가 [5]에게 걸립니다.',
            move: {
              o5: { path: [[11.6, 11.6], [16.4, 7.4]], t: [0, 0.45] },
              o4: { path: [[20, 4.6], [22.8, 4.8]], t: [0.35, 0.85] },
            },
            screens: [{ by: 'o5', face: [13.6, 7.6], hold: 1.6 }],
            def: { d4: { path: [[15.6, 6.4]], t: [0.45, 0.8] } },   // [4]를 따라 나가려다 [5]의 스크린에 걸린다
          },
          {
            title: '코너 3점',
            dur: 2.0,
            text: '[3]이 오른쪽 코너의 [4]에게 패스합니다. [x4]는 스크린 뒤에 묶여 있고, [4]가 3점을 던집니다.',
            ball: [
              { type: 'pass', to: 'o4', at: 0.1 },
              { type: 'shot', at: 0.55, pts: 3 },
            ],
            def: { d4: { path: [[14.4, 7.2], [17.6, 6]], t: [0.35, 1] } },   // 스크린을 돌아 뒤늦게 나간다
          },
        ],
      },
      {
        id: 'ball-screen',
        label: '볼 스크린',
        why: '볼 스크린은 수비 둘을 공에 끌어들이고, 반대쪽에는 수비 하나가 공격수 둘을 맡게 됩니다.',
        steps: [
          {
            title: '볼 스크린',
            dur: 2.4,
            text: '[5]가 올라와 [3]에게 볼 스크린을 겁니다. [3]이 스크린을 타고 가운데로 드리블하자 [x2]와 [x5]가 함께 공으로 올라옵니다.',
            move: {
              o5: { path: [[13.2, 16.4], [15.6, 19.6]], t: [0, 0.4] },
              o3: { path: [[19.4, 20], [14.6, 22.8], [9.6, 21.6]], t: [0.4, 0.95] },
            },
            screens: [{ by: 'o5', face: [17.6, 21], hold: 0.6 }],
            def: { d5: { path: [[9.6, 14.6], [12, 18.2]], t: [0.1, 0.75] } },   // [5]를 따라 스크린 쪽으로 올라왔다가 공을 막는다
          },
          {
            title: '스킵 & 3점',
            dur: 2.2,
            text: '[3]이 존 위로 반대쪽 윙의 [2]에게 넘깁니다. [x3]는 뒷선에서, [x1]은 공 쪽에서 건너오지만 둘 다 늦고, [2]가 3점을 던집니다.',
            ball: [
              { type: 'skip', to: 'o2', at: 0.1 },
              { type: 'shot', at: 0.62, pts: 3 },
            ],
            def: {
              d3: { path: [[-8.6, 10.4], [-14.6, 17.6]], t: [0.4, 1] },   // 뒷선에서 뛰어나오지만 늦다
              d1: { path: [[-2, 21.4], [-11.6, 21.8]], t: [0.35, 1] },    // 공 쪽에서 건너오지만 늦다
            },
          },
        ],
      },
    ],
  },
};
