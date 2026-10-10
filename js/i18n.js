// UI 문구 사전과 작전 콘텐츠 현지화 (ko / en)
export const LANGS = ['ko', 'en'];

const UI = {
  ko: {
    'brand.sub': '3D로 보는 농구 작전 교과서',
    'brand.home': '3D Hoops Playbook 처음으로',
    'loading': '코트를 준비하는 중',
    'keys.open': '단축키 보기',
    'keys.title': '단축키',
    'keys.close': '닫기',
    'keys.play': '재생 / 일시정지',
    'keys.now': '읽는 시간 건너뛰고 바로 재생',
    'keys.steps': '이전 / 다음 단계',
    'keys.plays': '이전 / 다음 작전',
    'keys.camera': '카메라: 코치 · 중계 · 전술판 · 엔드라인 · 공 추적',
    'keys.toggles': '수비 · 표기 · 라벨 켜고 끄기',
    'keys.restart': '처음부터',
    'keys.theme': '라이트 / 다크 모드',
    'keys.help': '이 안내 열고 닫기',
    'theme.toLight': '라이트 모드로 전환 (T)',
    'theme.toDark': '다크 모드로 전환 (T)',
    'aria.plays': '작전 목록',
    'aria.lang': '언어',
    'aria.camera': '카메라 시점',
    'aria.controls': '재생 컨트롤',
    'aria.timeline': '타임라인',
    'aria.settings': '재생 설정',
    'aria.display': '표시 옵션',
    'aria.info': '작전 설명',
    'aria.legend': '전술판 표기 범례',
    'aria.restart': '처음부터',
    'aria.prev': '이전 단계',
    'aria.next': '다음 단계',
    'aria.play': '재생',
    'aria.pause': '일시정지',
    'cam.coach': '코치', 'cam.broadcast': '중계', 'cam.top': '전술판', 'cam.baseline': '엔드라인', 'cam.follow': '공 추적',
    'cam.coach.t': '코치 뷰 (1)', 'cam.broadcast.t': '중계 화면 (2)', 'cam.top.t': '전술판 탑뷰 (3)',
    'cam.baseline.t': '엔드라인 (4)', 'cam.follow.t': '공 추적 (5)',
    'btn.restart.t': '처음부터 (R)', 'btn.prev.t': '이전 단계 (←)', 'btn.play.t': '재생/일시정지 (Space)', 'btn.next.t': '다음 단계 (→)',
    'btn.skip': '바로 재생',
    'set.read': '읽기 모드',
    'read.auto': '자동', 'read.relaxed': '넉넉히', 'read.step': '단계별', 'read.off': '끄기',
    'read.auto.t': '단계마다 글 길이에 맞춰 잠깐 멈춘 뒤 재생',
    'read.relaxed.t': '자동보다 더 오래 멈춤',
    'read.step.t': '단계마다 멈추고 재생 버튼을 기다림',
    'read.off.t': '멈추지 않고 이어서 재생',
    'set.speed': '속도',
    'tg.def': '수비', 'tg.notes': '표기', 'tg.labels': '라벨', 'tg.loop': '반복',
    'tg.def.t': '수비 표시 (D)', 'tg.notes.t': '전술판 표기 (N)', 'tg.labels.t': '번호 라벨 (L)', 'tg.loop.t': '반복 재생',
    'lg.cut': '컷', 'lg.dribble': '드리블', 'lg.pass': '패스', 'lg.screen': '스크린', 'lg.shot': '슛',
    'h.when': '이럴 때 쓴다',
    'h.steps': '단계별 진행',
    'h.keys': '핵심 포인트',
    'h.counters': '수비는 어떻게 막나',
    'h.famous': '대표 사례',
    'disclaimer': '이 프로젝트는 특정 프로 리그·구단·선수와 관련이 없는 비공식 교육용 자료입니다. 언급된 팀과 선수 이름은 전술이 쓰인 사례를 설명하기 위한 것입니다.',
    'disclaimer.store': '이 앱은 특정 프로 리그·구단·선수와 관련이 없는 비공식 교육용 앱입니다. 작전 설명은 공개적으로 알려진 농구 전술을 정리한 것입니다.',
    'licenses': '오픈소스 라이선스',
    'cat.onball': '온볼 스크린', 'cat.offball': '오프볼 스크린', 'cat.motion': '모션 & 드라이브',
    'diff': '난이도 {n}/3',
    'level.1': '기초', 'level.2': '중급', 'level.3': '심화',
    'hud.meta': '{cat} · 난이도 {level}',
    'step.now': '지금',
    'cap.step': '단계 {k} / {n}',
    'status.hold': '설명 읽는 중 · {n}초 뒤 재생',
    'status.wait': '준비되면 재생하세요',
    'score.dunk': '덩크', 'score.three': '3점슛', 'score.layup': '레이업', 'score.jumper': '점퍼',
  },
  en: {
    'brand.sub': 'Basketball plays, broken down in 3D',
    'brand.home': '3D Hoops Playbook home',
    'loading': 'Setting up the court',
    'keys.open': 'Keyboard shortcuts',
    'keys.title': 'Keyboard shortcuts',
    'keys.close': 'Close',
    'keys.play': 'Play / pause',
    'keys.now': 'Skip the reading pause',
    'keys.steps': 'Previous / next step',
    'keys.plays': 'Previous / next play',
    'keys.camera': 'Camera: coach, broadcast, board, baseline, ball',
    'keys.toggles': 'Toggle defense, notation, labels',
    'keys.restart': 'Restart',
    'keys.theme': 'Light / dark mode',
    'keys.help': 'Show or hide this list',
    'theme.toLight': 'Switch to light mode (T)',
    'theme.toDark': 'Switch to dark mode (T)',
    'aria.plays': 'Play list',
    'aria.lang': 'Language',
    'aria.camera': 'Camera view',
    'aria.controls': 'Playback controls',
    'aria.timeline': 'Timeline',
    'aria.settings': 'Playback settings',
    'aria.display': 'Display options',
    'aria.info': 'Play notes',
    'aria.legend': 'Notation legend',
    'aria.restart': 'Restart',
    'aria.prev': 'Previous step',
    'aria.next': 'Next step',
    'aria.play': 'Play',
    'aria.pause': 'Pause',
    'cam.coach': 'Coach', 'cam.broadcast': 'Broadcast', 'cam.top': 'Board', 'cam.baseline': 'Baseline', 'cam.follow': 'Ball',
    'cam.coach.t': 'Coach view (1)', 'cam.broadcast.t': 'Broadcast view (2)', 'cam.top.t': 'Top-down board (3)',
    'cam.baseline.t': 'Baseline view (4)', 'cam.follow.t': 'Follow the ball (5)',
    'btn.restart.t': 'Restart (R)', 'btn.prev.t': 'Previous step (←)', 'btn.play.t': 'Play / Pause (Space)', 'btn.next.t': 'Next step (→)',
    'btn.skip': 'Play now',
    'set.read': 'Reading',
    'read.auto': 'Auto', 'read.relaxed': 'Relaxed', 'read.step': 'Step', 'read.off': 'Off',
    'read.auto.t': 'Pause before each step, scaled to the caption length',
    'read.relaxed.t': 'Pause longer than Auto',
    'read.step.t': 'Stop at every step until you press Play',
    'read.off.t': 'Play straight through',
    'set.speed': 'Speed',
    'tg.def': 'Defense', 'tg.notes': 'Notation', 'tg.labels': 'Labels', 'tg.loop': 'Loop',
    'tg.def.t': 'Show defense (D)', 'tg.notes.t': 'Floor notation (N)', 'tg.labels.t': 'Number labels (L)', 'tg.loop.t': 'Loop playback',
    'lg.cut': 'Cut', 'lg.dribble': 'Dribble', 'lg.pass': 'Pass', 'lg.screen': 'Screen', 'lg.shot': 'Shot',
    'h.when': 'When to use it',
    'h.steps': 'Step by step',
    'h.keys': 'Key points',
    'h.counters': 'How defenses counter it',
    'h.famous': 'Famous examples',
    'disclaimer': 'Unofficial educational project, not affiliated with any professional league, team, or player. Team and player names appear only to describe where these tactics have been used.',
    'disclaimer.store': 'Unofficial educational app, not affiliated with any professional league, team, or player. The play breakdowns summarize publicly known basketball tactics.',
    'licenses': 'Open-source licenses',
    'cat.onball': 'On-ball screens', 'cat.offball': 'Off-ball screens', 'cat.motion': 'Motion & drive',
    'diff': 'Difficulty {n}/3',
    'level.1': 'Beginner', 'level.2': 'Intermediate', 'level.3': 'Advanced',
    'hud.meta': '{cat} · {level}',
    'step.now': 'Now',
    'cap.step': 'Step {k} / {n}',
    'status.hold': 'Reading · plays in {n}s',
    'status.wait': 'Press play when ready',
    'score.dunk': 'DUNK', 'score.three': '3-POINTER', 'score.layup': 'LAYUP', 'score.jumper': 'JUMPER',
  },
};

