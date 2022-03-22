import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const SignUp = (): JSX.Element => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');

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
        passwordConfirmation: confirmPassword,
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

  const handleEmail = (eventTargetValue: string) => {
    setEmail(eventTargetValue);
  }

  const handlePassword = (eventTargetValue: string) => {
    setPassword(eventTargetValue);
  }

  const handleConfirmPassword = (eventTargetValue: string) => {
    setConfirmPassword(eventTargetValue);
  }

  const handleName = (eventTargetValue: string) => {
    setName(eventTargetValue);
  }

  return (
    <section>
      <div className="rounded mx-auto my-4 py-10 max-w-xs md:max-w-md bg-white border border-pink-800">
        <form onSubmit={signupUser}>
          <div>
            <h1 className="font-medium leading-tight text-2xl mt-0 mb-8 text-pink-800 mb-2">Signup form</h1>
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
            <input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => handleConfirmPassword(e.target.value)}
            />
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => handleName(e.target.value)}
            />
            <button className="rounded bg-pink-800 text-white text-lg py-2 px-4 mt-2 mb-4 hover:bg-pink-700 active:shadow-lg mouse shadow transition ease-in duration-200">
              Signup
            </button>
          </div>
          <div>
            <span>Have an account already?</span>
            <Link to="/login" style={{ textDecoration: 'underline', color: 'blue', marginLeft: '10px' }}>Login.</Link>
          </div>
        </form>
      </div>
    </section>
  );
}

export default SignUp;
