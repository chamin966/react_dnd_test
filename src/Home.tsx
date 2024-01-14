import PathButton from './component/PathButton';

function Home() {
  return (
    <div>
      <PathButton path={'/zustandTest'} label={'zustand Re-Rendering Test'} />
    </div>
  );
}

export default Home;
