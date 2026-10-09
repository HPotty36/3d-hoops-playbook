// NBA 규격 하프코트 (단위: ft). 바닥 라인은 캔버스 텍스처로 그리고, 골대는 3D 메시로 만든다.
import * as THREE from 'three';
import { BASKET, RIM_Y } from './engine.js';

// 바닥 텍스처가 덮는 영역: x -31..31, z -8..54 (62ft × 62ft)
const X0 = -31, Z0 = -8, SPAN = 62;

const COLORS = {
  paint: 'rgba(62, 30, 10, 0.6)',   // 페인트존: 진한 월넛 스테인 (나뭇결이 비치도록 반투명)
  line: '#f4f1ea',
};

// 테마별 장면 색: 배경(=안개), 코트 밖 바닥(에이프런), 바깥 바닥, 바닥에 새긴 글자
export const SCENE_THEMES = {
  dark: {
    bg: '#1c1a18', apron: '#2a2622', outer: '#1c1a18',
    ink: 'rgba(241, 236, 229, 1)', inkSoft: 'rgba(241, 236, 229, 0.62)', inkFaint: 'rgba(241, 236, 229, 0.36)',
  },
  light: {
    bg: '#e4e1dc', apron: '#cfcac3', outer: '#bdb8b1',
    ink: 'rgba(42, 39, 36, 0.92)', inkSoft: 'rgba(42, 39, 36, 0.58)', inkFaint: 'rgba(42, 39, 36, 0.4)',
  },
};

// 로고 마크(assets/logo-mark.svg)를 캔버스에 그린다. (cx, cy) 중심, size px
export function drawMark(g, cx, cy, size) {
  const k = size / 48;
  g.save();
  g.translate(cx - size / 2, cy - size / 2);
  g.scale(k, k);
  g.fillStyle = '#EE7A3A';
  g.beginPath(); g.roundRect(0, 0, 48, 48, 14); g.fill();
  g.fillStyle = g.strokeStyle = '#1D1B19';
  g.beginPath(); g.roundRect(11, 10, 7.5, 28, 3.75); g.fill();
  g.beginPath(); g.roundRect(29.5, 10, 7.5, 28, 3.75); g.fill();
  g.lineCap = g.lineJoin = 'round';
  g.lineWidth = 5;
  g.beginPath(); g.moveTo(18.2, 30.2); g.lineTo(25.6, 23.2); g.stroke();
  g.lineWidth = 2.4;
  g.beginPath(); g.moveTo(30.6, 18); g.lineTo(28.4, 27.3); g.lineTo(21.2, 19.8); g.closePath(); g.fill(); g.stroke();
  g.restore();
}

