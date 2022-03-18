import { AuthContainer } from './hooks/auth';
import { SignUpContainer } from './hooks/signin';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';

// TODO: Prevent NOT logged in user from Accessing /books page (through changing browser url)

function App() {
  return (
    <AuthContainer.Provider>
      <SignUpContainer.Provider>
        <Header />
        <Outlet />
      </SignUpContainer.Provider>
    </AuthContainer.Provider>
  );
}

export default App;
