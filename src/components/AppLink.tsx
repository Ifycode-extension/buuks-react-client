import { ReactElement } from "react";
import { Link } from "react-router-dom";
import { AuthContainer } from "../hooks/useAuth";

const AppLink = ({ to, tailwindStyle, text }: { to: string, tailwindStyle: string, text: string }): ReactElement => {
  const auth = AuthContainer.useContainer();
  return (
    <Link
      onClick={() => auth.handleError(false, '')}
      to={to}
      className={tailwindStyle}
    >
      {text}
    </Link>
  );
}

export default AppLink;
