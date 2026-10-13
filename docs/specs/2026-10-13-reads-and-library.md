# Reads and library — design spec

Sub-project 1 of 4 in the "go deeper" roadmap (1 reads + library, 2 advanced offensive sets, 3 special situations, 4 defensive schemes). Each later sub-project gets its own spec.

## Goal

Move the playbook past "here is the basic play" by showing **how a play changes depending on what the defense does**, and make the play list scale to 40+ plays across offense, special situations and defense.

Success looks like:

- Every one of the current 10 plays has 2–4 animated reads on top of its base version, in Korean and English.
- Watching a play from the start pauses at the branch point and asks how the defense plays it; the learner can pick a read or switch reads with tabs at any time.
- A learner can find any play by Korean name, English name or a common alias in either language, filter by difficulty, and browse comfortably on a 360 px wide phone.
- The site stays a build-free static site; the store build in the private app repo keeps working unchanged.

## Out of scope

- More than one branch point per play, or nested reads.
- Quiz mode ("where should the ball go?") and progress tracking.
- New plays, special situations, defensive schemes, full-court rendering (sub-projects 2–4 and later).

## Terms

- **Read**: one way the play unfolds after the branch point, named after what the defense does (Drop, Switch, Trail, Top lock…).
- **Base read**: the play's existing `steps`. It is one of the reads, not a separate "default" mode.
- **Branch point**: the moment the reads diverge. Everything before it is identical in every read.

## Data model

A play may add a `reads` block. Plays without it behave exactly as today.

```js
export default {
  id: 'pick-and-roll',
  // …existing fields…
  aliases: ['PnR', 'high pick'],          // optional, searched in every language
  counters: [
    { name: '드롭', desc: '…', read: 'drop' },      // optional `read` links a counter to an animated read
    { name: '스위치', desc: '…', read: 'switch' },
    { name: '아이스', desc: '…' },                  // text only, no animation
  ],
  steps: [ /* unchanged: shared steps followed by the base read's steps */ ],
  reads: {
    at: 1,                                  // number of shared steps: steps[0 .. at-1] are shared
    prompt: '[x5]가 스크린을 어떻게 막나요?',
    base: { id: 'drop', label: '드롭', why: '…one line…' },
    options: [
      {
        id: 'switch', label: '스위치', why: '…one line…',
        steps: [ /* full step definitions (title, dur, text, move, ball, def, screens) that replace steps[at..] */ ],
      },
      // …
    ],
  },
  en: {
    // …existing fields…
    reads: {
      prompt: 'How does [x5] guard the screen?',
      base: { label: 'Drop', why: '…' },
      options: [ { label: 'Switch', why: '…', steps: [ { title, text }, … ] } ],   // matched to KO options by index
    },
  },
};
```

Rules:

- `at` is at least 1 and less than `steps.length`. The base read is `steps.slice(at)`.
- Read ids are unique within a play and URL-safe (`[a-z0-9-]+`).
- No ball flight may cross the branch point (a pass thrown in the last shared step must land before it ends), so the shared part never depends on what comes after.
- `en.reads.options[i].steps.length` equals `reads.options[i].steps.length`, same as the existing `en.steps` rule.

## Compiling — `js/reads.js`

Pure module, no DOM, importable from Node.

- `readIds(play)` → `['drop', 'switch', …]` (base first), or `[]` when the play has no reads.
- `variant(play, readId)` → a play-shaped object whose `steps` are `steps.slice(0, at)` + the read's steps and whose `en.steps` are assembled the same way. `readId` that is unknown or is the base id returns the play itself. The result goes straight into the existing `compilePlay`, and the existing `localize` works on it unchanged.
- `branchTime(play)` → sum of `dur` over the shared steps.
- Compiled results are cached per `play.id + readId` in `main.js`.

## Engine fix: defenders must not snap

Reads put the defense front and center, and the current engine makes defenders jump for a single frame. Measured at 1/120 s, defender peaks today are 127–407 ft/s on every play. There are three causes:

