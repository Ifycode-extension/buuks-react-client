import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Fragment } from 'react';
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
    <Fragment>
      <section>
        <h1>Signup page!</h1>
        <form onSubmit={signupUser}>
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
          {/* Temporary style for button. Use tailwind later */}
          <button className="button">Signup</button>
        </form>
        <div>
          <span>Have an account already?</span>
          <Link to="/login" style={{ textDecoration: 'underline', color: 'blue', marginLeft: '10px' }}>Login.</Link>
        </div>
      </section>
    </Fragment>
  );
}

export default SignUp;
