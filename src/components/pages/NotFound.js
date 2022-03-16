import { Fragment } from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <Fragment>
      <section>
        <h1>Page not found - 404</h1>
        {/* Temporary style: Use tailwind later on */}
        <Link to="/" style={{ textDecoration: 'underline', color: 'blue' }}>Back to home page</Link>
      </section>
    </Fragment>
  );
}

export default NotFound;