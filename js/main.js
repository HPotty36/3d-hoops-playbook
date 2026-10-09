import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { compilePlay, ballAir, OFF, DEF, BASKET, dist2 } from './engine.js';
import { buildCourt } from './court.js';
import { createPlayer, posePlayer, handPoint, createBall } from './players.js';
import { Notation } from './notation.js';
import { CameraRig } from './camera.js';
import { PLAYS, CATEGORIES } from './plays/index.js';

const $ = (s) => document.querySelector(s);
const viewport = $('#viewport');
const isSmall = Math.min(screen.width, screen.height) < 700;

// ── 렌더러 / 장면 ─────────────────────────────────────────────
const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.0;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
viewport.prepend(renderer.domElement);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x07090d);
scene.fog = new THREE.Fog(0x07090d, 120, 260);
const pmrem = new THREE.PMREMGenerator(renderer);
scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

const camera = new THREE.PerspectiveCamera(42, 1, 0.5, 700);

scene.add(new THREE.HemisphereLight(0xdfe8ff, 0x2b1d10, 0.45));
const key = new THREE.DirectionalLight(0xfff1e0, 1.6);
key.position.set(18, 62, 40);
key.target.position.set(0, 0, 20);
key.castShadow = true;
key.shadow.mapSize.set(isSmall ? 1024 : 2048, isSmall ? 1024 : 2048);
Object.assign(key.shadow.camera, { left: -38, right: 38, top: 38, bottom: -38, near: 10, far: 160 });
key.shadow.bias = -0.0004;
key.shadow.normalBias = 0.03;
scene.add(key, key.target);
const fill = new THREE.DirectionalLight(0x9fc3ff, 0.3);
fill.position.set(-30, 30, -10);
scene.add(fill);

const players = {};
for (const id of [...OFF, ...DEF]) {
  const p = createPlayer(id);
  players[id] = p;
  scene.add(p.root, p.wall);
}
const ball = createBall();
scene.add(ball);
const notation = new Notation(scene);
const rig = new CameraRig(camera, renderer.domElement);
let court = null;

// ── 상태 ─────────────────────────────────────────────────────
const state = {
  idx: 0, cp: null, t: 0, playing: false, speed: 1, loop: false,
  showDef: true, showLabels: true, scrubbing: false, stepShown: -1,
};

// ── 텍스트 포맷: [1] → 공격 칩, [x1] → 수비 칩, **굵게** ─────────
const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
function fmt(s) {
  return esc(s)
    .replace(/\[x(\d)\]/g, '<span class="pc d">X$1</span>')
    .replace(/\[(\d)\]/g, '<span class="pc o">$1</span>')
    .replace(/\*\*(.+?)\*\*/g, '<b>$1</b>');
}

// ── 사이드바 ─────────────────────────────────────────────────
function renderList() {
  const nav = $('#play-list');
  nav.innerHTML = '';
  let n = 0;
  for (const cat of CATEGORIES) {
    const h = document.createElement('div');
    h.className = 'cat-title';
    h.textContent = cat;
    nav.append(h);
    PLAYS.forEach((p, i) => {
      if (p.category !== cat) return;
      n++;
      const b = document.createElement('button');
      b.className = 'play-item';
      b.dataset.idx = i;
      b.innerHTML = `<span class="num">${String(n).padStart(2, '0')}</span>
        <span class="names"><span class="ko">${esc(p.name)}</span><span class="en">${esc(p.en)}</span></span>
        <span class="dots" title="난이도 ${p.difficulty}/3">${[1, 2, 3].map((d) => `<i class="${d <= p.difficulty ? 'on' : ''}"></i>`).join('')}</span>`;
      b.addEventListener('click', () => selectPlay(i, true));
      nav.append(b);
    });
  }
}

