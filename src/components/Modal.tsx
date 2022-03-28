import { ReactChild, ReactElement } from 'react';

const Modal = ({ children, modal, handleModal }: {
  children: ReactChild,
  modal: boolean,
  handleModal: (boolean: boolean) => void
}): ReactElement | null => {
  if (!modal) return null;
  return (
    <section className="bg-gray-200 opacity-95 fixed inset-0 z-50 overflow-auto">
      {/* <div className="flex h-screen justify-center items-center"> */}
      <div className="relative rounded mx-auto my-4 py-10 max-w-sm md:max-w-md bg-white border border-pink-800">
        <button
          className="absolute right-5 top-5 w-10 h-10 rounded-full bg-pink-800 text-white text-xl hover:bg-pink-700"
          onClick={() => handleModal(false)}
        >✕</button>
        {children}
      </div>
      {/* </div> */}
    </section>
  );
}

export default Modal;
