export interface User {
  email: string;
  name: string;
  _id: string;
}

export interface SignUpForm {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
}

export interface LoginForm {
  email: string;
  password: string;
}