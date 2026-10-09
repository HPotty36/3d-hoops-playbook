// 픽 앤 팝 (Pick and Pop)
export default {
  id: 'pick-and-pop',
  name: '픽 앤 팝',
  category: 'onball',
  difficulty: 1,
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
    { name: '스위치', desc: '빅맨이 핸들러를, 가드가 팝한 빅맨을 맡아 3점 찬스를 지웁니다. 대신 포스트 미스매치가 생깁니다.' },
    { name: '업 투 터치', desc: '수비 빅맨이 3점 라인 근처까지 올라와 머물며 팝을 견제합니다.' },
    { name: '로테이션', desc: '약한 쪽 수비가 팝맨을 맡고 연쇄적으로 돌아갑니다. 빠른 볼 회전에는 약합니다.' },
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
};
