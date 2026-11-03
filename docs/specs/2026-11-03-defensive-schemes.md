# Defensive schemes — design spec

Sub-project 4 of 4 in the "go deeper" roadmap (1 reads + library ✔, 2 advanced offensive sets ✔, 3 special situations ✔, 4 defensive schemes). Builds on `docs/specs/2026-10-13-reads-and-library.md`, `docs/specs/2026-10-14-advanced-sets.md` and `docs/specs/2026-10-22-special-situations.md`. The play format, `reads`, the library, the engine and `npm test` are reused unchanged unless this spec says otherwise.

## Goal

Fill the "Defensive schemes" section with six zone and combination defenses. In these plays the **zone is the subject**:
- the shared steps show how the zone shifts as the ball moves;
- the reads are the ways the offense breaks it.

To make that possible, the engine gains a zone mode next to today's man-to-man defense. Two rules then apply to **every** play, old and new:
- the pro defensive three-second rule;
- passes never travel through a defender's body.

Ship in three groups, each released to the web and the app as soon as it is done.

Success looks like:
- **Content:** 6 new plays (42 in total). Each has a base read and 2 added reads (18 new reads, 140 in total), in Korean and English, and passes `npm test`.
- **Library:** the Defensive schemes section shows two categories.
- **Zone behavior:** zone defenders follow the ball the way the zone is taught. The shape is drawn on the floor so a fan can see it tilt and shrink.
- **Three seconds:** no defender in any play or read stays in the lane for more than 3.0 s without guarding someone.
- **Pass lanes:** no pass in any play or read goes through a defender's body.
- **Releases:** after each group, the site is updated, the app repo points at it, and a new APK is built with the next app version.

## Out of scope

- Full-court presses and anything beyond the half court.
- Offensive sets against a zone filed as plays in the offensive section. The attacks live as reads of the zone plays.
- User controls for a zone's shape, and an on-screen three-second counter.
- The 19 minor items deferred in sub-project 3, and the open question of play names that contain a person's or school's name.
- An on-device Gboard search check (needs a device).

## Library structure

`SECTIONS` in `js/plays/index.js` fills the defense section:

```js
{ id: 'defense', cats: ['zone', 'hybrid'] }
```

New labels in `js/i18n.js`:
- `cat.zone`: 존 수비 / Zone defenses
- `cat.hybrid`: 혼합 수비 / Combination defenses

The section label `section.defense` (수비 전술 / Defensive schemes) already exists. The section appears as soon as the first defense play exists.

## Zone engine

### Play data

A play in the defense section has a `defense` block. Plays without one keep today's man-to-man code path.

```js
defense: { zone: '2-3' }                              // all five defenders play the zone
defense: { zone: 'matchup' }                          // zone table + area mode
defense: { zone: 'box', man: { d1: 'o2' } }           // box-and-one: d1 guards o2, the other four play the box
defense: { zone: 'triangle', man: { d1: 'o1', d2: 'o2' } }
```

Step-level `def` overrides (`path`, `t`, `guard`, `lag`, `sag`) keep working in zone plays and win over the zone for that step. `guard` turns a zone defender into a man defender for that step.

### Zone tables (`js/zones.js`)

`js/zones.js` is DOM-free and imports no engine code, so Node tests can use it directly.

**Anchors.** Each zone is defined at eight anchor ball spots. All coordinates are in ft, in the engine's frame.

| Anchor | Position (x, z) |
|---|---|
| `top` | (0, 27) |
| `wingL` / `wingR` | (∓17, 21) |
| `cornerL` / `cornerR` | (∓21.5, 3) |
| `high` | (0, 17) |
| `blockL` / `blockR` | (∓6, 6) |

**What a table holds.**
- For each anchor: the spot of every zone defender, and which defender takes the ball (`ball: 'dN'`).
- `outline`: the order in which the zone defenders are joined for the floor drawing.
- A zone lists only the defenders it covers. The box covers d2–d5, the triangle d3–d5.

**`zoneSpots(zone, ball)`.** Returns each zone defender's spot and ball weight for any ball position.
- Spots are blended from the anchors by inverse-distance weighting (power 2).
- At an anchor the result equals the table exactly.
- Between anchors it is continuous and smooth.

### Defender position

Every position stays a pure function of `t`.

