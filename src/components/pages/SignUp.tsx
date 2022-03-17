import { Fragment } from "react";
import { Link } from "react-router-dom";

const SignUp = (): JSX.Element => {
  return (
    <Fragment>
      <section>
        <h1>Signup page!</h1>
        <p>Signup form goes here</p>
        {/* Temporary style: Use tailwind later on */}
        <Link to="/" style={{ textDecoration: 'underline', color: 'blue' }}>Back to home page</Link>
      </section>
    </Fragment>
  );
}

export default SignUp;
