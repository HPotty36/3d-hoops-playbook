import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { compilePlay, ballAir, OFF, DEF, BASKET, dist2 } from './engine.js';
import { buildCourt } from './court.js';
import { createPlayer, posePlayer, handPoint, createBall } from './players.js';
import { Notation } from './notation.js';
import { CameraRig } from './camera.js';
import { PLAYS, CATEGORIES } from './plays/index.js';
import { t as tr, applyStatic, localize, initLang, setLang, getLang } from './i18n.js';

const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];
const viewport = $('#viewport');
const isSmall = Math.min(screen.width, screen.height) < 700;
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

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
scene.background = new THREE.Color(0x0a0b0d);
scene.fog = new THREE.Fog(0x0a0b0d, 120, 260);
const pmrem = new THREE.PMREMGenerator(renderer);
scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

const camera = new THREE.PerspectiveCamera(42, 1, 0.5, 700);

scene.add(new THREE.HemisphereLight(0xe8eefc, 0x2b1d10, 0.5));
const key = new THREE.DirectionalLight(0xfff3e6, 1.6);
key.position.set(18, 62, 40);
key.target.position.set(0, 0, 20);
key.castShadow = true;
key.shadow.mapSize.set(isSmall ? 1024 : 2048, isSmall ? 1024 : 2048);
Object.assign(key.shadow.camera, { left: -38, right: 38, top: 38, bottom: -38, near: 10, far: 160 });
key.shadow.bias = -0.0004;
key.shadow.normalBias = 0.03;
scene.add(key, key.target);
const fill = new THREE.DirectionalLight(0xa9c4ff, 0.3);
fill.position.set(-30, 30, -10);
scene.add(fill);

// 선수 번호 라벨이 웹폰트를 쓰므로 선수는 폰트가 준비된 뒤 init()에서 만든다
const players = {};
const ball = createBall();
scene.add(ball);
const notation = new Notation(scene);
const rig = new CameraRig(camera, renderer.domElement);
let court = null;

// ── 상태 & 저장된 설정 ─────────────────────────────────────────
const PREF_KEY = 'hoops-playbook:prefs';
const prefs = (() => { try { return JSON.parse(localStorage.getItem(PREF_KEY)) || {}; } catch { return {}; } })();

const state = {
  idx: 0, cp: null, t: 0, playing: false,
  speed: [0.5, 0.75, 1, 1.5].includes(prefs.speed) ? prefs.speed : 1,
  loop: !!prefs.loop,
  showDef: prefs.showDef ?? true,
  showLabels: prefs.showLabels ?? true,
  readMode: ['auto', 'relaxed', 'step', 'off'].includes(prefs.readMode) ? prefs.readMode : 'auto',
  hold: null,       // { k, remaining, total } — 단계 시작 전 '읽는 시간'
  waiting: false,   // 단계별 모드에서 다음 단계 시작을 기다리는 중
  scrubbing: false, stepShown: -1,
};
notation.visible = prefs.showNotes ?? true;
initLang(prefs.lang);
const content = () => localize(PLAYS[state.idx]);

function savePrefs() {
  try {
    localStorage.setItem(PREF_KEY, JSON.stringify({
      speed: state.speed, loop: state.loop, showDef: state.showDef, showLabels: state.showLabels,
      showNotes: notation.visible, readMode: state.readMode, lang: getLang(),
    }));
  } catch { /* 저장소를 못 쓰는 환경이면 무시 */ }
}

// ── 읽기 모드 ─────────────────────────────────────────────────
// 1배속은 실제 경기 속도로 두고, 단계가 시작될 때 설명을 읽을 시간을 따로 준다.
// 그동안 코트에는 이번 단계의 동선(전술판 표기)과 관련 선수 강조가 먼저 나타난다.
const READ_FACTOR = { auto: 1, relaxed: 1.7 };
// 한국어는 글자 수(초당 약 12자), 영어는 단어 수(초당 약 4.5단어)로 읽는 시간을 잡는다
function readTime(text) {
  const plain = text.replace(/\*\*|\[x?\d\]/g, '');
  const sec = getLang() === 'en'
    ? 1 + plain.split(/\s+/).filter(Boolean).length / 4.5
    : 1 + plain.replace(/\s+/g, '').length / 12;
  return clamp(sec, 2.5, 10);
}

function beginStep(k) {
  state.hold = null;
  state.waiting = false;
  if (state.readMode === 'off') return;
  if (state.readMode === 'step') {
    state.playing = false;
    state.waiting = true;
    syncPlayBtn();
    return;
  }
  const total = readTime(content().steps[k].text) * READ_FACTOR[state.readMode];
  state.hold = { k, remaining: total, total };
}

