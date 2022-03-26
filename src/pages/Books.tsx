import { ReactElement, useEffect } from "react";
import Modal from "../components/Modal";
import { useBooks } from "../hooks/useBooks";
import { AuthContainer } from "../hooks/useAuth";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Toastr from "../components/Toastr";
import BooksBody from "../components/BooksBody";

const Books = (): ReactElement => {
  const auth = AuthContainer.useContainer();
  const hook = useBooks();

  useEffect(() => {
    let abortController = new AbortController();
    const user = JSON.parse(localStorage.getItem('_user') as string);
    auth.setUser(user);
    hook.fetchBookData(null, 'GET', `books/user/${user._id}`, null);
    auth.handleLogIn();
    return () => {
      abortController.abort();
    }
  }, []);

  return (
    <section>
      <div className="flex justify-between items-center py-4">
        <p className="text-xl md:text-2xl ">{auth.user.name}</p>
        <button
          className="rounded bg-pink-800 text-white text-lg py-2 px-4 hover:bg-pink-700 active:shadow-lg mouse shadow transition ease-in duration-200"
          onClick={auth.handleLogout}
        >Logout</button>
      </div>

      <button
        className="rounded py-2 px-4 bg-white text-pink-800 text-lg md:text-xl p-2 border border-pink-800 hover:bg-pink-700 hover:text-white active:shadow-lg mouse shadow transition ease-in duration-100"
        onClick={(e) => hook.handlePostRequestForm(true, 'add', null)}
      >+ Add book</button>

      <Modal
        modal={hook.modal}
        handleModal={hook.handleModal}
      >
        <form method="post" encType="multipart/form-data" onSubmit={(e) => hook.fetchBookData(e, hook.modalForm.method, hook.modalForm.endpoint, hook.modalForm.bookId)}>
          <div>
            <h1 className="font-medium leading-tight text-xl md:text-2xl mt-0 mb-8 text-pink-800 mb-2">
              {hook.modalForm.title}
            </h1>
            <input
              type="text"
              placeholder="New book title"
              name="title"
              value={hook.form.title}
              onChange={(e) => hook.handleInputChange(e)}
            />
            <input
              type="text"
              placeholder="New book description"
              name="description"
              value={hook.form.description}
              onChange={(e) => hook.handleInputChange(e)}
            />
            <input
              type="file"
              name="pdf"
              onChange={(e) => hook.handleInputChange(e)}
            />
            <button className="rounded bg-pink-800 text-white text-lg py-2 px-4 mt-4 hover:bg-pink-700 active:shadow-lg mouse shadow transition ease-in duration-200">
              {hook.modalForm.buttonText}
            </button>
            {auth.isLoading && <Loader />}
            {auth.error && <Error />}
          </div>
        </form>
      </Modal>

      {auth.isLoading && <Loader />}
      <BooksBody
        auth={auth}
        hook={hook}
      />
      <Toastr
        success={hook.success}
        successMessage={hook.successMessage}
      />
    </section>
  );
}

export default Books;
