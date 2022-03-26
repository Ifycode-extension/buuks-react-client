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

export interface AuthFormContent {
  formTitle: string;
  buttonText: string;
  spanText: string;
  LinkText: string;
  apiEndpoint: string;
  destinationPage: string;
}
