import { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { AuthContainer } from '../hooks/useAuth';

const SignUp = (): ReactElement => {
  const auth = AuthContainer.useContainer();
  return (
    <section>
      <div className="rounded mx-auto my-4 py-10 max-w-sm md:max-w-md bg-white border border-pink-800">
        <form onSubmit={auth.signupUser}>
          <div>
            <h1 className="font-medium leading-tight text-xl md:text-2xl mt-0 mb-8 text-pink-800 mb-2">Signup form</h1>
            <input
              type="text"
              placeholder="Email"
              value={auth.email}
              onChange={(e) => auth.handleEmail(e)}
            />
            <input
              type="password"
              placeholder="Password"
              value={auth.password}
              onChange={(e) => auth.handlePassword(e)}
            />
            <input
              type="password"
              placeholder="Confirm password"
              value={auth.confirmPassword}
              onChange={(e) => auth.handleConfirmPassword(e)}
            />
            <input
              type="text"
              placeholder="Name"
              value={auth.name}
              onChange={(e) => auth.handleName(e)}
            />
            <button className="rounded bg-pink-800 text-white text-lg py-2 px-4 mt-2 mb-4 hover:bg-pink-700 active:shadow-lg mouse shadow transition ease-in duration-200">
              Signup
            </button>
          </div>
          <div>
            <span>Have an account already?</span>
            <Link to="/login" className="text-pink-800 underline ml-2">Login.</Link>
          </div>
        </form>
      </div>
    </section>
  );
}

export default SignUp;
