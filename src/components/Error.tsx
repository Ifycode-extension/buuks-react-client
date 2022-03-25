import { ReactElement } from "react";
import { AuthContainer } from "../hooks/useAuth";

const Error = (): ReactElement => {
  const auth = AuthContainer.useContainer();
  return (
    <div className="mt-4 text-red-900 font-bold">{auth.errorMessage}</div>
  );
}

export default Error;
