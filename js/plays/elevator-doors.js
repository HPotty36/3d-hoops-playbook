// 엘리베이터 도어 (Elevator Doors)
export default {
  id: 'elevator-doors',
  name: '엘리베이터 도어',
  category: 'offball',
  difficulty: 2,
  aliases: ['elevator', 'gate screen', '엘리베이터', '게이트 스크린'],
  summary:
    '두 스크리너가 문짝처럼 나란히 서 있다가, 슈터가 그 사이 틈을 통과하자마자 **틈을 닫아** 뒤쫓던 수비수를 가둬버리는 작전입니다. 오픈 3점을 만드는 가장 화려한 세트 중 하나입니다.',
  when:
    '탑에서의 캐치 앤 슛 3점이 꼭 필요할 때, 혹은 스크린을 요리조리 잘 피해 다니는 수비수를 상대할 때 씁니다.',
  keys: [
    '두 스크리너 사이의 틈은 슈터 한 명이 겨우 지날 정도여야 합니다. 너무 넓으면 수비도 따라 들어옵니다.',
    '문 닫는 타이밍이 핵심입니다. 슈터가 통과한 직후, 수비가 들어오기 직전에 닫습니다.',
    '슈터는 스크리너 어깨를 스치듯 최대한 빨리 통과합니다.',
    '문을 닫은 뒤에는 멈춰 서 있어야 합니다. 수비에게 몸을 움직여 부딪히면 무빙 스크린 파울입니다.',
  ],
  counters: [
    { name: '문 바깥으로 돌기', desc: '처음부터 문 바깥으로 돌아 탑에서 기다립니다. 대신 슈터가 방향을 바꿔 림으로 컷할 수 있습니다.', read: 'go-around' },
    { name: '스위치', desc: '스크리너의 수비수 중 한 명이 슈터를 맡습니다.', read: 'switch' },
    { name: '헬프 앤 리커버', desc: '스크리너의 수비수가 잠깐 슈터 앞을 막아 시간을 번 뒤 자기 선수에게 돌아갑니다.', read: 'help-recover' },
  ],
  famous:
    '골든스테이트 워리어스가 스테픈 커리와 클레이 탐슨에게 자주 썼고, 마이애미 히트처럼 슈터가 좋은 팀들의 단골 작전입니다.',

  en: {
    name: 'Elevator Doors',
    summary:
      'Two screeners stand side by side like a pair of doors, and as soon as the shooter runs through the gap between them they **close the gap**, trapping the trailing defender behind them. One of the flashiest sets for creating an open three.',
    when:
      'When you need a catch-and-shoot three from the top, or against a defender who is good at slipping around screens.',
    keys: [
      'The gap should be just wide enough for one shooter. Too wide and the defender follows right through.',
      'Timing is everything: close the doors right after the shooter passes and right before the defender arrives.',
      'The shooter brushes past the screeners\' shoulders and gets through as fast as possible.',
      'Once the doors are closed, the screeners must stay still. Moving into the defender is a moving-screen foul.',
    ],
    counters: [
      { name: 'Go around the doors', desc: 'Go outside the doors from the start and wait at the top. That lets the shooter change direction and cut to the rim.' },
      { name: 'Switch', desc: 'One of the screeners\' defenders picks up the shooter.' },
      { name: 'Help and recover', desc: 'A screener\'s defender briefly steps in front of the shooter to buy time, then recovers.' },
    ],
    famous:
      'The Golden State Warriors ran it often for Stephen Curry and Klay Thompson, and it is a go-to set for shooting teams like the Miami Heat.',
    steps: [
      { title: 'Doors set', text: 'Bigs [4] and [5] stand side by side above the free-throw line like a pair of doors, leaving a small gap. Shooter [2] drags the defender toward the baseline under the rim.' },
      { title: 'Ride & close the doors', text: '[2] sprints through the gap between the two bigs, and the instant [2] is through, [4] and [5] **close the gap like elevator doors**. [x2], chasing right behind, is stopped at the doors.' },
      { title: 'Three from the top', text: '[1] passes to [2] at the top, and [2] lets a wide-open three fly. [x2] is far behind after going around the closed doors.' },
    ],
    reads: {
      prompt: 'How does the defense handle [2] running through the doors?',
      base: { label: 'Chase through', why: 'Chasing right behind runs straight into the closing doors. Catch and shoot the moment you are through.' },
      options: [
        {
          label: 'Go around', why: 'If the defender is already waiting at the top, the rim behind the shooter is open. Change direction and cut to it.',
          steps: [
            { title: 'Go around the doors', text: '[x2] does not try to get through the doors. [x2] goes around them from the start and waits for [2] at the top, so closing the doors stops nobody.' },
            { title: 'Back cut', text: 'With the top taken away, [2] stops in front of the doors and cuts right back to the rim (the **back cut**), catching the bounce pass from [1] for the layup.' },
          ],
        },
        {
          label: 'Switch', why: 'When the defender guarding a door leaves to take the shooter, that big is open. The screener slips to the rim.',
          steps: [
            { title: 'Switch', text: 'As [2] comes through the doors, [x5] steps around them and takes over [2] (the **switch**). [x2], stuck at the doors, has to pick up [5] instead.' },
            { title: 'Screener slip', text: 'While [1] swings the ball to [2] at the top, [5] slips to the empty rim. A bounce pass from [2], a layup for [5], and [x2] started too late to catch up.' },
          ],
        },
        {
          label: 'Help and recover', why: 'A defender who closes out late cannot stop. Shot-fake to get the defender in the air, then drive past.',
          steps: [
            { title: 'Help and recover', text: 'As [2] comes through, [x5] steps in front of [2] for a beat to buy time and then goes back. Meanwhile [x2] runs around the doors toward [2] (**help and recover**).' },
            { title: 'Shot fake & drive', text: '[2] catches the pass from [1] and [x2] flies out. [2] gets [x2] in the air with a **shot fake**, takes one hard dribble to the right and pulls up for a mid-range jumper.' },
          ],
        },
      ],
    },
  },

  start: { o1: [-17, 25], o2: [0, 7], o4: [-3.2, 21.5], o5: [3.2, 21.5], o3: [23, 3.5] },
  ball: 'o1',
  steps: [
    {
      title: '엘리베이터 대기',
      dur: 1.4,
      text: '두 빅맨 [4]·[5]가 자유투 라인 위에 문짝처럼 나란히 서서 틈을 조금 벌려 둡니다. 슈터 [2]는 림 아래에서 수비를 베이스라인 쪽으로 끌고 갑니다.',
      move: {
        o1: { path: [[-16, 26]], t: [0, 0.6] },
        o2: { path: [[2.4, 4.8]], t: [0.3, 0.9] },
      },
    },
    {
      title: '탑승 & 문 닫기',
      dur: 1.9,
      text: '[2]가 두 빅맨 사이의 틈으로 전력 질주해 통과하는 순간, [4]와 [5]가 **엘리베이터 문처럼 틈을 닫아버립니다.** 바로 뒤를 쫓던 [x2]는 문에 막혀 멈춰 섭니다.',
      move: {
        o2: { path: [[0.6, 12], [0, 21.5], [0, 29.8]], t: [0, 0.9] },
        o4: { path: [[-1.2, 21.5]], t: [0.5, 0.7] },
        o5: { path: [[1.2, 21.5]], t: [0.5, 0.7] },
      },
      screens: [
        { by: 'o4', face: [-1.2, 17], hold: 0.8 },
        { by: 'o5', face: [1.2, 17], hold: 0.8 },
      ],
      def: {
        d2: { path: [[0.6, 11.5], [0.4, 18.6]], t: [0.1, 0.75] },
        d4: { path: [[-3.6, 18]], t: [0, 0.5] },
        d5: { path: [[3.6, 18]], t: [0, 0.5] },
      },
    },
    {
      title: '탑에서 3점',
      dur: 1.7,
      text: '[1]이 탑으로 나온 [2]에게 패스하고, [2]가 완전히 빈 상태에서 3점을 던집니다. [x2]는 닫힌 문을 돌아 나오느라 한참 늦었습니다.',
      ball: [
        { type: 'pass', to: 'o2', at: 0.05 },
        { type: 'shot', at: 0.45, pts: 3 },
      ],
      def: {
        d2: { path: [[-4.8, 19.8], [-4.2, 24], [-1.6, 27.4]], t: [0, 0.95] },
      },
    },
  ],

  // 수비 대응별 분기: 엘리베이터 대기(1단계) 뒤에 갈라진다. 기본(위 2·3단계)은 [x2]가 바로 뒤를 쫓다 문에 막히는 경우.
  reads: {
    at: 1,
    prompt: '수비는 문을 통과하는 [2]를 어떻게 막을까요?',
    base: { id: 'chase', label: '뒤따라가기', why: '바로 뒤를 쫓으면 닫히는 문에 그대로 막힙니다. 문을 통과하자마자 받아서 던집니다.' },
    options: [
      {
        id: 'go-around',
        label: '문 바깥으로 돌기',
        why: '수비가 탑에서 먼저 기다리면 슈터 뒤쪽, 림이 빕니다. 방향을 바꿔 림으로 끊습니다.',
        steps: [
          {
            title: '문 바깥으로 돌기',
            dur: 1.6,
            text: '[x2]가 문을 통과하려 하지 않고, 처음부터 문 바깥으로 돌아 탑에서 [2]를 기다립니다. 문은 닫혀도 막을 사람이 없습니다.',
            move: { o2: { path: [[0.6, 11], [0.4, 16.5]], t: [0, 0.75] } },
            def: {
              d2: { path: [[-4.6, 12], [-6.4, 19], [-3.6, 26.4]], t: [0, 0.9] },
              d4: { path: [[-3.6, 18]], t: [0, 0.5] },
              d5: { path: [[3.6, 18]], t: [0, 0.5] },
            },
          },
          {
            title: '백컷',
            dur: 1.6,
            text: '탑이 막혀 있으니 [2]는 문 앞에서 멈췄다가 그대로 림으로 되돌아 끊어 들어갑니다(**백컷**). [1]의 바운스 패스를 받아 레이업으로 마무리합니다.',
            move: { o2: { path: [[0.6, 10.5], [0.8, 5.6]], t: [0, 0.45] } },
            ball: [
              { type: 'bounce', to: 'o2', at: 0.25 },
              { type: 'shot', at: 0.85, pts: 2 },
            ],
            def: {
              d2: { path: [[-4.8, 22.8], [-3.2, 15.5]], t: [0.2, 1] },
              d3: { path: [[3.4, 7.6]], t: [0.6, 0.95] },
            },
          },
        ],
      },
      {
        id: 'switch',
        label: '스위치',
        why: '문 역할을 한 빅맨의 수비가 슈터를 맡으러 나가면 그 빅맨이 비어 있습니다. 스크리너가 림으로 빠집니다.',
        steps: [
          {
            title: '스위치',
            dur: 1.9,
            text: '[2]가 문을 통과하자 [x5]가 문 바깥으로 돌아 나와 [2]를 넘겨받습니다(**스위치**). 문에 막힌 [x2]는 대신 [5]를 맡아야 합니다.',
            move: {
              o2: { path: [[0.6, 12], [0, 21.5], [0, 29.8]], t: [0, 0.9] },
              o4: { path: [[-1.2, 21.5]], t: [0.5, 0.7] },
              o5: { path: [[1.2, 21.5]], t: [0.5, 0.7] },
            },
            screens: [
              { by: 'o4', face: [-1.2, 17], hold: 0.8 },
              { by: 'o5', face: [1.2, 17], hold: 0.8 },
            ],
            def: {
              d2: { path: [[0.6, 11.5], [0.4, 18.6]], t: [0.1, 0.75] },
              d4: { path: [[-3.6, 18]], t: [0, 0.5] },
              d5: { path: [[3.6, 18], [3.8, 24], [2.2, 27.6]], t: [0, 0.9] },
            },
          },
          {
            title: '스크리너 슬립',
            dur: 1.8,
            text: '[1]이 탑의 [2]에게 공을 넘기는 사이 [5]가 비어 있는 림으로 빠집니다(**슬립**). [2]의 바운스 패스, [5]의 레이업. 늦게 출발한 [x2]는 따라잡지 못합니다.',
            move: { o5: { path: [[2.4, 15], [1.2, 7.8]], t: [0, 0.5] } },
            ball: [
              { type: 'pass', to: 'o2', at: 0.05 },
              { type: 'bounce', to: 'o5', at: 0.4 },
              { type: 'shot', at: 0.82, pts: 2 },
            ],
            def: {
              d5: { guard: 'o2' },
              d2: { guard: 'o5', lag: 0.6 },
            },
          },
        ],
      },
      {
        id: 'help-recover',
        label: '헬프 앤 리커버',
        why: '늦게 달려드는 수비는 멈추지 못합니다. 슛 페이크로 띄우고 옆으로 치고 들어갑니다.',
        steps: [
          {
            title: '헬프 앤 리커버',
            dur: 1.9,
            text: '[2]가 문을 통과하자 [x5]가 잠깐 [2] 앞을 막아 시간을 벌고 자기 자리로 돌아갑니다. 그 사이 [x2]가 문을 돌아 [2]에게 달려옵니다(**헬프 앤 리커버**).',
            move: {
              o2: { path: [[0.6, 12], [0, 21.5], [0, 29.8]], t: [0, 0.9] },
              o4: { path: [[-1.2, 21.5]], t: [0.5, 0.7] },
              o5: { path: [[1.2, 21.5]], t: [0.5, 0.7] },
            },
            screens: [
              { by: 'o4', face: [-1.2, 17], hold: 0.8 },
              { by: 'o5', face: [1.2, 17], hold: 0.8 },
            ],
            def: {
              d2: { path: [[0.6, 11.5], [-4.6, 17.8], [-3.6, 25.6]], t: [0.1, 1] },
              d4: { path: [[-3.6, 18]], t: [0, 0.5] },
              d5: { path: [[3.6, 18], [3.8, 25.6], [3.6, 20]], t: [0, 1] },
            },
          },
          {
            title: '슛 페이크 & 돌파',
            dur: 2.2,
            text: '[1]의 패스를 받은 [2]에게 [x2]가 급하게 달려듭니다. [2]는 **슛 페이크**로 [x2]를 띄워 놓고 오른쪽으로 한 번 치고 들어가 미드레인지 점프슛을 던집니다.',
            move: { o2: { path: [[3.4, 25.6], [6.2, 18.6], [5.6, 15.4]], t: [0.33, 0.88] } },
            ball: [
              { type: 'pass', to: 'o2', at: 0.05 },
              { type: 'shot', at: 0.95, pts: 2 },
            ],
            def: {
              d2: { path: [[-1.4, 27.6], [1.6, 24.4]], t: [0.05, 0.65] },
              d5: { path: [[3.4, 19.2]], t: [0, 0.3] },
            },
          },
        ],
      },
    ],
  },
};
