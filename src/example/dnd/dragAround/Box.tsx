import { CSSProperties, ReactNode } from 'react';
import { useDrag } from 'react-dnd';
import { ItemTypes } from '../../../type/ItemType';

const style: CSSProperties = {
  // position 속성에 주의!
  position: 'absolute',
  border: '1px dashed gray',
  backgroundColor: 'white',
  padding: '0.5rem 1rem',
  cursor: 'move'
};

export interface BoxProps {
  id: any;
  left: number;
  top: number;
  hideSourceOnDrag?: boolean;
  children?: ReactNode;
}

export default function Box(props: BoxProps) {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.BOX,
      item: { id: props.id, left: props.left, top: props.top },
      collect: (monitor) => ({
        isDragging: monitor.isDragging()
      })
    }),
    [props.id, props.left, props.top]
  );

  //Hide the source item while dragging 을 적용시키는 부분
  if (isDragging && props.hideSourceOnDrag) {
    return <div ref={drag} />;
  }

  return (
    <div className='Box' ref={drag} style={{ ...style, left: props.left, top: props.top }} data-testif={'box'}>
      {props.children}
    </div>
  );
}
