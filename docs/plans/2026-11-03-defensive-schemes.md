# Defensive Schemes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add the pro three-second rule and clean pass lanes to every play, a zone mode in the engine, and six zone and combination defenses (18 new reads) in three groups, each released to the web and the app when done.

**Architecture:**
- **Rules for every play.** Two compile-time window passes in `js/engine.js`, applied after the raw targets and before collision handling:
  - three-second step-outs;
  - pass-lane steps.
- **Zone tables.** A new DOM-free module `js/zones.js` holds the zone tables and `zoneSpots`.
- **Defender modes.** The engine picks each defender's mode (zone, area or man) from a play's `defense` block and the step overrides.
- **Floor outline.** The zone outline is a floor ribbon owned by `js/notation.js`.
- **Checks.** They are pure helpers in `tests/helpers.mjs`, proven on plain-object fixtures, then run on every play and read.
- **Releases.** Each group ends in a release task.

**Tech Stack:** Vanilla ES modules, Three.js 0.160.0 via CDN import map (build-free site). `node:test` on Node 21+. Capacitor 8 for the Android app in the private repo.

**Spec:** `docs/specs/2026-11-03-defensive-schemes.md`. The earlier specs still define the play/read format, the clock and the library.

## Global Constraints

- **Site:** stays build-free. `package.json` and `tests/` are dev-only.
- **Positions:** stay pure functions of `t`. Window passes are causal: a defender's position at `t` depends only on raw positions and ball flights that have started by `t`, plus fixed easing lengths. So the opening before a branch point is identical in every read.
- **Play content:**
  - Korean at the top level, English in `en`. Every new UI string goes into both `ko` and `en`.
  - Captions use `[n]` / `[xn]` chips and **bold**, and no gendered pronouns for players.
  - The branch prompt is `공격은 이 존의 어디를 노릴까요?` / `Where does the offense attack this zone?`.
- **Real names:**
  - None in any field except `famous`. The word "NBA" never appears. `aliases` use generic terms only.
  - Write `famous` only with facts you are sure of (team, season, opponent). When unsure, omit the field.
- **Motion limits:** every check in `assertPhysical` stays as it is (defense ≤ 38 ft/s, gaps 1.8 / 1.35 ft, frame, holds, shots). When a check fails, fix timing, paths or table spots, never the limits.
- **Rule numbers**, from the spec:
  - lane |x| ≤ 8, 0 ≤ z ≤ 19;
  - guarding ≤ 3.5 ft;
  - count limit 3.0 s;
  - engine step-out out before 2.8 s, to 0.6 ft outside the lane, at ≤ 10 ft/s;
  - body 1.4 ft below 7.5 ft;
  - lane step easing 0.25 s.
- **Zone anchors**, from the spec: `top` (0, 27), `wingL`/`wingR` (∓17, 21), `cornerL`/`cornerR` (∓21.5, 3), `high` (0, 17), `blockL`/`blockR` (∓6, 6). Blending is inverse-distance weighting, power 2.
- **Defender numbering per zone:**
  - **2-3** (also the matchup base): x1 left guard, x2 right guard, x3 left back, x4 right back, x5 middle.
  - **3-2:** x1 top, x2 left wing, x3 right wing, x4 left back, x5 right back.
  - **1-3-1:** x1 top, x2 left wing, x3 right wing, x5 middle, x4 baseline.
  - **Box-and-one:** x1 chaser; box x2 left front, x3 right front, x4 left back, x5 right back.
  - **Triangle-and-two:** x1 and x2 chasers; triangle x3 free-throw line, x4 left block, x5 right block.
  - Each play's `keys` state who is where.
- **Choreography checklist** (from earlier review rounds). Before screenshots, trace numerically:
  - open jumpers have ≥ 3.5 ft at release;
  - layups are released inside 7 ft;
  - every catch is held ≥ 0.08 s;
  - each caption's "x? slides / steps up / is late" matches the positions.
