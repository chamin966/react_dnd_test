import { CSSProperties, FC } from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes } from '../../../../type/ItemType';

const style: CSSProperties = {
  height: '12rem',
  width: '12rem',
  marginRight: '1.5rem',
  marginBottom: '1.5rem',
  color: 'white',
  padding: '1rem',
  textAlign: 'center',
  fontSize: '1rem',
  lineHeight: 'normal',
  float: 'left'
};
export interface DustbinProps {
  allowedDropEffect: string;
}

const selectBackgroundColor = (isActive: boolean, canDrop: boolean) => {
  if (isActive) return 'green';
  else if (canDrop) return 'blue';
  else return '#222';
};

export const Dustbin: FC<DustbinProps> = (props) => {
  const [{ canDrop, isOver }, drop] = useDrop(
    () => ({
      accept: ItemTypes.BOX,
      drop: () => ({
        name: `${props.allowedDropEffect} Dustbin`,
        allowedDropEffect: props.allowedDropEffect
      }),
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop()
      })
    }),
    [props.allowedDropEffect]
  );

  const isActive = canDrop && isOver;
  const backgroundColor = selectBackgroundColor(isActive, canDrop);
  return (
    <div ref={drop} style={{ ...style, backgroundColor: backgroundColor }}>
      {`Works with ${props.allowedDropEffect} drop effect`}
      <br />
      <br />
      {isActive ? 'Release to drop' : 'Drag a box here'}
    </div>
  );
};
