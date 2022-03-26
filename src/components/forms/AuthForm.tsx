import { ReactElement } from "react";
import { AuthContainer } from "../../hooks/useAuth";
import AppLink from "../AppLink";
import Error from "../Error";

const AuthForm = (): ReactElement => {
  const auth = AuthContainer.useContainer();
  return (
    <div className="rounded mx-auto my-4 py-10 max-w-sm md:max-w-md bg-white border border-pink-800">
        <form onSubmit={(e) => auth.authenticateUser(e, 'users/login', '/books')}>
          <div>
            <h1 className="font-medium leading-tight text-xl md:text-2xl mt-0 mb-8 text-pink-800 mb-2">Login form</h1>
            <input
              type="text"
              placeholder="Email"
              name="email"
              value={auth.form2.email}
              onChange={(e) => auth.handleInputChange(e)}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={auth.form2.password}
              onChange={(e) => auth.handleInputChange(e)}
            />
            <button className="rounded bg-pink-800 text-white text-lg py-2 px-4 mt-2 mb-4 hover:bg-pink-700 active:shadow-lg mouse shadow transition ease-in duration-200">
              Login
            </button>
          </div>
          <div>
            <span>Don't have an account yet?</span>
            <AppLink
            to="/signup"
            tailwindStyle="text-pink-800 underline ml-2"
            text="Signup!"
          />
          </div>
          {auth.error && <Error />}
        </form>
      </div>
  );
}

export default AuthForm;
