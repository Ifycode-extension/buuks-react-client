import { Fragment, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Temporary from '../Temporary';

const Login = (): JSX.Element => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
      localStorage.setItem('accessToken', data.accessToken);
      //localStorage.setItem('refreshToken', data.refreshToken);
      navigate('/books');
    }

    // console.log(data);
  }

  const handleEmail = (eventTargetValue: string) => {
    setEmail(eventTargetValue);
  }

  const handlePassword = (eventTargetValue: string) => {
    setPassword(eventTargetValue);
  }

  return (
    <Fragment>
      <section>
        <h1>Login page!</h1>
        <Temporary />
        <form onSubmit={loginUser}>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => handleEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => handlePassword(e.target.value)}
          />
          {/* Temporary style for button. Use tailwind later */}
          <button className='button'>Login</button>
        </form>
        <div>
          <span>Don't have an accout yet?</span>
          <Link to="/signup" style={{ textDecoration: 'underline', color: 'blue', marginLeft: '10px' }}>Signup!</Link>
        </div>
        <div>{email}</div>
      </section>
    </Fragment>
  );
}

export default Login;
