import { ReactElement } from "react";
import { AuthContainer } from "../hooks/useAuth";

const Error = (): ReactElement | null => {
  const auth = AuthContainer.useContainer();
  if (!auth.error) return null;
  return (
    <div className="mt-4 text-red-900 font-bold">{auth.errorMessage}</div>
  );
}

export default Error;
