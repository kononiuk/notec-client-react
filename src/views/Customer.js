import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import Cookies from 'js-cookie';
import { saveCustomerData } from '../redux/reducers/customerSlice';
import { Tabs } from '@mui/base/Tabs';
import { TabsList } from '@mui/base/TabsList';
import { TabPanel } from '@mui/base/TabPanel';
import { Tab } from '@mui/base/Tab';

function CustomerDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const customer = useSelector((state) => state.customer);
  const handleLogoutAll = async () => {
    try {
      const token = Cookies.get('authDetails');
      await axios.post(process.env.REACT_APP_API_ADDRESS + 'customers/logoutAll', {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      Cookies.remove('authDetails');
      dispatch(saveCustomerData({}));
      navigate('/');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <h3 className="text-2xl font-semibold mb-2">Dashboard</h3>
      <p>Email: {customer.email}</p>
      <p>First Name: {customer.firstname}</p>
      <p>Last Name: {customer.lastname}</p>
      <div className="mt-4">
        <button onClick={handleLogoutAll}>Logout All</button>
      </div>
    </div>
  );
}

function CustomerOrders() {
  return (
    <div>
      <h3 className="text-2xl font-semibold mb-2">Orders</h3>
    </div>
  );
}

function Customer() {
  const [activeTab, setActiveTab] = useState(0);
  const tabStyle = "bg-transparent shadow-none text-black text-lg rounded-none border-0 border-b-2 border-transparent hover:bg-transparent";
  const activeTabStyle = "border-black";
  const panelStyle = "px-4 py-8";

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <div className="max-w-7xl px-5 mx-auto my-10">
      <Tabs defaultValue={0} onChange={handleTabChange}>
        <TabsList>
        <Tab value={0} className={`${tabStyle} ${activeTab === 0 ? activeTabStyle : ''}`}>Dashboard</Tab>
          <Tab value={1} className={`${tabStyle} ${activeTab === 1 ? activeTabStyle : ''}`}>Orders</Tab>
        </TabsList>
        <TabPanel value={0} className={ panelStyle }>< CustomerDashboard /></TabPanel>
        <TabPanel value={1} className={ panelStyle }>< CustomerOrders /></TabPanel>
      </Tabs>
    </div>
  );
}

export default Customer;