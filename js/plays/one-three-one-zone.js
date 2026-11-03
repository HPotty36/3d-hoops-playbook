// 1-3-1 존 (1-3-1 Zone)
export default {
  id: 'one-three-one-zone',
  name: '1-3-1 존',
  category: 'zone',
  difficulty: 2,
  defense: { zone: '1-3-1' },
  aliases: ['1-3-1', 'one-three-one', '원쓰리원 존'],
  summary:
    '탑에 하나, 자유투 라인 높이에 셋, 베이스라인에 하나가 서는 존 수비입니다. 공이 윙으로 가면 두 명이 달려들어 **덫(트랩)**을 놓고, 놀란 패스를 가로채려고 합니다. 대신 베이스라인을 혼자 지키는 수비가 양쪽 코너를 다 막을 수는 없습니다.',
  when:
    '상대 가드의 패스가 불안하거나, 경기 흐름을 바꿀 가로채기가 필요할 때 씁니다. 팔이 긴 선수들이 앞에 서야 덫이 무섭습니다.',
  keys: [
    '번호: [x1]은 탑, [x2]·[x3]는 왼쪽·오른쪽 윙, [x5]는 가운데(하이포스트), [x4]는 베이스라인입니다.',
    '공이 윙으로 가면 그쪽 윙 수비와 [x1]이 함께 덫을 놓습니다. [x5]는 공 쪽 로포스트로, [x4]는 공 쪽 코너로 내려가고, 반대쪽 윙은 자유투 라인 근처에 남습니다.',
    '공이 코너로 가면 [x4]와 그쪽 윙 수비가 덫을 놓고, [x5]가 블록 앞을, 반대쪽 윙이 림 앞을 지킵니다.',
    '베이스라인의 [x4] 혼자 양쪽 코너를 맡습니다. 1-3-1의 가장 큰 약점이 이 코너입니다.',
    '아무도 막지 않은 채 레인에 3초를 넘게 있을 수 없으므로(수비 3초), 레인 안의 [x4]·[x5]는 레인 선 밖으로 나갔다가 다시 들어옵니다.',
  ],
  counters: [
    { name: '코너', desc: '베이스라인 수비 하나가 양쪽 코너를 다 막을 수는 없습니다. 공을 반대쪽 코너로 돌리면 3점이 빕니다.', read: 'corner' },
    { name: '숏코너', desc: '베이스라인 쪽 숏코너에서 공을 잡으면 베이스라인 수비와 가운데가 끌려 나오고, 림 앞이 빕니다.', read: 'short-corner' },
    { name: '덫 탈출', desc: '덫에 걸리면 서두르지 말고 덫 위로 반대쪽 윙까지 넘깁니다. 덫에 두 명이 가 있으니 반대쪽은 사람이 모자랍니다.', read: 'trap-skip' },
    { name: '하이포스트', desc: '가운데 수비 뒤, 자유투 라인으로 뛰어들어 공을 받으면 덫과 덫 사이가 열립니다.' },
  ],

  en: {
    name: '1-3-1 Zone',
    summary:
      'One defender at the top, three across at free-throw-line height and one on the baseline. When the ball goes to a wing, two defenders rush it to set a **trap** and try to steal the rushed pass. The price: the one defender on the baseline cannot cover both corners.',
    when:
      'When the opposing guards are shaky passers, or when a steal or two could swing the game. The traps are scariest with long-armed players up front.',
    keys: [
      'Numbering: [x1] is at the top, [x2] and [x3] are the left and right wings, [x5] is the middle (the high post) and [x4] is on the baseline.',
      'When the ball goes to a wing, that wing defender and [x1] trap it together. [x5] drops to the ball-side low post and [x4] to the ball-side corner, while the far wing stays near the free-throw line.',
      'When the ball goes to the corner, [x4] and that side\'s wing trap it, [x5] guards the front of the block and the far wing guards the front of the rim.',
      '[x4] covers both corners alone along the baseline. That is the 1-3-1\'s biggest weakness.',
      'Nobody may stay in the lane for more than three seconds without guarding someone (defensive three seconds), so [x4] and [x5] step out over the lane line and back in.',
    ],
    counters: [
      { name: 'Corner', desc: 'One baseline defender cannot cover both corners. Move the ball to the far corner and the three is open.' },
      { name: 'Short corner', desc: 'A catch in the short corner pulls the baseline defender and the middle out, and the front of the rim opens.' },
      { name: 'Beat the trap', desc: 'When trapped, do not panic: throw it over the trap to the far wing. With two defenders on the ball, the far side is short of bodies.' },
      { name: 'High post', desc: 'Flash to the free-throw line behind the middle defender, and the space between the traps opens.' },
    ],
    steps: [
      { title: 'Wing entry & trap', text: '[1] dribbles to the left wing. The 1-3-1 meets the ball with two: [x2] in front and [x1] from the top side (the **trap**). [x4] runs to the ball-side corner, [x5] drops to the ball-side low post, and [x3] stays at the far elbow. [2] slides to the right wing.' },
      { title: 'Corner trap', text: '[1] passes to [3] in the left corner, and the trap moves with the ball: [x4] closes out from the baseline and [x2] traps from above. [x5] sits in front of the block, [x1] drops to the elbow, and [x3] sinks to the front of the rim.' },
      { title: 'Back to the wing', text: '[3] gets the ball back to [1] on the wing, and [x2] and [x1] set the trap again. The whole zone is leaning to the left.' },
      { title: 'Out of the trap', text: '[5] flashes up to the top, and [1] gets the ball out of the trap to [5]. [x1] has to leave the trap to come back to the ball, and [x4] goes back to the front of the rim.' },
      { title: 'Corner three', text: '[5] throws it over the top to [4] in the right corner. [x4] is the only defender who guards the corners, and it has to run from under the rim to the far corner. [4] fires the three first.' },
    ],
    reads: {
      prompt: 'Where does the offense attack this zone?',
      base: { label: 'Corner', why: 'One baseline defender guards both corners. When the ball swings away, the far corner is open.' },
      options: [
        {
          label: 'Short corner', why: 'A catch in the short corner pulls the baseline defender and the middle out, and nobody is left at the rim.',
          steps: [
            { title: 'Short-corner catch', text: '[3] steps up from the corner into the short corner, and [1] bounces it in past the trap. [x4] comes out to the short corner, and [x5] steps over to help.' },
            { title: 'Dump-off', text: '[5] dives from the free-throw line into the empty front of the rim. [3] dumps it off, and [x3], still near the far elbow from the wing trap, is too late. Layup.' },
          ],
        },
        {
          label: 'Beat the trap', why: 'With two defenders in the trap, the far side has one defender for two spots. Throw it over the trap.',
          steps: [
            { title: 'Skip over the trap', text: '[1] does not force it: a high **skip pass** goes over the trap to [2] on the right wing. [x3] runs out from the elbow and [x1] races over from the trap, but both are too late, and [2] fires the three.' },
          ],
        },
      ],
    },
  },

  // 2-1-2 공격: [1]·[2] 탑의 두 가드, [5] 자유투 라인, [3]·[4] 양쪽 코너
  start: { o1: [-7, 27.6], o2: [7, 27.6], o5: [0, 19.8], o3: [-22.6, 4.4], o4: [22.6, 4.4] },
  ball: 'o1',
  steps: [
    {
      title: '윙 덫',
      dur: 2.8,
      text: '[1]이 왼쪽 윙으로 드리블합니다. 1-3-1은 공을 두 명이 맞습니다. 앞에서 [x2], 위쪽에서 [x1]이 덫(**트랩**)을 놓습니다. [x4]는 공 쪽 코너로 달려가고, [x5]는 공 쪽 로포스트로 내려가며, [x3]는 반대쪽 엘보에 남습니다. [2]는 오른쪽 윙으로 옮겨 갑니다.',
      move: {
        o1: { path: [[-12, 25.4], [-17, 20.6]], t: [0.05, 0.55] },
        o2: { path: [[13, 25], [19, 21.2]], t: [0.15, 0.7] },
      },
    },
    {
      title: '코너 덫',
      dur: 2.6,
      text: '[1]이 왼쪽 코너의 [3]에게 패스하자 덫도 공을 따라갑니다. 베이스라인의 [x4]가 나가고 [x2]가 위에서 덫을 놓습니다. [x5]는 블록 앞에, [x1]은 엘보로 내려서고, [x3]는 림 앞까지 내려섭니다.',
      ball: [{ type: 'pass', to: 'o3', at: 0.2 }],
    },
    {
      title: '다시 윙으로',
      dur: 2.6,
      text: '[3]이 윙의 [1]에게 공을 돌려주자 [x2]와 [x1]이 다시 덫을 놓습니다. 존 전체가 왼쪽으로 기울어 있습니다.',
      ball: [{ type: 'pass', to: 'o1', at: 0.3 }],
    },
    {
      title: '덫에서 빼기',
      dur: 2.4,
      text: '[5]가 탑으로 뛰어오르고, [1]이 덫 밖의 [5]에게 공을 뺍니다. [x1]은 덫을 풀고 공에게 돌아와야 하고, [x4]는 림 앞으로 돌아갑니다.',
      move: { o5: { path: [[0, 25]], t: [0, 0.3] } },
      ball: [{ type: 'pass', to: 'o5', at: 0.32 }],
    },
    {
      title: '코너 3점',
      dur: 2.4,
      text: '[5]가 존 위로 오른쪽 코너의 [4]에게 넘깁니다. 코너를 막는 수비는 [x4] 하나뿐이고, 림 밑에서 반대쪽 코너까지 달려가야 합니다. [4]가 먼저 3점을 던집니다.',
      ball: [
        { type: 'skip', to: 'o4', at: 0.1 },
        { type: 'shot', at: 0.6, pts: 3 },
      ],
      def: { d4: { path: [[8, 6.2], [17.2, 5.2]], t: [0.2, 1] } },   // 림 앞에서 반대쪽 코너까지는 너무 멀다
    },
  ],

  // 공격 방식별 분기: 공이 다시 윙에서 덫에 걸린 뒤(3단계 끝) 갈라진다. 기본(위 4·5단계)은 코너.
  reads: {
    at: 3,
    prompt: '공격은 이 존의 어디를 노릴까요?',
    base: { id: 'corner', label: '코너', why: '베이스라인 수비 하나가 양쪽 코너를 맡습니다. 공이 반대쪽으로 돌면 그쪽 코너가 빕니다.' },
    options: [
      {
        id: 'short-corner',
        label: '숏코너',
        why: '숏코너에서 공을 잡으면 베이스라인 수비와 가운데가 끌려 나오고, 림 앞에는 아무도 남지 않습니다.',
        steps: [
          {
            title: '숏코너 캐치',
            dur: 2.2,
            text: '[3]이 코너에서 숏코너로 올라오고, [1]이 덫 옆으로 바운스 패스를 넣습니다. [x4]가 숏코너로 나오고 [x5]도 도우러 붙습니다.',
            move: { o3: { path: [[-13.4, 4.8]], t: [0, 0.45] } },
            ball: [{ type: 'bounce', to: 'o3', at: 0.45 }],
            def: {
              d5: { path: [[-8.6, 9.4], [-9.4, 8]], t: [0.1, 1] },   // 가운데가 숏코너 쪽으로 도우러 붙는다
              d3: { path: [[8.6, 17.8]], t: [0, 0.3] },             // 윙 덫 때의 자리(반대쪽 엘보 레인 밖)에 남아 있다
            },
          },
          {
            title: '덤프오프',
            dur: 1.9,
            text: '[5]가 자유투 라인에서 빈 림 앞으로 파고듭니다. [3]이 짧게 건네주고, 윙 덫 때문에 아직 반대쪽 엘보 근처에 있던 [x3]는 늦습니다. 레이업.',
            move: { o5: { path: [[-1.2, 13], [-2.6, 6.6]], t: [0, 0.55] } },
            ball: [
              { type: 'pass', to: 'o5', at: 0.5 },
              { type: 'shot', at: 0.82, pts: 2 },
            ],
            def: {
              d4: { path: [[-10.8, 5.6]], t: [0, 0.3] },
              d5: { path: [[-9.2, 8.4]], t: [0, 0.3] },
              d3: { path: [[7.4, 14.2], [4.6, 10.4]], t: [0.35, 1] },   // 엘보에서 뒤늦게 내려온다
            },
          },
        ],
      },
      {
        id: 'trap-skip',
        label: '덫 탈출',
        why: '덫에 두 명이 가 있으면 반대쪽은 수비 하나가 두 자리를 맡습니다. 덫 위로 넘깁니다.',
        steps: [
          {
            title: '덫 위로 스킵',
            dur: 2.8,
            text: '[1]이 서두르지 않고 덫 위로 높은 **스킵 패스**를 오른쪽 윙의 [2]에게 넘깁니다. [x3]는 엘보에서, [x1]은 덫에서 건너 뛰어오지만 둘 다 늦고, [2]가 3점을 던집니다.',
            ball: [
              { type: 'skip', to: 'o2', at: 0.12 },
              { type: 'shot', at: 0.62, pts: 3 },
            ],
            def: {
              d3: { path: [[10.4, 19.6], [15.4, 20.8]], t: [0.5, 1] },   // 엘보에서 혼자 뛰어나오지만 늦다
              d4: { path: [[-9, 6.2], [-1, 6.8]], t: [0.25, 1] },         // 베이스라인 수비는 림 앞으로 돌아오는 것이 고작이다
            },
          },
        ],
      },
    ],
  },
};
