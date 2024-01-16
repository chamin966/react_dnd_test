import { createWithEqualityFn } from 'zustand/traditional';

const formData = () => ({
  form: {
    id: 'form',
    sections: [
      {
        id: 'section-1',
        type: 'section',
        title: 'Section1',
        rows: [
          {
            id: 'row-1',
            type: 'row',
            columns: [
              {
                id: 'column-1',
                type: 'column',
                controls: ['con-1', 'con-2']
              },
              {
                id: 'column-2',
                type: 'column',
                controls: ['con-3', 'con-4']
              }
            ]
          },
          {
            id: 'row-2',
            type: 'row',
            columns: [
              {
                id: 'column-3',
                type: 'column',
                controls: ['con-5', 'con-6']
              },
              {
                id: 'column-4',
                type: 'column',
                controls: ['con-7', 'con-8']
              },
              {
                id: 'column-5',
                type: 'column',
                controls: ['con-9', 'con-10']
              }
            ]
          }
        ]
      },
      {
        id: 'section-2',
        type: 'section',
        title: 'Section2',
        rows: [
          {
            id: 'row-3',
            type: 'row',
            columns: [
              {
                id: 'column-6',
                type: 'column',
                controls: ['con-11', 'con-12']
              },
              {
                id: 'column-7',
                type: 'column',
                controls: ['con-13', 'con-14']
              }
            ]
          },
          {
            id: 'row-2',
            type: 'row',
            columns: [
              {
                id: 'column-8',
                type: 'column',
                controls: ['con-15', 'con-16']
              },
              {
                id: 'column-9',
                type: 'column',
                controls: ['con-17', 'con-18']
              }
            ]
          }
        ]
      }
    ]
  }
});

export const useFormData = createWithEqualityFn(formData);
