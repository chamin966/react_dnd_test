import { CSSProperties, FC } from 'react';
import { DragSourceMonitor, useDrag } from 'react-dnd';
import { ItemTypes } from '../../../../type/ItemType';

const style: CSSProperties = {
  border: '1px dashed gray',
  backgroundColor: 'white',
  padding: '0.5rem 1rem',
  marginRight: '1.5rem',
  marginBottom: '1.5rem',
  float: 'left'
};

export interface BoxProps {
  name: string;
}

interface DropResult {
  allowedDropEffect: string;
  dropEffect: string;
  name: string;
}

export const Box: FC<BoxProps> = (props) => {
  const [{ opacity }, drag] = useDrag(
    () => ({
      type: ItemTypes.BOX,
      item: { name: props.name },
      end(item, monitor) {
        const dropResult = monitor.getDropResult() as DropResult;
        if (item && dropResult) {
          let alertMessage = '';
          // monitor.getDropResult().dropEffect는 모니터 상태에 자동으로 기입된다.
          // dropResult.allowedDropEffect는 useDrop hook에서 작성한 드롭 대상이 허용할 드랍 효과를 나타내며,
          // dropResult.dropEffect는 실제로 발생한 드랍 효과를 나타냅니다.
          const isDropAllowed =
            dropResult.allowedDropEffect === 'any' || dropResult.allowedDropEffect === dropResult.dropEffect;
          if (isDropAllowed) {
            const isCopyAction = dropResult.dropEffect === 'copy';
            const actionName = isCopyAction ? 'copied' : 'moved';
            alertMessage = `You ${actionName} ${item.name} int ${dropResult.name}!`;
          } else {
            alertMessage = `You cannot ${dropResult.dropEffect} an item into the ${dropResult.name}`;
          }
          alert(alertMessage);
        }
      },
      collect: (monitor: DragSourceMonitor) => ({
        opacity: monitor.isDragging() ? 0.4 : 1
      })
    }),
    [props.name]
  );

  return (
    <div ref={drag} style={{ ...style, opacity: opacity }}>
      {props.name}
    </div>
  );
};
