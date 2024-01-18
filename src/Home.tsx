import PathButton from './component/PathButton';

function Home() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '20rem',
        gap: '20px'
      }}
    >
      <PathButton path={'/zustandTest'} label={'zustand Re-Rendering Test'} />
      <PathButton path={'/provider'} label={'dnd example'} />
    </div>
  );
}

export default Home;
