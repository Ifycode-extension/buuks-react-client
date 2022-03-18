import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';

// TODO: Prevent NOT logged in user from Accessing /books page (through changing browser url)

function App() {
  return (
    <Fragment>
      <Header />
      <Outlet />
    </Fragment>
  );
}

export default App;
