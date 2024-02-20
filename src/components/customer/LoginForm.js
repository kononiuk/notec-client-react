import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import Cookies from 'js-cookie';
import validator from 'validator';
import { addMessage } from '../../redux/reducers/messagesSlice';
import { saveCustomerData } from '../../redux/reducers/customerSlice';

const LoginForm = () => {
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
  
    if (!value) {
      error = 'This field is required';
    } else if (name === 'email') {
      if (!validator.isEmail(value)) {
        error = 'Invalid email format';
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
    
    if (Object.values(formError).every(error => error.length === 0)) {
      try {
        const response = await axios.post(process.env.REACT_APP_API_ADDRESS + 'customers/login', formData);

        const { customer, token } = response.data;
        const { email, firstname, lastname } = customer;
        
        dispatch(saveCustomerData({ email, firstname, lastname }));

        Cookies.set('authDetails', token.token, { expires: new Date(token.expiresAt) });

        dispatch(addMessage({ type: 'success', text: 'Login successfully!' }));

        setTimeout(() => {
          navigate('/customer'); 
        }, 1000);
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
    <div className='w-full max-w-sm'>
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
  );
};

export default LoginForm;
