// 전역 단축키가 포커스된 요소의 기본 동작을 가로채지 않게 한다.
// 입력칸에서는 모든 키를, 버튼과 링크에서는 Space와 Enter(누르기)를 그 요소에 맡긴다.
export function keyBelongsToTarget(target, key) {
  if (!target || typeof target.closest !== 'function') return false;   // window·document에 보낸 키(테스트 등)
  if (target.closest('input, select, textarea')) return true;
  return (key === ' ' || key === 'Enter') && !!target.closest('button, a');
}

// 버튼 묶음 안에서 화살표로 옮겨 갈 버튼의 순서(끝에서 처음으로 돈다). 옮기지 않는 키면 -1.
// n: 버튼 수, i: 지금 버튼, horizontal: ←/→도 쓸지 (분기 선택지), 아니면 ↑/↓만 (읽기 탭)
export function roveIndex(n, i, key, horizontal = true) {
  if (n < 1 || i < 0) return -1;
  const back = key === 'ArrowUp' || (horizontal && key === 'ArrowLeft');
  const fwd = key === 'ArrowDown' || (horizontal && key === 'ArrowRight');
  if (key === 'Home') return 0;
  if (key === 'End') return n - 1;
  if (!back && !fwd) return -1;
  return (i + (back ? -1 : 1) + n) % n;
}
