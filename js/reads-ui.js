// 수비 대응별 분기 UI: 타임라인 위의 읽기 탭과, 분기점에서 코트 위에 뜨는 선택지.
// 재생 상태는 main.js가 갖고, 여기서는 그리기와 클릭 전달만 한다.
const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

// meta: reads.js의 readMeta() 결과(없으면 null). fmt: [1]/[x1]/**굵게** 표기를 HTML로 바꾸는 함수.
export function createReadsUI({ tabs, prompt, tr, fmt, onTab, onPick }) {
  const bar = tabs.parentElement;
  let current = null;

  function render(meta, currentId) {
    current = currentId;
    bar.hidden = !meta;
    if (!meta) { tabs.innerHTML = ''; return; }
    tabs.innerHTML = meta.reads.map((r) =>
      `<button type="button" data-read="${r.id}" aria-pressed="${r.id === currentId}">${esc(r.label)}</button>`).join('');
    tabs.querySelectorAll('button').forEach((b) => b.addEventListener('click', () => onTab(b.dataset.read)));
  }

  function setCurrent(id) {
    current = id;
    tabs.querySelectorAll('button').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.read === id)));
    prompt.querySelectorAll('.bp-options button').forEach((b) => b.classList.toggle('current', b.dataset.read === id));
  }

  function showPrompt(meta, currentId) {
    current = currentId;
    const cur = meta.reads.find((r) => r.id === currentId) || meta.reads[0];
    prompt.innerHTML = `
      <p class="bp-eyebrow">${esc(tr('branch.title'))}</p>
      <p class="bp-q" id="bp-q">${fmt(meta.prompt)}</p>
      <div class="bp-options">${meta.reads.map((r) =>
        `<button type="button" data-read="${r.id}" class="${r.id === currentId ? 'current' : ''}">${esc(r.label)}</button>`).join('')}</div>
      <div class="bp-foot">
        <span class="bp-bar" hidden><i></i></span>
        <span class="bp-hint">${esc(tr('branch.continue', { label: cur.label }))} <kbd>Enter</kbd></span>
      </div>`;
    prompt.querySelectorAll('.bp-options button').forEach((b) => b.addEventListener('click', () => onPick(b.dataset.read)));
    prompt.hidden = false;
  }

  function hidePrompt() {
    prompt.hidden = true;
    prompt.innerHTML = '';
  }

  // f: 0~1 남은 읽는 시간에 따른 진행도, null이면 선택을 기다리는 중(막대 숨김)
  function setPromptProgress(f) {
    const b = prompt.querySelector('.bp-bar');
    if (!b) return;
    b.hidden = f == null;
    if (f != null) b.firstElementChild.style.width = `${Math.round(f * 1000) / 10}%`;
  }

  return { render, setCurrent, showPrompt, hidePrompt, setPromptProgress, get current() { return current; } };
}
