import { useNavigate } from 'react-router-dom';

export const useGoBack = () => {
  const navigate = useNavigate();

  return () => {
    if (history.state.idx === 0) {
      navigate('/');
    } else {
      navigate(-1);
    }
  };
};
