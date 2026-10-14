# Advanced Sets Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix the nine sub-project 1 minors, then add 14 advanced plays with 31 reads in four groups, each released to the web and the app when done.

**Architecture:**
- **Engine and UI:** the minor fixes touch `engine.js` (displacement sum, window cache), `main.js`, `library.js` and `reads-ui.js`.
- **Content:** new plays are data files in `js/plays/` using the existing `reads` format and are registered in `js/plays/index.js`.
- **Releases:** each group ends in a release task — review, merge to `main`, push, app version bump, APK.

**Tech Stack:** Vanilla ES modules, Three.js 0.160.0 via CDN import map (build-free site). `node:test` on Node 21+. Capacitor 8 for the Android app in the private repo.

**Spec:** `docs/specs/2026-10-14-advanced-sets.md`. The earlier spec, `docs/specs/2026-10-13-reads-and-library.md`, still defines the play/read format.

## Global Constraints

- The site stays build-free. `package.json` and `tests/` are dev-only.
- Positions stay pure functions of `t`. Any cache must give the same result regardless of query order (within 1e-4 ft).
- Play content: Korean at the top level, English in `en`. Every new UI string goes into both `ko` and `en`. Captions use `[n]`/`[xn]` chips and **bold**, and use no gendered pronouns for players.
- **Real names:** no real player, team or league names in any field except `famous`. The word "NBA" never appears. `aliases` use generic terms only.
- **`famous`:** filled only where the attribution is well established. Use these where they apply:
  - Princeton Chin: Princeton University under Pete Carril; Sacramento Kings, early 2000s.
  - Sideline Triangle: Tex Winter; the Chicago Bulls and Los Angeles Lakers under Phil Jackson.
  - Flex: Utah Jazz under Jerry Sloan.
  - UCLA Cut: UCLA under John Wooden.
  - Shuffle Cut: Bob Spear's Air Force Academy teams, 1950s.
  - Ghost Screen: Golden State Warriors, 2010s.

  Leave `famous` out of every other play (the info panel hides the empty block).
- **Motion limits** (unchanged; `npm test` enforces them):
  - offense ≤ 25 ft/s, defense ≤ 38 ft/s;
  - attacker gap ≥ 1.8 ft, defender gap ≥ 1.35 ft;
  - 3s from ≥ 22 ft, 2s from < 23.75 ft;
  - no ball flight crossing the branch point.
- **Tuning:** when a check fails, fix timing or paths, never the limits.
- **App versions:** group 1 → `versionCode 2` / `"1.1"`, group 2 → 3 / `"1.2"`, group 3 → 4 / `"1.3"`, group 4 → 5 / `"1.4"`. These live in `C:\Users\hg kim\3d-hoops-playbook-app\android\app\build.gradle`.
- **Git:**
  - Branches: `advanced-sets-1` … `advanced-sets-4`, each cut from the latest `main`. Per-repo identity is `HPotty36`.
  - Every commit message ends with `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.
  - Always `git fetch` before merging, because the user merges other sessions' PRs.
- **Tooling (Windows):**
  - Edit files with the Edit tool, or Python with `newline=''`; the repo enforces LF.
  - Write snippets that contain backslashes or `\'` with the Write tool, not heredocs.
  - Run npm from Bash.

## Review Focus

1. **Window-cache determinism:** sampling `defense(t)` in shuffled order must match sequential order within 1e-4 ft. A cache that depends on query order would make scrubbing land on different frames than playback. Covered in Task 1, step 6.
2. **Korean IME:** typing 혼즈 / 픽앤롤 must not flash "No plays found" between syllables, and the final result must appear on `compositionend`. Covered in Task 2, step 5.
3. **Keyboard focus:** choosing a read tab or Watch with the keyboard keeps focus on the matching control. In step mode, the prompt takes focus on its current option and gives it back to the play button. Covered in Task 2, step 5.
4. **New categories on a phone:** Early offense and System offenses must appear in the 360 px sheet in `SECTIONS` order, collapse, and be searchable. Covered in Task 5, step 4 and Task 9, step 4.
5. **Plays that start near half court** (early offense) must stay fully in frame in the coach and broadcast cameras at t = 0. Covered in Task 5, step 4.

