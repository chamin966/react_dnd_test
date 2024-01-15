import { CSSProperties, useCallback, useState } from 'react';
import update from 'immutability-helper';
import { useDrop, XYCoord } from 'react-dnd';
import { ItemTypes } from '../../../type/ItemType';
import { DragItem } from '../../../interface/interfaces';
import Box from './Box';

const styles: CSSProperties = {
  width: 300,
  height: 300,
  border: '1px solid black',
  // position 주의!
  position: 'relative'
};

export interface boxesState {
  [key: string]: { top: number; left: number; title: string };
}

export interface ContainerState {
  boxes: boxesState;
}

export interface ContainerProps {
  hideSourceOnDrag: boolean;
}

export default function Container(props: ContainerProps) {
  const [boxes, setBoxes] = useState<boxesState>({
    a: { top: 20, left: 80, title: 'Drag me around' },
    b: { top: 180, left: 20, title: 'Drag me too' }
  });

  const moveBox = useCallback(
    (id: string, left: number, top: number) => {
      setBoxes(
        update(boxes, {
          [id]: {
            $merge: { left, top }
          }
        })
      );
    },
    [boxes, setBoxes]
  );

  const [, drop] = useDrop(
    () => ({
      accept: ItemTypes.BOX
      // drop(item: DragItem, monitor) {
      //   const delta = monitor.getDifferenceFromInitialOffset() as XYCoord;
      //   const left = Math.round(item.left + delta.x);
      //   const top = Math.round(item.top + delta.y);
      //   moveBox(item.id, left, top);
      //   return undefined;
      // }
    }),
    [moveBox]
  );

  return (
    <div ref={drop} style={styles}>
      {Object.keys(boxes).map((key) => {
        const { left, top, title } = boxes[key] as {
          top: number;
          left: number;
          title: string;
        };
        return (
          <Box key={key} id={key} left={left} top={top} hideSourceOnDrag={props.hideSourceOnDrag}>
            {title}
          </Box>
        );
      })}
    </div>
  );
}
