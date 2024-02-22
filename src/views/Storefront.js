import React  from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './storefront/Layout';
import Home from './storefront/Home';
import Category from './storefront/Category';
import Product from './storefront/Product';
import Login from './storefront/Login';
import Customer from './storefront/Customer';
import NoPage from './storefront/NoPage';
import AuthCheck from '../components/customer/AuthCheck';

const Storefront = () => {
  AuthCheck();

  return (
    <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="category/:url" element={<Category />} />
          <Route path="product/:url" element={<Product />} />
          <Route path="login" element={<Login />} />
          <Route path="customer" element={<Customer />} />
          <Route path="*" element={<NoPage />} />
        </Route>
    </Routes>
  );
};

export default Storefront;