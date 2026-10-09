// 작전 목록. 새 작전을 추가하려면 같은 형식의 파일을 만들고 여기에 등록하세요.
import pickAndRoll from './pick-and-roll.js';
import pickAndPop from './pick-and-pop.js';
import spainPickAndRoll from './spain-pick-and-roll.js';
import horns from './horns.js';
import floppy from './floppy.js';
import elevatorDoors from './elevator-doors.js';
import iversonCut from './iverson-cut.js';
import chicago from './chicago.js';
import hammer from './hammer.js';
import splitAction from './split-action.js';

export const CATEGORIES = ['온볼 스크린', '오프볼 스크린', '모션 & 드라이브'];

export const PLAYS = [
  pickAndRoll,
  pickAndPop,
  spainPickAndRoll,
  horns,
  floppy,
  elevatorDoors,
  iversonCut,
  chicago,
  hammer,
  splitAction,
];