---

### Task 1: Engine minor fixes (no twitch, window cache, end-of-play exit)

**Files:**
- Modify: `js/engine.js` (`resolve`, `aroundAngle`)
- Modify: `tests/helpers.mjs`, `tests/plays.test.mjs`
- Create: `tools/perf-defense.mjs`

**Interfaces:**
- Produces: `peakDefenseSpeed(cp, dt) → { v: number, where: string }` in `tests/helpers.mjs`.
- Produces: `node tools/perf-defense.mjs`, which prints worst `defense(t)` ms per play × read, worst first.

- [ ] **Step 1: Write the failing fine-sampling test.**
  - Add `peakDefenseSpeed(cp, dt)` to `helpers.mjs`. It samples only `cp.defense(t)` from 0 to `cp.end`.
  - Add the test: for every play × read, `peakDefenseSpeed(cp, 1/960).v <= 38`.
- [ ] **Step 2: Run it to confirm it fails.** Run `npm test`. Expected: FAIL on at least floppy `caught` (~150 ft/s), spain `all-switch` (~138) and floppy `trail` (~57). Note the total runtime. If it is over 30 s, keep the fine check on Floppy, Spain, Iverson Cut and Chicago only, and record a ruling.
- [ ] **Step 3: Sum displacements in `resolve`.** Start every defender's displacement at 0.
  - Each overlapping defender pair adds `(mid ± (R_DEF/2)·dir(ang)) − raw[x]` to each of its two defenders.
  - Each attacker whose circle contains `raw[d]` adds `(o + R_OFF·dir(ang)) − raw[d]` to `d`.
  - Result: `dp[d] = raw[d] + disp[d]`.
- [ ] **Step 4: Run the tests.** Run `npm test`. Expected: all pass, including the fine check.
- [ ] **Step 5: Write `tools/perf-defense.mjs`, then add the window cache and the end check.**
  - Run the script first and note the worst ms. Expected: about 0.5 ms.
  - Cache: keep, per compiled play, a `Map` from a pair key (`d1|o3`, `d2|d5`) to found windows `{ te, tx, a0, da }`. A query at `t` reuses a window when `te ≤ t ≤ tx`.
  - End check: in the forward scan, also test `end` itself before defaulting `tx = end`.
  - Re-run the script. Expected: worst ≤ 0.15 ms.
- [ ] **Step 6: Review Focus #1 test.** For pick-and-roll `hedge`, spain `all-switch` and floppy `trail`: sample `defense(t)` at 1/60 s sequentially on one compile, and in a seeded shuffled order on a fresh compile. Assert every defender matches within 1e-4 ft. Run `npm test`. Expected: all pass.
- [ ] **Step 7: Commit.** Message: `Stop defender twitches and cache collision windows`.

### Task 2: UI and content minor fixes

**Files:**
- Modify: `js/main.js` (`nextStep`, `selectRead`, `watchRead`, `openPrompt`, `closePrompt`), `js/reads-ui.js` (`render`), `js/library.js`, `index.html` (`#branch-prompt`), `js/plays/pick-and-pop.js`, `README.md`
- Create: `tests/docs.test.mjs`

**Interfaces:**
- `readsUI.render(meta, currentId)` now reuses its existing buttons when the read ids and labels are unchanged, and only updates `aria-pressed`. The signature is unchanged.

- [ ] **Step 1: Write the failing docs test.** In `tests/docs.test.mjs`:
  - `total` = the sum over `PLAYS` of `readIds(p).length || 1`.
  - Assert `README.md` contains `` `${total} reads` `` once in the English part and `` `${total}가지` `` once in the Korean part.
  - Assert it contains `Node 21+` and no `Node 20+`.
