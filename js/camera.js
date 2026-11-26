// 카메라 프리셋(코치·중계·전술판·엔드라인·공 추적)과 부드러운 전환
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// pos는 방향만 정한다. 거리와 조준점은 아래 FIT 상자가 화면 가운데에 꼭 맞도록 정한다(공 추적은 예외).
// 엔드라인 카메라는 비스듬히, 백보드보다 높이 둔다. 이 카메라에서는 골대 지지대를 흐리게 그린다(court.fadeSupport).
const PRESETS = {
  coach:     { pos: [0, 33, 57],      target: [0, 0, 20.5] },
  broadcast: { pos: [48, 22, 26],     target: [0, 1, 19.5] },
  top:       { pos: [0, 74, 22.62],   target: [0, 0, 22.6] },
  baseline:  { pos: [8, 20, -12],     target: [0, 1, 20] },
  follow:    { pos: [0, 24, 42],      target: [0, 0, 18], need: 1.3 },
};
// 세로 화면에서는 위에서 더 내려다봐서 세로 공간을 코트로 채운다
const PORTRAIT_TILT = { coach: [0, 1, 0.3], broadcast: [0, 1, 0.3], baseline: [0, 1, -0.3] };

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
// 화면 크기가 바뀐 뒤 상자가 화면 끝에 닿거나(REFIT_OVER) 눈에 띄게 작아지면(REFIT_UNDER) 다시 맞춘다
const REFIT_OVER = 0.965, REFIT_UNDER = 0.84;
// 코트를 잃지 않도록 회전 중심을 가두는 상자와 카메라 최저 높이
const TARGET_BOX = { x: [-30, 30], y: [0, 8], z: [-6, 50] };
const MIN_CAM_Y = 1.5;
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