let lang = 'ko';
export const getLang = () => lang;

// 우선순위: ?lang= 주소 → 저장된 선택 → 브라우저 언어
export function initLang(saved) {
  const param = new URLSearchParams(location.search).get('lang');
  if (LANGS.includes(param)) lang = param;
  else if (LANGS.includes(saved)) lang = saved;
  else lang = (navigator.language || '').toLowerCase().startsWith('ko') ? 'ko' : 'en';
  return lang;
}

export function setLang(l) {
  if (LANGS.includes(l)) lang = l;
}

export function t(key, vars) {
  let s = UI[lang][key] ?? UI.ko[key] ?? key;
  if (vars) s = s.replace(/\{(\w+)\}/g, (_, k) => vars[k]);
  return s;
}

// data-i18n(텍스트) · data-i18n-title · data-i18n-aria 속성이 붙은 요소를 현재 언어로 채운다
export function applyStatic(root = document) {
  document.documentElement.lang = lang;
  root.querySelectorAll('[data-i18n]').forEach((el) => { el.textContent = t(el.dataset.i18n); });
  root.querySelectorAll('[data-i18n-title]').forEach((el) => { el.title = t(el.dataset.i18nTitle); });
  root.querySelectorAll('[data-i18n-aria]').forEach((el) => { el.setAttribute('aria-label', t(el.dataset.i18nAria)); });
}

// 작전 콘텐츠: 한국어는 파일 본문, 영어는 play.en 블록. 빠진 항목은 한국어로 채운다.
export function localize(play, l = lang) {
  const base = {
    name: play.name, summary: play.summary, when: play.when, keys: play.keys,
    counters: play.counters, famous: play.famous,
    steps: play.steps.map((s) => ({ title: s.title, text: s.text })),
  };
  const e = l === 'en' ? play.en : null;
  if (!e) return base;
  return {
    name: e.name ?? base.name,
    summary: e.summary ?? base.summary,
    when: e.when ?? base.when,
    keys: e.keys ?? base.keys,
    counters: e.counters ?? base.counters,
    famous: e.famous ?? base.famous,
    steps: base.steps.map((s, i) => ({ title: e.steps?.[i]?.title ?? s.title, text: e.steps?.[i]?.text ?? s.text })),
  };
}