function skipWait() {
  if (state.hold) state.hold = null;
  else if (state.waiting) { state.waiting = false; state.playing = true; syncPlayBtn(); }
}

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
  nav.setAttribute('aria-label', tr('aria.plays'));
  let n = 0;
  for (const cat of CATEGORIES) {
    const h = document.createElement('div');
    h.className = 'cat-title';
    h.textContent = tr(`cat.${cat}`);
    nav.append(h);
    PLAYS.forEach((p, i) => {
      if (p.category !== cat) return;
      n++;
      const b = document.createElement('button');
      b.className = 'play-item';
      b.dataset.idx = i;
      b.innerHTML = `<span class="num">${String(n).padStart(2, '0')}</span>
        <span class="nm">${esc(localize(p).name)}</span>
        <span class="diff" title="${tr('diff', { n: p.difficulty })}">${[1, 2, 3].map((d) => `<i class="${d <= p.difficulty ? 'on' : ''}"></i>`).join('')}</span>`;
      b.addEventListener('click', () => selectPlay(i, true));
      nav.append(b);
    });
  }
}

// ── 작전 설명 패널 ───────────────────────────────────────────
function renderInfo() {
  const p = state.cp.play;
  const c = content();
  $('#hud-cat').textContent = tr(`cat.${p.category}`);
  $('#hud-title').textContent = c.name;
  $('#info-summary').innerHTML = fmt(c.summary);
  $('#info-when').innerHTML = fmt(c.when);
  $('#info-famous').innerHTML = fmt(c.famous);
  $('#info-keys').innerHTML = c.keys.map((k) => `<li>${fmt(k)}</li>`).join('');
  $('#info-counters').innerHTML = c.counters.map((x) => `<div><dt>${esc(x.name)}</dt><dd>${fmt(x.desc)}</dd></div>`).join('');
  const ol = $('#info-steps');
  ol.innerHTML = '';
  c.steps.forEach((st, k) => {
    const li = document.createElement('li');
    li.innerHTML = `<button><span class="n">${k + 1}</span><span class="st">${esc(st.title)}</span><span class="sx">${fmt(st.text)}</span></button>`;
    li.querySelector('button').addEventListener('click', () => seekStep(k, true));
    ol.append(li);
  });
  buildTimeline();
  $('#time-total').textContent = state.cp.end.toFixed(1);
  $$('.play-item').forEach((b) => b.classList.toggle('active', +b.dataset.idx === state.idx));
  // 모바일 가로 목록에서는 선택한 작전을 가운데로 (페이지 자체는 스크롤하지 않음)
  const active = $('.play-item.active');
  const nav = $('#play-list');
  if (active && window.matchMedia('(max-width: 1100px)').matches) {
    nav.scrollTo({ left: active.offsetLeft - (nav.clientWidth - active.offsetWidth) / 2, behavior: 'smooth' });
  }
  document.title = `${c.name} · 3D Hoops Playbook`;
  state.stepShown = -1;
}

function showCaption(k) {
  const st = content().steps[k];
  $('#cap-step').textContent = tr('cap.step', { k: k + 1, n: state.cp.steps.length });
  $('#cap-title').textContent = st.title;
  $('#cap-text').innerHTML = fmt(st.text);
  $$('#info-steps li').forEach((li, i) => {
    li.classList.toggle('active', i === k);
    li.classList.toggle('done', i < k);
  });
}

// ── 타임라인 (단계별 구간) ────────────────────────────────────
let segEls = [];
function buildTimeline() {
  const cp = state.cp;
  const wrap = $('#tl-segs');
  wrap.innerHTML = '';
  const parts = cp.steps.map((st) => ({ s0: st.s0, dur: st.dur, tail: false }));
  if (cp.end - cp.total > 0.01) parts.push({ s0: cp.total, dur: cp.end - cp.total, tail: true });
  segEls = parts.map((part) => {
    const el = document.createElement('div');
    el.className = `tl-seg${part.tail ? ' tail' : ''}`;
    el.style.flex = `${part.dur} 1 0`;
    el.innerHTML = '<i></i>';
    el._part = part;
    wrap.append(el);
    return el;
  });
}

function tFromX(clientX) {
  for (const el of segEls) {
    const r = el.getBoundingClientRect();
    if (clientX <= r.right + 1.5) {
      const f = clamp((clientX - r.left) / r.width, 0, 1);
      return el._part.s0 + f * el._part.dur;
    }
  }
  return state.cp.end;
}

