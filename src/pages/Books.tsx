import { ReactElement, useEffect } from "react";
import Modal from "../components/Modal";
import { useBooks } from "../hooks/useBooks";
import { AuthContainer } from "../hooks/useAuth";
import Loader from "../components/Loader";
import Error from "../components/Error";

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
            {hook.isLoading && <Loader />}
            {hook.error && <Error errorMessage = {hook.errorMessage}/>}
          </div>
        </form>
      </Modal>

      {hook.isLoading && <Loader />}

      {!hook.isLoading &&
        (<div className="grid lg:grid-cols-3 md:grid-cols-2 gap-y-6 md:gap-6 my-6">
          {
            hook.books.length ? hook.books.map(((book: any) => {
              return (
                <div key={book._id} className="grid grid-rows-1 shadow-sm">
                  <div className="bg-white rounded-tl rounded-tr p-4 border-x border-t border-gray-300">
                    <h3 className="font-medium leading-tight text-xl md:text-2xl mt-0 mb-2 text-pink-700 mb-2">{book.title}</h3>
                    <p className="mb-1">{book.description}</p>
                    <a
                      className="text-blue-700 underline"
                      href={book.pdf}
                      target="_blank"
                      rel="noreferrer">
                      Preview or download PDF</a>
                  </div>
                  <div className="flex">
                    <button className="flex-grow bg-white text-pink-800 p-2 border border-pink-900 hover:bg-pink-700 hover:text-white active:shadow-lg mouse shadow transition ease-in duration-100"
                      onClick={(e) => hook.handlePostRequestForm(true, 'update', book._id)}>
                      Edit
                    </button>
                    <button
                      className="flex-grow bg-pink-800 text-white p-2 border border-transparent hover:bg-pink-700 active:shadow-lg mouse shadow transition ease-in duration-100"
                      onClick={(e) => hook.fetchBookData(null, 'DELETE', `books/${book._id}`, book._id)}>
                      Delete
                    </button>
                  </div>
                </div>
              )
            })) :
              <div>You have not added any book yet</div>
          }
        </div>
        )}
    </section>
  );
}

export default Books;
