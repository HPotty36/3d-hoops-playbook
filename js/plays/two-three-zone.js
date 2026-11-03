// 2-3 존 (2-3 Zone)
export default {
  id: 'two-three-zone',
  name: '2-3 존',
  category: 'zone',
  difficulty: 1,
  defense: { zone: '2-3' },
  aliases: ['2-3', 'two-three', '2-3 zone', '투쓰리 존', '투-쓰리'],
  summary:
    '앞에 두 명, 뒤에 세 명이 서서 사람 대신 **구역**을 지키는 가장 흔한 존 수비입니다. 공이 움직이면 다섯 명이 함께 미끄러지며 페인트를 닫습니다. 골밑은 단단하지만 자유투 라인(하이포스트), 코너, 베이스라인 쪽에 빈틈이 생깁니다.',
  when:
    '상대에 돌파가 좋은 선수나 힘센 빅맨이 있고 바깥 슛이 약할 때 씁니다. 수비가 파울 트러블에 걸렸거나 발이 느린 선수를 숨겨야 할 때도 꺼냅니다.',
  keys: [
    '번호: [x1]·[x2]는 앞선(왼쪽·오른쪽 가드), [x3]·[x4]는 뒷선(왼쪽·오른쪽), [x5]는 가운데입니다.',
    '공이 윙으로 가면 그쪽 가드가 공을 맡고, 다른 가드는 하이포스트로, 그쪽 뒷선은 숏코너 쪽으로 내려서며, [x5]는 공 쪽 블록으로 갑니다.',
    '공이 코너로 가면 뒷선이 나가 공을 맡고, 가드는 윙으로 돌아가는 패스를 막으러 내려섭니다. 반대쪽 뒷선은 림 앞을 지킵니다.',
    '아무도 막지 않은 채 레인에 3초를 넘게 있을 수 없으므로(수비 3초), 가운데 [x5]는 레인 선을 밟고 나갔다가 다시 들어옵니다.',
  ],
  counters: [
    { name: '하이포스트', desc: '자유투 라인에서 공을 잡으면 [x5]가 올라와야 하고, 그 뒤 림 앞이 빕니다.', read: 'high-post' },
    { name: '스킵 패스', desc: '한쪽에 많이 모여 존을 끌어당긴 뒤, 존 위로 반대쪽 코너까지 한 번에 넘깁니다.', read: 'skip' },
    { name: '숏코너', desc: '베이스라인 쪽 숏코너에서 공을 잡으면 가운데가 나와야 하고, 그 뒤로 빈 림을 파고듭니다.', read: 'short-corner' },
    { name: '갭 돌파', desc: '두 가드 사이(갭)를 드리블로 파고들어 두 명을 끌어들인 뒤 밖으로 빼 줍니다.' },
  ],
  famous:
    '미국 대학 농구의 시러큐스 대학교는 짐 보하임 감독 시절 수십 년 동안 2-3 존을 주 수비로 썼습니다.',

  en: {
    name: '2-3 Zone',
    summary:
      'Two defenders up top and three behind them guard **areas** instead of players. It is the most common zone: as the ball moves, all five slide together and close the paint. The rim is well protected, but the free-throw line (the high post), the corners and the baseline open up.',
    when:
      'Against an opponent with a strong driver or a powerful big and shaky outside shooting. Teams also go to it when they are in foul trouble or need to hide a slow defender.',
    keys: [
      'Numbering: [x1] and [x2] are the front two (left and right guard), [x3] and [x4] the back line (left and right), and [x5] the middle.',
      'When the ball goes to a wing, that side\'s guard takes it, the other guard drops to the high post, the back defender on that side sinks toward the short corner, and [x5] slides to the ball-side block.',
      'When the ball goes to the corner, the back defender comes out to take it and the guard sinks to cut off the pass back to the wing. The far back defender guards the front of the rim.',
      'Nobody may stay in the lane for more than three seconds without guarding someone (defensive three seconds), so the middle defender [x5] steps out over the lane line and back in.',
    ],
    counters: [
      { name: 'High post', desc: 'A catch at the free-throw line forces [x5] to step up, and the front of the rim behind [x5] opens.' },
      { name: 'Skip pass', desc: 'Load one side to pull the zone over, then throw the ball over the top to the far corner in one pass.' },
      { name: 'Short corner', desc: 'A catch in the short corner along the baseline pulls the middle out, and a cutter dives into the empty rim behind it.' },
      { name: 'Gap drive', desc: 'Dribble into the gap between the two guards, draw both of them, and kick it out.' },
    ],
    famous:
      'In U.S. college basketball, Syracuse University under coach Jim Boeheim played the 2-3 zone as its main defense for decades.',
    steps: [
      { title: 'Ball to the wing', text: '[1] passes to [3] on the right wing. [x2] slides out to take the ball, [x1] drops to the high post, [x4] sinks toward the short corner, [x5] moves to the ball-side block, and [x3] guards the front of the rim.' },
      { title: 'Ball to the corner', text: '[4] runs the baseline to the right corner and catches the pass from [3]. [x4] comes out to the corner, [x2] sinks to cut off the pass back to the wing, and [x5] sits beside the block. The whole zone has slid to the ball.' },
      { title: 'Ball back to the top', text: 'The ball goes back to [3] and then to [1] at the top, and the zone slides back to the middle. [5] waits in the lane, in the open space just above [x5] and [x4].' },
      { title: 'High-post flash', text: '[5] flashes to the free-throw line and catches the pass from [1]. [x5] has to step up to stop [5] (it is the middle\'s job), while [4] slides into the short corner.' },
      { title: 'Dump-off', text: 'The front of the rim that [x5] left is empty. [4] dives along the baseline and catches the bounce pass from [5], and [x4] is a step late from the block. Layup.' },
    ],
    reads: {
      prompt: 'Where does the offense attack this zone?',
      base: { label: 'High post', why: 'A catch at the free-throw line pulls the middle defender up, and the rim behind it is empty.' },
      options: [
        {
          label: 'Skip pass', why: 'When the whole zone leans to the ball side, the far corner is the farthest spot from every defender. Throw it over the top.',
          steps: [
            { title: 'Overload', text: '[1] swings it to [3] on the right wing, and [5] and [4] stay on the right side too. With three attackers on one side, the zone slides over and [x3] sinks to the front of the rim. [2] drifts down to the empty left corner.' },
            { title: 'Skip & corner three', text: '[3] throws the ball over the top of the zone to [2] in the left corner (the **skip pass**). [x3] has to run out from under the rim and is far too late. [2] fires the corner three.' },
          ],
        },
        {
          label: 'Short corner', why: 'A catch in the short corner pulls the middle out to the baseline, and the rim behind is left open.',
          steps: [
            { title: 'Short-corner catch', text: '[1] passes to [3] on the right wing, and [4] steps up from the corner into the short corner, behind [x4], who is facing the ball. [3] bounces it in to [4].' },
            { title: 'Baseline dive', text: '[x5] has to come out to stop [4] in the short corner. The moment [x5] leaves, [5] dives down the lane to the rim, catches the pass from [4] and lays it in.' },
          ],
        },
      ],
    },
  },

  // 1-3-1 공격: [1] 탑, [2]·[3] 윙, [5] 자유투 라인 근처, [4] 베이스라인
  start: { o1: [0, 28.5], o2: [-17.5, 21], o3: [17.5, 21], o5: [-1, 17.6], o4: [-9, 3.4] },
  ball: 'o1',
  steps: [
    {
      title: '윙으로',
      dur: 2.2,
      text: '[1]이 오른쪽 윙의 [3]에게 패스합니다. [x2]가 미끄러져 나가 공을 맡고, [x1]은 하이포스트로 내려서며, [x4]는 숏코너 쪽으로, [x5]는 공 쪽 블록으로 가고, [x3]는 림 앞을 지킵니다.',
      move: { o5: { path: [[4, 17.2], [8.4, 15.6]], t: [0.3, 0.85] } },
      ball: [{ type: 'pass', to: 'o3', at: 0.4 }],
    },
    {
      title: '코너로',
      dur: 2.6,
      text: '[4]가 베이스라인을 따라 오른쪽 코너로 달려가 [3]의 패스를 받습니다. [x4]가 코너로 나가고, [x2]는 윙으로 돌아가는 패스를 막으러 내려서며, [x5]는 블록 옆에 붙습니다. 존 전체가 공 쪽으로 미끄러졌습니다.',
      move: {
        o4: { path: [[-3, 2.4], [8, 2.4], [21.6, 3.2]], t: [0, 0.8] },
        o5: { path: [[10.4, 11]], t: [0.25, 0.75] },
      },
      ball: [{ type: 'pass', to: 'o4', at: 0.78 }],
    },
    {
      title: '다시 탑으로',
      dur: 3.0,
      text: '공이 [3]을 거쳐 탑의 [1]에게 돌아가고, 존도 가운데로 미끄러져 돌아옵니다. [5]는 레인 안, [x5]와 [x4]의 바로 위 빈 곳에서 기다립니다.',
      move: { o5: { path: [[4.6, 12]], t: [0.3, 0.8] } },
      ball: [
        { type: 'pass', to: 'o3', at: 0.36 },
        { type: 'pass', to: 'o1', at: 0.74 },
      ],
    },
    {
      title: '하이포스트 플래시',
      dur: 2.0,
      text: '[5]가 자유투 라인으로 뛰어올라(**플래시**) [1]의 패스를 받습니다. [5]를 막는 것은 가운데의 몫이라 [x5]가 올라와야 하고, 그사이 [4]는 숏코너로 들어옵니다.',
      move: {
        o5: { path: [[0.4, 17.6]], t: [0, 0.4] },
        o4: { path: [[11.4, 3.2]], t: [0.1, 0.7] },
      },
      ball: [{ type: 'pass', to: 'o5', at: 0.45 }],
    },
    {
      title: '덤프오프',
      dur: 1.8,
      text: '[x5]가 비운 림 앞이 비었습니다. [4]가 베이스라인을 따라 파고들어 [5]의 바운스 패스를 받고, 블록의 [x4]는 한 발 늦습니다. 레이업.',
      move: { o4: { path: [[5, 3.4], [1.8, 4.6]], t: [0, 0.45] } },
      ball: [
        { type: 'bounce', to: 'o4', at: 0.2 },
        { type: 'shot', at: 0.62, pts: 2 },
      ],
    },
  ],

  // 공격 방식별 분기: 공이 탑으로 돌아온 뒤(3단계 끝) 갈라진다. 기본(위 4·5단계)은 하이포스트.
  reads: {
    at: 3,
    prompt: '공격은 이 존의 어디를 노릴까요?',
    base: { id: 'high-post', label: '하이포스트', why: '자유투 라인에서 공을 잡으면 가운데 수비가 올라와야 하고, 그 뒤 림 앞이 빕니다.' },
    options: [
      {
        id: 'skip',
        label: '스킵 패스',
        why: '존 전체가 공 쪽으로 기울면 반대쪽 코너는 모든 수비에게서 가장 먼 곳입니다. 존 위로 넘깁니다.',
        steps: [
          {
            title: '오버로드',
            dur: 2.2,
            text: '[1]이 오른쪽 윙의 [3]에게 공을 돌리고, [5]와 [4]도 오른쪽에 남습니다. 한쪽에 셋이 모이자 존이 그쪽으로 미끄러지고 [x3]는 림 앞으로 내려섭니다. [2]는 비어 있는 왼쪽 코너로 내려갑니다.',
            move: {
              o2: { path: [[-21, 13], [-22.7, 4.2]], t: [0.25, 0.9] },
              o5: { path: [[9.6, 12.4]], t: [0.2, 0.6] },
            },
            ball: [{ type: 'pass', to: 'o3', at: 0.25 }],
          },
          {
            title: '스킵 & 코너 3점',
            dur: 2.4,
            text: '[3]이 존 위로 왼쪽 코너의 [2]에게 한 번에 넘깁니다(**스킵 패스**). [x3]가 림 밑에서 뛰어나와 보지만 한참 늦고, [2]가 코너 3점을 던집니다.',
            ball: [
              { type: 'skip', to: 'o2', at: 0.1 },
              { type: 'shot', at: 0.68, pts: 3 },
            ],
          },
        ],
      },
      {
        id: 'short-corner',
        label: '숏코너',
        why: '숏코너에서 공을 잡으면 가운데 수비가 베이스라인까지 나와야 하고, 그 뒤 림이 빕니다.',
        steps: [
          {
            title: '숏코너 캐치',
            dur: 2.2,
            text: '[1]이 오른쪽 윙의 [3]에게 패스하고, [4]는 코너에서 숏코너로 올라와 공을 보고 있는 [x4]의 등 뒤에 섭니다. [3]이 [4]에게 바운스 패스를 넣습니다.',
            move: { o4: { path: [[16, 3.2], [11.2, 4.4]], t: [0.2, 0.7] } },
            ball: [
              { type: 'pass', to: 'o3', at: 0.2 },
              { type: 'bounce', to: 'o4', at: 0.78 },
            ],
            def: {
              d4: { path: [[14.4, 9.8]], t: [0.25, 0.7] },   // 윙의 공을 보며 코너 패스 길을 지킨다
              d5: { path: [[8.4, 5.6]], t: [0.82, 1] },      // 공이 숏코너에 닿자 가운데가 나온다
            },
          },
          {
            title: '베이스라인 다이브',
            dur: 1.9,
            text: '숏코너의 [4]를 막으러 [x5]가 나와야 합니다. [x5]가 떠나는 순간 [5]가 레인을 타고 림으로 파고들어 [4]의 패스를 받아 레이업합니다.',
            move: { o5: { path: [[3.2, 8.2], [1.6, 5.2]], t: [0.15, 0.6] } },
            ball: [
              { type: 'pass', to: 'o5', at: 0.42 },
              { type: 'shot', at: 0.75, pts: 2 },
            ],
            def: {
              d4: { path: [[13.4, 8.4]], t: [0, 0.4] },
              d5: { path: [[8.8, 5.4]], t: [0, 0.2] },
            },
          },
        ],
      },
    ],
  },
};