function updateTimeline(t) {
  const k = state.cp.stepIndexAt(Math.min(t, state.cp.total - 1e-6));
  let headX = 0;
  segEls.forEach((el, i) => {
    const { s0, dur } = el._part;
    const f = clamp((t - s0) / dur, 0, 1);
    el.firstChild.style.width = `${f * 100}%`;
    el.classList.toggle('done', f >= 1);
    el.classList.toggle('cur', i === k && t < state.cp.total);
    if (t >= s0 && (t < s0 + dur || i === segEls.length - 1)) headX = el.offsetLeft + f * el.offsetWidth;
  });
  $('#tl-head').style.left = `${headX}px`;
  $('#timeline').setAttribute('aria-valuenow', Math.round((t / state.cp.end) * 100));
}

// ── 재생 제어 ─────────────────────────────────────────────────
function selectPlay(i, autoplay) {
  state.idx = i;
  state.cp = compilePlay(PLAYS[i]);
  state.t = 0;
  state.hold = null;
  state.waiting = false;
  state.playing = !!autoplay;
  notation.build(state.cp);
  renderInfo();
  snapHeadings();
  if (autoplay) beginStep(0);
  syncPlayBtn();
  if (location.hash.slice(1) !== PLAYS[i].id) history.replaceState(null, '', `#${PLAYS[i].id}`);
}

function seekStep(k, play) {
  const cp = state.cp;
  k = clamp(k, 0, cp.steps.length - 1);
  state.t = cp.steps[k].s0 + 0.001;
  if (play !== undefined) state.playing = play;
  state.hold = null;
  state.waiting = false;
  if (state.playing) beginStep(k);
  syncPlayBtn();
}

function restart() {
  state.t = 0;
  state.playing = true;
  beginStep(0);
  syncPlayBtn();
}

function togglePlay() {
  if (state.waiting) { skipWait(); return; }
  if (!state.playing && state.t >= state.cp.end - 0.01) { restart(); return; }
  state.playing = !state.playing;
  syncPlayBtn();
}

function syncPlayBtn() {
  const b = $('#btn-play');
  b.querySelector('use').setAttribute('href', state.playing ? '#i-pause' : '#i-play');
  b.setAttribute('aria-label', tr(state.playing ? 'aria.pause' : 'aria.play'));
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
      x: p.x, z: p.z, y: cp.jumpY(id, t), heading, speed, t: performance.now() / 1000, stance,
      focus: inPlay && cp.focus[k].has(id), screenFace: scr ? scr.face : null, clock: t,
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
    posePlayer(pl, {
      x: p.x, z: p.z, y: 0, heading, speed, t: performance.now() / 1000,
      stance: onBall || speed < 5 ? 'defend' : 'run', focus: false, screenFace: null, clock: t,
    }, dt);
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
  notation.update(t, cp, dt);
}

// ── 득점 팝업 ─────────────────────────────────────────────────
let popTimer = 0;
function checkScore(prev, t) {
  for (const s of state.cp.scores) {
    if (prev < s.t && t >= s.t) {
      const el = $('#score-pop');
      const label = tr(s.kind === 'dunk' ? 'score.dunk' : s.pts === 3 ? 'score.three' : s.kind === 'layup' ? 'score.layup' : 'score.jumper');
      el.innerHTML = `+${s.pts}<small>${label}</small>`;
      el.classList.add('show');
      clearTimeout(popTimer);
      popTimer = setTimeout(() => el.classList.remove('show'), 1400);
    }
  }
}

// ── UI 갱신 ───────────────────────────────────────────────────
const ui = { status: null, statusText: '', bar: -1, time: '' };
function updateUI() {
  const cp = state.cp;
  const t = Math.max(0, state.t);
  const k = cp.stepIndexAt(Math.min(t, cp.total - 1e-6));
  if (k !== state.stepShown) { showCaption(k); state.stepShown = k; }
  updateTimeline(t);
  const tt = t.toFixed(1);
  if (tt !== ui.time) { $('#time-cur').textContent = tt; ui.time = tt; }

  // 읽는 시간 / 대기 상태 표시
  let status = null, text = '', bar = 0;
  if (state.hold) {
    status = 'hold';
    text = tr('status.hold', { n: Math.ceil(state.hold.remaining) });
    bar = 1 - state.hold.remaining / state.hold.total;
  } else if (state.waiting) {
    status = 'wait';
    text = tr('status.wait');
  }
  if (status !== ui.status) { $('#cap-status').hidden = !status; ui.status = status; }
  if (text !== ui.statusText) { $('#cap-status-text').textContent = text; ui.statusText = text; }
  if (Math.abs(bar - ui.bar) > 0.002) { $('#cap-bar-fill').style.width = `${bar * 100}%`; ui.bar = bar; }
}

