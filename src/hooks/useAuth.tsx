import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createContainer } from "unstated-next";
import { AuthForm } from "../interfaces/auth";

export const useAuth = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState<AuthForm>({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });

  const authenticateUser = async (e: any) => {
    e.preventDefault();
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/users/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: form.email,
        password: form.password,
        passwordConfirmation: form.confirmPassword,
        name: form.name
      })
    });

    const data = await response.json();

    if (data.user) {
      navigate('/login');
    }

    console.log(data);
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const [name, value] = [e.target.name, e.target.value];
    setForm({ ...form, [name]: value } as Pick<AuthForm, keyof AuthForm>);
  }

  return {
    form,
    authenticateUser,
    handleInputChange
  }
}

export const AuthContainer = createContainer(useAuth);