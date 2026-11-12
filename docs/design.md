# Design notes

## Goals

- Recreate common pro-basketball offensive sets in 3D and explain each phase step by step.
- Open instantly in a browser with no install or build step, and deploy as a static site (GitHub Pages).
- Define each play purely as data (one file per play) so new plays are easy to add.
- Go past the basic play: show how each play changes depending on what the defense does (reads), and keep the library browsable as it grows past 40 plays.

## Modules

| Module | Responsibility | Depends on |
|------|------|------|
| `engine.js` | Compiles a play definition into `t → position` functions: offense paths, ball flight, automatic defense (man and zone), notation data | three (curve math), zones |
| `zones.js` | Zone tables at eight anchor ball spots and `zoneSpots(zone, ball)`, the blended spot of every zone defender for any ball spot. Pure, no DOM, no engine | — |
| `court.js` | Half-court texture and hoop meshes | engine (rim position) |
| `players.js` | Player model and poses, ball model | three |
| `notation.js` | Turns notation data into floor ribbon meshes with per-step opacity, plus the zone outline | engine |
| `camera.js` | Camera presets fitted to the court's bounds, re-fit on rotation, orbit limits, ball follow | OrbitControls |
| `clock.js` | Game clock, shot clock and score at time `t` for special-situation plays, and the score bug's view. Pure, no DOM | — |
| `reads.js` | Turns a play plus a read id into an ordinary play (shared steps + that read's steps); read labels per language. Pure, no DOM | — |
| `reads-ui.js` | Read tabs above the timeline and the branch-point prompt, docked in the caption | — |
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
  - **Defensive three seconds** (the pro rule, every play): no defender stays in the lane (|x| ≤ 8 ft, baseline to the free-throw line at z = 19 ft) for more than 3.0 s without an attacker within arm's length (3.5 ft). The count stops when the first shot leaves the hand.
    - At compile time the engine counts each defender's unguarded time on a 1/60 s grid. Before the count would reach 2.8 s it sends the defender to the cheapest legal spot: 0.6 ft past the nearer lane line or the free-throw line, or 3 ft from its own man (arm's length). It skips a spot where another defender or an attacker already stands, prefers the spot the defender's target strays from least over the next 0.6 s, stays 0.4 s and comes back.
    - The move is an offset added to the defender's target that changes by at most 10 ft/s, stored per grid point, so it never adds more than a jog to the motion and never jumps. It is dropped as soon as the target itself leaves the lane or guards someone, or the first shot is released.
    - Decisions look ahead only up to the branch point, so every read still shares the opening exactly.
  - **Pass lanes** (every play): a pass below 7.5 ft never goes through a defender's body (1.4 ft). For each flight (handoffs exempt) the engine finds when the ball comes within 1.75 ft of a defender and moves that defender sideways, away from the pass line on the side it stands, by exactly enough, easing in over 0.25 s before and out over 0.25 s after. If that side would take it off the court, it steps to the other side. This covers the passer's own defender, so the ball leaves past its side.
  - Order: the target (automatic or a step's `path`, blended between steps) → three-second offset → pass-lane step → collision handling. Plays rarely need to know: where a caption needs a defender near its man ("tied up with [5]", "caught on the screen"), the step sets `sag: 0` or a `path` so the rule is met where the caption says.
- Because everything is a function of `t`, timeline scrubbing and step jumps always land on exactly the same frame.
- Every player stays inside what the default coach camera shows on a 16:10 desktop screen: the full court width up to z = 36 ft and the middle (|x| ≤ 12 ft) up to z = 38.5 ft (z = 40 ft minus a margin for the floor rings). Early offense therefore starts as the ball crosses about 6–9 ft past the arc, with players already running in, rather than at half court. Behind the end line the frame reaches z = −2.5 ft, and beyond the left sideline x = −26.6 ft up to z = 20 ft, for inbounders; the right sideline is cut off by the broadcast camera, which sits on that side, so nobody stands past it. `npm test` checks it for every play and read, from `t = 0`.

## Zone defenses

- A play in the defense section carries `defense: { zone, man? }`. Defenders in `ZONES[zone].members` play the zone, defenders named in `man` (and any other defender) play man-to-man. Plays without the block keep the man-to-man path untouched (`npm test` compares three man plays against positions recorded before zones existed).
- **Tables (`zones.js`).** Each zone lists every member's spot and the ball defender at eight anchor ball spots: top (0, 27), wings (∓17, 21), corners (∓21.5, 3), high post (0, 17), blocks (∓6, 6). Tables give the top, the high post and the left side; the right side is mirrored, swapping the left and right defenders. Between anchors, spots and ball weights are blended by inverse-distance weighting (power 2), exact at the anchors.
  - **2-3:** x1/x2 guards, x3/x4 back line, x5 middle. **3-2 (1-2-2):** x1 top, x2/x3 wings, x4/x5 back line; on a high-post catch x4 steps up and x1 drops behind it (the engine's ball pressure always sits between the holder and the rim, so the top man cannot pressure from behind). **1-3-1:** x1 top, x2/x3 wings, x5 middle, x4 baseline; the wing defender and x1 trap the ball on the wing, x4 and the wing trap it in the corner, and x4 alone covers both corners. The outline joins x1, x3, x4, x5, x2, so it dents in at the middle defender; the table keeps the middle high enough on the wings that the loop never crosses itself (`npm test` checks every zone's outline over a grid of ball spots).
  - **Box-and-one and triangle-and-two:** `defense: { zone: 'box', man: { d1: 'o2' } }` and `{ zone: 'triangle', man: { d1: 'o1', d2: 'o2' } }`. The box (x2/x3 front, x4/x5 back) and the triangle (x3 at the free-throw line, x4/x5 on the blocks) have their own tables. The chasers in `man` play man-to-man for every step and deny their stars off the ball: instead of sinking to help, a chaser stands 2.6 ft from the star on the ball side, tilted a little toward the rim, so the pass has to go around it (a step's `sag` turns this back into ordinary man-to-man). The zone part never closes out on a star (the chaser has it), and the outline joins only the zone members. `zoneDeviations` allows a chaser 8 ft from its star, because running a star off two screens leaves the chaser about 7 ft behind; reads that show the chaser beaten by screens script it further back.
  - **Matchup (area mode):** the 2-3's table and numbering with `mode: 'area'`. Each member starts from its table spot and is pulled toward the man-to-man spot (between the man and the rim) of every attacker within 8 ft of that spot, with a weight of 0.85 × smoothstep(1 − distance / 8); weights over 1 are averaged, so who is "in the area" never switches abruptly. Ball pressure then applies as in a zone.
  - Back-line spots at the top sit just outside the lane line where the slide rules allow, so the three-second rule rarely has to move them.
- **Position.** A zone defender's spot is the table at the ball's position (also while the ball is in the air), averaged over the last 0.6 s (an exact running average over a 1/60 s grid). The average already trails the ball by about 0.3 s, so the usual 0.28 s lag is not added (a step's extra `lag` still delays it). The average keeps the zone moving on the pass without letting it jump at ball speed. The ball defender then closes out toward the holder by its ball weight; the receiver's weight ramps up until 0.6 s after the catch, and the passer's weight releases over the same 0.6 s, so a long slide arrives as a closeout rather than a sprint.
- **Steps.** A step's `path`, `guard` or `lag` override wins as before. `guard` makes a zone defender a man defender for that step only. Zone defenders that stay in the zone across a step boundary are not blended, because there is nothing to join.
- **Rules.** The three-second step-out and the pass-lane step apply to zone defenders too. A zone defender only steps out past a lane line (it has no man to close on), so the middle of a 2-3 steps out and back in.
- **Outline.** `cp.zone = { name, outline }`. `Notation#updateZone` draws one closed blue ribbon (0.14 ft, `#3a6fd8`, 60 % opacity) through the members in outline order, rewriting one buffer each frame, just above the floor and under the play notes. It shows only when both the notation and the defense toggles are on, and only in zone plays.
- **UI.** Zone plays show a "Zone" legend item and head the counters list **How to beat it** (`h.beats`); the branch prompt asks where the offense attacks the zone. `guardOf` returns `null` for an off-ball zone defender, which then faces the ball.
- **Checks.** `zoneDeviations` (in `npm test`, every zone play and read): whenever the holder has stood within 2 ft of an anchor for 0.8 s, each zone defender that is not stepping out, not stepping aside for a pass and not scripted in that step is within 3 ft of its spot, the ball defender within 4 ft of the holder, and each man defender within 7 ft of its man.

## Reads (defensive branches)

- A play may carry a `reads` block: `at` (number of shared steps), a prompt, the base read (the play's own steps), and options that replace `steps[at..]`. `reads.js` builds the chosen read as a normal play object, so the engine and localization never see branches.
- All reads share the opening exactly, which `npm test` checks frame by frame, so switching reads before the branch point never jumps.
- Playing from the start stops at the branch point and asks how the defense plays it. Step mode waits, Auto/Relaxed continue with the current tab after the reading time, Off never asks. While the prompt is open the caption stays on the last shared step, and the court, floor notation and timeline stay on the last shared moment, so nothing gives the answer away. The prompt takes the caption's place instead of floating over the court. In Auto/Relaxed its countdown covers the question and every option (at least 6 s), and it holds while the pointer or keyboard focus is on the options; pausing moves focus to the current option. Next (→) continues with the current tab, so the read's first step is never skipped.
- Tabs above the timeline switch reads at any time; a ◆ marks the branch point. The first step after the branch shows a one-line "why". Counters with an animated read get a Watch button. `?read=<id>` links to a read.

## Special situations

The section is complete with 12 plays: four baseline and three sideline out-of-bounds plays, two after-timeout sets and three end-of-game plays, each with a base read and two more.

- Plays in the situations section (baseline and sideline out of bounds, end of game, after timeout) carry `situation: { period, clock, shotClock, score: [offense, defense] }`. It is numbers only, so it needs no translation; goals such as "must score a three" stay in the summary.
- **After timeout:** these plays start as half-court sets with the ball at the top, so both clocks run from `t = 0`.
- **End of game:** Last Shot is a half-court possession timed so every read releases with about one second left (the jumper then reaches the rim at the buzzer, and the bug shows `0.0` with the points added). Down Three and Under a Second inbound from the sideline; in Under a Second the clock starts on the catch, so every read catches with 0.9 s and releases within it.
- **Inbounds:** the play's starting ball holder starts out of bounds: behind the end line at z ≈ −1.5 ft beside the rim (|x| 4–10 ft) for baseline plays, or just outside the left sideline at x ≈ −25.6 ft, z ≈ 18 ft for sideline plays (on phones the coach camera shows only the court's width, so an inbounder farther out loses a shoulder). The first ball event is the inbound pass, and the inbounder steps onto the court within 1 s of releasing it. Automatic defense needs nothing new: the inbounder's defender already stands about 3 ft toward the rim, and off-ball defenders never go below z = 1.2 ft.
- **Clock (`clock.js`):** the game clock starts at the first catch on the court (the end of the first ball flight) for inbound plays, and at `t = 0` otherwise. After a basket it stops only in the last 2:00 of the 4th quarter or overtime (NBA and FIBA); otherwise it keeps running to the end of the play. It never goes below 0.0, and the shot clock stops at the basket. The offense's points go up at each scoring time. The shot clock runs from the same start and is hidden when it is null or longer than the game clock. All of it is a function of `t`, so reading pauses and the branch prompt freeze it.
- **Score bug:** a broadcast-style strip next to the play title, cells joined edge to edge: period | game clock | offense score | defense score | shot clock (small, at the right end). The scores fill their cells with the jersey colors (offense orange, defense blue) instead of sitting on round chips, so they never read as a player number. Under 60 s the clock shows tenths, truncated as broadcasts do; under 5 s it turns the accent color. Overtime reads `OT` / `연장`. It is never drawn over the court. When the toolbar row is too narrow for the title, the bug and the camera and language buttons, the bug moves under the title and the buttons wrap below; on phones it takes its own row.
- **Rule checks** (`npm test`, every play and read): the inbound pass leaves within 5 s; only the inbounder is ever out of bounds, and only until 1 s after the pass; defenders never leave the court; nobody uses the right sideline; a shown shot clock never runs out before the shot; in end-of-game plays the last shot leaves before the buzzer, and a catch with under 0.3 s left allows only a finish at the rim.

## Library

- `SECTIONS` in `js/plays/index.js` groups categories into offense sets, special situations and defensive schemes; empty sections are hidden. Defensive schemes have two categories: zone defenses and combination defenses.
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
- Orange means offense or the current state: offense chips, the play button, the jerseys, the current step and timeline segment. An orange circle with a number is always an offense player, so nothing else uses that shape: the step list numbers its steps with plain numerals (the current one in orange), and the caption's step counter is plain orange figures with a hairline before the step title. Read counts in the library, bullets and the counters' *Watch* buttons stay neutral; counters are rows split by hairlines, not cards inside the panel. Branch points carry one mark, a small orange ◆, on the timeline, in front of the branch card's question and on the step-list divider. Difficulty is filled and hollow dots (●○○) in both the list and the level filter. The category · difficulty line sits under the play title, never above it as a kicker.
- The display toggles (defense, notation, labels) are independent switches, so they stand as separate pills rather than one segmented track: on is the same raised pill as every other selected option (with a hairline edge in light, since there is no track), off is outlined and struck through.
- The score pop is the same in both themes (ivory figures with a soft dark shadow), because the wooden floor under it does not change with the theme.
- Every segmented control marks its selected option the same way: a raised pill (lighter charcoal in dark, white with a soft shadow in light). The header's camera and language switches sit straight on the page, so in light their track is a gray well rather than a white panel.
- Browser surfaces follow the theme: text selection is a soft orange, scrollbars are thin and tinted, the search caret is orange.
- Two themes, switched with the sun/moon button in the toolbar or `T`:
  - Dark (default when the system is dark): warm charcoal page `#141311`, panels `#1d1b19`, ivory text `#ede8e1`.
  - Light: warm gray page `#f1f0ee`, white panels, ink text `#1e1d1b`. The notation legend stays on a dark tile so its colors read the same as on the floor.
  - Without a saved choice the theme follows `prefers-color-scheme` (and updates live). An inline script in `index.html` applies the saved theme before first paint.
  - The 3D scene follows the theme too: background/fog, the apron around the court, the outer floor, and the floor lettering are redrawn from `SCENE_THEMES` in `court.js`.
- Tokens live as CSS custom properties on `:root` and `:root[data-theme="light"]`. Radii: panels 20 px, inner blocks 14 px, controls 999 px. One accent (`#ee7a3a`) shared by offense chips, the play button, and the 3D jerseys; defense is `#3a6fd8` (`#2f64cf` in light).
- Type: Rubik (rounded corners, used for Latin text and numbers, the wordmark, and canvas labels) with Pretendard for Korean (`word-break: keep-all`). Weights stay at 400–600.
- Cameras: each preset sets a direction, and the distance is solved so the court box (sideline to sideline including inbounders, behind the end line to the top, up to label height) fits the view, which also handles phones in portrait. The baseline camera sits off-axis above the backboard so the hoop support does not cover the paint, and fits the court from the end line. The view re-fits after a rotation or a large resize unless the user has orbited. Orbit and pan keep the target inside the court area and the camera above the floor. Player numbers never shrink below about 19 px on screen. Overlays (notation, rings, labels) are not tone-mapped, so they match the legend; the floor is matte enough that the apron and notation keep their contrast.
- Layout notes: nothing sits on top of the 3D court, so players in the corners are never covered. The branch prompt is docked in the caption. On laptops the settings stay on one row: speed is a compact select, and a score bug hides the category line. On phones the transport sits right under the court (then the caption, read tabs and settings), so play/pause is reachable without scrolling. The camera switch shares the header row with the title and the language/theme controls; display toggles sit in the settings row; loop is an icon button next to the playback buttons. The floating-panel gaps cost some height, so the header, caption and controls are kept compact to leave the court about as tall as in the previous flush layout. The step list in the info panel shows titles only (the caption carries the full text); timeline segments are labeled with step names; the reading pause shows a ring countdown; keyboard shortcuts live in a popover (`?`).
- Logo: two screens (vertical bars) with a cutter's route arrow slipping between them, forming an "H", on a rounded orange tile.

## Localization

- `js/i18n.js` holds the UI strings for `ko` and `en`. Static markup is translated through `data-i18n`, `data-i18n-title`, and `data-i18n-aria` attributes.
- Play files keep Korean content at the top level and English content in an `en` block with the same shape. `localize(play, lang)` merges them and falls back to Korean field by field.
- Every label shows exactly one language. Switching languages re-renders the text without touching the playback state (time, reading pause, camera).
- Reading time is language-aware: Korean `1 + chars / 12`, English `1 + words / 4.5`, both clamped to 2.5–10 s.
- Language priority: `?lang=` in the URL, then the saved choice, then the browser language.

## Install and offline (PWA)

- `manifest.webmanifest` and `sw.js` sit at the site root, so `start_url` and the service worker's scope (`./`) cover the GitHub Pages subpath. Icons are PNGs rendered from the logo mark: 192 and 512 for any purpose, a full-bleed 512 maskable icon with the mark inside the safe zone, and a 180 Apple touch icon.
- The service worker is network-first: online, every request goes to the network and successful responses are stored, so a deploy shows up immediately; offline, the stored copy answers, and a page request with a query (`?read=…#play`) falls back to the main page. Besides the site's own files it caches the three CDN hosts the page uses (jsDelivr for Three.js and Pretendard, Google Fonts and gstatic for Rubik).
- The first visit loads every play module, Three.js and the fonts, so one visit is enough for every play to work offline. Pretendard is split into character subsets, so text never shown online may fall back to a system font offline.
- The two font stylesheets are requested with `crossorigin`, so their responses are ordinary (not opaque) and can be stored.
- `CACHE` is versioned only for the precached shell (icons, manifest); content updates arrive through the network-first fetch.
- The store app never uses it: the registration script skips `<html data-build="store">`, and the app's `build-www` removes the manifest and icon links.
- `tests/pwa.test.mjs` checks the manifest fields and icon sizes, that the service worker covers every external host the page loads, the `crossorigin` stylesheets, and that registration skips the store build.

## Verification

- `npm test` (Node's built-in runner, `three` as the only dev dependency) samples every play and every read at 1/120 s: no NaN, offense ≤ 25 ft/s, defense ≤ 38 ft/s, no defender inside an attacker (≥ 1.8 ft) or another defender (≥ 1.35 ft), no two attackers overlapping (≥ 1.35 ft), 3-pointers released at least half a foot outside the drawn 3-point line and 2-pointers inside it, every handoff made hand to hand (≤ 4 ft), every catch held at least 0.08 s before the next pass or shot, a screen that comes with a handoff drawn at the handoff spot, jumpers from 15 ft and out with no defender within 3.5 ft at release, and every player inside the coach camera's frame. Defenders are also sampled at 1/960 s (≤ 38 ft/s), defense positions must not depend on query order, and idling past the end must not grow the collision cache. Every play and read also passes the defensive three-second rule and the pass-lane rule (no pass within 1.4 ft of a defender below 7.5 ft, teammates 0.9 ft), and compiles in under 300 ms. It also checks KO/EN parity, read ids, counter links, sections, and that every read shares the opening with the base read.
- Desktop (1440×900), tablet (1024 wide) and mobile (390×844) layouts were checked in both themes to show the whole half court without horizontal page scrolling.
