export interface User {
  email: string;
  name: string;
  _id: string;
}

export interface AuthForm {
  email: string;
  password: string;
  confirmPassword: string | null;
  name: string | null;
}
