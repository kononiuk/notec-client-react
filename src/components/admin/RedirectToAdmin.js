import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RedirectToAdmin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/admin');
  }, [navigate]);

  return null;
};

export default RedirectToAdmin;