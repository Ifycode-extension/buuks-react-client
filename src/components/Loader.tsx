import { ReactElement } from "react";
import { AuthContainer } from "../hooks/useAuth";
import { useLoader } from "../hooks/useLoader";
import SvgAnimatedLoader from "./ui/SvgAnimatedLoader";

const Loader = ({ fixed }: { fixed: boolean }): ReactElement | null => {
  const { isLoading } = AuthContainer.useContainer();
  const { loader } = useLoader({ fixed });
  if (!isLoading) return null;
  return (
    <div className={`${loader.style} flex items-center w-fit`}>
      <div className="text-base text-pink-800 w-fit">{loader.text}</div>
      <SvgAnimatedLoader />
    </div>
  );
}

export default Loader;