// ── 작전 설명 패널 ───────────────────────────────────────────
function renderInfo() {
  const p = state.cp.play;
  $('#hud-cat').textContent = p.category;
  $('#hud-title').textContent = p.name;
  $('#hud-en').textContent = p.en;
  $('#info-summary').innerHTML = fmt(p.summary);
  $('#info-when').innerHTML = fmt(p.when);
  $('#info-famous').innerHTML = fmt(p.famous);
  $('#info-keys').innerHTML = p.keys.map((k) => `<li>${fmt(k)}</li>`).join('');
  $('#info-counters').innerHTML = p.counters.map((c) => `<li><b>${esc(c.name)}</b>${fmt(c.desc)}</li>`).join('');
  const ol = $('#info-steps');
  ol.innerHTML = '';
  state.cp.steps.forEach((st, k) => {
    const li = document.createElement('li');
    li.innerHTML = `<button><span class="n">${k + 1}</span><span class="st">${esc(st.title)}</span><span class="sx">${fmt(st.text)}</span><span class="bar"></span></button>`;
    li.querySelector('button').addEventListener('click', () => seekStep(k, true));
    ol.append(li);
  });
  const ticks = $('#ticks');
  ticks.innerHTML = state.cp.steps.slice(1).map((st) => `<i style="left:${(st.s0 / state.cp.end) * 100}%"></i>`).join('');
  $('#time-total').textContent = state.cp.end.toFixed(1);
  document.querySelectorAll('.play-item').forEach((b) => b.classList.toggle('active', +b.dataset.idx === state.idx));
  document.title = `${p.name} · 3D Hoops Playbook`;
  state.stepShown = -1;
}

function showCaption(k) {
  const st = state.cp.steps[k];
  $('#cap-step').textContent = `STEP ${k + 1}/${state.cp.steps.length}`;
  $('#cap-title').textContent = st.title;
  $('#cap-text').innerHTML = fmt(st.text);
  document.querySelectorAll('#info-steps li').forEach((li, i) => {
    li.classList.toggle('active', i === k);
    li.classList.toggle('done', i < k);
  });
  [...$('#ticks').children].forEach((el, i) => el.classList.toggle('done', i + 1 <= k));
}

// ── 재생 제어 ─────────────────────────────────────────────────
function selectPlay(i, autoplay) {
  state.idx = i;
  state.cp = compilePlay(PLAYS[i]);
  state.t = 0;
  state.playing = !!autoplay;
  notation.build(state.cp);
  renderInfo();
  syncPlayBtn();
  snapHeadings();
  if (location.hash.slice(1) !== PLAYS[i].id) history.replaceState(null, '', `#${PLAYS[i].id}`);
}

function seekStep(k, play) {
  const cp = state.cp;
  k = Math.max(0, Math.min(cp.steps.length - 1, k));
  state.t = cp.steps[k].s0 + 0.001;
  if (play !== undefined) state.playing = play;
  syncPlayBtn();
}

function togglePlay() {
  if (!state.playing && state.t >= state.cp.end - 0.01) state.t = 0;
  state.playing = !state.playing;
  syncPlayBtn();
}

function syncPlayBtn() {
  const b = $('#btn-play');
  b.textContent = state.playing ? '❚❚' : '▶';
  b.setAttribute('aria-label', state.playing ? '일시정지' : '재생');
}

function snapHeadings() {
  const off = state.cp.offense(0);
  for (const id of OFF) {
    players[id].heading = Math.atan2(BASKET.x - off[id].x, BASKET.z - off[id].z);
  }
  const def = state.cp.defense(0);
  for (const d of DEF) {
    const m = off[state.cp.guardOf(d, 0)];
    players[d].heading = Math.atan2(m.x - def[d].x, m.z - def[d].z);
  }
}

