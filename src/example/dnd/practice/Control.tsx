import { useDrag, useDrop, XYCoord } from 'react-dnd';
import { useRef } from 'react';
import { Identifier } from 'dnd-core';
import { ItemTypes } from './itemTypes';
import { dispatchControlMove } from '../../../store/formData/formDataAction';

export interface IDragControlSource {
  id: string;
  index: number;
  parentColumnId: string;
  parentRowId: string;
  parentSectionId: string;
}

export interface ControlProps {
  id: string;
  index: number;
  parentSectionId: string;
  parentRowId: string;
  parentColumnId: string;
}

function Control(props: ControlProps) {
  const ref = useRef<HTMLDivElement>(null);

  const [{ handlerId }, drop] = useDrop<
    IDragControlSource,
    void,
    { handlerId: Identifier | null }
  >({
    accept: ItemTypes.CONTROL,
    collect: (monitor) => {
      return {
        handlerId: monitor.getHandlerId()
      };
    },
    hover: (item: IDragControlSource, monitor) => {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = props.index;

      if (
        item.parentColumnId === props.parentColumnId &&
        dragIndex === hoverIndex
      )
        return;

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

      console.log('무빙해?');
      dispatchControlMove(item, props);
      // 나중에 util 함수로 빼기
      // MoveControl({ ref, monitor, item, props });

      // 불변성 변화로 변경해야 함
      item.index = props.index;
      item.parentColumnId = props.parentColumnId;
      item.parentRowId = props.parentRowId;
      item.parentSectionId = props.parentSectionId;
    }
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CONTROL,
    item: () => {
      return {
        id: props.id,
        index: props.index,
        parentColumnId: props.parentColumnId,
        parentRowId: props.parentRowId,
        parentSectionId: props.parentSectionId
      };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  });

  const opacity = isDragging ? 0.5 : 1;
  drag(drop(ref));
  return (
    <div
      ref={ref}
      style={{
        height: '50px',
        backgroundColor: 'burlywood',
        border: '1px solid black',
        padding: '10px',
        opacity: opacity,
        cursor: 'move'
      }}
      data-handler-id={handlerId}
    >
      {props.id}: {props.parentColumnId} {props.parentRowId}{' '}
      {props.parentSectionId}
    </div>
  );
}

export default Control;
