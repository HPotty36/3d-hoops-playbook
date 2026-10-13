# Reads and Library Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Every current play gets 2–4 animated defensive reads with a branch-point prompt and tabs, and the play list scales to 40+ plays with sections, search and a mobile sheet.

**Architecture:**
- **Reads:** a play may carry a `reads` block. `js/reads.js` (pure) turns play + read id into an ordinary play object (shared steps + the read's steps) that the existing `compilePlay` and `localize` consume unchanged.
- **UI modules:** `js/reads-ui.js` renders tabs and the prompt, and `js/library.js` renders the searchable list. `main.js` owns playback state.
- **Engine:** gets one fix so defenders never snap (spec, "Engine fix").

**Tech Stack:** Vanilla ES modules, Three.js 0.160.0 (import map, CDN), no build step. Tests run on `node:test` (Node ≥ 20) with `three@0.160.0` as a dev dependency.

**Spec:** `docs/specs/2026-10-13-reads-and-library.md`

## Global Constraints

- The site stays build-free static files. The import map and CDN URLs in `index.html` are unchanged, and `package.json`/`tests/` are dev-only.
- Positions stay pure functions of `t`: no frame-to-frame state in the engine.
- Play content keeps Korean fields at the top level and English in the `en` block. Every new UI string goes into both `ko` and `en` in `js/i18n.js`.
- No real player, team or league names in any new content. Reads have no `famous` field. The word "NBA" never appears.
- Every `localStorage` access is wrapped in try/catch.
- **Motion limits** (sampled every 1/120 s):
  - offense ≤ 25 ft/s, defense ≤ 38 ft/s;
  - 3-point shots from ≥ 22 ft, 2-point shots from < 23.75 ft;
  - no NaN anywhere.
- Read ids match `/^[a-z0-9-]+$/` and are unique within a play. `reads.at` satisfies `1 ≤ at < steps.length`. No ball flight crosses the branch time.
- **Layout:** mobile layout applies at `max-width: 1100px`, and everything must work at 360 px width.
- **Code style:** Korean comments, 2-space indent, single quotes, the existing `$`/`$$` helpers, no new runtime dependencies.
- **Git:** work on branch `reads-and-library` in the public repo, with per-repo identity `HPotty36`. Every commit message ends with `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.
- **Paths:** the public repo lives at `<scratch>/nba-3d-playbook`, the app repo at `C:\Users\hg kim\3d-hoops-playbook-app`.
- **npm on Windows:** run npm from Bash. In PowerShell, `npm` resolves to a stray `system32` file.

## Review Focus

1. **Language switch** while a read is selected or the prompt is open: tabs, prompt, captions and the step list re-render in the new language. The read, `t` and the playing state are kept. Covered in Task 6, step 7.
2. **Picking another play** while the prompt is open: the prompt closes, the read resets to base and `?read` is removed. Covered in Task 6, step 7.
3. **Loop mode** after choosing a read: the loop replays the chosen read with no prompt, since `readChosen` resets only on a play change. Covered in Task 6, step 7.
4. **Scrubbing or step buttons** while the prompt is open: the prompt closes without choosing. Playing across the branch again prompts only if no read was chosen. Covered in Task 6, step 7.
5. **Search with zero results** (e.g. Korean query in EN mode plus a difficulty filter): "No plays found" shows, the current play stays selected and playing, and ↑/↓ still cycle through all plays. Covered in Task 4, step 6.

---

### Task 1: Test harness and defender smoothing

**Files:**
- Create: `package.json`, `tests/helpers.mjs`, `tests/plays.test.mjs`
- Modify: `.gitignore` (add `node_modules/`), `js/engine.js` (defense section, currently lines 163–237)

**Interfaces:**
- Produces: `sampleMotion(cp, dt = 1/120) → { nan: boolean, maxOff: number, maxDef: number, whereDef: string, shots: [{ pts, dist }] }` in `tests/helpers.mjs`. The `shots` list pairs each `cp.bsegs` shot with its `cp.scores` entry by order. Later test tasks reuse this.
- Produces: `npm test` = `node --test tests/`.

- [ ] **Step 1: Add `package.json`**: `{ "private": true, "type": "module", "scripts": { "test": "node --test tests/" }, "devDependencies": { "three": "0.160.0" } }`. Add `node_modules/` to `.gitignore`. Run `npm install` from Bash.

- [ ] **Step 2: Write the failing test** `tests/plays.test.mjs`. It covers every play in `PLAYS` (base steps only for now).

```js
test('<id>: motion stays physical', () => {
  const m = sampleMotion(compilePlay(play));
  assert.equal(m.nan, false);
  assert.ok(m.maxOff <= 25, `offense ${m.maxOff.toFixed(1)} ft/s`);
  assert.ok(m.maxDef <= 38, `defense ${m.maxDef.toFixed(1)} ft/s at ${m.whereDef}`);
  for (const s of m.shots) assert.ok(s.pts === 3 ? s.dist >= 22 : s.dist < 23.75, `${s.pts}pt from ${s.dist.toFixed(1)} ft`);
});
```

- [ ] **Step 3: Run it to confirm it fails.** Run `npm test`. Expected: all 10 defense assertions fail, with values between 127 and 408 ft/s.

- [ ] **Step 4: Fix the engine (spec, "Engine fix").** Make three changes in `compilePlay`.
  - **(a) Ownership ramp.** Add `ownW(man, t)` over `bsegs`:
    - 1 inside a `hold` of `man`;
    - `smooth(u)` during a `flight` whose `target === man`;
    - `1 - smooth((t - hold.t1) / OWN_OUT)` for `OWN_OUT = 0.45` s after a hold of `man` ends.
    - Take the max over segments.

    `autoPos` then returns `lerp2(helpSpot, onBallSpot, w)`, where `onBallSpot` is today's holder branch and `helpSpot` is today's off-ball branch moved into a helper.
  - **(b) Soft collision push.** Use `soft(l, R) = R * Math.sin(Math.PI * l / (2 * R))`.
    - First, two passes of defender–defender separation. Each defender moves by `(soft(l, R_DEF) - l) / 2`.
    - Then one pass of offense pushes, placing the defender at `o + n * soft(l, R_OFF)`.
  - **(c) Blend from raw positions.** Split `evalDefIn` into `evalRaw(k, t)` (no resolve) and `evalDefIn = (k, t) => resolve(evalRaw(k, t), t)`. `defStart[k]` and defense path starts use `evalRaw`.

  A working prototype of exactly these changes is saved at `<scratchpad>/engine-smoothing.diff` for reference. Its whitespace noise comes from CRLF and should be ignored.

- [ ] **Step 5: Run the tests to confirm they pass.** Run `npm test`. Expected: 10 passing, with defense ≤ ~37 ft/s.

- [ ] **Step 6: Check it visually.** Serve the site (`.claude/launch.json` config `playbook`, port 8765). In the top camera (`?cam=top`), take screenshots of Pick and Roll at t = 2.4 and Floppy at t = 2.4.
  - Expected: screened defenders are still visibly held up by the screener.
  - Expected: no defender stands inside an offensive player at the screen moment.
  - Expected: no console errors.

- [ ] **Step 7: Commit**: `git add package.json package-lock.json .gitignore tests js/engine.js && git commit -m "Smooth defender motion; add play motion tests"`

### Task 2: `js/reads.js`

**Files:**
- Create: `js/reads.js`, `tests/reads.test.mjs`

**Interfaces:**
- Produces (all pure, no DOM, no i18n import):
  - `readIds(play) → string[]`: base id first, then option ids. Returns `[]` when the play has no `reads`.
  - `variant(play, readId) → play`:
    - For an option id: `{ ...play, steps: [...play.steps.slice(0, at), ...opt.steps], en: { ...play.en, steps: [...(play.en?.steps ?? []).slice(0, at), ...(enOpt?.steps ?? [])] } }`.
    - For the base id, an unknown id or `null`: `play` itself (same reference).
  - `branchTime(play) → number`: sum of `dur` over `steps.slice(0, at)`. Returns 0 without reads.
  - `readMeta(play, lang) → null | { at, prompt, reads: [{ id, label, why }] }`: base first. English values come from `play.en.reads`, matched by index, with Korean as the fallback.

- [ ] **Step 1: Write the failing tests** against a small inline fixture play.
  - The fixture has 3 steps, `reads.at = 1` and one option `switch` with 1 step, plus an `en.reads` block.
  - Tests:
    - `readIds(fixture)` deep-equals `['drop', 'switch']`, and `readIds(noReads)` deep-equals `[]`.
    - `variant(fixture, 'drop') === fixture`, and the same holds for `variant(fixture, 'nope')`.
    - `variant(fixture, 'switch').steps.length === 2`; `steps[0] === fixture.steps[0]`; `steps[1] === fixture.reads.options[0].steps[0]`; `en.steps[1].title` equals the English option step title.
    - `branchTime(fixture)` equals `fixture.steps[0].dur`, and `branchTime(noReads) === 0`.
    - `readMeta(fixture, 'en').reads[1]` deep-equals `{ id: 'switch', label: 'Switch', why: '…en…' }`. `readMeta(fixture, 'ko').prompt` is the Korean prompt. `readMeta(noReads, 'ko') === null`.

- [ ] **Step 2: Run them to confirm they fail.** Run `npm test`. Expected: FAIL with `Cannot find module '…/js/reads.js'`.

- [ ] **Step 3: Implement `js/reads.js`** with the four exports above.

- [ ] **Step 4: Run the tests to confirm they pass.** Run `npm test`. Expected: all pass.

- [ ] **Step 5: Commit**: `git commit -m "Add reads module for branching plays"`

### Task 3: Library-wide content validation and `SECTIONS`

**Files:**
- Modify: `js/plays/index.js` (export `SECTIONS`; keep `CATEGORIES` as `SECTIONS.flatMap((s) => s.cats)`), `tests/plays.test.mjs`

**Interfaces:**
- Consumes: `readIds`, `variant`, `branchTime`, `readMeta` (Task 2); `sampleMotion` (Task 1).
- Produces: `SECTIONS` exactly as in the spec: `offense` with `['onball', 'offball', 'motion']`, plus `situations` and `defense`, both with `cats: []`.

- [ ] **Step 1: Write the failing data tests.** Add them to `tests/plays.test.mjs`. `SECTIONS` is undefined until Step 3, so these fail.
  - Play ids are unique and match `/^[a-z0-9-]+$/`.
  - Every `play.category` appears in some `SECTIONS[].cats`.
  - KO/EN parity:
    - `play.en.steps.length === play.steps.length`;
    - `play.en.counters.length === play.counters.length`;
    - `play.en.keys.length === play.keys.length`.
  - When `play.reads` exists:
    - `1 ≤ at < steps.length`;
    - ids are unique and URL-safe;
    - `en.reads.options.length === reads.options.length`;
    - for each option i, the English and Korean step counts match;
    - `label`, `why` and `prompt` are non-empty strings in both languages.
  - Every `counters[i].read` is in `readIds(play)`.

- [ ] **Step 2: Extend the motion test to every play × read.** Every read compiled via `variant` must pass the Task 1 motion assertions. Add a prefix-identity check:
  - For `t` from 0 to `branchTime(play)` in 1/120 s steps, offense, defense and ball positions of each option variant equal the base variant's within 1e-6.
  - Ball position: `cp.holderAt(t)` must be equal. When not held, compare `ballAir(cp.ballSegAt(t), t)`.

- [ ] **Step 3: Implement `SECTIONS`** in `js/plays/index.js`. Run `npm test`. Expected: all pass. No play has reads yet, so the read checks pass vacuously.

- [ ] **Step 4: Commit**: `git commit -m "Validate play content in tests; add library sections"`

### Task 4: Searchable library (desktop)

**Files:**
- Create: `js/library.js`, `tests/library.test.mjs`
- Modify:
  - `js/main.js`: remove `renderList`; mount the library into `#sidebar` after `.brand`; drop the mobile strip auto-scroll in `renderInfo`.
  - `index.html`: remove `<nav id="play-list">`.
  - `css/style.css`: library styles; remove the `#play-list` horizontal-strip rules under `max-width: 1100px`.
  - `js/i18n.js`: new keys.
  - All 10 `js/plays/*.js` files: add `aliases`.

**Interfaces:**
- Consumes: `SECTIONS`, `PLAYS` (Task 3); `readIds` (Task 2).
- Produces:
  - `normalize(s) → string`: lowercase, with whitespace and `-` removed.
  - `filterPlays(plays, query, level) → play[]`: `level` 0 means all, 1–3 means exactly that difficulty. A blank query matches everything. Otherwise `normalize(query)` must be a substring of `normalize` applied to `play.name`, `play.en?.name` or any of `play.aliases`.
  - `createLibrary({ plays, sections, tr, localize, onSelect, collapsed, onCollapse }) → { el, render(activeId), setActive(activeId), focusSearch() }`.
    - `collapsed` is a `Set` of section ids.
    - `onCollapse(ids: string[])` persists it.
    - `onSelect(index)` receives the index into `plays`.
- New i18n keys, ko / en:
  - `lib.search`: '작전 검색' / 'Search plays'
  - `lib.empty`: '맞는 작전이 없습니다' / 'No plays found'
  - `lib.all`: '전체' / 'All'
  - `lib.filter`: '난이도' / 'Difficulty'
  - `lib.reads`: '읽기 {n}' / '{n} reads'
  - `section.offense`: '공격 세트' / 'Offensive sets'
  - `section.situations`: '특수 상황' / 'Special situations'
  - `section.defense`: '수비 전술' / 'Defensive schemes'
  - The level chips reuse `level.1`–`level.3`.
- Prefs gain `collapsed: string[]`. Add it to `savePrefs()`.

- [ ] **Step 1: Write the failing tests** in `tests/library.test.mjs`, against real `PLAYS`.
  - `filterPlays(PLAYS, 'horns', 0)` contains `horns`, which matches the English name while the Korean name is 혼즈.
  - `filterPlays(PLAYS, '혼즈', 0)` contains `horns`.
  - `filterPlays(PLAYS, 'pnr', 0)` contains `pick-and-roll` via an alias.
  - `filterPlays(PLAYS, 'pick androll', 0)` contains `pick-and-roll`, since spaces are ignored.
  - `filterPlays(PLAYS, '', 3).every((p) => p.difficulty === 3)`.
  - `filterPlays(PLAYS, 'zzz', 0).length === 0`.
  - `normalize(' Pick-and Roll ') === 'pickandroll'`.

- [ ] **Step 2: Run them to confirm they fail.** Run `npm test`. Expected: FAIL, module not found.

- [ ] **Step 3: Add aliases and implement the pure functions.** Add `aliases` to every play. At minimum: pick-and-roll `['PnR', 'high pick and roll', 'ball screen']`, horns `['horns set', 'elbow']`. Each other play gets its common English and Korean alternate names. Then implement `normalize` and `filterPlays`, run `npm test`, and expect all pass.

- [ ] **Step 4: Implement the `createLibrary` DOM component.**
  - **Layout:** search input (`type="search"`, placeholder `lib.search`), then a chip group (All + 3 levels, `.seg` style, `aria-pressed`), then collapsible sections.
  - **Sections:** each header is a `<button aria-expanded>` with the localized name and a count. Category titles follow (`cat-title` style), then `.play-item` buttons. Each item has the name, difficulty dots and a `lib.reads` badge when `readIds(p).length > 0`.
  - **Hiding:** sections and categories with zero matches are hidden. An active query forces every section open.
  - **Empty state:** `lib.empty` shows when nothing matches.
  - **Keyboard:** `/` (outside inputs) calls `focusSearch()`. Escape in the search clears the query.
  - **Wiring in `main.js`:** `renderInfo` calls `setActive`, and `setLanguage` calls `render`.

- [ ] **Step 5: Browser check (desktop, 1440×900).** Expected:
  - Typing `pnr` shows only Pick and Roll.
  - The 심화 chip shows only difficulty-3 plays.
  - Collapsing 공격 세트, reloading, and seeing it still collapsed.
  - `/` focuses search.
  - No console errors.

- [ ] **Step 6: Review Focus #5.**
  - In EN mode, type `혼즈` with the Beginner chip on. Expected: `No plays found` is visible, the current play keeps playing, and ↓ selects the next play in `PLAYS` order.
  - Clear the search. Expected: the full list is back.

- [ ] **Step 7: Commit**: `git commit -m "Add searchable, sectioned play library"`

### Task 5: Mobile library sheet

**Files:**
- Modify:
  - `index.html`:
    - Wrap the title: `<h2><button id="btn-library" class="title-btn" type="button" data-i18n-aria="lib.open"><span id="hud-title"></span><svg class="chev" aria-hidden="true"><use href="#i-chevron" /></svg></button></h2>`.
    - Add an `#i-chevron` symbol.
    - Add `<dialog id="library-sheet" class="sheet">` containing a header (title `aria.plays`, close button using `#i-close`) and `<div class="sheet-body">`.
  - `js/main.js`, `css/style.css`, `js/i18n.js` (`lib.open`: '작전 목록 열기' / 'Open play list').

**Interfaces:**
- Consumes: `createLibrary(...).el`, `focusSearch()` (Task 4).

- [ ] **Step 1: Mount by breakpoint.** A `matchMedia('(max-width: 1100px)')` listener moves `library.el` into `#library-sheet .sheet-body` on mobile, and back into `#sidebar` after `.brand` on desktop. Run it once at init.

- [ ] **Step 2: Wire the title button.** `#btn-library` click: on mobile `sheet.showModal()`, on desktop `library.focusSearch()`. Choosing a play while the sheet is open calls `sheet.close()`. The close button and a backdrop click close the sheet.

- [ ] **Step 3: Style the sheet.**
  - **Sheet:** bottom sheet, full width, max-height 80dvh, rounded top corners, internal scroll, honoring `env(safe-area-inset-bottom)`.
  - **Chevron:** visible only at ≤1100 px.
  - **Title button:** looks like the current `h2` on desktop.
  - **Search field:** at least 16px font, so iOS doesn't zoom in on focus.

- [ ] **Step 4: Browser check** with puppeteer-core device emulation at 360×740 @3×, as `app` `scripts/store-assets.mjs` does. Expected:
  - Tapping the title opens the sheet.
  - Search works.
  - Tapping a play switches the play and closes the sheet.
  - No horizontal page scroll.
  - Screenshots in dark and light themes.
  - At 1440 px the sidebar list is unchanged from Task 4.

- [ ] **Step 5: Commit**: `git commit -m "Open the play library in a bottom sheet on mobile"`

### Task 6: Pick and Roll reads and the reads playback UI

**Files:**
- Create: `js/reads-ui.js`
- Modify:
  - `js/plays/pick-and-roll.js`: `reads`, `en.reads`, counter `read` ids, and a new `언더` / `Under` counter in both languages.
  - `js/main.js`, `index.html`, `css/style.css`, `js/i18n.js`.

**Interfaces:**
- Consumes: `readIds`, `variant`, `branchTime`, `readMeta` (Task 2).
- Produces:
  - `createReadsUI({ tabs, prompt, tr, fmt, onTab, onPick }) → { render(meta, currentId), setCurrent(id), showPrompt(meta, currentId), hidePrompt(), setPromptProgress(f) }`.
    - `meta` may be null, which hides the tabs.
    - `f` is a 0–1 fraction, or `null` for "waiting".
  - `window.__playbook.selectRead(id)`.
- New i18n keys, ko / en:
  - `branch.title`: '분기점' / 'Branch point'
  - `branch.continue`: '{label}(으)로 계속' / 'Continue with {label}'
  - `branch.tabs`: '수비 대응' / 'Defensive reads'
  - `branch.chip`: '읽기 · {label}' / 'Read · {label}'
  - `branch.divider`: '분기: {label}' / 'Read: {label}'
  - `branch.watch`: '보기' / 'Watch'
- **Markup:**
  - `<div id="read-tabs" class="seg read-tabs" role="group" data-i18n-aria="branch.tabs" hidden>` at the top of `.controls`, above `#transport`.
  - `<div id="branch-prompt" class="branch-prompt" hidden>` inside `#viewport`.
  - `<p id="cap-read" class="cap-read" hidden><span class="chip"></span><span class="why"></span></p>` before `#cap-text`.

- [ ] **Step 1: Write the content.** In `pick-and-roll.js`, add `reads` with `at: 1`, prompt '[x5]가 스크린을 어떻게 막나요?' and base `{ id: 'drop', label: '드롭' }`, plus four options. Each option has 1–2 steps (`dur` 1.5–2.2) and the existing caption voice: `[n]`/`[x n]` chips and **bold** terms.
  - **`hedge` (헤지):** [x5] jumps out above the screen. [1] retreat-dribbles, [5] rolls into the gap, and the pass leads to a 4-on-3 finish.
  - **`switch` (스위치):** `def: { d1: { guard: 'o5' }, d5: { guard: 'o1' } }`. [5] seals [x1] deep, and an entry or lob pass leads to a finish.
  - **`blitz` (블리츠):** [x5] path traps the handler with [x1]. [1] pockets a pass to [5] on the short roll. [x4] tags, and [5] kicks to the left corner for a 3.
  - **`under` (언더):** [x1] goes under the screen with a low `sag`. [1] stops behind the screen for a pull-up 3.

  Add `read` ids to the matching counters, including the new Under counter, in both languages. Add `en.reads` with the full English text.

- [ ] **Step 2: Run the content tests.** Run `npm test`. Expected: all pass, including prefix identity and motion for 5 reads. If motion fails, fix the step's timing or paths, never the limits.

- [ ] **Step 3: Implement `reads-ui.js`.**
  - **Tabs:** one button per read with `aria-pressed`, `onTab(id)` on click.
  - **Prompt:**
    - `branch.title` eyebrow, `fmt(meta.prompt)`, then one button per read (base first, current one marked).
    - A progress bar driven by `setPromptProgress`.
    - A continue hint `branch.continue` with `<kbd>Enter</kbd>`.
    - `onPick(id)` on click.

- [ ] **Step 4: Integrate playback in `main.js`.**
  - **State:** `state.read`, `state.readChosen`, `state.prompt` (`null` | `{ wait: true }` | `{ remaining, total }`).
  - **Cache:** a compile cache keyed `${play.id}:${readId}`. `content()` becomes `localize(state.cp.play)`.
  - **`selectRead(id)`:**
    1. Validate the id against `readIds`, falling back to base. Set `state.read` and `readChosen = true`. Close any prompt.
    2. If `state.t >= branchTime`, set `state.t = branchTime`.
    3. Swap `state.cp`, rebuild notation and `renderInfo()`, set `prevT = state.t`, and sync the `?read` param (removed for base).
    4. If playing and at the branch time, call `beginStep(at)`.
  - **`selectPlay`:**
    - resets `read` to base and `readChosen = false`;
    - closes the prompt;
    - removes `?read`;
    - calls `readsUI.render`.
  - **`advance()` at the branch:** when the step index crosses into `at`, `!readChosen` holds and `readMode !== 'off'`, set `t` to the branch time and open the prompt instead of calling `beginStep`.
    - Step mode: `playing = false`, `prompt = { wait: true }`.
    - Auto and relaxed: `prompt = { remaining: readTime(prompt) * READ_FACTOR[mode] }`.
    - While playing with a timed prompt, decrement it. At zero, call `pickRead(state.read)`.
  - **`pickRead(id)`:** `selectRead(id)`, then `playing = true`, then `beginStep(at)`.
  - **Choosing via existing controls:** `skipWait`, `togglePlay` and switching reading mode to Off call `pickRead(state.read)` while a prompt is open.
  - **Closing without choosing:** timeline pointerdown, `seekStep`, `restart` and `selectPlay` close the prompt.
  - **Timeline:** `buildTimeline` adds class `branch` to `segEls[at]`, drawn as a ◆ via `::before` at the segment's left edge.
  - **Caption:** `showCaption(k)` shows `#cap-read` (chip `branch.chip` + `why`) only when `k === at` and the play has reads.
  - **Step list:** `renderInfo` inserts `<li class="branch-divider">` (`branch.divider`) before step `at`. Selectors that index steps use `#info-steps li:not(.branch-divider)`.
  - **Counters:** entries whose raw `PLAYS[state.idx].counters[i].read` is valid get a `branch.watch` button that runs `selectRead(id); seekStep(at - 1, true)`.
  - **On load:** after `selectPlay`, apply `?read=` when it names a valid non-base id, before applying `?t=`.
  - **Test hook:** add `selectRead` to `window.__playbook`.

- [ ] **Step 5: Style the new elements.** Style tabs (horizontal scroll at narrow widths), the prompt card centered over the court (readable at 360 px; buttons ≥ 40 px high), the ◆ marker, `.cap-read` and `.branch-divider` in both themes.

- [ ] **Step 6: Browser check of the core flow** on Pick and Roll in each reading mode.
  - **Step mode:** the prompt waits at t = 1.7. Picking 스위치 continues, the caption shows the why row, and the step list shows the divider.
  - **Auto mode:** the prompt counts down and continues with 드롭.
  - **Off mode:** no prompt.
  - **Tabs:** clicking a tab before the branch keeps `t`. After the branch it jumps to 1.7.
  - **Links:** `?read=blitz#pick-and-roll` opens on blitz, and `?read=nope` opens on base without errors.
  - **Watch:** the Watch button on the 블리츠 counter plays from t = 0.
  - **Console:** no errors.

- [ ] **Step 7: Review Focus #1–#4.**
  - **#1, language switch:** with the prompt open, switch KO→EN. Expected: the prompt and tabs show English, and the read and `t` are unchanged. With 스위치 selected mid-play, switch again. Expected: captions and the divider show English, and playback continues.
  - **#2, play change:** with the prompt open, press ↓. Expected: the prompt is hidden, the next play loads on base, and the URL has no `read`.
  - **#3, loop:** with loop on, choose 블리츠 and let it end. Expected: it restarts on blitz with no prompt.
  - **#4, scrubbing:** with the prompt open, drag the timeline to t = 0.5. Expected: the prompt closes. Press play. Expected: the prompt appears at the branch again.

  Check each state with `javascript_tool` (`__playbook.state.read`, `state.prompt`, `location.search`) plus one screenshot.

- [ ] **Step 8: Commit**: `git commit -m "Add Pick and Roll reads with branch prompt and read tabs"`

### Tasks 7–9: Reads for the remaining plays

Each task covers three plays. Each play gets a `reads` block per the spec table, English text, counter `read` ids and one-line `why` lines. The base `id`/`label` names what the defense does in the existing steps. Recommended `at` values are below; change one only if the tests or the choreography demand it.

| Task | Play (`at`) | Options (id: label) |
|---|---|---|
| 7 | pick-and-pop (1) | `switch`: 스위치, `up-to-touch`: 업 투 터치, `rotation`: 로테이션 |
| 7 | spain-pick-and-roll (1) | `stay-home`: 슈터 고정, `avoid-back-screen`: 백스크린 피하기, `all-switch`: 올 스위치 |
| 7 | horns (1) | `switch`: 스위치, `elbow-deny`: 엘보 디나이, `push-side`: 한쪽으로 몰기 |
| 8 | floppy (1) | `trail`: 트레일, `top-lock`: 탑 락킹, `switch`: 스위치 |
| 8 | elevator-doors (1) | `go-around`: 문 바깥으로 돌기, `switch`: 스위치, `help-recover`: 헬프 앤 리커버 |
| 8 | iverson-cut (1) | `under`: 언더 추격, `switch`: 스위치, `bump`: 범프 |
| 9 | chicago (2) | `trail`: 트레일, `handoff-switch`: 핸드오프 스위치, `handoff-deny`: 핸드오프 차단 |
| 9 | hammer (1) | `no-help`: 노 헬프, `rotation-switch`: 로테이션 스위치, `baseline-deny`: 베이스라인 차단 |
| 9 | split-action (2) | `switch`: 스위치, `stay-screener`: 스크리너 고정, `no-post-help`: 포스트 도움 금지 |

What each read shows comes from the spec's content table, e.g. floppy `trail` → curl, `top-lock` → backdoor.

Steps per task:

- [ ] **Step 1: Write the content.** Author the three plays' `reads` and `en.reads`, and add the counter `read` ids.
- [ ] **Step 2: Run the tests.** Run `npm test`. Expected: all pass. Fix timing or paths, never the limits.
- [ ] **Step 3: Browser check.** For every new read, take one top-camera screenshot at the read's key moment (the pass or the shot). Expected:
  - the prompt lists the right labels in KO and EN;
  - captions match what happens on screen;
  - no console errors.
- [ ] **Step 4: Commit**: `git commit -m "Add reads for <play>, <play>, <play>"`

### Task 10: Docs, merge, app rebuild

**Files:**
- Modify:
  - `README.md` (English section and the Korean `<details>` section): the play format with `reads` and `aliases`, `npm test`, a short "Reads" feature line.
  - `docs/design.md`: modules table rows for `reads.js`, `reads-ui.js`, `library.js`; time-model bullets for the ownership ramp and soft push.
- App repo: the `web` submodule pointer.

- [ ] **Step 1: Update both docs, then run `npm test`.** Expected: all pass.
- [ ] **Step 2: Check the whole branch in the browser.** Play every play on every read once at 1.5× with reading mode Off. Expected: no console errors. Take desktop screenshots in both themes.
- [ ] **Step 3: Commit, merge and push.** Commit the docs. Then `git fetch` and rebase onto `origin/main`; the user merges other sessions' PRs, so resolve any conflicts. Merge `reads-and-library` into `main` and push. Expected: the GitHub Pages site serves the new version within a few minutes.
- [ ] **Step 4: Rebuild the app.** In `C:\Users\hg kim\3d-hoops-playbook-app`:
  1. Run `git -C web fetch && git -C web checkout origin/main`.
  2. Run `npm run apk` from Bash. Expected: `www/ ready`, the store check passes, `BUILD SUCCESSFUL`.
  3. Scan the APK assets for `NBA` and external URLs. Expected: none.
  4. Commit `Update web content: reads and library` and push.
