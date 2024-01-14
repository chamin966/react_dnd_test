import { createWithEqualityFn } from 'zustand/traditional';

const reRenderTest = (): { fish: number; bear: number } => ({
  fish: 0,
  bear: 1
});

export const useReRenderTest = createWithEqualityFn(reRenderTest);
