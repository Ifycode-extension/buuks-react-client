import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import { Fragment } from 'react';

// TODO: Prevent NOT logged in user from Accessing /books page (through changing browser url)

const App = (): JSX.Element => {
  return (
    <Fragment>
      <Header />
      <Outlet />
    </Fragment>
  );
}

export default App;
