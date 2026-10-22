# Special Situations Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Carry 15 deferred items, then add the clock, the score bug, inbound rules and 12 special-situation plays with 24 added reads in three groups, each released to the web and the app when done.

**Architecture:**
- **Clock:** a new DOM-free module `js/clock.js` turns a play's numeric `situation` block plus its compiled timeline into the game clock, shot clock and score at any `t`.
- **UI:** a score bug in the court panel's header row renders what `clock.js` returns.
- **Content:** new plays are data files in `js/plays/` using the existing `reads` format, plus `situation`, registered in `js/plays/index.js`.
- **Checks:** the rule checks (inbounds, out of bounds, buzzer, shot clock) are pure helpers in `tests/helpers.mjs`, proven on fixtures, then run on every play and read.
- **Releases:** each group ends in a release task.

**Tech Stack:** Vanilla ES modules, Three.js 0.160.0 via CDN import map (build-free site). `node:test` on Node 21+. Capacitor 8 for the Android app in the private repo.

**Spec:** `docs/specs/2026-10-22-special-situations.md`. The earlier specs (`2026-10-13-reads-and-library.md`, `2026-10-14-advanced-sets.md`) still define the play/read format.

## Global Constraints

- The site stays build-free. `package.json` and `tests/` are dev-only.
- Positions, the clock and the score stay pure functions of `t`.
- Play content: Korean at the top level, English in `en`. Every new UI string goes into both `ko` and `en`. Captions use `[n]`/`[xn]` chips and **bold**, and use no gendered pronouns for players.
- **Real names:** none in any field except `famous`. The word "NBA" never appears. `aliases` use generic terms only. None of the 12 new plays has `famous`.
- **Motion limits:** every check in `assertPhysical` stays as it is. When a check fails, fix timing or paths, never the limits.
- **Courts:** half court only.
  - BLOB inbounds from behind the end line at z ≈ −1.5, |x| ≈ 4–10.
  - SLOB inbounds from outside the left sideline at x ≈ −26.5, z ≈ 18.
  - Nobody ever stands beyond the right sideline.
- **Choreography checklist** (four review rounds in sub-project 2 found these):
  - Every defender a caption places on a man, on a screen or in front gets `sag` 0–0.2 in the shared steps and again in each option step.
  - Every screen a caption calls "caught / runs into / 걸려" carries `on: 'dN'`. Where contact comes in a later step, re-declare the screen in that step, if the screener does not move there.
  - Before screenshots, trace numerically:
    - back screens come from the defender's rim side;
    - a flare fades away from the ball;
    - "open" jumpers have ≥ 3.5 ft at release;
    - layups are released inside 7 ft;
    - every catch is held ≥ 0.08 s.
- **App versions:** group 1 → `versionCode 6` / `"1.5"`, group 2 → 7 / `"1.6"`, group 3 → 8 / `"1.7"`. These live in `C:\Users\hg kim\3d-hoops-playbook-app\android\app\build.gradle`.
- **Git:**
  - Branches: `situations-1` (already holds the spec), `situations-2`, `situations-3`, each cut from the latest `main`. Per-repo identity is `HPotty36`.
  - Every commit message ends with `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.
  - Always `git fetch` before merging.
- **Tooling (Windows):**
  - The repo is at `C:\Users\hg kim\AppData\Local\Claude-Data\claude_pzs8sxrjxfjjc\scratch-workspaces\aa45e105-02ef-4aab-bc76-209425b65deb\0ea883f1-7b1d-45f4-ac22-49725a0822ee\scratch-2026-10-09-8d7e47\nba-3d-playbook`.
  - Edit files with the Edit tool, or Python with `newline=''`; the repo enforces LF. Write anything containing `\'` with the Write or Edit tool, never a Bash heredoc.
  - Run npm from Bash. Temporary puppeteer scripts live in the app repo only while they run.

## Review Focus