// ── 프레임별 장면 적용 ────────────────────────────────────────
const H = 0.05;
function applyState(t, dt) {
  const cp = state.cp;
  const k = cp.stepIndexAt(Math.max(0, t));
  const inPlay = t <= cp.total;
  const off = cp.offense(t), offA = cp.offense(t - H), offB = cp.offense(t + H);
  const def = cp.defense(t), defA = cp.defense(t - H), defB = cp.defense(t + H);
  const bseg = cp.ballSegAt(t);
  const holder = bseg.type === 'hold' ? bseg.who : null;
  const air = holder ? null : ballAir(bseg, t);
  const ballXZ = holder ? off[holder] : air;

  const speeds = {};
  for (const id of OFF) {
    const vx = (offB[id].x - offA[id].x) / (2 * H), vz = (offB[id].z - offA[id].z) / (2 * H);
    const speed = Math.hypot(vx, vz);
    speeds[id] = speed;
    const p = off[id];
    let heading;
    if (speed > 2.5) heading = Math.atan2(vx, vz);
    else if (holder === id || !ballXZ) heading = Math.atan2(BASKET.x - p.x, BASKET.z - p.z);
    else heading = Math.atan2(ballXZ.x - p.x, ballXZ.z - p.z);
    const scr = cp.screenAt(id, t);
    const shooting = cp.shootingAt(id, t);
    let stance = 'run';
    if (shooting) stance = 'shoot';
    else if (scr) stance = 'screen';
    else if (holder === id) stance = speed > 2.5 ? 'dribble' : 'hold';
    if (scr && scr.face) heading = Math.atan2(scr.face.x - p.x, scr.face.z - p.z);
    posePlayer(players[id], {
      x: p.x, z: p.z, y: cp.jumpY(id, t), heading, speed, t, stance,
      focus: inPlay && cp.focus[k].has(id), screenFace: scr ? scr.face : null,
    }, dt);
  }
  for (const d of DEF) {
    const pl = players[d];
    pl.root.visible = state.showDef;
    if (!state.showDef) { pl.wall.visible = false; continue; }
    const vx = (defB[d].x - defA[d].x) / (2 * H), vz = (defB[d].z - defA[d].z) / (2 * H);
    const speed = Math.hypot(vx, vz);
    const p = def[d];
    const man = off[cp.guardOf(d, t)];
    const onBall = holder === cp.guardOf(d, t) && dist2(p, man) < 7;
    let heading;
    if (speed > 9) heading = Math.atan2(vx, vz);
    else if (onBall || !ballXZ) heading = Math.atan2(man.x - p.x, man.z - p.z);
    else {
      const mx = (man.x + ballXZ.x) / 2, mz = (man.z + ballXZ.z) / 2;
      heading = Math.atan2(mx - p.x, mz - p.z);
    }
    posePlayer(pl, { x: p.x, z: p.z, y: 0, heading, speed, t, stance: onBall || speed < 5 ? 'defend' : 'run', focus: false, screenFace: null }, dt);
  }
  for (const id of [...OFF, ...DEF]) players[id].label.visible = state.showLabels;

  // 공
  if (holder) {
    const p = players[holder];
    const jy = cp.jumpY(holder, t);
    if (cp.shootingAt(holder, t)) {
      const fx = Math.sin(p.heading), fz = Math.cos(p.heading);
      ball.position.set(p.root.position.x + fx * 0.5, 7.7 + jy, p.root.position.z + fz * 0.5);
    } else if (speeds[holder] > 2.5) {
      const hp = handPoint(p);
      ball.position.set(hp.x, 0.39 + 2.55 * Math.abs(Math.cos((Math.PI * t) / 0.5)), hp.z);
      ball.rotation.x += dt * 6;
    } else {
      const fx = Math.sin(p.heading), fz = Math.cos(p.heading);
      ball.position.set(p.root.position.x + fx * 1.0, 4.35 + jy, p.root.position.z + fz * 1.0);
    }
  } else {
    ball.position.set(air.x, air.y, air.z);
    ball.rotation.x -= dt * (bseg.type === 'shot' ? 14 : 8);
  }

  // 그물 흔들림
  if (court) {
    const n = court.net;
    if (bseg.type === 'drop' && t - bseg.t0 < 0.7) {
      const s = Math.sin((Math.PI * (t - bseg.t0)) / 0.7);
      n.scale.set(1 - 0.15 * s, 1 + 0.3 * s, 1 - 0.15 * s);
      n.position.y = 10 - 0.75 * (1 + 0.3 * s);
    } else {
      n.scale.set(1, 1, 1);
      n.position.y = 9.25;
    }
  }
  notation.update(t, cp);
}

