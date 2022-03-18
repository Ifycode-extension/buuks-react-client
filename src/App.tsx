import { AuthContainer } from './hooks/auth';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';

// TODO: Prevent NOT logged in user from Accessing /books page (through changing browser url)

function App() {
  return (
    <AuthContainer.Provider>
      <Header />
      <Outlet />
    </AuthContainer.Provider>
  );
}

export default App;
