import { useDrop } from 'react-dnd';
import { ItemTypes } from './itemTypes';
import { dispatchEmptyDropTarget } from '../../../store/formData/formDataAction';
import { CSSProperties } from 'react';

const getStyle = (isOver: boolean): CSSProperties => {
  return {
    border: isOver ? '1px dashed black' : 'none',
    padding: '0.5rem',
    height: '50px',
    backgroundColor: isOver ? 'blue' : 'transparent'
  };
};

interface PlaceholderProps {
  dropTargetId: string;
}

function Placeholder(props: PlaceholderProps) {
  const [{ isOver }, drop] = useDrop({
    accept: [ItemTypes.CONTROL],
    collect: (monitor) => ({
      isOver: monitor.isOver()
    }),
    hover: (item) => {
      console.log('플레이스홀더에 들어온 item:', item);
      return;
    },
    drop: (item) => {
      console.log('드랍된 item:', item);
      dispatchEmptyDropTarget(item, props.dropTargetId);
    }
  });

  console.log('isOver: ', isOver);

  return <div ref={drop} style={{ ...getStyle(isOver) }} />;
}

export default Placeholder;
