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

## Verification

- Every play was sampled at 0.05 s intervals to check for NaN values, peak player speed (kept at or under a sprint of roughly 25 ft/s), and that shot distance matches the points scored (2 vs 3).
- Desktop (1440×900) and mobile (375×812) layouts were checked to show the whole half court without horizontal scrolling.
