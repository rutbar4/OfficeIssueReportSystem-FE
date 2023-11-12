import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';

import store from '../../store/store';
import Layout from '../../components/layout/Layout';


const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Layout/>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
