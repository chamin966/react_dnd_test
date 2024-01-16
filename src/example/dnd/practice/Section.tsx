import Row, { IRow } from './Row';

interface SectionProps {
  id: string;
  type: string;
  rows: IRow[];
  title: string;
}

export interface ISection {
  id: string;
  type: string;
  rows: IRow[];
  title: string;
}

function Section(props: SectionProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        padding: '20px',
        backgroundColor: 'green',
        border: '1px solid black'
      }}
    >
      {props.rows.map((row) => (
        <Row key={row.id} id={row.id} type={row.type} columns={row.columns} />
      ))}
    </div>
  );
}

export default Section;
