export const findPath = (data: any, itemId: any, path: any = []) => {
  // 각 레벨에서 아이템을 탐색
  for (let i = 0; i < data.length; i++) {
    const item = data[i];

    // 현재 아이템의 ID가 찾고자 하는 ID와 일치하는 경우
    if (item.id === itemId) {
      return [...path, i];
    }

    // 하위 레벨에서 재귀적으로 탐색
    if (item.sections) {
      const result: any = findPath(item.sections, itemId, [...path, i]);
      if (result) return result;
    }
    if (item.rows) {
      const result: any = findPath(item.rows, itemId, [...path, i]);
      if (result) return result;
    }
    if (item.columns) {
      const result: any = findPath(item.columns, itemId, [...path, i]);
      if (result) return result;
    }
    if (item.controls) {
      const controlIndex = item.controls.indexOf(itemId);
      if (controlIndex !== -1) {
        return [...path, i, controlIndex];
      }
    }
  }

  // 해당 ID를 찾지 못한 경우
  return null;
};