- [ ] **Step 2: Run it to confirm it fails.** Run `npm test`. Expected: FAIL, because the README says 31 and Node 20+ while the data gives 41.
- [ ] **Step 3: Fix the README and Pick and Pop.**
  - README: the English intro and the Korean intro both state `41 reads` / `41가지` (counting base reads). "3–5" becomes the actual range "4–5". "Node 20+" becomes "Node 21+".
  - `pick-and-pop.js`: base read label `헤지` / `Hedge`.
  - Run `npm test`. Expected: all pass.
- [ ] **Step 4: Apply the UI fixes.**
  - **`nextStep`:** the end branch calls `closePrompt()`.
  - **Search IME:** the `input` handler returns early when `e.isComposing`, and a `compositionend` handler sets `query` and renders.
  - **Section headers:** clicks are ignored while `normalize(query)` is non-empty.
  - **Read tabs:** `readsUI.render` reuses existing buttons when ids and labels match.
  - **Watch:** `watchRead` refocuses `#info-counters .watch[data-read=id]` after `selectRead`.
  - **Prompt:** `#branch-prompt` gets `aria-live="polite"`. In step mode, `openPrompt` focuses `.bp-options button.current`. `closePrompt` moves focus to `#btn-play` if focus was inside the prompt.
- [ ] **Step 5: Browser check of Review Focus #2 and #3.**
  - **IME:** dispatch `compositionstart`, then `input` events with `isComposing: true` for `혼ㅈ`, then `compositionend` with `혼즈`. Expected: `.lib-empty` never becomes visible, and horns is listed at the end.
  - **Tab focus:** focus the `스위치` tab, press Enter, then check `document.activeElement.dataset.read === 'switch'`. Do the same for a Watch button.
  - **Prompt focus (step mode):** when the prompt opens, `activeElement` is the current option. After picking, focus is on `#btn-play`.
  - **Header during search:** a header click while searching leaves `collapsed` unchanged.
  - **Console:** no errors.
- [ ] **Step 6: Commit.** Message: `Fix minor UI issues from the reads review`.

### Task 3: Group 1 plays — Side Pick and Roll, Ghost Screen, Weave

**Files:**
- Create: `js/plays/side-pick-and-roll.js`, `js/plays/ghost-screen.js`, `js/plays/weave.js`
- Modify: `js/plays/index.js` (import them and append to `PLAYS` after `horns`, in this order), `tests/plays.test.mjs`, `README.md` (play tables, both languages; counts follow the docs test), `docs/design.md` (play count)

**Interfaces:**
- Consumes: the play/read format from `docs/specs/2026-10-13-reads-and-library.md`.
- Ids, categories, difficulties, base reads and added reads exactly as in the spec content table, rows 1–3.

- [ ] **Step 1: Write the failing category-label test** in `tests/plays.test.mjs`. For `lang` of `ko` and `en`: `setLang(lang)`, then for every section `t('section.' + id) !== 'section.' + id`, and for every category in it `t('cat.' + c) !== 'cat.' + c`. Run `npm test`. Expected: PASS, since every current category has labels. This test guards Tasks 5 and 9; record that it passed immediately as a ruling.
- [ ] **Step 2: Write the three plays.**
  - **`reads.at`:** the number of steps before the defense commits.
  - **Counters:** list each added read with its `read` id, plus one text-only counter where useful.
  - **Aliases:**
    - side-pick-and-roll: `['side PnR', 'wing pick and roll', 'ICE', '사이드 픽앤롤']`
    - ghost-screen: `['ghost', 'fake screen', '고스트']`
    - weave: `['weave action', 'handoff weave', 'DHO weave', '핸드오프 위브']`
  - **`famous`:** Ghost Screen only (Golden State Warriors, 2010s).
- [ ] **Step 3: Run the tests and tune.** Run `npm test` and tune until all pass. Expected: all pass. The total read count rises by 11, so update the README numbers until the docs test passes.
- [ ] **Step 4: Browser check.** Take top-camera key-moment screenshots of every new read (base and added) and review that the motion matches the captions. Play every new play × read end to end at 1.5× with reading Off. Expected: no errors. Check the prompt labels in KO and EN.
- [ ] **Step 5: Commit.** Message: `Add Side Pick and Roll, Ghost Screen, and Weave with reads`.

