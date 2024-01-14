import { useReRenderTest } from '../../store/ZustantReRenderTest/rerendertTestStore';
import _ from 'lodash';
import {
  dispatchBearCountUp,
  dispatchFishCountDown,
  dispatchFishCountUp
} from '../../store/ZustantReRenderTest/rerenderTestAction';
import { useEffect } from 'react';

function ZustandReRendering() {
  const fish = useReRenderTest(
    (state) => state.fish,
    (prevStore, nextStore) => _.isEqual(prevStore, nextStore)
  );
  const bear = useReRenderTest(
    (state) => state.bear,
    (prevStore, nextStore) => _.isEqual(prevStore, nextStore)
  );

  const reRenderCallbackTest = () => {
    console.log('렌더링 되었습니다.');
  };

  useEffect(() => {
    reRenderCallbackTest();
  }, [bear]);

  return (
    <div>
      <div>fish: {fish}</div>
      <div>bear: {bear}</div>
      <button onClick={() => dispatchFishCountUp()}>Fish Up</button>
      <button onClick={() => dispatchFishCountDown()}>Fish Down</button>
      <button onClick={() => dispatchBearCountUp()}>Bear Up</button>
    </div>
  );
}

export default ZustandReRendering;