function drawCourt(size, theme) {
  const tc = SCENE_THEMES[theme] ?? SCENE_THEMES.dark;
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const g = c.getContext('2d');
  const k = size / SPAN;
  const X = (x) => (x - X0) * k;
  const Z = (z) => (z - Z0) * k;

  // ─ 하드우드 ─
  g.fillStyle = '#c99a5f';
  g.fillRect(0, 0, size, size);
  const plank = 0.24; // ft
  let seed = 7;
  const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  for (let x = X0; x < X0 + SPAN; x += plank) {
    let z = Z0 - rnd() * 8;
    while (z < Z0 + SPAN) {
      const len = 6 + rnd() * 10;
      const l = 54 + rnd() * 12;
      g.fillStyle = `hsl(${30 + rnd() * 6}, ${46 + rnd() * 10}%, ${l}%)`;
      g.fillRect(X(x), Z(z), plank * k + 0.5, len * k);
      g.fillStyle = 'rgba(70,40,15,0.25)';
      g.fillRect(X(x), Z(z), plank * k, Math.max(1, k * 0.03));
      z += len;
    }
    g.fillStyle = 'rgba(60,35,12,0.18)';
    g.fillRect(X(x), 0, Math.max(1, k * 0.02), size);
  }
  // 나뭇결
  g.globalAlpha = 0.07;
  for (let i = 0; i < 2600; i++) {
    const x = X0 + rnd() * SPAN, z = Z0 + rnd() * SPAN;
    g.strokeStyle = rnd() > 0.5 ? '#5a3410' : '#fff3dc';
    g.lineWidth = Math.max(1, k * 0.03);
    g.beginPath();
    g.moveTo(X(x), Z(z));
    g.bezierCurveTo(X(x + 0.05), Z(z + 0.6), X(x - 0.05), Z(z + 1.2), X(x), Z(z + 1.6 + rnd() * 2));
    g.stroke();
  }
  g.globalAlpha = 1;

  // ─ 코트 밖(에이프런) ─
  g.fillStyle = tc.apron;
  g.fillRect(0, 0, size, Z(0));                // 베이스라인 뒤
  g.fillRect(0, 0, X(-25), size);              // 왼쪽
  g.fillRect(X(25), 0, size - X(25), size);    // 오른쪽
  g.fillRect(0, Z(47), size, size - Z(47));    // 하프라인 너머

  // ─ 페인트존 & 센터서클 ─
  g.fillStyle = COLORS.paint;
  g.fillRect(X(-8), Z(0), 16 * k, 19 * k);
  g.beginPath();
  g.arc(X(0), Z(47), 6 * k, Math.PI, 0, false);
  g.fill();

  // ─ 라인 ─
  const lw = (2 / 12) * k;
  g.strokeStyle = COLORS.line;
  g.lineWidth = lw;
  const line = (x1, z1, x2, z2) => { g.beginPath(); g.moveTo(X(x1), Z(z1)); g.lineTo(X(x2), Z(z2)); g.stroke(); };
  const arc = (cx, cz, r, a0, a1, dash) => {
    g.setLineDash(dash ? [1.2 * k, 1.1 * k] : []);
    g.beginPath(); g.arc(X(cx), Z(cz), r * k, a0, a1, false); g.stroke();
    g.setLineDash([]);
  };
  // 경계
  g.strokeRect(X(-25), Z(0), 50 * k, 47 * k);
  // 페인트
  g.strokeRect(X(-8), Z(0), 16 * k, 19 * k);
  line(-6, 0, -6, 19); line(6, 0, 6, 19);
  // 자유투 서클 (위 반원 실선, 아래 반원 점선)
  arc(0, 19, 6, 0, Math.PI, false);
  arc(0, 19, 6, Math.PI, 2 * Math.PI, true);
  // 3점 라인: 코너 22ft 직선 + 23.75ft 아크
  const r3 = 23.75;
  const zc = BASKET.z + Math.sqrt(r3 * r3 - 22 * 22);
  line(-22, 0, -22, zc); line(22, 0, 22, zc);
  const a = Math.atan2(zc - BASKET.z, 22);
  arc(BASKET.x, BASKET.z, r3, a, Math.PI - a, false);
  // 제한구역(리스트릭티드 에어리어)
  arc(BASKET.x, BASKET.z, 4, 0, Math.PI, false);
  line(-4, 4, -4, BASKET.z); line(4, 4, 4, BASKET.z);
  // 센터서클
  arc(0, 47, 6, Math.PI, 2 * Math.PI, false);
  arc(0, 47, 2, Math.PI, 2 * Math.PI, false);
  // 레인 해시마크
  for (const z of [7, 8, 11, 14]) {
    const w = z === 8 ? 1 : 2 / 12;
    g.fillStyle = COLORS.line;
    g.fillRect(X(-8.67), Z(z), 0.67 * k, w * k);
    g.fillRect(X(8), Z(z), 0.67 * k, w * k);
  }
  // 베이스라인 밖 로고 (마크 + 워드마크)
  const fs = 2.3 * k;
  g.textBaseline = 'middle';
  g.textAlign = 'left';
  g.font = `600 ${fs}px "Rubik", sans-serif`;
  const w1 = g.measureText('3D Hoops ').width;
  g.font = `400 ${fs}px "Rubik", sans-serif`;
  const w2 = g.measureText('Playbook').width;
  const markS = 3.2 * k, gap = 1.0 * k;
  const x0 = X(0) - (markS + gap + w1 + w2) / 2, cy = Z(-3.6);
  drawMark(g, x0 + markS / 2, cy, markS);
  g.fillStyle = tc.ink;
  g.font = `600 ${fs}px "Rubik", sans-serif`;
  g.fillText('3D Hoops ', x0 + markS + gap, cy + 0.06 * k);
  g.fillStyle = tc.inkSoft;
  g.font = `400 ${fs}px "Rubik", sans-serif`;
  g.fillText('Playbook', x0 + markS + gap + w1, cy + 0.06 * k);
  // 사이드라인 밖 문구
  g.textAlign = 'center';
  g.fillStyle = tc.inkFaint;
  g.font = `500 ${1.3 * k}px "Rubik", sans-serif`;
  g.save();
  g.translate(X(-28), Z(23.5));
  g.rotate(-Math.PI / 2);
  g.fillText('Half-court sets', 0, 0);
  g.restore();
  // 센터서클 안 마크
  g.globalAlpha = 0.92;
  drawMark(g, X(0), Z(44.2), 3.4 * k);
  g.globalAlpha = 1;

  return c;
}

