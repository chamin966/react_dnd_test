import type { CSSProperties, FC } from 'react';
import { memo, useCallback, useState } from 'react';
import type { DropTargetMonitor } from 'react-dnd';
import { useDrop } from 'react-dnd';

import { Colors } from './Colors';
import type { DragItem } from './interfaces';

const style: CSSProperties = {
  border: '1px solid gray',
  height: '15rem',
  width: '15rem',
  padding: '2rem',
  textAlign: 'center'
};

export interface TargetBoxProps {
  onDrop: (item: any) => void;
  lastDroppedColor?: string;
}

const TargetBox: FC<TargetBoxProps> = memo(function TargetBox(props) {
  const [{ isOver, draggingColor, canDrop }, drop] = useDrop(
    () => ({
      accept: [Colors.YELLOW, Colors.BLUE],
      drop(_item: DragItem, monitor) {
        props.onDrop(monitor.getItemType());
        return undefined;
      },
      collect: (monitor: DropTargetMonitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
        draggingColor: monitor.getItemType() as string
      })
    }),
    [props.onDrop]
  );

  const opacity = isOver ? 1 : 0.7;
  let backgroundColor = '#fff';
  switch (draggingColor) {
    case Colors.BLUE:
      backgroundColor = 'lightblue';
      break;
    case Colors.YELLOW:
      backgroundColor = 'lightgoldenrodyellow';
      break;
    default:
      break;
  }

  return (
    <div
      ref={drop}
      data-color={props.lastDroppedColor || 'none'}
      style={{ ...style, backgroundColor, opacity }}
      role='TargetBox'
    >
      <p>Drop here.</p>

      {!canDrop && props.lastDroppedColor && (
        <p>Last dropped: {props.lastDroppedColor}</p>
      )}
    </div>
  );
});

// 코드를 분리한 이유:
// 1. 코드 분리와 모듈화: TargetBox와 StatefulTargetBox를 분리함으로써 코드를 더 모듈화하고 각 컴포넌트를 개별적으로 관리할 수 있습니다. 이는 코드의 가독성과 유지 보수성을 향상시킵니다.
// 2. 재사용성: StatefulTargetBox를 분리하면 이 컴포넌트를 다른 부분에서 재사용할 수 있습니다. 즉, 동일한 동작을 하는 컴포넌트를 여러 곳에서 사용할 때 코드 중복을 피할 수 있습니다.
// 3. 단일 책임 원칙: 각 컴포넌트는 하나의 역할을 수행하도록 분리함으로써 단일 책임 원칙을 준수합니다. TargetBox는 드래그 앤 드롭 동작과 관련된 로직을 처리하고, StatefulTargetBox는 상태 관리와 관련된 로직을 처리합니다.

export interface StatefulTargetBoxState {
  lastDroppedColor: string | null;
}
export const StatefulTargetBox: FC = (props) => {
  const [lastDroppedColor, setLastDroppedColor] = useState<string | null>(null);
  const handleDrop = useCallback(
    (color: string) => setLastDroppedColor(color),
    []
  );

  return (
    <TargetBox
      {...props}
      lastDroppedColor={lastDroppedColor as string}
      onDrop={handleDrop}
    />
  );
};
