import Column, { IColumn } from './Column';

export interface IRow {
  id: string;
  type: string;
  columns: IColumn[];
}

interface RowProps {
  id: string;
  type: string;
  columns: IColumn[];
  parentSectionId: string;
  index: number;
}

function Row(props: RowProps) {
  return (
    <div
      style={{
        padding: '20px',
        backgroundColor: 'coral',
        border: '1px solid black'
      }}
    >
      {props.id} {props.parentSectionId}
      <div
        style={{
          display: 'flex',
          gap: '10px'
        }}
      >
        {props.columns.map((column, index) => (
          <Column
            key={column.id}
            id={column.id}
            type={column.type}
            controls={column.controls}
            parentSectionId={props.parentSectionId}
            parentRowId={props.id}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}

export default Row;
