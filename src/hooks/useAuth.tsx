import { ChangeEvent, useState } from "react";
import { Location, NavigateFunction, useLocation, useNavigate } from "react-router-dom";
import { createContainer } from "unstated-next";
import { AuthForm, AuthForm2, User } from "../interfaces/auth";
import { formBody } from "../lib/auth";

export const useAuth = () => {
  const navigate: NavigateFunction = useNavigate();
  const location: Location = useLocation();
  const authPage: string = location.pathname;
  const [user, setUser] = useState<User>({
    email: '',
    name: '',
    _id: ''
  });
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
        localStorage.setItem('_user', JSON.stringify(data.user));
        setUser(JSON.parse(localStorage.getItem('_user') as string));
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

  const handleLogIn = () => {
    setIsAuthenticated(true);
    localStorage.getItem('accessToken');
  }

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate('/login');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('_user');
    setUser({
      email: '',
      name: '',
      _id: ''
    });
  }

  return {
    form,
    form2,
    authPage,
    authenticateUser,
    handleInputChange,
    handleLogIn,
    handleLogout,
    isAuthenticated,
    setIsAuthenticated,
    user,
    setUser
  }
}

export const AuthContainer = createContainer(useAuth);