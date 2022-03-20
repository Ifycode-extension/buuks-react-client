import { ReactChild, ReactElement } from 'react';

const Modal = ({ children }: {children: ReactChild}): ReactElement => {
  return (
    <section>
      {children}
    </section>
  );
}

export default Modal;
