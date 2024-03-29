import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './views/Layout';
import Home from './views/Home';
import Category from './views/Category';
import Product from './views/Product';
import Login from './views/Login';
import Customer from './views/Customer';
import NoPage from './views/NoPage';
import AuthCheck from './components/customer/AuthCheck';

function App() {
  return (
    <div className="App">
      <div className='App-content'>
      <BrowserRouter>
        <AuthCheck />
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
      </BrowserRouter>
      </div>
    </div>
  );
}

export default App;