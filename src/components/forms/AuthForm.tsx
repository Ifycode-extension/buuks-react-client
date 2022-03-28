import { Fragment, ReactElement, useEffect } from "react";
import { AuthContainer } from "../../hooks/useAuth";
import AppLink from "../AppLink";
import Error from "../Error";

const AuthForm = (): ReactElement => {
  const auth = AuthContainer.useContainer();
  const loginDestination = auth.pageRoute === '/login';
  useEffect(() => {
    let abortController = new AbortController();
    auth.handleAppLinks(auth.pageRoute);
    return () => {
      abortController.abort();
    }
  }, []);
  return (
    <div className="rounded mx-auto my-4 py-10 max-w-sm md:max-w-md bg-white border border-pink-800">
      <form onSubmit={(e) => auth.authenticateUser(e, auth.authFormContent.apiEndpoint, auth.authFormContent.destinationPage)}>
        <div>
          <h1 className="font-medium leading-tight text-xl md:text-2xl mt-0 mb-8 text-pink-800 mb-2">
            {auth.authFormContent.formTitle}
          </h1>
          <input
            type="text"
            placeholder="Email"
            name="email"
            value={auth.form.email}
            onChange={(e) => auth.handleInputChange(e)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={auth.form.password}
            onChange={(e) => auth.handleInputChange(e)}
          />
          {!loginDestination && (
            <Fragment>
              <input
                type="password"
                placeholder="Confirm password"
                name="confirmPassword"
                value={auth.form.confirmPassword as string}
                onChange={(e) => auth.handleInputChange(e)}
              />
              <input
                type="text"
                placeholder="First name"
                name="name"
                value={auth.form.name as string}
                onChange={(e) => auth.handleInputChange(e)}
              />
            </Fragment>
          )}
          <button className="rounded bg-pink-800 text-white text-lg py-2 px-4 mt-2 mb-4 hover:bg-pink-700 active:shadow-lg mouse shadow transition ease-in duration-200">
            {auth.authFormContent.buttonText}
          </button>
        </div>
        <div>
          <span>{auth.authFormContent.spanText}</span>
          <AppLink
            to={loginDestination ? '/signup' : '/login'}
            tailwindStyle="text-pink-800 underline ml-2"
            text={auth.authFormContent.LinkText}
          />
        </div>
        <Error />
      </form>
    </div>
  );
}

export default AuthForm;
