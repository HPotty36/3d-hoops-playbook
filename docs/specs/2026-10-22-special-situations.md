# Special situations — design spec

Sub-project 3 of 4 in the "go deeper" roadmap (1 reads + library ✔, 2 advanced offensive sets ✔, 3 special situations, 4 defensive schemes). Builds on `docs/specs/2026-10-13-reads-and-library.md` and `docs/specs/2026-10-14-advanced-sets.md`: the play format, `reads`, the library, the engine and `npm test` are reused unchanged unless this spec says otherwise.

## Goal

Fill the "Special situations" section with 12 plays that start from an inbound or depend on the clock and the score: baseline out of bounds (BLOB), sideline out of bounds (SLOB), end of game, and after-timeout (ATO) sets. Each play has defensive reads like every other play. Plays that depend on time show a broadcast-style score bug whose clock runs with the play. Ship in three groups, each released to the web and the app as soon as it is done. The first release also carries 15 of the minor items deferred in sub-project 2.

Success looks like:

- 12 new plays (36 in total), each with a base read and 2 added reads (24 new reads), in Korean and English, passing `npm test`.
- The library shows the Special situations section with four categories.
- Situation plays show the score bug; its clock, shot clock and score are pure functions of `t`, so scrubbing and step jumps always agree with playback.
- Inbounds, buzzers and shot clocks follow the real rules, checked for every play and read.
- After each group: the site is updated, the app repo points at it, and a new APK is built with the next app version.

## Out of scope

- Full-court rendering and full-court inbounds (for example a length-of-court pass from the backcourt baseline).
- Zone defenses and reads against them (sub-project 4 builds the zone engine).
- Engine changes beyond the clock module and the checks below. Passes that travel through a defender's body stay a deferred engine item.
- An on-device Gboard search check (needs a device).

## Library structure

`SECTIONS` in `js/plays/index.js` fills the situations section:

```js
{ id: 'situations', cats: ['blob', 'slob', 'late', 'ato'] }
```

New labels in `js/i18n.js`:
- `cat.blob`: 베이스라인 인바운드 / Baseline out of bounds
- `cat.slob`: 사이드라인 인바운드 / Sideline out of bounds
- `cat.late`: 막판 작전 / End of game
- `cat.ato`: 타임아웃 후 작전 / After timeout

The section label `section.situations` (특수 상황 / Special situations) already exists. The section appears as soon as the first situation play exists.

## Situation data

Every play in a situations category has a numeric `situation` block. It has no text, so it needs no translation; goals such as "must score a three" stay in the summary and the "when" text.

```js
situation: { period: 4, clock: 7.5, shotClock: null, score: [98, 98] }
// period 1–4 (5+ = overtime), clock: game-clock seconds at the start,
// shotClock: seconds or null (hidden), score: [offense, defense]
```

## Clock rules

`js/clock.js` is a DOM-free module so Node tests can use it.

- `clockAt(play, cp, t)` returns `{ game, shot, score }`.
- `formatClock(seconds)` returns `m:ss` from 60 seconds up and `s.t` (tenths, truncated) below 60, as broadcasts do.

The rules:
- **When the game clock starts:** if the play starts with the ball held by a player out of bounds, at the first catch on the court (the end of the first ball flight). Otherwise at `t = 0`.
- **When it stops:** when the last shot reaches the rim. It never goes below 0.0.
- **Score:** the offense's points go up at each made shot's scoring time (`cp.scores`).
- **Shot clock:** runs from the same start and stops at the same moment. It is hidden when `shotClock` is null, or when it is larger than the game clock at the start, as in real games.
- **Reading pauses:** they freeze the timeline, so they freeze the clock too.

## Score bug

- **Placement:** in the court panel's header row (`header.toolbar .play-head`), next to the play title. It is not drawn over the 3D court, keeping the rule that nothing covers the court. On phones it wraps under the title.
- **Visibility:** shown only for plays that have a `situation`.
- **Look:** one pill like a broadcast score bug: `4Q · 7.5 · [orange] 98 – 98 [blue]`. The orange and blue chips match the jersey colors (offense first). The shot clock, when shown, sits at the right end in a smaller size. Overtime shows `OT` / `연장`.
- **Last seconds:** under 5.0 s the clock digits switch to the accent color. At the buzzer the clock stays at `0.0`.

## Inbounds

- **The inbounder:** starts out of bounds holding the ball. The first ball event is the inbound pass, and the inbounder steps onto the court within 1 s of releasing it. The engine's positions are unchanged; automatic defense already puts the inbounder's defender between the inbounder and the rim.
- **BLOB:** inbound from behind the end line, z ≈ −1.5, beside the rim (|x| ≈ 4–10).
- **SLOB:** always from outside the **left** sideline, x ≈ −26.5, at z ≈ 18 (around the free-throw line extended).
  - Measured at 1440×900, 1280×720 and phone sizes, the right sideline is cut off in the broadcast camera, which sits on that side.
  - The left sideline is fully visible up to z ≈ 18 in every camera and size.
