// 존 수비 표. 공이 여덟 앵커 자리에 있을 때 존 수비수 각자가 설 자리와, 누가 공을 맡는지 적어 둔다.
// 그 사이의 공 위치에서는 앵커까지 거리의 제곱에 반비례하는 가중치로 섞는다(앵커에서는 표와 정확히 같다).
// 엔진과 DOM에 의존하지 않는다. 좌표는 engine.js와 같다: x는 좌우(공격 기준 왼쪽이 −), z는 베이스라인에서의 거리(ft).

export const ANCHORS = {
  top: [0, 27],
  wingL: [-17, 21],
  wingR: [17, 21],
  cornerL: [-21.5, 3],
  cornerR: [21.5, 3],
  high: [0, 17],
  blockL: [-6, 6],
  blockR: [6, 6],
};

const SIDES = { wingL: 'wingR', cornerL: 'cornerR', blockL: 'blockR' };

// 왼쪽 앵커 표로 오른쪽 앵커 표를 만든다: x를 뒤집고, 좌우가 바뀌는 수비수 번호를 swap으로 맞바꾼다
export function mirror(at, swap) {
  const out = { ...at };
  const s = (d) => swap[d] ?? d;
  for (const [l, r] of Object.entries(SIDES)) {
    out[r] = {
      ball: s(at[l].ball),
      spots: Object.fromEntries(Object.entries(at[l].spots).map(([d, [x, z]]) => [s(d), [-x, z]])),
    };
  }
  return out;
}

const zone = (members, outline, swap, at) => ({ members, outline, swap, at: mirror(at, swap) });

