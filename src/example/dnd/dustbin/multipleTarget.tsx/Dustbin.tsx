import { CSSProperties, FC, memo } from 'react';
import { useDrop } from 'react-dnd';

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
  accept: string[];
  lastDroppedItem?: any;
  onDrop: (item: any) => void;
}

export const Dustbin: FC<DustbinProps> = memo(function Dustbin(props) {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: props.accept,
    // 여기서 drop 프로퍼티에 props.onDrop 으로 콜백 함수가 전달되었고,
    // 이 함수는 드랍이 발생할 때 호출됩니다.
    // useDrop 훅 내부에서 React DnD가 관리하는 동작에 따라 item 이 전달되며,
    // props.onDrop 함수에서는 이 item 을 사용할 수 있습니다.
    // 따라서 props.onDrop 콜백 함수 내에서는 item 을 얻기 위해
    // 별도의 작업이 필요하지 않고,
    // React DnD 라이브러리가 내부적으로 처리합니다.
    // 사용자는 단순히 props.onDrop 함수를 호출하면 됩니다.
    drop: props.onDrop,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  });

  const isActive = isOver && canDrop;
  let backgroundColor = '#222';
  if (isActive) {
    backgroundColor = 'green';
  } else if (canDrop) {
    backgroundColor = 'blue';
  }

  return (
    <div ref={drop} style={{ ...style, backgroundColor }} data-testid={'dustbin'}>
      {isActive ? 'Release to drop' : `This dustbin accept: ${props.accept.join(',')}`}
      {props.lastDroppedItem && <p>Last dropped: {JSON.stringify(props.lastDroppedItem)}</p>}
    </div>
  );
});
