// 코트 바닥에 그리는 전술판 표기: 컷(실선+화살표), 드리블(지그재그), 패스(점선), 스크린(T자), 슛(점선)
import * as THREE from 'three';
import { BASKET } from './engine.js';

const COLORS = {
  cut: 0xffffff, dribble: 0xffd23f, pass: 0xff8a3d, handoff: 0xff8a3d,
  screen: 0x4fe3ff, screenMark: 0x4fe3ff, shot: 0xff4d7a,
};
const W = 0.3;          // 선 두께(ft)
const Y = 0.055;

const sub = (a, b) => ({ x: a.x - b.x, z: a.z - b.z });
const len = (a) => Math.hypot(a.x, a.z);
const unit = (a) => { const l = len(a) || 1; return { x: a.x / l, z: a.z / l }; };

function resample(pts, step) {
  const out = [pts[0]];
  let carry = 0;
  for (let i = 1; i < pts.length; i++) {
    const a = pts[i - 1], b = pts[i];
    const L = len(sub(b, a));
    let d = step - carry;
    while (d <= L) {
      out.push({ x: a.x + ((b.x - a.x) * d) / L, z: a.z + ((b.z - a.z) * d) / L });
      d += step;
    }
    carry = L - (d - step);
  }
  const last = pts[pts.length - 1];
  if (len(sub(out[out.length - 1], last)) > 1e-3) out.push(last);
  return out;
}

function pathLength(pts) {
  let L = 0;
  for (let i = 1; i < pts.length; i++) L += len(sub(pts[i], pts[i - 1]));
  return L;
}

// 경로 앞/뒤를 잘라낸다 (화살촉·선수 링과 겹치지 않도록)
function trim(pts, start, end) {
  const r = resample(pts, 0.2);
  const L = pathLength(r);
  if (L <= start + end + 0.4) return r.length > 1 ? [r[0], r[r.length - 1]] : r;
  const out = [];
  let acc = 0;
  for (let i = 0; i < r.length; i++) {
    if (i > 0) acc += len(sub(r[i], r[i - 1]));
    if (acc >= start && acc <= L - end) out.push(r[i]);
  }
  return out.length > 1 ? out : [r[0], r[r.length - 1]];
}

function dashes(pts, dash, gap) {
  const r = resample(pts, 0.15);
  const out = [];
  let cur = [], acc = 0, on = true, lim = dash;
  for (let i = 0; i < r.length; i++) {
    if (i > 0) acc += len(sub(r[i], r[i - 1]));
    if (on) cur.push(r[i]);
    if (acc >= lim) {
      if (on && cur.length > 1) out.push(cur);
      cur = on ? [] : [r[i]];
      on = !on;
      acc = 0;
      lim = on ? dash : gap;
    }
  }
  if (on && cur.length > 1) out.push(cur);
  return out;
}

function zigzag(pts, amp, wave, tail) {
  const r = resample(pts, wave / 2);
  const L = pathLength(r);
  const out = [];
  let acc = 0;
  for (let i = 0; i < r.length; i++) {
    if (i > 0) acc += len(sub(r[i], r[i - 1]));
    const a = r[Math.max(0, i - 1)], b = r[Math.min(r.length - 1, i + 1)];
    const d = unit(sub(b, a));
    const s = i === 0 || acc > L - tail ? 0 : i % 2 ? amp : -amp;
    out.push({ x: r[i].x - d.z * s, z: r[i].z + d.x * s });
  }
  return out;
}

class Builder {
  constructor() { this.pos = []; this.idx = []; }
  strip(pts, w) {
    const n = pts.length;
    if (n < 2) return;
    const base = this.pos.length / 3;
    for (let i = 0; i < n; i++) {
      const a = pts[Math.max(0, i - 1)], b = pts[Math.min(n - 1, i + 1)];
      const d = unit(sub(b, a));
      const nx = -d.z * (w / 2), nz = d.x * (w / 2);
      this.pos.push(pts[i].x + nx, Y, pts[i].z + nz, pts[i].x - nx, Y, pts[i].z - nz);
    }
    for (let i = 0; i < n - 1; i++) {
      const a = base + i * 2;
      this.idx.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
    }
  }
  tri(a, b, c) {
    const base = this.pos.length / 3;
    this.pos.push(a.x, Y, a.z, b.x, Y, b.z, c.x, Y, c.z);
    this.idx.push(base, base + 1, base + 2);
  }
  arrow(tip, dir, grow = 0) {
    const L = 1.35 + grow, H = 0.72 + grow / 2;
    const b = { x: tip.x - dir.x * L, z: tip.z - dir.z * L };
    this.tri({ x: tip.x + dir.x * grow * 0.5, z: tip.z + dir.z * grow * 0.5 },
      { x: b.x - dir.z * H, z: b.z + dir.x * H }, { x: b.x + dir.z * H, z: b.z - dir.x * H });
  }
  bar(center, dir, length, thick) {
    const p = { x: -dir.z, z: dir.x };
    const a = { x: center.x + p.x * length / 2, z: center.z + p.z * length / 2 };
    const b = { x: center.x - p.x * length / 2, z: center.z - p.z * length / 2 };
    this.strip([a, b], thick);
  }
  geometry() {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(this.pos, 3));
    g.setIndex(this.idx);
    return g;
  }
}

