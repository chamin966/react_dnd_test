import { XYCoord } from 'dnd-core';
import { dispatchControlMove } from '../store/formData/formDataAction';
import { IDragControlSource } from '../example/dnd/practice/Control';

interface MoveControlProps {
  ref: React.RefObject<HTMLDivElement>;
  monitor: any;
  item: IDragControlSource;
  props: IDragControlSource;
}

export const MoveControl = ({
  ref,
  monitor,
  item,
  props
}: MoveControlProps): void => {
  console.log(ref, monitor, item, props);
  if (!ref.current) return;
  const dragIndex = item.index;
  const hoverIndex = props.index;

  if (item.parentColumnId === props.parentColumnId && dragIndex === hoverIndex)
    return;

  const hoverBoundingRect = ref.current?.getBoundingClientRect();
  const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
  const clientOffset = monitor.getClientOffset();
  const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;
  if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
  if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

  console.log('무빙해?');
  dispatchControlMove(item, props);
};