- **App versions:** group 1 → `versionCode 9` / `"1.8"`, group 2 → 10 / `"1.9"`, group 3 → 11 / `"2.0"`. These live in `C:\Users\hg kim\3d-hoops-playbook-app\android\app\build.gradle` (currently 8 / "1.7").
- **Git:**
  - Branches `defense-1`, `defense-2`, `defense-3`, each cut from the latest `main`. Local `main` already holds the spec commit `01cba5f`. Per-repo identity is `HPotty36`.
  - Every commit message ends with `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.
  - Always `git fetch` before merging.
- **Tooling (Windows):**
  - The repo is at `C:\Users\hg kim\AppData\Local\Claude-Data\claude_pzs8sxrjxfjjc\scratch-workspaces\aa45e105-02ef-4aab-bc76-209425b65deb\0ea883f1-7b1d-45f4-ac22-49725a0822ee\scratch-2026-10-09-8d7e47\nba-3d-playbook`.
  - Edit files with the Edit tool, or Python with `newline=''`; the repo enforces LF. Write anything containing `\'` with the Write or Edit tool, never a Bash heredoc.
  - Run node from the repo folder (the scratchpad path is too long for a Windows cwd).
  - Puppeteer is `puppeteer-core` from the app repo via `createRequire('C:/Users/hg kim/3d-hoops-playbook-app/package.json')`. Drive the page through `window.__playbook` and `$eval(...click())`, never `page.click` on controls below the fold (it scrolls the page).

## Review Focus

1. **Switching plays:** going from a zone play to a man play (and back, and between reads mid-play) leaves no stale zone outline, legend item or "How to beat it" heading.
2. **Toggles:** the outline hides when either the notation toggle or the defense toggle is off, and comes back when both are on.
3. **Language:** KO/EN switching on a zone play updates the counters heading and the legend label at once.
4. **Compile cost:** with the window passes, every play × read compiles fast enough that switching plays on a phone does not stall: under 300 ms each in Node.
5. **Store build:** the defense section, the zone outline and the new plays work offline in the store bundle, with no `famous` text.

---

### Task 1: Rule checks — three seconds and strict pass lanes

**Files:**
- Modify: `tests/helpers.mjs`
- Create: `tests/rules.test.mjs`

**Interfaces:**
- Produces in `tests/helpers.mjs`:
  - `threeSecondViolations(cp) → string[]`, empty when the rule holds.
    - Samples every 1/60 s from 0 to the first shot's `t0` (or `cp.end`).
    - Uses the lane, guarding and 3.0 s numbers from Global Constraints.
    - Messages name the defender, the run length and its start time.
  - `passLaneViolations(cp) → string[]`, rewritten to the spec:
    - For every non-handoff flight and every defender, the ball must stay ≥ 1.4 ft (horizontal) from the defender while `ballAir(b, t).y < 7.5`, over the whole flight (u from 0 to 1, step 0.01).
    - The passer's own defender is included.
    - Teammate bodies keep today's rule (0.9 ft, u ≥ 0.12, passer and receiver excluded).
  - Both read only `cp.offense`, `cp.defense`, `cp.offAt`, `cp.bsegs` and `cp.end`, so a plain object can stand in for `cp`.

- [ ] **Step 1: Write the failing tests** in `tests/rules.test.mjs`. Build fixture `cp` objects by hand: offense and defense as functions of `t`, plus a `bsegs` list with `hold` / `flight` / `shot` segments.
  - **Three seconds:**
    - a defender at (0, 10) for 4 s with every attacker 10 ft away → 1 violation;
    - the same with an attacker at (2.5, 10) → none (guarding);
    - a defender in the lane for 2.5 s, then at (9, 10) for 0.5 s, then back for 2.5 s → none (reset);
    - a defender in the lane from 2 s with a shot released at 3 s → none (count stops at the first shot);
    - a defender at (0, 19.5) → none (outside the lane).
  - **Pass lanes:**
    - a chest pass from (0, 25) to (0, 12) with a defender standing at (0.5, 18) → 1 violation;
    - the same defender at (1.6, 18) → none;
    - a `skip` flight whose `ballAir` height exceeds 7.5 ft over the defender → none;
    - a `handoff` → none;
    - the passer's defender at (0, 22.5) on a pass straight to the rim side → 1 violation (the old helper skipped it).
- [ ] **Step 2: Run them.** Run `npm test`. Expected: FAIL (`threeSecondViolations` not exported; the passer case passes under the old helper).
- [ ] **Step 3: Implement both helpers** in `tests/helpers.mjs` as specified. Keep the old teammate check inside `passLaneViolations`.
- [ ] **Step 4: Run the tests.** Run `npm test`. Expected: the new rule tests pass. The existing situations-only lane test may now fail on some situation reads. Note which ones; Task 3 makes them pass.
- [ ] **Step 5: Commit.** Commit only the helpers and `tests/rules.test.mjs`. If the situations lane test fails, mark that loop `{ todo: 'strict pass lanes land in Task 3' }` and remove the `todo` in Task 3. Message: `Add three-second and strict pass-lane checks`.

