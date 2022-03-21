import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Modal from "../Modal";
import Temporary from "../Temporary";

// TODO: (code here is rough work) Fix repetition and arrange code, clean up and reduce the code in this file later.

interface BookArray {
  _id: string;
  title: string;
  description: string;
  pdf: string;
  request: Record<string, any>
}

const Books = (): JSX.Element => {
  const navigate = useNavigate();
  // TODO: const [userName, setUserName] = useState(''); // add name property to the get response on the backend so that you can display this at the top of the page
  let [books, setBooks] = useState<BookArray[]>([]);

  const [modal, setModal] = useState(false);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [pdf, setPdf] = useState<File>();

  //---------------------------------------------------------
  const getUserBooks = async (userId: string) => {
    console.log('Get books function! ', userId);

    const req = await fetch(`${process.env.REACT_APP_BASE_URL}/books/user/${userId}`, {
      // headers: new Headers({ //this also works
      //   'x-access-token': `${localStorage.getItem('accessToken')}`
      // })
      headers: {
        'x-access-token': localStorage.getItem('accessToken') as string,
      }
    });

    const data = await req.json();

    if (data) {
      setBooks(data.books.reverse());
      console.log('data: ', data);
    } else {
      console.log('error: some error occured...');
    }
  }

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    // const refreshToken = localStorage.getItem('refreshToken');

    if (accessToken) {
      const user = JSON.parse(window.atob(accessToken.split('.')[1]));
      if (user) {
        console.log('You\'re logged in!');
        console.log(user);
        getUserBooks(user._id);
      } else {
        navigate('/login');
        console.log('This is just for debugging, does this ever happen?: Access token, but no user');
      }
    } else {
      navigate('/login');
      console.log('Da pa da!');
    }
  }, []);

  //----------------------------------------------------------------

  const postNewBook = async (e: any) => {
    e.preventDefault();
    // console.log(localStorage.accessToken);
    if (localStorage.accessToken) {
      console.log('loading...');

      let formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('pdf', pdf as File);

      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/books`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.accessToken}`,
          'x-access-token': `${localStorage.accessToken}`
        },
        body: formData
      });

      const data = await response.json();

      if (data.book) {
        books.unshift(data.book);
        console.log('New book added!');
        handleModal(false)
      }

      console.log(data);
    }
  }

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

  const handleBookDelete = async (bookId: string) => {
    if (localStorage.accessToken) {
      console.log('loading...');

      const req = await fetch(`${process.env.REACT_APP_BASE_URL}/books/${bookId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.accessToken}`,
          'x-access-token': localStorage.getItem('accessToken') as string,
        }
      });

      const data = await req.json();

      if (data.user) {
        setBooks(books.filter(book => book._id !== bookId));
        console.log('Deleted succesfully!');
      }

      console.log(data);
    }
  }

  //----------------------------------------------------------------

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    navigate('/login');
  }

  //----------------------------------------------------------------


  return (
    <section>
      <div className="flex justify-between items-center py-4">
        <p className="text-2xl ">User name</p>
        <button
          className="rounded bg-pink-800 text-white text-lg py-2 px-4 hover:bg-pink-700 active:shadow-lg mouse shadow transition ease-in duration-200"
          onClick={handleLogout}
        >Logout</button>
      </div>

      <div className="absolute">
        <button
          className="fixed bottom-10 right-10 text-white text-4xl p-0 w-16 h-16 bg-pink-800 rounded-full hover:bg-pink-700 active:shadow-lg mouse shadow transition ease-in duration-200"
          onClick={() => handleModal(true)}
        >+</button>
      </div>

      <Modal
        modal={modal}
        handleModal={handleModal}
      >
        <form method="post" encType="multipart/form-data" onSubmit={postNewBook}>
          <h1>Add new book (form)</h1>
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
            // accept=".pdf"
            onChange={(e) => handleFileAddition(e)}
          />
          <button className="button">Submit new book</button>
        </form>
      </Modal>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 md:gap-6">
        {
          books.length ? books.map(((book: any) => {
            return (
              <div key={book._id} className="grid grid-rows-1 mb-4 rounded shadow-sm overflow-hidden">
                <div className="p-4 border-r border-l border-t border-gray-200">
                  <h3 className="font-medium leading-tight text-2xl mt-0 mb-2 text-pink-700 mb-2">{book.title}</h3>
                  <p className="mb-1">{book.description}</p>
                  <a
                    className="text-blue-700 underline"
                    href={book.pdf}
                    target="_blank"
                    rel="noreferrer">
                    Preview or download PDF</a>
                </div>
                <div className="flex">
                  <button className="flex-grow bg-gray-300 text-gray-600 p-2 cursor-not-allowed">
                    Update
                  </button>
                  <button
                    className="flex-grow bg-pink-800 text-white p-2 hover:bg-pink-700 active:shadow-lg mouse shadow transition ease-in duration-200"
                    onClick={(e) => handleBookDelete(book._id)}>
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
