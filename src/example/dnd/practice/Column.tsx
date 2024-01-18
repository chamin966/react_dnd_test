import Control, { IDragControlSource } from './Control';
import { memo, useCallback, useRef } from 'react';
import { useDrag, useDrop, XYCoord } from 'react-dnd';
import { Identifier } from 'dnd-core';
import { ItemTypes } from './itemTypes';
import { dispatchColumnMove } from '../../../store/formData/formDataAction';
import { FC } from 'react/index';
import { isEqual } from 'lodash';
import Placeholder from './Placeholder';

export interface IDragColumnSource {
  id: string;
  index: number;
  parentRowId: string;
  parentSectionId: string;
}

export interface IColumn {
  id: string;
  controls: string[];
}

interface ColumnProps {
  id: string;
  controls: string[];
  parentSectionId: string;
  parentRowId: string;
  index: number;
}

const Column: FC<ColumnProps> = memo(
  function Column(props) {
    const ref = useRef<HTMLDivElement>(null);

    const [{ handlerId }, drop] = useDrop<
      IDragColumnSource | IDragControlSource,
      void,
      { handlerId: Identifier | null }
    >({
      accept: ItemTypes.COLUMN,
      collect: (monitor) => {
        return {
          handlerId: monitor.getHandlerId()
        };
      },
      hover: (item: IDragColumnSource | IDragControlSource, monitor) => {
        if (!ref.current) return;
        const dragIndex = item.index;
        const hoverIndex = props.index;

        if (item.parentRowId === props.parentRowId && dragIndex === hoverIndex)
          return;

        const hoverBoundingRect = ref.current?.getBoundingClientRect();
        const hoverMiddleX =
          (hoverBoundingRect.right - hoverBoundingRect.left) / 2;
        const clientOffset = monitor.getClientOffset();
        const hoverClientX =
          (clientOffset as XYCoord).x - hoverBoundingRect.left;
        if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) return;
        if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) return;

        console.log('무빙해?');
        dispatchColumnMove(item, props);
        // 불변성 변화로 변경해야 함
        item.index = props.index;
        item.parentRowId = props.parentRowId;
        item.parentSectionId = props.parentSectionId;
      }
      // }
    });

    const [{ isDragging }, drag] = useDrag({
      type: ItemTypes.COLUMN,
      item: () => {
        return {
          id: props.id,
          index: props.index,
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

    const renderControl = useCallback((controlId: string, index: number) => {
      return (
        <Control
          key={controlId}
          index={index}
          id={controlId}
          parentSectionId={props.parentSectionId}
          parentRowId={props.parentRowId}
          parentColumnId={props.id}
        />
      );
    }, []);

    return (
      <div
        ref={ref}
        style={{
          border: '1px solid black',
          padding: '20px',
          backgroundColor: 'beige',
          width: '100%',
          opacity: opacity,
          cursor: 'move'
        }}
        data-handler-id={handlerId}
      >
        {props.id} {props.parentRowId} {props.parentSectionId}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
          }}
        >
          {props.controls.length === 0 && (
            <Placeholder
              dropTargetId={props.id}
              droppableType={ItemTypes.CONTROL}
            />
          )}
          {props.controls.map((controlId: string, index: number) =>
            renderControl(controlId, index)
          )}
        </div>
      </div>
    );
  },
  (prevProps, nextProps) => isEqual(prevProps, nextProps)
);

export default Column;
