// 플로피 (Floppy) — 싱글/스태거 중 선택
export default {
  id: 'floppy',
  name: '플로피',
  category: 'offball',
  difficulty: 2,
  aliases: ['floppy action', 'stagger screen', '스태거'],
  summary:
    '슈터가 림 아래에서 출발해, 양쪽에 놓인 스크린(한쪽은 싱글, 한쪽은 더블) 중 하나를 골라 타고 윙으로 뛰쳐나오는 작전입니다. 수비는 슈터가 어느 쪽으로 나올지 끝까지 알 수 없습니다.',
  when:
    '슛이 정확한 슈터에게 확실한 캐치 앤 슛 찬스를 만들어주고 싶을 때 씁니다. 경기 막판 3점이 필요할 때도 자주 나옵니다.',
  keys: [
    '슈터는 출발 전 반대쪽으로 페이크를 줘서 수비를 한쪽으로 기울게 만듭니다.',
    '스크리너는 슈터가 아니라 **슈터의 수비수**를 겨냥해 자리를 잡습니다.',
    '캐치하기 전에 발과 손을 미리 준비해서 잡자마자 쏩니다.',
    '수비가 스크린 아래로 지름길을 타면(숏컷), 슈터는 방향을 꺾어(컬) 림으로 들어갑니다.',
  ],
  counters: [
    { name: '트레일', desc: '슈터 엉덩이에 붙어 스크린을 같이 통과합니다. 3점은 막지만 컬 돌파를 내줄 수 있습니다.', read: 'trail' },
    { name: '스위치', desc: '스크리너의 수비수가 슈터를 맡습니다. 빅맨이 슈터를 쫓아야 하는 미스매치가 생깁니다.', read: 'switch' },
    { name: '탑 락킹', desc: '슈터가 원하는 위쪽 길을 미리 막아 백도어나 컬로 유도합니다.', read: 'top-lock' },
  ],
  famous:
    '리처드 해밀턴(디트로이트 피스톤스), 레이 앨런, 레지 밀러 같은 무빙 슈터의 대표 작전입니다. 요즘엔 클레이 탐슨, 던컨 로빈슨 같은 슈터에게 자주 씁니다.',

  en: {
    name: 'Floppy',
    summary:
      'A shooter starts under the rim and picks one of two sides, a single screen on one and a double screen on the other, then sprints out to the wing. The defense can\'t know which way the shooter is coming until the last moment.',
    when:
      'When you want a clean catch-and-shoot look for an accurate shooter. It is also common late in games when a three is needed.',
    keys: [
      'Before starting, the shooter fakes toward the opposite side to tilt the defender.',
      'The screeners set up on **the shooter\'s defender**, not on the shooter.',
      'The shooter gets feet and hands ready before the catch and lets it go right away.',
      'If the defender cheats under the screens (the shortcut), the shooter curls toward the rim instead.',
    ],
    counters: [
      { name: 'Trail', desc: 'Stay on the shooter\'s hip and go through the screens together. It takes away the three but can give up a curl to the rim.' },
      { name: 'Switch', desc: 'The screener\'s defender takes the shooter, leaving a big chasing a shooter.' },
      { name: 'Top-lock', desc: 'Take away the high route the shooter wants and force a backdoor cut or a curl.' },
    ],
    famous:
      'A staple for movement shooters like Richard Hamilton (Detroit Pistons), Ray Allen, and Reggie Miller. Today it is often run for shooters like Klay Thompson and Duncan Robinson.',
    steps: [
      { title: 'Floppy alignment', text: 'Shooter [2] starts under the rim. On the left, [4] waits with a **single screen**; on the right, [5] and [3] form a **double (stagger) screen**. [2] fakes left to fool the defense.' },
      { title: 'Come off the stagger', text: '[2] changes direction and runs off both stagger screens on the right, out to the wing. Hit by two screens in a row, [x2] falls well behind.' },
      { title: 'Catch & shoot', text: '[1] passes to [2] on the wing, and [2] squares up and fires a three right away (catch and shoot). If [x5] or [x3] helps on [2], screener [5] dives to the rim as the second option.' },
    ],
    reads: {
      prompt: 'How does the defense guard [2] coming off the screens?',
      base: { label: 'Caught on screens', why: 'Caught on two screens in a row, the defender falls far behind. Catch and shoot right away.' },
      options: [
        {
          label: 'Trail', why: 'A defender on the hip takes away the outside but opens the inside. Curl around the screen toward the rim.',
          steps: [
            { title: 'Trail', text: '[x2] stays tight on the hip of [2] and goes through the screens with [2] (the **trail**). Coming out to the wing now would leave no room for a three.' },
            { title: 'Curl', text: 'Instead of popping out, [2] wraps tightly around the screen from [3] and heads for the rim (the **curl**). [x2] is a step behind, and [2] catches the pass from [1] and finishes with a floater.' },
          ],
        },
        {
          label: 'Top lock', why: 'Taking away the high route leaves the way to the rim open behind. Cut backdoor.',
          steps: [
            { title: 'Top lock', text: '[x2] sits on the high side of the stagger, right where [2] wants to go (the **top lock**). The route off the screens is closed.' },
            { title: 'Backdoor cut', text: 'When the top is taken, the back is open. [2] turns and cuts to the rim (the **backdoor cut**), catches the lob from [1] and lays it in.' },
          ],
        },
        {
          label: 'Switch', why: 'When a big comes out to take the shooter, the rim that big was guarding is empty. The screener slips straight to it.',
          steps: [
            { title: 'Switch', text: 'As [2] comes off the first screen, [x5], who guards screener [5], takes over [2] (the **switch**). [x2] picks up [5] instead.' },
            { title: 'Screener slip', text: '[2] catches on the wing and the big [x5] follows. Meanwhile [5] slips to the empty rim, catches the bounce pass from [2] and lays it in.' },
          ],
        },
      ],
    },
  },

  start: { o1: [0, 32], o2: [0, 5.5], o4: [-8.8, 9], o5: [9.4, 8.8], o3: [10.4, 14.2] },
  ball: 'o1',
  steps: [
    {
      title: '플로피 대형',
      dur: 1.5,
      text: '슈터 [2]가 림 아래에서 출발합니다. 왼쪽엔 [4]의 **싱글 스크린**, 오른쪽엔 [5]·[3]의 **더블(스태거) 스크린**이 기다립니다. [2]는 왼쪽으로 가는 척 수비를 속입니다.',
      move: {
        o1: { path: [[4, 31]], t: [0, 0.8] },
        o2: { path: [[-2.8, 6.2]], t: [0.3, 0.9] },
      },
    },
    {
      title: '스태거 타고 나오기',
      dur: 1.9,
      text: '[2]가 방향을 바꿔 오른쪽 스태거 스크린을 연달아 타고 윙으로 뛰어나옵니다. 스크린 두 개에 연달아 걸린 [x2]는 한참 뒤처집니다.',
      move: {
        o2: { path: [[3.2, 6.2], [6.4, 9.5], [7.2, 13.5], [10.5, 18.8], [16.5, 22.4]], t: [0, 0.95] },
      },
      screens: [
        { by: 'o5', face: [5.5, 8.2], hold: 0.3 },
        { by: 'o3', face: [6.8, 13.4], hold: 0.3 },
      ],
      def: {
        d2: { path: [[2.2, 6.4], [6, 10.5], [8, 15.4], [10.2, 17.6], [13.2, 19.6]], t: [0.15, 1] },
      },
    },
    {
      title: '캐치 & 슛',
      dur: 1.6,
      text: '[1]이 윙의 [2]에게 패스하고, [2]는 발을 맞춰 바로 3점을 던집니다(캐치 앤 슛). 만약 [x5]나 [x3]가 [2]를 도우러 나오면 스크린을 건 [5]가 림으로 파고드는 2차 옵션이 열립니다.',
      move: {
        o2: { path: [[17.5, 22.6]], t: [0, 0.2] },
        o5: { path: [[4, 7]], t: [0.15, 0.6] },
      },
      ball: [
        { type: 'pass', to: 'o2', at: 0.05 },
        { type: 'shot', at: 0.48, pts: 3 },
      ],
      def: {
        d2: { path: [[15.6, 20.4]], t: [0.1, 0.7] },
      },
    },
  ],

  // 수비 대응별 분기: 플로피 대형(1단계) 뒤에 갈라진다. 기본(위 2·3단계)은 [x2]가 스크린 두 개에 걸려 늦는 경우.
  reads: {
    at: 1,
    prompt: '수비는 스크린을 도는 슈터 [2]를 어떻게 막을까요?',
    base: { id: 'caught', label: '스크린에 걸림', why: '스크린 두 개에 연달아 걸리면 수비가 한참 뒤처집니다. 받자마자 던집니다.' },
    options: [
      {
        id: 'trail',
        label: '트레일',
        why: '엉덩이에 붙어 따라오면 바깥은 막혀도 안쪽이 열립니다. 스크린을 감아 림 쪽으로 파고듭니다.',
        steps: [
          {
            title: '트레일',
            dur: 1.8,
            text: '[x2]가 [2]의 엉덩이에 바짝 붙어 스크린을 함께 통과합니다(**트레일**). 이대로 윙으로 나가면 3점을 던질 틈이 없습니다.',
            move: { o2: { path: [[3.2, 6.2], [6.4, 9.5], [7.2, 13.5], [8.6, 15.8]], t: [0, 0.8] } },
            screens: [
              { by: 'o5', face: [5.5, 8.2], hold: 0.3 },
              { by: 'o3', face: [6.8, 13.4], hold: 0.4 },
            ],
            def: { d2: { path: [[2.2, 6.4], [5.4, 9.8], [6.4, 12.2], [7, 13.4]], t: [0.1, 0.92] } },
          },
          {
            title: '컬',
            dur: 1.7,
            text: '[2]는 바깥으로 나가지 않고 [3]의 스크린을 꽉 감아 림 쪽으로 파고듭니다(**컬**). 뒤에 붙어 있던 [x2]는 한 발 늦고, [1]의 패스를 받은 [2]가 플로터로 마무리합니다.',
            move: { o2: { path: [[7.5, 17.5], [3.6, 15.8], [1.4, 10.5]], t: [0, 0.6] } },
            ball: [
              { type: 'pass', to: 'o2', at: 0.32 },
              { type: 'shot', at: 0.78, pts: 2 },
            ],
            def: { d2: { path: [[7.6, 15.8], [5.2, 15.4]], t: [0.05, 0.75] } },
          },
        ],
      },
      {
        id: 'top-lock',
        label: '탑 락킹',
        why: '위쪽 길을 미리 막으면 그 뒤, 림까지가 빕니다. 백도어 컷으로 뒤를 찌릅니다.',
        steps: [
          {
            title: '탑 락킹',
            dur: 1.5,
            text: '[x2]가 [2]가 가려는 스태거 위쪽 길에 미리 자리를 잡습니다(**탑 락킹**). 스크린을 타고 나가는 길이 막혔습니다.',
            move: { o2: { path: [[3, 6.4], [6.2, 9.8]], t: [0, 0.7] } },
            def: { d2: { path: [[4.2, 10.6], [5, 12.2]], t: [0.1, 0.7] }, d5: { sag: 0 } },
          },
          {
            title: '백도어 컷',
            dur: 1.6,
            text: '위가 막히면 뒤가 빕니다. [2]가 방향을 틀어 림으로 끊어 들어가고(**백도어 컷**), [1]이 머리 위로 띄워 준 공을 받아 레이업으로 마무리합니다.',
            move: { o2: { path: [[4.2, 7.2], [1.6, 4.2]], t: [0, 0.45] } },
            ball: [
              { type: 'lob', to: 'o2', at: 0.2 },
              { type: 'shot', at: 0.9, pts: 2 },
            ],
            def: { d2: { path: [[5.4, 8.6]], t: [0.1, 0.6] }, d5: { sag: 0 } },
          },
        ],
      },
      {
        id: 'switch',
        label: '스위치',
        why: '빅맨이 슈터를 맡으러 나오면 그 빅맨이 지키던 림이 빕니다. 스크리너가 곧장 림으로 빠집니다.',
        steps: [
          {
            title: '스위치',
            dur: 1.6,
            text: '[2]가 첫 스크린을 지나는 순간 스크리너 [5]의 수비 [x5]가 [2]를 넘겨받습니다(**스위치**). [x2]는 대신 [5]를 맡습니다.',
            move: { o2: { path: [[3.2, 6.2], [6.4, 9.5], [7.2, 13.5], [9.4, 17.2]], t: [0, 0.9] } },
            screens: [
              { by: 'o5', face: [5.5, 8.2], hold: 0.3 },
              { by: 'o3', face: [6.8, 13.4], hold: 0.3 },
            ],
            def: { d5: { guard: 'o2' }, d2: { guard: 'o5', lag: 0.6 } },
          },
          {
            title: '스크리너 슬립',
            dur: 2.0,
            text: '[2]가 윙에서 공을 받자 빅맨 [x5]가 따라 나옵니다. 그 사이 [5]가 비어 있는 림으로 빠지고(**슬립**), [2]의 바운스 패스를 받아 레이업으로 마무리합니다.',
            move: {
              o2: { path: [[14.5, 21.4]], t: [0, 0.5] },
              o5: { path: [[6.4, 7.2], [2.2, 5.6]], t: [0.1, 0.5] },
            },
            ball: [
              { type: 'pass', to: 'o2', at: 0.06 },
              { type: 'bounce', to: 'o5', at: 0.45 },
              { type: 'shot', at: 0.84, pts: 2 },
            ],
          },
        ],
      },
    ],
  },
};
