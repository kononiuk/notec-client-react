import { Outlet } from "react-router-dom";
import Header from '../components/Header';
import Footer from '../components/Footer';
import Messages from '../components/Messages';

const Layout = () => {
  return (
    <div className="page-wrapper flex flex-col items-stretch min-h-screen">
      <Header />

      <div className="main-content grow relative">
        <Messages />
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};

export default Layout;