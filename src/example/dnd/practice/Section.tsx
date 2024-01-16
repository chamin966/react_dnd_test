import Row, { IRow } from './Row';

export interface ISection {
  id: string;
  type: string;
  rows: IRow[];
  title: string;
}

interface SectionProps {
  id: string;
  type: string;
  rows: IRow[];
  title: string;
  parentFormId: string;
  index: number;
}

function Section(props: SectionProps) {
  return (
    <div
      style={{
        padding: '20px',
        backgroundColor: 'darkkhaki',
        border: '1px solid black'
      }}
    >
      {props.id}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px'
        }}
      >
        {props.rows.map((row, index) => (
          <Row
            key={row.id}
            id={row.id}
            type={row.type}
            columns={row.columns}
            parentSectionId={props.id}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}

export default Section;
