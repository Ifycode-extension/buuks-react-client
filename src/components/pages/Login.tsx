import { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = (): JSX.Element => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // TODO: Transform the content here into reusable react hook

  const loginUser = async (e: any) => {
    e.preventDefault();
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/auth/login`, {
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

     // TODO: This works but include a property with boolean value of true/false in the API for use here instead
    if (data.user) {
      navigate('/books');
    }

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
          {/* Temporary style for button. Use tailwind later */}
          <button style={{ padding: '10px', color: 'white', background: '#961656', borderRadius: '3px' }}>Login</button>
        </form>
      </section>
    </Fragment>
  );
}

export default Login;
