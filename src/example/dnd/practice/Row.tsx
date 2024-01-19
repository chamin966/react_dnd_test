import Column, { IColumn } from './Column';
import { CSSProperties, FC, memo, useCallback, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { Identifier } from 'dnd-core';
import { ItemTypes } from './itemTypes';
import { dispatchRowMove } from '../../../store/formData/formDataAction';
import { isEqual } from 'lodash';
import Placeholder from './Placeholder';
import { ShouldDispatchMove } from '../../../util/shouldDispatchMove';

const getStyle = (isDragging: boolean): CSSProperties => {
  return {
    padding: '20px',
    backgroundColor: 'coral',
    border: '1px solid black',
    opacity: isDragging ? '0.3' : '1',
    cursor: 'move'
  };
};

export interface IDragRowSource {
  id: string;
  index: number;
  parentId: string;
}

export interface IRow {
  id: string;
  columns: IColumn[];
}

interface RowProps {
  id: string;
  columns: IColumn[];
  parentId: string;
  index: number;
}

const Row: FC<RowProps> = memo(
  function Row(props: RowProps) {
    const ref = useRef<HTMLDivElement>(null);

    const [{ handlerId }, drop] = useDrop<IDragRowSource, void, { handlerId: Identifier | null }>({
      accept: ItemTypes.ROW,
      collect: (monitor) => {
        return {
          handlerId: monitor.getHandlerId()
        };
      },
      hover: (item: IDragRowSource, monitor) => {
        const shouldDispatch = ShouldDispatchMove({
          ref,
          dragIndex: item.index,
          dragParentId: item.parentId,
          hoverIndex: props.index,
          hoverParentId: props.parentId,
          monitor,
          isVertical: true
        });

        if (shouldDispatch) {
          console.log('무빙해?');
          dispatchRowMove(item, props);

          // 불변성 변화로 변경해야 함
          item.index = props.index;
          item.parentId = props.parentId;
        }
      }
    });

    const [{ draggingItemId }, drag] = useDrag({
      type: ItemTypes.ROW,
      item: () => {
        return {
          id: props.id,
          index: props.index,
          parentId: props.parentId
        };
      },
      collect: (monitor) => ({ draggingItemId: monitor.getItem()?.id })
    });

    drag(drop(ref));

    const renderColumn = useCallback((column: IColumn, index: number) => {
      return (
        <Column
          key={column.id}
          id={column.id}
          controls={column.controls}
          parentId={props.id}
          index={index}
        />
      );
    }, []);

    return (
      <div
        ref={ref}
        style={{
          ...getStyle(draggingItemId === props.id)
        }}
        data-handler-id={handlerId}
      >
        {props.id}
        <div
          style={{
            display: 'flex',
            gap: '10px'
          }}
        >
          {props.columns.length === 0 && (
            <Placeholder dropTargetId={props.id} droppableType={ItemTypes.COLUMN} />
          )}
          {props.columns.map((column: IColumn, index: number) => renderColumn(column, index))}
        </div>
      </div>
    );
  },
  (prevProps, nextProps) => isEqual(prevProps, nextProps)
);

export default Row;
