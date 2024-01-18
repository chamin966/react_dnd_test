import Row, { IRow } from './Row';
import { CSSProperties, FC, memo, useCallback, useRef } from 'react';
import { useDrag, useDrop, XYCoord } from 'react-dnd';
import { Identifier } from 'dnd-core';
import { ItemTypes } from './itemTypes';
import { dispatchSectionMove } from '../../../store/formData/formDataAction';
import { isEqual } from 'lodash';
import Placeholder from './Placeholder';
import { ShouldDispatchMove } from '../../../util/shouldDispatchMove';

const getStyle = (isDragging: boolean): CSSProperties => {
  return {
    padding: '20px',
    backgroundColor: 'darkkhaki',
    border: '1px solid black',
    opacity: isDragging ? '0.3' : '1',
    cursor: 'move'
  };
};

export interface IDragSectionSource {
  id: string;
  index: number;
}

export interface ISection {
  id: string;
  rows: IRow[];
}

interface SectionProps {
  id: string;
  rows: IRow[];
  parentId: string;
  index: number;
}

const Section: FC<SectionProps> = memo(
  function Section(props: SectionProps) {
    const ref = useRef<HTMLDivElement>(null);

    const [{ handlerId }, drop] = useDrop<
      IDragSectionSource,
      void,
      { handlerId: Identifier | null }
    >({
      accept: ItemTypes.SECTION,
      collect: (monitor) => {
        return {
          handlerId: monitor.getHandlerId()
        };
      },
      hover: (item: IDragSectionSource, monitor) => {
        const shouldDispatch = ShouldDispatchMove({
          ref,
          dragIndex: item.index,
          dragParentId: 'form',
          hoverIndex: props.index,
          hoverParentId: props.parentId,
          monitor,
          isVertical: true
        });

        if (shouldDispatch) {
          console.log('무빙해?');
          dispatchSectionMove(item, props);
        }

        // 불변성 변화로 변경해야 함
        item.index = props.index;
      }
    });

    const [{ draggingItemId }, drag] = useDrag({
      type: ItemTypes.SECTION,
      item: () => {
        return {
          id: props.id,
          index: props.index
        };
      },
      collect: (monitor) => ({ draggingItemId: monitor.getItem()?.id })
    });

    drag(drop(ref));

    const renderRow = useCallback((row: IRow, index: number) => {
      return (
        <Row
          key={row.id}
          id={row.id}
          columns={row.columns}
          index={index}
          parentId={props.parentId}
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
            flexDirection: 'column',
            gap: '10px'
          }}
        >
          {props.rows.length === 0 && (
            <Placeholder dropTargetId={props.id} droppableType={ItemTypes.ROW} />
          )}
          {props.rows.map((row, index) => renderRow(row, index))}
        </div>
      </div>
    );
  },
  (prevProps, nextProps) => isEqual(prevProps, nextProps)
);

export default Section;
