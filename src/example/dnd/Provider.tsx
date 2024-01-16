import { DndProvider } from 'react-dnd';

import { HTML5Backend } from 'react-dnd-html5-backend';
// import { Container } from './Customize/Container';
import { Container } from './sortable/Container';
// import { Container } from './nesting/dropTargets/Container';
// import { Container } from './nesting/dragSources/Container';
// import DragAround from './dragAround/DragAround';
import Form from './practice/Form';
// import { Container } from './dustbin/copyAndMove/Container';
// import { Container } from './dustbin/multipleTarget.tsx/Container';
// import { Container } from './dustbin/SingleTarget/Container';

function Provider() {
  return (
    <DndProvider backend={HTML5Backend}>
      {/*<Container />*/}
      {/*<Container />*/}
      {/*<Container />*/}
      {/*<DragAround />*/}
      <Form />
      {/*<Container />*/}
      {/*<Container />*/}
      {/*<Container />*/}
      {/*<Container />*/}
    </DndProvider>
  );
}

export default Provider;
