import { Fragment } from "react";
import { Link } from "react-router-dom";

const Login = (): JSX.Element => {
  return (
    <Fragment>
      <section>
        <h1>Login page!</h1>
        <p>Login form goes here</p>
        {/* Temporary style: Use tailwind later on */}
        <Link to="/" style={{ textDecoration: 'underline', color: 'blue' }}>Back to home page</Link>
      </section>
    </Fragment>
  );
}

export default Login;