### Task 2: Engine — three-second step-outs for every play

**Files:**
- Modify: `js/engine.js`, `tests/plays.test.mjs`

**Interfaces:**
- Consumes: `threeSecondViolations` (Task 1).
- Produces:
  - Engine constants `LANE_X = 8`, `LANE_Z = 19`, `D3S_GUARD = 3.5`, `D3S_OUT_BY = 2.8`, `D3S_STEP = 0.6`, `D3S_SPEED = 10`.
  - `cp.adjusted(d, t) → boolean`: true while a three-second or pass-lane window moves `d`. Task 3 extends it.
  - `cp.compileMs`: milliseconds spent in `compilePlay`.

- [ ] **Step 1: Wire the check (RED).**
  - In `assertPhysical`: `assert.deepEqual(threeSecondViolations(cp), [], \`${label}: three seconds\`)`.
  - Add a test that times `compilePlay` for every play × read and asserts `< 300` ms each (Review Focus 4).
  - Run `npm test`. Expected: FAIL on 51 reads in 19 plays (measured: Pick and Pop, Side Pick and Roll, Ghost Screen, Weave, Floppy, Elevator Doors, Iverson Cut, Chicago, …).
- [ ] **Step 2: Implement step-out windows** in `compilePlay`, between the raw evaluation and `resolve`. The algorithm:
  - **Scan.** At compile time scan each defender on the 1/60 s grid from 0 to the first shot's `t0`, using `raw + excursion` (the excursions found so far).
    - A run starts when the defender is in the lane and no attacker is within `D3S_GUARD`.
    - It ends when either condition fails.
  - **Departure.** At each grid time `g` in a run, `travel(g) = (distance from raw(g) to the nearest lane exit point + D3S_STEP) / D3S_SPEED`. Depart at the first `g` where `(g − runStart) + travel(g) ≥ D3S_OUT_BY − 0.1`.
  - **Window.** `{ d, t0: g, out: travel(g), hold: 0.4 }`. The envelope eases 0 → 1 over `out` (smoothstep), holds 1 for `hold`, then eases 1 → 0 over `out`.
  - **Position.** `raw(t) + env(t) · (exit(raw(t)) − raw(t))`, where `exit(p)` is the nearest point 0.6 ft outside the lane. That is the side line at |x| = 8.6, or the free-throw line at z = 19.6, whichever is closer.
  - **Reset.** The run resets once the defender is outside. The scan continues after the window, so long stays get repeated step-outs.
  - **Causality.** Departure decisions use only times ≤ `g`.
  - **Cache.** Store windows per defender. `defense(t)` sums at most the windows covering `t`.
- [ ] **Step 3: Run the tests.** Run `npm test`. Expected: all pass, including:
  - the shared-opening test;
  - the query-order test;
  - the 1/960 s twitch test;
  - the 300 ms compile test.
  If a step-out collides with an attacker or another defender, prefer exiting by the other lane side (next-nearest exit) over changing limits.
- [ ] **Step 4: Commit.** Message: `Keep defenders out of three-second violations in every play`.

### Task 3: Engine — pass-lane steps for every play

**Files:**
- Modify: `js/engine.js`, `tests/plays.test.mjs`

**Interfaces:**
- Consumes: `passLaneViolations` (Task 1), the step-out windows (Task 2).
- Produces: engine constants `BODY = 1.4`, `LANE_CLEAR = 1.55`, `PASS_CLEAR_Y = 7.5`, `LANE_EASE = 0.25`. `cp.adjusted(d, t)` also covers these windows.

- [ ] **Step 1: Wire the check (RED).**
  - Replace the situations-only lane loop with one over every play × read.
  - Remove any `todo` from Task 1.
  - Run `npm test`. Expected: FAIL. 71 flights in 66 reads were measured; 57 of them are the passer's own defender.
- [ ] **Step 2: Implement lane windows** at compile time, after step-outs and before `resolve`. The algorithm:
  - **Find the window.** For each non-handoff flight and each defender, sample the flight at 1/120 s. With `q(t) = raw + excursion` for the defender, find the interval `[tIn, tOut]` where the ball is below `PASS_CLEAR_Y` and horizontally within `LANE_CLEAR` of `q(t)`.
  - **Displacement.** A unit vector perpendicular to the pass direction, on the side where `q` lies at the closest approach. A tie (|cross| < 1e-6) goes to the side away from the basket. Magnitude: `LANE_CLEAR − min distance` over the interval.
  - **Envelope.** 0 → 1 over `[tIn − LANE_EASE, tIn]`, 1 over `[tIn, tOut]`, 1 → 0 over `[tOut, tOut + LANE_EASE]`. If the flight starts at or after the branch time, clamp the ease-in start to the branch time.
  - **Overlap.** Windows add.
