import type { FC } from 'react';

import { Box } from './Box';
import { Dustbin } from './Dustbin';

export const Container: FC = () => (
  <div>
    <div style={{ overflow: 'hidden', clear: 'both', margin: '-1rem' }}>
      <Dustbin greedy={true} type={'A'}>
        <Dustbin greedy={true} type={'B'}>
          <Dustbin greedy={true} type={'C'} />
        </Dustbin>
      </Dustbin>
      <Dustbin type={'A'}>
        <Dustbin type={'B'}>
          <Dustbin type={'C'} />
        </Dustbin>
      </Dustbin>
    </div>

    <div style={{ overflow: 'hidden', clear: 'both', marginTop: '1.5rem' }}>
      <Box />
    </div>
  </div>
);
