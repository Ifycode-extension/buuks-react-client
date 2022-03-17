import { Fragment } from "react";
import { Link } from "react-router-dom";

const Header = (): JSX.Element => {
  return (
    <Fragment>
      <header style={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* <h1 className="text-3xl font-bold underline">Header: Buuks React Client!</h1> */}
        {/* Temporary style: Use tailwind later on */}
        <Link to="/" style={{ textDecoration: 'underline', color: 'blue' }}>Buuks App home page</Link>
        <Link to="/signup" style={{ textDecoration: 'underline', color: 'blue' }}>Signup page</Link>
        <Link to="/login" style={{ textDecoration: 'underline', color: 'blue' }}>Login page</Link>
        <Link to="/books" style={{ textDecoration: 'underline', color: 'blue' }}>User Account books page</Link>
      </header>
    </Fragment>
  );
}

export default Header;
