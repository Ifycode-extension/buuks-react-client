import { Fragment, ReactElement } from "react";

const Temporary = (): ReactElement => {
  return (
    <Fragment>
      <div>
        <p><b>Still in development. For now, the browser console is how you get to see if a request is successful or fails.</b></p>
        <p><b>(Please pardon my ugly UI for now.  Will work on that once I'm done with functionality)</b></p>
      </div>
    </Fragment>
  );
}

export default Temporary;
