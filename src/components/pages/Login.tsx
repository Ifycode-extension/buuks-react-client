import { Fragment, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

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
    <section>
      <div className="rounded mx-auto my-4 py-10 max-w-xs md:max-w-md bg-white border border-pink-800">
        <form onSubmit={loginUser}>
          <h1 className="font-medium leading-tight text-2xl mt-0 mb-8 text-pink-800 mb-2">Login form</h1>
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
          <div>
            <button className="rounded bg-pink-800 text-white text-lg py-2 px-4 mt-2 mb-4 hover:bg-pink-700 active:shadow-lg mouse shadow transition ease-in duration-200">
              Login
            </button>
          </div>
          <div>
            <span>Don't have an account yet?</span>
            <Link to="/signup" style={{ textDecoration: 'underline', color: 'blue', marginLeft: '10px' }}>Signup!</Link>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Login;
