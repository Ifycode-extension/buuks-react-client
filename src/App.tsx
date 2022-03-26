import { Fragment, ReactElement } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';

const App = (): ReactElement => {
  return (
    <Fragment>
      <Header />
      <Outlet />
    </Fragment>
  );
}

export default App;