export const ZONES = {
  // 2-3: x1 왼쪽 가드, x2 오른쪽 가드, x3 왼쪽 뒷선, x4 오른쪽 뒷선, x5 가운데
  '2-3': zone(['d1', 'd2', 'd3', 'd4', 'd5'], ['d1', 'd2', 'd4', 'd5', 'd3'], { d1: 'd2', d2: 'd1', d3: 'd4', d4: 'd3' }, {
    // 탑: x1이 공, x2는 오른쪽 엘보로 내려서고, x3·x4는 레인 바로 밖(z 8), x5는 림 앞
    top: { ball: 'd1', spots: { d1: [-2, 23.5], d2: [8.6, 20], d3: [-9.2, 8], d4: [9.2, 8], d5: [0, 9] } },
    // 윙: x1이 공, x2는 하이포스트, x3는 숏코너 쪽으로 내려가 코너 패스에 대비, x5는 공 쪽 블록, x4는 반대쪽 림 앞
    wingL: { ball: 'd1', spots: { d1: [-14.6, 19.2], d2: [-2, 18], d3: [-13.6, 8.4], d4: [2.6, 6.6], d5: [-6.4, 6.8] } },
    // 코너: x3가 공, x1은 윙으로 돌려주는 패스를 막으러 내려서고, x5는 공 쪽 블록 옆, x2는 공 쪽 엘보, x4는 림 앞
    cornerL: { ball: 'd3', spots: { d1: [-14.4, 13.6], d2: [-6.6, 17.4], d3: [-18.4, 5], d4: [0.8, 6.2], d5: [-7.4, 5.2] } },
    // 하이포스트: x5가 올라와 공, x1·x2는 안으로 좁히고, x3·x4는 블록으로
    high: { ball: 'd5', spots: { d1: [-5.6, 21.4], d2: [5.6, 21.4], d3: [-6.6, 7], d4: [6.6, 7], d5: [0, 13.6] } },
    // 블록: x5가 위쪽에서, x3가 베이스라인 쪽에서 포스트를 막고, x1은 처지고, x2는 하이포스트, x4는 반대쪽 림
    blockL: { ball: 'd5', spots: { d1: [-9.6, 13.4], d2: [-1.4, 15.6], d3: [-8.8, 3.2], d4: [2.8, 5.4], d5: [-3.6, 8.6] } },
  }),

  // 3-2(1-2-2): x1 탑, x2 왼쪽 윙, x3 오른쪽 윙, x4 왼쪽 뒷선, x5 오른쪽 뒷선
  '3-2': zone(['d1', 'd2', 'd3', 'd4', 'd5'], ['d1', 'd3', 'd5', 'd4', 'd2'], { d2: 'd3', d3: 'd2', d4: 'd5', d5: 'd4' }, {
    // 탑: x1이 공, x2·x3는 엘보 바깥, x4·x5는 블록 바로 바깥(레인 선 밖, 수비 3초)
    top: { ball: 'd1', spots: { d1: [0, 23.6], d2: [-11.4, 20], d3: [11.4, 20], d4: [-8.6, 7.2], d5: [8.6, 7.2] } },
    // 윙: x2가 공, x1은 공 쪽 엘보, x3는 하이포스트, x4는 블록의 코너 쪽, x5는 레인을 건너온다
    wingL: { ball: 'd2', spots: { d1: [-7.6, 20.4], d2: [-14.6, 18.8], d3: [0.6, 17.2], d4: [-11.4, 6], d5: [-5.6, 6.8] } },
    // 코너: x4가 공, x2는 윙 아래로 내려서고, x5는 공 쪽 블록, x1은 하이포스트, x3는 반대쪽 림
    cornerL: { ball: 'd4', spots: { d1: [-2.6, 17], d2: [-15, 11.6], d3: [3.4, 7.4], d4: [-18.4, 5], d5: [-8.4, 6.2] } },
    // 하이포스트: x4가 올라와 공, x1은 뒤로 내려서 밖으로 빼는 패스를 막고, x2·x3는 좁히고, x5는 가운데로
    high: { ball: 'd4', spots: { d1: [0, 21.4], d2: [-8.6, 17.6], d3: [8.6, 17.6], d4: [-2.4, 12.6], d5: [3.2, 7.2] } },
    // 블록: x4가 포스트, x2가 파고들어 돕고, x5는 레인을 건너오고, x1은 엘보, x3는 반대쪽
    blockL: { ball: 'd4', spots: { d1: [-6.6, 17.6], d2: [-9.6, 11.2], d3: [4.6, 10.4], d4: [-8.4, 3.6], d5: [-1.8, 8.2] } },
  }),

  // 1-3-1: x1 탑, x2·x3 왼쪽·오른쪽 윙, x5 가운데(하이포스트), x4 베이스라인
  '1-3-1': zone(['d1', 'd2', 'd3', 'd4', 'd5'], ['d1', 'd3', 'd4', 'd5', 'd2'], { d2: 'd3', d3: 'd2' }, {
    // 탑: x1이 공, x2·x3는 엘보 바깥, x5는 하이포스트, x4는 림 앞
    top: { ball: 'd1', spots: { d1: [0, 23.6], d2: [-13, 20.4], d3: [13, 20.4], d4: [0, 7.4], d5: [0, 16.6] } },
    // 윙: x2가 공, x1은 위쪽에서 함께 덫(트랩), x5는 공 쪽 로포스트, x4는 공 쪽 코너, x3는 반대쪽 엘보
    wingL: { ball: 'd2', spots: { d1: [-10.6, 22.6], d2: [-14.6, 18.8], d3: [6.6, 18.4], d4: [-17.6, 6.4], d5: [-7.4, 9.6] } },
    // 코너: x4가 공, x2가 덫, x5는 공 쪽 블록 앞, x1은 공 쪽 엘보, x3는 림
    cornerL: { ball: 'd4', spots: { d1: [-8.8, 17.6], d2: [-16, 10.6], d3: [-1.4, 7.6], d4: [-18.4, 5], d5: [-8.4, 6.6] } },
    // 하이포스트: x5가 공, x2·x3는 좁히고, x4는 림, x1은 뒤에서 내려선다
    high: { ball: 'd5', spots: { d1: [0, 22.4], d2: [-6.6, 18.6], d3: [6.6, 18.6], d4: [0, 7.4], d5: [0, 13.6] } },
    // 블록: x4가 포스트, x5는 위에서, x2는 파고들어 돕고, x1은 공 쪽 엘보, x3는 반대쪽 림
    blockL: { ball: 'd4', spots: { d1: [-7.8, 17.6], d2: [-10.4, 11], d3: [2.6, 7.8], d4: [-8.4, 3.6], d5: [-4.6, 9.8] } },
  }),
};

// 매치업 존: 2-3과 같은 모양·번호·표에, 구역(area) 안에 들어온 공격수에게 끌려가는 맨투맨 성격을 더한다
ZONES.matchup = { ...ZONES['2-3'], mode: 'area' };

// 공 위치 ball {x, z}에서 각 존 수비수의 자리와 공 담당 가중치(합 1)
export function zoneSpots(name, ball) {
  const z = ZONES[name];
  const ws = [];
  for (const [a, [ax, az]] of Object.entries(ANCHORS)) {
    const d2 = (ball.x - ax) ** 2 + (ball.z - az) ** 2;
    if (d2 < 1e-12) { ws.length = 0; ws.push([a, 1]); break; }
    ws.push([a, 1 / d2]);
  }
  const sum = ws.reduce((s, [, w]) => s + w, 0);
  const spots = Object.fromEntries(z.members.map((d) => [d, { x: 0, z: 0 }]));
  const ballW = Object.fromEntries(z.members.map((d) => [d, 0]));
  for (const [a, w0] of ws) {
    const w = w0 / sum, at = z.at[a];
    for (const d of z.members) { spots[d].x += at.spots[d][0] * w; spots[d].z += at.spots[d][1] * w; }
    ballW[at.ball] += w;
  }
  return { spots, ballW };
}