### Task 4: Release 1

**Files:**
- App repo: `android/app/build.gradle` and the `web` submodule pointer.

- [ ] **Step 1: Review.** Build a review package for `main..advanced-sets-1` and run a fresh reviewer (most capable model) with the spec, this plan, the Review Focus and the ledger rulings. Fix Critical and Important findings, each with a test RED→GREEN. Ledger Minor findings as deferred.
- [ ] **Step 2: Merge and push.** Run `git fetch`, check that `main` has not moved (rebase if it has), fast-forward merge `advanced-sets-1` into `main`, run `npm test` (expected: all pass), push, delete the branch. Expected: the Pages build reports `built` at the merge commit.
- [ ] **Step 3: App release.**
  1. Move the submodule to the merge commit.
  2. Set `versionCode 2` / `versionName "1.1"`.
  3. Run `npm run apk`. Expected: `www/ ready` and `BUILD SUCCESSFUL`.
  4. Scan the APK assets. Expected: 0 `NBA`, 0 `famous:` in plays, 0 external URLs in js/css, and 13 plays with reads blocks.
  5. Run the store smoke test (offline load, reads and sheet work, no external requests).
  6. Commit `Release 1.1: advanced sets group 1` and push.
- [ ] **Step 4: Next branch.** Create `advanced-sets-2` from the new `main`.

### Task 5: Group 2 plays — Early offense: Double Drag, Pistol, Trailer Pop

**Files:**
- Create: `js/plays/double-drag.js`, `js/plays/pistol.js`, `js/plays/trailer-pop.js`
- Modify: `js/plays/index.js` (`SECTIONS` offense cats become `['onball', 'offball', 'motion', 'early']`; append the plays to `PLAYS` after `split-action`), `js/i18n.js` (`cat.early`: '얼리 오펜스' / 'Early offense'), `README.md`, `docs/design.md`

**Interfaces:**
- Spec content table rows 4–6.
- Starting positions may go up to z = 46 (inside half court).

- [ ] **Step 1: Add the category, then write the plays.**
  - **Category:** add `early` to `SECTIONS` before the plays exist. Run `npm test`. Expected: the category-label test fails until `cat.early` is added. Add it. Expected: pass.
  - **Aliases:**
    - double-drag: `['double drag screen', 'drag', '드래그']`
    - pistol: `['21', 'pistol action', 'early handoff', '21 액션']`
    - trailer-pop: `['trailer', 'drag and pop', '트레일러']`
  - **`famous`:** none.
- [ ] **Step 2: Run the tests and tune.** Run `npm test`. Expected: all pass, and the README counts follow the docs test.
- [ ] **Step 3: Browser check.** Key-moment screenshots, an end-to-end run of every play × read, and KO/EN prompt labels, as in Task 3, step 4.
- [ ] **Step 4: Review Focus #4 and #5.**
  - **#5, cameras:** at t = 0 in the coach and broadcast cameras, all 10 players are inside the viewport for each new play. Check with screenshots.
  - **#4, phone layout:** at 360×740 with puppeteer device emulation, the sheet lists Early offense after Motion & drive, collapses, and search `pistol` / `피스톨` finds it.
- [ ] **Step 5: Commit.** Message: `Add early offense: Double Drag, Pistol, and Trailer Pop`.

### Task 6: Release 2

- [ ] Same steps as Task 4, applied to `advanced-sets-2`, with app version `versionCode 3` / `"1.2"`, 16 plays with reads in the scan, and commit message `Release 1.2: advanced sets group 2`. Then create `advanced-sets-3` from the new `main`.

### Task 7: Group 3 plays — Flare Screen, Zipper, UCLA Cut, Shuffle Cut

**Files:**
- Create: `js/plays/flare-screen.js`, `js/plays/zipper.js`, `js/plays/ucla-cut.js`, `js/plays/shuffle-cut.js`
- Modify: `js/plays/index.js` (append to `PLAYS` after `chicago`, in this order), `README.md`, `docs/design.md`

**Interfaces:**
- Spec content table rows 7–10.

