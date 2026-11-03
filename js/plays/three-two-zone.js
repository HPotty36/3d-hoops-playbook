// 3-2 존 (3-2 Zone, 1-2-2)
export default {
  id: 'three-two-zone',
  name: '3-2 존',
  category: 'zone',
  difficulty: 2,
  defense: { zone: '3-2' },
  aliases: ['3-2', '1-2-2', 'three-two', '쓰리투 존', '1-2-2 존'],
  summary:
    '앞에 세 명(탑 하나와 양쪽 윙), 뒤에 두 명이 서는 존 수비입니다. 1-2-2라고도 부릅니다. 3점 라인 바깥을 넓게 막아 슈터가 많은 팀을 괴롭히지만, 뒤에 두 명뿐이라 자유투 라인(하이포스트)과 베이스라인 쪽이 약합니다.',
  when:
    '상대의 바깥 슛이 좋고 골밑 공격은 약할 때 씁니다. 앞선이 길고 빠른 팀일수록 패스 길을 잘 끊습니다.',
  keys: [
    '번호: [x1]은 탑, [x2]·[x3]는 왼쪽·오른쪽 윙, [x4]·[x5]는 왼쪽·오른쪽 뒷선입니다.',
    '공이 윙으로 가면 그쪽 윙 수비가 공을 맡고, [x1]은 공 쪽 엘보로, 반대쪽 윙은 하이포스트로 좁히며, 뒷선은 공 쪽으로 미끄러집니다.',
    '공이 코너로 가면 그쪽 뒷선이 나가 공을 맡고, 다른 뒷선이 레인을 건너 공 쪽 블록을 지킵니다. 반대쪽 윙이 림 앞까지 내려섭니다.',
    '하이포스트로 공이 들어가면 공 쪽 뒷선([x4])이 올라와 막고, [x1]은 뒤에서 내려서 밖으로 빼는 패스를 막습니다. 그만큼 블록이 빕니다.',
  ],
  counters: [
    { name: '하이-로', desc: '하이포스트에서 공을 잡으면 뒷선 하나가 올라와야 하고, 그 자리의 블록으로 낮은 패스를 넣습니다.', read: 'high-low' },
    { name: '베이스라인', desc: '코너에서 공을 잡으면 뒷선 하나가 나와야 하고, 반대쪽에서 베이스라인을 따라 들어오는 선수를 막을 사람이 모자랍니다.', read: 'baseline' },
    { name: '갭 돌파', desc: '앞선 세 명 사이(갭)로 파고들면 두 명이 함께 좁혀 오고, 그 바깥의 슈터가 빕니다.', read: 'gap' },
  ],

  en: {
    name: '3-2 Zone (1-2-2)',
    summary:
      'Three defenders up front (one at the top and one on each wing) and two behind them. It is also called the 1-2-2. It covers the three-point line widely and bothers teams with many shooters, but with only two defenders in the back, the free-throw line (the high post) and the baseline are weak.',
    when:
      'Against teams that shoot well from outside but do little inside. The longer and quicker the front three, the more passes it steals.',
    keys: [
      'Numbering: [x1] is at the top, [x2] and [x3] are the left and right wings, and [x4] and [x5] are the left and right back line.',
      'When the ball goes to a wing, that wing defender takes it, [x1] moves to the ball-side elbow, the far wing pinches to the high post, and the back line slides to the ball.',
      'When the ball goes to the corner, that side\'s back defender comes out to take it, the other back defender crosses the lane to guard the ball-side block, and the far wing sinks to the front of the rim.',
      'When the ball goes into the high post, the ball-side back defender ([x4]) steps up to stop it and [x1] drops behind to cut off the pass back out. That leaves the block empty.',
    ],
    counters: [
      { name: 'High-low', desc: 'A high-post catch makes a back defender step up, and a low pass goes to the block it left.' },
      { name: 'Baseline', desc: 'A corner catch pulls a back defender out, and there is nobody left for a cutter coming along the baseline from the far side.' },
      { name: 'Gap drive', desc: 'A drive into the gap between the front three draws two of them in, and the shooter outside them is open.' },
    ],
    steps: [
      { title: 'Ball to the wing', text: '[1] passes to [3], who has lifted to the left wing. [x2] takes the ball, [x1] moves to the ball-side elbow, [x3] pinches toward [5] at the high post, and [x4] and [x5] slide to the left.' },
      { title: 'Ball to the corner', text: '[4] runs the baseline from the right side to the left corner and catches the pass from [3]. [x4] comes out to the corner, [x5] crosses the lane to the ball-side block, [x2] sinks below the wing, and [x3] drops to the front of the rim.' },
      { title: 'Ball back to the top', text: 'The ball goes back through [3] to [1] at the top, and the zone slides back to the middle: [x1] comes up toward the ball, and [x4] and [x5] spread back to the two blocks. [2] has drifted to the right corner.' },
      { title: 'High-post catch', text: '[1] passes to [5] at the free-throw line. [x4] steps up from the left block to stop [5], and [x1] drops behind to cut off the pass back out. [4] slides in from the corner to the left block that [x4] just left.' },
      { title: 'High-low', text: '[5] drops a bounce pass to [4] on the empty left block (the **high-low**). [x5] is on the far side of the lane and cannot get there. Layup.' },
    ],
    reads: {
      prompt: 'Where does the offense attack this zone?',
      base: { label: 'High-low', why: 'A high-post catch pulls a back defender up, and the block behind it is empty for a low pass.' },
      options: [
        {
          label: 'Baseline', why: 'A corner catch pulls one back defender out, and the other is busy with the ball-side block. A cutter along the baseline has nobody in front.',
          steps: [
            { title: 'Back to the corner', text: '[1] swings it to [3], and [3] passes to [4] in the left corner. [x4] comes out to the corner again, and [x5] crosses to the ball-side block.' },
            { title: 'Baseline cut', text: '[2] cuts from the right corner along the baseline, under [x3], into the space beside the rim. [4] passes along the baseline and [2] lays it in before [x5] can turn around.' },
          ],
        },
        {
          label: 'Gap drive', why: 'With three defenders spread out front, there are two gaps. A drive into one draws two defenders, and the shooter outside them is open.',
          steps: [
            { title: 'Drive the gap', text: '[1] attacks the gap between [x1] and [x2] with the dribble. [x2] has to leave the wing to help stop the drive, and [x1] chases from behind.' },
            { title: 'Kick-out three', text: '[1] kicks it out to [3] on the left wing that [x2] just left, and [3] fires the three before [x2] can get back out.' },
          ],
        },
      ],
    },
  },

  // 2-1-2 공격: [1]·[2] 탑의 두 가드, [5] 하이포스트, [3]·[4] 아래쪽 양 블록 바깥
  start: { o1: [-6.4, 27.6], o2: [6.4, 27.6], o5: [0.6, 17.8], o3: [-12.6, 6.4], o4: [12.6, 6.4] },
  ball: 'o1',
  steps: [
    {
      title: '윙으로',
      dur: 2.4,
      text: '[1]이 왼쪽 윙으로 올라온 [3]에게 패스합니다. [x2]가 공을 맡고, [x1]은 공 쪽 엘보로, [x3]는 하이포스트의 [5] 쪽으로 좁히며, [x4]·[x5]는 왼쪽으로 미끄러집니다.',
      move: {
        o3: { path: [[-16, 13], [-18.8, 21.2]], t: [0, 0.45] },
        o1: { path: [[-2, 28.4]], t: [0.55, 0.95] },
        o2: { path: [[13, 25], [17.5, 18]], t: [0.4, 1] },
      },
      ball: [{ type: 'pass', to: 'o3', at: 0.42 }],
    },
    {
      title: '코너로',
      dur: 2.8,
      text: '[4]가 오른쪽에서 베이스라인을 따라 왼쪽 코너로 달려가 [3]의 패스를 받습니다. [x4]가 코너로 나가고, [x5]는 레인을 건너 공 쪽 블록을 지키며, [x2]는 윙 아래로 내려서고, [x3]는 림 앞까지 내려섭니다.',
      move: {
        o4: { path: [[5, 2.6], [-8, 2.6], [-21.8, 4.2]], t: [0, 0.85] },
        o2: { path: [[21.8, 9], [22.4, 4.4]], t: [0.3, 0.9] },
      },
      ball: [{ type: 'pass', to: 'o4', at: 0.8 }],
    },
    {
      title: '다시 탑으로',
      dur: 3.0,
      text: '공이 [3]을 거쳐 탑의 [1]에게 돌아가고, 존도 가운데로 미끄러져 돌아옵니다. [x1]은 공 쪽으로 올라오고, [x4]·[x5]는 다시 양 블록으로 벌어집니다. [2]는 오른쪽 코너에 와 있습니다.',
      move: { o1: { path: [[-0.4, 28.2]], t: [0, 0.4] } },
      ball: [
        { type: 'pass', to: 'o3', at: 0.36 },
        { type: 'pass', to: 'o1', at: 0.74 },
      ],
    },
    {
      title: '하이포스트 캐치',
      dur: 2.0,
      text: '[1]이 자유투 라인의 [5]에게 패스합니다. 왼쪽 블록의 [x4]가 올라와 [5]를 막고, [x1]은 뒤로 내려서 밖으로 빼는 패스를 막습니다. 그사이 [4]가 코너에서 [x4]가 비운 왼쪽 블록으로 들어옵니다.',
      move: { o4: { path: [[-14, 3.4], [-6, 5.2]], t: [0.35, 0.95] } },
      ball: [{ type: 'pass', to: 'o5', at: 0.3 }],
    },
    {
      title: '하이-로',
      dur: 1.8,
      text: '[5]가 빈 왼쪽 블록의 [4]에게 바운스 패스를 떨어뜨립니다(**하이-로**). [x5]는 레인 반대쪽에 있어 닿지 못하고, [4]가 레이업합니다.',
      ball: [
        { type: 'bounce', to: 'o4', at: 0.12 },
        { type: 'shot', at: 0.55, pts: 2 },
      ],
    },
  ],

  // 공격 방식별 분기: 공이 탑으로 돌아온 뒤(3단계 끝) 갈라진다. 기본(위 4·5단계)은 하이-로.
  reads: {
    at: 3,
    prompt: '공격은 이 존의 어디를 노릴까요?',
    base: { id: 'high-low', label: '하이-로', why: '하이포스트에서 공을 잡으면 뒷선 하나가 올라와야 하고, 그 뒤 블록이 비어 낮은 패스가 들어갑니다.' },
    options: [
      {
        id: 'baseline',
        label: '베이스라인',
        why: '코너에서 공을 잡으면 뒷선 하나가 나오고, 다른 하나는 공 쪽 블록에 묶입니다. 베이스라인을 따라 들어오는 선수 앞에는 아무도 없습니다.',
        steps: [
          {
            title: '다시 코너로',
            dur: 2.6,
            text: '[1]이 [3]에게, [3]이 왼쪽 코너의 [4]에게 공을 돌립니다. [x4]가 다시 코너로 나가고, [x5]는 공 쪽 블록으로 건너옵니다.',
            ball: [
              { type: 'pass', to: 'o3', at: 0.12 },
              { type: 'pass', to: 'o4', at: 0.5 },
            ],
          },
          {
            title: '베이스라인 컷',
            dur: 2.3,
            text: '[2]가 오른쪽 코너에서 베이스라인을 따라 [x3] 아래를 지나 림 옆 빈 곳으로 파고듭니다. [4]가 베이스라인을 따라 패스하고, [x5]가 돌아서기 전에 [2]가 레이업합니다.',
            move: { o2: { path: [[14, 2.6], [3, 2.4], [-2.6, 3.6]], t: [0, 0.72] } },
            ball: [
              { type: 'pass', to: 'o2', at: 0.58 },
              { type: 'shot', at: 0.86, pts: 2 },
            ],
          },
        ],
      },
      {
        id: 'gap',
        label: '갭 돌파',
        why: '앞선 세 명이 넓게 서 있으면 그 사이에 틈(갭)이 둘 생깁니다. 한 곳을 파고들면 두 명이 몰리고, 그 바깥의 슈터가 빕니다.',
        steps: [
          {
            title: '갭 돌파',
            dur: 1.8,
            text: '[1]이 [x1]과 [x2] 사이의 틈으로 드리블해 파고듭니다. 돌파를 막으려고 [x2]가 윙을 비우고 들어오고, [x1]은 뒤에서 쫓아옵니다.',
            move: { o1: { path: [[-3, 25.4], [-6.4, 20.6]], t: [0.1, 0.8] } },
            def: { d2: { path: [[-10.2, 19.6]], t: [0.25, 0.8] } },
          },
          {
            title: '킥아웃 3점',
            dur: 2.0,
            text: '[1]이 [x2]가 비운 왼쪽 윙의 [3]에게 빼 주고, [x2]가 다시 나가기 전에 [3]이 3점을 던집니다.',
            ball: [
              { type: 'pass', to: 'o3', at: 0.1 },
              { type: 'shot', at: 0.5, pts: 3 },
            ],
            def: { d2: { path: [[-11.6, 19.8]], t: [0.25, 1] } },
          },
        ],
      },
    ],
  },
};
