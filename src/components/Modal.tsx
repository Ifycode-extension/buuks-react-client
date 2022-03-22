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
         <div className="rounded bg-white border border-pink-800 p-6 md:p-10">
         <button
            className="modal-button"
            onClick={() => handleModal(false)}
          >Close Modal</button>
          {children}
         </div>
         </div>
        </section>
      )}
    </Fragment>
  );
}

export default Modal;