- [ ] **Step 3: Run the tests.** Run `npm test`. Expected: all pass. If `resolve` pushes a stepped defender back into the path, raise `LANE_CLEAR` by 0.1 at a time up to 1.8 before touching a play.
- [ ] **Step 4: Commit.** Message: `Keep every pass out of defenders' bodies`.

### Task 4: Review the changed moments in the existing plays

**Files:**
- Modify: the play files whose captions no longer match (expected among the 19 + 66 reads above), `docs/design.md`

- [ ] **Step 1: Find the changed moments.** Compile every play × read at the merge base (`git show main:js/engine.js` into a temp file) and on the branch.
  - List every read where any defender differs by more than 1 ft, with the moment of the largest change.
  - Expected: changes only in reads flagged by Tasks 2–3.
- [ ] **Step 2: Stills.** Take before/after top-camera stills of each listed moment, and review them against that step's caption.
  - Where a caption names a defender helping "in the paint" or "under the rim" during a step-out, or "contesting" a pass that now passes beside it, fix it.
  - The fix is a step `def` (for example a short `path` to the lane line) or a caption edit in both languages.
- [ ] **Step 3: Docs.** In `docs/design.md`, add "Defensive three seconds" and "Pass lanes" under the engine notes with the numbers from Global Constraints. Replace the "deferred engine item" mentions.
- [ ] **Step 4: Run the tests.** Run `npm test`. Expected: all pass.
- [ ] **Step 5: Commit.** Message: `Review the plays changed by the three-second and pass-lane rules`.

### Task 5: Zone tables — 2-3 and 3-2

**Files:**
- Create: `js/zones.js`, `tests/zones.test.mjs`

**Interfaces:**
- Produces in `js/zones.js` (no imports from the engine):
  - `ANCHORS`: `{ top: [0, 27], wingL: [-17, 21], wingR: [17, 21], cornerL: [-21.5, 3], cornerR: [21.5, 3], high: [0, 17], blockL: [-6, 6], blockR: [6, 6] }`.
  - `ZONES[name]`: `{ members: string[], outline: string[], at: { [anchor]: { spots: { [d]: [x, z] }, ball: d } } }`.
  - `mirror(at, swap)`: builds the right-side anchors from the left ones (x → −x, defender ids swapped by `swap`). Tables define `top`, `high` and the left side only.
  - `zoneSpots(name, ball: {x, z}) → { spots: { [d]: {x, z} }, ballW: { [d]: number } }`.
    - Weights `1 / dist²` over the anchors, exact when `dist < 1e-6`.
    - `ballW[d]` is the summed weight of the anchors whose `ball` is `d`.
    - The weights sum to 1.

- [ ] **Step 1: Write the failing tests** in `tests/zones.test.mjs`, for every name in `ZONES`:
  - every spot satisfies `inCoachFrame` and lies on the court (0 ≤ z, |x| ≤ 25);
  - each anchor's `ball` is a member;
  - `zoneSpots` at each anchor returns that anchor's spots (`< 1e-9`) and `ballW[ball] === 1`;
  - continuity: on a 0.5 ft grid over x ∈ [−24, 24], z ∈ [0, 32], moving the ball 0.5 ft moves no spot more than 1.5 ft;
  - `ballW` sums to 1;
  - `outline` lists each member exactly once;
  - mirrored anchors are mirror images.
