import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createContainer } from "unstated-next";

export const useSignup = () => {
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

  return {
    email,
    password,
    confirmPassword,
    name,
    signupUser,
    handleEmail,
    handlePassword,
    handleConfirmPassword,
    handleName
  }
}

export const SignUpContainer = createContainer(useSignup);