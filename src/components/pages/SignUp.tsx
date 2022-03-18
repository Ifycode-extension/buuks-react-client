import { Fragment } from 'react';
import { AuthContainer } from '../../hooks/auth';

const SignUp = (): JSX.Element => {
  const auth = AuthContainer.useContainer();
  return (
    <Fragment>
      <section>
        <h1>Signup page!</h1>
        <form onSubmit={auth.signupUser}>
          <input
            type="text"
            placeholder="Email"
            value={auth.signinEmail}
            onChange={(e) => auth.handleSigninEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={auth.signinPassword}
            onChange={(e) => auth.handleSigninPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm password"
            value={auth.passwordConfirmation}
            onChange={(e) => auth.handlePasswordConfirmation(e.target.value)}
          />
          <input
            type="text"
            placeholder="Name"
            value={auth.signinName}
            onChange={(e) => auth.handleSigninName(e.target.value)}
          />
          {/* Temporary style for button. Use tailwind later */}
          <button style={{ padding: '10px', color: 'white', background: '#961656', borderRadius: '3px' }}>Signup</button>
        </form>
      </section>
    </Fragment>
  );
}

export default SignUp;
