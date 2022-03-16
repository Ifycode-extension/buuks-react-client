import { BrowserRouter, Routes, Route } from "react-router-dom"
import App from '../../App';
import NotFound from "../pages/NotFound";

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route exact path="/" element={ <App /> } />
      <Route path="*" element={ <NotFound /> } />
    </Routes>
  </BrowserRouter>
);

export default Router;