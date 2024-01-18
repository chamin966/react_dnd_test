import { useFormData } from './formDataStore';
import { findPath } from '../../util/findPath';
import { IDragControlSource } from '../../example/dnd/practice/Control';
import { IDragColumnSource } from '../../example/dnd/practice/Column';
import { IDragRowSource } from '../../example/dnd/practice/Row';
import { IDragSectionSource } from '../../example/dnd/practice/Section';
import { ItemTypes } from '../../example/dnd/practice/itemTypes';

export const dispatchControlMove = (
  draggingItem: IDragControlSource,
  hoveringItem: IDragControlSource
) => {
  useFormData.setState((prevState) => {
    const draggingPath = findPath(prevState.form.sections, draggingItem.id);
    const hoveringPath = findPath(prevState.form.sections, hoveringItem.id);
    console.log('draggingPath:', draggingPath);
    console.log('hoveringPath:', hoveringPath);

    prevState.form.sections[draggingPath[0]].rows[draggingPath[1]].columns[
      draggingPath[2]
    ].controls.splice(draggingItem.index, 1);

    prevState.form.sections[hoveringPath[0]].rows[hoveringPath[1]].columns[
      hoveringPath[2]
    ].controls.splice(hoveringItem.index, 0, draggingItem.id);
  });
};

export const dispatchColumnMove = (
  draggingItem: IDragColumnSource,
  hoveringItem: IDragColumnSource
) => {
  useFormData.setState((prevState) => {
    const draggingPath = findPath(prevState.form.sections, draggingItem.id);
    const hoveringPath = findPath(prevState.form.sections, hoveringItem.id);

    console.log('draggingPath:', draggingPath);
    console.log('hoveringPath:', hoveringPath);

    const draggingColumn = prevState.form.sections[draggingPath[0]].rows[
      draggingPath[1]
    ].columns.splice(draggingPath[2], 1)[0];

    prevState.form.sections[hoveringPath[0]].rows[hoveringPath[1]].columns.splice(
      hoveringPath[2],
      0,
      draggingColumn
    );
  });
};

export const dispatchRowMove = (draggingItem: IDragRowSource, hoveringItem: IDragRowSource) => {
  useFormData.setState((prevState) => {
    const draggingPath = findPath(prevState.form.sections, draggingItem.id);
    const hoveringPath = findPath(prevState.form.sections, hoveringItem.id);

    // 로그 출력
    console.log('draggingPath:', draggingPath);
    console.log('hoveringPath:', hoveringPath);

    const draggingRow = prevState.form.sections[draggingPath[0]].rows.splice(
      draggingItem.index,
      1
    )[0];
    prevState.form.sections[hoveringPath[0]].rows.splice(hoveringItem.index, 0, draggingRow);
  });
};

export const dispatchSectionMove = (
  draggingItem: IDragSectionSource,
  hoveringItem: IDragSectionSource
) => {
  useFormData.setState((prevState) => {
    const draggingPath = findPath(prevState.form.sections, draggingItem.id);
    const hoveringPath = findPath(prevState.form.sections, hoveringItem.id);

    console.log('draggingPath:', draggingPath);
    console.log('hoveringPath:', hoveringPath);

    // 섹션 이동 로직
    const draggingSection = prevState.form.sections.splice(draggingPath[0], 1)[0];
    prevState.form.sections.splice(hoveringPath[0], 0, draggingSection);
  });
};

export const dispatchEmptyDropTarget = (
  draggingItem: any,
  dropTargetId: string,
  droppableType: string
) => {
  useFormData.setState((prevState) => {
    const draggingPath = findPath(prevState.form.sections, draggingItem.id);
    const droppingPath = findPath(prevState.form.sections, dropTargetId);
    console.log('draggingPath: ', draggingPath);
    console.log('droppingPath:', droppingPath);

    if (droppableType === ItemTypes.CONTROL) {
      const draggingControlId =
        prevState.form.sections[draggingPath[0]].rows[draggingPath[1]].columns[draggingPath[2]]
          .controls[draggingPath[3]];

      prevState.form.sections[draggingPath[0]].rows[draggingPath[1]].columns[
        draggingPath[2]
      ].controls.splice(draggingPath[3], 1);

      prevState.form.sections[droppingPath[0]].rows[droppingPath[1]].columns[
        droppingPath[2]
      ].controls.push(draggingControlId);
    }
    if (droppableType === ItemTypes.COLUMN) {
      const draggingColumn =
        prevState.form.sections[draggingPath[0]].rows[draggingPath[1]].columns[draggingPath[2]];

      prevState.form.sections[draggingPath[0]].rows[draggingPath[1]].columns.splice(
        draggingPath[2],
        1
      );
      prevState.form.sections[droppingPath[0]].rows[droppingPath[1]].columns.push(draggingColumn);
    }
    if (droppableType === ItemTypes.ROW) {
      const draggingRow = prevState.form.sections[draggingPath[0]].rows[draggingPath[1]];

      prevState.form.sections[draggingPath[0]].rows.splice(draggingPath[1], 1);
      prevState.form.sections[droppingPath[0]].rows.push(draggingRow);
    }
  });
};
