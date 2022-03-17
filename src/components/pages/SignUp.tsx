import { Fragment, useState } from "react";

const SignUp = (): JSX.Element => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [name, setName] = useState('');

  const signupUser = async (e: any): Promise<void> => {
    e.preventDefault();
    const response = await fetch(`http://localhost:8000/users/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password,
        passwordConfirmation,
        name,
      })
    });

    const data = await response.json();
    console.log(data);
  }

  return (
    <Fragment>
      <section>
        <h1>Signup page!</h1>
        <form onSubmit={signupUser}>
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
          <input
            type="password"
            placeholder="Confirm password"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button>Signup</button>
        </form>
      </section>
    </Fragment>
  );
}

export default SignUp;
