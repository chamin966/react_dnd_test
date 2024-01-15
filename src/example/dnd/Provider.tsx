import { DndProvider } from 'react-dnd';

import { HTML5Backend } from 'react-dnd-html5-backend';
import DragAround from './dragAround/DragAround';
// import { Container } from './dustbin/copyAndMove/Container';
// import { Container } from './dustbin/multipleTarget.tsx/Container';
// import { Container } from './dustbin/SingleTarget/Container';

function Provider() {
  return (
    <DndProvider backend={HTML5Backend}>
      {/*<Container />*/}
      {/*<Container />*/}
      {/*<Container />*/}
      <DragAround />
    </DndProvider>
  );
}

export default Provider;
