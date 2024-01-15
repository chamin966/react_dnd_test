import { CSSProperties, FC, memo } from 'react';
import { useDrag } from 'react-dnd';

const style: CSSProperties = {
  border: '1px dashed gray',
  backgroundColor: 'white',
  padding: '0.5rem 1rem',
  marginRight: '1.5rem',
  marginBottom: '1.5rem',
  cursor: 'move',
  float: 'left'
};

export interface BoxProps {
  name: string;
  type: string;
  isDropped: boolean;
}

export const Box: FC<BoxProps> = memo(function Box(props) {
  const [{ opacity }, drag] = useDrag(
    () => ({
      type: props.type,
      // 아래의 아이템 명세는 useDrop hook 에서
      // 해당 아이템이 드랍될 시 사용됩니다.
      item: { name: props.name },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.4 : 1
      })
    }),
    [props.name, props.type]
  );

  return (
    <div ref={drag} style={{ ...style, opacity: opacity }} data-testid={'box'}>
      {props.isDropped ? <s>{props.name}</s> : props.name}
    </div>
  );
});
