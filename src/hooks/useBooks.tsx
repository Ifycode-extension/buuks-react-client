import { AuthContainer } from "./useAuth"

export const useBooks = () => {
  const auth = AuthContainer.useContainer();
  const test = auth.isAuthenticated;
  return {
    test
  }
}