// 트라이앵글 앤 투 (Triangle-and-Two)
export default {
  id: 'triangle-and-two',
  name: '트라이앵글 앤 투',
  category: 'hybrid',
  difficulty: 3,
  defense: { zone: 'triangle', man: { d1: 'o1', d2: 'o2' } },
  aliases: ['triangle and two', 'triangle 2', '트라이앵글 투'],
  summary:
    '세 명은 자유투 라인과 양쪽 블록에 **삼각형**으로 서서 골밑을 지키고, 두 명은 상대 에이스 둘을 하나씩 맨투맨으로 따라다니는 **혼합 수비**입니다. 에이스 둘을 지우는 대신, 나머지 셋은 세 명이 지키는 존을 상대합니다.',
  when:
    '상대 득점이 두 선수에게 몰려 있고, 나머지 선수들의 슛이 약할 때 씁니다.',
  keys: [
    '번호: [x1]·[x2]는 에이스 [1]·[2]를 따라다니는 추격조, [x3]는 자유투 라인(삼각형 꼭대기), [x4]·[x5]는 왼쪽·오른쪽 블록입니다.',
    '[x1]·[x2]는 도움 수비로 처지지 않고 자기 에이스에게 붙습니다. 에이스가 공을 잡아도 삼각형은 자기 자리를 지킵니다.',
    '공이 윙으로 가면 [x3]가 공으로 나가고, 공 쪽 블록은 숏코너로 내려가며, 다른 블록은 레인을 건너옵니다. 코너에서는 공 쪽 블록이 나가고 [x3]는 공 쪽 엘보로 갑니다.',
    '세 명으로 바깥까지 막을 수는 없습니다. 코너와 삼각형 안쪽(자유투 라인 아래)이 약점입니다.',
  ],
  counters: [
    { name: '에이스 픽앤롤', desc: '에이스 둘이 서로 스크린을 걸면 추격조 둘이 바꾸거나 함께 덫을 놓아야 하고, 그 사이 굴러 들어가는 선수가 빕니다.', read: 'star-pnr' },
    { name: '빈 코너', desc: '삼각형은 코너까지 나갈 수 없습니다. 공을 반대쪽 코너로 넘기면 3점이 빕니다.', read: 'corner' },
    { name: '삼각형 꼭대기', desc: '자유투 라인 아래, 삼각형 안으로 뛰어들어 공을 받으면 블록 수비가 올라와야 하고, 그 뒤가 빕니다.', read: 'top' },
  ],

  en: {
    name: 'Triangle-and-Two',
    summary:
      'Three defenders stand in a **triangle** at the free-throw line and the two blocks to protect the rim, and two defenders each follow one of the opponent\'s two best scorers man-to-man: a **combination defense**. It erases the two stars, but the other three face a zone with only three defenders.',
    when:
      'When the opponent\'s scoring runs through two players and the others are weak shooters.',
    keys: [
      'Numbering: [x1] and [x2] are the chasers who follow the stars [1] and [2]; [x3] is at the free-throw line (the top of the triangle), and [x4] and [x5] are on the left and right blocks.',
      '[x1] and [x2] never sink to help: they stay on their stars. Even when a star has the ball, the triangle holds its spots.',
      'When the ball goes to a wing, [x3] goes out to it, the ball-side block drops to the short corner and the far block slides across the lane. In the corner, the ball-side block comes out and [x3] moves to the ball-side elbow.',
      'Three defenders cannot cover the outside. The corners and the inside of the triangle (below the free-throw line) are its weak spots.',
    ],
    counters: [
      { name: 'Two-star pick and roll', desc: 'When the two stars screen for each other, the two chasers have to switch or trap together, and the roller is open in between.' },
      { name: 'Open corner', desc: 'The triangle cannot go out to the corners. Move the ball to the far corner and the three is open.' },
      { name: 'Top of the triangle', desc: 'A flash into the triangle below the free-throw line pulls a block defender up, and the space behind it opens.' },
    ],
    steps: [
      { title: 'Triangle and two', text: '[1] passes to [5] on the right wing. [x3] goes out to the ball, [x5] drops toward the short corner and [x4] slides across the lane. [x1] stays on [1] and [x2] stays on [2] on the left wing, away from the ball.' },
      { title: 'Ball back to the star', text: '[5] passes back to [1] at the top. The triangle resets: [x3] at the free-throw line, [x4] and [x5] at the blocks. [x1] guards [1]; the triangle does not come out.' },
      { title: 'Two-star screen', text: '[2] comes up from the left wing and sets a ball screen for [1]. Both chasers go with the ball: [x1] stays on [1] and [x2] jumps out to trap.' },
      { title: 'Roll & finish', text: '[2] rolls down the lane with nobody on it. [1] passes over the trap, and [2] lays it in before [x4] can come over from the block.' },
    ],
    reads: {
      prompt: 'Where does the offense attack this zone?',
      base: { label: 'Two-star pick and roll', why: 'When the two stars screen for each other, both chasers go to the ball, and the screener rolls free.' },
      options: [
        {
          label: 'Open corner', why: 'The triangle cannot go out to the corners. Swing the ball and skip it to the far corner.',
          steps: [
            { title: 'Swing to the wing', text: '[1] passes to [5] on the right wing, and the triangle leans right: [x3] out to the ball, [x5] toward the short corner, [x4] across the lane.' },
            { title: 'Corner three', text: '[5] throws it over the top to [3] in the left corner. [x4] has to run out from the middle of the lane and is too late, and [3] fires the three.' },
          ],
        },
        {
          label: 'Top of the triangle', why: 'Below the free-throw line, inside the triangle, there is nobody. A catch there pulls a block defender up.',
          steps: [
            { title: 'Flash into the triangle', text: '[4] flashes up from the right corner into the triangle, below the free-throw line, and catches from [1]. [x5] steps up from the block to stop [4].' },
            { title: 'Dump-off', text: '[5] cuts from the wing down to the right block that [x5] just left, and [4] dumps it off. [x5] turns too late, and [5] lays it in.' },
          ],
        },
      ],
    },
  },

  // 에이스 둘 + 셋: [1] 탑(에이스), [2] 왼쪽 윙(에이스), [5] 오른쪽 윙, [3]·[4] 양쪽 코너
  start: { o1: [0, 28], o2: [-18.8, 21.4], o5: [18.8, 21.4], o3: [-22.6, 4.4], o4: [22.6, 4.4] },
  ball: 'o1',
  steps: [
    {
      title: '삼각형과 둘',
      dur: 2.6,
      text: '[1]이 오른쪽 윙의 [5]에게 패스합니다. [x3]가 공으로 나가고, [x5]는 숏코너 쪽으로 내려가며, [x4]는 레인을 건너옵니다. [x1]은 [1]에게, [x2]는 공 반대쪽 왼쪽 윙의 [2]에게 붙어 있습니다.',
      ball: [{ type: 'pass', to: 'o5', at: 0.3 }],
    },
    {
      title: '다시 에이스에게',
      dur: 2.6,
      text: '[5]가 탑의 [1]에게 다시 패스합니다. 삼각형이 제자리로 돌아갑니다. [x3]는 자유투 라인, [x4]·[x5]는 블록. [1]은 [x1]이 막고, 삼각형은 나오지 않습니다.',
      ball: [{ type: 'pass', to: 'o1', at: 0.3 }],
    },
    {
      title: '에이스끼리 스크린',
      dur: 2.4,
      text: '[2]가 왼쪽 윙에서 올라와 [1]에게 볼 스크린을 겁니다. 추격조 둘이 모두 공으로 갑니다. [x1]은 [1]에게 붙어 있고, [x2]가 튀어나와 덫을 놓습니다.',
      move: {
        o2: { path: [[-9, 25], [-2.6, 25.6]], t: [0, 0.5] },
        o1: { path: [[2.6, 27.4], [5.4, 25]], t: [0.55, 0.95] },
      },
      screens: [{ by: 'o2', face: [1.4, 27.2], hold: 0.5 }],
      def: { d2: { path: [[-2, 23.4], [3.6, 23.2]], t: [0.45, 1] } },   // 스크리너를 버리고 공에 덫을 놓는다
    },
    {
      title: '롤 & 마무리',
      dur: 2.0,
      text: '[2]가 아무도 없는 레인으로 굴러 내려갑니다. [1]이 덫 너머로 패스하고, 블록의 [x4]가 건너오기 전에 [2]가 레이업합니다.',
      move: { o2: { path: [[-3.6, 18], [-3.4, 9.8]], t: [0, 0.6] } },
      ball: [
        { type: 'lob', to: 'o2', at: 0.4 },
        { type: 'shot', at: 0.86, pts: 2 },
      ],
      def: { d2: { path: [[4.2, 23.6]], t: [0, 0.3] } },
    },
  ],

  // 공격 방식별 분기: 공이 탑의 에이스에게 돌아온 뒤(2단계 끝) 갈라진다. 기본(위 3·4단계)은 에이스 픽앤롤.
  reads: {
    at: 2,
    prompt: '공격은 이 존의 어디를 노릴까요?',
    base: { id: 'star-pnr', label: '에이스 픽앤롤', why: '에이스 둘이 서로 스크린을 걸면 추격조 둘이 모두 공으로 가고, 스크리너가 비어서 굴러 들어갑니다.' },
    options: [
      {
        id: 'corner',
        label: '빈 코너',
        why: '삼각형은 코너까지 나갈 수 없습니다. 공을 돌린 뒤 반대쪽 코너로 넘깁니다.',
        steps: [
          {
            title: '윙으로',
            dur: 2.4,
            text: '[1]이 오른쪽 윙의 [5]에게 패스하자 삼각형이 오른쪽으로 기웁니다. [x3]는 공으로, [x5]는 숏코너 쪽으로, [x4]는 레인을 건너옵니다.',
            ball: [{ type: 'pass', to: 'o5', at: 0.25 }],
          },
          {
            title: '코너 3점',
            dur: 2.4,
            text: '[5]가 존 위로 왼쪽 코너의 [3]에게 넘깁니다. 레인 가운데에 있던 [x4]가 뛰어나와 보지만 늦고, [3]이 3점을 던집니다.',
            ball: [
              { type: 'skip', to: 'o3', at: 0.1 },
              { type: 'shot', at: 0.68, pts: 3 },
            ],
            def: {
              d4: { path: [[-6.6, 6.8], [-15.4, 5.6]], t: [0.35, 1] },   // 레인 가운데에서 뒤늦게 코너로
              d3: { path: [[4, 18.8], [-5.6, 18.2]], t: [0.25, 1] },      // 꼭대기는 공 쪽 엘보로 건너간다
            },
          },
        ],
      },
      {
        id: 'top',
        label: '삼각형 꼭대기',
        why: '자유투 라인 아래, 삼각형 안쪽에는 아무도 없습니다. 그곳에서 공을 잡으면 블록 수비가 올라와야 합니다.',
        steps: [
          {
            title: '삼각형 안으로',
            dur: 2.4,
            text: '[4]가 오른쪽 코너에서 삼각형 안, 자유투 라인 아래로 뛰어올라 [1]의 패스를 받습니다. 블록의 [x5]가 [4]를 막으러 올라옵니다.',
            move: { o4: { path: [[14, 8.6], [4.6, 13.6]], t: [0, 0.62] } },
            ball: [{ type: 'pass', to: 'o4', at: 0.64 }],
            def: { d5: { path: [[6.4, 9.6], [5.4, 11]], t: [0.5, 1] } },   // 블록에서 올라와 [4]를 막는다
          },
          {
            title: '덤프오프',
            dur: 2.4,
            text: '[5]가 윙에서 [x5]가 비운 오른쪽 블록으로 내려오고, [4]가 짧게 건네줍니다. [x5]는 뒤늦게 돌아서고, [5]가 레이업합니다.',
            move: { o5: { path: [[15.4, 12], [8.4, 6.2], [5.4, 5]], t: [0, 0.62] } },
            ball: [
              { type: 'bounce', to: 'o5', at: 0.6 },
              { type: 'shot', at: 0.86, pts: 2 },
            ],
            def: { d5: { path: [[5.6, 10.4], [6, 8.6]], t: [0.4, 1] } },
          },
        ],
      },
    ],
  },
};
