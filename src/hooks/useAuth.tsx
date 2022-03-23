import { ChangeEvent, useState } from "react";
import { Location, NavigateFunction, useLocation, useNavigate } from "react-router-dom";
import { createContainer } from "unstated-next";
import { AuthForm, AuthForm2 } from "../interfaces/auth";
import { formBody } from "./helpers/auth";

// TODO: Persist isAuthenticated state on page reload

export const useAuth = () => {
  const navigate: NavigateFunction = useNavigate();
  const location: Location = useLocation();
  const authPage: string = location.pathname;
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [form, setForm] = useState<AuthForm>({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });
  const [form2, setForm2] = useState<AuthForm2>({
    email: '',
    password: ''
  });

  const authenticateUser = async (e: any, endpoint: string, authPageroute: string) => {
    e.preventDefault();
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formBody({ form, form2, authPage }))
    });
    const data = await response.json();
    if (data.user) {
      if (authPage === '/login') {
        localStorage.setItem('accessToken', data.accessToken);
        setIsAuthenticated(true);
      }
      navigate(authPageroute);
    }
    console.log(data);
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (authPage === '/signup') setForm({ ...form, [name]: value } as Pick<AuthForm, keyof AuthForm>);
    if (authPage === '/login') setForm2({ ...form2, [name]: value } as Pick<AuthForm2, keyof AuthForm2>);
  }

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('accessToken');
    navigate('/login');
  }

  return {
    form,
    form2,
    authPage,
    authenticateUser,
    handleInputChange,
    handleLogout,
    isAuthenticated,
    setIsAuthenticated
  }
}

export const AuthContainer = createContainer(useAuth);