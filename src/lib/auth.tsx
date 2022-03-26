import { LoginForm, SignUpForm } from "../interfaces/auth";

export const formBody = (
  { form, pageRoute }: { form: SignUpForm | LoginForm, pageRoute: string }): Record<string, any> => {
  if (pageRoute === '/login') {
    return {
      // email: form2.email,
      // password: form2.password
    }
  }
  return {
    // email: form.email,
    // password: form.password,
    // passwordConfirmation: form.confirmPassword,
    // name: form.name
  }
}
