import { AuthForm, AuthForm2 } from "../../interfaces/auth"

export const formBody = (
{ form, form2, authPage }: { form: AuthForm; form2: AuthForm2; authPage: string }): Record<string, any> => {
  if (authPage === '/login') {
    return {
      email: form2.email,
      password: form2.password
    }
  }
  return {
    email: form.email,
    password: form.password,
    passwordConfirmation: form.confirmPassword,
    name: form.name
  }
}
