import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedAdminPanel from './views/admin/ProtectedAdminPanel';
import Storefront from './views/Storefront';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className='App-content'>
      <BrowserRouter>
        <Routes>
          <Route path="/admin/*" element={<ProtectedAdminPanel />} />
          <Route path="/*" element={<Storefront />} />
        </Routes>
      </BrowserRouter>
      </div>
    </div>
  );
}

export default App;