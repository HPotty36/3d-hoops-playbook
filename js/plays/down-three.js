// 동점 3점 (Down Three) — 막판 작전
export default {
  id: 'down-three',
  name: '동점 3점',
  category: 'late',
  difficulty: 2,
  aliases: ['need a three', 'tying three', '3점 필요'],
  situation: { period: 4, clock: 8, shotClock: null, score: [95, 98] },
  summary:
    '3점 뒤진 채 8초가 남았고, 사이드라인에서 공을 넣습니다. 슈터 [2]가 두 명의 스크린(**스태거**)을 타고 탑으로 올라와 **동점 3점**을 노리는 작전입니다. 2점은 소용없으니, 수비가 어떻게 막든 3점 라인 밖에서 슛이 나와야 합니다.',
  when:
    '경기 막판 3점이 꼭 필요할 때 씁니다. 시간이 넉넉하지 않으니 첫 번째나 두 번째 패스에서 슛까지 갑니다.',
  keys: [
    '모두가 3점 라인 밖에서 공을 받습니다. 림으로 가는 길이 열려도 2점은 동점이 되지 않습니다.',
    '[4]와 [5]는 [2]의 길을 따라 비스듬히 서고, [2]는 그 어깨를 스치며 올라옵니다.',
    '[x5]가 [2]에게 나가면 스크린을 건 [5]가 반대로 3점 라인 밖으로 빠집니다.',
    '[1]은 탑에서 안전한 출구가 되어, 공이 들어오면 반대편으로 돌립니다.',
  ],
  counters: [
    { name: '트레일', desc: '[x2]가 [2]의 뒤를 따라 스크린을 지납니다. 스크린에 걸린 사이 [2]가 탑에서 동점 3점을 던집니다.', read: 'trail' },
    { name: '스위치', desc: '[x5]가 나와 [2]를 넘겨받습니다. 스크린을 건 [5]가 슬롯으로 빠져(팝) 3점을 던집니다.', read: 'switch' },
    { name: '탑 락킹', desc: '[x2]가 먼저 위쪽으로 돌아가 탑을 막습니다. [2]는 베이스라인을 따라 반대편 코너로 달리고, 탑의 [1]을 거쳐 공을 받아 3점을 던집니다.', read: 'top-lock' },
  ],

  en: {
    name: 'Down Three',
    summary:
      'Down three with eight seconds left, inbounding from the sideline. The shooter, [2], comes up to the top off two screens (the **stagger**) for the **tying three**. A two does no good, so whatever the defense does, the shot has to come from behind the arc.',
    when:
      'For when a three is a must late in the game. There is not much time, so the shot comes off the first or second pass.',
    keys: [
      'Everyone catches behind the three-point line. Even an open path to the rim does not tie the game.',
      '[4] and [5] stand at an angle along [2]\'s path, and [2] comes up right off their shoulders.',
      'If [x5] goes out to [2], [5], the screener, pops the other way, behind the arc.',
      '[1] is the safe outlet at the top and swings the ball to the far side when it comes in.',
    ],
    counters: [
      { name: 'Trail', desc: '[x2] follows behind [2] through the screens. While [x2] is held up, [2] shoots the tying three at the top.' },
      { name: 'Switch', desc: '[x5] comes out and takes [2]. [5], the screener, pops out to the slot for a three.' },
      { name: 'Top lock', desc: '[x2] gets above first and takes away the top. [2] runs the baseline to the opposite corner and gets the ball through [1] at the top for a three.' },
    ],
    steps: [
      { title: 'Stagger set', text: '[3] holds the ball out of bounds on the left sideline. [4] and [5] set up one above the other on the left side (the **stagger**), their defenders on the ball side. [2] waits on the left block.' },
      { title: 'Stagger', text: '[2] comes up the inside of the stagger, off [4]\'s and then [5]\'s shoulders, toward the top. [x2] follows behind (the **trail**) and runs into [5].' },
      { title: 'Tying three', text: '[3] inbounds to [2] at the top, and [2] shoots the tying three on the catch. [3] steps onto the court.' },
    ],
    reads: {
      prompt: 'How does [x2] chase [2], who needs the tying three, through the stagger?',
      base: { label: 'Trail', why: 'If [x2] follows behind through the screens, the screens hold [x2] up and [2] gets the three at the top.' },
      options: [
        {
          label: 'Switch', why: 'If [x5] switches out onto [2], nobody is left with [5]. [5] pops behind the arc for the three.',
          steps: [
            { title: 'Switch', text: 'At [5]\'s screen, [x5] comes out and takes [2] at the top (the **switch**), and [x2], held up on the screen, is left on the inside of [5]. [5] pops out to the left slot, behind the arc (the **pop**).' },
            { title: 'Screener three', text: '[3] inbounds to [5] at the slot, and [5] shoots the tying three before [x2] gets there.' },
          ],
        },
        {
          label: 'Top lock', why: 'If [x2] races above [2] to take away the top, the far side is empty. [2] runs to the opposite corner, and the ball gets there through [1].',
          steps: [
            { title: 'Top lock', text: 'Ahead of [2], [x2] gets around to the high side, between [4]\'s and [5]\'s screens, and takes away the top (the **top lock**). [2] stops right at [4]\'s screen.' },
            { title: 'Baseline & swing', text: '[2] turns and runs along the baseline to the right corner, with [x2] chasing. [1] comes to the top and catches [3]\'s inbound pass.' },
            { title: 'Opposite-corner three', text: '[1] skips the ball to [2] in the right corner, and [2] shoots the tying three before [x2] can close out.' },
          ],
        },
      ],
    },
  },

  start: { o3: [-25.6, 18], o2: [-7, 6.6], o4: [-10, 15.2], o5: [-4, 23], o1: [9, 25] },
  ball: 'o3',
  steps: [
    {
      title: '스태거 세트',
      dur: 1.4,
      text: '[3]이 왼쪽 사이드라인 밖에서 공을 듭니다. [4]와 [5]가 왼쪽에 위아래로 비스듬히 서고(**스태거**), 두 수비는 공 쪽에 섭니다. [2]는 왼쪽 블록에서 기다립니다.',
      move: {
        o4: { path: [[-10.4, 12.8]], t: [0.2, 0.7] },
        o5: { path: [[-7.2, 20.8]], t: [0.2, 0.7] },
      },
      screens: [
        { by: 'o4', face: [-8.2, 10.4], hold: 0.6 },
        { by: 'o5', face: [-5.8, 18.6], hold: 1.1 },
      ],
      def: {
        d2: { sag: 0 },
        d4: { path: [[-12.2, 11.4]], t: [0.3, 0.9] },
        d5: { path: [[-9.4, 20.2]], t: [0.3, 0.9] },
        d1: { sag: 0.2 },
      },
    },
    {
      title: '스태거',
      dur: 2,
      text: '[2]가 스태거의 안쪽으로 [4], 이어서 [5]의 어깨를 스치며 탑으로 올라갑니다. 뒤를 따라가던 [x2]는(**트레일**) [5]에게 걸립니다.',
      move: { o2: { path: [[-7.8, 12], [-4.8, 19.4], [-2, 29.8]], t: [0, 0.92] } },
      screens: [{ by: 'o5', face: [-5.8, 18.6], hold: 0.4, on: 'd2' }],
      def: {
        d2: { path: [[-5.8, 9.4], [-6, 14.6], [-5.6, 19]], t: [0.02, 0.58] },
        d4: { path: [[-12.2, 11.4]], t: [0, 0.2] }, d5: { path: [[-9.4, 20.2]], t: [0, 0.2] }, d1: { sag: 0.2 },
      },
    },
    {
      title: '동점 3점',
      dur: 1.8,
      text: '[3]이 탑의 [2]에게 공을 넣고, [2]가 받자마자 동점 3점을 던집니다. [3]은 코트로 들어옵니다.',
      move: { o3: { path: [[-22.4, 17.4]], t: [0.15, 0.55] } },
      ball: [
        { type: 'pass', to: 'o2', at: 0.05 },
        { type: 'shot', at: 0.55, pts: 3 },
      ],
      def: { d2: { path: [[-3.6, 24.2]], t: [0, 0.6] }, d4: { path: [[-12.2, 11.4]], t: [0, 0.2] }, d5: { path: [[-9.4, 20.2]], t: [0, 0.2] }, d1: { sag: 0.2 } },
    },
  ],

  // 수비 대응별 분기: 스태거가 선 뒤(1단계) 갈라진다. 기본(위 2·3단계)은 트레일.
  reads: {
    at: 1,
    prompt: '동점 3점이 필요한 [2]를 [x2]는 스태거에서 어떻게 따라갈까요?',
    base: { id: 'trail', label: '트레일', why: '[x2]가 뒤를 따라 스크린을 지나면, 스크린에 걸려 늦은 사이 [2]가 탑에서 3점을 던집니다.' },
    options: [
      {
        id: 'switch',
        label: '스위치',
        why: '[x5]가 나와 [2]를 넘겨받으면 [5]에게 아무도 없습니다. [5]가 3점 라인 밖으로 빠져 3점을 던집니다.',
        steps: [
          {
            title: '스위치',
            dur: 2,
            text: '[5]의 스크린에서 [x5]가 나와 탑의 [2]를 넘겨받고(**스위치**), 스크린에 걸린 [x2]는 [5]의 안쪽에 남습니다. [5]는 왼쪽 슬롯, 3점 라인 밖으로 빠집니다(**팝**).',
            move: {
              o2: { path: [[-7.8, 12], [-4.8, 19.4], [-2, 29.8]], t: [0, 0.92] },
              o5: { path: [[-11.6, 22.4], [-16.2, 24.4]], t: [0.55, 0.95] },
            },
            def: {
              d2: { guard: 'o5', path: [[-5.8, 9.4], [-6, 14.6], [-5.6, 19]], t: [0.02, 0.58] },
              d5: { guard: 'o2', path: [[-6.6, 24.4], [-3.4, 27]], t: [0.45, 0.95] },
              d4: { path: [[-12.2, 11.4]], t: [0, 0.2] }, d1: { sag: 0.2 },
            },
          },
          {
            title: '스크리너 3점',
            dur: 1.8,
            text: '[3]이 슬롯의 [5]에게 공을 넣고, [5]는 [x2]가 오기 전에 동점 3점을 던집니다.',
            move: { o3: { path: [[-23, 14.6]], t: [0.25, 0.65] } },
            ball: [
              { type: 'pass', to: 'o5', at: 0.05 },
              { type: 'shot', at: 0.45, pts: 3 },
            ],
            def: { d2: { path: [[-12, 22.6]], t: [0, 0.6] }, d5: { sag: 0 }, d4: { path: [[-12.2, 11.4]], t: [0, 0.2] }, d1: { sag: 0.2 } },
          },
        ],
      },
      {
        id: 'top-lock',
        label: '탑 락킹',
        why: '[x2]가 [2]보다 먼저 위쪽으로 가서 탑을 막으면 반대편이 빕니다. [2]가 반대편 코너로 달리고, [1]을 거쳐 공이 갑니다.',
        steps: [
          {
            title: '탑 락킹',
            dur: 1.4,
            text: '[x2]가 [2]를 앞질러 위쪽으로 돌아가, [4]와 [5]의 스크린 사이에서 탑으로 가는 길을 막습니다(**탑 락킹**). [2]는 [4]의 스크린 옆에서 멈춰 섭니다.',
            move: { o2: { path: [[-8.2, 10.8]], t: [0, 0.6] } },
            def: { d2: { path: [[-4.4, 8.6], [-5.8, 12.6]], t: [0, 0.7] }, d4: { path: [[-12.2, 11.4]], t: [0, 0.2] }, d5: { path: [[-9.4, 20.2]], t: [0, 0.2] }, d1: { sag: 0.2 } },
          },
          {
            title: '베이스라인 & 스윙',
            dur: 2.8,
            text: '[2]가 돌아서 베이스라인을 따라 오른쪽 코너로 달리고, [x2]가 뒤따릅니다. [1]이 탑으로 와서 [3]의 인바운드 패스를 받습니다.',
            move: {
              o2: { path: [[-6, 4.4], [2, 2.6], [12, 3], [22.8, 4.2]], t: [0, 0.92] },
              o1: { path: [[2, 27.4]], t: [0, 0.35] },
              o3: { path: [[-22.4, 17.4]], t: [0.45, 0.8] },
            },
            ball: [{ type: 'pass', to: 'o1', at: 0.35 }],
            def: {
              d2: { path: [[-7, 8.4], [-4.6, 4.8], [4, 4.4], [14, 5]], t: [0.1, 1] },
              d4: { path: [[-12.2, 11.4]], t: [0, 0.2] }, d5: { path: [[-9.4, 20.2]], t: [0, 0.2] }, d1: { sag: 0.2 },
            },
          },
          {
            title: '반대편 코너 3점',
            dur: 1.8,
            text: '[1]이 오른쪽 코너의 [2]에게 공을 건너 보내고(**스킵 패스**), [2]는 [x2]가 달려 나오기 전에 동점 3점을 던집니다.',
            ball: [
              { type: 'skip', to: 'o2', at: 0.08 },
              { type: 'shot', at: 0.6, pts: 3 },
            ],
            def: { d2: { path: [[18.4, 5]], t: [0, 0.6] }, d4: { path: [[-12.2, 11.4]], t: [0, 0.2] }, d5: { path: [[-9.4, 20.2]], t: [0, 0.2] }, d1: { sag: 0.2 } },
          },
        ],
      },
    ],
  },
};
