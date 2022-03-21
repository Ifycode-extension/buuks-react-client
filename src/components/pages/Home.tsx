import { Fragment } from "react";
import Temporary from "../Temporary";

const Home = (): JSX.Element => {
  return (
    <Fragment>
      <section>
        <h1>Home page!</h1>
        <p>Home page content goes here later, but for now, let's just make every page link available here.</p>
        <Temporary />
      </section>
    </Fragment>
  );
}

export default Home;
