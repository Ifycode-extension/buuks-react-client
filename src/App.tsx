import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <Fragment>
      <header>
        <h1 className="text-3xl font-bold underline">Header: Buuks React Client!</h1>
      </header>
      <Outlet />
    </Fragment>
  );
}

export default App;
