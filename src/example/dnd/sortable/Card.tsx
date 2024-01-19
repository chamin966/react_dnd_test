import type { Identifier, XYCoord } from 'dnd-core';
import type { FC } from 'react';
import { useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes } from './itemTypes';

const style = {
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  backgroundColor: 'white',
  cursor: 'move'
};

export interface CardProps {
  id: any;
  text: string;
  index: number;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
}

/*
React DnD 라이브러리에서 useDrop은 드래그 앤 드롭 상호작용을 위한 훅입니다.
이 훅은 제네릭 타입 매개변수를 가지며, 이들은 다음을 나타냅니다:

DragItem: 이것은 드래그되는 항목의 타입을 정의합니다.
DragItem은 당신이 정의한 인터페이스로, 드래그되는 항목이 가질 수 있는 속성을 지정합니다.
이 타입은 드래그 소스와 드롭 타겟 간에 전달되는 데이터의 구조를 정의합니다.

void: 이것은 드롭 결과의 타입을 나타냅니다.
여기서 void는 드롭이 성공적으로 완료되었을 때 반환되는 값의 타입을 의미합니다.
void를 사용하는 경우, 드롭의 결과로 특별한 값이 반환되지 않음을 의미합니다.
즉, 이 드롭 작업이 완료된 후에 추가적인 정보를 반환할 필요가 없다는 것을 나타냅니다.

{ handlerId: Identifier | null }: 이것은 콜렉터 함수의 반환 타입을 정의합니다.
콜렉터 함수는 드롭 타겟의 상태를 추적하는 데 사용되며, 이 객체는 그 상태를 나타냅니다.
여기서 handlerId는 드롭 대상에 할당된 고유한 식별자로,
드래그 상호작용 중에 이를 사용하여 드롭 타겟을 식별할 수 있습니다.
Identifier는 일반적으로 문자열이며, null은 드롭 타겟이 활성 상태가 아닐 때를 나타냅니다.

제네릭 매개변수의 순서는 React DnD 라이브러리가 정한 규칙을 따릅니다.
첫 번째 매개변수는 드래그 항목의 타입,
두 번째는 드롭 결과의 타입,
세 번째는 콜렉터 함수의 반환 타입을 지정하는 것입니다.
이 순서는 React DnD의 API 설계에 따라 정해진 것으로
각 타입 매개변수가 드래그 앤 드롭 상호작용에서의 특정한 역할을 명확하게 구분하도록 합니다.
*/

interface DragItem {
  index: number;
  id: string;
  type: string;
}

