import { ReactElement } from "react";

const Error = ({ errorMessage }: { errorMessage: string }): ReactElement => {
  return (
    <div className="mt-4 text-red-900 font-bold">{errorMessage}</div>
  );
}

export default Error;
