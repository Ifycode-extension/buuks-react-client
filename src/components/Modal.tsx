import { Fragment, ReactChild, ReactElement } from 'react';

const Modal = ({ children, modal, handleModal }: {
  children: ReactChild,
  modal: boolean,
  handleModal: (boolean: boolean) => void
}): ReactElement => {
  return (
    <Fragment>
      {modal && (
        <section>
          <button
            className="modal-button"
            onClick={() => handleModal(false)}
          >Close Modal</button>
          {children}
        </section>
      )}
    </Fragment>
  );
}

export default Modal;