- [ ] **Step 2: Run them.** Expected: FAIL (no module).
- [ ] **Step 3: Write the tables.** Slide rules to encode:
  - **2-3:**
    - **top:** x1 on the ball; x2 drops to the right elbow; x3 and x4 just outside the lane at about z 8; x5 in front of the rim.
    - **wingL:** x1 on the ball; x2 slides to the high post; x3 drops toward the short corner, ready for the corner pass; x5 to the ball-side block; x4 to the weak-side front of the rim.
    - **cornerL:** x3 on the ball; x1 sinks to cut the pass back to the wing; x5 sides the ball-side block; x2 to the ball-side elbow; x4 to the front of the rim.
    - **high:** x5 steps up (ball); x1 and x2 pinch in; x3 and x4 slide to the blocks.
    - **blockL:** x5 on the post from the high side; x3 from the baseline side; x1 sinks; x2 to the high post; x4 to the weak-side rim.
  - **3-2:**
    - **top:** x1 on the ball; x2 and x3 at the elbows extended; x4 and x5 at the blocks.
    - **wingL:** x2 on the ball; x1 to the ball-side elbow; x3 to the high post; x4 to the corner side of the block; x5 across the lane.
    - **cornerL:** x4 on the ball; x2 sinks to the wing-low; x5 to the ball-side block; x1 to the high post; x3 to the weak-side rim.
    - **high:** x1 drops on the ball from behind; x2 and x3 pinch; x4 and x5 hold the blocks.
    - **blockL:** x4 on the post; x2 dig; x5 across the lane; x1 to the elbow; x3 to the weak side.
  - Keep spots inside the lane within 2 ft of the lane line where the slide rules allow, so step-outs stay short.
- [ ] **Step 4: Run the tests.** Expected: pass.
- [ ] **Step 5: Commit.** Message: `Add zone tables for the 2-3 and 3-2 zones`.

### Task 6: Engine — zone mode

**Files:**
- Modify: `js/engine.js`, `js/main.js` (defender heading and stance), `tests/helpers.mjs`
- Create: `tests/zone-engine.test.mjs`

**Interfaces:**
- Consumes: `zoneSpots`, `ZONES` (Task 5); `cp.adjusted` (Tasks 2–3).
- Produces:
  - `play.defense`: `{ zone: name, man?: { [d]: attackerId } }`. Members of `ZONES[name]` are in zone mode, ids in `man` are man mode, and any other defender is man mode on its default assignment (d*n* → o*n*).
  - `cp.zone`: `{ name, outline: string[] } | null`.
  - `cp.guardOf(d, t) → attackerId | null`:
    - man mode returns the assignment, as today;
    - zone mode returns the holder when that defender's pressure weight ≥ 0.5, else null.
  - `cp.zoneSpotAt(d, t) → {x, z} | null`: the table spot used at `t`, for tests.
  - In `tests/helpers.mjs`: `zoneDeviations(cp) → string[]`. Whenever the holder has stood within 2 ft of an anchor for 0.5 s and `cp.adjusted(d, t)` is false and the step has no `def` override for `d`:
    - each zone defender other than the anchor's ball defender is within 3 ft of `zoneSpotAt`;
    - the ball defender is within 4 ft of the holder;
    - each man defender is within 7 ft of its man.

- [ ] **Step 1: Write the failing tests** in `tests/zone-engine.test.mjs`. Use a fixture play (inline, not registered) with a 1-3-1 offense passing top → wingR → cornerR → wingR → top → wingL, each catch held ≥ 1.2 s, `defense: { zone: '2-3' }`, plus a copy with `def: { d4: { guard: 'o4' } }` in step 2.
  - `assertPhysical`-style checks via `sampleMotion`: speeds, gaps and frame within the existing limits;
  - `threeSecondViolations` and `passLaneViolations` are empty;
  - `zoneDeviations` is empty;
  - `guardOf` is null for an off-ball zone defender, and equals the holder for the ball defender after 0.5 s of holding;
  - with the `guard` override, `guardOf('d4', t)` is `'o4'` during step 2;
  - `cp.zone.outline` equals `ZONES['2-3'].outline`;
  - a man play's `cp.zone` is null and its positions do not change in this task. Before Step 3, record 3 man plays at 10 times each as fixture values; assert they are equal afterwards (`< 1e-9`).
- [ ] **Step 2: Run them.** Expected: FAIL.
- [ ] **Step 3: Implement zone mode** inside the raw target, before the step blend. For a zone defender `d` at `t`:
  - `tl = t − lag`, `Z = zoneSpots(name, ballXZ(tl))`, `s = Z.spots[d]`;
  - `S = Σ_a ownW(a, tl)`;
  - `P = Σ_a ownW(a, tl) · (onBallSpot(a) − s) / max(1, S)`;
  - `raw = s + Z.ballW[d] · P`.

  Use the existing `onBallSpot`. Step overrides (`path`, `guard`, `lag`) win as today.
- [ ] **Step 4: Update `js/main.js`** for a null `guardOf`:
  - off-ball zone defenders face the ball (or the rim side when the ball is in the air near them);
  - their stance is `defend` below 5 ft/s.
