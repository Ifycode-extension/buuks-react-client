import { Fragment, useState } from "react";

const Login = (): JSX.Element => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = async (e: any): Promise<void> => {
    e.preventDefault();
    const response = await fetch(`http://localhost:8000/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    });

    const data = await response.json();
    console.log(data);
  }

  return (
    <Fragment>
      <section>
        <h1>Login page!</h1>
        <form onSubmit={loginUser}>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button>Login</button>
        </form>
      </section>
    </Fragment>
  );
}

export default Login;
