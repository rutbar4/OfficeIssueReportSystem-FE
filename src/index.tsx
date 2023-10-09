/* eslint-disable import/order */
import { createRoot } from 'react-dom/client';

import App from 'src/pages/App/App';
import 'src/index.scss';
import { Provider } from 'react-redux';
import store from './store/store';

// Clear the existing HTML content
document.body.innerHTML = '<div id="app"></div>';

// Render your React component instead
const root = createRoot(document.getElementById('app') as HTMLElement);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
  );
