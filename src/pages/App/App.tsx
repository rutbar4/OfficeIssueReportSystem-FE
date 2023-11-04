
import { RouterProvider } from 'react-router-dom';

import AppRouter from 'src/components/AppRouter/AppRouter';
import {Provider} from 'react-redux';
import store from '../../store/store';


const App = () => {
  return (
    <Provider store={store}>

        <RouterProvider router={AppRouter()} />
    </Provider>
  );
};

export default App;
