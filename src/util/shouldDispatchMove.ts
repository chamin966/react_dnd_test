import React from 'react';
import { DropTargetMonitor, XYCoord } from 'react-dnd';
import { IDragControlSource } from '../example/dnd/practice/Control';

interface ShouldDispatchMoveProps {
  ref: React.RefObject<HTMLDivElement>;
  dragIndex: number;
  dragParentId: string;
  hoverIndex: number;
  hoverParentId: string;
  monitor: DropTargetMonitor<IDragControlSource, void>;
  isVertical: boolean;
}

export const ShouldDispatchMove = (props: ShouldDispatchMoveProps) => {
  if (!props.ref.current) return false;

  if (props.dragParentId === props.hoverParentId && props.dragIndex === props.hoverIndex)
    return false;

  const hoverBoundingRect = props.ref.current?.getBoundingClientRect();
  const hoverMiddle = props.isVertical
    ? (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
    : (hoverBoundingRect.right - hoverBoundingRect.left) / 2;
  const clientOffset = props.monitor.getClientOffset();
  const hoverClient = props.isVertical
    ? (clientOffset as XYCoord).y - hoverBoundingRect.top
    : (clientOffset as XYCoord).x - hoverBoundingRect.left;
  if (props.dragIndex < props.hoverIndex && hoverClient < hoverMiddle) return false;
  if (props.dragIndex > props.hoverIndex && hoverClient > hoverMiddle) return false;

  return true;
};