- **Camera frame check:** extended to allow z ≥ −2.5 behind the end line and x ≥ −26.6 beyond the left sideline when z ≤ 20. The right sideline stays forbidden.

## Content

Every play follows the existing format:
- Korean fields at the top level, English in `en`.
- `summary`, `when`, `keys`, `counters`, `aliases`, `steps`, `reads`, `en.reads`, plus `situation` for this section.
- Counters that match a read carry its `read` id.
- Captions use `[n]` / `[xn]` chips and **bold** terms, and avoid gendered pronouns.
- Real names only in `famous`. None of these plays needs one.

| # | Group | id | Name (ko / en) | Category | Diff. | Situation | Base read (id: label → answer) | Added reads (id: label → answer) |
|---|---|---|---|---|:-:|---|---|---|
| 1 | 1 | `box` | 박스 / Box | blob | 2 | Q2 6:41, shot clock 14 | `caught`: 스크린에 걸림 / Caught on the screen → back-screened [5] lays it in | `switch`: 스위치 → the screener slips; `sag`: 페인트 몰림 / Packed paint → corner three |
| 2 | 1 | `stack` | 스택 / Stack | blob | 1 | Q1 3:12, shot clock 14 | `stay-home`: 그대로 / Stay home → the big rolling to the rim | `switch`: 스위치 → post-up mismatch; `sag`: 페인트 몰림 / Packed paint → corner three |
| 3 | 1 | `inbounder-stagger` | 인바운더 스태거 / Inbounder Stagger | blob | 2 | Q3 4:05, shot clock 14 | `trail`: 트레일 / Trail → the inbounder's three off the stagger | `switch`: 스위치 → the screener slips; `top-lock`: 탑 락킹 / Top lock → backdoor |
| 4 | 1 | `back-screen-lob` | 백스크린 롭 / Back-Screen Lob | blob | 3 | Q4 1:48, shot clock 14 | `deny`: 디나이 / Deny → lob at the rim | `switch`: 스위치 → pass to the screener; `help`: 도움 수비 / Help → corner three |
| 5 | 2 | `sideline-stagger` | 사이드라인 스태거 / Sideline Stagger | slob | 2 | Q2 2:30, shot clock 14 | `trail`: 트레일 / Trail → catch-and-shoot three at the top | `top-lock`: 탑 락킹 / Top lock → backdoor; `switch`: 스위치 → the screener slips |
| 6 | 2 | `sideline-lob` | 사이드라인 롭 / Sideline Lob | slob | 2 | Q3 0:52, shot clock 14 | `caught`: 스크린에 걸림 / Caught on the screen → lob at the rim | `switch`: 스위치 → the screener pops; `help`: 도움 수비 / Help → the shooter |
| 7 | 2 | `beat-the-deny` | 디나이 깨기 / Beat the Deny | slob | 1 | Q1 5:20, shot clock 14 | `normal`: 기본 수비 / Normal → catch and go straight into the pick and roll | `deny`: 디나이 / Deny → inbound to the big, then a handoff; `switch`: 스위치 → the big slips |
| 8 | 2 | `ram` | 램 / Ram | ato | 3 | Q3 2:14, shot clock 24 | `drop`: 드롭 / Drop → pocket pass to the roller | `switch`: 스위치 → the ram screener slips; `hedge`: 헤지 / Hedge → the ram screener's three |
| 9 | 2 | `decoy-counter` | 미끼 & 역습 / Decoy and Counter | ato | 3 | Q4 4:31, shot clock 24 | `overplay`: 오버플레이 / Overplay → the shooter's backdoor layup | `normal`: 기본 수비 / Normal → the shot as drawn; `switch`: 스위치 → the screener slips |
| 10 | 3 | `last-shot` | 마지막 슛 / Last Shot | late | 2 | Q4 7.5, tied, half-court possession | `drop`: 드롭 / Drop → pull-up jumper at the buzzer | `blitz`: 블리츠 / Blitz → kick-out, 4-on-3, shot at the buzzer; `switch`: 스위치 → attack the mismatch |
| 11 | 3 | `down-three` | 동점 3점 / Down Three | late | 2 | Q4 8.0, down 3, SLOB | `trail`: 트레일 / Trail → the tying three | `switch`: 스위치 → the screener pops for three; `top-lock`: 탑 락킹 / Top lock → opposite-corner three |
| 12 | 3 | `under-a-second` | 1초 미만 / Under a Second | late | 3 | Q4 0.9, down 1, SLOB | `deny`: 디나이 / Deny → lob caught and finished at the rim | `switch`: 스위치 → curl catch-and-shoot; `overplay`: 오버플레이 / Overplay → opposite corner |

Notes:
- **Ram:** a perimeter player screens for the big first (the ram screen), then the big sets the ball screen.
- **Decoy and Counter:** the first action is the one the defense has scouted. The read is how the defense overplays it.
- **Last Shot:** times the pick and roll so the shot leaves with about one second left.