- [ ] **Step 5: Run the tests.** Run `npm test`. Expected: all pass.
- [ ] **Step 6: Commit.** Message: `Add a zone mode to the automatic defense`.

### Task 7: Defense section, labels and the floor outline

**Files:**
- Modify: `js/plays/index.js` (`SECTIONS`), `js/i18n.js`, `index.html` (legend, counters heading id), `js/main.js`, `js/notation.js`, `css/style.css` (legend item only if needed), `tests/plays.test.mjs` or `tests/docs.test.mjs`

**Interfaces:**
- Consumes: `cp.zone` (Task 6).
- Produces:
  - `SECTIONS` defense entry `{ id: 'defense', cats: ['zone', 'hybrid'] }`.
  - i18n keys:
    - `cat.zone`: 존 수비 / Zone defenses;
    - `cat.hybrid`: 혼합 수비 / Combination defenses;
    - `h.beats`: 공격은 어떻게 깨나 / How to beat it;
    - `lg.zone`: 존 / Zone.
  - `Notation#updateZone(positions | null, outline)`: one reusable ribbon, closed loop through the outline members.
    - Width 0.14 ft, color `0x3a6fd8`, opacity 0.6, drawn just above the floor and under the play notes.
    - No allocation per frame: rewrite one position buffer.
    - Hidden with `null`.

- [ ] **Step 1: Write the failing test.** Every key used by `data-i18n` in `index.html`, plus `h.beats` and `lg.zone`, exists in both languages. If an existing test already enumerates the `data-i18n` keys, extend it. Run `npm test`. Expected: FAIL on the new keys. The category-label test fails once `SECTIONS` changes.
- [ ] **Step 2: Implement.**
  - **Index and labels:**
    - `SECTIONS`, the i18n keys;
    - the legend item `<span data-zone-only hidden>` with a defense-blue line icon;
    - the counters heading `id="h-counters"`.
  - **`main.js`, on play/read/language change:**
    - legend item hidden unless `cp.zone`;
    - heading text `h.beats` when `cp.zone`, else `h.counters`.
  - **`main.js`, each frame:** `notation.updateZone(cp.zone && notation.visible && state.showDef ? defense(t) : null, cp.zone?.outline)`.
- [ ] **Step 3: Run the tests.** Run `npm test`. Expected: all pass.
- [ ] **Step 4: Browser check** with the Task 6 fixture loaded through `window.__playbook.selectPlay`-style injection (not committed):
  - the outline tilts as the ball moves;
  - Review Focus 1 (switch zone ↔ man and reads);
  - Review Focus 2 (both toggles);
  - Review Focus 3 (KO/EN heading and legend);
  - at 360 px the legend wraps without horizontal scroll.
- [ ] **Step 5: Commit.** Message: `Add the defensive schemes section, zone labels and the floor outline`.

### Task 8: Group 1 plays — 2-3 Zone and 3-2 Zone

**Files:**
- Create: `js/plays/two-three-zone.js`, `js/plays/three-two-zone.js`
- Modify: `js/plays/index.js` (append last, in this order), `tests/plays.test.mjs`, `README.md`, `docs/design.md`, `PRODUCT.md`

**Interfaces:**
- Spec content table rows 1–2.
- Consumes `zoneDeviations` (Task 6).

- [ ] **Step 1: Wire the zone check (RED).** For every play with a `defense` block, every read: `assert.deepEqual(zoneDeviations(cp), [])`. Then register the two plays with their shared steps only. Run `npm test`. Expected: FAIL until the plays exist and behave.
- [ ] **Step 2: Write the two plays.**
  - **Shared steps (2–3):** move the ball around the perimeter so every slide in the table is seen, and caption who slides where.
  - **Reads:** as in the spec table. Each ends in a score. Counters carry the read ids.
  - **`keys`:** state the numbering, the slide rules and the three-second step-out of the middle.
  - **Aliases:**
    - `two-three-zone`: `['2-3', 'two-three', '2-3 zone', '투쓰리 존', '투-쓰리']`
    - `three-two-zone`: `['3-2', '1-2-2', 'three-two', '쓰리투 존', '1-2-2 존']`
  - Apply the choreography checklist.
- [ ] **Step 3: Run the tests and tune.** Run `npm test`. Expected: all pass.
- [ ] **Step 4: Docs.**
  - **README (EN and KO):** a "Defensive schemes" table with the same columns as the other tables, and updated counts.
  - **`docs/design.md`:** the zone engine (tables, anchors, pressure, modes), the floor outline and the section.
  - **PRODUCT.md:** replace "Zone schemes are not built yet" with what exists.
