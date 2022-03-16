import { Fragment } from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Fragment>
      <section>
        <h1>Page not found - 404</h1>
        <Link to="/">Back to home page</Link>
      </section>
    </Fragment>
  );
}

export default NotFound;