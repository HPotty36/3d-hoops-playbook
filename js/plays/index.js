// 작전 목록. 새 작전을 추가하려면 같은 형식의 파일을 만들고 여기에 등록하세요.
import pickAndRoll from './pick-and-roll.js';
import pickAndPop from './pick-and-pop.js';
import spainPickAndRoll from './spain-pick-and-roll.js';
import horns from './horns.js';
import sidePickAndRoll from './side-pick-and-roll.js';
import ghostScreen from './ghost-screen.js';
import weave from './weave.js';
import floppy from './floppy.js';
import elevatorDoors from './elevator-doors.js';
import iversonCut from './iverson-cut.js';
import chicago from './chicago.js';
import flareScreen from './flare-screen.js';
import zipper from './zipper.js';
import uclaCut from './ucla-cut.js';
import shuffleCut from './shuffle-cut.js';
import hammer from './hammer.js';
import splitAction from './split-action.js';
import doubleDrag from './double-drag.js';
import pistol from './pistol.js';
import trailerPop from './trailer-pop.js';
import flex from './flex.js';
import princetonChin from './princeton-chin.js';
import delay from './delay.js';
import sidelineTriangle from './sideline-triangle.js';

// 작전 목록의 큰 갈래. 표시 이름은 i18n.js의 section.* / cat.* 키. 작전이 없는 갈래는 목록에서 숨긴다.
export const SECTIONS = [
  { id: 'offense', cats: ['onball', 'offball', 'motion', 'early', 'system'] },
  { id: 'situations', cats: [] },   // 특수 상황 (인바운드, ATO, 막판 작전)
  { id: 'defense', cats: [] },      // 수비 전술 (존, 매치업 존)
];
export const CATEGORIES = SECTIONS.flatMap((s) => s.cats);

export const PLAYS = [
  pickAndRoll,
  pickAndPop,
  spainPickAndRoll,
  horns,
  sidePickAndRoll,
  ghostScreen,
  weave,
  floppy,
  elevatorDoors,
  iversonCut,
  chicago,
  flareScreen,
  zipper,
  uclaCut,
  shuffleCut,
  hammer,
  splitAction,
  doubleDrag,
  pistol,
  trailerPop,
  flex,
  princetonChin,
  delay,
  sidelineTriangle,
];
