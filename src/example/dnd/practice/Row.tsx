import Column, { IColumn } from './Column';

interface RowProps {
  id: string;
  type: string;
  columns: IColumn[];
}

export interface IRow {
  id: string;
  type: string;
  columns: IColumn[];
}

function Row(props: RowProps) {
  return (
    <div
      style={{
        display: 'flex',
        gap: '10px',
        padding: '20px',
        backgroundColor: 'yellow',
        border: '1px solid black'
      }}
    >
      {props.columns.map((column) => (
        <Column
          key={column.id}
          id={column.id}
          type={column.type}
          controls={column.controls}
        />
      ))}
    </div>
  );
}

export default Row;
