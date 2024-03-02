import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import validator from 'validator';
import { saveAdminData } from '../../redux/reducers/adminSlice';
import logo from '../../logo.svg';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [formError, setFormError] = useState({
    email: ''
  });

  const [responseError, setResponseError] = useState('');

  const validateField = (name, value) => {
    let error = '';
  
    if (!value.trim()) {
      error = 'This field is required';
    } else {
      if (name === 'email') {
        if (!validator.isEmail(value.trim())) {
          error = 'Invalid email format';
        }
      }
    }
  
    return error;
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
  
    setFormData(prevState => ({ ...prevState, [name]: value }));
    setFormError(prevState => ({ ...prevState, [name]: validateField(name, value) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let errors = {};
  
    await Object.keys(formData).forEach((key) => {
      errors[key] = validateField(key, formData[key]);
    });
  
    await setFormError(errors);
    await setResponseError('');
    
    if (Object.values(errors).every(error => error.length === 0)) {
      try {
        const response = await axios.post(process.env.REACT_APP_API_ADDRESS + 'admin/login', formData, { withCredentials: true });
        
        dispatch(saveAdminData({email: response.data.email}));

        navigate('/admin/dashboard'); 
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setResponseError('Invalid email or password');
        } else {
          setResponseError('Unable to login');
        }
      }
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='w-full max-w-sm'>
        <div>
          <img src={logo} className="w-28 mb-2 mx-auto" alt="logo" />
          <h3 className="text-2xl font-semibold mb-8 text-center">Admin Login</h3>
        </div>
        <form className="flex flex-col" onSubmit={handleSubmit} noValidate>
          <div className='mb-4'>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              placeholder='Email'
              className={formError.email ? 'input-error' : ''}
              autoComplete='username'
            />
            <span className='error-message'>{formError.email}</span>
          </div>
          <div className='mb-4'>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              placeholder='Password'
              className={formError.password ? 'input-error' : ''}
              autoComplete='current-password'
            />
            <span className='error-message'>{formError.password}</span>
          </div>
          {responseError.length > 0 && <span className='error-message mb-4'>{responseError}</span>}
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;