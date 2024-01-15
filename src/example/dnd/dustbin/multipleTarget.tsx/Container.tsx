import { FC, memo, useCallback, useState } from 'react';
import { ItemTypes } from '../../../../type/ItemType';
import { NativeTypes } from 'react-dnd-html5-backend';
import { Dustbin } from './Dustbin';
import { Box } from './Box';
import update from 'immutability-helper';

interface DustbinState {
  accepts: string[];
  lastDroppedItem: any;
}

interface BoxState {
  name: string;
  type: string;
}

export interface DustbinSpec {
  accepts: string[];
  lastDroppedItem: any;
}
export interface BoxSpec {
  name: string;
  type: string;
}
export interface ContainerState {
  droppedBoxNames: string[];
  dustbins: DustbinSpec[];
  boxes: BoxSpec[];
}

export const Container: FC = memo(function Container() {
  const [dustbins, setDustbins] = useState<DustbinState[]>([
    { accepts: [ItemTypes.GLASS], lastDroppedItem: null },
    { accepts: [ItemTypes.FOOD], lastDroppedItem: null },
    {
      accepts: [ItemTypes.PAPER, ItemTypes.GLASS, NativeTypes.URL],
      lastDroppedItem: null
    },
    { accepts: [ItemTypes.PAPER, NativeTypes.FILE], lastDroppedItem: null }
  ]);

  const [boxes] = useState<BoxState[]>([
    { name: 'Bottle', type: ItemTypes.GLASS },
    { name: 'Banana', type: ItemTypes.FOOD },
    { name: 'Magazine', type: ItemTypes.PAPER }
  ]);

  const [droppedBoxNames, setDroppedBoxNames] = useState<string[]>([]);

  function isDropped(boxName: string) {
    return droppedBoxNames.indexOf(boxName) > -1;
  }

  const handleDrop = useCallback(
    (index: number, item: { name: string }) => {
      // React DnD는 useDrop 훅을 통해 드랍 영역(Drop Target)을 설정할 때
      // drop 프로퍼티로 콜백 함수를 전달합니다.
      // 이 콜백 함수는 실제 드랍이 발생했을 때 호출되며,
      // 그때 item 매개변수에 해당 아이템이 전달됩니다.
      // 따라서 props.onDrop 콜백 함수 내에서 item 을 얻으려면 실제 드랍이 발생해야 합니다.
      const { name } = item;
      setDroppedBoxNames(update(droppedBoxNames, name ? { $push: [name] } : { $push: [] }));
      setDustbins(
        update(dustbins, {
          [index]: {
            lastDroppedItem: {
              $set: item
            }
          }
        })
      );
    },
    [droppedBoxNames, dustbins]
  );

  return (
    <div>
      <div style={{ overflow: 'hidden', clear: 'both' }}>
        {dustbins.map(({ accepts, lastDroppedItem }, index) => (
          <Dustbin
            accept={accepts}
            lastDroppedItem={lastDroppedItem}
            // 이 함수는 React DnD에 의해 호출될 때
            // useDrag hook에서 정의한 item 명세가 매개변수로써 handleDrop에 전달됩니다.
            // 즉, useDrop의 drop 프로퍼티의 props.onDrop을
            // 호출하는 부분은 {(item) => handleDrop(index, item)}입니다.
            onDrop={(item) => handleDrop(index, item)}
            key={index}
          />
        ))}
      </div>

      <div style={{ overflow: 'hidden', clear: 'both' }}>
        {boxes.map(({ name, type }, index) => (
          <Box name={name} type={type} isDropped={isDropped(name)} key={index} />
        ))}
      </div>
    </div>
  );
});