- [ ] **Step 1: Write the four plays.**
  - **Aliases:**
    - flare-screen: `['flare', 'fade screen', '플레어']`
    - zipper: `['zipper cut', 'Z cut', '지퍼 컷']`
    - ucla-cut: `['UCLA', 'high post back screen', '하이포스트 백스크린']`
    - shuffle-cut: `['shuffle', 'diagonal cut', '셔플']`
  - **`famous`:** UCLA Cut (UCLA under John Wooden), Shuffle Cut (Bob Spear's Air Force Academy teams, 1950s).
- [ ] **Step 2: Run the tests and tune.** Run `npm test`. Expected: all pass.
- [ ] **Step 3: Browser check.** As in Task 3, step 4.
- [ ] **Step 4: Commit.** Message: `Add Flare Screen, Zipper, UCLA Cut, and Shuffle Cut with reads`.

### Task 8: Release 3

- [ ] Same steps as Task 4, applied to `advanced-sets-3`, with app version `versionCode 4` / `"1.3"`, 20 plays with reads in the scan, and commit message `Release 1.3: advanced sets group 3`. Then create `advanced-sets-4` from the new `main`.

### Task 9: Group 4 plays — System offenses: Flex, Princeton Chin, Delay, Sideline Triangle

**Files:**
- Create: `js/plays/flex.js`, `js/plays/princeton-chin.js`, `js/plays/delay.js`, `js/plays/sideline-triangle.js`
- Modify: `js/plays/index.js` (`SECTIONS` offense cats add `system` last; append the plays to `PLAYS` last), `js/i18n.js` (`cat.system`: '시스템 오펜스' / 'System offenses'), `README.md`, `docs/design.md`

**Interfaces:**
- Spec content table rows 11–14. Each play shows one representative cycle.

- [ ] **Step 1: Add the category, then write the plays.**
  - **Category:** same as Task 5, step 1: the category-label test goes RED, then `cat.system` turns it GREEN.
  - **Captions:**
    - **Princeton Chin:** follow the 2-2-1 version: slot-to-slot pass, passer's chin cut off the high-post back screen, then the drift/flare screen.
    - **Sideline Triangle:** follow post entry → pinch post → blind pig.
  - **Aliases:**
    - flex: `['flex offense', 'flex cut', '플렉스 컷']`
    - princeton-chin: `['chin', 'Princeton', 'chin cut', '친 컷']`
    - delay: `['delay offense', 'high post handoff', '딜레이 오펜스']`
    - sideline-triangle: `['triangle', 'triple post', '트라이앵글']`
  - **`famous`:** Flex (Utah Jazz under Jerry Sloan), Princeton Chin (Princeton University under Pete Carril; Sacramento Kings, early 2000s), Sideline Triangle (Tex Winter; Bulls and Lakers under Phil Jackson).
  - **Ruling on aliases:** 'Princeton' is a school name used as the offense's common name, so record a ruling. The alias test checks proper nouns from `famous`, so if it flags 'Princeton', drop that alias rather than weaken the test.
- [ ] **Step 2: Run the tests and tune.** Run `npm test`. Expected: all pass.
- [ ] **Step 3: Browser check.** As in Task 3, step 4.
- [ ] **Step 4: Review Focus #4.** At 360 px, System offenses is listed last, collapses, and search `triangle` / `트라이앵글` finds it.
- [ ] **Step 5: Commit.** Message: `Add system offenses: Flex, Princeton Chin, Delay, and Sideline Triangle`.

### Task 10: Release 4 and wrap-up

- [ ] **Step 1: Release.** Same steps as Task 4, applied to `advanced-sets-4`, with app version `versionCode 5` / `"1.4"`, 24 plays with reads in the scan, and commit message `Release 1.4: advanced sets complete`.
- [ ] **Step 2: Docs.** In `docs/design.md`, note the five offense categories and the window cache. Commit it in the release branch before merging.
- [ ] **Step 3: Store listing.** In the app repo, update `docs/play-store.md` to mention defensive reads and the 24 plays in both listing drafts. Commit it with the release.
