// 엘리베이터 도어 (Elevator Doors)
export default {
  id: 'elevator-doors',
  name: '엘리베이터 도어',
  category: 'offball',
  difficulty: 2,
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
    { name: '문 바깥으로 돌기', desc: '처음부터 문 바깥으로 돌아 탑에서 기다립니다. 대신 슈터가 방향을 바꿔 림으로 컷할 수 있습니다.' },
    { name: '스위치', desc: '스크리너의 수비수 중 한 명이 슈터를 맡습니다.' },
    { name: '헬프 앤 리커버', desc: '스크리너의 수비수가 잠깐 슈터 앞을 막아 시간을 번 뒤 자기 선수에게 돌아갑니다.' },
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
};