function buildNote(note, grow) {
  const B = new Builder();
  const w = W + grow;
  const k = note.kind;
  if (k === 'screenMark') {
    const face = note.face || { x: note.at.x, z: note.at.z - 1 };
    const d = unit(sub(face, note.at));
    B.bar({ x: note.at.x + d.x * 1.25, z: note.at.z + d.z * 1.25 }, d, 3.1 + grow, 0.42 + grow);
    return B.geometry();
  }
  if (k === 'shot') {
    const p = trim(note.pts, 1.3, 1.2);
    dashes(p, 0.35, 0.4).forEach((d) => B.strip(d, w * 0.9));
    const ring = [];
    for (let i = 0; i <= 36; i++) {
      const a = (i / 36) * Math.PI * 2;
      ring.push({ x: BASKET.x + Math.cos(a) * 1.1, z: BASKET.z + Math.sin(a) * 1.1 });
    }
    B.strip(ring, w);
    return B.geometry();
  }
  const isPass = k === 'pass' || k === 'handoff';
  const startTrim = isPass ? 1.3 : 0.2;
  const endTrim = k === 'screen' ? 0.15 : isPass ? 1.5 : 1.25;
  const p = trim(note.pts, startTrim, endTrim);
  const end = p[p.length - 1];
  const prev = p[Math.max(0, p.length - 4)];
  let dir = unit(sub(end, prev));
  if (isPass) dashes(p, 0.85, 0.55).forEach((d) => B.strip(d, w));
  else if (k === 'dribble') B.strip(zigzag(p, 0.42, 1.0, 1.4), w);
  else B.strip(p, w);

  if (k === 'screen') {
    if (note.face) dir = unit(sub(note.face, end));
    B.bar({ x: end.x + dir.x * 0.6, z: end.z + dir.z * 0.6 }, dir, 3.1 + grow, 0.42 + grow);
  } else {
    const tip = { x: end.x + dir.x * 1.2, z: end.z + dir.z * 1.2 };
    B.arrow(tip, dir, grow);
  }
  return B.geometry();
}

export class Notation {
  constructor(scene) {
    this.group = new THREE.Group();
    scene.add(this.group);
    this.steps = [];
    this.visible = true;
  }

  build(cp) {
    for (const s of this.steps) for (const m of s.meshes) { m.geometry.dispose(); m.material.dispose(); }
    this.group.clear();
    this.steps = cp.notes.map((list) => {
      const meshes = [];
      for (const note of list) {
        const outline = new THREE.Mesh(buildNote(note, 0.22),
          new THREE.MeshBasicMaterial({ color: 0x05070a, transparent: true, opacity: 0, depthWrite: false, side: THREE.DoubleSide }));
        outline.renderOrder = 5;
        outline.userData.base = 0.45;
        const line = new THREE.Mesh(buildNote(note, 0),
          new THREE.MeshBasicMaterial({ color: COLORS[note.kind], transparent: true, opacity: 0, depthWrite: false, side: THREE.DoubleSide }));
        line.renderOrder = 6;
        line.userData.base = 1;
        meshes.push(outline, line);
        this.group.add(outline, line);
      }
      return { meshes };
    });
  }

  update(t, cp) {
    this.group.visible = this.visible;
    if (!this.visible) return;
    const cur = cp.stepIndexAt(Math.max(0, t));
    this.steps.forEach((s, k) => {
      let a;
      if (k < cur) a = 0.3;
      else if (k === cur) a = Math.min(1, Math.max(0, (t - cp.steps[k].s0) / 0.35 + 0.15));
      else a = 0;
      for (const m of s.meshes) {
        m.material.opacity = a * m.userData.base;
        m.visible = a > 0.01;
      }
    });
  }
}
