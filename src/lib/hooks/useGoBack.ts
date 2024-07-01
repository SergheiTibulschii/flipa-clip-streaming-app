import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';

export const useGoBack = () => {
  const navigate = useNavigate();

  return useCallback(() => {
    if (history.state.idx === 0) {
      navigate('/');
    } else {
      navigate(-1);
    }
  }, [navigate]);
};