1. **On/off-ball switch is instant.** `autoPos` switches between the on-ball spot and the help spot the instant `holderAt` changes (catch, pass release, shot). Fix: an ownership weight per player.
   - 1 while holding the ball.
   - Ramps 0 → 1 (smoothstep) during a pass flight toward that player.
   - Ramps 1 → 0 over 0.45 s after the player releases the ball.
   - The defender's target is `lerp(helpSpot, onBallSpot, weight)`.
2. **Collision push flips sides.** Pushing a defender all the way out of a circle flips them to the other side when the target crosses the center. Fix: inside the circle, push to `r(l) = R·sin(πl / 2R)` (0 at the center, R at the edge). Run defender–defender separation twice, then a single offense pass.
3. **Blending re-applies the push.** Step-boundary blending starts from already-resolved positions and resolves again. Fix: blend from pre-collision positions; resolve once at the end.

A prototype of these three changes brings every current play to ≤ 37 ft/s. These are the only `engine.js` changes. The compile output and the play format stay the same.

## Playback and UI — `js/reads-ui.js`

State added to `main.js`: `state.read` (current read id) and `state.readChosen` (the learner picked a read for this play, by tab, prompt, link or counter button).

**Branch prompt.** When playback crosses the branch time, `readChosen` is false and reading mode is not Off:

- The timeline holds at the branch time and an overlay over the court shows the prompt and one button per read (base first).
- Step mode: waits for a choice. Enter continues with the current read.
- Auto mode: continues with the current read after `readTime(prompt)` × the mode factor, with the same countdown display as step holds.
- Off mode: no prompt, playback continues with the current read.
- Choosing a read switches the variant at the same `t` (seamless, since the shared part is identical), sets `readChosen`, and resumes. The normal step hold for the next step then applies.

`readChosen` resets only when a different play is selected.

**Read tabs.** A segmented control above the timeline lists the reads (base first). It is hidden for plays without reads and scrolls horizontally on narrow screens.

- Switching while `t` is before the branch time keeps `t`.
- Switching at or after the branch time jumps to the branch time and keeps the playing/paused state.
- Either way it sets `readChosen`.

**Timeline.** Shows the shared steps plus the current read's steps, with a ◆ marker at the branch time.

**Captions.** The first step after the branch shows a row with the read's label and its `why` line above the step text.

**Info panel.**
- The step list follows the current read, with a small "Read: Switch" divider where the branch starts.
- In the counters list, entries with a `read` get a "Watch" button: it selects that read, seeks to the start of the last shared step and plays.

**URL.** `?read=<id>` selects a read on load (unknown ids fall back to base) and is kept in sync with `history.replaceState`; it is removed for the base read. The test hook `window.__playbook` gains `selectRead(id)`.

## Library navigation — `js/library.js`

**Structure.** `js/plays/index.js` exports:

```js
export const SECTIONS = [
  { id: 'offense', cats: ['onball', 'offball', 'motion'] },
  { id: 'situations', cats: [] },   // filled in sub-project 3
  { id: 'defense', cats: [] },      // filled in sub-project 4
];
```

Sections and categories with no plays are hidden. Display names come from `i18n.js` (`section.*`, `cat.*`).

**List.**
- Collapsible section headers with a play count, category titles inside, then play items.
- Each play item shows the name, difficulty dots and a "Reads N" badge when the play has reads.

**Search.**
- A search field at the top filters as you type.
- Matching is case-insensitive and ignores spaces and hyphens. It checks the Korean name, English name and `aliases` regardless of the UI language.
- While a query is active, all sections are expanded, empty groups are hidden, and a "No plays found" line appears when nothing matches.
- `/` focuses the search field on desktop.

**Difficulty filter.** All / Basic / Intermediate / Advanced chips, combined with search.

**Persistence.** Collapsed sections are saved in the existing prefs object (localStorage, wrapped in try/catch). The search text and filter are not saved.

