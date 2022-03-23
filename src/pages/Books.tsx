import { ReactElement, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Modal from "../components/Modal";
import { useBooks } from "../hooks/useBooks";
import { AuthContainer } from "../hooks/useAuth";

// TODO: (code here is rough work) Fix repetition and arrange code, clean up and reduce the code in this file later.

const Books = (): ReactElement => {
  const auth = AuthContainer.useContainer();
  const hook = useBooks();
  const navigate = useNavigate();
  // TODO: const [userName, setUserName] = useState(''); // add name property to the get response on the backend so that you can display this at the top of the page

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    // const refreshToken = localStorage.getItem('refreshToken');

    if (accessToken) {
      const user = JSON.parse(window.atob(accessToken.split('.')[1]));
      if (user) {
        console.log('You\'re logged in!');
        console.log(user);
        hook.fetchBookData(null, 'GET', `books/user/${user._id}`, null);
      } else {
        auth.setIsAuthenticated(false);
        navigate('/login');
        console.log('This is just for debugging, does this ever happen?: Access token, but no user');
      }
    } else {
      auth.setIsAuthenticated(false);
      navigate('/login');
      console.log('Da pa da!');
    }
  }, []);

  return (
    <section>
      <div className="flex justify-between items-center py-4">
        <p className="text-xl md:text-2xl ">User name</p>
        <button
          className="rounded bg-pink-800 text-white text-lg py-2 px-4 hover:bg-pink-700 active:shadow-lg mouse shadow transition ease-in duration-200"
          onClick={auth.handleLogout}
        >Logout</button>
      </div>

      <button
        className="rounded py-2 px-4 bg-white text-pink-800 text-lg md:text-xl p-2 border border-pink-800 hover:bg-pink-700 hover:text-white active:shadow-lg mouse shadow transition ease-in duration-100"
        onClick={() => hook.handleModal(true)}
      >+ Add book</button>

      <Modal
        modal={hook.modal}
        handleModal={hook.handleModal}
      >
        <form method="post" encType="multipart/form-data" onSubmit={(e) => hook.fetchBookData(e, 'POST', `books`, null)}>
          <div>
            <h1 className="font-medium leading-tight text-xl md:text-2xl mt-0 mb-8 text-pink-800 mb-2">
              New Book - Form
            </h1>
            <input
              type="text"
              placeholder="New book title"
              value={hook.title}
              onChange={(e) => hook.handleTitle(e.target.value)}
            />
            <input
              type="text"
              placeholder="New book description"
              value={hook.description}
              onChange={(e) => hook.handleDescription(e.target.value)}
            />
            <input
              type="file"
              onChange={(e) => hook.handleFileAddition(e)}
            />
            <button className="rounded bg-pink-800 text-white text-lg py-2 px-4 mt-4 hover:bg-pink-700 active:shadow-lg mouse shadow transition ease-in duration-200">
              Submit new book
            </button>
          </div>
        </form>
      </Modal>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-y-6 md:gap-6 my-6">
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
                  <button className="flex-grow bg-white text-pink-800 p-2 border border-pink-900 hover:bg-pink-700 hover:text-white active:shadow-lg mouse shadow transition ease-in duration-100">
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
    </section>
  );
}

export default Books;
