import { useReRenderTest } from '../../store/ZustantReRenderTest/rerendertTestStore';
import _ from 'lodash';
import {
  dispatchBearCountUp,
  dispatchFishCountDown,
  dispatchFishCountUp
} from '../../store/ZustantReRenderTest/rerenderTestAction';
import { useEffect } from 'react';
import PathButton from '../../component/PathButton';

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
    console.log('함수가 실행 되었습니다.');
  };

  useEffect(() => {
    reRenderCallbackTest();
  }, [bear]);

  return (
    <div>
      <PathButton path={'/'} label={'홈으로'} />
      <div>fish: {fish}</div>
      <div>bear: {bear}</div>
      <button onClick={() => dispatchFishCountUp()}>Fish Up</button>
      <button onClick={() => dispatchFishCountDown()}>Fish Down</button>
      <button onClick={() => dispatchBearCountUp()}>Bear Up</button>
    </div>
  );
}

export default ZustandReRendering;
