import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createContainer } from "unstated-next"

export const useAuth = () => {
  const navigate = useNavigate();

  //====== Signup hook code ========
  const [signinEmail, setSigninEmail] = useState('');
  const [signinPassword, setSigninPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [signinName, setSigninName] = useState('');

  const signupUser = async (e: any) => {
    e.preventDefault();
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/users/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: signinEmail,
        password: signinPassword,
        passwordConfirmation,
        name: signinName,
      })
    });

    const data = await response.json();

    // TODO: This works but include a property with boolean value of true/false in the API for use here instead
    if (data.email) {
      navigate('/login');
    }

    console.log(data);
  }

  const handleSigninEmail = (eventTargetValue: string) => {
    setSigninEmail(eventTargetValue);
  }

  const handleSigninPassword = (eventTargetValue: string) => {
    setSigninPassword(eventTargetValue);
  }

  const handlePasswordConfirmation = (eventTargetValue: string) => {
    setPasswordConfirmation(eventTargetValue);
  }

  const handleSigninName = (eventTargetValue: string) => {
    setSigninName(eventTargetValue);
  }

  //====== signup ends ==========


  //====== Login hook code ========

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
      navigate('/books');
    }

    console.log(data);
  }

  const handleEmail = (eventTargetValue: string) => {
    setEmail(eventTargetValue);
  }

  const handlePassword = (eventTargetValue: string) => {
    setPassword(eventTargetValue);
  }

  //====== login ends ==========

  return {
    signinEmail,
    signinPassword,
    passwordConfirmation,
    signinName,
    signupUser,
    handleSigninEmail,
    handleSigninPassword,
    handlePasswordConfirmation,
    handleSigninName,

    email,
    password,
    loginUser,
    handleEmail,
    handlePassword
  }
}

export const AuthContainer = createContainer(useAuth);