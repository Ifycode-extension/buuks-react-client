import { Fragment, ReactElement } from 'react';
import { Link } from 'react-router-dom';

const NotFound = (): ReactElement => {
  return (
    <Fragment>
      <section>
        <h1>Page not found - 404</h1>
        <Link to="/" className="text-pink-800 underline">Back to home page</Link>
      </section>
    </Fragment>
  );
}

export default NotFound;