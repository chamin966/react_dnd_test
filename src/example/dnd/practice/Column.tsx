import Control from './Control';

interface ColumnProps {
  id: string;
  type: string;
  controls: string[];
}

export interface IColumn {
  id: string;
  type: string;
  controls: string[];
}

function Column(props: ColumnProps) {
  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        gap: '10px',
        border: '1px solid black',
        padding: '20px',
        backgroundColor: 'blue'
      }}
    >
      {props.controls.map((control: string) => (
        <Control key={control} id={control} />
      ))}
    </div>
  );
}

export default Column;
