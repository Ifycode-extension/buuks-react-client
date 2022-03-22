import { Fragment, ReactElement } from "react";
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';

const Header = (): ReactElement => {
  const location = useLocation();
  const homePage = location.pathname === '/' || location.pathname === '/home';
  return (
    <header className="flex justify-between text-lg md:text-xl py-4">
      <div>
        <Link to="/" className="text-pink-800 text-xl md:text-2xl">Buuks App Logo</Link>
      </div>
      <nav>
        {!homePage &&
          <Link to="/" className="text-pink-800 underline">Buuks Home</Link>
        }
        {homePage &&
          <Fragment>
            <Link to="/signup" className="text-pink-800 underline">Signup page</Link>
            <Link to="/login" className="ml-3 text-pink-800 underline">Login page</Link>
          </Fragment>
        }
      </nav>
    </header>
  );
}

export default Header;
