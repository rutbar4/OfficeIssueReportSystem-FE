import {Provider} from 'react-redux';
import store from '../../store/store';
import Layout from '../../components/layout/Layout';
import {BrowserRouter} from 'react-router-dom';


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
