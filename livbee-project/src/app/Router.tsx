import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../presentation/pages/Home';
import '../presentation/styles/global.css';

const AppRouter = () => (
  <BrowserRouter>
    <div className="app-container">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  </BrowserRouter>
);

export default AppRouter;
