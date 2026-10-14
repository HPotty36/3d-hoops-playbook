# Advanced sets — design spec

Sub-project 2 of 4 in the "go deeper" roadmap (1 reads + library ✔, 2 advanced offensive sets, 3 special situations, 4 defensive schemes). Builds on `docs/specs/2026-10-13-reads-and-library.md`: the play format, `reads`, the library, the engine and `npm test` are reused unchanged unless this spec says otherwise.

## Goal

Add 14 advanced offensive plays, each with defensive reads, so the library covers modern pick-and-roll variations, early offense, advanced off-ball actions and whole system offenses. Ship them in four groups, each released to the web and the app as soon as it is done. The first release also fixes the nine minor issues left from sub-project 1.

Success looks like:

- 14 new plays (24 in total), each with a base read and 2–3 added reads (31 new reads), in Korean and English, passing `npm test`.
- The library shows two new offense categories, Early offense and System offenses.
- After each group: the site is updated, the app repo points at it, and a new APK is built with the next app version.
- The nine minor issues listed below are fixed in the first release, each with a test where one is possible.

## Out of scope

- Engine changes beyond the minor fixes below.
- Repeating a system offense's continuity for more than one cycle.
- Special situations, defensive schemes and full-court action (sub-projects 3–4 and later).

## Library structure

`SECTIONS` in `js/plays/index.js` becomes:

```js
{ id: 'offense', cats: ['onball', 'offball', 'motion', 'early', 'system'] }
```

New labels in `js/i18n.js`:
- `cat.early`: 얼리 오펜스 / Early offense
- `cat.system`: 시스템 오펜스 / System offenses

The categories appear in the list only once a play uses them, as the library already hides empty categories.

## Content

Every play follows the existing format:
- Korean fields at the top level, English in `en`.
- `summary`, `when`, `keys`, `counters`, `famous` (web only; the store build strips it), `aliases`, `steps`, `reads`, `en.reads`.
- Counters that match a read carry its `read` id. Read ids are URL-safe.
- Captions use `[n]` / `[xn]` chips and **bold** terms like the existing plays, and avoid gendered pronouns for players.
- Where coaching sources describe an action differently (Princeton, triangle), the caption describes the version shown on screen.

| # | Group | id | Name (ko / en) | Category | Diff. | Base read (id: label → answer) | Added reads (id: label → answer) |
|---|---|---|---|---|:-:|---|---|
| 1 | 1 | `side-pick-and-roll` | 사이드 픽앤롤 / Side Pick and Roll | onball | 2 | `ice`: 아이스 / ICE → screener pops to the elbow, 4-on-3 | `drop`: 드롭 → snake dribble & floater; `blitz`: 블리츠 → short roll → weak-side corner 3; `switch`: 스위치 → post seal |
| 2 | 1 | `ghost-screen` | 고스트 스크린 / Ghost Screen | onball | 2 | `pre-switch`: 미리 스위치 / Pre-switch → ghost pop for 3 | `show`: 쇼 → ghost slips to the rim; `stay-home`: 그대로 / Stay home → handler drives |
| 3 | 1 | `weave` | 위브 / Weave | onball | 2 | `trail`: 따라가기 / Trail → drive off the last handoff | `switch`: 스위치 → the handoff man slips; `under`: 언더 → three off the handoff; `handoff-deny`: 핸드오프 차단 → backdoor |
| 4 | 2 | `double-drag` | 더블 드래그 / Double Drag | early | 2 | `drop`: 드롭 → second screener rolls for a dunk | `switch`: 스위치 → first screener pops for 3; `show`: 쇼 → second screener slips |
| 5 | 2 | `pistol` | 피스톨 (21) / Pistol (21) | early | 2 | `drop`: 드롭 → turn the corner off the handoff | `show`: 쇼 → the handoff man rolls; `deny`: 핸드오프 차단 → backdoor; `switch`: 스위치 → attack the mismatch |
| 6 | 2 | `trailer-pop` | 트레일러 팝 / Trailer Pop | early | 1 | `drop`: 드롭 → trailing big pops for 3 | `up-to-touch`: 업 투 터치 → handler drives; `switch`: 스위치 → trailer posts up |
| 7 | 3 | `flare-screen` | 플레어 스크린 / Flare Screen | offball | 2 | `trail`: 따라가기 / Trail → skip pass, three | `switch`: 스위치 → screener slips; `shortcut`: 지름길 / Shortcut → shooter curls to the rim |
| 8 | 3 | `zipper` | 지퍼 / Zipper | offball | 1 | `trail`: 따라가기 / Trail → catch at the top & shoot | `top-lock`: 탑 락킹 → backdoor; `switch`: 스위치 → screener slips |
| 9 | 3 | `ucla-cut` | UCLA 컷 / UCLA Cut | offball | 2 | `caught`: 스크린에 걸림 / Caught on the screen → layup | `help`: 도움 수비 → screener pops for a top 3; `switch`: 스위치 → screener post seal |
| 10 | 3 | `shuffle-cut` | 셔플 컷 / Shuffle Cut | offball | 2 | `caught`: 스크린에 걸림 / Caught on the screen → layup | `switch`: 스위치 → screen the screener → jumper; `help`: 도움 수비 → weak-side kick-out |
| 11 | 4 | `flex` | 플렉스 / Flex | system | 3 | `caught`: 스크린에 걸림 / Caught on the flex screen → layup | `help`: 도움 수비 → screener comes off the down screen for an elbow jumper; `switch`: 스위치 → post mismatch |
| 12 | 4 | `princeton-chin` | 프린스턴 친 / Princeton Chin | system | 3 | `caught`: 스크린에 걸림 / Caught on the back screen → chin cut layup | `help`: 도움 수비 → flare screen → top 3; `chase-over`: 위로 쫓기 / Chase over → attack the closeout |
| 13 | 4 | `delay` | 딜레이 / Delay | system | 3 | `trail`: 따라가기 / Trail → turn the corner off the handoff | `deny`: 윙 디나이 / Wing deny → backdoor; `under`: 언더 → three off the handoff |
| 14 | 4 | `sideline-triangle` | 사이드라인 트라이앵글 / Sideline Triangle | system | 3 | `behind`: 뒤에서 수비 / Play behind → post entry, split cuts | `post-deny`: 포스트 디나이 → pinch post; `overplay`: 전원 오버플레이 / Full overplay → blind pig backdoor |