// ── 이벤트 ───────────────────────────────────────────────────
// 언어 전환: 정적 문구, 목록, 설명을 다시 그린다 (재생 위치와 상태는 그대로)
function setLanguage(l) {
  setLang(l);
  applyStatic();
  $$('.lang-bar button').forEach((b) => b.classList.toggle('on', b.dataset.lang === getLang()));
  renderList();
  renderInfo();
  syncPlayBtn();
  ui.statusText = null;
  const params = new URLSearchParams(location.search);
  if (params.has('lang')) {
    params.set('lang', getLang());
    history.replaceState(null, '', `${location.pathname}?${params}${location.hash}`);
  }
  savePrefs();
}

function setCam(mode) {
  rig.setMode(mode, ball.position);
  $$('.cam-bar button').forEach((b) => b.classList.toggle('on', b.dataset.cam === mode));
}
function setSeg(sel, value) {
  $$(`${sel} button`).forEach((b) => b.classList.toggle('on', b.dataset.v === String(value)));
}
function setToggle(id, on) {
  $(id).setAttribute('aria-pressed', String(on));
}
function currentStep() {
  return state.cp.stepIndexAt(Math.min(state.t, state.cp.total - 1e-6));
}
function prevStep() {
  const k = currentStep();
  seekStep(state.t - state.cp.steps[k].s0 > 0.5 ? k : k - 1);
}
function nextStep() {
  const cp = state.cp;
  const k = currentStep();
  if (k >= cp.steps.length - 1) {
    state.t = cp.end; state.playing = false; state.hold = null; state.waiting = false; syncPlayBtn();
  } else seekStep(k + 1);
}

function bindUI() {
  $('#btn-play').addEventListener('click', togglePlay);
  $('#btn-restart').addEventListener('click', restart);
  $('#btn-prev').addEventListener('click', prevStep);
  $('#btn-next').addEventListener('click', nextStep);
  $('#btn-skip').addEventListener('click', skipWait);

  // 타임라인 드래그
  const tl = $('#timeline');
  const scrubTo = (e) => { state.t = tFromX(e.clientX); };
  tl.addEventListener('pointerdown', (e) => {
    state.scrubbing = true;
    state.playing = false;
    state.hold = null;
    state.waiting = false;
    syncPlayBtn();
    tl.setPointerCapture(e.pointerId);
    scrubTo(e);
  });
  tl.addEventListener('pointermove', (e) => { if (state.scrubbing) scrubTo(e); });
  const endScrub = () => { state.scrubbing = false; };
  tl.addEventListener('pointerup', endScrub);
  tl.addEventListener('pointercancel', endScrub);

  $$('#speed button').forEach((b) => b.addEventListener('click', () => {
    state.speed = +b.dataset.v; setSeg('#speed', state.speed); savePrefs();
  }));
  $$('#read-mode button').forEach((b) => b.addEventListener('click', () => {
    state.readMode = b.dataset.v;
    setSeg('#read-mode', state.readMode);
    if (state.readMode === 'off' || state.readMode === 'step') state.hold = null;
    if (state.readMode !== 'step' && state.waiting) skipWait();
    savePrefs();
  }));
  const bindToggle = (id, get, set) => $(id).addEventListener('click', () => { set(!get()); setToggle(id, get()); savePrefs(); });
  bindToggle('#tg-def', () => state.showDef, (v) => { state.showDef = v; });
  bindToggle('#tg-labels', () => state.showLabels, (v) => { state.showLabels = v; });
  bindToggle('#tg-loop', () => state.loop, (v) => { state.loop = v; });
  bindToggle('#tg-notes', () => notation.visible, (v) => { notation.visible = v; });
  $$('.cam-bar button').forEach((b) => b.addEventListener('click', () => setCam(b.dataset.cam)));
  $$('.lang-bar button').forEach((b) => b.addEventListener('click', () => { if (b.dataset.lang !== getLang()) setLanguage(b.dataset.lang); }));

  window.addEventListener('keydown', (e) => {
    if (e.target.closest('input, select, textarea') || e.metaKey || e.ctrlKey || e.altKey) return;
    const cams = ['coach', 'broadcast', 'top', 'baseline', 'follow'];
    if (e.code === 'Space') { e.preventDefault(); togglePlay(); }
    else if (e.key === 'Enter') { if (!e.target.closest('button, a')) { e.preventDefault(); skipWait(); } }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); prevStep(); }
    else if (e.key === 'ArrowRight') { e.preventDefault(); nextStep(); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); selectPlay((state.idx - 1 + PLAYS.length) % PLAYS.length, true); }
    else if (e.key === 'ArrowDown') { e.preventDefault(); selectPlay((state.idx + 1) % PLAYS.length, true); }
    else if (e.key === 'r' || e.key === 'R') restart();
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