export function buildCourt(scene, renderer, { hiRes = true, theme = 'dark' } = {}) {
  const size = hiRes ? 4096 : 2048;
  const tex = new THREE.CanvasTexture(drawCourt(size, theme));
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = renderer.capabilities.getMaxAnisotropy();

  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(SPAN, SPAN),
    new THREE.MeshStandardMaterial({ map: tex, roughness: 0.42, metalness: 0.0 })
  );
  floor.rotation.x = -Math.PI / 2;
  floor.position.set(X0 + SPAN / 2, 0, Z0 + SPAN / 2);
  floor.receiveShadow = true;
  scene.add(floor);

  // 코트 바깥의 어두운 바닥
  const outer = new THREE.Mesh(
    new THREE.CircleGeometry(220, 64),
    new THREE.MeshStandardMaterial({ color: SCENE_THEMES[theme].outer, roughness: 1 })
  );
  outer.rotation.x = -Math.PI / 2;
  outer.position.set(0, -0.03, 23);
  outer.receiveShadow = true;
  scene.add(outer);

  // 테마가 바뀌면 바닥 텍스처(에이프런·글자 색)를 다시 그리고 바깥 바닥 색을 맞춘다
  let current = theme;
  const setTheme = (next) => {
    if (next === current || !SCENE_THEMES[next]) return;
    current = next;
    tex.image = drawCourt(size, next);
    tex.needsUpdate = true;
    outer.material.color.set(SCENE_THEMES[next].outer);
  };

  return { floor, setTheme, ...buildHoop(scene) };
}

function buildHoop(scene) {
  const hoop = new THREE.Group();
  const white = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.4 });
  const pad = new THREE.MeshStandardMaterial({ color: 0x1d1f23, roughness: 0.8 });
  const steel = new THREE.MeshStandardMaterial({ color: 0x9aa3b2, roughness: 0.35, metalness: 0.7 });

  // 백보드 (폭 6ft, 높이 3.5ft, 하단 9ft, 앞면 z=4)
  const glass = new THREE.Mesh(
    new THREE.BoxGeometry(6, 3.5, 0.1),
    new THREE.MeshPhysicalMaterial({ color: 0xcfe6ff, transparent: true, opacity: 0.22, roughness: 0.05, metalness: 0, depthWrite: false })
  );
  glass.position.set(0, 10.75, 3.95);
  hoop.add(glass);
  const frame = (w, h, x, y) => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, 0.12), white);
    m.position.set(x, y, 3.98);
    hoop.add(m);
  };
  frame(6, 0.12, 0, 12.44); frame(6, 0.12, 0, 9.06); frame(0.12, 3.5, -2.94, 10.75); frame(0.12, 3.5, 2.94, 10.75);
  // 슈터 사각형 (24×18in)
  frame(2, 0.08, 0, 11.44); frame(2, 0.08, 0, 10.0); frame(0.08, 1.5, -0.96, 10.72); frame(0.08, 1.5, 0.96, 10.72);

  // 림
  const rimMat = new THREE.MeshStandardMaterial({ color: 0xff5a1f, roughness: 0.35, metalness: 0.4, emissive: 0x401000 });
  const rim = new THREE.Mesh(new THREE.TorusGeometry(0.75, 0.045, 10, 40), rimMat);
  rim.rotation.x = Math.PI / 2;
  rim.position.set(BASKET.x, RIM_Y, BASKET.z);
  rim.castShadow = true;
  hoop.add(rim);
  const neck = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.12, 0.55), rimMat);
  neck.position.set(0, RIM_Y - 0.02, 4.25);
  hoop.add(neck);

  // 그물
  const net = new THREE.Mesh(
    new THREE.CylinderGeometry(0.74, 0.46, 1.5, 16, 4, true),
    new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true, transparent: true, opacity: 0.85 })
  );
  net.position.set(BASKET.x, RIM_Y - 0.75, BASKET.z);
  hoop.add(net);

  // 지지대
  const post = new THREE.Mesh(new THREE.BoxGeometry(1.2, 12, 1.2), pad);
  post.position.set(0, 6, -6.5);
  post.castShadow = true;
  hoop.add(post);
  const base = new THREE.Mesh(new THREE.BoxGeometry(4.5, 2.4, 4), pad);
  base.position.set(0, 1.2, -7.5);
  base.castShadow = true;
  hoop.add(base);
  const arm = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.5, 10.4), steel);
  arm.position.set(0, 11.6, -1.4);
  arm.rotation.x = 0.06;
  hoop.add(arm);
  const arm2 = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.4, 8.6), steel);
  arm2.position.set(0, 9.4, -2.0);
  arm2.rotation.x = -0.25;
  hoop.add(arm2);
  const backPlate = new THREE.Mesh(new THREE.BoxGeometry(2.4, 2.2, 0.3), steel);
  backPlate.position.set(0, 10.8, 3.75);
  hoop.add(backPlate);

  scene.add(hoop);
  return { rim, net, hoop };
}
