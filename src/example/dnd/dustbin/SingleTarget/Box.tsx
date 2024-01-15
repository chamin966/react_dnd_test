import { CSSProperties, FC } from 'react';
import { useDrag } from 'react-dnd';
import { ItemTypes } from '../../../../type/ItemType';

interface BoxProps {
  name: string;
}

interface DropResult {
  name: string;
}

const style: CSSProperties = {
  border: '1px dashed gray',
  backgroundColor: 'white',
  padding: '0.5rem 1rem',
  marginRight: '1.5rem',
  marginBottom: '1.5rem',
  cursor: 'move',
  float: 'left'
};

export const Box: FC<BoxProps> = function Box(props) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.BOX,
    item: { name: props.name },
    // 드랍 이벤트가 감지된 후 실행될 함수
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult<DropResult>();
      if (item && dropResult) {
        alert(`You dropped ${item.name} into ${dropResult.name}!`);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId()
    })
  }));

  const opacity = isDragging ? 0.4 : 1;
  return (
    <div ref={drag} style={{ ...style, opacity }}>
      {props.name}
    </div>
  );
};
