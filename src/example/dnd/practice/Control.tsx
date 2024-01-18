import { useDrag, useDrop, XYCoord } from 'react-dnd';
import { FC, memo, useRef } from 'react';
import { Identifier } from 'dnd-core';
import { ItemTypes } from './itemTypes';
import { dispatchControlMove } from '../../../store/formData/formDataAction';
import { isEqual } from 'lodash';

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
const Control: FC<ControlProps> = memo(
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
        // 나중에 util 함수로 빼기
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
        const hoverClientY =
          (clientOffset as XYCoord).y - hoverBoundingRect.top;
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

        console.log('무빙해?');
        dispatchControlMove(item, props);

        /*
        아래 코드가 필요한 이유
        item 객체란?
        : item 객체는 현재 드래그 하고 있는 항목의 정보
        (useDrag 훅의 item 프로퍼티에서 반환하는 값)을 나타내며,
        이 객체의 속성은 드래그 앤 드롭 동작을 올바르게 처리하는 데
        필요한 정보를 포함합니다.
        1. 일관된 상태 관리: 드래그 앤 드롭 동작은 애플리케이션의 상태에 직접적인 영향을 미칩니다.
        예를 들어, 드래그 앤 드롭으로 항목의 순서를 변경하는 경우,
        이 변경 사항은 애플리케이션의 전체 상태에 반영되어야 합니다.
        실시간으로 item의 상태를 업데이트함으로써,
        애플리케이션의 상태를 일관성 있게 유지할 수 있습니다.
        2. 데이터 무결성 보장: 드래그 앤 드롭 인터랙션 중에 데이터의 무결성을 유지하는 것이 중요합니다.
        사용자가 요소를 드래그하는 동안,
        그 요소의 위치 및 관련 데이터는 항상 최신 상태를 유지해야 합니다.
        이를 통해 오류를 방지하고, 예상치 못한 상태 변화로 인한 문제를 최소화할 수 있습니다.
        * */

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
  },
  (prevProps, nextProps) => isEqual(prevProps, nextProps)
);

export default Control;
