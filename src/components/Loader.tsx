import { ReactElement } from "react";
import { AuthContainer } from "../hooks/useAuth";

const Loader = (): ReactElement | null => {
  const auth = AuthContainer.useContainer();
  if (!auth.isLoading) return null;
  return (
    <div className="fixed bottom-6 right-6 text-pink-800 text-base py-2 px-3 md:text-lg md:px-4 rounded border border-pink-800 text-bold">Loading...</div>
  );
}

export default Loader;
