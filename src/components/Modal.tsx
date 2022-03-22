import { Fragment, ReactChild, ReactElement } from 'react';

const Modal = ({ children, modal, handleModal }: {
  children: ReactChild,
  modal: boolean,
  handleModal: (boolean: boolean) => void
}): ReactElement => {
  return (
    <Fragment>
      {modal && (
        <section className="bg-gray-200 opacity-95 fixed inset-0 z-50">
          <div className="flex h-screen justify-center items-center">
            <div className="relative rounded bg-white border border-pink-800 px-6 py-10 md:p-10">
              <button
                className="absolute right-10 top-5 w-12 h-12 rounded-full bg-pink-800 text-white text-xl hover:bg-pink-700"
                onClick={() => handleModal(false)}
              >✕</button>
              {children}
            </div>
          </div>
        </section>
      )}
    </Fragment>
  );
}

export default Modal;
