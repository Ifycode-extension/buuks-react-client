import { Fragment } from 'react';
import { AuthContainer } from '../../hooks/auth';

const Login = (): JSX.Element => {
  const auth = AuthContainer.useContainer();
  return (
    <Fragment>
      <section>
        <h1>Login page!</h1>
        <form onSubmit={auth.loginUser}>
          <input
            type="text"
            placeholder="Email"
            value={auth.email}
            onChange={(e) => auth.handleEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={auth.password}
            onChange={(e) => auth.handlePassword(e.target.value)}
          />
          {/* Temporary style for button. Use tailwind later */}
          <button style={{ padding: '10px', color: 'white', background: '#961656', borderRadius: '3px' }}>Login</button>
        </form>
      </section>
    </Fragment>
  );
}

export default Login;