1. **Zone spot.** `zoneSpots` evaluated at the ball's position at `t − lag`. `lag` defaults to the existing 0.28 s.
   - The ball's position is taken while it is in the air too.
   - So the zone moves on the pass, the way zones are taught.
2. **Ball pressure.** A zone defender with ball weight `w` closes out to the holder.
   - The closeout uses the existing on-ball spot, about 3 ft in front toward the rim.
   - It is blended with the zone spot by `w` times the holder's ownership weight (`ownW`).
   - Ball duty therefore passes from one defender to the next as a blend, never as a jump.
3. **Modes**, per defender:
   - **zone**: steps 1–2.
   - **man**: today's automatic man-to-man position. Used for `defense.man` and for step-level `guard` overrides.
   - **area** (matchup zone): starts from the zone spot and is pulled toward the man-to-man spot of every attacker inside 8 ft of that zone spot.
     - Each attacker's pull is a smooth function of its distance, and the pulls are summed and normalized.
     - Who is "in the area" never switches hard.
4. **Blend.** Steps blend into each other exactly as today. That is part of the raw target.
5. **Then** the three-second step-outs, the pass-lane rule and the existing collision handling apply, in that order (see below).

The compiled output keeps its shape (`cp.defense(t)` and the rest). Rendering code does not need to know a play is a zone, except for the floor outline.

## Defensive three seconds (all plays)

The pro rule: a defender may not stay in the lane for more than three seconds unless actively guarding an opponent.