// ── 득점 팝업 ─────────────────────────────────────────────────
let popTimer = 0;
function checkScore(prev, t) {
  for (const s of state.cp.scores) {
    if (prev < s.t && t >= s.t) {
      const el = $('#score-pop');
      el.textContent = `+${s.pts}`;
      el.classList.add('show');
      clearTimeout(popTimer);
      popTimer = setTimeout(() => el.classList.remove('show'), 1300);
    }
  }
}

// ── UI 갱신 ───────────────────────────────────────────────────
function updateUI() {
  const cp = state.cp;
  const t = Math.max(0, state.t);
  const k = cp.stepIndexAt(Math.min(t, cp.total - 1e-6));
  if (k !== state.stepShown) { showCaption(k); state.stepShown = k; }
  if (!state.scrubbing) $('#scrub').value = Math.round((t / cp.end) * 1000);
  $('#time-cur').textContent = t.toFixed(1);
  const bars = document.querySelectorAll('#info-steps .bar');
  cp.steps.forEach((st, i) => {
    const f = Math.max(0, Math.min(1, (t - st.s0) / (st.s1 - st.s0)));
    if (bars[i]) bars[i].style.width = `${f * 100}%`;
  });
}

// ── 이벤트 ───────────────────────────────────────────────────
function setCam(mode) {
  rig.setMode(mode, ball.position);
  document.querySelectorAll('.cam-bar button').forEach((b) => b.classList.toggle('active', b.dataset.cam === mode));
}
function toggle(btn, key) {
  state[key] = !state[key];
  btn.classList.toggle('on', state[key]);
}
function prevStep() {
  const cp = state.cp;
  const k = cp.stepIndexAt(Math.min(state.t, cp.total - 1e-6));
  seekStep(state.t - cp.steps[k].s0 > 0.5 ? k : k - 1);
}
function nextStep() {
  const cp = state.cp;
  const k = cp.stepIndexAt(Math.min(state.t, cp.total - 1e-6));
  if (k >= cp.steps.length - 1) { state.t = cp.end; state.playing = false; syncPlayBtn(); }
  else seekStep(k + 1);
}

function bindUI() {
  $('#btn-play').addEventListener('click', togglePlay);
  $('#btn-restart').addEventListener('click', () => { state.t = 0; state.playing = true; syncPlayBtn(); });
  $('#btn-prev').addEventListener('click', prevStep);
  $('#btn-next').addEventListener('click', nextStep);
  const scrub = $('#scrub');
  scrub.addEventListener('input', () => {
    state.scrubbing = true;
    state.playing = false;
    syncPlayBtn();
    state.t = (scrub.value / 1000) * state.cp.end;
  });
  scrub.addEventListener('change', () => { state.scrubbing = false; });
  $('#speed').addEventListener('change', (e) => { state.speed = +e.target.value; });
  $('#tg-def').addEventListener('click', (e) => toggle(e.currentTarget, 'showDef'));
  $('#tg-labels').addEventListener('click', (e) => toggle(e.currentTarget, 'showLabels'));
  $('#tg-loop').addEventListener('click', (e) => toggle(e.currentTarget, 'loop'));
  $('#tg-notes').addEventListener('click', (e) => {
    notation.visible = !notation.visible;
    e.currentTarget.classList.toggle('on', notation.visible);
  });
  document.querySelectorAll('.cam-bar button').forEach((b) => b.addEventListener('click', () => setCam(b.dataset.cam)));

  window.addEventListener('keydown', (e) => {
    if (e.target.closest('input, select, textarea')) return;
    const cams = ['coach', 'broadcast', 'top', 'baseline', 'follow'];
    if (e.code === 'Space') { e.preventDefault(); togglePlay(); }
    else if (e.key === 'ArrowLeft') prevStep();
    else if (e.key === 'ArrowRight') nextStep();
    else if (e.key === 'ArrowUp') { e.preventDefault(); selectPlay((state.idx - 1 + PLAYS.length) % PLAYS.length, true); }
    else if (e.key === 'ArrowDown') { e.preventDefault(); selectPlay((state.idx + 1) % PLAYS.length, true); }
    else if (e.key === 'r' || e.key === 'R') { state.t = 0; state.playing = true; syncPlayBtn(); }
    else if (e.key === 'd' || e.key === 'D') $('#tg-def').click();
    else if (e.key === 'n' || e.key === 'N') $('#tg-notes').click();
    else if (e.key === 'l' || e.key === 'L') $('#tg-labels').click();
    else if (cams[+e.key - 1]) setCam(cams[+e.key - 1]);
  });

  window.addEventListener('hashchange', () => {
    const i = PLAYS.findIndex((p) => p.id === location.hash.slice(1));
    if (i >= 0 && i !== state.idx) selectPlay(i, true);
  });

  new ResizeObserver(() => {
    const w = viewport.clientWidth, h = viewport.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }).observe(viewport);
}

