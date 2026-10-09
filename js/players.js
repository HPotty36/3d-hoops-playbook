// 마네킹 스타일 선수 모델과 공. 포즈(달리기·수비 자세·스크린·슛)를 절차적으로 만든다.
import * as THREE from 'three';

export const TEAM = {
  off: { jersey: 0xee7a3a, shorts: 0xc2501c, css: '#ee7a3a', text: '#2a1608' },   // UI 강조색과 같은 주황
  def: { jersey: 0x3a6fd8, shorts: 0x1f4bb0, css: '#3a6fd8', text: '#ffffff' },   // UI 수비 칩과 같은 파랑
};
const MANNEQUIN = 0x4a4f57;   // 그래파이트 톤 마네킹
const SHOE = 0x111214;
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

function labelTexture(id) {
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const g = c.getContext('2d');
  const off = id[0] === 'o';
  const team = off ? TEAM.off : TEAM.def;
  g.fillStyle = team.css;
  g.strokeStyle = '#1d1b19';
  g.lineWidth = 6;
  g.beginPath();
  if (off) g.arc(64, 64, 52, 0, Math.PI * 2);
  else g.roundRect(14, 14, 100, 100, 30);
  g.fill();
  g.stroke();
  g.fillStyle = team.text;
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  g.font = `600 ${off ? 68 : 50}px "Rubik", sans-serif`;
  g.fillText(off ? id[1] : `X${id[1]}`, 64, 67);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function limb(radiusTop, radiusBottom, length, mat) {
  const pivot = new THREE.Group();
  const mesh = new THREE.Mesh(new THREE.CylinderGeometry(radiusTop, radiusBottom, length, 10), mat);
  mesh.position.y = -length / 2;
  mesh.castShadow = true;
  pivot.add(mesh);
  return pivot;
}

export function createPlayer(id) {
  const team = id[0] === 'o' ? 'off' : 'def';
  const colors = TEAM[team];
  const jersey = new THREE.MeshStandardMaterial({ color: colors.jersey, roughness: 0.55 });
  const shorts = new THREE.MeshStandardMaterial({ color: colors.shorts, roughness: 0.6 });
  const skin = new THREE.MeshStandardMaterial({ color: MANNEQUIN, roughness: 0.42, metalness: 0.15 });
  const shoe = new THREE.MeshStandardMaterial({ color: SHOE, roughness: 0.5 });

  const root = new THREE.Group();
  const body = new THREE.Group();
  root.add(body);

  // 다리
  const legL = limb(0.27, 0.2, 3.1, skin);
  const legR = limb(0.27, 0.2, 3.1, skin);
  legL.position.set(0.38, 3.3, 0);
  legR.position.set(-0.38, 3.3, 0);
  for (const leg of [legL, legR]) {
    const s = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.28, 0.85), shoe);
    s.position.set(0, -3.15, 0.18);
    s.castShadow = true;
    leg.add(s);
    body.add(leg);
  }
  // 반바지
  const sh = new THREE.Mesh(new THREE.CylinderGeometry(0.74, 0.82, 1.15, 14), shorts);
  sh.position.y = 3.25;
  sh.scale.z = 0.72;
  sh.castShadow = true;
  body.add(sh);
  // 몸통
  const torso = new THREE.Mesh(new THREE.CapsuleGeometry(0.62, 1.35, 6, 14), jersey);
  torso.position.y = 4.68;
  torso.scale.set(1.12, 1, 0.7);
  torso.castShadow = true;
  body.add(torso);
  // 머리
  const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.17, 0.2, 0.4, 8), skin);
  neck.position.y = 5.95;
  body.add(neck);
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.43, 18, 14), skin);
  head.position.y = 6.42;
  head.castShadow = true;
  body.add(head);
  // 팔
  const armL = limb(0.18, 0.14, 2.45, skin);
  const armR = limb(0.18, 0.14, 2.45, skin);
  armL.position.set(0.9, 5.5, 0);
  armR.position.set(-0.9, 5.5, 0);
  for (const arm of [armL, armR]) {
    const hand = new THREE.Mesh(new THREE.SphereGeometry(0.19, 10, 8), skin);
    hand.position.y = -2.55;
    arm.add(hand);
    body.add(arm);
  }

  // 바닥 링 (팀 색) + 강조 링
  const ring = new THREE.Mesh(
    new THREE.RingGeometry(1.0, 1.28, 40),
    new THREE.MeshBasicMaterial({ color: colors.jersey, transparent: true, opacity: 0.9, depthWrite: false })
  );
  ring.rotation.x = -Math.PI / 2;
  ring.position.y = 0.07;
  ring.renderOrder = 3;
  root.add(ring);
  const focus = new THREE.Mesh(
    new THREE.RingGeometry(1.42, 1.62, 40),
    new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0, depthWrite: false })
  );
  focus.rotation.x = -Math.PI / 2;
  focus.position.y = 0.075;
  focus.renderOrder = 3;
  root.add(focus);

  // 번호 라벨
  const label = new THREE.Sprite(new THREE.SpriteMaterial({ map: labelTexture(id), depthTest: false, transparent: true }));
  label.scale.set(1.9, 1.9, 1);
  label.position.y = 8.3;
  label.renderOrder = 20;
  root.add(label);

  // 스크린 '벽' (스크린을 거는 순간 반투명하게 표시)
  const wall = new THREE.Mesh(
    new THREE.PlaneGeometry(3.4, 6.6),
    new THREE.MeshBasicMaterial({ color: 0x67e8f9, transparent: true, opacity: 0, side: THREE.DoubleSide, depthWrite: false })
  );
  wall.renderOrder = 4;

  return {
    id, team, root, body, legL, legR, armL, armR, ring, focus, label, wall,
    heading: 0, phase: Math.random() * 6,
  };
}

