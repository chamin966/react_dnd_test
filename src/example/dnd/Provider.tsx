import { DndProvider } from 'react-dnd';
import SingleTarget from './dustbin/SingleTarget';
import { HTML5Backend } from 'react-dnd-html5-backend';

function Provider() {
  return (
    <DndProvider backend={HTML5Backend}>
      <SingleTarget />
    </DndProvider>
  );
}

export default Provider;
