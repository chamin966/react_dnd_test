import type { CSSProperties, FC, ReactNode } from 'react';
import { useState } from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes } from './itemTypes';

function getStyle(backgroundColor: string): CSSProperties {
  return {
    border: '1px solid rgba(0,0,0,0.2)',
    minHeight: '8rem',
    minWidth: '8rem',
    color: 'white',
    backgroundColor: backgroundColor,
    padding: '2rem',
    paddingTop: '1rem',
    margin: '1rem',
    textAlign: 'center',
    float: 'left',
    fontSize: '1rem'
  };
}

export interface DustbinProps {
  greedy?: boolean;
  type: string;
  children?: ReactNode;
}

export interface DustbinState {
  hasDropped: boolean;
  hasDroppedOnChild: boolean;
}

export const Dustbin: FC<DustbinProps> = (props) => {
  const [hasDropped, setHasDropped] = useState(false);
  const [hasDroppedOnChild, setHasDroppedOnChild] = useState(false);

  const [{ isOver, isOverCurrent }, drop] = useDrop(
    () => ({
      accept: ItemTypes.BOX,
      drop(_item: unknown, monitor) {
        const didDrop = monitor.didDrop();
        console.log('monitor.isOver(): ', props.type, monitor.isOver());
        console.log(
          '{ shallow: true }: ',
          props.type,
          monitor.isOver({ shallow: true })
        );
        console.log('didDrop ', props.type, monitor.didDrop());
        if (didDrop && !props.greedy) {
          return;
        }
        setHasDropped(true);
        setHasDroppedOnChild(didDrop);
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        isOverCurrent: monitor.isOver({ shallow: true })
      })
    }),
    [props.greedy, setHasDropped, setHasDroppedOnChild]
  );

  const text = props.greedy ? 'greedy' : 'not greedy';
  let backgroundColor = 'rgba(0, 0, 0, .5)';
  if (isOverCurrent || (isOver && props.greedy)) {
    backgroundColor = 'darkgreen';
  }

  return (
    <div ref={drop} style={getStyle(backgroundColor)}>
      {text}
      <br />
      {hasDropped && <span>dropped {hasDroppedOnChild && ' on child'}</span>}

      <div>{props.children}</div>
    </div>
  );
};