// ── 시작 ─────────────────────────────────────────────────────
let last = performance.now();
let prevT = 0;
function frame(now) {
  requestAnimationFrame(frame);
  const dt = Math.min(0.05, (now - last) / 1000);
  last = now;
  const cp = state.cp;
  if (state.playing) {
    state.t += dt * state.speed;
    if (state.t >= cp.end) {
      if (state.loop) state.t = 0;
      else { state.t = cp.end; state.playing = false; syncPlayBtn(); }
    }
  }
  checkScore(prevT, state.t);
  prevT = state.t;
  applyState(state.t, dt);
  rig.update(dt, ball.position);
  renderer.render(scene, camera);
  updateUI();
}

async function init() {
  // 캔버스 텍스처에 쓰는 웹폰트가 준비될 때까지 잠깐 기다린다
  try {
    await Promise.race([
      Promise.all([document.fonts.load('700 40px Oswald'), document.fonts.load('700 20px "Noto Sans KR"')]),
      new Promise((r) => setTimeout(r, 2500)),
    ]);
  } catch { /* 폰트가 없어도 진행 */ }
  court = buildCourt(scene, renderer, { hiRes: !isSmall });
  renderList();
  bindUI();
  const w = viewport.clientWidth, h = viewport.clientHeight;
  renderer.setSize(w, h, false);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  // ?cam=top&t=3.5 처럼 카메라와 특정 순간을 지정해 열 수 있다
  const params = new URLSearchParams(location.search);
  const cam = params.get('cam');
  rig.jump('coach');
  if (cam && document.querySelector(`.cam-bar [data-cam="${cam}"]`)) {
    rig.jump(cam);
    document.querySelectorAll('.cam-bar button').forEach((b) => b.classList.toggle('active', b.dataset.cam === cam));
  }
  const fromHash = PLAYS.findIndex((p) => p.id === location.hash.slice(1));
  selectPlay(fromHash >= 0 ? fromHash : 0, false);
  const startT = parseFloat(params.get('t'));
  if (startT >= 0) { state.t = Math.min(startT, state.cp.end); prevT = state.t; }
  requestAnimationFrame(frame);
  $('#loading').classList.add('hide');
  // 디버깅용: 탭이 백그라운드여도 특정 시점을 강제로 그려 볼 수 있다
  window.__playbook = {
    state, rig, camera, selectPlay, setCam,
    renderNow(frames = 12) {
      for (let i = 0; i < frames; i++) { applyState(state.t, 1 / 30); rig.update(1 / 30, ball.position); }
      renderer.render(scene, camera);
      updateUI();
    },
  };
  setTimeout(() => { if (state.t === 0) { state.playing = true; syncPlayBtn(); } }, 900);
}

init();
