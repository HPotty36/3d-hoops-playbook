// 수비 대응별 분기(읽기). 작전의 reads 블록을 읽어, 선택한 읽기의 단계를 붙인 일반 작전 객체를 만든다.
// 결과는 engine.js의 compilePlay와 i18n.js의 localize에 그대로 넣을 수 있다. DOM과 i18n에 의존하지 않는다.
//
// reads: {
//   at: 2,                          // 공유하는 단계 수: steps[0 .. at-1]은 모든 읽기에서 같다
//   prompt: '…',                    // 분기점에서 묻는 질문
//   base: { id, label, why },       // 기존 steps.slice(at)이 곧 기본 읽기
//   options: [{ id, label, why, steps: [...] }],   // steps는 분기점 이후 단계 전체
// }
// en.reads: { prompt, base: { label, why }, options: [{ label, why, steps: [{ title, text }] }] }  (순서로 짝지음)

export function readIds(play) {
  const r = play.reads;
  if (!r) return [];
  return [r.base.id, ...r.options.map((o) => o.id)];
}

export function variant(play, readId) {
  const r = play.reads;
  const i = r ? r.options.findIndex((o) => o.id === readId) : -1;
  if (i < 0) return play;
  const opt = r.options[i];
  const enOpt = play.en?.reads?.options?.[i];
  return {
    ...play,
    steps: [...play.steps.slice(0, r.at), ...opt.steps],
    en: { ...play.en, steps: [...(play.en?.steps ?? []).slice(0, r.at), ...(enOpt?.steps ?? [])] },
  };
}

export function branchTime(play) {
  const r = play.reads;
  if (!r) return 0;
  return play.steps.slice(0, r.at).reduce((s, st) => s + st.dur, 0);
}

export function readMeta(play, lang) {
  const r = play.reads;
  if (!r) return null;
  const e = lang === 'en' ? play.en?.reads : null;
  const pick = (ko, en) => ({ label: en?.label ?? ko.label, why: en?.why ?? ko.why });
  return {
    at: r.at,
    prompt: e?.prompt ?? r.prompt,
    reads: [
      { id: r.base.id, ...pick(r.base, e?.base) },
      ...r.options.map((o, i) => ({ id: o.id, ...pick(o, e?.options?.[i]) })),
    ],
  };
}
