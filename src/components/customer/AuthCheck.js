import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import Cookies from 'js-cookie';
import { saveCustomerData } from '../../redux/reducers/customerSlice';

function AuthCheck() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const authDetails = Cookies.get('authDetails');

    if (authDetails) {
      axios.get(process.env.REACT_APP_API_ADDRESS + 'customers/me', {
        headers: {
          Authorization: `Bearer ${authDetails}`
        }
      })
      .then(response => {
        if(response.data.error) {
          throw new Error(response.data.error);
        }
        
        const { email, firstname, lastname } = response.data;
        dispatch(saveCustomerData({ email, firstname, lastname }));

        if (location.pathname === '/login') {
          navigate('/customer');
        }
      })
      .catch((e) => {
        Cookies.remove('authDetails');

        if (location.pathname === '/customer') {
          navigate('/login');
        }
      });
    } else {
      if (location.pathname === '/customer') {
        navigate('/login');
      }
    }
  }, [dispatch, location.pathname, navigate]);

  return null;
}

export default AuthCheck;