**Mobile (≤1100 px).**
- The horizontal play strip is removed. Its place shows a button with the current play's name and ▾.
- The button opens a bottom-sheet `<dialog>` containing the same library component. Picking a play closes the sheet.
- The library is rendered by one function into whichever container is active, re-mounted when the media query changes.

`main.js` keeps scene, playback and info panel; list rendering moves out of it.

## Content: reads for the current plays

Base read in the first column. Choreography is tuned during implementation; every read gets a one-line `why` and full KO/EN captions.

| Play | Base | Added reads |
|---|---|---|
| Pick and Roll | Drop → roll dunk | Hedge (retreat dribble, 4-on-3), Switch (post seal), Blitz (pocket pass → corner 3), Under (pull-up 3) |
| Pick and Pop | Drop → pop 3 | Switch (big isolation drive), Up to touch (dive instead of pop), Rotation (extra pass) |
| Spain Pick and Roll | Kick-out 3 | Stay home on shooter (roll dunk), Avoid the back screen (pull-up), All switch (seal) |
| Horns | High-low | Switch (mismatch post), Elbow deny (backdoor), Push to one side (reject the screen) |
| Floppy | Catch and shoot | Trail (curl), Top lock (backdoor), Switch (screener slip) |
| Elevator Doors | Top 3 | Go around the doors (back cut), Switch (slip), Help and recover (attack the closeout) |
| Iverson Cut | Drive and pull-up | Under (catch and shoot), Switch (dive), Bump (counter cut) |
| Chicago | Shoot or roll | Trail (turn the corner), Handoff switch (roll vs. guard), Handoff deny (backdoor) |
| Hammer | Corner 3 | No help (layup), Rotation switch (dunker spot), Baseline deny (middle → kick-out) |
| Split Action | Kick-out 3 | Switch (slip), Stay with screener (curl layup), No post help (post 1-on-1) |

Existing counters that match a read get its `read` id. Counters with no animation stay as text.

New UI strings in both languages:
- read prompt title, Continue, the read tab group label, the "why" label and the step-list divider;
- Watch, search placeholder, No plays found;
- difficulty filter labels;
- section names and "Reads N";
- the mobile library button label.

## Testing

`package.json` (dev dependency `three@0.160.0`, script `npm test`), `node_modules/` in `.gitignore`, and `tests/plays.test.mjs` on `node:test`. Nothing here is served or needed by the site.

For every play and every read:

- Compiles without throwing, and samples every 1/120 s have no NaN for offense, defense and ball.
- Offense speed ≤ 25 ft/s; defense speed ≤ 38 ft/s (closeouts plus collision pushes).
- Shared part identical to the base read up to the branch time (offense, defense and ball positions within 1e-6).
- 3-point shots are taken from 22 ft or more, 2-point shots from inside 23.75 ft.
- KO/EN parity: step counts, read labels, `why` and prompts present in both languages.
- Read ids unique and URL-safe; every `counters[].read` refers to an existing read; play ids unique; every play's `category` belongs to a section.

Library search and filtering are a pure function in `library.js` (`filterPlays(plays, query, level)`) and are tested the same way.

In the browser:
- Check every play and read for console errors.
- Exercise the prompt in all three reading modes, tab switching, `?read=` links and the mobile sheet at 360 px.
- Take screenshots on desktop and mobile in both themes.

## Delivery

- **Public repo:** work on a branch, update `README.md` (play format with `reads`, `npm test`) and `docs/design.md` (new modules), then merge to `main` for GitHub Pages.
- **Private app repo:** bump the `web` submodule, run `npm run apk` (the store build check must pass), and check the APK.

## Acceptance criteria

1. All 10 plays have the reads in the table above, animated, in Korean and English.
2. The branch prompt behaves as specified in Step, Auto and Off modes; tab switching is seamless before the branch and jumps to it after; `?read=` links work.
3. Search finds plays by Korean name, English name or alias in either UI language; the difficulty filter and collapsed sections work; the mobile sheet works at 360 px.
4. `npm test` passes; no console errors on any play or read; the store build and APK build succeed.
