import { Fragment } from 'react';
import { Link } from 'react-router-dom';
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
        <div>
          <span>Have an account already?</span>
          <Link to="/login" style={{ textDecoration: 'underline', color: 'blue', marginLeft: '10px' }}>Login.</Link>
        </div>
      </section>
    </Fragment>
  );
}

export default SignUp;
