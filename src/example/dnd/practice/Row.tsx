import Column, { IColumn } from './Column';
import { FC, memo, useCallback, useRef } from 'react';
import { useDrag, useDrop, XYCoord } from 'react-dnd';
import { Identifier } from 'dnd-core';
import { ItemTypes } from './itemTypes';
import { dispatchRowMove } from '../../../store/formData/formDataAction';

export interface IDragRowSource {
  id: string;
  index: number;
  parentSectionId: string;
}

export interface IRow {
  id: string;
  type: string;
  columns: IColumn[];
}

interface RowProps {
  id: string;
  columns: IColumn[];
  parentSectionId: string;
  index: number;
}

const Row: FC<RowProps> = memo(function Row(props: RowProps) {
  const ref = useRef<HTMLDivElement>(null);

  const [{ handlerId }, drop] = useDrop<
    IDragRowSource,
    void,
    { handlerId: Identifier | null }
  >({
    accept: ItemTypes.Row,
    collect: (monitor) => {
      return {
        handlerId: monitor.getHandlerId()
      };
    },
    hover: (item: IDragRowSource, monitor) => {
      if (!ref.current) return;

      const dragIndex = item.index;
      const hoverIndex = props.index;

      if (
        item.parentSectionId === props.parentSectionId &&
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
      dispatchRowMove(item, props);

      // 불변성 변화로 변경해야 함
      item.index = props.index;
      item.parentSectionId = props.parentSectionId;
    }
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.Row,
    item: () => {
      return {
        id: props.id,
        index: props.index,
        parentSectionId: props.parentSectionId
      };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  });

  const opacity = isDragging ? 0.5 : 1;
  drag(drop(ref));

  const renderColumn = useCallback((column: IColumn, index: number) => {
    return (
      <Column
        key={column.id}
        id={column.id}
        controls={column.controls}
        parentSectionId={props.parentSectionId}
        parentRowId={props.id}
        index={index}
      />
    );
  }, []);

  return (
    <div
      ref={ref}
      style={{
        padding: '20px',
        backgroundColor: 'coral',
        border: '1px solid black',
        opacity: opacity,
        cursor: 'move'
      }}
      data-handler-id={handlerId}
    >
      {props.id} {props.parentSectionId}
      <div
        style={{
          display: 'flex',
          gap: '10px'
        }}
      >
        {props.columns.map((column: IColumn, index: number) =>
          renderColumn(column, index)
        )}
      </div>
    </div>
  );
});

export default Row;