// 재생 시간 진행: 읽는 시간(hold) 동안은 타임라인을 멈추고 실제 시간만 흐른다
function advance(dt) {
  const cp = state.cp;
  if (state.playing) {
    if (state.hold) {
      state.hold.remaining -= dt;
      if (state.hold.remaining <= 0) state.hold = null;
    } else {
      const k0 = cp.stepIndexAt(state.t);
      state.t += dt * state.speed;
      if (state.t < cp.total) {
        const k1 = cp.stepIndexAt(state.t);
        if (k1 !== k0) { state.t = cp.steps[k1].s0; beginStep(k1); }
      } else if (state.t >= cp.end) {
        if (state.loop) restart();
        else { state.t = cp.end; state.playing = false; syncPlayBtn(); }
      }
    }
  }
}

function frame(now) {
  requestAnimationFrame(frame);
  const dt = Math.min(0.05, (now - last) / 1000);
  last = now;
  advance(dt);
  checkScore(prevT, state.t);
  prevT = state.t;
  applyState(state.t, dt);
  rig.update(dt, ball.position);
  renderer.render(scene, camera);
  updateUI();
}

// 캔버스 텍스처(바닥 로고, 번호 라벨)에 쓰는 웹폰트가 실제로 로드될 때까지 기다린다.
// 스타일시트가 늦게 파싱되면 fonts.load()가 빈 결과로 바로 끝나므로, 로드된 FontFace를 직접 확인한다.
async function waitForFonts(timeout = 3000) {
  const loaded = (w) => [...document.fonts].some((f) =>
    f.family.replace(/["']/g, '') === 'Barlow Condensed' && String(f.weight) === w && f.status === 'loaded');
  const deadline = performance.now() + timeout;
  while (performance.now() < deadline) {
    try {
      await Promise.all([
        document.fonts.load('700 40px "Barlow Condensed"', 'HOOPS X1'),
        document.fonts.load('300 40px "Barlow Condensed"', 'PLAYBOOK'),
      ]);
    } catch { /* 무시하고 재시도 */ }
    if (loaded('700') && loaded('300')) return;
    await new Promise((r) => setTimeout(r, 120));
  }
}

async function init() {
  applyStatic();
  $$('.lang-bar button').forEach((b) => b.classList.toggle('on', b.dataset.lang === getLang()));
  await waitForFonts();
  for (const id of [...OFF, ...DEF]) {
    const p = createPlayer(id);
    players[id] = p;
    scene.add(p.root, p.wall);
  }
  court = buildCourt(scene, renderer, { hiRes: !isSmall });
  renderList();
  bindUI();
  setSeg('#speed', state.speed);
  setSeg('#read-mode', state.readMode);
  setToggle('#tg-def', state.showDef);
  setToggle('#tg-labels', state.showLabels);
  setToggle('#tg-loop', state.loop);
  setToggle('#tg-notes', notation.visible);
  const w = viewport.clientWidth, h = viewport.clientHeight;
  renderer.setSize(w, h, false);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();

  // ?cam=top&t=3.5 처럼 카메라와 특정 순간을 지정해 열 수 있다
  const params = new URLSearchParams(location.search);
  const cam = params.get('cam');
  rig.jump('coach');
  if (cam && $(`.cam-bar [data-cam="${cam}"]`)) {
    rig.jump(cam);
    $$('.cam-bar button').forEach((b) => b.classList.toggle('on', b.dataset.cam === cam));
  }
  const fromHash = PLAYS.findIndex((p) => p.id === location.hash.slice(1));
  selectPlay(fromHash >= 0 ? fromHash : 0, false);
  const startT = parseFloat(params.get('t'));
  if (startT >= 0) { state.t = Math.min(startT, state.cp.end); prevT = state.t; }
  requestAnimationFrame(frame);
  $('#loading').classList.add('hide');
  setTimeout(() => { if (state.t === 0 && !state.playing && !state.waiting) { state.playing = true; beginStep(0); syncPlayBtn(); } }, 900);

  // 디버깅용: 탭이 백그라운드여도 특정 시점을 강제로 그려 볼 수 있다
  window.__playbook = {
    state, rig, camera, selectPlay, setCam, advance, readTime,
    renderNow(frames = 12) {
      for (let i = 0; i < frames; i++) { applyState(state.t, 1 / 30); rig.update(1 / 30, ball.position); }
      renderer.render(scene, camera);
      updateUI();
    },
  };
}

init();
