import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createContainer } from "unstated-next"

export const useAuth = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [clicked, setClicked] = useState(false);

  const [userData, setUserData] = useState<Record<string, any>>({});

  const loginUser = async (e: any) => {
    e.preventDefault();

    setClicked(true);

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

    // try {
    //   if (response.ok) {
    //     const data = await response.json();

    //     console.log('OK: ', data);
    //     setUserData(data);
    //   }
    // } catch (err) {
    //   console.log('ERROR: ', err);
    // }


    const data = await response.json();

    console.log(data);
    setUserData(data);
    console.log('userData from click: ', userData);

    // TODO: This works but include a property with boolean value of true/false in the API for use here instead
    if (data.user) {
      navigate('/books');
    }


    // console.log(data);
    // setUserData(data);
    // console.log('userData from click: ', userData);
  }

  const handleEmail = (eventTargetValue: string) => {
    setEmail(eventTargetValue);
  }

  const handlePassword = (eventTargetValue: string) => {
    setPassword(eventTargetValue);
  }

  // console.log(clicked);

  return {
    email,
    password,
    loginUser,
    handleEmail,
    handlePassword,
    clicked,
    userData
  }
}

export const AuthContainer = createContainer(useAuth);