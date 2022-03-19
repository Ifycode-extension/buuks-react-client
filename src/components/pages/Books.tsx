import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

const Books = (): JSX.Element => {
  const navigate = useNavigate();
  // TODO: const [userName, setUserName] = useState(''); // add name property to the get response on the backend so that you can display this at the top of the page
  const [books, setBooks] = useState([]);
  const [booksCount, setBooksCount] = useState(0);

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
      setBooks(data.books);
      setBooksCount(data.count);
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

  return (
    <section>
      <h1>Books page!</h1>
      <p>Welcome (user name will go here)!</p>
      <b>(Please pardon my ugly UI for now.  Will work on that once I'm done with functionality)</b>
      {
        booksCount !== 0 ? books.map(((book: any) => {
          return (
            // Temporary styles use tailwind later on
            <div key={book._id} style={{ border: '1px solid grey' }}>
              <h3>{book.title}</h3>
              <h3>{book.description}</h3>
              <a href={book.pdf} style={{ color: 'blue' }}>Preview or download PDF</a>
            </div>
          )
        })) :
          <div>You have not added any book yet</div>
      }
      <button style={{ display: 'block', margin: '10px 0', padding: '10px', color: 'white', background: '#961656', borderRadius: '3px' }}>Add a new book</button>
      {/* Temporary style: Use tailwind later on */}
      <Link to="/" style={{ textDecoration: 'underline', color: 'blue' }}>Back to home page</Link>
    </section>
  );
}

export default Books;
