# Design notes

## Goals

- Recreate common pro-basketball offensive sets in 3D and explain each phase step by step.
- Open instantly in a browser with no install or build step, and deploy as a static site (GitHub Pages).
- Define each play purely as data (one file per play) so new plays are easy to add.

## Modules

| Module | Responsibility | Depends on |
|------|------|------|
| `engine.js` | Compiles a play definition into `t → position` functions: offense paths, ball flight, automatic defense, notation data | three (curve math) |
| `court.js` | Half-court texture and hoop meshes | engine (rim position) |
| `players.js` | Player model and poses, ball model | three |
| `notation.js` | Turns notation data into floor ribbon meshes with per-step opacity | engine |
| `camera.js` | Camera presets, aspect-ratio fitting, ball follow | OrbitControls |
| `main.js` | Scene assembly, playback loop, UI | all of the above |

## Time model

- Steps run back to back, each with its own `dur` (seconds). Total length is the sum plus a short tail after the shot.
- Each offensive player's position is a **pure function** built by chaining per-step paths (centripetal Catmull-Rom curves with sine easing).
- The ball is a list of segments: `hold → flight → hold … → shot → drop`. A pass lands where the receiver will be at arrival time.
- Defense is automatic by default:
  - On-ball defender: about 3 ft between the ball handler and the rim.
  - Off-ball defenders: between their man and the rim, sagging toward a help spot in the paint the farther they are from the ball (`sag`).
  - `lag` (reaction delay) makes a defender look caught on a screen.
  - Defenders closer than 2 ft to an offensive player are pushed out, so screens naturally impede them.
  - At step boundaries, positions are blended over 0.5 s from the previous spot to the new target to avoid jumps.
- Because everything is a function of `t`, timeline scrubbing and step jumps always land on exactly the same frame.

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

- Every play was sampled at 0.05 s intervals to check for NaN values, peak player speed (kept at or under a sprint of roughly 25 ft/s), and that shot distance matches the points scored (2 vs 3).
- Desktop (1440×900), tablet (1024 wide) and mobile (390×844) layouts were checked in both themes to show the whole half court without horizontal page scrolling.
