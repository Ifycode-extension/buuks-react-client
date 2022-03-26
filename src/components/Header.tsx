import { Fragment, ReactElement } from "react";
import { AuthContainer } from "../hooks/useAuth";
import AppLink from "./AppLink";

const Header = (): ReactElement | null => {
  const auth: Record<string, any> = AuthContainer.useContainer();
  const homePage: boolean = auth.pageRoute === '/' || auth.pageRoute === '/home';
  const isAuthenticated: boolean = auth.isAuthenticated;
  if (isAuthenticated) return null;
  return (
    <header className="flex justify-between text-lg md:text-xl py-4">
      <div>
        <AppLink
          to="/"
          tailwindStyle="text-pink-800 text-xl md:text-2xl"
          text="Buuks Logo"
        />
      </div>
      <nav>
        {!homePage &&
          <AppLink
            to="/"
            tailwindStyle="text-pink-800 underline"
            text="Home"
          />
        }
        {homePage &&
          <Fragment>
            <AppLink
              to="/signup"
              tailwindStyle="text-pink-800 underline"
              text="Signup"
            />
            <AppLink
              to="/login"
              tailwindStyle="ml-3 text-pink-800 underline"
              text="Login"
            />
          </Fragment>
        }
      </nav>
    </header>
  );
}

export default Header;
