import logo from '../logo.svg';
import { Link } from 'react-router-dom';
import { UserIcon } from '@heroicons/react/24/outline';
import Nav from './Nav';
import UserDropdown from '../components/customer/UserDropdown';
import Minicart from '../components/minicart/Minicart';

function Header() {
  const isLoggedIn = true; // Replace with your login logic

  return (
    <header className="App-header">
      <div className="bg-zinc-200 flex justify-between items-stretch p-5">
        <div className="header-logo">
          <Link to="/"><img src={logo} className="w-28" alt="logo" /></Link>
        </div>
        <Nav />
        <div className="customer ml-auto">
          {isLoggedIn ? <UserDropdown /> : <Link to="/login" className="w-full h-full flex items-center"><UserIcon className="h-6 w-6 text-black" /></Link>}
        </div>
        <div className="minicart ml-2">
          <Minicart />
        </div>
      </div>
    </header>
  );
}
export default Header;