1. **Switching plays or reads:** going from a situation play to a normal play hides the score bug, and switching reads mid-play shows that read's clock at the current `t`. No stale numbers.
2. **Phone header:** at 360 px the bug wraps under the title without horizontal scroll, and the title stays readable.
3. **Language switch:** with the bug visible, KO/EN switching updates the period label (`4Q`, `OT` / `연장`) at once.
4. **Clock edges:** `formatClock` at 59.95 s, 60 s, 0.04 s and over 10 minutes. The clock never shows a negative number or `-0.0`.
5. **Pauses and the store build:** the clock stays frozen during reading pauses and at an open branch prompt. The bug appears in the offline store build.

---

### Task 1: Deferred items — tests, copy and docs

**Files:**
- Modify: `tests/helpers.mjs`, `tests/plays.test.mjs`
- Modify: `js/plays/trailer-pop.js`, `js/plays/ucla-cut.js`, `js/plays/shuffle-cut.js`, `js/plays/princeton-chin.js`, `js/plays/flex.js`
- Modify: `docs/design.md`

- [ ] **Step 1: Write the failing tests.**
  - **Order independence (spec deferred 1):** extend `defense positions do not depend on query order` to every play × read. Sample a 1/60 s grid plus 200 seeded random off-grid times. Tolerance stays 1e-4 ft.
  - **Coach frame at `t = 0` (deferred 6):** in `sampleMotion`, check `offense(0)` and `defense(0)` against `inCoachFrame` too.
  - **Alias test (deferred 9):** collect `\b[A-Z]{2,}\b` from `en.famous` everywhere (no sentence-start exemption), plus the existing `[A-Z][a-z]+` words outside sentence starts.
  - **Trailer Pop alias (deferred 8):** in `tests/library.test.mjs`, `filterPlays(PLAYS, '드래그', 0)` includes `trailer-pop`.
- [ ] **Step 2: Run them.** Run `npm test`.
  - Expected: the 드래그 test FAILS.
  - The order, frame and alias tests may pass at once. They are guards; record a ruling that each passed by design.
- [ ] **Step 3: Copy and docs.**
  - **Trailer Pop:** add the alias `'드래그 앤 팝'`.
  - **"Seals" wording (deferred 11):** in the UCLA Cut and Trailer Pop English switch steps, "pins the smaller [x1] on the back" becomes "seals the smaller [x1] behind".
  - **Shuffle Cut `famous` (deferred 10):** EN "made famous by Bob Spear's Air Force Academy teams in the 1950s"; KO 1950년대 미국 공군사관학교의 밥 스피어 감독 팀이 널리 알린 셔플 오펜스의 대표 동작입니다.
  - **Wording (deferred 15):**
    - Princeton Chin step 1 caption (KO and EN) says [5] moves across to the left elbow.
    - Flex EN key 2 becomes "[5] holds the block in [x3]'s path from the corner side."
    - Princeton Chin EN `famous` becomes "… and made famous in the pro game by the Sacramento Kings of the early 2000s."
  - **`docs/design.md` (deferred 7, 14):** "about 10 ft past the arc" becomes "about 6–9 ft past the arc", and "a frame costs well under 0.15 ms" becomes "a call costs about 0.1 ms on a desktop (three calls per frame)".
- [ ] **Step 4: Run the tests.** Run `npm test`. Expected: all pass.
- [ ] **Step 5: Commit.** Message: `Carry deferred test, copy and doc fixes`.

### Task 2: Deferred items — UI and choreography

**Files:**
- Modify: `js/main.js` (`openPrompt`), `js/reads-ui.js` (`showPrompt`)
- Modify: `js/plays/side-pick-and-roll.js`, `js/plays/pistol.js`, `js/plays/flex.js`, `js/plays/princeton-chin.js`, `js/plays/delay.js`

- [ ] **Step 1: Prompt behaviour (deferred 3, 4).**
  - In `openPrompt`, step mode moves focus to the current option only when `document.activeElement` is not inside `input, textarea, select`.
  - In `showPrompt`, set `prompt.hidden = false` first, then fill `innerHTML`.
  - Browser check in step mode:
    - with focus in the desktop search box, typing continues when the prompt opens;
    - with focus elsewhere, focus lands on the current option;
    - the prompt's text is present after it becomes visible.
