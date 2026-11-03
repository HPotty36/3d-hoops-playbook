# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Primary: fans who want to understand the game.** They watch basketball, see the offense run something, and want to know what it was and why it worked. No coaching background is assumed. When a feature or a word has to choose a depth, it is pitched at this person.
- Also served, but not the yardstick: students and club players learning their role and timing, and coaches showing a play or a defensive read to a team.
- Phones and desktops/tablets matter about equally. On a phone, sessions are short, sometimes next to a game. On a desktop or tablet, someone sits down with one play and its reads.

## Product Purpose

Make pro-basketball plays understandable. Each play is replayed on a 3D half court at game speed, one step at a time, and every step says what happens and why. Each play is also shown branching for every common way the defense guards it.

Success, as the owner defines it, is all of these:
- viewers actually understand the plays and the reads;
- people install it and keep using it (the Play Store app and the installable web app);
- it stands as a portfolio piece;
- the library keeps growing (zone and combination defenses are being added now).

## Positioning

It is not a diagram sheet or a video clip. It is a 3D replay you can control, and it branches by defensive read: 122 reads across 36 plays. Coach-board notation is drawn on the floor, and a plain-language caption runs with every step. Plays are data (one file per play), so the library grows without new interface.

## Operating Context

- **Web:**
  - static site on GitHub Pages, opened in a browser with no install or build step;
  - installable as an app (PWA) that works offline after one visit.
- **Android:**
  - a Capacitor app built from the same web files, kept in a separate private repository;
  - the store build removes the web-only install pieces and the "famous usage" field.
- **Language and theme:** Korean and English carry equal weight (KO/EN switch, `?lang=`); light and dark themes.
- **Deep links:** the URL can open a specific play, read, moment and camera (`#play`, `?read=`, `?t=`, `?cam=`), so a moment can be shared.
- **Input:** keyboard shortcuts on desktop, touch on phones.

## Capabilities and Constraints

- **Play library:** 36 plays.
  - 24 offensive sets.
  - 12 special situations: baseline and sideline inbounds, after timeouts, and the end of the game. These show a broadcast-style score bug, and their clocks follow the real rules.
  - The library can be searched by Korean or English name and common aliases, and filtered by difficulty.
- **Viewing:**
  - five camera views plus free orbit;
  - a reading mode that pauses so the caption can be read;
  - at a branch point the read is either chosen automatically or picked by the viewer, step by step.
- **Defense:** automatic man-to-man, and a zone mode driven by per-zone tables (the 2-3 and 3-2 zones so far). Every play keeps the pro defensive three-second rule and never passes through a defender's body.
- **Unofficial and educational:**
  - no league, team, player or school names anywhere except the "famous usage" field, and the store build strips that field;
  - aliases stay generic;
  - the store listing names none of them.
- **Business model:** no ads, no in-app purchases, no accounts, and no personal data collected.
- **Open decision:** whether the three play names that carry a person's or school's name (README rows 7, 19 and 22) stay as they are in the store build.

## Brand Commitments

- **Name and logo:** the name is "3D Hoops Playbook". The logo (`assets/logo-mark.svg`) is two screens and a cutter's arrow forming an "H" on an orange tile.
- **Voice:** plain and explanatory, as a coach would talk to a fan. Each step names what happens and why. Korean copy uses the basketball terms players actually say (드롭, 스위치, 블리츠).
- **Disclaimer:** the product is an unofficial educational project, not affiliated with any professional league, team or player.
- **Visual system:** recorded in `docs/design.md` under "Visual design". That section is the authority on visual choices and is not repeated here.

## Evidence on Hand

- **On hand:**
  - the plays and reads themselves (`js/plays/`);
  - the preview image `docs/preview.jpg`;
  - the store listing draft in the app repository (`docs/play-store.md`);
  - the open-source licenses page in the store build.
- **Not on hand:** user counts, ratings, reviews, testimonials or press. Do not invent any of them.

## Product Principles

1. **The court is the lesson.** The 3D replay leads and stays unobstructed; text explains what is on the court.
2. **Explain it for a fan.** Each step should be followable without prior coaching knowledge. Depth (reads, counters, key points) is there to open, not required to follow.
3. **A play includes its answers.** A play is complete only when its common defensive reads can be watched.
4. **Plays are data.** New plays, reads and schemes arrive as content, not as new interface.
5. **Free, private, anywhere.** It works on a phone or a desktop, online or offline, with no account and no tracking.

## Accessibility & Inclusion

No formal standard has been set. Current practice to keep:
- every control is reachable by keyboard, and shortcuts are listed in a popover;
- captions and the branch prompt are announced to screen readers;
- interface transitions switch off when the system asks for reduced motion;
- Korean text wraps by word (`keep-all`).
