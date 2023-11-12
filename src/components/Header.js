import logo from '../logo.svg';
import Nav from './Nav';
import { Link } from 'react-router-dom';
import { UserIcon, ShoppingCartIcon } from '@heroicons/react/24/outline'

function Header() {
  return (
    <header className="App-header">
      <div className="bg-zinc-200 flex justify-between items-stretch p-5">
        {/* Header Logo */}
        <div className="header-logo">
          <Link to="/"><img src={logo} className="App-logo w-28" alt="logo" /></Link>
        </div>
        {/* Navigation Component */}
        <Nav />
        {/* Customer Link */}
        <div className="customer ml-auto">
          <Link to="/" className="w-full h-full flex items-center">
            <UserIcon className="h-6 w-6 text-black" />
          </Link>
        </div>
        {/* Mini Cart */}
        <div className="minicart ml-2" id="minicart">
          <Link to="/" className="w-full h-full flex items-center">
            <ShoppingCartIcon className="h-6 w-6 text-black" />
          </Link>
        </div>
      </div>
    </header>
  );
}
export default Header;