- [ ] **Step 5: Browser check.**
  - Key-moment top-camera stills of every read, reviewed against the captions after the numeric trace.
  - Every play × read end to end at 1.5× with reading Off. Expected: no errors.
  - At 360×740: Defensive schemes appears after Special situations, and search finds 투쓰리 / 2-3 / 1-2-2.
- [ ] **Step 6: Commit.** Message: `Add the 2-3 and 3-2 zones`.

### Task 9: Release 1.8

**Files:**
- App repo: `android/app/build.gradle`, the `web` submodule pointer, `docs/play-store.md`.

- [ ] **Step 1: Review.**
  - Build a review package for `main..defense-1`.
  - Run a fresh reviewer on the most capable model with the spec, this plan, the Review Focus and the ledger rulings.
  - Fix Critical and Important findings, each with a test RED→GREEN where one is possible, otherwise a numeric trace plus stills.
  - Ledger Minor findings as deferred.
- [ ] **Step 2: Merge and push.**
  - `git fetch`, check that `main` has not moved, fast-forward merge.
  - Run `npm test`. Expected: all pass.
  - Push and delete the branch. Expected: Pages reports `built` at the merge commit.
- [ ] **Step 3: App release.**
  1. Move the submodule to the merge commit.
  2. Set `versionCode 9` / `versionName "1.8"`.
  3. Update `docs/play-store.md` (KO and EN) with the play and read counts and the new section, naming no teams or players.
  4. Run `npm run apk`. Expected: `www/ ready` and `BUILD SUCCESSFUL`.
  5. Scan the APK assets. Expected:
     - 0 `NBA`, 0 `famous:`, 0 real names;
     - 0 external URLs outside `licenses.html` and the vendor folder;
     - every play has a reads block.
  6. Run the store smoke test, offline, at 360 px (Review Focus 5):
     - deep links to each new play and read load;
     - the outline shows;
     - the library lists the defense section;
     - no errors and no external requests.
  7. Commit `Release 1.8: defensive schemes group 1` and push.
- [ ] **Step 4: Next branch.** Create `defense-2` from the new `main`.

### Task 10: Area mode, and the 1-3-1 and matchup tables

**Files:**
- Modify: `js/zones.js`, `js/engine.js`, `tests/zones.test.mjs`, `tests/zone-engine.test.mjs`

**Interfaces:**
- Produces:
  - `ZONES['1-3-1']` and `ZONES.matchup` (2-3 shape and numbering), with `ZONES.matchup.mode = 'area'`.
  - Area constants `AREA_R = 8`, `AREA_PULL = 0.85`.

- [ ] **Step 1: Write the failing tests.**
  - The table tests run for the two new zones.
  - An area-mode fixture (the Task 6 fixture with `defense: { zone: 'matchup' }` and a cutter crossing from the left wing to the right corner):
    - no defender exceeds the speed limits;
    - while the cutter is inside a member's area, that member is closer to the cutter than its table spot is;
    - `zoneDeviations` holds with a 4 ft tolerance for area members.
- [ ] **Step 2: Run them.** Expected: FAIL.
- [ ] **Step 3: Implement.**
  - **Tables.** 1-3-1 slide rules:
    - **top:** x1 on the ball; x2 and x3 at the elbows extended; x5 at the high post; x4 in front of the rim.
    - **wingL:** x2 on the ball; x1 traps from the top side; x5 to the ball-side low post; x4 to the ball-side corner; x3 to the weak-side elbow.
    - **cornerL:** x4 on the ball; x2 traps; x5 fronts the ball-side block; x1 to the ball-side elbow; x3 to the rim.
    - **high:** x5 on the ball; x2 and x3 pinch; x4 at the rim.
    - **blockL:** x4 on the post; x5 above; x2 digs.
  - **Area mode.** For member `d` with table spot `s`, over each attacker `a`:
    - `w_a = AREA_PULL · smoothstep(1 − dist(a, s) / AREA_R)`;
    - `raw = s + Σ w_a · (manSpot(a) − s) / max(1, Σ w_a)`;
    - `manSpot` is today's off-ball spot for attacker `a`;
    - then ball pressure applies as in zone mode.
- [ ] **Step 4: Run the tests.** Expected: all pass.
- [ ] **Step 5: Commit.** Message: `Add the 1-3-1 and matchup zone tables and area mode`.

