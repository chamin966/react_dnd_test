import { DndProvider } from 'react-dnd';

import { HTML5Backend } from 'react-dnd-html5-backend';
import { Container } from './dustbin/multipleTarget.tsx/Container';
// import { Container } from './dustbin/SingleTarget/Container';

function Provider() {
  return (
    <DndProvider backend={HTML5Backend}>
      {/*<Container />*/}
      <Container />
    </DndProvider>
  );
}

export default Provider;
