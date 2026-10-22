// 마지막 슛 (Last Shot) — 막판 작전
export default {
  id: 'last-shot',
  name: '마지막 슛',
  category: 'late',
  difficulty: 2,
  aliases: ['last possession', 'hold for one', '마지막 공격'],
  situation: { period: 4, clock: 7.5, shotClock: null, score: [98, 98] },
  summary:
    '동점, 남은 시간 7.5초. 공을 잡은 [1]이 시계를 보며 기다렸다가 [5]와 **픽 앤 롤**을 해서, 1초쯤 남기고 슛을 던지는 마지막 공격입니다. 상대에게 다시 공을 넘길 시간을 남기지 않는 것이 핵심입니다.',
  when:
    '경기 종료 직전 동점이거나 뒤지고 있을 때, 한 번의 공격으로 끝내야 하는 상황에서 씁니다.',
  keys: [
    '[1]은 너무 일찍 움직이지 않습니다. 슛이 1초쯤 남기고 손을 떠나도록 출발 시각을 맞춥니다.',
    '[5]는 [x1]의 옆에 정확히 서서 스크린을 겁니다. 늦으면 시간이 모자랍니다.',
    '나머지 세 명은 코너와 윙에 넓게 서서 도움 수비를 끌어냅니다.',
    '수비가 어떻게 막는지에 따라 슛하는 사람이 바뀝니다. 공을 받으면 망설이지 않고 던집니다.',
  ],
  counters: [
    { name: '드롭', desc: '[x5]가 림 쪽으로 물러섭니다. [1]이 스크린을 돌아 나와 풀업 점퍼를 던집니다.', read: 'drop' },
    { name: '블리츠', desc: '[x1]과 [x5]가 [1]을 함께 막습니다(트랩). 굴러 들어간 [5]에게 패스해 4대3을 만들고, 빈 슈터에게 넘깁니다.', read: 'blitz' },
    { name: '스위치', desc: '[x5]가 [1]을 넘겨받습니다. 발이 느린 빅맨을 상대로 [1]이 돌파합니다.', read: 'switch' },
  ],

  en: {
    name: 'Last Shot',
    summary:
      'Tied, 7.5 seconds left. [1] holds the ball watching the clock, then runs a **pick and roll** with [5] and gets the shot off with about one second left. The point is to leave the other team no time to answer.',
    when:
      'For the last possession when tied or behind, when one play has to decide the game.',
    keys: [
      '[1] does not move too early. Time the start so the shot leaves with about one second left.',
      '[5] sets the screen right beside [x1]. A late screen leaves no time.',
      'The other three spread to the corners and the wing to pull the help away.',
      'Who shoots depends on how the defense plays it. Whoever catches it, shoots it.',
    ],
    counters: [
      { name: 'Drop', desc: '[x5] drops back toward the rim. [1] comes off the screen and pulls up for a jumper.' },
      { name: 'Blitz', desc: '[x1] and [x5] trap [1] together. A pass to the rolling [5] makes it four on three, and the ball goes to the open shooter.' },
      { name: 'Switch', desc: '[x5] takes [1]. [1] drives past the slower big.' },
    ],
    steps: [
      { title: 'Hold for one', text: '[1] holds the ball at the top and watches the clock while the others spread out. With about four seconds left, [5] comes up and sets a ball screen beside [x1].' },
      { title: 'Pick and roll', text: '[1] goes right over [5]\'s screen, and [x1] runs into [5]. [x5] drops back toward the rim (the **drop**), and [5] rolls.' },
      { title: 'Pull-up at the buzzer', text: 'With [x5] back and [x1] behind, [1] rises into a pull-up at the right elbow and lets it go with about one second left.' },
    ],
    reads: {
      prompt: 'How does the defense guard the last pick and roll?',
      base: { label: 'Drop', why: 'If [x5] drops back to protect the rim, the space for a pull-up just past the screen is open.' },
      options: [
        {
          label: 'Blitz', why: 'If two defenders trap [1], nobody is left between [5] and the basket. A pass to [5] makes it four on three.',
          steps: [
            { title: 'Blitz', text: '[x1] and [x5] trap [1] together at the right slot (the **blitz**). [1] passes out of it to [5], rolling to the free-throw line.' },
            { title: 'Four on three', text: '[5] catches at the free-throw line and [x4] steps in to stop [5]. [5] kicks it straight out to [4] on the left wing, and [4] shoots the three with about one second left.' },
          ],
        },
        {
          label: 'Switch', why: 'If [x5] switches onto [1], a slower big is guarding the ball. [1] drives right past.',
          steps: [
            { title: 'Switch', text: '[x5] switches onto [1] coming off the screen (the **switch**). [1] sizes up the big at the right slot.' },
            { title: 'Attack the mismatch', text: '[1] crosses over, gets past the slower [x5] and lays it in with about one second left.' },
          ],
        },
      ],
    },
  },

  start: { o1: [0, 31], o5: [8, 19], o2: [22.8, 4.2], o3: [-22.8, 4.2], o4: [-19.6, 18.6] },
  ball: 'o1',
  steps: [
    {
      title: '시계 보기',
      dur: 3.8,
      text: '[1]이 탑에서 공을 잡고 시계를 보며 기다리고, 나머지는 넓게 퍼집니다. 4초쯤 남았을 때 [5]가 올라와 [x1]의 옆에 볼 스크린을 세웁니다.',
      move: {
        o1: { path: [[-1.4, 29.6]], t: [0, 0.25] },
        o5: { path: [[5.6, 23.4], [1.2, 27]], t: [0.6, 0.95] },
      },
      screens: [{ by: 'o5', face: [-1.2, 26.4], hold: 1, on: 'd1' }],
      def: { d1: { sag: 0 }, d5: { sag: 0 }, d2: { sag: 0.3 }, d3: { sag: 0.3 }, d4: { sag: 0.3 } },
    },
    {
      title: '픽 앤 롤',
      dur: 2,
      text: '[1]이 [5]의 스크린 위로 오른쪽으로 돌고, [x1]은 [5]에게 걸립니다. [x5]는 림 쪽으로 물러서고(**드롭**), [5]는 굴러 들어갑니다.',
      move: {
        o1: { path: [[2.6, 29.6], [6.4, 25.4], [8.2, 21.4]], t: [0.1, 0.9] },
        o5: { path: [[2.4, 20], [1.8, 13.4]], t: [0.4, 1] },
      },
      def: {
        d1: { path: [[-0.4, 28.4], [3.4, 26.6]], t: [0.15, 0.9] },
        d5: { path: [[3, 20.2], [2.6, 15.4]], t: [0.05, 0.9] },
        d2: { sag: 0.3 }, d3: { sag: 0.3 }, d4: { sag: 0.3 },
      },
    },
    {
      title: '버저비터 풀업',
      dur: 1.4,
      text: '[x5]는 물러서 있고 [x1]은 뒤에 있습니다. [1]이 오른쪽 엘보에서 그대로 풀업 점퍼로 올라가 1초쯤 남기고 던집니다.',
      move: { o1: { path: [[8.4, 20.4]], t: [0, 0.35] } },
      ball: [{ type: 'shot', at: 0.5, pts: 2 }],
      def: { d1: { path: [[6, 24.4]], t: [0, 0.6] }, d5: { path: [[3.6, 15.6]], t: [0, 0.6] }, d2: { sag: 0.3 }, d3: { sag: 0.3 }, d4: { sag: 0.3 } },
    },
  ],

  // 수비 대응별 분기: 4초쯤 남기고 [5]가 볼 스크린을 세운 뒤(1단계) 갈라진다. 기본(위 2·3단계)은 드롭.
  reads: {
    at: 1,
    prompt: '수비는 마지막 픽 앤 롤을 어떻게 막을까요?',
    base: { id: 'drop', label: '드롭', why: '[x5]가 림을 지키려 물러서면, 스크린 바로 앞에서 풀업 점퍼를 던질 공간이 생깁니다.' },
    options: [
      {
        id: 'blitz',
        label: '블리츠',
        why: '두 명이 [1]을 함께 막으면 [5]와 림 사이가 빕니다. [5]에게 패스하면 4대3이 됩니다.',
        steps: [
          {
            title: '블리츠',
            dur: 1.8,
            text: '[x1]과 [x5]가 오른쪽 슬롯에서 [1]을 함께 막습니다(**블리츠**). [1]은 트랩 너머로 자유투 라인까지 굴러 들어온 [5]에게 패스합니다.',
            move: {
              o1: { path: [[2.6, 29.6], [5.4, 28.4]], t: [0.05, 0.5] },
              o5: { path: [[2.2, 22.4], [1.4, 19.4]], t: [0.3, 0.8] },
            },
            ball: [{ type: 'pass', to: 'o5', at: 0.76 }],
            def: {
              d1: { path: [[-0.4, 28.4], [3.6, 30]], t: [0.1, 0.55] },
              d5: { path: [[3.6, 25.8], [7, 28]], t: [0.05, 0.55] },
              d2: { sag: 0.3 }, d3: { sag: 0.3 }, d4: { sag: 0.3 },
            },
          },
          {
            title: '4대3',
            dur: 1.8,
            text: '[5]가 자유투 라인에서 공을 잡자 [x4]가 [5]를 막으러 들어옵니다. [5]는 곧바로 왼쪽 윙의 [4]에게 공을 빼 주고, [4]가 1초쯤 남기고 3점을 던집니다.',
            move: { o4: { path: [[-20.6, 18.8]], t: [0, 0.3] } },
            ball: [
              { type: 'pass', to: 'o4', at: 0.05 },
              { type: 'shot', at: 0.53, pts: 3 },
            ],
            def: {
              d4: { path: [[-8.4, 16.6], [-1.8, 17]], t: [0, 0.45] },
              d1: { path: [[4.4, 26.6]], t: [0, 0.6] },
              d5: { path: [[3.6, 23.2]], t: [0, 0.6] },
              d2: { sag: 0.3 }, d3: { sag: 0.3 },
            },
          },
        ],
      },
      {
        id: 'switch',
        label: '스위치',
        why: '[x5]가 [1]을 넘겨받으면 발이 느린 빅맨이 공을 막게 됩니다. [1]이 그대로 돌파합니다.',
        steps: [
          {
            title: '스위치',
            dur: 1.2,
            text: '[1]이 스크린을 돌아 나오자 [x5]가 [1]을 넘겨받습니다(**스위치**). [1]은 오른쪽 슬롯에서 빅맨과 마주 섭니다.',
            move: {
              o1: { path: [[2.6, 29.6], [6, 24.6]], t: [0.05, 0.8] },
              o5: { path: [[-1.2, 22.4]], t: [0.4, 0.95] },
            },
            def: {
              d5: { guard: 'o1', path: [[3.6, 23.4], [4.8, 21.8]], t: [0.1, 0.75] },
              d1: { guard: 'o5', path: [[-0.6, 25.2], [-1.4, 20.6]], t: [0.2, 0.95] },
              d2: { sag: 0.3 }, d3: { sag: 0.3 }, d4: { sag: 0.3 },
            },
          },
          {
            title: '미스매치 공략',
            dur: 2,
            text: '[1]이 곧바로 방향을 바꾸며 발이 느린 [x5]를 제치고 림까지 파고들어, 1초쯤 남기고 레이업을 올립니다.',
            move: { o1: { path: [[4.6, 20.6], [3.2, 14.6], [1.6, 8.6], [0.8, 6.6]], t: [0.1, 0.72] } },
            ball: [{ type: 'shot', at: 0.75, pts: 2 }],
            def: { d5: { path: [[5.6, 19.4], [4.4, 13.6], [3.4, 10.2]], t: [0.15, 0.95] }, d1: { sag: 0.3 }, d2: { sag: 0.3 }, d3: { sag: 0.3 }, d4: { sag: 0.3 } },
          },
        ],
      },
    ],
  },
};
