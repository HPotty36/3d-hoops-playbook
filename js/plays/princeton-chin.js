// 프린스턴 친 (Princeton Chin)
export default {
  id: 'princeton-chin',
  name: '프린스턴 친',
  category: 'system',
  difficulty: 3,
  aliases: ['chin', 'chin cut', 'chin series', '친 컷'],
  summary:
    '두 가드가 슬롯에, 두 포워드가 윙에, 센터가 하이포스트에 서는 **2-2-1** 대형에서 시작합니다. 슬롯끼리 패스한 [1]이 하이포스트 [5]의 백스크린을 타고 림으로 컷하고(**친 컷**), 막히면 [5]가 이어서 플레어 스크린을 겁니다. 패스와 컷, 백도어를 끊임없이 이어 가는 모션 오펜스의 대표 동작입니다.',
  when:
    '빅맨도 패스를 잘하는 팀이, 수비가 패스 길을 공격적으로 막을 때 씁니다.',
  keys: [
    '[1]은 [2]에게 패스한 뒤 잠깐 멈춰, [x1]이 공 쪽을 보게 만듭니다.',
    '[5]는 하이포스트에서 내려와 [x1]의 등 뒤, 림 쪽에 섭니다(**백스크린**).',
    '[1]은 [5]의 어깨를 스치며 림으로 컷합니다. 막히면 멈추지 말고 빈자리로 빠집니다.',
    '[5]는 컷이 끝나면 바로 다음 스크린(**플레어 스크린**)을 찾아 움직입니다.',
  ],
  counters: [
    { name: '스크린에 걸림', desc: '[x1]이 백스크린에 걸립니다. 림으로 컷하는 [1]이 비어 있습니다.', read: 'caught' },
    { name: '도움 수비', desc: '[x5]가 [1]의 컷을 막으러 내려옵니다. 그 대신 [5]의 다음 스크린을 바꿔 막을 사람이 없습니다.', read: 'help' },
    { name: '위로 쫓기', desc: '[x1]이 스크린 위로 [1]을 바짝 쫓아갑니다. 컷은 막지만, 밖으로 빠진 [1]에게 급하게 달려 나와야 합니다.', read: 'chase-over' },
  ],
  famous:
    '프린스턴 대학교의 피트 캐릴 감독이 다듬었고, 2000년대 초 새크라멘토 킹스가 프로 무대에서 꽃피웠습니다.',

  en: {
    name: 'Princeton Chin',
    summary:
      'It starts from the **2-2-1** set: two guards at the slots, two forwards on the wings, the center at the high post. After a slot-to-slot pass, [1] cuts to the rim off a back screen from [5] at the high post (the **chin cut**); if that is covered, [5] follows with a flare screen. It is a signature action of a motion offense that strings passes, cuts and backdoors together without stopping.',
    when:
      'For teams whose bigs can pass, especially against a defense that aggressively denies passing lanes.',
    keys: [
      '[1] passes to [2] and pauses for a moment so [x1] turns to look at the ball.',
      '[5] steps down from the high post and stands behind [x1], on the rim side (the **back screen**).',
      '[1] cuts off [5]\'s shoulder to the rim. If it is covered, keep moving into open space.',
      'As soon as the cut is over, [5] moves on to the next screen (the **flare screen**).',
    ],
    counters: [
      { name: 'Caught on the screen', desc: '[x1] runs into the back screen. [1] is open cutting to the rim.' },
      { name: 'Help', desc: '[x5] drops to stop [1]\'s cut. Then nobody is left to switch [5]\'s next screen.' },
      { name: 'Chase over', desc: '[x1] chases [1] tight over the top of the screen. It stops the cut, but [x1] has to rush out when [1] pops to the wing.' },
    ],
    famous:
      'Refined by Pete Carril at Princeton University, and brought to the pro game by the Sacramento Kings of the early 2000s.',
    steps: [
      { title: 'Slot pass & back screen', text: '[1] passes from the left slot to [2] on the right, and [5] steps down from the high post to stand behind [x1], on the rim side (the **back screen**).' },
      { title: 'Chin cut', text: '[1] cuts off [5]\'s back screen toward the rim (the **chin cut**). [x1], who was watching the ball, runs into [5] and falls behind.' },
      { title: 'Layup', text: '[2] bounces it to [1] cutting to the rim, and [1] lays it in.' },
    ],
    reads: {
      prompt: 'How does the defense handle [5]\'s back screen for [1]?',
      base: { label: 'Caught on the screen', why: 'If [x1] runs into the back screen, [1] is open all the way to the rim.' },
      options: [
        {
          label: 'Help', why: 'If [x5] drops to stop the cut, nobody is left to switch [5]\'s next screen. A flare screen frees a three up top.',
          steps: [
            { title: 'Help', text: '[x5] leaves [5] to cut off [1] in the lane (the **help**). [5] heads straight for [x3] on the left wing to set the next screen.' },
            { title: 'Flare & top three', text: '[3] fades off [5]\'s screen up to the left slot (the **flare**), catches the skip pass from [2] and shoots the three. [x3] is stuck on [5].' },
          ],
        },
        {
          label: 'Chase over', why: 'If [x1] chases tight over the top, the cut is gone. Pop out instead and drive past [x1] rushing out.',
          steps: [
            { title: 'Chase over', text: '[x1] stays on [1]\'s hip and chases over the top of the screen (the **chase over**). [1] stops the cut and pops out to the left wing, and [3] slides down to the corner to make room.' },
            { title: 'Attack the closeout', text: 'As [1] catches the pass from [2], [x1] rushes out (the **closeout**). [1] drives past along the baseline and lays it in.' },
          ],
        },
      ],
    },
  },

  start: { o1: [-10, 27], o2: [10, 27], o3: [-21, 17], o4: [21, 17], o5: [0, 19.5] },
  ball: 'o1',
  steps: [
    {
      title: '슬롯 패스 & 백스크린',
      dur: 1.8,
      text: '왼쪽 슬롯의 [1]이 오른쪽 슬롯의 [2]에게 패스하고, 하이포스트의 [5]가 내려와 [x1]의 등 뒤, 림 쪽에 섭니다(**백스크린**).',
      move: { o5: { path: [[-3.6, 19.4], [-6.4, 19.8]], t: [0.35, 1] } },
      ball: [{ type: 'pass', to: 'o2', at: 0.3 }],
      screens: [{ by: 'o5', face: [-8, 22.6], hold: 0.5 }],
      def: { d1: { sag: 0 }, d5: { sag: 0 }, d3: { sag: 0.2 } },
    },
    {
      title: '친 컷',
      dur: 1.9,
      text: '[1]이 [5]의 백스크린을 스치며 림을 향해 컷합니다(**친 컷**). 공을 보던 [x1]은 [5]에게 걸려 뒤처집니다.',
      move: { o1: { path: [[-6.4, 25.6], [-3.6, 21.4], [-2.6, 14.6], [-1.2, 8.6]], t: [0.05, 0.9] } },
      screens: [{ by: 'o5', face: [-8, 22.6], hold: 0.4, on: 'd1' }],
      def: { d1: { path: [[-7.4, 23.4], [-5.4, 21.6], [-3.6, 16.6]], t: [0.15, 1] }, d3: { sag: 0.2 } },
    },
    {
      title: '레이업',
      dur: 1.6,
      text: '[2]가 림으로 컷하는 [1]에게 바운스 패스를 넣고, [1]이 레이업으로 마무리합니다.',
      move: { o1: { path: [[-0.6, 7]], t: [0, 0.35] } },
      ball: [
        { type: 'bounce', to: 'o1', at: 0.05 },
        { type: 'shot', at: 0.62, pts: 2 },
      ],
      def: { d1: { path: [[-2.4, 11.6]], t: [0, 0.7] } },
    },
  ],

  // 수비 대응별 분기: 슬롯 패스와 백스크린(1단계) 뒤에 갈라진다. 기본(위 2·3단계)은 스크린에 걸림.
  reads: {
    at: 1,
    prompt: '수비는 [1]을 위한 [5]의 백스크린을 어떻게 막을까요?',
    base: { id: 'caught', label: '스크린에 걸림', why: '[x1]이 백스크린에 걸리면 림까지 컷하는 [1]이 비어 있습니다.' },
    options: [
      {
        id: 'help',
        label: '도움 수비',
        why: '[x5]가 컷을 막으러 내려오면, [5]의 다음 스크린을 바꿔 막을 사람이 없습니다. 플레어 스크린으로 탑에서 3점을 만듭니다.',
        steps: [
          {
            title: '도움 수비',
            dur: 1.9,
            text: '[x5]가 [5]를 떠나 [1]의 컷 앞을 막습니다(**도움 수비**). [5]는 곧바로 왼쪽 윙의 [x3] 쪽으로 가서 스크린을 겁니다.',
            move: {
              o1: { path: [[-6.4, 25.6], [-3.6, 21.4], [-2.4, 13.6]], t: [0.05, 0.8] },
              o5: { path: [[-11.2, 20], [-14.6, 20.4]], t: [0.45, 1] },
            },
            def: {
              d1: { path: [[-7.4, 23.4], [-5.4, 21.6], [-4.4, 17.2]], t: [0.15, 1] },
              d5: { path: [[-3.4, 14.4], [-1.8, 10.8]], t: [0.2, 0.75] },
              d3: { sag: 0.2 },
            },
          },
          {
            title: '플레어 & 탑 3점',
            dur: 1.9,
            text: '[3]이 [5]의 스크린을 끼고 공에서 멀어지며 왼쪽 슬롯으로 퍼지고(**플레어**), [2]의 스킵 패스를 받아 3점을 던집니다. [x3]는 [5]에게 막혔습니다.',
            move: {
              o3: { path: [[-19.8, 22], [-14.4, 26.2]], t: [0, 0.6] },
              o1: { path: [[-7.6, 7.4]], t: [0, 0.5] },
            },
            screens: [{ by: 'o5', face: [-17.6, 16.6], hold: 0.4, on: 'd3' }],
            ball: [
              { type: 'skip', to: 'o3', at: 0.5 },
              { type: 'shot', at: 0.93, pts: 3 },
            ],
            def: { d3: { path: [[-16.8, 18.4], [-16.6, 21.6]], t: [0.1, 0.8] } },
          },
        ],
      },
      {
        id: 'chase-over',
        label: '위로 쫓기',
        why: '[x1]이 스크린 위로 바짝 쫓아오면 컷은 막힙니다. 대신 [1]이 밖으로 빠져, 급하게 달려 나오는 [x1]을 돌파로 공략합니다.',
        steps: [
          {
            title: '위로 쫓기',
            dur: 1.8,
            text: '[x1]이 [1]의 엉덩이에 붙어 스크린 위로 쫓아옵니다(**위로 쫓기**). [1]은 컷을 멈추고 왼쪽 윙으로 빠지고, [3]은 코너로 내려가 자리를 비워 줍니다.',
            move: {
              o1: { path: [[-7.4, 25.2], [-10.6, 22.8], [-17.8, 20.6]], t: [0.05, 0.9] },
              o3: { path: [[-22.6, 5.6]], t: [0, 0.6] },
            },
            def: { d1: { path: [[-8.6, 25.4], [-11.2, 24.8], [-14.6, 22.8]], t: [0.05, 0.85] }, d3: { sag: 0.2 } },
          },
          {
            title: '클로즈아웃 공략',
            dur: 2.6,
            text: '[2]의 패스를 받는 순간 [x1]이 급하게 달려 나옵니다(**클로즈아웃**). [1]은 그 옆을 지나 베이스라인으로 파고들어 레이업을 올립니다.',
            move: { o1: { path: [[-17.6, 14.6], [-12.6, 8.4], [-7.2, 6.8]], t: [0.38, 0.92] } },
            ball: [
              { type: 'skip', to: 'o1', at: 0.05 },
              { type: 'shot', at: 0.96, pts: 2 },
            ],
            def: { d1: { path: [[-15.8, 22.2], [-14.8, 17.4], [-9.6, 10.4]], t: [0.1, 1] } },
          },
        ],
      },
    ],
  },
};
