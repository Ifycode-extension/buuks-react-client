import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContainer } from "../../hooks/auth";

const Books = (): JSX.Element => {

  const auth = AuthContainer.useContainer();
  // const [data, setData] = useState('');
  // console.log('From Book component: ', auth.userData);

  return (
    <Fragment>
      <section>
        <h1>Books page!</h1>
        <p>Logged in as <b>{auth.userData.user?.name}</b> with email <b>{auth.email}</b></p>
        {/* Temporary style: Use tailwind later on */}
        <Link to="/" style={{ textDecoration: 'underline', color: 'blue' }}>Back to home page</Link>
      </section>
    </Fragment>
  );
}

export default Books;
