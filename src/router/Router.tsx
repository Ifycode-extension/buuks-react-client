import { ReactElement } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import App from '../App';
import { AuthContainer } from '../hooks/useAuth';
import Books from '../pages/Books';
import Home from '../pages/Home';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import SignUp from '../pages/SignUp';

const Router = (): ReactElement => (
  <BrowserRouter>
    <AuthContainer.Provider>
      <Routes>
        <Route element={<App />}>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Navigate replace to="/home" />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/books" element={<Books />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthContainer.Provider>
  </BrowserRouter>
);

export default Router;