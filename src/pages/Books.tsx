import { ReactElement } from "react";
import Modal from "../components/Modal";
import { useBooks } from "../hooks/useBooks";
import { AuthContainer } from "../hooks/useAuth";
import Loader from "../components/Loader";
import Toastr from "../components/Toastr";
import BooksBody from "../components/BooksBody";
import BookForm from "../components/forms/BookForm";
import Skeleton from "../components/ui/Skeleton";

const Books = (): ReactElement => {
  const { user, isAuthenticated, isLoading, handleLogout, setIsFetching } = AuthContainer.useContainer();
  const hook = useBooks({ user, isAuthenticated, handleLogout, setIsFetching });

  return (
    <section>
      <div className="flex justify-between items-center py-4">
        <p className="text-xl md:text-2xl ">{user.name}</p>
        <button
          className="rounded bg-pink-800 text-white text-lg py-2 px-4 hover:bg-pink-700 active:shadow-lg mouse shadow transition ease-in duration-200"
          onClick={handleLogout}
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
        <BookForm hook={hook} />
      </Modal>
      <Loader fixed={false} />
      {!isLoading ? <div className="mt-5 text-base text-gray-500 w-fit">Total number of books: {hook.books.length}</div> : null}
      <Skeleton hook={hook}/>
      <BooksBody hook={hook} />
      <Toastr
        success={hook.success}
        successMessage={hook.successMessage}
      />
    </section>
  );
}

export default Books;
