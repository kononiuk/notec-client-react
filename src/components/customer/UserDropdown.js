import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import Cookies from 'js-cookie';
import { saveCustomerData } from '../../redux/reducers/customerSlice';
import { UserIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import { Popper } from '@mui/base/Popper';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';

function UserDropdown() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const customerData = useSelector(state => state.customer);
  const [anchorEl, setAnchorEl] = useState(null);
  
  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  let open = Boolean(anchorEl);
  let id = open ? 'simple-popper' : undefined;
  
  function logout() {
    const token = Cookies.get('authDetails');
  
    if (token) {
      axios.post(process.env.REACT_APP_API_ADDRESS + 'customers/logout', { token })
      .then(response => {
        Cookies.remove('authDetails');
        dispatch(saveCustomerData({}));
        navigate('/');
      })
      .catch(error => {
        console.error('Error during logout:', error);
      });
    }
  }

  if (Object.keys(customerData).length > 0) {
    return (
      <div className='relative w-full h-full flex items-center'>
        <ClickAwayListener onClickAway={handleClose}>
          <div>
            <UserIcon className="h-6 w-6 text-black cursor-pointer z-50" onClick={handleClick} />
            <Popper
              id={id}
              open={open}
              anchorEl={anchorEl}
            >
              <div className="absolute top-[calc(100%+1.5rem)] right-0 z-50 min-w-32 p-4 pl-8 bg-white shadow-md flex flex-col items-end">
                <Link to="/customer" className='mb-2'>My Profile</Link>
                <span className="cursor-pointer" onClick={logout}>Logout</span>
              </div>
            </Popper>
          </div>
        </ClickAwayListener>
      </div>
    );
  } else {
    return <Link to="/login" className="relative w-full h-full flex items-center">
      <ArrowRightOnRectangleIcon className="h-6 w-6 text-black cursor-pointer z-50" />
    </Link>;
  }
}

export default UserDropdown;