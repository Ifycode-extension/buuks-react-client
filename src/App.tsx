import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';

// TODO: Prevent not signed in user from Accessing pages through header links

function App() {
  return (
    <Fragment>
      <Header />
      <Outlet />
    </Fragment>
  );
}

export default App;
