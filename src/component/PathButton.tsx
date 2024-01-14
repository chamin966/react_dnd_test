import { useNavigate } from 'react-router-dom';

interface PathButtonProps {
  path: string;
  label: string;
}

function PathButton(props: PathButtonProps) {
  const navigate = useNavigate();
  return (
    <button className='h-20 bg-red' onClick={() => navigate(props.path)}>
      {props.label}
    </button>
  );
}

export default PathButton;
