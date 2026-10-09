// 카메라 프리셋(코치·중계·전술판·엔드라인·공 추적)과 부드러운 전환
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const PRESETS = {
  coach:     { pos: [0, 33, 57],      target: [0, 0, 20.5], need: 1.4 },
  broadcast: { pos: [48, 22, 26],     target: [0, 1, 19.5], need: 1.3 },
  top:       { pos: [0, 74, 22.62],   target: [0, 0, 22.6], need: 1.15 },
  baseline:  { pos: [0, 16, -11],     target: [0, 1, 24], need: 1.3 },
  follow:    { pos: [0, 24, 42],      target: [0, 0, 18], need: 1.3 },
};

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
    this.controls.addEventListener('start', () => { this.tween = null; });
  }

  // 화면 비율이 세로로 길면 카메라를 뒤로 뺀다
  presetFor(mode) {
    const p = PRESETS[mode];
    const aspect = this.camera.aspect;
    const target = new THREE.Vector3(...p.target);
    const pos = new THREE.Vector3(...p.pos);
    // 세로 화면에서는 위에서 더 내려다봐서 세로 공간을 코트로 채운다
    if (aspect < 1 && (mode === 'coach' || mode === 'broadcast')) {
      const off = pos.clone().sub(target);
      const len = off.length();
      off.normalize().lerp(new THREE.Vector3(0, 1, 0.3).normalize(), 0.4).normalize();
      pos.copy(target).addScaledVector(off, len);
    }
    const need = p.need;
    if (aspect < need) {
      // 세로 화면(aspect < 1)에서는 좌우 폭을 확보하려고 더 많이 물러난다
      const k = Math.min(2.4, Math.pow(need / aspect, aspect < 1 ? 1.15 : 0.85));
      pos.sub(target).multiplyScalar(k).add(target);
    }
    return { pos, target };
  }

  setMode(mode, ballPos) {
    this.mode = mode;
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
  }
}
