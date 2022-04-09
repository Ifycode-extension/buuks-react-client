import { ChangeEvent, useEffect, useState } from "react";
import { Location, NavigateFunction, useLocation, useNavigate } from "react-router-dom";
import { createContainer } from "unstated-next";
import { AuthForm, AuthFormContent, User } from "../interfaces/auth";
import { formBody } from "../lib/auth";

export const useAuth = () => {
  const navigate: NavigateFunction = useNavigate();
  const location: Location = useLocation();
  const pageRoute: string = location.pathname;
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [unAuthorizedError, setUnAuthorizedError] = useState<boolean>(false);
  const initialAuthFormContent = {
    formTitle: '',
    buttonText: '',
    spanText: '',
    LinkText: '',
    apiEndpoint: '',
    destinationPage: ''
  };
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
  const [authFormContent, setAuthFormContent] = useState<AuthFormContent>(initialAuthFormContent);
  const [user, setUser] = useState<User>(initialUser);
  const [form, setForm] = useState<AuthForm>(initialForm);

  // useEffect(() => { // Suggestions from Silas
  //   // Set isloading to true

  //   // read token from local storage
  //   // if token exists, 
  //       // read user data from local storage
  //       // set the user variable
  //       // set isAuthenticated to true

  //   // if token doesn't exist, 
  //       // set isAuthenticated to false

  //   // set isLoading to false
  // }, []);

  useEffect(() => {
    // setIsLoading(true);
    const token = localStorage.getItem('buuks_accessToken');
    if (token) {
      handleLogIn();
    } else {
      handleLogout();
    }
    // setIsLoading(false);
  }, []);

  const authenticateUser = async (e: any, apiEndpoint: string, destinationPage: string) => {
    e.preventDefault();
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/${apiEndpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formBody({ form, pageRoute }))
    });
    const data = await response.json();
    if (data.user) {
      if (pageRoute === '/login') {
        localStorage.setItem('buuks_accessToken', data.accessToken);
        localStorage.setItem('buuks_user', JSON.stringify(data.user));
        handleLogIn();
      }
      navigate(destinationPage);
      resetForm(initialForm);
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
    // console.log(data)
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value } as Pick<AuthForm, keyof AuthForm>);
    handleError(false, '');
  }

  const handleLogIn = () => {
    const userLocal = localStorage.getItem('buuks_user');
    setUser(JSON.parse(userLocal as string));
    setIsAuthenticated(true);
  }

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUnAuthorizedError(false);
    navigate('/login');
    localStorage.removeItem('buuks_accessToken');
    localStorage.removeItem('buuks_user');
    setUser(initialUser);
  }

  const resetForm = (initialForm: AuthForm) => {
    setForm(initialForm);
    handleError(false, '');
  }

  const handleError = (boolean: boolean, string: string) => {
    setError(boolean);
    setErrorMessage(string);
  }

  const handleAppLinks = (to: string) => {
    handleError(false, '');
    if (to === '/login') {
      setForm({
        email: '',
        password: ''
      } as AuthForm);
      setAuthFormContent({
        formTitle: 'Login form',
        buttonText: 'Login',
        spanText: 'Don\'t have an account yet?',
        LinkText: 'Signup!',
        apiEndpoint: 'users/login',
        destinationPage: '/books'
      });
    }
    else if (to === '/signup') {
      setForm(initialForm);
      setAuthFormContent({
        formTitle: 'Signup form',
        buttonText: 'Signup',
        spanText: 'Have an account already?',
        LinkText: 'Login.',
        apiEndpoint: 'users/signup',
        destinationPage: '/login'
      });
    } else {
      setForm({} as AuthForm);
      setAuthFormContent({} as AuthFormContent);
    }
  }

  return {
    form,
    pageRoute,
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
    setUnAuthorizedError,
    handleAppLinks,
    authFormContent
  }
}

export const AuthContainer = createContainer(useAuth);