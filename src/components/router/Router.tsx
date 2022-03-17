import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import App from '../../App';
import Books from '../pages/Books';
import Home from '../pages/Home';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import SignUp from '../pages/SignUp';

const Router = (): JSX.Element => (
  <BrowserRouter>
    <Routes>
      <Route element={<App />}>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Navigate replace to="/home" />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Route>
      <Route path="/books" element={<Books />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default Router;