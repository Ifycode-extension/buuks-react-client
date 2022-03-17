import { Fragment } from "react";
import { Link } from "react-router-dom";

const Home = (): JSX.Element => {
  return (
    <Fragment>
      <section>
        <h1>Home page!</h1>
        <p>Home page content goes here later, but for now, let's just make every page link available here.</p>
        {/* Temporary style: Use tailwind later on */}
        <Link to="/" style={{ textDecoration: 'underline', color: 'blue', display: 'block' }}>Buuks App home page</Link>
        <Link to="/signup" style={{ textDecoration: 'underline', color: 'blue', display: 'block' }}>Signup page</Link>
        <Link to="/login" style={{ textDecoration: 'underline', color: 'blue', display: 'block' }}>Login page</Link>
        <Link to="/books" style={{ textDecoration: 'underline', color: 'blue', display: 'block' }}>User Account books page</Link>
      </section>
    </Fragment>
  );
}

export default Home;
