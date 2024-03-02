import React, { useEffect } from 'react';
import { useNavigate, useLocation, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Login from './Login';
import Layout from './Layout';
import Dashboard from './Dashboard';
import Customers from './Customers';
import RedirectToAdmin from '../../components/admin/RedirectToAdmin';


const isAuthenticated = async () => {
  try {
    const response = await axios.get(process.env.REACT_APP_API_ADDRESS + 'admin/me', { withCredentials: true });
    return response.data.isLogin;
  } catch (error) {
    return false;
  }
};

const ProtectedAdminPanel = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const validateSession = async () => {
      const auth = await isAuthenticated();

      if (!auth) {
        navigate('/admin/login');
      } else if (auth && location.pathname === '/admin/login') {
        navigate('/admin/dashboard');
      } else {
        navigate(location.pathname);
      }
    };

    validateSession();
  }, [navigate, location.pathname]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="customers" element={<Customers />} />
        <Route path="*" element={<RedirectToAdmin />} />
      </Route>
      <Route path="login" element={<Login />} />
    </Routes>
  );
};

export default ProtectedAdminPanel;