## Releases

Groups ship in order 1 → 3, each on its own branch (`situations-<n>`) cut from the latest `main`. Group 1 also adds the situation data, `js/clock.js`, the score bug, the inbound checks and the new categories.

Before a group merges:
1. **Tests:** `npm test` passes.
2. **Numeric checks:** before screenshots, every captioned claim is checked by trace: who screens whom and from which side, defenders near their men where the caption puts them, open shots open, layups inside 7 ft.
3. **Screenshots:** top-camera stills of every new read's key moments, reviewed.
4. **Browser run:** every play × read played end to end with no errors.
5. **Score bug:** checked on desktop and at 360 px.
6. **Review:** a fresh reviewer reads the group's diff. Critical and Important findings are fixed before merging.

Then:
1. **Web:** merge into `main` and push (GitHub Pages updates).
2. **App:**
   - Move the `web` submodule to that commit.
   - Bump `versionCode` / `versionName`: group 1 → 6 / 1.5, group 2 → 7 / 1.6, group 3 → 8 / 1.7.
   - Run `npm run apk`.
   - Scan the APK for the league name, `famous` fields, real names and external URLs, and run the offline smoke test.
   - Commit and push.

The README play tables, counts and the design notes are updated in each group's release. The store listing drafts (`docs/play-store.md`, app repo) are updated in group 3 to describe the special situations and the 36 plays.

## Deferred items carried into release 1.5

Sub-project 2 deferred 19 minor items. One was listed twice, and three need engine or device work (they are in "Out of scope"), which leaves these 15.

1. **Order-independence test:** cover every play and read, on the 1/60 s grid and at off-grid times (today it covers 3 cases).
2. **Side Pick and Roll captions:** the drop read's "snake" dribble curls back toward the screen side, and the blitz pass leaves before the trap closes, as the captions say.
3. **Step mode:** opening the branch prompt does not take focus from a text field the user is typing in.
4. **Branch prompt announcement:** `#branch-prompt` is un-hidden before its content is filled, so screen readers announce it.
5. **Pistol switch:** the post-up is released about 10–11 ft from the rim.
6. **Coach-frame check:** also covers `t = 0`.
7. **`docs/design.md`:** the early-offense start is described as it is (about 6–9 ft past the arc).
8. **Trailer Pop:** gets the Korean alias 드래그 앤 팝, so 드래그 finds it as `drag` does.
9. **Alias test:** always collects all-caps words (`\b[A-Z]{2,}\b`) from `famous`, including at the start of a sentence.
10. **Shuffle Cut `famous`:** says the offense was made famous at the Air Force Academy, not built there.
11. **English wording:** "seals the smaller [x1] behind" replaces "pins the smaller [x1] on the back" (UCLA Cut switch, Trailer Pop switch).
12. **Screens drawn in option reads:** the screen a read's prompt asks about is drawn in every read where it is used (Flex help and switch, Princeton Chin help and chase-over, Delay under).
13. **Princeton Chin chase over:** [x3] no longer lurches into the lane and back during the cross-court pass.
14. **`docs/design.md`:** the defense cost is stated per call (three calls per frame).
15. **Wording:** Princeton Chin's first step says [5] moves across to the left elbow (it moves sideways, not down); Flex English says [5] "holds the block" without also "blocks the path"; the Princeton Chin English `famous` matches the Korean ("made it famous in the pro game").

## Testing additions

- **Situation data:** every situations-category play has a valid `situation` (period 1–4 or 5+, clock > 0, two scores, shot clock null or > 0).
- **`js/clock.js` unit tests:** clock start (first inbound catch or `t = 0`), stop at the rim, floor at 0.0, score at scoring times, shot clock hidden when larger than the game clock, `formatClock` formats.
- **Inbounds:** the inbound pass is released within 5 s.
- **Out of bounds:** only the inbounder is ever out of bounds, and only until 1 s after the inbound release. Defenders never leave the court. The right sideline is never used.
- **Buzzer:** in end-of-game plays the last shot is released before the game clock reaches 0. With less than 0.3 s on the clock at the catch, only a finish at the rim (layup or dunk) is allowed.
- **Shot clock:** where a shot clock is shown, the shot is released before it runs out.
- **Camera frame:** the extended bounds above, checked from `t = 0`.
- **Category labels:** the existing label test covers the four new categories.

## Acceptance criteria

1. All 12 plays and their 24 added reads exist in Korean and English, as in the content table, and pass `npm test`.
2. Special situations appears in the library with its four categories. Search finds every new play by Korean name, English name and alias.
3. The score bug shows the right period, clock, shot clock and score at every `t`, in both languages, on desktop and phone, and never covers the court.
4. The inbound, buzzer, shot-clock and out-of-bounds rules hold for every play and read.
5. Each group was released as described: site updated, app repo moved to the merge commit, APK built with the group's version and the scan clean.
6. The 15 deferred items behave as described, each covered by a test where the behavior is testable in Node, and checked in the browser otherwise.
