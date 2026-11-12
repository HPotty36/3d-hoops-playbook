// 카메라 프리셋(코치·중계·전술판·엔드라인·공 추적)과 부드러운 전환
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// pos는 방향만 정한다. 거리는 아래 FIT 상자가 화면에 꼭 맞도록 정한다(공 추적은 예외).
// 엔드라인 카메라는 골대 지지대 너머로 보이지 않게 비스듬히, 백보드보다 높이 둔다.
const PRESETS = {
  coach:     { pos: [0, 33, 57],      target: [0, 0, 20.5] },
  broadcast: { pos: [48, 22, 26],     target: [0, 1, 19.5] },
  top:       { pos: [0, 74, 22.62],   target: [0, 0, 22.6] },
  baseline:  { pos: [8, 20, -12],     target: [0, 1, 20] },
  follow:    { pos: [0, 24, 42],      target: [0, 0, 18], need: 1.3 },
};

// 화면에 담아야 하는 상자: 사이드라인 밖 인바운더까지, 베이스라인 뒤부터 탑 위까지, 선수 번호 라벨 높이까지
const box = (z0, z1) => {
  const pts = [];
  for (const x of [-26.5, 26.5]) for (const z of [z0, z1]) for (const y of [0, 8.8]) pts.push(new THREE.Vector3(x, y, z));
  return pts;
};
const FIT_POINTS = box(-3, 38);
// 엔드라인 카메라는 베이스라인 바로 뒤에 있어 그 뒤쪽까지 담으면 코트가 너무 작아진다. 베이스라인부터 탑까지만
const FIT_BY_MODE = { baseline: box(0, 34) };
const FIT_MARGIN = 0.94;   // 화면 가장자리에서 조금 띄운다 (NDC)
// 코트를 잃지 않도록 회전 중심을 가두는 상자와 카메라 최저 높이
const TARGET_BOX = { x: [-30, 30], y: [0, 8], z: [-6, 50] };
const MIN_CAM_Y = 1.5;
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export class CameraRig {
  constructor(camera, dom) {
    this.camera = camera;
    this.controls = new OrbitControls(camera, dom);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.08;
    this.controls.maxPolarAngle = Math.PI * 0.495;
    this.controls.minDistance = 8;
    this.controls.maxDistance = 140;
    this.controls.target.set(...PRESETS.coach.target);
    this.mode = 'coach';
    this.tween = null;
    this.followTarget = new THREE.Vector3();
    this.fitCam = new THREE.PerspectiveCamera();
    this.fitAspect = 0;
    this.userMoved = false;
    this.controls.addEventListener('start', () => { this.tween = null; this.userMoved = true; });
  }

  // dir 방향에서 FIT 상자가 화면 안에 들어오는 가장 가까운 거리
  fitDistance(dir, target, points = FIT_POINTS) {
    const c = this.fitCam;
    c.fov = this.camera.fov; c.aspect = this.camera.aspect; c.near = this.camera.near; c.far = this.camera.far;
    c.updateProjectionMatrix();
    const v = new THREE.Vector3();
    const fits = (d) => {
      c.position.copy(target).addScaledVector(dir, d);
      c.lookAt(target);
      c.updateMatrixWorld();
      return points.every((p) => { v.copy(p).project(c); return v.z < 1 && Math.abs(v.x) <= FIT_MARGIN && Math.abs(v.y) <= FIT_MARGIN; });
    };
    let lo = 10, hi = 400;
    for (let i = 0; i < 28; i++) { const mid = (lo + hi) / 2; if (fits(mid)) hi = mid; else lo = mid; }
    return hi;
  }

  // 프리셋의 방향에서 코트 전체(FIT 상자)가 꼭 맞게 들어오는 거리에 카메라를 둔다
  presetFor(mode) {
    const p = PRESETS[mode];
    const aspect = this.camera.aspect;
    const target = new THREE.Vector3(...p.target);
    const pos = new THREE.Vector3(...p.pos);
    const dir = pos.clone().sub(target);
    // 세로 화면에서는 위에서 더 내려다봐서 세로 공간을 코트로 채운다
    if (aspect < 1 && (mode === 'coach' || mode === 'broadcast')) {
      dir.normalize().lerp(new THREE.Vector3(0, 1, 0.3).normalize(), 0.4);
    }
    dir.normalize();
    if (mode === 'follow') {
      // 공 추적은 공 주변만 보므로 상자에 맞추지 않고, 세로 화면에서만 조금 물러난다
      const k = aspect < p.need ? Math.min(2.4, Math.pow(p.need / aspect, aspect < 1 ? 1.15 : 0.85)) : 1;
      pos.copy(target).addScaledVector(dir, pos.distanceTo(target) * k);
    } else {
      pos.copy(target).addScaledVector(dir, this.fitDistance(dir, target, FIT_BY_MODE[mode] || FIT_POINTS));
    }
    return { pos, target };
  }

  // 화면 비율이 크게 바뀌면(휴대폰 회전, 창 크기) 사용자가 돌려 놓은 적이 없을 때만 지금 프리셋으로 다시 맞춘다
  refit() {
    const a = this.camera.aspect;
    if (this.userMoved || this.tween || this.mode === 'follow' || !this.fitAspect) return;
    const flipped = (a < 1) !== (this.fitAspect < 1);
    if (!flipped && Math.abs(a / this.fitAspect - 1) < 0.12) return;
    this.jump(this.mode);
  }

  setMode(mode, ballPos) {
    this.mode = mode;
    this.userMoved = false;
    this.fitAspect = this.camera.aspect;
    const { pos, target } = this.presetFor(mode);
    if (mode === 'follow' && ballPos) {
      target.set(ballPos.x * 0.7, 0, ballPos.z * 0.7 + 4);
      pos.copy(target).add(new THREE.Vector3(0, 22, 26).multiplyScalar(this.camera.aspect < 1.2 ? 1.5 : 1));
    }
    this.tween = {
      t: 0, dur: 0.9,
      fromPos: this.camera.position.clone(), fromTarget: this.controls.target.clone(),
      toPos: pos, toTarget: target,
    };
  }

  jump(mode) {
    const { pos, target } = this.presetFor(mode);
    this.mode = mode;
    this.userMoved = false;
    this.fitAspect = this.camera.aspect;
    this.camera.position.copy(pos);
    this.controls.target.copy(target);
    this.tween = null;
  }

  update(dt, ballPos) {
    if (this.tween) {
      const tw = this.tween;
      tw.t = Math.min(1, tw.t + dt / tw.dur);
      const e = easeInOut(tw.t);
      this.camera.position.lerpVectors(tw.fromPos, tw.toPos, e);
      this.controls.target.lerpVectors(tw.fromTarget, tw.toTarget, e);
      if (tw.t >= 1) this.tween = null;
    } else if (this.mode === 'follow' && ballPos) {
      // 공을 부드럽게 따라가되 사용자가 돌린 각도는 유지
      const desired = new THREE.Vector3(ballPos.x * 0.7, 0, Math.min(ballPos.z * 0.7 + 4, 34));
      const delta = desired.sub(this.controls.target).multiplyScalar(Math.min(1, dt * 3));
      this.controls.target.add(delta);
      this.camera.position.add(delta);
    }
    this.controls.update();
    // 끌어서 옮기거나 돌려도 코트를 잃지 않게: 회전 중심은 코트 둘레 상자 안, 카메라는 바닥 위
    const t = this.controls.target, c = this.camera.position;
    const tx = clamp(t.x, ...TARGET_BOX.x), ty = clamp(t.y, ...TARGET_BOX.y), tz = clamp(t.z, ...TARGET_BOX.z);
    if (tx !== t.x || ty !== t.y || tz !== t.z) {
      c.x += tx - t.x; c.y += ty - t.y; c.z += tz - t.z;
      t.set(tx, ty, tz);
    }
    if (c.y < MIN_CAM_Y) c.y = MIN_CAM_Y;
  }
}
