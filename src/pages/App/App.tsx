import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';

import store from '../../store/store';
import Layout from '../../components/layout/Layout';

import AppRouter from 'src/components/AppRouter/AppRouter';

const App = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={AppRouter()} />
    </Provider>
  );
};

export default App;
