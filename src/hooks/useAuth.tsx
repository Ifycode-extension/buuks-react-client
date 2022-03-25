import { ChangeEvent, useState } from "react";
import { Location, NavigateFunction, useLocation, useNavigate } from "react-router-dom";
import { createContainer } from "unstated-next";
import { AuthForm, AuthForm2, User } from "../interfaces/auth";
import { formBody } from "../lib/auth";

export const useAuth = () => {
  const navigate: NavigateFunction = useNavigate();
  const location: Location = useLocation();
  const authPage: string = location.pathname;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [unAuthorizedError, setUnAuthorizedError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const initialUser = {
    email: '',
    name: '',
    _id: ''
  };
  const initialForm = {
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  };
  const initialForm2 = {
    email: '',
    password: ''
  };
  const [user, setUser] = useState<User>(initialUser);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [form, setForm] = useState<AuthForm>(initialForm);
  const [form2, setForm2] = useState<AuthForm2>(initialForm2);

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
      resetForm(initialForm, initialForm2);
    }

    if (response.status === 400) {
      handleError(true, data[0].message);
    }

    if (response.status === 409) {
      if (data.error === 'Duplicate key') handleError(true, 'Email already exists. Use a different email.');
      if (data.error === 'ValidationError: name: Path `name` is required.') handleError(true, 'First name is required.');
    }

    if (response.status === 401) {
      handleError(true, data.error.message);
    }
    console.log(data)
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (authPage === '/signup') setForm({ ...form, [name]: value } as Pick<AuthForm, keyof AuthForm>);
    if (authPage === '/login') setForm2({ ...form2, [name]: value } as Pick<AuthForm2, keyof AuthForm2>);
    handleError(false, '');
  }

  const handleLogIn = () => {
    setIsAuthenticated(true);
    localStorage.getItem('accessToken');
  }

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUnAuthorizedError(false);
    navigate('/login');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('_user');
    setUser(initialUser);
  }

  const resetForm = (initialForm: AuthForm, initialForm2: AuthForm2) => {
    setForm(initialForm);
    setForm2(initialForm2);
    handleError(false, '');
  }

  const handleError = (boolean: boolean, string: string) => {
    setError(boolean);
    setErrorMessage(string);
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
    setUser,
    isLoading,
    error,
    errorMessage,
    setIsLoading,
    handleError,
    unAuthorizedError,
    setUnAuthorizedError
  }
}

export const AuthContainer = createContainer(useAuth);