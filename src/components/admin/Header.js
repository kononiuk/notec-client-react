import logo from '../../logo.svg';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="App-header">
      <div className="bg-zinc-200 flex justify-start items-stretch p-5">
        <div className="header-logo">
          <Link to="/"><img src={logo} className="w-28" alt="logo" /></Link>
        </div>
        <h1 className='text-2xl font-semibold ml-2'>Admin</h1>
      </div>
    </header>
  );
}
export default Header;