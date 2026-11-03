// 박스 앤 원 (Box-and-One)
export default {
  id: 'box-and-one',
  name: '박스 앤 원',
  category: 'hybrid',
  difficulty: 2,
  defense: { zone: 'box', man: { d1: 'o2' } },
  aliases: ['box and one', 'box 1', '박스원', '박스 앤 원'],
  summary:
    '네 명은 네모(**박스**) 모양의 존을 서고, 한 명은 상대 에이스 한 명만 졸졸 따라다니며 막는 **혼합 수비**입니다. 에이스가 공을 잡지 못하게 하는 대신, 나머지 넷은 네 명이 지키는 존을 상대합니다.',
  when:
    '상대 득점이 한 선수에게 몰려 있을 때 씁니다. 에이스를 지치게 하고, 다른 선수들이 슛을 쏘게 만듭니다.',
  keys: [
    '번호: [x1]은 에이스 [2]를 따라다니는 추격조, [x2]·[x3]는 박스의 앞(왼쪽·오른쪽), [x4]·[x5]는 박스의 뒤(왼쪽·오른쪽)입니다.',
    '[x1]은 도움 수비로 처지지 않고 [2]에게 붙어, 공을 받지 못하게 앞을 막습니다.',
    '박스는 공을 따라 기웁니다. 윙에서는 공 쪽 앞이 공을 맡고 공 쪽 뒤가 숏코너로 내려가며, 코너에서는 공 쪽 뒤가 나가고 공 쪽 앞이 내려섭니다.',
    '박스 한가운데(자유투 라인 아래)가 빕니다. 하이포스트로 공이 들어가면 뒤쪽 수비가 올라와야 합니다.',
    '아무도 막지 않은 채 레인에 3초를 넘게 있을 수 없으므로(수비 3초), 레인을 건너온 뒤쪽 수비는 레인 선 밖으로 나갔다가 다시 들어옵니다.',
  ],
  counters: [
    { name: '에이스 스크린', desc: '스크린 두 개를 연달아 걸어 추격조를 떼어 냅니다. 박스 수비는 자기 자리를 떠나 에이스를 바꿔 막기 어렵습니다.', read: 'screen-star' },
    { name: '에이스는 미끼', desc: '에이스가 반대쪽 코너로 빠져 추격조를 데려가면, 남은 넷이 박스를 4대4로 공략합니다.', read: 'decoy' },
    { name: '하이포스트', desc: '박스 한가운데인 자유투 라인에서 공을 잡으면 뒤쪽 수비가 올라와야 하고, 그 블록이 빕니다.', read: 'high-post' },
  ],

  en: {
    name: 'Box-and-One',
    summary:
      'Four defenders play a zone in the shape of a **box**, and one defender does nothing but follow the opponent\'s best scorer: a **combination defense**. The star struggles to get the ball, but the other four face a zone with only four defenders.',
    when:
      'When the opponent\'s scoring runs through one player. It wears the star down and makes the others take the shots.',
    keys: [
      'Numbering: [x1] is the chaser who follows the star [2]; [x2] and [x3] are the front of the box (left and right), and [x4] and [x5] the back (left and right).',
      '[x1] never sinks to help: it stays on [2] and fronts the passing lane so [2] cannot catch.',
      'The box leans with the ball. On a wing, the ball-side front takes the ball and the ball-side back drops to the short corner; in the corner, the ball-side back comes out and the ball-side front sinks.',
      'The middle of the box (below the free-throw line) is empty. When the ball goes into the high post, a back defender has to step up.',
      'Nobody may stay in the lane for more than three seconds without guarding someone (defensive three seconds), so the back defender who slides across the lane steps out over the lane line and back in.',
    ],
    counters: [
      { name: 'Screens for the star', desc: 'Two screens in a row shake the chaser loose. The box defenders cannot easily leave their spots to switch onto the star.' },
      { name: 'Star as decoy', desc: 'The star clears to the far corner and takes the chaser along, and the other four attack the box four on four.' },
      { name: 'High post', desc: 'A catch at the free-throw line, the middle of the box, makes a back defender step up, and its block empties.' },
    ],
    steps: [
      { title: 'The box and the chaser', text: '[1] passes to [3] on the left wing. The box leans to the ball: [x2] takes [3], [x4] drops toward the short corner, [x5] slides across, and [x3] pinches in. [x1] stays glued to the star [2] on the left block.' },
      { title: 'Ball back to the top', text: '[3] passes back to [1] at the top, and the box resets: [x2] steps up to [1], [x3] holds the right elbow, and [x4] and [x5] go back to the blocks. [x1] is still on [2].' },
      { title: 'Stagger for the star', text: '[2] runs from the left block up through two screens in a row, set by [4] and [5] (a **stagger**). [x1] gets caught on the screens and falls well behind.' },
      { title: 'Catch & three', text: '[2] pops out to the right slot and catches from [1]. [x1] is still behind the screens, and [x3] does not leave the box to switch. [2] fires the three.' },
    ],
    reads: {
      prompt: 'Where does the offense attack this zone?',
      base: { label: 'Screens for the star', why: 'Only one defender guards the star, and the box does not switch. Two screens in a row leave the star open.' },
      options: [
        {
          label: 'Star as decoy', why: 'When the star clears out, the chaser goes along. The other four play four on four against the box, and the box has a gap in the middle.',
          steps: [
            { title: 'Star clears out', text: '[2] runs away to the right corner, and [x1] follows. Now four attackers face the four defenders of the box. [1] drives down the left side of the top of the box, and [x2] backs up with the drive to stop it.' },
            { title: 'Kick-out three', text: 'With [x2] busy stopping the drive, nobody is left with [3] on the left wing. [1] kicks it out, and [3] fires the three before [x2] can close out.' },
          ],
        },
        {
          label: 'High post', why: 'The middle of the box is empty. A catch there pulls a back defender up, and the block behind it opens.',
          steps: [
            { title: 'High-post flash', text: 'While the star [2] clears to the right and takes [x1] along, [5] flashes into the middle of the box at the free-throw line and catches from [1]. [x4] steps up from the left block to stop [5].' },
            { title: 'Dump-off', text: '[4] steps into the left block that [x4] left, and [5] dumps it off. [x4] turns back too late, and [4] lays it in.' },
          ],
        },
      ],
    },
  },

  // 에이스 + 넷: [1] 탑, [2] 에이스(왼쪽 블록), [3] 왼쪽 윙, [4] 레인 왼쪽, [5] 오른쪽 엘보 아래
  start: { o1: [0, 28], o2: [-7.2, 4.6], o3: [-18.8, 21.4], o4: [-12.6, 10.8], o5: [11.4, 13.6] },
  ball: 'o1',
  steps: [
    {
      title: '박스와 추격조',
      dur: 2.6,
      text: '[1]이 왼쪽 윙의 [3]에게 패스합니다. 박스가 공 쪽으로 기웁니다. [x2]가 [3]을 맡고, [x4]는 숏코너 쪽으로 내려가며, [x5]는 건너오고, [x3]는 안으로 좁힙니다. [x1]은 왼쪽 블록의 에이스 [2]에게 계속 붙어 있습니다.',
      ball: [{ type: 'pass', to: 'o3', at: 0.3 }],
    },
    {
      title: '다시 탑으로',
      dur: 2.6,
      text: '[3]이 탑의 [1]에게 다시 패스하자 박스가 제자리로 돌아갑니다. [x2]는 [1]에게 올라가고, [x3]는 오른쪽 엘보를 지키며, [x4]·[x5]는 블록으로 돌아갑니다. [x1]은 여전히 [2]에게 붙어 있습니다.',
      ball: [{ type: 'pass', to: 'o1', at: 0.3 }],
    },
    {
      title: '에이스를 위한 스태거',
      dur: 2.8,
      text: '[2]가 왼쪽 블록에서 [4]와 [5]가 연달아 거는 스크린 두 개를 타고 올라옵니다(**스태거**). [x1]은 스크린에 걸려 한참 뒤처집니다.',
      move: {
        o4: { path: [[-4.6, 10.6]], t: [0, 0.3] },
        o5: { path: [[4.6, 17.2]], t: [0, 0.3] },
        o2: { path: [[-2.2, 8.4], [-2.4, 12.6], [-0.4, 15.6], [2.4, 19.2], [8.2, 23.4], [13.4, 26]], t: [0.2, 0.97] },
      },
      screens: [{ by: 'o4', face: [-6, 7.6], hold: 0.8 }, { by: 'o5', face: [1.6, 14.6], hold: 0.8 }],
      def: { d1: { lag: 0.9 } },   // 두 스크린에 걸려 한참 늦는다
    },
    {
      title: '캐치 & 3점',
      dur: 2.2,
      text: '[2]가 오른쪽 슬롯으로 튀어나와 [1]의 패스를 받습니다. [x1]은 아직 스크린 뒤에 있고, [x3]는 박스를 떠나 바꿔 막지 않습니다. [2]가 3점을 던집니다.',
      ball: [
        { type: 'pass', to: 'o2', at: 0.05 },
        { type: 'shot', at: 0.45, pts: 3 },
      ],
      def: { d1: { path: [[5.4, 19.8], [9.6, 23]], t: [0.1, 1] } },   // 스크린을 돌아 뒤늦게 쫓는다
    },
  ],

  // 공격 방식별 분기: 공이 탑으로 돌아온 뒤(2단계 끝) 갈라진다. 기본(위 3·4단계)은 에이스 스크린.
  reads: {
    at: 2,
    prompt: '공격은 이 존의 어디를 노릴까요?',
    base: { id: 'screen-star', label: '에이스 스크린', why: '에이스를 막는 수비는 하나뿐이고 박스는 바꿔 막지 않습니다. 스크린 두 개를 연달아 걸면 에이스가 빕니다.' },
    options: [
      {
        id: 'decoy',
        label: '에이스는 미끼',
        why: '에이스가 빠지면 추격조도 따라갑니다. 남은 넷이 박스와 4대4가 되고, 박스 한가운데에 틈이 있습니다.',
        steps: [
          {
            title: '에이스가 빠진다',
            dur: 2.8,
            text: '[2]가 오른쪽 코너로 멀리 빠지고 [x1]이 따라갑니다. 이제 공격 넷이 박스의 수비 넷을 상대합니다. [1]이 박스 위쪽의 왼편으로 파고들고, [x2]가 돌파를 따라 물러서며 막습니다.',
            move: {
              o2: { path: [[2, 3.4], [14, 2.8], [22.6, 4.6]], t: [0, 0.75] },
              o1: { path: [[-2.4, 25], [-4.6, 20.8]], t: [0.5, 0.95] },
            },
            def: {
              d1: { lag: 0.15 },
              d2: { path: [[-3.6, 21.4], [-5.4, 17.8]], t: [0.45, 0.95] },   // [1]을 따라 안쪽으로 물러서며 돌파를 막는다
            },
          },
          {
            title: '킥아웃 3점',
            dur: 2.0,
            text: '[x2]가 돌파를 막느라 바빠 왼쪽 윙의 [3]에게는 아무도 없습니다. [1]이 빼 주고, [x2]가 나가기 전에 [3]이 3점을 던집니다.',
            ball: [
              { type: 'pass', to: 'o3', at: 0.1 },
              { type: 'shot', at: 0.5, pts: 3 },
            ],
            def: { d2: { path: [[-8.6, 18.6], [-13.4, 20.2]], t: [0.3, 1] } },   // 돌파를 막고 있다가 뒤늦게 [3]에게 나간다
          },
        ],
      },
      {
        id: 'high-post',
        label: '하이포스트',
        why: '박스 한가운데가 비어 있습니다. 그곳에서 공을 잡으면 뒤쪽 수비가 올라와야 하고, 그 뒤 블록이 빕니다.',
        steps: [
          {
            title: '하이포스트 플래시',
            dur: 2.2,
            text: '에이스 [2]가 [x1]을 데리고 오른쪽으로 빠지는 사이, [5]가 박스 한가운데 자유투 라인으로 뛰어들어 [1]의 패스를 받습니다. 왼쪽 블록의 [x4]가 [5]를 막으러 올라옵니다.',
            move: {
              o5: { path: [[4, 15.6], [0.6, 17.2]], t: [0, 0.4] },
              o2: { path: [[0, 3.2], [8, 3], [16, 4.2]], t: [0, 0.8] },
            },
            ball: [{ type: 'pass', to: 'o5', at: 0.42 }],
            def: { d1: { lag: 0.15 } },
          },
          {
            title: '덤프오프',
            dur: 1.9,
            text: '[4]가 [x4]가 비운 왼쪽 블록으로 들어오고, [5]가 짧게 건네줍니다. [x4]는 뒤늦게 돌아서고, [4]가 레이업합니다.',
            move: { o4: { path: [[-8.2, 7.4], [-5.4, 5.6]], t: [0, 0.45] } },
            ball: [
              { type: 'bounce', to: 'o4', at: 0.3 },
              { type: 'shot', at: 0.72, pts: 2 },
            ],
            def: { d4: { path: [[-1.8, 12.6], [-3.2, 10.4]], t: [0.2, 1] } },   // 올라왔던 [x4]는 뒤늦게 돌아선다
          },
        ],
      },
    ],
  },
};
