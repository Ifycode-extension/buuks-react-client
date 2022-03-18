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
        <div>
          <Link to="/" style={{ color: 'blue' }}>Buuks App Logo</Link>
        </div>
        <nav>
          {!homePage &&
            <Link to="/" style={{ textDecoration: 'underline', color: 'blue' }}>Buuks Home</Link>
          }
          {homePage &&
            <Fragment>
              <Link to="/signup" style={{ textDecoration: 'underline', color: 'blue' }}>Signup page</Link>
              <Link to="/login" style={{ textDecoration: 'underline', color: 'blue', marginLeft: '10px' }}>Login page</Link>
            </Fragment>
          }
        </nav>
      </header>
    </Fragment>
  );
}

export default Header;
