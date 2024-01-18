import { useFormData } from './formDataStore';
import { findPath } from '../../util/findPath';
import { IDragControlSource } from '../../example/dnd/practice/Control';
import { IDragColumnSource } from '../../example/dnd/practice/Column';
import { IDragRowSource } from '../../example/dnd/practice/Row';
import { IDragSectionSource } from '../../example/dnd/practice/Section';

export const dispatchControlMove = (
  draggingItem: IDragControlSource,
  hoveringItem: IDragControlSource
) => {
  useFormData.setState((state) => {
    const draggingPath = findPath(state.form.sections, draggingItem.id);
    const hoveringPath = findPath(state.form.sections, hoveringItem.id);
    console.log('draggingPath:', draggingPath);
    console.log('hoveringPath:', hoveringPath);

    // 둘이 다른 부모 섹션을 가짐
    if (draggingPath[0] !== hoveringPath[0]) {
      state.form.sections[draggingPath[0]].rows[draggingPath[1]].columns[
        draggingPath[2]
      ].controls.splice(draggingItem.index, 1);

      state.form.sections[hoveringPath[0]].rows[hoveringPath[1]].columns[
        hoveringPath[2]
      ].controls.splice(hoveringItem.index, 0, draggingItem.id);
    }
    // 둘이 다른 부모 로우를 가짐
    else if (draggingPath[1] !== hoveringPath[1]) {
      state.form.sections[draggingPath[0]].rows[draggingPath[1]].columns[
        draggingPath[2]
      ].controls.splice(draggingItem.index, 1);

      state.form.sections[draggingPath[0]].rows[hoveringPath[1]].columns[
        hoveringPath[2]
      ].controls.splice(hoveringItem.index, 0, draggingItem.id);
    }
    // 둘이 다른 부모 컬럼을 가짐
    else if (draggingPath[2] !== hoveringPath[2]) {
      state.form.sections[draggingPath[0]].rows[draggingPath[1]].columns[
        draggingPath[2]
      ].controls.splice(draggingItem.index, 1);

      state.form.sections[draggingPath[0]].rows[draggingPath[1]].columns[
        hoveringPath[2]
      ].controls.splice(hoveringItem.index, 0, draggingItem.id);
    }
    // 둘이 같은 부모 컬럼을 가짐
    else {
      const controls =
        state.form.sections[draggingPath[0]].rows[draggingPath[1]].columns[
          draggingPath[2]
        ].controls;

      controls.splice(draggingItem.index, 1);
      controls.splice(hoveringItem.index, 0, draggingItem.id);
    }
  });
};

export const dispatchColumnMove = (
  draggingItem: IDragColumnSource,
  hoveringItem: IDragColumnSource
) => {
  useFormData.setState((state) => {
    const draggingPath = findPath(state.form.sections, draggingItem.id);
    const hoveringPath = findPath(state.form.sections, hoveringItem.id);

    console.log('draggingPath:', draggingPath);
    console.log('hoveringPath:', hoveringPath);

    const draggingColumn = state.form.sections[draggingPath[0]].rows[
      draggingPath[1]
    ].columns.splice(draggingItem.index, 1)[0];

    // 둘이 다른 부모 섹션을 가지는 경우
    if (draggingPath[0] !== hoveringPath[0]) {
      state.form.sections[hoveringPath[0]].rows[hoveringPath[1]].columns.splice(
        hoveringItem.index,
        0,
        draggingColumn
      );
    }
    // 둘이 다른 부모 로우를 가지는 경우
    else if (draggingPath[1] !== hoveringPath[1]) {
      state.form.sections[draggingPath[0]].rows[hoveringPath[1]].columns.splice(
        hoveringItem.index,
        0,
        draggingColumn
      );
    }
    // 같은 부모 로우를 가지는 경우
    else {
      state.form.sections[draggingPath[0]].rows[draggingPath[1]].columns.splice(
        hoveringItem.index,
        0,
        draggingColumn
      );
    }
  });
};

export const dispatchRowMove = (
  draggingItem: IDragRowSource,
  hoveringItem: IDragRowSource
) => {
  useFormData.setState((state) => {
    const draggingPath = findPath(state.form.sections, draggingItem.id);
    const hoveringPath = findPath(state.form.sections, hoveringItem.id);

    // 로그 출력
    console.log('draggingPath:', draggingPath);
    console.log('hoveringPath:', hoveringPath);

    const draggingRow = state.form.sections[draggingPath[0]].rows.splice(
      draggingItem.index,
      1
    )[0];

    // 둘이 다른 부모 섹션을 가지는 경우
    if (draggingPath[0] !== hoveringPath[0]) {
      state.form.sections[hoveringPath[0]].rows.splice(
        hoveringItem.index,
        0,
        draggingRow
      );
    }
    // 같은 부모 섹션을 가지는 경우
    else {
      state.form.sections[draggingPath[0]].rows.splice(
        hoveringItem.index,
        0,
        draggingRow
      );
    }
  });
};

export const dispatchSectionMove = (
  draggingItem: IDragSectionSource,
  hoveringItem: IDragSectionSource
) => {
  useFormData.setState((state) => {
    const draggingPath = findPath(state.form.sections, draggingItem.id);
    const hoveringPath = findPath(state.form.sections, hoveringItem.id);

    console.log('draggingPath:', draggingPath);
    console.log('hoveringPath:', hoveringPath);

    // 섹션 이동 로직
    const draggingSection = state.form.sections.splice(draggingPath[0], 1)[0];
    state.form.sections.splice(hoveringPath[0], 0, draggingSection);
  });
};
