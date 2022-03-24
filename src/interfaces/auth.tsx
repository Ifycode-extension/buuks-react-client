export interface User {
  email: string;
  name: string;
  _id: string;
}

export interface AuthForm {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
}

export interface AuthForm2 {
  email: string;
  password: string;
}