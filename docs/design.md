# Design notes

## Goals

- Recreate common pro-basketball offensive sets in 3D and explain each phase step by step.
- Open instantly in a browser with no install or build step, and deploy as a static site (GitHub Pages).
- Define each play purely as data (one file per play) so new plays are easy to add.
- Go past the basic play: show how each play changes depending on what the defense does (reads), and keep the library browsable as it grows past 40 plays.

## Modules

| Module | Responsibility | Depends on |
|------|------|------|
| `engine.js` | Compiles a play definition into `t → position` functions: offense paths, ball flight, automatic defense, notation data | three (curve math) |
| `court.js` | Half-court texture and hoop meshes | engine (rim position) |
| `players.js` | Player model and poses, ball model | three |
| `notation.js` | Turns notation data into floor ribbon meshes with per-step opacity | engine |
| `camera.js` | Camera presets, aspect-ratio fitting, ball follow | OrbitControls |
| `clock.js` | Game clock, shot clock and score at time `t` for special-situation plays, and the score bug's view. Pure, no DOM | — |
| `reads.js` | Turns a play plus a read id into an ordinary play (shared steps + that read's steps); read labels per language. Pure, no DOM | — |
| `reads-ui.js` | Read tabs above the timeline and the branch-point prompt over the court | — |
| `library.js` | Searchable, sectioned play list (`filterPlays` is pure and tested) | reads |
| `main.js` | Scene assembly, playback loop, branch-point flow, UI | all of the above |

## Time model

- Steps run back to back, each with its own `dur` (seconds). Total length is the sum plus a short tail after the shot.
- Each offensive player's position is a **pure function** built by chaining per-step paths (centripetal Catmull-Rom curves with sine easing).
- The ball is a list of segments: `hold → flight → hold … → shot → drop`. A pass lands where the receiver will be at arrival time.
- Defense is automatic by default:
  - On-ball defender: about 3 ft between the ball handler and the rim.
  - Off-ball defenders: between their man and the rim, sagging toward a help spot in the paint the farther they are from the ball (`sag`).
  - `lag` (reaction delay) makes a defender look caught on a screen.
  - Switching between the on-ball and help spots follows a ball-ownership weight instead of flipping instantly: it ramps up while a pass flies toward the defender's man and ramps down over 0.45 s after the man gives the ball up.
  - Defenders closer than 2.05 ft to an offensive player (1.8 ft to another defender) are kept out of that circle. Pushing straight out would flip a defender to the far side when its target passes through the center, so the engine finds the window during which the target is inside the circle (entry and exit times; positions are functions of `t`, so both can be searched) and slides the defender along the circle from the entry side to the exit side.
  - When several circles touch one defender at once (a crowd around a screen), their pushes are added rather than the last one winning, so a defender never jumps for a single frame.
  - Each compiled play caches the windows it has found, keyed by the pair, so a call costs about 0.1 ms on a desktop (three calls per frame). A window never spans the branch point (it is cut there, with the same angle on both sides), so every read shares the opening exactly, and `defense(t)` is clamped to the play's length so a paused last frame adds nothing to the cache.
  - At step boundaries, positions are blended over 0.5 s from the previous spot to the new target. Blending uses the positions before collision handling, so the push is applied exactly once.
- Because everything is a function of `t`, timeline scrubbing and step jumps always land on exactly the same frame.
- Every player stays inside what the default coach camera shows on a 16:10 desktop screen: the full court width up to z = 36 ft and the middle (|x| ≤ 12 ft) up to z = 38.5 ft (z = 40 ft minus a margin for the floor rings). Early offense therefore starts as the ball crosses about 6–9 ft past the arc, with players already running in, rather than at half court. Behind the end line the frame reaches z = −2.5 ft, and beyond the left sideline x = −26.6 ft up to z = 20 ft, for inbounders; the right sideline is cut off by the broadcast camera, which sits on that side, so nobody stands past it. `npm test` checks it for every play and read, from `t = 0`.

## Reads (defensive branches)

- A play may carry a `reads` block: `at` (number of shared steps), a prompt, the base read (the play's own steps), and options that replace `steps[at..]`. `reads.js` builds the chosen read as a normal play object, so the engine and localization never see branches.
- All reads share the opening exactly, which `npm test` checks frame by frame, so switching reads before the branch point never jumps.
- Playing from the start stops at the branch point and asks how the defense plays it. Step mode waits, Auto/Relaxed continue with the current tab after the reading time, Off never asks. While the prompt is open the caption stays on the last shared step so it does not give the answer away.
- Tabs above the timeline switch reads at any time; a ◆ marks the branch point. The first step after the branch shows a one-line "why". Counters with an animated read get a Watch button. `?read=<id>` links to a read.

## Special situations

The section is complete with 12 plays: four baseline and three sideline out-of-bounds plays, two after-timeout sets and three end-of-game plays, each with a base read and two more.

- Plays in the situations section (baseline and sideline out of bounds, end of game, after timeout) carry `situation: { period, clock, shotClock, score: [offense, defense] }`. It is numbers only, so it needs no translation; goals such as "must score a three" stay in the summary.
- **After timeout:** these plays start as half-court sets with the ball at the top, so both clocks run from `t = 0`.
- **End of game:** Last Shot is a half-court possession timed so every read releases with about one second left (the jumper then reaches the rim at the buzzer, and the bug shows `0.0` with the points added). Down Three and Under a Second inbound from the sideline; in Under a Second the clock starts on the catch, so every read catches with 0.9 s and releases within it.
- **Inbounds:** the play's starting ball holder starts out of bounds: behind the end line at z ≈ −1.5 ft beside the rim (|x| 4–10 ft) for baseline plays, or just outside the left sideline at x ≈ −25.6 ft, z ≈ 18 ft for sideline plays (on phones the coach camera shows only the court's width, so an inbounder farther out loses a shoulder). The first ball event is the inbound pass, and the inbounder steps onto the court within 1 s of releasing it. Automatic defense needs nothing new: the inbounder's defender already stands about 3 ft toward the rim, and off-ball defenders never go below z = 1.2 ft.
- **Clock (`clock.js`):** the game clock starts at the first catch on the court (the end of the first ball flight) for inbound plays, and at `t = 0` otherwise. It stops when the last shot reaches the rim and never goes below 0.0. The offense's points go up at each scoring time. The shot clock runs from the same start and is hidden when it is null or longer than the game clock. All of it is a function of `t`, so reading pauses and the branch prompt freeze it.
- **Score bug:** a pill next to the play title, `4Q · 7.5 · 98 – 98`, with the scores on jersey-colored chips (offense orange, defense blue) and the shot clock small at the right end. Under 60 s the clock shows tenths, truncated as broadcasts do; under 5 s it turns the accent color. Overtime reads `OT` / `연장`. It is never drawn over the court. When the toolbar row is too narrow for the title, the bug and the camera and language buttons, the bug moves under the title and the buttons wrap below; on phones it takes its own row.
- **Rule checks** (`npm test`, every play and read): the inbound pass leaves within 5 s; only the inbounder is ever out of bounds, and only until 1 s after the pass; defenders never leave the court; nobody uses the right sideline; a shown shot clock never runs out before the shot; in end-of-game plays the last shot leaves before the buzzer, and a catch with under 0.3 s left allows only a finish at the rim.

## Library

- `SECTIONS` in `js/plays/index.js` groups categories into offense sets, special situations and defensive schemes; empty sections are hidden.
- Offense sets have five categories, in this order: on-ball screens, off-ball screens, motion & drive, early offense, and system offenses. Special situations have four: baseline out of bounds, sideline out of bounds, end of game, and after timeout.
- System offenses (Flex, Princeton Chin, Delay, Sideline Triangle) show one representative cycle of their continuity with its reads, not the whole repeating loop.
- Search matches Korean names, English names and `aliases` regardless of UI language, ignoring case, spaces and hyphens. Difficulty chips use the same dots as the list. Collapsed sections are remembered.
- On screens up to 1100 px wide, the play title opens the same library in a bottom sheet instead of a horizontal strip.

## Reading mode

- `1×` stays real game speed. Instead of slowing the action, playback inserts a **reading pause** at the start of each step.
- The pause is measured in real time (not timeline time): `clamp(1 + chars / 12, 2.5, 10)` seconds for Auto, ×1.7 for Relaxed. Step-by-step mode pauses until the user continues; Off disables it.
- During the pause the timeline is frozen at the step's start, while the floor notation and the involved players' highlight rings fade in on a real-time clock, so the diagram "explains" the step before it runs.

## Visual design

- Direction: soft and warm rather than sharp. Rounded panels float on the page with 12 px gaps instead of a flush three-column grid split by hairlines; controls are pill-shaped; there are no "01" numbers, accent eyebrows, left accent bars, or dotted chips.
- Two themes, switched with the sun/moon button in the toolbar or `T`:
  - Dark (default when the system is dark): warm charcoal page `#141311`, panels `#1d1b19`, ivory text `#ede8e1`.
  - Light: warm gray page `#f1f0ee`, white panels, ink text `#1e1d1b`. The notation legend stays on a dark tile so its colors read the same as on the floor.
  - Without a saved choice the theme follows `prefers-color-scheme` (and updates live). An inline script in `index.html` applies the saved theme before first paint.
  - The 3D scene follows the theme too: background/fog, the apron around the court, the outer floor, and the floor lettering are redrawn from `SCENE_THEMES` in `court.js`.
- Tokens live as CSS custom properties on `:root` and `:root[data-theme="light"]`. Radii: panels 20 px, inner blocks 14 px, controls 999 px. One accent (`#ee7a3a`) shared by offense chips, the play button, and the 3D jerseys; defense is `#3a6fd8` (`#2f64cf` in light).
- Type: Rubik (rounded corners, used for Latin text and numbers, the wordmark, and canvas labels) with Pretendard for Korean (`word-break: keep-all`). Weights stay at 400–600.
- Layout notes: nothing sits on top of the 3D court, so players in the corners are never covered. The camera switch shares the header row with the title and the language/theme controls; display toggles sit in the settings row; loop is an icon button next to the playback buttons. The floating-panel gaps cost some height, so the header, caption and controls are kept compact to leave the court about as tall as in the previous flush layout. The step list in the info panel shows titles only (the caption carries the full text); timeline segments are labeled with step names; the reading pause shows a ring countdown; keyboard shortcuts live in a popover (`?`).
- Logo: two screens (vertical bars) with a cutter's route arrow slipping between them, forming an "H", on a rounded orange tile.

## Localization

- `js/i18n.js` holds the UI strings for `ko` and `en`. Static markup is translated through `data-i18n`, `data-i18n-title`, and `data-i18n-aria` attributes.
- Play files keep Korean content at the top level and English content in an `en` block with the same shape. `localize(play, lang)` merges them and falls back to Korean field by field.
- Every label shows exactly one language. Switching languages re-renders the text without touching the playback state (time, reading pause, camera).
- Reading time is language-aware: Korean `1 + chars / 12`, English `1 + words / 4.5`, both clamped to 2.5–10 s.
- Language priority: `?lang=` in the URL, then the saved choice, then the browser language.

## Verification

- `npm test` (Node's built-in runner, `three` as the only dev dependency) samples every play and every read at 1/120 s: no NaN, offense ≤ 25 ft/s, defense ≤ 38 ft/s, no defender inside an attacker (≥ 1.8 ft) or another defender (≥ 1.35 ft), no two attackers overlapping (≥ 1.35 ft), 3-pointers released at least half a foot outside the drawn 3-point line and 2-pointers inside it, every handoff made hand to hand (≤ 4 ft), every catch held at least 0.08 s before the next pass or shot, a screen that comes with a handoff drawn at the handoff spot, jumpers from 15 ft and out with no defender within 3.5 ft at release, and every player inside the coach camera's frame. Defenders are also sampled at 1/960 s (≤ 38 ft/s), defense positions must not depend on query order, and idling past the end must not grow the collision cache. It also checks KO/EN parity, read ids, counter links, sections, and that every read shares the opening with the base read.
- Desktop (1440×900), tablet (1024 wide) and mobile (390×844) layouts were checked in both themes to show the whole half court without horizontal page scrolling.