### Task 11: Group 2 plays — 1-3-1 Zone and Matchup Zone

**Files:**
- Create: `js/plays/one-three-one-zone.js`, `js/plays/matchup-zone.js`
- Modify: `js/plays/index.js` (append last), `README.md`, `docs/design.md`

- [ ] **Step 1: Write the two plays** per spec rows 3–4.
  - **Aliases:**
    - `one-three-one-zone`: `['1-3-1', 'one-three-one', '원쓰리원 존']`
    - `matchup-zone`: `['match-up zone', 'matchup', '매치업']`
  - Shared steps show the 1-3-1's wing trap and the matchup's man-like look as the offense moves into an overload.
- [ ] **Step 2: Run the tests and tune.** Run `npm test`. Expected: all pass.
- [ ] **Step 3: Docs.** Update the README table and counts, and add area mode to `docs/design.md`.
- [ ] **Step 4: Browser check** as in Task 8 Step 5. Also search for 원쓰리원 and 매치업.
- [ ] **Step 5: Commit.** Message: `Add the 1-3-1 and matchup zones`.

### Task 12: Release 1.9

Same as Task 9, with:
- branch `defense-2`;
- `versionCode 10` / `"1.9"`;
- commit `Release 1.9: defensive schemes group 2`;
- next branch `defense-3`.

### Task 13: Combination defenses — box and triangle tables, zone plus man

**Files:**
- Modify: `js/zones.js`, `js/engine.js`, `tests/zones.test.mjs`, `tests/zone-engine.test.mjs`

**Interfaces:**
- Produces: `ZONES.box` (members d2–d5) and `ZONES.triangle` (members d3–d5). `defense.man` assigns the chasers.

- [ ] **Step 1: Write the failing tests.**
  - The table tests run for both.
  - A box-and-one fixture (`man: { d1: 'o2' }`) where o2 runs off two screens:
    - d1 stays within 7 ft of o2 except while `adjusted`;
    - the box members follow `zoneDeviations`;
    - `cp.zone.outline` excludes d1.
  - The same for a triangle fixture with `man: { d1: 'o1', d2: 'o2' }`.
- [ ] **Step 2: Run them.** Expected: FAIL.
- [ ] **Step 3: Implement.**
  - **Box slide rules:**
    - **top:** x2 and x3 at the elbows, x4 and x5 at the blocks.
    - **wing:** the ball-side front on the ball, the ball-side back to the short corner, the others shade to the ball side.
    - **corner:** the ball-side back on the ball, the ball-side front sinks.
  - **Triangle slide rules:**
    - **top:** x3 at the free-throw line, x4 and x5 at the blocks.
    - **wing:** x3 to the ball, the ball-side block to the short corner.
    - **corner:** the ball-side block on the ball, x3 to the ball-side elbow.
  - Engine: `defense.man` puts those defenders in man mode for every step unless a step overrides them.
- [ ] **Step 4: Run the tests.** Expected: all pass.
- [ ] **Step 5: Commit.** Message: `Add box and triangle tables and zone-plus-man defenses`.

### Task 14: Group 3 plays — Box-and-One and Triangle-and-Two

**Files:**
- Create: `js/plays/box-and-one.js`, `js/plays/triangle-and-two.js`
- Modify: `js/plays/index.js` (append last), `README.md`, `docs/design.md`

- [ ] **Step 1: Write the two plays** per spec rows 5–6.
  - **Aliases:**
    - `box-and-one`: `['box and one', 'box 1', '박스원', '박스 앤 원']`
    - `triangle-and-two`: `['triangle and two', 'triangle 2', '트라이앵글 투']`
- [ ] **Step 2: Run the tests and tune.** Run `npm test`. Expected: all pass.
- [ ] **Step 3: Docs.** Update the README table and counts, and add combination defenses to `docs/design.md`.
- [ ] **Step 4: Browser check** as in Task 8 Step 5. The outline shows the box or triangle without the chasers.
- [ ] **Step 5: Commit.** Message: `Add the box-and-one and triangle-and-two`.

### Task 15: Release 2.0 and wrap-up

- [ ] **Step 1: Release.** Same as Task 9, with:
  - branch `defense-3`;
  - `versionCode 11` / `"2.0"`;
  - commit `Release 2.0: defensive schemes group 3`.
- [ ] **Step 2: Final summary.** List the rulings and deferred minors. The sub-project ends with 42 plays and 140 reads.