**Definitions.**
- **Lane:** |x| ≤ 8 ft, 0 ≤ z ≤ 19 ft (baseline to the free-throw line).
- **Actively guarding:** within 3.5 ft (arm's length) of any offensive player.
- **Count:** consecutive time in the lane while not actively guarding.
  - It resets when the defender leaves the lane or guards someone.
  - It stops once the first shot is released.

**Engine.**
- At compile time the engine finds each defender's unguarded in-lane runs from the raw targets.
- The defender then steps out to just past the nearest lane edge (about 0.6 ft outside) and back in.
  - It leaves early enough to be outside before the count reaches 2.8 s.
  - It moves no faster than a jog, 10 ft/s, so a defender deep in the lane starts sooner rather than jumping.
- The step-out is a smooth excursion, kept as a precomputed window, the same way collision windows are kept.
- The rule applies to man and zone defenders in every play.
- **Zone tables:** a defender whose spot is inside the lane sits within a step of the lane line or next to an attacker it guards. So the middle of a 2-3 steps out and in, as real centers do, rather than crossing the lane.

**Measured before this change:** 51 reads in 19 of the 36 existing plays break the rule, the worst by 6.9 s. All of them are help defenders sitting in the lane.

## Pass lanes (all plays)

**Definition.**
- A defender's body is the circle of radius 1.4 ft around its position (torso plus ball).
- The rule covers the ball while it is below 7.5 ft. Lobs and skip passes that clear 7.5 ft over a defender are fine.
- Handoffs are exempt.

**Engine.**
- While a pass is in the air, any defender whose body the straight path would cross steps aside, just enough, toward the side it already stands on.
- The step is a smooth window centered on the ball's closest approach, easing in over 0.25 s before it and out over 0.25 s after.
- For the passer's own defender, the ball now leaves past the defender's side instead of out of the body.
- The windows are precomputed per flight at compile time.

**In zone plays**, passes over the top of the zone use the existing `skip` (or `lob`) kind. Skipping over the zone is itself one of the standard attacks.

**Measured before this change:** 71 passes in 66 of the existing 122 reads cross a defender's body under this definition.
- 57 of them are the passer's own defender, standing 3 ft in front of the passer.
- This includes the six reads deferred since sub-project 2.

## Order and regressions

**Order.** For each `t`, defender positions are evaluated in this order:
1. raw target (man, zone or area, plus step overrides, blended between steps as today);
2. three-second step-out;
3. pass-lane step;
4. collision handling.

Final positions must satisfy all of these together, which the tests check:
- the three-second rule;
- the pass-lane rule;
- the collision radii;
- the teleport limits.

**Regressions.** Positions in the existing plays change where either rule applies. Group 1 reviews every changed moment with before/after top-camera stills. Where a caption's claim no longer matches, for example "[x4] helps in the paint", that step gets a `def` adjustment or a caption fix.

## Floor outline and UI

- **Zone outline.**
  - In defense-section plays, a thin line in the defense blue joins the zone defenders in their `outline` order, drawn on the floor under the players.
  - It updates every frame, so the shape visibly tilts and shrinks as the ball moves.
  - Man-mode defenders (the box-and-one chaser, the triangle-and-two chasers) are not part of it.
  - It follows the notation toggle (표기 / Notation).
  - Like the existing notation, it lives on the floor; nothing is placed over the court.
- **Legend.** A "존 / Zone" item (`lg.zone`) is shown only for plays with a `defense` block.
- **Info panel.** For plays with a `defense` block, the counters heading reads **공격은 어떻게 깨나 / How to beat it** (`h.beats`). The existing *Watch* buttons open the matching read.
- **Unchanged.** Everything else stays as it is, including the default camera, the branch prompt, the score bug, search and filters.

## Content

Every play follows the existing format:
- Korean fields at the top level, English in `en`.
- `summary`, `when`, `keys`, `counters`, `aliases`, `steps`, `reads`, `en.reads`, plus `defense` for this section.
- Counters list the attacks. Those that match a read carry its `read` id.
- The branch prompt asks where the offense attacks the zone (공격은 이 존의 어디를 노릴까요? / Where does the offense attack this zone?).
- Shared steps (2–3) show the zone's slides as the ball moves around the perimeter. Each read ends in a score, and its captions explain why the zone gives that spot up.
- `keys` state the zone's rules, including the three-second rule where it shapes the zone (the middle of a 2-3 steps in and out).
- Captions use `[n]` / `[xn]` chips and **bold** terms, and avoid gendered pronouns.
- Real names only in `famous`. Aliases are generic.

**Defender numbering:**
- x1 and x2 are the front (guards);
- x3 and x4 are the wings or back corners;
- x5 is the middle big.

Zones with a different shape, such as the 1-3-1, say in `keys` who is where.

| # | Group | id | Name (ko / en) | Cat. | Diff. | Defense | Offense set | Base read (id: label → answer) | Added reads (id: label → answer) |
|---|---|---|---|---|:-:|---|---|---|---|
| 1 | 1 | `two-three-zone` | 2-3 존 / 2-3 Zone | zone | 1 | `{ zone: '2-3' }` | 1-3-1 | `high-post`: 하이포스트 / High post → [5] flashes to the free-throw line, the middle steps up, dump-off at the rim | `skip`: 스킵 패스 / Skip pass → overload one side, skip over the top to the opposite-corner three; `short-corner`: 숏코너 / Short corner → catch behind the wing defender, the middle comes out, baseline dive |
| 2 | 1 | `three-two-zone` | 3-2 존 / 3-2 Zone (1-2-2) | zone | 2 | `{ zone: '3-2' }` | 2-1-2 | `high-low`: 하이-로 / High-low → high-post catch, high-low pass to the sealed post | `baseline`: 베이스라인 / Baseline → corner catch pulls a back defender out, baseline cut; `gap`: 갭 돌파 / Gap drive → drive between the top defenders, kick-out three |
| 3 | 2 | `one-three-one-zone` | 1-3-1 존 / 1-3-1 Zone | zone | 2 | `{ zone: '1-3-1' }` | 2-1-2 | `corner`: 코너 / Corner → the baseline defender cannot cover both corners, corner three | `short-corner`: 숏코너 / Short corner → short-corner catch, dump-off; `trap-skip`: 트랩 탈출 / Beat the trap → wing trap, skip to the opposite wing |
| 4 | 2 | `matchup-zone` | 매치업 존 / Matchup Zone | hybrid | 3 | `{ zone: 'matchup' }` | 1-3-1 into overload | `cutter`: 컷 넘겨받기 / Cutter → a cut through the zone confuses the hand-off, layup | `screen-zone`: 존에 스크린 / Screen the zone → screen a back-line defender, corner three; `ball-screen`: 볼 스크린 / Ball screen → ball screen draws two, skip for three |
| 5 | 3 | `box-and-one` | 박스 앤 원 / Box-and-One | hybrid | 2 | `{ zone: 'box', man: { d1: 'o2' } }` | star + four | `screen-star`: 에이스 스크린 / Screens for the star → stagger frees the star from the chaser, three | `decoy`: 에이스는 미끼 / Star as decoy → the star clears out, 4-on-4 into the box; `high-post`: 하이포스트 / High post → middle of the box, dump-off |
| 6 | 3 | `triangle-and-two` | 트라이앵글 앤 투 / Triangle-and-Two | hybrid | 3 | `{ zone: 'triangle', man: { d1: 'o1', d2: 'o2' } }` | two stars + three | `star-pnr`: 에이스 픽앤롤 / Two-star pick and roll → the two chasers must switch or trap, the roller is open | `corner`: 빈 코너 / Open corner → the triangle cannot cover the corners, corner three; `top`: 삼각형 꼭대기 / Top of the triangle → high-post flash, dump-off |

Read ids and labels may be refined while writing a play. Any change is recorded as a ruling.

## Releases

Groups ship in order 1 → 3, each on its own branch (`defense-<n>`) cut from the latest `main`.
- **Group 1** also adds `js/zones.js`, the zone engine, the three-second and pass-lane rules (with the review of the existing plays), the floor outline, the legend item, the `h.beats` heading and the two categories.
- **Group 2** adds area mode.
- **Group 3** adds zone + man combinations.

Before a group merges:
1. **Tests:** `npm test` passes.
2. **Numeric checks:** before screenshots, every captioned claim is checked by trace. That covers:
   - which defender slides where at each ball spot;
   - who is open;
   - open shots really open;
   - layups inside 7 ft.
3. **Screenshots:** top-camera stills of every new read's key moments, and (group 1) before/after stills of every changed moment in the existing plays, reviewed.
4. **Browser run:** every play × read played end to end with no errors. The zone outline is checked on desktop and at 360 px.
5. **Review:** a fresh reviewer on the most capable model reads the group's diff. Critical and Important findings are fixed before merging.

Then:
1. **Web:** merge into `main` and push (GitHub Pages updates).
2. **App:**
   - Move the `web` submodule to that commit.
   - Bump `versionCode` / `versionName`: group 1 → 9 / 1.8, group 2 → 10 / 1.9, group 3 → 11 / 2.0.
   - Run `npm run apk`.
   - Scan the APK for the league name, `famous` fields, real names and external URLs, and run the offline smoke test.
   - Commit and push.
3. **Docs**, updated in each group's release:
   - the README play tables and counts;
   - `docs/design.md` (zone engine, three seconds, pass lanes, floor outline);
   - PRODUCT.md (the "zone schemes are not built yet" line);
   - the store listing drafts (`docs/play-store.md`, app repo), for plays and reads counts and the new section.

## Testing additions

- **Zone tables:**
  - every zone's spots are on the court;
  - each anchor has exactly one ball defender, and it is one of the zone's defenders;
  - `zoneSpots` returns the table exactly at each anchor and is continuous between anchors (sampled);
  - every `outline` names each zone defender once.
- **Zone behavior:** in every defense play and read, whenever the ball holder stands within 2 ft of an anchor and no step override, three-second step-out or pass-lane step applies to that defender, each zone defender other than the ball defender is within 3 ft of its table spot. Man-mode defenders stay within their usual distance of their man.
- **Area mode:** a matchup defender's position changes continuously as attackers enter and leave its area (no frame-to-frame jump beyond the teleport limit).
- **Three seconds:** in every play and read (all 42), no defender's count exceeds 3.0 s, using the definitions above.
- **Pass lanes:** in every play and read (all 42), no non-handoff pass comes within 1.4 ft of a defender's position while the ball is below 7.5 ft.
- **Existing checks, extended to the new plays:**
  - camera frame from `t = 0`;
  - teleport limits;
  - collision radii;
  - Korean/English completeness;
  - no real names outside `famous`;
  - read structure;
  - category labels.

## Acceptance criteria

1. **Content:** all 6 plays and their 12 added reads exist in Korean and English, as in the content table, and pass `npm test`.
2. **Library:** Defensive schemes appears with its two categories. Search finds every new play by Korean name, English name and alias.
3. **Zone behavior:** zone defenders follow the ball by their tables, combination defenses keep their man defenders on their men, and the floor outline shows each zone's shape on desktop and phone without covering the court.
4. **Three seconds:** the rule holds for every play and read, old and new.
5. **Pass lanes:** no pass in any play or read travels through a defender's body. The changed moments in the existing plays were reviewed and their captions still match.
6. **Releases:** each group was released as described. The site is updated, the app repo is moved to the merge commit, the APK is built with the group's version, and the scan is clean.
