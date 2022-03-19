import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import { Fragment } from 'react';
import { useLocation } from 'react-router-dom';

// TODO: Prevent NOT logged in user from Accessing /books page (through changing browser url)

const App = (): JSX.Element => {
  const location = useLocation();
  const booksPage = location.pathname === '/books';
  return (
    <Fragment>
      {!booksPage && <Header />}
      <Outlet />
    </Fragment>
  );
}

export default App;
