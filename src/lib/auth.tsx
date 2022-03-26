import { AuthForm } from "../interfaces/auth";

export const formBody = (
  { form, pageRoute }: { form: AuthForm, pageRoute: string }) => {
  let loginReqBody = {
    email: form.email,
    password: form.password
  }
  if (pageRoute === '/login') {
    return loginReqBody;
  }
  return {
    ...loginReqBody,
    passwordConfirmation: form.confirmPassword,
    name: form.name
  }
}
