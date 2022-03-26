import { AuthForm, AuthForm2 } from "../interfaces/auth"

export const formBody = (
  { form, form2, pageRoute }: { form: AuthForm; form2: AuthForm2; pageRoute: string }): Record<string, any> => {
  if (pageRoute === '/login') {
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