- [ ] **Step 2: Choreography (deferred 2, 5, 12, 13).**
  - **Side Pick and Roll drop:** the snake path curls back toward the screen side before the floater.
  - **Side Pick and Roll blitz:** the pass leaves before the trap paths finish (pass `at` before the trap's end).
  - **Pistol switch:** the turnaround is released 10–11 ft from the rim.
  - **Screens in option reads:** re-declare the screen the prompt asks about where the screener stands still:
    - Flex help and switch: [5]'s flex screen.
    - Princeton Chin help and chase-over: [5]'s back screen, still up when the cut passes.
    - Delay under: [5]'s handoff screen stance.
  - **Princeton Chin chase-over:** give [x3] a step-2 `sag` of 0.2, so it stops lurching into the lane.
  - Run the dev trace for each, then take top-camera stills of the changed moments and review them.
- [ ] **Step 3: Run the tests.** Run `npm test`. Expected: all pass.
- [ ] **Step 4: Commit.** Message: `Carry deferred UI and choreography fixes`.

### Task 3: Situations foundation — clock, categories and rule checks

**Files:**
- Create: `js/clock.js`, `tests/clock.test.mjs`
- Modify: `js/plays/index.js` (`SECTIONS`), `js/i18n.js`, `tests/helpers.mjs`, `tests/plays.test.mjs`

**Interfaces:**
- Produces in `js/clock.js`:
  - `isInbound(play) → boolean`: true when the play's starting ball holder (`play.ball`) starts out of bounds (|x| > 25 or z < 0).
  - `clockStart(play, cp) → number`: the end of the first ball flight if `isInbound(play)`, else 0.
  - `clockStop(cp) → number`: the scoring time of the last shot (`cp.scores` last `t`), else `cp.end`.
  - `clockAt(play, cp, t) → { game: number, shot: number | null, score: [number, number] }`. `shot` is null when `situation.shotClock` is null or larger than `situation.clock`. Both clocks are floored at 0.
  - `formatClock(seconds) → string`.
- Produces in `tests/helpers.mjs`:
  - `situationViolations(play, cp) → string[]`, empty when every rule holds.
  - `inCoachFrame(p)` with the extended bounds.

- [ ] **Step 1: Write the failing clock tests** in `tests/clock.test.mjs`, using small inline fixture plays compiled with `compilePlay`:
  - **`formatClock`:** `formatClock(605) === '10:05'`, `formatClock(60) === '1:00'`, `formatClock(59.95) === '59.9'`, `formatClock(7.5) === '7.5'`, `formatClock(0.04) === '0.0'`, `formatClock(0) === '0.0'`, `formatClock(-0.2) === '0.0'`.
  - **Clock start:**
    - For a fixture whose ball holder starts at z = −1.5, `clockAt` at `t = 0` and at `t = clockStart − 0.01` both give `game === situation.clock`.
    - At `clockStart + 1` it gives `situation.clock − 1`.
  - **Half-court fixture:** the clock runs from `t = 0`.
  - **Clock stop:**
    - After `clockStop`, `game` stays fixed.
    - With `clock: 0.9` and a shot far later, `game === 0` (never negative).
  - **Score:** before the scoring time it equals `situation.score`; after, the offense has the shot's `pts` added.
  - **Shot clock:**
    - `shotClock: 14, clock: 400` → `shot` runs down with `game`.
    - `shotClock: 24, clock: 8` → `shot === null`.
- [ ] **Step 2: Write the failing rule-check tests** in `tests/plays.test.mjs`. Each check gets a valid fixture (no violations) and one fixture per rule that breaks it:
  - **Inbound late:** an inbound pass released after 5 s → a message naming "inbound".
  - **Inbounder stays out:** the inbounder is still out of bounds 1.2 s after the release.
  - **Defender out:** a defender path ending at z < 0.
  - **Right sideline:** an attacker at x = 25.5.
  - **Buzzer:** a `late` play whose last shot leaves after the clock hits 0.
  - **0.3 s rule:** a `late` play catching with 0.2 s left and shooting from 12 ft.
  - **Shot clock:** a play with `shotClock: 3` whose shot leaves after 3 s.
  - **Frame:** `inCoachFrame` accepts (−6, −2.4) and (−26.5, 18), and rejects (−6, −2.8), (−26.5, 22) and (25.5, 10).
  - Also add, for every play × read in `assertPhysical`: `assert.deepEqual(situationViolations(play, cp), [])`.
  - **Data tests:**
    - every play in a situations category has a valid `situation` (period an integer ≥ 1, clock > 0, `score` two non-negative integers, `shotClock` null or > 0);
    - no other play has one.
- [ ] **Step 3: Run them.** Run `npm test`. Expected: FAIL (no `js/clock.js`, no `situationViolations`).
- [ ] **Step 4: Implement `js/clock.js` and `situationViolations`.**
  - **Out of bounds:** `|x| > 25` or `z < 0`. The inbounder is `play.ball` when `isInbound(play)`.
  - **0.3 s rule:** use the clock at the start of the shooter's last hold.
  - **Extend `inCoachFrame`:**
    ```js
    z >= -2.5 && x <= 25 && (x >= -25 || (x >= -26.6 && z <= 20))
    && (z <= 36 || (z <= 38.5 && Math.abs(x) <= 12))
    ```
- [ ] **Step 5: Categories.**
  - Add `blob`, `slob`, `late` and `ato` to the situations section. Run `npm test`. Expected: the category-label test FAILS.
  - Add `cat.blob` 베이스라인 인바운드 / Baseline out of bounds, `cat.slob` 사이드라인 인바운드 / Sideline out of bounds, `cat.late` 막판 작전 / End of game, `cat.ato` 타임아웃 후 작전 / After timeout.
- [ ] **Step 6: Run the tests.** Run `npm test`. Expected: all pass. Existing plays have no situation, so every rule holds for them.
- [ ] **Step 7: Commit.** Message: `Add the game clock, situation categories and rule checks`.

### Task 4: Score bug

**Files:**
- Modify: `index.html` (`header.toolbar .play-head`), `css/style.css`, `js/main.js`, `js/i18n.js`
- Modify: `js/clock.js`, `tests/clock.test.mjs`

**Interfaces:**
- Consumes: `clockAt`, `formatClock` (Task 3).
- Produces: `scoreBugView(play, cp, t) → null | { period: number, clock: string, urgent: boolean, shot: string | null, score: [number, number] }` in `js/clock.js`.
  - null without a `situation`.
  - `urgent` is true when `game < 5`.

- [ ] **Step 1: Write the failing test.** `scoreBugView` returns:
  - null for a play without `situation`;
  - `{ period: 4, clock: '7.5', urgent: false, shot: null, score: [98, 98] }` at `t = 0` for `{ period: 4, clock: 7.5, shotClock: null, score: [98, 98] }`;
  - `urgent: true` once the game clock is under 5.
- [ ] **Step 2: Run it.** Expected: FAIL.
- [ ] **Step 3: Implement `scoreBugView` and the bug.**
  - **Markup:** `<p id="score-bug" class="score-bug" hidden>` inside `.play-head`, after the `h2`. It holds a period span, a clock span, two score chips (offense orange, defense blue) and an optional shot-clock span.
  - **i18n:**
    - `bug.period`: '{n}Q' (both languages);
    - `bug.ot`: '연장' / 'OT';
    - `aria.scorebug`: '경기 상황: {period}, 남은 시간 {clock}, 공격 {o} 대 수비 {d}' / 'Game situation: {period}, {clock} left, offense {o}, defense {d}'.
  - **Update loop:** `updateUI` writes text only when it changes. Under 5 s the clock span gets the accent color class. Hide the bug when `scoreBugView` is null.
  - **Style:**
    - pill shape (999 px radius), panel tokens, Rubik tabular numbers;
    - wraps under the title at ≤ 1100 px;
    - never positioned over `#viewport`.
- [ ] **Step 4: Run the tests.** Run `npm test`. Expected: all pass.
- [ ] **Step 5: Browser check of Review Focus #1–#5,** using a temporary fixture play loaded through `window.__playbook` (not committed):
  - switching play and read;
  - 360 px header with no horizontal scroll;
  - KO/EN period label;
  - frozen during a reading pause and at the prompt;
  - `0.0` at the buzzer.
- [ ] **Step 6: Commit.** Message: `Add the broadcast-style score bug`.

### Task 5: Group 1 plays — BLOB: Box, Stack, Inbounder Stagger, Back-Screen Lob

**Files:**
- Create: `js/plays/box.js`, `js/plays/stack.js`, `js/plays/inbounder-stagger.js`, `js/plays/back-screen-lob.js`
- Modify: `js/plays/index.js` (append to `PLAYS` last, in this order), `README.md`, `docs/design.md`

**Interfaces:**
- Spec content table rows 1–4, including each `situation`.

- [ ] **Step 1: Write the four plays.**
  - **Aliases:**
    - box: `['box set', 'box BLOB', '박스 세트']`
    - stack: `['stack set', 'line set', '라인']`
    - inbounder-stagger: `['screen the inbounder', 'inbounder return', '인바운더 리턴']`
    - back-screen-lob: `['BLOB lob', 'lob play', '롭 패스']`
  - Apply the choreography checklist from Global Constraints.
- [ ] **Step 2: Run the tests and tune.** Run `npm test`. Expected: all pass.
- [ ] **Step 3: Docs.**
  - **README:** add a Special situations table (EN and KO) under the offense tables, and update the counts so the docs test passes. Add `blob | slob | late | ato` to the `category:` comment.
  - **`docs/design.md`:** add the situation data, clock rules, score bug and inbound notes, and the extended camera frame.
- [ ] **Step 4: Browser check.**
  - Key-moment top-camera stills of every read, reviewed against the captions.
  - Every play × read end to end at 1.5× with reading Off. Expected: no errors.
  - KO/EN prompt labels.
  - At 360×740: Special situations appears after Offensive sets with Baseline out of bounds, collapses, and search box / 박스 / stack / 롭 패스 finds the plays.
  - The score bug shows each play's situation and runs from the first inbound catch.
- [ ] **Step 5: Commit.** Message: `Add baseline out-of-bounds plays: Box, Stack, Inbounder Stagger, and Back-Screen Lob`.

### Task 6: Release 1.5

**Files:**
- App repo: `android/app/build.gradle` and the `web` submodule pointer.

- [ ] **Step 1: Review.**
  - Build a review package for `main..situations-1`.
  - Run a fresh reviewer on the most capable model, with the spec, this plan, the Review Focus and the ledger rulings.
  - Fix Critical and Important findings, each with a test RED→GREEN where one is possible, otherwise a numeric trace plus stills.
  - Ledger Minor findings as deferred.
- [ ] **Step 2: Merge and push.**
  - `git fetch`, check that `main` has not moved, fast-forward merge, `npm test` (expected: all pass), push, delete the branch.
  - Expected: Pages reports `built` at the merge commit.
- [ ] **Step 3: App release.**
  1. Move the submodule to the merge commit.
  2. Set `versionCode 6` / `versionName "1.5"`.
  3. Run `npm run apk`. Expected: `www/ ready` and `BUILD SUCCESSFUL`.
  4. Scan the APK assets. Expected: 0 `NBA`, 0 `famous:`, 0 real names, 0 external URLs outside `licenses.html` and the vendor folder, and every play has a reads block.
  5. Store smoke test, offline, at 360 px: a deep link to each new play and read loads; the score bug is visible with the play's period and clock; the library lists the new section; no errors and no external requests.
  6. Commit `Release 1.5: special situations group 1` and push.
- [ ] **Step 4: Next branch.** Create `situations-2` from the new `main`.

### Task 7: Group 2 plays — SLOB and ATO: Sideline Stagger, Sideline Lob, Beat the Deny, Ram, Decoy and Counter

**Files:**
- Create: `js/plays/sideline-stagger.js`, `js/plays/sideline-lob.js`, `js/plays/beat-the-deny.js`, `js/plays/ram.js`, `js/plays/decoy-counter.js`
- Modify: `js/plays/index.js` (append last, in this order), `README.md`, `docs/design.md`

- [ ] **Step 1: Write the five plays.**
  - Spec rows 5–9. SLOB plays inbound from the left sideline.
  - **Aliases:**
    - sideline-stagger: `['SLOB stagger', 'stagger screen', '스태거']`
    - sideline-lob: `['SLOB lob', 'sideline back screen', '사이드 롭']`
    - beat-the-deny: `['get open', 'safe inbound', '안전 인바운드']`
    - ram: `['ram screen', 'ram action', '램 스크린']`
    - decoy-counter: `['decoy', 'counter set', '역습 세트']`
- [ ] **Step 2: Run the tests and tune.** Run `npm test`. Expected: all pass.
- [ ] **Step 3: Docs.** README table rows and counts; design notes if anything new.
- [ ] **Step 4: Browser check.** As in Task 5, step 4. Also: the inbounder on the left sideline is fully in frame in the coach and broadcast cameras at `t = 0`, at desktop and phone sizes.
- [ ] **Step 5: Commit.** Message: `Add sideline and after-timeout plays: Sideline Stagger, Sideline Lob, Beat the Deny, Ram, and Decoy and Counter`.

### Task 8: Release 1.6

- [ ] Same steps as Task 6, applied to `situations-2`, with `versionCode 7` / `"1.6"` and commit message `Release 1.6: special situations group 2`. Then create `situations-3` from the new `main`.

### Task 9: Group 3 plays — End of game: Last Shot, Down Three, Under a Second

**Files:**
- Create: `js/plays/last-shot.js`, `js/plays/down-three.js`, `js/plays/under-a-second.js`
- Modify: `js/plays/index.js` (append last, in this order), `README.md`, `docs/design.md`

- [ ] **Step 1: Write the three plays.**
  - Spec rows 10–12. Last Shot is a half-court possession, so the clock runs from `t = 0`. Down Three and Under a Second inbound from the left sideline.
  - **Aliases:**
    - last-shot: `['last possession', 'hold for one', '마지막 공격']`
    - down-three: `['need a three', 'tying three', '3점 필요']`
    - under-a-second: `['catch and shoot', 'tip play', '버저비터']`
  - **Timing targets:**
    - Last Shot releases with about 1 s on the clock in every read.
    - In Under a Second, every catch-and-shoot (switch, overplay) catches with ≥ 0.3 s left. The deny read is a lob finished at the rim, which the 0.3 s rule allows.
- [ ] **Step 2: Run the tests and tune.** Run `npm test`. Expected: all pass, including the buzzer and 0.3 s checks for every read.
- [ ] **Step 3: Docs.** README rows and counts; design notes.
- [ ] **Step 4: Browser check.** As in Task 5, step 4. Also: at the buzzer the bug shows `0.0` with the made shot's points added, and the clock digits turn to the accent color under 5 s.
- [ ] **Step 5: Commit.** Message: `Add end-of-game plays: Last Shot, Down Three, and Under a Second`.

### Task 10: Release 1.7 and wrap-up

- [ ] **Step 1: Release.** Same steps as Task 6, applied to `situations-3`, with `versionCode 8` / `"1.7"` and commit message `Release 1.7: special situations complete`.
- [ ] **Step 2: Docs.** In `docs/design.md`, describe the Special situations section as complete. Commit it in the release branch before merging.
- [ ] **Step 3: Store listing.** In the app repo, update `docs/play-store.md` in both listing drafts:
  - mention the special situations (inbounds, after-timeout and end-of-game plays, with the game clock);
  - say 36 plays.
  - Keep the rule that no league, team or player names appear.
  - Commit it with the release.
