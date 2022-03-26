import { Fragment, ReactElement } from "react";
import { Link } from "react-router-dom";
import { AuthContainer } from "../hooks/useAuth";

const Header = (): ReactElement | null => {
  const auth: Record<string, any> = AuthContainer.useContainer();
  const homePage: boolean = auth.pageRoute === '/' || auth.pageRoute === '/home';
  const isAuthenticated: boolean = auth.isAuthenticated;
  if (isAuthenticated) return null;
  return (
    <header className="flex justify-between text-lg md:text-xl py-4">
      <div>
        <Link to="/" className="text-pink-800 text-xl md:text-2xl">Buuks Logo</Link>
      </div>
      <nav>
        {!homePage &&
          <Link to="/" className="text-pink-800 underline">Buuks Home</Link>
        }
        {homePage &&
          <Fragment>
            <Link to="/signup" className="text-pink-800 underline">Signup</Link>
            <Link to="/login" className="ml-3 text-pink-800 underline">Login</Link>
          </Fragment>
        }
      </nav>
    </header>
  );
}

export default Header;
