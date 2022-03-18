import { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = (): JSX.Element => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [name, setName] = useState('');

  // TODO: Transform the content here into reusable react hook

  const signupUser = async (e: any) => {
    e.preventDefault();
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/users/signup`, {
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

    // TODO: This works but include a property with boolean value of true/false in the API for use here instead
    if (data.email) {
      navigate('/login');
    }

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
          {/* Temporary style for button. Use tailwind later */}
          <button style={{ padding: '10px', color: 'white', background: '#961656', borderRadius: '3px' }}>Signup</button>
        </form>
      </section>
    </Fragment>
  );
}

export default SignUp;
