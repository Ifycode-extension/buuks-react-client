import { Fragment, ReactElement } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './components/Header';

const App = (): ReactElement => {
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
