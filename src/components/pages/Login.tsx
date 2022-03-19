import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { AuthContainer } from '../../hooks/auth';

const Login = (): JSX.Element => {
  const auth = AuthContainer.useContainer();
  // console.log(auth.userData);
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
        <div>
          <span>Don't have an accout yet?</span>
          <Link to="/signup" style={{ textDecoration: 'underline', color: 'blue', marginLeft: '10px' }}>Signup!</Link>
        </div>
        <div>{auth.email}</div>
        <div>{auth.userData.user?.name}</div>
      </section>
    </Fragment>
  );
}

export default Login;
