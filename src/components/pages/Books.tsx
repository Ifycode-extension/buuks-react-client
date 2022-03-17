import { Fragment } from "react";
import { Link } from "react-router-dom";

const Books = (): JSX.Element => {
  return (
    <Fragment>
      <section>
        <h1>Books page!</h1>
        <p>Books content goes here</p>
        {/* Temporary style: Use tailwind later on */}
        <Link to="/" style={{ textDecoration: 'underline', color: 'blue' }}>Back to home page</Link>
      </section>
    </Fragment>
  );
}

export default Books;
