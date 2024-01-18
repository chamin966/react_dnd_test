import Control, { IDragControlSource } from './Control';
import { CSSProperties, memo, useCallback, useRef } from 'react';
import { useDrag, useDrop, XYCoord } from 'react-dnd';
import { Identifier } from 'dnd-core';
import { ItemTypes } from './itemTypes';
import { dispatchColumnMove } from '../../../store/formData/formDataAction';
import { FC } from 'react/index';
import { isEqual } from 'lodash';
import Placeholder from './Placeholder';
import { ShouldDispatchMove } from '../../../util/shouldDispatchMove';

const getStyle = (isDragging: boolean): CSSProperties => {
  return {
    border: '1px solid black',
    padding: '20px',
    backgroundColor: 'beige',
    width: '100%',
    opacity: isDragging ? '0.3' : '1',
    cursor: 'move'
  };
};

export interface IDragColumnSource {
  id: string;
  index: number;
  parentId: string;
}

export interface IColumn {
  id: string;
  controls: string[];
}

interface ColumnProps {
  id: string;
  controls: string[];
  parentId: string;
  index: number;
}

const Column: FC<ColumnProps> = memo(
  function Column(props) {
    const ref = useRef<HTMLDivElement>(null);

    const [{ handlerId }, drop] = useDrop<
      IDragColumnSource,
      void,
      { handlerId: Identifier | null }
    >({
      accept: ItemTypes.COLUMN,
      collect: (monitor) => {
        return {
          handlerId: monitor.getHandlerId()
        };
      },
      hover: (item: IDragColumnSource, monitor) => {
        const shouldDispatch = ShouldDispatchMove({
          ref,
          dragIndex: item.index,
          dragParentId: item.parentId,
          hoverIndex: props.index,
          hoverParentId: props.parentId,
          monitor,
          isVertical: false
        });

        if (shouldDispatch) {
          console.log('무빙해?');
          dispatchColumnMove(item, props);
          // 불변성 변화로 변경해야 함
          item.index = props.index;
          item.parentId = props.parentId;
        }
      }
    });

    const [{ draggingItemId }, drag] = useDrag(
      {
        type: ItemTypes.COLUMN,
        item: () => {
          return {
            id: props.id,
            index: props.index,
            parentId: props.parentId
          };
        },
        collect: (monitor) => ({ draggingItemId: monitor.getItem()?.id })
      },
      []
    );

    drag(drop(ref));

    const renderControl = useCallback((controlId: string, index: number) => {
      return <Control key={controlId} index={index} id={controlId} parentId={props.id} />;
    }, []);

    return (
      <div
        ref={ref}
        style={{ ...getStyle(draggingItemId === props.id) }}
        data-handler-id={handlerId}
      >
        {props.id}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
          }}
        >
          {props.controls.length === 0 && (
            <Placeholder dropTargetId={props.id} droppableType={ItemTypes.CONTROL} />
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
