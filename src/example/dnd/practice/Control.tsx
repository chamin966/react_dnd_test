export interface ControlProps {
  id: string;
}

function Control(props: ControlProps) {
  return (
    <div
      style={{
        height: '50px',
        backgroundColor: 'burlywood',
        border: '1px solid black',
        padding: '10px'
      }}
    >
      {props.id}
    </div>
  );
}

export default Control;