## Releases

Groups ship in order 1 → 4, each on its own branch (`advanced-sets-<n>`) cut from the latest `main`.

Before a group merges:
1. **Tests:** `npm test` passes.
2. **Screenshots:** top-camera screenshots of every new read's key moments, reviewed.
3. **Browser run:** every play × read of the group played end to end in the browser with no errors. When a group adds a category, the library is also checked at 360 px.
4. **Review:** a fresh reviewer reads the group's diff. Critical and Important findings are fixed before merging.

Then:
1. **Web:** merge into `main` and push (GitHub Pages updates).
2. **App:**
   - In the private app repo, move the `web` submodule to that commit.
   - Bump `versionCode` / `versionName` in `android/app/build.gradle`: group 1 → 2 / 1.1, group 2 → 3 / 1.2, group 3 → 4 / 1.3, group 4 → 5 / 1.4.
   - Run `npm run apk`.
   - Scan the APK for the league name, `famous` fields and external URLs.
   - Commit and push.

The README play tables, counts and the design notes are updated in each group's release.

## Minor fixes (first release)

1. **No one-frame defender twitch.**
   - `resolve` sums displacements instead of overwriting them. For each defender pair, `(midpoint ± R/2·dir) − raw` is added to each defender. For each attacker, `(circle point − raw)` is added. Each term is zero at its window's edges, so the total is continuous.
   - Test: peak defense speed sampled at 1/960 s stays ≤ 38 ft/s for every play and read. If that run exceeds 30 s, the fine check covers the reads that have defender clusters, and the 1/120 s check still covers everything.
2. **Collision search cost and its end-of-play edge.**
   - Collision windows (entry and exit times) are cached per compiled play, keyed by the pair and the window's grid cell. This is safe because positions are pure functions of `t`.
   - The forward scan also checks `end` itself, so an exit between the last 1/60 s check and `end` is found.
   - Target: worst-case `defense(t)` cost at or below 0.15 ms in Node on the heaviest current read.
3. **`nextStep` to the end closes an open prompt.**
4. **No "No plays found" flash during Korean input.** The search does not re-render while `isComposing`, and renders on `compositionend`.
5. **Section headers during a search.** Clicks on section headers are ignored while a query is active.
6. **Keyboard focus is kept** after choosing a read tab or a Watch button: the same control has focus after the re-render.
7. **The branch prompt is announced.**
   - The prompt container gets `aria-live="polite"`.
   - In step mode, focus moves to the current read's button when the prompt opens, and returns to the play button when it closes.
8. **Pick and Pop label matches its caption.** The base read label becomes 헤지 / Hedge, matching the base caption.
9. **README numbers.** Read counts are computed from the data (base plus added reads), and the reads-per-play range is stated as it actually is. The stated Node version is 21+ (the test command uses a glob argument).

## Testing additions

- Every category in `SECTIONS` and every section has a non-empty `cat.*` / `section.*` label in both languages. `i18n.js` is importable in Node.
- The fine-sampling no-snap check from minor fix 1.
- A dev script, not part of `npm test`, prints the worst `defense(t)` cost per read, to confirm minor fix 2.

## Acceptance criteria

1. All 14 plays and their 31 added reads exist in Korean and English, as in the content table, and pass `npm test`.
2. Early offense and System offenses appear in the library with their plays. Search finds every new play by Korean name, English name and alias.
3. Each group was released as described: site updated, app repo moved to the merge commit, APK built with the group's version and the scan clean.
4. The nine minor fixes behave as described, each covered by a test where the behavior is testable in Node, and checked in the browser otherwise.
