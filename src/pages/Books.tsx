import { ReactElement, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Modal from "../components/Modal";
// import { useBooks } from "../hooks/useBooks";
import { AuthContainer } from "../hooks/useAuth";
import { BooksObject } from "../interfaces/books";

// TODO: (code here is rough work) Fix repetition and arrange code, clean up and reduce the code in this file later.

const Books = (): ReactElement => {
  const auth = AuthContainer.useContainer();

  // const booksHook = useBooks();
  // console.log(booksHook.test);

  const navigate = useNavigate();
  // TODO: const [userName, setUserName] = useState(''); // add name property to the get response on the backend so that you can display this at the top of the page
  let [books, setBooks] = useState<BooksObject[]>([]);

  const [modal, setModal] = useState(false);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [pdf, setPdf] = useState<File>();

  //---------------------------------------------------------
  const fetchBookData = async (e: any, method: string, endpoint: string, bookId: string | null) => {
    if (method === 'POST' /* or 'UPDATE' */) e.preventDefault();
    console.log('loading...');
    let response: Response;
    let options: any;

    if (method !== 'GET') {
      options = {
        method: method,
        headers: {
          'Authorization': `Bearer ${localStorage.accessToken}`,
          'x-access-token': `${localStorage.accessToken}`
        }
      }
    }

    if (method === 'POST') {
      let formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('pdf', pdf as File);
      options = {
        ...options,
        body: formData
      }
    }
    
    response = await fetch(`${process.env.REACT_APP_BASE_URL}/${endpoint}`, options);
    if (response.ok) {
      const data = await response.json();
      if (method === 'GET') setBooks(data.books.reverse());
      if (method === 'DELETE') setBooks(books.filter(book => book._id !== bookId));
      if (method === 'POST') {
        books.unshift(data.book);
        handleModal(false);
      }
      console.log('data: ', data);
    }
    console.log(response.statusText);
  }

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    // const refreshToken = localStorage.getItem('refreshToken');

    if (accessToken) {
      const user = JSON.parse(window.atob(accessToken.split('.')[1]));
      if (user) {
        console.log('You\'re logged in!');
        console.log(user);
        fetchBookData(null, 'GET', `books/user/${user._id}`, null);
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

  //----------------------------------------------------------------

  const handleTitle = (eventTargetValue: string) => {
    setTitle(eventTargetValue);
  }

  const handleDescription = (eventTargetValue: string) => {
    setDescription(eventTargetValue);
  }

  const handleFileAddition = (e: any) => {
    setPdf(e.target.files![0]);
  }

  //----------------------------------------------------------------

  const handleModal = (boolean: boolean) => {
    setModal(boolean);
  }

  //----------------------------------------------------------------

  const handleLogout = () => {
    auth.setIsAuthenticated(false);
    localStorage.removeItem('accessToken');
    navigate('/login');
  }

  //----------------------------------------------------------------


  return (
    <section>
      <div className="flex justify-between items-center py-4">
        <p className="text-xl md:text-2xl ">User name</p>
        <button
          className="rounded bg-pink-800 text-white text-lg py-2 px-4 hover:bg-pink-700 active:shadow-lg mouse shadow transition ease-in duration-200"
          onClick={handleLogout}
        >Logout</button>
      </div>

      <button
        className="rounded py-2 px-4 bg-white text-pink-800 text-lg md:text-xl p-2 border border-pink-800 hover:bg-pink-700 hover:text-white active:shadow-lg mouse shadow transition ease-in duration-100"
        onClick={() => handleModal(true)}
      >+ Add book</button>

      <Modal
        modal={modal}
        handleModal={handleModal}
      >
        <form method="post" encType="multipart/form-data" onSubmit={(e) => fetchBookData(e, 'POST', `books`, null)}>
          <div>
            <h1 className="font-medium leading-tight text-xl md:text-2xl mt-0 mb-8 text-pink-800 mb-2">
              New Book - Form
            </h1>
            <input
              type="text"
              placeholder="New book title"
              value={title}
              onChange={(e) => handleTitle(e.target.value)}
            />
            <input
              type="text"
              placeholder="New book description"
              value={description}
              onChange={(e) => handleDescription(e.target.value)}
            />
            <input
              type="file"
              onChange={(e) => handleFileAddition(e)}
            />
            <button className="rounded bg-pink-800 text-white text-lg py-2 px-4 mt-4 hover:bg-pink-700 active:shadow-lg mouse shadow transition ease-in duration-200">
              Submit new book
            </button>
          </div>
        </form>
      </Modal>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-y-6 md:gap-6 my-6">
        {
          books.length ? books.map(((book: any) => {
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
                    onClick={(e) => fetchBookData(null, 'DELETE', `books/${book._id}`, book._id)}>
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