// 공 추적: 공보다 조금 앞(탑 쪽)을 보고, 공 앞쪽 위에서 내려다본다
const followTarget = (ball) => new THREE.Vector3(ball.x * 0.7, 0, Math.min(ball.z * 0.7 + 4, 34));
const FOLLOW_OFFSET = new THREE.Vector3(...PRESETS.follow.pos).sub(new THREE.Vector3(...PRESETS.follow.target));

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
    this.reduceMotion = false;   // 움직임 줄이기: 전환을 애니메이션하지 않고 바로 옮긴다
    this.lastBall = new THREE.Vector3(...PRESETS.follow.target);
    this.fitCam = new THREE.PerspectiveCamera();
    this.fitAspect = 0;
    this.userMoved = false;
    // 한 번 누르기(탭)만으로는 사용자가 카메라를 옮긴 것으로 치지 않는다. 실제로 끌거나 휠·핀치로 카메라가 움직였을 때만.
    // OrbitControls는 끌기·휠 이벤트 안에서 바로 update()를 불러 'change'를 낸다. 전환(tween)이나 공 추적 중에는
    // 이 리그가 매 프레임 부르는 update()도 'change'를 내므로, 그때 나는 'change'는 사용자 조작으로 치지 않는다
    let dragging = false;
    this.selfUpdate = false;
    this.controls.addEventListener('start', () => { dragging = true; });
    this.controls.addEventListener('end', () => { dragging = false; });
    this.controls.addEventListener('change', () => {
      if (dragging && !this.selfUpdate) { this.tween = null; this.userMoved = true; }
    });
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

  // 거리만 맞추면 상자가 화면 한쪽(중계·엔드라인은 아래, 세로 코치는 위)으로 쏠린다.
  // 상자의 화면 중심이 가리키는 바닥 지점으로 조준점을 옮기고 거리를 다시 맞추기를 반복해 가운데에 꼭 맞춘다
  fitPose(dir, target, points) {
    const c = this.fitCam;
    const t = target.clone();
    const v = new THREE.Vector3();
    let d = 0, stale = true;
    for (let i = 0; i < 8; i++) {
      d = this.fitDistance(dir, t, points);
      stale = false;
      c.position.copy(t).addScaledVector(dir, d);
      c.lookAt(t);
      c.updateMatrixWorld();
      let x0 = Infinity, x1 = -Infinity, y0 = Infinity, y1 = -Infinity;
      for (const p of points) {
        v.copy(p).project(c);
        x0 = Math.min(x0, v.x); x1 = Math.max(x1, v.x); y0 = Math.min(y0, v.y); y1 = Math.max(y1, v.y);
      }
      const cx = (x0 + x1) / 2, cy = (y0 + y1) / 2;
      if (Math.abs(cx) < 0.004 && Math.abs(cy) < 0.004) break;
      v.set(cx, cy, 0.5).unproject(c).sub(c.position);
      if (v.y > -1e-3) break;   // 그 지점이 바닥 쪽이 아니면 옮기지 않는다
      const hit = c.position.clone().addScaledVector(v, (t.y - c.position.y) / v.y);
      const nx = clamp(hit.x, ...TARGET_BOX.x), nz = clamp(hit.z, ...TARGET_BOX.z);
      if (Math.abs(nx - t.x) < 0.01 && Math.abs(nz - t.z) < 0.01) break;
      t.x = nx; t.z = nz;
      stale = true;
    }
    if (stale) d = this.fitDistance(dir, t, points);   // 마지막에 조준점을 옮겼으면 그 자리에 맞는 거리로
    return { pos: t.clone().addScaledVector(dir, d), target: t };
  }

  // 공 추적은 상자에 맞추지 않고 공 주변을 본다. 좁은 화면에서는 더 물러난다
  followPose(ball) {
    const aspect = this.camera.aspect, need = PRESETS.follow.need;
    const k = aspect < need ? Math.min(2.4, Math.pow(need / aspect, aspect < 1 ? 1.15 : 0.85)) : 1;
    const target = followTarget(ball || this.lastBall);
    return { pos: target.clone().addScaledVector(FOLLOW_OFFSET, k), target };
  }

  presetFor(mode, ball) {
    if (mode === 'follow') return this.followPose(ball);
    const p = PRESETS[mode];
    const target = new THREE.Vector3(...p.target);
    const dir = new THREE.Vector3(...p.pos).sub(target).normalize();
    const tilt = this.camera.aspect < 1 && PORTRAIT_TILT[mode];
    if (tilt) dir.lerp(new THREE.Vector3(...tilt).normalize(), 0.4).normalize();
    return this.fitPose(dir, target, FIT_BY_MODE[mode] || FIT_POINTS);
  }

  // 지금 화면에서 FIT 상자가 차지하는 가장 큰 좌표 (NDC, 맞춘 직후에는 FIT_MARGIN)
  extent() {
    const pts = FIT_BY_MODE[this.mode] || FIT_POINTS;
    this.camera.updateMatrixWorld();
    const v = new THREE.Vector3();
    let m = 0;
    for (const p of pts) {
      v.copy(p).project(this.camera);
      if (v.z >= 1) return Infinity;
      m = Math.max(m, Math.abs(v.x), Math.abs(v.y));
    }
    return m;
  }

  // 화면 크기가 바뀌면(창 크기, 휴대폰 회전, 캡션 높이) 사용자가 돌려 놓은 적이 없을 때만,
  // 코트가 잘리거나 눈에 띄게 작아졌을 때 지금 프리셋으로 부드럽게 다시 맞춘다
  refit() {
    const a = this.camera.aspect;
    if (this.userMoved || this.tween || !this.fitAspect) return;   // 전환 중이면 끝난 뒤 다시 부른다
    const flipped = (a < 1) !== (this.fitAspect < 1);
    if (!flipped) {
      if (Math.abs(a / this.fitAspect - 1) < 0.005) return;
      if (this.mode === 'follow') { if (Math.abs(a / this.fitAspect - 1) < 0.12) return; }
      else { const e = this.extent(); if (e >= REFIT_UNDER && e <= REFIT_OVER) return; }
    }
    this.setMode(this.mode, null, 0.6);
  }

  setMode(mode, ball, dur = 0.9) {
    if (ball) this.lastBall.copy(ball);
    if (this.reduceMotion) { this.jump(mode); return; }
    this.mode = mode;
    this.userMoved = false;
    this.fitAspect = this.camera.aspect;
    const { pos, target } = this.presetFor(mode);
    this.tween = {
      t: 0, dur,
      fromPos: this.camera.position.clone(), fromTarget: this.controls.target.clone(),
      toPos: pos, toTarget: target,
    };
  }

  jump(mode, ball) {
    if (ball) this.lastBall.copy(ball);
    const { pos, target } = this.presetFor(mode);
    this.mode = mode;
    this.userMoved = false;
    this.fitAspect = this.camera.aspect;
    this.camera.position.copy(pos);
    this.controls.target.copy(target);
    this.tween = null;
  }

  update(dt, ballPos) {
    if (ballPos) this.lastBall.copy(ballPos);
    if (this.tween) {
      const tw = this.tween;
      tw.t = Math.min(1, tw.t + dt / tw.dur);
      const e = easeInOut(tw.t);
      this.camera.position.lerpVectors(tw.fromPos, tw.toPos, e);
      this.controls.target.lerpVectors(tw.fromTarget, tw.toTarget, e);
      if (tw.t >= 1) { this.tween = null; this.refit(); }   // 전환 중에 화면 비율이 바뀌었으면 끝난 뒤 다시 맞춘다
    } else if (this.mode === 'follow' && ballPos) {
      // 공을 부드럽게 따라가되 사용자가 돌린 각도는 유지
      const delta = followTarget(ballPos).sub(this.controls.target).multiplyScalar(Math.min(1, dt * 3));
      this.controls.target.add(delta);
      this.camera.position.add(delta);
    }
    this.selfUpdate = true;
    this.controls.update();
    this.selfUpdate = false;
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
