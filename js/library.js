// 작전 목록: 갈래(공격 세트 / 특수 상황 / 수비 전술)별로 접고 펼치며, 검색과 난이도로 거른다.
// filterPlays·normalize는 DOM이 없는 순수 함수라 Node 테스트에서도 쓴다.
import { readIds } from './reads.js';

// 대소문자, 공백, 하이픈을 무시하고 &는 and로 읽는다 ('Pick-and Roll', 'pick & roll' → 'pickandroll')
export function normalize(s) {
  return String(s).toLowerCase().replace(/[&＆]/g, 'and').replace(/[\s-]+/g, '');
}

// 갈래 이름으로도 찾는다 (두 언어의 갈래·큰 갈래 이름 + 흔히 쓰는 말). labelsFor(key) → [한국어, 영어]
const CAT_EXTRA = { blob: ['inbound', 'inbounds', 'BLOB'], slob: ['inbound', 'inbounds', 'SLOB'], ato: ['ATO'] };
export function categoryTerms(sections, labelsFor) {
  const out = {};
  for (const sec of sections) {
    for (const cat of sec.cats) out[cat] = [...labelsFor(`cat.${cat}`), ...labelsFor(`section.${sec.id}`), ...(CAT_EXTRA[cat] || [])];
  }
  return out;
}

// BLOB·SLOB 같은 약어는 앞에서부터만 맞춘다 ('lob'이 BLOB에 걸리지 않게). 나머지는 어디든 포함되면 찾는다
const ACRONYM = /\b[A-Z]{2,}\b/g;
function matches(s, q) {
  const n = normalize(s);
  if (n.startsWith(q)) return true;
  if (normalize(s.replace(ACRONYM, ' ')).includes(q)) return true;
  return (s.match(ACRONYM) || []).some((a) => normalize(a).startsWith(q));
}

// 한국어 이름, 영어 이름, 별칭, 갈래 이름을 UI 언어와 상관없이 모두 찾는다. level 0 = 전체, 1~3 = 그 난이도만.
export function filterPlays(plays, query, level, catTerms = {}) {
  const q = normalize(query);
  return plays.filter((p) => {
    if (level && p.difficulty !== level) return false;
    if (!q) return true;
    return [p.name, p.en?.name, ...(p.aliases || []), ...(catTerms[p.category] || [])].some((s) => s && matches(String(s), q));
  });
}

// 조합 중인 검색어: 결과가 있으면 바로 쓰고, 중간 글자(혼ㅈ)로 0개가 되면 직전 검색어를 그대로 둔다
export function composingQuery(plays, prev, next, level, catTerms = {}) {
  return filterPlays(plays, next, level, catTerms).length ? next : prev;
}

// 목록에 보이는 순서(큰 갈래 → 갈래 → 등록 순서)로 정렬한 인덱스. 검색어와 난이도를 따른다
export function listOrder(plays, sections, query, level, catTerms = {}) {
  const hits = new Set(filterPlays(plays, query, level, catTerms));
  return sections.flatMap((sec) => sec.cats.flatMap((cat) => plays
    .map((p, i) => [p, i]).filter(([p]) => p.category === cat && hits.has(p)).map(([, i]) => i)));
}

const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

