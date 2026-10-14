// 전역 단축키가 포커스된 요소의 기본 동작을 가로채지 않게 한다.
// 입력칸에서는 모든 키를, 버튼과 링크에서는 Space와 Enter(누르기)를 그 요소에 맡긴다.
export function keyBelongsToTarget(target, key) {
  if (target.closest('input, select, textarea')) return true;
  return (key === ' ' || key === 'Enter') && !!target.closest('button, a');
}
