import { Link } from "react-router-dom";

const Books = (): JSX.Element => {
  return (
    <section>
      <h1>Books page!</h1>
      <p>Welcome (user name will go here)!</p>
      <div>GET books created by user for display here. "You have not added any book yet" message will be displayed if count is 0.</div>
      {/* Temporary style: Use tailwind later on */}
      <Link to="/" style={{ textDecoration: 'underline', color: 'blue' }}>Back to home page</Link>
    </section>
  );
}

export default Books;