// 매 프레임 포즈 적용
export function posePlayer(p, s, dt) {
  p.root.position.set(s.x, 0, s.z);

  // 방향 전환은 부드럽게
  let d = s.heading - p.heading;
  d = Math.atan2(Math.sin(d), Math.cos(d));
  p.heading += d * clamp(dt * 9, 0, 1);
  p.root.rotation.y = p.heading;

  const run = clamp(s.speed / 15, 0, 1);
  p.phase += dt * (6 + s.speed * 0.55);
  const sw = Math.sin(p.phase);
  let crouch = 0;

  // 기본: 달리기
  p.legL.rotation.set(sw * run * 0.8, 0, 0);
  p.legR.rotation.set(-sw * run * 0.8, 0, 0);
  p.armL.rotation.set(-sw * run * 0.7, 0, 0.08);
  p.armR.rotation.set(sw * run * 0.7, 0, -0.08);

  if (s.stance === 'defend') {
    crouch = 0.45;
    p.legL.rotation.z = 0.2; p.legR.rotation.z = -0.2;
    p.armL.rotation.set(-0.3, 0, 1.05); p.armR.rotation.set(-0.3, 0, -1.05);
  } else if (s.stance === 'screen') {
    crouch = 0.2;
    p.legL.rotation.set(0, 0, 0.14); p.legR.rotation.set(0, 0, -0.14);
    p.armL.rotation.set(-0.55, 0, -0.55); p.armR.rotation.set(-0.55, 0, 0.55);
  } else if (s.stance === 'shoot') {
    p.armL.rotation.set(-2.75, 0, -0.15); p.armR.rotation.set(-2.85, 0, 0.15);
  } else if (s.stance === 'hold') {
    p.armL.rotation.set(-0.95, 0, -0.35); p.armR.rotation.set(-0.95, 0, 0.35);
  } else if (s.stance === 'dribble') {
    p.armR.rotation.set(-0.55 + Math.abs(Math.sin(s.clock * Math.PI / 0.5)) * 0.25, 0, -0.25);
  }
  if (s.y > 0.05) { p.legL.rotation.x = -0.25; p.legR.rotation.x = 0.15; crouch = 0; }
  p.body.position.y = s.y - crouch;

  // 강조 링
  const fm = p.focus.material;
  const target = s.focus ? 0.55 + 0.35 * Math.sin(s.t * 6) : 0;
  fm.opacity += (target - fm.opacity) * clamp(dt * 8, 0, 1);
  p.focus.scale.setScalar(1 + (s.focus ? 0.06 * Math.sin(s.t * 6) : 0));

  // 스크린 벽
  const wm = p.wall.material;
  const wTarget = s.screenFace ? 0.28 : 0;
  wm.opacity += (wTarget - wm.opacity) * clamp(dt * 10, 0, 1);
  p.wall.visible = wm.opacity > 0.01;
  if (s.screenFace) {
    const dx = s.screenFace.x - s.x, dz = s.screenFace.z - s.z;
    const l = Math.hypot(dx, dz) || 1;
    p.wall.position.set(s.x + (dx / l) * 1.05, 3.3, s.z + (dz / l) * 1.05);
    p.wall.rotation.set(0, Math.atan2(dx, dz), 0);
  }
}

// 오른손 위치 (드리블 계산용). heading 기준으로 앞·옆 오프셋
export function handPoint(p, side = 1) {
  const h = p.heading;
  const fx = Math.sin(h), fz = Math.cos(h);
  const rx = -fz * side, rz = fx * side; // 오른쪽 = 로컬 -x
  return { x: p.root.position.x + fx * 0.75 + rx * 1.0, z: p.root.position.z + fz * 0.75 + rz * 1.0, fx, fz };
}

export function createBall() {
  const c = document.createElement('canvas');
  c.width = 512; c.height = 256;
  const g = c.getContext('2d');
  const grd = g.createLinearGradient(0, 0, 0, 256);
  grd.addColorStop(0, '#e2662a'); grd.addColorStop(0.5, '#f07a34'); grd.addColorStop(1, '#d65a22');
  g.fillStyle = grd;
  g.fillRect(0, 0, 512, 256);
  // 미세한 돌기 질감
  for (let i = 0; i < 9000; i++) {
    g.fillStyle = Math.random() > 0.5 ? 'rgba(0,0,0,0.08)' : 'rgba(255,220,180,0.08)';
    g.fillRect(Math.random() * 512, Math.random() * 256, 2, 2);
  }
  g.strokeStyle = '#1a0f08';
  g.lineWidth = 6;
  const ln = (pts) => { g.beginPath(); pts.forEach(([x, y], i) => (i ? g.lineTo(x, y) : g.moveTo(x, y))); g.stroke(); };
  ln([[0, 128], [512, 128]]);
  ln([[128, 0], [128, 256]]);
  ln([[384, 0], [384, 256]]);
  for (const cx of [0, 256, 512]) {
    g.beginPath();
    for (let y = 0; y <= 256; y += 4) {
      const x = cx + Math.sin((y / 256) * Math.PI) * 70 * (cx === 256 ? 1 : cx === 0 ? 1 : -1);
      y ? g.lineTo(x, y) : g.moveTo(x, y);
    }
    g.stroke();
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  const ball = new THREE.Mesh(
    new THREE.SphereGeometry(0.39, 32, 20),
    new THREE.MeshStandardMaterial({ map: tex, roughness: 0.75 })
  );
  ball.castShadow = true;
  return ball;
}
