import { ReactElement } from "react";

const Toastr = ({ success, successMessage }: { success: boolean, successMessage: string }): ReactElement => {
  return (
    <div className={success ? 'fixed bottom-6 right-6 text-white bg-green-800 text-base py-2 px-3 md:text-lg md:px-4 rounded' : 'hidden'}>
      {successMessage}
    </div>
  );
}

export default Toastr;