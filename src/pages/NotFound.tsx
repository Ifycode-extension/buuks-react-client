import { ReactElement } from 'react';
import AppLink from '../components/AppLink';

const NotFound = (): ReactElement => {
  return (
    <section>
      <h1>Page not found - 404</h1>
      <AppLink
        to="/"
        tailwindStyle="text-pink-800 underline"
        text="Back to home page"
      />
    </section>
  );
}

export default NotFound;