// onSelect(index): plays 배열의 인덱스. collapsed: 접힌 갈래 id의 Set. onCollapse(ids): 저장용.
export function createLibrary({ plays, sections, tr, localize, onSelect, collapsed, onCollapse, catTerms = {} }) {
  const el = document.createElement('div');
  el.className = 'library';
  el.innerHTML = `
    <label class="lib-search">
      <svg aria-hidden="true"><use href="#i-search" /></svg>
      <input type="search" autocomplete="off" spellcheck="false" />
    </label>
    <div class="seg lib-levels" role="group"></div>
    <nav class="lib-list"></nav>
    <p class="lib-empty" role="status" hidden></p>`;
  const input = el.querySelector('input');
  const levels = el.querySelector('.lib-levels');
  const list = el.querySelector('.lib-list');
  const empty = el.querySelector('.lib-empty');
  let query = '';
  let level = 0;
  let activeId = null;

  // 조합 중(한글 음절, Gboard의 영어 단어)에도 바로 거르되, 빈 결과는 조합이 끝난 뒤에만 보여 준다
  input.addEventListener('input', (e) => {
    query = e.isComposing ? composingQuery(plays, query, input.value, level, catTerms) : input.value;
    renderList();
  });
  input.addEventListener('compositionend', () => { query = input.value; renderList(); });
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && input.value) { e.preventDefault(); input.value = ''; query = ''; renderList(); }
  });

  const dotsHtml = (n) => [1, 2, 3].map((d) => `<i class="${d <= n ? 'on' : ''}"></i>`).join('');

  // 난이도 칩은 목록과 같은 점(●○○)으로 보여 준다. 이름은 툴팁과 스크린 리더용 라벨로.
  function renderLevels() {
    levels.setAttribute('aria-label', tr('lib.filter'));
    levels.innerHTML = [0, 1, 2, 3].map((n) => {
      if (!n) return `<button type="button" data-level="0" aria-pressed="${level === 0}">${esc(tr('lib.all'))}</button>`;
      const name = esc(tr(`level.${n}`));
      return `<button type="button" data-level="${n}" aria-pressed="${n === level}" title="${name}" aria-label="${name}"><span class="diff">${dotsHtml(n)}</span></button>`;
    }).join('');
    levels.querySelectorAll('button').forEach((b) => b.addEventListener('click', () => {
      level = +b.dataset.level;
      levels.querySelectorAll('button').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
      renderList();
    }));
  }

  function itemHtml(p) {
    const i = plays.indexOf(p);
    const diff = tr('diff', { n: p.difficulty });
    const n = readIds(p).length;
    const reads = n ? `<span class="reads-badge">${esc(tr('lib.reads', { n }))}</span>` : '';
    return `<button type="button" class="play-item" data-idx="${i}" data-id="${p.id}">
      <span class="nm">${esc(localize(p).name)}</span>${reads}
      <span class="diff" title="${diff}">${dotsHtml(p.difficulty)}<span class="sr-only">${diff}</span></span></button>`;
  }

  function renderList() {
    const hits = new Set(filterPlays(plays, query, level, catTerms));
    const searching = normalize(query) !== '';
    let html = '';
    for (const sec of sections) {
      const inSec = plays.filter((p) => sec.cats.includes(p.category) && hits.has(p));
      if (!inSec.length) continue;
      const open = searching || !collapsed.has(sec.id);
      html += `<section class="lib-sec" data-sec="${sec.id}">
        <button type="button" class="sec-head" aria-expanded="${open}">
          <span>${esc(tr(`section.${sec.id}`))}</span><span class="count">${inSec.length}</span>
          <svg aria-hidden="true"><use href="#i-chevron" /></svg></button>
        <div class="sec-body"${open ? '' : ' hidden'}>`;
      for (const cat of sec.cats) {
        const inCat = inSec.filter((p) => p.category === cat);
        if (!inCat.length) continue;
        html += `<div class="cat-title">${esc(tr(`cat.${cat}`))}</div>${inCat.map(itemHtml).join('')}`;
      }
      html += '</div></section>';
    }
    list.innerHTML = html;
    // 결과가 없으면 빈 목록 대신 안내 문구를 검색창 바로 아래에 둔다
    list.hidden = hits.size === 0;
    empty.hidden = hits.size > 0;
    list.querySelectorAll('.play-item').forEach((b) => b.addEventListener('click', () => onSelect(+b.dataset.idx)));
    list.querySelectorAll('.sec-head').forEach((h) => h.addEventListener('click', () => {
      if (normalize(query)) return;   // 검색 중에는 갈래가 모두 펼쳐져 있으므로 접기 상태를 바꾸지 않는다
      const id = h.closest('.lib-sec').dataset.sec;
      if (collapsed.has(id)) collapsed.delete(id); else collapsed.add(id);
      onCollapse([...collapsed]);
      renderList();
    }));
    setActive(activeId);
  }

  function setActive(id) {
    activeId = id;
    list.querySelectorAll('.play-item').forEach((b) => {
      const on = b.dataset.id === id;
      b.classList.toggle('active', on);
      if (on) b.setAttribute('aria-current', 'true');
      else b.removeAttribute('aria-current');
    });
  }

  // 언어가 바뀌면 문구까지 다시 그린다 (검색어와 필터는 유지)
  function render(id = activeId) {
    activeId = id;
    input.placeholder = tr('lib.search');
    input.setAttribute('aria-label', tr('lib.search'));
    list.setAttribute('aria-label', tr('aria.plays'));
    empty.textContent = tr('lib.empty');
    renderLevels();
    renderList();
  }

  // ↑/↓로 옮겨 다닐 순서: 지금 검색어·난이도로 보이는 작전들 (접힌 갈래도 포함하고, 그 작전으로 가면 펼친다)
  const order = () => listOrder(plays, sections, query, level, catTerms);
  function reveal(id) {
    const p = plays.find((x) => x.id === id);
    const sec = p && sections.find((s) => s.cats.includes(p.category));
    if (!sec || !collapsed.has(sec.id) || normalize(query)) return;
    collapsed.delete(sec.id);
    onCollapse([...collapsed]);
    renderList();
  }

  return { el, render, setActive, order, reveal, focusSearch: () => { input.focus(); input.select(); } };
}
