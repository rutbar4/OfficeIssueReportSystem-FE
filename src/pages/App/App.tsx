import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Layout from 'src/components/layout/Layout';
import Home from 'src/pages/Home/Home';
import { AppRoutes } from 'src/types/routes';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path={AppRoutes.HOME} element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
