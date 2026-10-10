// 아이버슨 컷 (Iverson Cut)
export default {
  id: 'iverson-cut',
  name: '아이버슨 컷',
  category: 'offball',
  difficulty: 1,
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
    { name: '언더 추격', desc: '스크린 아래로 지름길을 타고 윙에서 먼저 기다립니다. 슈터에게 3점을 내줄 위험이 있습니다.' },
    { name: '범프', desc: '컷이 시작되는 지점에서 몸으로 밀어 경로와 타이밍을 늦춥니다.' },
    { name: '스위치', desc: '엘보 빅맨의 수비수가 슈터를 넘겨받습니다.' },
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
};
