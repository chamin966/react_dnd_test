import { useDrag, useDrop } from 'react-dnd';
import { CSSProperties, FC, memo, useRef } from 'react';
import { Identifier } from 'dnd-core';
import { ItemTypes } from './itemTypes';
import { dispatchControlMove } from '../../../store/formData/formDataAction';
import { isEqual } from 'lodash';
import { ShouldDispatchMove } from '../../../util/shouldDispatchMove';

const getStyle = (isDragging: boolean): CSSProperties => {
  return {
    height: '50px',
    backgroundColor: 'burlywood',
    border: '1px solid black',
    padding: '10px',
    opacity: isDragging ? '0.3' : '1',
    cursor: 'move'
  };
};

export interface IDragControlSource {
  id: string;
  index: number;
  parentId: string;
}

export interface ControlProps {
  id: string;
  index: number;
  parentId: string;
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
          item.parentId = props.parentId;
        }
      }
    });

    const [{ draggingItemId }, drag] = useDrag({
      type: ItemTypes.CONTROL,
      item: () => {
        return {
          id: props.id,
          index: props.index,
          parentColumnId: props.parentId
        };
      },
      collect: (monitor) => ({ draggingItemId: monitor.getItem()?.id })
    });

    drag(drop(ref));

    return (
      <div
        ref={ref}
        style={{ ...getStyle(draggingItemId === props.id) }}
        data-handler-id={handlerId}
      >
        {props.id}
      </div>
    );
  },
  (prevProps, nextProps) => isEqual(prevProps, nextProps)
);

export default Control;
