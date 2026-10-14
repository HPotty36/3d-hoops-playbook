// 고스트 스크린 (Ghost Screen)
export default {
  id: 'ghost-screen',
  name: '고스트 스크린',
  category: 'onball',
  difficulty: 2,
  aliases: ['ghost', 'fake screen', '고스트'],
  summary:
    '슈터가 볼 스크린을 걸러 올라가는 척하다가, 부딪히기 직전에 빠져나가는(**고스트**) 동작입니다. 스크린을 바꿔 막거나(스위치) 튀어나와 막으려고(쇼) 미리 움직이는 수비를 거꾸로 이용합니다.',
  when:
    '상대가 스크린마다 스위치하거나 공 쪽으로 미리 쏠릴 때 효과적입니다. 스크리너가 3점을 던질 수 있는 슈터일수록 위력이 커집니다.',
  keys: [
    '스크리너는 진짜 스크린을 거는 것처럼 핸들러의 수비를 향해 달려가야 수비가 반응합니다.',
    '부딪히기 직전, 수비의 움직임을 보고 빠져나갈 방향(바깥 3점 라인 또는 림)을 정합니다.',
    '핸들러는 스크리너가 빠지는 순간 바로 패스할 준비를 합니다. 한 박자만 늦어도 수비가 돌아옵니다.',
    '코너의 [3]·[4]는 넓게 서서 도움 수비를 멀리 둡니다.',
  ],
  counters: [
    { name: '미리 스위치', desc: '스크린이 걸리기 전에 두 수비가 마크를 바꿀 준비를 합니다. 스크리너가 빠지면 둘 다 공 쪽에 몰려 슈터를 놓칩니다.', read: 'pre-switch' },
    { name: '쇼', desc: '스크리너의 수비가 공 쪽으로 튀어나와 핸들러를 멈춰 세웁니다. 그 뒤로 림 쪽이 빕니다.', read: 'show' },
    { name: '그대로', desc: '두 수비가 끝까지 자기 선수만 따라갑니다. 대신 핸들러가 넓은 공간에서 1대1을 하게 됩니다.', read: 'stay-home' },
  ],
  famous:
    '2010년대 골든스테이트 워리어스가 슈터들의 고스트 스크린으로 유명했습니다. 지금은 슈터가 많은 팀이라면 어디서나 쓰는 동작입니다.',

  en: {
    name: 'Ghost Screen',
    summary:
      'A shooter runs up as if to set a ball screen, then slips out just before contact (the **ghost**). It turns the defense\'s own early reaction against it, whether the defenders get ready to switch or jump out to show.',
    when:
      'Against teams that switch every screen or lean toward the ball early. The better the screener shoots threes, the more it hurts.',
    keys: [
      'The screener has to sprint at the handler\'s defender as if the screen is real, or the defense will not react.',
      'Right before contact, read the defenders and pick the exit: out to the arc or down to the rim.',
      'The handler is ready to pass the moment the screener slips. One beat late and the defense recovers.',
      '[3] and [4] stay wide in the corners to keep help far away.',
    ],
    counters: [
      { name: 'Pre-switch', desc: 'Both defenders get ready to trade before the screen arrives. When the screener slips out, both end up on the ball and the shooter is lost.' },
      { name: 'Show', desc: 'The screener\'s defender jumps out at the ball to stop the handler, opening the way to the rim behind.' },
      { name: 'Stay home', desc: 'Both defenders stick with their own man, but the handler gets a one-on-one with plenty of room.' },
    ],
    famous:
      'The Golden State Warriors of the 2010s made ghost screens by their shooters famous. Today almost every team with shooters uses it.',
    steps: [
      { title: 'The fake screen', text: 'Shooter [2] runs from the left wing straight at [x1], as if to set a ball screen for [1]. Both defenders start reacting to a screen that is about to come.' },
      { title: 'Ghost pop', text: '[x2] and [x1] both lean toward [1] to switch the coming screen. Right before contact, [2] slips back out to the arc (the **ghost pop**). Nobody is with [2].' },
      { title: 'Catch & three', text: '[1] passes to [2] and [2] fires the three. [x1] tries to recover but is far too late.' },
    ],
    reads: {
      prompt: 'How does the defense handle [2] coming up to screen?',
      base: { label: 'Pre-switch', why: 'When both defenders crowd the ball to switch the screen early, the shooter who faked it is left open.' },
      options: [
        {
          label: 'Show', why: 'When the screener\'s defender jumps out at the ball, the space behind is empty. Fake the screen and slip to the rim.',
          steps: [
            { title: 'Show', text: '[x2] jumps out at [1] to show on the coming screen. [2] never sets it and slips down the lane behind [x2] (the **ghost slip**).' },
            { title: 'Ghost slip layup', text: '[1] bounces it to [2] cutting to the rim, and [2] lays it in. [x2] is caught up high and [x5] arrives too late.' },
          ],
        },
        {
          label: 'Stay home', why: 'If both defenders stick to their own man, the space the ghost leaves behind becomes the handler\'s one-on-one stage.',
          steps: [
            { title: 'Stay home', text: 'Both defenders stay with their own man: [x2] follows [2] back out to the arc. But that leaves the middle of the floor wide open.' },
            { title: 'Drive & layup', text: '[1] attacks [x1] one-on-one in the space [2] just emptied, gets to the rim and lays it in.' },
          ],
        },
      ],
    },
  },

  start: { o1: [0, 31], o2: [-17, 23], o3: [23, 3.5], o4: [-23, 3.5], o5: [12, 6] },
  ball: 'o1',
  steps: [
    {
      title: '스크린 거는 척',
      dur: 1.5,
      text: '슈터 [2]가 왼쪽 윙에서 [x1]을 향해 달려와 [1]에게 볼 스크린을 걸려는 것처럼 보입니다. 두 수비는 곧 올 스크린에 대비해 움직이기 시작합니다.',
      move: {
        o2: { path: [[-10, 27], [-4.6, 28.6]], t: [0, 1] },
        o1: { path: [[-0.8, 32.2]], t: [0.3, 0.9] },
      },
    },
    {
      title: '고스트 팝',
      dur: 1.4,
      text: '[x2]와 [x1]이 스크린을 바꿔 막으려고 둘 다 [1] 쪽으로 몰립니다. 부딪히기 직전 [2]는 스크린을 걸지 않고 3점 라인 밖으로 빠져나갑니다(**고스트 팝**). [2]에게는 아무도 없습니다.',
      move: { o2: { path: [[-6.6, 28.6], [-13.6, 25.8]], t: [0.1, 0.75] } },
      def: { d2: { guard: 'o1', path: [[-2.4, 27.6], [-2.2, 30.8]], t: [0, 0.5] } },
    },
    {
      title: '캐치 & 3점',
      dur: 1.6,
      text: '[1]이 [2]에게 패스하고 [2]가 3점을 던집니다. [x1]이 뒤늦게 달려가지만 한참 늦었습니다.',
      ball: [
        { type: 'pass', to: 'o2', at: 0.05 },
        { type: 'shot', at: 0.45, pts: 3 },
      ],
      def: { d1: { guard: 'o2', path: [[-10.6, 25.2]], t: [0.15, 0.7] } },
    },
  ],

  // 수비 대응별 분기: 스크린 거는 척(1단계) 뒤에 갈라진다. 기본(위 2·3단계)은 미리 스위치.
  reads: {
    at: 1,
    prompt: '수비는 스크린을 거는 척하는 [2]를 어떻게 막을까요?',
    base: { id: 'pre-switch', label: '미리 스위치', why: '스크린을 미리 바꿔 막으려고 두 수비가 공 쪽으로 몰리면, 스크린을 거는 척한 슈터가 비어 있습니다.' },
    options: [
      {
        id: 'show',
        label: '쇼',
        why: '스크리너의 수비가 공 쪽으로 튀어나오면 그 뒤가 빕니다. 스크린을 거는 척하다 림으로 빠집니다.',
        steps: [
          {
            title: '쇼',
            dur: 1.4,
            text: '[x2]가 곧 올 스크린을 막으려고 [1] 쪽으로 튀어나옵니다(**쇼**). [2]는 스크린을 걸지 않고 [x2]의 등 뒤로 페인트를 향해 빠집니다(**고스트 슬립**).',
            move: { o2: { path: [[-6, 25.8], [-4.6, 21.6], [-3, 15.8]], t: [0.2, 0.85] } },
            def: { d2: { path: [[-2.2, 27.4], [-2.6, 31.4]], t: [0, 0.5] } },
          },
          {
            title: '고스트 슬립 레이업',
            dur: 1.6,
            text: '[1]이 림으로 빠지는 [2]에게 바운스 패스를 넣고 [2]가 레이업으로 마무리합니다. 높이 튀어나왔던 [x2]도, 뒤늦게 도우러 온 [x5]도 늦었습니다.',
            move: { o2: { path: [[-1.2, 8.2]], t: [0, 0.4] } },
            ball: [
              { type: 'bounce', to: 'o2', at: 0.15 },
              { type: 'shot', at: 0.68, pts: 2 },
            ],
            def: {
              d2: { path: [[-2.4, 21.4], [-2, 13.6]], t: [0.1, 0.8] },
              d5: { path: [[3.4, 7.8]], t: [0.45, 0.85] },
            },
          },
        ],
      },
      {
        id: 'stay-home',
        label: '그대로',
        why: '두 수비가 자기 선수에게만 붙어 있으면, 고스트가 빠지며 비운 공간이 핸들러의 1대1 무대가 됩니다.',
        steps: [
          {
            title: '그대로',
            dur: 1.4,
            text: '두 수비 모두 자기 선수만 따라갑니다. [x2]는 3점 라인 밖으로 빠지는 [2]를 끝까지 따라 나가지만, 그만큼 코트 가운데가 텅 빕니다.',
            move: { o2: { path: [[-6.6, 28.6], [-13.6, 25.8]], t: [0.1, 0.75] } },
            def: { d2: { sag: 0 } },
          },
          {
            title: '돌파 & 레이업',
            dur: 1.9,
            text: '[1]이 [2]가 비운 공간으로 [x1]과 1대1 돌파를 시작해 림까지 가서 레이업을 올립니다.',
            move: { o1: { path: [[-3.4, 27.4], [-4, 17.6], [-2, 9.2]], t: [0, 0.85] } },
            ball: [{ type: 'shot', at: 0.93, pts: 2 }],
            def: { d1: { lag: 0.5 }, d2: { sag: 0 }, d3: { sag: 0.5 } },
          },
        ],
      },
    ],
  },
};
