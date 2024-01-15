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
  lineHeight: 'normal'
};

export const Dustbin: FC = () => {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.BOX,
    // 아래 drop 함수에서 반환한 객체는
    // useDrag hook의 monitor 상태 저장소에서 .getDropResult() 메서드를 통해 반환되는 값이 되는데,
    // 이는 드래그한 아이템이 어디에 드랍되었지 확인할 수 있게 해준다.
    drop: () => ({ name: 'DustBin' }),
    // 반환 배열의 첫번째 객체 값으로 바인딩됨.
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  }));

  const isActive = canDrop && isOver;
  let backgroundColor = '#222';
  if (isActive) backgroundColor = 'green';
  else if (canDrop) backgroundColor = 'blue';

  return (
    <div ref={drop} style={{ ...style, backgroundColor }} data-testid={'dustbin'}>
      {isActive ? 'Release to drop' : 'Drag a box here'}
    </div>
  );
};
