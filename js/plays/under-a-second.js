// 1초 미만 (Under a Second) — 막판 작전
export default {
  id: 'under-a-second',
  name: '1초 미만',
  category: 'late',
  difficulty: 3,
  aliases: ['catch and shoot', 'tip play', '버저비터'],
  situation: { period: 4, clock: 0.9, shotClock: null, score: [97, 98] },
  summary:
    '1점 뒤진 채 0.9초가 남았고, 사이드라인에서 공을 넣습니다. 시계는 코트 안에서 공을 잡는 순간부터 흐르므로, 공을 받자마자 던지거나(**캐치 앤 슛**) 림 앞에서 바로 밀어 넣어야 합니다. [5]의 다운 스크린을 타는 [2]가 중심이고, 수비에 따라 받는 곳이 바뀝니다.',
  when:
    '경기 종료 1초 전, 드리블할 시간이 없을 때 씁니다. 공을 넣기 전까지의 움직임은 시계와 상관없으니, 그 사이에 빈 곳을 만들어 둡니다.',
  keys: [
    '시계는 공을 잡는 순간 시작합니다. 그 전의 컷과 스크린은 얼마든지 해도 됩니다.',
    '0.3초보다 적게 남았다면 림 앞에서 바로 밀어 넣는(팁) 슛만 인정됩니다. 0.9초면 받아서 던질 시간은 있습니다.',
    '[2]는 공을 받기 전에 발을 맞춰, 잡는 동작이 곧 슛 동작이 되게 합니다.',
    '[3]은 패스를 받을 사람이 아니라 받을 자리로 던집니다.',
  ],
  counters: [
    { name: '디나이', desc: '[x2]가 스크린 위로 먼저 돌아가 [2]의 캐치를 막습니다. [2]가 림으로 끊어 들어가고, 롭을 받아 바로 밀어 넣습니다.', read: 'deny' },
    { name: '스위치', desc: '[x5]가 [2]를 넘겨받으려 하지만 늦습니다. [2]가 [5]를 바짝 감아 돌아(컬) 자유투 라인 근처에서 받아 바로 던집니다.', read: 'switch' },
    { name: '오버플레이', desc: '수비 전체가 공 쪽으로 몰려 [2]를 막습니다. 반대편 코너의 [4]에게 공을 넘겨 3점을 던집니다.', read: 'overplay' },
  ],

  en: {
    name: 'Under a Second',
    summary:
      'Down one with 0.9 seconds left, inbounding from the sideline. The clock starts the moment the ball is caught on the court, so the shot has to come right off the catch (the **catch and shoot**) or be tipped in at the rim. [2], coming off [5]\'s down screen, is the main option, and where the catch happens depends on the defense.',
    when:
      'For the last second of a game, with no time to dribble. Movement before the inbound costs no time, so use it to open a gap.',
    keys: [
      'The clock starts on the catch. Cuts and screens before it are free.',
      'With less than 0.3 seconds left only a tip at the rim counts. With 0.9 there is time to catch and shoot.',
      '[2] gets the feet set before the catch, so the catch is already the shot.',
      '[3] throws to the spot where the catch will happen, not to the player.',
    ],
    counters: [
      { name: 'Deny', desc: '[x2] gets over the top of the screen first to take away [2]\'s catch. [2] cuts to the rim, catches the lob and puts it right in.' },
      { name: 'Switch', desc: '[x5] tries to take [2] but is late. [2] curls tight around [5] and catches and shoots near the free-throw line.' },
      { name: 'Overplay', desc: 'The whole defense loads up toward the ball to stop [2]. The ball goes to [4] in the opposite corner for a three.' },
    ],
    steps: [
      { title: 'Down screen', text: '[3] holds the ball out of bounds on the left sideline; the clock will not start until the catch. [2] waits on the left block while [5] comes down from the elbow and stands on [x2]\'s high side (the **down screen**). [4] waits in the right corner.' },
      { title: 'Deny', text: '[2] starts up toward the screen, but [x2] gets over the top of it first to take away the catch (the **deny**). [2] plants and cuts back to the rim, and [3] lofts the ball toward the front of the rim.' },
      { title: 'Tip-in', text: '[2] catches the lob at the rim and puts it right in before the buzzer.' },
    ],
    reads: {
      prompt: '0.9 seconds left. How does the defense play [2] coming off [5]\'s down screen?',
      base: { label: 'Deny', why: 'If [x2] jumps over the top to take away the catch, the rim behind is open. A lob to [2] there, tipped right in.' },
      options: [
        {
          label: 'Switch', why: 'If [x5] has to switch onto [2] from the other side of the screen, [x5] is late. [2] curls into the gap for a catch and shoot.',
          steps: [
            { title: 'Switch & curl', text: '[2] curls tight around [5] toward the middle (the **curl**). [x5] comes off [5] to switch onto [2] but is a step late, and [x2] is left on [5].' },
            { title: 'Catch and shoot', text: '[3] passes to [2] near the free-throw line, and [2] shoots on the catch before the buzzer.' },
          ],
        },
        {
          label: 'Overplay', why: 'If the whole defense loads up toward the ball to stop [2], the opposite corner is empty. A long pass there for a three.',
          steps: [
            { title: 'Overplay', text: '[2] starts the curl, but the defense loads up toward the ball (the **overplay**): [x2] trails tight, [x5] steps out, and [x4] leaves the right corner to stop [2] in the lane. [3] throws a long pass over the top to [4] in the right corner.' },
            { title: 'Opposite corner', text: '[4] catches in the right corner and shoots the three before the buzzer, long before [x4] can get back.' },
          ],
        },
      ],
    },
  },

  start: { o3: [-25.6, 18], o2: [-9.4, 8.2], o5: [-8.6, 18.8], o4: [22.8, 5], o1: [2, 27] },
  ball: 'o3',
  steps: [
    {
      title: '다운 스크린',
      dur: 1.6,
      text: '[3]이 왼쪽 사이드라인 밖에서 공을 듭니다. 시계는 공을 잡기 전까지 흐르지 않습니다. [2]는 왼쪽 블록에서 기다리고, [5]가 엘보에서 내려와 [x2]의 위쪽에 섭니다(**다운 스크린**). [4]는 오른쪽 코너에서 기다립니다.',
      move: { o5: { path: [[-8.4, 14], [-7.8, 10.2]], t: [0.2, 0.85] } },
      screens: [{ by: 'o5', face: [-7.3, 7.6], hold: 0.8 }],
      def: { d2: { sag: 0 }, d5: { sag: 0 }, d4: { sag: 0.2 }, d1: { sag: 0.2 } },
    },
    {
      title: '디나이',
      dur: 1.6,
      text: '[2]가 스크린 쪽으로 올라가기 시작하지만, [x2]가 스크린 위로 먼저 돌아가 캐치를 막습니다(**디나이**). [2]는 발을 딛고 림으로 끊어 들어가고, [3]이 림 앞으로 공을 높이 띄웁니다.',
      move: {
        o2: { path: [[-10.4, 10.4], [-8.6, 6.4], [-4.6, 5], [-2, 5.6]], t: [0, 0.95] },
        o3: { path: [[-22.4, 17.4]], t: [0.72, 0.98] },
      },
      ball: [{ type: 'lob', to: 'o2', at: 0.6 }],
      def: {
        d2: { path: [[-5, 6.6], [-3.6, 9.6], [-5.6, 13.4], [-9.4, 13]], t: [0, 0.55] },
        d5: { sag: 0 }, d4: { sag: 0.2 }, d1: { sag: 0.2 },
      },
    },
    {
      title: '팁 인',
      dur: 1.2,
      text: '[2]가 림 앞에서 롭을 잡아 버저가 울리기 전에 바로 밀어 넣습니다.',
      ball: [{ type: 'shot', at: 0.35, pts: 2, kind: 'dunk' }],
      def: { d2: { path: [[-6, 9.6]], t: [0, 0.7] }, d3: { sag: 0.2 }, d5: { sag: 0 }, d4: { sag: 0.2 }, d1: { sag: 0.2 } },
    },
  ],

  // 수비 대응별 분기: [5]가 다운 스크린 자리에 선 뒤(1단계) 갈라진다. 기본(위 2·3단계)은 디나이.
  reads: {
    at: 1,
    prompt: '0.9초 남았습니다. 수비는 [5]의 다운 스크린을 타고 나오는 [2]를 어떻게 막을까요?',
    base: { id: 'deny', label: '디나이', why: '[x2]가 캐치를 막으려 스크린 위로 먼저 돌아가면 뒤쪽 림 앞이 빕니다. 그곳의 [2]에게 롭을 띄워 바로 밀어 넣습니다.' },
    options: [
      {
        id: 'switch',
        label: '스위치',
        why: '[x5]가 스크린 반대편에서 [2]를 넘겨받으려 하면 늦습니다. [2]가 그 틈으로 감아 돌아 받아서 바로 던집니다.',
        steps: [
          {
            title: '스위치 & 컬',
            dur: 1.8,
            text: '[2]가 [5]를 바짝 감아 돌아 가운데로 들어옵니다(**컬**). [x5]가 [5]를 떠나 [2]를 넘겨받으려 하지만 한 발 늦고, [x2]는 [5]에게 남습니다.',
            move: {
              o2: { path: [[-10.6, 10.6], [-9.6, 13.2], [-6.4, 15.6], [-3.6, 20.2]], t: [0, 0.85] },
              o3: { path: [[-24.8, 17.8]], t: [0.9, 1] },
            },
            ball: [{ type: 'pass', to: 'o2', at: 0.85 }],
            screens: [{ by: 'o5', face: [-7.3, 7.6], hold: 0.3, on: 'd2' }],
            def: {
              d5: { guard: 'o2', path: [[-5, 12.4], [-5, 15]], t: [0.3, 0.95] },
              d2: { guard: 'o5', path: [[-8.8, 8.2]], t: [0.05, 0.4] },
              d4: { sag: 0.2 }, d1: { sag: 0.2 },
            },
          },
          {
            title: '캐치 앤 슛',
            dur: 1.6,
            text: '[2]가 자유투 라인 근처에서 공을 받자마자 던지고, 공은 버저 전에 손을 떠납니다.',
            move: { o3: { path: [[-22.4, 17.4]], t: [0, 0.4] } },
            ball: [{ type: 'shot', at: 0.25, pts: 2 }],
            def: { d5: { path: [[-4.6, 16]], t: [0, 0.5] }, d2: { sag: 0 }, d3: { sag: 0.2 }, d4: { sag: 0.2 }, d1: { sag: 0.2 } },
          },
        ],
      },
      {
        id: 'overplay',
        label: '오버플레이',
        why: '수비 전체가 [2]를 막으려 공 쪽으로 몰리면 반대편 코너가 빕니다. 그곳으로 길게 넘겨 3점을 던집니다.',
        steps: [
          {
            title: '오버플레이',
            dur: 1.8,
            text: '[2]가 감아 돌기 시작하지만 수비가 공 쪽으로 몰립니다(**오버플레이**). [x2]가 바짝 따라붙고 [x5]가 나와 서며, [x4]는 오른쪽 코너를 비우고 레인으로 들어와 [2]를 막습니다. [3]이 수비 머리 위로 오른쪽 코너의 [4]에게 길게 던집니다.',
            move: {
              o2: { path: [[-10.6, 10.6], [-9.6, 13.2], [-6.4, 15.6]], t: [0, 0.85] },
              o3: { path: [[-22.4, 17.4]], t: [0.85, 1] },
            },
            ball: [{ type: 'skip', to: 'o4', at: 0.75 }],
            def: {
              d2: { path: [[-9.6, 8], [-11, 11.6], [-8, 14.4]], t: [0.1, 0.9] },
              d5: { path: [[-6.4, 12.4], [-4.6, 14.2]], t: [0.3, 0.8] },
              d4: { path: [[12.6, 7.8], [4, 10]], t: [0.1, 0.8] },
              d1: { sag: 0.2 },
            },
          },
          {
            title: '반대편 코너',
            dur: 1.8,
            text: '[4]가 오른쪽 코너에서 공을 받아, [x4]가 돌아오기 한참 전에 버저 전 3점을 던집니다.',
            ball: [{ type: 'shot', at: 0.35, pts: 3 }],
            def: { d4: { path: [[9.6, 8], [14.4, 6.6]], t: [0.1, 0.7] }, d2: { sag: 0 }, d3: { sag: 0.2 }, d5: { sag: 0 }, d1: { sag: 0.2 } },
          },
        ],
      },
    ],
  },
};
