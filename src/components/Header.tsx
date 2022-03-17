import { Fragment } from "react";
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';

const Header = (): JSX.Element => {
  const location = useLocation();
  const homePage = location.pathname === '/' || location.pathname === '/home';
  return (
    <Fragment>
      <header style={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Temporary style: Use tailwind later on */}
        {!homePage &&
          <Link to="/" style={{ textDecoration: 'underline', color: 'blue' }}>Buuks Home</Link>
        }
        {homePage &&
          <Fragment>
            <Link to="/signup" style={{ textDecoration: 'underline', color: 'blue' }}>Signup page</Link>
            <Link to="/login" style={{ textDecoration: 'underline', color: 'blue' }}>Login page</Link>
            <Link to="/books" style={{ textDecoration: 'underline', color: 'blue' }}>User Account books page</Link>
          </Fragment>
        }
      </header>
    </Fragment>
  );
}

export default Header;
