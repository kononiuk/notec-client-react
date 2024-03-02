import logo from '../logo.svg';
import { Link } from 'react-router-dom';
import Nav from './Nav';
import UserDropdown from '../components/customer/UserDropdown';
import Minicart from '../components/minicart/Minicart';

function Header() {
  return (
    <header className="App-header">
      <div className="bg-zinc-200 flex justify-between items-stretch p-5">
        <div className="header-logo">
          <Link to="/"><img src={logo} className="w-28" alt="logo" /></Link>
        </div>
        <Nav />
        <div className="customer ml-auto">
          <UserDropdown /> 
        </div>
        <div className="minicart ml-2">
          <Minicart />
        </div>
      </div>
    </header>
  );
}
export default Header;