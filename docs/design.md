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
  - At step boundaries, positions are blended over 0.5 s from the previous spot to the new target. Blending uses the positions before collision handling, so the push is applied exactly once.
- Because everything is a function of `t`, timeline scrubbing and step jumps always land on exactly the same frame.

## Reads (defensive branches)

- A play may carry a `reads` block: `at` (number of shared steps), a prompt, the base read (the play's own steps), and options that replace `steps[at..]`. `reads.js` builds the chosen read as a normal play object, so the engine and localization never see branches.
- All reads share the opening exactly, which `npm test` checks frame by frame, so switching reads before the branch point never jumps.
- Playing from the start stops at the branch point and asks how the defense plays it. Step mode waits, Auto/Relaxed continue with the current tab after the reading time, Off never asks. While the prompt is open the caption stays on the last shared step so it does not give the answer away.
- Tabs above the timeline switch reads at any time; a ◆ marks the branch point. The first step after the branch shows a one-line "why". Counters with an animated read get a Watch button. `?read=<id>` links to a read.

## Library

- `SECTIONS` in `js/plays/index.js` groups categories into offense sets, special situations and defensive schemes; empty sections are hidden.
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

- `npm test` (Node's built-in runner, `three` as the only dev dependency) samples every play and every read at 1/120 s: no NaN, offense ≤ 25 ft/s, defense ≤ 38 ft/s, no defender inside an attacker (≥ 1.8 ft) or another defender (≥ 1.35 ft), 3-pointers from 22 ft or more and 2-pointers from inside 23.75 ft. It also checks KO/EN parity, read ids, counter links, sections, and that every read shares the opening with the base read.
- Desktop (1440×900), tablet (1024 wide) and mobile (390×844) layouts were checked in both themes to show the whole half court without horizontal page scrolling.
