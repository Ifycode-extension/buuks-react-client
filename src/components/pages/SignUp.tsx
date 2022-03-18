import { Fragment } from 'react';
import { SignUpContainer } from '../../hooks/signin';

const SignUp = (): JSX.Element => {
  const register = SignUpContainer.useContainer();
  return (
    <Fragment>
      <section>
        <h1>Signup page!</h1>
        <form onSubmit={register.signupUser}>
          <input
            type="text"
            placeholder="Email"
            value={register.email}
            onChange={(e) => register.handleEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={register.password}
            onChange={(e) => register.handlePassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm password"
            value={register.confirmPassword}
            onChange={(e) => register.handleConfirmPassword(e.target.value)}
          />
          <input
            type="text"
            placeholder="Name"
            value={register.name}
            onChange={(e) => register.handleName(e.target.value)}
          />
          {/* Temporary style for button. Use tailwind later */}
          <button style={{ padding: '10px', color: 'white', background: '#961656', borderRadius: '3px' }}>Signup</button>
        </form>
      </section>
    </Fragment>
  );
}

export default SignUp;
