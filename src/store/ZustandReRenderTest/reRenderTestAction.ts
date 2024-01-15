import { useReRenderTest } from './reRendertTestStore';

export const dispatchFishCountUp = () => {
  useReRenderTest.setState((prev) => ({
    fish: prev.fish + 1
  }));
};

export const dispatchFishCountDown = () => {
  useReRenderTest.setState((prev) => ({
    fish: prev.fish - 1
  }));
};

export const dispatchBearCountUp = () => {
  useReRenderTest.setState((prev) => ({
    bear: prev.bear + 1
  }));
};
