import { ReactElement } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import App from '../../App';
import Books from '../Books';
import Home from '../Home';
import Login from '../Login';
import NotFound from '../NotFound';
import SignUp from '../SignUp';

const Router = (): ReactElement => (
  <BrowserRouter>
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
  </BrowserRouter>
);

export default Router;