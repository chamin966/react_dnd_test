import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { dispatchControlMove } from './formDataAction';

const formData = () => ({
  form: {
    id: 'form',
    sections: [
      {
        id: 'section-1',
        rows: [
          {
            id: 'row-1',
            columns: [
              {
                id: 'column-1',
                controls: ['con-1', 'con-2']
              },
              {
                id: 'column-2',
                controls: ['con-3', 'con-4']
              }
            ]
          },
          {
            id: 'row-2',
            columns: [
              {
                id: 'column-3',
                controls: ['con-5', 'con-6']
              },
              {
                id: 'column-4',
                controls: ['con-7', 'con-8']
              },
              {
                id: 'column-5',
                controls: ['con-9', 'con-10']
              }
            ]
          }
        ]
      },
      {
        id: 'section-2',
        rows: [
          {
            id: 'row-3',
            columns: [
              {
                id: 'column-6',
                controls: ['con-11', 'con-12']
              },
              {
                id: 'column-7',
                controls: ['con-13', 'con-14']
              }
            ]
          },
          {
            id: 'row-4',
            columns: [
              {
                id: 'column-8',
                controls: ['con-15', 'con-16']
              },
              {
                id: 'column-9',
                controls: ['con-17', 'con-18']
              }
            ]
          }
        ]
      }
    ]
  }
});

export const useFormData = create(
  immer(() => ({ ...formData(), dispatchControlMove: dispatchControlMove }))
);