export const Card: FC<CardProps> = (props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [{ handlerId }, drop] = useDrop<DragItem, void, { handlerId: Identifier | null }>({
    accept: ItemTypes.CARD,
    collect: (monitor) => {
      return {
        handlerId: monitor.getHandlerId()
      };
    },
    hover: (item: DragItem, monitor) => {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = props.index;
      /*
      React DnD에서 useDrag와 useDrop을 사용하는 컨텍스트를 이해하는 것은 중요합니다.
      여기서 item과 props가 어떻게 사용되는지 설명드리겠습니다.

      useDrag 훅에서 item:
      이것은 드래그를 시작할 때의 정보를 담고 있습니다.
      useDrag에서 item 프로퍼티는 드래그 작업 중에 드롭 타겟으로 전달될 데이터를 정의합니다.
      이 예제에서는 item이 드래그하는 카드의 id와 index를 포함합니다.
      따라서 item.index는 드래그 중인 카드의 인덱스를 나타냅니다.

      useDrop 훅에서 item:
      여기서의 item은 useDrag에서 설정된 그대로 드래그 중인 객체의 정보를 가지고 있습니다.
      useDrop의 hover 함수 내부에서 사용되는 item은 드래그 중인 카드의 데이터를 나타냅니다.

      hover 함수는 드래그 중인 항목이 다른 항목 위에 놓일 때 호출됩니다.

      props: props는 현재 컴포넌트에 전달된 속성들을 포함합니다.
      이 예제에서 props.index는 현재 드롭 타겟 컴포넌트(즉, 카드 컴포넌트)의 인덱스를 나타냅니다.
      이는 해당 props에 대한 정보를 useDrop 훅의 hover 함수 호출에서 불러오기 때문입니다.

      hover 함수 내부에서
      const dragIndex = item.index;와
      const hoverIndex = props.index;는 다음을 의미합니다:

      dragIndex: 현재 드래그되고 있는 카드의 인덱스입니다.
      이것은 useDrag에 의해 설정된 item.index로부터 가져옵니다.

      hoverIndex: 현재 드롭 타겟(마우스가 위에 있는) 카드의 인덱스입니다.
      이것은 컴포넌트의 props.index로부터 가져옵니다.

      따라서 hover 함수는 드래그 중인 카드(dragIndex)가
      다른 카드(hoverIndex) 위에 올라갔을 때 호출되며,
      이를 통해 두 카드의 위치를 바꿀 수 있습니다.
      item과 props는 이 과정에서 각각 드래그 중인 항목과 드롭 타겟 항목의 정보를 제공합니다.
       */

      if (dragIndex === hoverIndex) return;

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

      props.moveCard(dragIndex, hoverIndex);

      console.log(hoverIndex);
      item.index = hoverIndex;

      /*
      hover 함수는 React DnD (Drag and Drop) 라이브러리에서 사용되며,
      드래그 앤 드롭 인터페이스 내에서 특정 항목이 다른 항목 위로 이동할 때 수행되는 로직을 담고 있습니다.
      이 함수는 드래그 중인 항목(item)과 드롭 대상에 관한 정보(monitor)를 인자로 받습니다.

      함수의 작동 방식은 다음과 같습니다:

      현재 참조 요소 확인 (ref.current):
      if (!ref.current) { return; }: 이 조건은 현재 드래그되고 있는 요소가 실제로 존재하는지 확인합니다.
      만약 참조(ref.current)가 없다면, 함수는 아무것도 하지 않고 반환됩니다.

      드래그 항목과 호버 항목의 인덱스 확인:
      const dragIndex = item.index;
      const hoverIndex = props.index;:
      이 두 줄은 드래그 중인 항목의 인덱스(dragIndex)와 마우스 커서 아래 있는 항목(hoverIndex)의 인덱스를 가져옵니다.

      동일한 항목인지 확인:
      if (dragIndex === hoverIndex) return;: 만약 드래그 중인 항목과 호버 중인 항목이 같다면, 함수는 아무것도 하지 않고 반환됩니다.

      호버 중인 항목의 위치 계산:
      const hoverBoundingRect = ref.current?.getBoundingClientRect();: 현재 호버 중인 요소의 위치와 크기를 가져옵니다.
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;: 요소의 수직 중간 지점을 계산합니다.

      마우스 커서의 위치 계산:
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;: 마우스 커서의 Y 좌표를 계산합니다.

      드래그 항목과 호버 항목의 위치 바꾸기 결정:
      이 부분은 드래그 중인 항목과 호버 중인 항목의 상대적 위치를 비교하여 실제로 위치를 바꿀지를 결정합니다.
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;:
      이 조건들은 드래그 중인 항목이 호버 중인 항목의 위 또는 아래에 있을 때,
      그리고 마우스 커서의 위치가 항목의 중간 지점을 넘었는지 여부에 따라 항목의 위치를 변경할지 결정합니다.
      이 조건이 충족되지 않으면, 아직 항목을 바꿀 시점이 아니라는 의미이므로 함수는 아무 동작도 하지 않고 반환됩니다.

      카드의 위치 변경:
      props.moveCard(dragIndex, hoverIndex);
      : 조건이 충족되면, moveCard 함수가 호출되어 드래그 중인 항목과 호버 중인 항목의 위치를 변경합니다.

      드래그 항목의 인덱스 업데이트:
      item.index = hoverIndex;
      : 드래그 중인 항목의 인덱스를 업데이트하여 새로운 위치에 해당하는 인덱스로 설정합니다.
      이는 드래그 중인 항목이 새 위치로 옮겨진 후의 상태를 반영합니다.
      이 과정을 통해 사용자가 항목을 드래그하여 다른 위치로 옮길 때,
      적절한 순간에 항목의 위치가 변경되도록 보장합니다.
      */
    }
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: () => {
      return { id: props.id, index: props.index };
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging()
    })
  });

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));
  return (
    <div ref={ref} style={{ ...style, opacity }} data-handler-id={handlerId}>
      {props.text}
    </div>
  );
};
